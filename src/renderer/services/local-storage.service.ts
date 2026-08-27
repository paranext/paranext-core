/**
 * Per-window `localStorage`.
 *
 * Keys are namespaced by the window's own platform id, which is durable across a restart (see
 * `WindowLayoutEntry.windowId`) — a restored window is handed the same id its persisted entry
 * already carries, so it finds what it saved last time even though nothing about the id itself was
 * ever asked for.
 *
 * `globalThis.windowId` is set by the renderer's boot module (`global-this.model.ts`) from the
 * `WINDOW_ID` query parameter before anything else runs — so storage works from the first render,
 * in every interface mode. A read or write made without it throws rather than guessing a key.
 */

import { WINDOW_ID_SHAPE_PATTERN_SOURCE } from '@shared/utils/util';

/**
 * The one key this store writes. Owned here, beside the sweep and the prune that both have to know
 * it, and imported by the web view state service that reads and writes through it.
 */
export const WEB_VIEW_STATE_KEY = 'web-view-state';

/** Get this window's id, or throw if this window was not told which one it is */
function getWindowIdOrThrow(): string {
  if (globalThis.windowId === undefined)
    throw new Error(
      'This window does not know its id. Per-window storage is only available to a window whose URL names one.',
    );
  return globalThis.windowId;
}

/**
 * The one key this store wrote under the scheme that preceded durable ids, prefixed by the window
 * id at the time. Those blobs can never be found again — a window restored under that scheme always
 * came back with a new id — so they are removed on first use rather than left to accumulate, one
 * orphaned blob per window per session.
 *
 * Exactly that key and no other `${digits}_` key: the pre-multi-window dock layout is still read
 * from `${windowId}_dock-saved-layout` by the layout load, and this `localStorage` is shared with
 * every web view iframe, whose own keys may happen to start with digits.
 */
const OBSOLETE_WINDOW_ID_KEY_PATTERN = new RegExp(`^\\d+_${WEB_VIEW_STATE_KEY}$`);

/** Every key this store has written, whatever prefix it used, with that prefix captured */
const STORED_STATE_KEY_PATTERN = new RegExp(`^(.+)_${WEB_VIEW_STATE_KEY}$`);

/**
 * Whether a prefix has the shape a durable window id has. A POSITIVE match rather than an
 * exclusion: this storage is shared with every web view iframe, so a prefix this store did not
 * write itself — an extension's own key that happens to end in `_web-view-state` — must not be
 * swept up as if it named a dead window, and requiring the shape is what tells the two apart. See
 * {@link WINDOW_ID_SHAPE_PATTERN_SOURCE} for why this matches by shape rather than requiring an
 * RFC-4122-strict UUID.
 */
const WINDOW_ID_PATTERN = new RegExp(`^${WINDOW_ID_SHAPE_PATTERN_SOURCE}$`, 'i');

let haveObsoleteKeysBeenRemoved = false;

/**
 * Remove every web-view-state blob written under the pre-durable-id `${windowId}_` scheme, and — if
 * there were any — the unprefixed blob that scheme migrated from. Runs once per process, on the
 * first read or write, and is a no-op on a profile that never had either.
 *
 * Deliberately not migrated: nothing recorded which of those transient window ids belonged to which
 * window, and windows were never created in a predictable order, so any mapping would be a guess
 * that could hand one window's state to another. Per-tab UI state resets once on upgrade; layouts,
 * bounds and open tabs live in the structure and are untouched.
 *
 * The unprefixed blob goes with them because it is older than all of them: the window-id scheme
 * copied it and left it in place for other windows to migrate from. Leaving it for the legacy
 * fallback below would answer a window with state from before multi-window while the newer state
 * was being dropped in this same call — a silent rollback, where the reset above is a reset. A
 * profile that only ever had the unprefixed blob never enters this branch, so the upgrade path from
 * before multi-window still migrates as it did.
 */
function removeObsoleteWindowIdKeys(): void {
  if (haveObsoleteKeysBeenRemoved) return;
  haveObsoleteKeysBeenRemoved = true;
  const obsoleteKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && OBSOLETE_WINDOW_ID_KEY_PATTERN.test(key)) obsoleteKeys.push(key);
  }
  if (obsoleteKeys.length === 0) return;
  obsoleteKeys.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(WEB_VIEW_STATE_KEY);
}

/**
 * Every window id that has state stored under it, whether or not that window still exists.
 *
 * Keys from the pre-durable-id scheme are left out: {@link removeObsoleteWindowIdKeys} owns those,
 * and it spares the legacy dock layout stored under the same kind of prefix.
 */
export function getWindowIdsWithStoredState(): string[] {
  const windowIds = new Set<string>();
  for (let i = 0; i < localStorage.length; i += 1) {
    const prefix = localStorage.key(i)?.match(STORED_STATE_KEY_PATTERN)?.[1];
    if (prefix && WINDOW_ID_PATTERN.test(prefix)) windowIds.add(prefix);
  }
  return [...windowIds];
}

/**
 * Remove the state stored under each of the given window ids.
 *
 * For windows that have left the persisted structure: a window id is never reissued, so no window
 * can ever ask for their state again, and nothing else would remove it — one blob per closed
 * window, for the life of the profile, in storage every window of the profile shares.
 */
export function removeStateOfWindows(windowIds: string[]): void {
  windowIds.forEach((windowId) => localStorage.removeItem(`${windowId}_${WEB_VIEW_STATE_KEY}`));
}

const localWindowStorage = {
  getItem(key: string): string | null {
    // The key is resolved before the sweep so that an access made too early throws without having
    // destroyed anything first
    const windowKey = `${getWindowIdOrThrow()}_${key}`;
    removeObsoleteWindowIdKeys();
    const value = localStorage.getItem(windowKey);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (value !== null) return value;

    // Migration: check for legacy unprefixed key from before multi-window support. Copied to the
    // window's key but NOT deleted: more than one window can restore from a single-window profile,
    // and each needs to find the original until it has saved its own.
    const legacyValue = localStorage.getItem(key);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (legacyValue !== null) {
      localStorage.setItem(windowKey, legacyValue);
      return legacyValue;
    }
    // Must return null to match the Storage.getItem interface contract
    // eslint-disable-next-line no-null/no-null
    return null;
  },
  setItem(key: string, value: string): void {
    const windowKey = `${getWindowIdOrThrow()}_${key}`;
    removeObsoleteWindowIdKeys();
    return localStorage.setItem(windowKey, value);
  },
};

/** Internal-only export for testing; not for use in development */
export const testingLocalWindowStorage = {
  resetForTesting(): void {
    haveObsoleteKeysBeenRemoved = false;
  },
};

export default localWindowStorage;
