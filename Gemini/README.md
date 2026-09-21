# Crear la app desde el chat de Gemini Pro

Este paquete es independiente de Visual Code/. Úsalo en una conversación de Gemini,
sin Code Assist, terminal, Node, npm ni clasp. La aplicación final se ejecuta en
Google Apps Script: Gemini entrega texto/código y tú creas los archivos en su editor.
No necesita NotebookLM. No depende de que Gemini ofrezca archivos descargables.

## Qué copiar y cómo empezar

1. Conserva esta carpeta completa como referencia en tu computadora.
2. Abre una conversación nueva. Adjunta o pega los tres documentos de contexto:
   [producto](contexto/PRODUCTO.md), [arquitectura](contexto/ARQUITECTURA.md) y
   [contratos](contexto/CONTRATOS.md). Si la interfaz no acepta .md, pega el texto.
3. Envía [00 — Inicio](prompts/00_INICIO.md), solo el texto entre INICIO y FIN.
4. Revisa el plan que responda Gemini. Después envía [01 — Protocolo](prompts/01_PROTOCOLO.md)
   y el prompt de la etapa que corresponda, en el orden de la tabla.
5. Crea un proyecto NUEVO de Apps Script. Copia cada archivo completo recibido;
   en el editor se crean archivos Script (.gs) o HTML (.html). El manifiesto es
   appsscript.json. Los .md de esta carpeta no se copian al editor de Apps Script.
6. Al final de cada etapa, ejecuta tú las pruebas indicadas y devuelve el reporte.
   Conserva versiones locales de todos los archivos y completa
   [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md). No avances con archivos truncados.
7. Antes de abrir otro chat usa el prompt 11 para reanudar con contexto actualizado.

## Orden

| Prompt | Resultado |
|---|---|
| [00_INICIO](prompts/00_INICIO.md) | Plan, archivos, dependencias y decisiones, sin código |
| [01_PROTOCOLO](prompts/01_PROTOCOLO.md) | Reglas comunes de entrega y control de versiones |
| [02_BASE_Y_PRUEBAS](prompts/02_BASE_Y_PRUEBAS.md) | Base ejecutable, recursos y pruebas sin terminal |
| [03_MOTOR](prompts/03_MOTOR.md) | Motor físico modular y pruebas en navegador |
| [04_CASOS](prompts/04_CASOS.md) | Autenticación, Drive, casos y simulaciones |
| [05_INTERFAZ](prompts/05_INTERFAZ.md) | Cases, Settings, editor y navegación |
| [06_SIMULACION_RESULTADOS](prompts/06_SIMULACION_RESULTADOS.md) | Corrida, controles, playback y Results |
| [07_IMPORTACION](prompts/07_IMPORTACION.md) | Lectura Sheets, preview y actualización selectiva |
| [08_COMPARACION_WHATIF](prompts/08_COMPARACION_WHATIF.md) | Comparación y recomendación basada en evidencia |
| [09_GEMINI](prompts/09_GEMINI.md) | Panel de consulta al caso guardado |
| [10_INTEGRACION](prompts/10_INTEGRACION.md) | Revisión cruzada y pruebas finales |
| [11_RETOMAR_Y_REPARAR](prompts/11_RETOMAR_Y_REPARAR.md) | Continuidad entre chats y correcciones acotadas |

## Cómo evitar archivos incompatibles

Un bloque funcional puede requerir varios mensajes, pero comparte un solo contrato.
Gemini debe listar TODOS los archivos afectados, entregar cada uno completo y cerrar
el bloque con revisión cruzada. No reemplaces una parte del bloque y lo des por listo.
Una respuesta que dice “pasaría los tests” no es evidencia de ejecución.

En cada tarea adjunta el ESTADO actualizado, contratos y versiones actuales de los
archivos afectados, incluidos consumidores. Un chat nuevo no conoce el anterior.
Si faltan archivos, Gemini debe pedirlos, no reconstruirlos de memoria.

## Referencias incluidas

contexto/ contiene producto, arquitectura manual, contratos y tres referencias
técnicas de física, What-If e importación. referencia/ contiene los cinco módulos
originales del motor como texto Markdown para adjuntar cuando llegues a la etapa 03.
Son una instantánea de 853fb188222deff59c4a145335de1a97ca3cd67b; no datos de planta.
No se necesita descargar el resto del repositorio para comenzar.

## Límites reales

Este paquete permite una reconstrucción progresiva; no garantiza una réplica exacta
ni una app libre de errores. Sin ejecutar pruebas de regresión, la equivalencia del
motor permanece pendiente. Gemini no debe afirmar que guardó en tu disco, accedió
al repositorio, ejecutó Apps Script o desplegó nada por haber escrito una respuesta.

La integración de Gemini DENTRO de la app usa una clave API y acceso separado;
tu acceso al chat Gemini Pro no debe tomarse como prueba de que tienes esa API.
Se puede terminar el simulador y dejar el panel configurado pero deshabilitado hasta
tener acceso. Esa condición debe reportarse, no simular respuestas reales.
