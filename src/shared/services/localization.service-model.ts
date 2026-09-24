import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { LanguageInfo } from 'platform-bible-react';
import {
  LanguageStrings,
  LocalizedStringDataContribution,
  LocalizeKey,
  OnDidDispose,
} from 'platform-bible-utils';

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
  /** @experimental */
  SetupDialogLanguages: DataProviderDataType<undefined, Record<string, LanguageInfo>, never>;
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
   * Get all localized string data currently loaded by the platform
   *
   * @returns All localized string data from all sources formatted a single, combined contribution
   */
  retrieveCurrentLocalizedStringData: () => Promise<LocalizedStringDataContribution>;
  /**
   * Get the interface languages that have setup-dialog localizations (used by the first-run
   * language picker). A language qualifies when it has ≥90% of the English setup-dialog
   * (`%firstRun_*%`) keys.
   *
   * @returns Qualifying user-interface languages, keyed by raw locale tag
   * @experimental
   */
  getSetupDialogLanguages: () => Promise<Record<string, LanguageInfo>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide localized strings in contributions
   */
  setLocalizedString(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide localized strings in contributions
   */
  setLocalizedStrings(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw. Extensions can
   * provide new interface languages in contributions
   */
  setAvailableInterfaceLanguages(): Promise<
    DataProviderUpdateInstructions<LocalizationDataDataTypes>
  >;
  /**
   * This data cannot be changed. Trying to use this setter will always throw. It is derived from
   * the loaded localization data.
   *
   * @experimental
   */
  setSetupDialogLanguages(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>>;
} & OnDidDispose &
  typeof localizationServiceObjectToProxy & {
    /**
     * This function is used to take a book number from a verse ref and return the localized name of
     * the book so that the book name can be displayed in the UI language within the UI
     */
    getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string>;
    /**
     * Builds a localized title for something scoped to one project, such as a web view's tab: looks
     * up the localized format for `localizeKey` and the project's short name (its `platform.name`
     * setting), then replaces `{projectName}` in the format with that name. Use it in a web view
     * provider's `getWebView` so the tab opens with its final title; in the web view itself, use
     * the `useLocalizedProjectTitle` hook to keep the title up to date.
     *
     * Never rejects, so a failed lookup cannot keep a web view from opening:
     *
     * - If the short name cannot be read, or is empty, the project id is shown in its place.
     * - If the format lookup fails, the title is just the project's name (or id).
     *
     * Both failures are logged as warnings. A key with no localization is not a failure: as with
     * `getLocalizedString`, the title is the key itself, so the missing string is noticed.
     *
     * @example
     *
     * ```typescript
     * // With `"%myExtension_tabTitle%": "My Tool: {projectName}"` contributed
     * const title = await papi.localization.getLocalizedProjectTitle({
     *   localizeKey: '%myExtension_tabTitle%',
     *   projectId,
     * });
     * // 'My Tool: WEB'
     * ```
     *
     * @param options.localizeKey Key of the localized title format. The format should contain a
     *   `{projectName}` placeholder.
     * @param options.projectId Id of the project the title is for
     * @param options.replacements Values for any other `{key}` placeholders in the format
     * @param options.locales BCP 47 language codes to look the format up in, as for
     *   `getLocalizedString`. Defaults to the interface languages.
     * @returns The formatted title
     */
    getLocalizedProjectTitle(options: LocalizedProjectTitleOptions): Promise<string>;
  } & IDataProvider<LocalizationDataDataTypes>;

/** Options for `papi.localization.getLocalizedProjectTitle`. */
export type LocalizedProjectTitleOptions = {
  /**
   * Key of the localized title format. The format should contain a `{projectName}` placeholder,
   * which is replaced with the project's short name (or its id when the name is unavailable).
   */
  localizeKey: LocalizeKey;
  /** Id of the project the title is for */
  projectId: string;
  /**
   * Values for any other `{key}` placeholders in the format. A `projectName` entry is ignored in
   * favor of the project's name.
   */
  replacements?: { [key: string]: unknown };
  /**
   * BCP 47 language codes to look the format up in, as for `getLocalizedString`. Defaults to the
   * interface languages.
   */
  locales?: string[];
};
