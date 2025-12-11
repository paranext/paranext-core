/** Text and layout direction */
export type Direction = 'rtl' | 'ltr';

const STORAGE_KEY: string = 'layoutDirection';

/** Read layout direction from localStorage or return 'ltr' */
export function readDirection(): Direction {
  const retrieved = localStorage.getItem(STORAGE_KEY);
  if (retrieved === 'rtl') {
    return retrieved;
  }
  return 'ltr';
}

/** Write layout direction to localStorage */
export function persistDirection(dir: Direction): void {
  localStorage.setItem(STORAGE_KEY, dir);
}
