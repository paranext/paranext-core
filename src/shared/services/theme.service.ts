import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeService,
  themeServiceDataProviderName,
  themeServiceObjectToProxy,
} from '@shared/services/theme.service-model';

let dataProvider: IThemeService;
let initializationPromise: Promise<void> | undefined;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(themeServiceDataProviderName);
          if (!provider) throw new Error('Theme service undefined');
          dataProvider = provider;
          resolve();
        } catch (error) {
          // Clear the cached promise so the next call retries instead of failing forever
          initializationPromise = undefined;
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

export const themeService = createSyncProxyForAsyncObject<IThemeService>(async () => {
  await initialize();
  return dataProvider;
}, themeServiceObjectToProxy);
