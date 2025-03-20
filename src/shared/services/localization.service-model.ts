import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { LanguageInfo } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey, OnDidDispose } from 'platform-bible-utils';

export type LocalizationData = LanguageStrings;

export type LocalizationSelector = { localizeKey: LocalizeKey; locales?: string[] };

export type LocalizationSelectors = { localizeKeys: LocalizeKey[]; locales?: string[] };

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
  LocalizedStrings: DataProviderDataType<LocalizationSelectors, LocalizationData, never>;
  AvailableInterfaceLanguages: DataProviderDataType<undefined, Record<string, LanguageInfo>, never>;
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
   * @param selector Made up of a string key that corresponds to a localized value and an array of
   *   BCP 47 language codes
   * @returns Localized string
   */
  getLocalizedString: (selector: LocalizationSelector) => Promise<string>;
  /**
   * Look up localized strings for all localizeKeys provided
   *
   * @param selectors An array of LocalizationSelectors. A LocalizationSelector is made up of a
   *   string key that corresponds to a localized value and an array of BCP 47 language codes
   * @returns Object whose keys are localizeKeys and values are localized strings
   */
  getLocalizedStrings: (selectors: LocalizationSelectors) => Promise<LocalizationData>;
  /**
   * Get a collection of known user-interface languages
   *
   * @returns All user-interface languages
   */
  getAvailableInterfaceLanguages: () => Promise<Record<string, LanguageInfo>>;
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
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @returns Unsubscriber function
   */
  setAvailableInterfaceLanguages(): Promise<
    DataProviderUpdateInstructions<LocalizationDataDataTypes>
  >;
} & OnDidDispose &
  typeof localizationServiceObjectToProxy & {
    /**
     * This function is used to take a book number from a verse ref and return the localized name of
     * the book so that the book name can be displayed in the UI language within the UI
     */
    getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string>;
  } & IDataProvider<LocalizationDataDataTypes>;
