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
 */

/**
 * One token per registered overlay, rather than a count: an unregister that ran twice — which React
 * does on its own in development, by mounting effects twice — would take a count below zero and
 * silently stop blocking, while deleting an absent token is simply nothing.
 */
const blockers = new Set<symbol>();
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

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
  notify();
  return () => {
    if (blockers.delete(token)) notify();
  };
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToWindowBlockingOverlays(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
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
  listeners.clear();
}
