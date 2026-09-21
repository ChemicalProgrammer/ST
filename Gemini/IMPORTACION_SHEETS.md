# Fixed Google Sheets equipment import

In **Line setup → Import Sheet**, enter a Google Sheets URL or ID and optionally an exact worksheet name. A worksheet name overrides the URL's `gid`; without either, the first worksheet is read. The preview compares the Sheet against the **selected simulation, including its unsaved editor values**. Choose equipment targets and fields, then select **Apply selected changes** and save the case. No new simulation is created.

For an empty simulation, all source equipment is selected for addition in Sheet order. For an existing simulation, unique names and previous import bindings suggest matches. Each row offers **Skip**, **Add as new**, or **Update an existing equipment**. Duplicate/ambiguous names require an explicit choice. A changed name at an old source row is not blindly treated as the same machine. Row moves are handled by names/bindings; the Sheet does not contain a globally unique equipment identifier.

Expand each equipment to compare **Current / Sheet / Status** for every field. Check only the fields to apply. Maximum and nominal speed are separate selections even though F initializes both for new equipment. Metadata has its own selections. Nonmissing differences are selected by default for matched equipment; NA is unchecked to avoid clearing existing values accidentally. Explicitly selecting NA clears that field. MTBF/MTTR must still form a valid pair (both positive or both missing) after merging.

Existing equipment retains its ID, position, custom settings and unselected fields. New equipment is appended; source rows absent from the Sheet never delete existing equipment. No scheduled control commands are removed. Source errors disable the affected cells rather than blocking updates to unrelated valid fields. New equipment still needs a name and positive nominal speed. Selecting two Sheet rows to update the same equipment is blocked.

Changed equipment invalidates **only the active simulation's results/replay**, and the UI asks for a new run. Other simulations keep their equipment and results. Metadata-only changes preserve results. Nothing selected/no effective changes disables Apply. A stale preview or response for a different case/simulation is rejected. Cancel applies nothing.

The importer reads only C1:C7 and A10:W through the last populated row. It never writes to the Sheet, sends import data to Gemini, logs cell contents, or stores import data in browser local storage. The executing Google user must have access to both the target case and the source Sheet. The authenticated server wrapper verifies case ownership first. A preview is a snapshot: Apply selected changes uses exactly those previewed values, even if the source changes later. Reimport explicitly to read changes.

## Cell contract

| Cells | Field | Use |
|---|---|---|
| C1 | Site | Import metadata |
| C2 | Packaging line | Import metadata |
| C3 | Format Name | Import metadata; never rename the existing simulation automatically |
| C4 | Container size (oz) | Import metadata; no unit conversion |
| C5 | Pack pattern (bottles per case) | Import metadata; no bottle/case conversion |
| C6 | Date of analysis | Date serialized as YYYY-MM-DD in the spreadsheet timezone; text retained |
| C7 | By | Import metadata |
| A10 onward | Type | Equipment type; whitespace/hyphen/underscore and letter case normalized |
| B | Name | Equipment name; New IDs must be collision-safe; original row numbers belong in provenance, not identity matching |
| C | Critical Y/N | Critical marker; not an automatic pacemaker designation |
| D / E | MTBF / MTTR (min) | `noiseProfile.reliability` and original equipment parameters |
| F | Machine max speed (bpm) | `maximumSpeedBpm`; initializes nominal speed as F / 60 |
| G / H | Lact / Lp (mm) | Conveyor installed length and Prime reserve |
| I / J | Discharge actual / Coding actual (mm) | Preserved as `actualDischargeMm` / `actualCodingMm`; not equated to stop/reject runout |
| K / L | Package length / Discharge pitch (mm) | Physical package length and discharge pitch |
| M | Upstream startup time (s) | Startup model and recovery calculations |
| N | Bottles discharged at stop | Upstream data; for conveyor rows also accumulation residual discharge |
| O | Downstream infeed pitch (mm) | Downstream geometry input |
| P | Ramp-up including Prime delay (s) | Stored total used as ramp duration; see limitation below |
| Q | Speed factor vs discharge (%) | Existing conveyor speed increase input |
| R | Coding factor vs previous (%) | Preserved; not used by current engine |
| S | Conveyor factor vs previous (%) | Preserved; not used by current engine |
| T / U | Back-up blocked / clear delay (s) | Conveyor sensor debounce |
| V | Insurance factor (packages) | Overflow margin |
| W | Overspeed vs infeed screw (%) | Preserved; current recommendation still uses its existing 5% assumption |

Mappings and allowed type aliases are centralized in `SheetImportService.gs`. The client preview/controller is `SheetImport.html`; pure matching/field-merge logic is `SheetImportMerge.html`; modal styling is `SheetImportStyles.html`. Each simulation stores `sourceImport` with source identifiers, time read, effective selected metadata, normalized preview values for every source row, warnings and assumptions. `bindings` tracks source names and equipment IDs; `lastApplied` records the selected cells and their before/after values. Raw `rows` describes what was read, not a claim that every value was applied. This field survives save/reload and cloning. Source values remain an import snapshot when users later edit equipment.

## Missing values and validation

