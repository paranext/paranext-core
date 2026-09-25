# Paragraph Marker Selection — Host (paranext-core) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make paranext-core work with the editor's paragraph-marker `NodeSelection` (PT-4540, Todd NN-2.3). The toolbar paragraph dropdown should retag the selected paragraph. The editor should be able to open the dropdown from the keyboard. Picking an item should close the dropdown and hand focus back to the editor. The selected row should get a themed highlight, and the shortcuts catalog should record the new keys.

**Architecture:** The editor (PR 1, scripture-editors branch `pt-4540-para-marker-selection`) owns the selection, the keys and the DOM class. This repo only consumes them. Four things change here:
- `restoreSelectionIfLost` learns that a selected marker is a live selection.
- `ParagraphStyleTrigger`'s Radix `Popover` becomes controlled, through a small `useParagraphMenuOpenState` hook, so that `<Editorial onParaMarkerMenuRequest>` can open it. It closes on pick, like the neighbouring character-marker control, and closing returns focus to the editor.
- `_usj-nodes.scss` styles `.psc-para-marker-selected` on its own visual channel, with a colour token chosen by measured contrast.
- The keyboard catalog gains an entry for the new keys.

**Tech Stack:** React 19, Radix `Popover` via `platform-bible-react`, cmdk (`MarkerMenu`), SCSS, Vitest + Testing Library (jsdom), chroma-js (contrast), npm workspaces, staged `file:` dev packages.

**Spec:** `/Users/jolierabideau/dev/scripture-editors/docs/superpowers/specs/2026-09-23-para-marker-selection-design.md`, sections §5 Host, §6 Host testing and §8 open items. The spec is authoritative **except where "Decisions since the spec" below overrides it**; that spec amendment is being written in the scripture-editors session.

This plan replaces `/Users/jolierabideau/dev/scripture-editors/docs/superpowers/plans/2026-09-23-para-marker-selection-core.md`. It keeps that plan's Tasks 1 and 5, revises Tasks 2, 3 and 6, and drops Task 4 (the refusal hint). Task 4 is kept in the Appendix in case the Backspace/Delete decision reverses.

## Decisions since the spec (product/UX review, 2026-09-25)

Sources: the PT-4540 Jira comment from Sebastian (UX), and Todd (product owner) in Discord.

1. **The toolbar paragraph dropdown is the way to change a marker.** This is the NN text: select the marker itself, then change it with the marker dropdown.
2. **No new arrow-key navigation.** The editor drops the ←/→ stop on markers and the ↑/↓ walk down the marker column. A marker is selected only by clicking its gutter glyph. With a marker selected, any arrow key puts the caret at the start of that paragraph's text. Keyboard selection is deferred to the arrow-navigation work items (PT-3997, PT-4693, PT-3571). Todd wants scope kept to the NN.
3. **Typing on a selected marker goes into the paragraph's text.** Todd agreed. This is editor-only.
4. **Backspace/Delete on a selected marker merges the paragraph into the one before it.** This is Todd's expectation; we are waiting to hear from Ian whether Saroj needs protecting here. It is editor-only: the editor moves the caret to the start of the paragraph's text and runs its existing Backspace. That means there is **no refusal hint, no refusal signal, and no host code**. See "Backspace/Delete: kept separate" below.
5. **Enter / Alt+↓ on a selected marker still opens the dropdown.**
6. **The paragraph dropdown closes when an item is picked.** Todd asked for consistency with the other dropdowns. The character-marker control next to it in the toolbar already closes on pick and returns focus to the editor (`character-marker-control.component.tsx`, `closingMarkerMenuItems`); the paragraph dropdown is the odd one out.

## Backspace/Delete: kept separate

The Backspace/Delete behaviour lives entirely in the editor's own commit, which is PR 1's "C" commit. **Nothing in this plan's Tasks 0–6 depends on it**, and no task here touches Backspace or Delete. If Ian decides deletion should be refused instead, the host work is the Appendix task, landed as **one separate commit** on top of the rest. Nothing else in this plan changes in that case. The only place Backspace appears in the main tasks is manual QA step 4, which is marked as depending on which way the decision goes.

## Global Constraints

- Repo: `/Users/jolierabideau/repos/paranext-core`. Branch: `pt-4540-para-marker-selection`, created from `origin/pt-4488-pt-4539-paragraph-marker-dropdown` (WI-14, not yet merged) with no upstream set. Rebase onto `main` once WI-14 merges. PR 2 cannot merge before WI-14 / PT-4539 does (spec §8.4).
- Still open before merge, but not blocking implementation: the invariants owner's sign-off (spec §8.1) and Ian's answer on Backspace/Delete. The PR stays a draft until both are in.
- Pinned editor interface names (PR 1). Use them exactly:
  - `EditorRef.getSelectedParaMarker(): string | undefined`
  - `EditorProps.onParaMarkerMenuRequest?: () => void`
  - the selected-row class `psc-para-marker-selected` (with `aria-selected="true"`) on the paragraph element

  **No refusal class or attribute exists**; do not reference `psc-para-marker-refused`.
- `dev-packages.json` pins the branch and is **not edited** (spec §5.1). Commit `package-lock.json` only if `npm install` changes it.
- Never import a RUNTIME value from `@eten-tech-foundation/platform-editor` in web-view code; types only. See the header of `platform-scripture-editor.web-view.utils.ts`. Class names are string literals here.
- Host names avoid abbreviations (Code-Style-Guide "Initialisms and abbreviations"): host symbols say `paragraphMarker`, not `paraMarker`. The editor-owned names above stay as pinned.
- The selection highlight gets its own visual channel. It must not use the `psc-active-text` focus box, which owns `::after` on the same element, and it must not use a pseudo-element. Its colour token is chosen by measured contrast of at least 3:1 in all four themes and pinned by a test (`adr-list-selection-on-a-dedicated-visual-channel`).
- Comments face forward: no ticket IDs, review IDs, or "previously…" narration in code (CLAUDE.md "Coding Discipline").
- Every keyboard-handler change updates `src/shared/data/keyboard-shortcuts.data.ts` (`.claude/rules/keyboard-shortcuts-catalog.md`). Arrow movement stays uncataloged.
- Do not run a formatter; the pre-commit hook formats. Never use `--no-verify`.
- Every commit message ends with `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.
- Don't push until the user asks.

## Review Focus

1. **The menu closes because the user clicked or focused something else**, for example by clicking into the text to put the caret there. Focus and caret should stay where they clicked; the refocus must not pull them back to the editor's old selection. Test: Task 2, "leaves focus where the user put it".
2. **Structure lock is switched on while the menu is open, then off again.** The menu should close and stay closed; it must not spring open by itself when the lock lifts. Test: Task 3, "closes when protection turns on and stays closed when it turns off".
3. **Enter on a selected marker while the structure is locked.** Expect the existing "Structure is locked" notification and no menu, never a silent no-op. Test: Task 3, "notifies instead of opening".
4. **A pick while a marker is selected.** Only the selected marker's paragraph is retagged (never the paragraph that last held the caret), and the menu closes with focus back in the editor. Tests: Task 1, "leaves a selected paragraph marker alone"; Task 2, "closes and returns focus to the editor when an item is picked".
5. **RTL project.** The selected-row fill and bar should extend across the gutter on the inline-start side (the right), not bleed into the left margin. Test: Task 4, the SCSS pin for the `[dir='rtl']` rule.

---

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.ts` | Modify | `restoreSelectionIfLost` skips a marker selection |
| `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts` | Modify | Tests for the skip |
| `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.tsx` | Modify | Controlled popover, close on pick, refocus on close |
| `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.test.tsx` | Modify | Open/close/refocus tests |
| `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.stories.tsx` | Modify | Stories hold the now-controlled state |
| `extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.ts` | Create | Open state; editor-request gating (read-only, lock, no block) |
| `extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.test.ts` | Create | Hook tests |
| `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` | Modify | Wire the hook to `<Editorial onParaMarkerMenuRequest>` and the trigger; comment update |
| `extensions/src/platform-scripture-editor/src/_usj-nodes.scss` | Modify | `.psc-para-marker-selected` styling (LTR + RTL + glyph) and header note |
| `extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts` | Modify | Pins for the new rules |
| `extensions/src/platform-scripture-editor/src/paragraph-marker-selection-contrast.test.ts` | Create | ADR contrast sweep over all real themes |
| `src/shared/data/keyboard-shortcuts.data.ts` | Modify | Enter / Alt+↓ entry |
| `src/shared/data/keyboard-shortcuts.data.test.ts` | Modify | Pin the entry |
| `.context/designs/2026-09-25-para-marker-selection-host-plan.md` | Create | This plan (committed with Task 1) |
| `package-lock.json` | Maybe | Only if editor intake changes it |

Commands used throughout (taken from the `package.json` files; do not invent flags):

- **One extension test file:** `npm run test --workspace=extensions/src/platform-scripture-editor -- --run <file-name-substring>`. The workspace's `test` script is `vitest`, `--run` disables watch, and the trailing argument is vitest's file filter.
- **Extension typecheck / lint:** `npm run typecheck --workspace=extensions/src/platform-scripture-editor` and `npm run lint --workspace=extensions/src/platform-scripture-editor`.
- **Core test file:** `npm run test:core -- --run src/shared/data/keyboard-shortcuts.data.test.ts` (`test:core` is `vitest`).
- **Whole repo:** `npm run typecheck`, `npm run lint`, `npm test`.

---

### Task 0: Editor intake

**Files:**
- Maybe modify: `package-lock.json` (Phase B only)

**Interfaces:**
- Consumes: PR 1's `EditorRef.getSelectedParaMarker`, `EditorProps.onParaMarkerMenuRequest` and the `psc-para-marker-selected` class.
- Produces: a staged `@eten-tech-foundation/platform-editor` that exposes those names, so Tasks 1–3 typecheck.

