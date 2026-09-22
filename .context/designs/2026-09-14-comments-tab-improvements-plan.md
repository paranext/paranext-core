# Comments Tab Improvements Implementation Plan

> **Frozen record** — written 2026-09-14 against `014cdcd51d4`. Every file:line citation and
> quoted snippet below reflects the tree at that commit. If the code has since moved, follow the
> current files and the named symbols, not these line numbers.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the comments tab fit more on screen, make the active comment obviously active in every theme, add date and author filters, and stop the comment editor's styling buttons painting over the filter toolbar.

**Architecture:** Five independent changes across two packages. `platform-bible-react` owns the comment card (density, active-comment styling, the editor's `actions` slot, and the editor toolbar's positioning). `legacy-comment-manager` owns the filter model and the panel's filter UI. Selection moves onto a dedicated visual channel (a leading bar) so the background channel keeps carrying read/resolved status; the filter toolbar collapses behind one trigger with active-filter chips so adding two axes leaves it smaller than it is today.

**Tech Stack:** React 19, TypeScript, Tailwind 4 (`tw:` prefix), shadcn/ui, Vitest + Testing Library, `chroma-js` (contrast assertions only).

**Design:** [`2026-09-14-comments-tab-improvements-design.md`](./2026-09-14-comments-tab-improvements-design.md)

---

## Conventions for every task

**Running a `platform-bible-react` test:**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/path/to/file.test.tsx
```

**Running a `legacy-comment-manager` test:**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/path/to/file.test.ts
```

The extension has no vitest config; component tests declare their environment with a
`// @vitest-environment jsdom` pragma on the first line. `platform-bible-react`'s `unit` project is
already jsdom, so its tests need no pragma.

**Before any commit:** the pre-commit hook runs `gitleaks` and `lint-staged` (prettier/stylelint).
Run `npm run lint` from the repo root before the final commit of the series — see Task 8.

**Any edit under `lib/platform-bible-react/src/components/shadcn-ui/` needs a `// CUSTOM:` comment
immediately above the changed code** saying what changed, what it does, and why
(`.claude/rules/code-quality/shadcn-discipline.md`). Task 3 is the only task that touches that
directory.

---

## File Structure

**`lib/platform-bible-react/`**

| File | Responsibility | Tasks |
| --- | --- | --- |
| `src/components/advanced/editor/plugins.tsx` | Editor toolbar positioning | 1 |
| `src/components/advanced/editor/editor.tsx` | New optional `actions` slot | 3 |
| `src/components/advanced/comment-list/comment-thread.component.tsx` | Card surface, active bar, density, compose actions | 2, 4, 3 |
| `src/components/advanced/comment-list/comment-item.component.tsx` | Item density, edit-mode actions | 4, 3 |
| `src/components/advanced/comment-list/comment-list.component.tsx` | Inter-thread divider | 2 |
| `src/components/advanced/comment-list/theme-contrast.test.ts` | **New** — contrast assertions | 2 |
| `src/components/advanced/editor/editor.test.tsx` | **New** — sticky + actions-slot assertions | 1, 3 |

**`extensions/src/legacy-comment-manager/`**

| File | Responsibility | Tasks |
| --- | --- | --- |
| `src/comment-list-filters.model.ts` | Two new axes + selector mapping | 5, 6 |
| `src/comment-list.component.tsx` | Filters popover, chips, author control | 7 |
| `contributions/localizedStrings.json` | New user-facing strings | 5, 6, 7 |
| `src/localized-strings.test.ts` | Guards the new keys exist | 7 |

---

## Task 1: Stop the editor toolbar painting over the filter toolbar (NN-1.4)

The defect is a paint-order collision: the editor's format toolbar and the panel's filter toolbar are
both `position: sticky; z-index: 10` and do not share a scroll container, so the later-in-DOM editor
toolbar wins. The editor box never scrolls internally (`scrollHeight === clientHeight`), so its
`sticky` can never engage — it is shadcn-editor boilerplate for a tall standalone editor.

The durable regression guard is asserting the toolbar is not sticky. A "styling toolbar is below the
filter toolbar in DOM order" test would be near-tautological — the panel renders its header before
the list, so DOM order was never wrong; paint order was.

**Files:**
- Create: `lib/platform-bible-react/src/components/advanced/editor/editor.test.tsx`
- Modify: `lib/platform-bible-react/src/components/advanced/editor/plugins.tsx:59`

- [ ] **Step 1: Write the failing test**

Create `lib/platform-bible-react/src/components/advanced/editor/editor.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { Editor } from './editor';

/**
 * The editor's format toolbar must not be sticky. It shares no scroll container with the comment
 * panel's filter toolbar, so an equal z-index plus a later DOM position made it paint over that
 * toolbar. The editor box never scrolls internally, so sticky buys nothing here either.
 */
test('the format toolbar is not sticky, so it cannot paint over panel chrome', () => {
  const { container } = render(<Editor />);

  const toolbar = container.querySelector('[data-testid="editor-format-toolbar"]');
  expect(toolbar).not.toBeNull();
  expect(toolbar?.className).not.toMatch(/\bsticky\b/);
  expect(toolbar?.className).not.toMatch(/\bz-\d/);
});
```

- [ ] **Step 2: Run the test and watch it fail**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/editor/editor.test.tsx
```

Expected: FAIL — `expected null not to be null`, because the toolbar has no `data-testid` yet.

- [ ] **Step 3: Make the change**

In `lib/platform-bible-react/src/components/advanced/editor/plugins.tsx`, replace the toolbar
wrapper (currently line 59):

```tsx
          <div className="tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1">
```

with:

```tsx
          // Deliberately not sticky. This toolbar shares no scroll container with the comment
          // panel's filter toolbar, so a z-index here competes with that toolbar for paint order
          // and wins on DOM position. The editor box never scrolls internally, so there is nothing
          // for the toolbar to stick to in any current consumer.
          <div
            data-testid="editor-format-toolbar"
            className="tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1"
          >
```

- [ ] **Step 4: Run the test and watch it pass**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/editor/editor.test.tsx
```

Expected: PASS (1 test).

