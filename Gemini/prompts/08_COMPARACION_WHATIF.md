# Etapa 7 — comparación y What-If

Adjunta contexto/17_EXPERIMENTS_AND_COMPARISON.md, contratos, ESTADO, archivos de
resultados/ingeniería, estado, recursos y clonación. Aplica protocolo.

## INICIO DEL PROMPT

Implementa Comparison.html y WhatIf.html separados. Compare selecciona dos
simulaciones y empareja equipos por ID; muestra cambios en entradas, parámetros,
resultados y equipos añadidos/eliminados.
Delta propuesta − baseline, diferencia relativa con baseline cero no definida,
OEE absoluto en puntos porcentuales; señales favorables según métrica.
Advertir diferencias de semilla/duración; misma semilla no prueba causalidad ni
garantiza fallas idénticas al cambiar estructura o consumo del PRNG.

What-If muestra una recomendación priorizada de evidencia física/dinámica o explica
por qué no hay propuesta. Distinguir auditoría estática de promedio dinámico.
Crear escenario conserva baseline/semilla y cambia solo campos anunciados,
limpiando resultados del nuevo escenario. No anunciar ganancia hasta correrlo.
Preservar sensibilidad explícita de mantenimiento como hipótesis separada; no reducir
MTBF/MTTR por optimización de geometría.
No implementar optimizador masivo ni DOE.
Si faltan fórmulas de propuesta verificables, pedir referencia y marcar esa propuesta
no disponible; no inventar un factor de mejora.

Tests: IDs estables, equipos ausentes, cero/negativos/valores faltantes,
semilla/duración distinta, no resultados, clone sin mutar origen, únicamente cambios
declarados, evidencia sin ganancia fabricada y temas en todos los paneles.

## FIN DEL PROMPT
