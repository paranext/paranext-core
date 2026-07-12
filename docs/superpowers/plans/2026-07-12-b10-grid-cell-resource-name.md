# B10 — Compact resource-name display in ScriptureTextGrid cells — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each `ScriptureTextGrid` cell show its resource name compactly — a colored hanging inline label beside the verse in verse-row cells, and a compact colored header band in chapter contexts — all rendered in the cell chrome outside `Editorial`.

**Architecture:** Extend the two existing cell components in place. `ResourceCellView` (presentational) gains a `nameDisplay: 'inline' | 'header'` prop and branches between the two layouts; the name label + its truncation tooltip are extracted into a small `ResourceNameLabel` sub-component (in the same file) reused by both branches. `ResourceCell` (smart) derives `nameDisplay` from its existing `viewMode` and passes it through. No new files, no data-flow changes, no upstream/second-repo changes.

**Tech Stack:** React + TypeScript, Tailwind (`tw:` prefixed classes), `platform-bible-react` (Tooltip, Spinner), Vitest + React Testing Library (jsdom), Storybook.

**Spec:** [docs/superpowers/specs/2026-07-12-b10-grid-cell-resource-name-design.md](../specs/2026-07-12-b10-grid-cell-resource-name-design.md)

## Global Constraints

- **Rendering path (a) only** — the name renders in the cell chrome, outside `Editorial`. No USJ injection, no `scripture-editors`/`platform-editor` change.
- **Extension:** all changes are under `extensions/src/platform-scripture-editor/src/scripture-text-grid/`.
- **Color:** the name uses `tw:text-primary` (a standout theme token already used elsewhere in the repo, e.g. `manage-books-dialog`) — not muted, not link-styled (no underline/pointer).
- **Accessibility:** the gridcell keeps `aria-label={label}`; the visible name is `aria-hidden` so it is not announced twice. Reading order is name → verse text.
- **RTL:** the name sits on the resource's own inline-start; achieved with a flex row scoped by `dir={textDirection}`.
- **Name renders in every state** (`downloading` / `failed` / empty verse) so the cell is always identifiable.
- **No keyboard-handler changes** → the keyboard-shortcuts catalog (`src/stories/keyboard-shortcuts.data.ts`) is untouched.
- Tests use `// @vitest-environment jsdom` and `@testing-library/react`, matching the existing files.

---

