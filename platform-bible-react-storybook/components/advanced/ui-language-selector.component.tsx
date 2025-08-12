import { useState } from 'react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui.util';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn-ui/select';
import { Label } from '../shadcn-ui/label';

/**
 * Immutable array containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const UI_LANGUAGE_SELECTOR_STRING_KEYS = Object.freeze([
  '%settings_uiLanguageSelector_selectFallbackLanguages%',
] as const);

export type UiLanguageSelectorLocalizedStrings = {
  [localizedUiLanguageSelectorKey in (typeof UI_LANGUAGE_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: UiLanguageSelectorLocalizedStrings,
  key: keyof UiLanguageSelectorLocalizedStrings,
) => {
  return strings[key] ?? key;
};

export type LanguageInfo = {
  /** The name of the language to be displayed (in its native script) */
  autonym: string;
  /**
   * The name of the language in other languages, so that the language can also be displayed in the
   * current UI language, if known.
   */
  uiNames?: Record<string, string>;
  /**
   * Other known names of the language (for searching). This can include pejorative names and should
   * never be displayed unless typed by the user.
   */
  otherNames?: string[];
};

export type UiLanguageSelectorProps = {
  /** Full set of known languages to display. The keys are valid BCP-47 tags. */
  knownUiLanguages: Record<string, LanguageInfo>;
  /** IETF BCP-47 language tag of the current primary UI language. `undefined` => 'en' */
  primaryLanguage: string;
  /**
   * Ordered list of fallback language tags to use if the localization key can't be found in the
   * current primary UI language. This list never contains English ('en') because it is the ultimate
   * fallback.
   */
  fallbackLanguages: string[] | undefined;
  /**
   * Handler for when either the primary or the fallback languages change (or both). For this
   * handler, the primary UI language is the first one in the array, followed by the fallback
   * languages in order of decreasing preference.
   */
  onLanguagesChange?: (newUiLanguages: string[]) => void;
  /** Handler for the primary language changes. */
  onPrimaryLanguageChange?: (newPrimaryUiLanguage: string) => void;
  /**
   * Handler for when the fallback languages change. The array contains the fallback languages in
   * order of decreasing preference.
   */
  onFallbackLanguagesChange?: (newFallbackLanguages: string[]) => void;
  /**
   * Map whose keys are localized string keys as contained in UI_LANGUAGE_SELECTOR_STRING_KEYS and
   * whose values are the localized strings (in the current UI language).
   */
  localizedStrings: UiLanguageSelectorLocalizedStrings;
  /** Additional css classes to help with unique styling of the control */
  className?: string;
};

/**
 * A component for selecting the user interface language and managing fallback languages. Allows
 * users to choose a primary UI language and optionally select fallback languages.
 *
 * @param {UiLanguageSelectorProps} props - The props for the component.
 */
export function UiLanguageSelector({
  knownUiLanguages,
  primaryLanguage = 'en',
  fallbackLanguages = [],
  onLanguagesChange,
  onPrimaryLanguageChange,
  onFallbackLanguagesChange,
  localizedStrings,
  className,
}: UiLanguageSelectorProps) {
  const selectFallbackLanguagesText = localizeString(
    localizedStrings,
    '%settings_uiLanguageSelector_selectFallbackLanguages%',
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: string) => {
    if (onPrimaryLanguageChange) onPrimaryLanguageChange(code);
    // REVIEW: Should fallback languages be preserved when primary language changes?
    if (onLanguagesChange)
      onLanguagesChange([code, ...fallbackLanguages.filter((lang) => lang !== code)]);
    if (onFallbackLanguagesChange && fallbackLanguages.find((l) => l === code))
      onFallbackLanguagesChange([...fallbackLanguages.filter((lang) => lang !== code)]);
    setIsOpen(false); // Close the dropdown when a selection is made
  };

  /**
   * Gets the display name for the given language. This will typically include the autonym (in the
   * native script), along with the name of the language in the current UI locale if known, with a
   * fallback to the English name (if known).
   *
   * @param {string} lang - The BCP-47 code of the language whose display name is being requested.
   * @param {string} uiLang - The BCP-47 code of the current user-interface language used used to
   *   try to look up the name of the language in a form that is likely to be helpful to the user if
   *   they do not recognize the autonym.
   * @returns {string} The display name of the language.
   */
  const getLanguageDisplayName = (lang: string, uiLang: string) => {
    const altName =
      uiLang !== lang
        ? (knownUiLanguages[lang]?.uiNames?.[uiLang] ?? knownUiLanguages[lang]?.uiNames?.en)
        : undefined;

    return altName
      ? `${knownUiLanguages[lang]?.autonym} (${altName})`
      : knownUiLanguages[lang]?.autonym;
  };

  return (
    <div className={cn('pr-twp tw-max-w-sm', className)}>
      {/* Language Selector */}
      <Select
        name="uiLanguage"
        value={primaryLanguage}
        onValueChange={handleLanguageChange}
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="tw-z-[250]" // Need to get over the floating web view z-index 200
        >
          {Object.keys(knownUiLanguages).map((key) => {
            return (
              <SelectItem key={key} value={key}>
                {getLanguageDisplayName(key, primaryLanguage)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Fallback Language Button */}
      {primaryLanguage !== 'en' && (
        <>
          <Label className="tw-ms-3">{selectFallbackLanguagesText}</Label>
          <div className="tw-ms-3">
            {/* Do not localize or "improve". This label is temporary. */}
            <Label>
              Currently:{'\u00A0'}
              {fallbackLanguages?.length > 0
                ? `${fallbackLanguages
                    .map((f) => getLanguageDisplayName(f, primaryLanguage))
                    .join(', ')}`
                : `default (${knownUiLanguages.en.autonym})`}
            </Label>
            {/* <MultiSelector>
              Something like this will be added once UX decides exactly what they want.
          </MultiSelector> */}
          </div>
        </>
      )}
    </div>
  );
}

export default UiLanguageSelector;
