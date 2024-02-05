import {
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
import {
  PlatformMenus,
  MultiColumnMenu,
  ReferencedItem,
  WebViewMenu,
} from '@shared/models/menus.model';

class MenuDataDataProviderEngine
  extends DataProviderEngine<MenuDataDataTypes>
  implements IDataProviderEngine<MenuDataDataTypes>
{
  private mainMenu: MultiColumnMenu = { groups: {}, items: [], columns: {} };
  private webViewMenusMap = new Map<ReferencedItem, WebViewMenu>();

  constructor(menuData: PlatformMenus) {
    super();
    this.#loadAllMenuData(menuData);
  }

  async getMainMenu(): Promise<MultiColumnMenu> {
    if (!this.mainMenu) throw new Error('Missing/invalid menu data');
    return this.mainMenu;
  }

  // No implementation for this function right now, we just want to throw an error, but it wanted us to use 'this'
  // https://github.com/paranext/paranext-core/issues/425
  // eslint-disable-next-line class-methods-use-this
  async setMainMenu(
    // No implementation for this function, so no use for this variable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mainMenuType: undefined,
    // No implementation for this function, so no use for this variable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _value: never,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setMainMenu disabled');
  }

  async getWebViewMenu(webViewName: ReferencedItem): Promise<WebViewMenu> {
    const webViewMenu = this.webViewMenusMap.get(webViewName);
    if (!webViewMenu) throw new Error('Missing/invalid menu data');
    return webViewMenu;
  }

  // No implementation for this function right now, we just want to throw an error, but it wanted us to use 'this'
  // https://github.com/paranext/paranext-core/issues/425
  // eslint-disable-next-line class-methods-use-this
  async setWebViewMenu(
    // No implementation for this function, so no use for this variable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _webViewType: ReferencedItem,
    // No implementation for this function, so no use for this variable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _value: never,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setWebViewMenu disabled');
  }

  #loadAllMenuData(menuData: PlatformMenus): void {
    this.mainMenu = { groups: {}, items: [], columns: {} };
    this.webViewMenusMap.clear();

    try {
      this.mainMenu = menuData.mainMenu;
      const { webViewMenus } = menuData;

      Object.entries(webViewMenus).forEach(([webViewType, value]) => {
        // webViewMenus object above is not iterable, when use Object.entries it maps the ReferencedItems to strings
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        this.webViewMenusMap.set(webViewType as ReferencedItem, value);
      });
    } catch (error) {
      logger.warn(error);
    }
  }
}

function getMenuDataObject(): PlatformMenus {
  const jsonString = JSON.stringify(menuDataObject);
  if (!jsonString) throw new Error('No data file found');
  const menuData: PlatformMenus = deserialize(jsonString);
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
            new MenuDataDataProviderEngine(getMenuDataObject()),
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

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingMenuDataService = {
  implementMenuDataDataProviderEngine: (dataObj: PlatformMenus) => {
    return new MenuDataDataProviderEngine(dataObj);
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const menuDataService = createSyncProxyForAsyncObject<IMenuDataService>(async () => {
  await initialize();
  return dataProvider;
}, menuDataServiceObjectToProxy);
