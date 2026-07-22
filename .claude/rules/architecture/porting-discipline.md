---
paths:
  - "c-sharp/**"
  - "extensions/src/**"
  - "src/**"
---

# Porting Discipline (PT9 → PT10)

When reimplementing a Paratext 9 feature in paranext-core (PT10), the PT9 source is the
specification. These invariants govern what to preserve and what to change.

## Legacy Containment — Preserve Behavior, Not Structure

PT9's WinForms code is control-driven: logic scattered across event handlers, static-method
callsites, and form state. Do not replicate that structure in PT10. Reproduce the observable
behavior; rebuild the structure to fit PT10's architecture (services, data providers, React
components). Document the WinForms patterns you find during analysis so the behavior is
captured, then leave the control-driven shape behind.

## Behavioral Preservation — Intentional Change Needs Docs + Approval + Tests

Passing tests are necessary but not sufficient proof of correctness. A green test only proves
the code does what the test says — not that the test matches PT9. Any **intentional** deviation
from PT9 behavior requires all three of:

- a written record of what changed and why,
- explicit human approval, and
- test coverage that pins the new behavior.

If you cannot point to all three, you are changing behavior by accident — match PT9 instead.

## Named Failure Modes — Actively Avoid

These are the recurring ways a port drifts past its mandate. If a change risks any of them,
stop and escalate to a human rather than proceeding:

- **Over-engineering beyond PT9 parity** — building more than PT9 does. Ship parity first.
- **Introducing abstractions without clear value** — interfaces, generic layers, or
  indirection that no current consumer needs. Wait for the second consumer.
- **Inventing requirements not present in PT9** — adding behavior, options, or validation that
  PT9 never had. If it isn't in the PT9 source, it isn't in scope.

Human developers remain the final authority on architecture, domain semantics, behavioral
changes, and feature scope.
