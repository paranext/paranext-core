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

## Stage 3 — Investigation (2026-05-11)

### What I looked at

- `lib/platform-bible-react/tailwind.config.ts:8,141` — `@tailwindcss/container-queries` plugin IS present in platform-bible-react's config
- `lib/platform-bible-react/package.json:99` — `"@tailwindcss/container-queries": "^0.1.1"` declared
- `extensions/src/platform-scripture/tailwind.config.ts:116–123` — plugins list: `typography()`, `tailwindCssAnimate` only. **Plugin NOT present in the extension's Tailwind config.**
- `extensions/src/platform-scripture/package.json` deps — `@tailwindcss/container-queries` NOT declared (though it is installed at the repo root via npm workspaces)
- `extensions/src/platform-scripture/dist/src/main.js` compiled output: emitted CSS contains only generic `@container (min-width: 24rem)` rules (from `@sm:`) — NO named container rules like `@container/actions`, `@container/filterbar`. Confirmed via Python regex extraction.
- `manage-books-dialog.component.tsx:1718` — `tw-@container/actions` (added round 1)
- `manage-books-dialog.component.tsx:1924` — `tw-@container/filterbar` (added round 1)
- `manage-books-dialog.component.tsx:1971` — `@md/filterbar:tw-inline` (only existing query in our code)
- PR #2224's `manage-books-dialog.component.tsx:842–1118` — equivalent classes work in PR #2224 because that PR is in `lib/platform-bible-react/` (which has the plugin)

### Findings vs the spec

⚠️ **Plugin was never enabled in the extension's Tailwind config.** Round 1 added `tw-@container/actions` and `@md/filterbar:tw-inline` classes in JSX, but those classes were silently producing no CSS in the extension build. The one existing `@md/filterbar:tw-inline` (Copy-mode count hidden at narrow widths) has been non-functional since PR #2220.

✅ Spec is correct on the patterns to copy from PR #2224.

⚠️ Spec said "verify Tailwind container-query plugin is enabled". Verified — it ISN'T. Stage 3.1 needs to add the plugin as step 0 before any new container-query classes will work, AND this retroactively activates the existing round-1 rule.

### Proposed implementation plan

1. Add `@tailwindcss/container-queries` to `extensions/src/platform-scripture/package.json` devDependencies (resolves to existing workspace-root install)
2. Import the plugin in `extensions/src/platform-scripture/tailwind.config.ts` and add it to the plugins list
3. Add `tw-@container/sidebar` to the sidebar's `<nav>` and design icon-only collapse for narrow widths
4. Add `tw-@container/dialog` to the dialog's outer flex container so cross-cutting responsive rules (header subtitle hide, etc.) can be added
5. Hide the header subtitle at narrow `@dialog` widths
6. Add tooltips to ALL sidebar items (not just disabled ones) since icon-only mode hides labels — make the tooltip render label + subtitle (when present)

### Proposed deviation from spec (if any)

- **Sidebar pattern is fresh design** — PR #2224 is dialog-shaped with no sidebar, so no pattern to mirror. Icon-only rail with full tooltips is the standard approach.
- The Tailwind plugin enablement is a small dep change but technically a behavior-affecting modification. Calling it out explicitly so reviewers know the existing classes start working.

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding with plugin enablement + sidebar icon-only collapse + dialog-level container query for header subtitle hiding.

## Stage 4 — Investigation (2026-05-11)

### What I looked at

