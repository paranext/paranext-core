# Per-View Zoom

Date: 2026-04-17
Branch: `ai/feature/zoom-katherine-04-17-2026`

## Problem

Today, Ctrl+/- zooms the entire application window via `mainWindow.webContents.setZoomFactor` — tab bar, title chrome, and every view together. Users want zoom scoped to the view they are working in: zoom the editor without shrinking the tab bar, zoom a dialog without affecting the tab behind it, keep different view types at different sizes.

## Acceptance Criteria

1. Ctrl+= / Ctrl++ / Ctrl+- zoom in/out in whichever tab or dialog has keyboard focus.
2. Ctrl+0 resets the focused view to default (1.0).
3. Ctrl+mousewheel zooms the view under the mouse pointer (which may differ from the focused view).
4. Any tab or dialog can be zoomed — WebView tabs, native tabs (Settings, About, etc.), and modal/overlay dialogs.
5. Zoom levels persist across app restarts.
6. Window chrome (tab bar, title bar) stays at 100%.

Out of scope for this iteration: pinch-to-zoom, a View menu UI for zoom, and per-instance zoom for non-editor view types.

## Design

### Architectural shift

Zoom moves from the main process (`webContents.setZoomFactor`) to the renderer, using CSS `zoom` applied per view container. The existing main-process zoom shortcuts and the `platform.zoomFactor` setting are removed. No migration: users whose window chrome was scaled will see it return to 100% once; per-view zoom starts fresh.

### Three layers

**1. Zoom state store** — `view-zoom.service.ts` in the renderer. Owns a `Map<zoomKey, number>`, reads/writes to `settingsService`, broadcasts changes to subscribers. Debounces persistence (~250ms) to avoid thrashing on wheel scrolls.

Service API:

```ts
getZoom(key: string): number
setZoom(key: string, factor: number): void       // clamped to [MIN, MAX]
adjustZoom(key: string, deltaSteps: number): void // ±0.1 per step
resetZoom(key: string): void                      // deletes the entry
subscribe(key: string, cb: (factor: number) => void): Unsubscriber
```

Bounds reuse `MIN_ZOOM_FACTOR` (0.5), `MAX_ZOOM_FACTOR` (3.0), `DEFAULT_ZOOM_FACTOR` (1.0), and step 0.1 from `@shared/data/platform.data`.

**2. View containers** — each view wraps its content so CSS `zoom` applies to it alone:

- WebView tabs: set `style.zoom` on the existing `<iframe>` in `web-view.component.tsx`.
- Native tabs: wrap content in a `<ZoomContainer viewType={...}>` at the tab render hook (`platform-dock-tab.component.tsx` / `tab-panel.component.tsx`).
- Dialogs: wrap in `<ZoomContainer>` inside `overlay-modal-dialog.component.tsx` and sibling overlay components.

Every container renders a `data-view-type` attribute on its root element so pointer hit-testing can find it.

`CSS zoom` is chosen over `transform: scale()` because it is what Chromium's own browser zoom uses: hit-testing, `getBoundingClientRect`, scroll regions, and input event coordinates all remain correct. `transform: scale()` breaks the dock-layout's coordinate math.

**3. Input handling** — one renderer-side module, `view-zoom.input.ts`, wired into `app.component.tsx`. Two window-level listeners, both capture-phase:

- `keydown`: matches Ctrl+= / Ctrl++ / Ctrl+- / Ctrl+0 (Cmd on macOS, matching existing `input.meta` convention). Resolves target view via focus:
  1. If a modal/overlay dialog is open, target the topmost dialog.
  2. Else target the focused tab (via dock-layout active id).
  3. Else no-op.
- `wheel` (`{ passive: false }`): only acts when `event.ctrlKey` (or `metaKey`). Resolves target via `event.target.closest('[data-view-type]')`. `deltaY < 0` zooms in one step, `deltaY > 0` zooms out.

Both handlers call `preventDefault` on match.

**Cross-iframe keyboard edge case:** keyboard events inside a WebView iframe fire on the iframe's window, not the parent. Existing key-forwarding infrastructure in the webview preload/sandbox layer will be checked during implementation; if Ctrl+/-/0 is not already forwarded, a small forwarder is added so the renderer-side listener sees the event.

### Zoom keys (per-instance for editors, per-type for everything else)

A `getZoomKey(view)` helper determines the storage key:

```ts
PER_INSTANCE_VIEW_TYPES.has(view.webViewType)
  ? `${view.webViewType}:${view.id}` // per-instance
  : view.viewType; // per-type
```

`PER_INSTANCE_VIEW_TYPES` is an allowlist of document-like views where each instance is meaningfully distinct — initial list proposed during implementation, covering:

- Scripture editor
- Notes / comment editors
- Resource viewers
- Parallel passages / side-by-side views

All other webViews, native tabs, and dialogs key by view type. Dialogs are transient (no persistent id) so per-instance does not apply.

**New-instance fallback:** when a per-instance editor opens and no key exists for its id, the store returns the last-set default for that type (stored under `${viewType}:__default`, updated whenever any instance's zoom changes). New editors therefore open at "the editor size you last chose" while existing editors keep their own remembered levels.

**Pruning:** on app startup, per-instance keys whose tab id does not appear in the persisted dock-layout are dropped. Prevents unbounded growth as users open and close editors over time.

### Settings

New setting replaces `platform.zoomFactor`:

```ts
'platform.viewZooms': Record<string, number>  // default: {}
```

One object keyed as described above. Values clamped on write.

### Hook for views

A small React hook makes container wiring trivial:

```ts
function useViewZoom(key: string): number;
```

Subscribes to the store for `key` and returns the current factor (default 1.0). Containers apply `style={{ zoom: useViewZoom(key) }}`.

## Testing

Unit tests:

- `view-zoom.service`: clamping at min/max, debounced persist, subscribe/unsubscribe, `resetZoom` deletes, per-instance fallback to `__default`, startup pruning.
- `view-zoom.input`: keyboard combos map to the right action; wheel respects modifier; focused-view vs. pointer-view resolution; dialog-over-tab precedence.
- `getZoomKey`: per-type vs. per-instance resolution.

Integration tests (renderer):

- `web-view.component` applies `style.zoom` reactively when the service value changes.
- Dialog and native-tab `ZoomContainer`s read from the service.

Manual smoke (acceptance-criteria checklist):

1. Two editor instances zoom independently; new editor opens at last-used editor zoom.
2. Two settings tabs (if possible) share one zoom.
3. Ctrl+wheel over editor zooms editor; Ctrl+wheel over a side panel zooms only the panel.
4. Confirm-dialog over an editor: Ctrl+= zooms the dialog, not the editor.
5. Ctrl+0 resets only the focused view.
6. Restart app: per-type zooms persist; per-instance editor zooms persist for still-open tabs; closed-tab entries are pruned.
7. Tab bar and title bar stay at 100% at all zoom levels.

## Rollout

Single PR, no feature flag. The existing `platform.zoomFactor` is removed without migration.

## Risks & open questions

- **Cross-iframe key forwarding** — the one integration unknown. If the existing webview sandbox already forwards keydowns to the parent, nothing to add; if not, a small forwarder in the preload/sandbox layer is needed. Assessed during implementation.
- **CSS `zoom` inside iframes with their own layout logic** — most content should be fine, but highly custom editors that measure viewport dimensions may need spot-checks after the change.
- **Deferred** — pinch-to-zoom and a View menu UI are follow-ups, not part of this iteration.
