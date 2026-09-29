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
  return globalThis.localStorage ?? undefined;
}

/**
 * Read layout direction from localStorage, or return 'ltr' when storage is unavailable.
 *
 * The `try` also covers `getItem` itself, not just reaching `localStorage` - a `Storage` object
 * that is reachable without throwing can still throw on the call (e.g. a sandboxed proxy that
 * defers its `SecurityError` to the method rather than the property access).
 */
export function readDirection(): Direction {
  try {
    const retrieved = getStorage()?.getItem(STORAGE_KEY);
    if (retrieved === 'rtl') {
      return retrieved;
    }
  } catch {
    // Fall through to 'ltr' below
  }
  return 'ltr';
}

/**
 * Write layout direction to localStorage. A no-op when storage is unavailable or the write itself
 * throws (e.g. quota exceeded in Safari private browsing) - see `readDirection` for why the call,
 * not just reaching `localStorage`, has to be inside the guard.
 */
export function persistDirection(dir: Direction): void {
  try {
    getStorage()?.setItem(STORAGE_KEY, dir);
  } catch {
    // Storage unavailable or the write was rejected - no-op
  }
}
