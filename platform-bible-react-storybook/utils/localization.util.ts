/**
 * Matches a localization key — the `%some_key%` spelling used throughout Platform.Bible — with
 * nothing else around it.
 */
const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;

/**
 * Resolves a localized string that may not have arrived yet, falling back to a hard-coded default.
 *
 * `useLocalizedStrings` seeds its result with `{ [key]: key }` and keeps that seed for the whole
 * first render pass — and permanently if the localization provider errors. A key is a non-empty
 * string, so the usual `localizedStrings?.[key] || 'Default'` idiom does NOT fall back: it hands
 * back the literal `%some_key%`. That is harmless in an `aria-label`, where nothing renders it, and
 * user-visible the moment the same value is put on screen as tooltip or button text.
 *
 * @param value The value read out of a localized-strings map, if any.
 * @param fallback Text to show when `value` is missing or is still a raw key.
 * @returns `value` when it carries real localized text, `fallback` otherwise.
 */
export function resolveLocalizedString(value: string | undefined, fallback: string): string {
  if (!value || LOCALIZATION_KEY_PATTERN.test(value)) return fallback;
  return value;
}
