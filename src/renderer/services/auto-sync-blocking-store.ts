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
 * Each raise arms its own one-shot 10-minute safety leash that releases just that block if it never
 * clears (e.g. the extension deactivates mid-sync and the clearing event is never emitted), so one
 * stale expiry can never wipe newer in-flight blockers.
 */

import { AUTO_SYNC_MAX_DURATION_MS } from '@shared/data/platform.data';

/**
 * How long blocking must persist before it becomes visible; a sync finishing inside this window
 * shows nothing (PT9 parity).
 */
const SHOW_GRACE_MS = 200;

/**
 * Heuristic upper bound; if a blocker never clears (e.g. extension deactivates mid-sync),
 * auto-clear after this long. Each blocker leash bounds a single automatic Send/Receive — exactly
 * what {@link AUTO_SYNC_MAX_DURATION_MS} is.
 */
const SAFETY_TIMEOUT_MS = AUTO_SYNC_MAX_DURATION_MS;

let blockCount = 0;
let isBlockingVisible = false;
let graceTimer: ReturnType<typeof setTimeout> | undefined;
/**
 * One outstanding safety leash per in-flight blocker, oldest first. Every raise arms its own
 * one-shot leash and every clear cancels the oldest outstanding one, so the array's length always
 * equals `blockCount` and each block is released exactly once — by its clear or by its own leash.
 */
const safetyTimers: ReturnType<typeof setTimeout>[] = [];

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

/** Releases one in-flight block, updating the derived visibility when the last one goes. */
function releaseOneBlock(): void {
  blockCount = Math.max(0, blockCount - 1);
  if (blockCount === 0) {
    // Cancel a pending grace timer — blocking cleared inside the grace, so nothing ever shows.
    clearTimeout(graceTimer);
    graceTimer = undefined;
    setBlockingVisible(false);
  }
}

export function setAutoSyncBlocking(value: boolean): void {
  if (value) {
    blockCount += 1;
    // Arm this block's own one-shot safety leash, 10 min from this raise. When it fires it
    // releases only this block — never the whole count — so a stale expiry cannot wipe newer
    // in-flight blockers.
    const leash = setTimeout(() => {
      const index = safetyTimers.indexOf(leash);
      if (index !== -1) safetyTimers.splice(index, 1);
      releaseOneBlock();
    }, SAFETY_TIMEOUT_MS);
    safetyTimers.push(leash);
    // On 0→1, arm the show grace; visibility only turns on if blocking survives the grace.
    if (blockCount === 1) {
      graceTimer = setTimeout(() => {
        graceTimer = undefined;
        if (blockCount > 0) setBlockingVisible(true);
      }, SHOW_GRACE_MS);
    }
  } else {
    // Cancel the oldest outstanding leash so the block this clear releases cannot be released a
    // second time when its leash fires. Blockers are anonymous, so oldest-first is a pairing
    // heuristic — and the conservative one: the still-open blocks keep the newest (longest
    // remaining) leashes.
    const oldestLeash = safetyTimers.shift();
    if (oldestLeash !== undefined) clearTimeout(oldestLeash);
    releaseOneBlock();
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
  safetyTimers.forEach((leash) => clearTimeout(leash));
  safetyTimers.length = 0;
  listeners.clear();
}
