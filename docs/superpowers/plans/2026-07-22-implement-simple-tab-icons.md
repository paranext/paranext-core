# PT-4208: Icon-Only Simple-Mode Tab Headers — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Simple mode's Resources & Tools column (Bible Texts, Commentaries, Comments) tab
icons matching Text Collection's existing convention, restyle the tab strip to match a reference
screenshot, make tabs shrink from icon+title to icon-only as the column narrows, and give each of
those three tabs an explicit hover tooltip so its name stays discoverable once its title is
hidden — all Simple-mode only, Power mode unchanged.

**Architecture:** A new shared `platform-bible-react` hook (`useTabIconSelection`) absorbs the
selection-detection + variant-picking logic already used by the Text Collection tab so three more
call sites (Bible Texts, Commentaries, Comments — two different extensions) don't duplicate it. New
Lucide SVG icon assets (4 theme/selection variants each) go in each owning extension's `assets/`
folder. Each of those three tabs also gets an explicit `tooltip` mirroring its title, matching Text
Collection's existing convention (no `PlatformTabTitle` changes needed).
`platform-tab-title.component.scss`/`.tsx` get the responsive CSS (container queries) for the
icon+title → icon-only shrink. `dock-layout-wrapper.component.scss` gets the shrink override and
screenshot-matching style pass, all scoped under the existing `[data-interface-mode='simple']`
convention.

**Tech Stack:** React, TypeScript, SCSS (CSS container queries), Vitest + React Testing Library,
PAPI (`@papi/frontend`), rc-dock.

## Global Constraints

- Every behavior/style change in this plan is Simple-mode only. Power mode must render and behave
  exactly as it does today — this is the single most important constraint across every task.
- New tab icons are Lucide's stock outline SVGs: 24×24 viewBox, `stroke-width="2"`,
  `stroke-linecap="round"`, `stroke-linejoin="round"`, `class="lucide lucide-<name>"`, matching
  `extensions/src/platform-scripture-editor/assets/library.svg` exactly except for the icon path
  data and the 4 stroke colors below.
- 4 stroke-color variants per icon: `<icon>.svg` = `#64748b`, `<icon>-dark.svg` = `#cbd5e1`,
  `<icon>-selected.svg` = `#ffffff`, `<icon>-unselected.svg` = `#0f172a`.
- `platform-bible-react` must not gain a dependency on `@papi/frontend` — it has none today. Only
  DOM-only logic (iframe `offsetParent` polling, variant picking) moves into the shared hook; each
  extension keeps its own `papi.themes.subscribeCurrentTheme` call.
