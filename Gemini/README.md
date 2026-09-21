# Reconstruir la aplicación con Gemini Pro

Este paquete está preparado para adjuntar las bases en un chat de Gemini Pro.
No requiere Gemini Code Assist, terminal, Node, npm ni clasp. El usuario crea los
archivos entregados en un proyecto nuevo del editor Apps Script.

**La aplicación y el código generados deben estar completamente en inglés.**
La conversación de desarrollo y estas instrucciones pueden estar en español.

## Los seis documentos que debes adjuntar

| Documento | Función |
|---|---|
| [BASE_DEL_PROYECTO.md](BASE_DEL_PROYECTO.md) | Producto, UX, idioma obligatorio, etapas y reglas de entrega |
| [ARQUITECTURA_Y_CONTRATOS.md](ARQUITECTURA_Y_CONTRATOS.md) | Archivos, dependencias, APIs, persistencia y recursos |
| [MODELO_DE_SIMULACION.md](MODELO_DE_SIMULACION.md) | Física, fallas, semillas, resultados y What-If |
| [IMPORTACION_SHEETS.md](IMPORTACION_SHEETS.md) | Formato fijo, preview, diferencias y aplicación selectiva |
| [VALIDACION.md](VALIDACION.md) | Pruebas por capacidad y verificación de integración |
| [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md) | Inventario y continuidad; actualizar después de cada entrega |

Adjunta estos seis archivos al empezar. Usa esta instrucción breve:

> Lee los seis documentos adjuntos y confirma cuáles recibiste. Reconstruiremos la
> app en un proyecto nuevo de Apps Script, por capacidades completas con pruebas.
> La app y todo el código deben estar en inglés; habla conmigo en español.
> Primero revisa coherencia, presenta el inventario y las decisiones pendientes;
> después entrega el primer lote conforme a las bases. Entrega archivos completos
> y actualiza ESTADO_PROYECTO al terminar cada lote. No declares pruebas ejecutadas
> sin un reporte real.

## Cómo continuar

Guarda cada archivo con su nombre exacto. Sigue los pasos de instalación y pruebas
del lote, comparte el reporte y resuelve defectos antes de la siguiente capacidad.
Los documentos sustituyen la antigua serie de prompts; no hay que enviar doce
instrucciones distintas ni ensamblar archivos sin revisar sus contratos.

Cuando corresponda implementar el motor, adjunta también los cinco documentos de
[referencia](referencia): SeededRandom, ConveyorEngineering, FormatGeometryAdapter,
SimulationValidation y LineSimulationEngine. Son opcionales para explorar la
especificación, pero necesarios si se quiere verificar fidelidad al motor existente.
Sus bloques contienen código original; no pegues los Markdown como archivos Apps Script.

En un chat nuevo, vuelve a adjuntar las bases, el ESTADO_PROYECTO actualizado y
las versiones vigentes del código que se vaya a modificar y sus dependencias.
El estado ayuda a continuar, pero no sustituye los archivos fuente ni garantiza
memoria ilimitada. No compartas claves o datos confidenciales.

Gemini puede entregar código completo en bloques; un archivo descargable depende
de las capacidades de la interfaz y no es requisito del flujo. Nunca aceptar
enlaces inventados ni archivos incompletos como una entrega terminada.

Este paquete no modifica la aplicación existente ni el flujo de Visual Code.
Las bases definen un objetivo; no certifican que la reconstrucción esté implementada,
probada o desplegada.
