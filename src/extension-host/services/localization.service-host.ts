import {
  ILocalizationService,
  localizationServiceProviderName,
  LocalizationData,
  LocalizationDataDataTypes,
  LocalizationSelector,
  LocalizationSelectors,
  localizationServiceObjectToProxy,
} from '@shared/services/localization.service-model';
import dataProviderService from '@shared/services/data-provider.service';
import IDataProviderEngine, { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import * as nodeFS from '@node/services/node-file-system.service';
import {
  deserialize,
  createSyncProxyForAsyncObject,
  LocalizedStringDataContribution,
  StringsMetadata,
  LocalizeKey,
  getCurrentLocale,
} from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { joinUriPaths } from '@node/utils/util';
import path from 'path';
import settingsService from '@shared/services/settings.service';
import LocalizedStringsDocumentCombiner from '@shared/utils/localized-strings-document-combiner';

const LOCALIZATION_ROOT_URI = joinUriPaths('resources://', 'assets', 'localization');
// BCP 47 validation regex from https://stackoverflow.com/questions/7035825/regular-expression-for-a-language-tag-as-defined-by-bcp47
const LANGUAGE_CODE_REGEX =
  /^(?<grandfathered>(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|t(?:a[oy]|su))|sgn-(?:BE-(?:FR|NL)|CH-DE))|(?:art-lojban|cel-gaulish|no-(?:bok|nyn)|zh-(?:guoyu|hakka|min(?:-nan)?|xiang)))|(?:(?<language>(?:[A-Za-z]{2,3}(?:-(?<extlang>[A-Za-z]{3}(?:-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(?:-(?<script>[A-Za-z]{4}))?(?:-(?<region>[A-Za-z]{2}|[0-9]{3}))?(?:-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(?:-(?<extension>[0-9A-WY-Za-wy-z](?:-[A-Za-z0-9]{2,8})+))*)(?:-(?<privateUse>x(?:-[A-Za-z0-9]{1,8})+))?$/;

/**
 * Object that keeps track of all localized string contributions in the platform. To listen to
 * updates to the localized string contributions, subscribe to its `onDidRebuild` event (consider
 * debouncing as each contribution will trigger a rebuild).
 *
 * Keeping this object separate from the data provider and disabling the `set` calls in the data
 * provider prevents random services from changing system localized string contributions
 * unexpectedly.
 */
export const localizedStringsDocumentCombiner = new LocalizedStringsDocumentCombiner({});

function getFileNameFromUri(uriToMatch: string): string {
  const file = path.parse(uriToMatch);
  return file.name;
}

/**
 * Take a specific BCP 47 locale and return its base general locale (e.g. en-GB (Great British
 * English) returns en)
 */
async function getBaseLanguageCode(languageCode: string) {
  const match = languageCode.match(LANGUAGE_CODE_REGEX);
  const languageMatch = match?.groups?.language;
  if (!match || !languageMatch) {
    logger.warn(`Localization service - No match for language code ${languageCode}`);
    return languageCode;
  }

  const baseCode = await getCanonicalLocale(languageMatch);
  if (!baseCode) {
    logger.warn(
      `Localization service - No general locale found for specific locale: ${languageCode}`,
    );
    return languageCode;
  }
  return baseCode;
}

/** Convert contents of a specific localization json file to an object */
function convertToLocalizationData(jsonString: string, languageCode: string): LocalizationData {
  const localizationData: LocalizationData = deserialize(jsonString);
  if (typeof localizationData !== 'object')
    throw new Error(`Localization data for language '${languageCode}' is invalid`);
  return localizationData;
}

/** Convert contents of a specific localized string metadata json file to an object */
function convertToLocalizedStringMetadata(jsonString: string): StringsMetadata {
  const localizationMetadata: StringsMetadata = deserialize(jsonString);
  if (typeof localizationMetadata !== 'object')
    throw new Error(`Localization string metadata is invalid`);
  return localizationMetadata;
}

async function getLocalizedFileUris(): Promise<string[]> {
  const entries = await nodeFS.readDir(LOCALIZATION_ROOT_URI);
  if (!entries) throw new Error('No entries found in localization folder');
  return entries.file;
}

/** Load the contents of all localization files from disk */
async function loadAllLocalizationData() {
  const localizeFileUris = await getLocalizedFileUris();
  const baseLocalizedStringsDoc: LocalizedStringDataContribution = { localizedStrings: {} };

  await Promise.all(
    localizeFileUris.map(async (uri) => {
      try {
        const localizeFileString = await nodeFS.readFileText(uri);
        const fileName = getFileNameFromUri(uri);
        if (fileName === 'metadata') {
          baseLocalizedStringsDoc.metadata = convertToLocalizedStringMetadata(localizeFileString);
          return;
        }

        // We just made the `localizedStrings` property above
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        baseLocalizedStringsDoc.localizedStrings![fileName] = convertToLocalizationData(
          localizeFileString,
          fileName,
        );
      } catch (error) {
        logger.warn(error);
      }
    }),
  );

  localizedStringsDocumentCombiner.updateBaseDocument(baseLocalizedStringsDoc);
}

async function getDefaultLanguages() {
  const languagesFromSetting = await settingsService.get('platform.interfaceLanguage');
  if (languagesFromSetting) return languagesFromSetting;

  const currentLocaleLanguage = getCurrentLocale();
  return [currentLocaleLanguage];
}

async function addLanguageIfNotThere(languages: string[], language: string, goesFirst: boolean) {
  if (languages.includes(language)) return;
  if (goesFirst) languages.unshift(language);
  else languages.push(language);
}

async function getCanonicalLocale(languageCode: string) {
  try {
    return Intl.getCanonicalLocales(languageCode)[0];
  } catch (e) {
    logger.warn(`getCanonicalLocales failed for ${languageCode} with error ${e}`);
  }
  // If we can't find a base for some reason, stick with the original language code
  return languageCode;
}

async function moveToFirstLanguageWithData(languages: string[]) {
  if (languages.length === 0) return undefined;

  const standardizedLanguageCode = await getCanonicalLocale(languages[0]);
  if (localizedStringsDocumentCombiner.getLocalizedStringData(standardizedLanguageCode))
    return standardizedLanguageCode;

  // Try to get data for base language by stripping the region from the language code
  // (e.g. en-US becomes en)
  const baseLanguage = await getBaseLanguageCode(languages[0]);
  if (localizedStringsDocumentCombiner.getLocalizedStringData(baseLanguage)) return baseLanguage;

  // If no language data can be found for a language or its base, then we should remove it from
  // the languages to consider as it will not be useful for the fallback key either.
  languages.shift();
  return moveToFirstLanguageWithData(languages);
}

async function getNextDefinedLanguageData(languages: string[]) {
  const standardizedLanguage = await moveToFirstLanguageWithData(languages);
  // Note: This should never happen thanks to the english fallback, but is here just in case
  if (standardizedLanguage === undefined) {
    logger.warn(`No BCP 47 language code could found from the languages provided`);
    return undefined;
  }

  const languageData =
    localizedStringsDocumentCombiner.getLocalizedStringData(standardizedLanguage);
  // Note: This should never happen thanks to the english fallback, but is here just in case
  if (languageData === undefined) {
    logger.warn(`Language data could not be found for ${standardizedLanguage}`);
  }

  return languageData;
}

async function getMetadata(localizeKey: LocalizeKey) {
  if (!localizedStringsDocumentCombiner.getLocalizedStringData().metadata) {
    logger.warn(`Metadata missing`);
    return undefined;
  }

  const metadata =
    localizedStringsDocumentCombiner.getLocalizedStringData().metadata?.[localizeKey];
  return metadata;
}

async function findFirstLocalization(localizeKey: LocalizeKey, languages: string[]) {
  if (languages.length <= 0) return undefined;

  const tempLanguageData = await getNextDefinedLanguageData(languages);
  if (tempLanguageData === undefined) return undefined;
  const localization = tempLanguageData[localizeKey];
  if (localization) return localization;
  const [, ...remainingLanguages] = languages;
  return findFirstLocalization(localizeKey, remainingLanguages);
}

async function findLocalizationForFallbackLanguageAndOrKey(
  localizeKey: LocalizeKey,
  languages: string[],
  initialLanguageData: LocalizationData,
) {
  const metadata = await getMetadata(localizeKey);
  if (metadata?.fallbackKey && initialLanguageData) {
    const { fallbackKey } = metadata;

    // check fallback key in current language
    const fallbackLocalizationInCurrentLanguage = initialLanguageData[fallbackKey];
    if (fallbackLocalizationInCurrentLanguage) return fallbackLocalizationInCurrentLanguage;
  }

  // If the fallback key can't be found in the current language, check the localize key in the other
  // fallback languages
  const currentKeyLanguages = [...languages]; // Make a duplicate as array will get changed during search
  const currentKeyFallbackLanguageLocalization = await findFirstLocalization(
    localizeKey,
    currentKeyLanguages,
  );
  if (currentKeyFallbackLanguageLocalization) return currentKeyFallbackLanguageLocalization;

  // If the localize key can't be found in any language, look for a fallback key and look for that
  // key in the fallback languages if it exists
  if (metadata?.fallbackKey) {
    const { fallbackKey } = metadata;
    const fallbackKeyFallbackLanguageLocalization = await findFirstLocalization(fallbackKey, [
      ...languages,
    ]);
    if (fallbackKeyFallbackLanguageLocalization) return fallbackKeyFallbackLanguageLocalization;
  }

  return undefined;
}

class LocalizationDataProviderEngine
  extends DataProviderEngine<LocalizationDataDataTypes>
  implements IDataProviderEngine<LocalizationDataDataTypes>
{
  // This method legitimately does not need to call anything else in this class as of now
  // eslint-disable-next-line class-methods-use-this
  async getLocalizedString({ localizeKey, locales = [] }: LocalizationSelector) {
    const languages = locales.length > 0 ? [...locales] : await getDefaultLanguages();

    // English is always a backup
    addLanguageIfNotThere(languages, 'en', false);

    const initialLanguageData = await getNextDefinedLanguageData(languages);
    // Note: This should never happen, but if it does then there are no languages with data so just
    // return the localize key so there is some text to display even if we can't find a localization
    if (initialLanguageData === undefined) {
      logger.warn(`No data found for any of the provided languages`);
      return localizeKey;
    }

    const initialLocalizationSearchResult = initialLanguageData[localizeKey];
    if (initialLocalizationSearchResult) return initialLocalizationSearchResult;

    const fallbackLocalization = await findLocalizationForFallbackLanguageAndOrKey(
      localizeKey,
      languages,
      initialLanguageData,
    );
    if (fallbackLocalization) return fallbackLocalization;

    logger.warn(
      `No localizations found for key or fallback key in any of the given languages for localize key: ${localizeKey}`,
    );
    return localizeKey;
  }

  async getLocalizedStrings({ localizeKeys, locales = [] }: LocalizationSelectors) {
    const languages =
      locales.length > 0 ? locales : await settingsService.get('platform.interfaceLanguage');

    // This will remove languages with no data from languages so that work only needs to be done once
    // rather than doing it for every key.
    await moveToFirstLanguageWithData(languages);

    const localizations = new Map<string, string>();
    await Promise.all(
      localizeKeys.map(async (key) => {
        // Languages without a localization for the given key get removed from the languages list, but
        // a language may have localizations for some keys and not others so we don't want them to be
        // permanently removed. Work around this by sending in a copy of the languages list that can be
        // safely manipulated for each key.
        const languagesForKey = languages;
        localizations.set(
          key,
          await this.getLocalizedString({ localizeKey: key, locales: languagesForKey }),
        );
      }),
    );
    return Object.fromEntries(localizations);
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line class-methods-use-this
  async setLocalizedString(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>> {
    throw new Error('setLocalizedString disabled');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line class-methods-use-this
  async setLocalizedStrings(): Promise<DataProviderUpdateInstructions<LocalizationDataDataTypes>> {
    throw new Error('setLocalizedStrings disabled');
  }
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: ILocalizationService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await loadAllLocalizationData();
          dataProvider = await dataProviderService.registerEngine(
            localizationServiceProviderName,
            new LocalizationDataProviderEngine(),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingLocalizationService = {
  implementLocalizationDataProviderEngine: async () => {
    await loadAllLocalizationData();
    return new LocalizationDataProviderEngine();
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localizationDataService = createSyncProxyForAsyncObject<ILocalizationService>(async () => {
  await initialize();
  return dataProvider;
}, localizationServiceObjectToProxy);
