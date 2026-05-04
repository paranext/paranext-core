# Enhanced Resources UI Performance Fix — Design

**Date:** 2026-05-04
**Branch:** ai/feature/enhanced-resources-rolf-03-04-2026
**Author:** Matt Lyons (with Claude Code)
**Status:** Approved (pending implementation)

## Background

After landing commits 737d530795 ("Replace TempScripturePane with real Editorial-backed pane") and be814c36e7 ("Fix annotation rendering + activate ER test suite"), the Enhanced Resources webview becomes unusable: mousedown events take 10-60s to register, JSON-RPC requests time out, and the UI freezes. Prior to those commits the app was responsive but scripture text wasn't rendering — so the regression is tied directly to the Editorial-backed pane plus working annotation rendering.

### Hard evidence

From `~/.config/Electron/logs/main.log` (renderer log, captured during a slow ER session):

- 334 timeouts on `getAvailableProjects` (5 PDP factories × ~67 batches)
- 47 timeouts on `NetworkObjectStatusService.getAllNetworkObjectDetails`
- Repeated `JSON-RPC Request timed out: object:platform.windowServiceDataProvider-data.setFocus(["detect"])` warnings — exactly matching the user-visible "mousedown takes 10s" symptom

The renderer JS thread is being blocked long enough that incoming WebSocket messages (including the lightweight `setFocus("detect")` call from main on every mouseDown) wait past the 5s JSON-RPC timeout.

### Root causes

