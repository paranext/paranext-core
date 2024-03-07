/**
 * JSDOC SOURCE localizationService
 *
 * Provides localization data for UI
 */
export interface LocalizationServiceType {
  /**
   * Look up localized string for specific localizeKey
   *
   * @param localizeKey String key that corresponds to a localized value
   * @param language ISO 639-2 code for the language, defaults to 'eng' if unspecified
   * @returns Localized string
   */
  getLocalizedString: (localizeKey: string, languagesToSearch?: string[]) => Promise<string>;
  /**
   * Look up localized strings for all localizeKeys provided
   *
   * @param localizeKeys Array of localize keys that correspond to localized values
   * @param language ISO 639-2 code for the language, defaults to 'eng' if unspecified
   * @returns Object whose keys are localizeKeys and values are localized strings
   */
  getLocalizedStrings: (
    localizeKeys: string[],
    languagesToSearch?: string[],
  ) => Promise<{ [localizeKey: string]: string }>;
}

export type LocalizationMetadata = { notes: string; fallbackKey: string };

export type LocalizedStringMetadata = { [localizedStringKey: string]: LocalizationMetadata };

export type LocalizationData = { [localizeKey: string]: string };

export const localizationServiceNetworkObjectName = 'LocalizationService';
