import {
  MenuContent,
  MenuData,
  MenuDataDataTypes,
  IMenuDataService,
  menuDataServiceObjectToProxy,
  menuDataServiceProviderName,
} from '@shared/services/menu-data.service-model';
import dataProviderService, { DataProviderEngine } from '@shared/services/data-provider.service';
import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { createSyncProxyForAsyncObject, deserialize } from 'platform-bible-utils';
import menuDataObject from '@extension-host/data/menu.data.json';
import logger from '@shared/services/logger.service';

export class MenuDataDataProviderEngine
  extends DataProviderEngine<MenuDataDataTypes>
  implements IDataProviderEngine<MenuDataDataTypes>
{
  private menuDataMap = new Map<string, MenuContent>();

  constructor(menuData: MenuData) {
    super();
    this.#loadAllMenuData(menuData);
  }

  // TODO: Changes
  async getMenuData(menuType: string): Promise<MenuContent> {
    const menuData = this.menuDataMap.get(menuType);

    if (!menuData) throw new Error(`Missing/invalid menu data`);
    return menuData;
  }

  // No implementation for this function right now, we just want to throw an error, but it wanted us to use 'this'
  // https://github.com/paranext/paranext-core/issues/425
  // eslint-disable-next-line class-methods-use-this
  async setMenuData(
    menuType: string,
    menuContent: MenuContent,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    // throw new Error('setMenuData disabled');
    logger.info(menuType, menuContent);
    return false;
  }

  #loadAllMenuData(menuData: MenuData): Map<string, MenuContent> {
    this.menuDataMap.clear();
    try {
      Object.keys(menuData).forEach((menuType) => {
        this.menuDataMap.set(menuType, menuData[menuType]);
      });
    } catch (error) {
      logger.warn(error);
    }
    return this.menuDataMap;
  }
}

function getMenuDataObject(): MenuData {
  const jsonString = JSON.stringify(menuDataObject);
  if (!jsonString) throw new Error('No data file found');
  const menuData: MenuData = deserialize(jsonString);
  if (typeof menuData !== 'object') throw new Error(`Menu data is invalid`);
  return menuData;
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: IMenuDataService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            menuDataServiceProviderName,
            new MenuDataDataProviderEngine(await getMenuDataObject()),
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

export const menuDataService = createSyncProxyForAsyncObject<IMenuDataService>(async () => {
  await initialize();
  return dataProvider;
}, menuDataServiceObjectToProxy);
