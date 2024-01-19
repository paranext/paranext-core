import {
  LocalizationServiceType,
  localizationServiceNetworkObjectName,
} from '@shared/services/localization.service-model';
import networkObjectService from '@shared/services/network-object.service';
import * as nodeFS from '@node/services/node-file-system.service';
import { deserialize } from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { LocalizationData } from '@shared/models/localization-data.model';
import { joinUriPaths } from '@node/utils/util';

const LOCALIZATION_ROOT_URI = joinUriPaths('resources://', 'assets', 'localization');
const LANGUAGE_CODE_REGEX = /\\([a-zA-Z]+)\.json/;

function getLanguageCodeFromUri(uriToMatch: string): string {
  const isMatch = LANGUAGE_CODE_REGEX.test(uriToMatch);
  const match = isMatch ? uriToMatch.match(LANGUAGE_CODE_REGEX) : undefined;
  if (match) return match[1];
  throw new Error('Localization service - No match for language code');
}

/** Convert contents of a specific localization json file to an object */
function convertToLocalizationData(jsonString: string): LocalizationData {
  const ld: LocalizationData = deserialize(jsonString);
  // Missing validity check
  return ld;
}

async function getLocalizedFileUris(): Promise<string[]> {
  const entries = await nodeFS.readDir(LOCALIZATION_ROOT_URI);
  if (entries) return entries.file;
  throw new Error('No entries found in localization folder');
}

// Map of ISO 639-2 code to localized values for that language
const languageLocalizedData = new Map<string, LocalizationData>();

/** Load the contents of all localization files from disk */
async function loadAllLocalizationData(): Promise<Map<string, LocalizationData>> {
  languageLocalizedData.clear();
  const localizeFileUris = await getLocalizedFileUris();

  await Promise.all(
    localizeFileUris.map(async (uri) => {
      try {
        const localizeFileString = await nodeFS.readFileText(uri);
        /**
         * This line needs some work- I wanted to get the ISO code from the file name so that we can
         * store each set of data with the appropriate language. EXAMPLE: uri =
         * 'app://localization/eng.json'; languageCode = 'eng'
         */
        const languageCode = getLanguageCodeFromUri(uri);
        languageLocalizedData.set(languageCode, convertToLocalizationData(localizeFileString));
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
          loadAllLocalizationData();
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

async function getLocalizedValueForKey(localizeKey: string, language: string) {
  await initialize();
  const languageData = languageLocalizedData?.get(language);

  if (languageData && languageData[localizeKey]) {
    return languageData[localizeKey];
  }
  throw new Error('Missing/invalid localization data');
}

async function getLocalizedValuesForKeys(localizeKeys: string[], language: string) {
  await initialize();
  const retVal: LocalizationData = {};
  const languageData = languageLocalizedData?.get(language);

  if (languageData) {
    localizeKeys.forEach((key) => {
      retVal[key] = languageData[key];
    });
    return retVal;
  }
  throw new Error('Missing/invalid localization data');
}

const localizationService: LocalizationServiceType = {
  getLocalizedValueForKey,
  getLocalizedValuesForKeys,
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
