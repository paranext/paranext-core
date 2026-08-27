/** Get the windowId or throw if it is not set */
function getWindowIdOrThrow(): number {
  // Compared against `undefined` rather than tested for truthiness: the id is a number now, and a
  // falsiness test would also reject 0 — which is not a window id today, but relying on that is
  // how this breaks quietly if the counter ever starts elsewhere.
  if (globalThis.windowId === undefined)
    throw new Error('windowId is not set. Check that the URL includes the windowId parameter.');
  return globalThis.windowId;
}

const localWindowStorage = {
  getItem(key: string): string | null {
    const prefixedKey = `${getWindowIdOrThrow()}_${key}`;
    const value = localStorage.getItem(prefixedKey);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (value !== null) return value;

    // Migration: check for legacy unprefixed key from before multi-window support. Copied to the
    // prefixed key but NOT deleted: a window never comes back under the id it had (ids are never
    // reused), so the copy under this window's id is unreachable after a restart and the unprefixed
    // original is the only key a restored window can still find.
    const legacyValue = localStorage.getItem(key);
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (legacyValue !== null) {
      localStorage.setItem(prefixedKey, legacyValue);
      return legacyValue;
    }
    // Must return null to match the Storage.getItem interface contract
    // eslint-disable-next-line no-null/no-null
    return null;
  },
  setItem(key: string, value: string): void {
    return localStorage.setItem(`${getWindowIdOrThrow()}_${key}`, value);
  },
};

export default localWindowStorage;
