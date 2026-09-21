# Etapa 1 — base y pruebas sin terminal

Adjunta el plan aprobado, los tres contextos y ESTADO_PROYECTO.
Aplica 01_PROTOCOLO.

## INICIO DEL PROMPT

Implementa la base mínima ejecutable en un proyecto nuevo de Apps Script.
Archivos previstos: Main.gs, ApiResponse.gs, TextResources.gs, TextClient.html,
WebApp.html, DesignTokens.html, Styles.html y manifiesto appsscript.json.
Añade TestPage.html, TestRunner.html, ContractTests.html y ServerTests.gs.
Solo crea módulos completos de esta etapa. No incluir módulos futuros inexistentes.

doGet evalúa WebApp; include_ carga nombres permitidos. El primer flujo solo necesita
mostrar una página de inicio clara y una indicación de que las capacidades siguientes
aún no están implementadas; no simular login o guardado exitoso.
Definir scopes requeridos por servicios realmente usados y explicar ampliación posterior.
Confirmar modo de identidad antes de fijar un manifiesto con consecuencias de acceso.

Un único diccionario servidor se serializa a JSON seguro en la plantilla principal.
No templates anidados sin evaluar dentro de fragmentos. Implementa STText.get y
aplicación a data-i18n/atributos admitidos. Probar clave ausente, comillas, &, <,
cierre de script, saltos de línea y U+2028/U+2029 sin ejecución de HTML.
No usar innerHTML con textos/datos sin escape contextual.

TestPage se habilita solo mediante flag de pruebas y autorización de identidad,
no expone datos ni claves. Runner muestra cada caso y permite copiar un JSON.
ServerTests ejecutable desde el editor con servicios falsos inyectados;
ningún acceso real a Drive/Sheets/HTTP por defecto.
Módulos de tests no se cargan en WebApp normal.
Agrega al runner un test deliberadamente fallido documentado, ejecutable por separado,
para comprobar que informa FAIL; excluirlo de la suite normal.

Entrega pasos manuales para crear archivos .gs/.html y abrir pruebas; no comandos
de terminal. Cierra con revisión cruzada de includes, recursos y firmas y solicita
mi reporte real antes de seguir.

## FIN DEL PROMPT