### Task 1: `ResourceCellView` — `nameDisplay` prop + two layouts

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx`

**Interfaces:**

- Consumes: nothing new.
- Produces:

  - `export type ResourceNameDisplay = 'inline' | 'header'`
  - `ResourceCellViewProps` gains `nameDisplay?: ResourceNameDisplay` (default `'header'`).
  - Behavior contract used by tests and Task 2:
    - `nameDisplay='inline'`: the visible name and the content share an intermediate flex-row `<div dir=…>` — the name's `parentElement` is that row (NOT the gridcell) and that row also contains the content; the name is the row's `firstElementChild`.
    - `nameDisplay='header'` (default): the visible name is a direct child band of the gridcell — the name's `parentElement` IS the gridcell.
    - The visible name element always has `aria-hidden="true"` and class `tw:text-primary`.

- [ ] **Step 1: Write the failing tests**

Append this `describe` block to `resource-cell-view.component.test.tsx` (the file already imports `render, screen, within` and defines `renderGridRow` + `localizedStrings`):

```tsx
describe('ResourceCellView name display', () => {
  it('inline mode hangs the name before the verse text in reading order', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    const name = within(cell).getByText('NIV');
    const verse = within(cell).getByText('In the beginning');
    // Name precedes the verse text in DOM (reading) order.
    // eslint-disable-next-line no-bitwise
    expect(name.compareDocumentPosition(verse) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('inline mode puts the name and verse text in one row (name beside text, not a header band)', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    const name = within(cell).getByText('NIV');
    const verse = within(cell).getByText('In the beginning');
    const row = name.parentElement;
    // Inline: an intermediate flex row wraps the name + content, so the row is NOT the gridcell.
    expect(row).not.toBe(cell);
    expect(row).toContainElement(verse);
  });

  it('inline mode applies the resource dir to the row and puts the name first (inline-start)', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>אַשְׁרֵי</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'עברית' });
    const name = within(cell).getByText('עברית');
    const row = name.parentElement;
    expect(row).toHaveAttribute('dir', 'rtl');
    // Name is the first child; flex + dir=rtl place it on the inline-start (visually right).
    expect(row?.firstElementChild).toBe(name);
  });

  it('inline mode still shows the name while downloading', () => {
    renderGridRow(
      <ResourceCellView
        state="downloading"
        label="KJV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'KJV' });
    expect(within(cell).getByText('KJV')).toBeInTheDocument();
    expect(within(cell).getByText('Downloading…')).toBeInTheDocument();
  });

  it('the visible name is aria-hidden so the gridcell name is not announced twice', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<span>In the beginning</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'NIV' });
    expect(cell).toHaveAttribute('aria-label', 'NIV');
    expect(within(cell).getByText('NIV')).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults to header display: the name is a band directly under the gridcell', () => {
    renderGridRow(
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>Blessed</span>}
      />,
    );
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    // Header mode: no intermediate row — the name band is a direct child of the gridcell.
    expect(name.parentElement).toBe(cell);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- resource-cell-view.component.test.tsx`
Expected: the new `name display` tests FAIL — `nameDisplay` is not a prop yet, the visible name is not `aria-hidden`, and there is no intermediate inline row (the "inline" tests fail on `row).not.toBe(cell)` / `firstElementChild`). The existing `row smoke` tests still PASS.

- [ ] **Step 3: Implement — replace the file contents**

Replace the entire contents of `resource-cell-view.component.tsx` with:

```tsx
import {
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { ReactNode, useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { ResourceCellState } from './resource-cell.utils';

/**
 * Localization keys for the ResourceCell offline states. Import to resolve them via
 * `useLocalizedStrings` (in the app) or `getLocalizedStrings` (in Storybook).
 */
export const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
export const DOWNLOADING_KEY = '%webView_scriptureTextGrid_cell_status_downloading%';
export const FAILED_KEY = '%webView_scriptureTextGrid_cell_status_failed%';
export const EMPTY_KEY = '%webView_scriptureTextGrid_cell_verse_empty%';
export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  DOWNLOADING_KEY,
  FAILED_KEY,
  EMPTY_KEY,
] as const);

type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};

/** How the cell shows its resource name: a hanging inline label, or a header band. */
export type ResourceNameDisplay = 'inline' | 'header';

export type ResourceCellViewProps = {
  /** Which visual state to render; only `ready` shows the editor. */
  state: ResourceCellState;
  /** Resource label shown in the header/inline label and used as the gridcell aria-label. */
  label: string;
  /** This resource's own text direction ('ltr' | 'rtl'), applied to the content area. */
  textDirection: string;
  /** Localized strings; import `RESOURCE_CELL_STRING_KEYS` to resolve them. */
  localizedStrings: ResourceCellLocalizedStrings;
  /** The editor rendered when `state` is `ready` (the connected cell supplies `Editorial`). */
  editor: ReactNode;
  /** When true (verse mode, slice empty), render the empty label instead of the editor. */
  isVerseEmpty?: boolean;
  /** Fired on click anywhere in the cell or Enter while the gridcell is focused. */
  onActivate?: () => void;
  /**
   * How to show the resource name. `'header'` (default) is a compact band above the content, used
   * by chapter contexts (single-resource full-width + chapter-context split). `'inline'` hangs the
   * name at the resource's inline-start beside the verse text, used by verse-row cells. Both render
   * outside `Editorial` (paranext-core only).
   */
  nameDisplay?: ResourceNameDisplay;
};

/**
 * The resource short-name/abbreviation, in the standout resource color (`tw:text-primary`). Single
 * line; a tooltip reveals the full name only when the text is actually clipped (same manual-`open`
 * measure-on-pointer-enter pattern as `ProjectRowView` in platform-bible-react). `aria-hidden`
 * because the enclosing gridcell already exposes the name via `aria-label`, so the visible copy
 * must not be announced a second time (reading order stays name → verse text).
 */
