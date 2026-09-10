Analiza el proyecto `app-ai-spec-builder`.

Quiero definir una nueva feature:

**Exportar la spec generada como archivo Markdown (`.md`)**

Tu tarea en esta etapa es **únicamente generar la mini-spec de la feature. NO implementes código y NO modifiques ningún archivo del proyecto.**

La mini-spec debe contener **exactamente estos 4 campos y en este orden**:

## 1. Qué hace

Describe concretamente el comportamiento esperado de la feature.

## 2. Por qué

Describe brevemente el problema o necesidad que resuelve.

## 3. Criterios de aceptación

Incluye únicamente criterios verificables en formato checkbox Markdown:

- [ ] ...

Los criterios deben cubrir generación del archivo `.md`, contenido, formato, nombre, ubicación y casos en los que no exista una spec válida.

## 4. No incluye

Define explícitamente todo aquello que queda fuera del alcance de esta feature. Este campo es obligatorio y debe proteger el scope.

Como mínimo, considera fuera de alcance:
- Otros formatos de exportación.
- Persistencia en base de datos.
- Modificación del contenido de la spec.
- Cambios en la lógica de generación de specs.
- Funcionalidades no relacionadas con la exportación Markdown.

### Restricciones

- Sé específico y conciso.
- No agregues ningún quinto campo.
- No agregues secciones adicionales.
- No inventes requisitos.
- La exportación debe generar un archivo Markdown.
- El archivo debe guardarse en la raíz del proyecto.
- No escribas código.
- No implementes la feature todavía.

Guarda únicamente la mini-spec generada como archivo Markdown en la raíz del proyecto.