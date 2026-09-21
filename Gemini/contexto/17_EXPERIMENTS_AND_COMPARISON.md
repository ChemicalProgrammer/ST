> Referencia técnica del proyecto original. Para esta reconstrucción, las instrucciones
> de build, bundles, Node y despliegue de esta referencia NO se aplican: usar
> [ARQUITECTURA.md](ARQUITECTURA.md). Conservar reglas físicas y de datos.

# Simulation analysis and What-If comparison

The Run Workspace has two different kinds of evidence. They should not be
interpreted as the same result.

| Evidence | Source | Varies by seed/run duration? |
| --- | --- | --- |
| Conveyor design audit | Geometry, rates, sensor positions, delays, runout and insurance margin | No |
| Dynamic run metrics | Time-stepped material flow, controls, failures and micro-stops | Yes |

The audit is a deterministic design check. It is recalculated when conveyor
inputs are resolved; it is not an average of the simulation samples. A `PASS`
means the known worksheet rules did not find a violation. It does not prove
that the conveyor is globally optimal or that a PLC design has been validated.

## Workflow

1. Run **Simulation A** with a virtual duration, command schedule and random
   seed that represent the question being studied.
2. Read **What this run indicates**. It combines one dynamic run with the
   physical conveyor audit and identifies the highest-priority issue.
3. If enough physical input exists, select **Create recommended Simulation B**.
   The Case saves a clone of A and applies only the listed input change. When
   input is incomplete, the panel explains what must be entered instead of
   inventing a change.
4. Review the cloned configuration, run B, and save it. The source result and
   its replay stay stored in A; B stores its own result and replay.
5. Open **Comparison**, choose A and B, and inspect every saved configuration
   and result field. Values that differ are highlighted.

There is deliberately no multi-seed batch experiment or automatic numerical
optimizer in the web app. One simulation answers one explicit engineering
question; the user decides whether the resulting change is worth testing.

## A direct A/B comparison

MTBF/MTTR failures and micro-stops are seeded. To attribute a difference to a
saved configuration change rather than a different random realization, run A
and B with the same seed and virtual duration:

```
delta = Simulation B metric − Simulation A metric
```

The Comparison panel labels a result pair as **Paired run** only when both of
those values match. It still shows different-seed results, but marks them as a
descriptive comparison rather than direct causal evidence.

For `Output`, `Rate`, and `OEE`, a positive delta is normally favorable. For
`Starved`, `Blocked`, `Failure`, and `Overflow`, a negative delta is normally
favorable. A favorable output does not justify a non-zero overflow.

## Evidence-led recommendations

The recommendation is not a fixed factor. It is ranked from the selected
conveyor's audit and this run's stored counters:

| Finding | Saved successor change | Boundary |
| --- | --- | --- |
| Installed length, Back-up position, or recovery margin fails | Set Back-up to calculated `L_bu` and solve for the minimum modeled `L_act` with all three recovery checks passing | High CAPEX; only when geometry inputs are complete |
| Back-up blocked/clear debounce is no longer than normal product pulses or gaps | Set each confirmation timer just above its modeled normal pulse/gap | Zero CAPEX; a simulated PLC setting to review with controls engineering |
| Current speed factor differs from calculated downstream infeed demand | Set the factor to the calculated infeed speed factor | Zero CAPEX; does not override a higher-priority geometry failure |
| Intrinsic failure loss / availability is poor | MTBF × 1.20 and MTTR × 0.85 sensitivity case | Low CAPEX/OPEX sensitivity only; it is not a maintenance promise |

If no material issue is detected, the panel recommends no automatic change.
Use **Clone Simulation** when you have a specific hypothesis not covered by
the evidence-led suggestion.

## Interpreting a conveyor that already passes

Use `PASS` as a feasibility gate, then optimize explicit objectives and
constraints. Examples:

| Candidate change | Dynamic evidence to inspect | Static guardrail |
| --- | --- | --- |
| Belt speed factor | Output, average/max inventory, starvation/blocking | Recommended speed, population and sensor timing |
| Back-up position | Back-up cycle count, overflow, upstream blocking | Required overflow `L_bu` and `BACKUP_POSITION` |
| Prime reserve/position | Waiting Prime and recovery behavior | Positive `L_rec` |
| Installed length | Max inventory, overflow and recovery | `INSTALLED_LENGTH`, anti-starve and anti-block |
| Blocked/clear delays | Back-up cycles and restart stability | `SENSOR_DEBOUNCE` |

Do not optimize all objectives into one number. First agree on constraints
such as `Overflow = 0`, an acceptable recovery margin, a maximum conveyor
speed, and a target output. Then compare controlled What-If changes one at a
time.
