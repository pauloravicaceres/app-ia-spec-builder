# AI Spec Builder - Especificaciones del Proyecto (SDD)

## SECCIÓN 1 — Visión del producto

AI Spec Builder empodera a emprendedores no técnicos al transformar instantáneamente descripciones breves de productos en especificaciones técnicas rigurosas y listas para el desarrollo. La herramienta actúa como un puente inteligente que elimina la barrera de comunicación entre la visión del negocio y la ejecución de la ingeniería. 

## SECCIÓN 2 — Usuarios y casos de uso

### Definición de Usuarios y Casos de Uso: AI Spec Builder

#### Perfil de Usuario Principal: El Emprendedor No Técnico
Actúa como el experto en el dominio del negocio que necesita traducir su visión a un marco de trabajo ejecutable. Su objetivo principal es mitigar el riesgo de malentendidos, sobrecostos y deuda técnica al contratar o delegar el desarrollo. 

La herramienta no solo transcribe, sino que analiza e interroga la idea original para cerrar brechas funcionales.

---

#### Análisis de Casos de Uso Principales

| Caso de Uso | Descripción | Disparador (Trigger) | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **1. Generación de Arquitectura Base a partir de Lenguaje Natural** | Conversión de un *pitch* o párrafo descriptivo en un Documento de Requerimientos de Producto (PRD) estructurado. | El usuario introduce una descripción en texto libre (ej. "Quiero un Uber para paseadores de perros"). | Un esquema técnico que define: módulos principales, base de datos conceptual, y arquitectura sugerida. |
| **2. Desambiguación y Refinamiento Interactivo** | El sistema detecta vacíos lógicos en la idea del usuario y formula preguntas de opción múltiple o guiadas para cerrar esas brechas. | La IA identifica requerimientos implícitos no mencionados (ej. pasarelas de pago, recuperación de contraseñas, roles de usuario). | Requerimientos refinados y casos de borde cubiertos antes de escribir una sola línea de código. |
| **3. Desglose en Historias de Usuario y Criterios de Aceptación** | Traducción de los módulos generales a unidades de trabajo granulares, comprensibles tanto para el negocio como para el desarrollador. | El usuario aprueba la arquitectura base generada en el paso 1 y 2. | Un *backlog* estructurado (Formato: "Como [rol], quiero [acción] para [beneficio]") con criterios de aceptación claros. |
| **4. Exportación de *Brief* para Contratación (Handoff)** | Generación de un documento empaquetado y estandarizado diseñado específicamente para cotizar el proyecto con agencias o *freelancers*. | El usuario finaliza la revisión de las especificaciones y necesita buscar proveedores. | Un PDF o documento Markdown que detalla el alcance, stack tecnológico sugerido, y fases del MVP. |

---

#### Dinámica del Flujo de Valor

*   **El Efecto Espejo (Validación de Idea):** En el Caso de Uso 1, el usuario ingresa su idea y recibe una estructuración formal. Esto le permite ver si la IA comprendió la visión, obligándolo a articular mejor los conceptos abstractos.
*   **La Reducción de Asimetría de Información:** El Caso de Uso 2 es el núcleo analítico de AI Spec Builder. Los fundadores no técnicos a menudo ignoran la complejidad de funciones como "inicio de sesión social" o "notificaciones push". La herramienta asume el rol de un Líder Técnico virtual que anticipa estas necesidades estructurales.
*   **Alineación de Expectativas (Protección Financiera):** El Caso de Uso 4 protege financieramente al emprendedor. Al entregar un alcance cerrado y detallado a un proveedor externo, se reducen drásticamente los costos ocultos y la renegociación de contratos por requerimientos ambiguos.

