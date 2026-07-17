/**
 * Store tracking whether the workspace is currently switching projects.
 *
 * Tracks one entry per in-flight switch so concurrent switches don't prematurely hide the overlay:
 * the visible state (isUpdating) only flips to false once every in-flight switch has been
 * released.
 *
 * Each switch is identified by the token {@link startWorkspaceUpdate} returns, and is released
 * exactly once — by its own finish (calling the token) or by its own one-shot 30-second safety
 * leash if it never resolves (e.g. the extension deactivates mid-switch and the did-finish event is
 * never emitted). Identity pairing means a finish can never release a different switch and a stale
 * leash can never wipe newer in-flight switches.
 */

/**
 * Heuristic upper bound; if a switch never resolves (e.g. extension deactivates mid-switch),
 * auto-clear after this long.
 */
const SWITCH_SAFETY_TIMEOUT_MS = 30_000;

/** One in-flight switch: its own safety leash plus the caller's release notification. */
type InFlightSwitch = {
  leash: ReturnType<typeof setTimeout>;
  onReleased: (() => void) | undefined;
};

/**
 * Every in-flight (not yet released) switch. `getWorkspaceUpdating()` is exactly "this set is
 * non-empty", so there is no separate counter to keep in lockstep. (Same pattern as
 * auto-sync-blocking-store; extracting a shared abstraction is deliberately deferred — PT-4214
 * Stage U.)
 */
const inFlightSwitches = new Set<InFlightSwitch>();

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/** Releases one switch. A no-op if it was already released (identity — released exactly once). */
function releaseSwitch(inFlightSwitch: InFlightSwitch): void {
  if (!inFlightSwitches.has(inFlightSwitch)) return;
  inFlightSwitches.delete(inFlightSwitch);
  clearTimeout(inFlightSwitch.leash);
  inFlightSwitch.onReleased?.();
  if (inFlightSwitches.size === 0) notifyListeners();
}

/**
 * Registers the start of a project switch and returns its release function. Call the returned
 * function when the switch finishes; it is idempotent and releases only this switch. If the switch
 * never finishes, its own safety leash releases it after {@link SWITCH_SAFETY_TIMEOUT_MS} — a stale
 * leash can never release a newer in-flight switch.
 *
 * @param onReleased Called exactly once when this switch is released, by either path (its finish or
 *   its leash). Lets the caller drop its own bookkeeping for the switch without leaking entries for
 *   abandoned switches.
 */
export function startWorkspaceUpdate(onReleased?: () => void): () => void {
  const wasUpdating = inFlightSwitches.size > 0;
  const inFlightSwitch: InFlightSwitch = {
    leash: setTimeout(() => releaseSwitch(inFlightSwitch), SWITCH_SAFETY_TIMEOUT_MS),
    onReleased,
  };
  inFlightSwitches.add(inFlightSwitch);
  if (!wasUpdating) notifyListeners();
  return () => releaseSwitch(inFlightSwitch);
}

export function getWorkspaceUpdating(): boolean {
  return inFlightSwitches.size > 0;
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
  inFlightSwitches.forEach((inFlightSwitch) => clearTimeout(inFlightSwitch.leash));
  inFlightSwitches.clear();
  listeners.clear();
}