The branch already exists (created during planning, with no upstream). The editor is being revised in parallel (the arrow stops are dropped and Backspace now merges), but the pinned names above are unchanged. So build against whatever PR 1's branch has now, and rebuild whenever it moves.

#### Phase A: now, before Task 1

- [ ] **Step 1: Confirm the branch**

Run: `git -C /Users/jolierabideau/repos/paranext-core status -sb | head -1`
Expected: `## pt-4540-para-marker-selection`, with no `...origin/` tracking suffix.

- [ ] **Step 2: Build against the unmerged editor PR**

`.erb/scripts/stage-dev-packages.ts` builds the editor from `dev-packages/scripture-editors` if that folder exists. It does here: a clean checkout on `platform-yalc`. There is no sibling `../scripture-editors`.

```bash
git -C /Users/jolierabideau/repos/paranext-core/dev-packages/scripture-editors fetch origin
git -C /Users/jolierabideau/repos/paranext-core/dev-packages/scripture-editors switch pt-4540-para-marker-selection
cd /Users/jolierabideau/repos/paranext-core && npm run build:editor
```

`build:editor` runs `node .erb/scripts/stage-dev-packages.ts --local && npm run build:dll`. `--local` builds whatever is checked out and marks its output, so that the next regular install replaces it. When the scripture-editors session pushes a revision, run `git -C …/dev-packages/scripture-editors pull` and `npm run build:editor` again.

Expected: `Successfully staged dev packages`, then the dll build completes.

- [ ] **Step 3: Confirm the API is visible**

```bash
grep -c "getSelectedParaMarker\|onParaMarkerMenuRequest" /Users/jolierabideau/repos/paranext-core/dev-packages/staging/platform-editor/dist/index.d.ts
```

Expected: a count of 2 or more. A count of 0 means the staging did not pick up PR 1; stop and report.

Do **not** commit anything produced by a `--local` build. The pre-commit hook blocks a provisional lockfile anyway.

#### Phase B: after PR 1 merges and `platform-yalc` moves (before Task 6)

- [ ] **Step 4: Return the editor checkout to the pin and install**

```bash
git -C /Users/jolierabideau/repos/paranext-core/dev-packages/scripture-editors switch platform-yalc
git -C /Users/jolierabideau/repos/paranext-core/dev-packages/scripture-editors pull
cd /Users/jolierabideau/repos/paranext-core && npm install && npm run verify:dev-packages
```

Expected: the install completes and `verify:dev-packages` exits 0.

- [ ] **Step 5: Commit the lockfile only if it changed**

```bash
git -C /Users/jolierabideau/repos/paranext-core status --porcelain package-lock.json
```

If the output is empty, skip this step. Otherwise:

```bash
git -C /Users/jolierabideau/repos/paranext-core add package-lock.json
git -C /Users/jolierabideau/repos/paranext-core commit -m "PT-4540: Take the editor build with paragraph-marker selection

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 1: `restoreSelectionIfLost` leaves a marker selection alone

Without this change, picking from the toolbar dropdown while a marker is selected first restores the last caret, which may be in another paragraph, and `formatPara` then retags the wrong paragraph.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.ts` (`restoreSelectionIfLost` and its TSDoc)
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (comment above `restoreEditorSelection`)
- Test: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts` (`describe('restoreSelectionIfLost')`)
- Also commit: `.context/designs/2026-09-25-para-marker-selection-host-plan.md` (this plan)

**Interfaces:**
- Consumes: `EditorRef.getSelectedParaMarker(): string | undefined` (Task 0).
- Produces: `restoreSelectionIfLost(editor: Pick<EditorRef, 'getSelection' | 'setSelection' | 'getSelectedParaMarker'> | null, lastFocusOutSelection: SelectionRange | undefined): void`.

- [ ] **Step 1: Write the failing test**

In `platform-scripture-editor.web-view.utils.test.ts`, inside `describe('restoreSelectionIfLost', …)`, replace the `makeEditor` helper:

```ts
  /** Editor stub exposing only the selection methods the helper consults. */
  function makeEditor(liveSelection: SelectionRange | undefined, selectedParaMarker?: string) {
    return {
      getSelection: vi.fn((): SelectionRange | undefined => liveSelection),
      setSelection: vi.fn(),
      getSelectedParaMarker: vi.fn((): string | undefined => selectedParaMarker),
    };
  }
```

Then add this case after `'leaves a live selection completely alone'`:

```ts
  it('leaves a selected paragraph marker alone, so the dropdown retags that paragraph', () => {
    // `getSelection()` reports undefined for a marker selection — a USJ selection is a text range
    // and cannot represent a selected node — yet the selection is live. Restoring the snapshot over
    // it would move the retag to whichever paragraph last held the caret.
    const editor = makeEditor(undefined, 'li2');

    restoreSelectionIfLost(editor, snapshot);

    expect(editor.setSelection).not.toHaveBeenCalled();
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run platform-scripture-editor.web-view.utils`
Expected: FAIL on `leaves a selected paragraph marker alone…`, with `expected "spy" to not be called at all, but actually been called 1 times`. The other `restoreSelectionIfLost` cases pass.

- [ ] **Step 3: Implement**

In `platform-scripture-editor.web-view.utils.ts`, add this paragraph to the function's TSDoc, after "A still-live selection is left completely alone…":

```ts
 * A selected paragraph marker counts as a live selection too. `getSelection()` reports `undefined`
 * for it, because a USJ selection is a text range and cannot represent a selected node, so without
 * asking `getSelectedParaMarker()` this would restore the last caret over it and the paragraph
 * dropdown would retag whichever paragraph that caret was in.
```

Then replace the function:

```ts
export function restoreSelectionIfLost(
  editor: Pick<EditorRef, 'getSelection' | 'setSelection' | 'getSelectedParaMarker'> | null,
  lastFocusOutSelection: SelectionRange | undefined,
): void {
  if (!editor || editor.getSelection() || editor.getSelectedParaMarker()) return;
  if (lastFocusOutSelection) editor.setSelection(lastFocusOutSelection);
}
```

In `platform-scripture-editor.web-view.tsx`, replace the three-line comment above `const restoreEditorSelection = useCallback(` with:

```tsx
  // Opening the paragraph switcher's Radix popover takes focus off `.editor-input`, where Lexical's
  // blur processing can null a caret selection — and `formatPara` needs a selection, so the retag
  // would refuse. A selected paragraph marker survives the blur and is left as it is. The `\` and
  // Enter palettes restore the same way before they apply.
```

- [ ] **Step 4: Run the tests and typecheck**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run platform-scripture-editor.web-view.utils`
Expected: PASS for every case in the file.

Run: `npm run typecheck --workspace=extensions/src/platform-scripture-editor`
Expected: exit 0. The error `Property 'getSelectedParaMarker' does not exist on type 'EditorRef'` means Task 0 Phase A did not stage PR 1; go back to it.

- [ ] **Step 5: Commit (with this plan)**

```bash
git add .context/designs/2026-09-25-para-marker-selection-host-plan.md extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.ts extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.utils.test.ts extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
git commit -m "PT-4540: Keep a selected paragraph marker when restoring a lost caret

The paragraph dropdown restored the last caret before retagging, which moved a
marker selection's retag to another paragraph. Adds the host implementation
plan for paragraph-marker selection.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Controlled `ParagraphStyleTrigger` that closes on pick and returns focus

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.tsx`
- Modify: `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.stories.tsx`
- Test: `extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces (used by Task 3): three new required props on `ParagraphStyleTriggerProps`:
  - `isMenuOpen: boolean`
  - `onMenuOpenChange: (isOpen: boolean) => void`
  - `onReturnFocusToEditor: () => void`
- Behaviour:
  - The menu is open iff `isMenuOpen && !isStructureProtected`.
  - The trigger button reports `true` on open and `false` on close.
  - Picking an item runs the item's action, then reports `false`.
  - On every close, it calls `onReturnFocusToEditor` and prevents Radix's return to the trigger, **unless** it closed because of an outside interaction. In that case focus stays where the user put it (Radix's non-modal popover already skips its own trigger refocus then).

This mirrors `CharacterMarkerControl` (`character-marker-control/character-marker-control.component.tsx`), whose `closingMarkerMenuItems` wraps each action with a close, and whose `onClose` refocuses the editor.

- [ ] **Step 1: Update the existing tests to the new props and write the failing ones**

In `paragraph-style-trigger.component.test.tsx`, replace the imports:

```tsx
// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SHRINK_STEP, ShrinkStepOverride, type MarkerMenuItem } from 'platform-bible-react';
import { useState } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ParagraphStyleTrigger } from './paragraph-style-trigger.component';
```

Replace the `beforeAll`. cmdk scrolls the highlighted item into view, and jsdom has no such method:

```tsx
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  // cmdk scrolls the highlighted row into view when the menu opens; jsdom does not implement it.
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});
```

In `renderTrigger`, and in the `'renders nothing at all without a marker'` test, add the three new props to each `<ParagraphStyleTrigger …>`:

```tsx
      isMenuOpen={false}
      onMenuOpenChange={() => {}}
      onReturnFocusToEditor={() => {}}
```

Append a new `describe` at the end of the file:

```tsx
const PARAGRAPH_ITEM_ACTION = vi.fn();
const MENU_ITEMS: MarkerMenuItem[] = [
  { marker: 'p', title: 'Paragraph', action: () => PARAGRAPH_ITEM_ACTION() },
  { marker: 'q1', title: 'Poetic Line Level 1', action: () => {} },
];

/**
 * Plays the web view's part: holds whether the menu is open, and offers a stand-in for the editor's
 * `onParaMarkerMenuRequest` so a test can open the menu the way Enter on a selected marker does.
 */
function MenuHarness({
  onReturnFocusToEditor,
  isStructureProtected = false,
}: {
  onReturnFocusToEditor: () => void;
  isStructureProtected?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsMenuOpen(true)}>
        Editor asks for the menu
      </button>
      <button type="button">Somewhere else</button>
      <ParagraphStyleTrigger
        blockMarker="p"
        styleName="Paragraph"
        isStructureProtected={isStructureProtected}
        markerMenuItems={MENU_ITEMS}
        localizedStrings={{}}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        onReturnFocusToEditor={onReturnFocusToEditor}
      />
    </>
  );
}