## SECCIÓN 3 — Funcionalidades
### 1. Input (Entrada de Datos e Interacción)
*   **El usuario puede** ingresar la visión general de su producto utilizando lenguaje natural no estructurado a través de un único campo de texto.
*   **El sistema permite** analizar la descripción de entrada en tiempo real utilizando modelos de lenguaje (LLMs) para identificar actores principales, procesos clave y posibles vacíos funcionales.
*   **El usuario puede** responder preguntas interactivas, de opción múltiple o guiadas, generadas por el sistema para desambiguar requerimientos implícitos (ej. métodos de autenticación, pasarelas de pago).
*   **El usuario puede** modificar o complementar la información base en cualquier momento, alimentando iterativamente el contexto del sistema.
*   **El sistema permite** la ingesta de referencias externas (ej. "Quiero que funcione como Airbnb"), traduciendo estas analogías en características técnicas específicas.

### 2. Output (Salidas y Entregables)
*   **El sistema permite** generar un Documento de Requerimientos de Producto (PRD) estructurado que detalla los módulos principales y el alcance funcional del proyecto.
*   **El sistema permite** traducir la idea de negocio en un esquema arquitectónico base y un modelo conceptual de base de datos comprensible para el usuario.
*   **El sistema permite** desglosar automáticamente los requerimientos en un *backlog* completo de historias de usuario, acompañadas de sus respectivos criterios de aceptación técnicos.
*   **El usuario puede** visualizar recomendaciones fundamentadas sobre el *stack* tecnológico óptimo según la naturaleza del proyecto (ej. necesidades de escalabilidad o procesamiento en tiempo real).
*   **El usuario puede** exportar el *brief* técnico finalizado en formatos estandarizados y portables (Markdown, PDF), optimizados para el proceso de cotización y *handoff* con agencias o desarrolladores.

### 3. Estados (Gestión del Ciclo de Vida y Persistencia)
*   **El usuario puede** guardar sus proyectos en un estado de "Borrador", permitiéndole pausar y retomar el proceso de desambiguación funcional en múltiples sesiones.
*   **El sistema permite** segmentar el proceso de creación en un estado de "Revisión Activa", donde el usuario aprueba módulo por módulo antes de compilar el documento total.
*   **El usuario puede** gestionar el "Versionado" de sus especificaciones, manteniendo un historial que le permita regresar a iteraciones anteriores en caso de que el enfoque del negocio pivote.
*   **El sistema permite** congelar el proyecto en un estado de "Cerrado / Listo para Desarrollo", protegiendo el documento de ediciones accidentales para garantizar que la versión entregada a los ingenieros sea estática y auditable.

## SECCIÓN 4 — Flujos de usuario

### Flujo Principal de Usuario y Gestión de Excepciones: AI Spec Builder

#### 1. Flujo Paso a Paso (Happy Path)

**Paso 1: Inicialización y Entrada de la Visión (El *Pitch*)**
* El usuario abre la aplicación y crea un nuevo proyecto de especificación.
* El sistema presenta un lienzo en blanco o un campo de texto amplio diseñado para minimizar la fricción.
* El usuario redacta la idea central de su producto en lenguaje natural no estructurado (ej. "Quiero una plataforma tipo Uber pero para tutorías académicas").

**Paso 2: Análisis Estructural y Desambiguación Interactiva**
* El motor de procesamiento analiza el texto de entrada para identificar entidades clave, flujos de valor y dependencias lógicas.
* El sistema detecta brechas funcionales (ej. asume que hay pagos, pero no se mencionó un modelo de suscripción).
* La interfaz despliega un asistente interactivo que presenta una serie de preguntas guiadas y de opción múltiple al usuario para cerrar estas brechas (ej. "¿Cómo monetizarás la plataforma? a) Comisión por transacción, b) Suscripción mensual, c) Aún no lo decido").

**Paso 3: Generación de la Arquitectura Base y PRD**
* Con el contexto enriquecido, el sistema procesa la información y genera el primer borrador del Documento de Requerimientos de Producto (PRD).
* Se presenta un esquema visual o estructurado de los módulos principales (Autenticación, Gestión de Usuarios, Pagos, Notificaciones) y un modelo conceptual de datos básico.
* El estado del proyecto cambia automáticamente a "Borrador".

