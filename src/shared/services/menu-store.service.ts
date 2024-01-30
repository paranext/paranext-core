import dataProviderService from '@shared/services/data-provider.service';
import {
  MenuStoreServiceType,
  menuStoreServiceObjectToProxy,
  menuStoreServiceProviderName,
} from './menu-store.service-model';

let dataProvider: MenuStoreServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(menuStoreServiceProviderName);
          if (!provider) throw new Error('Menu service data provider undefined');
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

// TODO: Finish/check and move to platform-bible-utils
export function createSyncProxyForAsyncObject<T extends object>(
  getObject: (args?: unknown[]) => Promise<T>,
  objectToProxy = {},
): T {
  // We are calling stuff off of an object which doesn't exist when we create this proxy.
  // So we use an empty object as a placeholder while we get the object.
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

const menuStoreService = createSyncProxyForAsyncObject<MenuStoreServiceType>(async () => {
  await initialize();
  return dataProvider;
}, menuStoreServiceObjectToProxy);

export default menuStoreService;