- [ ] **Step 5: Check nothing else regressed**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list
```

Expected: PASS — all existing comment-list tests still green.

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/editor/plugins.tsx \
        lib/platform-bible-react/src/components/advanced/editor/editor.test.tsx
git commit -m "fix(comments): stop the editor toolbar painting over the filter toolbar

Both toolbars were position:sticky with z-index 10 and do not share a
scroll container, so the later-in-DOM editor toolbar won the paint. The
editor box never scrolls internally, so the sticky could never engage --
it was shadcn-editor boilerplate for a tall standalone editor.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Active comment gets a leading bar on its own channel (NN-1.2)

The background channel already carries unread (`bg-accent`), resolved (`bg-muted`) and read
(`bg-primary-foreground`). Selection is moved off it onto a leading bar so status keeps the
background, and every card moves to the semantically correct `bg-card`.

The bar uses `foreground`, **not** `primary`. `primary` measures 2.38:1 against the card in
paratext-dark and `ring` measures 2.32:1 in paratext-light — each fails the 3:1 non-text threshold,
in opposite themes. `foreground` clears 3:1 on both the `card` and `muted` surfaces in all four
themes with a 13.79 worst case.

Because every card becomes `bg-card` and `--card` equals `--background` in three of the four themes,
the 12px `space-y-3` gap between threads stops reading as separation. It is replaced with a 1px
divider, which is also the first density win.

**Files:**
- Create: `lib/platform-bible-react/src/components/advanced/comment-list/theme-contrast.test.ts`
- Modify: `lib/platform-bible-react/package.json` (add `chroma-js` devDependency)
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx:473-481`
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-list.component.tsx:137-143,176-182`

- [ ] **Step 1: Add the contrast library to the package that tests with it**

`chroma-js@^3.2.0` is already a root dependency, but `platform-bible-react` must declare what it
imports.

```bash
cd lib/platform-bible-react && npm install --save-dev chroma-js@^3.2.0 @types/chroma-js
```

Then revert the sibling `scripture-editors` lockfile if npm dirtied it (this repo's standing quirk):

```bash
cd ../../../scripture-editors 2>/dev/null && git checkout -- pnpm-lock.yaml 2>/dev/null; cd -
```

- [ ] **Step 2: Write the failing test**

Create `lib/platform-bible-react/src/components/advanced/comment-list/theme-contrast.test.ts`:

```ts
import { readFileSync } from 'fs';
import path from 'path';
import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

// WCAG 2.2 non-text contrast minimum (SC 1.4.11). The active-comment bar is a UI indicator, not
// text, so 3:1 is the bar it has to clear.
const MIN_NON_TEXT_CONTRAST = 3;

// Every theme block in index.css, by the selector that scopes it.
const THEME_SELECTORS = ['.light,\n:root', '.dark', '.paratext-light', '.paratext-dark'] as const;

const cssPath = path.resolve(__dirname, '../../../index.css');
const css = readFileSync(cssPath, 'utf-8');