- `c-sharp/ManageBooks/ProjectFilterService.cs:63–148` — current `FilterProjects` uses `IncludeProjects.ScriptureOnly` which is `Default | Resources | Limited` (per PT9 `ScrTextCollection.cs:62`). **Resources are currently included.**
- `c-sharp/ManageBooks/ProjectSummary.cs` — record has `(ProjectId, Name, ProjectType, IsEditable)` — **no `IsResource` field**
- `PT9 ParatextData/ScrText.cs:385` — `IsResourceProject` virtual property on `ScrText`; overridden by `ResourceScrText` and `JoinedScrText` returning `true`. Authoritative source for resource-ness.
- `manage-books-dialog.types.ts:66–86` — `ManageBooksDialogProject` TS shape — no `isResource` field
- `manage-books-dialog.component.tsx:575–589` — `otherProjects` filters out the active target; `otherProjectsAsPS` maps to `ProjectSelectorProject` for the Copy "From" and Create "Based on" pickers (both at lines 1857 and 2134)
- `manage-books.web-view.tsx:438–483` (`loadProjects`) and `:514–550` (`sidebarProjects`) — both call `manageBooksApi.filterProjects({ purpose: 'AllScripture' })` and map the response

### Findings vs the spec

✅ Mike's spec is correct: resources currently appear in both pickers (`IncludeProjects.ScriptureOnly` includes resources).

⚠️ `ProjectSummary` doesn't carry `IsResource`. Two implementation paths:

