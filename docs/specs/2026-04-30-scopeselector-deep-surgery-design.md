# ScopeSelector deep surgery — design

- **Date**: 2026-04-30
- **Branch**: `ai/feature/markers-checklist-rolf-03-10-2026`
- **Workspace**: `/home/paratext/git/workspaces/markers-checklist/`
- **Component**: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx` (993 lines)
- **Authority**: ScopeSelector is on PR #2212's draft branch tip; the user explicitly authorized free-rein modification.

## 1. Background

ScopeSelector is the platform's general-purpose scope chooser. It supports two visual variants (`radio`, `dropdown`) and six scope modes (`verse`, `chapter`, `book`, `selectedBooks`, `range`, `selectedText`). The dropdown variant routes `selectedBooks` and `range` through a modal dialog whose OK button currently does nothing useful — both scope changes and picker changes commit eagerly via direct callback firing.

Two consumers exist today:

- `extensions/src/platform-scripture/src/checklist.web-view.tsx` — markers-checklist (recent work, dropdown variant, scopes `['verse', 'chapter', 'book', 'range']`)
- `extensions/src/platform-scripture/src/find.web-view.tsx` — find tool (radio variant, scopes `['chapter', 'book', 'selectedBooks']`)

User feedback during PR review surfaced multiple defects, all centered on the dropdown variant's eager-commit semantics and a missing hover indicator. The user requested deep surgery — fix all known defects plus any found in the process.

## 2. Scope

In:

- Internal staging for dropdown-variant `range` and `selectedBooks` dialogs — commit on OK, discard on Cancel/X/Escape.
- Replace `DropdownMenuCheckboxItem` with `DropdownMenuItem` + manual `<Check />` indicator for simple scopes (correct radio-style mutual exclusion).
- Investigate and fix dropdown items' missing hover UI.
- Migrate `markers-checklist` consumer from snapshot semantics (R1) to auto-follow (matches `checks-side-panel`).
- Verify `find` consumer (radio variant) is unaffected.

Out:

- Radio variant behavior changes — eager commit is correct UX for radio buttons; no change.
- Adding `onCommit` callback prop — YAGNI; current consumers don't need atomic commits beyond what individual callbacks + React batching provide.
- Navigate footer commit semantics — eager-fire is correct for navigation; audit-only.
- Backend changes — none.
- Re-pick same scope semantics as a feature — moot under auto-follow.

## 3. Decisions made during brainstorm

| #   | Decision                                                   | Rationale                                                                                                                                                                                                                                                                                                                   |
| --- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | Scope of fix = all enumerated defects                      | User authorized full surgery on a draft component.                                                                                                                                                                                                                                                                          |
| Q2  | Internal staging, same external API (no `onCommit` prop)   | YAGNI; smallest API surface change; preserves backwards compat with both existing consumers.                                                                                                                                                                                                                                |
| Q3  | Switch markers-checklist from snapshot (R1) to auto-follow | PT9 snapshot semantics were a side-effect of its modal UI, not a deliberate UX choice. Auto-follow matches `checks-side-panel`, ScopeSelector's native design, and PT10's idiomatic dropdown UX. Eliminates the re-snapshot question entirely. Users who want a frozen view use `range` mode (which is naturally snapshot). |

## 4. Defect catalogue + resolutions

| #   | Defect                                                                                 | File:Line                                              | Resolution                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Eager commit on `openDialogFallback('range')` and `('selectedBooks')`                  | scope-selector.component.tsx:663-670                   | Replace with `openDialogFallback(targetScope)` that sets draft scope + seeds draft pickers + opens dialog, but does NOT call `handleScopeChange`. New `commitDialog()` helper called from OK button fires `onScopeChange` + relevant range/books callbacks. Dialog `onOpenChange(false)` discards drafts.                                                                                                   |
| D2  | Range/selectedBooks dialog OK button is no-op-close                                    | L950-952, L981-984                                     | Wire OK to `commitDialog()`. Add explicit Cancel button next to OK that just closes (matches conventional dialog UX). X / Escape / clickaway also discard via `onOpenChange(false)`.                                                                                                                                                                                                                        |
| D3  | BCV pickers fire `onRangeStartChange`/`onRangeEndChange` directly while dialog is open | L437-454 (handleRangeStartChange/handleRangeEndChange) | Inside the dialog, BCV pickers write to `draftRangeStart`/`draftRangeEnd` instead of calling the prop callbacks. Same for BookSelector → `draftSelectedBookIds`. Commit on OK.                                                                                                                                                                                                                              |
| D4  | `DropdownMenuCheckboxItem` re-click is no-op                                           | L719-732                                               | Replace simple-scope items with `DropdownMenuItem` + manual `<Check />` indicator (mirrors L681-686 dialog-launcher pattern). `onSelect` always fires `handleScopeChange(value)`. Scopes are mutually exclusive → radio-style is the correct semantic.                                                                                                                                                      |
| D5  | Dropdown items lack mouse-hover UI                                                     | L719-732 + L735-748 + L750-760                         | Investigation: shadcn `DropdownMenuItem` baseline has `focus:tw-bg-accent` which Radix maps from hover via roving focus. If hover doesn't fire focus in this context (likely something with `PopoverPortalContainerProvider` or `DismissableLayer`), add `data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground` to scope item classNames. Verify live in CDP during implementation. |
| D6  | "Scope" label rendered always (FIXED in FU1)                                           | L691                                                   | Keep `hideLabel` prop.                                                                                                                                                                                                                                                                                                                                                                                      |
| D7  | Trigger height not configurable (FIXED in FU1)                                         | L702                                                   | Keep `buttonClassName` prop.                                                                                                                                                                                                                                                                                                                                                                                |
| D8  | Navigate footer audit                                                                  | L838-865                                               | No change — eager-fire is correct UX for navigation.                                                                                                                                                                                                                                                                                                                                                        |

## 5. ScopeSelector changes

### 5.1 New internal state

Inside the component:

```typescript
// Drafts hold dialog state while open; committed on OK, discarded on close-without-commit.
const [draftScope, setDraftScope] = useState<Scope | undefined>(undefined);
const [draftRangeStart, setDraftRangeStart] = useState<SerializedVerseRef | undefined>(undefined);
const [draftRangeEnd, setDraftRangeEnd] = useState<SerializedVerseRef | undefined>(undefined);
const [draftSelectedBookIds, setDraftSelectedBookIds] = useState<string[]>([]);
```

### 5.2 Helper: `openDialogFallback`

```typescript
const openDialogFallback = useCallback(
  (targetScope: Scope) => {
    setDraftScope(targetScope);
    setDraftRangeStart(resolvedRangeStart);
    setDraftRangeEnd(resolvedRangeEnd);
    setDraftSelectedBookIds(selectedBookIds);
    setIsDropdownOpen(false);
    setDialogSub(targetScope);
    // Note: handleScopeChange NOT called here — dialog must be OK'd to commit.
  },
  [resolvedRangeStart, resolvedRangeEnd, selectedBookIds],
);
```

### 5.3 Helper: `commitDialog`

```typescript
const commitDialog = useCallback(() => {
  if (draftScope === undefined) return;
  if (draftScope === 'range') {
    if (draftRangeStart) onRangeStartChange?.(draftRangeStart);
    if (draftRangeEnd) onRangeEndChange?.(draftRangeEnd);
  } else if (draftScope === 'selectedBooks') {
    onSelectedBookIdsChange(draftSelectedBookIds);
  }
  // Fire onScopeChange last so consumers that read updated rangeStart/rangeEnd
  // (e.g. markers-checklist's verseRange computation) see the committed values
  // when they react to the scope change. React batches the resulting state
  // updates within the same handler invocation.
  handleScopeChange(draftScope);
  setDialogSub(undefined);
}, [
  draftScope,
  draftRangeStart,
  draftRangeEnd,
  draftSelectedBookIds,
  onRangeStartChange,
  onRangeEndChange,
  onSelectedBookIdsChange,
  handleScopeChange,
]);
```

### 5.4 Dialog open/close handler

```typescript
const handleDialogOpenChange = useCallback((open: boolean) => {
  if (!open) {
    // Cancel/X/Escape/clickaway — discard drafts, do nothing.
    setDialogSub(undefined);
    setDraftScope(undefined);
  }
}, []);
```

### 5.5 BCV pickers in dialog now write to drafts

Inside the rangeBlock JSX (L514-577), the BCV `handleSubmit` props need to switch between "external eager fire" (radio variant) and "draft fire" (dropdown variant in dialog):

```typescript
// Radio variant: existing behavior (eager fire)
// Dropdown variant inside dialog: write to drafts
const isInDialog = variant === 'dropdown' && dialogSub === 'range';
const handleStartSubmit = isInDialog ? setDraftRangeStart : handleRangeStartChange;
const handleEndSubmit = isInDialog ? setDraftRangeEnd : handleRangeEndChangeWrapper;
```

Same swap for BookSelector's `onChangeSelectedBookIds` in the selectedBooks dialog.

### 5.6 Simple-scope items: DropdownMenuItem + manual check

Replace L719-732:

```jsx
{
  simpleScopes.map(({ value, label, dropdownLabel, scrRefSuffix, id: scopeId }) => (
    <DropdownMenuItem
      key={scopeId}
      ref={assignScopeItemRef(value)}
      className="tw-relative tw-ps-8"
      onSelect={() => handleScopeChange(value)}
      data-selected={scope === value ? 'true' : undefined}
    >
      {scope === value && (
        <span className="tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2">
          <Check className="tw-h-4 tw-w-4" />
        </span>
      )}
      {renderScopeLabel(dropdownLabel ?? label, scrRefSuffix, isDropdownNarrow)}
    </DropdownMenuItem>
  ));
}
```

(`renderDialogLauncherCheck` helper at L681-686 can be unified with this — both use the same check rendering.)

### 5.7 Dialog footer: OK + Cancel buttons

Both dialogs currently have a single OK button that just closes. Add a Cancel button:

```jsx
<DialogFooter>
  <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
    {cancelText}
  </Button>
  <Button ref={rangeOkButtonRef} onClick={commitDialog}>
    {okText}
  </Button>
