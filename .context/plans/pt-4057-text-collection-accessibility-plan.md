# Scripture Text Grid Accessibility, Theming & RTL Pass (PT-4057) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the accessibility, dark/light theming, and RTL-parity polish on the already-shipped Scripture Text Grid view (telemetry is out of scope).

**Architecture:** All work is in the `platform-scripture-editor` extension. The renderer (A4) and View Options panel (A5) already exist; this plan adds a verse-reference-bearing accessible name, a visible focus indicator, a screen-reader live region for chapter-context open/close, a hover lock indicator on admin-shared View Options rows, an RTL fix for the chapter-context split side, and Playwright + component tests. Keyboard model is Tab/Shift-Tab between cells (not the ARIA grid arrow-key pattern).

**Tech Stack:** React 19, TypeScript, Tailwind v4 (`tw:` prefix), Vitest + Testing Library (jsdom), Playwright (CDP), `platform-bible-react`, `platform-bible-utils`.

## Global Constraints

- All JSX strings and ARIA labels MUST be localized (ESLint `no-hardcoded-jsx-strings`, `require-localized-aria`). Add keys to `extensions/src/platform-scripture-editor/contributions/localizedStrings.json` in BOTH the English block and the Spanish (`es-419`/`es`) block (AI Spanish, per A6 precedent).
- Colors MUST use theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `ring-ring`, etc.) — never hardcoded Tailwind colors (ESLint `no-hardcoded-tailwind-colors`).
- Every Tailwind utility class carries the `tw:` prefix.
- Keyboard model = **Option A**: Tab/Shift-Tab move between gridcells; Enter opens the chapter-context split; Esc closes it. Do NOT add roving tabindex or arrow-key grid navigation.
- No new indicator inside ScriptureTextGrid cells for admin/locked resources — the lock lives only in the View Options panel.
- Run before committing the final task: `npm run typecheck && npm run lint`.
- Single-file test run: `npm run test:core -- --run <path>`. E2E: `npm run test:e2e-cdp`.
- Spec reference: `.context/plans/pt-4057-text-collection-accessibility.md`.

---

### Task 1: Accessible name includes the verse reference

Compose each gridcell's accessible name as `"{resource short name}, {formatted scrRef}"` (e.g. `"ESV, MAT 5:3"`). Introduce a pure helper, unit-test it, then wire it into the cell.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.ts`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.test.ts` (create if absent)
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx` (create if absent)

**Interfaces:**
- Produces: `buildCellAccessibleName(label: string, scrRef: SerializedVerseRef): string` (in `resource-cell.utils.ts`).
- Produces: `ResourceCellViewProps.ariaLabel?: string` — the gridcell's accessible name; falls back to `label` when unset. The visible header keeps using `label`.

- [ ] **Step 1: Write the failing helper test**

In `resource-cell.utils.test.ts`:

```tsx
import { describe, it, expect } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { buildCellAccessibleName } from './resource-cell.utils';