function ResourceNameLabel({ label, className }: { label: string; className?: string }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<HTMLSpanElement>(null);

  const handlePointerEnter = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    if (element.scrollWidth > element.clientWidth) setIsTooltipOpen(true);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen}>
        <TooltipTrigger asChild>
          <span
            ref={ref}
            aria-hidden
            onPointerEnter={handlePointerEnter}
            onPointerLeave={() => setIsTooltipOpen(false)}
            className={`tw:truncate tw:font-medium tw:text-primary ${className ?? ''}`}
          >
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Presentational ResourceCell: renders the resource name (inline label or header band), per-cell
 * text direction, and either the editor (`ready`) or the offline placeholder
 * (`downloading`/`failed`). Data-free so Storybook can drive every state; `ResourceCell` wraps it
 * with the PAPI fetch/direction/offline wiring.
 */
export function ResourceCellView({
  state,
  label,
  textDirection,
  localizedStrings,
  editor,
  isVerseEmpty,
  onActivate,
  nameDisplay = 'header',
}: ResourceCellViewProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onActivate?.();
      }
    },
    [onActivate],
  );

  let readyContent: ReactNode = editor;
  if (isVerseEmpty) {
    readyContent = (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:text-center">
        <span className="tw:text-sm tw:text-muted-foreground">{localizedStrings[EMPTY_KEY]}</span>
      </div>
    );
  }

  const stateContent =
    state === 'ready' ? (
      readyContent
    ) : (
      <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
        {state === 'downloading' && <Spinner />}
        <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
        <span className="tw:text-sm tw:text-muted-foreground">
          {state === 'failed' ? localizedStrings[FAILED_KEY] : localizedStrings[DOWNLOADING_KEY]}
        </span>
      </div>
    );

  return (
    <div
      role="gridcell"
      aria-label={label}
      tabIndex={onActivate ? 0 : undefined}
      onKeyDown={onActivate ? handleKeyDown : undefined}
      onClick={onActivate}
      // `cursor-pointer` signals the cell is clickable (opens the chapter-context split) so the
      // affordance is discoverable; only when activation is wired.
      className={`tw:flex tw:min-w-0 tw:flex-col ${onActivate ? 'tw:cursor-pointer' : ''}`}
    >
      {nameDisplay === 'inline' ? (
        // Verse-row cell: hang the name at the inline-start beside the verse text. `dir` on the row
        // makes flex place the name on the resource's own inline-start (right in RTL). The name is a
        // shrink-0, width-capped column; the verse text flows in the remaining min-w-0 column.
        <div
          className="tw:flex tw:flex-1 tw:flex-row tw:gap-2 tw:overflow-auto tw:p-2"
          dir={textDirection}
        >
          <ResourceNameLabel label={label} className="tw:max-w-24 tw:shrink-0 tw:text-sm" />
          <div className="tw:min-w-0 tw:flex-1">{stateContent}</div>
        </div>
      ) : (
        // Chapter context: a compact band above the content, in the resource color. Long labels
        // truncate; the tooltip reveals the full name only when actually clipped.
        <>
          <ResourceNameLabel
            label={label}
            className="tw:block tw:border-b tw:px-2 tw:py-0.5 tw:text-xs"
          />
          <div className="tw:flex-1 tw:overflow-auto tw:p-2" dir={textDirection}>
            {stateContent}
          </div>
        </>
      )}
    </div>
  );
}

export default ResourceCellView;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- resource-cell-view.component.test.tsx`
Expected: PASS — both the existing `row smoke` tests and the new `name display` tests.

- [ ] **Step 5: Typecheck & lint the change**

Run: `npm run typecheck`
Expected: no errors.
Run: `npx eslint extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx`
Expected: no errors. (The `no-bitwise` and `no-null/no-null` disables in the test/impl are intentional and carry inline justifications.)

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.test.tsx
git commit -m "feat: B10 inline/header resource-name layouts in ScriptureTextGrid cells"
```

---

### Task 2: `ResourceCell` — pass `nameDisplay` from `viewMode`

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx:120-138`
- Test: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.test.tsx`