/** Pulls one theme block's body out of index.css by its selector. */
function readThemeBlock(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Theme block not found in index.css: ${selector}`);
  const end = css.indexOf('}', start);
  return css.slice(start, end);
}

/**
 * Reads one `--token: oklch(L C H)` declaration from a theme block. Parses the three components
 * rather than handing the CSS string to chroma, so this does not depend on chroma's CSS-level
 * oklch support.
 */
function readOklchToken(block: string, token: string): chroma.Color {
  const match = new RegExp(`--${token}:\\s*oklch\\(([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)\\)`).exec(
    block,
  );
  if (!match) throw new Error(`Token --${token} not found as a 3-component oklch() value`);
  return chroma.oklch(Number(match[1]), Number(match[2]), Number(match[3]));
}

describe('active-comment bar contrast', () => {
  // The bar sits on `card` normally and on `muted` when the active thread is also resolved. One
  // theme passing proves nothing about the others: --primary fails this in paratext-dark and
  // --ring fails it in paratext-light, in opposite directions.
  THEME_SELECTORS.forEach((selector) => {
    const block = readThemeBlock(selector);
    const bar = readOklchToken(block, 'foreground');

    (['card', 'muted'] as const).forEach((surface) => {
      it(`clears ${MIN_NON_TEXT_CONTRAST}:1 against --${surface} in ${selector.split('\n').pop()}`, () => {
        const contrast = chroma.contrast(bar, readOklchToken(block, surface));
        expect(contrast).toBeGreaterThanOrEqual(MIN_NON_TEXT_CONTRAST);
      });
    });
  });

  it('rejects --primary as the bar token, which is why --foreground is used', () => {
    // Guards the reasoning, not just the outcome: if a future theme edit makes --primary viable
    // everywhere, this test fails and the choice can be revisited deliberately.
    const paratextDark = readThemeBlock('.paratext-dark');
    const contrast = chroma.contrast(
      readOklchToken(paratextDark, 'primary'),
      readOklchToken(paratextDark, 'card'),
    );
    expect(contrast).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });
});
```

- [ ] **Step 3: Run the test and watch it pass**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list/theme-contrast.test.ts
```

Expected: PASS (9 tests). This test characterises the tokens and passes before the component
changes — it exists to stop a future theme edit silently breaking the choice, and to prove the
`primary`/`ring` rejection was measured rather than assumed.

- [ ] **Step 4: Write the failing component test**

Append to `lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.test.tsx`:

```tsx
test('the selected thread carries the leading bar and every card uses the card surface', () => {
  const { rerender } = renderThread({ isSelected: false });

  const unselected = screen.getByRole('option');
  expect(unselected.className).toMatch(/\bbg-card\b/);
  // Selection must not ride the background channel, which carries read/resolved status.
  expect(unselected.className).not.toMatch(/\bbg-primary-foreground\b/);
  // The bar's width is reserved while unselected so selecting does not shift content sideways.
  expect(unselected.className).toMatch(/\bborder-s-4\b/);
  expect(unselected.className).toMatch(/\bborder-transparent\b/);

  rerender(threadElement({ isSelected: true }));

  const selected = screen.getByRole('option');
  expect(selected.className).toMatch(/\bborder-foreground\b/);
  expect(selected.className).not.toMatch(/\bborder-transparent\b/);
});
```

This assumes the existing test file's render helper. If it has none, add these two helpers above the
test, adapting the props object to match the file's existing `CommentThread` usage:

```tsx
function threadElement(overrides: Partial<React.ComponentProps<typeof CommentThread>>) {
  return <CommentThread {...baseThreadProps} {...overrides} />;
}

function renderThread(overrides: Partial<React.ComponentProps<typeof CommentThread>>) {
  return render(threadElement(overrides));
}
```

- [ ] **Step 5: Run it and watch it fail**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list/comment-thread.component.test.tsx
```

Expected: FAIL — the card currently resolves to `tw:bg-primary-foreground` and has no border classes.

- [ ] **Step 6: Change the card's surface and selection styling**

In `comment-thread.component.tsx`, replace the `Card` `className` block (lines 473-481):

```tsx
      className={cn(
        'tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
        { 'tw:cursor-pointer tw:hover:shadow-md': !isSelected },
        {
          'tw:bg-primary-foreground': !isSelected && threadStatus !== 'Resolved' && isRead,
          'tw:bg-background': isSelected && threadStatus !== 'Resolved' && isRead,
          'tw:bg-muted': threadStatus === 'Resolved',
          'tw:bg-accent': !isRead && !isSelected && threadStatus !== 'Resolved',
        },
      )}
```

with:

```tsx
      className={cn(
        // `border-s-4` is always present so the bar's width is reserved on every card and
        // selecting one does not shift its content sideways. Logical property, so it follows RTL.
        'tw:group tw:w-full tw:rounded-none tw:border-s-4 tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
        { 'tw:cursor-pointer tw:hover:shadow-md': !isSelected },
        // Selection rides the leading bar and elevation, never the background. The background
        // channel already carries three meanings (unread, resolved, read) and cannot express a
        // fourth. The bar is `foreground` rather than `primary` because `primary` measures 2.38:1
        // against the card in paratext-dark, below the 3:1 non-text minimum — see
        // theme-contrast.test.ts.
        {
          'tw:border-foreground tw:shadow-md': isSelected,
          'tw:border-transparent': !isSelected,
        },
        // Status keeps the background channel. `bg-card` is the surface token; the previous
        // `bg-primary-foreground` was a text-on-primary token and rendered near-white in
        // paratext-dark.
        {
          'tw:bg-card': threadStatus !== 'Resolved' && isRead,
          'tw:bg-muted': threadStatus === 'Resolved',
          'tw:bg-accent': !isRead && threadStatus !== 'Resolved',
        },
      )}
```

Note `isSelected` no longer gates the status classes, which is what fixes selected-and-resolved and
selected-and-unread showing no selection at all.

- [ ] **Step 7: Replace the inter-thread gap with a divider**

In `comment-list.component.tsx`, change the listbox container className (line 139) from
`tw:flex tw:w-full tw:flex-col tw:space-y-3 …` to:

```tsx
        'tw:flex tw:w-full tw:flex-col tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
```

and change the per-thread wrapper (lines 176-182) from:

```tsx
          <div
            key={thread.id}
            className={cn({
              'tw:opacity-60': thread.status === 'Resolved',
            })}
          >
```

to:

```tsx
          <div
            key={thread.id}
            // A 1px divider rather than a gap: every card is now `bg-card`, and `--card` equals
            // `--background` in every theme except paratext-dark, so a gap would be invisible.
            // `last:border-b-0` keeps the list from ending on a dangling rule.
            className={cn('tw:border-b tw:border-border tw:last:border-b-0', {
              'tw:opacity-60': thread.status === 'Resolved',
            })}
          >
```

- [ ] **Step 8: Run the comment-list suite**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list
```

Expected: PASS. If an existing test asserted `bg-primary-foreground` or `space-y-3`, update that
assertion to the new class — it was asserting the defect.

- [ ] **Step 9: Commit**

```bash
git add lib/platform-bible-react/package.json lib/platform-bible-react/package-lock.json \
        package-lock.json \
        lib/platform-bible-react/src/components/advanced/comment-list/
git commit -m "feat(comments): make the active comment obvious in every theme

Selection moves off the background channel, which already carried unread,
resolved and read, onto a leading 4px bar plus elevation. Cards move from
bg-primary-foreground -- a text-on-primary token that rendered near-white
in paratext-dark -- to the bg-card surface token.

The bar uses foreground, not primary: primary measures 2.38:1 against the
card in paratext-dark and ring measures 2.32:1 in paratext-light, each
below the 3:1 non-text minimum and each in a different theme. foreground
clears it on both card and muted surfaces in all four themes.

Selection is no longer gated on status, so selected-and-resolved and
selected-and-unread now show selection at all.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Add an `actions` slot to the editor and move the compose buttons inside (NN-1.1)

`Editor` is not exported from `platform-bible-react`'s `index.ts`; its only consumers are
`comment-thread`, `comment-item` and `comment-editor`. This is an internal prop, not a public API
change. `CommentEditor` renders its buttons above the box and is untouched.

The slot renders after the content area but inside the bordered box, so tab order is unchanged.

**Files:**
- Modify: `lib/platform-bible-react/src/components/advanced/editor/editor.tsx:36-56,62-77`
- Modify: `lib/platform-bible-react/src/components/advanced/editor/plugins.tsx`
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx:670-767`
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx:236-262`
- Modify: `lib/platform-bible-react/src/components/advanced/editor/editor.test.tsx`

- [ ] **Step 1: Write the failing test**

Append to `lib/platform-bible-react/src/components/advanced/editor/editor.test.tsx`:

```tsx
test('renders the actions slot inside the bordered box, after the content area', () => {
  const { container } = render(
    <Editor actions={<button type="button">Send</button>} />,
  );

  const box = container.firstElementChild;
  const actions = container.querySelector('[data-slot="editor-actions"]');
  expect(actions).not.toBeNull();
  // Inside the bordered box, so it reads as part of the editor rather than a detached row.
  expect(box?.contains(actions ?? null)).toBe(true);
  // After the content area, so tab order runs text -> actions with no tabIndex juggling.
  const contentEditable = container.querySelector('[contenteditable]');
  expect(
    contentEditable?.compareDocumentPosition(actions!) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

test('renders no actions container when no actions are passed', () => {
  const { container } = render(<Editor />);
  expect(container.querySelector('[data-slot="editor-actions"]')).toBeNull();
});

test('actions stay keyboard reachable once inside the box', async () => {
  // Moving controls inside a contenteditable's container is the kind of change that quietly
  // strands them behind a tabIndex={-1} wrapper, so assert reachability directly rather than
  // inferring it from DOM order.
  render(
    <Editor
      actions={
        <>
          <button type="button">Assign</button>
          <button type="button">Submit</button>
        </>
      }
    />,
  );

  const assign = screen.getByRole('button', { name: 'Assign' });
  const submit = screen.getByRole('button', { name: 'Submit' });

  expect(assign).not.toHaveAttribute('tabindex', '-1');
  expect(submit).not.toHaveAttribute('tabindex', '-1');

  await userEvent.tab();
  // Walk forward until focus lands on the actions; the contenteditable and any toolbar buttons
  // come first, and how many of those there are is not this test's business.
  for (let i = 0; i < 10 && document.activeElement !== assign; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await userEvent.tab();
  }
  expect(document.activeElement).toBe(assign);

  await userEvent.tab();
  expect(document.activeElement).toBe(submit);
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/editor/editor.test.tsx
```

Expected: FAIL — `Editor` has no `actions` prop, so nothing with that `data-slot` renders.

- [ ] **Step 3: Thread the prop through `Editor`**

In `editor.tsx`, add to the props type (after `className?: string;`):

```tsx
  /**
   * Optional controls rendered inside the editor's bordered box, below the content area — e.g. a
   * comment's assign and submit buttons. Placed after the content in DOM order so tab order runs
   * from the text to the actions.
   */
  actions?: React.ReactNode;
```

Add `actions` to the destructured parameters, and pass it into `Plugins`:

```tsx
          <Plugins placeholder={placeholder} autoFocus={autoFocus} onClear={onClear} actions={actions} />
```

`editor.tsx` imports no React namespace today; add `import { ReactNode } from 'react';` and use
`ReactNode` rather than `React.ReactNode`.

- [ ] **Step 4: Render the slot in `Plugins`**

In `plugins.tsx`, add `actions` to the `Plugins` props type as `actions?: ReactNode` (importing
`ReactNode` from `react` alongside the existing imports), and render it immediately after the
closing tag of the `<div className="tw:relative">` that wraps `RichTextPlugin`, replacing the
`{/* actions plugins */}` comment:

```tsx
      {actions && (
        <div
          data-slot="editor-actions"
          className="tw:flex tw:flex-row tw:items-center tw:gap-2 tw:border-t tw:px-2 tw:py-1.5"
        >
          {actions}
        </div>
      )}
```

- [ ] **Step 5: Run the editor tests and watch them pass**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/editor/editor.test.tsx
```

Expected: PASS (3 tests).

- [ ] **Step 6: Move the compose buttons into the slot**

In `comment-thread.component.tsx`, the compose block currently renders `<Editor …/>` followed by a
sibling `<div className="tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2">` holding the
"Assigning to" span, the assign `Popover`, and the submit `Button`. Move that entire `div`'s
**children** into the `Editor`'s new `actions` prop and delete the sibling `div`:

```tsx
                    <Editor
                      editorSerializedState={pendingCommentEditorState}
                      onSerializedChange={(value) => setPendingCommentEditorState(value)}
                      placeholder={
                        threadStatus === 'Resolved'
                          ? localizedStrings['%comment_reopenResolved%']
                          : localizedStrings['%comment_replyOrAssign%']
                      }
                      autoFocus
                      onClear={(clearFn) => {
                        clearEditorRef.current = clearFn;
                      }}
                      actions={
                        <>
                          {pendingCommentAssignedUser !== undefined &&
                            (hasEditorContent(pendingCommentEditorState) ||
                              pendingCommentAssignedUser !== lastSubmittedAssignedUser) && (
                              <span className="tw:flex-1 tw:text-sm tw:text-muted-foreground">
                                {/* unchanged: the existing formatReplacementString call */}
                              </span>
                            )}
                          {/* unchanged: the existing assign Popover */}
                          {/* unchanged: the existing submit Button */}
                        </>
                      }
                    />
```

Keep every callback, `disabled` expression and `aria-label` exactly as it is. Change only the two
`<Button size="icon" …>` instances in this block to `size="icon-sm"`. Where the assign span was not
rendered, add `<div className="tw:flex-1" />` before the buttons so they stay end-aligned.

- [ ] **Step 7: Move the edit-mode buttons into the slot**

In `comment-item.component.tsx`, apply the same move to the edit-mode `✕`/`↑` row: pass its two
`Button`s as the `Editor`'s `actions` (preceded by `<div className="tw:flex-1" />` to keep them
end-aligned), delete the sibling `div`, and change both to `size="icon-sm"`.

- [ ] **Step 8: Run the comment-list suite**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list
```

Expected: PASS. These suites mock `Editor`
(`vi.mock('@/components/advanced/editor/editor', …)`), so any test that asserted on the assign or
submit buttons will now find them unrendered. Update those mocks to render their `actions` prop:

```tsx
vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(({ actions }: { actions?: React.ReactNode }) => (
    <div data-testid="mock-editor">{actions}</div>
  )),
}));
```

- [ ] **Step 9: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/editor/ \
        lib/platform-bible-react/src/components/advanced/comment-list/
git commit -m "feat(comments): move the assign and submit buttons inside the editor box

Adds an optional actions slot to the internal Editor, rendered inside the
bordered box after the content area so tab order is unchanged. Applied to
the compose row and to CommentItem's edit-mode row so both read the same.

Editor is not exported from platform-bible-react, so this is an internal
prop rather than a public API change.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Reduce comment density (NN-1.1)

Whitespace only — no element resizes and no truncation changes, so "reduce whitespace without
significantly moving the locations of content within a comment" holds by construction. The test
asserts both halves: that spacing shrank **and** that content order and nesting are unchanged. The
second assertion is the requirement's actual constraint; the first alone would pass a layout rewrite.

`tw:space-y-3` on `CommentItem`'s root is a latent bug being removed, not a tradeoff: `space-y-*`
emits `margin-top` on siblings and it sits on a `flex-row` that also has `items-baseline`, so it
costs 12px of dead space *and* knocks the text column out of baseline alignment with the avatar.

**Files:**
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx:473,488`
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx:192,199`
- Modify: `lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.test.tsx`

- [ ] **Step 1: Write the failing test**

Append to `comment-item.component.test.tsx`:

```tsx
test('the item root has no space-y, which would add dead margin on a flex row', () => {
  const { container } = render(
    <CommentItem comment={baseComment} localizedStrings={localizedStrings} />,
  );

  // `space-y-*` emits margin-top on siblings. On this flex-row with items-baseline it added 12px
  // of dead space and broke the avatar/text baseline alignment.
  expect(container.firstElementChild?.className).not.toMatch(/\bspace-y-/);
});

test('content order and nesting inside a comment are unchanged by the density pass', () => {
  const { container } = render(
    <CommentItem comment={baseComment} localizedStrings={localizedStrings} />,
  );

  const root = container.firstElementChild!;
  // Avatar first, then the text column — the density change must not reorder or re-nest anything.
  const [avatar, column] = Array.from(root.children);
  expect(avatar.querySelector('[data-slot="avatar-fallback"], .tw\\:text-xs')).not.toBeNull();
  expect(column.textContent).toContain('Alice Ann');
  expect(column.textContent).toContain('ORDINARY BODY');
});
```

- [ ] **Step 2: Run it and watch the first test fail**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list/comment-item.component.test.tsx
```

Expected: the `space-y` test FAILs; the ordering test PASSes (it is the guard that the next step must
not break).

- [ ] **Step 3: Apply the spacing changes**

Four edits, each a class swap only:

1. `comment-thread.component.tsx:473` — in the `Card` className, `tw:p-4` → `tw:p-3`.
2. `comment-thread.component.tsx:488` — `tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4` → `…tw:gap-2`.
3. `comment-item.component.tsx:192` — `tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3` → `tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2`.
4. `comment-item.component.tsx:199` — `tw:flex tw:flex-1 tw:flex-col tw:gap-2` → `tw:flex tw:flex-1 tw:flex-col tw:gap-1`.

- [ ] **Step 4: Run the suite and watch both tests pass**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit src/components/advanced/comment-list
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/comment-list/
git commit -m "feat(comments): reduce comment density without relocating content

Card padding p-4 to p-3, the header/verse/comment stack gap-4 to gap-2,
the avatar gap-3 to gap-2 and the name/body gap-2 to gap-1. Roughly 25%
more threads per screen with no element resized and no clamp changed.

Also removes space-y-3 from CommentItem's root. space-y-* emits margin-top
on siblings and it sat on a flex-row with items-baseline, costing 12px of
dead space and breaking the avatar/text baseline alignment.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Add the date-preset filter axis to the model (NN-1.3)

`dateFilter` is already in `LegacyCommentThreadSelector` (`legacy-comment-manager.d.ts:141`) and
`CommentThreadSelector.cs:21`. This adds the closed preset union that drives it.

The preset resolves to a concrete timestamp **inside `buildCommentThreadSelector`**, never at
selection time — otherwise "today" goes stale when the app is left open overnight. Presets map to
`after`, not `exact`: `exact` compares the calendar date in UTC, which is wrong for a user several
hours off UTC.

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list-filters.model.ts`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list-filters.model.test.ts`
- Modify: `extensions/src/legacy-comment-manager/contributions/localizedStrings.json`

- [ ] **Step 1: Write the failing tests**

Append to `comment-list-filters.model.test.ts`:

```ts
describe('date filter', () => {
  it('contributes nothing when the axis is at its "all" default', () => {
    expect(build({ date: 'all' })).toEqual({});
  });

  it('maps each preset to an inclusive "after" bound', () => {
    const now = new Date('2026-09-14T15:30:00.000Z');
    expect(build({ date: 'today' }, UNFILTERED, now).dateFilter).toEqual({
      after: '2026-09-14T00:00:00.000Z',
    });
    expect(build({ date: 'last-7-days' }, UNFILTERED, now).dateFilter).toEqual({
      after: '2026-09-07T00:00:00.000Z',
    });
    expect(build({ date: 'last-30-days' }, UNFILTERED, now).dateFilter).toEqual({
      after: '2026-08-15T00:00:00.000Z',
    });
  });

  it('resolves "today" against the clock at query time, not at selection time', () => {
    // The whole point of storing a preset rather than a timestamp: an app left open overnight must
    // not keep querying yesterday.
    const beforeMidnight = build({ date: 'today' }, UNFILTERED, new Date('2026-09-14T23:59:00.000Z'));
    const afterMidnight = build({ date: 'today' }, UNFILTERED, new Date('2026-09-15T00:01:00.000Z'));
    expect(beforeMidnight.dateFilter).not.toEqual(afterMidnight.dateFilter);
  });

  it('treats an unknown string as not a date filter', () => {
    expect(isDatePresetFilter('last-year')).toBe(false);
    expect(isDatePresetFilter('today')).toBe(true);
  });
});
```

Update the file's existing `build` helper to take and forward the clock:

```ts
function build(
  overrides: Partial<CommentFilters>,
  scopeFilter: ScopeFilter = UNFILTERED,
  now: Date = new Date(),
) {
  return buildCommentThreadSelector({
    filters: { ...DEFAULT_COMMENT_FILTERS, ...overrides },
    scopeFilter,
    scrRef,
    currentUserName: 'Donna',
    now,
  });
}
```

and add `isDatePresetFilter` to the file's import list.

- [ ] **Step 2: Run them and watch them fail**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: FAIL — TypeScript rejects `date` on `CommentFilters` and `isDatePresetFilter` is not exported.

- [ ] **Step 3: Add the axis to the model**

In `comment-list-filters.model.ts`, add after the assignment axis block:

```ts
// --- Date axis (when the thread's first comment was written) ---

/**
 * Closed set of date presets. The UI stores the preset, not a timestamp: a concrete bound is
 * derived at query-build time so a preset picked before midnight does not keep querying yesterday.
 */
export type DatePresetFilter = 'all' | 'today' | 'last-7-days' | 'last-30-days';

export const datePresetFilterToLabelKey = {
  all: '%comment_filter_date_all%',
  today: '%comment_filter_date_today%',
  'last-7-days': '%comment_filter_date_last_7_days%',
  'last-30-days': '%comment_filter_date_last_30_days%',
} as const satisfies Record<DatePresetFilter, LocalizeKey>;

export function isDatePresetFilter(value: string): value is DatePresetFilter {
  return Object.hasOwn(datePresetFilterToLabelKey, value);
}

/** Days of history each preset covers, counted back from the start of the current UTC day. */
const DATE_FILTER_DAYS_BACK: Record<Exclude<DatePresetFilter, 'all'>, number> = {
  today: 0,
  'last-7-days': 7,
  'last-30-days': 30,
};

/**
 * Resolves a preset to the inclusive lower bound the provider filters on.
 *
 * Uses `after` rather than `exact` because `exact` compares only the calendar date in UTC, which
 * silently shifts the window for anyone several hours off UTC.
 */
function resolveDatePresetFilter(datePreset: DatePresetFilter, now: Date): { after: string } | undefined {
  if (datePreset === 'all') return undefined;
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - DATE_FILTER_DAYS_BACK[datePreset]),
  );
  return { after: start.toISOString() };
}
```

The type is named `DatePresetFilter`, not `DateFilter`, because `DateFilter` is already the richer
`exact | range | before | after` union declared in `legacy-comment-manager`'s type declarations. The
preset union is what the UI stores; the richer union is what the selector carries.

Then extend the four shared functions:

```ts
export const DEFAULT_COMMENT_FILTERS: CommentFilters = {
  resolved: 'all',
  read: 'all',
  type: 'all',
  assignment: 'all',
  date: 'all',
  author: 'all',
};
```

(`author` is added in Task 6; add it here now so the default is written once.)

In `applyFilterOverrides`, add the two lines the compile error will demand:

```ts
    date: overrides?.date ?? DEFAULT_COMMENT_FILTERS.date,
    author: overrides?.author ?? DEFAULT_COMMENT_FILTERS.author,
