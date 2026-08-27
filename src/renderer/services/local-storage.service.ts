/**
 * Per-window `localStorage`.
 *
 * Keys are namespaced by the window's slot — the stable identity of its entry in the persisted
 * window-layouts structure — so a restored window finds what its slot saved last time. A window is
 * never restored under the window id it had (ids are never reused), so keying by window id would
 * make every restart start empty; the slot is what survives a restart.
 *
 * The slot is not known until the main process answers the window's first layout request, so the
 * layout-load path calls {@link setWindowSlotId} before anything reads per-window storage. Until
 * then a read or write throws rather than guessing a key.
 */

/** Slot this window occupies in the persisted structure, once main has said which */
let windowSlotId: string | undefined;

/**
 * Record which slot this window occupies. Called once, from the layout load, with the id the main
 * process returned — the only place a window can learn it.
 *
 * Reading or writing per-window storage before this has run throws: a key built from nothing would
 * file this window's state under a name no restored window ever asks for.
 */
export function setWindowSlotId(slotId: string): void {
  windowSlotId = slotId;
}

/** Get this window's slot id or throw if main has not yet said which slot it occupies */
function getSlotIdOrThrow(): string {
  if (windowSlotId === undefined)
    throw new Error(
      'This window does not yet know its slot. Per-window storage is only available once the layout has loaded.',
    );
  return windowSlotId;
}

/**
 * Prefix under which state was keyed before slots existed: the window id at the time. Those keys
 * can never be found again — a restored window always has a new id — so they are removed on first
 * use rather than left to accumulate, one orphaned blob per window per session.
 */
const OBSOLETE_WINDOW_ID_KEY_PATTERN = /^\d+_/;

let haveObsoleteKeysBeenRemoved = false;

/**
 * Remove every key written under the pre-slot `${windowId}_` scheme. Runs once per process, on the
 * first read or write, and is a no-op on a profile that never had them.
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
    removeObsoleteWindowIdKeys();
    const slotKey = `${getSlotIdOrThrow()}_${key}`;
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
    removeObsoleteWindowIdKeys();
    return localStorage.setItem(`${getSlotIdOrThrow()}_${key}`, value);
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