**Interfaces:**

- Consumes: `ResourceCellViewProps.nameDisplay` from Task 1.
- Produces: `ResourceCell` renders the inline layout when `viewMode==='verse'`, the header band otherwise. No prop/signature change to `ResourceCell` itself.

- [ ] **Step 1: Write the failing tests**

In `resource-cell.component.test.tsx`, extend the imports and append a `describe` block.

Change the import line:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
```

to:

```tsx
import { render, screen, waitFor, within } from '@testing-library/react';
```

Append at the end of the file:

```tsx
describe('ResourceCell name display', () => {
  it('verse mode uses the inline hanging name (name shares a row with the editor)', async () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} viewMode="verse" />);
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    const editorial = await within(cell).findByTestId('editorial');
    // Inline: name and editor share an intermediate row, not the gridcell directly.
    expect(name.parentElement).not.toBe(cell);
    expect(name.parentElement).toContainElement(editorial);
  });

  it('chapter mode uses the header band (name is a direct child of the gridcell)', () => {
    setUsjResult(chapter, false);
    render(<ResourceCell {...props} viewMode="chapter" />);
    const cell = screen.getByRole('gridcell', { name: 'WEB' });
    const name = within(cell).getByText('WEB');
    expect(name.parentElement).toBe(cell);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- resource-cell.component.test.tsx`
Expected: the `verse mode uses the inline hanging name` test FAILS — `ResourceCell` does not pass `nameDisplay` yet, so verse mode still renders the header band and `name.parentElement` IS the gridcell. The `chapter mode` test PASSES (header is the default).

- [ ] **Step 3: Implement — pass `nameDisplay`**

In `resource-cell.component.tsx`, in the `return (<ResourceCellView … />)` block, add the `nameDisplay` prop derived from `viewMode`:

```tsx
return (
  <ResourceCellView
    state={state}
    label={resourceRef.label}
    textDirection={textDirection}
    localizedStrings={localizedStrings}
    isVerseEmpty={isVerseEmpty}
    onActivate={onActivate}
    nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}
    editor={
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        logger={logger}
      />
    }
  />
);
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- resource-cell.component.test.tsx`
Expected: PASS — all existing `ResourceCell` / `ResourceCell viewMode` tests plus the two new `name display` tests.

- [ ] **Step 5: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.test.tsx
git commit -m "feat: B10 verse cells use the inline resource-name label"
```

---

### Task 3: Storybook stories for the inline layout

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.stories.tsx`

**Interfaces:**

- Consumes: `ResourceCellViewProps.nameDisplay` from Task 1. No new exports consumed by later tasks.

This gives the ticket's requested "verse view + chapter view, before/after" visual coverage on the repo's established visual surface (Storybook), instead of brittle DOM snapshots (the repo has no jest snapshot tests). Verse stories switch to the new inline layout; chapter stories stay on the header band.

- [ ] **Step 1: Update the three verse stories to the inline layout**

In `resource-cell-view.component.stories.tsx`, add `nameDisplay="inline"` to the `VerseReady`, `VerseEmpty`, and `VerseRightToLeft` stories. For example, `VerseReady` becomes:

```tsx
/** Verse mode, ready — the inline hanging name sits before a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </GridCellBox>
  ),
};
```

Apply the same `nameDisplay="inline"` addition to `VerseEmpty` (keeps `isVerseEmpty`, `editor={undefined}`) and `VerseRightToLeft` (keeps `textDirection="rtl"`, `editor={<SampleVerse rtl />}`).

- [ ] **Step 2: Add an inline-wrapping story showing the column wrap**

Add a new story after `VerseRightToLeft` that shows a longer verse wrapping in its column beside the name:

```tsx
/**
 * Verse mode, inline name beside a longer verse — shows the verse text wrapping within its own
 * column to the right of the name (the P9-style compact treatment; later lines stay in the text
 * column rather than tucking under the name).
 */
export const VerseInlineWrapping: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={
          <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>
              <sup>3</sup> Blessed are the poor in spirit, for theirs is the kingdom of heaven, and
              great is their reward in the days to come.
            </p>
          </div>
        }
      />
    </GridCellBox>
  ),
};
```

- [ ] **Step 3: Typecheck & lint the stories**

Run: `npm run typecheck`
Expected: no errors.
Run: `npx eslint extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.stories.tsx`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.stories.tsx
git commit -m "docs: B10 Storybook stories for the inline resource-name layout"
```

