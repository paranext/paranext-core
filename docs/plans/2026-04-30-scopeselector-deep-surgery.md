# ScopeSelector Deep Surgery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `ScopeSelector` to defer dialog-based scope commits until OK, fix dropdown hover, replace CheckboxItem with radio-semantic DropdownMenuItem; migrate `markers-checklist` consumer from snapshot semantics to auto-follow.

**Architecture:** Internal staging via `useState` drafts inside `ScopeSelector`. Drafts seed from props on dialog open, write through to existing callbacks on OK, discard on Cancel/X/Escape. Markers-checklist consumer drops `snapshotScrRef` and recomputes `verseRange` from `liveScrRef` via a 250ms-debounced effect.

**Tech Stack:** TypeScript / React / `@papi/frontend` / `platform-bible-react` (DropdownMenu, Dialog, BookChapterControl, BookSelector) / Radix UI primitives / Vitest + Testing Library / Playwright (CDP) / shadcn-ui.

**Spec:** `docs/specs/2026-04-30-scopeselector-deep-surgery-design.md` (committed `8f507156a4`).

**Workspace:** `/home/paratext/git/workspaces/markers-checklist/paranext-core/`.

---

## File Structure

| Path                                                                                                | Action         | Responsibility                                                                                         |
| --------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`      | MAJOR REFACTOR | Internal draft state + commit-on-OK + DropdownMenuItem swap + hover styling                            |
| `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.test.tsx` | CREATE         | Component test for staging behavior (5 scenarios)                                                      |
| `extensions/src/platform-scripture/contributions/localizedStrings.json`                             | MOD            | Add `webView_scope_selector_cancel` key                                                                |
| `extensions/src/platform-scripture/src/checklist.web-view.tsx`                                      | MOD            | Drop `snapshotScrRef`; pass `liveScrRef` to ScopeSelector; replace seed effect with auto-follow effect |
| `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`                                          | MOD            | Invert test 2 (auto-follow); delete test 3 (re-snapshot obsolete); expand test 4 (OK + Cancel)         |
| `lib/platform-bible-react/dist/*`                                                                   | REBUILD        | Auto-regen by `npm run build:basic`                                                                    |
| `.context/features/markers-checklist/proofs/e2e-evidence/wiring/surgery/`                           | NEW DIR        | Manual verification screenshots                                                                        |
| `.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json`                  | MOD            | Append surgery section to traceability                                                                 |

---

## Conventions

- **Commit message prefix**: `[P3][ui] markers-checklist:` for code; `[P3][test]` for test-only commits.
- **TDD**: Phase 4 (ScopeSelector test) precedes Phase 5 markers-checklist migration so the new staging contract is locked first.
- **Test command**: `npm test {path}` from root (workspace already passes `--run`); or `npx vitest --run {path}` from inside the workspace dir.
- **Build dance for lib changes**: after editing `lib/platform-bible-react/src/`, run `cd lib/platform-bible-react && npm run build:basic` (skip `lint-fix` step which has unrelated failures), then `npm run build:extensions` from root so extensions pick up the new types.

---

## Phase 1: ScopeSelector internal staging refactor

### Task 1: Add draft state hooks

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 1.1: Find the existing `dialogSub` useState**

```bash
grep -n "const \[dialogSub" lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

Expected: line 584 (subject to drift after our prior edits): `const [dialogSub, setDialogSub] = useState<Scope | undefined>(undefined);`

- [ ] **Step 1.2: Add 4 draft state hooks immediately after `dialogSub`**

Right after the `dialogSub` useState declaration, add:

```typescript
// ─── Dialog staging (D1, D2, D3) ──────────────────────────────────────────
// While a range / selectedBooks dialog is open, edits accumulate into these
// drafts. They commit (via the prop callbacks) on OK and discard on
// Cancel/X/Escape. No callback fires while the dialog is open.
const [draftScope, setDraftScope] = useState<Scope | undefined>(undefined);
const [draftRangeStart, setDraftRangeStart] = useState<SerializedVerseRef | undefined>(undefined);
const [draftRangeEnd, setDraftRangeEnd] = useState<SerializedVerseRef | undefined>(undefined);
const [draftSelectedBookIds, setDraftSelectedBookIds] = useState<string[]>([]);
```

- [ ] **Step 1.3: Run typecheck**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core
cd lib/platform-bible-react && npx tsc --noEmit && cd -
```

Expected: PASS (the unused state variables won't fire a typecheck error since `useState` setters are always read).

- [ ] **Step 1.4: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
git commit -m "[P3][ui] markers-checklist: ScopeSelector — add draft state for dialog staging

Adds draftScope/draftRangeStart/draftRangeEnd/draftSelectedBookIds useState
hooks. They will be wired in subsequent commits. Per spec D1-D3 / §5.1."
```

---

### Task 2: Refactor `openDialogFallback` to seed drafts (no eager commit)

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 2.1: Find current `openDialogFallback`**

```bash
grep -n "openDialogFallback" lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

It's around L663-670 (subject to drift):

```typescript
const openDialogFallback = useCallback(
  (targetScope: Scope) => {
    handleScopeChange(targetScope);
    setIsDropdownOpen(false);
    setDialogSub(targetScope);
  },
  [handleScopeChange],
);
```

- [ ] **Step 2.2: Replace with the seeding version**

```typescript
const openDialogFallback = useCallback(
  (targetScope: Scope) => {
    // D1: seed drafts from current props/state; do NOT commit scope yet.
    // commitDialog (Task 3) fires onScopeChange + range/books callbacks on OK.
    setDraftScope(targetScope);
    setDraftRangeStart(resolvedRangeStart);
    setDraftRangeEnd(resolvedRangeEnd);
    setDraftSelectedBookIds(selectedBookIds);
    setIsDropdownOpen(false);
    setDialogSub(targetScope);
  },
  [resolvedRangeStart, resolvedRangeEnd, selectedBookIds],
);
```

(`resolvedRangeStart` / `resolvedRangeEnd` already exist as memoized values further up the component — search for `const resolvedRangeStart` to confirm.)

- [ ] **Step 2.3: Run typecheck + build**

```bash
cd lib/platform-bible-react && npx tsc --noEmit && cd -
```

Expected: PASS. Component now silently does nothing on dialog OK (the existing OK button still just closes the dialog) — but Task 4 wires it.

- [ ] **Step 2.4: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
git commit -m "[P3][ui] markers-checklist: ScopeSelector — openDialogFallback seeds drafts only

Removes the eager handleScopeChange call from openDialogFallback. Replaces it
with seeding the new draft state. Dialog OK button still just closes — Task 4
wires it to actually commit. Per spec D1 / §5.2."
```

---

### Task 3: Add `commitDialog` and `handleDialogOpenChange` helpers

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 3.1: Add `commitDialog` immediately below `openDialogFallback`**

```typescript
const commitDialog = useCallback(() => {
  if (draftScope === undefined) return;
  if (draftScope === 'range') {
    if (draftRangeStart) onRangeStartChange?.(draftRangeStart);
    if (draftRangeEnd) onRangeEndChange?.(draftRangeEnd);
  } else if (draftScope === 'selectedBooks') {
    onSelectedBookIdsChange(draftSelectedBookIds);
  }
  // Fire onScopeChange last so consumers reading committed range/book values
  // (e.g. markers-checklist post-migration: verseRange computed from rangeStart/rangeEnd
  // when scope === 'range') see updated values when they react to the scope change.
  // React batches these state updates within the same handler invocation.
  handleScopeChange(draftScope);
  setDialogSub(undefined);
  setDraftScope(undefined);
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

- [ ] **Step 3.2: Add `handleDialogOpenChange` directly below `commitDialog`**

```typescript
const handleDialogOpenChange = useCallback((open: boolean) => {
  if (!open) {
    // Cancel/X/Escape/clickaway — discard drafts, no callbacks fire.
    setDialogSub(undefined);
    setDraftScope(undefined);
  }
}, []);
```

- [ ] **Step 3.3: Typecheck**

```bash
cd lib/platform-bible-react && npx tsc --noEmit && cd -
```

Expected: PASS.

- [ ] **Step 3.4: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
git commit -m "[P3][ui] markers-checklist: ScopeSelector — add commitDialog + handleDialogOpenChange

commitDialog fires onScopeChange + onRangeStart/EndChange + onSelectedBookIdsChange
based on draftScope. handleDialogOpenChange discards drafts on close. These are
wired into the dialog JSX in Task 4. Per spec D1, D2 / §5.3, §5.4."
```

---

### Task 4: Wire OK + Cancel buttons + onOpenChange in both dialogs

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 4.1: Find the selectedBooks Dialog block**

```bash
grep -n "dialogSub === 'selectedBooks'" lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

Around L922-955 (subject to drift). The current `<Dialog onOpenChange>` callback is:

```typescript
        <Dialog
          open={dialogSub === 'selectedBooks'}
          onOpenChange={(open) => {
            if (!open) setDialogSub(undefined);
          }}
        >
```

- [ ] **Step 4.2: Replace with the helper**

```typescript
        <Dialog
          open={dialogSub === 'selectedBooks'}
          onOpenChange={handleDialogOpenChange}
        >
```

- [ ] **Step 4.3: Find the selectedBooks Dialog OK button**

Around L950-952:

```typescript
              <DialogFooter>
                <Button onClick={() => setDialogSub(undefined)}>{okText}</Button>
              </DialogFooter>
```

- [ ] **Step 4.4: Replace with OK + Cancel**

```typescript
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  {cancelText}
                </Button>
                <Button onClick={commitDialog}>{okText}</Button>
              </DialogFooter>
```

- [ ] **Step 4.5: Find the range Dialog block**

Around L957-988. The current `<Dialog onOpenChange>` and `<DialogFooter>`:

```typescript
        <Dialog
          open={dialogSub === 'range'}
          onOpenChange={(open) => {
            if (!open) setDialogSub(undefined);
          }}
        >
          ...
              <DialogFooter>
                <Button ref={rangeOkButtonRef} onClick={() => setDialogSub(undefined)}>
                  {okText}
                </Button>
              </DialogFooter>
```

- [ ] **Step 4.6: Replace both**

```typescript
        <Dialog
          open={dialogSub === 'range'}
          onOpenChange={handleDialogOpenChange}
        >
```

```typescript
              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  {cancelText}
                </Button>
                <Button ref={rangeOkButtonRef} onClick={commitDialog}>
                  {okText}
                </Button>
              </DialogFooter>
```

- [ ] **Step 4.7: Add `cancelText` derivation near `okText`**

Find the existing `okText` derivation around L243:

```typescript
const okText = localizeString(localizedStrings, '%webView_scope_selector_ok%');
```

Add immediately below:

```typescript
const cancelText = localizeString(localizedStrings, '%webView_scope_selector_cancel%');
```

- [ ] **Step 4.8: Add the cancel key to `SCOPE_SELECTOR_STRING_KEYS`**

Find the `SCOPE_SELECTOR_STRING_KEYS` array near the top of the file (around L40-70). Add `'%webView_scope_selector_cancel%'` to the list (alphabetical or grouped with `_ok%` — match the existing style):

```typescript
export const SCOPE_SELECTOR_STRING_KEYS = Object.freeze([
  '%webView_scope_selector_book%',
  '%webView_scope_selector_cancel%', // NEW
  '%webView_scope_selector_chapter%',
  // ... rest
] as const);
```

- [ ] **Step 4.9: Typecheck + lib build**

```bash
cd lib/platform-bible-react && npx tsc --noEmit && npm run build:basic && cd -
```

Expected: typecheck PASS, build:basic PASS.

- [ ] **Step 4.10: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx \
        lib/platform-bible-react/dist/
git commit -m "[P3][ui] markers-checklist: ScopeSelector — wire dialog OK + Cancel + onOpenChange

Both range and selectedBooks dialogs now have OK + Cancel buttons. OK calls
commitDialog (fires consumer callbacks with draft values); Cancel + X +
Escape + clickaway all discard via handleDialogOpenChange. Adds the
SCOPE_SELECTOR_STRING_KEYS entry for the new cancel key. Includes lib dist
rebuild via npm run build:basic. Per spec D1, D2 / §5.7."
```

---

### Task 5: Wire BCV pickers and BookSelector to drafts when in dialog

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 5.1: Find the `rangeBlock` definition**

```bash
grep -n "const rangeBlock = " lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

Around L514. The current BCV usage passes `handleSubmit={handleRangeStartChange}` and `handleSubmit={onRangeEndChange ? handleRangeEndChangeWrapper : noopScrRefChange}`.

- [ ] **Step 5.2: Add a variant-aware submit selector immediately above `rangeBlock`**

Find the line just before `const rangeBlock = (` and insert:

```typescript
// When the range dialog is open in the dropdown variant, BCV submits write to
// drafts (committed on OK). Otherwise (radio variant inline), they fire the
// prop callbacks eagerly — matching radio-button UX. Per spec D3 / §5.5.
const isInRangeDialog = variant === 'dropdown' && dialogSub === 'range';
const rangeStartSubmit = isInRangeDialog ? setDraftRangeStart : handleRangeStartChange;
const rangeEndSubmit = isInRangeDialog
  ? setDraftRangeEnd
  : onRangeEndChange
    ? handleRangeEndChangeWrapper
    : noopScrRefChange;
```

- [ ] **Step 5.3: Update `rangeBlock` to use the new submit handlers**

In the rangeBlock JSX (around L520-573), find the two `<BookChapterControl>` instances. Update their `handleSubmit` props:

For `<BookChapterControl id="scope-range-start" ...>`:

```typescript
handleSubmit = { rangeStartSubmit };
```

For `<BookChapterControl id="scope-range-end" ...>`:

```typescript
handleSubmit = { rangeEndSubmit };
```

Also update the `scrRef` prop on each to read from drafts when in dialog:

```typescript
// Replace:
//   scrRef={resolvedRangeStart}
// With:
          scrRef={isInRangeDialog ? (draftRangeStart ?? resolvedRangeStart) : resolvedRangeStart}

// And on the end picker:
//   scrRef={resolvedRangeEnd}
// With:
          scrRef={isInRangeDialog ? (draftRangeEnd ?? resolvedRangeEnd) : resolvedRangeEnd}
```

(Same for the `disableReferencesUpTo` on the end picker — use the dialog draft when present so the validation respects the user's in-flight start choice:)

```typescript
          disableReferencesUpTo={isInRangeDialog ? (draftRangeStart ?? resolvedRangeStart) : resolvedRangeStart}
```

- [ ] **Step 5.4: Find the `bookSelectorBlock` definition**

```bash
grep -n "const bookSelectorBlock = " lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

Around L497. The current implementation passes `selectedBookIds={selectedBookIds}` and `onChangeSelectedBookIds={onSelectedBookIdsChange}` directly.

- [ ] **Step 5.5: Add a variant-aware book-selector wrapper**

Replace the existing `bookSelectorBlock`:

```typescript
  const bookSelectorBlock = (
    <BookSelector
      availableBookInfo={availableBookInfo}
      selectedBookIds={selectedBookIds}
      onChangeSelectedBookIds={onSelectedBookIdsChange}
      localizedStrings={localizedStrings}
      localizedBookNames={localizedBookNames}
    />
  );
```

with:

```typescript
  const isInBooksDialog = variant === 'dropdown' && dialogSub === 'selectedBooks';
  const bookSelectorBlock = (
    <BookSelector
      availableBookInfo={availableBookInfo}
      selectedBookIds={isInBooksDialog ? draftSelectedBookIds : selectedBookIds}
      onChangeSelectedBookIds={isInBooksDialog ? setDraftSelectedBookIds : onSelectedBookIdsChange}
      localizedStrings={localizedStrings}
      localizedBookNames={localizedBookNames}
    />
  );
```

- [ ] **Step 5.6: Typecheck + lib build**

```bash
cd lib/platform-bible-react && npx tsc --noEmit && npm run build:basic && cd -
```

Expected: PASS.

- [ ] **Step 5.7: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx \
        lib/platform-bible-react/dist/
git commit -m "[P3][ui] markers-checklist: ScopeSelector — BCV + BookSelector route to drafts in dialog

Inside the range / selectedBooks dialogs, BCV pickers and BookSelector edit
the new draft state instead of firing the prop callbacks. Outside the dialog
(radio variant inline), behavior is unchanged. Combined with Task 4's OK button,
this closes the eager-commit defect. Per spec D3 / §5.5."
```

---

## Phase 2: Simple-scope items + hover

### Task 6: Replace DropdownMenuCheckboxItem with DropdownMenuItem + manual Check

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx`

- [ ] **Step 6.1: Find the simpleScopes mapping**

```bash
grep -n "simpleScopes.map" lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

Around L718-732. Current:

```typescript
                {simpleScopes.map(({ value, label, dropdownLabel, scrRefSuffix, id: scopeId }) => (
                  <DropdownMenuCheckboxItem
                    key={scopeId}
                    ref={assignScopeItemRef(value)}
                    checked={scope === value}
                    onCheckedChange={(checked) => {
                      if (checked) handleScopeChange(value);
                    }}
                  >
                    {renderScopeLabel(dropdownLabel ?? label, scrRefSuffix, isDropdownNarrow)}
                  </DropdownMenuCheckboxItem>
                ))}
```

- [ ] **Step 6.2: Replace with DropdownMenuItem + manual Check**

```typescript
                {simpleScopes.map(({ value, label, dropdownLabel, scrRefSuffix, id: scopeId }) => (
                  <DropdownMenuItem
                    key={scopeId}
                    ref={assignScopeItemRef(value)}
                    // Match dialog-launcher items (L740 / L753) for visual consistency.
                    // tw-ps-8 reserves space for the leading Check indicator.
                    // data-[highlighted] styles trigger on Radix's hover/focus mapping
                    // (D5: pointer hover normally fires data-highlighted; this makes the
                    // tw-bg-accent highlight unambiguous).
                    className="tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"
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
                ))}
```

- [ ] **Step 6.3: Drop now-unused DropdownMenuCheckboxItem import**

```bash
grep -n "DropdownMenuCheckboxItem" lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx
```

If the import line still includes `DropdownMenuCheckboxItem` and it's no longer referenced, remove it from the import. (Confirm via the grep above — should only show the import line after the deletion above.)

- [ ] **Step 6.4: Add the same hover styling to dialog-launcher items for consistency**

Find the `selectedBooksScope` and `rangeScope` DropdownMenuItem blocks around L735-760. Each has `className={cn('tw-relative tw-ps-8 focus:tw-text-accent-foreground')}`. Update both to:

```typescript
                    className={cn(
                      'tw-relative tw-ps-8',
                      'data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground',
                    )}
```

- [ ] **Step 6.5: Typecheck + lib build**

```bash
cd lib/platform-bible-react && npx tsc --noEmit && npm run build:basic && cd -
```

Expected: PASS.

- [ ] **Step 6.6: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx \
        lib/platform-bible-react/dist/
git commit -m "[P3][ui] markers-checklist: ScopeSelector — simple scopes use DropdownMenuItem + manual Check

Replaces DropdownMenuCheckboxItem (which made re-clicking the active scope a
no-op due to checkbox uncheck semantics) with DropdownMenuItem + manual leading
Check indicator. Scopes are mutually exclusive — radio-style behavior is
correct. Re-pick now always fires onScopeChange. Adds data-[highlighted]
hover/focus styling to all scope items for unambiguous mouse-hover UI.
Per spec D4, D5 / §5.6, §5.8."
```

---

## Phase 3: Localization key for Cancel

### Task 7: Add `webView_scope_selector_cancel` to localizedStrings.json

**Files:**

- Modify: `extensions/src/platform-scripture/contributions/localizedStrings.json`

- [ ] **Step 7.1: Find the existing scope_selector_ok entry**

```bash
grep -n "webView_scope_selector_ok" extensions/src/platform-scripture/contributions/localizedStrings.json
```

- [ ] **Step 7.2: Add cancel key right above (alphabetical position)**

In the JSON, find the line with `"%webView_scope_selector_book%": "Book",` (which is alphabetically just before `cancel`). Insert directly below it:

```json
      "%webView_scope_selector_cancel%": "Cancel",
```

(Match the surrounding indentation — 6 spaces.)

- [ ] **Step 7.3: Verify JSON valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('extensions/src/platform-scripture/contributions/localizedStrings.json','utf8')); console.log('OK')"
```

Expected: `OK`.

- [ ] **Step 7.4: Commit**

```bash
git add extensions/src/platform-scripture/contributions/localizedStrings.json
git commit -m "[P3][ui] markers-checklist: Add webView_scope_selector_cancel localization key

ScopeSelector range / selectedBooks dialogs now have explicit Cancel buttons
(per spec §5.7). Cancel label sources from this new key."
```

---

## Phase 4: ScopeSelector component test

### Task 8: Create scope-selector.component.test.tsx with staging scenarios

**Files:**

- Create: `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.test.tsx`

- [ ] **Step 8.1: Inspect existing test pattern**

```bash
head -10 lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.withGroupingSelect.test.tsx
```

Confirms `@testing-library/react` + `@testing-library/jest-dom` are the conventions.

- [ ] **Step 8.2: Write the failing test**

Create `lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.test.tsx`:

```tsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScopeSelector } from './scope-selector.component';
import type { Scope } from '@/components/utils/scripture.util';
import type { SerializedVerseRef } from '@sillsdev/scripture';

const REF_GEN_1_1: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const REF_GEN_5_30: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 30 };

const ALL_BOOKS_PRESENT = '1'.repeat(124);

const NO_OP_LOCALIZED_STRINGS = {};

interface RenderArgs {
  scope?: Scope;
  rangeStart?: SerializedVerseRef;
  rangeEnd?: SerializedVerseRef;
  selectedBookIds?: string[];
  onScopeChange?: (next: Scope) => void;
  onRangeStartChange?: (next: SerializedVerseRef) => void;
  onRangeEndChange?: (next: SerializedVerseRef) => void;
  onSelectedBookIdsChange?: (next: string[]) => void;
}

function renderDropdown(args: RenderArgs = {}) {
  const onScopeChange = args.onScopeChange ?? vi.fn();
  const onRangeStartChange = args.onRangeStartChange ?? vi.fn();
  const onRangeEndChange = args.onRangeEndChange ?? vi.fn();
  const onSelectedBookIdsChange = args.onSelectedBookIdsChange ?? vi.fn();
  const utils = render(
    <ScopeSelector
      variant="dropdown"
      scope={args.scope ?? 'chapter'}
      onScopeChange={onScopeChange}
      availableBookInfo={ALL_BOOKS_PRESENT}
      selectedBookIds={args.selectedBookIds ?? []}
      onSelectedBookIdsChange={onSelectedBookIdsChange}
      localizedStrings={NO_OP_LOCALIZED_STRINGS}
      rangeStart={args.rangeStart ?? REF_GEN_1_1}
      rangeEnd={args.rangeEnd ?? REF_GEN_5_30}
      onRangeStartChange={onRangeStartChange}
      onRangeEndChange={onRangeEndChange}
      hideLabel
    />,
  );
  return { ...utils, onScopeChange, onRangeStartChange, onRangeEndChange, onSelectedBookIdsChange };
}

describe('ScopeSelector — dialog staging', () => {
  it('clicking a simple scope (chapter) fires onScopeChange immediately', () => {
    const { onScopeChange, getByRole } = renderDropdown({ scope: 'verse' });
    fireEvent.click(getByRole('combobox'));
    // Click "Current chapter" item — match by role+name (label key falls back to the key itself
    // when localizedStrings is empty).
    const item = screen.getByText(/scope_selector_current_chapter/i);
    fireEvent.click(item);
    expect(onScopeChange).toHaveBeenCalledWith('chapter');
  });

  it('clicking "Range..." opens dialog without firing onScopeChange', () => {
    const { onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown({
      scope: 'chapter',
    });
    fireEvent.click(getByRole('combobox'));
    const rangeLauncher = screen.getByText(/scope_selector_range/i);
    fireEvent.click(rangeLauncher);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onRangeStartChange).not.toHaveBeenCalled();
    expect(onRangeEndChange).not.toHaveBeenCalled();
    // Dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('range dialog Cancel discards: no callbacks fire', () => {
    const { onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown({
      scope: 'chapter',
    });
    fireEvent.click(getByRole('combobox'));
    fireEvent.click(screen.getByText(/scope_selector_range/i));
    // Cancel button (matches localized key fallback)
    const cancelBtn = screen.getByRole('button', { name: /scope_selector_cancel/i });
    fireEvent.click(cancelBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onRangeStartChange).not.toHaveBeenCalled();
    expect(onRangeEndChange).not.toHaveBeenCalled();
  });

  it('range dialog OK commits scope + start + end together', () => {
    const { onScopeChange, onRangeStartChange, onRangeEndChange, getByRole } = renderDropdown({
      scope: 'chapter',
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_5_30,
    });
    fireEvent.click(getByRole('combobox'));
    fireEvent.click(screen.getByText(/scope_selector_range/i));
    const okBtn = screen.getByRole('button', { name: /scope_selector_ok/i });
    fireEvent.click(okBtn);
    // Without picker interaction, drafts equal the seeded values from props.
    expect(onRangeStartChange).toHaveBeenCalledWith(REF_GEN_1_1);
    expect(onRangeEndChange).toHaveBeenCalledWith(REF_GEN_5_30);
    expect(onScopeChange).toHaveBeenCalledWith('range');
  });

  it('selectedBooks dialog Cancel discards', () => {
    const { onScopeChange, onSelectedBookIdsChange, getByRole } = renderDropdown({
      scope: 'chapter',
      selectedBookIds: ['GEN'],
    });
    fireEvent.click(getByRole('combobox'));
    fireEvent.click(screen.getByText(/scope_selector_choose_books/i));
    const cancelBtn = screen.getByRole('button', { name: /scope_selector_cancel/i });
    fireEvent.click(cancelBtn);
    expect(onScopeChange).not.toHaveBeenCalled();
    expect(onSelectedBookIdsChange).not.toHaveBeenCalled();
  });

  it('re-clicking the active simple scope re-fires onScopeChange', () => {
    const { onScopeChange, getByRole } = renderDropdown({ scope: 'chapter' });
    fireEvent.click(getByRole('combobox'));
    const chapterItem = screen.getByText(/scope_selector_current_chapter/i);
    fireEvent.click(chapterItem);
    expect(onScopeChange).toHaveBeenCalledWith('chapter');
  });
});
```

- [ ] **Step 8.3: Run the test — verify PASS**

```bash
cd lib/platform-bible-react && npx vitest --run src/components/advanced/scope-selector/scope-selector.component.test.tsx && cd -
```

Expected: 6 tests pass.

If a test fails because of mock setup (e.g. `cn` utility missing, scope-selector.utils export issue), debug and adjust the test imports. Do NOT lower assertions; the contract these tests verify is the surgery's whole point.

- [ ] **Step 8.4: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.test.tsx
git commit -m "[P3][test] markers-checklist: ScopeSelector component test for dialog staging

6 scenarios covering:
- simple-scope click → immediate onScopeChange
- Range... open → no callbacks fired (dialog only)
- Range Cancel → no commits
- Range OK → onScopeChange + onRangeStartChange + onRangeEndChange together
- selectedBooks Cancel → no commits
- Re-click active scope → onScopeChange re-fires (D4 fix)

Per spec §7.2."
```

---

## Phase 5: Markers-checklist consumer migration to auto-follow

### Task 9: Drop snapshotScrRef state slot

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 9.1: Find the snapshotScrRef slot**

```bash
grep -n "snapshotScrRef" extensions/src/platform-scripture/src/checklist.web-view.tsx
```

Current (around L172-176 + uses elsewhere):

```typescript
const [snapshotScrRef, setSnapshotScrRef] = useWebViewState<SerializedVerseRef | undefined>(
  'checklistSnapshotScrRef',
  undefined,
);
```

- [ ] **Step 9.2: Remove the slot declaration**

Delete the entire `useWebViewState<SerializedVerseRef | undefined>('checklistSnapshotScrRef', ...)` block. Update the introductory comment block above it to drop the `snapshotScrRef` mention (the comment currently lists "scope + snapshotScrRef drive the ScopeSelector display" — replace with "scope drives the ScopeSelector display; verseRange auto-follows liveScrRef").

- [ ] **Step 9.3: Drop snapshotScrRef from the ScopeSelector currentScrRef prop**

```bash
grep -n "snapshotScrRef ?? liveScrRef" extensions/src/platform-scripture/src/checklist.web-view.tsx
```

Replace `currentScrRef={snapshotScrRef ?? liveScrRef}` with `currentScrRef={liveScrRef}`.

- [ ] **Step 9.4: Drop setSnapshotScrRef from handleScopeChange**

Find the existing `handleScopeChange`:

```typescript
  const handleScopeChange = useCallback(
    (newScope: Scope) => {
      const computed = computeRangeFromScope({...});
      setScope(newScope);
      setSnapshotScrRef(liveScrRef);
      if (computed) setVerseRange(computed);
    },
    [liveScrRef, rangeStart, rangeEnd, getEndVerse, getLastChapter, setScope, setSnapshotScrRef, setVerseRange],
  );
```

Replace with:

```typescript
const handleScopeChange = useCallback(
  (newScope: Scope) => {
    // Auto-follow: verseRange is derived via the effect below from {scope, liveScrRef,
    // rangeStart, rangeEnd}. handleScopeChange just commits the new mode.
    setScope(newScope);
  },
  [setScope],
);
```

- [ ] **Step 9.5: Drop the seed effect (replaced by auto-follow effect in Task 10)**

```bash
grep -n "hasSeededRef\|First-launch seed" extensions/src/platform-scripture/src/checklist.web-view.tsx
```

Find the `// ─── First-launch seed (R1) ───` block and the `useEffect` immediately below (the one with `hasSeededRef.current` guard). Delete the entire block including the comment header. Task 10 replaces it.

Also delete:

```typescript
const hasSeededRef = useRef(false);
```

- [ ] **Step 9.6: Drop snapshotScrRef from `verseRangeSelectorNode` deps**

Look in the `verseRangeSelectorNode` useMemo's dependency array — it currently includes `snapshotScrRef`. Remove it.

- [ ] **Step 9.7: Drop the unused setSnapshotScrRef references**

Search for any leftover `setSnapshotScrRef`:

```bash
grep -n "snapshotScrRef\|setSnapshotScrRef" extensions/src/platform-scripture/src/checklist.web-view.tsx
```

Expected: no results after Tasks 9.1-9.6.

- [ ] **Step 9.8: Typecheck**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
```

Expected: PASS. (Tests fail until Task 10 adds the auto-follow effect, but typecheck should be clean.)

- [ ] **Step 9.9: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx
git commit -m "[P3][ui] markers-checklist: Drop snapshotScrRef state — prep for auto-follow

Removes the snapshotScrRef useWebViewState slot, the snapshot fallback in the
ScopeSelector currentScrRef prop, the snapshot mutation in handleScopeChange,
and the first-launch seed effect. Task 10 follows up with the auto-follow
effect that derives verseRange from {scope, liveScrRef, rangeStart, rangeEnd}.

Note: existing dev-branch users have an orphan checklistSnapshotScrRef
useWebViewState slot — useWebViewState ignores unknown slots, so this is
benign. Per spec §6.1-6.4."
```

---

### Task 10: Add auto-follow effect for verseRange

**Files:**

- Modify: `extensions/src/platform-scripture/src/checklist.web-view.tsx`

- [ ] **Step 10.1: Find where the seed effect was**

It was around the same area as the deleted `hasSeededRef` block (Task 9.5). Insert the new auto-follow effect there.

- [ ] **Step 10.2: Add the auto-follow effect**

```typescript
// ─── Auto-follow effect: recompute verseRange when liveScrRef or scope changes ────
//
// Debounced 250ms (matches checks-side-panel.web-view.tsx:496) so rapid editor
// navigation doesn't fire a backend refetch on every cursor blink. The fetch effect
// (which depends on verseRange) only fires when the computed range actually changes
// shape — within a chapter, scope='chapter' produces an identical range so the
// referential change still bumps verseRange but the request payload is the same;
// backend can dedupe.
useEffect(() => {
  const handle = setTimeout(() => {
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
  return () => clearTimeout(handle);
}, [scope, liveScrRef, rangeStart, rangeEnd, getEndVerse, getLastChapter, setVerseRange]);
```

- [ ] **Step 10.3: Typecheck + extension build**

```bash
npx tsc --noEmit -p extensions/src/platform-scripture/tsconfig.json
npm run build:extensions
```

Expected: both PASS.

- [ ] **Step 10.4: Commit**

```bash
git add extensions/src/platform-scripture/src/checklist.web-view.tsx
git commit -m "[P3][ui] markers-checklist: Auto-follow verseRange via debounced effect (250ms)

Recomputes verseRange from {scope, liveScrRef, rangeStart, rangeEnd} whenever
the inputs change, debounced 250ms to avoid refetch storms during rapid editor
navigation. Mirrors checks-side-panel.web-view.tsx:496's debounce convention.

Replaces the prior R1 first-launch seed + manual setSnapshotScrRef in
handleScopeChange. Per spec §6.4."
```

---

## Phase 6: E2E test updates

### Task 11: Update wiring-theme-5.spec.ts for auto-follow

**Files:**

- Modify: `e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts`

- [ ] **Step 11.1: Read current tests 2, 3, 4**

```bash
grep -n -E "test\((\"|')(\d|test 2|test 3|test 4)" e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts | head -10
```

Locate test 2 (scope freeze), test 3 (re-pick re-snapshots), test 4 (range mode).

- [ ] **Step 11.2: Invert test 2 — auto-follow instead of freeze**

Test 2's prior contract was: "navigate the editor → trigger label STILL shows the old chapter; backend NOT refetched". The new contract is the opposite.

Find test 2 and rewrite its assertion block. The setup (open project, open checklist, default scope='chapter') stays the same. The new assertion path:

1. Initial trigger label captured (e.g. "Chapter: ROM 3").
2. Navigate the editor's BookChapterControl to a different chapter (e.g. ROM 5).
3. Wait ≥500ms for the 250ms debounce + a backend round-trip.
4. Re-read the verse-range trigger label — assert it now shows "Chapter: ROM 5".

Replace the "STILL shows" assertion with a "now shows" assertion. Keep the screenshot capture path (rename to `test-2-autofollow.png`).

- [ ] **Step 11.3: Delete test 3**

Test 3 (re-pick chapter re-snapshots) is obsolete under auto-follow — re-pick would re-fire onScopeChange but with the same scope, so no observable change. Delete the test entirely. If desired, replace with a one-line `// Test 3 (re-snapshot via re-pick) deleted: auto-follow makes this scenario obsolete (see surgery spec §6).`

- [ ] **Step 11.4: Expand test 4 — OK + Cancel commits**

Test 4 today verifies that picking range mode + adjusting pickers commits the range. Split into 4a and 4b.

**Test 4a: Range OK commits.** Same setup as today; pick "Range..." from dropdown; adjust pickers to GEN 1:1 → GEN 5:30 (use the dialog's BCV controls); click OK; assert backend request includes `verseRange: {start: GEN 1:1, end: GEN 5:30}`. Capture `test-4a-range-ok.png`.

**Test 4b: Range Cancel discards.** Setup at `scope='chapter'`, capture initial trigger label (e.g. "Chapter: ROM 5"). Pick "Range..." → adjust pickers to GEN 1:1 → GEN 5:30 → click Cancel. Re-read trigger label: STILL "Chapter: ROM 5". No range request was sent. Capture `test-4b-range-cancel.png`.

- [ ] **Step 11.5: Run tests**

```bash
cd e2e-tests && npx playwright test tests/markers-checklist/wiring-theme-5.spec.ts && cd -
```

Expected: all tests pass (count = 9 active, since test 3 was deleted, test 4 split into 4a + 4b → net same count).

If a test fails because the live app is in a stale state, run `./.erb/scripts/refresh.sh` to rebuild + restart, then retry.

- [ ] **Step 11.6: Commit**

```bash
git add e2e-tests/tests/markers-checklist/wiring-theme-5.spec.ts
git commit -m "[P3][test] markers-checklist: Update e2e wiring tests for auto-follow

- Test 2: inverted from 'scope freeze' to 'scope auto-follow' — assert trigger
  label updates as editor navigates
- Test 3: deleted (re-pick re-snapshot scenario is obsolete under auto-follow)
- Test 4: split into 4a (Range OK commits with picker refs) and 4b (Range
  Cancel discards, no backend refetch)

Per spec §7.4."
```

---

## Phase 7: Verification + push

### Task 12: Quality gates pass

**Files:**

- (None — this task verifies)

- [ ] **Step 12.1: Run all gates from root**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core
npm run typecheck
```

Expected: PASS.

- [ ] **Step 12.2: Run all unit tests**

```bash
npm test --workspace=platform-scripture && \
cd lib/platform-bible-react && npm test && cd -
```

Expected: all pass. Includes the new ScopeSelector component test (6 cases) plus the existing 100 markers-checklist suite.

- [ ] **Step 12.3: Run extensions build**

```bash
npm run build:extensions
```

Expected: PASS.

- [ ] **Step 12.4: Run e2e wiring tests**

```bash
cd e2e-tests && npx playwright test tests/markers-checklist/wiring-theme-5.spec.ts && cd -
```

Expected: 10/10 PASS (was 10 prior with one fixme'd; surgery split test 4 into 4a+4b → 11 total, but we kept active count by removing test 3 → net 10 active).

- [ ] **Step 12.5: Manual CDP walkthrough**

Refresh the app: `./.erb/scripts/refresh.sh`. Then walk through the spec §7.5 verification recipe:

1. Open markers-checklist on GEN 1. Trigger reads "Chapter: GEN 1". Capture `surgery/01-initial.png`.
2. Navigate editor to MAT 5. Wait ~1s. Trigger reads "Chapter: MAT 5". Capture `surgery/02-autofollow.png`.
3. Open scope dropdown. Hover each scope item — each highlights with `tw-bg-accent`. Capture `surgery/03-hover.png`.
4. Click "Range...". Dialog opens. Trigger STILL "Chapter: MAT 5" (scope draft only). Capture `surgery/04-dialog-open.png`.
5. Adjust pickers to GEN 1:1 → REV 22:21. Click Cancel. Dialog closes. Trigger STILL "Chapter: MAT 5". Capture `surgery/05-cancel-discards.png`.
6. Re-open range dialog. Adjust to GEN 1:1 → GEN 5:30. Click OK. Trigger reads "GEN 1:1–GEN 5:30". Backend refetched. Capture `surgery/06-ok-commits.png`.
7. Open MarkerSettings dialog. Hover help icon. Tooltip renders ABOVE the modal. Capture `surgery/07-tooltip-z-index.png` (regression check from FU3).
8. Open the find tool's scope picker (radio variant). Verify scopes still work eagerly. Capture `surgery/08-find-radio.png`.

If any step fails, STOP and triage — the surgery has an unintended regression.

- [ ] **Step 12.6: Commit screenshots**

```bash
cd /home/paratext/git/workspaces/markers-checklist/ai-prompts
git add ai-porting/.context/features/markers-checklist/proofs/e2e-evidence/wiring/surgery/
git commit -m "[P3][test] markers-checklist: ScopeSelector deep surgery — manual walkthrough screenshots

Captures the spec §7.5 verification recipe: auto-follow, hover highlight,
dialog Cancel discards, dialog OK commits, tooltip z-index regression check,
find tool unaffected."
```

---

### Task 13: Update traceability matrix

**Files:**

- Modify: `/home/paratext/git/workspaces/markers-checklist/ai-prompts/ai-porting/.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json`

- [ ] **Step 13.1: Append a `surgery` section**

The existing traceability JSON has top-level fields like `summary`, `items`, `followUpFixes`, `outstandingNotes`. Add a new top-level `surgery` field summarizing this round:

```json
,
  "surgery": {
    "spec": "docs/specs/2026-04-30-scopeselector-deep-surgery-design.md",
    "plan": "docs/plans/2026-04-30-scopeselector-deep-surgery.md",
    "completedAt": "2026-04-30T<HH:MM>:00Z",
    "defectsResolved": [
      {
        "id": "D1",
        "description": "Eager commit on dialog open (range, selectedBooks)",
        "resolution": "Internal staging; commitDialog fires callbacks on OK only"
      },
      {
        "id": "D2",
        "description": "Dialog OK button was no-op-close",
        "resolution": "Wired OK to commitDialog; added explicit Cancel button"
      },
      {
        "id": "D3",
        "description": "BCV pickers fire callbacks during dialog edit",
        "resolution": "Pickers route to drafts when in dialog; commit on OK"
      },
      {
        "id": "D4",
        "description": "DropdownMenuCheckboxItem re-pick no-op",
        "resolution": "Replaced with DropdownMenuItem + manual Check (radio semantics)"
      },
      {
        "id": "D5",
        "description": "Dropdown items missing hover UI",
        "resolution": "Added data-[highlighted]:tw-bg-accent styling"
      }
    ],
    "consumerMigration": {
      "file": "extensions/src/platform-scripture/src/checklist.web-view.tsx",
      "from": "snapshot semantics (R1)",
      "to": "auto-follow with 250ms debounce",
      "rationale": "PT9 snapshot was a side-effect of modal UI, not a deliberate UX choice. Auto-follow matches checks-side-panel and ScopeSelector's native design. Eliminates re-snapshot UX question."
    }
  }
```

(Update the timestamp to whatever the actual completion time is.)

- [ ] **Step 13.2: Verify JSON valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('/home/paratext/git/workspaces/markers-checklist/ai-prompts/ai-porting/.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json','utf8')); console.log('OK')"
```

Expected: `OK`.

- [ ] **Step 13.3: Commit**

```bash
cd /home/paratext/git/workspaces/markers-checklist/ai-prompts
git add ai-porting/.context/features/markers-checklist/implementation/traceability-theme-5-4-6.json
git commit -m "[P3][test] markers-checklist: Traceability — append ScopeSelector surgery round

Records the 5 defects resolved (D1-D5) and the markers-checklist consumer
migration from snapshot to auto-follow. Cross-links to the surgery spec
and plan."
cd -
```

---

### Task 14: Push both repos

- [ ] **Step 14.1: Confirm clean working tree**

```bash
cd /home/paratext/git/workspaces/markers-checklist/paranext-core && git status --short
cd /home/paratext/git/workspaces/markers-checklist/ai-prompts && git status --short
cd /home/paratext/git/workspaces/markers-checklist/paranext-core
```

Expected: empty output in both repos.

- [ ] **Step 14.2: Push paranext-core**

```bash
git push origin ai/feature/markers-checklist-rolf-03-10-2026
```

Expected: success.

- [ ] **Step 14.3: Push ai-prompts**

```bash
cd /home/paratext/git/workspaces/markers-checklist/ai-prompts
git push origin ai/feature/markers-checklist-rolf-03-10-2026
cd -
```

Expected: success.

- [ ] **Step 14.4: Notify completion**

Report back to the user with:

```
ScopeSelector deep surgery complete.

paranext-core branch tip: <SHA>
ai-prompts branch tip: <SHA>

Defects resolved (D1-D5):
- D1: Eager commit on dialog open → internal staging
- D2: OK button was no-op → commits drafts; explicit Cancel button added
- D3: BCV pickers fired callbacks during dialog → write to drafts instead
- D4: CheckboxItem re-pick was no-op → DropdownMenuItem + manual Check
- D5: Missing hover UI → data-[highlighted] styling

Consumer migration:
- markers-checklist switched from snapshot (R1) to auto-follow
- Dropped snapshotScrRef state slot
- 250ms debounced effect derives verseRange from liveScrRef

Tests:
- New ScopeSelector component test (6 scenarios) all passing
- E2E wiring-theme-5: 10/10 passing (test 2 inverted, test 3 deleted, test 4 split)

Manual walkthrough complete with 8 screenshots in proofs/wiring/surgery/.

Ready for review.
```

---

## Self-review checklist

- [ ] Every task step has concrete code or commands (no "implement later")
- [ ] Every test step has actual test code (no "write tests for the above")
- [ ] Type names and function names are consistent across tasks (`commitDialog`, `handleDialogOpenChange`, `draftScope`, etc.)
- [ ] Spec coverage:
  - D1-D5 → Tasks 2-6 ✓
  - D6, D7 (already shipped) → no task needed ✓
  - D8 (Navigate footer audit) → no change needed ✓
  - Markers-checklist migration §6 → Tasks 9, 10 ✓
  - Test rewrites §7 → Tasks 8, 11 ✓
  - Manual verification §7.5 → Task 12 ✓
- [ ] No TBD/TODO/placeholder strings
- [ ] Commit messages match the existing `[P3][ui]` / `[P3][test]` convention
- [ ] Both repos handled (paranext-core + ai-prompts for evidence files)
