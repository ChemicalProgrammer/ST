# Especificación del producto — reconstrucción desde Gemini Chat

## Alcance y autoridad

Referencia funcional auditada: ChemicalProgrammer/ST, commit 8d49bf304c6f747a5a5a7c3e5e8373290ea94110.
Esta especificación define el objetivo, no certifica lo implementado. Lee [arquitectura y contratos](ARQUITECTURA_Y_CONTRATOS.md). Las pruebas se entregan y ejecutan por etapa según [VALIDACION.md](VALIDACION.md).

Reconstruir en una carpeta nueva; no modificar el proyecto de referencia ni su
despliegue. Trabajar por capacidades completas con sus pruebas, no por archivos aislados.
El código actual puede consultarse como referencia si está autorizado; no se exige
copiarlo. Sin referencia ejecutable no se puede prometer equivalencia numérica exacta.

## Flujo operativo y aceptación

| Capacidad | Comportamiento y criterio de aceptación |
|---|---|
| Acceso | Verificar identidad Google en servidor. Recordar entrada solo guarda una preferencia; no extiende OAuth. Al cerrar sesión se limpia el workspace cliente, no la sesión Google global. |
| Cases | Después de autenticar mostrar solo los casos del usuario. Búsqueda, filtro, orden, lista/grid y paginación. Empty/error/loading states. Sin sidebar ni panel Gemini. |
| Persistencia | Carpeta Drive configurable; crear, abrir, guardar, clonar y enviar casos a papelera. Comprobar propiedad y revisión antes de guardar. |
| Simulaciones | Varias por caso, nombres iniciales A/B/C; selección exclusiva. Conservar equipos, configuración, resultados y replay al guardar/abrir. Clonar conserva semilla y parámetros, pero requiere nueva corrida. |
| Line setup | Editor modular de equipos y geometría; acciones compactas, drag-and-drop y alternativa por teclado; mantener valores no guardados al reordenar. |
| Importación | Leer formato fijo Sheets dentro de la simulación activa, mostrar diferencias y permitir aplicar campos seleccionados. No crear otra simulación ni borrar equipos ausentes. |
| Simulation | Motor determinista, configuración de tiempo y semilla, comandos programados/directos, reproducción independiente del cálculo, estados y mini-gráficas por equipo. |
| Results | Producción, throughput, OEE, pérdidas, comparación por equipo y gráficas; export JSON. Mostrar unidades y supuestos, no inventar datos ausentes. |
| What-If | Una recomendación priorizada con evidencia y cambio explícito, o explicar por qué no hay propuesta. Crear escenario separado; no prometer mejora antes de simularlo. |
| Compare | Vista separada. Seleccionar dos simulaciones, comparar configuración y resultados por ID; diferencias absolutas/relativas, advertencias de semilla/duración. |
| Gemini | Panel derecho colapsable/redimensionable con teclado. Enviar pregunta solo por acción explícita, con caso y resultados guardados; indicar que ediciones sin guardar no se incluyen. |
| Settings | Modal con encabezado/pie fijos y cuerpo desplazable, Escape, foco y cierre visible. Guardar configuración; apariencia inmediata. |

## Diseño

Light predeterminado, Dark y System con paletas semánticas propias. Tema y al menos
25 colores de acento solo en Settings. El acento no cambia el significado de estados.
Textos centralizados en TextResources.gs; recursos visuales en DesignTokens.html. En esta reconstrucción los nombres son de archivos planos del editor Apps Script.
Tipografía compacta, fuente del sistema o libre embebida con licencia, sin fuentes remotas.
SVG coherentes, currentColor, tooltips y nombres accesibles para iconos sin texto.
Estados hover/focus/selected/disabled; animación breve y prefers-reduced-motion.

Sidebar solo en caso abierto, sin scroll horizontal, tres grupos:
simulaciones + Compare; Line setup/Simulation/Results/What-If; Settings/cerrar caso/cerrar sesión.
Colapso arriba. Encabezado principal reconocible. Bordes de estado uniformes.
Controles por equipo en rejilla de dos columnas y tres filas cuando corresponda.
Panel Gemini sin espacio vacío superior, ancho ajustable limitado por viewport.
Responsive sin scroll horizontal global; tablas/gráficas pueden tener scroll local.