</DialogFooter>
```

Add `%webView_scope_selector_cancel%` to the SCOPE_SELECTOR_STRING_KEYS array and the localizedStrings.json catalog (default value: `"Cancel"`).

### 5.8 Hover indicator fix

If after replacing CheckboxItem with DropdownMenuItem the hover defect persists (the simple-scope items don't highlight), add an explicit highlight class:

```typescript
className={cn(
  'tw-relative tw-ps-8',
  'data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground',
)}
```

Verify live in CDP. Same audit applied to dialog-launcher items and Navigate footer item.

## 6. Markers-checklist consumer migration to auto-follow

File: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

### 6.1 Drop snapshot state

Remove the `snapshotScrRef` slot:

```typescript
// REMOVED:
// const [snapshotScrRef, setSnapshotScrRef] = useWebViewState<SerializedVerseRef | undefined>(
//   'checklistSnapshotScrRef',
//   undefined,
// );
```

The persisted slot is left orphaned for existing users; `useWebViewState` ignores unknown slots, so this is safe.

### 6.2 Drop the snapshot fallback

```typescript
// Before:
currentScrRef={snapshotScrRef ?? liveScrRef}
// After:
currentScrRef={liveScrRef}
```

### 6.3 handleScopeChange becomes simpler

```typescript
const handleScopeChange = useCallback(
  (newScope: Scope) => {
    setScope(newScope);
    // verseRange is now derived via the auto-follow effect below.
  },
  [setScope],
);
```

### 6.4 New auto-follow effect for verseRange

Replace the seed effect with a derived effect that recomputes verseRange whenever the relevant inputs change:

```typescript
// Auto-follow: recompute verseRange when scope or liveScrRef changes within the
// active scope's coordinate granularity. Debounced 250ms (matches checks-side-panel:496).
const recomputeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
useEffect(() => {
  if (recomputeTimeoutRef.current) clearTimeout(recomputeTimeoutRef.current);
  recomputeTimeoutRef.current = setTimeout(() => {
    const computed = computeRangeFromScope({
      scope,
      ref: liveScrRef,
      rangeStart,
      rangeEnd,
      getEndVerse,
      getLastChapter,
    });
    if (computed) setVerseRange(computed);
  }, 250);
  return () => {
    if (recomputeTimeoutRef.current) clearTimeout(recomputeTimeoutRef.current);
  };
}, [scope, liveScrRef, rangeStart, rangeEnd, getEndVerse, getLastChapter, setVerseRange]);
```

Note: this effect runs on every `liveScrRef` change but writes a new `verseRange` only after 250ms of quiet. The fetch effect (which depends on `verseRange`) only fires when the _coarse_ coordinates of the range actually change — within a chapter, the chapter range is identical, so React's referential check on the new range object still fires the fetch effect, but the backend can dedupe via the request shape. Fine in practice; if backend perf becomes an issue, deep-equality in the fetch effect would prevent it.

### 6.5 Range mode handlers

`handleRangeStartChange`/`handleRangeEndChange` keep their current shape but only fire when `scope === 'range'` is the active scope (existing behavior). With ScopeSelector's new dialog staging, these will fire only at dialog OK time.

## 7. Testing

### 7.1 Unit (Vitest)

No new pure-helper tests. The existing `compute-range-from-scope.utils.test.ts` (9 tests) and `parse-scr-ref.utils.test.ts` (8 tests) cover the helper layer.

### 7.2 ScopeSelector component test

New file: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.test.tsx`. Use Testing Library + jsdom (matching the `useOpenProjectTabs` hook test pattern).

