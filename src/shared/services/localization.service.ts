import { dataProviderService } from '@shared/services/data-provider.service';
import {
  createCachedInitializer,
  createSyncProxyForAsyncObject,
  getLocalizedIdFromBookNumber,
} from 'platform-bible-utils';
import {
  ILocalizationService,
  localizationServiceProviderName,
  localizationServiceObjectToProxy,
} from '@shared/services/localization.service-model';

let dataProvider: ILocalizationService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(localizationServiceProviderName);
  if (!provider) throw new Error('Localization service undefined');
  dataProvider = provider;
});

export const localizationService = createSyncProxyForAsyncObject<ILocalizationService>(
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
        ({ localizeKey, ...options }) =>
          localizationService.getLocalizedString({
            ...options,
            localizeKey: `%${localizeKey}%`,
          }),
      );
    },
  },
);

export default localizationService;
