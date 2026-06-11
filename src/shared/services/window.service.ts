import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService;
let initializationPromise: Promise<void> | undefined;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(windowServiceProviderName);
          if (!provider) throw new Error('Window service undefined');
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

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceObjectToProxy);
