# markers-checklist — Theme 5/4/6 wiring design

- **Date**: 2026-04-29
- **Branch**: `ai/feature/markers-checklist-rolf-03-10-2026`
- **Workspace**: `/home/paratext/git/workspaces/markers-checklist/`
- **Source feedback**: `ai-prompts/ai-porting/.context/features/markers-checklist/feedback/phase-3-ui-feedback-brief.md` — Themes 4, 5, 6
- **Forward-notes addressed**: FN-003 rows T1.7, T1.8, T1.10, T9, T8, T1.1, T1.2 (most close as side-effects of this work)

## 1. Background

The markers-checklist phase-3-ui revise resolved 7 of the 10 themes from PR #2219 review. Theme 5 (wired-up bugs), Theme 4 (SelectorTrigger removal — coupled to Theme 5), and Theme 6 (BookChapterControl verse grid wiring — coupled to Theme 5) remain. The current `extensions/src/platform-scripture/src/checklist.web-view.tsx` ships with **two debug-log stubs** for the primary-project and verse-range toolbar triggers (lines 476–482), in violation of the no-stubs-in-wiring-phase rule (`feedback_no_stubs_in_porting_workflow.md`). The persisted `verseRange` slot (line 169) is also broken: the `useWebViewState` setter is destructured-out, so there is currently no way to update the range from the UI even if the triggers worked.

The remaining work replaces the two stubs with real `ProjectSelector` and `ScopeSelector` instances, fixes the toolbar polish issues (height, alignment, sticky), wires per-row `LinkedScrRefButton` goto navigation, deduplicates project-tab opens in `checks-side-panel`, and extracts the duplicated open-tabs subscription into a shared hook.

## 2. Scope

In:

- Replace the two stub trigger handlers with real `ProjectSelector` (mode='project') and `ScopeSelector` (variant='dropdown') wiring.
- Implement R1 mode-aware snapshot persistence (matches PT9's frozen-range semantics, preserves dropdown's chosen-scope label).
- Add `useWebViewScrollGroupScrRef` binding to the markers-checklist web-view (provides `currentScrRef` for ScopeSelector; provides setter for goto navigation).
- Wire `getEndVerse` via `IVersificationService` (Theme 6).
- Wire `onGotoLinkClick` for the per-row `LinkedScrRefButton` (closes FN-003 T1.8). Combined strategy A+C: scroll-group setter (broadcast) + focus existing editor tab if present.
- Delete the `SelectorTrigger` fallback in `checklist.component.tsx` and trim the now-unused trigger label/onClick props (Theme 4).
- Sticky toolbar wrapper with vertical centering for the match-count text (Theme 5 #5, #7).
- Project-tab dedup in `checks-side-panel.web-view.tsx`'s primary `ProjectSelector` (Theme 5 #8).
- Extract shared `useOpenProjectTabs` hook from the duplicated subscription pattern.
- Robust testing & verification (see §11).

Out:

- Save/Print menu items (FN-002 — separate feature).
- ScopeSelector `selectedBooks` / `selectedText` modes (backend supports a single `ScriptureRange` only; per-book filtering deferred per data-contracts.md v1.5.0).
- Backend changes — none. ScopeSelector + VersificationService are already on this branch from PR #2212's tip.
- Cross-book `getEndVerse` (matches scripture-editor's existing limitation).
- Settings persistence to disk (FN-001 — backend phase work).
- ScopeSelector library changes — no API change required; the snapshot effect is achieved by feeding ScopeSelector our snapshot ref via its existing `currentScrRef` prop.

## 3. Decisions made during brainstorm

| #   | Decision                                                          | Rationale                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | `availableScopes={['verse', 'chapter', 'book', 'range']}`         | Backend's `ChecklistRequest.verseRange` is a single `ScriptureRange`; `selectedBooks` (disjoint) and `selectedText` (editor selection) don't map. data-contracts.md v1.5.0 explicitly defers per-book filtering.                                                                                                                                                                                                                                            |
| Q2  | First-launch default scope = `chapter`                            | PT9's actual default is "All Books" (whole project), but Sebastian flagged that as sluggish in PT10. We deliberately deviate for performance. `chapter` matches `checks-side-panel`.                                                                                                                                                                                                                                                                        |
| Q3  | R1 — mode-aware snapshot persistence                              | PT9's behavior is purely snapshot-based (`ChecklistsTool.cs:155-163`, `VerseRangeChooserForm.cs:162-182`): "Current Verse / Chapter / Book" buttons take a snapshot of `MainWindow.Reference` at click-time and freeze it. ScopeSelector's auto-follow design contradicts this. Persisting `scope` + `snapshotScrRef` + frozen `verseRange` keeps the trigger label informative ("Chapter: GEN 5") while replicating PT9's frozen-backend semantics.        |
| Q4  | Goto strategy = A+C combined                                      | `setLiveScrRef` propagates via the scroll group (broadcast); plus, if an editor tab is open in the same group, raise it via `papi.window.setFocus`. Closer to PT9's "click goto link, editor goes to verse + window comes forward" UX.                                                                                                                                                                                                                      |
| Q5  | Project-tab dedup in checks-side-panel                            | Use existing `openTabsMap` to detect already-open project tabs; focus instead of opening duplicates.                                                                                                                                                                                                                                                                                                                                                        |
| Q6  | Extract `useOpenProjectTabs` hook                                 | Pattern duplicated in two web-views today. Extracting is cheap, reduces drift risk, and the markers-checklist needs an editor-only filtered version anyway for goto focus.                                                                                                                                                                                                                                                                                  |
| Q7  | Sticky toolbar = `tw-sticky tw-top-0 tw-z-10 tw-bg-background`    | Matches `platform-scripture-editor.web-view.tsx:1595` (`tw-block tw-z-10`). Below `Z_INDEX_ABOVE_DOCK=250` so ScopeSelector/ProjectSelector popovers render over the toolbar.                                                                                                                                                                                                                                                                               |
| Q8  | Don't cherry-pick from PR #2212                                   | The markers-checklist branch is branched **directly from PR #2212's tip** (`merge-base = 75a22b509f`). All 14 of PR #2212's commits — including the polish ones (Tooltips, "current" options, hover effects, default values, dialog vs flyout, muted scrRef) — are already on this branch. There is nothing to cherry-pick. **Safeguard**: before final merge, re-fetch `origin/scope_selector_improvements` and cherry-pick any commits past `75a22b509f`. |
| Q9  | Primary-project trigger = real `ProjectSelector` (mode='project') | PT9 confirmed interactive (`cmbPrimaryScrText` ComboBox + `ChangePrimaryScrText` callback in `ChecklistsTool.cs:179`). The earlier "users don't retarget" comment is incorrect.                                                                                                                                                                                                                                                                             |

## 4. Architecture

```
extensions/src/platform-scripture/src/
├── checklist.web-view.tsx                 (major rewrite)
├── checks-side-panel.web-view.tsx         (small fix — focus existing tab)
├── components/checklist.component.tsx     (delete SelectorTrigger; sticky wrapper)
└── hooks/
    └── use-open-project-tabs.ts           (NEW — extracted shared subscription)
```

No backend changes. No `lib/platform-bible-react/` API changes (ScopeSelector accepts the snapshot ref via its existing `currentScrRef` prop — see §6).

## 5. Persisted state model (Q3 R1)

Replace `checklist.web-view.tsx:169` (the broken single `verseRange` slot) with:

```typescript
// Scroll group — provides currentScrRef for ScopeSelector + setter for goto navigation.
const [liveScrRef, setLiveScrRef, scrollGroupId, setScrollGroupId] = useWebViewScrollGroupScrRef();

// Persisted slots (note: scrollGroupId persistence is handled by useWebViewScrollGroupScrRef itself):
const [scope, setScope] = useWebViewState<Scope>('checklistScope', 'chapter');
const [snapshotScrRef, setSnapshotScrRef] = useWebViewState<SerializedVerseRef | undefined>(
  'checklistSnapshotScrRef',
  undefined,
);
const [rangeStart, setRangeStart] = useWebViewState<SerializedVerseRef>(
  'checklistRangeStart',
  defaultScrRef,
);
const [rangeEnd, setRangeEnd] = useWebViewState<SerializedVerseRef>(
  'checklistRangeEnd',
  defaultScrRef,
);
const [verseRange, setVerseRange] = useWebViewState<ChecklistScriptureRange | undefined>(
  'checklistVerseRange',
  undefined,
);
const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
  'checklistSelectedBookIds',
  [],
);
```

Roles:

- `verseRange` is the **frozen** request payload sent to the backend (PT9-equivalent). `undefined` = "All Books" (matches PT9 memento with empty FirstVerseRef/LastVerseRef).
- `scope` + `snapshotScrRef` drive ScopeSelector's display; they do NOT influence the backend request directly.
- `rangeStart` / `rangeEnd` back the BCV pickers shown in `range` mode.
- `selectedBookIds` is wired to ScopeSelector but inert (its mode is not exposed in `availableScopes`).

First-launch seed: when `verseRange === undefined` AND `liveScrRef` becomes available (post-first-render), compute a `chapter` range from `liveScrRef`, then `setVerseRange(computed)` and `setSnapshotScrRef(liveScrRef)`. Subsequent persistence is user-driven.

## 6. ScopeSelector wiring

```typescript
<ScopeSelector
  variant="dropdown"
  scope={scope}
  availableScopes={['verse', 'chapter', 'book', 'range']}
  onScopeChange={handleScopeChange}
  availableBookInfo={booksPresent}
  selectedBookIds={selectedBookIds}
  onSelectedBookIdsChange={setSelectedBookIds}
  localizedStrings={scopeSelectorLocalizedStrings}
  currentScrRef={snapshotScrRef ?? liveScrRef}        // snapshot drives display
  rangeStart={rangeStart}
  rangeEnd={rangeEnd}
  onRangeStartChange={handleRangeStartChange}
  onRangeEndChange={handleRangeEndChange}
  bookChapterControlLocalizedStrings={bcvLocalizedStrings}
  getEndVerse={getEndVerse}
  // No onCurrentScrRefChange → no Navigate footer (matches PT9)
/>
```

`handleScopeChange(newScope)`:

```typescript
const computed = computeRangeFromScope({
  scope: newScope,
  ref: liveScrRef,
  rangeStart,
  rangeEnd,
  booksPresent,
});
setScope(newScope);
setSnapshotScrRef(liveScrRef);
setVerseRange(computed);
```

`handleRangeStartChange(ref)` / `handleRangeEndChange(ref)`:

```typescript
setRangeStart(ref); // or setRangeEnd
if (scope === 'range') setVerseRange({ start: rangeStart, end: rangeEnd }); // refetch
```

`computeRangeFromScope({scope, ref, rangeStart, rangeEnd, booksPresent})` is a pure function:

| `scope`     | Result                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'verse'`   | `{ start: ref, end: ref }`                                                                                                                                          |
| `'chapter'` | `{ start: { ...ref, verseNum: ref.chapterNum === 1 ? 0 : 1 }, end: { ...ref, verseNum: getEndVerse(ref.book, ref.chapterNum) ?? lastVerse(ref) } }` (VAL-003)       |
| `'book'`    | `{ start: { book: ref.book, chapterNum: 1, verseNum: 0 }, end: { book: ref.book, chapterNum: lastChapter(ref.book), verseNum: lastVerse(ref.book, lastChapter) } }` |
| `'range'`   | `{ start: rangeStart, end: rangeEnd }`                                                                                                                              |

`booksPresent` is plumbed through but only read for ScopeSelector's `availableBookInfo` prop — `computeRangeFromScope` doesn't gate on it.

## 7. `getEndVerse` (Theme 6)

Mirrors `platform-scripture-editor.web-view.tsx:351-377`:

```typescript
const currentBookNum = useMemo(() => Canon.bookIdToNumber(liveScrRef.book), [liveScrRef.book]);
const fetchLastVersesInCurrentBook = useCallback(async () => {
  if (!projectId || currentBookNum <= 0) return undefined;
  const versificationService = await papi.networkObjects.get<IVersificationService>(
    'platformScripture.versificationService',
  );
  return versificationService?.lookupFinalVerseNumbersInBook(projectId, currentBookNum);
}, [projectId, currentBookNum]);
const [lastVersesInCurrentBook] = usePromise(fetchLastVersesInCurrentBook, undefined);
const getEndVerse = useCallback(
  (bookId: string, chapterNum: number) => {
    if (Canon.bookIdToNumber(bookId) !== currentBookNum) return 0;
    return lastVersesInCurrentBook?.[chapterNum] ?? 0;
  },
  [currentBookNum, lastVersesInCurrentBook],
);
```

Caveat (inherited from scripture-editor): verse counts are served only for the current book. ScopeSelector's `range` mode allows users to type a different book's reference; for those they get chapter-granular but not verse-granular pickers. Acceptable.

## 8. Primary `ProjectSelector` (Q9)

```typescript
<ProjectSelector
  mode="project"
  projects={primaryProjectCandidates}
  openTabs={openTabs}
  selection={{ projectId }}
  onChangeSelection={(next) => updateWebViewDefinition({ projectId: next.projectId })}
  buttonClassName="tw-h-8 tw-min-w-32 tw-font-normal"
  buttonPlaceholder={localizedStrings['%markersChecklist_toolbar_primaryProject%']}
  ariaLabel={localizedStrings['%markersChecklist_toolbar_primaryProject%']}
/>
```

`updateWebViewDefinition` must be added to the `WebViewProps` destructure at `checklist.web-view.tsx:150` (today only `projectId` and `useWebViewState` are pulled).

`primaryProjectCandidates` = the same `allProjects` list already fetched for the comparative-texts selector (no need for a second roundtrip).

## 9. Goto wiring (Q4 — A + C combined)

```typescript
const handleGotoLinkClick = useCallback((row: ChecklistRow, refStr: string) => {
  const verseRef = parseScrRef(refStr);
  if (!verseRef) return;
  setLiveScrRef(verseRef);                                      // A: scroll-group broadcast
  const editorTab = editorTabsByProject.get(projectId);          // C: focus existing editor
  if (editorTab && editorTab.scrollGroupId === scrollGroupId) {
    papi.window.setFocus({ focusType: 'webView', id: editorTab.webViewId })
      .catch((err) => logger.debug(`focus failed: ${getErrorMessage(err)}`));
  }
}, [setLiveScrRef, editorTabsByProject, projectId, scrollGroupId]);

// Pass to ChecklistTool:
<ChecklistTool
  ...
  onGotoLinkClick={handleGotoLinkClick}
/>
```

`editorTabsByProject` derives from the new `useOpenProjectTabs` hook with a `webView.webViewType === 'platformScriptureEditor.react'` filter, then keyed by `projectId`.

`parseScrRef` helper: parse "GEN 1:1" style strings into `SerializedVerseRef`. Use existing `platform-bible-utils` parsing if available; otherwise local helper.

## 10. New shared hook: `use-open-project-tabs.ts`

```typescript
import papi from '@papi/frontend';
import { useEffect, useMemo, useState } from 'react';
import type { ScrollGroupId } from 'platform-bible-utils';

export interface OpenProjectTabWithWebView {
  webViewId: string;
  projectId: string;
  scrollGroupId: ScrollGroupId;
  webViewType: string;
}

export type WebViewFilter = (webView: { webViewType: string }) => boolean;

export function useOpenProjectTabs(filter?: WebViewFilter): OpenProjectTabWithWebView[] {
  const [tabsMap, setTabsMap] = useState<Map<string, OpenProjectTabWithWebView>>(() => new Map());

  useEffect(() => {
    const upsert = (webView: {
      id: string;
      webViewType?: string;
      projectId?: string;
      scrollGroupScrRef?: unknown;
    }) => {
      const passes =
        !!webView.projectId &&
        typeof webView.scrollGroupScrRef === 'number' &&
        (!filter ||
          (webView.webViewType !== undefined && filter({ webViewType: webView.webViewType })));
      setTabsMap((prev) => {
        const next = new Map(prev);
        if (passes) {
          next.set(webView.id, {
            webViewId: webView.id,
            projectId: webView.projectId!,
            scrollGroupId: webView.scrollGroupScrRef as ScrollGroupId,
            webViewType: webView.webViewType ?? '',
          });
        } else {
          next.delete(webView.id);
        }
        return next;
      });
    };
    const unsubOpen = papi.webViews.onDidOpenWebView(({ webView }) => upsert(webView));
    const unsubUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => upsert(webView));
    const unsubClose = papi.webViews.onDidCloseWebView(({ webView }) => {
      setTabsMap((prev) => {
        if (!prev.has(webView.id)) return prev;
        const next = new Map(prev);
        next.delete(webView.id);
        return next;
      });
    });
    return () => {
      unsubOpen();
      unsubUpdate();
      unsubClose();
    };
  }, [filter]);

  return useMemo(() => [...tabsMap.values()], [tabsMap]);
}
```

Used by:

- `checks-side-panel.web-view.tsx`: replaces L146-185 with `const openTabs = useOpenProjectTabs()`.
- `checklist.web-view.tsx`: replaces L533-564 with two calls — one unfiltered for the comparative ProjectSelector's `openTabs` prop, one filtered for editor-only tabs to drive goto focus. (Or one unfiltered call with derived editor map via `useMemo` — likely cleaner.)

## 11. Tab-dedup in checks-side-panel (Q5 — Theme 5 #8)

```typescript
const handleSelectProject = useCallback(
  (next: { projectId: string; scrollGroupId: ScrollGroupId }) => {
    const existingEditorTab = openTabs.find(
      (t) => t.projectId === next.projectId && t.webViewType === 'platformScriptureEditor.react',
    );
    if (existingEditorTab) {
      papi.window
        .setFocus({ focusType: 'webView', id: existingEditorTab.webViewId })
        .catch((err) => logger.debug(`focus failed: ${getErrorMessage(err)}`));
      setScrollGroupId(existingEditorTab.scrollGroupId);
      updateWebViewDefinition({ projectId: next.projectId });
      return;
    }
    updateWebViewDefinition({ projectId: next.projectId });
    setScrollGroupId(next.scrollGroupId);
  },
  [openTabs, updateWebViewDefinition, setScrollGroupId],
);
```

Caveat: ProjectSelector's `mode='projectScrollGroup'` is the side-panel's mode — the user may select a project AND a scroll group. The dedup logic should match on `projectId` (not `projectId + scrollGroupId`) and steal the scroll group from the existing tab.

## 12. Component-level cleanups (Themes 4 + 5 #4–7)

In `extensions/src/platform-scripture/src/components/checklist.component.tsx`:

- **Delete** `SelectorTrigger` fallback (L86-118 + 3 `?? <SelectorTrigger/>` branches in `renderToolbarStart`). Wired-up web-view always passes real selectors. Theme 4.
- **Drop unused props** from `ChecklistToolProps`: `primaryProjectLabel`, `onPrimaryProjectTriggerClick`, `comparativeTextsLabel`, `onComparativeTextsTriggerClick`, `verseRangeLabel`, `onVerseRangeTriggerClick`. Keep only the `*Selector: ReactNode` props.
- **Sticky toolbar wrapper**: wrap the existing `<TabToolbar>` in a `<div>` with classes `tw-sticky tw-top-0 tw-z-10 tw-bg-background`. The match-count text inside `renderToolbarEnd()` already uses `tw-flex tw-items-center` (verified at L623); ensure the parent toolbar wrapper passes `tw-items-center` so the toolbar's children all align vertically (Theme 5 #5).
- **Localization sweep**: search markers-checklist localized strings for `omitted`/`ommitted` typo (Theme 5 #5 hint).

Already done in earlier commits and verified in this design pass:

- Copy button removed from toolbar (commit `5a5adc64bb`)
- Eye-icon ToggleGroup (commit `8215130557`)
- Marker indent (commit `2312ed1ac0`)
- Per-content RTL via `useProjectSetting` (commit `1aeac5dcbe`)
- Dismissible alert (commit `570ea4af24`)
- LinkedScrRefButton in ref column (commit `54db8a58b8`)
- Simulate-unselect button removed (commit `d6f5da0fdd`)
- Hide Matches disable-when-single-column (commit `61a910c0fd`)

## 13. Errors / edge cases

| Case                                                              | Behavior                                                                                                                                           |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `liveScrRef` undefined at first paint                             | Skip first-launch seed; render with `verseRange=undefined` until ref resolves; do NOT refetch on each frame                                        |
| `versificationService` returns no data                            | `getEndVerse` returns 0 → BCV picker omits verse grid (matches scripture-editor)                                                                   |
| User picks `scope='range'` with empty/equal start and end         | `computeRangeFromScope` produces a 1-verse range; backend treats as valid                                                                          |
| Editor tab closed between goto trigger and focus                  | `papi.window.setFocus` wrapped in `.catch(logger.debug)`                                                                                           |
| User opens checklist with no scroll group bound                   | `useWebViewScrollGroupScrRef` returns a default group; behaves like first-launch                                                                   |
| Snapshot ref refers to a book no longer in `BooksPresent`         | Display label still renders; backend may return empty result which surfaces via the dismissible Alert                                              |
| `parseScrRef` fails on a malformed ref string                     | Bail early in `handleGotoLinkClick`; logger.warn                                                                                                   |
| `scope='range'` and user types invalid ref into rangeStart picker | BCV control rejects invalid input internally; rangeStart stays at last valid ref                                                                   |
| Stale `verseRange` persisted from before this change              | Seed-on-first-load handles fresh installs; for existing dev-branch users with `verseRange=undefined`, the seed kicks in once `liveScrRef` resolves |

## 14. Testing & verification plan

### 14.1 Pure unit tests (Vitest)

New test files:

- `extensions/src/platform-scripture/src/components/compute-range-from-scope.test.ts`:

  - `'verse'` → start=end=ref
  - `'chapter'` ch=1 → start.verseNum = 0 (VAL-003)
  - `'chapter'` ch>1 → start.verseNum = 1
  - `'chapter'` last verse from `getEndVerse` callback
  - `'chapter'` `getEndVerse` returns 0 → fallback (e.g., 200)
  - `'book'` → start=ch1:0, end=lastCh:lastVerse
  - `'book'` with `getEndVerse=undefined` → fallback
  - `'range'` → echoes rangeStart/rangeEnd
  - inputs `undefined`/`null` → defensive returns
  - **Target: 12+ assertions, 100% branch coverage**

- `extensions/src/platform-scripture/src/hooks/use-open-project-tabs.test.ts`:

  - Mocks `papi.webViews.onDid*` returning unsubscribe fns
  - Asserts upsert on Open/Update events with valid project + scrollGroupScrRef
  - Asserts skip when projectId missing
  - Asserts skip when scrollGroupScrRef is not a number
  - Asserts delete on Close event
  - Asserts filter param: include only matching webViewType
  - Asserts cleanup: all three unsubscribers called on unmount
  - **Target: 8+ assertions**

- `extensions/src/platform-scripture/src/checklist.web-view.parse-scr-ref.test.ts` (if local helper):
  - Standard refs: "GEN 1:1", "MAT 28:20"
  - Three-letter book IDs: "1JN 4:7"
  - Whitespace tolerance
  - Invalid input returns undefined
  - **Target: 6+ assertions**

### 14.2 Component tests (React Testing Library + Vitest)

- `checklist.component.test.tsx` updates:
  - Verify `ChecklistTool` renders the three `*Selector` ReactNodes when provided.
  - Verify it does NOT render any `SelectorTrigger` fallback (regression guard for Theme 4).
  - Verify sticky wrapper class names are present.
  - Verify the dropped trigger-label/onClick props are no longer in `ChecklistToolProps` (compile-time check via TypeScript).

### 14.3 Storybook visual regression

- `npm run storybook` and walk all 8 markers-checklist stories. Verify they render identically to the screenshots captured during T1.1/T1.2 work.
- Verify the Wired/Default stories now show the real ScopeSelector + ProjectSelector instances (storybook stories that use the wired component path will need mock data; alternatively keep the stories on the pure-component path with `*Selector` props passing simple buttons).

### 14.4 Backend smoke tests

- Per `.context/standards/backend-smoke-tests.md` and `.context/standards/Testing-Guide.md`. Although this wiring touches no C# code, run smoke tests after the C# `dotnet build` to confirm no incidental breakage. Smoke targets:
  - `c-sharp-tests/Checklists/ChecklistServiceBuildChecklistDataTests.cs` (BuildChecklistData with `verseRange={start,end}` shapes).
  - Golden-master replay tests for marker types.

### 14.5 End-to-end Playwright tests

New file: `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`. Tests follow the ScopeSelector / ProjectSelector / scroll-group integration patterns established in `checks-side-panel` e2e (if any) and the platform-scripture-editor e2e.

| #   | Test                                   | Critical assertion                                                                                                                                                                                         |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | First-launch seed                      | Open checklist on GEN 5:7; assert default scope='chapter'; assert backend received `verseRange={start: GEN 5:0 or 5:1, end: GEN 5:lastVerse}`; trigger label reads "Chapter: GEN 5".                       |
| 2   | Scope freeze (R1)                      | After test 1: navigate the editor to MAT 6:8; assert the checklist trigger label is **still** "Chapter: GEN 5"; assert no new `BuildChecklistData` request fired.                                          |
| 3   | Re-snapshot via re-pick                | After test 2: open ScopeSelector dropdown, click 'chapter' again; assert backend now receives MAT 6 range; trigger label = "Chapter: MAT 6".                                                               |
| 4   | Range mode                             | Open ScopeSelector, pick 'range', set start=GEN 1:1, end=GEN 5:30; assert trigger reads "GEN 1:1–GEN 5:30"; assert backend request with those refs.                                                        |
| 5   | Goto via row link                      | Click the first row's `LinkedScrRefButton` (e.g., GEN 3:5); assert scroll group scrRef updates to GEN 3:5; if editor tab open in same group, assert `papi.window.setFocus` was called with that webViewId. |
| 6   | Goto without editor open               | Same as test 5 with no editor tab open; assert scroll group still updates; no setFocus error logged.                                                                                                       |
| 7   | Primary project retarget               | Click primary ProjectSelector, select different project; assert `updateWebViewDefinition` fires; assert checklist refetches against new project; assert toolbar trigger label updates.                     |
| 8   | Tab dedup in checks-side-panel (Q5)    | Open checks-side-panel; select project A; open editor for A; re-select A from side-panel selector; assert NO new editor tab opens AND focus moves to existing editor.                                      |
| 9   | Sticky toolbar                         | Open checklist with enough rows to require scrolling; scroll the data table; assert the toolbar remains at top of viewport (visual snapshot or DOM `getBoundingClientRect().top` assertion).               |
| 10  | Hide Matches disabled in single column | Open checklist with no comparative texts; assert Hide Matches eye-icon is `disabled`. Add a comparative text; assert Hide Matches becomes enabled.                                                         |

Each test must include screenshot capture at the assertion point for diagnostic purposes.

### 14.6 FN-003 manual verification recipes (visual verification via CDP)

Per `.claude/skills/visual-verification` and `feedback_no_stubs_in_porting_workflow.md`'s reminder ("verify functionally before claiming done"), walk every FN-003 row that this work might exercise as a side effect:

| FN-003 row                                    | Recipe                                                                                                                                                                                                                                  | Pass criterion                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **T1.7** Dismissible alert                    | Trigger an error (e.g., kill data provider mid-fetch via `papi-client` skill); confirm Alert renders with X button; click X; confirm Alert disappears; change inputs (rangeStart, hideMatches); confirm Alert reappears for new content | Alert dismiss + key-on-content un-dismiss both observed |
| **T1.8** LinkedScrRefButton                   | Open checklist with rows; hover ref text; tooltip "Goto {ref}" appears; click; assert scroll-group scrRef updates AND editor (if open in group) focuses                                                                                 | Click registers + scroll-group propagates + focus fires |
| **T1.10** Hide Matches enable/disable         | Open with comparative texts so columnCount>1; toggle Hide Matches; rows hide; remove all comparative texts via comparative selector; assert toggle becomes `disabled`; checked-state resets                                             | Live transition observed                                |
| **T9** Per-content RTL                        | Load an RTL project as primary (Hebrew/Arabic test project if available); open checklist; toggle Show Verse Text; assert `dir="rtl"` on cell content `<div>`                                                                            | RTL renders correctly                                   |
| **T8** ProjectSelector colocation             | Open primary ProjectSelector + comparative texts ProjectSelector; both render normally; types resolve in extension; Storybook story still loads                                                                                         | All rendering paths exercised                           |
| **T1.1** Dynamic stories (hideMatches filter) | Run `npm run storybook`; open ChecklistTool stories; toggle Hide Matches in stories with `isMatch:true` rows; assert rows disappear AND `{N} Matches Omitted` appears                                                                   | Storybook interactivity confirmed                       |
| **T1.2** Story sample data                    | Same Storybook session; for each variant, confirm `firstRef` matches verse content; toggling Show Verse Text in MultiColumn/HideMatches reveals text                                                                                    | Sample data integrity confirmed                         |

Every recipe must produce a screenshot saved in the PR description or a verification log. **No "verified internally" claims without an artifact.**

### 14.7 Type / lint / build gates

Run before each commit; all must pass:

- `npm run typecheck` (root) — full TypeScript project graph
- `npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json` — extension-specific (per `MEMORY.md` lesson: root typecheck silently skips extensions without `typecheck` script)
- `npm run lint` (no warnings policy where possible)
- `npm run format` (auto-runs on commit, but verify locally)
- `npm run build:main` — main + renderer bundles
- `npm run build:extensions` — extension bundles
- `dotnet build c-sharp/` — sanity (no C# changes expected)

### 14.8 Manual sanity walkthrough (live app via CDP)

Final acceptance step before claiming done. Use `app-runner` skill + `visual-verification` skill:

1. `./.erb/scripts/refresh.sh`
2. Open Platform.Bible
3. Open project A (any scripture project)
4. Hamburger → Tools → Markers Checklist
5. Verify default scope='chapter'; rows for current chapter render
6. Switch scope to 'verse', then 'book', then 'range' — verify each freezes correctly (navigate editor between switches, confirm checklist doesn't re-fire)
7. Pick comparative texts via comparative ProjectSelector → verify columns appear → verify Hide Matches becomes enabled
8. Open MarkerSettings (hamburger → Settings…), change Equivalent Markers, OK → verify checklist refetches
9. Click ref link on a row → verify editor (if open) jumps; verify scroll group updates
10. Re-select primary project from primary ProjectSelector → verify checklist switches projects
11. Scroll the rows long enough to test sticky toolbar
12. Trigger an error (e.g., disconnect or invalid input) → verify dismissible Alert
13. Confirm hamburger menu still has Settings + Copy items working

Capture screenshots at each step.

### 14.9 Verification gates (per `verification-before-completion` skill)

Before claiming the work complete:

- All §14.1-§14.5 automated tests pass (output captured)
- All §14.6 FN-003 recipes walked through with screenshots
- All §14.7 type/lint/build gates green (output captured)
- §14.8 manual walkthrough executed end-to-end with screenshots
- No new ESLint warnings (or any added warnings have explicit eslint-disable justifications per `eslint-disable-discipline.md`)
- No new TypeScript `@ts-expect-error` without justification
- `git status` clean except for the intended changeset

**Evidence-before-assertions**: success claims must reference specific artifacts (test output, screenshot path, log lines).

### 14.10 Traceability matrix (deliverable)

Final design output must include a traceability table mapping each Theme item → test/recipe that confirms it. Format:

| Theme item                        | Files touched                  | Test (§14.x)                     | Manual recipe (§14.6 / §14.8) |
| --------------------------------- | ------------------------------ | -------------------------------- | ----------------------------- |
| Theme 5 #1 (verseRange default)   | checklist.web-view.tsx         | §14.5 test 1 (first-launch seed) | §14.8 step 5                  |
| Theme 5 #2 (primary trigger)      | checklist.web-view.tsx         | §14.5 test 7                     | §14.8 step 10                 |
| Theme 5 #3 (verse-range trigger)  | checklist.web-view.tsx         | §14.5 tests 1-4                  | §14.8 step 6                  |
| Theme 5 #4 (trigger height)       | checklist.web-view.tsx         | (visual)                         | §14.8 step 5                  |
| Theme 5 #5 (alignment)            | checklist.component.tsx        | §14.2 component snapshot         | §14.8 step 11                 |
| Theme 5 #6 (copy button removed)  | checklist.component.tsx        | DONE (5a5adc64bb)                | §14.8 step 13                 |
| Theme 5 #7 (sticky)               | checklist.component.tsx        | §14.5 test 9                     | §14.8 step 11                 |
| Theme 5 #8 (tab dedup)            | checks-side-panel.web-view.tsx | §14.5 test 8                     | (recipe in §14.6)             |
| Theme 5 #9 (Simulate button)      | checks-side-panel.web-view.tsx | DONE (d6f5da0fdd)                | n/a                           |
| Theme 4 (SelectorTrigger removal) | checklist.component.tsx        | §14.2 regression guard           | §14.8 step 5                  |
| Theme 6 (getEndVerse)             | checklist.web-view.tsx         | §14.5 test 4 (range mode picker) | §14.8 step 6                  |

The implementation plan must produce this matrix as `.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json` (mirrors the existing CAP-006 traceability format).

## 15. Risks & mitigations

1. **`useWebViewScrollGroupScrRef` adoption is new for the markers-checklist**. Side effect: external `setScrRef` calls now propagate INTO the markers-checklist. Mitigation: the frozen-range model ignores `liveScrRef` changes for refetch decisions, so this is benign. Verify in §14.8 step 6 that scroll-group sync doesn't trigger spurious refetches.
2. **PR #2212 follow-on commits** could land while we work. Mitigation: §3 Q8 safeguard — re-fetch `origin/scope_selector_improvements` before final merge and cherry-pick any commits past `75a22b509f`.
3. **Persistence backwards compatibility**: existing dev-branch users may have stale `checklistVerseRange: undefined`. First-launch seed handles fresh installs; existing users get seeded once `liveScrRef` resolves on next open.
4. **ScopeSelector re-pick on same scope**: clicking 'chapter' twice in a row may not fire `onScopeChange` depending on internal state-equality checks. Mitigation: §14.5 test 3 explicitly exercises re-pick. If it fails, fallback option is a small ScopeSelector enhancement (`onScopeChange` always fires, even on same value) — explicit permission given by user during brainstorm to modify ScopeSelector if needed.
5. **Storybook drift**: removing `*Label`/`onClick` props from `ChecklistToolProps` changes the public surface. Existing markers-checklist stories must be updated to pass `*Selector` ReactNodes (likely simple `<Button>` placeholders for storybook-only renders).
6. **Shared hook adoption in checks-side-panel**: changing from inline subscription to shared hook could regress the side-panel. Mitigation: §14.5 test 8 explicitly exercises checks-side-panel post-change.
7. **`papi.window.setFocus` behavior on closed tabs**: API may throw rather than no-op. Mitigation: wrap in `.catch(logger.debug)` per §13. Test 5 exercises the happy path; test 6 exercises the no-tab path.

## 16. Out-of-scope items captured for follow-up

- FN-002 Save / Print menu items — separate feature when XSLT pipeline ports.
- ScopeSelector `selectedBooks` mode — backend extension when per-book filtering becomes a real requirement.
- Cross-book `getEndVerse` — wider effort, also affects scripture-editor.
- A potential `frozenScrRef` named prop on ScopeSelector — clarifies intent vs. piggy-backing on `currentScrRef`. Not blocking; track as forward-note.

## 17. Success criteria

1. The two stub handlers in `checklist.web-view.tsx:476-482` are replaced with real wiring; no debug-log stubs remain in any wired-up file in this feature.
2. `SelectorTrigger` removed from `checklist.component.tsx`.
3. Backend `BuildChecklistData` requests use a frozen `verseRange` that does NOT auto-update when `liveScrRef` changes (PT9 fidelity).
4. `getEndVerse` is wired and the BCV verse picker in ScopeSelector's range mode renders verse grids for the current book.
5. Per-row `LinkedScrRefButton` clicks update the scroll group; if an editor tab is open in the same group, it focuses.
6. Re-selecting the same project in `checks-side-panel`'s primary ProjectSelector focuses the existing editor tab; no duplicate tab opens.
7. The toolbar is sticky and aligned; trigger heights match (`tw-h-8`).
8. All §14.7 type/lint/build gates pass.
9. All §14.5 e2e tests pass.
10. All §14.6 FN-003 recipes verified with screenshots; all §14.8 walkthrough steps executed.
11. `traceability-theme-5-4-6.json` exists and maps every theme item to its verifying test/recipe.
