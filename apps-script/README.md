# Recursos de la aplicación

`TextResources.gs` reúne etiquetas, mensajes y ayudas de interfaz con claves descriptivas. Cambia los valores conservando las claves y los espacios de los fragmentos de mensajes. `DesignTokens.html` define los recursos visuales.

Los módulos usan `__ST_TEXT__('clave')` para cadenas JavaScript, `__ST_HTML_TEXT__('clave')` para texto en HTML dinámico y `<?= __ST_TEXT__('clave') ?>` en las vistas. Los textos se resuelven durante la generación o al cargar los módulos en Apps Script, sin solicitudes adicionales del navegador. Después de editar recursos, regenera los archivos con `npm run build:apps-script`.

`Code.gs` e `Index.html` son archivos generados. Los módulos conservan la lógica de la aplicación; los identificadores técnicos, datos del usuario y parámetros del motor no son textos de interfaz.
