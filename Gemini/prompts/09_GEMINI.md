# Etapa 8 — asistente dentro de la app

Adjunta contratos, ESTADO y versiones actuales de servidor, configuración, shell,
estado, recursos y pruebas. Aplica protocolo.

## INICIO DEL PROMPT

Implementa GeminiService.gs, Assistant.html y estilos del panel.
Esto es la API Gemini de la app; no asumir que mi suscripción al chat autoriza o
incluye esta API. Permitir app operativa sin clave; mostrar configuración pendiente.

Clave solo en UserProperties y peticiones desde servidor; jamás en bootstrap,
HTML, browser storage, reportes de pruebas o logs. Campo vacío conserva clave;
eliminarla requiere acción explícita. Modelo configurable, no garantizar disponibilidad
de un modelo sin prueba real.
Verifica identidad/propiedad antes de leer caso o enviar HTTP.
Contexto es caso guardado/resultados guardados, no edición local; indicarlo.
Enviar solo tras pulsar Send. Limitar pregunta, historial y contexto sin recorte oculto.
Respuestas IA son texto no confiable, no HTML ejecutable; caso es datos, no instrucciones.
Nunca permitir a Gemini modificar simulaciones ni presentar ganancias inventadas.

Panel derecho solo en caso abierto, colapsable/redimensionable por arrastre/teclado,
mínimo útil y máximo restringido por viewport, sin espacio superior muerto.
Chat transitorio se limpia al cerrar/cambiar caso o sesión. Ignorar respuesta tardía.
Estados enviando/error/reintentar; no envíos duplicados al pulsar repetidamente.

Pruebas HTTP falso: configuración ausente, propiedad denegada antes de petición,
request válido, límites, error/cuota/respuesta vacía, escape, ninguna clave filtrada,
cambio de caso durante solicitud. Prueba API real opcional y ejecutada por mí con
datos sintéticos y clave configurada fuera del chat.

## FIN DEL PROMPT
