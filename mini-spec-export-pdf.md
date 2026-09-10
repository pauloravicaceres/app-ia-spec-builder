## 1. Qué hace
Añade un botón de "Exportar a PDF" junto al botón de descarga de Markdown, el cual permite tomar el contenido de la especificación técnica activa y descargarlo directamente en formato PDF (`.pdf`). El documento final está estructurado jerárquicamente con títulos (H1 para el proyecto, H2 para las secciones) y listas correspondientes, preservando íntegramente la información generada.

## 2. Por qué
El formato PDF es el estándar universal para presentar y compartir documentos formales inalterables. Mientras que Markdown es ideal para integrarse en repositorios y herramientas de desarrollo, el PDF permite entregar la especificación técnica directamente a *stakeholders* o clientes no técnicos con una presentación limpia y lista para leer o imprimir, garantizando que el documento se vea exactamente igual en cualquier dispositivo.

## 3. Criterios de aceptación
- [ ] La interfaz debe mostrar un botón de exportación a PDF posicionado de manera adyacente y visualmente consistente al botón de Markdown.
- [ ] Al presionar el botón, se debe generar un archivo con extensión `.pdf`.
- [ ] El documento debe estar estructurado de forma legible: usar encabezados de primer nivel para el título principal, de segundo nivel para cada sección y formato de viñetas/números para las listas y flujos.
- [ ] El contenido de la especificación original generada debe conservarse completamente, sin alterar su significado o redacción.
- [ ] El archivo generado debe tener un nombre descriptivo automático (por ejemplo, incorporando fecha o nombre del proyecto).
- [ ] La descarga del PDF debe ser procesada y entregada a través del navegador web hacia la carpeta de descargas del usuario local.
- [ ] Si la especificación técnica no se ha generado o está vacía, el botón de exportar a PDF debe encontrarse deshabilitado.
- [ ] La implementación de la funcionalidad PDF no debe romper, alterar ni entrar en conflicto con la exportación de Markdown.
- [ ] Deberá evaluarse el uso de las dependencias actuales del proyecto; en caso de ser estrictamente necesario para la correcta generación de PDF estructurados, se permitirá la incorporación de una única librería de terceros (ej. `html2pdf.js`, `jspdf` o `pdfmake`) instalada como dependencia justificada.

## 4. No incluye
- Otros formatos de exportación (ej. Word, Excel o HTML suelto).
- Personalización avanzada del documento PDF más allá de su estructura básica (fuentes corporativas, colores específicos, fondos, marca de agua o portadas).
- Cambios o refactorizaciones en la lógica de generación del prompt ni del modelo de IA subyacente.
- Persistencia de los documentos en bases de datos o almacenamiento en nube externo.
- Modificación de diseño de la interfaz existente más allá del nuevo botón.
