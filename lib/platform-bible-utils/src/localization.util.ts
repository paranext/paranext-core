/**
 * Matches a localization key — the `%some_key%` spelling used throughout Platform.Bible — with
 * nothing else around it.
 *
 * Deliberately stricter than `isLocalizeKey`, which asks only that a string start and end with `%`.
 * The two disagree on translated copy that both begins and ends with a percent sign, such as `'%s
 * of 50% total%'`: `isLocalizeKey` calls that a key, this pattern calls it text. Rejecting an
 * interior `%` is what lets the predicates below judge _values_, where real copy is exactly what is
 * expected and treating it as an unresolved key would blank out a perfectly good string.
 * `isLocalizeKey` answers a different question — whether an identifier the caller already believes
 * to be a key is shaped like one — and widening either to match the other would break the other's
 * callers, so they stay separate.
 */
const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;

/**
 * Whether a value read out of a localized-strings map carries text that can actually be shown to a
 * user.
 *
 * Three states fail that test, and only one of them is nullish:
 *
 * - `undefined` — the lookup produced nothing, or a builder emitted a field it could not populate.
 * - A raw localization key — `useLocalizedStrings` seeds its result with `{ [key]: key }` and keeps
 *   that seed for the whole first render pass, and permanently if the localization provider errors.
 *   A key is a non-empty string, so the usual `localizedStrings[key] ?? 'Default'` idiom does NOT
 *   fall back: it hands back the literal `%some_key%` and renders it at the user.
 * - Blank or whitespace-only text — a label of spaces is indistinguishable on screen from an empty
 *   one, and leaves the control with no accessible name. That reads as broken rather than as
 *   untranslated, so it belongs on the fallback path too.
 *
 * @param value The value read out of a localized-strings map, if any.
 * @returns Whether `value` carries real localized text.
 */
export function isResolvedLocalizedValue(value: string | undefined): value is string {
  return value !== undefined && !LOCALIZATION_KEY_PATTERN.test(value) && value.trim() !== '';
}

/**
 * Resolves a localized string that may not have arrived yet, falling back to a hard-coded default.
 *
 * @param value The value read out of a localized-strings map, if any.
 * @param fallback Text to show when `value` does not carry real localized text.
 * @returns `value` when {@link isResolvedLocalizedValue} accepts it, `fallback` otherwise.
 */
export function resolveLocalizedString(value: string | undefined, fallback: string): string {
  return isResolvedLocalizedValue(value) ? value : fallback;
}

/**
 * The first candidate that can actually be shown to a user, or `undefined` if none can.
 *
 * For call sites that have more than one source to try before reaching a literal they own — a
 * consumer's own localized override, then a value read from a setting, then English. Each candidate
 * is judged by {@link isResolvedLocalizedValue}, so an unresolved lookup is skipped rather than
 * rendered, which a nullish chain (`a ?? b ?? c`) cannot do.
 *
 * @param candidates Values to try, best first.
 * @returns The first candidate carrying real text, or `undefined` when none does.
 */
export function firstResolvedLocalizedString(
  ...candidates: (string | undefined)[]
): string | undefined {
  return candidates.find(isResolvedLocalizedValue);
}