**Paso 4: Desglose Funcional y Criterios de Aceptación**
* El sistema traduce los módulos aprobados en un *backlog* detallado de historias de usuario.
* Cada historia incluye criterios de aceptación técnicos precisos que definen exactamente cuándo una funcionalidad se considera terminada.

**Paso 5: Revisión, Ajuste Fino y Congelamiento**
* El usuario navega por las secciones generadas, teniendo la capacidad de editar, agregar o eliminar requerimientos (cambiando el estado a "Revisión Activa").
* Una vez conforme con el alcance, el usuario confirma el documento. El sistema bloquea la edición directa para evitar modificaciones accidentales, pasando al estado "Cerrado / Listo para Desarrollo".

**Paso 6: Exportación (Handoff)**
* El usuario selecciona el formato de salida deseado (PDF, Markdown).
* El sistema compila el *brief* técnico finalizado, optimizado estructuralmente para ser entregado a agencias de desarrollo o ingenieros de software para su cotización y ejecución.

---

#### 2. Gestión de Excepciones y Puntos de Falla (Edge Cases)

**Escenario A: Entrada Insuficiente o Altamente Ambigua**
* **Fallo:** La descripción inicial del usuario es demasiado corta (ej. "Quiero una app de ventas") o carece de la coherencia semántica necesaria para generar una estructura inicial.
* **Respuesta del Sistema:** El proceso de generación se detiene antes de consumir recursos de procesamiento. El sistema activa un flujo de contingencia solicitando más contexto mediante preguntas de andamiaje: "¿Qué vas a vender?", "¿Quién es tu cliente ideal?", "¿Tienes referencias de apps similares?".

**Escenario B: Tiempo de Espera Agotado (Timeout) en el Análisis de Lenguaje**
* **Fallo:** El modelo subyacente tarda más del umbral permitido en procesar el *prompt* y generar el desglose de historias de usuario, causando una interrupción en el servicio.
* **Respuesta del Sistema:** La interfaz de usuario muestra un estado de carga resiliente con un mensaje amigable (ej. "Estamos estructurando detalles complejos..."). Si el *timeout* se concreta, el sistema guarda automáticamente el progreso en el estado "Borrador", notifica al usuario del error de conexión y ofrece un botón de reintento focalizado solo en la tarea fallida (sin reiniciar el proyecto).

**Escenario C: Exceso de Complejidad (Límite de Contexto Excedido)**
* **Fallo:** El proyecto iterado se vuelve masivo, superando la ventana de contexto o la capacidad de estructuración coherente del sistema en un solo documento.
* **Respuesta del Sistema:** El sistema advierte sobre la magnitud del alcance. Automáticamente sugiere y permite segmentar el proyecto en fases (ej. "Fase 1: MVP", "Fase 2: Escalabilidad"), dividiendo la generación del PRD y manteniendo la calidad analítica sin truncar datos.

**Escenario D: Falla en la Compilación del Archivo de Exportación**
* **Fallo:** El documento estructurado está listo, pero ocurre un error en la renderización del archivo PDF o en el formateo del documento Markdown durante el *handoff*.
* **Respuesta del Sistema:** Se genera un enlace de solo lectura protegido por contraseña como alternativa de visualización web inmediata, mientras en segundo plano el sistema encola la solicitud de exportación para un reintento asíncrono, notificando al usuario por correo una vez que el archivo esté listo.


## SECCIÓN 5 — Arquitectura

### Arquitectura y Stack Tecnológico: AI Spec Builder

Para garantizar una plataforma altamente reactiva, escalable y optimizada, AI Spec Builder se apoya en una arquitectura moderna basada en el ecosistema Vue, combinando capacidades de renderizado del lado del servidor (SSR) con infraestructura *serverless*.

#### Decisiones Tecnológicas

