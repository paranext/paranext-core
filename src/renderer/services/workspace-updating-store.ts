/**
 * Store tracking whether the workspace is currently switching projects.
 *
 * Uses a reference counter so concurrent switches don't prematurely hide the overlay: the visible
 * state (isUpdating) only flips to false once every in-flight switch has finished.
 *
 * Each switch arms its own one-shot 30-second safety leash that releases just that switch if it
 * never resolves (e.g. the extension deactivates mid-switch and the did-finish event is never
 * emitted), so one stale expiry can never wipe newer in-flight switches.
 */

/**
 * Heuristic upper bound; if a switch never resolves (e.g. extension deactivates mid-switch),
 * auto-clear after this long.
 */
const SWITCH_SAFETY_TIMEOUT_MS = 30_000;

let switchCount = 0;
/**
 * One outstanding safety leash per in-flight switch, oldest first. Every start arms its own
 * one-shot leash and every finish cancels the oldest outstanding one, so the array's length always
 * equals `switchCount` and each switch is released exactly once — by its finish or by its own
 * leash. (Same pattern as auto-sync-blocking-store; extracting a shared abstraction is deliberately
 * deferred — PT-4214 Stage U.)
 */
const safetyTimers: ReturnType<typeof setTimeout>[] = [];

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function setWorkspaceUpdating(value: boolean): void {
  const wasUpdating = switchCount > 0;
  if (value) {
    switchCount += 1;
    // Arm this switch's own one-shot safety leash, 30 s from this start. When it fires it releases
    // only this switch — never the whole count — so a stale expiry cannot wipe newer in-flight
    // switches.
    const leash = setTimeout(() => {
      const index = safetyTimers.indexOf(leash);
      if (index !== -1) safetyTimers.splice(index, 1);
      switchCount = Math.max(0, switchCount - 1);
      if (switchCount === 0) notifyListeners();
    }, SWITCH_SAFETY_TIMEOUT_MS);
    safetyTimers.push(leash);
  } else {
    // Cancel the oldest outstanding leash so the switch this finish releases cannot be released a
    // second time when its leash fires. Switches are anonymous, so oldest-first is a pairing
    // heuristic — and the conservative one: the still-open switches keep the newest (longest
    // remaining) leashes.
    const oldestLeash = safetyTimers.shift();
    if (oldestLeash !== undefined) clearTimeout(oldestLeash);
    switchCount = Math.max(0, switchCount - 1);
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
  safetyTimers.forEach((leash) => clearTimeout(leash));
  safetyTimers.length = 0;
  listeners.clear();
}