- Run `npm test -- <changed test file> --watch=false` after every test-bearing step; run
  `npm run lint` before every commit (per this repo's lint-sweep-verification rule).

---

### Task 1: Shared `useTabIconSelection` hook in `platform-bible-react`

**Files:**

- Create: `lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.ts`
- Create: `lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.test.ts`
- Modify: `lib/platform-bible-react/src/index.ts:292` (add exports after the `useViewVisibility` export)

**Interfaces:**

- Produces: `TabIconUrls` type (`{ dark: string; lightSelected: string; lightUnselected: string; lightDefault: string }`), `pickTabIconUrl(isDarkTheme: boolean, isTabSelected: boolean | undefined, urls: TabIconUrls): string`, `useTabIconSelection(isDarkTheme: boolean, tabIconUrls: TabIconUrls): string` — all exported from `'platform-bible-react'`. Later tasks (2, 3, 4) consume these three names.

- [ ] **Step 1: Write the failing test**

```ts
// lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.test.ts
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  pickTabIconUrl,
  useTabIconSelection,
  type TabIconUrls,
} from './use-tab-icon-selection.hook';

const URLS: TabIconUrls = {
  dark: 'papi-extension://ext/assets/icon-dark.svg',
  lightSelected: 'papi-extension://ext/assets/icon-selected.svg',
  lightUnselected: 'papi-extension://ext/assets/icon-unselected.svg',
  lightDefault: 'papi-extension://ext/assets/icon.svg',
};

describe('pickTabIconUrl', () => {
  it('always returns the dark variant in dark theme, regardless of selection', () => {
    expect(pickTabIconUrl(true, true, URLS)).toBe(URLS.dark);
    expect(pickTabIconUrl(true, false, URLS)).toBe(URLS.dark);
    expect(pickTabIconUrl(true, undefined, URLS)).toBe(URLS.dark);
  });

  it('returns lightSelected/lightUnselected/lightDefault by selection state in light theme', () => {
    expect(pickTabIconUrl(false, true, URLS)).toBe(URLS.lightSelected);
    expect(pickTabIconUrl(false, false, URLS)).toBe(URLS.lightUnselected);
    expect(pickTabIconUrl(false, undefined, URLS)).toBe(URLS.lightDefault);
  });
});

describe('useTabIconSelection', () => {
  let frameElement: HTMLElement | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    frameElement = document.createElement('iframe');
    Object.defineProperty(window, 'frameElement', {
      configurable: true,
      get: () => frameElement,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('falls back to lightDefault before the first selection poll resolves anything conclusive', () => {
    // No offsetParent getter defined on frameElement yet: offsetParent reads as null/undefined-ish,
    // but frameElement itself is a valid HTMLElement, so the very first poll (fired synchronously by
    // the effect) already resolves a concrete false. This case models frameElement being entirely
    // unavailable (e.g. not inside an iframe), which the hook treats as "selection unknown".
    frameElement = undefined;
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    expect(result.current).toBe(URLS.lightDefault);
  });

  it('resolves to lightSelected once the iframe has an offsetParent', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      value: document.createElement('div'),
    });
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(URLS.lightSelected);
  });

  it('resolves to lightUnselected once the iframe has no offsetParent', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      // eslint-disable-next-line no-null/no-null
      value: null,
    });
    const { result } = renderHook(() => useTabIconSelection(false, URLS));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(URLS.lightUnselected);
  });

  it('returns the dark variant immediately when isDarkTheme is true, regardless of selection polling', () => {
    Object.defineProperty(frameElement, 'offsetParent', {
      configurable: true,
      // eslint-disable-next-line no-null/no-null
      value: null,
    });
    const { result } = renderHook(() => useTabIconSelection(true, URLS));
    expect(result.current).toBe(URLS.dark);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.test.ts --watch=false`
Expected: FAIL — `Cannot find module './use-tab-icon-selection.hook'`

- [ ] **Step 3: Write the implementation**

```ts
// lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.ts
import { useEffect, useState } from 'react';

/** The four tab-icon variants, as static asset URLs (e.g. `papi-extension://` URLs). */
export type TabIconUrls = {
  /** Dark theme (any selection). */
  dark: string;
  /** Light theme, tab selected (white). */
  lightSelected: string;
  /** Light theme, tab not selected (near-black). */
  lightUnselected: string;
  /** Light theme, selection unknown (mid-slate fallback). */
  lightDefault: string;
};

/**
 * Picks the tab icon URL. In dark theme the icon is always the light variant. In light theme it
 * matches the tab text: near-black when unselected, white when selected, and a mid-slate fallback
 * when the selected state is unknown (`undefined`).
 */
export function pickTabIconUrl(
  isDarkTheme: boolean,
  isTabSelected: boolean | undefined,
  urls: TabIconUrls,
): string {
  if (isDarkTheme) return urls.dark;
  if (isTabSelected === true) return urls.lightSelected;
  if (isTabSelected === false) return urls.lightUnselected;
  return urls.lightDefault;
}

/**
 * Resolves which tab-icon variant a web view tab should show, given the current theme and this
 * tab's live selected state.
 *
 * The tab icon is painted by the platform as a static CSS `background-image`, so a `currentColor`
 * SVG can't follow the theme or selection state — callers must swap the actual icon URL. This hook
 * detects selection by polling whether this web view's iframe has an `offsetParent` (rc-dock hides
 * an inactive tab's pane with `display: none`, which clears `offsetParent`); rc-dock fires no event
 * reachable from inside the iframe on tab switches, so polling is the only option.
 *
 * Callers own the theme subscription themselves (e.g. `papi.themes.subscribeCurrentTheme`) and pass
 * the resulting `isDarkTheme` in — this hook has no PAPI dependency.
 *
 * @param isDarkTheme Whether the current theme is dark.
 * @param tabIconUrls The four icon variant URLs for this tab.
 * @returns The icon URL to pass to `updateWebViewDefinition({ iconUrl })`.
 */
export function useTabIconSelection(isDarkTheme: boolean, tabIconUrls: TabIconUrls): string {
  const [isTabSelected, setIsTabSelected] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const read = (): boolean | undefined => {
      try {
        const { frameElement } = window;
        if (!(frameElement instanceof HTMLElement)) return undefined;
        return !!frameElement.offsetParent;
      } catch {
        return undefined;
      }
    };
    const update = () =>
      setIsTabSelected((prev) => {
        const next = read();
        return prev === next ? prev : next;
      });
    update();
    // rc-dock fires no event we can hook from inside the iframe on tab switches, so poll cheaply.
    const id = window.setInterval(update, 500);
    return () => window.clearInterval(id);
  }, []);

  return pickTabIconUrl(isDarkTheme, isTabSelected, tabIconUrls);
}

export default useTabIconSelection;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.test.ts --watch=false`
Expected: PASS (7 tests)

- [ ] **Step 5: Export from the package index**

In `lib/platform-bible-react/src/index.ts`, immediately after line 292
(`export { useViewVisibility } from './hooks/use-view-visibility.hook';`), add:

```ts
export {
  pickTabIconUrl,
  useTabIconSelection,
  type TabIconUrls,
} from './hooks/use-tab-icon-selection.hook';
```

- [ ] **Step 6: Build the package so extensions can resolve the new export**

Run: `npm run build --workspace=platform-bible-react` (or the repo's standard `npm run build:types`/`npm run build` if that workspace has no standalone build script — check `lib/platform-bible-react/package.json` `scripts` first with `cat lib/platform-bible-react/package.json | grep -A 15 '"scripts"'` and use whichever script actually builds/typechecks the package)
Expected: builds with no errors

- [ ] **Step 7: Commit**

```bash
git add lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.ts \
        lib/platform-bible-react/src/hooks/use-tab-icon-selection.hook.test.ts \
        lib/platform-bible-react/src/index.ts
