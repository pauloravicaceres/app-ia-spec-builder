import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Common regex patterns for API keys and secrets
const SECRET_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/, // Google API Key / Gemini API Key
  /sk-[a-zA-Z0-9]{48}/, // OpenAI API Key / Stripe Secret Key
  /ghp_[a-zA-Z0-9]{36}/, // GitHub Personal Access Token
  /(?:api_key|apikey|secret|token|password)[\s]*[=:]\s*["'][a-zA-Z0-9\-_]{16,}["']/i, // Generic high-entropy key assignments
];

try {
  // Get a list of currently staged files
  const stagedFilesOutput = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
  const stagedFiles = stagedFilesOutput
    .split('\n')
    .filter(file => file.trim() !== '' && fs.existsSync(file));

  if (stagedFiles.length === 0) {
    process.exit(0);
  }

  let hasSecrets = false;

  for (const file of stagedFiles) {
    // Skip lockfiles, images, or standard exclusions if needed
    if (file.endsWith('.lock') || file.endsWith('.lockb') || file.includes('pnpm-lock') || file.endsWith('.svg') || file.endsWith('.png')) {
      continue;
    }

    const content = fs.readFileSync(file, 'utf-8');
    
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        console.error(`\n🚨 SECURITY WARNING: Potential secret/API key found in staged file: ${file}`);
        
        // Extract a small snippet safely for debugging without exposing the whole key
        const match = content.match(pattern);
        if (match) {
          const secret = match[0];
          const masked = secret.substring(0, 4) + '...' + secret.substring(secret.length - 4);
          console.error(`Pattern matched a key starting with: ${masked}`);
        }
        
        console.error('Please remove the secret before committing. Use .env files for secrets.\n');
        hasSecrets = true;
        break; // Stop checking other patterns for this file
      }
    }
  }

  if (hasSecrets) {
    console.error('❌ Commit blocked due to detected secrets. If this is a false positive, use git commit --no-verify\n');
    process.exit(1); // Block the commit
  } else {
    console.log('✅ Secret check passed. No hardcoded API keys detected.');
    process.exit(0);
  }
} catch (error) {
  console.error('Error running secret check:', error);
  process.exit(1);
}
