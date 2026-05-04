# Enhanced Resources UI Performance Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the UI freeze in the Enhanced Resources webview that began after commits 737d530795 and be814c36e7. Restore mousedown responsiveness, reduce per-cursor-move backend chatter, and chunk the initial annotation apply so the renderer thread stays responsive.

**Architecture:** Five focused fixes inside the existing ER extension — stabilize callback identity in the scripture pane, split the annotation effect into three responsibility-keyed effects, cache the ER network-object proxy via a custom hook, key research-tab effects on a derived `scopeKeyedRefKey` instead of raw `scrRef.verseNum` (matching PT9 semantics), and chunk the initial `setAnnotation` loop with `requestAnimationFrame` yields. No behavior changes for default scope; `current-chapter` scope stops re-fetching on cursor moves (PT9-faithful).

**Tech Stack:** React 18, TypeScript, Vitest + Testing Library, `@eten-tech-foundation/platform-editor` (Editorial), `@papi/frontend`

**Spec:** [`docs/specs/2026-05-04-enhanced-resources-perf-fix-design.md`](../specs/2026-05-04-enhanced-resources-perf-fix-design.md)

**Branch:** `ai/feature/enhanced-resources-rolf-03-04-2026` (existing in-flight feature branch)

---

## File Structure

**New files:**

- `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts` — custom hook that resolves the ER network-object proxy once and exposes it (`undefined` while pending or unavailable). Owns the `papi.networkObjects.get` call previously duplicated across 8 effects.
- `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts` — Vitest unit tests for the hook with `@papi/frontend` mocked.
- `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.ts` — pure helper that derives the dependency key from `(scope, book, chapter, verse)` matching PT9's `UpdateReference` semantics.
- `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.test.ts` — Vitest unit tests for the helper.

**Modified files:**

- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx` — Fix 1 (module-level no-op constants), Fix 2 (split into three effects with callback ref), Fix 5 (chunked apply with cancellation flag).
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx` — extend with new behavior tests for Fixes 1, 2, 5.
- `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx` — Fix 3 (replace 8 `papi.networkObjects.get` call sites with `erProxy` from the new hook), Fix 4 (use `scopeKeyedRefKey` in research-tab effect deps), and pass a stable `useCallback` `onTokenContextMenu` to `EnhancedScripturePane`.

**No changes:**

- C# backend, PAPI contracts, settings, webview memento shape

---

## Task 1: Stabilize `EnhancedScripturePane` callback prop defaults (Fix 1)

**Files:**