git commit -m "feat(platform-bible-react): add useTabIconSelection hook for theme/selection-adaptive tab icons"
```

---

### Task 2: Migrate Text Collection's grid tab to the shared hook

**Files:**

- Modify: `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx:61,107-112,294-345`
- Delete: `extensions/src/platform-scripture-editor/src/scripture-text-grid/tab-icon.util.ts`
- Delete: `extensions/src/platform-scripture-editor/src/scripture-text-grid/tab-icon.util.test.ts`

**Interfaces:**

- Consumes: `useTabIconSelection`, `TabIconUrls` from Task 1 (`'platform-bible-react'`).
- Produces: no new interface — behavior must be pixel/logic-identical to before this task (pure refactor).

- [ ] **Step 1: Replace the import**

In `scripture-text-grid.web-view.tsx`, change line 61 from:

```ts
import { pickTabIconUrl, type TabIconUrls } from './scripture-text-grid/tab-icon.util';
```

to (add to the existing `'platform-bible-react'` import block near the top of the file rather than
introducing a second import statement — locate the existing `import { ... } from 'platform-bible-react';`
in this file and add `useTabIconSelection, type TabIconUrls` to its named imports):

```ts
import {
  // ...existing named imports in this file's platform-bible-react import...
  useTabIconSelection,
  type TabIconUrls,
} from 'platform-bible-react';
```

- [ ] **Step 2: Replace the theme/selection/pick block with the shared hook**

Replace lines 294–345 (the `isDarkTheme` state + subscribe effect, the `isTabSelected` state +
polling effect, and the `updateWebViewDefinition({ iconUrl: pickTabIconUrl(...) })` effect) with:

```ts
// Pick the tab icon variant to match the current theme and selected state. The tab icon is
// painted by the platform as a static background-image, so a `currentColor` SVG can't follow the
// theme — subscribe to the theme here (PAPI-specific) and let the shared hook handle selection
// detection and variant picking.
const [isDarkTheme, setIsDarkTheme] = useState(false);
useEffect(() => {
  let disposed = false;
  let unsubscribe: (() => void) | undefined;
  papi.themes
    .subscribeCurrentTheme(undefined, (theme) => {
      if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
    })
    .then((unsub) => {
      if (disposed) unsub();
      else unsubscribe = unsub;
      return undefined;
    })
    .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
  return () => {
    disposed = true;
    unsubscribe?.();
  };
}, []);

const gridIconUrl = useTabIconSelection(isDarkTheme, TAB_ICON_URLS);
useEffect(() => {
  updateWebViewDefinition({ iconUrl: gridIconUrl });
}, [gridIconUrl, updateWebViewDefinition]);
```

(This keeps the theme-subscribe effect exactly as it was — only the selection-polling and pick call
move into the shared hook.)

- [ ] **Step 3: Delete the now-unused local util and its test**

```bash
git rm extensions/src/platform-scripture-editor/src/scripture-text-grid/tab-icon.util.ts \
       extensions/src/platform-scripture-editor/src/scripture-text-grid/tab-icon.util.test.ts
```

- [ ] **Step 4: Typecheck and lint**

Run: `npm run lint -- extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`
Expected: no errors (fix any import-order/unused-import issues if `eslint --fix` doesn't clear them)

- [ ] **Step 5: Manually verify no behavior change**

Per the app-runner/visual-verification skills: start the app, open Simple mode, confirm the Text
Collection tab's icon still swaps correctly between light/dark themes and selected/unselected
states exactly as before this refactor (no test harness exists for this web view component today —
this is a pure logic move, not new behavior).

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx
git commit -m "refactor: migrate Text Collection tab icon to shared useTabIconSelection hook"
```

---

### Task 3: Bible Texts (`book-open`) and Commentaries (`file-text`) tab icons

**Files:**

- Create: `extensions/src/platform-scripture-editor/assets/book-open.svg` (+ `-dark`, `-selected`, `-unselected`)
- Create: `extensions/src/platform-scripture-editor/assets/file-text.svg` (+ `-dark`, `-selected`, `-unselected`)
- Modify: `extensions/src/platform-scripture-editor/src/main.ts:991-1040` (`createResourceTextPanelProvider`)
- Modify: `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx`

**Interfaces:**

- Consumes: `useTabIconSelection`, `TabIconUrls` (Task 1, `'platform-bible-react'`).
- Produces: no new exported interface (internal wiring only).

- [ ] **Step 1: Create the `book-open` icon assets**

