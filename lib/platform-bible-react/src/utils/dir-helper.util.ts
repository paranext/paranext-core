/** Text and layout direction */
export type Direction = 'rtl' | 'ltr';

const STORAGE_KEY: string = 'layoutDirection';

function hasLocalStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

/** Read layout direction from localStorage or return 'ltr' */
export function readDirection(): Direction {
  if (!hasLocalStorage()) return 'ltr';

  try {
    const retrieved = window.localStorage.getItem(STORAGE_KEY);
    if (retrieved === 'rtl') return 'rtl';
    return 'ltr';
  } catch {
    return 'ltr';
  }
}

/** Write layout direction to localStorage */
export function persistDirection(dir: Direction): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, dir);
  } catch {
    // ignore failures (e.g., storage disabled)
  }
}