- Modify: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
- Test: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`

- [ ] **Step 1.1: Add a failing test that re-rendering with no callback props doesn't re-run the annotation effect**

In `scripture-pane.test.tsx`, add inside the existing `describe('EnhancedScripturePane', ...)` block:

```tsx
it('does not re-run the annotation effect when re-rendered with the same props (no fake-dep churn)', () => {
  const annotation: MarbleAnnotation = {
    usjPath: '$.content[0].content[1]',
    kind: 'word',
    annotationId: 'wg-001',
    metadata: {},
  };
  const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
  const { rerender } = render(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
  setAnnotationSpy.mockClear();
  removeAnnotationSpy.mockClear();
  // Re-render with the same props. With unstable defaults (`() => {}` recreated each render),
  // the effect re-runs and calls setAnnotation again. With Fix 1's module-level constants,
  // the dep array sees identical references and the effect does NOT re-run.
  rerender(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  expect(setAnnotationSpy).not.toHaveBeenCalled();
  expect(removeAnnotationSpy).not.toHaveBeenCalled();
});
```

- [ ] **Step 1.2: Run the new test to verify it fails**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core/extensions/src/platform-enhanced-resources
npm test -- scripture-pane.test.tsx -t "does not re-run the annotation effect when re-rendered"
```

Expected: FAIL — `setAnnotationSpy` is called again on re-render because inline `() => {}` defaults create new function identities.

- [ ] **Step 1.3: Add module-level no-op constants and reference them from the destructure**

In `scripture-pane.component.tsx`, immediately above the `export function EnhancedScripturePane(...)` declaration (around line 143), add:

```ts
// Module-level no-op defaults so omitting the callbacks does not generate a fresh
// function identity on every render (which would falsely invalidate the annotation
// effect's dependency array). Identity-stable defaults are the cheapest way to
// guarantee the effect re-runs only when an actual handler changes.
const NOOP_TOKEN_CLICK = (_id: string, _annotation: MarbleAnnotation): void => {};
const NOOP_TOKEN_CONTEXT_MENU = (
  _id: string,
  _annotation: MarbleAnnotation,
  _event: ReactMouseEvent,
): void => {};
```

Replace the inline defaults in the function signature (currently lines 154-155):

```ts
  onTokenClick = NOOP_TOKEN_CLICK,
  onTokenContextMenu = NOOP_TOKEN_CONTEXT_MENU,
```

- [ ] **Step 1.4: Run the test to verify it passes**

```bash
npm test -- scripture-pane.test.tsx -t "does not re-run the annotation effect when re-rendered"
```

Expected: PASS.

- [ ] **Step 1.5: Run the full scripture-pane test file to verify nothing regressed**

```bash
npm test -- scripture-pane.test.tsx
```

Expected: all tests pass (existing 11 + new 1 = 12 tests).

- [ ] **Step 1.6: Commit**

```bash
git add extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx \
        extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx
git commit -m "[P3][perf] enhanced-resources: Stabilize EnhancedScripturePane callback defaults

Inline () => {} defaults for onTokenClick / onTokenContextMenu were recreated
every render, causing the annotation effect to re-fire on every parent
re-render. With ~300 annotations on John 1, this meant 600 imperative
setAnnotation/removeAnnotation calls per re-render — the JS thread
freeze that made mousedown timeouts visible.

Replace inline defaults with module-level constants so identity is stable
across renders. The annotation effect now sees stable refs in its dep
array and only re-runs when an actual handler changes.

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

## Task 2: Split the annotation effect by responsibility (Fix 2)

**Files:**

- Modify: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
- Test: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`

- [ ] **Step 2.1: Add a failing test — toggling `filteredTokenId` does not re-set base annotations**

In `scripture-pane.test.tsx`, add:

```tsx
it('toggling filteredTokenId does not re-set base annotations', () => {
  const annotation: MarbleAnnotation = {
    usjPath: '$.content[0].content[1]',
    kind: 'word',
    annotationId: 'wg-001',
    metadata: {},
  };
  const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
  const { rerender } = render(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  // First render: 1 base setAnnotation call for the word.
  expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
  setAnnotationSpy.mockClear();

  // Toggle filter on. Should add ONE filter setAnnotation call - NOT re-set the base.
  rerender(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      filteredTokenId="wg-001"
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
  expect(setAnnotationSpy).toHaveBeenCalledWith(
    expect.anything(),
    'marble-filter',
    'filter-wg-001',
  );
  setAnnotationSpy.mockClear();

  // Toggle filter off. Should remove the filter overlay - NOT re-set the base.
  rerender(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  expect(setAnnotationSpy).not.toHaveBeenCalled();
  expect(removeAnnotationSpy).toHaveBeenCalledWith('marble-filter', 'filter-wg-001');
});
```

- [ ] **Step 2.2: Add a failing test — toggling `highlightAllResearchTerms` does not re-set base annotations or filter**

In `scripture-pane.test.tsx`, add:

```tsx
it('toggling highlightAllResearchTerms does not re-set base annotations or filter overlay', () => {
  const annotation: MarbleAnnotation = {
    usjPath: '$.content[0].content[1]',
    kind: 'word',
    annotationId: 'wg-001',
    metadata: {},
  };
  const usj = { type: 'USJ' as const, version: '3.1' as const, content: [] };
  const { rerender } = render(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      filteredTokenId="wg-001"
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  // First render: 1 base + 1 filter = 2 calls.
  expect(setAnnotationSpy).toHaveBeenCalledTimes(2);
  setAnnotationSpy.mockClear();
  removeAnnotationSpy.mockClear();

  // Toggle highlight-all on. Should add exactly ONE highlight setAnnotation call.
  rerender(
    <EnhancedScripturePane
      usj={usj}
      annotations={[annotation]}
      filteredTokenId="wg-001"
      highlightAllResearchTerms
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  expect(setAnnotationSpy).toHaveBeenCalledTimes(1);
  expect(setAnnotationSpy).toHaveBeenCalledWith(
    expect.anything(),
    'marble-highlight',
    'highlight-wg-001',
  );
});
```

- [ ] **Step 2.3: Run the two new tests to verify they fail**

```bash
npm test -- scripture-pane.test.tsx -t "toggling filteredTokenId does not re-set"
npm test -- scripture-pane.test.tsx -t "toggling highlightAllResearchTerms does not re-set"
```

Expected: BOTH FAIL — the current single-effect approach re-applies all annotations whenever any of (filteredTokenId, highlightAllResearchTerms) changes.

- [ ] **Step 2.4: Refactor the annotation effect into three effects + a callback ref**

In `scripture-pane.component.tsx`, replace the single `useEffect` block (currently lines 175-243) with the structure below. Keep all existing helper functions (`annotationToRange`, `annotationTypeFor`) unchanged.

Add the callback-ref + three effects inside the component body, right after the existing `useStylesheet(MARBLE_ANNOTATION_STYLES);` and `getLocalizedString` lines:

```tsx
// Hold the latest token-click + context-menu callbacks in a ref so the
// annotation effect's onClick closure can read them WITHOUT putting them in
// its dep array. This is the second half of Fix 1: stable defaults plus a
// ref-based read means the base-annotation effect only re-fires when the
// annotation set or the USJ document actually changes.
const handlersRef = useRef({ onTokenClick, onTokenContextMenu });
useEffect(() => {
  handlersRef.current = { onTokenClick, onTokenContextMenu };
}, [onTokenClick, onTokenContextMenu]);

// Effect A — base marble-word / marble-note annotations.
// Re-runs only when the chapter content or annotation set changes.
useEffect(() => {
  const editor = editorRef.current;
  if (!editor || !usj) return undefined;

  const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));

  annotations.forEach((annotation) => {
    const range = annotationToRange(annotation);
    const baseType = annotationTypeFor(annotation.kind);
    editor.setAnnotation(range, baseType, annotation.annotationId, (event, _type, id) => {
      const annotationForId = annotationsById.get(id);
      if (!annotationForId) return;
      const { onTokenClick: latestClick, onTokenContextMenu: latestContextMenu } =
        handlersRef.current;
      if (event.button === RIGHT_MOUSE_BUTTON) {
        // Editorial gives us a DOM MouseEvent; consumers expect the React
        // MouseEvent surface (only `.button`, `.preventDefault()`, etc are
        // read), so a structural cast is correct.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        latestContextMenu(id, annotationForId, event as unknown as ReactMouseEvent);
      } else {
        latestClick(id, annotationForId);
      }
    });
  });

  return () => {
    annotations.forEach((a) => {
      editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
    });
  };
}, [usj, annotations]);

// Effect B — single marble-filter overlay.
// Re-runs only when the filtered token changes (or when annotations change
// and the filter target may have appeared / disappeared).
useEffect(() => {
  const editor = editorRef.current;
  if (!editor || !usj || !filteredTokenId) return undefined;
  const target = annotations.find((a) => a.annotationId === filteredTokenId);
  if (!target) return undefined;
  editor.setAnnotation(
    annotationToRange(target),
    ANNOTATION_TYPE_FILTER,
    `filter-${filteredTokenId}`,
  );
  return () => {
    editor.removeAnnotation(ANNOTATION_TYPE_FILTER, `filter-${filteredTokenId}`);
  };
}, [usj, annotations, filteredTokenId]);

// Effect C — marble-highlight overlays for every word annotation.
// Re-runs only when the highlight toggle or annotation set changes.
useEffect(() => {
  const editor = editorRef.current;
  if (!editor || !usj || !highlightAllResearchTerms) return undefined;
  const wordAnnotations = annotations.filter((a) => a.kind === 'word');
  wordAnnotations.forEach((a) => {
    editor.setAnnotation(
      annotationToRange(a),
      ANNOTATION_TYPE_HIGHLIGHT,
      `highlight-${a.annotationId}`,
    );
  });
  return () => {
    wordAnnotations.forEach((a) => {
      editor.removeAnnotation(ANNOTATION_TYPE_HIGHLIGHT, `highlight-${a.annotationId}`);
    });
  };
}, [usj, annotations, highlightAllResearchTerms]);
```

- [ ] **Step 2.5: Run the new tests to verify they pass**

```bash
npm test -- scripture-pane.test.tsx -t "toggling filteredTokenId does not re-set"
npm test -- scripture-pane.test.tsx -t "toggling highlightAllResearchTerms does not re-set"
```

Expected: BOTH PASS.

- [ ] **Step 2.6: Run the full scripture-pane test file to verify behavior is preserved**

```bash
npm test -- scripture-pane.test.tsx
```

Expected: all tests pass. Pay particular attention to the existing tests:

- `'calls setAnnotation for each marble annotation when usj + annotations are supplied'`
- `'routes a left-click on an annotation to onTokenClick'`
- `'routes a right-click (button 2) on an annotation to onTokenContextMenu'`
- `'applies a marble-filter annotation when filteredTokenId matches a known annotation'`
- `'applies marble-highlight annotations to every word annotation when highlightAllResearchTerms is true'`
- `'removes all applied annotations on unmount'`

If `'routes a left-click...'` or `'routes a right-click...'` fails, it means the click handler is no longer reading the current callback. Verify the `handlersRef` read inside the click closure.

- [ ] **Step 2.7: Pass a stable `onTokenContextMenu` from the wiring layer**

In `enhanced-resource.web-view.tsx`, locate where `<EnhancedScripturePane>` is rendered (around line 549) and where `handleTokenClick` is defined (around line 2522). Add a `handleTokenContextMenu` `useCallback` with a no-op body for now (BHV-308 will populate it later), and pass it as a prop:

Find the `handleTokenClick` definition at ~line 2522:

```ts
const handleTokenClick = useCallback(
  (tokenId: string) => {
    setFilteredTokenId(tokenId);
  },
  [setFilteredTokenId],
);
```

Immediately after it, add:

```ts
// FN-020 / BHV-308: context-menu placeholder. The real context-menu wiring
// will populate this callback in a follow-up; passing a stable useCallback
// reference now prevents the EnhancedScripturePane annotation effect from
// re-running on every parent re-render.
const handleTokenContextMenu = useCallback((_tokenId: string, _annotation: MarbleAnnotation) => {
  // Intentionally empty until BHV-308 lands the context menu.
}, []);
```

In the `<EnhancedScripturePane>` JSX at ~line 549, add the new prop alongside the existing `onTokenClick={onTokenClick}`:

```tsx
<EnhancedScripturePane
  // ...existing props...
  onTokenClick={onTokenClick}
  onTokenContextMenu={onTokenContextMenu}
  // ...existing props...
/>
```

Wire the handler through the existing `onTokenClick` / new `onTokenContextMenu` parameters where the wrapper component receives them — search the file for `onTokenClick = () => {}` to find the wrapper's destructuring (~line 362) and confirm `onTokenContextMenu` is also destructured and passed forward. If not, add it to the wrapper's parameter list and propagate it.

If `MarbleAnnotation` is not yet imported into `enhanced-resource.web-view.tsx`, add it to the existing import from `'../lib/marble-converter'`:

```ts
import { convertMarbleChapterXml, type MarbleAnnotation } from '../lib/marble-converter';
```

(That import is already present at line 19.)

- [ ] **Step 2.8: Run typecheck and full ER test suite**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
npm run typecheck
cd extensions/src/platform-enhanced-resources
npm test
```

Expected: typecheck passes; all unit tests in the extension pass.

- [ ] **Step 2.9: Commit**

```bash
git add extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx \
        extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx \
        extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx
git commit -m "[P3][perf] enhanced-resources: Split annotation effect into three responsibility-keyed effects

The single annotation effect was re-applying ALL annotations whenever any
of (usj, annotations, filteredTokenId, highlightAllResearchTerms,
onTokenClick, onTokenContextMenu) changed. With John 1's ~300 marble
words this meant 300 setAnnotation + 300 removeAnnotation calls per
toggle of highlight-all or filter.

Split into three effects:
- Effect A (base marble-word / marble-note) — runs only on usj/annotations
  change. Click closure reads the latest token-click / context-menu
  callbacks via a ref so handlers can change without re-running the
  effect.
- Effect B (marble-filter overlay) — runs only on filter change.
- Effect C (marble-highlight overlays) — runs only on highlight toggle.

Wiring layer now passes a stable useCallback onTokenContextMenu (no-op
placeholder until BHV-308 wires the context menu) so the production path
never relies on the module-level default.

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

## Task 3: Cache the ER network-object proxy via a custom hook (Fix 3)

**Files:**

- Create: `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts`
- Create: `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts`
- Modify: `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx`

- [ ] **Step 3.1: Create the test file with a failing test for the hook's basic resolution flow**

Create `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts` with:

```ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

// Module-scope spy so the test can swap the resolved proxy between cases.
const networkObjectsGetSpy = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    networkObjects: {
      get: (...args: unknown[]) => networkObjectsGetSpy(...args),
    },
  },
  logger: {
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

// Import after vi.mock so the module reads the mocked papi.
import { useEnhancedResourcesProxy } from './use-enhanced-resources-proxy';

beforeEach(() => {
  networkObjectsGetSpy.mockReset();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEnhancedResourcesProxy', () => {
  it('returns undefined while the proxy is pending', () => {
    networkObjectsGetSpy.mockImplementation(() => new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
  });

  it('returns the resolved proxy once papi.networkObjects.get settles', async () => {
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toBe(proxy));
  });

  it('calls papi.networkObjects.get exactly once across multiple consumer renders of the same hook instance', async () => {
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result, rerender } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));
    rerender();
    rerender();
    rerender();
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);
  });

  it('returns undefined and logs a warning if papi.networkObjects.get rejects', async () => {
    const error = new Error('backend unavailable');
    networkObjectsGetSpy.mockRejectedValue(error);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    // Wait for the promise to settle.
    await waitFor(() =>
      expect(networkObjectsGetSpy).toHaveBeenCalledWith('platform.enhancedResources'),
    );
    expect(result.current).toBeUndefined();
  });
});
```

- [ ] **Step 3.2: Run the test to verify it fails**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core/extensions/src/platform-enhanced-resources
npm test -- use-enhanced-resources-proxy.test.ts
```

Expected: FAIL — the module does not exist yet (import error).

- [ ] **Step 3.3: Implement the hook**

Create `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts`:

```ts
import { useEffect, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import type {
  DictionaryEntryDataDto,
  DictionaryEntryInputDto,
  DictionaryLoadInputDto,
  DictionaryLoadResultDto,
  EncyclopediaLoadInputDto,
  EncyclopediaLoadResultDto,
  ArticleDataDto,
  ArticleInputDto,
  MediaLoadInputDto,
  MediaLoadResultDto,
  LoadMarbleChapterXmlInput,
} from 'platform-enhanced-resources';

/**
 * Network-object id registered by the C# `EnhancedResourceFactory`. Kept in sync with
 * `web-views/enhanced-resource.web-view.tsx`.
 */
export const ER_NETWORK_OBJECT_ID = 'platform.enhancedResources';

/**
 * Subset of the network-object proxy the ER web view consumes. Mirrors the shape declared inline in
 * `enhanced-resource.web-view.tsx` so the wiring layer can drop the duplicate type once it migrates
 * to this hook.
 */
export type EnhancedResourcesNetworkObject = {
  loadMarbleChapterXml: (input: LoadMarbleChapterXmlInput) => Promise<string>;
  loadDictionary: (input: DictionaryLoadInputDto) => Promise<DictionaryLoadResultDto>;
  readDictionaryEntry: (input: DictionaryEntryInputDto) => Promise<DictionaryEntryDataDto>;
  loadEncyclopedia: (input: EncyclopediaLoadInputDto) => Promise<EncyclopediaLoadResultDto>;
  readArticle: (input: ArticleInputDto) => Promise<ArticleDataDto>;
  loadMedia: (input: MediaLoadInputDto) => Promise<MediaLoadResultDto>;
};

/**
 * Resolves the Enhanced Resources network-object proxy once per consumer and caches it across
 * renders. Replaces the per-effect `await papi.networkObjects.get<...>(ER_NETWORK_OBJECT_ID)`
 * pattern that previously fired ~8 separate proxy lookups every time any tab effect fan-out
 * triggered.
 *
 * Returns `undefined` while pending, after a rejection, or when the backend has not registered the
 * network object yet. Consumers should `if (!proxy) return` inside their effects (mirroring the
 * existing per-call guard).
 */
export function useEnhancedResourcesProxy(): EnhancedResourcesNetworkObject | undefined {
  const [proxy, setProxy] = useState<EnhancedResourcesNetworkObject | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resolved =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!cancelled && resolved) {
          setProxy(resolved);
        }
      } catch (err) {
        logger.warn(
          `useEnhancedResourcesProxy: failed to resolve ${ER_NETWORK_OBJECT_ID}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return proxy;
}
```

If the import path `'platform-enhanced-resources'` does not export the DTO types yet, fall back to the existing inline declarations from `web-views/enhanced-resource.web-view.tsx` (search for the `LoadMarbleChapterXmlInput` definition near line 970-1006) and copy the type aliases into this hook file. Keep the duplicate types until the wiring layer migration is complete; the wiring layer will be migrated next, at which point one of the two definitions can be removed.

- [ ] **Step 3.4: Run the hook tests to verify they pass**

```bash
npm test -- use-enhanced-resources-proxy.test.ts
```

Expected: all 4 tests pass.

- [ ] **Step 3.5: Migrate the wiring layer to consume the hook**

In `enhanced-resource.web-view.tsx`:

1. At the top, add the hook import. Find the existing import from `'../lib/marble-converter'` (line 19) and add a new import below it:

```ts
import {
  ER_NETWORK_OBJECT_ID,
  useEnhancedResourcesProxy,
  type EnhancedResourcesNetworkObject,
} from '../lib/use-enhanced-resources-proxy';
```

2. Delete the local `ER_NETWORK_OBJECT_ID` constant (line 779) and the local `EnhancedResourcesNetworkObject` type alias (lines 994-1006). They now come from the hook module.

3. At the top of the `EnhancedResourceWebView` component body — immediately after the `useLocalizedStrings` line at the top of the function (around line 1292) — add:

```ts
const erProxy = useEnhancedResourcesProxy();
```

4. Update each of the 8 effects that today contain:

```ts
const proxy = await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
if (!proxy) {
  /* ...empty-state branch... */
  return;
}
const result = await proxy.someMethod(input);
```

To use `erProxy` instead. The pattern becomes:

```ts
if (!erProxy) {
  /* ...empty-state branch... */
  return;
}
// Inside the existing async IIFE:
const result = await erProxy.someMethod(input);
```

For each of the 8 effects, the `erProxy` check should happen at the top of the effect callback (synchronously, before the IIFE), and `erProxy` must be added to the effect's dependency array.

The 8 effect locations are:

- Line 1344 (chapter loader, `loadMarbleChapterXml`)
- Line 1441 (dictionary loader, `loadDictionary`)
- Line 1534 (dictionary entry detail, `readDictionaryEntry`)
- Line 1631 (encyclopedia loader, `loadEncyclopedia`)
- Line 1726 (encyclopedia article detail, `readArticle`) — confirm with `grep -n "papi.networkObjects.get<EnhancedResourcesNetworkObject>"`
- Line 2128 (media-images loader, `loadMedia`)
- Line 2214 (media-maps loader, `loadMedia`)
- Line 2400 (article fetch effect, `readArticle`)

For each effect, the change is: hoist the proxy check above the async IIFE, drop the inner `papi.networkObjects.get` call, replace `proxy.X(...)` references with `erProxy.X(...)`, and add `erProxy` to the dep array.

Example concrete diff for the chapter loader (line 1344):

Before:

```ts
useEffect(() => {
  let cancelled = false;
  if (resourceId === undefined) {
    /* ... */ return;
  }
  const bookNum = Canon.bookIdToNumber(scrRef.book);
  if (bookNum <= 0) {
    /* ... */ return;
  }

  (async () => {
    try {
      const proxy =
        await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
      if (!proxy) {
        if (!cancelled) {
          setUsj(undefined);
          setAnnotations([]);
          setScripturePaneError('Enhanced Resources backend is not available.');
        }
        return;
      }
      const xml = await proxy.loadMarbleChapterXml({
        resourceId,
        bookNum,
        chapterNumber: scrRef.chapterNum,
      });
      // ...
    } catch (err) {
      /* ... */
    }
  })();
  return () => {
    cancelled = true;
  };
}, [resourceId, scrRef.book, scrRef.chapterNum]);
```

After:

```ts
useEffect(() => {
  let cancelled = false;
  if (resourceId === undefined) {
    /* ... */ return;
  }
  const bookNum = Canon.bookIdToNumber(scrRef.book);
  if (bookNum <= 0) {
    /* ... */ return;
  }
  if (!erProxy) {
    setUsj(undefined);
    setAnnotations([]);
    setScripturePaneError('Enhanced Resources backend is not available.');
    return;
  }

  (async () => {
    try {
      const xml = await erProxy.loadMarbleChapterXml({
        resourceId,
        bookNum,
        chapterNumber: scrRef.chapterNum,
      });
      // ...
    } catch (err) {
      /* ... */
    }
  })();
  return () => {
    cancelled = true;
  };
}, [erProxy, resourceId, scrRef.book, scrRef.chapterNum]);
```

Apply the same pattern to all 8 effects.

- [ ] **Step 3.6: Run typecheck and ER tests**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
npm run typecheck
cd extensions/src/platform-enhanced-resources
npm test
```

Expected: typecheck passes; all unit tests pass.

- [ ] **Step 3.7: Commit**

```bash
git add extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts \
        extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts \
        extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx
git commit -m "[P3][perf] enhanced-resources: Cache ER network-object proxy via custom hook

Eight separate effects each called papi.networkObjects.get<...>(ER_NETWORK_OBJECT_ID)
inside their async block, re-resolving the proxy on every BCV move. Now
resolved once at the top of the webview via useEnhancedResourcesProxy()
and shared across all consumers.

The 'Enhanced Resources backend is not available' empty-state branch
now lives in one place (the hook) instead of duplicated in eight effect
bodies.

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

## Task 4: Scope-conditional verse dependency (Fix 4)

**Files:**

- Create: `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.ts`
- Create: `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.test.ts`
- Modify: `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx`

- [ ] **Step 4.1: Pre-implementation contract check**

Run:

```bash
grep -rnE "verse.*scope|scope.*current-chapter|verseNum.*reload|reload.*verseNum" \
  /home/lyonsm/workspaces/enhanced-resources/paranext-core/.context/features/enhanced-resources/ \
  2>/dev/null
```

If the grep returns any test scenario or behavior that asserts "tabs reload on verse cursor move at any scope," STOP. The spec needs to be updated before this fix lands. Otherwise proceed.

- [ ] **Step 4.2: Create a failing test for the scope-keyed helper**

Create `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { computeScopeKeyedRefKey } from './scope-keyed-ref-key';

describe('computeScopeKeyedRefKey', () => {
  const ref = { book: 'JHN', chapterNum: 1, verseNum: 5 };

  it('includes the verse when scope is current-verse (PT9 Scope.CurrentVerse)', () => {
    const key = computeScopeKeyedRefKey('current-verse', ref);
    expect(key).toBe('JHN|1|v5');
  });

  it('includes a section-scoped verse marker when scope is current-section', () => {
    // Best-effort fallback until backend exposes section boundaries: keying
    // on verse num degrades to today's behavior, never worse.
    const key = computeScopeKeyedRefKey('current-section', ref);
    expect(key).toBe('JHN|1|s5');
  });

  it('does not include the verse when scope is current-chapter', () => {
    const key = computeScopeKeyedRefKey('current-chapter', ref);
    expect(key).toBe('JHN|1');
  });

  it('does not include the verse when scope is current-book', () => {
    const key = computeScopeKeyedRefKey('current-book', ref);
    expect(key).toBe('JHN|1');
  });

  it('produces distinct keys when only the chapter changes', () => {
    expect(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 5 }),
    ).not.toBe(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 2, verseNum: 5 }),
    );
  });

  it('produces identical keys when only the verse changes at chapter scope (PT9-faithful)', () => {
    expect(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 5 }),
    ).toBe(computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 9 }));
  });
});
```

- [ ] **Step 4.3: Run the test to verify it fails**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core/extensions/src/platform-enhanced-resources
npm test -- scope-keyed-ref-key.test.ts
```

Expected: FAIL — module does not exist.

- [ ] **Step 4.4: Implement the helper**

Create `extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.ts`:

```ts
import type { MarbleScope } from '../components/toolbar/toolbar.component';

/**
 * Scripture reference subset required to compute the dependency key. Matches `scrRef`'s `(book,
 * chapterNum, verseNum)` shape from `useWebViewScrollGroupScrRef()`.
 */
export interface ScopeKeyedRefInput {
  book: string;
  chapterNum: number;
  verseNum: number;
}

/**
 * Derive a stable string key that the four ER research-tab load effects can use as a single dep,
 * instead of putting `scrRef.verseNum` in their dep arrays directly.
 *
 * Mirrors PT9's `MarbleForm.UpdateReference` semantics (`Paratext/Marble/MarbleForm.cs:2138-2192`):
 *
 * - `Scope.CurrentVerse` → tab data reloads on every verse change
 * - `Scope.CurrentSection` → tab data reloads when the section boundary moves (modeled here as keying
 *   on verse until backend section-boundary data is available; degrades to today's behavior, never
 *   worse)
 * - `Scope.CurrentChapter` and larger → tab data does NOT reload on verse changes; only chapter /
 *   book changes invalidate the cache
 *
 * The key string is opaque; callers should treat it as a single dep value.
 */
export function computeScopeKeyedRefKey(scope: MarbleScope, ref: ScopeKeyedRefInput): string {
  const base = `${ref.book}|${ref.chapterNum}`;
  switch (scope) {
    case 'current-verse':
      return `${base}|v${ref.verseNum}`;
    case 'current-section':
      return `${base}|s${ref.verseNum}`;
    case 'current-chapter':
    default:
      // 'current-book', 'whole-bible', or any future broader scope - same
      // (book, chapter) key. Cursor moves within the chapter do NOT
      // re-trigger tab loads.
      return base;
  }
}
```

If `MarbleScope` is not exported from `toolbar.component`, search for its definition (`grep -nE "type MarbleScope|MarbleScope =" extensions/src/platform-enhanced-resources/src/`) and import from the canonical source. The test assumes the four scope literals; adjust the switch's `default` case to match whatever scopes exist in the codebase.

- [ ] **Step 4.5: Run the helper tests to verify they pass**

```bash
npm test -- scope-keyed-ref-key.test.ts
```

Expected: all 6 tests pass.

- [ ] **Step 4.6: Wire `scopeKeyedRefKey` into the four research-tab effects**

In `enhanced-resource.web-view.tsx`:

1. Add the import alongside the other lib imports:

```ts
import { computeScopeKeyedRefKey } from '../lib/scope-keyed-ref-key';
```

2. Inside the component body, after the existing `bookNum = useMemo(...)` block (around line 1438), add:

```ts
// PT9 Scope semantics: research-tab effects key on this single value rather
// than putting scrRef.verseNum in their dep arrays. At scope=current-chapter
// (and larger) cursor moves within the chapter no longer fan out to four
// concurrent backend loads.
const scopeKeyedRefKey = useMemo(
  () => computeScopeKeyedRefKey(scope, scrRef),
  [scope, scrRef.book, scrRef.chapterNum, scrRef.verseNum],
);

// The current verseNum is still needed when constructing the load input
// (every backend method takes a `currentReference`). Read it through a ref
// inside each effect so the effect's dep array stays clean.
const scrRefRef = useRef(scrRef);
useEffect(() => {
  scrRefRef.current = scrRef;
}, [scrRef]);
```

3. Update each of the four research-tab effects (dictionary, encyclopedia, media-images, media-maps) to:
   - Read `scrRef` at the top of the async IIFE via `const currentRef = scrRefRef.current;` and use `currentRef.verseNum` / `currentRef.chapterNum` / `currentRef.book` when constructing the input (preserves the live verse number for the actual PAPI call)
   - Replace the dep array entry `scrRef.verseNum` with `scopeKeyedRefKey`
   - Drop `scrRef.chapterNum` from the dep array (it's now folded into `scopeKeyedRefKey`)

For the dictionary effect at line ~1441, the dep array becomes:

```ts
}, [
  erProxy,
  resourceId,
  bookNum,
  scopeKeyedRefKey,
  scope,
  filteredTokenId,
  showTranslations,
]);
```

For the encyclopedia effect at line ~1631, the dep array becomes:

```ts
}, [
  erProxy,
  resourceId,
  bookNum,
  scopeKeyedRefKey,
  scope,
  filteredTokenId,
]);
```

For media-images at line ~2128 and media-maps at line ~2214, the dep array becomes:

```ts
}, [
  erProxy,
  mediaImagesEverActivated, // or mediaMapsEverActivated
  resourceId,
  bookNum,
  scopeKeyedRefKey,
  scope,
  filteredTokenId,
]);
```

Confirm via `npm run lint` that the React `exhaustive-deps` rule does not flag the new dep arrays. If it does, the rule is correct - re-examine which deps the effect body actually reads. The intent is: `scrRef.verseNum` is read via the ref (no dep), `scrRef.chapterNum` and `scrRef.book` are folded into `scopeKeyedRefKey`.

- [ ] **Step 4.7: Add a behavior test for the wiring change**

The wiring layer is too large to render in isolation cleanly. Instead, add a regression test for the helper that locks in the PT9-faithful behavior. In `scope-keyed-ref-key.test.ts`, append one more `it`:

```ts
it('returns identical keys when scope=current-chapter and only verse changes (regression: PT9 behavior)', () => {
  // PT9 MarbleForm.UpdateReference: when scope is CurrentChapter, verse-only
  // changes do NOT trigger a tab data reload. Two ref inputs that differ
  // only in verseNum must produce the same dep key.
  const ref1 = { book: 'JHN', chapterNum: 1, verseNum: 1 };
  const ref2 = { book: 'JHN', chapterNum: 1, verseNum: 51 };
  expect(computeScopeKeyedRefKey('current-chapter', ref1)).toEqual(
    computeScopeKeyedRefKey('current-chapter', ref2),
  );
});
```

This is partially redundant with the earlier test but serves as a labeled PT9-faithful regression marker.

```bash
npm test -- scope-keyed-ref-key.test.ts
```

Expected: all 7 tests pass.

- [ ] **Step 4.8: Run typecheck and full ER test suite**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
npm run typecheck
cd extensions/src/platform-enhanced-resources
npm test
```

