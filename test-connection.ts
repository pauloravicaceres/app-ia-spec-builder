import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Función sencilla para leer la API KEY del archivo .env
function getApiKey(): string | undefined {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf-8');
      const match = envFile.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/);
      if (match) return match[1].trim();
    }
  } catch (e) {
    // Ignorar si no se puede leer el archivo y usar process.env
  }
  return undefined;
}

const apiKey = getApiKey();

if (!apiKey) {
  console.error("❌ Error: No se encontró la variable GEMINI_API_KEY en el archivo .env");
  console.error("Asegúrate de crear el archivo .env con el formato: GEMINI_API_KEY=tu_clave_aqui");
  process.exit(1);
}

// Inicializar el cliente de IA de Google
const genAI = new GoogleGenerativeAI(apiKey);

async function testConnection() {
  try {
    console.log("⏳ Conectando con los servidores de Google Gemini...");
    
    // Recomendación: Usar la familia flash para tareas rápidas y directas.
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
    
    const prompt = "¿Cuál es la capital de Francia?";
    console.log(`🗣️ Prompt enviado: "${prompt}"\n`);
    
    // Llamada a la API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Respuesta recibida de Gemini:");
    console.log("--------------------------------------------------");
    console.log(text.trim());
    console.log("--------------------------------------------------");
    console.log("\n¡Conexión exitosa! El SDK y tu API Key están listos para usarse en el proyecto.");
    
  } catch (error: any) {
    console.error("❌ Error crítico en la conexión con Gemini:", error.message || error);
  }
}

testConnection();