1. Add `IsResource` to `ProjectSummary` + frontend per-row filter (cleaner; gives UI more info for future stages like #35's selector layout)
2. Add a new `ProjectFilterPurpose.AllScriptureNoResources` enum value (backend-only, smaller wire change)

Choose **Option 1** — frontend gets the extra info and can apply per-context filtering without round-tripping new API purposes.

⚠️ Mike's reference to "#18 suggests to include resources (do not distinguish resources from projects)" reads ambiguously, but cross-referencing the suggested fix: resources at the _header picker_ are fine because they trigger the existing read-only disablement (the `isEditable === false` flow from #18). Resources at the _Copy/Create source_ picker must be excluded for copyright reasons.

### Proposed implementation plan

1. C#: add `IsResource` to `ProjectSummary` record; populate from `ScrText.IsResourceProject` in `ProjectFilterService.ToSummary`
2. TS: add `isResource?: boolean` to `ManageBooksDialogProject`; forward through `loadProjects` mapping in `manage-books.web-view.tsx`; same for `sidebarProjects` (so the type is consistent, even though the header picker doesn't filter)
3. TS: filter `otherProjectsAsPS` to `!p.isResource` so Copy "From" and Create "Based on" only see editable + read-only non-resource projects

### Proposed deviation from spec (if any)

- Spec mentioned a possible "client-side filter on isResource" — that's exactly what we do, but it requires the small `ProjectSummary` extension first
- Header picker is left explicitly unchanged (no filter applied)

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding (Stage 4).

## Stage 5 — Investigation (2026-05-11)

### What I looked at

- All ProjectSelector consumers (`grep` for the symbol across the repo):
  - `lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx` — settings UI
  - `extensions/src/platform-scripture/src/checklist.web-view.tsx` — markers-checklist comparative-texts picker (multi-select)
  - `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx` — checks side panel
  - `extensions/src/platform-scripture/src/components/checklist.component.tsx` — embedded selector in checklist
  - `extensions/src/platform-scripture/src/manage-books-dialog/*` — sidebar + Copy "From" + Create "Based on" pickers (this round's main change)
- `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx` — full component read
  - Line 485: `query` state held with `useState('')`; no reset on close — that's the source of the "filter doesn't clear on reopen" bug
  - Line 723: `<Popover open={open} onOpenChange={setOpen}>` — close fires `setOpen(false)` only
  - No scroll-to-selected logic anywhere; `partitionAndSort`'s float-to-top is the entire "show me the current selection" affordance
- `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.rows.ts:308–318` (`compareRows`) — `if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1` is the float-to-top
- `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.rows.test.ts:295–311` — there's an EXISTING characterization test asserting "selected rows float to the top of their section." That test now serves as the pre-change pin; my change updates it to assert the new (alphabetical) order.

### Findings vs the spec

✅ Spec is correct: #5 is two distinct changes — kill float-to-top + scroll-to-selected on open + clear filter on close.

⚠️ The existing test (`project-selector.rows.test.ts:295`) already pins the current behavior; that satisfies the characterization-test requirement for Stage 5. I'll update it in 5.1 to assert the new alphabetical-only order, which makes the behavior change visible in the diff.

⚠️ Markers-checklist multi-select also uses this same compareRows path; the float-to-top change affects its UX too. User has previously accepted this cross-feature implication.

For BookChapter scroll-to-selected pattern: not strictly needed — `<CommandList>` is the scrolling container; I can use a ref on the selected `<CommandItem>` and call `el.scrollIntoView({ block: 'nearest' })` after the popover opens (with a microtask delay so the DOM has rendered).

### #35 (separated short/long name layout) — proposal

Current row layout (line 343–346):

```
<span ref={labelRef} className="tw-min-w-0 tw-flex-1 tw-truncate tw-text-start">
  <span>{row.shortName}</span>
  <span className="tw-text-muted-foreground"> • {row.fullName}</span>
</span>
```

Proposed 2-line layout:

```
<span ref={labelRef} className="tw-min-w-0 tw-flex-1 tw-flex tw-flex-col tw-items-start tw-overflow-hidden">
  <span className="tw-truncate tw-font-medium">{row.shortName}</span>
  <span className="tw-truncate tw-text-xs tw-text-muted-foreground">{row.fullName}</span>
</span>
```

Truncation still works (each line truncates independently). Tooltip-on-clip still works because we keep the labelRef on the wrapping span; `scrollWidth > clientWidth` will fire if either line clips. Marked TBD for Sebastian/UX reviewer confirmation in PR description.

### Proposed deviation from spec (if any)

- The existing test in `project-selector.rows.test.ts:295` IS the characterization — no separate test file needed
- Scroll-to-selected uses `scrollIntoView({ block: 'nearest' })` on the selected `<CommandItem>` ref, NOT the BookChapter selector's specific approach (different component shape)

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding (Stage 5).

## Stage 6 — Investigation (2026-05-11)

### What I looked at

- `c-sharp/ManageBooks/BookComparisonEntry.cs` — record fields: `BookNum`, `BookName`, `ComparisonState`, `DefaultIncluded`, `Selectable`, `TooltipInfo`. **No date fields.**
- `c-sharp/ManageBooks/ComparisonState.cs` — enum has all six states (FilesAreSame, DestDoesNotExist, SourceIsNewer, SourceIsOlder, Undetermined, SourceDoesNotExist) — exactly what #44 needs
- `c-sharp/ManageBooks/ManageBooksService.cs:199-200` — `getBookComparison` PAPI method **already exists** (CopyBooksOrchestrator → BookComparisonEntry per book)
- `c-sharp/ManageBooks/ManageBooksService.cs:219-220` — `parseImportFiles` PAPI method **already exists** (same wire shape, for Import mode)
- `c-sharp/ManageBooks/ImportBooksOrchestrator.cs:507–531` — `BuildComparisonEntry` already computes `destModified` and a `preflightSourceTimestamp` for comparison; the dates are USED locally but not surfaced on the wire entry
- `c-sharp/ManageBooks/ImportBooksOrchestrator.cs:560–582` — `SafeGetBookModified` reads `scrText.FileManager.GetLastWriteTime`. Identical helper duplicated in `CopyBooksOrchestrator.cs`
- `extensions/src/platform-scripture/src/manage-books.web-view.tsx:135–145` — `decodeBooksPresent` decodes the booksPresent bitstring into `ManageBooksDialogBookInfo[]`. **`lastModified` is never populated** — the function pushes `{ id: bookId }` only
- `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.utils.ts:46–59` — `computeCompareState` is the frontend heuristic that USED to drive Copy/Import state. Returns 'undetermined' when dates are missing — which is always
- `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx:1386–1438` — Copy/Import gridItems uses `computeCompareState(sourceDate, destDate)`. Sources: `copySource.dates[book]` (always undefined per above) and `current.dates[book]` (also always undefined)
- Frontend network object interface at `manage-books.web-view.tsx:103–127` does NOT list `getBookComparison` or `parseImportFiles` — those methods are exposed by the backend but never wired in TS

### Findings vs the spec

✅ Spec was right about the bug location: frontend wiring exists for the comparison labels, but `lastModified` is never populated end-to-end. CSV note for #14 was already accurate.

⚠️ Spec said "extend BookComparisonResult to include `lastModified`" — slightly inaccurate. The proper extension is on `BookComparisonEntry` (the per-book record), not `BookComparisonResult` (the wrapping list). I'll add `SourceLastModified` and `DestLastModified` (string?, ISO format) to the entry.

⚠️ Spec said "new PAPI method `compareBooks`" — **the method already exists** as `getBookComparison`, and a parallel `parseImportFiles` exists for Import. Scope shrinks: no new PAPI method; just extend the entry shape + wire the existing methods in TS.

### Plan

**Backend:**

1. Add `SourceLastModified` (string?) and `DestLastModified` (string?) to `BookComparisonEntry` (ISO format, nullable for missing files)
2. Populate from `destModified`/`sourceTimestamp` already computed in `BuildComparisonEntry` (Import) and `SetDefaultEligibility` (Copy)

**Frontend:** 3. Add `getBookComparison` and `parseImportFiles` to the `ManageBooksNetworkObject` TS interface 4. Add a hook `useBookComparison(sourceProjectId, targetProjectId)` that caches the Copy-mode comparison result 5. In Copy mode: replace `computeCompareState(sourceDate, destDate)` with a per-book lookup against the cached BookComparisonEntry 6. In Import mode: similar — call `parseImportFiles` when files change, cache the result, use for grouping/labels 7. Tooltips: pass `entry.SourceLastModified` / `entry.DestLastModified` through to BookGridItem's `primaryDate`/`secondaryDate`

**Characterization** (per Stage 5+6+7 requirement):

- Existing tests in `c-sharp-tests/ManageBooks/` already pin `BookComparisonEntry` shape; adding new optional fields is backward-compatible (no test changes needed for the addition)
- Frontend characterization: the current `computeCompareState`-based state (where dates aren't populated → 'undetermined' or just present/absent labels) IS the bug. No test exists explicitly pinning this; the diff after replacement IS the characterization

### Proposed deviation from spec (if any)

- No new PAPI method (existing `getBookComparison` + `parseImportFiles` are sufficient)
- Field placement: `BookComparisonEntry` not `BookComparisonResult`
- Naming: `SourceLastModified` / `DestLastModified` (matches existing PascalCase wire field convention)
- `parseImportFiles` was already in scope per CSV's `lastModified` mention but the spec didn't explicitly list it

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding (Stage 6).

## Stage 7 — Investigation (2026-05-11)

### What I looked at

- PT9 `ParatextData/ImportSfmText.cs:245-286` (`WriteChaptersToBook`) — full algorithm read line-by-line. Behavior confirmed: split source via `ScrText.SplitIntoChapters(scrTextName, bookNum, bookText)`, iterate chapters, skip empty source chapters except chapter 1 of an empty book, write each via `PutText(bookNum, i + 1, false, chapter, lock)`. Dest chapters not in source survive.
- PT9 `Paratext/FileMenu/ImportBooksForm.Designer.cs:116` — `chkReplaceEntireBooks.Text = "Replace entire book(s)"` (literal English, not localized via Localizer.Str)
- `c-sharp/ManageBooks/ImportBooksOrchestrator.cs:789–838` — `TryPutBook` always called `PutText(bookNum, 0, ...)`. The deferral comment cited the InMemoryFileManager test seam, which on re-check is NOT a blocker: PT10 calls `PutText(verseRef.BookNum, verseRef.ChapterNum>0, ...)` in `c-sharp/Projects/ParatextProjectDataProvider.cs:1333,1414` — the seam works fine
- `c-sharp/ManageBooks/CopyBooksOrchestrator.cs:838–862` — `TryCopyOneBook` analogous gap (Vladimir #16's third button)
- `c-sharp/ManageBooks/CopyBooksRequest.cs` — wire shape, no strategy field
- `Paratext/ParatextData/ScrText.cs:881` — `SplitIntoChapters(string scrTextName, int bookNum, string bookText)` is public+static; available to PT10's C# via the existing ParatextData reference

### Findings vs the spec

✅ Spec is correct on the bug location and on the port-PT9-verbatim direction (user decision after deeper investigation).

✅ Confirmed: `ScrText.SplitIntoChapters` is available — no porting needed for the splitter.

⚠️ Wire-shape: spec didn't explicitly say `replaceEntireBook` needs to flow through `CopyBooksRequest`; it does (Copy uses CopyBooksRequest, not ImportBooksInput).

⚠️ Label rename — already covered in design §6.1. Confirmed two affected keys:

- `manageBooks_import_nonExistingChapters` → English default "Merge book(s)"
- `manageBooks_copy_confirmNonExistingChapters` → English default "Merge from source"

### Characterization tests

The existing 234 ManageBooks C# tests pin the orchestrator's pre-change behavior. None of them directly exercise `replaceEntireBook=false`'s expected "leave non-overlapping chapters intact" semantic because the current implementation didn't honor it. Adding new tests for the new path is appropriate but doesn't fit the "pin existing behavior first" model when the existing behavior IS the bug.

Instead: the existing tests continue to pass after the change (they all use `replaceEntireBook=true` semantics in practice), which is the characterization. The behavior change is the new merge path — visible in the diff itself.

### Proposed implementation plan

1. C#: extend `CopyBooksRequest` with `bool ReplaceEntireBook = true`
2. C#: `CopyBooksOrchestrator.CopyBooks` and `TryCopyOneBook` take new `replaceEntireBook` parameter; new helper `TryCopyChaptersFromSource` ports the PT9 merge loop
3. C#: `ManageBooksService.CopyBooksAsync` passes `request.ReplaceEntireBook` through
4. C#: `ImportBooksOrchestrator.TryPutBook` branches on `replaceEntireBook` — wires up the merge path (new helper `TryMergeChaptersFromSource`) when false
5. TS: `ManageBooksNetworkObject.copyBooks` adds optional `replaceEntireBook?: boolean`
6. TS: `onCopyBooks` in the webview forwards `args.strategy !== 'nonExistingChapters'` as `replaceEntireBook`
7. TS: rename English fallback strings in the two conflict-prompt components
8. JSON: update `manageBooks_import_nonExistingChapters` and `manageBooks_copy_confirmNonExistingChapters` English defaults

### Proposed deviation from spec (if any)

None on the backend. UI label change matches design §6.1 decision.

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding (Stage 7).

## Stage 8 — Investigation (2026-05-11)

### What I looked at

- `.eslintrc.ai.js:55` — `paranext/no-hardcoded-jsx-strings` is active at `warn` globally and at `error` for some subdirs
- `npm run lint` for the whole repo — **passes** with only one pre-existing warning unrelated to localization
- Greps for hardcoded English strings in `extensions/src/platform-scripture/src/manage-books-dialog/` and `manage-books.web-view.tsx` — every occurrence is either a `t('%manageBooks_...%', 'English fallback')` call (correct pattern), a fallback assignment (`localizedStrings?.X ?? 'default'`), or a string literal inside a switch/comment
- `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx:107–122` — `ProjectSelector` has its own `ProjectSelectorLocalizedStrings` prop with 12 defaultable strings (searchPlaceholder, filterAriaLabel, groupSectionLabel, filterSectionLabel, filterGroupByOpenTabs, filterShowSelectedOnly, openTabsSectionHeading, otherProjectsSectionHeading, boundButClosedTooltip, openButtonLabel, selectAll, clearAll)
- All 3 manage-books `<ProjectSelector>` usages pass `ariaLabel` and `buttonPlaceholder` but **do not pass `localizedStrings`** — so the popover's internal strings (Search placeholder, Filter, Group by open tabs section headings) all fall back to the English defaults

### Findings vs the spec

✅ Spec is correct: localization is missing on the ProjectSelector's internal popover strings (search/filter/group). The body of the dialog itself is already fully localized.

⚠️ The lint rule passes for the dialog body — that part is already done. The only meaningful localization gap is the ProjectSelector's internal strings.

### Proposed scope

Add 12 new `manageBooks_projectSelector_*` localize keys in `localizedStrings.json` + the type union. Build a `ProjectSelectorLocalizedStrings` object in the webview from the resolved strings and pass it to all 3 `<ProjectSelector>` instances (sidebar, Copy "From", Create "Based on").

### Proposed deviation from spec (if any)

- Spec said "grep the four target areas (sidebar, project-selector, header & footer)" — empirically only the project-selector area had real gaps. The other three are already localized
- Adding `ProjectSelector` localization is the highest-impact piece of #45

### Decision (filled after user checkpoint)

User authorized autonomous advancement. Proceeding.

## Review-paratext follow-ups — all 9 Important findings addressed (2026-05-11)

The `/review-paratext` pass on PR #2255 surfaced 9 Important findings. All are now addressed across two commits:

1. **`[P3] manage-books: Address /review-paratext Important findings (6 of 9)`** — `ProjectSummary.IsResource` default, localize-key renames to new keys (`manageBooks_copy_confirmMergeFromSource`, `manageBooks_import_mergeFromFiles`), Import "Merge from files" parallelism, narrow-sidebar tooltip side + icon-only project trigger, C# chapter-merge tests for Import and Copy.
2. **`[P3] manage-books: Add review-paratext test coverage (#44 #45 #46)`** — the three remaining items, all isolated test additions, summarized below.

The original "pending" sub-sections are retained beneath this summary as the as-built reference for each test.

### Done #44 — `ProjectSummary.IsResource` C# contract test

**Where**: `c-sharp-tests/ManageBooks/ProjectFilterServiceTests.cs`
**Why**: The new `IsResource` field on `ProjectSummary` is the basis for #29's Copy/Create source filtering. No test currently asserts it; a regression silently re-includes resources in those pickers.

**Test design**:

1. Extend the existing `FilterProjects_Summary_PopulatesAllFieldsFromScrText` test (around line 343) — assert `stdSummary.IsResource == false` for the already-seeded non-resource projects.
2. Add a new test `FilterProjects_Summary_ResourceProject_IsResourceTrue` that seeds a resource-type ScrText.

**Setup helper needed**: a `ResourceDummyScrText` subclass that overrides `IsResourceProject => true`. Add inside the test fixture (parallel to `LockNotObtainedScrText` in CopyBooksOrchestratorTests.cs). Looks like:

```csharp
private sealed class ResourceDummyScrText : DummyScrText
{
    public ResourceDummyScrText(ProjectDetails details) : base(details) { }
    public override bool IsResourceProject => true;
}
```

Then `CreateScrText` won't help — the fixture's local helper always creates a plain `DummyScrText`. Build the resource project inline in the new test, register it via `AddProject(...)`, run `ProjectFilterService.FilterProjects(...)`, assert the returned `ProjectSummary.IsResource == true`.

### Done #45 — `BookComparisonEntry` dates + `ToIsoOrNull` tests

**Where**: `c-sharp-tests/ManageBooks/CopyBooksOrchestratorTests.cs` (or a new `BookComparisonServiceTests.cs` extension) and `c-sharp-tests/ManageBooks/ImportBooksOrchestratorTests.cs`.
**Why**: The frontend's whole status-comparison heuristic depends on `SourceLastModified` / `DestLastModified` being correctly populated and shaped (ISO-8601 UTC, `null` for empty/missing). Untested today; regression would silently revert all Copy/Import pills to "Undetermined".

**Test cases**:

1. Both source and dest present with distinct timestamps → both fields populated; source/dest order reflects which is newer.
2. Source text empty → `SourceLastModified` is `null` (regardless of `sourceModified` value).
3. Dest text empty → `DestLastModified` is `null`.
4. Both texts present but `DateTime.MinValue` for one side (sentinel from `SafeGetBookModified`) → that side becomes `null`.
5. ISO format check: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}` regex on the produced string.

**Test design**: pre-populate source/dest projects via `PutText`, call `CopyBooksOrchestrator.LoadBooks(fromScrText, toScrText)` (which produces the comparison entries), and inspect `result[i].SourceLastModified` / `.DestLastModified`. The empty-side cases can use the existing `_emptyScrText` pattern in the fixture.

For Import (`ImportBooksOrchestrator.ParseImportFiles`): use the existing test fixture pattern; the source timestamp comes from `preflightSourceTimestamp = DateTime.UtcNow`, so just assert the value is a valid recent ISO string (not null when source text is present).

### Done #46 — Frontend tests for new ProjectSelector behaviors

**Where**: `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.rows.test.ts` (already covers `partitionAndSort`) — add a sibling `project-selector.component.test.tsx` if one doesn't exist, or extend the rows test if it's the right home.
**Why**: The `partitionAndSort` ordering change is already covered. Two NEW behaviors are not:

1. **Search query cleared on popover close** — the `handleOpenChange` callback resets `query` to `''` when `open` flips false.
2. **Scroll-to-selected on popover open** — the `useEffect` on `open` calls `scrollIntoView` on the ref of the selected row.

**Test design** (uses React Testing Library — pattern likely already in the repo; check `markers-checklist` or other component tests):

1. Render `<ProjectSelector mode="project" .../>` with several projects + a selected one.
2. Type into the search input, close the popover, reopen — assert the search input is empty.
3. For scroll-to-selected: harder to assert in jsdom (no real layout). Either mock `scrollIntoView` on the prototype and assert it was called on the selected row's element, OR add a `data-testid` to the selected row and verify the `selectedRowRef.current` points at the right element after open.

If you'd rather skip jsdom-fragile scroll testing, just cover the search-clear case (the more important and reliably-testable behavior). A Storybook play function is the other option but `/review-paratext` flagged stories as a separate item (also unaddressed in this round).

### As-built notes

- **Branch**: `ai/feature/manage-books-rolf-05-11-2026`
- **PR**: paranext-core#2255
- **#44 implementation**: `c-sharp-tests/ManageBooks/ProjectFilterServiceTests.cs` — added a `ResourceDummyScrText` nested subclass (parallels `EncodingConversionFailingScrText` in `CopyBooksOrchestratorTests.cs`), seeded a `_resource` project as a scripture-typed resource, extended `FilterProjects_Summary_PopulatesAllFieldsFromScrText` to assert `IsResource == false` on the non-resource summaries, and added a new test `FilterProjects_Summary_ResourceProject_IsResourceTrue` that asserts the plumbing.
- **#45 implementation**: 4 new tests in `CopyBooksOrchestratorTests.cs` exercising `SetDefaultEligibility` (both timestamps present, source empty, dest empty, MinValue mapping) and 1 integration test in `ImportBooksOrchestratorTests.cs` asserting `ParseImportFiles` surfaces a recent ISO-shaped `SourceLastModified`.
- **#46 implementation**: new `lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.test.tsx` (React Testing Library + userEvent + jsdom). Covers (a) search-clear-on-close via type-then-Escape-then-reopen and (b) scroll-to-selected on open via a `scrollIntoView` spy filtered by `{ behavior: 'auto' }` to distinguish ProjectSelector's call from cmdk's own focus-management call.
- **Verification**: all 246 ManageBooks tests + 3 new frontend tests pass.
