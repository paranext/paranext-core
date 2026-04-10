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
    // localStorage.getItem returns null when the key doesn't exist
    // eslint-disable-next-line no-null/no-null
    if (value !== null) return value;

    // Migration: check for legacy unprefixed key from before multi-window support.
    // Copy to the prefixed key but do NOT delete the legacy key — Electron's BrowserWindow.id
    // is not guaranteed to be stable across restarts, so the legacy key must remain as a fallback.
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
