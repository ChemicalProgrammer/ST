# Gemini Code Assist — reconstrucción por capacidades

Esta versión sustituye al enfoque anterior de “un archivo por respuesta”.
Los prompts anteriores solo se habían creado localmente; ahora esta carpeta es
parte de la documentación versionada. No requiere NotebookLM ni Gemini Chat.

## Preparación

1. Crea una carpeta nueva y ábrela en VS Code.
2. Copia docs/ y prompts/ de este repositorio manteniendo sus rutas.
3. Si está autorizado, incluye schemas/ y examples/ sintéticos; deja el proyecto
   original separado y de solo lectura como referencia opcional.
4. Confirma inicio de sesión, capacidad de leer/editar workspace y autorización
   corporativa. No instalar Node/Git, dependencias ni publicar por iniciativa del agente.
5. Envía [00-arquitectura-del-proyecto.md](00-arquitectura-del-proyecto.md).
   Es diagnóstico/plan: no modifica archivos.
6. Revisa y aprueba el plan; usa [01-protocolo-de-generacion.md](01-protocolo-de-generacion.md)
   junto con una etapa de [02-etapas.md](02-etapas.md).
7. Finaliza con [03-integracion.md](03-integracion.md).

Los prompts son instrucciones para el workspace abierto: Code Assist debe leer los
archivos, no asumir que los vio porque se mencionaron.
Si no tiene herramientas de edición/ejecución, debe decirlo; no fingir que guardó
archivos o ejecutó tests. No hace falta reescribir la app en un solo archivo.

## Criterio práctico

Una tarea es “implementar importación con preview, integración y pruebas”, no
“generar SheetImport.html”. Se pueden modificar varios archivos relacionados.
Cada etapa deja un punto verificable, actualiza docs/BUILD_STATUS.md en la carpeta
nueva y espera revisión antes de pasar a la siguiente. No commits/push/despliegue sin
autorización. La licencia/extensión disponible no implica permiso sobre datos reales.
