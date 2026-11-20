/*
 * Design-ideas fork: a copy of `isResolvedLocalizedValue` from
 * lib/platform-bible-react/src/utils/localization.util.ts, which `platform-bible-react` does not
 * export. Only the forked groupings file needs it.
 */

/**
 * Matches a localization key — the `%some_key%` spelling used throughout Platform.Bible — with
 * nothing else around it.
 */
const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;

/**
 * Whether a value read out of a localized-strings map carries text that can actually be shown to a
 * user: not `undefined`, not a raw `%key%`, and not blank.
 *
 * @param value The value read out of a localized-strings map, if any.
 * @returns Whether `value` carries real localized text.
 */
export function isResolvedLocalizedValue(value: string | undefined): value is string {
  return value !== undefined && !LOCALIZATION_KEY_PATTERN.test(value) && value.trim() !== '';
}
