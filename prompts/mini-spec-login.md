## Feature: Login

## 1. Qué hace

Protege la aplicación mediante la integración de Clerk para la autenticación de usuarios. Restringe el acceso a la interfaz de la aplicación y al endpoint de la API de generación de especificaciones, exigiendo que el usuario tenga una sesión activa antes de poder interactuar con estos recursos.

## 2. Por qué

La aplicación se encuentra actualmente expuesta públicamente y el endpoint de generación consume recursos a través de una API key. La falta de autenticación permite que cualquier visitante sin restricciones pueda agotar los créditos disponibles de la API, lo que representa un riesgo de abuso del sistema.

## 3. Criterios de aceptación

* [ ] Las rutas `/sign-in` y `/sign-up` son accesibles de forma pública.
* [ ] El acceso a cualquier otra ruta de la aplicación requiere obligatoriamente una sesión activa (redirige al login si no la hay).
* [ ] La cabecera (header) de la interfaz renderiza el avatar del usuario cuando la sesión está iniciada.
* [ ] La cabecera incluye un mecanismo funcional que permite al usuario cerrar su sesión.
* [ ] Las solicitudes al endpoint `/api/generate-spec` retornan un código de estado `401 Unauthorized` si se ejecutan sin un token de sesión válido.
* [ ] El almacenamiento y la funcionalidad del historial basado en el `localStorage` del navegador se mantienen operativos y sin alteraciones.

## 4. No incluye

* Integración de bases de datos para la gestión de usuarios en el backend propio.
* Sincronización o persistencia en la nube del historial de especificaciones ligado al usuario.
* Lógica de migración para los datos previamente existentes en el `localStorage`.
* Configuración de múltiples proveedores de identidad (logins sociales como Google, GitHub, etc.).
* Implementación de un sistema de autorización avanzado o gestión de múltiples roles de usuario.

---

**[INSTRUCCIONES PARA EL ASISTENTE AI]**
A partir de la mini-spec definida arriba, tu tarea es:
1. Analizar el proyecto `app-ai-spec-builder` y su estructura actual.
2. Proponer un plan de implementación paso a paso detallado para esta feature.
3. **Restricción crítica:** NO implementes código todavía. Entrégalo únicamente como una propuesta paso a paso para revisión.