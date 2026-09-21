# Etapa 4 — interfaz, navegación y editor

Adjunta PRODUCTO, ARQUITECTURA, contratos, ESTADO y versiones vigentes del shell,
recursos, RPC y estado. Aplica protocolo.

## INICIO DEL PROMPT

Implementa ApiClient, State, UiPreferences, Icons, Settings, CaseGallery, Shell,
EquipmentEditor, EquipmentDrag, Client y estilos por responsabilidad, todos .html.
Actualiza WebApp y TextResources; no convertir Client en monolito.
ApiClient adapta google.script.run y permite inyectar un doble para tests.

Flujo real: verificar identidad → Cases únicamente. Manejar loading/error/empty;
el mensaje de carga desaparece al terminar. Sin sidebar ni chat en Cases.
Sidebar solo al abrir caso, tres grupos: simulaciones/Compare; vistas de simulación;
Settings/cerrar caso/cerrar sesión. Colapso arriba, sin scroll horizontal.
Mostrar acceso a futuras vistas deshabilitado y explícito hasta implementar su lógica.

Light predeterminado, Dark/System semánticos, 25 acentos solo en Settings,
tipografía compacta y tokens centralizados. Fuente del sistema sin descargas externas.
SVG homogéneos, icon buttons con tooltip/nombre accesible, foco y reduced motion.
Settings modal con cabecera/pie fuera del scroll, foco, Escape y cambios pendientes.
Selects con espacio interno suficiente para flecha; encabezado distinguible.
Cases search/filter/sort/paginación; editor con controles por tipo, datos físicos
y reordenamiento por arrastre MÁS teclado conservando campos no guardados.

Pruebas DOM con RPC falso: entrada, error recuperable, guardar/reabrir, selección
exclusiva, clonar aparece sin recarga, navegación, cierre sucio y reordenamiento.
No simular éxito en producción. Aportar checklist visual desktop/móvil y temas;
no confundir revisión de CSS con contraste y foco comprobados en navegador real.

## FIN DEL PROMPT