const TRIGGER_NAME = '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%';
const queryMenu = () => screen.queryByRole('dialog');
const pressEscape = () => fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
/** Radix arms its outside-pointer listener, and runs its unmount auto-focus, on zero-delay timers. */
const flushZeroDelayTimers = () =>
  act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });

describe('ParagraphStyleTrigger menu', () => {
  it('opens when the editor asks for it', () => {
    render(<MenuHarness onReturnFocusToEditor={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    expect(queryMenu()).toBeInTheDocument();
  });

  it('stays closed when the editor asks while the structure is protected', () => {
    render(<MenuHarness onReturnFocusToEditor={vi.fn()} isStructureProtected />);

    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    expect(queryMenu()).not.toBeInTheDocument();
  });

  it('closes and returns focus to the editor when an item is picked', async () => {
    const onReturnFocusToEditor = vi.fn();
    PARAGRAPH_ITEM_ACTION.mockClear();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));

    fireEvent.click(screen.getByRole('option', { name: /Paragraph/ }));

    expect(PARAGRAPH_ITEM_ACTION).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('button', { name: TRIGGER_NAME })).not.toHaveFocus();
  });

  it('closes on a pick from a menu the toolbar button opened, too', async () => {
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: TRIGGER_NAME }));
    expect(queryMenu()).toBeInTheDocument();

    fireEvent.click(screen.getByRole('option', { name: /Poetic Line Level 1/ }));

    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
  });

  it('returns focus to the editor, not the button, when Escape dismisses the menu', async () => {
    // Same as the character-marker control beside it: the toolbar control is a way to act on the
    // text, so dismissing it puts the user back in the text.
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    const trigger = screen.getByRole('button', { name: TRIGGER_NAME });
    fireEvent.click(trigger);

    pressEscape();

    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
    expect(queryMenu()).not.toBeInTheDocument();
    expect(trigger).not.toHaveFocus();
  });

  it('leaves focus where the user put it when the menu closes because they interacted outside it', async () => {
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    fireEvent.click(screen.getByRole('button', { name: 'Editor asks for the menu' }));
    expect(queryMenu()).toBeInTheDocument();
    await flushZeroDelayTimers();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Somewhere else' }));

    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await flushZeroDelayTimers();
    expect(onReturnFocusToEditor).not.toHaveBeenCalled();
  });

  it('refocuses the editor again on the next close after an outside interaction', async () => {
    // The outside-interaction flag belongs to one opening; a stale flag would strand focus on the
    // next Escape.
    const onReturnFocusToEditor = vi.fn();
    render(<MenuHarness onReturnFocusToEditor={onReturnFocusToEditor} />);
    const askButton = screen.getByRole('button', { name: 'Editor asks for the menu' });
    fireEvent.click(askButton);
    await flushZeroDelayTimers();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Somewhere else' }));
    await waitFor(() => expect(queryMenu()).not.toBeInTheDocument());
    await flushZeroDelayTimers();

    fireEvent.click(askButton);
    expect(queryMenu()).toBeInTheDocument();
    pressEscape();

    await waitFor(() => expect(onReturnFocusToEditor).toHaveBeenCalledTimes(1));
  });
});
```

- [ ] **Step 2: Run to verify the new cases fail**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-style-trigger.component`
Expected: FAIL. `opens when the editor asks for it` fails because no dialog appears (the prop is ignored). The pick, Escape, and "next close" cases fail because `onReturnFocusToEditor` is never called and the menu stays open. The pre-existing layout cases still pass. So may the "stays closed" and "outside interaction" cases, since an ignored prop never opens anything; the revert check in Task 6 covers those two.

- [ ] **Step 3: Implement the controlled popover**

In `paragraph-style-trigger.component.tsx`, add the React import at the top:

```tsx
import { useEffect, useMemo, useRef } from 'react';
```

Add to `ParagraphStyleTriggerProps`, after `localizedStrings`:

```tsx
  /**
   * Whether the menu is open. Controlled by the caller so the editor can open it from the keyboard
   * (Enter or Alt+Down on a selected paragraph marker).
   */
  isMenuOpen: boolean;
  /**
   * Called with `true` when this button opens the menu, and with `false` when the menu closes —
   * including right after an item is picked, since this is a single-select control.
   */
  onMenuOpenChange: (isOpen: boolean) => void;
  /**
   * Puts keyboard focus back in the editor. Called as the menu closes, in place of Radix's return to
   * this button, so the user is back in the text — and a selected paragraph marker, which the editor
   * keeps while focus is in the menu, is live again for the next key. Not called when the menu
   * closed because the user clicked or focused something else: focus belongs where they put it.
   */
  onReturnFocusToEditor: () => void;
```

Extend the component's destructuring with `isMenuOpen, onMenuOpenChange, onReturnFocusToEditor`. Then add the following after `const widthFloor = …;` and **before** `if (!blockMarker) return undefined;`, because hooks must run on every render:

```tsx
  // Set by an outside interaction and read as the menu closes; each opening starts clear.
  const wasClosedByOutsideInteractionRef = useRef(false);
  useEffect(() => {
    if (isMenuOpen) wasClosedByOutsideInteractionRef.current = false;
  }, [isMenuOpen]);

  // This is a single-select control, so picking a marker must close the menu. `MarkerMenu` wires
  // `onSelect` straight to `item.action` and knows nothing about its host's open state, so each
  // action is wrapped here, as `CharacterMarkerControl` does.
  const closingMarkerMenuItems = useMemo(
    () =>
      markerMenuItems.map(
        (item): MarkerMenuItem => ({
          ...item,
          action: () => {
            item.action();
            onMenuOpenChange(false);
          },
        }),
      ),
    [markerMenuItems, onMenuOpenChange],
  );

  const handleCloseAutoFocus = (event: Event) => {
    if (wasClosedByOutsideInteractionRef.current) return;
    event.preventDefault();
    onReturnFocusToEditor();
  };
```

Replace `<Popover>` with:

```tsx
      <Popover
        // Structure protection disables the button, so it must also keep an editor request from
        // opening the menu around it.
        open={isMenuOpen && !isStructureProtected}
        onOpenChange={onMenuOpenChange}
      >
```

Replace the `<PopoverContent …>` opening tag, and the `markerMenuItems` prop of `<MarkerMenu>`. Keep the existing comment above `PopoverContent`:

```tsx
        <PopoverContent
          className="tw:w-96 tw:max-w-(--radix-popover-content-available-width) tw:p-0"
          onInteractOutside={() => {
            wasClosedByOutsideInteractionRef.current = true;
          }}
          onCloseAutoFocus={handleCloseAutoFocus}
        >
          <MarkerMenu
            localizedStrings={localizedStrings}
            markerMenuItems={closingMarkerMenuItems}
            searchPlaceholder={localizedStrings[SEARCH_PLACEHOLDER_KEY]}
          />
        </PopoverContent>
```

Update the first paragraph of the component's TSDoc to:

```tsx
/**
 * The toolbar's paragraph-style control: a button showing the marker and style name of the block
 * the cursor is in — or of the paragraph whose marker is selected — which opens the paragraph marker
 * menu. The menu is controlled by the caller so the editor can open it from the keyboard; picking an
 * item closes it, and closing returns focus to the editor.
```

Note: when `onReturnFocusToEditor` moves focus into the editor during unmount, Radix can report a focus-outside, and so a second `onOpenChange(false)`. That is harmless here, because the caller's state is already `false`. `CharacterMarkerControl` needs a guard only because its `onClose` has side effects.

- [ ] **Step 4: Update the stories to hold the state**

In `paragraph-style-trigger.component.stories.tsx`, change the react import:

```tsx
import { useState, type ComponentProps, type ReactNode } from 'react';
```

Replace the `Trigger` helper:

```tsx
/** Renders the trigger with the story's args, the shared menu items, and the shared strings. */
function Trigger({ blockMarker, isStructureProtected = false, styleName }: Partial<TriggerArgs>) {
  // The web view owns this state in the app; each story instance keeps its own so clicking opens it.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <ParagraphStyleTrigger
      blockMarker={blockMarker}
      isStructureProtected={isStructureProtected}
      localizedStrings={localizedStrings}
      markerMenuItems={markerMenuItems}
      styleName={styleName}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      onReturnFocusToEditor={() => {}}
    />
  );
}
```

If `TriggerArgs` is derived from `ComponentProps<typeof ParagraphStyleTrigger>` and the story `args` now fail to typecheck for lack of the three new props, add them to the story meta's `args` with the same values as in `renderTrigger` (`isMenuOpen: false` and two no-op functions). Don't widen the component's types.

- [ ] **Step 5: Run the tests**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-style-trigger.component`
Expected: PASS, all cases.

If the outside-interaction cases flake on timing, replace each `flushZeroDelayTimers()` with a `waitFor` on the dialog's state, and keep a final `flushZeroDelayTimers()` before the `not.toHaveBeenCalled` assertion. Do not delete the case; it is Review Focus #1.

Typecheck fails until Task 3 passes the new props from the web view, so run it at the end of Task 3.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.tsx extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.test.tsx extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.stories.tsx
git commit -m "PT-4540: Close the paragraph menu on pick and return focus to the editor

The paragraph menu is now controlled so the editor can open it, closes when a
style is picked like the character-marker control beside it, and returns focus
to the editor on close unless the user clicked elsewhere.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: `useParagraphMenuOpenState` and the web-view wiring

**Files:**
- Create: `extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.ts`
- Test: `extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.test.ts`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`

**Interfaces:**
- Consumes: the trigger's new props (Task 2); `EditorProps.onParaMarkerMenuRequest` (Task 0).
- Produces:

