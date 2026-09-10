Analiza el proyecto `app-ai-spec-builder` y, en particular, la funcionalidad existente de exportación a Markdown.

Quiero definir una nueva feature:

**Exportar la spec generada como archivo PDF (`.pdf`)**

Tu tarea en esta etapa es **únicamente generar la mini-spec de la feature. NO implementes código y NO modifiques ningún archivo del proyecto.**

La mini-spec debe contener **exactamente estos 4 campos y en este orden**:

## 1. Qué hace

Describe concretamente el comportamiento esperado de la exportación a PDF, considerando que:

- Debe existir un botón de PDF junto al botón de Markdown ya existente.
- El PDF debe generarse a partir de la spec actualmente generada.
- El documento debe presentar un formato limpio y estructurado:
  - H1 para el nombre del proyecto.
  - H2 para cada sección de la spec.
  - Listas para funcionalidades y flujos.
- La exportación debe conservar el contenido de la spec sin modificar su significado.

## 2. Por qué

Describe brevemente qué necesidad resuelve la exportación a PDF y qué valor aporta respecto a disponer únicamente de la spec en Markdown.

## 3. Criterios de aceptación

Incluye únicamente criterios verificables en formato checkbox Markdown:

- [ ] ...

Los criterios deben cubrir como mínimo:

- Presencia y ubicación del botón de PDF junto al botón de Markdown existente.
- Generación correcta del archivo `.pdf`.
- Uso de la spec actualmente generada como fuente del contenido.
- Estructura y formato del documento PDF.
- Nombre del archivo generado.
- Ubicación o mecanismo de entrega del archivo al usuario.
- Comportamiento cuando no existe una spec válida para exportar.
- Que la exportación a PDF no modifique la spec original ni afecte la exportación Markdown existente.
- Evaluación de la posibilidad de reutilizar las capacidades o dependencias existentes del proyecto antes de incorporar nuevas librerías.
- Si es necesario incorporar una librería externa para generar el PDF, que sea únicamente la mínima necesaria y esté justificada por la implementación.

## 4. No incluye

Define explícitamente todo aquello que queda fuera del alcance de esta feature. Este campo es obligatorio y debe proteger el scope.

Como mínimo, considera fuera de alcance:

- Otros formatos de exportación distintos de Markdown y PDF.
- Rediseño o modificación de la interfaz existente, salvo la incorporación del botón de PDF.
- Cambios en la lógica de generación de specs.
- Modificación del contenido de la spec durante la exportación.
- Persistencia de archivos o specs en una base de datos.
- Personalización avanzada del diseño del PDF (logos, plantillas, colores, encabezados, pies de página, etc.), salvo que sea estrictamente necesario para cumplir los requisitos definidos.
- Funcionalidades no relacionadas con la exportación a PDF.

### Restricciones

- Sé específico y conciso.
- No agregues ningún quinto campo.
- No agregues secciones adicionales.
- No inventes requisitos.
- No escribas código.
- No implementes la feature todavía.
- No asumas una librería de generación de PDF sin analizar previamente las capacidades y dependencias existentes del proyecto.
- Prioriza la reutilización de dependencias existentes.
- Si no es posible generar el PDF adecuadamente sin una dependencia externa, indícalo únicamente como parte de los criterios de aceptación, sin seleccionar ni instalar todavía una librería.
- Mantén el alcance estrictamente limitado a la exportación de la spec a PDF.
- La mini-spec debe ser suficientemente precisa para que posteriormente pueda utilizarse como entrada para la fase de planificación e implementación.

Guarda únicamente la mini-spec generada como archivo Markdown en la raíz del proyecto.