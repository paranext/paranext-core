/** Get the windowId or throw if it is not set */
function getWindowIdOrThrow(): string {
  if (!globalThis.windowId)
    throw new Error('windowId is not set. Check that the URL includes the windowId parameter.');
  return globalThis.windowId;
}

const localWindowStorage = {
  getItem(key: string): string | null {
    const prefixedKey = `${getWindowIdOrThrow()}_${key}`;
    const value = localStorage.getItem(prefixedKey);
    // eslint-disable-next-line no-null/no-null
    if (value !== null) return value;

    // Migration: check for legacy unprefixed key from before multi-window support
    const legacyValue = localStorage.getItem(key);
    // eslint-disable-next-line no-null/no-null
    if (legacyValue !== null) {
      localStorage.setItem(prefixedKey, legacyValue);
      localStorage.removeItem(key);
      return legacyValue;
    }
    // eslint-disable-next-line no-null/no-null
    return null;
  },
  setItem(key: string, value: string): void {
    return localStorage.setItem(`${getWindowIdOrThrow()}_${key}`, value);
  },
};

export default localWindowStorage;