```

In `buildCommentThreadSelector`, add `now` to the parameter object (typed `now?: Date`, defaulted
`= new Date()`) and add before the `return selector;`:

```ts
  // Date — resolved here rather than at selection time so a preset chosen before midnight does not
  // keep querying yesterday.
  const dateFilter = resolveDatePresetFilter(filters.date, now);
  if (dateFilter) selector.dateFilter = dateFilter;
```

Add `date: DatePresetFilter; author: string;` to the `CommentFilters` type in
`src/types/legacy-comment-manager.d.ts` where that type is declared.

- [ ] **Step 4: Add the localization strings**

In `contributions/localizedStrings.json`, add to `localizedStrings.en`:

```json
"%comment_filter_date_all%": "All dates",
"%comment_filter_date_today%": "Today",
"%comment_filter_date_last_7_days%": "Last 7 days",
"%comment_filter_date_last_30_days%": "Last 30 days",
"%comment_filter_aria_date%": "Filter by date"
```

- [ ] **Step 5: Run the tests and watch them pass**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/legacy-comment-manager/
git commit -m "feat(comments): add the date preset filter axis

Backs the existing dateFilter selector field, which was already wired
through to CommentThreadSelector.cs but had no axis or UI.

Presets resolve to a concrete bound inside buildCommentThreadSelector
rather than at selection time, so an app left open overnight does not keep
querying yesterday. They map to 'after' rather than 'exact' because 'exact'
compares only the calendar date in UTC.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Add the author filter axis to the model (NN-1.3)

`author` is already in the selector at `legacy-comment-manager.d.ts:143` and
`CommentThreadSelector.cs:22`. Options come from `findAssignableUsers()`, already fetched in the web
view, minus the `Team` and `""` sentinels — neither is ever a comment author.

**Accepted limitation:** assignable users are not historical authors, so a comment by someone since
removed from the project cannot be filtered to. The alternative — deriving authors from loaded
threads — is circular, because filtering to one author hides every other author from the list.

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list-filters.model.ts`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list-filters.model.test.ts`
- Modify: `extensions/src/legacy-comment-manager/contributions/localizedStrings.json`

- [ ] **Step 1: Write the failing tests**

Append to `comment-list-filters.model.test.ts`:

```ts
describe('author filter', () => {
  it('contributes nothing when the axis is at its "all" default', () => {
    expect(build({ author: 'all' })).toEqual({});
  });

  it('maps a chosen author to the selector author field', () => {
    expect(build({ author: 'Ana Kuznetsova' })).toEqual({ author: 'Ana Kuznetsova' });
  });

  it('offers project users as options, never the Team or unassigned sentinels', () => {
    // findAssignableUsers returns assignment targets, which include "Team" and "". Neither is ever
    // the author of a comment.
    expect(toAuthorOptions(['Ana', TEAM_ASSIGNED_USER, 'Ian', UNASSIGNED_USER])).toEqual([
      'Ana',
      'Ian',
    ]);
  });

  it('returns no options rather than throwing when the user list has not loaded', () => {
    expect(toAuthorOptions(undefined)).toEqual([]);
  });
});
```

Add `toAuthorOptions`, `TEAM_ASSIGNED_USER` and `UNASSIGNED_USER` to the file's import list.

- [ ] **Step 2: Run them and watch them fail**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: FAIL — `toAuthorOptions` is not exported.

- [ ] **Step 3: Add the axis to the model**

In `comment-list-filters.model.ts`, add after the date axis block:

```ts
// --- Author axis (who wrote the thread's comments) ---

