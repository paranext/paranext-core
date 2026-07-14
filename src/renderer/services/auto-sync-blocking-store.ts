/**
 * Store tracking whether an automatic (scheduled) Send/Receive is currently blocking the workspace.
 *
 * Uses a reference counter so overlapping blockers don't prematurely hide the overlay: the visible
 * state (isBlocking) only flips to false once every in-flight blocker has cleared.
 *
 * Visibility has a 200 ms show-grace matching PT9's automatic-sync surface: on the first raise a
 * grace timer is armed, and listeners only ever see `true` if blocking is still in flight when it
 * fires. A sync that finishes within the grace never shows anything.
 *
 * A 10-minute safety timer re-arms on every raise and auto-clears the state if a blocker never
 * clears (e.g. the extension deactivates mid-sync and the clearing event is never emitted).
 */

/**
 * How long blocking must persist before it becomes visible; a sync finishing inside this window
 * shows nothing (PT9 parity).
 */
const SHOW_GRACE_MS = 200;

/**
 * Heuristic upper bound; if a blocker never clears (e.g. extension deactivates mid-sync),
 * auto-clear after this long. Matches SHUTDOWN_SYNC_TIME_OUT_MS in src/main/shutdown-tasks.ts — a
 * scheduled sync of a large repo can run minutes, so the leash is deliberately long.
 */
const SAFETY_TIMEOUT_MS = 10 * 60 * 1000;

let blockCount = 0;
let isBlockingVisible = false;
let graceTimer: ReturnType<typeof setTimeout> | undefined;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/** Flips the derived visibility, notifying listeners only when it actually changes. */
function setBlockingVisible(value: boolean): void {
  if (isBlockingVisible === value) return;
  isBlockingVisible = value;
  notifyListeners();
}

export function setAutoSyncBlocking(value: boolean): void {
  if (value) {
    blockCount += 1;
    // Re-arm the safety timer on each raise, giving 10 min from the latest start.
    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(() => {
      blockCount = 0;
      safetyTimer = undefined;
      clearTimeout(graceTimer);
      graceTimer = undefined;
      setBlockingVisible(false);
    }, SAFETY_TIMEOUT_MS);
    // On 0→1, arm the show grace; visibility only turns on if blocking survives the grace.
    if (blockCount === 1) {
      graceTimer = setTimeout(() => {
        graceTimer = undefined;
        if (blockCount > 0) setBlockingVisible(true);
      }, SHOW_GRACE_MS);
    }
  } else {
    blockCount = Math.max(0, blockCount - 1);
    if (blockCount === 0) {
      // Cancel a pending grace timer — blocking cleared inside the grace, so nothing ever shows.
      clearTimeout(graceTimer);
      graceTimer = undefined;
      clearTimeout(safetyTimer);
      safetyTimer = undefined;
      setBlockingVisible(false);
    }
  }
}

export function getAutoSyncBlocking(): boolean {
  return isBlockingVisible;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToAutoSyncBlocking(listener: () => void): () => void {
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
export function resetAutoSyncBlocking(): void {
  blockCount = 0;
  isBlockingVisible = false;
  clearTimeout(graceTimer);
  graceTimer = undefined;
  clearTimeout(safetyTimer);
  safetyTimer = undefined;
  listeners.clear();
}
