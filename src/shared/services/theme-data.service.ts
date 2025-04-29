import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeDataService,
  themeDataServiceObjectToProxy,
  themeDataServiceProviderName,
} from '@shared/services/theme-data.service-model';

let dataProvider: IThemeDataService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(themeDataServiceProviderName);
          if (!provider) throw new Error('Theme data service undefined');
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

export const themeDataService = createSyncProxyForAsyncObject<IThemeDataService>(async () => {
  await initialize();
  return dataProvider;
}, themeDataServiceObjectToProxy);

export default themeDataService;