/**
 * The author axis is an open set — any project user name — plus the literal `'all'` sentinel, so it
 * cannot use the closed-union `FilterDropdown` the other axes share.
 */
export const AUTHOR_FILTER_ALL = 'all';

/**
 * Narrows `findAssignableUsers()` output to values that can actually be a comment author.
 *
 * That call returns assignment targets, which include `Team` and the empty-string "unassigned"
 * sentinel. Neither is ever an author, so both are dropped. Note this means the options are project
 * *members*, not historical authors: a comment written by someone since removed from the project
 * cannot be filtered to. Deriving authors from the loaded threads instead would be circular, since
 * filtering to one author hides every other author from the list.
 */
export function toAuthorOptions(assignableUsers: string[] | undefined): string[] {
  if (!assignableUsers) return [];
  return assignableUsers.filter(
    (user) => user !== TEAM_ASSIGNED_USER && user !== UNASSIGNED_USER,
  );
}
```

`toAuthorOptions` must be declared after `TEAM_ASSIGNED_USER` and `UNASSIGNED_USER` in the file.

In `buildCommentThreadSelector`, add before the `return selector;`:

```ts
  // Author
  if (filters.author !== AUTHOR_FILTER_ALL) selector.author = filters.author;
```

`DEFAULT_COMMENT_FILTERS` and `applyFilterOverrides` already carry `author` from Task 5.

- [ ] **Step 4: Add the localization strings**

In `contributions/localizedStrings.json`, add to `localizedStrings.en`:

```json
"%comment_filter_author_all%": "All authors",
"%comment_filter_aria_author%": "Filter by author",
"%comment_filter_author_search_placeholder%": "Search users",
"%comment_filter_author_no_results%": "No users found"
```

- [ ] **Step 5: Run the tests and watch them pass**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list-filters.model.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/legacy-comment-manager/
git commit -m "feat(comments): add the author filter axis

Backs the existing author selector field. Options come from
findAssignableUsers(), already fetched by the web view, minus the Team and
unassigned sentinels, which are assignment targets and never authors.

Known limitation: these are project members rather than historical
authors, so a comment by someone since removed cannot be filtered to.
Deriving authors from loaded threads would be circular -- filtering to one
author hides every other author from the list.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Collapse the filter toolbar behind one trigger with chips (NN-1.3)

The toolbar already wraps to three rows (~112px) in a 320px panel; adding two inline dropdowns would
make it four (~148px), most of a comment card spent on chrome in the PR whose headline is fitting
more on screen. Collapsing takes it to one row (~48px), below today's baseline.

Rejected on evidence: dropping `min-w-32` so triggers size to content. The shipped defaults
(`All resolved statuses`, `All read statuses`, `All assignments`) already exceed 128px at `text-sm`,
so removing the floor only lets flex-shrink truncate them harder.

`Popover`, `Command*` and `Badge` are all already exported from `platform-bible-react`
(`index.ts:242,254-259,288`), so no new exports are needed.

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.component.tsx`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.component.test.tsx`
- Modify: `extensions/src/legacy-comment-manager/src/localized-strings.test.ts`
- Modify: `extensions/src/legacy-comment-manager/contributions/localizedStrings.json`

- [ ] **Step 1: Write the failing tests**

Append to `comment-list.component.test.tsx`:

```tsx
it('renders one filters trigger rather than a row of dropdowns', () => {
  renderPanel();
  expect(screen.getByRole('button', { name: FILTERS_LABEL })).toBeInTheDocument();
  // The five standalone dropdowns are gone from the collapsed toolbar.
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
});

