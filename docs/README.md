# Documentación — punto de entrada

## Para reconstruir desde cero con Gemini Code Assist

Leer en orden:
1. [PRODUCT_SPEC.md](PRODUCT_SPEC.md): producto, UX, alcance y requisitos objetivo.
2. [ARCHITECTURE.md](ARCHITECTURE.md): módulos reales, límites y construcción.
3. [CONTRACTS.md](CONTRACTS.md): RPC, datos, motor, Sheets y recursos.
4. [TEST_STRATEGY.md](TEST_STRATEGY.md): pruebas por capacidad y validación real.
5. [prompts/gemini/README.md](../prompts/gemini/README.md): pasos para iniciar.

Estos documentos reemplazan al roadmap inicial como guía de reconstrucción.
No afirman que una especificación resumida reproduzca bit por bit el motor existente.
Código y pruebas de la versión de referencia determinan el comportamiento actual;
requisitos nuevos se implementan y prueban explícitamente. Ante contradicción, registrar
la diferencia y solicitar decisión antes de cambiar semántica matemática.

## Auditoría de documentos anteriores

| Documentos | Uso y precaución |
|---|---|
| 01–07 | Visión/modelo/roadmap iniciales. Incluyen módulos y capacidades futuras: NO lista de funciones implementadas. |
| 08_REFERENCE_ENGINE | Historia del primer motor: buffers abstractos y ausencia de rampas están superados. Ver 16 y motor actual. |
| 09_APPS_SCRIPT_SCAFFOLD | Contexto del scaffold inicial; sus “siguientes pasos” pueden estar terminados. |
| 10_CASE_EDITOR | Referencia de validación, borradores y revisión; complementar con simulations y sourceImport. |
| 11_RUN_WORKSPACE | Playback/controles; la sección que deja persistencia como siguiente paso está superada. |
| 12_REAL_FORMAT_LINE_MODEL | Formato y supuestos originales; prevalece el modelo físico actual descrito en 16. |
| 13_MANUAL_APPS_SCRIPT_UPDATE | Referencia de bundle/despliegue. Nunca combinar Code.gs con los servicios modulares. |
| 14_PUBLIC_DEMO_CASE | Fixture sintético de 13 equipos, no evidencia real de planta. |
| 15_TRANSIENT_STATES_AND_CONTROLS / 16_ACCUMULATION_ZONE_CONTROL | Referencia técnica de estados, geometría y sensores; contrastar fórmulas con código/tests. |
| 17_EXPERIMENTS_AND_COMPARISON | What-If priorizado, no optimizador. Sensibilidad MTBF/MTTR es hipótesis separada. Semilla igual no demuestra causalidad. |
| 18_INTERFACE | Decisiones y evolución UI. La nota antigua “Lock” se refiere al actual cierre de sesión; usar descripción final. |
| 19_SHEET_IMPORT | Referencia detallada del formato, merge selectivo, límites y diagnóstico OAuth. |
| FONT-LICENSE.txt | Conservar si se reutiliza la fuente embebida. |

No se borran documentos técnicos: retienen antecedentes útiles, pero sus propuestas
no amplían automáticamente el alcance aprobado.

## Paquete que se lleva a la carpeta nueva

Copiar docs/ y prompts/ conservando rutas. No copiar credenciales ni datos reales.
schemas/ y examples/ pueden acompañarlos como referencia sintética autorizada.
Para verificar equivalencia exacta, facilitar además tests y motor de referencia de
solo lectura, si está permitido. Mantener el original intacto y el nuevo trabajo en
otra carpeta/repositorio.

No hace falta que una conversación recuerde todo: las fuentes, los contratos,
las pruebas y BUILD_STATUS.md deben mantenerse actualizados en disco.
