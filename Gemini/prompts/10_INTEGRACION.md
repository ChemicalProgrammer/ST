# Integración final y publicación manual

Adjunta inventario, contratos, ESTADO, todos los archivos vigentes por grupos y reportes.
No asumir que Gemini puede releer automáticamente archivos de mensajes antiguos.

## INICIO DEL PROMPT

Audita la aplicación COMPLETA que he adjuntado. Primero confirma inventario y versiones.
Si falta un productor/consumidor, solicítalo antes de afirmar compatibilidad.

Construye matriz archivo → dependencias → contratos → prueba → estado:
revisado estáticamente / pendiente / ejecutado con reporte.
Comprueba includes de archivos existentes, orden JS, namespaces/firmas sin duplicados,
RPC y errores, IDs DOM, claves i18n, tokens, JSON, unidades y configuración persistida.
Revisa que no haya import/export/require/npm/CDN/templates anidados sin evaluar.
TestPage debe usar motor real idéntico a WebApp. No tests ni claves en UI normal.

Solicita ejecución de suites navegador y servidor, luego recorrido manual:
login → configurar Drive de prueba → crear caso → agregar/importar equipos → correr →
guardar → recargar → clonar → cambiar parámetro → correr → comparar → What-If →
Gemini (si tengo API) → cerrar caso/sesión. Revisar Light/Dark/System, teclado,
modal/scroll, paneles, móvil y descarte de cambios.
Distinguir mocks de verificación Google real. Registrar pruebas no ejecutadas.
Sin referencia ejecutada no certificar equivalencia numérica exacta.

Si hay defectos, agrupar correcciones por causa, actualizar archivos completos
afectados y repetir pruebas relacionadas sin cambiar expectativas por conveniencia.
No reconstruir todo por un error pequeño.

Entregar inventario final con versiones, limitaciones, instrucciones manuales para
proyecto Apps Script nuevo y actualizar implementación. Confirmar modalidad de
identidad/scopes y reautorización requerida. No copiar los bundles originales.
No declarar la app desplegada hasta que yo confirme el resultado real.
Generar ESTADO_PROYECTO actualizado y lista concreta de pendientes.

## FIN DEL PROMPT