```ts
export type UseParagraphMenuOpenStateOptions = {
  isReadOnly: boolean;
  isStructureProtected: boolean;
  hasBlockMarker: boolean;
  notifyStructureProtected: () => void;
};
export function useParagraphMenuOpenState(options: UseParagraphMenuOpenStateOptions): {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  requestMenuFromEditor: () => void;
};
```

- [ ] **Step 1: Write the failing hook tests**

Create `use-paragraph-menu-open-state.hook.test.ts`:

```ts
// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  useParagraphMenuOpenState,
  type UseParagraphMenuOpenStateOptions,
} from './use-paragraph-menu-open-state.hook';

function renderOpenState(overrides: Partial<UseParagraphMenuOpenStateOptions> = {}) {
  const notifyStructureProtected = vi.fn();
  const initialProps: UseParagraphMenuOpenStateOptions = {
    isReadOnly: false,
    isStructureProtected: false,
    hasBlockMarker: true,
    notifyStructureProtected,
    ...overrides,
  };
  const rendered = renderHook(
    (props: UseParagraphMenuOpenStateOptions) => useParagraphMenuOpenState(props),
    { initialProps },
  );
  return { ...rendered, initialProps, notifyStructureProtected };
}

describe('useParagraphMenuOpenState', () => {
  it('starts closed', () => {
    const { result } = renderOpenState();
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('opens from the editor when the menu is available', () => {
    const { result } = renderOpenState();

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(true);
  });

  it('notifies instead of opening while the structure is protected, so the key is never silently dropped', () => {
    const { result, notifyStructureProtected } = renderOpenState({ isStructureProtected: true });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
    expect(notifyStructureProtected).toHaveBeenCalledTimes(1);
  });

  it('ignores an editor request in a read-only project, which has no paragraph menu at all', () => {
    const { result, notifyStructureProtected } = renderOpenState({ isReadOnly: true });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
    expect(notifyStructureProtected).not.toHaveBeenCalled();
  });

  it('ignores an editor request while there is no block marker for the trigger to show', () => {
    // The trigger renders nothing without a marker; an open state recorded now would spring the
    // menu open the next time the caret enters a block.
    const { result } = renderOpenState({ hasBlockMarker: false });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
  });

  it('passes the toolbar button’s own open and close through', () => {
    const { result } = renderOpenState();

    act(() => result.current.setIsMenuOpen(true));
    expect(result.current.isMenuOpen).toBe(true);

    act(() => result.current.setIsMenuOpen(false));
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('closes when protection turns on and stays closed when it turns off', () => {
    const { result, rerender, initialProps } = renderOpenState();
    act(() => result.current.requestMenuFromEditor());
    expect(result.current.isMenuOpen).toBe(true);

    rerender({ ...initialProps, isStructureProtected: true });
    expect(result.current.isMenuOpen).toBe(false);

    rerender({ ...initialProps, isStructureProtected: false });
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('closes when the caret leaves every block and stays closed when it re-enters one', () => {
    const { result, rerender, initialProps } = renderOpenState();
    act(() => result.current.setIsMenuOpen(true));

    rerender({ ...initialProps, hasBlockMarker: false });
    expect(result.current.isMenuOpen).toBe(false);

    rerender({ ...initialProps, hasBlockMarker: true });
    expect(result.current.isMenuOpen).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run use-paragraph-menu-open-state`
Expected: FAIL with `Failed to resolve import "./use-paragraph-menu-open-state.hook"`.

- [ ] **Step 3: Implement the hook**

Create `use-paragraph-menu-open-state.hook.ts`:

```ts
import { useCallback, useEffect, useState } from 'react';

/** Inputs to {@link useParagraphMenuOpenState}. */
export type UseParagraphMenuOpenStateOptions = {
  /** Whether the editor is read-only; the toolbar has no paragraph menu then. */
  isReadOnly: boolean;
  /** Whether the project's structure is protected, which disables changing a paragraph's style. */
  isStructureProtected: boolean;
  /** Whether there is a block marker for the toolbar trigger to show; it renders nothing without one. */
  hasBlockMarker: boolean;
  /** Tells the user the structure is locked, for a request the lock refuses. */
  notifyStructureProtected: () => void;
};

/**
 * Holds whether the toolbar paragraph menu is open, and turns the editor's keyboard request (Enter
 * or Alt+Down on a selected paragraph marker, delivered as `onParaMarkerMenuRequest`) into opening
 * it.
 *
 * A request the structure lock refuses is reported with the lock notification rather than dropped.
 * A request in a read-only project, or with no block marker to show, is ignored: there is no menu to
 * open. Whenever the menu stops being available it is closed, so it cannot spring open on its own
 * when the lock lifts or the caret re-enters a block.
 *
 * @returns `isMenuOpen` for `ParagraphStyleTrigger`, `setIsMenuOpen` for its `onMenuOpenChange`,
 *   and `requestMenuFromEditor` for `<Editorial onParaMarkerMenuRequest>`
 */
export function useParagraphMenuOpenState({
  isReadOnly,
  isStructureProtected,
  hasBlockMarker,
  notifyStructureProtected,
}: UseParagraphMenuOpenStateOptions) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuAvailable = !isReadOnly && !isStructureProtected && hasBlockMarker;

  useEffect(() => {
    if (!isMenuAvailable) setIsMenuOpen(false);
  }, [isMenuAvailable]);

  const requestMenuFromEditor = useCallback(() => {
    if (isReadOnly || !hasBlockMarker) return;
    if (isStructureProtected) {
      notifyStructureProtected();
      return;
    }
    setIsMenuOpen(true);
  }, [isReadOnly, hasBlockMarker, isStructureProtected, notifyStructureProtected]);

  return { isMenuOpen, setIsMenuOpen, requestMenuFromEditor };
}
```

If lint flags the `setIsMenuOpen` call inside the effect (`react-hooks/set-state-in-effect`), replace the `useEffect` with React's "adjust state while rendering" pattern. Remove `useEffect` from the import in that case:

```ts
  const [wasMenuAvailable, setWasMenuAvailable] = useState(isMenuAvailable);
  if (wasMenuAvailable !== isMenuAvailable) {
    setWasMenuAvailable(isMenuAvailable);
    if (!isMenuAvailable) setIsMenuOpen(false);
  }
```

- [ ] **Step 4: Run the hook tests**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run use-paragraph-menu-open-state`
Expected: PASS (8 tests).

- [ ] **Step 5: Wire the web view**

In `platform-scripture-editor.web-view.tsx`, add the import beside the other local hook imports (for example next to `useStructureProtectionState`'s):

```tsx
import { useParagraphMenuOpenState } from './use-paragraph-menu-open-state.hook';
```

Directly after the `paragraphSwitcherMenuItems` `useMemo`, add:

```tsx
  const {
    isMenuOpen: isParagraphMenuOpen,
    setIsMenuOpen: setIsParagraphMenuOpen,
    requestMenuFromEditor: handleParagraphMarkerMenuRequest,
  } = useParagraphMenuOpenState({
    isReadOnly: isReadOnlyEffective,
    isStructureProtected,
    hasBlockMarker: !!blockMarker,
    notifyStructureProtected,
  });

  // The editor keeps a selected paragraph marker while focus is in the paragraph menu; focusing it
  // again makes that selection live for the next key.
  const focusEditor = useCallback(() => editorRef.current?.focus(), []);
```

On `<Editorial …>` (inside `editorTree`), add after `onSelectionChange={handleSelectionChange}`:

```tsx
            onParaMarkerMenuRequest={handleParagraphMarkerMenuRequest}
```

On `<ParagraphStyleTrigger …>` in the toolbar, add after `localizedStrings={localizedStrings}`:

```tsx
                  isMenuOpen={isParagraphMenuOpen}
                  onMenuOpenChange={setIsParagraphMenuOpen}
                  onReturnFocusToEditor={focusEditor}
```

`<Editorial>` forwards every `EditorProps` field except `children` to the platform `<Editor>` (`packages/platform/src/Editorial.tsx` in scripture-editors), so the prop needs no editor-side change to arrive.

If `blockMarker` or `isReadOnlyEffective` is declared *after* `paragraphSwitcherMenuItems`, place the hook call after the later of the two declarations instead. Hooks can't read a `const` before it is declared.

- [ ] **Step 6: Typecheck and run the extension's affected tests**

Run: `npm run typecheck --workspace=extensions/src/platform-scripture-editor`
Expected: exit 0.

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph`
Expected: PASS (the trigger, label and tooltip suites).

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run use-paragraph-menu-open-state`
Expected: PASS.

Run: `npm run lint --workspace=extensions/src/platform-scripture-editor`
Expected: exit 0.

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.ts extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.test.ts extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
git commit -m "PT-4540: Open the paragraph menu from a selected paragraph marker

Enter or Alt+Down on a selected marker now opens the toolbar paragraph menu;
a structure lock answers with its notification instead of dropping the key.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Selected-row styling and contrast test

These values were measured with chroma-js against `src/shared/data/themes.data.json`, the themes the app loads:
- `--foreground` clears 3:1 against both `--background` and `--accent` in all four themes. The worst case is 13.78 (paratext-dark against `--accent`).
- `--primary` scores 2.76 against `--background` in paratext-dark, and `--ring` scores 2.32 in paratext-light. This is the same pattern the list-selection ADR recorded.

So the fill is `--accent`, the 4px leading bar is `--foreground`, and the glyph is `--foreground` bold.

The gutter lies outside the paragraph's box: the glyph is absolutely positioned into `.editor-input`'s padding. So the fill and bar are painted as outer box-shadows, offset toward inline-start by `--psc-gutter-width + --para-indent`. No pseudo-element is used, because the focus box owns `::after`. The RTL selector follows the existing `.psc-gutter-markers[dir='rtl'] .para > .marker…` rule in the same file.

Demo copy decision: `lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css` is **not** changed. Its Storybook stories never enable `hasGutterParaMarkers`, so the class cannot occur there. `usj-nodes-scss-coverage.test.ts` compares only the gutter indent-compensation maps, which this rule does not touch.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/_usj-nodes.scss` (header comment, plus a new block after the `verse-delete-armed` `@media (prefers-reduced-motion: reduce)` block)
- Test: `extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts`
- Create: `extensions/src/platform-scripture-editor/src/paragraph-marker-selection-contrast.test.ts`

