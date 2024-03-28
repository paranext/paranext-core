import dataProviderService from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject, getLocalizedIdFromBookNumber } from 'platform-bible-utils';
import {
  ILocalizationService,
  localizationServiceProviderName,
  localizationServiceObjectToProxy,
} from '@shared/services/localization.service-model';

let dataProvider: ILocalizationService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(localizationServiceProviderName);
          if (!provider) throw new Error('Localization service undefined');
          dataProvider = provider;
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

const localizationDataService = createSyncProxyForAsyncObject<ILocalizationService>(
  async () => {
    await initialize();
    return dataProvider;
  },
  {
    ...localizationServiceObjectToProxy,
    getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string> {
      return getLocalizedIdFromBookNumber(
        bookNum,
        localizationLanguage,
        localizationDataService.getLocalizedString,
      );
    },
  },
);

export default localizationDataService;
