import networkObjectService from '@shared/services/network-object.service';
import {
  MenuContent,
  MenuStoreServiceType,
  menuStoreServiceProviderName,
} from './menu-store.service-model';

// TODO: Similar proxy-ing as in the service-host, create utility function to use in both
// places that accepts what you want to proxy over and a handler

let networkObject: MenuStoreServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localMenuStoreService = await networkObjectService.get<MenuStoreServiceType>(
            menuStoreServiceProviderName,
          );
          if (!localMenuStoreService)
            throw new Error(`${menuStoreServiceProviderName} is not available as a network object`);
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
  getMenuData: async (menuType: string) => {
    await initialize();
    return networkObject.getMenuData(menuType);
  },
  setMenuData: async (menuType: string, menuContent: MenuContent) => {
    await initialize();
    return networkObject.setMenuData(menuType, menuContent);
  },
};

export default menuStoreService;