- Blank, NA and N/A are missing/not applicable, never automatically zero. Spreadsheet formula errors such as #N/A or #DIV/0! in numeric fields are errors.
- MTBF/MTTR must both be positive minutes or both missing. Both missing disables reliability failures for that equipment and emits a warning. Zero is not treated as an infinite MTBF. Import introduces no synthetic micro-stops.
- Machine maximum speed must be positive. When a conveyor has NA in F, its nominal throughput reference is taken from the immediately preceding machine with an explicit warning; physical belt velocity remains geometry-driven. No valid reference is an import error.
- Numeric percent-formatted cells are converted from Sheets fractions to percentage points: 0.05 stored as 5% becomes 5. A plain numeric 5 or text `5%` also becomes 5. Q means **increase**, so 5 becomes a speed multiplier of 1.05, not 0.05.
- Numeric Sheets cells work independently of display locale. Ambiguous numeric text with comma separators is rejected; use real numeric cells.
- Entirely blank/NA rows are skipped without changing the order of remaining equipment; diagnostics keep the original row numbers.
- Missing conveyor geometry can be imported as a draft, with the existing engine validator's findings displayed in the preview. Invalid physical data must be corrected before a successful run.
- At most 1,000 equipment rows are supported. Content below row 1009 causes an explicit limit error, not silent truncation.

## Current model boundaries

MTBF generates seeded exponential time-to-failure intervals. MTTR is a **fixed repair duration**, not a sampled repair-time distribution. The current failure clock advances in AUTO/MANUAL, including starving and blocking; it pauses for manually stopped modes and micro-stops. These semantics are unchanged by import. Plant MTBF must be interpreted with that clock definition in mind.

All throughput uses bottle-equivalent units. Max speed initializes nominal speed because the format does not provide a separate operating speed. C5 does not convert case packer or palletizer throughput to a different unit of flow.

I/J have deliberately not been reinterpreted as discharge/reject runout: those meanings are not established by the supplied labels. I/J and R/S/W are fully retained but do not modify the current engine calculation. The worksheet also lacks an installed Back-up position and upstream stop-response time. The existing engine derives a Back-up recommendation and defaults absent runout/response values to zero; inspect/edit those controls in Line setup. No fabricated plant measurements are added.

P combines ramp-up and Prime delay. The existing engine consumes a ramp duration and separately models physical Prime readiness; it cannot separate components of the supplied total. This limitation is shown before import. The critical-machine flag is retained without changing the existing pacemaker/OEE reference selection.


## Contrato fijo Sheets

Metadatos C1:C7: site, packagingLine, formatName, containerSizeOz, bottlesPerCase,
dateOfAnalysis, by. Equipos desde fila 10, máximo 1,000 filas.

| Columna | Campo | Unidad |
|---|---|---|
| A/B/C | type / name / critical Y/N | texto |
| D/E/F | mtbfMinutes / mttrMinutes / maximumSpeedBpm | min / min / BPM |
| G/H | lactMm / lpPrimeMm | mm |
| I/J | actualDischargeMm / actualCodingMm | mm, conservar sin reinterpretar |
| K/L | packageLengthMm / dischargePitchMm | mm |
| M/N | startupTimeSeconds / bottlesDischargedAtStop | s / unidades |
| O/P | infeedPitchMm / rampUpTimeSeconds | mm / s |
| Q | conveyorSpeedFactorVsDischargeVelocityPercent | incremento % |
| R | codingConveyorSpeedFactorVsPreviousConveyorPercent | % conservado |
| S | conveyorSpeedFactorVsPreviousConveyorPercent | % conservado |
| T/U | blockedTimeDelaySeconds / clearTimeDelaySeconds | s |
| V | insuranceFactorUnits | unidades |
| W | overspeedVsInfeedScrewPercent | % conservado |

Nombre de pestaña explícito > gid de URL > primera pestaña.
NA/N/A/vacío = ausente, no cero. Error de fórmula es error, no NA.
MTBF/MTTR ambos positivos o ambos ausentes. Porcentaje Sheets 0.05 formateado como
5% = 5 puntos porcentuales; Q=5 representa factor 1.05.
I/J/R/S/W se conservan sin atribuirles cálculos no implementados. P combina ramp-up
y retraso Prime; registrar esa limitación, no inventar su separación.

Preview compara con valores actuales incluso sin guardar; selección por fila/campo:
omitir, agregar, actualizar. Matching por nombre único/binding; ambigüedad requiere
elección. Preservar ID, orden y campos no seleccionados del equipo existente.
NA desmarcado por defecto; marcado explícitamente puede limpiar un campo válido.
Impedir dos filas actualizando el mismo equipo. Cancelar/no-op no cambia nada.
Cambio de equipo invalida solo resultados de la simulación activa; metadatos no.
Rechazar respuestas tardías de otro caso/simulación. sourceImport preserva snapshot,
bindings y lastApplied. No escribir en Sheet ni enviar importación a IA.



## Authorization and diagnostics

Use the flat modules described in ARQUITECTURA_Y_CONTRATOS.md, never the original
generated Code.gs/Index.html bundles. Declare the Sheets scope appropriate to the
implemented SpreadsheetApp operations and obtain consent from the executing
account. A manifest entry alone is not a granted permission. Distinguish deployed
version, executing identity, authorization failure, missing file access and format
validation. Import needs no Gemini API key or AI interpretation.

Return an import version and stable English error code with a safe English
application message. Preserve relevant original Google diagnostics as plain text
without credentials or cell contents. Do not replace every failure with a generic
URL/access error. Unit mocks cannot verify actual OAuth grants or deployment state.
Verify the selected deployment version and reauthorization separately with the user.
