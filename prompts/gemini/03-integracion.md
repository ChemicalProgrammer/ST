# Prompt 03 — auditoría final del proyecto reconstruido

## INICIO DEL PROMPT

Audita la integración de todo el workspace contra docs/PRODUCT_SPEC.md,
ARCHITECTURE.md, CONTRACTS.md y TEST_STRATEGY.md. No confíes en resúmenes del chat.

Esta tarea permite inspeccionar y ejecutar pruebas/builds autorizados; no permite
refactors ni despliegues. Si detectas un fallo, informa causa y archivos implicados
y solicita una tarea de corrección separada.

Verifica:
- Funciones RPC, envelopes, campos JSON, unidades y referencias DOM entre módulos.
- Claves del diccionario y tokens CSS existentes; escape de HTML/JS.
- Motor puro, determinismo y equivalencia Node/browser con fixtures sintéticos.
- Ciclo integrado acceso/casos/editor/importación/run/guardar/reabrir/clonar/compare.
- What-If separado de comparación y Gemini sin inventar números ni exponer claves.
- Todos los includes resueltos y reproducibilidad de bundles al regenerar dos veces.
- Manifest/despliegue: identificar decisiones y permisos pendientes, no cambiarlos.
- Accesibilidad, temas, responsive y ausencia de scroll horizontal global: distinguir
  resultados de DOM tests y comprobación visual real.

Entrega una matriz requisito → archivos → prueba → estado
(APROBADO / FALLIDO / NO EJECUTADO), comandos y resultados observados, y bloqueos.
Actualiza docs/BUILD_STATUS.md únicamente con esa evidencia.
No afirmar validación de Google OAuth, Drive, Sheets o Gemini basándote en mocks.
No declarar calibración contra planta ni equivalencia numérica exacta sin evidencia.

## FIN DEL PROMPT
