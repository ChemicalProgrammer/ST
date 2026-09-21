# Reanudar un chat o reparar un fallo

Usa el bloque A al cambiar de conversación; bloque B para corregir un error.
Adjunta ESTADO, tres documentos de contexto y archivos actuales pertinentes.

## INICIO DEL PROMPT A — RETOMAR

Estoy reconstruyendo una Web App Apps Script usando solo Gemini Chat.
Lee los adjuntos. No tienes acceso implícito al historial anterior ni a mi disco.
Usamos .gs/.html planos con includes, sin Node, terminal ni bundles.

Antes de generar código:
- Enumera archivos/versiones recibidos, etapa completada y tarea pendiente.
- Reconstruye tabla de dependencias y contratos desde fuentes actuales.
- Separa tests ejecutados según reportes de tests solamente escritos.
- Detecta versiones duplicadas o inconsistentes y pide la vigente.
- Pide solo dependencias que realmente faltan para la próxima tarea.

Conserva funcionamiento y matemáticas. Aplica el protocolo 01 adjunto.
No repitas etapas terminadas ni inventes contenido ausente.

## FIN DEL PROMPT A

## INICIO DEL PROMPT B — REPARAR

Corrige únicamente el fallo descrito a continuación usando archivos actuales adjuntos.
Primero determina causa; si falta evidencia, pídela.

Mi reporte debe incluir: etapa, pasos para reproducir, esperado/obtenido, mensaje
exacto, archivo/línea si aparece, versiones instaladas y salida del runner sin secretos.
Si mi mensaje omite alguno indispensable, pregúntalo de forma concreta.

No regeneres la app entera. Lista productor y consumidores afectados; entrega solo
archivos completos que cambian y una prueba de regresión relevante. Incluye orden de
reemplazo y verificación. No cambies contratos/matemáticas para silenciar el error.
No declares éxito de ejecución hasta recibir mi reporte.
Actualiza ESTADO_PROYECTO con causa, cambio, evidencia y pendientes.

## FIN DEL PROMPT B