`extensions/src/platform-scripture-editor/assets/book-open.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open">
  <path d="M12 7v14"/>
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/book-open-dark.svg` (same paths, `stroke="#cbd5e1"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open">
  <path d="M12 7v14"/>
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/book-open-selected.svg` (`stroke="#ffffff"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open">
  <path d="M12 7v14"/>
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/book-open-unselected.svg` (`stroke="#0f172a"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open">
  <path d="M12 7v14"/>
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
</svg>
```

- [ ] **Step 2: Create the `file-text` icon assets**

`extensions/src/platform-scripture-editor/assets/file-text.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text">
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  <path d="M10 9H8"/>
  <path d="M16 13H8"/>
  <path d="M16 17H8"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/file-text-dark.svg` (`stroke="#cbd5e1"`, same paths):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text">
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  <path d="M10 9H8"/>
  <path d="M16 13H8"/>
  <path d="M16 17H8"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/file-text-selected.svg` (`stroke="#ffffff"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text">
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  <path d="M10 9H8"/>
  <path d="M16 13H8"/>
  <path d="M16 17H8"/>
</svg>
```

`extensions/src/platform-scripture-editor/assets/file-text-unselected.svg` (`stroke="#0f172a"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text">
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  <path d="M10 9H8"/>
  <path d="M16 13H8"/>
  <path d="M16 17H8"/>
</svg>
```

- [ ] **Step 3: Gate the initial `iconUrl` in `createResourceTextPanelProvider` on Simple mode**

In `extensions/src/platform-scripture-editor/src/main.ts`, change `createResourceTextPanelProvider`
(lines 991-1028) to read `interfaceMode` (same pattern as `scriptureTextGridWebViewProvider`'s
`scrollGroupScrRef` gating) and add a default `iconUrl` parameter per icon set:

```ts
function createResourceTextPanelProvider(
  webViewType: string,
  title: string,
  resourceType: Extract<ResourceType, 'ScriptureResource' | 'CommentaryResource'>,
  defaultIconUrl: string,
): IWebViewProvider {
  return {
    async getWebView(
      savedWebView: SavedWebViewDefinition,
      openWebViewOptions: ResourceViewerOptions,
    ): Promise<WebViewDefinition | undefined> {
      if (savedWebView.webViewType !== webViewType)
        throw new Error(
          `${webViewType} provider received request to provide a ${
            savedWebView.webViewType
          } web view`,
        );
      // Priority: pending (reload path) > options (new-panel path) > saved (existing panel reload)
      const projectId = currentResourceTextPanelProjectIds.has(webViewType)
        ? currentResourceTextPanelProjectIds.get(webViewType)
        : (openWebViewOptions.projectId ?? savedWebView.projectId);
      currentResourceTextPanelProjectIds.delete(webViewType);
      // Re-read every call so mode changes are picked up at open/replace/restore time.
      const interfaceMode = await papi.settings.get('platform.interfaceMode');
      // Intentionally does not force scrollGroupScrRef in simple mode. Bible texts and
      // commentaries are read-only reference panels that navigate independently; they are
      // not scroll-synced with the scripture editor in simple mode.
      return {
        ...savedWebView,
        title,
        projectId,
        content: resourceTextPanelWebView,
        styles: resourceTextPanelWebViewStyles,
        // Icon-only tab in Simple mode only — Power mode keeps showing this tab with no icon,
        // exactly as today, since it is text-labeled there (see resource-text-panel.web-view.tsx
        // for the live theme/selection-adaptive swap, which is likewise gated on Power mode).
        iconUrl: interfaceMode === 'simple' ? defaultIconUrl : savedWebView.iconUrl,
        state: {
          ...savedWebView.state,
          resourceType,
        },
      };
    },
  };
}

const bibleTextsPanelWebViewProvider: IWebViewProvider = createResourceTextPanelProvider(
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  '%webView_resourcePanel_bibleTexts_title%',
  'ScriptureResource',
  'papi-extension://platformScriptureEditor/assets/book-open.svg',
);

const commentariesPanelWebViewProvider: IWebViewProvider = createResourceTextPanelProvider(
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  '%webView_resourcePanel_commentaries_title%',
  'CommentaryResource',
  'papi-extension://platformScriptureEditor/assets/file-text.svg',
);
```

- [ ] **Step 4: Add the live theme/selection-adaptive icon swap to `resource-text-panel.web-view.tsx`, gated on Power mode**

In `resource-text-panel.web-view.tsx`, add to the existing imports:

```ts
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner,
  usePromise,
  useExtraValidMarkers,
  useTabIconSelection,
  type TabIconUrls,
} from 'platform-bible-react';
```

and to the `@papi/frontend/react` import, add `useSetting`:

```ts
import {
  useDataProvider,
  useDialogCallback,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useSetting,
} from '@papi/frontend/react';
```

Add near the top of the file, alongside `RESOURCE_PANEL_STRING_KEYS`:

```ts
const BIBLE_TEXTS_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformScriptureEditor/assets/book-open.svg',
  dark: 'papi-extension://platformScriptureEditor/assets/book-open-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/book-open-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/book-open-unselected.svg',
};

const COMMENTARIES_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformScriptureEditor/assets/file-text.svg',
  dark: 'papi-extension://platformScriptureEditor/assets/file-text-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/file-text-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/file-text-unselected.svg',
};
```

Inside `ResourceTextPanel`, immediately after the existing `resourceType`/`selectedResourceId`
"Web view state" region (after line 148 in the pre-change file, i.e. right after that region's
closing `// #endregion`), add:

