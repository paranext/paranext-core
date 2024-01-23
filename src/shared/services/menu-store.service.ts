import networkObjectService from '@shared/services/network-object.service';
import {
  MenuStoreServiceType,
  menuStoreServiceNetworkObjectName,
} from './menu-store.service-model';

let networkObject: MenuStoreServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localMenuStoreService = await networkObjectService.get<MenuStoreServiceType>(
            menuStoreServiceNetworkObjectName,
          );
          if (!localMenuStoreService)
            throw new Error(
              `${menuStoreServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localMenuStoreService;
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

const menuStoreService: MenuStoreServiceType = {
  get: async (menuKey: string) => {
    await initialize();
    return networkObject.get(menuKey);
  },
  subscribe: async (menuKey: string) => {
    await initialize();
    return networkObject.subscribe(menuKey);
  },
};

export default menuStoreService;
