# Manage Books UX Round 2 — Design PR #2224 reference catalog

**Purpose:** central catalog of which exact source ranges in [paranext/paranext-core#2224](https://github.com/paranext/paranext-core/pull/2224) each stage in the [round-2 design](./2026-05-11-manage-books-ux-review-followup-design.md) borrows from. UX feedback explicitly cited PR #2224 for items #6, #14, #15, #42, #44.

**Source state:** PR #2224 head is currently `1706c716f105b61bebbb1ff97dc56e766ee4412d` (branch `manage-books` on the head repo). Fetch it locally with:

```bash
git fetch origin manage-books:design-pr-2224-tmp
```

(Clean up with `git branch -D design-pr-2224-tmp` when done.)

The PR's substantive code change lives in two files:

- `lib/platform-bible-react/src/components/advanced/manage-books-dialog/manage-books-dialog.component.tsx` (1454 lines)
- `lib/platform-bible-utils/src/scripture/project-scopes.ts`

---

## Patterns this round will borrow

### P-1: Container-query responsive pattern

Used by **Stage 3** (`#6` + `#42` responsive design).

Source (fill in exact line ranges during Stage 3.0 investigation):

- Action-row container wrapper: `manage-books-dialog.component.tsx:842` (`tw-@container/actions`)
- Action-row icon hiding: `manage-books-dialog.component.tsx:856,866,876,886,896` (`@md/actions:tw-inline`)
- Filter-bar container: `manage-books-dialog.component.tsx:1082` (`tw-@container/filterbar`)
- Filter-bar element hiding: `manage-books-dialog.component.tsx:1118` (`@md/filterbar:tw-inline`)

**Notes for adopters:**

- PT10 sidebar has no equivalent container in PR #2224 (PR #2224 is dialog-shaped, not sidebar-shaped). Stage 3 designs PT10's sidebar collapse on its own; only the action/filter-row patterns transfer directly
- Verify Tailwind container-query plugin is enabled in `lib/platform-bible-react/`'s Tailwind config; Stage 3.0 must confirm

### P-2: Status-comparison data flow + labels

Used by **Stage 6** (`#14` + `#44` status comparison).

Source (fill in during Stage 6.0):

- Wire shape for per-book comparison entry: TBD
- State derivation (`new` / `newer` / `older` / `same` / `onlyInSource` / `onlyInTarget`): TBD
- Tooltip date format: TBD
- Label ordering in filter dropdown and grouping: TBD

**Notes for adopters:**

- PR #2224 is a single dialog with a self-contained data flow; PT10's manage-books is split across a C# data provider, PAPI, and a React web view. The wire shape must adapt to that boundary — not lift verbatim
- Stage 6.0 must decide whether to mirror PR #2224's exact wire shape or adapt

### P-3: Chapter-merge backend semantics

Used by **Stage 7** (`#15` chapter-merge wiring + label rename).

Source: PR #2224 itself is frontend-only and does not have the backend chapter-merge logic. The PT9 reference for this pattern is:

- `Paratext/ParatextData/ImportSfmText.cs:159-218` (`ImportBooks` orchestrator)
- `Paratext/ParatextData/ImportSfmText.cs:245-286` (`WriteChaptersToBook` — the per-chapter merge logic)
- `Paratext/Paratext/FileMenu/ImportBooksForm.Designer.cs:116` (`chkReplaceEntireBooks.Text = "Replace entire book(s)"`)

**Notes for adopters:**

- See the [main design doc §6.1](./2026-05-11-manage-books-ux-review-followup-design.md#61-15-rename-pt10-labels-to-match-pt9-behavior) for the decision to port PT9 semantics verbatim + rename PT10 labels
- Stage 7.0 must verify PT10 has access to `ScrText.SplitIntoChapters` or identify an equivalent

---

## Stage-by-stage mapping

| Stage | Items    | Patterns used                     |
| ----- | -------- | --------------------------------- |
| 3     | #6, #42  | P-1                               |
| 6     | #14, #44 | P-2                               |
| 7     | #15      | P-3 (PT9 reference, not PR #2224) |

Stages 1, 2, 4, 5, 8 do not depend on PR #2224 patterns.

---

## Open questions to resolve in stage investigations

- **Stage 3.0:** is the Tailwind container-query plugin already enabled in `lib/platform-bible-react/`'s config?
- **Stage 6.0:** mirror PR #2224's wire shape verbatim, or adapt for PT10's data-provider boundary?
- **Stage 7.0:** does PT10 have `ScrText.SplitIntoChapters` accessible, or do we need to port the splitter?

This document is updated as investigations resolve each open question. Updates are committed with the stage they relate to.
