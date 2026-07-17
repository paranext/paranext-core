/**
 * Store tracking whether an automatic (scheduled) Send/Receive is currently blocking the workspace.
 *
 * Tracks one entry per in-flight blocker so overlapping blockers don't prematurely hide the
 * overlay: the visible state (isBlocking) only flips to false once every in-flight blocker has been
 * released.
 *
 * Each block is identified by the token {@link raiseAutoSyncBlock} returns, and is released exactly
 * once — by its own clear (calling the token) or by its own one-shot 10-minute safety leash if it
 * never clears (e.g. the extension deactivates mid-sync and the clearing event is never emitted).
 * Identity pairing means a clear can never release a different block and a stale leash can never
 * wipe newer in-flight blockers.
 *
 * Visibility has a 200 ms show-grace matching PT9's automatic-sync surface: on the first raise a
 * grace timer is armed, and listeners only ever see `true` if blocking is still in flight when it
 * fires. A sync that finishes within the grace never shows anything.
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

/** One in-flight blocker: its own safety leash. */
type InFlightBlock = {
  leash: ReturnType<typeof setTimeout>;
};

/**
 * Every in-flight (not yet released) blocker. The raw blocking state is exactly "this set is
 * non-empty", so there is no separate counter to keep in lockstep. (Same pattern as
 * workspace-updating-store; extracting a shared abstraction is deliberately deferred — PT-4214
 * Stage U.)
 */
const inFlightBlocks = new Set<InFlightBlock>();

let isBlockingVisible = false;
let graceTimer: ReturnType<typeof setTimeout> | undefined;

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

/** Releases one block. A no-op if it was already released (identity — released exactly once). */
function releaseBlock(block: InFlightBlock): void {
  if (!inFlightBlocks.has(block)) return;
  inFlightBlocks.delete(block);
  clearTimeout(block.leash);
  if (inFlightBlocks.size === 0) {
    // Cancel a pending grace timer — blocking cleared inside the grace, so nothing ever shows.
    clearTimeout(graceTimer);
    graceTimer = undefined;
    setBlockingVisible(false);
  }
}

/**
 * Registers one in-flight blocker and returns its clear function. Call the returned function when
 * the blocker's sync finishes; it is idempotent and releases only this block. If the block never
 * clears, its own safety leash releases it after {@link SAFETY_TIMEOUT_MS} — a stale leash can never
 * release a newer in-flight blocker.
 */
export function raiseAutoSyncBlock(): () => void {
  const block: InFlightBlock = {
    leash: setTimeout(() => releaseBlock(block), SAFETY_TIMEOUT_MS),
  };
  inFlightBlocks.add(block);
  // On the first raise, arm the show grace; visibility only turns on if blocking survives it.
  if (inFlightBlocks.size === 1) {
    graceTimer = setTimeout(() => {
      graceTimer = undefined;
      if (inFlightBlocks.size > 0) setBlockingVisible(true);
    }, SHOW_GRACE_MS);
  }
  return () => releaseBlock(block);
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
  inFlightBlocks.forEach((block) => clearTimeout(block.leash));
  inFlightBlocks.clear();
  isBlockingVisible = false;
  clearTimeout(graceTimer);
  graceTimer = undefined;
  listeners.clear();
}
