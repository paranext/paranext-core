import {
  MenuContent,
  MenuData,
  MenuStoreDataTypes,
  MenuStoreServiceType,
  menuStoreServiceObjectToProxy,
  menuStoreServiceProviderName,
} from '@shared/services/menu-store.service-model';
import dataProviderService, { DataProviderEngine } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from '@shared/services/menu-store.service';
import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { deserialize } from 'platform-bible-utils';
import menuDataObject from '@extension-host/data/menu.data.json';
import { logger } from './papi-backend.service';

class MenuStoreDataProviderEngine
  extends DataProviderEngine<MenuStoreDataTypes>
  implements IDataProviderEngine<MenuStoreDataTypes>
{
  private menuDataMap = new Map<string, MenuContent>();
  private menuDataObject: MenuData;

  constructor(menuData: MenuData) {
    super();
    this.menuDataObject = menuData;
    this.#loadAllMenuData();
  }

  async getMenuData(menuType: string): Promise<MenuContent> {
    // Should we be listening for updates? Or does the driving service handle that
    // this.#loadAllMenuData();
    const menuData = this.menuDataMap.get(menuType);

    if (!menuData) throw new Error(`Missing/invalid menu data`);
    return menuData;
  }

  // TODO: Finish implementation of set, catch errors, return appropriate values based on DataProviderUpdateInstructions
  async setMenuData(
    menuType: string,
    menuContent: MenuContent,
  ): Promise<DataProviderUpdateInstructions<MenuStoreDataTypes>> {
    // Should we be listening for updates? Or does the driving service handle that
    // this.#loadAllMenuData();

    // if content already exists at that type it will replace content
    this.menuDataMap.set(menuType, menuContent);
    return true;
  }

  #loadAllMenuData(): Map<string, MenuContent> {
    this.menuDataMap.clear();
    try {
      Object.keys(this.menuDataObject).forEach((menuType) => {
        this.menuDataMap.set(menuType, this.menuDataObject[menuType]);
      });
    } catch (error) {
      logger.warn(error);
    }
    return this.menuDataMap;
  }
}

export function getMenuDataObject(): MenuData {
  const jsonString = JSON.stringify(menuDataObject);
  if (!jsonString) throw new Error('No data file found');
  const menuData: MenuData = deserialize(jsonString);
  if (typeof menuData !== 'object') throw new Error(`Menu data is invalid`);
  return menuData;
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: MenuStoreServiceType;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            menuStoreServiceProviderName,
            new MenuStoreDataProviderEngine(await getMenuDataObject()),
          );
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

export const menuStoreService = createSyncProxyForAsyncObject<MenuStoreServiceType>(async () => {
  await initialize();
  return dataProvider;
}, menuStoreServiceObjectToProxy);
