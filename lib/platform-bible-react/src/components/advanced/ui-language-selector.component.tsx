import { useEffect, useState } from 'react';
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
  /** IETF BCP-47 language tag */
  tag: string;
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
  /** Full list of known languages to display. */
  knownUiLanguages: LanguageInfo[];
  /** IETF BCP-47 language tag of the current primary UI language. `undefined` => 'en' */
  primaryLanguage: LanguageInfo | undefined;
  /**
   * Ordered list of fallback language tags to use if the localization key can't be found in the
   * current primary UI language. This list never contains English because it is the ultimate
   * fallback.
   */
  fallbackLanguages: LanguageInfo[] | undefined;
  handlePrimaryLanguageChange: (newUiLanguage: string) => void;
  handleFallbackLanguagesChange: (newFallbackLanguages: string[]) => void;
  localizedStrings: UiLanguageSelectorLocalizedStrings;
};

const getLanguageDisplayName = (lang: LanguageInfo, uiLang: string) => {
  const altName = uiLang !== lang.tag ? (lang.uiNames?.[uiLang] ?? lang.uiNames?.en) : undefined;

  return altName ? `${lang.autonym} (${altName})` : lang.autonym;
};

export default function UiLanguageSelector({
  knownUiLanguages,
  primaryLanguage = { tag: 'en', autonym: 'English' },
  fallbackLanguages = [],
  handlePrimaryLanguageChange,
  handleFallbackLanguagesChange,
  localizedStrings,
}: UiLanguageSelectorProps) {
  const selectFallbackLanguagesText = localizeString(
    localizedStrings,
    '%webView_uiLanguageSelector_selectFallbackLanguages%',
  );
  const [selectedLanguage, setSelectedLanguage] = useState(primaryLanguage.tag);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    handlePrimaryLanguageChange(code);
  };

  useEffect(() => {
    // Temporary no-op usage to suppress warning
    handleFallbackLanguagesChange([]);
  }, [handleFallbackLanguagesChange]);

  /*   const handleFallbackLanguageClick = () => {
    handleFallbackLanguagesChange([]);
  }; */

  return (
    <div className="pr-twp tw-max-w-sm tw-p-4">
      {/* Language Selector */}
      <Select name="uiLanguage" value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {knownUiLanguages.map((lang) => (
            <SelectItem key={lang.tag} value={lang.tag}>
              {getLanguageDisplayName(lang, primaryLanguage.tag)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Fallback Language Button */}
      {selectedLanguage !== 'en' && (
        <>
          <Label className="tw-ml-3">{selectFallbackLanguagesText}</Label>
          {fallbackLanguages.map((f) => getLanguageDisplayName(f, primaryLanguage.tag))}
          {/* <MultiSelector>

          </MultiSelector> */}
        </>
      )}
    </div>
  );
}