## Reglas del modelo

- Geometría física obligatoria: secuencia máquina → conveyor → máquina, transporte,
  acumulación, Prime y Back-up; no reemplazar por buffers abstractos.
- MTBF en minutos: intervalos exponenciales sembrados. MTTR: reparación fija en minutos
  convertida a segundos. Sin MTBF/MTTR no inventar fallas; no introducir microparos al importar.
- El reloj de fallas del modelo actual avanza en AUTO/MANUAL incluyendo starving/blocking,
  pero no en modos de paro manual ni microparos. Preservar y documentar esta interpretación.
- Longitud, sensores y rampas pueden modificar las pérdidas de interacción. No modificar
  MTBF/MTTR implícitamente para representar esas mejoras.
- Semilla inicial automática para simulaciones nuevas es requisito objetivo; en la base
  revisada existe un valor predeterminado de interfaz, no generación nueva por simulación.
  Tratar su implementación como cambio explícito probado, no como comportamiento ya existente.
- Misma semilla no garantiza por sí sola idénticos eventos entre modelos diferentes:
  también importan consumo del generador, orden de equipos, comandos y reloj de fallas.
- OEE actual asume calidad 100%; pérdidas sumadas entre equipos pueden solaparse.
  No confundir equipo-minutos con minutos transcurridos de paro de línea.
- No habrá validación contra producción real de planta en esta etapa. Usar pruebas
  sintéticas y de consistencia; identificar resultados como estimaciones del modelo.

## Fuera de alcance inicial

PLC en vivo, calibración contra históricos, optimizador automático multisemilla,
DOE, PDFService, AIManager, servicios Python y promesas de retorno CAPEX.
No incorporar módulos de roadmaps antiguos sin una decisión explícita.

El What-If de referencia incluye sensibilidad de mantenimiento (MTBF × 1.20,
MTTR × 0.85). Preservarla identificada como hipótesis de mantenimiento, nunca como
consecuencia automática de optimizar conveyors. Eliminarla requeriría aprobar ese cambio.

## Language requirement — mandatory

The generated application and its code must be entirely in English. This includes
navigation, labels, dialogs, tooltips, accessible names, loading/empty/error states,
charts, reports, exports, demo content, app-authored assistant instructions and its
default responses, filenames, identifiers, comments, docstrings, test descriptions
and application technical documentation. Use English text resource keys and values;
centralize all app-authored strings in TextResources.gs. Do not scatter English
literals through UI modules. Technical enums, schemas and public contracts remain
stable; do not rename them casually.

Preserve user-entered names, imported spreadsheet values and original external
service diagnostics verbatim; these are data, not application translations.
Wrap service diagnostics with an English application message. Do not translate
secrets, IDs or payload values. The development conversation and this attachment
guide may remain in Spanish. This is a decided requirement, not a question to ask
again before generating the application.

## Forma de trabajo con Gemini Pro

Protocolo de entrega por capacidades:

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

## Orden de construcción

Cada lote debe ser utilizable y comprobable; no generar toda la aplicación en una
respuesta ni trabajar archivo por archivo sin sus consumidores.

1. Acordar inventario, contratos pendientes, fixtures, recursos y runners. Entregar una base mínima que cargue y muestre pruebas reales.
2. Adaptar motor y validar determinismo, física y confiabilidad con los cinco archivos de referencia.
3. Implementar identidad, casos, Drive, revisión y persistencia con dobles de servicios.
4. Construir shell, Cases, Settings, recursos de inglés, temas y editor.
5. Conectar simulación, controles, reproducción y resultados reales del motor.
6. Agregar importación con preview y mezcla selectiva dentro de la simulación activa.
7. Implementar Compare y What-If como vistas distintas.
8. Agregar asistente Gemini con integración servidor, contexto guardado y manejo de errores.
9. Auditar integración completa y ejecutar recorrido manual de VALIDACION.md.

La suscripción al chat no demuestra acceso a Gemini API. Sin API, el resto de la
aplicación debe funcionar y el asistente debe mostrar una explicación real.
