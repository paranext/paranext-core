---
paths:
  - "c-sharp/**"
  - "extensions/src/**"
  - "src/**"
---

# Porting PT9 WinForms Code to PT10

PT9's logic is WinForms-coupled: behavior is driven by control state and scattered static-method
callsites wired into Forms. PT10 has no WinForms runtime, so a direct transliteration both fails to
compile and enshrines the WinForms shape in PT10. Preserve the **behavior**, not the WinForms
**structure**.

## Don't transliterate control-driven patterns — consolidate

PT9 commonly exposes a behavior as a static method called independently from many WinForms files
(e.g. a `KeyboardHelper.ActivateDefaultKeyboard(scrText)` invoked from a dozen scattered focus/restore
callsites across the Forms). Do **not** port those callsites one-for-one into PT10 React/TS
equivalents.

- Treat the scattered callsites as **triggers**, not as port targets to enumerate. The PT9 decisions
  (when to activate, when to restore, what to suppress) are what you port.
- Consolidate them into a **single centralized router or service** in PT10 — one observer per
  surface — that makes those decisions in one place, rather than re-scattering independently-callable
  statics. Splitting the consolidated unit back into per-callsite pieces repeats the PT9 mistake.
- The hard work is usually in this service layer, not in the dialog or UI; design the router once.

## De-WinForms idiom mapping

When porting a WinForms-coupled method into a PT10 C# service, replace its WinForms dependencies with
process-boundary-friendly equivalents:

| PT9 WinForms idiom    | PT10 replacement                                  |
| --------------------- | ------------------------------------------------- |
| `MessageBox.Show(...)` | Return an error result (don't pop UI from the backend) |
| `this.control.Text`   | Accept the value as a method parameter            |
| `Settings.Default.X`  | Inject via a parameter or service                 |

The goal is a method that takes its inputs explicitly and returns its outcome — no hidden coupling to
a control, a static settings store, or a modal dialog.
