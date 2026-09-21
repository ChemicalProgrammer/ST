# Etapa 3 — identidad, preferencias, Drive y simulaciones

Adjunta contratos, ESTADO y versiones vigentes Main, ApiResponse, ServerTests,
TextResources y consumidores existentes. Aplica protocolo.

## INICIO DEL PROMPT

Implementa AuthService.gs, ConfigService.gs, DriveService.gs, CaseService.gs y
PublicDemoCaseFactory.gs. Actualiza Main, diccionario y pruebas afectados.

Login requiere identidad Google verificable y allowlist opcional.
Remember me es solo preferencia cliente, no extensión OAuth.
Verifica propiedad antes de leer/modificar un caso. Carpeta Drive por usuario.
Persistir JSON de caso con simulaciones y revisión; aceptar borrador vacío y
validar geometría solo antes de correr.
saveCase compara expectedRevision; usa protección de concurrencia apropiada para
que lectura/comparación/escritura no acepte dos guardados simultáneos obsoletos.
No afirmar atomicidad por comparar revision fuera de una sección protegida.

CRUD, papelera, clonación de caso/simulación; conservar equipos, IDs y configuración.
Simulación nueva recibe semilla entera inicial; clonar conserva la semilla y limpia
resultados. Semilla almacenada no se regenera al abrir o guardar.
Diferenciar resumen de createCase y caso completo de get/save/cloneSimulation.
Demo sintético de 13 equipos con datos físicos suficientes, nunca pretendidamente reales.

Pruebas servidor con repositorio/servicios inyectados falsos: crear, guardar,
reabrir, aislamiento de propietario, revisión obsoleta, clonación, no aliasing
de objetos, semilla y draft. Incluir fallo de configuración de carpeta.
Pruebas reales de Drive solo como pasos manuales separados en carpeta de prueba
elegida por mí. No crear/borrar datos reales durante el runner de mocks.

## FIN DEL PROMPT
