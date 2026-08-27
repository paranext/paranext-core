/**
 * Per-window `localStorage`.
 *
 * Keys are namespaced by the window's slot — the stable identity of its entry in the persisted
 * window-layouts structure — so a restored window finds what its slot saved last time. A window is
 * never restored under the window id it had (ids are never reused), so keying by window id would
 * make every restart start empty; the slot is what survives a restart.
 *
 * The main process puts the slot on the window's URL, and the renderer's boot module
 * (`global-this.model.ts`) calls {@link setWindowSlotId} with it before anything else runs — so
 * storage works from the first render, in every interface mode. A read or write made without a slot
 * throws rather than guessing a key.
 */

/** Slot this window occupies in the persisted structure, as main put it on the window's URL */
let windowSlotId: string | undefined;

/**
 * Record which slot this window occupies. Called once, at renderer boot, with the id the main
 * process put on the window's URL.
 *
 * Reading or writing per-window storage before this has run throws: a key built from nothing would
 * file this window's state under a name no restored window ever asks for.
 */
export function setWindowSlotId(slotId: string): void {
  windowSlotId = slotId;
}

/** Get this window's slot id or throw if this window was not told which slot it occupies */
function getSlotIdOrThrow(): string {
  if (windowSlotId === undefined)
    throw new Error(
      'This window does not know its slot. Per-window storage is only available to a window whose URL names one.',
    );
  return windowSlotId;
}

/**
 * The one key this store wrote under the scheme that preceded slots, prefixed by the window id at
 * the time. Those blobs can never be found again — a restored window always has a new id — so they
 * are removed on first use rather than left to accumulate, one orphaned blob per window per
 * session.
 *
 * Exactly that key and no other `${digits}_` key: the pre-multi-window dock layout is still read
 * from `${windowId}_dock-saved-layout` by the layout load, and this `localStorage` is shared with
 * every web view iframe, whose own keys may happen to start with digits.
 */
const OBSOLETE_WINDOW_ID_KEY_PATTERN = /^\d+_web-view-state$/;

let haveObsoleteKeysBeenRemoved = false;

/**
 * Remove every web-view-state blob written under the pre-slot `${windowId}_` scheme. Runs once per
 * process, on the first read or write, and is a no-op on a profile that never had them.
 *
 * Deliberately not migrated: nothing recorded which window id belonged to which slot, and windows
 * were never created in slot order, so any mapping would be a guess that could hand one window's
 * state to another. Per-tab UI state resets once on upgrade; layouts, bounds and open tabs live in
 * the structure and are untouched.
 */
function removeObsoleteWindowIdKeys(): void {
  if (haveObsoleteKeysBeenRemoved) return;
  haveObsoleteKeysBeenRemoved = true;
  const obsoleteKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && OBSOLETE_WINDOW_ID_KEY_PATTERN.test(key)) obsoleteKeys.push(key);
  }
  obsoleteKeys.forEach((key) => localStorage.removeItem(key));
}

const localWindowStorage = {
  getItem(key: string): string | null {
    // The key is resolved before the sweep so that an access made too early throws without having
    // destroyed anything first
    const slotKey = `${getSlotIdOrThrow()}_${key}`;
    removeObsoleteWindowIdKeys();
    const value = localStorage.getItem(slotKey);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (value !== null) return value;

    // Migration: check for legacy unprefixed key from before multi-window support. Copied to the
    // slot key but NOT deleted: more than one window can restore from a single-window profile, and
    // each needs to find the original until it has saved its own.
    const legacyValue = localStorage.getItem(key);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (legacyValue !== null) {
      localStorage.setItem(slotKey, legacyValue);
      return legacyValue;
    }
    // Must return null to match the Storage.getItem interface contract
    // eslint-disable-next-line no-null/no-null
    return null;
  },
  setItem(key: string, value: string): void {
    const slotKey = `${getSlotIdOrThrow()}_${key}`;
    removeObsoleteWindowIdKeys();
    return localStorage.setItem(slotKey, value);
  },
};

/** Internal-only export for testing; not for use in development */
export const testingLocalWindowStorage = {
  resetForTesting(): void {
    windowSlotId = undefined;
    haveObsoleteKeysBeenRemoved = false;
  },
};

export default localWindowStorage;
