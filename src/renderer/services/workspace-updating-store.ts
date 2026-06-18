/**
 * Store tracking whether the workspace is currently switching projects.
 *
 * Uses a reference counter so concurrent switches don't prematurely hide the overlay: the visible
 * state (isUpdating) only flips to false once every in-flight switch has finished.
 *
 * A 30-second safety timer resets on every new switch and auto-clears the state if a switch never
 * resolves (e.g. the extension deactivates mid-switch and the did-finish event is never emitted).
 */

/**
 * Heuristic upper bound; if a switch never resolves (e.g. extension deactivates mid-switch),
 * auto-clear after this long.
 */
const SWITCH_SAFETY_TIMEOUT_MS = 30_000;

let switchCount = 0;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function setWorkspaceUpdating(value: boolean): void {
  const wasUpdating = switchCount > 0;
  if (value) {
    switchCount += 1;
    // Reset the safety timer on each new switch, giving 30 s from the latest start.
    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(() => {
      switchCount = 0;
      safetyTimer = undefined;
      notifyListeners();
    }, SWITCH_SAFETY_TIMEOUT_MS);
  } else {
    switchCount = Math.max(0, switchCount - 1);
    if (switchCount === 0) {
      clearTimeout(safetyTimer);
      safetyTimer = undefined;
    }
  }
  const isNowUpdating = switchCount > 0;
  if (wasUpdating !== isNowUpdating) notifyListeners();
}

export function getWorkspaceUpdating(): boolean {
  return switchCount > 0;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToWorkspaceUpdating(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only. @internal
 */
export function resetWorkspaceUpdating(): void {
  switchCount = 0;
  clearTimeout(safetyTimer);
  safetyTimer = undefined;
  listeners.clear();
}
