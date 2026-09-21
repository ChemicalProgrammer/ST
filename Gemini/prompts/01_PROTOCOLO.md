# Protocolo común — enviar antes de implementar

Adjunta el ESTADO_PROYECTO vigente y archivos afectados cuando existan.
Reenvía este protocolo al iniciar un chat nuevo.

## INICIO DEL PROMPT

Para esta y las siguientes etapas usa estas reglas:

CONTEXTO
Lee especificaciones adjuntas, ESTADO_PROYECTO y código actual. Enumera los archivos
que efectivamente recibiste. No supongas que recuerdas otras conversaciones.
Si necesitas un consumidor/dependencia faltante, pide su versión antes de cambiar APIs.

ENTREGA
Antes del código declara objetivo del lote, archivos nuevos/reemplazados, versión y
dependencias. Implementa una capacidad con todos sus consumidores y pruebas.
Entrega archivos completos, cada uno en un bloque de código con nombre exacto fuera
del bloque. Sin elipsis, TODO, “el resto igual” ni placeholders que aparenten funcionar.
Texto UI en diccionario, CSS en tokens y módulos; evitar Client monolítico.
Si el lote es demasiado grande, entrega uno o varios archivos COMPLETOS por mensaje
y lista pendientes. No cortes un archivo entre mensajes ni declararlo terminado.
Si un archivo no cabe, propón dividirlo por responsabilidades antes de generarlo.
Un archivo descargable es opcional si tu interfaz permite crearlo; no inventes enlaces.
La alternativa siempre es código completo copiable.
Incluye las actualizaciones completas del diccionario/DOM necesarias para el lote.
No reescribas archivos no afectados.

VERIFICACIÓN
Revisa firmas, nombres, unidades, IDs DOM, enums, includes, claves de texto y tokens
contra productores y consumidores. Adjunta pruebas ejecutables sin terminal:
runner navegador para motor/DOM y runner Apps Script con mocks para servidor.
No digas “tests pasaron” si solo hiciste análisis estático. Debes distinguir:
REVISADO ESTÁTICAMENTE, PENDIENTE DE EJECUTAR, EJECUTADO CON REPORTE DEL USUARIO.
Finaliza el lote con pasos exactos de instalación, pruebas y resultados esperados.
Espera mi reporte antes de pasar a otra etapa. No inventes resultados de ejecución.

CONTINUIDAD
Entrega texto actualizado de ESTADO_PROYECTO.md con inventario/versiones,
contratos modificados, entregados/pendientes, resultados aportados y próxima tarea.
No incluyas secretos ni datos reales.
Si un cambio altera una API, reúne las versiones vigentes de todos los consumidores
y actualízalos en el mismo lote. No asumir compatibilidad por nombres parecidos.
No tocar proyecto original ni desplegar. Usa datos sintéticos.

## FIN DEL PROMPT
