# 10Simple Layout Styling Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the Simple ("10Simple") 3-column layout's visual chrome (padding, divider gaps, border radius, min column width, a stray focus ring, mismatched header/toolbar heights, and a missing Model Text header) without changing Power mode's rendering in any way, except one shared-component alignment bugfix that intentionally applies to both modes.

**Architecture:** A new `data-interface-mode="simple"|"power"` attribute on `document.body` (kept in sync by a `useEffect` in the app's root `Main` component) gives CSS a Simple-mode-only scoping hook, with no new wrapper elements anywhere. Everything else is either a small pure-function/prop change (testable in isolation) or a scoped SCSS addition (verified manually, since this layout has no automated visual-regression suite).

**Tech Stack:** React, TypeScript, SCSS, Tailwind CSS (`tw:` prefix), rc-dock, Vitest, React Testing Library.

## Global Constraints

- Every change is scoped to Simple mode only, via `body[data-interface-mode="simple"]`, **except Task 6** (removing `tw:h-full` from `TabToolbar`'s wrapper divs) — that one intentionally also affects Power mode, per explicit author instruction, since it fixes a real alignment bug in a shared component.
- Power mode must render pixel-identically to its current behavior after every other task. There is no automated visual-regression suite for this layout — verify manually (Task 10).
- Do not run `npm run typecheck` as a completion gate for this plan — lint and the relevant test suites are sufficient (established project convention for this kind of work).
- Follow existing code conventions exactly: this repo has zero `!important` usage in `dock-layout-wrapper.component.scss` today except where a rule must win a same-element specificity tie against a Tailwind utility class already applied via `className` — that single justified case is called out explicitly in Task 8.
- **Amendment found during Task 7's review:** use the bare attribute selector `[data-interface-mode='simple']` (no `body` type qualifier) in every Simple-mode SCSS rule, not `body[data-interface-mode='simple']`. The qualified form trips stylelint's `selector-no-qualifying-type` rule, and since `document.body` is the only element that ever receives this attribute, the qualifier is redundant — dropping it is functionally identical and avoids needing any suppression. Also watch for CSS specificity ties against pre-existing rules in this file when adding a new Simple-mode override on a generic rc-dock class (`.dock-panel`, `.dock-tabpane`, etc.) — Task 7 hit one against `.dock-panel.dock-style-platform-bible` (3 classes) and had to match or exceed that specificity rather than relying on source order.

---

## File Structure

**Modify:**

- `src/renderer/app.component.tsx` — add the `data-interface-mode` sync effect (Task 1)
- `src/renderer/app.component.test.tsx` — test for Task 1
- `src/renderer/components/docking/platform-dock-layout-positioning.util.ts` — add `getDockLayoutOuterInset` (Task 2)
- `src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts` — test for Task 2
- `src/renderer/components/docking/platform-dock-layout.component.tsx` — use `getDockLayoutOuterInset` (Task 2)
- `src/renderer/components/docking/simple-layout.data.ts` — add `minWidth: 300` (Task 3)
- `src/renderer/components/docking/simple-layout.data.test.ts` — test for Task 3
- `extensions/src/platform-scripture-editor/src/resource-reference.utils.ts` — add exported `getRefLabel` (Task 4)
- `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx` — import `getRefLabel` instead of defining it locally (Task 4)
- `extensions/src/platform-scripture-editor/src/model-text-panel.component.tsx` — render the new header (Task 5)
- `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx` — remove `tw:h-full` (Task 6)
- `src/renderer/components/docking/dock-layout-wrapper.component.scss` — column chrome, height override, focus-ring reset (Tasks 7, 8, 9)
- `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` — no code change, referenced for its `.scripture-editor-tab-nav` className (Task 8 context only)

**Create:**

- `extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts` — new test file for Task 4
- `extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx` — new test file for Task 5
- `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx` — new test file for Task 6

---

### Task 1: Sync `data-interface-mode` onto `document.body`

**Files:**

- Modify: `src/renderer/app.component.tsx`
- Test: `src/renderer/app.component.test.tsx`

**Interfaces:**

- Consumes: `useIsPowerMode()` from `@renderer/hooks/use-is-power-mode.hook` (existing, returns `boolean`).
- Produces: `document.body` carries `data-interface-mode="power"` or `data-interface-mode="simple"` at all times after `Main` mounts. Every later CSS task (7, 8, 9) scopes under `body[data-interface-mode="simple"]`.

- [ ] **Step 1: Write the failing test**

Add to `src/renderer/app.component.test.tsx` (after the existing mocks, before the `describe('App', ...)` block — the file already mocks `PlatformDockLayout` and `PlatformBibleToolbar`, so `Main` renders cleanly):

```tsx
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => false),
}));
```

Add this import near the top (with the other imports):

```tsx
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
```

Add new test cases inside `describe('App', ...)`, alongside the existing `'should render'` test:

```tsx
it('sets data-interface-mode="simple" on document.body when not in power mode', () => {
  vi.mocked(useIsPowerMode).mockReturnValue(false);
  render(<App />);
  expect(document.body.getAttribute('data-interface-mode')).toBe('simple');
});

it('sets data-interface-mode="power" on document.body when in power mode', () => {
  vi.mocked(useIsPowerMode).mockReturnValue(true);
  render(<App />);
  expect(document.body.getAttribute('data-interface-mode')).toBe('power');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/renderer/app.component.test.tsx`
Expected: FAIL — `document.body.getAttribute('data-interface-mode')` is `null`, not `'simple'`/`'power'` (the attribute doesn't exist yet).

- [ ] **Step 3: Write minimal implementation**

In `src/renderer/app.component.tsx`, add the import and the effect:

```tsx
import { useEffect } from 'react';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { PlatformDockLayout } from '@renderer/components/docking/platform-dock-layout.component';
import { TestContext } from '@renderer/context/papi-context/test.context';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './app.component.scss';
// PT-3920: emit Tailwind `tw:` utilities from core's own source. See src/renderer/styles/tailwind.css.
import './styles/tailwind.css';
import { NotificationDisplay } from './components/notification-display';
import { OverlayHost } from './components/overlay-host.component';
import { WorkspaceUpdatingOverlay } from './components/overlays/overlay-workspace-updating.component';
import { PlatformBibleToolbar } from './components/platform-bible-toolbar';
import { initWorkspaceUpdatingService } from './services/workspace-updating-service';

function Main() {
  useEffect(() => initWorkspaceUpdatingService(), []);

  const isPowerMode = useIsPowerMode();
  useEffect(() => {
    document.body.setAttribute('data-interface-mode', isPowerMode ? 'power' : 'simple');
  }, [isPowerMode]);

  return (
    <TestContext.Provider value="test">
      <PlatformBibleToolbar />
      <PlatformDockLayout />
      <NotificationDisplay />
      <OverlayHost />
      <WorkspaceUpdatingOverlay />
    </TestContext.Provider>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/renderer/app.component.test.tsx`
Expected: PASS (all 3 tests, including the pre-existing `'should render'` test)

- [ ] **Step 5: Commit**

```bash
git add src/renderer/app.component.tsx src/renderer/app.component.test.tsx
git commit -m "feat: sync data-interface-mode attribute onto document.body"
```

---

### Task 2: Outer inset — branch on `isPowerMode` via a pure helper

**Files:**

- Modify: `src/renderer/components/docking/platform-dock-layout-positioning.util.ts`
- Modify: `src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts`
- Modify: `src/renderer/components/docking/platform-dock-layout.component.tsx`

**Interfaces:**

- Produces: `getDockLayoutOuterInset(isPowerMode: boolean): CSSProperties`, exported from `platform-dock-layout-positioning.util.ts`.
- Consumes (in `platform-dock-layout.component.tsx`): the component's existing `isPowerMode` local (already computed at line 70 via `useIsPowerMode()` — no new plumbing).

- [ ] **Step 1: Write the failing test**

Add to `src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts`, importing the new function alongside the existing ones:

```typescript
import {
  getFloatPosition,
  getGroups,
  getDockLayoutOuterInset,
  HEADLESS_GROUP,
  TAB_GROUP,
  TAB_GROUP_RESOURCES,
} from './platform-dock-layout-positioning.util';
```

Add a new `describe` block (alongside the existing `describe('getGroups()', ...)`):

```typescript
describe('getDockLayoutOuterInset()', () => {
  it('power mode: keeps the original 8px inset on every side (except top)', () => {
    expect(getDockLayoutOuterInset(true)).toEqual({
      position: 'absolute',
      top: 48,
      bottom: 8,
      left: 8,
      right: 8,
    });
  });

  it('simple mode: removes the inset except for the top toolbar clearance', () => {
    expect(getDockLayoutOuterInset(false)).toEqual({
      position: 'absolute',
      top: 48,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts`
Expected: FAIL with "getDockLayoutOuterInset is not a function" (or a module-resolution/undefined error), since the export doesn't exist yet.

- [ ] **Step 3: Write minimal implementation**

In `src/renderer/components/docking/platform-dock-layout-positioning.util.ts`, add the `CSSProperties` import to the top import list:

```typescript
import { createElement } from 'react';
import type { CSSProperties } from 'react';
```

Add the new exported function anywhere alongside the other exported helpers (e.g. directly after `getGroups`):

```typescript
/**
 * Outer inset around the whole dock layout, relative to its positioned parent. Power mode keeps the
 * original 8px gap on every side below the main toolbar; Simple mode removes that gap on the
 * left/right/bottom (only the 48px top clearance for the main toolbar is preserved) — see
 * `docs/superpowers/specs/2026-07-20-simple-layout-styling-adjustments-design.md`, Section 7.
 */
export function getDockLayoutOuterInset(isPowerMode: boolean): CSSProperties {
  if (isPowerMode) {
    return { position: 'absolute', top: 48, bottom: 8, left: 8, right: 8 };
  }
  return { position: 'absolute', top: 48, bottom: 0, left: 0, right: 0 };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts`
Expected: PASS

- [ ] **Step 5: Wire it into `platform-dock-layout.component.tsx`**

In `src/renderer/components/docking/platform-dock-layout.component.tsx`, this file does not yet import anything from `platform-dock-layout-positioning.util.ts` — add a new import line directly after the existing `useIsPowerMode` import (line 50):

```typescript
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { getDockLayoutOuterInset } from '@renderer/components/docking/platform-dock-layout-positioning.util';
```

Then replace the inline style object:

```tsx
      /* Put a visual space around all tab-groups.
       * I tried using CSS padding and margin for this, but both causes overflows. */
      style={{
        position: 'absolute',
        top: 48,
        bottom: 8,
        left: 8,
        right: 8,
      }}
```

with:

```tsx
      /* Put a visual space around all tab-groups.
       * I tried using CSS padding and margin for this, but both causes overflows. */
      style={getDockLayoutOuterInset(isPowerMode)}
```

- [ ] **Step 6: Run the full docking test suite to confirm nothing broke**

Run: `npm test -- src/renderer/components/docking/`
Expected: PASS (all existing docking tests, plus the two new ones from Step 1)

- [ ] **Step 7: Commit**

```bash
git add src/renderer/components/docking/platform-dock-layout-positioning.util.ts \
        src/renderer/components/docking/platform-dock-layout-positioning.util.test.ts \
        src/renderer/components/docking/platform-dock-layout.component.tsx
git commit -m "refactor: branch dock layout outer inset on isPowerMode via a pure helper"
```

---

### Task 3: Minimum column width in Simple mode

**Files:**

- Modify: `src/renderer/components/docking/simple-layout.data.ts`
- Modify: `src/renderer/components/docking/simple-layout.data.test.ts`

**Interfaces:**

- Produces: each of the 3 top-level entries in `simpleLayout.dockbox.children` has `minWidth: 300` (rc-dock's `BoxData` already supports this field — no type changes needed).

- [ ] **Step 1: Write the failing test**

Add to `src/renderer/components/docking/simple-layout.data.test.ts`, inside the existing `describe('simpleLayout', ...)` block (alongside the other `it(...)` cases that already use the `columns` constant):

```typescript
it('each column has a minWidth of 300 so it cannot be resized to nothing', () => {
  columns.forEach((col) => {
    // Narrowing BoxData|PanelData to BoxData to read its minWidth.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((col as BoxData).minWidth).toBe(300);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/renderer/components/docking/simple-layout.data.test.ts`
Expected: FAIL — `expect(undefined).toBe(300)`

- [ ] **Step 3: Write minimal implementation**

In `src/renderer/components/docking/simple-layout.data.ts`, add `minWidth: 300` to each of the three column objects (right after each `size` field):

```typescript
      {
        // Column 1: Model Text
        mode: 'vertical',
        size: 1,
        minWidth: 300,
        children: [
```

```typescript
      {
        // Column 2: Scripture Editor
        mode: 'vertical',
        size: 2,
        minWidth: 300,
        children: [
```

```typescript
      {
        // Column 3: Resources & Tools
        mode: 'vertical',
        size: 1,
        minWidth: 300,
        children: [
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/renderer/components/docking/simple-layout.data.test.ts`
Expected: PASS (all tests, including the new one)

- [ ] **Step 5: Commit**

```bash
git add src/renderer/components/docking/simple-layout.data.ts \
        src/renderer/components/docking/simple-layout.data.test.ts
git commit -m "feat: give each Simple-mode column a 300px minimum width"
```

---

### Task 4: Extract `getRefLabel` into the shared resource-reference utils

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/resource-reference.utils.ts`
- Modify: `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx`
- Test: `extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts` (new file)

**Interfaces:**

- Produces: `getRefLabel(ref: EffectiveResourceReference, dblResourcesList: DblResourceData[]): string`, exported from `resource-reference.utils.ts`. Task 5 (Model Text header) imports this directly.
- Consumes: `isDblResourceReference`, `isProjectReference` (already exported from the same file, unchanged).

- [ ] **Step 1: Write the failing test**

Create `extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReference } from 'platform-scripture';
import { getRefLabel } from './resource-reference.utils';

const dblResources: DblResourceData[] = [
  {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
];

describe('getRefLabel', () => {
  it('returns "{fullName} ({displayName})" for a DBL reference matched in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-web',
      name: 'WEB',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('World English Bible (WEB)');
  });

  it('falls back to ref.name for a DBL reference not present in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-missing',
      name: 'Missing Resource',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('Missing Resource');
  });

  it('returns ref.name for a project reference', () => {
    const ref: EffectiveResourceReference = {
      type: 'project',
      id: 'project-123',
      name: 'My Project',
      source: 'user',
    };
    expect(getRefLabel(ref, dblResources)).toBe('My Project');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts`
Expected: FAIL — `getRefLabel` is not exported from `./resource-reference.utils` (import error/undefined).

- [ ] **Step 3: Write minimal implementation**

In `extensions/src/platform-scripture-editor/src/resource-reference.utils.ts`, add the new imports and function (full resulting file):

```typescript
import type {
  DblResourceReference,
  ProjectReference,
  EffectiveResourceReference,
} from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';

/**
 * Checks if a {@link ResourceReference} is a {@link DblResourceReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link DblResourceReference}, otherwise `false`
 */
export function isDblResourceReference(item: unknown): item is DblResourceReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'dblResource' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Checks if a {@link ResourceReference} is a {@link ProjectReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link ProjectReference}, otherwise `false`
 */
export function isProjectReference(item: unknown): item is ProjectReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'project' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 */
export function getRefLabel(
  ref: EffectiveResourceReference,
  dblResourcesList: DblResourceData[],
): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
    return ref.name;
  }
  if (isProjectReference(ref)) {
    return ref.name;
  }
  return '';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts`
Expected: PASS (all 3 tests)

- [ ] **Step 5: Update `resource-text-panel.web-view.tsx` to use the shared helper**

In `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx`, change the import (line 42):

```typescript
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
```

to:

```typescript
import {
  isDblResourceReference,
  isProjectReference,
  getRefLabel,
} from './resource-reference.utils';
```

Then delete the now-duplicated local function (originally at lines 69-84):

```typescript
/**
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 */
function getRefLabel(ref: EffectiveResourceReference, dblResourcesList: DblResourceData[]): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
    return ref.name;
  }
  if (isProjectReference(ref)) {
    return ref.name;
  }
  return '';
}
```

Leave `getRefId` (immediately above it) untouched — it stays local since nothing else needs it.

- [ ] **Step 6: Run the extension's existing test suite to confirm nothing broke**

Run: `npm test -- extensions/src/platform-scripture-editor/src/`
Expected: PASS (no test file exercises `resource-text-panel.web-view.tsx` directly today, so this mainly confirms nothing else in the extension regressed)

- [ ] **Step 7: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/resource-reference.utils.ts \
        extensions/src/platform-scripture-editor/src/resource-reference.utils.test.ts \
        extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx
git commit -m "refactor: extract getRefLabel into the shared resource-reference utils"
```

---

### Task 5: Model Text header

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/model-text-panel.component.tsx`
- Test: `extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx` (new file)

**Interfaces:**

- Consumes: `getRefLabel` from `./resource-reference.utils` (produced by Task 4); `ModelTextPanel`'s own already-derived `effectiveModelText` local and its existing `dblResources` prop — no new prop is added to `ModelTextPanelProps`.
- Produces: a header element (`data-testid="model-text-header"`) rendered above the read-only editor only in the "Active" state (a model text is resolved and its chapter is loaded), reading `${fullName} (${displayName})`.

- [ ] **Step 1: Write the failing test**

Create `extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx`:

```tsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { ModelTextPanel, ModelTextPanelProps } from './model-text-panel.component';

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
}));
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
  };
});

