## Feature: Exportar spec como archivo Markdown

## 1. Qué hace
Permite exportar la especificación técnica generada, creando y guardando un archivo en formato Markdown (`.md`).

## 2. Por qué
Resuelve la necesidad de extraer la especificación técnica de la aplicación para poder compartirla, versionarla o utilizarla como documento base en el desarrollo del proyecto.

## 3. Criterios de aceptación
- [ ] La aplicación debe proporcionar una acción para exportar la spec.
- [ ] Al ejecutar la acción, se debe generar un archivo con extensión `.md`.
- [ ] El contenido del archivo debe reflejar exactamente la especificación técnica generada, manteniendo todo su formato Markdown original.
- [ ] El archivo generado debe tener el nombre del producto en kebab-case (ej: spec-app-gestion-freelance.md)
- [ ] La acción de exportación debe prevenirse o estar deshabilitada en los casos en que no exista una spec válida generada.

## 4. No incluye
- Otros formatos de exportación.
- Persistencia en base de datos.
- Modificación del contenido de la spec.
- Cambios en la lógica de generación de specs.
- Funcionalidades no relacionadas con la exportación Markdown.
