# Etapa 6 — importación selectiva

Adjunta contexto/19_SHEET_IMPORT.md, contratos, ESTADO y versiones vigentes de
editor/state/Main/CaseService/recursos/tests. Aplica protocolo.

## INICIO DEL PROMPT

Implementa SheetImportService.gs, SheetImportMerge.html, SheetImport.html y estilos,
con preview dentro de la simulación ya abierta, incluyendo sus ediciones no guardadas.
La referencia 19 describe reglas de datos; ignora sus instrucciones de bundles/Node.

Contrato C1:C7 y A10:W, todas las columnas; nombre de tab > gid > primera hoja.
NA/vacío ausente, errores de fórmula son errores; pares MTBF/MTTR válidos,
porcentajes formateados, unidades, límites de filas y diagnósticos por celda.
Preservar I/J/R/S/W sin atribuirles efecto no implementado.
P combina ramp-up/Prime: mostrar limitación. No inventar microparos.
Propiedad de caso antes de leer Sheet; fuente solo lectura.

Preview Current/Sheet/Status con selección de campos y omitir/agregar/actualizar,
matching por nombre/binding y ambigüedad explícita.
Preservar IDs, campos no seleccionados, orden existente y otras simulaciones.
No borrar equipos ausentes. NA no seleccionado por defecto; limpiar solo explícitamente.
Cambios efectivos de equipo invalidan solo resultados activos, metadatos no.
Cancelar/no-op no cambia estado. Respuestas tardías/preview desactualizado se rechazan.
Persistir procedencia y lastApplied al guardar.

Pruebas con Sheet falso: cada columna y metadato, porcentajes, errores, NA,
duplicados, matching tras rename/row move, selección parcial, cancel, stale response,
simulación vacía, otra simulación conservada, guardar/reabrir.
Manual OAuth en hoja sintética separado de tests. Errores deben distinguir permisos,
tab inexistente y archivo no nativo; no recomendar cambiar cuentas sin evidencia.

## FIN DEL PROMPT
