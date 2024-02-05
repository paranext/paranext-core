import dataProviderService from './data-provider.service';
import {
  ISettingsService,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from './settings.service-model';

let dataProvider: ISettingsService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(settingsServiceDataProviderName);
          if (!provider) throw new Error('Menu data service undefined');
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

// TODO: delete this utility function once menuDataService is pushed- don't have access to it now
function createSyncProxyForAsyncObject<T extends object>(
  getObject: (args?: unknown[]) => Promise<T>,
  objectToProxy: Partial<T> = {},
): T {
  // objectToProxy will have only the synchronously accessed properties of T on it, and this proxy
  // makes the async methods that do not exist yet available synchronously so we have all of T
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return new Proxy(objectToProxy as T, {
    get(target, prop) {
      // We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
      // @ts-expect-error 7053
      if (prop in target) return target[prop];
      return async (...args: unknown[]) => {
        // 7053: We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
        // 2556: The args here are the parameters for the method specified
        // @ts-expect-error 7053 2556
        return (await getObject())[prop](...args);
      };
    },
  });
}

const menuDataService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default menuDataService;
