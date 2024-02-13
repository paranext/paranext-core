import {
  LocalizationServiceType,
  localizationServiceNetworkObjectName,
  LocalizationData,
} from '@shared/services/localization.service-model';
import networkObjectService from '@shared/services/network-object.service';
import * as nodeFS from '@node/services/node-file-system.service';
import { deserialize } from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { joinUriPaths } from '@node/utils/util';

const LOCALIZATION_ROOT_URI = joinUriPaths('resources://', 'assets', 'localization');
// BCP 47 validation regex from https://stackoverflow.com/questions/7035825/regular-expression-for-a-language-tag-as-defined-by-bcp47
const LANGUAGE_CODE_REGEX =
  /^(?<grandfathered>(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|t(?:a[oy]|su))|sgn-(?:BE-(?:FR|NL)|CH-DE))|(?:art-lojban|cel-gaulish|no-(?:bok|nyn)|zh-(?:guoyu|hakka|min(?:-nan)?|xiang)))|(?:(?<language>(?:[A-Za-z]{2,3}(?:-(?<extlang>[A-Za-z]{3}(?:-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(?:-(?<script>[A-Za-z]{4}))?(?:-(?<region>[A-Za-z]{2}|[0-9]{3}))?(?:-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(?:-(?<extension>[0-9A-WY-Za-wy-z](?:-[A-Za-z0-9]{2,8})+))*)(?:-(?<privateUse>x(?:-[A-Za-z0-9]{1,8})+))?(?:.json)?$/;
const DEFAULT_LANGUAGE = 'en-US';

function getLanguageCodeFromUri(uriToMatch: string): string {
  const match = uriToMatch.match(LANGUAGE_CODE_REGEX);
  if (!match) throw new Error('Localization service - No match for language code');
  return match[0].replace('.json', '');
}

function validateLanguageCode(languageCode: string): boolean {
  const match = languageCode.match(LANGUAGE_CODE_REGEX) ?? '';
  return LANGUAGE_CODE_REGEX.test(languageCode) && match[0].length === languageCode.length;
}

/** Convert contents of a specific localization json file to an object */
function convertToLocalizationData(jsonString: string, languageCode: string): LocalizationData {
  const localizationData: LocalizationData = deserialize(jsonString);
  if (typeof localizationData !== 'object')
    throw new Error(`Localization data for language '${languageCode}' is invalid`);
  return localizationData;
}

async function getLocalizedFileUris(): Promise<string[]> {
  const entries = await nodeFS.readDir(LOCALIZATION_ROOT_URI);
  if (!entries) throw new Error('No entries found in localization folder');
  return entries.file;
}

/** Map of BCP 47 code to localized values for that language */
const languageLocalizedData = new Map<string, LocalizationData>();

/** Load the contents of all localization files from disk */
async function loadAllLocalizationData(): Promise<Map<string, LocalizationData>> {
  languageLocalizedData.clear();
  const localizeFileUris = await getLocalizedFileUris();

  await Promise.all(
    localizeFileUris.map(async (uri) => {
      try {
        const localizeFileString = await nodeFS.readFileText(uri);
        const languageCode = getLanguageCodeFromUri(uri);
        languageLocalizedData.set(
          languageCode,
          convertToLocalizationData(localizeFileString, languageCode),
        );
      } catch (error) {
        logger.warn(error);
      }
    }),
  );
  return languageLocalizedData;
}

let initializationPromise: Promise<void>;
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

async function getLocalizedString(localizeKey: string, language: string = DEFAULT_LANGUAGE) {
  await initialize();
  if (!validateLanguageCode(language)) throw new Error('Invalid language format');

  const languageData =
    languageLocalizedData.get(language) ?? languageLocalizedData.get(DEFAULT_LANGUAGE);

  if (!languageData || !languageData[localizeKey])
    throw new Error(`Missing/invalid localization data`);
  return languageData[localizeKey];
}

async function getLocalizedStrings(localizeKeys: string[], language: string = DEFAULT_LANGUAGE) {
  await initialize();
  if (!validateLanguageCode(language)) throw new Error('Invalid language format');

  const languageData =
    languageLocalizedData.get(language) ?? languageLocalizedData.get(DEFAULT_LANGUAGE);

  if (!languageData) throw new Error('Missing/invalid localization data');
  return Object.fromEntries(
    localizeKeys.map((key) => {
      if (!languageData[key]) throw new Error('Missing/invalid localization data');
      return [key, languageData[key]];
    }),
  );
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
