import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { OnDidDispose } from 'platform-bible-utils';
import { IDataProvider } from './papi-core.service';

export type LocalizationMetadata = { notes: string; fallbackKey: string };

export type LocalizedStringMetadata = { [localizedStringKey: string]: LocalizationMetadata };

export type LocalizationData = { [localizeKey: string]: string };

export type LocalizationSelector = { localizeKey: string; languagesToSearch?: string[] };

export type LocalizationSelectors = { localizeKeys: string[]; languagesToSearch?: string[] };

/** JSDOC DESTINATION localizationServiceProviderName */
export const localizationServiceProviderName = 'platform.localizationDataServiceDataProvider';
export const localizationServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE localizationServiceProviderName
   *
   * This name is used to register the localization data provider on the papi. You can use this name
   * to find the data provider when accessing it using the useData hook
   */
  dataProviderName: localizationServiceProviderName,
});

// Data Type to initialize data provider engine with
export type LocalizationDataDataTypes = {
  LocalizedString: DataProviderDataType<LocalizationSelector, string, never>;
  LocalizedStrings: DataProviderDataType<
    LocalizationSelectors,
    { [localizeKey: string]: string },
    never
  >;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [localizationServiceProviderName]: ILocalizationService;
  }
}

/**
 * JSDOC SOURCE localizationDataService
 *
 * Service that allows to get and store localizations
 */
export type ILocalizationService = {
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
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @returns Unsubscriber function
   */
  setLocalizedString(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @returns Unsubscriber function
   */
  setLocalizedStrings(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
} & OnDidDispose &
  typeof localizationServiceObjectToProxy & {
    /**
     * This function is used to take a book number from a verse ref and return the localized name of
     * the book so that the book name can be displayed in the UI language within the UI
     */
    getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string>;
  } & IDataProvider<LocalizationDataDataTypes>;