**Interfaces:**
- Consumes: the editor's `psc-para-marker-selected` class on the paragraph element.
- Produces: CSS only.

- [ ] **Step 1: Write the failing style pins**

In `usj-nodes-styles.test.ts`, insert this `describe` immediately before `describe('cross-copy drift pins (must agree with the demo copy in platform-bible-react)', …`:

```ts
  describe('selected paragraph marker row', () => {
    // The editor marks the paragraph whose gutter marker is selected with `psc-para-marker-selected`.
    // Selection gets a channel of its own (adr-list-selection-on-a-dedicated-visual-channel): a
    // fill and a leading bar that reach across the gutter, never the active-text focus box.
    const declarations = scss.replace(/\/\*[\s\S]*?\*\//g, '');
    const block = (selector: string) =>
      declarations.match(
        new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`),
      )?.[1];

    it('fills the row and draws the leading bar in the contrast-tested token (LTR)', () => {
      const ltr = block('.psc-gutter-markers .psc-para-marker-selected');
      expect(ltr).toContain('background-color: var(--accent)');
      expect(ltr).toMatch(/box-shadow:[^;]*var\(--accent\)[^;]*var\(--foreground\)/);
      // Toward inline-start, which is the left in LTR.
      expect(ltr).toMatch(/box-shadow:\s*calc\(4px - var\(--psc-para-marker-selection-reach\)\)/);
    });

    it('mirrors the fill and bar to the right in RTL', () => {
      const rtl = block(".psc-gutter-markers[dir='rtl'] .psc-para-marker-selected");
      expect(rtl).toMatch(/box-shadow:[^;]*var\(--accent\)[^;]*var\(--foreground\)/);
      expect(rtl).toMatch(/box-shadow:\s*calc\(var\(--psc-para-marker-selection-reach\) - 4px\)/);
    });

    it('strengthens the selected glyph', () => {
      const glyph = block(
        '.psc-gutter-markers .psc-para-marker-selected > .marker:not(.verse):not(.chapter):first-child',
      );
      expect(glyph).toContain('color: var(--foreground)');
    });

    it('uses no pseudo-element, which the focus box and book code already own', () => {
      expect(declarations).not.toMatch(/\.psc-para-marker-selected[^{,]*::?(?:before|after)/);
    });
  });
```

- [ ] **Step 2: Write the failing contrast test**

Create `paragraph-marker-selection-contrast.test.ts`:

```ts
// @vitest-environment node
import { readFileSync } from 'fs';
import path from 'path';
import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

// WCAG 2.2 non-text contrast minimum (SC 1.4.11). The selected-row bar is a UI indicator, not text.
const MIN_NON_TEXT_CONTRAST = 3;

type ThemeFile = Record<string, Record<string, { cssVariables: Record<string, string> }>>;

// The built-in themes as the app loads them (generated from platform-bible-react's index.css by
// its build-themes script). Read from disk so this extension test needs no import from that package.
const themesPath = path.resolve(__dirname, '../../../../src/shared/data/themes.data.json');
// JSON.parse returns `any`, which assigns to the known theme-file shape without a type assertion
const themeFile: ThemeFile = JSON.parse(readFileSync(themesPath, 'utf-8'));

/**
 * Every theme with real variables. The file also carries `user-*` placeholder families with empty
 * `cssVariables`; filtering on that rather than on names means a fifth real theme is swept
 * automatically.
 */
const realThemes = Object.entries(themeFile).flatMap(([familyId, family]) =>
  Object.entries(family)
    .filter(([, definition]) => Object.keys(definition.cssVariables).length > 0)
    .map(([themeType, definition]) => ({
      name: familyId ? `${familyId}-${themeType}` : themeType,
      cssVariables: definition.cssVariables,
    })),
);

const scss = readFileSync(path.resolve(__dirname, '_usj-nodes.scss'), 'utf-8').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
);

describe('selected paragraph marker bar contrast', () => {
  it('found real themes to check', () => {
    // Guards the sweep: a filter that excluded every theme would pass every check by running none.
    expect(realThemes.length).toBeGreaterThanOrEqual(4);
  });

  it('ties the sweep to the token the stylesheet actually paints the bar with', () => {
    // The bar is the second (lower) box-shadow layer; the fill `--accent` layer covers all of it but
    // the leading 4px. A change to another token there fails here instead of passing silently.
    const ltr = scss.match(/\.psc-gutter-markers \.psc-para-marker-selected\s*\{([^}]*)\}/)?.[1];
    expect(ltr).toMatch(/box-shadow:[^;]*var\(--accent\)\s*,[^;]*var\(--foreground\)\s*;/);
  });

  // The bar sits over the fill's neighbour: the editor surface (`--background`) at its outer edge
  // and the row fill (`--accent`) at its inner edge. One theme passing proves nothing about the others.
  realThemes.forEach(({ name, cssVariables }) => {
    (['background', 'accent'] as const).forEach((surface) => {
      it(`clears ${MIN_NON_TEXT_CONTRAST}:1 against --${surface} in ${name}`, () => {
        const contrast = chroma.contrast(
          chroma(cssVariables.foreground),
          chroma(cssVariables[surface]),
        );
        expect(contrast).toBeGreaterThanOrEqual(MIN_NON_TEXT_CONTRAST);
      });
    });
  });

  it('rejects --primary, which fails in paratext-dark', () => {
    const theme = realThemes.find((candidate) => candidate.name === 'paratext-dark');
    if (!theme) throw new Error('paratext-dark theme not found in themes.data.json');
    expect(
      chroma.contrast(chroma(theme.cssVariables.primary), chroma(theme.cssVariables.background)),
    ).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });

  it('rejects --ring, which fails in paratext-light', () => {
    const theme = realThemes.find((candidate) => candidate.name === 'paratext-light');
    if (!theme) throw new Error('paratext-light theme not found in themes.data.json');
    expect(
      chroma.contrast(chroma(theme.cssVariables.ring), chroma(theme.cssVariables.background)),
    ).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });
});
```

`chroma-js` (`^3.2.0`) and `@types/chroma-js` (`^3.1.2`) are root dependencies, and they resolve from the extension through the hoisted `node_modules`. If `import/no-unresolved` complains in lint, add both to the extension's `devDependencies` at those versions, run `npm install`, and include `package-lock.json` in this task's commit.

- [ ] **Step 3: Run both to verify they fail**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run usj-nodes-styles`
Expected: FAIL on the three positive `selected paragraph marker row` cases (`expected undefined to contain …`). The pseudo-element case passes.

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-selection-contrast`
Expected: FAIL only on `ties the sweep to the token…` (`expected undefined to match …`). The 8 per-theme cases and both rejections already pass, because they measure tokens rather than the stylesheet.

- [ ] **Step 4: Add the styles**

In `_usj-nodes.scss`, insert the following after the closing `}` of the `@media (prefers-reduced-motion: reduce) { .verse-delete-armed .verse-selected { … } }` block:

```scss
/* Paragraph-marker selection (paragraph-structure view). The editor puts `psc-para-marker-selected`
   (and aria-selected) on the paragraph whose gutter marker is the selection. Selection gets a
   channel of its own, per adr-list-selection-on-a-dedicated-visual-channel: a surface fill plus a
   4px leading bar, never the active-text focus box (which owns this element's ::after), and no
   pseudo-element. The gutter lies outside the paragraph's box — the glyph is absolutely positioned
   into .editor-input's padding — so the fill and bar are outer box-shadows offset toward
   inline-start by the gutter width plus the paragraph's own indent compensation; the fill layer
   stops 4px short, which is the bar. `--foreground` is the bar token by measured contrast (>= 3:1
   against --background and --accent in every built-in theme), pinned by
   paragraph-marker-selection-contrast.test.ts. */
.psc-gutter-markers .psc-para-marker-selected {
  --psc-para-marker-selection-reach: calc(var(--psc-gutter-width) + var(--para-indent, 0px));
  background-color: var(--accent);
  box-shadow:
    calc(4px - var(--psc-para-marker-selection-reach)) 0 0 0 var(--accent),
    calc(-1 * var(--psc-para-marker-selection-reach)) 0 0 0 var(--foreground);
}

.psc-gutter-markers[dir='rtl'] .psc-para-marker-selected {
  box-shadow:
    calc(var(--psc-para-marker-selection-reach) - 4px) 0 0 0 var(--accent),
    var(--psc-para-marker-selection-reach) 0 0 0 var(--foreground);
}

.psc-gutter-markers .psc-para-marker-selected > .marker:not(.verse):not(.chapter):first-child {
  color: var(--foreground);
  font-weight: 700;
}
```

In the file header comment (the opening `/* Based on scripture-editors' … */` block), add these lines before the line `The source's four \`local()\`-only Charis SIL @font-face rules are dropped. */`:

```
   `.psc-para-marker-selected` is this repo's own rule: the library styles that class in its
   editor.css, which this repo does not load, and the colours here are theme tokens.
```

- [ ] **Step 5: Run the style, contrast, and coverage tests**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run usj-nodes`
Expected: PASS for `usj-nodes-styles.test.ts` and `usj-nodes-scss-coverage.test.ts`. The new rule sets none of the tracked properties (`margin-*`, `text-indent`, `--para-indent`, `--verse-text-start`), so the derivation ignores it.

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-selection-contrast`
Expected: PASS (12 tests).

Run: `npm run test --workspace=lib/platform-bible-react -- --run usj-nodes-styles`
Expected: PASS, with the demo copy untouched.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/_usj-nodes.scss extensions/src/platform-scripture-editor/src/usj-nodes-styles.test.ts extensions/src/platform-scripture-editor/src/paragraph-marker-selection-contrast.test.ts
git commit -m "PT-4540: Highlight the row of a selected paragraph marker

