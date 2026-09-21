# Prompt 01 — protocolo para implementar una capacidad

Usar después de aprobar el plan. Añadir una sola etapa de 02-etapas al final.

## INICIO DEL PROMPT

Implementa únicamente la etapa indicada al final de este mensaje en la carpeta
nueva. Lee primero docs/PRODUCT_SPEC.md, ARCHITECTURE.md, CONTRACTS.md,
TEST_STRATEGY.md y, si existe, BUILD_STATUS.md. Inspecciona el código actual y sus
dependencias; no asumas que están completos por el historial del chat.

- Trabaja sobre archivos reales con las herramientas autorizadas del workspace.
  No limites la solución a un archivo: modifica los productores, consumidores y
  pruebas necesarios para una capacidad integrada.
- Anuncia antes los archivos y contratos afectados. Conserva trabajo previo.
- No cambies matemáticas, unidades ni semántica para que un test pase. Si falta
  una fórmula indispensable, reporta el bloqueo; no la inventes.
- Mantén motor puro, RPC seguro, recursos de texto/estilo centralizados, UI accesible
  y fuentes/artefactos separados. No edites Code.gs, Index.html ni SimulationEngine.html
  a mano. No inventes base64, lockfiles, credenciales ni métricas.
- Implementa pruebas unitarias y de integración junto con la capacidad, incluyendo
  errores, cancelación y estado persistido. Ejecuta las focalizadas y regresión
  disponible cuando el entorno lo permita. No elimines pruebas para ocultar fallos.
- Si no puedes editar/ejecutar o falta una dependencia, detente ante permisos; reporta
  exactamente lo pendiente. No declares “probado” por revisión estática.
- No instales herramientas/paquetes, no accedas a datos reales, no publiques ni
  despliegues sin autorización específica. Usa mocks y datos sintéticos.
- Actualiza docs/BUILD_STATUS.md con etapa, archivos cambiados, contratos, comandos,
  resultados reales, decisiones y siguientes pasos. No declares etapas futuras listas.
- Entrega resumen revisable del diff, pruebas aprobadas/fallidas/no ejecutadas y
  riesgos. Espera revisión antes de la siguiente etapa.

ETAPA A IMPLEMENTAR: añadir aquí una etapa completa de 02-etapas.

## FIN DEL PROMPT
