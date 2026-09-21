# Validation and acceptance

The generated tests, test reports and app-authored messages must be in English.
This plan is a specification, not evidence that any test has run.

## Execution without terminal

Use TestPage.html with the actual production engine modules and an English browser
runner: PASS/FAIL, expected/actual, counts and copyable JSON. Use ServerTests.gs
from the Apps Script editor with injected service doubles. No real Drive, Sheets
or Gemini writes/calls in unit tests by default. Keep tests behind a test-project
flag and identity check; production UI must not load test suites.
UI tests use isolated DOM fixtures and a fake RPC adapter, then clean up state and
listeners. Do not mock Google globals permanently or test a duplicate algorithm.

Each capability includes meaningful success, failure and boundary tests. Report
static review, pending execution and execution supported by a user-provided report
separately. Never invent test results. Do not weaken expectations to make a failure pass.

## Required coverage

| Area | Checks |
|---|---|
| Resources | All keys resolve; no repeated UI literals; English UI, comments and tests; safe quotes, line breaks, HTML and script-closing text; user/imported values preserved |
| Assembly | Existing includes in dependency order; no duplicate globals/DOM IDs; no unresolved templates, imports, npm or CDN; tokens and selectors resolve |
| Engine | Same input/seed yields same output; seed survives reopen/clone; units, validation, commands and event ordering; synthetic expected fixtures independently justified |
| Physics | Empty start, travel time, stopped conveyor, Prime readiness, sustained Back-up, residual discharge, clear delay, capacity/overflow and audit boundaries |
| Reliability | Positive pair or absent pair, fixed MTTR, seeded failure schedule, correct clock in running/starved/blocked/manual-stop/microstop; no asserted exact MTBF in a short run |
| Results | Real engine output, missing versus zero, units, replay, samples, export; no counting overlapping equipment loss as line downtime |
| Persistence | Identity/ownership before access, revision conflict under lock, create/save/reload/clone/trash; results and sourceImport survive appropriately |
| Sheets | C1:C7 and all A:W columns, numbers, NA, formula errors, percent formatting, timezone dates, 1,000-row limit, tab precedence, ownership before read |
| Merge | Unsaved values, empty simulation, selective changes, NA clearing, ambiguous names, row moves/renames, duplicate targets, custom data/IDs/order/commands preserved |
| Import lifecycle | Cancel/no-op unchanged; stale replies rejected; only changed equipment invalidates active results; metadata keeps results; other simulations unaffected; save/reload provenance |
| Compare | ID matching, changed parameters, seeds/durations, absolute/relative deltas, zero baseline, OEE percentage points, missing results, no causal guarantee from seed alone |
| What-If | One prioritized suggestion or explicit insufficient evidence; only listed changes; clone keeps seed and baseline; maintenance sensitivity labeled as hypothesis |
| Assistant | Server-only key, ownership before HTTP, saved context notice, limits/errors/timeouts, safe response text, English default, conversation reset across case/session |
| UI | Cases-only landing, sidebar only in case, separate Compare/What-If, settings fixed header/footer, no stuck loading, resizing/collapse, drag plus keyboard fallback |
| Appearance | Light/Dark/System, 25+ accent choices in Settings only, evidence/charts themed, semantic state colors unaffected by accent, contrast and clear focus |
| Accessibility | Icon tooltips/names, focus trap/return/Escape, keyboard flows, reduced motion, responsive layout and no global horizontal overflow |

Compare adapted engine output against reference fixtures when available. Without
that execution, record equivalence as unverified. This stage does not calibrate
against plant production results.

## Integration gate

Maintain file → version → dependencies → contract → test → execution status.
Recheck RPC envelopes separately from engine result shapes; inspect IDs, enums,
units, resources, tokens and persisted schema against all producers/consumers.
Missing file versions must be requested, not inferred from chat memory.

Run browser/server suites, then in a separate test Apps Script project:
login → configure test Drive storage → create case → add/import equipment → run →
save → reopen → clone → change a parameter → run → compare → inspect What-If →
use Gemini if authorized → close case → sign out.
Verify Light/Dark/System, keyboard, modal scroll, panel resizing, small screens and
unsaved-change handling. Use synthetic data. Live checks need user execution and
real permission; mocks do not prove Google authorization.

Document mode of execution, scopes, actual consent, deployment version, test reports
and unresolved limitations. Do not call the app deployed or verified before the
user provides the corresponding evidence. Update ESTADO_PROYECTO after each lot.
