import {
  MenuDataDataTypes,
  IMenuDataService,
  menuDataServiceObjectToProxy,
  menuDataServiceProviderName,
} from '@shared/services/menu-data.service-model';
import dataProviderService from '@shared/services/data-provider.service';
import IDataProviderEngine, { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  PlatformMenus,
  MultiColumnMenu,
  ReferencedItem,
  WebViewMenu,
  Localized,
} from 'platform-bible-utils';
import menuDataObject from '@extension-host/data/menu.data.json';
import logger from '@shared/services/logger.service';
import MenuDocumentCombiner from '@shared/utils/menu-document-combiner';

/**
 * Object that keeps track of all active menus in the platform. Call
 * {@link MenuDataDataProviderEngine.rebuildMenus} in the service host after updating this object.
 *
 * Keeping this object separate from the data provider and disabling the `set` calls in the data
 * provider prevents random services from changing system menus unexpectedly.
 */
export const menuDocumentCombiner = new MenuDocumentCombiner(menuDataObject);

class MenuDataDataProviderEngine
  extends DataProviderEngine<MenuDataDataTypes>
  implements IDataProviderEngine<MenuDataDataTypes>
{
  private mainMenu: Localized<MultiColumnMenu> = { groups: {}, items: [], columns: {} };
  private webViewMenusMap = new Map<ReferencedItem, Localized<WebViewMenu>>();

  constructor(menuData: Localized<PlatformMenus>) {
    super();
    this.#loadAllMenuData(menuData);
  }

  async rebuildMenus(): Promise<void> {
    const currentMenus = await menuDocumentCombiner.getCurrentMenus();
    if (!currentMenus || currentMenus.mainMenu === this.mainMenu) return;
    this.#loadAllMenuData(currentMenus);
    this.notifyUpdate('*');
  }

  async getMainMenu(): Promise<Localized<MultiColumnMenu>> {
    if (!this.mainMenu) throw new Error('Missing/invalid main menu data');
    return this.mainMenu;
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line class-methods-use-this
  async setMainMenu(): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setMainMenu disabled');
  }

  async getWebViewMenu(webViewName: ReferencedItem): Promise<Localized<WebViewMenu>> {
    const webViewMenu = this.webViewMenusMap.get(webViewName);
    if (!webViewMenu) {
      logger.debug(`Missing/invalid web view menu data for web view ${webViewName}`);
      return { contextMenu: undefined, includeDefaults: false, topMenu: undefined };
    }
    return webViewMenu;
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line class-methods-use-this
  async setWebViewMenu(): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setWebViewMenu disabled');
  }

  #loadAllMenuData(menuData: Localized<PlatformMenus>): void {
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
            new MenuDataDataProviderEngine(menuDataObject),
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
  implementMenuDataDataProviderEngine: (dataObj: Localized<PlatformMenus>) => {
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
