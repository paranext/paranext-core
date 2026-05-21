/**
 * Shared keyboard primitives for components that implement their own keyboard navigation. Keep
 * generic, reusable key helpers here (arrow-key constants/guards, character classification) so
 * components don't each re-declare inline `'ArrowUp'` string literals and ad-hoc letter/digit
 * regexes. Component-specific navigation math (e.g. 2D grid arithmetic) belongs with that
 * component, but the building blocks below are intentionally domain-agnostic.
 */

/** The four keyboard arrow keys (matching `KeyboardEvent.key` values). */
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;

/** A keyboard `event.key` value for one of the four arrow keys. */
export type ArrowKey = (typeof ARROW_KEYS)[number];

/**
 * Type guard that narrows an arbitrary keyboard `event.key` string to an {@link ArrowKey}. Used so
 * callers can hand `event.key` to arrow-key-typed helpers without a type assertion.
 */
export function isArrowKey(key: string): key is ArrowKey {
  return ARROW_KEYS.some((arrowKey) => arrowKey === key);
}

/**
 * Classifies a keyboard `event.key` as a single letter and/or digit. Useful for components that
 * route typed characters into a search input while the focus is elsewhere.
 *
 * @param key The keyboard `event.key` value.
 * @returns An object with `isLetter` and `isDigit` booleans (both false for non-character keys like
 *   `'Enter'` or `'ArrowUp'`).
 */
export function getKeyCharacterType(key: string) {
  const isLetter = /^[a-zA-Z]$/.test(key);
  const isDigit = /^[0-9]$/.test(key);
  return { isLetter, isDigit };
}
