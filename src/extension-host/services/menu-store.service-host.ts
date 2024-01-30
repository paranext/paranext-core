import {
  MenuContent,
  MenuData,
  MenuStoreDataTypes,
  MenuStoreServiceType,
  menuStoreServiceProviderName,
} from '@shared/services/menu-store.service-model';
import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { deserialize } from 'platform-bible-utils';
import { registerEngineByType } from '@shared/services/data-provider.service';
import menuDataObject from '@extension-host/data/menu.data.json';
import { logger, DataProviderEngine } from './papi-backend.service';

export class MenuStoreDataProviderEngine
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
    await this.#loadAllMenuData();
    const menuData = this.menuDataMap.get(menuType);

    if (!menuData) throw new Error(`Missing/invalid menu data`);
    return menuData;
  }

  // TODO: Finish implementation of set, catch errors, return appropriate values based on DataProviderUpdateInstructions
  async setMenuData(
    menuType: string,
    menuContent: MenuContent,
  ): Promise<DataProviderUpdateInstructions<MenuStoreDataTypes>> {
    await this.#loadAllMenuData();
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
          dataProvider = await registerEngineByType(
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

// TODO: I don't think we need this here because they are calling initialize in extension-host
// No-type-assertion: We are calling stuff off of dataProvider which doesn't exist when we create this proxy.
// So we use an empty object as a placeholder while we get dataProvider.
// No-unused-vars: Using someone else's api and we don't want to use target.
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-type-assertion/no-type-assertion
const menuStoreService: MenuStoreServiceType = new Proxy({} as MenuStoreServiceType, {
  get(_target, methodName): (typeof dataProvider)[keyof typeof dataProvider] {
    return async (...args: unknown[]) => {
      await initialize();
      // The args here are the parameters for the method specified
      // @ts-expect-error 2556
      return dataProvider[methodName](...args);
    };
  },
});

// Not using currently- but will get 'menuStoreService is declared but its value is never read' without it
export const testingMenuStoreServiceHost = {
  menuStoreService,
};