An accent fill and a foreground leading bar that reach across the gutter, on
their own channel beside the focus box; the bar token is chosen by measured
contrast in all four themes and pinned by a test. The Storybook demo copy of
usj-nodes.css is left alone: its stories never show gutter markers.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Keyboard shortcuts catalog entry

**Files:**
- Modify: `src/shared/data/keyboard-shortcuts.data.ts` (after the `scripture-paragraph-markers-menu` entry)
- Test: `src/shared/data/keyboard-shortcuts.data.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the catalog entry `id: 'scripture-open-paragraph-menu-from-marker'`.

The arrow-exclusion comment that follows `scripture-paragraph-markers-menu` stays **unchanged**. The editor no longer adds arrow stops on markers, and an arrow on a selected marker just returns the caret to the text, which is ordinary caret movement.

- [ ] **Step 1: Write the failing test**

Append to `keyboard-shortcuts.data.test.ts`. `existsSync` and `path` are already imported at the top of the file:

```ts
describe('paragraph marker menu chord', () => {
  const entry = rootKeyboardShortcuts.find(
    (shortcut) => shortcut.id === 'scripture-open-paragraph-menu-from-marker',
  );

  it('catalogs Enter first and Alt+Down as the alternative', () => {
    expect(entry?.keys).toEqual({
      macOS: '⏎ / ⌥↓',
      windows: 'Enter / Alt+↓',
      linux: 'Enter / Alt+↓',
    });
  });

  it('shows no menu hint, since the chord works only on a selected paragraph marker', () => {
    expect(entry).toBeDefined();
    expect(entry?.command).toBeUndefined();
  });

  it('points only at files that exist', () => {
    expect(entry?.locations.length).toBeGreaterThan(0);
    entry?.locations.forEach((location) =>
      expect(existsSync(path.join(process.cwd(), location))).toBe(true),
    );
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test:core -- --run src/shared/data/keyboard-shortcuts.data.test.ts`
Expected: FAIL on the three new cases (`expected undefined to deeply equal …`, `expected undefined to be defined`, `expected undefined to be greater than 0`).

- [ ] **Step 3: Add the entry**

In `keyboard-shortcuts.data.ts`, insert this after the closing `},` of the `scripture-paragraph-markers-menu` entry, and before the arrow-exclusion comment:

```ts
  {
    id: 'scripture-open-paragraph-menu-from-marker',
    purpose: 'Open the paragraph style menu to change the selected paragraph marker',
    category: 'Editing',
    // Handled inside the editor library that ships as the `@eten-tech-foundation/platform-editor`
    // package: its `ParaMarkerSelectionPlugin` claims Enter and Alt+Down from a `KEY_DOWN_COMMAND`
    // handler only while a paragraph marker is selected (by clicking its gutter glyph in the
    // paragraph-structure view), and asks the web view to open its toolbar paragraph menu through
    // `onParaMarkerMenuRequest`. `locations` names the in-repo code that answers that request.
    // No `command`: the chord does nothing unless a paragraph marker is selected.
    context:
      'Scripture editor web view (handled by the @eten-tech-foundation/platform-editor package)',
    keys: { macOS: '⏎ / ⌥↓', windows: 'Enter / Alt+↓', linux: 'Enter / Alt+↓' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/use-paragraph-menu-open-state.hook.ts',
      'extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.tsx',
    ],
  },
```

- [ ] **Step 4: Run the test**

Run: `npm run test:core -- --run src/shared/data/keyboard-shortcuts.data.test.ts`
Expected: PASS for every case, including the existing `commands match the expected menu hints` and the main-process chord-collision check. If an existing check rejects Enter being listed by both this entry and `scripture-paragraph-markers-menu`, stop and report. Do not weaken the check.

- [ ] **Step 5: Commit**

```bash
git add src/shared/data/keyboard-shortcuts.data.ts src/shared/data/keyboard-shortcuts.data.test.ts
git commit -m "PT-4540: Catalog Enter and Alt+Down on a selected paragraph marker

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Full verification and manual QA

**Files:** none new. Fix-ups only, each committed with the task it belongs to.

- [ ] **Step 1: Editor intake**

Run Task 0 Phase B now if PR 1 has merged. If it hasn't, first pull and rebuild PR 1's branch (`git -C …/dev-packages/scripture-editors pull && npm run build:editor`), so QA sees the revised arrow and Backspace behaviour. Then run the checks below against the `--local` build, and repeat them after intake. The PR stays a draft until then.

- [ ] **Step 2: Whole-repo checks**

```bash
cd /Users/jolierabideau/repos/paranext-core
npm run typecheck
npm run lint
npm test
```

Expected: all three exit 0. `npm test` needs Playwright browsers for platform-bible-react's Storybook project (run `npx playwright install` once). A story failure that passes alone with `--no-file-parallelism` is contention, not a regression (Testing-Guide). No C# changed, so `dotnet test c-sharp-tests/` is not required; run it if the reviewer asks.

- [ ] **Step 3: Revert check for each new test**

For each item below, comment out the one implementation line, confirm the named test fails, then restore the line. Do not commit the reverts.

- Task 1: `|| editor.getSelectedParaMarker()` → "leaves a selected paragraph marker alone" fails.
- Task 2: `onMenuOpenChange(false)` in the item wrapper → both pick cases fail.
- Task 2: the `wasClosedByOutsideInteractionRef.current = true` line → "leaves focus where the user put it" fails.
- Task 2: `&& !isStructureProtected` on `open` → "stays closed when the editor asks while the structure is protected" fails.
- Task 3: the close-when-unavailable effect → "closes when protection turns on…" fails.
- Task 4: the `var(--foreground)` bar layer → "ties the sweep…" fails.

- [ ] **Step 4: Manual QA in the app**

Start with `npm start`. Open an editable project in **Simple** mode (the paragraph-structure view, with markers in the left gutter), on a chapter that has `\p`, `\q1`, `\li2`, and a table if one exists.

Pointer flow:
1. Click the `\li2` glyph in the gutter. Expect the whole row (gutter and text) highlighted with a fill and a leading bar, the glyph bold, and no caret blinking in the text or glyph. The reference in the toolbar does not change.
2. Click the toolbar paragraph dropdown and pick `\q1`. Expect that paragraph, and only it, to become `\q1`. **The menu closes**, focus is back in the editor, the highlight stays on that paragraph, and the reference still has not moved.
3. Open the dropdown again with the mouse and press Escape. Expect the menu to close with focus back in the editor: the next step works without clicking.
4. *(Depends on the Backspace/Delete decision.)* With the marker selected, press Backspace.
   - **Merge (current decision):** the paragraph joins the one before it, exactly as Backspace at the start of its text would. One Undo restores it exactly. With the structure locked (step 8), you get the "Structure is locked" notification and nothing changes.
   - **Refuse (only if the Appendix task has landed):** nothing is deleted, and the hint reads "To change this marker, press Enter or use the paragraph style menu".
5. Click the glyph again, open the dropdown with the mouse, then click into another paragraph's text. Expect the menu to close and the caret to land where you clicked, not back on the marker.

Keyboard flow:
6. Click a marker glyph, then press Enter. Expect the paragraph menu to open with focus in its search box. Type `q2` and press Enter: the paragraph is retagged, the menu closes, and focus is back in the editor with the marker still selected.
7. Press Alt+↓ on a selected marker. Expect the same menu to open. Press Escape.
8. Press → on a selected marker. Expect the highlight to go and the caret to sit at the start of that paragraph's text. Then check that ←/→/↑/↓ with the caret in ordinary text behave exactly as on `main`: the arrows never stop on a marker.

Refusals and states:
9. Lock the structure (Ctrl+Shift+L / ⇧⌘L). Select a marker and press Enter. Expect the notification "Structure is locked. Paragraph and verse markers cannot be changed." and no menu. Unlock: the menu does not open by itself.
10. Switch through all four themes (light, dark, paratext-light, paratext-dark). Expect the bar to be clearly visible in each and the fill to read as a highlight. The active-text focus box, if shown, should still be distinguishable from it.
11. Open an RTL project, or set a project to RTL. Expect the highlight and bar on the right, across the right gutter.
12. With VoiceOver (macOS) on, select a marker. Note what is announced (the row carries `aria-selected="true"`) and record it in the PR description. Spec §4.9 asks for this to be checked, and for an adjustment if the root role makes it ineffective; that adjustment would be editor-side.
13. Other dropdowns: open the character-marker control, pick a marker, and confirm it closes. The paragraph dropdown should now feel the same.

- [ ] **Step 5: Record open questions for the reviewer**

In the PR description:
- Ask the reviewer (spec §8.5) whether "a gutter marker is a `NodeSelection` target, with focus returned to the editor after the menu" warrants an entry in `.context/standards/Architecture-Decisions.md`, or an amendment to `adr-list-selection-on-a-dedicated-visual-channel`. Do not write the entry unless asked.
- List the two items that must be resolved before merge: the invariants owner's sign-off, and Ian's Backspace/Delete answer.
- Link the follow-up ticket for keyboard selection of markers (linked to PT-3997), once it has been filed.

- [ ] **Step 6: Push and open the PR (only when the user asks)**

The PR body ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`. It lists the QA results, the VoiceOver note, the demo-copy decision, "Decisions since the spec", and the discrepancies below.

---

## Spec discrepancies

1. **No refusal hint.** The spec's host refusal overlay (§5) is dropped because deletion merges instead (Decision 4). It is kept in the Appendix, ready to land as one commit if that reverses.
2. **The dropdown closes on pick.** The spec assumed it stays open. Closing matches `CharacterMarkerControl` (Decision 6), and it removes the need to track who opened the menu or whether a pick happened: every close refocuses the editor except an outside interaction.
3. **Escape from a toolbar-opened menu refocuses the editor, not the button.** This deliberately matches the character-marker control. Radix's default would return focus to the button.
4. **No keyboard entry into marker selection** (Decision 2). The spec's arrow stops and ↑/↓ walk are dropped editor-side. This host plan catalogs only Enter / Alt+↓, and leaves the arrow-exclusion comment unchanged.
5. **No invariants-doc entry on either side** (spec §4.8 and its host mirror). The editor PR dropped its §4.8 entry: a Standard-view contract is the wrong home for a paragraph-structure-view rule, and the entry predated the invariants owner's sign-off. The sign-off conversation is simpler now that deletion goes through the existing content-caret Backspace.
6. **`<Editorial>` needs no editor-side change.** It spreads every `EditorProps` field except `children` into `<Editor>`, so `onParaMarkerMenuRequest` arrives as soon as PR 1 adds it.
7. **Contrast test location and data source.** The ADR's precedent (`active-comment-bar-contrast.test.ts`) lives in platform-bible-react and parses `index.css`. This rule lives in the extension, so the test sits beside `_usj-nodes.scss` and reads `src/shared/data/themes.data.json`. `.editor-inner` in `_editor.scss` still declares `background: #fff`, so if a theme's editor surface is not `--background` in practice, manual QA step 10 is what catches it.
8. **Demo copy of `usj-nodes.css` not changed.** Its stories never enable gutter markers.
9. **Read-only projects.** The spec is silent here. With no toolbar paragraph menu in read-only, Enter / Alt+↓ on a selected marker is ignored by the host; a structure-locked project gets the lock notification instead.
10. **Local editor testing path.** The staging script prefers `dev-packages/scripture-editors`, which exists in this checkout. Task 0 switches it to PR 1's branch, and back to `platform-yalc` for intake.

---

## Appendix: contingency task — refusal hint (only if Ian chooses refusal)

**Do not execute unless the Backspace/Delete decision changes to "refuse with a hint".** If it does, the editor re-adds its refusal signal (`psc-para-marker-refused` plus `data-para-marker-refused-intent`, set on the editor root and cleared on the next selection change), and this task lands as **one separate commit** after Task 5. Fold its manual-QA "Refuse" branch (step 4) into Task 6.

The steps and code below are unchanged from the original host plan's Task 4. Two adjustments apply:
- Its sub-steps commit once, at the end.
- Where it says `platform-scripture-editor.web-view.tsx` already carries `onParaMarkerMenuRequest`, that is Task 3 of this plan.

### Contingency: Refusal hint overlay and its strings

**Files:**
- Create: `extensions/src/platform-scripture-editor/src/paragraph-marker-refusal-hint/paragraph-marker-refusal-hint.utils.ts`
- Create: `extensions/src/platform-scripture-editor/src/paragraph-marker-refusal-hint/paragraph-marker-refusal-hint.utils.test.ts`
- Create: `extensions/src/platform-scripture-editor/src/paragraph-marker-refusal-hint/paragraph-marker-refusal-hint-overlay.component.tsx`
- Create: `extensions/src/platform-scripture-editor/src/paragraph-marker-refusal-hint/paragraph-marker-refusal-hint-overlay.component.test.tsx`
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`
- Modify: `extensions/src/platform-scripture-editor/src/localized-strings.test.ts`
- Modify: `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`

**Interfaces:**
- Consumes: the editor's refusal signal and selected-row class (Global Constraints); `AnchorRect`, `computeAnchorRect` from `../two-step-delete-tooltip/two-step-delete-tooltip.utils`; `findScrollContainer` from `../editor-dom.util`.
- Produces: `ParagraphMarkerRefusalHintOverlay({ children })`; `PARAGRAPH_MARKER_REFUSAL_HINT_KEY`, `PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS`, `readParagraphMarkerRefusedIntent(root)`, and the three signal-name constants.

- [ ] **Step 1: Write the failing utils test**

Create `paragraph-marker-refusal-hint.utils.test.ts`:

```ts
// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { readParagraphMarkerRefusedIntent } from './paragraph-marker-refusal-hint.utils';

function makeRoot({ className, intent }: { className?: string; intent?: string }) {
  const root = document.createElement('div');
  if (className) root.className = className;
  if (intent !== undefined) root.setAttribute('data-para-marker-refused-intent', intent);
  return root;
}

describe('readParagraphMarkerRefusedIntent', () => {
  it('reads a refused Backspace', () => {
    const root = makeRoot({ className: 'editor-input psc-para-marker-refused', intent: 'deleteBackward' });
    expect(readParagraphMarkerRefusedIntent(root)).toBe('deleteBackward');
  });

  it('reads a refused Delete', () => {
    const root = makeRoot({ className: 'psc-para-marker-refused', intent: 'deleteForward' });
    expect(readParagraphMarkerRefusedIntent(root)).toBe('deleteForward');
  });

  it('is undefined without the refused class, even if a stale intent attribute remains', () => {
    expect(readParagraphMarkerRefusedIntent(makeRoot({ intent: 'deleteBackward' }))).toBeUndefined();
  });

  it('is undefined for an unrecognized intent', () => {
    const root = makeRoot({ className: 'psc-para-marker-refused', intent: 'cut' });
    expect(readParagraphMarkerRefusedIntent(root)).toBeUndefined();
  });

  it('is undefined for a missing root', () => {
    expect(readParagraphMarkerRefusedIntent(undefined)).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-refusal-hint.utils`
Expected: FAIL — `Failed to resolve import "./paragraph-marker-refusal-hint.utils"`.

- [ ] **Step 3: Implement the utils**

Create `paragraph-marker-refusal-hint.utils.ts`:

```ts
import type { LocalizeKey } from 'platform-bible-utils';

/**
 * Class the scripture editor puts on its root while it is refusing a deletion of a selected
 * paragraph marker. The editor never renders user-facing text; this repo renders the hint.
 */
export const PARAGRAPH_MARKER_REFUSED_CLASS_NAME = 'psc-para-marker-refused';

/** Root attribute naming which key was refused, published alongside the class above. */
export const PARAGRAPH_MARKER_REFUSED_INTENT_ATTRIBUTE = 'data-para-marker-refused-intent';

/** Class on the paragraph whose gutter marker is the editor's selection. */
export const PARAGRAPH_MARKER_SELECTED_CLASS_NAME = 'psc-para-marker-selected';

/** Localize key for the hint shown when a selected paragraph marker refuses a deletion. */
export const PARAGRAPH_MARKER_REFUSAL_HINT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_paragraphMarkerSelection_refusalHint%';

/**
 * Localize keys the refusal hint loads. Also imported by `localized-strings.test.ts`, which asserts
 * en/es parity for each list it imports; kept out of the component module so that test does not
 * pull `platform-bible-react` into its module graph.
 */
export const PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS = Object.freeze([
  PARAGRAPH_MARKER_REFUSAL_HINT_KEY,
]);

/** Which key the editor refused on a selected paragraph marker. */
export type ParagraphMarkerRefusedIntent = 'deleteBackward' | 'deleteForward';

/**
 * Reads the refusal the editor published on `root`, or `undefined` when nothing is being refused.
 * The class is the signal; the intent attribute only counts while the class is present, so a stale
 * attribute left behind cannot show the hint.
 */
export function readParagraphMarkerRefusedIntent(
  root: Element | null | undefined,
): ParagraphMarkerRefusedIntent | undefined {
  if (!root?.classList.contains(PARAGRAPH_MARKER_REFUSED_CLASS_NAME)) return undefined;
  const intent = root.getAttribute(PARAGRAPH_MARKER_REFUSED_INTENT_ATTRIBUTE);
  return intent === 'deleteBackward' || intent === 'deleteForward' ? intent : undefined;
}
```

- [ ] **Step 4: Run the utils test**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-refusal-hint.utils`
Expected: PASS (5 tests).

- [ ] **Step 5: Write the failing string-parity test**

In `localized-strings.test.ts`, add the import beside the other key-list imports:

```ts
import { PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS } from './paragraph-marker-refusal-hint/paragraph-marker-refusal-hint.utils';
```

Append at the end of the file:

```ts
// The hint shown when a selected paragraph marker refuses Backspace or Delete. The editor publishes
// only a DOM signal; this is the only text a user sees for that refusal.
describe.each([...PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS])(
  'paragraph marker refusal hint %s',
  (key) => {
    it('has an English label', () => {
      expect(localizedStrings.en[key]).toBeTruthy();
    });

    it('has a Spanish label', () => {
      expect(localizedStrings.es[key]).toBeTruthy();
    });

    it('Spanish label differs from English', () => {
      expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
    });
  },
);
```

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run localized-strings`
Expected: FAIL — the three new cases (`expected undefined to be truthy`).

- [ ] **Step 6: Add the strings**

In `contributions/localizedStrings.json`, in the `en` block insert between `"%webView_platformScriptureEditor_options%"` and `"%webView_platformScriptureEditor_paragraphSelection_ariaLabel%"`:

```json
      "%webView_platformScriptureEditor_paragraphMarkerSelection_refusalHint%": "To change this marker, press Enter or use the paragraph style menu",
```

In the `es` block, at the same position:

```json
      "%webView_platformScriptureEditor_paragraphMarkerSelection_refusalHint%": "Para cambiar este marcador, presione Intro o use el menú de estilo de párrafo",
```

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run localized-strings`
Expected: PASS.

- [ ] **Step 7: Write the failing overlay test**

Create `paragraph-marker-refusal-hint-overlay.component.test.tsx`:

```tsx
// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ParagraphMarkerRefusalHintOverlay } from './paragraph-marker-refusal-hint-overlay.component';

// jsdom has no ResizeObserver, which Radix's Popper-positioned TooltipContent needs when open.
// Same stub as paragraph-marker-tooltip-overlay.component.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

// The repo-wide '@papi/frontend/react' test alias does not export useLocalizedStrings. Echo each key
// back as its value, which is what the real hook shows before translations load.
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
}));

const HINT_TEXT = '%webView_platformScriptureEditor_paragraphMarkerSelection_refusalHint%';

afterEach(cleanup);

function renderOverlay(rootClassName = 'editor-input', rowClassName = 'usfm_q1') {
  render(
    <ParagraphMarkerRefusalHintOverlay>
      <div data-testid="editor-root" className={rootClassName}>
        <p data-testid="row" className={rowClassName}>
          Blessed is the one
        </p>
      </div>
    </ParagraphMarkerRefusalHintOverlay>,
  );
  return { root: screen.getByTestId('editor-root'), row: screen.getByTestId('row') };
}

/** Does what the editor does on a refused Backspace on a selected marker. */
async function publishRefusal(root: HTMLElement, row: HTMLElement) {
  await act(async () => {
    row.classList.add('psc-para-marker-selected');
    root.setAttribute('data-para-marker-refused-intent', 'deleteBackward');
    root.classList.add('psc-para-marker-refused');
  });
}

describe('ParagraphMarkerRefusalHintOverlay', () => {
  it('shows nothing while nothing is refused', () => {
    renderOverlay();

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the hint, and announces it, when the editor refuses a deletion', async () => {
    const { root, row } = renderOverlay();

    await publishRefusal(root, row);

    expect(screen.getByRole('status')).toHaveTextContent(HINT_TEXT);
    expect(screen.getByRole('tooltip')).toHaveTextContent(HINT_TEXT);
  });

  it('hides when the editor clears the signal on the next selection change', async () => {
    const { root, row } = renderOverlay();
    await publishRefusal(root, row);

    await act(async () => {
      root.classList.remove('psc-para-marker-refused');
      root.removeAttribute('data-para-marker-refused-intent');
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows a signal published before mount', () => {
    // The editor may publish a refusal before this overlay's effect runs; the mount-time sync must
    // pick it up without waiting for a mutation.
    render(
      <ParagraphMarkerRefusalHintOverlay>
        <div
          className="editor-input psc-para-marker-refused"
          data-para-marker-refused-intent="deleteBackward"
        >
          <p className="usfm_q1 psc-para-marker-selected">Blessed is the one</p>
        </div>
      </ParagraphMarkerRefusalHintOverlay>,
    );

    expect(screen.getByRole('status')).toHaveTextContent(HINT_TEXT);
  });

  it('stays hidden when the refusal names no selected row to anchor to', async () => {
    const { root } = renderOverlay();

    await act(async () => {
      root.setAttribute('data-para-marker-refused-intent', 'deleteBackward');
      root.classList.add('psc-para-marker-refused');
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 8: Run to verify it fails**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-refusal-hint-overlay`
Expected: FAIL — `Failed to resolve import "./paragraph-marker-refusal-hint-overlay.component"`.

- [ ] **Step 9: Implement the overlay**

Create `paragraph-marker-refusal-hint-overlay.component.tsx`:

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { LocalizeKey } from 'platform-bible-utils';
import { findScrollContainer } from '../editor-dom.util';
import {
  AnchorRect,
  computeAnchorRect,
} from '../two-step-delete-tooltip/two-step-delete-tooltip.utils';
import {
  PARAGRAPH_MARKER_REFUSAL_HINT_KEY,
  PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS,
  PARAGRAPH_MARKER_REFUSED_CLASS_NAME,
  PARAGRAPH_MARKER_REFUSED_INTENT_ATTRIBUTE,
  PARAGRAPH_MARKER_SELECTED_CLASS_NAME,
  readParagraphMarkerRefusedIntent,
} from './paragraph-marker-refusal-hint.utils';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [...PARAGRAPH_MARKER_REFUSAL_HINT_STRING_KEYS];

const EMPTY_ANCHOR_RECT: AnchorRect = { top: 0, left: 0, width: 0, height: 0 };

type Props = { children: React.ReactNode };

/**
 * Shows why Backspace or Delete did nothing on a selected paragraph marker, and how to change the
 * marker instead. The editor refuses those keys on a marker selection (deleting a marker would merge
 * paragraphs, which a marker selection does not admit) and publishes the refusal on its root as the
 * `psc-para-marker-refused` class plus `data-para-marker-refused-intent`, clearing both on the next
 * selection change. This overlay observes that signal and anchors a localized hint to the selected
 * row (`psc-para-marker-selected`); it lives here, not in the editor, so the copy is localized.
 * Mirrors {@link ../two-step-delete-tooltip/two-step-delete-tooltip-overlay.component}.
 */
export function ParagraphMarkerRefusalHintOverlay({ children }: Props) {
  const [anchorRect, setAnchorRect] = useState<AnchorRect | undefined>(undefined);

  // positionAnchorRef: the position:relative element; coordinate origin for getBoundingClientRect.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // Keeps the trigger where the hint last was while it fades out, so the exit animation does not
  // jump to the top of the editor.
  const lastAnchorRectRef = useRef<AnchorRect>(EMPTY_ANCHOR_RECT);
  const rafIdRef = useRef<number>(0);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const message = localizedStrings[PARAGRAPH_MARKER_REFUSAL_HINT_KEY];

  // Cross-view sync (see .claude/rules/cross-view-sync-hidden-views.md):
  // - Live: the MutationObserver and scroll listener below follow the editor's refusal signal and
  //   the selected row in real time while this tab is visible.
  // - Hidden: intentionally not handled, because a refusal cannot happen while hidden — the editor
  //   publishes it only in response to a Backspace/Delete keypress while it holds keyboard focus,
  //   and rc-dock hides an inactive tab's pane with display:none, which force-blurs it. The editor
  //   clears the signal on the next selection change, so there is nothing to catch up on.
  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return undefined;

    // Style-only matching (requireOverflow: false): this runs once on mount, possibly before content
    // overflows. Falls back to positionAnchor if no scrolling ancestor is found. Mirrors
    // TwoStepDeleteTooltipOverlay.
    const scrollContainer =
      findScrollContainer(positionAnchor, { requireOverflow: false }) ?? positionAnchor;

    const sync = () => {
      const root = positionAnchor.querySelector(`.${PARAGRAPH_MARKER_REFUSED_CLASS_NAME}`);
      const row = positionAnchor.querySelector<HTMLElement>(
        `.${PARAGRAPH_MARKER_SELECTED_CLASS_NAME}`,
      );
      if (!readParagraphMarkerRefusedIntent(root) || !row) {
        setAnchorRect(undefined);
        return;
      }
      const rect = computeAnchorRect(row, positionAnchor);
      lastAnchorRectRef.current = rect;
      setAnchorRect(rect);
    };

    const observer = new MutationObserver(sync);
    observer.observe(positionAnchor, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [PARAGRAPH_MARKER_REFUSED_INTENT_ATTRIBUTE, 'class'],
    });

    const handleScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(sync);
    };
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    sync();

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []); // refs are stable; empty deps is correct

  const displayRect = anchorRect ?? lastAnchorRectRef.current;

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      <TooltipProvider>
        {/* The trigger below is aria-hidden and never focused, so the tooltip itself is invisible
            to assistive technology; this live region carries the same text while the hint shows. */}
        <span role="status" className="tw:sr-only">
          {anchorRect ? message : ''}
        </span>
        {/* onOpenChange no-op satisfies Radix's controlled-component contract */}
        <Tooltip open={!!anchorRect} onOpenChange={() => {}}>
          <TooltipTrigger
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              'tw:absolute tw:opacity-0 tw:pointer-events-none',
              'tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0',
            )}
            style={{
              top: displayRect.top,
              left: displayRect.left,
              width: displayRect.width,
              height: displayRect.height,
            }}
          />
          <TooltipContent side="bottom" align="start" className="tw:pointer-events-none">
            {message}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
```

- [ ] **Step 10: Run the overlay tests**

Run: `npm run test --workspace=extensions/src/platform-scripture-editor -- --run paragraph-marker-refusal-hint`
Expected: PASS (utils 5, overlay 5).

- [ ] **Step 11: Mount it in the web view**

In `platform-scripture-editor.web-view.tsx`, add the import beside `TwoStepDeleteTooltipOverlay`'s:

```tsx
import { ParagraphMarkerRefusalHintOverlay } from './paragraph-marker-refusal-hint/paragraph-marker-refusal-hint-overlay.component';
```

Change `editorTree` so the new overlay wraps `EditorKeyboardShortcuts` inside `TwoStepDeleteTooltipOverlay`:

```tsx
    const editorTree = (
      <TwoStepDeleteTooltipOverlay>
        <ParagraphMarkerRefusalHintOverlay>
          <EditorKeyboardShortcuts editorRef={editorRef}>
            <Editorial
              ref={editorRef}
              scrRef={scrRef}
              onScrRefChange={setScrRefNoScroll}
              options={options}
              logger={logger}
              onUsjChange={isReadOnlyEffective ? undefined : handleEditorialUsjChange}
              onSelectionChange={handleSelectionChange}
              onParaMarkerMenuRequest={handleParagraphMarkerMenuRequest}
              onStateChange={(state) => {
                setCanUndo(state.canUndo);
                setCanRedo(state.canRedo);
                setBlockMarker(state.blockMarker);
                setContextMarker(state.contextMarker);
              }}
            />
          </EditorKeyboardShortcuts>
        </ParagraphMarkerRefusalHintOverlay>
      </TwoStepDeleteTooltipOverlay>
    );
```

Only the `ParagraphMarkerRefusalHintOverlay` wrapper is new here; the `<Editorial>` props are exactly what Task 3 left. If upstream has changed those props since this plan was written, keep upstream's and only add the wrapper.

- [ ] **Step 12: Typecheck and commit**

Run: `npm run typecheck --workspace=extensions/src/platform-scripture-editor`
Expected: exit 0.

```bash
git add extensions/src/platform-scripture-editor/src/paragraph-marker-refusal-hint extensions/src/platform-scripture-editor/contributions/localizedStrings.json extensions/src/platform-scripture-editor/src/localized-strings.test.ts extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx
git commit -m "PT-4540: Explain a refused deletion on a selected paragraph marker

The editor refuses Backspace and Delete on a marker selection and publishes a
DOM signal; the host now renders a localized hint (en, es) pointing at Enter
and the paragraph style menu.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```
