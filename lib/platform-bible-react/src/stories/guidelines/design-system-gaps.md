# Design System Gaps — running log

A backlog of UX-significant things our UI does that the **design system guidelines are silent
on**. Maintained by the AI UX review prompt and routine, and by anyone reviewing UI.

This is **not** a list of rule violations — those get fixed against existing guidelines. This
is the list of _missing rules_: places where the AI (or a human) repeatedly has to make a
judgment call because the design system hasn't decided yet. When an entry has enough evidence,
the UX team turns it into a real guideline (likely a new or expanded `.mdx` in this folder) and
removes it from here.

**Entry format**

```
### <short title>
- **What:** what the UI does that we have no rule for
- **Why it matters (Saroj):** the user-facing impact
- **Evidence:** PRs / Discord threads / components where it showed up (add to this over time)
- **Proposed addition:** a sketch of the rule — for UX to decide, not final wording
- **Frequency:** how often it has recurred
```

---

## Open gaps

### Feedback on async actions (pending / loading / optimistic state)

- **What:** When a user makes a selection that takes time to apply (e.g. choosing a project
  from a dropdown trigger), we have no rule for how the control should acknowledge the action
  before the result is ready — update optimistically, show a spinner/skeleton, or disable.
- **Why it matters (Saroj):** Without immediate feedback the app feels broken or unresponsive;
  he may click again or assume nothing happened. "Just works" requires visible acknowledgement.
- **Evidence:** a UX review thread (2026-06-03) — "Dropdown trigger does not update
  immediately after a selection is done — you could either immediately show the selection or
  show a loading state."
- **Proposed addition:** A short guideline (Design Principles or Interactions) stating that any
  action with perceptible latency must give immediate feedback — optimistic update preferred,
  otherwise a pending/loading indicator — and that the control stays interactive-disabled, not
  silently unchanged.
- **Frequency:** 1 (seed)

### Layout stability — no size jump on state change

- **What:** No rule that a control should reserve stable dimensions across its states. A trigger
  that fits its content can change width when the selection changes, shifting surrounding layout.
- **Why it matters (Saroj):** Controls that resize or jump after interaction are disorienting and
  make the UI feel unstable; they can also move click targets out from under the cursor.
- **Evidence:** a UX review thread (2026-06-03) — "Dropdown trigger should always stay
  the same width — currently after selecting a project, it first does not update (unexpected),
  then resizes."
- **Proposed addition:** A guideline (Design Principles → state changes, or Responsiveness) that
  triggers/controls with variable content should hold a stable width (e.g. fixed or min-width
  sized to the expected range, truncate with ellipsis beyond it) so selection doesn't cause
  layout shift. Ties into the existing truncation guidance in Responsiveness.
- **Frequency:** 1 (seed)

### Picker presentation consistency (modal vs. overlay vs. floating webview)

- **What:** The same kind of task — picking something — is presented differently in different
  places (a modal in one flow, a floating webview in another). We have no rule for which
  presentation a picker should use, or when to reach for the Overlay Service.
- **Why it matters (Saroj):** Inconsistent presentation for the same job forces him to relearn
  the interaction each place it appears, undercutting the "learn it once" benefit our
  Interactions and Component Choices guidelines are built on.
- **Evidence:** a UX review thread (2026-06-03) — "Why is 'resource picker' a floating
  webview, when 'more projects' > 'Select project' is a modal? ... That seems like a good use for
  the Overlay Service." Root cause noted: one picker comes from core, one from an extension.
- **Proposed addition:** An Interactions guideline defining the canonical picker presentation and
  when to use the Overlay Service / command palette vs. a modal vs. a floating webview — including
  how core and extension surfaces should align. Responsiveness already documents the
  webview/popover constraint; this would add the _which-to-use_ decision.
- **Frequency:** 1 (seed)