it('shows a chip only for axes that are not at their default', () => {
  renderPanel({
    filters: { ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved', date: 'last-7-days' },
  });

  expect(screen.getByText('Unresolved')).toBeInTheDocument();
  expect(screen.getByText('Last 7 days')).toBeInTheDocument();
  // Axes still at 'all' must not produce chips, or a fresh list would show seven of them.
  expect(screen.queryByText('All types')).not.toBeInTheDocument();
  expect(screen.queryByText('All authors')).not.toBeInTheDocument();
});

it('clears an axis back to its default when its chip is dismissed', async () => {
  const onFiltersChange = vi.fn();
  renderPanel({
    filters: { ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved' },
    onFiltersChange,
  });

  await userEvent.click(screen.getByRole('button', { name: CLEAR_RESOLVED_LABEL }));

  expect(onFiltersChange).toHaveBeenCalledWith(
    expect.objectContaining({ resolved: 'all' }),
  );
});

it('adds no plain-text search and no sort control', () => {
  // The PRD excludes both. A test keeps a well-meaning follow-up from adding them.
  renderPanel();
  expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /sort/i })).not.toBeInTheDocument();
});
```

Add to the top of the file, and extend `STRINGS` so these lookups return real text rather than blank:

```tsx
import userEvent from '@testing-library/user-event';

const FILTERS_LABEL = 'Filters';
const CLEAR_RESOLVED_LABEL = 'Clear resolved status filter';

const STRINGS: LanguageStrings = {
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
  '%comment_filter_button%': FILTERS_LABEL,
  '%comment_filter_chip_clear%': 'Clear {axis} filter',
  '%comment_filter_aria_resolved%': 'resolved status',
  '%comment_filter_resolved_unresolved%': 'Unresolved',
  '%comment_filter_date_last_7_days%': 'Last 7 days',
  '%comment_filter_type_all%': 'All types',
  '%comment_filter_author_all%': 'All authors',
};
```

- [ ] **Step 2: Run them and watch them fail**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list.component.test.tsx
```

Expected: FAIL — no `Filters` button exists; the five `combobox` dropdowns still render.

- [ ] **Step 3: Restructure the toolbar**

In `comment-list.component.tsx`:

1. Keep `FilterDropdown` exactly as it is — it now renders *inside* the popover, one per axis,
   each under a small axis label.
2. Add an `AuthorFilterDropdown` beside it for the open-set author axis:

```tsx
/**
 * The author axis is an open set of user names, so it cannot use {@link FilterDropdown}, which is
 * generic over a closed union keyed by a `Record<T, LocalizeKey>`. Uses Command for search because
 * a large project's member list is not scannable.
 */
function AuthorFilterDropdown({
  value,
  options,
  onChange,
  localizedStrings,
  ariaLabel,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  localizedStrings: LanguageStrings;
  ariaLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const allLabel = localizedStrings['%comment_filter_author_all%'];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="tw:w-full tw:justify-between" aria-label={ariaLabel}>
          <span className="tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
            {value === AUTHOR_FILTER_ALL ? allLabel : value}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw:w-auto tw:p-0" align="start">
        <Command>
          <CommandInput placeholder={localizedStrings['%comment_filter_author_search_placeholder%']} />
          <CommandList>
            <CommandEmpty>{localizedStrings['%comment_filter_author_no_results%']}</CommandEmpty>
            <CommandItem
              onSelect={() => {
                onChange(AUTHOR_FILTER_ALL);
                setIsOpen(false);
              }}
            >
              {allLabel}
            </CommandItem>
            {options.map((user) => (
              <CommandItem
                key={user}
                onSelect={() => {
                  onChange(user);
                  setIsOpen(false);
                }}
              >
                {user}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

3. Replace the toolbar's dropdown row with a trigger plus chips. The chip list is derived so a new
   axis cannot be silently forgotten:

```tsx
type FilterChip = {
  /** Stable React key and test hook. */
  key: string;
  /** The chip's visible text — the axis's current value, localized. */
  label: string;
  /** Localized axis name, used only to build the dismiss button's accessible name. */
  axisLabel: string;
  /** The filters object with just this axis reset to its default. */
  cleared: CommentFilters;
};

/**
 * Describes every closed-union axis in one table so a chip, a popover row, and a "this axis is
 * active" check all derive from the same place. A new axis added to `CommentFilters` without a
 * matching entry here is a compile error, which is the point — the previous wrapping toolbar had
 * no such coupling and an axis could be added to the model while the UI silently ignored it.
 */
const CLOSED_AXES = [
  { key: 'resolved', labelKeys: resolvedFilterToLabelKey, ariaKey: '%comment_filter_aria_resolved%' },
  { key: 'read', labelKeys: readFilterToLabelKey, ariaKey: '%comment_filter_aria_read%' },
  { key: 'type', labelKeys: typeFilterToLabelKey, ariaKey: '%comment_filter_aria_type%' },
  { key: 'assignment', labelKeys: assignmentFilterToLabelKey, ariaKey: '%comment_filter_aria_assignment%' },
  { key: 'date', labelKeys: datePresetFilterToLabelKey, ariaKey: '%comment_filter_aria_date%' },
] as const satisfies readonly {
  key: Exclude<keyof CommentFilters, 'author'>;
  labelKeys: Readonly<Record<string, LocalizeKey>>;
  ariaKey: LocalizeKey;
}[];

/** One chip per axis that is not at its default. A fresh list therefore shows none. */
function activeFilterChips(
  filters: CommentFilters,
  localizedStrings: LanguageStrings,
): FilterChip[] {
  const chips: FilterChip[] = [];

  CLOSED_AXES.forEach(({ key, labelKeys, ariaKey }) => {
    const value = filters[key];
    if (value === DEFAULT_COMMENT_FILTERS[key]) return;
    chips.push({
      key,
      label: localizedStrings[labelKeys[value]],
      axisLabel: localizedStrings[ariaKey],
      cleared: { ...filters, [key]: DEFAULT_COMMENT_FILTERS[key] },
    });
  });

  // Author is not in CLOSED_AXES: its value is a user name rather than a key into a label record,
  // so its chip shows the name itself.
  if (filters.author !== AUTHOR_FILTER_ALL) {
    chips.push({
      key: 'author',
      label: filters.author,
      axisLabel: localizedStrings['%comment_filter_aria_author%'],
      cleared: { ...filters, author: AUTHOR_FILTER_ALL },
    });
  }

  return chips;
}
```

Scope produces no chip. It is not part of `CommentFilters`, it has its own setter, and unlike the
other axes it is not "off by default" in a way a chip would usefully surface — it stays a plain
control inside the popover.

Render the collapsed toolbar in place of the current dropdown row, keeping the surrounding sticky
header and the sync-blocked notice untouched:

```tsx
        <div className="tw:border-b tw:bg-background tw:flex tw:flex-row tw:flex-wrap tw:gap-2 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {localizedStrings['%comment_filter_button%']}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="tw:w-72 tw:p-2 tw:space-y-2" align="start">
              {/* Author sits between assignment and date because it and assignment both concern
                  people; the adjacency is what makes "All authors" and "All assignments"
                  distinguishable rather than accidentally similar. */}
              {CLOSED_AXES.slice(0, 4).map(({ key, labelKeys, ariaKey }) => (
                <FilterAxisRow key={key} label={localizedStrings[ariaKey]}>
                  <FilterDropdown
                    value={filters[key]}
                    labelKeys={labelKeys}
                    isValue={AXIS_GUARDS[key]}
                    onChange={(next) => onFiltersChange({ ...filters, [key]: next })}
                    localizedStrings={localizedStrings}
                    ariaLabel={localizedStrings[ariaKey]}
                  />
                </FilterAxisRow>
              ))}

              <FilterAxisRow label={localizedStrings['%comment_filter_aria_author%']}>
                <AuthorFilterDropdown
                  value={filters.author}
                  options={toAuthorOptions(assignableUsers)}
                  onChange={(author) => onFiltersChange({ ...filters, author })}
                  localizedStrings={localizedStrings}
                  ariaLabel={localizedStrings['%comment_filter_aria_author%']}
                />
              </FilterAxisRow>

              <FilterAxisRow label={localizedStrings['%comment_filter_aria_date%']}>
                <FilterDropdown
                  value={filters.date}
                  labelKeys={datePresetFilterToLabelKey}
                  isValue={isDatePresetFilter}
                  onChange={(date) => onFiltersChange({ ...filters, date })}
                  localizedStrings={localizedStrings}
                  ariaLabel={localizedStrings['%comment_filter_aria_date%']}
                />
              </FilterAxisRow>

              <FilterAxisRow label={localizedStrings['%comment_filter_aria_scope%']}>
                <FilterDropdown
                  value={scopeFilter}
                  labelKeys={scopeFilterToLabelKey}
                  isValue={isScopeFilter}
                  onChange={onScopeFilterChange}
                  localizedStrings={localizedStrings}
                  ariaLabel={localizedStrings['%comment_filter_aria_scope%']}
                  hiddenValues={canScopeToCurrentChapter ? undefined : [SCOPE_FILTER_CURRENT_CHAPTER]}
                  testId="comment-scope-filter"
                />
              </FilterAxisRow>
            </PopoverContent>
          </Popover>
          {activeFilterChips(filters, localizedStrings).map((chip) => (
            <Badge key={chip.key} variant="secondary" className="tw:gap-1">
              {chip.label}
              <button
                type="button"
                aria-label={formatReplacementString(
                  localizedStrings['%comment_filter_chip_clear%'],
                  { axis: chip.axisLabel },
                )}
                onClick={() => onFiltersChange(chip.cleared)}
              >
                <X className="tw:h-3 tw:w-3" />
              </button>
            </Badge>
          ))}
        </div>
