# Manage Books — UX Review Round 2 (follow-up)

**Date:** 2026-05-11
**Author:** Rolf (AI-assisted)
**Source:** `~/git/workspaces/manage-books/UX Review of Porting Result - Manage Books.csv`
**Branch (planned):** `ai/feature/manage-books/followup-ux-round-2-rolf-05-11-2026` off `origin/ai/main`
**PR:** single paranext-core PR, staged commits

## 1. Scope and intent

The first round of UX feedback for Manage Books shipped as PR #2220. After that landed in `ai/main`, the UX review surfaced 19 additional items: 4 originally deferred and 15 new (#28–#46 in the CSV, plus #5, #6, #14, #15 from the deferred set). Item #19 (per-book delete permission) stays deferred — it explicitly needs PO input.

This document is the design for resolving those 19 items in a single paranext-core PR, executed as a sequence of small staged commits so that the reviewer can walk the diff stage-by-stage even though everything merges atomically.

No ai-prompts changes are needed for this round — this is paranext-core only.

## 2. Approach

**One branch, one PR, nine staged commit clusters.** Strict ordered execution: stage N must be functionally complete (tests green, smoke checked) before stage N+1 starts. This keeps the diff coherent and gives the reviewer natural review checkpoints.

Acceptance criteria for each stage: zero new ESLint errors (`npm run lint` from repo root), `npm run typecheck` clean (including per-extension typecheck on `platform-scripture`), `npm test` and `dotnet test` green, and a brief in-app smoke for the item(s) addressed in that stage. Final stage 9 runs the same verification on the whole PR.

## 3. Cross-cutting references

UX feedback explicitly cites **Design PR #2224** for items #6, #14, #15, #42, #44 — those stages must consult that PR's source (`manage-books` branch, head `1706c716f1`) before coding, not after. The patterns we borrow are:

- Container-query responsiveness: `tw-@container/actions`, `@md/actions:tw-inline`, `tw-@container/filterbar`, `@md/filterbar:tw-inline`. Located in `lib/platform-bible-react/src/components/advanced/manage-books-dialog/manage-books-dialog.component.tsx` of PR #2224
- Status comparison data shape (`new` / `newer` / `older` / `same` / `onlyInSource` / `onlyInTarget`) and tooltip date format
- Subtitle suppression strategy at narrow widths

A small reference doc — `docs/specs/2026-05-11-manage-books-ux-review-followup-pr-2224-refs.md` — will capture exactly which line ranges of PR #2224 each stage borrows from, so reviewer can verify pattern fidelity quickly.

## 3a. Per-stage investigation workflow

