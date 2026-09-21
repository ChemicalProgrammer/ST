# Etapa 5 — corrida, reproducción y Results

Adjunta archivos del motor/API de resultado, state/editor/shell, WebApp, textos,
ESTADO y contratos. Aplica protocolo.

## INICIO DEL PROMPT

Implementa SimulationController.html, Charts.html, Results.html y estilos.
Conecta equipo/configuración de la simulación activa con el motor real.
Configura duración, tick estable, intervalo de muestra, semilla guardada y comandos.
Reproducción usa tiempo virtual acumulado independiente del ritmo real de pantalla.
Pausa/reanudar/reset no altera resultados calculados.
Controles directos agregan comandos en el instante visualizado y recalculan
determinísticamente la misma configuración, con procedencia explícita.

Tarjetas compactas por equipo con estado/borde uniforme, velocidad/mini-gráfica y
seis acciones de icono en dos columnas cuando sean aplicables; detalles secundarios
expandibles. Mantener posición de scroll y elementos durante actualizaciones.
Results muestra corrida completa; playback muestra el frame actual. KPI OEE,
producción/throughput/pérdidas, tabla equipos, gráficas temáticas y export JSON.

Persistir configuración, resultados y replay con cada simulación; reabrirlos.
Rechazar respuesta/cálculo obsoleto de otra selección. No inventar métricas ausentes.
Reportar equipo-minutos sin llamarlos minutos de paro de línea.
Fijar política de tamaño de replay: si se reduce, conservar agregados completos y
declarar resolución/pérdida de detalle; no truncar datos silenciosamente.

Tests: correr fixture, cambiar velocidad de playback sin modificar resultado,
guardar/reabrir/clonar, selección A/B, controles y pérdidas con unidades,
redibujar tema, export JSON válido. No cambiar motor para satisfacer UI.

## FIN DEL PROMPT