```

`FilterAxisRow` is a three-line wrapper giving each control its axis name — the label the collapsed
toolbar used to convey by having five separate triggers visible at once:

```tsx
/** One labelled row in the filters popover. */
function FilterAxisRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tw:space-y-1">
      <div className="tw:text-xs tw:font-medium tw:text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
```

`AXIS_GUARDS` pairs each closed axis with its type guard, so `FilterDropdown` stays type-safe when
driven from the `CLOSED_AXES` table rather than written out five times:

```tsx
const AXIS_GUARDS = {
  resolved: isResolvedFilter,
  read: isReadFilter,
  type: isTypeFilter,
  assignment: isAssignmentFilter,
  date: isDatePresetFilter,
} as const;
```

The `SelectTrigger` inside `FilterDropdown` should drop `tw:min-w-32` in favour of `tw:w-full` now
that it lives in a fixed-width popover column rather than a wrapping row — the floor existed to stop
triggers collapsing in the flex row, and there is no flex row any more.

4. Add `assignableUsers` to the props the panel already receives and pass
   `toAuthorOptions(assignableUsers)` into `AuthorFilterDropdown`. The prop is already in
   `CommentListPanelProps` via the `Pick<CommentListProps, …>` list.

- [ ] **Step 4: Run the panel tests and watch them pass**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run src/comment-list.component.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Guard the new strings**

In `localized-strings.test.ts`, add the new keys to the existing shipped-language assertions:

```ts
const FILTER_KEYS = [
  '%comment_filter_button%',
  '%comment_filter_chip_clear%',
  '%comment_filter_date_all%',
  '%comment_filter_date_today%',
  '%comment_filter_date_last_7_days%',
  '%comment_filter_date_last_30_days%',
  '%comment_filter_aria_date%',
  '%comment_filter_author_all%',
  '%comment_filter_aria_author%',
  '%comment_filter_author_search_placeholder%',
  '%comment_filter_author_no_results%',
];

describe('comment filter strings', () => {
  it.each(FILTER_KEYS)('%s has an English label', (key) => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });
});
```

Add `%comment_filter_button%": "Filters"` and
`"%comment_filter_chip_clear%": "Clear {axis} filter"` to `localizedStrings.en`, and add every new
key to `COMMENT_LIST_PANEL_EXTRA_STRING_KEYS` in `comment-list.component.tsx` so the panel actually
requests them.

- [ ] **Step 6: Run the extension suite**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add extensions/src/legacy-comment-manager/
git commit -m "feat(comments): collapse the filter toolbar behind one trigger with chips

Adding date and author inline would have taken the toolbar from three
wrapped rows to four in a narrow panel -- most of a comment card spent on
chrome, in the change whose goal is fitting more on screen. One trigger
plus a chip per non-default axis takes it to one row, below today's
baseline, and gives the long axis labels full width in the popover.

Dropping min-w-32 was measured and rejected: the shipped defaults already
exceed 128px at text-sm, so removing the floor only truncates them harder.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Verify the whole change and record the architecture decisions

**Files:**
- Modify: `.context/standards/Architecture-Decisions.md`

- [ ] **Step 1: Run every affected suite**

```bash
cd lib/platform-bible-react && npx vitest run --project=unit
cd ../../extensions/src/legacy-comment-manager && npx vitest run
```

Expected: PASS in both.

- [ ] **Step 2: Run the repo-wide checks CI runs**

```bash
cd /home/mgetgen/repos/paranext/paranext-core
npm run typecheck && npm run lint && npm test
```

Expected: all green. Fix anything flagged rather than suppressing it
(`.claude/rules/code-quality/eslint-disable-discipline.md`).

- [ ] **Step 3: Verify in the running app**

```bash
./.erb/scripts/refresh.sh
```

Then open a project, open the Comments tab, and confirm by eye:

1. The active comment shows the leading bar; selecting a **resolved** thread and an **unread**
   thread both show it too — those were the cases with no selection indicator at all.
2. Threads are visibly denser and separated by a hairline rather than a gap.
3. The assign and submit buttons sit inside the editor's border; Tab from the text reaches them.
4. Expand a thread and scroll it under the filter toolbar: the B/I buttons pass **behind** it.
5. Open Filters, set a date and an author, confirm the list narrows and chips appear.
6. Switch to each of the four themes and re-check (1).

- [ ] **Step 4: Record the two architecture decisions**

Add two entries to `.context/standards/Architecture-Decisions.md`, each inserted at its
**byte-order slug position** (`LC_ALL=C sort`), not appended:

- `adr-list-selection-on-a-dedicated-visual-channel` — selection is encoded on a channel of its own
  (a leading bar) rather than the background, because a list row's background typically already
  carries status; includes the measured contrast table and why the token is `foreground`.
- `adr-collapsed-multi-axis-filter-toolbar` — a filter surface with more than ~4 axes collapses
  behind one trigger with a chip per non-default axis, rather than growing a wrapping dropdown row.

Each entry needs date, status, context, decision, alternatives, consequences.

- [ ] **Step 5: Commit**

```bash
git add .context/standards/Architecture-Decisions.md
git commit -m "docs: record the comment-list selection and filter-toolbar decisions

Both are conventions other list and filter surfaces should follow, so they
belong in the decision log rather than only in the feature design.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Push**

```bash
git push
```

---

## Deliberately not done

Each of these is excluded by the PRD or the design, and Task 7's fourth test guards the first two:

- No plain-text search over comments.
- No sort control.
- No tag/category filter — PT9 has one and Platform.Bible has none at any layer. That gap is Q8, unanswered as of 2026-09-14.
- No annotations in the editor.
- No responsive/dynamic density — rejected in the design to avoid fighting PR #2211's per-view zoom (open as of 2026-09-14).
- No virtualization of the comment list. The panel lays out every thread at all times (measured
  262,229px of document during the NN-1.4 investigation) and its `h-full` + `flex-1 overflow-auto`
  pair reads as if there is an inner scroller when there is not. Real, but its own ticket — touching
  it here would risk the sticky behaviour Task 1 depends on.

## Open items carried from the design

1. **UX sign-off on Task 7.** NN-1.3 says "two filter controls with their options displayed"; a
   popover arguably fails that reading. Blocking for merge, not for starting.
2. **Q8** — are the PT9 filter omissions deliberate? Unanswered as of 2026-09-14; non-blocking.
3. **Coordinate with PR #2211** (per-view zoom, same web view).
