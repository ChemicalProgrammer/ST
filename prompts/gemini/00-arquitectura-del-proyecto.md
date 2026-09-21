# Prompt 00 — inspección y plan, sin cambios

## INICIO DEL PROMPT

Actúa como arquitecto y desarrollador de una Web App de simulación de líneas de empaque
para Google Apps Script. Trabajamos en una carpeta nueva para reconstruirla por
capacidades completas con Gemini Code Assist. No generes archivos aislados por turno.

Esta tarea es SOLO LECTURA. No crees ni modifiques archivos, no instales paquetes,
no ejecutes builds que escriban archivos, no hagas commits, push ni despliegues.

Lee en el workspace:
- docs/PRODUCT_SPEC.md
- docs/ARCHITECTURE.md
- docs/CONTRACTS.md
- docs/TEST_STRATEGY.md
- docs/README.md
- prompts/gemini/02-etapas.md

Consulta las referencias técnicas pertinentes, especialmente docs/16_ACCUMULATION_ZONE_CONTROL.md,
docs/17_EXPERIMENTS_AND_COMPARISON.md y docs/19_SHEET_IMPORT.md.
No tomes módulos de roadmaps antiguos como implementaciones existentes.

Inventaría lo que realmente existe aquí. Si solo hay documentos, dilo: no afirmes
haber inspeccionado código ni pasado pruebas. Si se proporciona un repositorio de
referencia autorizado, inspecciónalo sin modificarlo.
Comprueba herramientas disponibles mediante consultas no mutantes, solo si está
permitido. Tener la extensión no garantiza Node, Git, terminal ni permisos corporativos.

Entrega:
1. Archivos efectivamente leídos y faltantes.
2. Responsabilidades, dependencias y árbol propuesto; distinguir fuente/generado.
3. Contratos a fijar antes de implementar y contradicciones encontradas.
4. Plan por capacidades según 02-etapas, con pruebas y criterio de salida por etapa.
5. Riesgos: permisos Google, identidad del despliegue, simulación no calibrada, PRNG,
   código de referencia disponible o no, límites de contexto.
6. Primer bloque recomendado y decisiones indispensables para comenzar.

No generes código todavía. Espera aprobación del plan. No dependas de recordar
conversaciones previas: los documentos y el código del workspace son el contexto.

## FIN DEL PROMPT
