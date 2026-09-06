# AI Spec Builder 🚀

AI Spec Builder empodera a emprendedores no técnicos al transformar instantáneamente descripciones breves de productos en especificaciones técnicas rigurosas y listas para el desarrollo. Actúa como un puente inteligente que elimina la barrera de comunicación entre la visión del negocio y la ejecución de la ingeniería.

## 🌟 Características Principales

- **De Lenguaje Natural a PRD:** Convierte una idea de negocio inicial en un Documento de Requerimientos de Producto (PRD) estructurado en segundos.
- **Formato Estricto:** Genera especificaciones en 6 secciones vitales: Visión, Usuarios Objetivo, Funcionalidades, Flujos del Sistema (Happy Path y Errores), Arquitectura Tecnológica y Requisitos.
- **Exportación Rápida (Handoff):** Copia la especificación completa al portapapeles o descárgala directamente en formato `.md` (Markdown) para entregarla a equipos de desarrollo, agencias o *freelancers*.
- **Cero Fricción:** Sin necesidad de registrarse ni crear cuentas. Todo el estado se maneja temporalmente en el cliente (navegador).

## 🛠️ Stack Tecnológico

- **Frontend:** [Nuxt 3](https://nuxt.com/) / [Vue 3](https://vuejs.org/) (Composition API, `<script setup lang="ts">`)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (con `@tailwindcss/typography`)
- **Backend for Frontend (BFF):** Motor Nitro de Nuxt (`server/api/`)
- **Inteligencia Artificial:** SDK Oficial de Google Gemini (Modelos Gemini 1.5 Pro / Flash con *Structured Outputs*)
- **Despliegue:** [Vercel](https://vercel.com/) (Serverless / Edge Functions)

## 🏗️ Restricciones y Reglas Arquitectónicas

Basado en el enfoque *Spec-Driven Development (SDD)*, el proyecto obedece a las siguientes reglas inquebrantables:

1. **Sin Bases de Datos:** No se conectan bases externas (PostgreSQL, MongoDB). El estado se persiste en el `localStorage` del navegador.
2. **Sin Autenticación:** La aplicación no incluye sistemas de login (Auth.js, JWT).
3. **Seguridad AI en el Servidor:** Todo contacto con la API de Gemini y el uso de la clave secreta sucede exclusivamente en la capa de servidor (Nitro) mediante `/api/generate-spec.post.ts`.
4. **Convenciones de Lenguaje:** La interfaz de usuario está adaptada para un público hispanohablante. Sin embargo, todo el código fuente, variables, tipados (`types/`), comentarios y mensajes de commit **deben escribirse estrictamente en inglés**.

## 🚀 Guía de Desarrollo

### Prerrequisitos
- Node.js (v18+)
- Gestor de paquetes: `pnpm` (recomendado) o `npm`

### 1. Variables de Entorno
Crea un archivo `.env` en el directorio raíz del proyecto y agrega tu clave de API de Google AI:
```env
GEMINI_API_KEY=tu_api_key_aqui
```

### 2. Instalación de Dependencias
```bash
pnpm install
```

### 3. Servidor de Desarrollo
```bash
pnpm dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 🛡️ Seguridad y Prevención de Abusos

Este proyecto implementa mecanismos estrictos de seguridad tanto en tiempo de desarrollo como en producción.

### Rate Limiting (Límite de Peticiones)
Para proteger la cuota de la API de Google Gemini y prevenir abusos (DDoS o spam automatizado), el endpoint de generación cuenta con un limitador de peticiones en memoria compatible con entornos serverless (Vercel):
- **Límite:** 5 peticiones por minuto por dirección IP.
- **Protección Activa:** Si un usuario excede el límite, la API intercepta la petición y devuelve un código HTTP `429 Too Many Requests`.
- **Respuesta al Cliente:** Muestra el mensaje *"Has generado demasiadas especificaciones. Espera un momento e inténtalo de nuevo"* e incluye el encabezado HTTP estándar `Retry-After`.

### Validación y Sanitización de Entradas (Input Validation)
Toda información provista por el usuario pasa por un riguroso ciclo de limpieza antes de llegar al modelo de Inteligencia Artificial para asegurar la calidad del *output*:
- **Rechazo de datos nulos:** Se bloquean peticiones vacías o que contengan únicamente espacios en blanco (HTTP `400`).
- **Límite de longitud (Payload limit):** Se impone un máximo estricto de 2000 caracteres. Textos más largos son rechazados automáticamente para mantener la eficiencia del consumo de tokens.
- **Sanitización de Datos:** Antes de procesar el prompt, se eliminan todas las posibles etiquetas HTML (`<script>`, `<div>`) y caracteres de control invisibles, garantizando que el texto enviado a Gemini sea 100% plano y seguro.

### Defensa contra Prompt Injection (AI Security)
El sistema cuenta con un blindaje multicapa en la comunicación con el LLM para evitar manipulaciones de comportamiento:
- **Separación de Contexto (Wrappers):** El texto introducido por el usuario se escapa en su totalidad (evitando fugas de caracteres como `<` o `>`) y se encapsula dentro de etiquetas estructuradas `<user_idea>`.
- **System Prompt Reforzado:** La IA recibe instrucciones explícitas que categorizan el contenido del usuario estrictamente como *datos pasivos*, ordenándole ignorar cualquier directiva maliciosa que intente sobreescribir las reglas (ej. *"ignora las instrucciones anteriores"*).
- **Validación Estricta de Respuesta (Zod):** La respuesta de Gemini no se transfiere ciegamente al cliente. Pasa por un validador que comprueba que la estructura JSON de salida posea exactamente las 6 secciones requeridas, con longitudes lógicas. Si la IA fue manipulada y devuelve un formato incorrecto, el servidor lo detecta y arroja un error controlado (`502 Bad Gateway`).

### Git Hooks para Detección de Secretos (Pre-commit)
El proyecto cuenta con una capa de seguridad automatizada mediante **Husky** para evitar la filtración accidental de credenciales en repositorios públicos.

Al hacer commit, un script (`scripts/check-secrets.js`) analiza tus archivos locales preparados (`staged`).
- **Bloqueo Automático:** Si detecta patrones idénticos a una API Key (ej. `AIza...` de Google o `sk-...` de OpenAI), el commit es abortado inmediatamente.
- **Ignorar Falsos Positivos:** Si estás absolutamente seguro de que la cadena detectada no es una credencial real, puedes forzar el commit anexando la bandera de exclusión:
  
  ```bash
  git commit -m "feat: tu mensaje descriptivo" --no-verify
  ```