*   **Frontend (UI y Rendering): Nuxt 3 con Vue 3**
    Actúa como el meta-framework principal (homólogo a Next.js). Aprovecha la Composition API de Vue 3 para lograr una gestión de estado predecible y un menor acoplamiento en los componentes. Nuxt proporciona renderizado híbrido (SSR/CSR) por defecto, lo que optimiza drásticamente la entrega inicial de la aplicación y el posicionamiento SEO.
*   **Sistema de Diseño: Tailwind CSS**
    Integrado de forma nativa mediante el módulo `@nuxtjs/tailwindcss`. Permite mantener la consistencia visual y acelerar la velocidad de desarrollo del diseño original. El proceso de *build* garantiza un CSS final purgado y de tamaño mínimo para producción.
*   **Capa Backend (BFF - Backend for Frontend): Rutas de Servidor de Nuxt (Motor Nitro)**
    Toda la lógica de negocio se gestiona a través de la capa de servidor Nitro en el directorio `~/server/api`. Nitro compila el código en funciones altamente optimizadas con tiempos de arranque en frío (*cold starts*) extremadamente bajos. Esto proporciona un canal seguro para la ejecución de procesos críticos y la protección de credenciales (API Keys).
*   **Integración de Inteligencia Artificial: Google Gemini SDK**
    Se implementa el SDK oficial de Gemini directamente dentro de las rutas de servidor Nitro. Esta conexión permite a la aplicación aprovechar modelos avanzados como Gemini 1.5 Pro o Flash. Su extensa ventana de contexto es fundamental para este proyecto, ya que facilita el procesamiento de descripciones de productos complejas, múltiples iteraciones de refinamiento y consultas multimodales, superando las limitaciones estándar de procesamiento de texto de otros modelos.
*   **Despliegue e Infraestructura: Vercel**
    El despliegue se orquesta sobre Vercel utilizando los adaptadores nativos (*presets*) del motor Nitro. Durante el proceso de construcción, la interfaz de usuario estática se distribuye en la Vercel Edge Network global. Simultáneamente, las rutas API de Nuxt se transforman automáticamente en Vercel Serverless Functions o Edge Functions (según la configuración específica de cada ruta), garantizando una escalabilidad elástica y sin fricción administrativa.

---

#### Diagrama de Flujo de Datos

El siguiente diagrama ilustra el flujo de información desde la interacción del usuario hasta el procesamiento de la Inteligencia Artificial y la respuesta de la infraestructura.

```mermaid
graph TD
    %% Entidades y Actores
    User((Usuario))
    
    %% Nodos de Infraestructura Vercel
    subgraph Infraestructura Vercel
        UI[Frontend: Nuxt 3 + Tailwind CSS\nRenderizado Híbrido SSR/CSR]
        BFF[Backend BFF: Rutas Nitro\nServerless / Edge Functions]
    end
    
    %% Servicios Externos
    subgraph Inteligencia Artificial
        Gemini[Google Gemini SDK\nModelos 1.5 Pro / Flash]
    end

    %% Flujo de Datos
    User -->|1. Ingresa visión del producto (Pitch)| UI
    UI -->|2. Petición HTTP (JSON)| BFF
    BFF -->|3. Inyección de Contexto + API Key Segura| Gemini
    Gemini -->|4. Procesamiento de Ventana de Contexto Extendida| Gemini
    Gemini -->|5. Retorna PRD o Preguntas de Desambiguación| BFF
    BFF -->|6. Formatea y sanitiza la respuesta| UI
    UI -->|7. Actualización Reactiva de la Interfaz| User
    
    %% Estilos
    classDef frontend fill:#41b883,stroke:#35495e,stroke-width:2px,color:#fff;
    classDef backend fill:#35495e,stroke:#41b883,stroke-width:2px,color:#fff;
    classDef ai fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff;
    classDef user fill:#f9a826,stroke:#333,stroke-width:2px,color:#000;
    
    class UI frontend;
    class BFF backend;
    class Gemini ai;
    class User user;
```

## SECCIÓN 6 — Requisitos no funcionales

