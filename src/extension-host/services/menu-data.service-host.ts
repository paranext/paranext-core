import {
  MenuDataDataTypes,
  IMenuDataService,
  menuDataServiceObjectToProxy,
  menuDataServiceProviderName,
} from '@shared/services/menu-data.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { settingsService } from '@shared/services/settings.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  isPlatformError,
  PlatformMenus,
  MultiColumnMenu,
  InterfaceMode,
  ReferencedItem,
  SingleColumnMenu,
  WebViewMenu,
  Localized,
  Unsubscriber,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { menuDocumentCombiner, onDidResyncContributions } from './contribution.service';

/**
 * Removes items whose `hiddenInterfaceModes` includes `currentMode` from a menu item list.
 *
 * Constrained to just the one field this needs, not the full `MenuItemBase` — `Localized<T>` widens
 * `MenuItemBase`'s branded `ReferencedItem`/`LocalizeKey` string fields (e.g. `group`) to plain
 * `string`, so a localized menu item no longer satisfies `MenuItemBase` itself, which would
 * otherwise make `TItem` fail to infer as the caller's actual (localized or unlocalized) item
 * type.
 */
function filterItemsForInterfaceMode<TItem extends { hiddenInterfaceModes?: InterfaceMode[] }>(
  items: TItem[],
  currentMode: InterfaceMode,
): TItem[] {
  return items.filter((item) => !item.hiddenInterfaceModes?.includes(currentMode));
}

