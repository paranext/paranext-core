/**
 * Store tracking the full-screen overlays that hold this window's input without registering in the
 * overlay store — the connection-lost banner, the workspace-updating cover and the first-run gate.
 * Each mounts itself directly in `app.component.tsx` and deliberately bypasses `OverlayHost`, so
 * asking `overlay-store.ts` alone cannot see them, and a handler that stands down for a modal
 * dialog would go on acting behind these.
 *
 * Deliberately import-free, like `connection-lost-store.ts` and `workspace-updating-store.ts`: the
 * overlays register themselves while they are up, so a consumer's test can drive this store
 * directly instead of mocking a component graph to reach it.
 *
 * Read-on-demand only, with no subscription half: the one reader (`window-input-blocked.util.ts`)
 * answers a keystroke that has already arrived, so it asks the question at that moment rather than
 * tracking the answer. A consumer that has to re-render when this changes would need a `subscribe`
 * added here alongside `useSyncExternalStore`.
 */

/**
 * One token per registered overlay, rather than a count: `unregister` is a closure the caller holds
 * and nothing stops it being called twice, which would take a count below zero and leave the window
 * reading as unblocked while an overlay is still up. Deleting an absent token is simply nothing.
 */
const blockers = new Set<symbol>();

/** Whether any full-screen overlay is currently holding this window. */
export function isWindowBlockedByOverlay(): boolean {
  return blockers.size > 0;
}

/**
 * Marks this window as held by an overlay until the returned function is called. Calling it more
 * than once is a no-op.
 */
export function registerWindowBlockingOverlay(): () => void {
  const token = Symbol('window-blocking-overlay');
  blockers.add(token);
  return () => {
    blockers.delete(token);
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only.
 *
 * @internal
 */
export function resetWindowBlockingOverlays(): void {
  blockers.clear();
}
