# ProjectSelector's accessible name and read-only marking belong in the library

**Status: partially implemented.** The accessible-name half landed in PR #2822 (PT-4550) —
`ProjectSelector` now composes `"{ariaLabel}: {selection}"` itself, so a consumer passing a
control-only name no longer hides the selected project from screen readers. The read-only marking
half is still open, and the rest of this document describes it.

**Originally deferred from PR #2801** (PT-4549 — migrate the titlebar picker onto
`ProjectSelector`).

Both items come from @katherinejensen00's review of #2801 (findings 18 and 19), which offered the
deferral explicitly: *"If you'd rather defer, please file the ticket and record it as a consequence
in the ADR."* Everything below was re-verified against the branch, not taken from the review on
trust.

**Suggested shape if this goes to the board:** one **Combined** issue. The two items are the same
design question — whether "this project is read-only" and "this is the control's name" are the
library's concern or each consumer's — and answering one without the other leaves the seam in the
same place.

---

### 1. `ariaLabel` silently suppresses the trigger's visible label for every consumer

**Where:** `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx`
(`ariaLabel`'s TSDoc and its `@example`; the `aria-label` is set on the trigger `<Button>`)

`aria-label` REPLACES an element's content in the accessible-name computation rather than adding to
it, so a consumer that passes a control-only name (which is exactly what the prop's TSDoc and
`@example` tell it to do) leaves a screen-reader user hearing "Select project, combobox, collapsed"
with no way to hear which project is open — while sighted users read it straight off the trigger.

#2801 fixed this at its own call site: `platform-bible-toolbar.tsx` now composes the whole name
("Select project, Project One (P1)") from format strings, with the error and pending-pick branches
mirroring `renderTriggerLabel`, and integration tests pinning all three by role query.

Six other live call sites still pass a control-only name and are still affected:

- `checklist.web-view.tsx`
- `checks-side-panel.component.tsx`
- `find.component.tsx`
- `manage-books-dialog.component.tsx` (two sites)
- `manage-books-sidebar.component.tsx`

The ARIA-correct fix is `aria-labelledby` over a hidden label plus the value span — what Radix
`Select` does internally. Applied unconditionally it changes the accessible name of every selector
and churns ~37 `getByRole('combobox', { name: 'Project' })` queries across the repo. Scoped to
"`renderTriggerLabel` was supplied" it touches no existing consumer, since none pass that prop —
which is the cheap version, and the reason this is worth doing while the component is still
experimental.

Leaving the composition in the toolbar also leaves two parallel decision trees there
(`renderTriggerLabel` and `triggerAriaLabel`) that a future branch can desync. #2801 tests both
branches, so a desync fails rather than passing silently, but the duplication is still there.

### 2. Read-only is consumer-derived, so the padlock has no hover label in the titlebar

**Where:** `project-selector.component.tsx` (`ProjectSelectorProject`, `renderProjectIndicator`, and
the row tooltip)

`ProjectSelectorProject` has no read-only field. The titlebar derives it from `ProjectItem.isEditable`
and passes a padlock through `renderProjectIndicator`. That works, but the row tooltip is built from
language, `typeName`, the scroll-group label, `isBoundButClosed` and `disabledReason` — the
indicator is not part of it, and the component cannot read an arbitrary `ReactNode`'s label. So in
the titlebar popover "Read-only" reaches screen readers only, while the SAME glyph in the "More
projects…" dialog does get a hover label (its rows are plain listbox options, where a native `title`
is safe).

A native `title` on the popover's padlock is not the fix: a selector row is itself a shadcn tooltip
trigger, so the browser's default tooltip would stack on top of the app's.

The consistent fix is a first-class read-only concept in the library that the row tooltip can render
a line from. #2801 declined that deliberately, on
`.claude/rules/architecture/discover-before-implementing.md`'s "zero callers = aspirational
scaffolding" — at the time there was exactly one consumer. This is the second reason to want it, so
the rule's own condition (revisit when a second consumer or a second reason appears) is now met.

Note that adding `isReadOnly` alongside `renderProjectIndicator` would leave TWO mechanisms for the
same marking, which is worse than either alone — so this wants a decision about which one survives,
not just an added field.

---

### Recorded in the log

`adr-project-selector-stays-experimental` in `.context/standards/Architecture-Decisions.md` carries
both of these as consequences, so the deferral is discoverable from the decision that permits it.