```ts
// #region Tab icon (Simple mode only — Power mode keeps this tab text-only, as today)

const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
const isPowerMode = useMemo(() => {
  if (isPlatformError(interfaceModePossiblyError)) {
    logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
    return false;
  }
  return interfaceModePossiblyError === 'power';
}, [interfaceModePossiblyError]);

const [isDarkTheme, setIsDarkTheme] = useState(false);
useEffect(() => {
  let disposed = false;
  let unsubscribe: (() => void) | undefined;
  papi.themes
    .subscribeCurrentTheme(undefined, (theme) => {
      if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
    })
    .then((unsub) => {
      if (disposed) unsub();
      else unsubscribe = unsub;
      return undefined;
    })
    .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
  return () => {
    disposed = true;
    unsubscribe?.();
  };
}, []);

const tabIconUrls =
  resourceType === 'ScriptureResource' ? BIBLE_TEXTS_ICON_URLS : COMMENTARIES_ICON_URLS;
const tabIconUrl = useTabIconSelection(isDarkTheme, tabIconUrls);
useEffect(() => {
  // Power mode: no tab icon, exactly as today — do not call updateWebViewDefinition at all so an
  // already-set iconUrl (there shouldn't be one) is never touched.
  if (isPowerMode) return;
  updateWebViewDefinition({ iconUrl: tabIconUrl });
}, [isPowerMode, tabIconUrl, updateWebViewDefinition]);

// #endregion
```

Add `updateWebViewDefinition` to the component's destructured `WebViewProps` (it is not currently
destructured in this file):

```ts
globalThis.webViewComponent = function ResourceTextPanel({
  projectId,
  updateWebViewDefinition,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
```

- [ ] **Step 5: Set an explicit tooltip mirroring the title (no `PlatformTabTitle` change needed)**

In `resource-text-panel.web-view.tsx`, find the existing title-resolution effect (the one that
calls `updateWebViewDefinition({ title: ... })` based on `baseTitle`/`resourceShortName`) and
extend it to also set `tooltip` to the identical resolved string, so the hover tooltip always
mirrors whatever the tab's title currently is — this is the mechanism that makes the tab's name
discoverable on hover once Task 5 shrinks it to icon-only, matching Text Collection's existing
`tooltip: localizedStrings[TITLE_KEY]` convention instead of adding any new code path to
`PlatformTabTitle`:

```ts
useEffect(() => {
  const baseTitle = localizedStrings[titleKey];
  if (!baseTitle) return;
  if (resourceShortName) {
    const resolvedTitle = formatReplacementString(localizedStrings[titleWithResourceKey], {
      textName: resourceShortName,
    });
    updateWebViewDefinition({ title: resolvedTitle, tooltip: resolvedTitle });
  } else {
    updateWebViewDefinition({ title: baseTitle, tooltip: baseTitle });
  }
}, [resourceShortName, localizedStrings, titleKey, titleWithResourceKey, updateWebViewDefinition]);
```

- [ ] **Step 6: Typecheck and lint**

Run: `npm run lint -- extensions/src/platform-scripture-editor/src/main.ts extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx`
Expected: no errors

- [ ] **Step 7: Manually verify**

Start the app in Simple mode: Bible Texts shows a `book-open` icon, Commentaries shows a
`file-text` icon, both swap correctly with theme and selection, exactly like Text Collection.
Hover each tab (at both full width and, after Task 5, icon-only width) and confirm the tooltip
shows the current title text. Switch to Power mode (or trigger these panels there if reachable) and
confirm no icon or tooltip appears — text-only, as before this change.

- [ ] **Step 8: Commit**

```bash
git add extensions/src/platform-scripture-editor/assets/book-open*.svg \
        extensions/src/platform-scripture-editor/assets/file-text*.svg \
        extensions/src/platform-scripture-editor/src/main.ts \
        extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx
git commit -m "feat: add Bible Texts (book-open) and Commentaries (file-text) tab icons + tooltip, Simple mode only"
```

---

### Task 4: Comments tab icon (`message-square`)

**Files:**

