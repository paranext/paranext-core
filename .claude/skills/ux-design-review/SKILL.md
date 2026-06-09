---
name: ux-design-review
description: AI-driven UX/design review of a UI change against the Platform.Bible design system. Use when reviewing a PR, a diff, or local UI changes for big design/UX/accessibility failures before or just after merge. Catches blocking and major issues only (not nitpicks), cites the guideline each finding violates, flags where the design system is silent (gap candidates), and emits a triage verdict so low-signal runs can be safely ignored. Run it yourself before opening a PR, or let the nightly-design-review routine call it.
---

# UX Design Review

Belt-and-suspenders design review for Platform.Bible UI work. Developers should run this
before requesting a UX review; the `nightly-design-review` routine also runs it as a safety
net. The goal is to **catch big UI/UX and accessibility failures**, connected to the
project's design system — **not to nitpick**.

The same review logic serves both a human (copy/paste findings) and automation (post PR
comments). It does two jobs at once:

1. **Enforce** what the design system already says (every finding cites a guideline).
2. **Discover gaps** — when the change does something UX-significant the guidelines are
   silent on, emit a *gap candidate* instead of inventing a rule.

---

## Source of truth — read these first, every run

The design system lives in Storybook guideline files. **Read them at review time** so the
review never drifts from the current standards. Do not rely on memory or on this skill's
summaries below — open the files:

```
lib/platform-bible-react/src/stories/guidelines/design-principles.mdx     # the "Definition of Done" baseline
lib/platform-bible-react/src/stories/guidelines/component-choices.mdx      # which component for which job; list hover/selected styles
lib/platform-bible-react/src/stories/guidelines/application-interactions.mdx  # menu/tab/BCV patterns
lib/platform-bible-react/src/stories/guidelines/responsiveness.mdx         # 300px min-width, narrow-first, popover/webview limits
lib/platform-bible-react/src/stories/guidelines/keyboard-shortcuts.mdx     # per-OS shortcut rendering
lib/platform-bible-react/src/stories/guidelines/theming.mdx                # color tokens, dark mode
lib/platform-bible-react/src/stories/guidelines/vocabulary.mdx             # terms.mdx, proper-names.mdx, capitalization.mdx, ellipses.mdx
lib/platform-bible-react/src/stories/guidelines/ui-review.mdx              # the human review process & deliverable expectations
```

The primary user is **Saroj** (see Design Principles): an expert Bible translator who is not
a power computer user and wants the app to be simple and just work. Judge severity through
his eyes, not a developer's.

If a guideline file is missing or renamed, say so in the report and fall back to the rubric
below — but treat that drift as itself worth flagging.

---

## What counts as a "big issue" (the rubric)

Report findings in only these two severities. Anything below them is noise — suppress it.

### Blocker — breaks access or loses/destroys something; must fix before merge
- Interactive element not keyboard-reachable or not operable by keyboard
  (Design Principles: *"All interactive UI must be keyboard navigable."*)
- Missing focus indicator on a focusable control
- Icon-only button with no `aria-label` (Design Principles: icon-only buttons)
- Color-contrast failure, especially where two state changes stack (Design Principles: *State changes and contrast*) or in dark mode
- Destructive/discard action using the wrong icon (`X` instead of `Trash2`) or with no safeguard (Design Principles: *Destructive action icon*)
- A control whose hidden/truncated content is unreachable by any other means at 300px width (Responsiveness)

### Major — clearly degrades the experience; should fix
- Missing standard affordance: a list/menu item without the consistent `hover: bg-muted` / `selected: bg-muted/50` style other items have (Component Choices)
- No feedback on an async action — selection/trigger doesn't update or show a pending/loading state after the user acts *(gap-adjacent; see gap candidates)*
- Layout instability — a control or trigger changes size/jumps after a state change instead of holding a stable width *(gap-adjacent)*
- Cross-surface inconsistency — the same job presented two different ways (e.g. a picker that is a modal in one place and a floating webview in another) without a documented reason *(gap-adjacent)*
- Wrong dialog button order (cancel left / confirm right) or non-descriptive labels like **OK** (Design Principles: *Dialogs, toolbars, and action buttons*)
- Component misuse — using a raw element where a documented component is required (e.g. not using the listbox pattern for a list; manual gap spacing instead of `ButtonGroup`; wrong Combobox icon)
- Responsiveness break — horizontal scroll or unusable layout below 300px; more than one horizontal scrollbar (Responsiveness)
- Keyboard shortcut rendered with the wrong per-OS convention (Keyboard shortcuts)
- Tooltip missing on an icon/label-less control, or a redundant/over-long tooltip (Design Principles: *Tooltips*)