**RC1 — Annotation effect thrashes on every parent re-render.**
In [scripture-pane.component.tsx:144-243](../../extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx#L144-L243), the `EnhancedScripturePane` component declares default callbacks via inline arrow functions:

```ts
onTokenClick = () => {},
onTokenContextMenu = () => {},
```

Inline default values are recreated on every render. Both callbacks are in the annotation effect's dependency array. When the wiring layer (which does not currently pass `onTokenContextMenu`) re-renders for any reason — and the 3,008-line wiring layer has 23+ pieces of state, so this happens constantly — `EnhancedScripturePane` sees a "new" `onTokenContextMenu` reference and re-runs the effect. Each run iterates every annotation twice (set on entry, remove on cleanup) and calls `editor.setAnnotation` / `editor.removeAnnotation` synchronously. For John 1 (~300 marble-word annotations), that's 600 imperative editor calls per parent re-render.

**RC2 — Verse-level dependency fan-out.**
The dictionary, encyclopedia, media-images, and media-maps load effects in [enhanced-resource.web-view.tsx](../../extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx) all include `scrRef.verseNum` in their dependency arrays. Every cursor move within a chapter retriggers four heavy backend PAPI calls in parallel, each of which separately re-resolves the ER network-object proxy via `papi.networkObjects.get(...)`.

PT9's authoritative behavior (`Paratext/Marble/MarbleForm.cs:2138-2192` in the PT9 source tree) is more conservative:

- `Scope.CurrentVerse` → reload all tab data on verse change
- `Scope.CurrentSection` → reload only when the section boundary moves
- `Scope.CurrentChapter` and larger → no tab data reload on verse change

PT10 currently reloads on every verse change regardless of scope, which is strictly more aggressive than PT9 and contributes to the WebSocket queue saturation.

**RC3 — Initial mount cost is paid synchronously.**
Even with thrashing fixed, applying ~300 annotations on first render of John 1 happens in one synchronous loop, blocking the renderer for the duration.

## Goals

- Mousedown / setFocus completes within the 5s JSON-RPC timeout window — clicks register within a few hundred ms
- Switching between Dictionary / Encyclopedia / Media tabs feels instant
- BCV chapter changes complete in single-digit seconds (Editorial mount + one round of backend loads)
- Toggling "highlight all research terms" or filter does not stall the app
- All existing functionality preserved — annotations still render, click handlers still fire, filter still works, BCV-scroll-group sync still works
- All existing ER unit tests pass with no behavioral changes

## Non-goals

- Restructuring the 3,008-line `enhanced-resource.web-view.tsx` file
- Replacing the imperative `setAnnotation` API with a USJ-encoded approach (Approach C from brainstorming)
- Optimizing C# backend `loadDictionary` / `loadEncyclopedia` / `loadMedia` performance
- Reducing the `getAvailableProjects` flood from `home.web-view.tsx` (separate issue, doesn't bottleneck ER once thrash is gone)
- PT9-faithful "only refresh visible tab" gating (defer until profiling shows it still matters after the fixes here)

## Success criteria

- No `JSON-RPC Request timed out: ...setFocus` warnings in the main log during normal ER use
- Profile shows the `EnhancedScripturePane` annotation effect runs **once per chapter load**, not per parent re-render
- Profile shows `papi.networkObjects.get(ER_NETWORK_OBJECT_ID)` resolves once per webview, not per effect

## The fixes

### Fix 1: Stabilize `EnhancedScripturePane` callback prop defaults

**File:** [extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx](../../extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx)

Replace the inline `() => {}` defaults at lines 154-155 with module-level constants:

```ts
const NOOP_TOKEN_CLICK = (_id: string, _annotation: MarbleAnnotation): void => {};
const NOOP_TOKEN_CONTEXT_MENU = (
  _id: string,
  _annotation: MarbleAnnotation,
  _event: ReactMouseEvent,
): void => {};
```

Reference them from the destructure so the same function identity is reused across renders. Have the wiring layer pass a stable `useCallback` `onTokenContextMenu` so the production path never relies on the default.

### Fix 2: Split the annotation effect by responsibility

**File:** [extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx](../../extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx)

The current single effect at lines 175-243 sets/removes base, filter, and highlight annotations together. Split into three:

- **Effect A** — runs only when `usj` or `annotations` changes. Sets/removes base `marble-word` / `marble-note` annotations. The click callback closure reads `onTokenClick` / `onTokenContextMenu` through a `useRef` updated by a tiny preceding effect, so handler bodies see the latest values without entering the annotation effect's dep array.
- **Effect B** — runs only when `filteredTokenId` or the `annotations` lookup changes. Sets/removes the single `marble-filter` annotation.
- **Effect C** — runs only when `highlightAllResearchTerms` or `annotations` changes. Sets/removes the `marble-highlight` overlays.

Each effect's cleanup undoes only what that effect set. Toggling the filter no longer rebuilds 300 base annotations; toggling highlight-all no longer rebuilds the filter overlay.

### Fix 3: Cache the ER network-object proxy once

**File:** [extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx](../../extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx)

Today, ~8 effects each call `await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID)` inside their async block. Replace with a single hook at the top of the webview:

```ts
const erProxy = useEnhancedResourcesProxy();
```

Where the hook (a small new file, e.g. `src/lib/use-enhanced-resources-proxy.ts`) wraps the `papi.networkObjects.get` call once via `useEffect` + `useState` and exposes the resolved proxy (`undefined` while loading or unavailable). Each consuming effect:

```ts
useEffect(() => {
  if (!erProxy) return;
  // ...erProxy.loadDictionary(input)
}, [erProxy /* other deps */]);
```

The "Enhanced Resources backend is not available" empty-state branch lives in one place instead of eight.

### Fix 4: Scope-conditional verse dependency

**File:** [extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx](../../extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx) (effects at ~1441, ~1631, ~2128, ~2214)

Add a derived dependency value:

```ts
const scopeKeyedRefKey = useMemo(() => {
  const base = `${scrRef.book}|${scrRef.chapterNum}`;
  if (scope === 'current-verse') return `${base}|v${scrRef.verseNum}`;
  if (scope === 'current-section') {
    // Section start is derived from the chapter token data; until that's wired,
    // fall back to verse-level keying so behavior stays correct (worst case = today's behavior).
    return `${base}|s${scrRef.verseNum}`;
  }
  return base;
}, [scope, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);
```

The four research-tab load effects depend on `scopeKeyedRefKey` instead of `scrRef.verseNum` directly. Inside each effect body, the latest `scrRef.verseNum` is read from a ref (synced via a tiny effect) when constructing the PAPI input, so the load itself still uses the current verse but the effect doesn't re-fire on cursor moves under `current-chapter` scope.

This matches PT9's `UpdateReference` semantics. The `current-section` branch is best-effort until section-boundary data is exposed by the backend; the fallback degrades to the current behavior, never worse.

### Fix 5: Yield between annotation batches (defensive)

**File:** [extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx](../../extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx)

In Effect A from Fix 2, chunk the `setAnnotation` loop into batches of 50, with a `requestAnimationFrame` yield between batches:

```ts
const CHUNK_SIZE = 50;
for (let i = 0; i < annotations.length; i += CHUNK_SIZE) {
  if (cancelled) return;
  const slice = annotations.slice(i, i + CHUNK_SIZE);
  for (const annotation of slice) {
    editor.setAnnotation(/* ... */);
  }
  if (i + CHUNK_SIZE < annotations.length) {
    await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
  }
}
```

The cancellation flag (already present in the wiring layer pattern) prevents stale applies if the chapter changes mid-loop. If `setAnnotation` turns out to be cheap, the chunking adds at most one frame of latency per chunk and is otherwise invisible.

## Implementation order

1. Fix 1 (stable defaults) — trivially safe, immediately reduces re-runs
2. Fix 2 (split effect) — main payoff; requires new tests
3. Fix 3 (proxy cache) — clean refactor across 8 call sites
4. Fix 4 (scope-conditional dep) — PT9-faithful behavior change
5. Fix 5 (chunked apply) — defensive polish

After each fix: run unit tests for the touched module, then visually open John 1 in dev app and confirm responsiveness.

## Verification

### Unit tests

- `scripture-pane.test.tsx` — extend with three new cases:
  - "annotation effect runs once when only `onTokenContextMenu` ref would have changed but actually didn't" (re-render with same props → no setAnnotation calls)
  - "toggling `filteredTokenId` does not re-set base annotations" (spy on setAnnotation; assert call count for base `marble-word` type stays flat)
  - "toggling `highlightAllResearchTerms` does not re-set base annotations or filter"
- New `use-enhanced-resources-proxy.test.ts` — proxy resolved once, `undefined` while pending, errors handled
- Wiring-layer test — verse cursor change with `scope === 'current-chapter'` does not call `loadDictionary`; chapter change does

### End-to-end perf gate (Playwright via CDP, agent-automated)

Open ER on John 1 against the dev app and:

1. Wait for scripture render. Click within 1s. Click registers within ~500ms. **Log assertion: zero `setFocus(["detect"]) ... timed out` warnings during the session.**
2. With Editorial cursor in scripture pane, simulate 10 verse-down clicks at 1Hz. UI stays responsive throughout.
3. Switch scope to `current-chapter`. Move cursor between verses 10 times. **Assert no backend `loadDictionary` / `loadEncyclopedia` / `loadMedia` calls fire.**
4. Toggle "Highlight all research terms" 5 times. Each toggle returns control to the event loop within one frame.
5. Switch tabs Dictionary → Encyclopedia → Media-Images → Media-Maps. Each switch resolves within ~1s of activation.
6. Visual check: marble-word underlines present, click-to-filter works, filter ribbon appears, highlight-all tints all words.

### Profile gate (manual, one-time before merge)

Chrome DevTools Performance tab via CDP port 9223, record 5s of "open ER + click 3 words":

- Total long-task time during the recording: < 1s (today: 30s+)
- `setAnnotation` call count: equal to annotation count × 1 (today: × N where N is render count during recording)

### Existing test suite

- `cd extensions/src/platform-enhanced-resources && npm test` — all unit tests pass
- `npm run test:e2e:enhanced-resources` — UI-PKG-001's 7 active tests still pass

## Risk and rollout

| Fix | Risk                                                                      | Mitigation                                                                                                                                               |
| --- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | None — semantically identical                                             | n/a                                                                                                                                                      |
| 2   | Low — three smaller effects must collectively maintain the same end state | Existing tests + new tests in Verification section                                                                                                       |
| 3   | Low — proxy resolved once, behavior identical                             | Existing `if (!proxy) return` guards remain                                                                                                              |
| 4   | **Medium** — PT9-faithful behavior change for non-`current-verse` scopes  | Pre-implementation grep of `.context/features/enhanced-resources/` for any test that asserts current PT10 behavior; if found, update the test/spec first |
| 5   | Low — same end state, different timing                                    | Cancellation flag prevents stale apply mid-chapter-change                                                                                                |

**Pre-implementation check for Fix 4:** Before touching code, grep `.context/features/enhanced-resources/` for any test scenario or behavior catalog entry that explicitly tests "verse-cursor-move triggers tab reload at scope=current-chapter." If one exists, that's a contract requiring an update to the spec before this fix lands.

**Branch:** This work belongs on the existing in-flight feature branch `ai/feature/enhanced-resources-rolf-03-04-2026` (pre-split-PR pattern; see CLAUDE.md "AI Branch Rules"). All five fixes ship in a single squash-merged PR.

**No feature flag** — these are bug fixes (modulo Fix 4 which matches PT9). If a fix misbehaves, revert the commit.

**No persisted-state migration** — none of the fixes change PAPI contracts, settings, or webview memento shape.

## Out of scope (logged for later)

- Home web view's `getMetadataForAllProjects` flood
- PT9-faithful "only refresh visible tab" gating
- Editorial's per-`setAnnotation` cost (vendor concern; revisit only if Fix 5's chunking proves insufficient)