- Create: `extensions/src/legacy-comment-manager/assets/message-square.svg` (+ `-dark`, `-selected`, `-unselected`)
- Modify: `extensions/src/legacy-comment-manager/src/comment-list-panel-web-view.factory.ts`
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`

**Interfaces:**

- Consumes: `useTabIconSelection`, `TabIconUrls` (Task 1, `'platform-bible-react'`).
- Produces: no new exported interface.

- [ ] **Step 1: Create the `message-square` icon assets**

`extensions/src/legacy-comment-manager/assets/message-square.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
```

`extensions/src/legacy-comment-manager/assets/message-square-dark.svg` (`stroke="#cbd5e1"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
```

`extensions/src/legacy-comment-manager/assets/message-square-selected.svg` (`stroke="#ffffff"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
```

`extensions/src/legacy-comment-manager/assets/message-square-unselected.svg` (`stroke="#0f172a"`):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
```

- [ ] **Step 2: Gate the initial `iconUrl` in `CommentListPanelWebViewFactory` on Simple mode, and set an explicit `tooltip`**

In `extensions/src/legacy-comment-manager/src/comment-list-panel-web-view.factory.ts`, in
`getWebViewDefinition` (the method that already reads `interfaceMode` for `scrollGroupScrRef`),
add `iconUrl` and `tooltip`. Unlike Bible Texts/Commentaries, this panel's `title` never changes
after open, so `tooltip: title` set once here (no separate live-updating effect needed) mirrors
Text Collection's convention just as directly:

```ts
return {
  ...savedWebView,
  title,
  // Mirrors the title so the tab's name is discoverable on hover once Task 5 shrinks it to
  // icon-only — matches Text Collection's existing tooltip convention; no PlatformTabTitle
  // change needed.
  tooltip: title,
  projectId,
  content: commentListWebView,
  styles: tailwindStyles,
  // Icon-only tab in Simple mode only — Power mode keeps showing this tab with no icon,
  // exactly as today (see comment-list.web-view.tsx for the live theme/selection-adaptive
  // swap, likewise gated on Power mode).
  iconUrl:
    interfaceMode === 'simple'
      ? 'papi-extension://legacyCommentManager/assets/message-square.svg'
      : savedWebView.iconUrl,
  // In simple mode, force the comments panel to scroll group 0 so it stays verse-synced with
  // the Scripture editor (which is also forced to 0 in simple mode). Power mode preserves the
  // saved value. Without this, a persisted non-zero scroll group (e.g. set while in power
  // mode) would survive into simple mode and detach the panel from the editor's navigation.
  scrollGroupScrRef: interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef,
};
```

- [ ] **Step 3: Add the live theme/selection-adaptive icon swap to `comment-list.web-view.tsx`, gated on Power mode AND on being the panel variant**

Add to the existing `'platform-bible-react'` import in `comment-list.web-view.tsx`:

```ts
import {
  AddCommentToThreadOptions,
  COMMENT_LIST_ELEMENT_ID,
  COMMENT_LIST_STRING_KEYS,
  CONFLICT_NOTE_STRING_KEYS,
  ConflictResolution,
  ConflictResolutionOptions,
  getCommentThreadElementId,
  Sonner,
  sonner,
  usePromise,
  useTabIconSelection,
  useViewVisibility,
  type TabIconUrls,
} from 'platform-bible-react';
```

Add `useSetting` to the existing `@papi/frontend/react` import:

```ts
import {
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useSetting,
  useWebViewController,
} from '@papi/frontend/react';
```

`isPlatformError` and `getErrorMessage` — check whether both are already imported from
`platform-bible-utils` in this file (the current import is `import { isPlatformError,
LegacyCommentThread, serialize } from 'platform-bible-utils';` — `getErrorMessage` is missing and
must be added):

```ts
import {
  getErrorMessage,
  isPlatformError,
  LegacyCommentThread,
  serialize,
} from 'platform-bible-utils';
```

Add near the top of the file (module scope, alongside `DEFAULT_LEGACY_COMMENT_THREADS`):

```ts
const COMMENT_LIST_PANEL_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://legacyCommentManager/assets/message-square.svg',
  dark: 'papi-extension://legacyCommentManager/assets/message-square-dark.svg',
  lightSelected: 'papi-extension://legacyCommentManager/assets/message-square-selected.svg',
  lightUnselected: 'papi-extension://legacyCommentManager/assets/message-square-unselected.svg',
};
```

Add `updateWebViewDefinition` to the destructured `WebViewProps`:

```ts
global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  useWebViewState,
  projectId,
  updateWebViewDefinition,
  webViewType,
}: WebViewProps) {
```

Immediately after the existing `isCommentListPanel` line, add:

```ts
// #region Tab icon (Simple mode only, Comment List panel only — Power mode and the non-panel
// comment-list web view type both keep this tab/view text-only, as today)

const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
const isPowerMode = useMemo(() => {
  if (isPlatformError(interfaceModePossiblyError)) {
    logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
    return false;
  }
  return interfaceModePossiblyError === 'power';
}, [interfaceModePossiblyError]);

const [isDarkTheme, setIsDarkTheme] = useState(false);
useEffect(() => {
  let disposed = false;
  let unsubscribe: (() => void) | undefined;
  papi.themes
    .subscribeCurrentTheme(undefined, (theme) => {
      if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
    })
    .then((unsub) => {
      if (disposed) unsub();
      else unsubscribe = unsub;
      return undefined;
    })
    .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
  return () => {
    disposed = true;
    unsubscribe?.();
  };
}, []);

const commentListPanelIconUrl = useTabIconSelection(isDarkTheme, COMMENT_LIST_PANEL_ICON_URLS);
useEffect(() => {
  if (isPowerMode || !isCommentListPanel) return;
  updateWebViewDefinition({ iconUrl: commentListPanelIconUrl });
}, [isPowerMode, isCommentListPanel, commentListPanelIconUrl, updateWebViewDefinition]);

// #endregion
```

- [ ] **Step 4: Typecheck and lint**

Run: `npm run lint -- extensions/src/legacy-comment-manager/src/comment-list-panel-web-view.factory.ts extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`
Expected: no errors

- [ ] **Step 5: Manually verify**

Start the app in Simple mode: Comments tab shows a `message-square` icon, swaps with theme/
selection, and hovering the tab (at both full width and, after Task 5, icon-only width) shows a
tooltip with the panel's title. Confirm Power mode's comment-list web view (if reachable) and any
non-panel usage of `CommentListWebView` show no icon and no tooltip.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/legacy-comment-manager/assets/message-square*.svg \
        extensions/src/legacy-comment-manager/src/comment-list-panel-web-view.factory.ts \
        extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx
git commit -m "feat: add Comments tab icon (message-square) + tooltip, Simple mode only"
```

---

### Task 5: Responsive density — icon+title shrinks to icon-only per tab

**Files:**

- Modify: `src/renderer/components/docking/platform-tab-title.component.scss`
- Modify: `src/renderer/components/docking/dock-layout-wrapper.component.scss`

**Interfaces:**

- Consumes: existing `.platform-tab-title` markup from `platform-tab-title.component.tsx` (icon `span` + title `span`, unchanged by this task).
- Produces: no new TS/JS interface — CSS-only.

**Note:** per the spec, CSS container-query behavior cannot be meaningfully unit-tested in jsdom.
This task's verification step is manual (visual-verification skill), not an automated test — that
is a deliberate, documented gap, not an oversight.

- [ ] **Step 1: Make Simple-mode tabs shrinkable**

In `dock-layout-wrapper.component.scss`, inside the existing `[data-interface-mode='simple']`
block (the "SIMPLE-MODE CHROME" region, after the `.dock.dock-top { border-radius: 0; }` rule),
add:

```scss
// Allow tabs to shrink toward an icon-only floor as the column narrows, instead of the
// Power-mode default (`.dock-tab { flex: 1 0 auto; max-width: max-content; }` in the TAB HEADER
// region above), which never shrinks and relies entirely on rc-dock's overflow dropdown.
.dock-panel.dock-style-platform-bible .dock-tab {
  flex: 1 1 auto;
  min-width: 40px;
  max-width: none;
}
```

- [ ] **Step 2: Make the tab title its own container-query context**

In `platform-tab-title.component.scss`, change:

```scss
.platform-tab-title {
  display: flex;
  align-items: center;
  gap: 0.25rem; // tw:gap-1
}
```

to:

```scss
.platform-tab-title {
  display: flex;
  align-items: center;
  gap: 0.25rem; // tw:gap-1

  // Simple mode only: each tab reacts to its own shrinking width (not a shared column/viewport
  // breakpoint) as rc-dock's flex layout squeezes tabs in a narrowing column. Power mode keeps the
  // fixed icon+text layout untouched (no container-type set there).
  [data-interface-mode='simple'] & {
    container-type: inline-size;
  }
}

