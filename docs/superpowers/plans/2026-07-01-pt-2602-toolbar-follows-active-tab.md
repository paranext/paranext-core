# PT-2602 - Main toolbar follows the active tab's scroll group - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Platform.Bible main toolbar's scroll group and BCV follow the active (focused) scripture tab, showing the identical reference the tab shows.

**Architecture:** A new toolbar-internal hook (`useActiveTabScrollGroup`) reads the window-service `Focus` data provider and the focused WebView's saved definition to expose the active scripture tab's `{ scrollGroupId, projectId }`. `PlatformBibleToolbar` consumes it: a follow-effect adopts the active tab's numbered scroll group, and the `projectId` fed to the (already versification-aware) `useScrollGroupScrRef` is the active tab's project when attached, or the driven group's own source project otherwise.

**Tech Stack:** React + TypeScript (renderer), Vitest + @testing-library/react, PAPI hooks (`useData`, `useScrollGroupScrRef`), window/web-view services.

## Global Constraints

- **Base branch:** `pt-4036-versification-aware-sync` (PR #2478). This plan assumes #2478's `useScrollGroupScrRef(scrollGroupScrRef, setScrollGroupScrRef, projectId?)` signature and `getScrRefSourceProjectIdSync` helper exist.
- **No new services/providers/top-level structures.** Reuse `windowService`, `web-view.service-host` (`getSavedWebViewDefinitionSync`, `onDidUpdateWebView`), and the scroll-group host. The only new file is one toolbar-internal hook.
- **Hook is app-internal:** co-located with the toolbar, imported directly, **not** exported through any shared/public barrel (notably not `papi-hooks/index.ts`).
- **TDD required** (this is behavior/logic). RED → GREEN → REFACTOR; every test must be able to fail.
- **Scripture refs** use `SerializedVerseRef` (already the type on `scrollGroupScrRef`); we never introduce a display-string-only ref.
- **Repo must stay lint/typecheck/test clean.** Run the repo-wide checks in Task 3 before the final report (per project lint-sweep rules).
- **projectId rule (the crux):** while the toolbar's group equals the active tab's group ("attached"), pass the active tab's `projectId`; otherwise pass `getScrRefSourceProjectIdSync(toolbarGroup)`. Switching the toolbar group performs no writes; only a navigation writes, and in override mode it preserves the group's source ("move the verse, nothing else").
- **Keep-last fallback:** when the active tab has no numbered scroll group (non-scripture WebView, or an independent "no scroll group" ref), do not change the toolbar's group.

## File Structure

- **Create:** `src/renderer/components/use-active-tab-scroll-group.hook.ts` - the toolbar-internal follow-source hook. One responsibility: expose the last active scripture tab's `{ webViewId, scrollGroupId, projectId }`.
- **Create:** `src/renderer/components/use-active-tab-scroll-group.hook.test.ts` - hook behavior tests.
- **Modify:** `src/renderer/components/platform-bible-toolbar.tsx` - consume the hook (follow-effect + `effectiveProjectId`), replacing the current `currentProject?.id` argument at line 100.
- **Modify:** `src/renderer/components/platform-bible-toolbar.test.tsx` - mock the new hook + add follow/projectId/keep-last tests.

Reference key facts (verified in the base branch):

- Toolbar today (lines 78-101): `scrollGroupIdInternal` from `localStorage` key `platform-bible-toolbar.scrollGroupId` (default `0`); `updateScrollGroupIdInternal` writes state + localStorage and throws on non-number; `useScrollGroupScrRef(scrollGroupIdInternal, updateScrollGroupIdInternal, currentProject?.id)`.
- `useData(windowService.dataProviderName).Focus(undefined, undefined)` returns `[FocusSubject | undefined | PlatformError, setter]` (pattern from `platform-tab-title.component.tsx:123-125`).
- `FocusSubject` = `{ focusType:'webView'; id }` | `{ focusType:'tab'; tabType; id }` | `{ focusType:'other' }` (`window.service-model.ts:22-49`); for a WebView tab, `id` is the WebView id.
- `getSavedWebViewDefinitionSync(webViewId): SavedWebViewDefinition | undefined` (`web-view.service-host.ts:1115`); `SavedWebViewDefinition` carries required `id` + optional `projectId`, `scrollGroupScrRef`.
- `onDidUpdateWebView` is `PlatformEvent<UpdateWebViewEvent>`; `UpdateWebViewEvent = { webView: SavedWebViewDefinition }` (`web-view.service-model.ts:254`); exported from `@renderer/services/web-view.service-host`.
- `getScrRefSourceProjectIdSync(scrollGroupId): string | undefined` (`scroll-group.service-host.ts:136`).

**Single-file test command (from the worktree root):**
`npx vitest run <relative-test-path>`

---

### Task 1: `useActiveTabScrollGroup` hook

**Files:**

- Create: `src/renderer/components/use-active-tab-scroll-group.hook.ts`
- Test: `src/renderer/components/use-active-tab-scroll-group.hook.test.ts`

**Interfaces:**

- Consumes: `useData` (`@renderer/hooks/papi-hooks`); `getSavedWebViewDefinitionSync`, `onDidUpdateWebView` (`@renderer/services/web-view.service-host`); `windowService` (`@shared/services/window.service`); `useEvent` (`platform-bible-react`); `isPlatformError`, `getErrorMessage`, `ScrollGroupId` (`platform-bible-utils`); `logger` (`@shared/services/logger.service`); `UpdateWebViewEvent` (`@shared/services/web-view.service-model`).
- Produces (for Task 2):

  ```ts
  export type ActiveTabScrollGroup = {
    webViewId?: string;
    scrollGroupId?: ScrollGroupId;
    projectId?: string;
  };
  export function useActiveTabScrollGroup(): ActiveTabScrollGroup;
  ```

- [ ] **Step 1: Write the failing test file (focus derivation + definition read)**

Create `src/renderer/components/use-active-tab-scroll-group.hook.test.ts`:

```ts
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Controllable focus subject the mocked useData(...).Focus() returns.
let currentFocus: unknown;
// Captures the onDidUpdateWebView handler the hook registers via useEvent.
let lastWebViewUpdateHandler: ((event: unknown) => void) | undefined;

const getSavedWebViewDefinitionSync = vi.fn();

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: () => ({ Focus: () => [currentFocus, vi.fn()] }),
}));

vi.mock('@renderer/services/web-view.service-host', () => ({
  getSavedWebViewDefinitionSync: (...args: unknown[]) => getSavedWebViewDefinitionSync(...args),
  onDidUpdateWebView: vi.fn(),
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('platform-bible-react', () => ({
  useEvent: (_event: unknown, handler: (event: unknown) => void) => {
    lastWebViewUpdateHandler = handler;
  },
}));

async function importHook() {
  return (await import('./use-active-tab-scroll-group.hook')).useActiveTabScrollGroup;
}

describe('useActiveTabScrollGroup', () => {
  beforeEach(() => {
    currentFocus = undefined;
    lastWebViewUpdateHandler = undefined;
    getSavedWebViewDefinitionSync.mockReset();
  });

  it('returns the group and project of the focused webView', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 2,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() =>
      expect(result.current).toEqual({ webViewId: 'wv1', scrollGroupId: 2, projectId: 'projA' }),
    );
  });

  it('treats a focused webView-type tab the same as the webView iframe', async () => {
    currentFocus = { focusType: 'tab', tabType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: 3,
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() => expect(result.current.scrollGroupId).toBe(3));
  });

  it('reports no scrollGroupId when the active tab is on an independent ref', async () => {
    currentFocus = { focusType: 'webView', id: 'wv1' };
    getSavedWebViewDefinitionSync.mockReturnValue({
      id: 'wv1',
      webViewType: 'scriptureEditor',
      scrollGroupScrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      projectId: 'projA',
    });
    const useActiveTabScrollGroup = await importHook();

    const { result } = renderHook(() => useActiveTabScrollGroup());

    await waitFor(() => expect(result.current.webViewId).toBe('wv1'));
    expect(result.current.scrollGroupId).toBeUndefined();
    expect(result.current.projectId).toBe('projA');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/renderer/components/use-active-tab-scroll-group.hook.test.ts`
Expected: FAIL - cannot resolve `./use-active-tab-scroll-group.hook` (module does not exist yet).

- [ ] **Step 3: Write the hook implementation**

Create `src/renderer/components/use-active-tab-scroll-group.hook.ts`:

```ts
import { useData } from '@renderer/hooks/papi-hooks';
import {
  getSavedWebViewDefinitionSync,
  onDidUpdateWebView,
} from '@renderer/services/web-view.service-host';
import { logger } from '@shared/services/logger.service';
import { UpdateWebViewEvent } from '@shared/services/web-view.service-model';
import { windowService } from '@shared/services/window.service';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Describes the active scripture tab the main toolbar should follow. */
export type ActiveTabScrollGroup = {
  /** Identity of the last active scripture tab. Undefined until one is focused. */
  webViewId?: string;
  /** The tab's scroll group - defined only when it is synced to a numbered group. */
  scrollGroupId?: ScrollGroupId;
  /** The tab's project id (from its WebViewDefinition). */
  projectId?: string;
};

/**
 * Reads a WebView's saved definition, tolerating the brief early-mount window before the dock
 * layout is registered (`getSavedWebViewDefinitionSync` throws then).
 */
function readDefinitionSafely(webViewId: string | undefined) {
  if (!webViewId) return undefined;
  try {
    return getSavedWebViewDefinitionSync(webViewId);
  } catch (e) {
    logger.warn(
      `useActiveTabScrollGroup: could not read WebView definition ${webViewId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * The active scripture tab the main toolbar should follow: the most recently focused WebView tab.
 * Transient `'other'` focus (e.g. clicking the toolbar's own controls) and non-WebView tabs are
 * ignored so the last scripture tab is retained.
 */
export function useActiveTabScrollGroup(): ActiveTabScrollGroup {
  const [focusPossiblyError] = useData(windowService.dataProviderName).Focus(undefined, undefined);

  // The webview id currently focused, or undefined for 'other'/non-webview focus.
  const focusedWebViewId = useMemo(() => {
    if (!focusPossiblyError || isPlatformError(focusPossiblyError)) return undefined;
    if (focusPossiblyError.focusType === 'webView') return focusPossiblyError.id;
    if (focusPossiblyError.focusType === 'tab' && focusPossiblyError.tabType === 'webView')
      return focusPossiblyError.id;
    return undefined;
  }, [focusPossiblyError]);

  // Track the LAST focused webview; ignore transient 'other'/non-webview focus (keep last).
  const [trackedWebViewId, setTrackedWebViewId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (focusedWebViewId !== undefined) setTrackedWebViewId(focusedWebViewId);
  }, [focusedWebViewId]);

  // The tracked tab's saved definition (scrollGroupScrRef + projectId).
  const [definition, setDefinition] = useState(() => readDefinitionSafely(trackedWebViewId));
  useEffect(() => {
    setDefinition(readDefinitionSafely(trackedWebViewId));
  }, [trackedWebViewId]);

  // Ref so the (deps-stable) update handler always sees the current tracked id.
  const trackedWebViewIdRef = useRef(trackedWebViewId);
  trackedWebViewIdRef.current = trackedWebViewId;

  useEvent(
    onDidUpdateWebView,
    useCallback((event: UpdateWebViewEvent) => {
      if (event.webView.id === trackedWebViewIdRef.current)
        setDefinition(readDefinitionSafely(trackedWebViewIdRef.current));
    }, []),
  );

  return useMemo(() => {
    const scrollGroupScrRef = definition?.scrollGroupScrRef;
    return {
      webViewId: trackedWebViewId,
      scrollGroupId: typeof scrollGroupScrRef === 'number' ? scrollGroupScrRef : undefined,
      projectId: definition?.projectId,
    };
  }, [trackedWebViewId, definition]);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/renderer/components/use-active-tab-scroll-group.hook.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Add the "keep last" + reactivity + throw-safety tests**

Append these tests inside the `describe` block in `use-active-tab-scroll-group.hook.test.ts`:

```ts
it('keeps the last active tab when focus moves to "other"', async () => {
  currentFocus = { focusType: 'webView', id: 'wv1' };
  getSavedWebViewDefinitionSync.mockReturnValue({
    id: 'wv1',
    webViewType: 'scriptureEditor',
    scrollGroupScrRef: 2,
    projectId: 'projA',
  });
  const useActiveTabScrollGroup = await importHook();

  const { result, rerender } = renderHook(() => useActiveTabScrollGroup());
  await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

  // Focus leaves all tabs (e.g. user clicked the toolbar) -> keep last.
  currentFocus = { focusType: 'other' };
  rerender();

  expect(result.current).toEqual({ webViewId: 'wv1', scrollGroupId: 2, projectId: 'projA' });
});

it('ignores focus on a non-webview tab (keeps last)', async () => {
  currentFocus = { focusType: 'webView', id: 'wv1' };
  getSavedWebViewDefinitionSync.mockReturnValue({
    id: 'wv1',
    webViewType: 'scriptureEditor',
    scrollGroupScrRef: 2,
    projectId: 'projA',
  });
  const useActiveTabScrollGroup = await importHook();

  const { result, rerender } = renderHook(() => useActiveTabScrollGroup());
  await waitFor(() => expect(result.current.webViewId).toBe('wv1'));

  currentFocus = { focusType: 'tab', tabType: 'someOtherType', id: 'other-tab' };
  rerender();

  expect(result.current.webViewId).toBe('wv1');
});

it('refreshes when the tracked webview definition updates', async () => {
  currentFocus = { focusType: 'webView', id: 'wv1' };
  getSavedWebViewDefinitionSync.mockReturnValue({
    id: 'wv1',
    webViewType: 'scriptureEditor',
    scrollGroupScrRef: 2,
    projectId: 'projA',
  });
  const useActiveTabScrollGroup = await importHook();

  const { result } = renderHook(() => useActiveTabScrollGroup());
  await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

  // The tracked tab is moved to group 4; the update event fires.
  getSavedWebViewDefinitionSync.mockReturnValue({
    id: 'wv1',
    webViewType: 'scriptureEditor',
    scrollGroupScrRef: 4,
    projectId: 'projA',
  });
  act(() => lastWebViewUpdateHandler?.({ webView: { id: 'wv1', webViewType: 'scriptureEditor' } }));

  await waitFor(() => expect(result.current.scrollGroupId).toBe(4));
});

it('ignores update events for other webviews', async () => {
  currentFocus = { focusType: 'webView', id: 'wv1' };
  getSavedWebViewDefinitionSync.mockReturnValue({
    id: 'wv1',
    webViewType: 'scriptureEditor',
    scrollGroupScrRef: 2,
    projectId: 'projA',
  });
  const useActiveTabScrollGroup = await importHook();

  const { result } = renderHook(() => useActiveTabScrollGroup());
  await waitFor(() => expect(result.current.scrollGroupId).toBe(2));

  getSavedWebViewDefinitionSync.mockClear();
  act(() =>
    lastWebViewUpdateHandler?.({ webView: { id: 'other', webViewType: 'scriptureEditor' } }),
  );

  // A different webview's update must not trigger a re-read of the tracked tab.
  expect(getSavedWebViewDefinitionSync).not.toHaveBeenCalled();
  expect(result.current.scrollGroupId).toBe(2);
});

it('does not throw when the definition read throws (dock layout not registered yet)', async () => {
  currentFocus = { focusType: 'webView', id: 'wv1' };
  getSavedWebViewDefinitionSync.mockImplementation(() => {
    throw new Error('papi dock layout has not been registered');
  });
  const useActiveTabScrollGroup = await importHook();

  const { result } = renderHook(() => useActiveTabScrollGroup());

  // webViewId still tracked; group/project simply unresolved.
  await waitFor(() => expect(result.current.webViewId).toBe('wv1'));
  expect(result.current.scrollGroupId).toBeUndefined();
});
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx vitest run src/renderer/components/use-active-tab-scroll-group.hook.test.ts`
Expected: PASS (8 tests). If the reactivity test flakes on effect timing, the `waitFor` wrappers already handle it - do not add fixed delays.

- [ ] **Step 7: Commit**

```bash
git add src/renderer/components/use-active-tab-scroll-group.hook.ts src/renderer/components/use-active-tab-scroll-group.hook.test.ts
git commit -m "feat(PT-2602): add useActiveTabScrollGroup follow-source hook

Toolbar-internal hook exposing the last active scripture tab's scroll
group + project from window focus and the WebView definition, ignoring
transient 'other'/non-webview focus.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Wire the toolbar to follow the active tab

**Files:**

- Modify: `src/renderer/components/platform-bible-toolbar.tsx` (lines ~13-14 imports, ~97-101 hook call; add follow-effect + `effectiveProjectId`)
- Test: `src/renderer/components/platform-bible-toolbar.test.tsx`

**Interfaces:**

- Consumes: `useActiveTabScrollGroup(): ActiveTabScrollGroup` (Task 1); `getScrRefSourceProjectIdSync(scrollGroupId): string | undefined` (`@renderer/services/scroll-group.service-host`).
- Produces: no new exports (behavior change only).

- [ ] **Step 1: Write the failing toolbar tests**

In `src/renderer/components/platform-bible-toolbar.test.tsx`:

(a) Add a mock for the new hook near the other `vi.mock` calls:

```ts
vi.mock('./use-active-tab-scroll-group.hook', () => ({
  useActiveTabScrollGroup: vi.fn(() => ({
    webViewId: undefined,
    scrollGroupId: undefined,
    projectId: undefined,
  })),
}));
```

(b) Extend the existing `@renderer/services/scroll-group.service-host` mock (currently only `availableScrollGroupIds`) to add the source-project getter:

```ts
vi.mock('@renderer/services/scroll-group.service-host', () => ({
  availableScrollGroupIds: [1, 2, 3, 4, 5],
  getScrRefSourceProjectIdSync: vi.fn(() => 'group-source-proj'),
}));
```

(c) Add imports at the top of the test file:

```ts
import { useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import { useActiveTabScrollGroup } from './use-active-tab-scroll-group.hook';
```

(d) Append this describe block at the end of the file:

```ts
describe('PlatformBibleToolbar — follows the active tab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockSendCommand(true);
    vi.mocked(useScrollGroupScrRef).mockReturnValue([
      { book: 1, chapter: 1, verse: 1 },
      vi.fn(),
      0,
      vi.fn(),
    ]);
  });

  it("adopts the active tab's numbered scroll group and passes its project", async () => {
    vi.mocked(useActiveTabScrollGroup).mockReturnValue({
      webViewId: 'wv1',
      scrollGroupId: 2,
      projectId: 'active-proj',
    });

    render(<PlatformBibleToolbar />);

    // Follow-effect adopts group 2; attached (2===2) so the active tab's project is passed.
    await waitFor(() =>
      expect(vi.mocked(useScrollGroupScrRef)).toHaveBeenLastCalledWith(
        2,
        expect.any(Function),
        'active-proj',
      ),
    );
  });

  it('keeps the last group and uses the group source project when the active tab has no numbered group', async () => {
    vi.mocked(useActiveTabScrollGroup).mockReturnValue({
      webViewId: 'settings',
      scrollGroupId: undefined,
      projectId: 'irrelevant',
    });

    render(<PlatformBibleToolbar />);

    // Group stays at the persisted default (0); not attached, so the group's own source is used.
    await waitFor(() =>
      expect(vi.mocked(useScrollGroupScrRef)).toHaveBeenLastCalledWith(
        0,
        expect.any(Function),
        'group-source-proj',
      ),
    );
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/renderer/components/platform-bible-toolbar.test.tsx`
Expected: FAIL - the toolbar still calls `useScrollGroupScrRef(0, fn, currentProject?.id)` (=`'proj-1'`), never adopts group 2, and doesn't import the new hook.

- [ ] **Step 3: Modify the toolbar - imports**

In `src/renderer/components/platform-bible-toolbar.tsx`, change the scroll-group-host import (currently line 14) to add the getter, and add the new hook import:

```ts
import {
  availableScrollGroupIds,
  getScrRefSourceProjectIdSync,
} from '@renderer/services/scroll-group.service-host';
```

Add near the other local component imports (e.g. after the `useProjectPickerData` import):

```ts
import { useActiveTabScrollGroup } from './use-active-tab-scroll-group.hook';
```

- [ ] **Step 4: Modify the toolbar - follow-effect + effectiveProjectId**

Replace the current hook call (lines ~94-101):

```ts
const { currentProject, recentProjects, allProjects, currentProjectError } = useProjectPickerData();

const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
  scrollGroupIdInternal,
  updateScrollGroupIdInternal,
  currentProject?.id,
);
```

with:

```ts
const { recentProjects, allProjects, currentProjectError } = useProjectPickerData();

const activeTab = useActiveTabScrollGroup();

// Follow the active scripture tab: when it is synced to a numbered group, adopt that group.
// Keyed on the active tab's identity so switching to a different tab re-attaches even to the same
// group number; a manual top-bar override therefore holds until the active tab changes.
useEffect(() => {
  if (activeTab.scrollGroupId !== undefined) updateScrollGroupIdInternal(activeTab.scrollGroupId);
}, [activeTab.webViewId, activeTab.scrollGroupId, updateScrollGroupIdInternal]);

// Versification frame for the toolbar BCV. Attached (mirroring the active tab): use the tab's
// project so the toolbar shows the identical ref. Otherwise (manual override / no numbered-group
// tab active): use the driven group's own source project, so display shows the group's raw ref and
// a navigation preserves that source ("move the verse, nothing else").
const attached = scrollGroupIdInternal === activeTab.scrollGroupId;
const effectiveProjectId = attached
  ? activeTab.projectId
  : getScrRefSourceProjectIdSync(scrollGroupIdInternal);

const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
  scrollGroupIdInternal,
  updateScrollGroupIdInternal,
  effectiveProjectId,
);
```

Note: `currentProject` was only used for the removed `projectId` argument here; the project **picker** UI still uses `recentProjects`/`allProjects`. If TypeScript flags `currentProject` as now-unused elsewhere, confirm and remove only that destructured field. (`useEffect` is already imported at line 49.)

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/renderer/components/platform-bible-toolbar.test.tsx`
Expected: PASS - including the two new tests and the pre-existing suites (Sync button, scroll-group visibility, project picker visibility).

- [ ] **Step 6: Typecheck the touched files**

Run: `npm run typecheck:core`
Expected: PASS with no errors. Fix any `currentProject`-unused or type errors inline.

- [ ] **Step 7: Commit**

```bash
git add src/renderer/components/platform-bible-toolbar.tsx src/renderer/components/platform-bible-toolbar.test.tsx
git commit -m "feat(PT-2602): main toolbar follows the active tab's scroll group

The toolbar adopts the active scripture tab's numbered scroll group and
renders its BCV in the active tab's versification (via the #2478
projectId), keeping the last group when the active tab has none.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Whole-branch verification

**Files:** none (verification only; commit only if the formatter changes files).

- [ ] **Step 1: Typecheck the whole repo**

Run: `npm run typecheck`
Expected: PASS, 0 errors.

- [ ] **Step 2: Lint the whole repo**

Run: `npm run lint`
Expected: 0 errors. Fix any inline (do not blanket-disable rules - see eslint-disable-discipline). Re-run until clean.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: all suites pass, 0 failed. (If the pre-existing, known-flaky `use-project-picker-data.hook.test.ts` flakes, re-run that file; it is unrelated to this change.)

- [ ] **Step 4: Format**

Run: `npm run format`
Expected: no changes, or only formatting of the files this branch touched.

- [ ] **Step 5: Commit any formatting changes (only if `git status` is non-empty)**

```bash
git add -A
git commit -m "style(PT-2602): formatting after toolbar follow-active-tab change

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Manual / visual verification (record the result)**

With two projects of different versifications open in one scroll group (reuse #2478's setup), in **power mode**:

1. Focus the tab on group A -> the top toolbar shows group A and the same reference that tab shows (verify at a divergence point, e.g. a Psalm heading).
2. Focus a tab on group C -> the toolbar switches to group C and that tab's reference.
3. Change the top-bar scroll-group selector to a different group -> the active tab is **not** re-grouped; focus a different scripture tab -> the toolbar re-attaches.
4. Focus a non-scripture WebView -> the toolbar keeps the last group.

Note: automated coverage stops at the hook + toolbar seams (mocked PAPI); this manual pass is what confirms the end-to-end versification display. Record pass/fail in the PR description.

---

## Self-Review

**Spec coverage:**

- Read direction (follow active tab's group) -> Task 2 Step 4 follow-effect; Task 2 test (a).
- Versification (active tab's project) -> Task 2 `effectiveProjectId` attached branch; Task 2 test (a) asserts `'active-proj'`.
- Override / no-active-group projectId (group source) -> Task 2 `effectiveProjectId` else branch; Task 2 test (b).
- Keep-last -> Task 1 focus tracking + `scrollGroupId: undefined` for independent/no-group tabs; Task 2 test (b) group stays 0.
- Focus -> 'other' handling -> Task 1 "keep last" test; toolbar re-attach keyed on `webViewId`.
- Reactivity to the active tab's own group change -> Task 1 `onDidUpdateWebView` test.
- Non-destructive top selector / "move the verse, nothing else" -> no write-back from the toolbar (Task 2 change adds none); override branch preserves source via `getScrRefSourceProjectIdSync`. (Full override-navigate behavior is exercised by #2478's own `useScrollGroupScrRef` tests plus the Task 3 manual pass.)
- Simple vs power mode -> unchanged gating; read-direction applies in both (follow-effect is mode-agnostic); selector still power-only.

**Placeholder scan:** none - every code/test step contains full content and exact commands.

**Type consistency:** `ActiveTabScrollGroup` / `useActiveTabScrollGroup` names match between Task 1 (produced) and Task 2 (consumed); `getScrRefSourceProjectIdSync`, `useScrollGroupScrRef`, `effectiveProjectId` used consistently; the hook's `{ webViewId, scrollGroupId, projectId }` shape matches the toolbar's usage.
