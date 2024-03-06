import {
  LocalizationServiceType,
  localizationServiceNetworkObjectName,
  LocalizationData,
  LocalizedStringMetadata,
} from '@shared/services/localization.service-model';
import networkObjectService from '@shared/services/network-object.service';
import * as nodeFS from '@node/services/node-file-system.service';
import { deserialize } from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { joinUriPaths } from '@node/utils/util';
import path from 'path';
import settingsService from '@shared/services/settings.service';

const LOCALIZATION_ROOT_URI = joinUriPaths('resources://', 'assets', 'localization');
// BCP 47 validation regex from https://stackoverflow.com/questions/7035825/regular-expression-for-a-language-tag-as-defined-by-bcp47
const LANGUAGE_CODE_REGEX =
  /^(?<grandfathered>(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|t(?:a[oy]|su))|sgn-(?:BE-(?:FR|NL)|CH-DE))|(?:art-lojban|cel-gaulish|no-(?:bok|nyn)|zh-(?:guoyu|hakka|min(?:-nan)?|xiang)))|(?:(?<language>(?:[A-Za-z]{2,3}(?:-(?<extlang>[A-Za-z]{3}(?:-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(?:-(?<script>[A-Za-z]{4}))?(?:-(?<region>[A-Za-z]{2}|[0-9]{3}))?(?:-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(?:-(?<extension>[0-9A-WY-Za-wy-z](?:-[A-Za-z0-9]{2,8})+))*)(?:-(?<privateUse>x(?:-[A-Za-z0-9]{1,8})+))?$/;

function getFileNameFromUri(uriToMatch: string): string {
  const file = path.parse(uriToMatch);
  return file.name;
}

function shouldThrowIfNotFound() {
  return !globalThis.isPackaged;
}

async function getBaseLanguageCode(languageCode: string) {
  const match = languageCode.match(LANGUAGE_CODE_REGEX);
  if (!match) {
    if (shouldThrowIfNotFound())
      throw new Error(`Localization service - No match for language code ${languageCode}`);
    return languageCode;
  }

  const baseCode = await getCanonicalLocales(match[1]);
  if (!baseCode) {
    if (shouldThrowIfNotFound())
      throw new Error(`Localization service - No match for language code ${languageCode}`);
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
function convertToLocalizedStringMetadata(jsonString: string): LocalizedStringMetadata {
  const localizationMetadata: LocalizedStringMetadata = deserialize(jsonString);
  if (typeof localizationMetadata !== 'object')
    throw new Error(`Localization string metadata is invalid`);
  return localizationMetadata;
}

async function getLocalizedFileUris(): Promise<string[]> {
  const entries = await nodeFS.readDir(LOCALIZATION_ROOT_URI);
  if (!entries) throw new Error('No entries found in localization folder');
  return entries.file;
}

/** Map of BCP 47 code to localized values for that language */
const languageLocalizedData = new Map<string, LocalizationData>();
const localizedStringMetadata = new Map<string, LocalizedStringMetadata>();

/** Load the contents of all localization files from disk */
async function loadAllLocalizationData() {
  languageLocalizedData.clear();
  localizedStringMetadata.clear();
  const localizeFileUris = await getLocalizedFileUris();

  await Promise.all(
    localizeFileUris.map(async (uri) => {
      try {
        const localizeFileString = await nodeFS.readFileText(uri);
        const fileName = getFileNameFromUri(uri);
        if (fileName === 'metadata') {
          localizedStringMetadata.set(
            fileName,
            convertToLocalizedStringMetadata(localizeFileString),
          );
          return;
        }

        languageLocalizedData.set(
          fileName,
          convertToLocalizationData(localizeFileString, fileName),
        );
      } catch (error) {
        logger.warn(error);
      }
    }),
  );
}

let initializationPromise: Promise<void>;
/** Do the setup this service needs to function */
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await loadAllLocalizationData();
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

async function getDefaultLanguages() {
  const languagesFromSetting = await settingsService.get('platform.interfaceLanguage');
  if (languagesFromSetting) return languagesFromSetting;

  // TODO: Replace 'en' with function to find current language
  // when https://github.com/paranext/paranext-core/issues/735 is done
  const currentLocaleLanguage = 'en';
  return [currentLocaleLanguage];
}

async function addLanguageIfNotThere(languages: string[], language: string, goesFirst: boolean) {
  if (languages.includes(language)) return;
  if (goesFirst) languages.unshift(language);
  else languages.push(language);
}

async function getCanonicalLocales(languageCode: string) {
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

  const standardizedLanguageCode = await getCanonicalLocales(languages[0]);
  if (languageLocalizedData.get(standardizedLanguageCode)) return standardizedLanguageCode;

  // Try to get data for base language by stripping the region from the language code
  // (e.g. en-US becomes en)
  const baseLanguage = await getBaseLanguageCode(languages[0]);
  if (languageLocalizedData.get(baseLanguage)) return baseLanguage;

  // If no language data can be found for a language or its base, then we should remove it from
  // the languages to consider as it will not be useful for the fallback key either.
  languages.shift();
  return moveToFirstLanguageWithData(languages);
}

async function getNextDefinedLanguageData(languages: string[]) {
  const standardizedLanguage = await moveToFirstLanguageWithData(languages);
  // Note: This should never happen thanks to the english fallback, but is here just in case
  if (standardizedLanguage === undefined) {
    if (shouldThrowIfNotFound())
      throw new Error(`Language code(s) invalid and/or does/do not exist`);
    return undefined;
  }

  const languageData = languageLocalizedData.get(standardizedLanguage);
  // Note: This should never happen thanks to the english fallback, but is here just in case
  if (languageData === undefined) {
    if (shouldThrowIfNotFound())
      throw new Error(`Language code(s) invalid and/or does/do not exist`);
  }

  return languageData;
}

async function getMetadata(localizeKey: string) {
  const localizationMetadata: LocalizedStringMetadata | undefined =
    localizedStringMetadata.get('metadata');

  if (!localizationMetadata) {
    if (shouldThrowIfNotFound()) throw new Error(`Metadata missing`);
    return undefined;
  }

  const metadata = localizationMetadata[localizeKey];
  if (!metadata) {
    if (shouldThrowIfNotFound()) logger.warn(`No metadata exists for ${localizeKey}`);
    return undefined;
  }
  return metadata;
}

async function findFirstLocalization(localizeKey: string, languages: string[]) {
  if (languages.length > 0) return undefined;

  const tempLanguageData = await getNextDefinedLanguageData(languages);
  if (tempLanguageData === undefined) return undefined;
  const localization = tempLanguageData[localizeKey];
  if (localization) return localization;
  languages.shift();
  return findFirstLocalization(localizeKey, languages);
}

async function getLocalizedString(localizeKey: string, languagesToSearch: string[] = []) {
  await initialize();
  const languages = languagesToSearch.length > 0 ? languagesToSearch : await getDefaultLanguages();

  // English is always a backup
  addLanguageIfNotThere(languages, 'en', false);

  const initialLanguageData = await getNextDefinedLanguageData(languages);
  // Note: This should never happen, but if it does then there are no languages with data so just
  // return the localize key so there is some text to display even if we can't find a localization
  if (initialLanguageData === undefined) return localizeKey;

  const initialLocalizationSearchResult = initialLanguageData[localizeKey];
  if (initialLocalizationSearchResult) return initialLocalizationSearchResult;

  const metadata = await getMetadata(localizeKey);
  if (metadata !== undefined) {
    const { fallbackKey } = metadata;

    // check fallback key in current language
    const fallbackLocalizationInCurrentLanguage = initialLanguageData[fallbackKey];
    if (fallbackLocalizationInCurrentLanguage) return fallbackLocalizationInCurrentLanguage;
  }

  // If the fallback key can't be found in the current language, check the localize key in the other
  // fallback languages
  const currentKeyLanguages = languages; // Make a duplicate as array will get changed during search
  const currentKeyFallbackLanguageLocalization = await findFirstLocalization(
    localizeKey,
    currentKeyLanguages,
  );
  if (currentKeyFallbackLanguageLocalization) return currentKeyFallbackLanguageLocalization;

  // If the localize key can't be found in any language, look for a fallback key and look for that
  // key in the fallback languages if it exists
  if (metadata !== undefined) {
    const { fallbackKey } = metadata;
    const fallbackKeyFallbackLanguageLocalization = await findFirstLocalization(
      fallbackKey,
      languages,
    );
    if (fallbackKeyFallbackLanguageLocalization) return fallbackKeyFallbackLanguageLocalization;
  }

  if (shouldThrowIfNotFound())
    throw new Error(
      `No localizations found for key or fallback key in any of the given languages for localize key: ${localizeKey}`,
    );
  return localizeKey;
}

async function getLocalizedStrings(localizeKeys: string[], languagesToSearch: string[] = []) {
  await initialize();
  const languages =
    languagesToSearch.length > 0
      ? languagesToSearch
      : await settingsService.get('platform.interfaceLanguage');

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
      localizations.set(key, await getLocalizedString(key, languagesForKey));
    }),
  );
  return Object.fromEntries(localizations);
}

const localizationService: LocalizationServiceType = {
  getLocalizedString,
  getLocalizedStrings,
};

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingLocalizationService = {
  localizationService,
};

/** Register the network object that backs the PAPI localization service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `localization.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startLocalizationService(): Promise<void> {
  await initialize();
  await networkObjectService.set<LocalizationServiceType>(
    localizationServiceNetworkObjectName,
    localizationService,
  );
}

/*
const settingService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy); */
