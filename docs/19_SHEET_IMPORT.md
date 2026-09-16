# Fixed Google Sheets equipment import

In **Line setup → Import Sheet**, enter a Google Sheets URL or ID and optionally an exact worksheet name. A worksheet name overrides the URL's `gid`; without either, the first worksheet is read. Preview, review the mapping and warnings, then choose **Create simulation**. Save the case to persist the import. The current simulation and its unsaved equipment edits are retained; the imported line is a separate simulation with no old results or scheduled commands.

The importer reads only C1:C7 and A10:W through the last populated row. It never writes to the Sheet, sends import data to Gemini, logs cell contents, or stores import data in browser local storage. The executing Google user must have access to both the target case and the source Sheet. The authenticated server wrapper verifies case ownership first. A preview is a snapshot: Create simulation uses exactly those previewed values, even if the source changes later. Reimport explicitly to read changes.

## Cell contract

| Cells | Field | Use |
|---|---|---|
| C1 | Site | Import metadata |
| C2 | Packaging line | Import metadata |
| C3 | Format Name | Import metadata and new simulation name |
| C4 | Container size (oz) | Import metadata; no unit conversion |
| C5 | Pack pattern (bottles per case) | Import metadata; no bottle/case conversion |
| C6 | Date of analysis | Date serialized as YYYY-MM-DD in the spreadsheet timezone; text retained |
| C7 | By | Import metadata |
| A10 onward | Type | Equipment type; whitespace/hyphen/underscore and letter case normalized |
| B | Name | Equipment name; IDs generated from original row numbers |
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

Mappings and allowed type aliases are centralized in `apps-script/SheetImportService.gs`. The client preview/controller is `SheetImport.html`; modal styling is `SheetImportStyles.html`. Each simulation stores `sourceImport` with source identifiers, time read, metadata, normalized values for every source row, warnings and assumptions. This field survives save/reload and cloning. Source values remain an import snapshot when users later edit equipment.

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

## Deployment and verification

Replace generated **Code.gs and Index.html** together, then update the Apps Script deployment. SpreadsheetApp introduces a Sheets authorization requirement; reauthorize the executing account if prompted. No separate Sheets service or Gemini key is needed for import. Apps Script reference: [SpreadsheetApp.openById](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openbyidid), [Range.getValues and getNumberFormats](https://developers.google.com/apps-script/reference/spreadsheet/range).

Tests use synthetic rows only. They cover all 23 columns, metadata, NA, percent formatting, errors by cell, date serialization, ownership before read, provenance persistence, actual engine reliability events and the UI's preview/cancel/import/save workflow. No confidential plant sheet was accessed. Live Sheets authorization and final rendering must be verified in the deployed Web App.