describe('buildCellAccessibleName', () => {
  const scrRef: SerializedVerseRef = {
    book: 'MAT',
    chapterNum: 5,
    verseNum: 3,
    versificationStr: 'English',
  };

  it('combines the resource label and the formatted reference', () => {
    expect(buildCellAccessibleName('ESV', scrRef)).toBe('ESV, MAT 5:3');
  });

  it('still returns the reference when the label is empty', () => {
    expect(buildCellAccessibleName('', scrRef)).toBe(', MAT 5:3');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.test.ts`
Expected: FAIL — `buildCellAccessibleName is not a function` / import error.

- [ ] **Step 3: Implement the helper**

Append to `resource-cell.utils.ts`:

```tsx
import { formatScrRef } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';

/**
 * Accessible name for a grid cell: the resource's short label plus the active reference, e.g.
 * "ESV, MAT 5:3". Screen readers read this when the cell receives focus. Uses the default
 * `formatScrRef` output (3-letter book id, space book/chapter separator, colon chapter/verse).
 */
export function buildCellAccessibleName(label: string, scrRef: SerializedVerseRef): string {
  return `${label}, ${formatScrRef(scrRef)}`;
}
```

(Keep the existing `isPlatformError` import; add the two new imports at the top with the others.)

- [ ] **Step 4: Run the helper test to verify it passes**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing view test for `ariaLabel`**

In `resource-cell-view.component.test.tsx`:

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResourceCellView } from './resource-cell-view.component';

describe('ResourceCellView', () => {
  it('uses ariaLabel for the gridcell accessible name but keeps label visible', () => {
    render(
      <ResourceCellView
        state="ready"
        label="ESV"
        ariaLabel="ESV, MAT 5:3"
        textDirection="ltr"
        localizedStrings={{}}
        editor={<div>editor</div>}
        onActivate={() => {}}
      />,
    );
    expect(screen.getByRole('gridcell')).toHaveAttribute('aria-label', 'ESV, MAT 5:3');
    // Visible header still shows the plain label.
    expect(screen.getByText('ESV')).toBeInTheDocument();
  });

  it('falls back to label when ariaLabel is omitted', () => {
    render(
      <ResourceCellView
        state="ready"
        label="ESV"
        textDirection="ltr"
        localizedStrings={{}}
        editor={<div>editor</div>}
      />,
    );
    expect(screen.getByRole('gridcell')).toHaveAttribute('aria-label', 'ESV');
  });
});
```

- [ ] **Step 6: Run the view test to verify it fails**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx`
Expected: FAIL — first test sees `aria-label="ESV"` (no `ariaLabel` prop yet).

- [ ] **Step 7: Add the `ariaLabel` prop to `ResourceCellView`**

In `resource-cell-view.component.tsx`, add to `ResourceCellViewProps`:

```tsx
  /** Accessible name for the gridcell (resource label + reference). Falls back to `label`. */
  ariaLabel?: string;
```

Destructure it (`ariaLabel`) in the function signature, and change the gridcell attribute:

```tsx
      role="gridcell"
      aria-label={ariaLabel ?? label}
```

- [ ] **Step 8: Compose and pass the accessible name from `ResourceCell`**

In `resource-cell.component.tsx`, import the helper and pass it:

```tsx
import { deriveCellState, buildCellAccessibleName } from './resource-cell.utils';
```

In the returned `<ResourceCellView ... />`, add the prop:

```tsx
      ariaLabel={buildCellAccessibleName(resourceRef.label, scrRef)}
```

- [ ] **Step 9: Run both test files to verify they pass**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.test.ts extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx`
Expected: PASS (all).

- [ ] **Step 10: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.ts \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.utils.test.ts \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx
git commit -m "feat(PT-4057): add verse reference to Scripture Text Grid cell accessible name"
```

---

### Task 2: Visible focus indicator on the focused cell

Add a theme-token focus ring to the gridcell, shown only when the cell is activatable (Tab-focusable). Pure-UI change (component-first); the ring itself is verified in the Playwright spec (Task 8).

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`

**Interfaces:**
- Consumes: `onActivate` (already gates `tabIndex` on the gridcell).

- [ ] **Step 1: Add the focus-ring classes to the gridcell**

In `resource-cell-view.component.tsx`, update the gridcell `className`. Current:

```tsx
      className={`tw:flex tw:min-w-0 tw:flex-col ${onActivate ? 'tw:cursor-pointer' : ''}`}
```

Replace with (ring only when activatable; `ring-inset` so the `overflow`/`divide-x` borders don't clip it; `outline-hidden` removes the default browser outline the ring replaces):

```tsx
      className={`tw:flex tw:min-w-0 tw:flex-col ${
        onActivate
          ? 'tw:cursor-pointer tw:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-inset'
          : ''
      }`}
```

- [ ] **Step 2: Verify existing cell/view tests still pass**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx`
Expected: PASS (unchanged behavior; className is additive).

- [ ] **Step 3: Manual check (documented, no code)**

With the app running (`npm start`), open the Scripture Text Grid with ≥2 resources, press Tab — confirm a visible ring appears on the focused cell in BOTH light and dark themes and is not clipped. Record the result in the PR description. (Automated assertion follows in Task 8.)

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx
git commit -m "feat(PT-4057): visible focus ring on focused Scripture Text Grid cell"
```

---

### Task 3: Screen-reader announcement on chapter-context open/close

Add one polite, atomic, visually-hidden live region in the web-view root. Announce when the chapter-context split opens and closes. (Cell-focus is already announced natively by the gridcell's `aria-label` from Task 1 — a live region there would double-speak, so it is intentionally omitted.)

**Files:**
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`
- Create: `extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.ts`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.test.ts`
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`

**Interfaces:**
- Consumes: `ChapterContextResource` (has `.label`), `buildCellAccessibleName` is NOT reused here — the split announcement uses the resource `label` only.
- Produces: `buildChapterContextOpenedMessage(template: string, resourceLabel: string): string` — fills `{resourceReference}` in the template.

- [ ] **Step 1: Add localized strings**

In `contributions/localizedStrings.json`, add to the **English** block (alongside the other `webView_scriptureTextGrid_*` keys):

```json
      "%webView_scriptureTextGrid_a11y_chapterContextOpened%": "Chapter view opened for {resourceReference}",
      "%webView_scriptureTextGrid_a11y_chapterContextClosed%": "Chapter view closed",
```

And to the **Spanish** block (AI Spanish):

```json
      "%webView_scriptureTextGrid_a11y_chapterContextOpened%": "Vista de capítulo abierta para {resourceReference}",
      "%webView_scriptureTextGrid_a11y_chapterContextClosed%": "Vista de capítulo cerrada",
```

- [ ] **Step 2: Write the failing message-builder test**

In `announcements.utils.test.ts`:

```tsx
import { describe, it, expect } from 'vitest';
import { buildChapterContextOpenedMessage } from './announcements.utils';

describe('buildChapterContextOpenedMessage', () => {
  it('substitutes the resource label into the template', () => {
    expect(
      buildChapterContextOpenedMessage('Chapter view opened for {resourceReference}', 'ESV'),
    ).toBe('Chapter view opened for ESV');
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.test.ts`
Expected: FAIL — module/function not found.

- [ ] **Step 4: Implement the message builder**

Create `announcements.utils.ts`:

```tsx
import { formatReplacementString } from 'platform-bible-utils';

/**
 * Fills the localized "chapter view opened" template with the resource label. Kept as a pure helper
 * so the substitution is unit-testable without rendering the web view.
 */
export function buildChapterContextOpenedMessage(template: string, resourceLabel: string): string {
  return formatReplacementString(template, { resourceReference: resourceLabel });
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.test.ts`
Expected: PASS.

- [ ] **Step 6: Wire the live region into the web view**

In `scripture-text-grid.web-view.tsx`:

1. Add the string keys near the other key constants:

```tsx
const A11Y_OPENED_KEY = '%webView_scriptureTextGrid_a11y_chapterContextOpened%';
const A11Y_CLOSED_KEY = '%webView_scriptureTextGrid_a11y_chapterContextClosed%';
```

2. Add them to `ALL_STRING_KEYS`:

```tsx
const ALL_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  VIEW_OPTIONS_BUTTON_KEY,
  NO_PROJECT_KEY,
  CHAPTER_CONTEXT_CLOSE_KEY,
  A11Y_OPENED_KEY,
  A11Y_CLOSED_KEY,
  ...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
];
```

3. Import the builder:

```tsx
import { buildChapterContextOpenedMessage } from './scripture-text-grid/announcements.utils';
```

4. Add announcement state (next to the `chapterContext` state):

```tsx
  const [announcement, setAnnouncement] = useState('');
```

5. Replace the `setChapterContext` handler wiring. Add a wrapper that sets state AND announces, and update the close handler to announce:

```tsx
  const handleChapterContextChange = useCallback(
    (context: ChapterContextResource) => {
      setChapterContext(context);
      setAnnouncement(
        buildChapterContextOpenedMessage(localizedStrings[A11Y_OPENED_KEY] ?? '', context.label),
      );
    },
    [localizedStrings],
  );
```

Update the existing `handleCloseChapterContext` to announce on close:

```tsx
  const handleCloseChapterContext = useCallback(() => {
    setChapterContext(undefined);
    setAnnouncement(localizedStrings[A11Y_CLOSED_KEY] ?? '');
  }, [localizedStrings]);
```

6. Pass `handleChapterContextChange` (not the raw setter) to the grid:

```tsx
          onChapterContextChange={handleChapterContextChange}
```

7. Render the live region as the first child inside the root `<div data-testid="scripture-text-grid" ...>`:

```tsx
      <div role="status" aria-live="polite" aria-atomic="true" className="tw:sr-only">
        {announcement}
      </div>
```

- [ ] **Step 7: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add extensions/src/platform-scripture-editor/contributions/localizedStrings.json \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.ts \
        extensions/src/platform-scripture-editor/src/scripture-text-grid/announcements.utils.test.ts \
        extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx
git commit -m "feat(PT-4057): announce chapter-context open/close to screen readers"
```

---

### Task 4: Locked-admin indicator in the View Options panel

Admin-shared rows (top section, `isUserRemovable === false`) show a non-interactive lock icon on hover / focus-within, in the same trailing slot the hover-✕ uses on removable rows. It adds no tab stop.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/contributions/localizedStrings.json`
- Modify: `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts`
- Modify: `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx` (create if absent)

**Interfaces:**
- Consumes: `ViewOptionsTextEntry.isUserRemovable`, `RESOURCE_COLLECTION_OPTIONS_KEYS`, `localize()`.
- Produces: a new key `RESOURCE_COLLECTION_OPTIONS_KEYS.adminSharedLock` mapping to `%webView_scriptureTextGrid_viewOptions_adminSharedLock%`.

- [ ] **Step 1: Add localized strings**

English block:

```json
      "%webView_scriptureTextGrid_viewOptions_adminSharedLock%": "Shared by administrator",
```

Spanish block:

```json
      "%webView_scriptureTextGrid_viewOptions_adminSharedLock%": "Compartido por el administrador",
```

- [ ] **Step 2: Register the key in the types module**

In `resource-collection-options.types.ts`, add `adminSharedLock` to `RESOURCE_COLLECTION_OPTIONS_KEYS` and include its `%...%` string in `RESOURCE_COLLECTION_OPTIONS_STRING_KEYS` (follow the exact shape of the existing `removeFromList` entry — same object + array it already lives in).

- [ ] **Step 3: Write the failing component test**

In `resource-collection-options.component.test.tsx`:

```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResourceCollectionOptions } from './resource-collection-options.component';

const noop = () => {};
const strings = {
  '%webView_scriptureTextGrid_viewOptions_removeFromList%': 'Remove {resourceName} from list',
  '%webView_scriptureTextGrid_viewOptions_adminSharedLock%': 'Shared by administrator',
};

function renderPanel(overrides = {}) {
  return render(
    <ResourceCollectionOptions
      viewMode="verse"
      onViewModeChange={noop}
      top={[{ reference: { id: 'a', name: 'Admin ESV' }, checked: true, isUserRemovable: false }]}
      bottom={[{ reference: { id: 'b', name: 'My NIV' }, checked: true, isUserRemovable: true }]}
      onCheckedChange={noop}
      onRemoveFromList={noop}
      onGetResources={noop}
      localizedStrings={strings}
      {...overrides}
    />,
  );
}

describe('ResourceCollectionOptions locked-admin indicator', () => {
  it('shows a lock (not a remove button) on the admin-shared row', () => {
    renderPanel();
    expect(screen.getByLabelText('Shared by administrator')).toBeInTheDocument();
    // Admin row has no "Remove ... from list" control.
    expect(screen.queryByLabelText('Remove Admin ESV from list')).not.toBeInTheDocument();
  });

  it('shows a remove button (not a lock) on the user row', () => {
    renderPanel();
    expect(screen.getByLabelText('Remove My NIV from list')).toBeInTheDocument();
    expect(screen.queryByLabelText('Shared by administrator')).toBeInTheDocument(); // from admin row only
  });

  it('the lock is not a focusable/tab-stop button', () => {
    renderPanel();
    const lock = screen.getByLabelText('Shared by administrator');
    expect(lock.tagName).not.toBe('BUTTON');
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
Expected: FAIL — no element labelled "Shared by administrator".

- [ ] **Step 5: Render the lock on admin rows**

In `resource-collection-options.component.tsx`, import the `Lock` icon:

```tsx
import { Lock, X } from 'lucide-react';
```

In `renderRow`, after the `{row.isUserRemovable && (...)}` remove-button block, add the mutually-exclusive lock (non-interactive `span` with an accessible name; hover/focus-within reveal mirrors the ✕):

```tsx
        {!row.isUserRemovable && (
          <span
            aria-label={localize(localizedStrings, RESOURCE_COLLECTION_OPTIONS_KEYS.adminSharedLock)}
            className="tw:flex tw:h-8 tw:w-8 tw:items-center tw:justify-center tw:text-muted-foreground tw:opacity-0 tw:transition-opacity tw:group-hover:opacity-100 tw:group-focus-within:opacity-100"
          >
            <Lock className="tw:h-4 tw:w-4" />
          </span>
        )}
```

(The row wrapper already has `tw:group`.)

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor/contributions/localizedStrings.json \
        extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts \
        extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx \
        extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.test.tsx
git commit -m "feat(PT-4057): lock indicator on admin-shared View Options rows"
```

---

### Task 5: RTL — chapter-context split opens on the inline-end side

Under an RTL UI locale the resizable split must open on the visual left (inline-end). `react-resizable-panels` lays panels out left-to-right by DOM order and does not auto-mirror, so reverse the panel row visually under `dir="rtl"`.

**Files:**
- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx`

**Interfaces:**
- Consumes: existing `ResizablePanelGroup` from `platform-bible-react`.

- [ ] **Step 1: Add a direction-aware class to the panel group**

In `scripture-text-grid.component.tsx`, update the `ResizablePanelGroup` in the chapter-context branch:

```tsx
    <ResizablePanelGroup
      direction="horizontal"
      className="tw:h-full tw:min-h-0 tw:rtl:flex-row-reverse"
    >
```

The verse row stays the first panel and the chapter-context the second; `rtl:flex-row-reverse` flips their visual order (chapter-context to the left) only under `dir="rtl"`, keeping the split on the inline-end side in both directions.

- [ ] **Step 2: Verify existing grid component tests still pass**

Run: `npm run test:core -- --run extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.test.tsx`
Expected: PASS.

- [ ] **Step 3: Manual RTL check (documented, no code)**

With the app running, set UI locale to Arabic or Hebrew, open the grid with ≥2 resources, click a verse cell → confirm the chapter-context panel appears on the visual LEFT, the resize handle still drags correctly, and the row itself is reversed. Record in the PR. (Automated assertion in Task 8.)

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx
git commit -m "fix(PT-4057): open chapter-context split on inline-end side under RTL"
```

---

### Task 6: Playwright specs — accessible name, tab order, focus ring, RTL split side

Extend the existing spec. These follow the file's established pattern: skip in CI, discover an admin-writable project locally, flag synthetic resources, open the grid.

**Files:**
- Modify: `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts`

**Interfaces:**
- Consumes: `discoverAdminTextConnectionProject`, `flagResourcesAndOpenScriptureTextGrid`, `openScriptureTextGrid`, `restoreScriptureTextGridProjectSettings`, `closeAllNonHomeDockTabs`, `waitForAppReady` (all already imported/used in the file).

- [ ] **Step 1: Add an accessibility describe block**

Append to `scripture-text-grid.spec.ts` a new `test.describe('Scripture Text Grid accessibility (A12)', ...)` with `beforeEach(closeAllNonHomeDockTabs)` and `afterEach(restoreScriptureTextGridProjectSettings)`, containing:

```ts
test('gridcell accessible name includes the resource label and verse reference', async ({
  mainPage,
}) => {
  test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
  await waitForAppReady(mainPage);
  const projectId = await discoverAdminTextConnectionProject(mainPage);
  test.skip(!projectId, 'No admin-writable text-connection project found locally');

  await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
    { type: 'project', name: 'AccName A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
    { type: 'project', name: 'AccName B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
  ]);

  const frame = await openScriptureTextGrid(mainPage);
  const firstCell = frame.locator('[role="gridcell"]').first();
  await expect(firstCell).toBeVisible({ timeout: 15_000 });
  // Accessible name is "<label>, <BOOK C:V>" — assert the comma-joined shape.
  await expect(firstCell).toHaveAttribute('aria-label', /.+,\s+[A-Z1-9]{3}\s+\d+:\d+/);
});

test('Tab moves focus between gridcells, not into editor content', async ({ mainPage }) => {
  test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
  await waitForAppReady(mainPage);
  const projectId = await discoverAdminTextConnectionProject(mainPage);
  test.skip(!projectId, 'No admin-writable text-connection project found locally');

  await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
    { type: 'project', name: 'Tab A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
    { type: 'project', name: 'Tab B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
  ]);

  const frame = await openScriptureTextGrid(mainPage);
  await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });

  // Focus the first cell, then Tab — focus should land on a gridcell (the next cell), never inside
  // the readonly editor.
  await frame.locator('[role="gridcell"]').first().focus();
  await mainPage.keyboard.press('Tab');
  const focusedRole = await frame.evaluate(() => document.activeElement?.getAttribute('role'));
  expect(focusedRole).toBe('gridcell');
});

test('focused gridcell shows a focus ring', async ({ mainPage }) => {
  test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
  await waitForAppReady(mainPage);
  const projectId = await discoverAdminTextConnectionProject(mainPage);
  test.skip(!projectId, 'No admin-writable text-connection project found locally');

  await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
    { type: 'project', name: 'Ring A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
    { type: 'project', name: 'Ring B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
  ]);

  const frame = await openScriptureTextGrid(mainPage);
  const firstCell = frame.locator('[role="gridcell"]').first();
  await expect(firstCell).toBeVisible({ timeout: 15_000 });
  await firstCell.focus();
  // Tailwind focus-visible ring renders a non-zero box-shadow on the focused cell.
  const boxShadow = await firstCell.evaluate((el) => getComputedStyle(el).boxShadow);
  expect(boxShadow).not.toBe('none');
});
```

- [ ] **Step 2: Add the RTL split-side test**

In the same describe block:

```ts
test('chapter-context split opens on the inline-end (visual-left) side under RTL', async ({
  mainPage,
}) => {
  test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
  await waitForAppReady(mainPage);
  const projectId = await discoverAdminTextConnectionProject(mainPage);
  test.skip(!projectId, 'No admin-writable text-connection project found locally');

  await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
    { type: 'project', name: 'RtlSplit A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
    { type: 'project', name: 'RtlSplit B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
  ]);

  const frame = await openScriptureTextGrid(mainPage);
  await frame.evaluate(() => {
    document.documentElement.dir = 'rtl';
  });
  await frame.locator('[role="gridcell"]').first().click();
  const context = frame.getByTestId('scripture-text-grid-chapter-context');
  await expect(context).toBeVisible({ timeout: 15_000 });

  // Under RTL the chapter-context panel sits to the LEFT of the verse row.
  const contextBox = await context.boundingBox();
  const rowBox = await frame.locator('[role="grid"]').boundingBox();
  expect(contextBox && rowBox && contextBox.x < rowBox.x).toBe(true);
});
```

- [ ] **Step 3: Typecheck the e2e project**

Run: `npm run typecheck`
Expected: no errors. (If the e2e tsconfig is separate and not covered, run the project's e2e typecheck as configured; otherwise skip.)

- [ ] **Step 4: Run the new specs locally**

Run: `npm run test:e2e-cdp -- scripture-text-grid`
Expected: new tests PASS locally (they self-skip without a local admin project; if skipped, note it — they must not error).

- [ ] **Step 5: Commit**

```bash
git add e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts
git commit -m "test(PT-4057): Playwright specs for accessible name, tab order, focus ring, RTL split"
```

---

### Task 7: Keyboard-shortcuts catalog entries

The grid adds Enter (open split) and Esc (close split) handlers and relies on Tab/Shift-Tab cell navigation. The repo's hand-maintained catalog must list them.

**Files:**
- Modify: `src/stories/keyboard-shortcuts.data.ts`

**Interfaces:**
- Consumes: the existing `KeyboardShortcutEntry` shape (match the fields already used by neighboring entries: `purpose`, `category`, `context`, per-OS `keys`, `locations`).

- [ ] **Step 1: Read a neighboring entry for the exact shape**

Open `src/stories/keyboard-shortcuts.data.ts`, find an existing entry, and copy its field structure and per-OS key conventions (macOS symbols with no separator; Windows/Linux words joined with `+`).

- [ ] **Step 2: Add entries for the grid**

Add `KeyboardShortcutEntry` items for:
- **Open chapter context** — Enter — context: Scripture Text Grid cell — location `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`.
- **Close chapter context** — Esc — context: Scripture Text Grid — location `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`.
- **Move between cells** — Tab / Shift+Tab — context: Scripture Text Grid — location `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`.

Use the same `purpose`/`category` wording style as existing scripture-editor entries.

- [ ] **Step 3: Verify the catalog builds**

Run: `npm run test:core -- --run src/stories`
Expected: PASS (or no catalog test exists — then just confirm `npm run typecheck` is clean).

- [ ] **Step 4: Commit**

```bash
git add src/stories/keyboard-shortcuts.data.ts
git commit -m "docs(PT-4057): catalog Scripture Text Grid keyboard shortcuts"
```

---

### Task 8: Theming audit (dark + light) and final verification

Audit every grid surface in both themes, fix any hardcoded colors with theme tokens, then run the full gate.

**Files:**
- Potentially modify (only where hardcoded colors are found): any file under `extensions/src/platform-scripture-editor/src/scripture-text-grid/`, `resource-collection-options/`, `scripture-text-grid.web-view.tsx`.

- [ ] **Step 1: Grep for hardcoded colors in the grid surface**

Run:

```bash
grep -rniE "tw:(bg|text|border|ring|fill|stroke)-(red|blue|green|gray|slate|zinc|neutral|stone|white|black)" \
  extensions/src/platform-scripture-editor/src/scripture-text-grid \
  extensions/src/platform-scripture-editor/src/resource-collection-options \
  extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx
```

Expected: no matches. If any appear, replace with the nearest theme token (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `ring-ring`, `bg-destructive`, etc.) and note each in the PR.

- [ ] **Step 2: Manual dark/light smoke (documented, no code)**

With the app running, toggle dark and light themes and visually confirm parity across: ready / downloading / failed / verse-empty cells, cell header + divider, focus ring, View Options popover (rows, checkboxes, Verse/Chapter toggle, "Coming soon", Get Resources button, lock icon), empty state, and the chapter-context close button + resize handle. Record findings in the PR.

- [ ] **Step 3: Run the full unit-test + quality gate**

Run:

```bash
npm run test:core -- --run extensions/src/platform-scripture-editor
npm run typecheck
npm run lint
```

Expected: all PASS / zero errors. Fix any lint errors inline (do not suppress).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "style(PT-4057): theme-token fixes and final a11y/theming/RTL verification"
```

(If Step 1 found nothing and no fixes were needed, skip the commit and note "no hardcoded colors found" in the PR.)

---

## Self-Review

**Spec coverage:**
- Accessible name with verse ref → Task 1. ✅
- Visible focus indicator → Task 2 (+ verified Task 6). ✅
- Screen-reader announcements (open/close) → Task 3; cell-focus via native `aria-label` (Task 1) with rationale. ✅
- Keep editor out of tab order → verified by Task 6 tab-order test (contingency: if the readonly editor is found tabbable, add `tabIndex={-1}` to its container in `resource-cell.component.tsx` — but readonly Lexical is `contentEditable=false`, so it is not expected to be a tab stop). ✅
- Theming audit + locked-admin indicator → Task 4 (indicator) + Task 8 (audit). ✅
- RTL split side + row reversal + no hardcoded left/right → Task 5 (split) + existing A4 row-reversal test + Task 8 grep. Picker-dropdown direction is a manual RTL smoke item (Task 5 Step 3 / spec §3.7). ✅
- Playwright specs → Task 6. ✅
- Keyboard-shortcuts catalog → Task 7. ✅

**Placeholder scan:** No TBD/TODO; all code steps contain concrete code. The one contingency (editor tabIndex) is explicit and bounded.

**Type consistency:** `buildCellAccessibleName(label, scrRef)` (Task 1) used consistently; `ariaLabel` prop consistent across Tasks 1–2; `buildChapterContextOpenedMessage(template, resourceLabel)` consistent (Task 3); `adminSharedLock` key consistent (Task 4).

## Out of scope (do not implement)

Telemetry; Chapter view mode; full ARIA grid APG keyboard pattern (roving tabindex + arrows); any in-cell admin/locked indicator; visual-regression harness.
