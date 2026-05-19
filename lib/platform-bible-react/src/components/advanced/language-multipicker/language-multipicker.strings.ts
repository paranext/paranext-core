/**
 * Localized strings for `LanguageMultipicker`. Each key has a `// meaning:` comment describing
 * _intent_ — what the string communicates, not just how it translates.
 */
export const LANGUAGE_MULTIPICKER_STRING_KEYS = Object.freeze([
  '%languageMultipicker_preset_any%',
  '%languageMultipicker_preset_preferred%',
  '%languageMultipicker_trigger_manyLanguages%',
  '%languageMultipicker_trigger_ariaLabel%',
] as const);

export type LanguageMultipickerLocalizedStrings = {
  [k in (typeof LANGUAGE_MULTIPICKER_STRING_KEYS)[number]]?: string;
};

export const LANGUAGE_MULTIPICKER_DEFAULTS: Required<LanguageMultipickerLocalizedStrings> = {
  // meaning: preset name shown when no language is selected — implies "do not filter; include
  // texts in any language". Used both as the trigger label and as the popover preset button.
  '%languageMultipicker_preset_any%': 'Any',

  // meaning: preset name for the user's preferred-language set. "Preferred" is *derived* from
  // the user's content footprint — the union of languages of the resources and projects they've
  // engaged with — not from a stored profile preference. Spec: PT-3980
  // (https://paratextstudio.atlassian.net/browse/PT-3980). When the current selection matches
  // this set exactly, the trigger label collapses to "Preferred" instead of listing codes. The
  // point is to make the common case ("only show me texts in languages I can read") expressible
  // without enumerating.
  '%languageMultipicker_preset_preferred%': 'Preferred',

  // meaning: trigger label fallback when the selection has too many languages to display as
  // codes — collapses to "{count} langs". `{count}` is the number selected. Keep short; this
  // string appears in a tertiary button next to a search input.
  '%languageMultipicker_trigger_manyLanguages%': '{count} langs',

  // meaning: accessible label for the trigger button. Read by screen readers when the trigger
  // gets focus, before the user opens the popover.
  '%languageMultipicker_trigger_ariaLabel%': 'Filter by language',
};

export function localizeLanguageMultipicker(
  strings: LanguageMultipickerLocalizedStrings | undefined,
  key: (typeof LANGUAGE_MULTIPICKER_STRING_KEYS)[number],
): string {
  return strings?.[key] ?? LANGUAGE_MULTIPICKER_DEFAULTS[key];
}
