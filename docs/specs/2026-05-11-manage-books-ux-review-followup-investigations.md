# Manage Books UX Round 2 — Investigations log

**Purpose:** rolling investigation record for the [round-2 design](./2026-05-11-manage-books-ux-review-followup-design.md). Each stage appends its own section before implementation begins, per the per-stage investigation workflow established in §3a of the design doc.

**Process per stage:**

1. **Stage N.0 — Investigate.** Read relevant code; verify spec premises; surface findings + open questions in this file
2. **Checkpoint.** Pause, surface findings to user, wait for go-ahead or correction
3. **Stage N.1+ — Implement.** Per the (possibly revised) plan
4. Update this file's "Decision" subsection with the final call

**Template per stage:**

```markdown
## Stage N — Investigation (YYYY-MM-DD)

### What I looked at

- file:line references read
- behaviors observed (in app, in tests, in PT9 source)

### Findings vs the spec

- ✅ Spec is correct on X
- ⚠️ Spec assumed Y, actual is Z
- ❓ Open question that needs user input

### Proposed deviation from spec (if any)

- ...

### Decision (filled after user checkpoint)

- ...
```

For Stages 5, 6, 7, the investigation also produces a **characterization test** (a small test pinning current observable behavior) committed _before_ the code change. Reference its commit hash in the stage's section.

---

<!-- Stage investigations append below this line, oldest first -->

## Stage 1 — Investigation (2026-05-11)

### What I looked at

