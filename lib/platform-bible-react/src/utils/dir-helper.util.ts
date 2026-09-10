/** Text and layout direction */
export type Direction = 'rtl' | 'ltr';

const STORAGE_KEY: string = 'layoutDirection';

/**
 * `localStorage`, or `undefined` when it cannot be used.
 *
 * A detached iframe's `window.localStorage` reports `null` rather than a `Storage` object, and in
 * some sandboxed iframes the property access itself throws (a `SecurityError`). Many shared
 * components - `dropdown-menu`, `dialog`, `popover`, `select`, `tabs`, and others - call
 * `readDirection` during render, and every one of them is bundled into every web view, so this must
 * never throw, including while a web view's iframe is mid-reparent inside the dock.
 */
function getStorage(): Storage | undefined {
  try {
    return globalThis.localStorage ?? undefined;
  } catch {
    return undefined;
  }
}

/** Read layout direction from localStorage, or return 'ltr' when storage is unavailable */
export function readDirection(): Direction {
  const retrieved = getStorage()?.getItem(STORAGE_KEY);
  if (retrieved === 'rtl') {
    return retrieved;
  }
  return 'ltr';
}

/** Write layout direction to localStorage. A no-op when storage is unavailable. */
export function persistDirection(dir: Direction): void {
  getStorage()?.setItem(STORAGE_KEY, dir);
}