---

### Task 4: Repo-wide verification + spec DoD update

**Files:**

- Modify: `docs/superpowers/specs/2026-07-12-b10-grid-cell-resource-name-design.md` (check off the DoD items now satisfied)

- [ ] **Step 1: Run the full grid test suite**

Run: `npm test -- scripture-text-grid`
Expected: PASS — all `scripture-text-grid` tests (view, cell, utils, grid) green, confirming no regression in the existing row/viewMode/chapter-context behavior.

- [ ] **Step 2: Repo-wide typecheck and lint (the CI commands)**

Run: `npm run typecheck`
Expected: no errors.
Run: `npm run lint`
Expected: zero errors across the repo.

- [ ] **Step 3: Update the spec Definition of Done**

In the spec's "Definition of Done" section, check off the now-satisfied boxes:

```markdown
- [x] Rendering path chosen (a) and documented before start — this spec.
- [x] Grid cell shows the resource name compactly per the chosen path.
- [x] B8 kebab has a discoverable anchor (if affected) — N/A, no kebab in the cell.
- [x] Chapter-view treatment consistent — compact header band.
- [x] Snapshot + accessibility + RTL tests pass — covered by the new `name display` tests and the inline Storybook stories.
```

- [ ] **Step 4: Manual verification checklist (record results in the PR description)**

Start the app (app-runner skill) with the scripture text grid enabled (`platformScriptureEditor.enableScriptureTextGrid`), open a text collection with 2+ resources, and confirm:

- Verse-row cells show the colored name inline-start of the verse; no full-width header row.
- Clicking a cell still opens the chapter-context split panel; the split panel and single-resource full-width view show the compact colored header band.
- An RTL resource renders the name on the right (inline-start).
- A screen reader announces the resource name then the verse text (name not doubled).

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-07-12-b10-grid-cell-resource-name-design.md
git commit -m "docs: B10 check off Definition of Done"
```

---

## Self-Review

**Spec coverage:**

- Path (a), chrome-only → Global Constraints + Task 1 (both layouts outside `Editorial`). ✅
- Verse-row hanging inline label → Task 1 `inline` branch + Task 2 wiring. ✅
- Chapter contexts compact header band → Task 1 `header` branch (default). ✅
- Distinct standout color, not muted, not link → `tw:text-primary`, no underline/pointer (Task 1). ✅
- RTL inline-start → `dir`-scoped flex row + Task 1 RTL test. ✅
- Offline/empty states show the name → Task 1 `stateContent` shared by both branches + downloading test. ✅
- Click/B8 unchanged, no kebab → `onActivate` unchanged; no kebab added. ✅
- Accessibility (aria-hidden name, reading order) → Task 1 `aria-hidden` + a11y/reading-order tests. ✅
- Long short-name tooltip → `ResourceNameLabel` truncation tooltip. ✅
- Testing: component tests (Task 1/2), verse+chapter visual (Task 3 stories), full-suite + repo lint (Task 4). ✅
- No keyboard-shortcuts-catalog change → stated in Global Constraints; no handler touched. ✅

**Placeholder scan:** none — every code and command step is concrete.

**Type consistency:** `ResourceNameDisplay` / `nameDisplay` used identically in Task 1 (definition) and Task 2 (`viewMode === 'verse' ? 'inline' : 'header'`). The behavior contract (`name.parentElement` is the row in inline / the gridcell in header) is asserted the same way in Task 1 and Task 2 tests. `ResourceNameLabel` is a private in-file helper (not exported), consistent across the file.

**Note on "snapshot" (ticket testing idea):** realized as Storybook stories (Task 3), the repo's established visual surface — the repo uses no jest DOM snapshots, so adding a brittle `toMatchSnapshot` would introduce an unused pattern. Behavioral coverage of both layouts lives in the Task 1/2 unit tests.
