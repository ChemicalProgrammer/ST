# Etapas ejecutables — una por tarea

Usar cada bloque junto al protocolo 01. Cada etapa incluye pruebas; 08 es integración
final, no el primer momento para probar. Si faltan contratos de una dependencia,
definirlos con fixtures y mocks antes de consumirla. No crear botones que aparenten
ejecutar funciones aún no implementadas.

## 01 — Base, contratos y construcción

Crea estructura modular descrita en ARCHITECTURE, package.json, esquemas y fixtures
sintéticos. Define herramientas de build y runner de pruebas; solicita autorización
antes de instalar dependencias. Preserva separación draft/simulation-ready y sobre
Case/Simulation. Crea un smoke test ejecutable. Generadores deben fallar claramente
si faltan fuentes; no simules bundles completos cuando faltan capacidades.
Salida: estructura y contratos acordados, smoke test real o limitación registrada.

## 02 — Motor físico determinista

Implementa los cinco módulos puros del motor, validador y bundle browser. Lee 16,
contratos y fixtures antes de escribir fórmulas; si se dispone de referencia, compara
casos idénticos. Incluye transporte, capacidad, Prime/Back-up, rampas, pausas,
emergencia, microparos, MTBF exponencial y MTTR fijo, OEE y procedencia.
Salida: tests de repetibilidad, causalidad física de transporte y sensores, flujo
no negativo, unidades y equivalencia Node/browser. No añadir calidad ficticia.

## 03 — Acceso, configuración y casos persistidos

Implementa RPC Main, errores, autenticación, settings, Drive, CaseService y factories.
Preserva propiedad, revisión, múltiples simulaciones, clonación e IDs de equipos.
Implementa semilla inicial sin entrada manual; conservarla al clonar es obligatorio.
No conectar datos reales. Crea recorrido con mocks crear/guardar/reabrir/clonar/conflicto.
Salida: payloads compatibles con contratos y ninguna clave en respuestas cliente.

## 04 — Sistema visual y flujo inicial integrado

Implementa tokens, diccionario, iconos, fuente autorizada y estilos por responsabilidad.
Implementa WebApp, preferencias, login, Cases y Settings conectados a RPC mock.
Light por defecto, Dark/System, 25 acentos solo Settings, foco, Escape, encabezado/pie
fijos, search/filter/paginación. Usa el motor/servicios existentes, no mocks en producción.
Salida: entrada Cases funcional sin sidebar, errores de red recuperables y tests DOM,
recursos, selectores y contraste. Registrar revisión visual pendiente si no hay navegador.

## 05 — Workspace, editor, simulación y resultados

Integra sidebar de tres secciones, selección de simulación, edición y reordenamiento
accesible, ejecución y playback con motor real. Guardar/reabrir resultados y replay,
controles compactos, estados y gráficas semánticas. Agrega Results y export JSON.
Implementa múltiples archivos relacionados y sus pruebas, no solo el layout.
Salida: recorrido crear caso → editar → correr → guardar → reabrir → clonar; estado de
otras simulaciones preservado. Cambiar playback no cambia matemáticas.

## 06 — Importación selectiva de Sheets

Implementa lector servidor, parser fijo C1:C7/A10:W, merge puro y preview accesible
dentro de la simulación activa. Lee 19_SHEET_IMPORT completo. Maneja NA, porcentajes,
MTBF/MTTR, nombres duplicados, gid, permisos, errores por celda y respuestas tardías.
Salida: cancel/no-op preservan datos, selección parcial conserva campos y otras
simulaciones, cambios efectivos invalidan solo resultados correspondientes.
Probar guardar/reabrir sourceImport y metadatos. Solo mocks y Sheet sintético autorizado.

## 07 — Comparación, What-If y panel Gemini

Implementa comparación por IDs, todas las diferencias de configuración relevantes,
deltas absolutos/relativos y advertencias. What-If separado con evidencia y una
propuesta priorizada, sin inventar ganancia. Sensibilidad de mantenimiento explícita.
Implementa chat Gemini servidor/cliente, clave privada, contexto guardado, límites,
manejo seguro de respuestas, panel colapsable y redimensionable con teclado.
Salida: tests sin HTTP real para propiedad, claves, fallos y límites; flujo A/B/Compare
y limpieza de conversación sin afectar resultados guardados.

## 08 — Ensamblado, regresión y aceptación

Usa 03-integracion.md. Completa generadores, suites, revisión DOM/bundles y evidencia.
No cambiar expectativas matemáticas por conveniencia. Entrega ambos bundles coherentes
si el modo elegido es bundle. No desplegar sin autorización.
Salida: matriz con aprobado/fallido/no ejecutado y pasos manuales de Apps Script;
ninguna capacidad pendiente escondida en TODO ni declarada terminada.