class MenuDataDataProviderEngine
  extends DataProviderEngine<MenuDataDataTypes>
  implements IDataProviderEngine<MenuDataDataTypes>
{
  private mainMenu: Localized<MultiColumnMenu> = { groups: {}, items: [], columns: {} };
  private unlocalizedMainMenu: MultiColumnMenu = { groups: {}, items: [], columns: {} };
  private webViewMenusMap = new Map<ReferencedItem, Localized<WebViewMenu>>();
  /**
   * Kept on its own because tabs hosting no web view — dialogs, error tabs — have no name to look a
   * menu up by, and the items in a tab menu act on the tab rather than on its contents
   */
  private defaultTabMenu: Localized<SingleColumnMenu> = { groups: {}, items: [] };
  private unsubscribeOnDidResyncContributions: Unsubscriber | undefined;
  private unsubscribeFromInterfaceMode: UnsubscriberAsync | undefined;
  private currentMode: InterfaceMode = 'power';
  private isDisposed = false;

  constructor(unlocalizedMenuData: PlatformMenus) {
    super();
    this.#loadAllMenuData(unlocalizedMenuData, unlocalizedMenuData);
    this.unsubscribeOnDidResyncContributions = onDidResyncContributions(() => this.rebuildMenus());
    this.#subscribeToInterfaceMode();
  }

  async rebuildMenus(): Promise<void> {
    const currentMenus = await menuDocumentCombiner.getCurrentMenus();
    const rawMenus = menuDocumentCombiner.rawOutput;
    if (
      !currentMenus ||
      !rawMenus ||
      (currentMenus.mainMenu === this.mainMenu && rawMenus.mainMenu === this.unlocalizedMainMenu)
    )
      return;
    this.#loadAllMenuData(rawMenus, currentMenus);
    this.notifyUpdate('*');
  }

  async getMainMenu(): Promise<Localized<MultiColumnMenu>> {
    if (!this.mainMenu) throw new Error('Missing/invalid main menu data');
    const items = filterItemsForInterfaceMode(this.mainMenu.items, this.currentMode);
    return { ...this.mainMenu, items };
  }

  // setMainMenu doesn't use instance state but cannot be static because it implements the
  // IDataProviderEngine<MenuDataDataTypes> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setMainMenu(): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setMainMenu disabled');
  }

  async getUnlocalizedMainMenu(): Promise<MultiColumnMenu> {
    if (!this.unlocalizedMainMenu) throw new Error('Missing/invalid unlocalized main menu data');
    // subscribeCurrentMacosMenubar (platform-macos-menubar.util.ts) builds the native macOS
    // application menu from this data, registered unconditionally on darwin — it must apply the
    // same interface-mode filter as getMainMenu, or a hidden item would still appear there.
    const items = filterItemsForInterfaceMode(this.unlocalizedMainMenu.items, this.currentMode);
    return { ...this.unlocalizedMainMenu, items };
  }

  // setUnlocalizedMainMenu doesn't use instance state but cannot be static because it implements
  // the IDataProviderEngine<MenuDataDataTypes> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setUnlocalizedMainMenu(): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setUnlocalizedMainMenu disabled');
  }

  async getWebViewMenu(webViewName: ReferencedItem): Promise<Localized<WebViewMenu>> {
    const webViewMenu = this.webViewMenusMap.get(webViewName);
    if (!webViewMenu) {
      logger.debug(`Missing/invalid web view menu data for web view ${webViewName}`);
      // A tab hosting no web view still has a tab menu, and the platform items in it apply to every
      // tab, so an unrecognized name is answered with those rather than with nothing
      return {
        contextMenu: undefined,
        includeDefaults: false,
        topMenu: undefined,
        tabMenu: this.#filteredTabMenu(this.defaultTabMenu),
      };
    }
    const topMenu = webViewMenu.topMenu
      ? {
          ...webViewMenu.topMenu,
          items: filterItemsForInterfaceMode(webViewMenu.topMenu.items, this.currentMode),
        }
      : undefined;
    const contextMenu = webViewMenu.contextMenu
      ? {
          ...webViewMenu.contextMenu,
          items: filterItemsForInterfaceMode(webViewMenu.contextMenu.items, this.currentMode),
        }
      : undefined;
    // Unlike the top and context menus, the tab menu is not opt-in: its items act on the tab frame
    // rather than on the web view's contents, so every tab gets them whether or not the web view
    // asked for platform defaults. A web view that contributes none of its own gets exactly these
    const tabMenu = this.#filteredTabMenu(webViewMenu.tabMenu ?? this.defaultTabMenu);
    return { ...webViewMenu, topMenu, contextMenu, tabMenu };
  }

  /** Apply the interface-mode filter to a tab menu, leaving an absent one absent */
  #filteredTabMenu(
    tabMenu: Localized<SingleColumnMenu> | undefined,
  ): Localized<SingleColumnMenu> | undefined {
    if (!tabMenu) return undefined;
    return { ...tabMenu, items: filterItemsForInterfaceMode(tabMenu.items, this.currentMode) };
  }

  // setWebViewMenu doesn't use instance state but cannot be static because it implements the
  // IDataProviderEngine<MenuDataDataTypes> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setWebViewMenu(): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>> {
    throw new Error('setWebViewMenu disabled');
  }

  async dispose(): Promise<boolean> {
    this.isDisposed = true;
    if (this.unsubscribeFromInterfaceMode) {
      await this.unsubscribeFromInterfaceMode();
      this.unsubscribeFromInterfaceMode = undefined;
    }
    if (this.unsubscribeOnDidResyncContributions) {
      const success = this.unsubscribeOnDidResyncContributions();
      this.unsubscribeOnDidResyncContributions = undefined;
      return success;
    }
    return true;
  }

  /**
   * Reads the initial `platform.interfaceMode` and subscribes to further changes so menu data stays
   * live if the user switches modes without restarting. Fire-and-forget (the constructor can't be
   * async): failures are logged, not thrown, and `isDisposed` guards against setting state or
   * leaking a subscription if this engine is disposed before the async work resolves — mirrors the
   * `subscribeToInterfaceMode` pattern in `web-view.service-shard.ts`'s `registerDockLayout`.
   */
  #subscribeToInterfaceMode(): void {
    const subscribe = async () => {
      try {
        const initialMode = await settingsService.get('platform.interfaceMode');
        if (this.isDisposed) return;
        this.currentMode = initialMode;
        this.notifyUpdate('*');

        const unsub = await settingsService.subscribe(
          'platform.interfaceMode',
          (newMode) => {
            if (isPlatformError(newMode)) {
              logger.warn(
                `Menu data service failed to read updated platform.interfaceMode setting: ${newMode}`,
              );
              return;
            }
            if (newMode === this.currentMode) return;
            this.currentMode = newMode;
            this.notifyUpdate('*');
          },
          { retrieveDataImmediately: false },
        );

        if (this.isDisposed) {
          await unsub();
        } else {
          this.unsubscribeFromInterfaceMode = unsub;
        }
      } catch (error) {
        logger.warn(`Menu data service failed to subscribe to platform.interfaceMode: ${error}`);
      }
    };
    subscribe();
  }

  #loadAllMenuData(unlocalizedMainMenu: PlatformMenus, menuData: Localized<PlatformMenus>): void {
    this.mainMenu = { groups: {}, items: [], columns: {} };
    this.unlocalizedMainMenu = { groups: {}, items: [], columns: {} };
    this.defaultTabMenu = { groups: {}, items: [] };
    this.webViewMenusMap.clear();

    try {
      this.mainMenu = menuData.mainMenu;
      this.unlocalizedMainMenu = unlocalizedMainMenu.mainMenu;
      this.defaultTabMenu = menuData.defaultWebViewTabMenu;
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
          if (!menuDocumentCombiner.rawOutput)
            throw new Error(
              'Menu data service host initialization error: Menu Document Combiner output was null!',
            );
          dataProvider = await dataProviderService.registerEngine(
            menuDataServiceProviderName,
            new MenuDataDataProviderEngine(menuDocumentCombiner.rawOutput),
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

/** This is an internal-only export for testing purposes and should not be used in development */
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
