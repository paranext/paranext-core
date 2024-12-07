import { useState } from 'react';
import { LocalizedStringValue } from 'platform-bible-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn-ui/select';
import { Label } from '../shadcn-ui/label';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const UI_LANGUAGE_SELECTOR_STRING_KEYS = Object.freeze([
  '%webView_uiLanguageSelector_selectFallbackLanguages%',
] as const);

export type UiLanguageSelectorLocalizedStrings = {
  [localizedInventoryKey in (typeof UI_LANGUAGE_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
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
  /** Full set of known languages to display. */
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
  handleLanguageChanges?: (newUiLanguages: string[]) => void;
  /** Handler for the primary language changes. */
  handlePrimaryLanguageChange?: (newPrimaryUiLanguage: string) => void;
  /**
   * Handler for when the fallback languages change. The array contains the fallback languages in
   * order of decreasing preference.
   */
  handleFallbackLanguagesChange?: (newFallbackLanguages: string[]) => void;
  localizedStrings: UiLanguageSelectorLocalizedStrings;
};

export default function UiLanguageSelector({
  knownUiLanguages,
  primaryLanguage = 'en',
  fallbackLanguages = [],
  handleLanguageChanges,
  handlePrimaryLanguageChange,
  handleFallbackLanguagesChange,
  localizedStrings,
}: UiLanguageSelectorProps) {
  const selectFallbackLanguagesText = localizeString(
    localizedStrings,
    '%webView_uiLanguageSelector_selectFallbackLanguages%',
  );
  const [selectedLanguage, setSelectedLanguage] = useState(primaryLanguage);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    if (handlePrimaryLanguageChange) handlePrimaryLanguageChange(code);
    // REVIEW: Should fallback languages be preserved when primary language changes?
    if (handleLanguageChanges)
      handleLanguageChanges([code, ...fallbackLanguages.filter((lang) => lang !== code)]);
    if (handleFallbackLanguagesChange && fallbackLanguages.find((l) => l == code))
      handleFallbackLanguagesChange([...fallbackLanguages.filter((lang) => lang !== code)]);
    setIsOpen(false); // Close the dropdown when a selection is made
  };

  const getLanguageDisplayName = (lang: string, uiLang: string) => {
    const altName =
      uiLang !== lang
        ? (knownUiLanguages[lang]?.uiNames?.[uiLang] ?? knownUiLanguages[lang]?.uiNames?.en)
        : undefined;

    return altName
      ? `${knownUiLanguages[lang]?.autonym} (${altName})`
      : knownUiLanguages[lang]?.autonym;
  };

  /*   const handleFallbackLanguageClick = () => {
    handleFallbackLanguagesChange([]);
  }; */

  return (
    <div className="pr-twp tw-max-w-sm tw-p-4">
      {/* Language Selector */}
      <Select
        name="uiLanguage"
        value={selectedLanguage}
        onValueChange={handleLanguageChange}
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
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
      {selectedLanguage !== 'en' && (
        <>
          <Label className="tw-ml-3">{selectFallbackLanguagesText}</Label>
          {fallbackLanguages.map((f) => getLanguageDisplayName(f, primaryLanguage))}
          {/* <MultiSelector>

          </MultiSelector> */}
        </>
      )}
    </div>
  );
}