The §5 stage descriptions below are best-guess designs based on a one-pass survey, not certainties. Every stage runs an investigation pass first, surfaces findings, and only then implements. The reasoning: I have already been wrong once in this round (initial recommendation on #15 before user pushback). Across 19 items the failure rate would compound without per-stage verification.

**Format.** A single rolling file `docs/specs/2026-05-11-manage-books-ux-review-followup-investigations.md` is appended to at the start of each stage. Each appendage is a dated section:

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

**Process per stage:**

1. **N.0 — Investigate.** Read the relevant files, verify the spec's premises, surface findings + any clarifying questions, write the section to the investigations file
2. **Checkpoint.** Pause. Surface findings to user. Wait for go-ahead (or correction).
3. **N.1+ — Implement.** Per the (possibly revised) plan
4. **N.last — Verify.** Smoke + tests; commit with stage tag

**For Stages 5, 6, 7** (ProjectSelector cross-feature, status comparison backend, chapter-merge backend), the investigation step ALSO produces a characterization test pinning down current observable behavior **before** the change. Rationale: these stages change behavior that consumers depend on; characterization tests prove the change is deliberate, not accidental.

**For Stages 1–4 + 8** (UI / labels / localization), the investigation is notes-only — characterization is overkill at that risk level.

The PR description will reference the investigations file so the reviewer can read the rationale alongside the diff.

## 4. Items in scope (mapped to CSV rows)

| #   | Area                             | Stage | Note                                                                   |
| --- | -------------------------------- | ----- | ---------------------------------------------------------------------- |
| 5   | Project Selector                 | 5     | Cross-feature (`lib/platform-bible-react/`); affects markers-checklist |
| 6   | Responsive                       | 3     | Clarified by #42                                                       |
| 14  | Status comparison                | 6     | Backend extension; needs PR #2224 reference                            |
| 15  | Chapter merge backend            | 7     | Bug + label rename; see §6                                             |
| 28  | Floating tab                     | 2     | One-line change in `main.ts`                                           |
| 29  | Resource filtering               | 4     | Two distinct project lists                                             |
| 30  | Header full-name tooltip         | 2     |                                                                        |
| 31  | Single-group static header       | 2     |                                                                        |
| 32  | Collapsed-header border          | 2     |                                                                        |
| 33  | Subtitle removal                 | 2     | Coordinates with #42 responsive                                        |
| 34  | Grid–toolbar alignment           | 2     |                                                                        |
| 35  | ProjectSelector name layout      | 5     | TBD design; reviewer confirms                                          |
| 36  | `[object Object]` toast          | 1     | + read-only enforcement sweep                                          |
| 37  | SearchBar height                 | 2     |                                                                        |
| 38  | Create-mode reposition           | 1     | Bug — leftover from #11                                                |
| 39  | Pill hover style                 | 2     | Overrides #24                                                          |
| 40  | Pill tooltip alignment           | 2     | Overrides #7                                                           |
| 41  | Sidebar tooltip side             | 2     |                                                                        |
| 42  | Responsive (clarification of #6) | 3     | Merged into Stage 3                                                    |
| 43  | Filter-dropdown labels           | 2     | Use book-pill badge strings                                            |
| 44  | Status grouping in Copy/Import   | 6     | Built on #14's backend extension                                       |
| 45  | Localization sweep               | 8     | Deliberately last                                                      |
| 46  | Button-in-button DOM error       | 1     | `BookGridSelector` checkbox swap                                       |

Deferred (not in scope): **#19** (needs PO input on per-book delete permission).

## 5. Stages

### Stage 0 — Branch, draft PR, PR #2224 reference doc

Stage 0 is the setup stage; no per-stage investigation needed since the spec itself **is** Stage 0's deliverable.

1. `git fetch origin && git checkout -b ai/feature/manage-books/followup-ux-round-2-rolf-05-11-2026 origin/ai/main`
2. Push, open **draft** paranext-core PR titled `[P3][ui+backend] manage-books: UX review round 2`
3. Fetch design PR #2224's `manage-books` branch into a temp ref so subsequent stages can grep its source
4. Write `docs/specs/2026-05-11-manage-books-ux-review-followup-pr-2224-refs.md` listing each pattern + the PR #2224 file:line ranges it comes from
5. Initialize the investigations file `docs/specs/2026-05-11-manage-books-ux-review-followup-investigations.md` with the template header
6. Commit this design doc + the references doc + the investigations file shell

**Exit criteria:** draft PR exists; design + references docs + empty investigations shell committed; `git log origin/ai/main..HEAD` shows the docs commit only.

### Stage 1 — Bug fixes (#46, #36, #38)

**Stage 1.0 — Investigate** (notes-only)

- Reproduce #46 in dev tools: open Manage Books → Create → confirm the button-in-button warning. Capture exact warning text + DOM path
- Reproduce #36: trigger Copy on a read-only target; capture the literal toast text and the underlying thrown error shape (`logger.warn` / browser devtools)
- For #36 read-only sweep: enumerate the four mutation paths (Create / Copy / Import / Delete) and document where each currently disables vs where it falls through to the orchestrator
- For #38: confirm the "between grid and footer" placement is workable in the current layout — verify no flex shrink conflicts that would push the footer
- Surface findings; pause for checkpoint

**Stage 1.1 — Implement**

**#46** — `BookGridSelector` button-in-button.

- File: `extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx:615–624`
- Change: replace inner Radix `<Checkbox>` (renders as `<button>`) with a presentational SVG checkmark + outlined box. The element is `aria-hidden tabIndex={-1}` already, so semantics are unaffected
- Add a test that asserts the pill `<button>` contains no nested `<button>` descendants

**#36** — `[object Object]` toast on read-only operations.

- File: `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx:967` (`emitThrownError`)
- Change: extract message via fallbacks — `e instanceof Error ? e.message` → `(e as any)?.error?.message` → `(e as any)?.data?.text` → `JSON.stringify(e)`. **Never** render `[object Object]`
- Read-only enforcement sweep: confirm the four mutation paths (Create/Copy/Import/Delete) are UI-disabled when target is read-only. The sidebar disablement (#18) already covers entry; verify the dialog body's submit buttons and the conflict prompts also gate on `isEditable`. Add a unit test stub that drives each path with a read-only target and asserts no orchestrator call is made

**#38** — Create-mode selector position.

- Reposition the create-method `<Select>` so it sits between the book grid and the footer (the second half of CSV row #11's suggested fix, which was missed in round 1)
- File: `manage-books-dialog.component.tsx` — move the `<Select>` JSX out of the action-row container and into a new flex-row container immediately above the footer

**Verification:** Stage 1 commits build, lint, typecheck, test pass; smoke: open Manage Books, switch to Create, confirm new position; trigger a read-only action and verify the toast is a clean message (not `[object Object]`).

### Stage 2 — UI polish

**Stage 2.0 — Investigate** (notes-only)

- For each of the 11 items in this stage, do a quick read of the cited file:line and verify the change is as described. Highest risk of spec error: #34 alignment (depends on actual computed widths), #43 label-rename (depends on Stage 6's grouping; needs a "render labels but keep current grouping" interim plan)
- For #28 floating tab: confirm `addTab`'s `{ type: 'float' }` accepts the proposed `floatSize`; verify default behavior on small monitors doesn't break
- For #41 sidebar tooltip side: verify Radix collision handling at the sidebar's screen edge — `side="top"` may collide for the top-most entry
- Surface findings; pause for checkpoint

**Stage 2.1 — Implement**

Each item below is small and file-scoped. Group into logical commits (one per file or per concern).

- **#28** `extensions/src/platform-scripture/src/main.ts:252` — change `{ type: 'tab' }` → `{ type: 'float', position: 'center', floatSize: { width: 1100, height: 720 } }` (Settings precedent: `src/renderer/services/web-view.service-host.ts:1805`)
- **#30** Header `<ProjectSelector>` trigger gets a tooltip showing the active project's `fullName` (use existing `Tooltip` component; data already available)
- **#31** When `groups.length === 1`, render the group header as a static `<span>` (no chevron, no `<Button>`, always expanded). Toggle behavior + collapse state remain wired but unused. `book-grid.component.tsx`
- **#32** When a header is collapsed, add `tw-border tw-border-border tw-rounded-md tw-px-2` around the header row so the checkbox feels grouped with the label
- **#33** Strip subtitles from `show` / `create` / `copy` / `import` / `delete` sections in `manage-books-sidebar.component.tsx`. Keep subtitles for the workflow group below (progress tracking, book names, introductions)
- **#34** Adjust the toolbar's `tw-pl-*` and the book-grid's left gutter so the first column's pill checkbox horizontally aligns with the toolbar's "select all" checkbox. Verify with rulers in dev tools at the canonical 1100px width
- **#37** `SearchBar` constrained to `tw-h-8` via wrapper; verify via inspecting computed height matches sibling `Select` triggers
- **#39** Override #24: replace the group-hover `[&_>li>button]:!tw-bg-primary [&_>li>button]:!tw-text-primary-foreground` selectors with `hover:tw-bg-primary/20` and **remove** the text-color override. Same for non-interactive `<div>` variant
- **#40** Override #7: pill tooltip `<TooltipContent side="bottom" align="end">` → `align="start"` (bottom-left) — both interactive and non-interactive variants
- **#41** Sidebar tooltip `<TooltipContent side="right">` → `side="top"` (with `side="bottom"` as fallback collision behavior, which Radix handles automatically). `manage-books-sidebar.component.tsx:351`
- **#43** Filter-dropdown radio item labels: rename from internal codes to match book-pill badges / grouping. Map per action:
  - `view`, `create`, `delete`: "in project" / "not in project"
  - `copy`, `import`: "new" / "newer" / "older" / "same" (these depend on Stage 6 backend — for Stage 2, render the labels but keep current grouping logic; Stage 6 will rewire the grouping)

**Verification:** smoke each item visually in app. Confirm subtitle removal in #33 doesn't break alignment.

### Stage 3 — Responsive design (#6 + #42)

**Stage 3.0 — Investigate** (notes-only)

- Read PR #2224's `manage-books-dialog.component.tsx` container-query usages end-to-end (the file:line ranges in the references doc); note which patterns are dialog-shaped vs general-purpose
- Inspect PT10's actual sidebar: does the `<nav>` element have a container ancestor that can host `tw-@container/sidebar`? If not, identify the wrapper change
- Test current Tailwind config: does PT10's `lib/platform-bible-react/` Tailwind config have container-query plugin enabled? If not, that's a precondition
- Find the breakpoints PR #2224 actually uses; PR description claimed `@md` — verify
- Surface findings; pause for checkpoint

**Stage 3.1 — Implement**

Mirror PR #2224's container-query pattern.

- Wrap the action row in `tw-@container/actions`; hide subtitles (Stage 2 #33 removed them from a subset; #42 wants the rest hidden at narrow widths)
- Wrap the filter row in `tw-@container/filterbar`; hide secondary chips with `@md/filterbar:tw-inline`
- Wrap the sidebar in `tw-@container/sidebar`; at narrow container width, collapse to icon-only column with per-item tooltips (already populated by #41)

**PR #2224 references** (to be filled out in stage 0's pr-2224-refs.md):

- Action-row container: `manage-books-dialog.component.tsx:842`
- Filter-bar container: `manage-books-dialog.component.tsx:1082`
- Sidebar pattern: derive from the dialog's overall responsive shape; no direct sidebar in PR #2224 (it's tab-based)

**Verification:** resize the floating Manage Books window from wide to narrow and confirm subtitles + sidebar collapse smoothly without layout jumps.

### Stage 4 — Project filtering (#29)

**Stage 4.0 — Investigate** (notes-only)

- Verify whether `ProjectSummary` (C# wire shape) already includes an `IsResourceProject`-equivalent flag. If yes, frontend-only change. If no, the C# side needs a small extension first
- Inspect `manageBooksApi.filterProjects` purpose values — is there an existing purpose that excludes resources, or does the predicate need to be client-side?
- Confirm Mike's intent: read CSV row #29 alongside #18; verify the two-picker design matches what was suggested
- Test: what does Copy from a read-only project currently do? Does the backend actually allow reading from a read-only source? Confirm before assuming "read-only projects allowed as Copy source"
- Surface findings; pause for checkpoint

**Stage 4.1 — Implement**

Two project lists, two filters.

- **Copy "From" picker (and Create "Based on")** → exclude resources; keep read-only projects. Predicate: `(p) => !p.isResource`. If `ProjectSummary` doesn't already expose `isResource`, add it (the C# `ScrText` has `IsResourceProject`)
- **Header project picker** → unchanged. Currently uses `manageBooksApi.filterProjects({ purpose: 'AllScripture' })`; that already includes resources

Refactor: factor the resource-filter into a named predicate in `manage-books.web-view.tsx` so both pickers reference the same logic.

Add a unit test for the predicate (covers `isResource=true → excluded` and `isEditable=false → included`).

### Stage 5 — ProjectSelector cross-feature (#5, #35)

**Stage 5.0 — Investigate** (notes + characterization tests)

Cross-feature changes need characterization. Goals:

- Read all current consumers of `ProjectSelector` (grep `@/components/advanced/project-selector` and `from 'platform-bible-react'` import lines); enumerate consumers in the investigations file
- Read `project-selector.component.tsx` end-to-end; understand the current "float selected to top" logic + filter-text persistence
- For each consumer, identify how a behavior change in this component lands: does it just re-render, or does the consumer have its own state expectations?
- Inspect the BookChapter selector's scroll-to-selected logic so we can mirror it (file:line)

**Characterization tests** (added BEFORE any change):

- Test `project-selector.stories.tsx` interactions: confirm current selected-row position (top of list when ordering is "alphabetical"); confirm filter text persists across reopens
- Add a markers-checklist multi-select test that captures current behavior
- Run both; commit as the pre-change pin. Any later behavior change is visible as a test diff

If anything in the investigation suggests #35's TBD layout is more constrained than expected, surface and pause.

Pause for checkpoint.

**Stage 5.1 — Implement**

Both items live in `lib/platform-bible-react/src/components/advanced/project-selector/`. Markers-checklist also consumes this component, so verify its multi-select behavior after each change.

**#5** — replace float-to-top with scroll-to-selected; clear filter on close.

- Current behavior puts the selected project at the top of the dropdown — disorienting
- New: keep stable canonical ordering, scroll the selected row into view on open. Mirror the `BookChapter` selector's scroll-to-selected pattern
- On close (Popover `onOpenChange(false)`), reset the internal filter text to empty

**#35** — separated short / long name layout (TBD design).

- Current: single-line `shortName • fullName` (truncating, tooltip surfaces clipped fullName)
- Proposal: two-line — `shortName` bold-regular on top; `fullName` muted/smaller below. Keep tooltip for very long names.
- This is a designer call — propose in the PR description with an in-app screenshot and explicitly request Sebastian's confirmation. If reviewer rejects the proposal, revert to single-line in a follow-up commit

Test impact: re-run `project-selector.rows.test.ts`. Manually verify markers-checklist multi-select still works.

### Stage 6 — Status comparison (#14, #44)

**Stage 6.0 — Investigate** (notes + characterization tests)

- Read PR #2224's status-comparison data flow end-to-end: where is `lastModified` sourced from (`ScrText` API? `BookFileInfo`?), how is the `state` derived, what's the exact wire shape
- Identify whether PR #2224's flow can be lifted into PT10 directly or needs adaptation for the data provider boundary
- Read PT10's existing `BookComparisonResult` + the calls that produce it; identify the minimal extension surface
- Check whether there's already a PAPI `compareBooks`-like method (avoid duplicating)
- Decide whether new method or extension of existing — surface as a question if ambiguous

**Characterization tests** (added BEFORE any change):

- C# unit test pinning current `BookComparisonResult` shape (so we can detect breakage)
- A test against the current Copy/Import UI grouping ("in project" / "not in project") so behavior change is visible
- Run; commit as pre-change pin

Pause for checkpoint — especially on the wire-shape choice; the user may want me to mirror PR #2224 verbatim or to adapt.

**Stage 6.1 — Implement**

Build on PR #2224 patterns.

**Backend (C#).** Extend the comparison result so the wire carries both modification timestamps:

```csharp
// Existing
public record BookComparisonResult(...);

// Extend with:
public record BookComparisonResult(
    ...,
    DateTime? LastModifiedSource,
    DateTime? LastModifiedTarget
);
```

Add a new PAPI method `manageBooksApi.compareBooks(projectIdA: string, projectIdB: string): Promise<BookComparison[]>` returning per-book `{ bookId, source, target, state }` where `state ∈ 'new' | 'newer' | 'older' | 'same' | 'onlyInSource' | 'onlyInTarget'`. The exact wire shape must mirror PR #2224's `manage-books-dialog.component.tsx` — derive from there.

**Frontend.** In `manage-books-dialog.component.tsx`:

- Add a hook `useBookComparison(sourceId, targetId)` that calls `compareBooks` and exposes per-book state
- In Copy mode + Import mode, replace today's "in project" / "not in project" grouping with `new` / `newer` / `older` / `same` derived from `useBookComparison`
- Per-pill badge renders the state; tooltip surfaces both modification dates (`Source: 2024-03-15`, `Target: 2024-08-02`)
- Match exact label ordering from PR #2224

**Tests:**

- C# unit on `CompareBooks` (golden master from two fixture projects with known modification times)
- TS test on `useBookComparison` with mocked PAPI

### Stage 7 — Chapter-merge backend wiring (#15)

**Stage 7.0 — Investigate** (notes + characterization tests)

This stage already had a partial investigation during brainstorming (see §6.1). Stage 7.0 finishes it and locks down assumptions before code changes.

Investigation tasks:

- Re-read PT9 `ImportSfmText.WriteChaptersToBook` line-by-line; document the empty-chapter regex behavior, the chapter1 special case, the PutText call shape, and the WriteLock pattern
- Confirm PT10 has access to `ScrText.SplitIntoChapters`. If not, identify the equivalent or whether we need to port the splitter
- Read `DummyScrText.InMemoryFileManager` and trace what happens when `PutText(bookNum, chapterNum>0, ...)` is called: which file paths get touched, what does `OpenFileForWrite` do for the per-chapter case
- Read `CopyBooksOrchestrator` — find the analogous gap that needs the same fix
- Check whether the PAPI signature for `copyBooks` already has a `strategy` parameter or needs adding (CSV row #16's note suggests it doesn't)

**Characterization tests** (added BEFORE any change):

- Build a C# test fixture: project A has Gen 1-3 (with content), project B has Gen 1-5 (with content). Snapshot project B's state after current `replaceEntireBook=false` runs — this is the bug behavior. Pinning it makes the fix's test diff explicit
- Similar fixture for Copy
- Run; commit as pre-change pin

Pause for checkpoint — especially on:

- Whether the user wants me to mirror PT9 verbatim (current spec choice) or revisit
- The label rename strings (current spec proposes "Merge book(s)" / "Merge from source"; user may have preferred wording)

**Stage 7.1 — Implement**

This is the longest stage. See §6 for the full rationale.

**Investigation summary (verified in PT9 source):**

PT9's two import behaviors are real, both selectable via the single checkbox `chkReplaceEntireBooks` in `Paratext/FileMenu/ImportBooksForm.Designer.cs:116`:

- _Checked_ → `ImportSfmText.ImportBooks(..., replaceEntireBook=true)` → `FileUtils.WriteTextToFile` (whole-book overwrite)
- _Unchecked_ → `ImportSfmText.ImportBooks(..., replaceEntireBook=false)` → `WriteChaptersToBook` (per-chapter PutText; empty source chapters skipped; dest chapters not in source kept; **source chapters overwrite dest chapters that exist in both**)

PT10's port:

- `ImportBooksOrchestrator.TryPutBook` (`c-sharp/ManageBooks/ImportBooksOrchestrator.cs:809`) currently calls `scrText.PutText(bookNum, 0, false, bookText, null)` **regardless** of `replaceEntireBook` — that's the bug. The chapter-merge path was deferred at port time citing the test seam, which on review is not actually a blocker (`InMemoryFileManager` routes per-chapter `PutText` calls through the same `OpenFileForWrite` path as whole-book writes)
- `CopyBooksOrchestrator` has the analogous gap — Vladimir #16's third button is wired to the UI but the backend `strategy` parameter doesn't reach the orchestrator
- The PT10 UI labels `manageBooks_import_nonExistingChapters` ("Import non-existing chapters") and `manageBooks_copy_confirmNonExistingChapters` ("Copy non-existing chapters") are PT10 inventions that do not match PT9's actual merge semantic (which overwrites collisions)

**Design.**

Backend:

1. Port PT9's `WriteChaptersToBook` semantics into PT10. New private method in `ImportBooksOrchestrator` (and a parallel one in `CopyBooksOrchestrator`):
   ```csharp
   private static bool TryPutBookChaptersMerged(
       ScrText scrText, int bookNum, string bookText, List<AlertEntry> errors);
   ```
   - Use `ScrText.SplitIntoChapters(scrText.Name, bookNum, bookText)` for the split (same call PT9 uses)
   - Empty-source-chapter regex matches PT9: `^(\\id [^\r\n]*)?\s*$`
   - For each remaining chapter, `PutText(bookNum, chapterIdx + 1, false, chapter, null)` — same per-chapter write PT9 uses
   - Skip empty source chapters except when (a) the source chapter is chapter 1 and (b) the dest book is empty (PT9 rule, preserves the "import into empty book" path)
2. Plumb `Strategy` (enum `ReplaceEntireBook` | `MergeFromSource`) end-to-end through `CopyBooks` / `ImportBooks` PAPI signatures. `Strategy.MergeFromSource` calls the new method; `Strategy.ReplaceEntireBook` keeps the current `PutText(bookNum, 0, ...)` path
3. Verify the InMemoryFileManager passes per-chapter writes correctly. If a test surfaces an issue, fix it in `DummyScrText.cs`; do not silently revert to whole-book writes

Frontend (label rename):

- `manageBooks_import_nonExistingChapters` English default: `"Import non-existing chapters"` → `"Merge book(s)"`
- `manageBooks_copy_confirmNonExistingChapters` English default: `"Copy non-existing chapters"` → `"Merge from source"`
- Update component comments in `import-conflict-prompt.component.tsx` and `copy-conflict-prompt.component.tsx` to describe the actual PT9 merge semantic (overwrite collisions; keep non-overlapping dest chapters; skip empty source chapters)

Tests:

- New C# orchestrator tests for both strategies. Fixture: source project has Gen 1-3 (with content), dest has Gen 1-5 (with content). After `MergeFromSource`: dest has Gen 1-5; Gen 1-3 reflect source content; Gen 4-5 unchanged
- After `ReplaceEntireBook`: dest has Gen 1-3 only (source's range)
- E2E: trigger the "Merge book(s)" button from the import-conflict prompt and observe the dest is merged, not clobbered

PR-description note explicitly explains: PT10 makes PT9's two behaviors more discoverable (two buttons vs PT9's hidden-default checkbox); doesn't add a new behavior; corrects a misleading label.

### Stage 8 — Localization sweep (#45)

**Stage 8.0 — Investigate** (notes-only)

- Grep the four target areas for hardcoded user-visible strings. Produce a concrete list before localizing — review for any that are intentionally English (debug strings, internal type tags, etc.)
- Inspect existing `manageBooks_*` key naming conventions and propose new keys following the same scheme
- Check for duplicates: a string that's already localized under one key but hardcoded elsewhere
- Surface findings + the candidate-keys table; pause for checkpoint

**Stage 8.1 — Implement**

Deliberately last so we don't churn keys mid-flight.

1. Grep the four target areas for hardcoded user-visible strings:
   - `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx`
   - `lib/platform-bible-react/src/components/advanced/project-selector/*` (only paranext-core-side strings; localization framework lives elsewhere)
   - Header + footer regions in `manage-books-dialog.component.tsx`
2. For each, replace literal with `t('%manageBooks_*%', '<English default>')` using the existing `t` helper
3. Run `npm run lint` from repo root — the `no-hardcoded-jsx-strings` rule must pass

### Stage 9 — Verification + PR finalization

Stage 9 has no investigation step — it is itself the final verification.

- Repo-level `npm run lint`, `npm run typecheck`, `npm test`, `cd c-sharp-tests && dotnet test`
- Smoke each of the 19 items in a running paranext-core (`./.erb/scripts/refresh.sh` to start)
- Convert draft PR → ready for review
- PR description: table of 19 items × stage × commit-hash range × screenshot/proof, plus a pointer to the investigations file so reviewer can see the reasoning trail
- Call out the four explicit reviewer-confirmation items: #15 PT9 label rename, #35 ProjectSelector layout, #29 resource handling for header, #5 scroll-to-selected behavior
- Verify each stage's checkpoint outcome is reflected in the investigations file — no orphan "pause for checkpoint" sections without a "Decision" subsection

## 6. Decision log

> These decisions reflect the spec's current best-guess starting position. Each stage's investigation step may surface evidence that refines or overrides one — when that happens, the override is recorded in the investigations file's "Decision (filled after user checkpoint)" subsection for that stage, and a brief note is added below pointing to it.

### 6.1 #15: rename PT10 labels to match PT9 behavior

**Decision:** rename `manageBooks_import_nonExistingChapters` and `manageBooks_copy_confirmNonExistingChapters` English defaults from "Import/Copy non-existing chapters" to "Merge book(s)" / "Merge from source" respectively. Backend ports PT9's `WriteChaptersToBook` semantic (overwrite collisions, keep non-overlapping dest chapters).

**Rationale:** the literal "non-existing chapters" label was invented in PT10 and promises a behavior PT9 doesn't have. Rather than implement a new PT9-divergent semantic (Option B earlier in this brainstorm), we port faithfully and fix the label. This preserves PT9 fidelity and corrects the misdescription in one move.

**Trade-off:** if a future stakeholder genuinely wants "skip existing chapters only" they will need a separate effort. Not in scope here.

### 6.2 #35: ProjectSelector new-style design is TBD

**Decision:** propose a 2-line layout (shortName above, fullName below) as a starting point. Surface in PR description as an explicit reviewer confirmation. Revert to single-line if Sebastian rejects.

**Rationale:** Sebastian's spreadsheet description is too thin to commit to a final design. Punting to a clarifying conversation would block the rest of Stage 5. Proposing-and-asking is faster.

### 6.3 #29: resource handling differs per picker

**Decision:** Copy/Create source pickers exclude resources; header picker includes them. Two distinct filter predicates.

**Rationale:** Mike's CSV note: "Copy should not include resources for copyright purpose, but should include read-only projects. For the project dropdown in the upper left… include resources." Different pickers serve different intents — one is "what project am I viewing/managing" (resources welcome), the other is "what am I copying from" (resources blocked by license).

### 6.4 Single PR, staged commits — not multiple PRs

**Decision:** one branch, one PR, nine ordered staged commits. (User decision in brainstorm.)

**Rationale:** multiple PRs would add alignment overhead (rebases, dependency tracking, cross-PR review coordination). Stages give the reviewer per-step review without splitting the diff across PRs.

### 6.5 Localization sweep last, not first

**Decision:** sweep all hardcoded strings in Stage 8 after UI work stops moving.

**Rationale:** churning localize keys during UI rewrites costs translator handoff time. Doing it once at the end is cleaner than once-per-stage. Trade-off: linter would catch new hardcoded strings before stage 8 but won't catch the pre-existing ones until then — accepted.

### 6.6 No new Storybook stories for these changes

**Decision:** rely on running-app verification, not Chromatic. (User decision in brainstorm.)

**Rationale:** scope of changes is broad-and-shallow; Storybook coverage for every tweak would dwarf the actual fix work. Visual regression risk is mitigated by stage-by-stage in-app smoke and the existing Storybook tests.

## 7. Open items not in this PR

- **#19** — per-book delete permission filtering (CSV says "needs PO"). Not in scope. Track as a separate ticket once PO responds.

## 8. Risks

- **Stage 7 backend chapter-merge** is the highest-risk stage — touching live ScrText writes during real imports. Mitigations: (a) full C# test coverage with golden masters for both strategies, (b) deferred to late in the PR so reviewer can isolate it, (c) explicit PR-description note flagging the divergence-from-current-PT10-behavior
- **Stage 5 ProjectSelector** changes affect markers-checklist (cross-feature). Manual verification required post-change
- **Stage 6 status comparison** adds a new PAPI method. Wire-shape must match design PR #2224 exactly so future consumers don't need to re-derive
- **#28 floating tab** changes default placement — existing users who had Manage Books in a particular dock position will see it open as floating after upgrade. Acceptable; matches Settings precedent

## 9. Verification matrix

Each row gets a checkbox at Stage 9 verification:

| CSV #  | Verification                                                                            |
| ------ | --------------------------------------------------------------------------------------- |
| 5      | Selected project scrolls into view on open; filter text empty on reopen                 |
| 6 + 42 | Window resize hides subtitles and collapses sidebar without jumps                       |
| 14     | `compareBooks` PAPI returns timestamped per-book state                                  |
| 15     | Merge button leaves Gen 4-5 untouched when source has only Gen 1-3                      |
| 28     | Manage Books opens as a floating ~1100×720 panel                                        |
| 29     | Copy "From" doesn't list resources; header dropdown does                                |
| 30     | Header tooltip shows full project name                                                  |
| 31     | Single-group header has no chevron and isn't a button                                   |
| 32     | Collapsed group header has a visible border                                             |
| 33     | Sidebar entries for Show/Create/Copy/Import/Delete have no subtitle                     |
| 34     | First pill checkbox aligns with select-all checkbox                                     |
| 35     | ProjectSelector row shows separated short/long name                                     |
| 36     | Read-only action shows clean toast text (no `[object Object]`); operations are disabled |
| 37     | SearchBar height matches sibling Select height                                          |
| 38     | Create-mode Select sits between grid and footer                                         |
| 39     | Pill hover is `bg-primary/20` with unchanged text color                                 |
| 40     | Pill tooltip appears bottom-left                                                        |
| 41     | Sidebar tooltip appears top (or bottom on collision)                                    |
| 43     | Filter dropdown labels match book-pill badges                                           |
| 44     | Copy/Import grouping uses new/newer/older/same                                          |
| 45     | `npm run lint` passes; no `no-hardcoded-jsx-strings` violations in target files         |
| 46     | DevTools console shows no "button cannot appear as descendant of button" warning        |
