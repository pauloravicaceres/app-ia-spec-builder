# AI Spec Builder — Project Instructions & Guidelines

## 1. Project Overview & Vision
**AI Spec Builder** empowers non-technical entrepreneurs by instantly transforming brief product descriptions into rigorous, developer-ready technical specifications. The tool acts as an intelligent bridge that eliminates the communication barrier between business vision and engineering execution.

### Target Audience
- Non-technical founders, entrepreneurs, and product managers.
- Software engineers and development agencies seeking clear, unambiguous implementation blueprints.

---

## 2. Core Architectural Principles & Constraints

### 2.1 No Authentication
- The application does **not** include user authentication (no login, no registration, no user accounts, no JWT/OAuth/sessions).
- All features and flows are immediately accessible to anyone opening the application.

### 2.2 No Database
- The application does **not** connect to any persistent external database (no PostgreSQL, MySQL, MongoDB, SQLite, Prisma, Drizzle, or ORMs).
- State is managed strictly client-side (Vue Composition API state, Pinia/useState, or browser `localStorage`/`sessionStorage` for temporary persistence and export).
- The application is inherently stateless and portable.

### 2.3 Language Conventions
- **Codebase**: All code, identifiers (functions, variables, components, composables, interfaces, types), comments, test cases, and git commit messages **must be written in English**.
- **User Interface**: Clear, accessible, and intuitive UI copy designed for non-technical users in the input flows, producing standard technical specifications in the output.

---

## 3. Technology Stack & Architecture

### 3.1 Frontend (UI & Rendering): Nuxt 3 with Vue 3
- **Framework**: Nuxt 3 leveraging Vue 3's Composition API (`<script setup lang="ts">`).
- **Rendering**: Hybrid rendering (SSR/CSR) configured to optimize initial load, performance, and SEO.
- **State Management**: Vue Composition API (`ref`, `reactive`, `computed`) and Nuxt `useState` for reactive, predictable local state.

### 3.2 Design System: Tailwind CSS
- **Integration**: Integrated via `@nuxtjs/tailwindcss`.
- **Styling**: Utility-first styling maintaining visual consistency, accessibility, and high development velocity.
- **Production**: Automatic CSS purging to ensure minimal asset bundle sizes.

### 3.3 Backend Layer (BFF - Backend for Frontend): Nuxt Server Engine (Nitro)
- **Directory**: `server/api/` and `server/utils/`.
- **Purpose**: All business logic, prompt orchestration, and Gemini API requests execute securely on the Nitro server engine.
- **Security**: Protects sensitive environment variables (e.g., API keys) from client exposure.
- **Performance**: High-speed execution with ultra-low cold start times.

### 3.4 Artificial Intelligence: Google Gemini SDK
- **Integration**: Official Google Gemini SDK executed server-side within Nitro API routes (`server/api/*`).
- **Models**: Gemini 1.5 Pro / Flash (or Gemini 2.0 series) leveraging large context windows.
- **Capabilities**: Capable of processing rich, multi-faceted product descriptions, handling iterative spec refinements, and returning structured specifications with strict schema validation.

### 3.5 Deployment & Infrastructure: Vercel
- **Hosting**: Deployed to Vercel via Nitro's native Vercel preset (`preset: 'vercel'`).
- **Static Assets**: Distributed globally across Vercel Edge Network.
- **Server Routes**: Automatically converted into Vercel Serverless / Edge Functions for zero-friction scalability.

---

## 4. Project Structure Conventions

```
app-ai-spec-builder/
├── assets/                  # Global CSS, fonts, and static assets
│   └── css/main.css
├── components/              # Vue 3 UI components (<script setup lang="ts">)
│   ├── spec/                # Spec input, generation status, and preview components
│   ├── ui/                  # Reusable UI primitives (buttons, inputs, cards, modals)
│   └── layout/              # App header, footer, navigation
├── composables/             # Auto-imported Vue composables (useSpecGenerator, etc.)
├── layouts/                 # Nuxt layout templates
│   └── default.vue
├── pages/                   # Nuxt file-based routing
│   └── index.vue
├── server/                  # Nitro Backend-for-Frontend (BFF)
│   ├── api/                 # Server endpoints (e.g., /api/generate-spec.post.ts)
│   └── utils/               # Server-only utilities (Gemini client, prompt builders)
├── types/                   # Shared TypeScript definitions & schemas
│   └── spec.ts
├── nuxt.config.ts           # Nuxt configuration (modules, runtimeConfig)
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── GEMINI.md                # Antigravity project instructions (this file)
```

---

## 5. Spec-Driven Development (SDD) Workflow

The core engine transforms a high-level product idea into structured technical artifacts through a defined pipeline:

1. **Idea Ingestion**:
   - Capture user product brief, target audience, core problem solved, and key desired features.
2. **Interactive Clarification (Optional / Progressive)**:
   - Identify ambiguities or missing technical dimensions and prompt the user with simple, high-impact clarifying questions.
3. **Structured Specification Generation**:
   - **Executive Summary & Scope**: High-level problem statement, target audience, and non-goals.
   - **User Stories & Acceptance Criteria**: Standardized user stories with Gherkin scenarios (`Given-When-Then`).
   - **Functional & Non-Functional Requirements**: Detailed functional breakdown, security, performance, and accessibility standards.
   - **System Architecture & Data Flows**: Recommended architecture and Mermaid.js diagrams.
   - **Data Models & Schema Drafts**: Conceptual entities, relations, and TypeScript interface definitions.
   - **API Contracts & Integration Points**: REST endpoint specifications, request/response JSON payloads.
   - **Implementation Roadmap**: Prioritized development phases and actionable task breakdown.
4. **Export & Sharing**:
   - Export specs to Markdown (`.md`), JSON, or copy directly to clipboard for immediate use with development teams or AI coding agents.

---

## 6. Engineering & Code Quality Standards

### 6.1 Vue 3 & Nuxt 3 Conventions
- Always use `<script setup lang="ts">`.
- Strongly type component props with `defineProps<{ ... }>()` and emits with `defineEmits<{ ... }>()`.
- Leverage Nuxt auto-imports for components and composables.

### 6.2 TypeScript & Validation
- Enable strict mode (`strict: true`).
- Disallow the use of `any`; define explicit interfaces in `types/`.
- Validate client inputs and AI responses using schema validation (e.g., `zod`).

### 6.3 Server & API Security
- Access API keys exclusively on the server using `useRuntimeConfig(event)` or `process.env`.
- Use Nitro's `createError` for structured HTTP error responses (e.g., 400 for bad input, 500 for AI service errors).

---

## 7. Antigravity Agent Guidelines

When operating on this codebase:
1. **Adhere to Constraints**: NEVER add authentication libraries, user session stores, databases, or ORMs.
2. **Preserve English in Code**: All code, identifiers, comments, types, and commits must remain strictly in English.
3. **Keep Logic in Nitro**: Keep AI prompts, Gemini SDK calls, and secret handling inside `server/api/` and `server/utils/`.
4. **Maintain Simplicity**: Build clean, modular, and maintainable Vue components.
5. **Documentation Integrity**: Keep this `GEMINI.md` accurate and up to date as the project evolves.