Critical scenarios:

- Open range dialog → drag pickers to new refs → click Cancel → assert `onScopeChange`/`onRangeStartChange`/`onRangeEndChange` were NOT called.
- Open range dialog → drag pickers → click OK → assert all 3 callbacks fired with the picker values.
- Open selectedBooks dialog → toggle a book → click X (close button or Escape) → assert no `onSelectedBookIdsChange`.
- Open selectedBooks dialog → toggle a book → click OK → assert `onSelectedBookIdsChange` fired with the toggled set.
- Re-click currently-active simple scope → assert `onScopeChange` fires (radio semantics).
- Click verse / chapter / book → assert `onScopeChange` fires immediately (no dialog, no staging).

### 7.3 Storybook

Existing `scope-selector.stories.tsx` covers visual variants. Update sample data only if needed.

### 7.4 E2E (Playwright)

Update `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`:

- **Test 2 ("scope freeze")** — invert. Becomes "scope auto-follow — navigation updates trigger label and refetches".
- **Test 3 ("re-pick re-snapshots")** — DELETE. Auto-follow makes this scenario obsolete.
- **Test 4 ("range mode")** — expand to two flows:
  - 4a: Open range dialog → adjust pickers → click OK → assert verseRange request matches picker refs.
  - 4b: Open range dialog → adjust pickers → click Cancel → assert no backend refetch fires.

