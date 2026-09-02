import {
  clearBooleanFlag,
  readBooleanFlag,
  writeBooleanFlag,
} from '@renderer/services/local-storage-flag.util';

/**
 * Persists whether the Simple-mode orientation tour has run. Deliberately separate from the
 * first-run store: the tour is not a first-run signal — it shows to any already-onboarded user who
 * has not yet seen it, not only to someone who just finished the wizard.
 *
 * Kept in sync with `ONBOARDING_TOUR_DONE_KEY` in `e2e-tests/fixtures/helpers.ts`, which needs the
 * same key from the Playwright Node context where renderer source cannot be imported.
 */
export const ONBOARDING_TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

/** Returns true if the onboarding tour has been completed or skipped. */
export function readTourDone(): boolean {
  return readBooleanFlag(ONBOARDING_TOUR_DONE_KEY);
}

/**
 * Fired in THIS window when the flag changes here. The browser's own `storage` event reaches every
 * same-origin window except the one that performed the write, so a store listening only for that
 * would report every window's writes but its own.
 */
const TOUR_DONE_SYNC_EVENT = 'platform-bible.onboardingTourDoneChanged';

const tourDoneListeners = new Set<() => void>();

function notifyTourDoneListeners() {
  tourDoneListeners.forEach((listener) => listener());
}

/** Records that the onboarding tour has been completed or skipped. */
export function writeTourDone(): void {
  writeBooleanFlag(ONBOARDING_TOUR_DONE_KEY, true);
  window.dispatchEvent(new Event(TOUR_DONE_SYNC_EVENT));
}

/**
 * Subscribes to changes in the completion flag, in this window or any other. Returns the
 * unsubscriber `useSyncExternalStore` expects; pair it with {@link readTourDone} as the snapshot.
 *
 * `localStorage` is shared across same-origin renderers but writes fire no event in the writing
 * window, and nothing collapses a Power user's extra windows when they switch to Simple — so
 * without this, finishing the tour in one window leaves the others' overlays up until something
 * unrelated happens to re-render them.
 */
export function subscribeToTourDone(listener: () => void): () => void {
  if (tourDoneListeners.size === 0) {
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener(TOUR_DONE_SYNC_EVENT, notifyTourDoneListeners);
  }
  tourDoneListeners.add(listener);
  return () => {
    tourDoneListeners.delete(listener);
    if (tourDoneListeners.size === 0) {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener(TOUR_DONE_SYNC_EVENT, notifyTourDoneListeners);
    }
  };
}

/** Another window wrote to storage. Only this one key concerns the tour. */
function handleStorageEvent(event: StorageEvent) {
  if (event.key !== ONBOARDING_TOUR_DONE_KEY) return;
  notifyTourDoneListeners();
}

/**
 * Clears the completion flag so the tour shows again on the next mount.
 *
 * WARNING: Test-only. @internal
 */
export function resetTourDone(): void {
  clearBooleanFlag(ONBOARDING_TOUR_DONE_KEY);
}

/**
 * How many times the tour has been asked to run again in this window since it loaded.
 *
 * A count rather than a flag, because it is also what `OnboardingTour` keys its remount on: asking
 * a second time while the tour is already open has to restart it from stop 1, which a boolean that
 * is already `true` cannot express. Deliberately not persisted — a replay is a thing the user asked
 * for now, not a state the next launch should inherit.
 */
let tourReplayCount = 0;
const tourReplayListeners = new Set<() => void>();

/**
 * Runs the tour again in this window, from its first stop, whether or not the user has already
 * completed it. Called by the onboarding tour service shard on behalf of the Help menu item.
 */
export function requestTourReplay(): void {
  tourReplayCount += 1;
  tourReplayListeners.forEach((listener) => listener());
}

/** Reads the current replay count — the `useSyncExternalStore` snapshot. */
export function getTourReplayCount(): number {
  return tourReplayCount;
}

/** Subscribes to replay requests. Returns the unsubscriber `useSyncExternalStore` expects. */
export function subscribeToTourReplay(listener: () => void): () => void {
  tourReplayListeners.add(listener);
  return () => {
    tourReplayListeners.delete(listener);
  };
}
