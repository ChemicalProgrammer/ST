# Documentos para trabajar en VS Code

Copia la carpeta completa Visual Code a la ubicación donde desarrollarás la nueva
aplicación. Abre esa copia en VS Code (puedes renombrarla). En el Explorador deben
aparecer docs/ y prompts/ directamente. No necesitas los documentos históricos de
la carpeta docs/ en la raíz del repositorio original.

## Orden de lectura

1. [PRODUCT_SPEC.md](PRODUCT_SPEC.md): requisitos y alcance.
2. [ARCHITECTURE.md](ARCHITECTURE.md): arquitectura vigente.
3. [CONTRACTS.md](CONTRACTS.md): compatibilidad entre módulos.
4. [TEST_STRATEGY.md](TEST_STRATEGY.md): pruebas y evidencia.
5. [16_ACCUMULATION_ZONE_CONTROL.md](16_ACCUMULATION_ZONE_CONTROL.md): física y sensores.
6. [17_EXPERIMENTS_AND_COMPARISON.md](17_EXPERIMENTS_AND_COMPARISON.md): What-If y comparación.
7. [19_SHEET_IMPORT.md](19_SHEET_IMPORT.md): importación y selección de cambios.
8. [Instrucciones de los prompts](../prompts/gemini/README.md).

Los números 16, 17 y 19 se conservan para mantener las referencias dentro de los
prompts; son referencias técnicas complementarias, no versiones de los cuatro
documentos nuevos. Envía primero el prompt 00-arquitectura-del-proyecto.md.

## Alcance del paquete

Son 13 documentos: ocho en docs/ y cinco en prompts/gemini/. No incluye código ni
pruebas ejecutables. Reproducir exactamente los cálculos actuales requiere consultar
también el motor y las pruebas de referencia autorizados. Los requisitos nuevos se
implementan y prueban explícitamente, no se declaran terminados por estar aquí.

schemas/ y examples/ sintéticos son referencias opcionales del repositorio original.
Si reutilizas la fuente embebida, conserva también su licencia original.
No copies credenciales ni datos reales. BUILD_STATUS.md lo creará Code Assist al
implementar la primera etapa en el proyecto nuevo.