Net change: 1 test deleted, 2 tests modified, total still around 9 active tests.

### 7.5 Manual verification (CDP)

Live-app walkthrough after implementation:

1. Open markers-checklist on GEN 1. Trigger reads "Chapter: GEN 1".
2. Navigate editor to MAT 5. Trigger updates to "Chapter: MAT 5". Backend refetches MAT 5.
3. Open scope dropdown → click "Range...". Range dialog opens. Trigger STILL reads "Chapter: MAT 5" (scope draft only).
4. Adjust pickers to GEN 1:1 → REV 22:21. Click Cancel. Dialog closes. Trigger STILL "Chapter: MAT 5". No refetch fired.
5. Re-open range dialog. Pickers reseed from current rangeStart/rangeEnd. Adjust to GEN 1:1 → GEN 5:30. Click OK. Trigger updates to "GEN 1:1–GEN 5:30". Backend refetches with the new range.
6. Hover over each scope item in the dropdown. Each highlights with `tw-bg-accent`.
7. Open MarkerSettings dialog. Hover a help icon. Tooltip renders ABOVE the modal (already verified after FU3, regression check).
8. Open the find tool's scope picker (radio variant). Verify scopes still work eagerly (no regression).

## 8. Risks

1. **Auto-follow backend perf** — rapid editor navigation could trigger many refetches. Mitigated by 250ms debounce. If still an issue: deep-equality check on the computed verseRange before calling setVerseRange.
2. **Persisted state breaking change** — `checklistSnapshotScrRef` slot becomes unused. Existing dev-branch users have an orphan slot in their useWebViewState; benign.
3. **Test rewrite churn** — wiring-theme-5.spec.ts needs 3 test updates. Manageable.
4. **PR #2212 conflict surface grows** — ScopeSelector changes are larger this round (~150 LOC of refactor). PR #2212 hasn't moved since `75a22b509f`; if it does, merging will be more involved. User authorized.
5. **Hover defect investigation may reveal a deeper issue** — if `data-[highlighted]` styling doesn't fix it, root cause might be in `PopoverPortalContainerProvider` or `DismissableLayer` interaction. Time-box at 30 minutes; if not fixed, document and ship rest.

## 9. Out of scope

- ScopeSelector `selectedText` mode (no consumer uses it).
- Adding `onCommit` callback prop (YAGNI; current consumers don't need atomic commits).
- Refactoring `find.web-view.tsx` (uses radio variant — unaffected by this surgery).
- Rewriting `scope-selector.stories.tsx` beyond minor updates.

## 10. Success criteria

1. Range dialog: pickers don't fire backend updates until OK; Cancel discards.
2. SelectedBooks dialog: same staging behavior.
3. Dropdown items show hover highlight on mouse-over.
4. Re-clicking the same simple scope re-fires `onScopeChange`.
5. Markers-checklist auto-follows: trigger label and backend update as user navigates.
6. Find tool unaffected (radio variant, eager commits).
7. All ScopeSelector component tests pass.
8. Updated wiring-theme-5 e2e tests pass.
9. Manual walkthrough §7.5 steps complete with screenshots.
