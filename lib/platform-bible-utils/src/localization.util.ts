import { LocalizeKey } from './extension-contributions/menus.model';

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
 *
 * The residual trade-off: a genuinely translated string that both begins and ends with `%` and has
 * no interior `%` — `'%100%'`, say — reads as a key and is replaced by its English fallback. No
 * shipped string has that shape, and the alternative (trusting any value that is not exactly the
 * requested key) fails the much more common case of one key's text arriving under another key.
 *
 * `lib/eslint-plugin-paranext/src/rules/no-nullish-localized-fallback.ts` carries a deliberate
 * second copy of this pattern — the plugin does not depend on this workspace — and the two must
 * agree. That rule's test suite pins the agreement against a shared table of values; change both
 * together.
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
 * Reads one entry out of a localized-strings map, or `undefined` when that entry carries nothing
 * showable yet.
 *
 * The map-and-key companion to {@link resolveLocalizedString}, for the callers that have no fallback
 * of their own to offer and need to pass the absence onward — a notice that should not render at
 * all rather than render in English, say. Values are read as `unknown` so a map whose entries are
 * not statically known to be strings (a grouping-label lookup, for instance) can use the same
 * reader instead of growing its own `typeof` guard.
 *
 * @param strings A localized-strings map.
 * @param key The key to read.
 * @returns The entry when it carries real localized text, `undefined` otherwise.
 */
export function localizedStringOrUndefined(
  strings: { readonly [key: LocalizeKey]: unknown },
  key: LocalizeKey,
): string | undefined {
  const value = strings[key];
  return typeof value === 'string' && isResolvedLocalizedValue(value) ? value : undefined;
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
