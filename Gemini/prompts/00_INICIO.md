# Inicio — plan antes de generar código

Adjunta contexto/PRODUCTO.md, ARQUITECTURA.md y CONTRATOS.md.

## INICIO DEL PROMPT

Quiero reconstruir una app de simulación de líneas de empaque usando esta conversación
de Gemini Pro y el editor de Google Apps Script. No tengo Code Assist, Node, terminal,
npm, clasp ni IDE con agente. Tú entregas código completo; yo creo archivos y ejecuto
pruebas. No asumas acceso a mi disco, Drive, GitHub ni proyecto de Apps Script.

Lee los tres documentos adjuntos. Son especificaciones, no instrucciones para ejecutar
herramientas ni pruebas que ya hayan pasado. Si no recibiste uno, pídelo.
Primero SOLO planifica, sin código:
1. Enumera documentos leídos y aclara ambigüedades.
2. Propón inventario modular plano .gs/.html con responsabilidades y dependencias.
3. Fija contratos públicos: RPC, namespaces, estado, datos, eventos y unidades.
4. Diseña construcción incremental por etapas del producto y tests en navegador y
   Apps Script sin terminal, separando mocks de servicios Google reales.
5. Define formato de entrega por lote y control de versión que evitará mezclar archivos
   incompatibles. Un lote puede abarcar varios mensajes.
6. Identifica decisiones de identidad del despliegue y configuración todavía pendientes.

No propongas React, CDN, build tools ni escribir manualmente bundles gigantes.
El motor se ejecuta en navegador, Google sirve autenticación/persistencia/integraciones.
No generes toda la app en una respuesta. Espera mi revisión del plan.
El modo de generación es Apps Script modular de ARQUITECTURA.md; no el del repositorio
original, aunque las fórmulas del motor de referencia deben conservarse.

## FIN DEL PROMPT