.platform-tab-title-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
}
```

- [ ] **Step 3: Add the `platform-tab-title-text` class to the title span**

In `platform-tab-title.component.tsx`, find the title `<span>{title}</span>` inside the
`platform-tab-title` div and add the new class:

```tsx
<span className="platform-tab-title-text">{title}</span>
```

(If the pt-3958 `drag-ignore`-aware version is present, this becomes
`className={`platform-tab-title-text ${dragIgnoreClass.trim()}`.trim()}` — keep the existing
`drag-ignore` behavior, just add the new class alongside it.)

- [ ] **Step 4: Add the icon-only breakpoint**

In `platform-tab-title.component.scss`, add:

```scss
@container (max-width: 64px) {
  .platform-tab-title-text {
    display: none;
  }
}
```

(64px is a starting point, not a final value — tune it during Step 6's visual verification against
the actual rendered tab strip; a tab needs roughly icon width + both-side padding to still look
correct once the title is hidden, so adjust the number, not the mechanism, if it clips or triggers
too early/late.)

- [ ] **Step 5: Lint**

Run: `npm run lint -- src/renderer/components/docking/platform-tab-title.component.scss src/renderer/components/docking/platform-tab-title.component.tsx src/renderer/components/docking/dock-layout-wrapper.component.scss`
Expected: no errors

- [ ] **Step 6: Manually verify the responsive behavior AND the rc-dock overflow rabbit hole**

Using the visual-verification skill: start the app in Simple mode, open Column 3 with all three
tabs (Bible Texts, Commentaries, Comments) visible, and narrow the column via the divider:

1. Confirm tabs show icon+title at full width, with the title ellipsis-truncating as the column
   narrows (not yet hidden).
2. Confirm tabs drop to icon-only below the tuned breakpoint, with icons staying centered/readable
   — adjust the breakpoint from Step 4 if the transition looks wrong.
3. **Critical check (the rabbit hole flagged in the spec):** narrow the column further, past the
   point where even 3 icon-only tabs (3 × ~40px min-width) don't fit the strip. Confirm rc-dock's
   built-in "more tabs" overflow dropdown still appears and correctly moves the lowest-priority tab
   into it — do not assume this "just works" once tabs are shrinkable; verify it.
   - If overflow does NOT trigger correctly (e.g. tabs get clipped/hidden with no dropdown, or the
     dropdown never appears because rc-dock's width measurement no longer detects a mismatch): fall
     back to `flex-shrink: 0` with a fixed `min-width` sized to the icon-only floor (remove the
     continuous-shrink behavior; tabs jump from full-width to a fixed icon-only width at one
     breakpoint instead of shrinking continuously) rather than fighting rc-dock's internals further.
4. Confirm Power mode (switch modes or check the equivalent Power-mode tab strip) is completely
   unaffected — tabs still don't shrink at all there (no `container-type`, no shrink override
   applies outside `[data-interface-mode='simple']`).

- [ ] **Step 7: Commit**

```bash
git add src/renderer/components/docking/platform-tab-title.component.scss \
        src/renderer/components/docking/platform-tab-title.component.tsx \
        src/renderer/components/docking/dock-layout-wrapper.component.scss
git commit -m "feat: shrink Simple-mode tabs from icon+title to icon-only via per-tab container queries"
```

---

### Task 6: Visual styling pass to match the reference screenshot

**Files:**

- Modify: `src/renderer/components/docking/dock-layout-wrapper.component.scss`

**Interfaces:**

- Consumes: existing `--tab-background`, `--primary`, `--radius` custom properties already defined in this file.
- Produces: no new interface — visual-only.

- [ ] **Step 1: Compare the running app against the reference screenshot**

Using the visual-verification skill: start the app in Simple mode, screenshot Column 3's tab strip,
and compare side-by-side against the reference screenshot. Note concrete differences (padding,
gap, active-tab background/rounding, icon size) rather than guessing values up front.

- [ ] **Step 2: Adjust padding/spacing on the tab's inner content wrapper**

In `dock-layout-wrapper.component.scss`, the `.dock-tab .drag-initiator` rule (TAB HEADER region)
currently sets:

```scss
.dock-tab .drag-initiator {
  padding-inline: 0.5rem;
  padding-block: vars.$space--xs;
  display: flex;
  flex: auto;
  gap: vars.$space--sm;
}
```

Add a Simple-mode-scoped override immediately after it (inside or alongside the existing
`[data-interface-mode='simple']` block) with adjusted values from Step 1's comparison — starting
point, tune from there:

```scss
[data-interface-mode='simple'] .dock-panel.dock-style-resources .dock-tab .drag-initiator {
  padding-inline: vars.$space--sm;
  gap: vars.$space--xs;
}
```

- [ ] **Step 3: Re-verify against the screenshot and iterate**

Repeat Step 1's screenshot comparison after each adjustment until padding, spacing, and the
active-tab highlight visually match the reference. Do not introduce new colors — only adjust
spacing/sizing values, reusing `--tab-background`/`--primary`/`--radius` as-is.

- [ ] **Step 4: Confirm Power mode is unaffected**

Switch to Power mode and confirm its tab strip padding/spacing is pixel-identical to before this
task (the new rule is scoped to `[data-interface-mode='simple'] .dock-style-resources`, which does
not exist in Power mode's layout).

- [ ] **Step 5: Lint**

Run: `npm run lint -- src/renderer/components/docking/dock-layout-wrapper.component.scss`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/renderer/components/docking/dock-layout-wrapper.component.scss
git commit -m "style: match Simple-mode Column 3 tab spacing to reference icon-only mockup"
```

---

## Final Verification

- [ ] Run the full test suite: `npm test`
- [ ] Run the full lint sweep: `npm run lint` (per this repo's lint-sweep-verification rule — must be zero errors before considering the branch done)
- [ ] Manually re-verify, in one pass, everything in the spec's Definition of Done: all 4 tabs' icons, theme/selection adaptivity, the shared hook has no duplicate copies left (`grep -rn "pickTabIconUrl" extensions/` should show only imports from `platform-bible-react`, no local re-implementations), screenshot-matched styling, icon+title → icon-only responsiveness with rc-dock overflow as the floor, title/tooltip accessibility, and Power mode fully unchanged throughout.