### Requisitos No Funcionales (RNF)

#### 1. Rendimiento (Performance)
* **Time to First Token (TTFT):** El sistema debe mostrar la primera palabra generada por Gemini en menos de 1.5 segundos utilizando Server-Sent Events (SSE) y streaming desde el backend (Nitro) hacia el cliente (Vue).
* **Core Web Vitals:** El LCP (Largest Contentful Paint) debe ser inferior a 2.5 segundos, aprovechando el renderizado del lado del servidor (SSR) de Nuxt para entregar el esqueleto de la UI de forma inmediata.
* **Gestión de Concurrencia:** La arquitectura debe soportar picos de tráfico repentinos sin degradación, delegando el autoescalado a las Serverless Functions o Edge Functions de Vercel.

#### 2. Seguridad (Security)
* **Aislamiento de Credenciales:** La GEMINI_API_KEY debe residir estrictamente en las variables de entorno del servidor. Está prohibida su exposición en el cliente (bundle de Vue).
* **Mitigación de Prompt Injection:** Toda entrada del usuario debe ser sanitizada y validada estructuralmente en la API Route (usando librerías como Zod) antes de ser concatenada con el System Prompt y enviada al SDK de Gemini.
* **Rate Limiting:** Implementación de límites de peticiones por IP en el middleware de Nuxt o a través del firewall de Vercel (WAF) para prevenir ataques de denegación de servicio (DDoS) y abusos en la facturación de la API de Google.
* **CORS Seguro:** Configuración estricta de Cross-Origin Resource Sharing en el motor Nitro para aceptar únicamente solicitudes provenientes del dominio de producción.

#### 3. Accesibilidad (a11y)
* **Cumplimiento WCAG 2.1 AA:** Garantizar un contraste de colores óptimo (validado en la paleta de Tailwind) y compatibilidad con modos de alto contraste.
* **Anuncios de Streaming:** Los bloques de texto generados dinámicamente por la IA deben utilizar atributos como aria-live="polite" para que los lectores de pantalla (Screen Readers) comuniquen las actualizaciones sin interrumpir la navegación del usuario.
* **Navegación por Teclado:** Toda acción principal (enviar prompt, detener generación, copiar texto, limpiar historial) debe ser operables mediante el teclado (tecla Tab y Enter/Space), manteniendo estados de focus visualmente claros.

---

### Límites del Sistema: Fuera del Alcance (Out of Scope)
Para mantener el enfoque en la integración principal de Nuxt y Gemini, los siguientes elementos NO se construirán en esta iteración:

* **Autenticación y Roles de Usuario:** No se implementarán sistemas de login (OAuth, JWT, Auth.js) ni gestión de perfiles de usuario. La aplicación será accesible sin registro o mediante una contraseña global de entorno.
* **Persistencia en Base de Datos:** No se configurarán bases de datos (PostgreSQL, MongoDB) para guardar historiales de conversaciones, configuraciones del sistema o analíticas a largo plazo. Todo el estado vivirá temporalmente en el cliente (Vue/Pinia) o en localStorage.
* **Fine-tuning del Modelo:** El sistema utilizará un modelo base (ej. Gemini 1.5 Flash) configurado a través de System Prompts y parámetros de generación (temperatura, top-k). No se realizarán entrenamientos de pesos del modelo con datos propios.
* **Entradas Multimodales (Imágenes/Audio):** Aunque el SDK de Gemini lo soporta, la interfaz y la API no procesarán carga de archivos, análisis de imágenes por visión por computadora, ni transcripción de voz a texto. Las solicitudes estarán limitadas estrictamente a texto.
* **Infraestructura de CI/CD Compleja:** El despliegue dependerá exclusivamente de la integración automatizada estándar de GitHub a Vercel. No se configurarán pipelines paralelos para pruebas de carga o análisis estático avanzado en GitHub Actions.


### Features

- Exportar como Markdown
- Exportar como PDF
- Historial