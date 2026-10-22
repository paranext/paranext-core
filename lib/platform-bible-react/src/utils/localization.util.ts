/**
 * Matches a localization key — the `%some_key%` spelling used throughout Platform.Bible — with
 * nothing else around it.
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
 * TODO(PT-4673): this helper is not yet the canonical home. PT-4673 moves the rule into
 * `platform-bible-utils`, where the renderer can reach it too, and adds a lint rule that keeps new
 * code off the dead `localizedStrings[key] ?? fallback` idiom — ~108 call sites repo-wide still use
 * it. Two older copies of the rule also remain on a weaker test (`!value || value === key`, which
 * misses a _different_ `%…%` key and whitespace-only text): `localizedOrEnglish` in
 * `src/renderer/components/overlays/overlay-connection-lost.component.tsx` and
 * `createCrashedViewLocalizer` in `src/renderer/components/crashed-view.util.ts`, both on the crash
 * and connection-lost screens, which is exactly the state an unresolved string is most likely to be
 * in.
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
