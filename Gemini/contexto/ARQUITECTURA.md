# Arquitectura manual para Gemini Chat + Apps Script

## Diferencia deliberada respecto del repositorio original

Esta es una reconstrucción NUEVA. Conserva funciones de negocio y matemáticas, pero
el empaquetado cambia para no requerir herramientas de desarrollo.
NO usar Code.gs/Index.html/SimulationEngine.html generados ni scripts Node.
No mezclar archivos de esta variante con el despliegue de la versión original.

Servidor: módulos .gs planos. Cliente: módulos .html con <script> o <style>.
Main.gs: doGet() evalúa WebApp.html. include_(nombre) devuelve contenido de un archivo
HTML autorizado del proyecto. WebApp incluye módulos estáticos usando
<?!= include_('Nombre'); ?> en orden de dependencias. No se soportan subcarpetas
reales en el editor Apps Script.

Evitar templates anidados sin evaluar. El contenido de cada módulo incluido será
HTML/JS/CSS estático; no dejar <?= ... ?> dentro de los fragmentos esperando evaluación.
Recursos textuales se transfieren una sola vez desde TextResources.gs mediante un
JSON escapado seguro en WebApp, con carga anterior a consumidores.
Serializar <, >, &, U+2028 y U+2029 de modo seguro para evitar cierre de script.
UI estática usa data-i18n y atributos explícitos; UI dinámica usa STText.get(clave)
y textContent/creación DOM. No interpolar texto no confiable como HTML.
Esta API de recursos es nueva y reemplaza los marcadores de build del original.

## Módulos propuestos

| Capa | Archivos |
|---|---|
| Entrada/config | Main.gs, appsscript.json, ApiResponse.gs, TextResources.gs |
| Servidor de casos | AuthService.gs, ConfigService.gs, DriveService.gs, CaseService.gs, PublicDemoCaseFactory.gs |
| Integraciones | SheetImportService.gs, GeminiService.gs |
| Recursos cliente | TextClient.html, DesignTokens.html, Icons.html, UiPreferences.html |
| Estilos | Styles.html, ShellStyles.html, CasesStyles.html, DialogStyles.html, EditorStyles.html, SimulationStyles.html, AnalysisStyles.html, AssistantStyles.html, SheetImportStyles.html |
| Motor | EngineRandom.html, EngineEngineering.html, EngineGeometry.html, EngineValidation.html, EngineRuntime.html |
| UI y estado | ApiClient.html, State.html, Shell.html, Settings.html, CaseGallery.html, EquipmentEditor.html, EquipmentDrag.html, SimulationController.html, Charts.html, Results.html, Comparison.html, WhatIf.html, Assistant.html, SheetImportMerge.html, SheetImport.html, Client.html |
| DOM | WebApp.html |
| Pruebas aisladas | TestPage.html, TestRunner.html, EngineTests.html, ContractTests.html, UiTests.html, ServerTests.gs |

Fijar firmas y dependencias en el plan inicial. Dividir aún más módulos grandes solo
con actualización explícita del inventario y de todos sus consumidores.
Client.html inicializa; no concentra toda la lógica.

Cada módulo cliente usa IIFE/namespace único. EngineRandom → EngineEngineering →
EngineGeometry → EngineValidation → EngineRuntime; sin import/export.
Un único namespace STEngine contiene helpers exportados del motor y la fachada
SimulatorEngine conserva simulateLine/validateSimulationInput/calculateConveyorEngineering.
Los helpers locales permanecen privados. Cargar todos antes de cualquier consumidor.
Las referencias .js están incluidas como .md: adaptar únicamente carga/exportación,
sin cambiar orden de operaciones, fórmulas, PRNG o unidades.

## Pruebas sin terminal

TestPage usa exactamente los mismos módulos de motor y recursos que WebApp; nunca
una segunda copia del algoritmo. Se habilita solo en proyecto de prueba mediante
flag de ScriptProperties y control de identidad. La ruta normal no carga tests.
TestRunner muestra PASS/FAIL, esperado/obtenido, conteo y permite copiar JSON del reporte.
ServerTests.gs expone un runner ejecutable desde el editor, usa dobles inyectados
de Drive/Properties/Sheets/UrlFetch y ninguna llamada real por defecto.
No reemplazar globales Google permanentemente para simularlas.
UiTests usa DOM de fixture, adaptador RPC falso y limpia listeners/estado al acabar.

El usuario abre la página de pruebas o ejecuta el runner desde Apps Script y pega
el reporte en Gemini. Ningún modelo puede declarar ejecución local por inspección.

## Etapas parciales

Solo incluir módulos que ya existen y tienen implementación completa.
Funciones futuras no deben tener botones operativos ni retornos falsamente exitosos.
Mantener tabla inventario/estado; actualizar WebApp/includes en cada lote coherente.

## Despliegue

Archivo manifiesto V8 y zona horaria confirmada. Confirmar USER_ACCESSING frente a
USER_DEPLOYING y quién autoriza acceso. No trasladar identidades de prueba a producción.
Definir scopes de identidad, Drive, lectura Sheets y external requests conforme al
código generado. Distinguir scopes declarados de consentimiento concedido; volver a
autorizar cuando haga falta. La preview de HTML fuera de Apps Script no prueba RPC/OAuth.

Crear/desplegar manualmente desde el editor en un proyecto de prueba; explicar
archivos a crear y qué sustituir. No instalar herramientas ni usar terminal.
