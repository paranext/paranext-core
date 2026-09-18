/**
 * Shared keyboard primitives for components that implement their own keyboard navigation. Generic,
 * reusable key helpers belong here — arrow-key constants and guards, character classification — so
 * components don't each re-declare inline `'ArrowUp'` string literals and ad-hoc regexes.
 * Component-specific navigation math (2D grid arithmetic, for instance) belongs with that
 * component; the building blocks below are deliberately domain-agnostic.
 */

/** The four keyboard arrow keys, matching `KeyboardEvent.key` values. */
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;

/** A keyboard `event.key` value for one of the four arrow keys. */
export type ArrowKey = (typeof ARROW_KEYS)[number];

/**
 * Type guard narrowing an arbitrary keyboard `event.key` string to an {@link ArrowKey}, so callers
 * can hand `event.key` to arrow-key-typed helpers without a type assertion.
 */
export function isArrowKey(key: string): key is ArrowKey {
  return ARROW_KEYS.some((arrowKey) => arrowKey === key);
}

/**
 * Classifies a keyboard `event.key` as a single letter and/or digit. Used by components that route
 * typed characters into a search input while focus is elsewhere.
 *
 * Letters are matched script-agnostically (`\p{L}`), so a translator typing Cyrillic, Greek,
 * Hebrew, or Devanagari reaches the search box the same way a Latin-script user does. Digits stay
 * ASCII on purpose: the Scripture reference parser only understands ASCII digits, so classifying
 * e.g. Arabic-Indic numerals as digits would route keystrokes into a query that cannot be parsed.
 *
 * @param key The keyboard `event.key` value.
 * @returns `isLetter` and `isDigit`, both false for named keys like `'Enter'` or `'ArrowUp'`.
 */
export function getKeyCharacterType(key: string) {
  const isLetter = /^\p{L}$/u.test(key);
  const isDigit = /^[0-9]$/.test(key);
  return { isLetter, isDigit };
}