const seedResource: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

const baseProps: ModelTextPanelProps = {
  localizedStrings: {},
  hasProject: true,
  effectiveModelTexts: undefined,
  isEffectiveModelTextsLoading: false,
  dblResources: [seedResource],
  isLoadingResources: false,
  getUserModelTexts: async () => undefined,
  installResource: async () => {},
  setUserModelTexts: async () => {},
  showResourcePicker: async () => undefined,
  getResourceChapter: async () => ({ usj: undefined, textDirection: 'ltr' }),
};

describe('ModelTextPanel header', () => {
  it('shows "FULL_NAME (SHORT_NAME)" once a model text resolves and its chapter loads', async () => {
    const effectiveModelTexts: EffectiveResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', id: 'uid-web', name: 'WEB', source: 'admin' }],
    };
    render(
      <ModelTextPanel
        {...baseProps}
        effectiveModelTexts={effectiveModelTexts}
        getResourceChapter={async () => ({
          usj: { type: 'USJ', version: '3.1', content: [] },
          textDirection: 'ltr',
        })}
      />,
    );
    expect(await screen.findByTestId('model-text-header')).toHaveTextContent(
      'World English Bible (WEB)',
    );
  });

  it('shows no header in the zero state (no model text configured)', () => {
    render(
      <ModelTextPanel {...baseProps} effectiveModelTexts={{ dataVersion: '1.0.0', items: [] }} />,
    );
    expect(screen.queryByTestId('model-text-header')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx`
Expected: FAIL — the first test can't find `data-testid="model-text-header"` (header doesn't exist yet); the second test passes trivially (no header exists at all yet), so at this point only the first test fails — that's expected for this step.

- [ ] **Step 3: Write minimal implementation**

In `extensions/src/platform-scripture-editor/src/model-text-panel.component.tsx`, add the import:

```typescript
import { getRefLabel } from './resource-reference.utils';
```

Compute the label right after the existing `resourceProjectId` derivation (near the top of the component body, after `const resourceProjectId = match?.installed ? match.projectId : undefined;`):

```typescript
const modelTextLabel = effectiveModelText
  ? getRefLabel(effectiveModelText, dblResources)
  : undefined;
```

Change the "Active" render block (currently the last `return` in the function) from:

```tsx
// Active: read-only editor showing the model text.
return (
  <div className="tw:h-screen tw:overflow-auto" dir={options.textDirection}>
    <Editorial
      ref={editorRef}
      scrRef={scrRef}
      onScrRefChange={handleScrRefChange}
      options={options}
      logger={logger}
    />
  </div>
);
```

to:

```tsx
// Active: read-only editor showing the model text.
return (
  <div className="tw:flex tw:h-screen tw:flex-col">
    {modelTextLabel && (
      <div
        data-testid="model-text-header"
        className="tw:flex tw:h-9 tw:shrink-0 tw:items-center tw:border-b tw:border-border tw:px-3 tw:text-sm tw:font-semibold"
      >
        {modelTextLabel}
      </div>
    )}
    <div className="tw:flex-1 tw:overflow-auto" dir={options.textDirection}>
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={handleScrRefChange}
        options={options}
        logger={logger}
      />
    </div>
  </div>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx`
Expected: PASS (both tests)

- [ ] **Step 5: Run the full extension test suite to confirm nothing broke**

Run: `npm test -- extensions/src/platform-scripture-editor/src/`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/model-text-panel.component.tsx \
        extensions/src/platform-scripture-editor/src/model-text-panel.component.test.tsx
git commit -m "feat: show a FULL_NAME (SHORT_NAME) header on the Model Text panel"
```

---

### Task 6: Fix `TabToolbar` vertical-centering (global — affects both modes)

**Files:**

- Modify: `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx`
- Test: `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx` (new file)

**Interfaces:**

- No prop or exported-type changes — `TabToolbarProps` is unchanged. Only the three inner wrapper `<div>`s' class strings change.

- [ ] **Step 1: Write the failing test**

Create `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx`:

```tsx
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabToolbar } from '@/components/advanced/tab-toolbar/tab-toolbar.component';

describe('TabToolbar', () => {
  it('does not force tw:h-full on the start/center/end area wrappers (breaks vertical centering)', () => {
    render(
      <TabToolbar
        onSelectProjectMenuItem={() => {}}
        onSelectViewInfoMenuItem={() => {}}
        startAreaChildren={<span data-testid="start-child">Start</span>}
        centerAreaChildren={<span data-testid="center-child">Center</span>}
        endAreaChildren={<span data-testid="end-child">End</span>}
      />,
    );

    const startWrapper = screen.getByTestId('start-child').parentElement;
    const centerWrapper = screen.getByTestId('center-child').parentElement;
    const endWrapper = screen.getByTestId('end-child').parentElement;

    [startWrapper, centerWrapper, endWrapper].forEach((wrapper) => {
      expect(wrapper).not.toBeNull();
      expect(wrapper?.className).not.toMatch(/(?:^|\s)tw:h-full(?:\s|$)/);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx`
Expected: FAIL — all three wrappers currently have `tw:h-full` in their class string.

- [ ] **Step 3: Write minimal implementation**

In `lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx`, remove `tw:h-full` from the three wrapper `<div>`s:

```tsx
      {startAreaChildren && (
        <div className="tw:flex tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip">
          {startAreaChildren}
        </div>
      )}
      {centerAreaChildren && (
        <div className="tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto">
          {centerAreaChildren}
        </div>
      )}
      <div className="tw:flex tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip">
```

(The fourth `tw:h-full`, on `TabDropdownMenu`'s own `className="tw:h-full"` inside the end-area div, is unrelated to this bug — that component sizes itself to match the row, not the artificially-stretched wrapper — leave it untouched.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the library's full test suite to confirm nothing broke**

Run: `npm test -- lib/platform-bible-react/`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx \
        lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.test.tsx
git commit -m "fix: vertically center TabToolbar's start/center/end area children"
```

---

### Task 7: Column chrome — padding, gap, radius, divider (Simple mode only)

**Files:**

- Modify: `src/renderer/components/docking/dock-layout-wrapper.component.scss`

**Interfaces:**

- None (pure CSS). Depends on Task 1's `data-interface-mode` attribute existing on `document.body`.

- [ ] **Step 1: Add the scoped SCSS block**

Append a new region at the end of `src/renderer/components/docking/dock-layout-wrapper.component.scss` (after the existing `#endregion CONTROLS` line):

```scss
// #region SIMPLE-MODE CHROME (padding/gap/radius/divider) ///////////////
// Ports the Storybook prototype's NO_PADDING_STYLE (src/stories/platform/ten-layout-shared.tsx)
// into production. Scoped to body[data-interface-mode="simple"] (set by app.component.tsx's Main)
// so Power mode keeps its existing padded, rounded, gapped chrome untouched.
body[data-interface-mode='simple'] {
  .dock-layout {
    gap: 0;
  }

  // Collapse the divider to a near-invisible 1px, but keep a wide, easy-to-grab resize hit area via
  // rc-dock's own transform-based hit-area expansion (matches the prototype's approach).
  .dock-divider {
    flex: 0 0 1px;
    background: transparent;
  }
  .dock-hbox > .dock-divider {
    transform: scaleX(8);
    cursor: ew-resize;
  }
  .dock-vbox > .dock-divider {
    transform: scaleY(8);
    cursor: ns-resize;
  }

  .dock-panel,
  .dock-tabpane,
  .platform-panel,
  .web-view {
    padding: 0;
    border-radius: 0;
  }

  // Border radius removal is comprehensive: also flatten the tab-header fillets (the decorative
  // curved corners connecting an active tab to its content pane, in the FILLETS region above) and
  // the active-tab's own corner rounding — not just the outer containers.
  .dock-tab,
  .dock-tab.dock-tab-active {
    border-radius: 0;
  }
  .dock-tab::before,
  .dock-tab::after {
    width: 0;
    height: 0;
  }
}
// #endregion SIMPLE-MODE CHROME //////////////////////////////////////
```

- [ ] **Step 2: Run the existing docking test suite (SCSS has no logic to unit-test, but confirm nothing else regressed)**

Run: `npm test -- src/renderer/components/docking/`
Expected: PASS (unchanged — this task touches no `.ts`/`.tsx` files)

- [ ] **Step 3: Visual verification**

Use the `app-runner` skill to start Platform.Bible, then the `visual-verification` skill to:

- Screenshot the Simple-mode 3-column layout: confirm no visible padding/gap around each column, a near-invisible divider between columns that is still draggable to resize, and square (non-rounded) corners on every column, tab, and tab-pane.
- Switch to Power mode (via `platform.interfaceMode` setting) and screenshot the flexible layout: confirm it looks pixel-identical to before this task (padded panels, rounded corners, visible 8px dividers).

- [ ] **Step 4: Commit**

```bash
git add src/renderer/components/docking/dock-layout-wrapper.component.scss
git commit -m "style: remove Simple-mode column padding, radius, and divider gap"
```

---

### Task 8: Height alignment — dock tab-header, Scripture Editor toolbar, Model Text header

**Files:**

- Modify: `src/renderer/components/docking/dock-layout-wrapper.component.scss`

**Interfaces:**

- None (pure CSS). Depends on Task 1 (the scoping attribute) and Task 5 (the Model Text header must already exist, since it's already built at `tw:h-9` = 36px — no further change needed to it).

**Context:** Column 3's dock tab-header is already 36px today (`--dock-tab-height: 30px` + `--tab-header-to-content-gap: 6px`, unscoped, both modes) — no change needed there. The Model Text header (Task 5) was already built at `tw:h-9` (36px) directly, since it only ever renders in Simple mode — no change needed there either. The one piece left is the Scripture Editor's `TabToolbar`, which renders at a shared, fixed `tw:h-14` (56px, from `TabToolbarContainer`) in both modes via the `className="scripture-editor-tab-nav tw:block tw:z-10"` passed in `platform-scripture-editor.web-view.tsx:1859` — this needs a Simple-mode-only override down to 36px.

- [ ] **Step 1: Add the scoped height override**

Append a new region to `src/renderer/components/docking/dock-layout-wrapper.component.scss` (after the `SIMPLE-MODE CHROME` region added in Task 7):

```scss
// #region SIMPLE-MODE HEIGHT ALIGNMENT ///////////////////////////////
// The Scripture Editor's TabToolbar (`.scripture-editor-tab-nav`, set in
// platform-scripture-editor.web-view.tsx) renders at a shared, fixed 56px (`tw:h-14`) in both
// modes. In Simple mode it must match Column 3's dock tab-header and the Model Text header, both
// 36px. `!important` is required here (the only justified use in this file): this overrides a
// Tailwind utility class (`tw:h-14`) applied directly via `className` on the same element, and a
// plain same-specificity class selector cannot be relied on to win that tie by cascade order alone.
[data-interface-mode='simple'] .scripture-editor-tab-nav {
  height: 36px !important;
}
// #endregion SIMPLE-MODE HEIGHT ALIGNMENT ////////////////////////////
```

- [ ] **Step 2: Visual verification**

Use the `app-runner` and `visual-verification` skills to:

- Screenshot Simple mode: confirm Column 3's tab-header row, the Scripture Editor's toolbar, and the new Model Text header row all appear the same height (36px).
- Screenshot Power mode: confirm the Scripture Editor's toolbar (and the Checks panel's, and the Enhanced Resources toolbar's, if reachable) are still their original 56px height, unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/components/docking/dock-layout-wrapper.component.scss
git commit -m "style: align Simple-mode tab-header, toolbar, and Model Text header heights"
```

---

### Task 9: Remove the black focus ring on WebView click (Simple mode only)

**Files:**

- Modify: `src/renderer/components/docking/dock-layout-wrapper.component.scss`

**Interfaces:**

- None (pure CSS). Depends on Task 1.

- [ ] **Step 1: Add the scoped outline reset**

Append a new region to `src/renderer/components/docking/dock-layout-wrapper.component.scss` (after the `SIMPLE-MODE HEIGHT ALIGNMENT` region added in Task 8):

```scss
// #region SIMPLE-MODE FOCUS RING //////////////////////////////////////
// Clicking inside a WebView's content triggers the browser's default focus outline on the iframe.
// Reset it in Simple mode, matching the outline-reset pattern already used elsewhere in this file
// (e.g. the .dock-tab-btn:focus-visible reset in the TAB HEADER region above).
[data-interface-mode='simple'] .web-view:focus {
  outline: none;
}
// #endregion SIMPLE-MODE FOCUS RING ///////////////////////////////////
```

- [ ] **Step 2: Visual verification**

Use the `app-runner` and `visual-verification` skills to click inside each of the 3 columns' WebView content in Simple mode and confirm no focus ring appears. Then switch to Power mode and confirm its (pre-existing, unchanged) behavior is untouched.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/components/docking/dock-layout-wrapper.component.scss
git commit -m "style: remove default WebView focus ring in Simple mode"
```

---

### Task 10: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full TypeScript test suite**

Run: `npm test`
Expected: PASS, zero failures

- [ ] **Step 2: Run lint across the whole repo**

Run: `npm run lint`
Expected: zero errors (per this repo's lint-sweep-verification convention — fix any residual issues inline before proceeding)

- [ ] **Step 3: Manual walkthrough against the spec's Definition of Done**

Use the `app-runner` skill to start Platform.Bible and the `visual-verification` skill to check off every bullet in `docs/superpowers/specs/2026-07-20-simple-layout-styling-adjustments-design.md`'s "Definition of Done" section:

- `document.body`'s `data-interface-mode` attribute matches the active mode with no flash on startup.
- Power mode is pixel-identical to its pre-plan appearance in every respect except Task 6.
- Simple-mode columns: zero padding, zero border-radius (containers, tab fillets, active-tab corners), near-invisible but still-draggable divider.
- Each Simple-mode column refuses to resize below 300px.
- Column 3's tab-header, the Scripture Editor toolbar, and the Model Text header are all visibly the same height in Simple mode.
- `TabToolbar`'s children are vertically centered in both modes (Scripture Editor, Checks, Enhanced Resources).
- Model Text panel shows `FULL_NAME (SHORT_NAME)` once a resource is selected, and nothing in the zero state.
- No focus ring on WebView click in Simple mode.
- Outer gap is zero (left/right/bottom) in Simple mode, unchanged in Power mode.
- Confirm item #5 (icon-only tab restyle) was NOT touched — Bible Texts/Commentaries/Comment List tabs still show their current text-labeled headers.

- [ ] **Step 4: Report results**

Summarize pass/fail for each Definition of Done bullet. Fix any failures found (return to the relevant task above) before considering the plan complete.
