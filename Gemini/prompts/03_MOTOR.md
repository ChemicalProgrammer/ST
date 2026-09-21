# Etapa 2 — motor físico y regresión

Adjunta contexto/16_ACCUMULATION_ZONE_CONTROL.md y los cinco .md de referencia/.
Añade contratos, ESTADO y versiones actuales de Main/WebApp/TestPage/TestRunner.
Si no caben todos los adjuntos, enviarlos por grupos con nombres y confirmar recepción.

## INICIO DEL PROMPT

Implementa los módulos EngineRandom.html, EngineEngineering.html, EngineGeometry.html,
EngineValidation.html y EngineRuntime.html y pruebas EngineTests.html.
Usa como referencia matemática los cinco módulos fuente adjuntos; no adivines fórmulas.

Adapta exclusivamente import/export a IIFE y namespace STEngine, cargando en orden.
Preserva funciones públicas mediante SimulatorEngine, orden de PRNG, orden de
operaciones, tick, unidades, eventos, muestras y forma de resultado.
Enumera todas las importaciones/exportaciones originales y su equivalente antes de
portarlas. Si EngineRuntime resulta demasiado largo, divide internamente por
responsabilidad con contratos explícitos conservando el orden de cálculo; no omitas
funciones. No combines el algoritmo en un único HTML gigantesco.

Incluye transporte/cola, acumulación física obligatoria, Prime, debounce Back-up,
residual al detener, rampas y modos/comandos, fallas MTBF exponenciales con MTTR fijo,
microparos existentes y OEE. Diferencia paro de equipo de propagación por falta de
material. No reemplaces geometría por buffers abstractos ni uses Math.random en cálculo.
Semilla idéntica con misma entrada completa debe repetir resultados.

TestPage consume los mismos archivos que la app. Escribe fixtures sintéticos completos
y tests de: entrada inválida, determinismo profundo, línea vacía/Waiting Prime,
conveyor parado congela tránsito, bloqueo sostenido frente a pulsos normales,
reparación fija, pérdidas/OEE con unidades y conservación de material según el modelo.
Para PRNG usa secuencia esperada calculada/verificada independientemente, no
autocomparación del código bajo prueba. No fabricar resultados dorados del motor:
si faltan, registrar equivalencia exacta PENDIENTE y usar invariantes verificables.

Entrega por lotes coherentes, lista pendientes y cierra únicamente con todos los
módulos cargables y suite disponible. Pídeme el reporte ejecutado en navegador.

## FIN DEL PROMPT