### Do NOT report (nitpicks — suppress)
- Pixel-level padding/margin/alignment tweaks not tied to a guideline
- Subjective color or wording preferences
- Naming/style bikeshedding
- Anything you cannot trace to a guideline **or** the rubric above. If it's UX-significant
  but untraceable, it is a **gap candidate**, not a finding.

---

## Detect premature / low-signal reviews (so output can be ignored)

A pre-merge review is only useful if the work is far enough along. Before reporting, check
for signals that the review may be premature or unreliable, and downgrade the verdict
accordingly rather than dumping noise:

- PR is a **draft** or labeled WIP
- **CI is failing** (the diff may not represent intended behavior)
- **No Storybook deliverable** for new/changed UI (ui-review.mdx expects one) — you can't
  fully verify behavior from a static diff
- PR description **lacks reference-UI links/paths** for comparisons it makes (ui-review.mdx:
  *Linking to reference UI*) — you can't verify the "consistent with X" claims
- The change is a **large refactor** where UI diffs are incidental
- You **could not locate** the referenced component(s) to compare against

When these dominate, prefer **LOW SIGNAL** and say exactly why, so the reader can skim or
skip the run.

---

## Output format

Lead with the verdict line so a human (or the routine) can triage in one glance:

```
VERDICT: <CONFIDENT | LOW SIGNAL | CLEAN>  —  <N blockers, M majors>  —  PR #<num> <title>
```

- **CONFIDENT** — the diff is reviewable and you found real blocking/major issues. Act on it.
- **CLEAN** — reviewable, no big issues found. (Still list any gap candidates.)
- **LOW SIGNAL** — premature/unverifiable per the checks above. *Safe to skim or ignore.*
  Always state the reason in the same line, e.g. `LOW SIGNAL (draft, CI red) — output is likely noise`.

Then:

### Findings
For each finding:
- **Severity** (Blocker / Major)
- **Location** — `path/to/file.tsx:line` (and Storybook story if relevant)
- **Issue** — one or two sentences, in Saroj's terms
- **Guideline** — the exact file + section it violates (e.g. `design-principles.mdx → Keyboard navigation and focus`)
- **Suggested fix** — concrete and minimal
- **Confidence** — High / Medium / Low (Low-confidence findings must justify why they're still worth a human's glance, or be dropped)

### Gap candidates
UX-significant things the change does that the **guidelines don't cover**. Do not phrase
these as violations. For each: what the change does, why it matters for Saroj, and a
proposed addition to the design system. These feed the gap log (see below). The three
known-open gaps as of this skill's writing — **async/pending feedback**, **layout
stability / no size-jump**, and **picker presentation consistency (modal vs. overlay vs.
floating webview, and when to use the Overlay Service)** — should be matched against here;
if the change touches them, cite the gap log entry rather than re-deriving.

### Ready-to-paste PR comment
A collapsed-friendly markdown block the reader can paste as a PR review comment verbatim.
Big issues only; link each to its guideline. **Do not post it** unless explicitly told to
(see Posting).

---

## Posting (optional, off by default)

Default behavior: **only produce the report in the session.** Never post to GitHub or
Discord on your own.

If invoked with `--comment` (or the caller explicitly asks to post), submit the findings as
a **single PR review** with inline comments at the cited `file:line`, plus the summary as
the review body. Use one review, not many comments. Never post LOW SIGNAL runs.

---

## Inputs

Works on whatever it's given:
- A PR number/URL → fetch the diff, description, labels, CI status, linked Storybook, and
  review/CI state via the GitHub tools.
- A local diff → review against the working tree (`git diff`), skip the PR-state checks and
  note that in the verdict reason.

Restrict attention to UI-affecting files:
```
lib/platform-bible-react/src/**/*.{tsx,css}
src/**/*.{tsx,css}
extensions/**/*.{tsx,css}
tailwind.config.ts, **/postcss.config.*, theme/token files
```
If a PR touches none of these, return `CLEAN — no UI-affecting files` and stop.

---

## The design-system gap log

Append every distinct gap candidate to:

```
lib/platform-bible-react/src/stories/guidelines/design-system-gaps.md
```

Dedupe against existing entries (don't repeat a gap already logged — instead add the new PR
as supporting evidence). This file is the running record that turns "the AI keeps noticing
X but we have no rule for it" into a prioritized backlog for the UX team. Keep entries short
and evidence-based; recommend an addition, don't author the final guideline.