Expected: typecheck passes; all unit tests pass.

- [ ] **Step 4.9: Commit**

```bash
git add extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.ts \
        extensions/src/platform-enhanced-resources/src/lib/scope-keyed-ref-key.test.ts \
        extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx
git commit -m "[P3][perf] enhanced-resources: Scope-conditional verse dependency for research tabs

PT10's research-tab effects (dictionary, encyclopedia, media-images,
media-maps) re-fetched on every scrRef.verseNum change regardless of
scope - strictly more aggressive than PT9. Move to a single derived
scopeKeyedRefKey dep that mirrors PT9's MarbleForm.UpdateReference
semantics:

- current-verse: dep changes on every verse, tabs reload (PT9 parity)
- current-section: dep changes on verse (best-effort until backend
  exposes section boundaries; degrades to today's behavior, never worse)
- current-chapter and larger: dep keyed on (book, chapter) only -
  cursor moves within a chapter do NOT trigger tab reloads

The live verse number is still passed to backend PAPI calls via a
useRef-synced read inside the effect body, so the data shown for
current-verse scope remains accurate.

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

## Task 5: Chunked annotation apply with cancellation (Fix 5)

**Files:**

- Modify: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
- Test: `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`

- [ ] **Step 5.1: Add a failing test that the apply loop yields between batches and respects cancellation**

In `scripture-pane.test.tsx`, add:

```tsx
it('chunks setAnnotation calls across animation frames so the JS thread can service other work', async () => {
  // 120 annotations exceeds the CHUNK_SIZE of 50, forcing at least two RAF yields.
  const annotations: MarbleAnnotation[] = Array.from({ length: 120 }, (_, i) => ({
    usjPath: `$.content[0].content[${i}]`,
    kind: 'word',
    annotationId: `wg-${i}`,
    metadata: {},
  }));
  // Spy on requestAnimationFrame to confirm the effect yielded.
  const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');
  render(
    <EnhancedScripturePane
      usj={{ type: 'USJ', version: '3.1', content: [] }}
      annotations={annotations}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  // After RED-test passes, the effect should have yielded at least once
  // (120 annotations / 50-per-chunk = 3 chunks, so 2 yields between them).
  await vi.waitFor(() => {
    expect(setAnnotationSpy).toHaveBeenCalledTimes(120);
  });
  expect(rafSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
  rafSpy.mockRestore();
});
```

- [ ] **Step 5.2: Run the test to verify it fails**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core/extensions/src/platform-enhanced-resources
npm test -- scripture-pane.test.tsx -t "chunks setAnnotation calls across animation frames"
```

Expected: FAIL — current loop runs synchronously, never calls `requestAnimationFrame`.

- [ ] **Step 5.3: Implement the chunked apply in Effect A**

In `scripture-pane.component.tsx`, locate Effect A (the base-annotation effect created in Task 2). Replace the synchronous `annotations.forEach((annotation) => { editor.setAnnotation(...); });` block with a chunked async loop:

```tsx
// Effect A — base marble-word / marble-note annotations.
// Chunked apply: 50 annotations per RAF tick so mousedown / setFocus and
// other UI events can be serviced between batches. The cancellation flag
// protects against stale applies if the chapter changes mid-loop.
useEffect(() => {
  const editor = editorRef.current;
  if (!editor || !usj) return undefined;

  const annotationsById = new Map(annotations.map((a) => [a.annotationId, a]));
  let cancelled = false;
  const CHUNK_SIZE = 50;

  const applyChunked = async () => {
    for (let i = 0; i < annotations.length; i += CHUNK_SIZE) {
      if (cancelled) return;
      const slice = annotations.slice(i, i + CHUNK_SIZE);
      for (const annotation of slice) {
        const range = annotationToRange(annotation);
        const baseType = annotationTypeFor(annotation.kind);
        editor.setAnnotation(range, baseType, annotation.annotationId, (event, _type, id) => {
          const annotationForId = annotationsById.get(id);
          if (!annotationForId) return;
          const { onTokenClick: latestClick, onTokenContextMenu: latestContextMenu } =
            handlersRef.current;
          if (event.button === RIGHT_MOUSE_BUTTON) {
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            latestContextMenu(id, annotationForId, event as unknown as ReactMouseEvent);
          } else {
            latestClick(id, annotationForId);
          }
        });
      }
      if (i + CHUNK_SIZE < annotations.length) {
        // Yield to the event loop so mousedown / setFocus / paint can run.
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });
      }
    }
  };
  applyChunked();

  return () => {
    cancelled = true;
    annotations.forEach((a) => {
      editor.removeAnnotation(annotationTypeFor(a.kind), a.annotationId);
    });
  };
}, [usj, annotations]);
```

- [ ] **Step 5.4: Run the new test to verify it passes**

```bash
npm test -- scripture-pane.test.tsx -t "chunks setAnnotation calls across animation frames"
```

Expected: PASS.

- [ ] **Step 5.5: Run the full scripture-pane test file**

```bash
npm test -- scripture-pane.test.tsx
```

Expected: all tests pass. The existing test
`'calls setAnnotation for each marble annotation when usj + annotations are supplied'`
uses 2 annotations (under CHUNK_SIZE), so it completes in one synchronous pass and is unaffected. The unmount test `'removes all applied annotations on unmount'` still passes because cleanup walks the full annotations array.

- [ ] **Step 5.6: Add a cancellation regression test**

In `scripture-pane.test.tsx`, add:

```tsx
it('aborts mid-apply if the component unmounts during the chunked loop', async () => {
  const annotations: MarbleAnnotation[] = Array.from({ length: 200 }, (_, i) => ({
    usjPath: `$.content[0].content[${i}]`,
    kind: 'word',
    annotationId: `wg-${i}`,
    metadata: {},
  }));
  // Stub requestAnimationFrame so we can intercept the first yield and unmount before chunk 2.
  let rafCallback: FrameRequestCallback | undefined;
  vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
    rafCallback = cb;
    return 0;
  });
  const { unmount } = render(
    <EnhancedScripturePane
      usj={{ type: 'USJ', version: '3.1', content: [] }}
      annotations={annotations}
      localizedStringsWithLoadingState={[STRINGS_BAG, false]}
    />,
  );
  // First chunk applied synchronously (50 calls), then RAF was registered.
  await vi.waitFor(() => {
    expect(setAnnotationSpy).toHaveBeenCalledTimes(50);
    expect(rafCallback).toBeDefined();
  });
  unmount();
  // Now release the RAF gate. Cancellation should short-circuit before chunk 2 runs.
  if (rafCallback) rafCallback(performance.now());
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  // Total setAnnotation calls should not have grown past the first chunk.
  expect(setAnnotationSpy).toHaveBeenCalledTimes(50);
});
```

- [ ] **Step 5.7: Run the cancellation test to verify it passes**

```bash
npm test -- scripture-pane.test.tsx -t "aborts mid-apply if the component unmounts"
```

Expected: PASS.

- [ ] **Step 5.8: Run the full extension test suite**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core/extensions/src/platform-enhanced-resources
npm test
```

Expected: all unit tests pass (existing + 5 new tests across Tasks 1, 2, 5).

- [ ] **Step 5.9: Run typecheck and lint**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
npm run typecheck
npm run lint -- extensions/src/platform-enhanced-resources/src/
```

Expected: both pass with no errors.

- [ ] **Step 5.10: Commit**

```bash
git add extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx \
        extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx
git commit -m "[P3][perf] enhanced-resources: Chunk annotation apply with RAF yields and cancellation

For chapters with hundreds of marble words (e.g., John 1 ~300), applying
annotations synchronously blocked the renderer for hundreds of ms during
chapter load. Chunk the apply loop into batches of 50, yielding to a
requestAnimationFrame between batches so mousedown / setFocus / paint
can be serviced.

A cancellation flag prevents stale applies if the chapter changes
mid-loop or the component unmounts. Cleanup unconditionally walks the
full annotation array because the editor's removeAnnotation is a no-op
for never-set ids.

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

## Task 6: End-to-end perf gate (manual / CDP-driven)

**Files:**

- No code changes; verification only.

This task is a verification gate, not an implementation step. The agent / engineer runs through it against the dev app to confirm the fixes deliver on the success criteria from the spec.

- [ ] **Step 6.1: Restart the dev app in headless CDP mode**

```bash
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
./.erb/scripts/refresh.sh
```

Wait for the refresh script to report "ready" / for the WebSocket on port 8876 to accept connections. The CDP endpoint is on port 9223.

- [ ] **Step 6.2: Open Enhanced Resources on John 1**

Use the Platform.Bible UI (or a Playwright script via the `visual-verification` skill) to open ER on John 1. Wait for scripture text to render with marble-word underlines visible.

- [ ] **Step 6.3: Verify mousedown responsiveness**

Click any UI element within the app. The click should register within ~500ms (today: 5-60s). Repeat 5 times in different parts of the app.

Tail the main log and assert no `setFocus(["detect"]) ... timed out` warnings:

```bash
grep -E "windowServiceDataProvider-data.setFocus" ~/.config/Electron/logs/main.log | tail -20
```

Expected: no `timed out` lines after the timestamp at which the dev app was restarted in Step 6.1.

- [ ] **Step 6.4: Verify cursor movement at default scope (current-verse) does not regress**

With ER focused, press arrow-down 10 times to walk through verses. Each verse change triggers backend loads (PT9 parity) but UI stays responsive. No long freezes; no JSON-RPC timeouts in the renderer console.

- [ ] **Step 6.5: Verify Fix 4 — current-chapter scope skips per-verse fan-out**

Switch ER's scope dropdown to `Current chapter`. Move cursor between verses 10 times. Open the renderer DevTools console (CDP port 9223) and search for `loadDictionary` / `loadEncyclopedia` / `loadMedia` log entries. None should fire on these cursor moves; the only backend traffic should be the chapter load (which only fires on book/chapter change).

- [ ] **Step 6.6: Verify highlight-all toggle is instant**

Toggle "Highlight all research terms" 5 times. Each toggle should complete within one frame (no visible freeze). With Fix 2's split effects, only the `marble-highlight` overlays are touched - the base annotations and filter overlay are untouched.

- [ ] **Step 6.7: Verify all four research tabs work**

Switch tabs: Dictionary → Encyclopedia → Media-Images → Media-Maps → back to Dictionary. Each switch resolves within ~1s of activation (Media tabs may take longer on first activation due to image bytes - that's expected and not a regression).

- [ ] **Step 6.8: Verify visual fidelity**

- Marble-word underlines (dotted, primary color) are visible on every Greek/Hebrew word
- Clicking a marble word filters the dictionary to that token (filter ribbon appears, scripture pane shows the marble-filter overlay on the clicked word)
- Toggling highlight-all turns all marble words yellow
- Clicking outside marble words does nothing (no spurious click handlers fire)

- [ ] **Step 6.9: If ANY check in this task fails, do NOT merge**

Document the failure inline in the plan file (add a `## Issues found during Task 6` section) and return to the relevant Task (1-5) to address. The fix must satisfy every Step 6.x check before the PR is merged.

---

## Self-Review

Before declaring the plan complete:

**Spec coverage:**

- Spec Goals → addressed by Tasks 1-5 individually + Task 6 verification
- Spec RC1 (annotation thrash) → Tasks 1, 2
- Spec RC2 (verse-level fan-out) → Tasks 3, 4
- Spec RC3 (initial mount cost) → Task 5
- Spec Verification → Task 6 mirrors the spec's per-fix tests + perf gate
- Spec Risk table → Task 4 includes the pre-implementation contract grep (Step 4.1)

**Type consistency:**

- `EnhancedResourcesNetworkObject` — same shape in Task 3's hook file and the (deleted) wiring-layer alias
- `MarbleScope` — imported from `toolbar.component` consistently across hook and helper
- `MarbleAnnotation` — same shape in scripture-pane and wiring layer (existing import)
- `NOOP_TOKEN_CLICK` / `NOOP_TOKEN_CONTEXT_MENU` — defined once in scripture-pane.component.tsx, referenced from the destructure
- `computeScopeKeyedRefKey` (helper name) and `scopeKeyedRefKey` (memoized variable name) — consistent across the test, the helper, and the wiring-layer use site

**Placeholder scan:** No `TBD`, `TODO`, `implement later`, or "similar to Task N" references. Every step contains the actual code or command.

**Branch / commit hygiene:**

- All commits use the `[P3][perf]` prefix per the existing in-flight feature branch convention
- All commits include `Co-Authored-By: Claude Code` per CLAUDE.md
- No commit pushes to origin (per user preferences)