- `extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx:615–624` — pill body with inner `<Checkbox>` (for #46)
- `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx:967–979` — `emitThrownError` (for #36)
- Read-only flow audit:
  - `manage-books-dialog.component.tsx:658–662` — effect that redirects user from a mutating action to `view` when target is read-only
  - `manage-books-dialog.component.tsx:955–959` — `canApply` predicate
  - `manage-books-sidebar.component.tsx:248,290–291` — sidebar disables four mutating sections + surfaces tooltip
- `manage-books-dialog.component.tsx:1660–2096` — overall dialog structure (for #38 placement)
- `manage-books-dialog.component.tsx:1790–1879` — the create-action panel currently inside the action row

### Findings vs the spec

#### #46 — button-in-button

✅ Spec is correct on cause: the `<Checkbox>` body at line 618 is rendered inside the outer `<button>` (line 688 of the same file) and Radix Checkbox renders as a `<button>`. Element is already `aria-hidden tabIndex={-1}`, so swapping to presentational SVG loses nothing semantically.

✅ Spec's fix is the right shape — replace with a presentational visual.

#### #36 — `[object Object]` toast

✅ Spec is correct on the root cause at `emitThrownError`. The fallback `String(e)` returns `"[object Object]"` for non-Error rejections (the C# data provider rejects with structured objects, not `Error` instances).

⚠️ Spec missed a defense-in-depth gap: `canApply` predicate at line 955–959 does NOT check `project.isEditable`. The redirect effect at line 658 switches action to `view` when target is read-only, but there's a brief window during state propagation where:

1. User clicks the action toggle to a mutating action
2. State updates set `action` to e.g. `'create'`
3. The redirect effect schedules but hasn't run yet
4. The Apply button is enabled (selection exists)
5. Click fires `runCreate` → backend rejects → `emitThrownError` → `[object Object]`

So #36's "make sure the toast never shows `[object Object]`" is the must-fix; the read-only sweep is a smaller belt-and-suspenders addition: add `project.isEditable !== false` to `canApply` so Apply is greyed out even mid-redirect-race.

#### #38 — create-mode reposition

✅ Spec is correct: the create-action panel (`Select` for method, info tooltip, reference `<ProjectSelector>`) currently lives inside the action row at line 1790–1879. Target location is between the `<BookGridSelector>` wrapper at line 2053 and the `<footer>` at line 2096.

⚠️ Notable: only the `create` action gets moved per CSV row #11. The parallel `view`/`copy`/`import` panels stay inside the action row. This may look asymmetric — flagging for visual check during smoke. If a reviewer prefers symmetry, we'd extend the move to all four action panels in a follow-up.

### Proposed deviation from spec (if any)

None. All three fixes proceed as designed; the only addition is the `canApply` `isEditable` check (which the spec already implied as "tighten UI-level disablement" but didn't pin to a specific line).

### Decision (filled after user checkpoint)

User has authorized autonomous advancement; proceeding with the implementations as proposed (#46 SVG swap, #36 emitThrownError extraction + `canApply.isEditable`, #38 panel move).

## Stage 2 — Investigation (2026-05-11)

### What I looked at

- `manage-books-dialog.component.tsx` header (line ~1705) — no `ProjectSelector` lives here; the active-project picker is in the sidebar at `manage-books-sidebar.component.tsx:264–284`. So #30's "tooltip in the header" actually maps to the sidebar's `ProjectSelector` trigger
- `manage-books-sidebar.component.tsx:75–143` (getSectionLabels) — current subtitle copy per section
- `manage-books-sidebar.component.tsx:351` — tooltip currently uses `side="right"`
- `manage-books-dialog.component.tsx:1282–1292` — `presenceFilterLabel` returns "All" / "New" / "Existing"
- `manage-books-dialog.component.tsx:1908–2042` — filter bar (line 1920 starts `<div ... tw-px-6 ...>`) and grid wrapper (line 2008 `<div ... tw-px-3 ...>`)
- `book-grid.component.tsx:107–108` — `BOOK_PILL_BASE_CLASS` has internal `tw-px-2`
- `book-grid.component.tsx:764–768` — BookGridSelector outer has `tw-p-1`; consumer's `contentClassName="tw-px-0 tw-py-0"` overrides it
- `lib/platform-bible-react/src/components/basics/search-bar.component.tsx` — SearchBar exposes `className` for the wrapper but no separate `inputClassName`; inner `<Input>` defaults to shadcn `h-10`
- `main.ts:252` — current `{ type: 'tab' }` argument to `openWebView`

### Findings vs the spec

#### #28 floating tab — confirmed; `{ type: 'float', position: 'center', floatSize: { width: 1100, height: 720 } }` matches the Settings precedent at `src/renderer/services/web-view.service-host.ts:1805`.

#### #30 project full-name tooltip

⚠️ Spec said "header `<ProjectSelector>`" but the project picker is in the **sidebar** (`manage-books-sidebar.component.tsx:265–283`). Same UX intent — wrap that trigger with a tooltip. Will resolve the active project's `fullName` from the `projects` prop (already passed). Falls back to `shortName` when fullName is missing.

#### #31 single-group static header

✅ Spec is correct; render the group header as a static `<span>` when `groups.length === 1`, skipping the chevron and `<Button>`. Group is also forced-expanded by this branch.

#### #32 collapsed-header border

✅ Straightforward — apply `tw-border tw-border-border tw-rounded-md` to the header row when `collapsed` is true.

#### #33 strip subtitles

✅ Direct edit: clear subtitle strings for the five `show`/`create`/`copy`/`import`/`delete` cases in `getSectionLabels`. Render skips empty subtitles. Keep subtitles for `progress-tracking`/`book-names`/`introductions` (the disabled "coming soon" rows below).

#### #34 grid-toolbar alignment

⚠️ The grid wrapper currently uses `tw-px-3` (12px) + zeros-out the BookGridSelector's inner `tw-p-1` via `contentClassName="tw-px-0 tw-py-0"`. With the override: first pill checkbox sits at 12 + 0 + pill's `tw-px-2` (8) = 20px. Toolbar select-all sits at 24px (toolbar `tw-px-6`). Fix: remove the `contentClassName="tw-px-0 tw-py-0"` override so the BookGridSelector's default `tw-p-1` kicks in: 12 + 4 + 8 = 24px ✓ — exact alignment with no other side effects.

#### #37 SearchBar height

⚠️ Spec said "constrain via wrapper" but the SearchBar's wrapper className is passed through; the inner `<Input>` (shadcn) defaults to `tw-h-10`. The current `className="tw-h-8 ..."` only sets the wrapper. Fix: use Tailwind's arbitrary-selector `[&_input]:tw-h-8` to push the height into the inner Input — keeps the change contained to the consumer site rather than modifying SearchBar's public API.

#### #39 pill hover style

✅ Direct edit: replace `hover:tw-bg-primary/90 hover:tw-text-primary-foreground` with `hover:tw-bg-primary/20` (no text-color override) in `bookPillClasses`. Also remove the equivalent group-hover override at `book-grid.component.tsx:851`.

#### #40 pill tooltip alignment

✅ Two `<TooltipContent side="bottom" align="end">` sites at `book-grid.component.tsx:680` and `:746` — change both to `align="start"`.

#### #41 sidebar tooltip side

✅ Single change: `manage-books-sidebar.component.tsx:351` `side="right"` → `side="top"`.

#### #43 filter labels

⚠️ Re-scoped: only the View+Import filters exist today (Copy filter was removed in round 1). For Stage 2, rename "New"/"Existing" → "Not in project"/"In project" to match the grid's section headers. The new/newer/older/same labels for Copy/Import are deferred to Stage 6 (when the status-comparison backend lands).

### Proposed deviation from spec (if any)

- **#30** maps to the _sidebar_ `ProjectSelector`, not a header one — spec used "header" loosely
- **#34** uses the `contentClassName` removal approach, not the explicit `tw-px-*` adjustment the spec mentioned (cleaner, no magic numbers)
- **#37** uses an arbitrary Tailwind selector instead of a SearchBar API change (avoids cross-feature library work)
- **#43** scoped to View+Import renames only; Copy/Import new/newer/older/same labels move to Stage 6

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding with implementations including the four scope refinements above.
