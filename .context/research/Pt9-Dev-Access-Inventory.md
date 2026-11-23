# Paratext 9 — Developer/Power-User Access Inventory

A single registry of PT9 functionality hidden behind keyboard gestures (Shift-held-at-open,
Shift+click, Ctrl+Shift+click, …). Recording these in one place lets PT10 design an
equivalent dev-mode surface **once** instead of rediscovering it gesture-by-gesture.
Open team question: which dev-mode surface PT10 should adopt (hidden settings toggle,
`--dev` flag, an extension, or a build flavour) — PT10 has none yet.

## Contribution rules

- Any investigation that finds a dev-access behaviour MUST add a `DEV-###` row here.
- Use the next free `DEV-###` ID; cite exact PT9 source `file:line`; **never remove rows**
  (permanent history).
- In a UI/discovery write-up, tag the affected control, e.g.
  `(see DEV-007 — PT9 hid this behind Shift; PT10 currently exposes it unconditionally.)`

## Registry

| ID | Feature | PT9 trigger | What it gates | PT10 status (initial proposal) | PT9 source |
|----|---------|-------------|---------------|-------------------------------|------------|
| DEV-001 | project-plans | Shift held when opening the Manage Plans dialog (admin only) | `btnSaveBasePlan` visibility — hidden even for admins without Shift; with Shift shows iff `!progress.Data.IncludeExtendedData` | Dropped — admin sees it unconditionally (subject to the existing `!IncludeExtendedData` constraint); "visible" is the safer admin default; re-gate to dev-admin when PT10 adds a dev mode | `Paratext/ProjectProgress/ManageProgressPlansForm.cs:61-63` |
| DEV-002 | Window/dialog geometry restore | Shift held while a dialog or window loads (`ControlExtensions.PortableModifierKeys == Keys.Shift`) | Bypasses restoration of the saved `DialogState` (bounds + `FormWindowState`) and re-seeds it from the form's *current* geometry. For always-float tools the float window opens at its designer-default size/position instead of its remembered one | TBD — not strictly developer-only: it is PT9's **only** user-reachable recovery for a window restored onto a since-disconnected monitor, because layout restore sets `KeepBounds = true` and skips all off-screen clamping (`Paratext/WindowCollection.cs:1348-1354`; `PtxUtils.UI/DialogRestorer.cs:97-100`). If PT10 clamps to a live display on restore, this gesture is unnecessary; if it reproduces PT9 verbatim, an equivalent escape hatch is required | `PtxUtils.UI/DialogRestorer.cs:157` — `if (!isSetup \|\| ControlExtensions.PortableModifierKeys == Keys.Shift)` |

Row template (copy-ready):
`| DEV-### | {feature} | {gesture, exactly as PT9 detects it} | {what becomes visible/enabled/different} | {dropped/preserved/TBD} — {one-sentence rationale} | {file:line — gate snippet} |`
