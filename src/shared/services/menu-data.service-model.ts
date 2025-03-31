import {
  OnDidDispose,
  UnsubscriberAsync,
  MultiColumnMenu,
  ReferencedItem,
  WebViewMenu,
  Localized,
} from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { IDataProvider } from './papi-core.service';

/** JSDOC DESTINATION menuDataServiceProviderName */
export const menuDataServiceProviderName = 'platform.menuDataServiceDataProvider';
export const menuDataServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE menuDataServiceProviderName
   *
   * This name is used to register the menu data data provider on the papi. You can use this name to
   * find the data provider when accessing it using the useData hook
   */
  dataProviderName: menuDataServiceProviderName,
});

// Data Type to initialize data provider engine with
export type MenuDataDataTypes = {
  MainMenu: DataProviderDataType<undefined, Localized<MultiColumnMenu>, never>;
  UnlocalizedMainMenu: DataProviderDataType<undefined, MultiColumnMenu, never>;
  WebViewMenu: DataProviderDataType<ReferencedItem, Localized<WebViewMenu>, never>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [menuDataServiceProviderName]: IMenuDataService;
  }
}

/**
 * JSDOC SOURCE menuDataService
 *
 * Service that allows to get and store menu data
 */
export type IMenuDataService = {
  /** Rebuild the menus with the latest inputs from all extensions. */
  rebuildMenus(): Promise<void>;
  /**
   * JSDOC SOURCE getMainMenu
   *
   * Get localized menu content for the main menu
   *
   * @param mainMenuType Does not have to be defined
   * @returns MultiColumnMenu object of localized main menu content
   */
  getMainMenu(mainMenuType: undefined): Promise<Localized<MultiColumnMenu>>;
  /** JSDOC DESTINATION getMainMenu */
  getMainMenu(): Promise<Localized<MultiColumnMenu>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @param mainMenuType Does not have to be defined
   * @param value MultiColumnMenu object to set as the localized main menu
   * @returns Unsubscriber function
   */
  setMainMenu(
    mainMenuType: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
  /**
   * Subscribe to run a callback function when the localized main menu data is changed
   *
   * @param mainMenuType Does not have to be defined
   * @param callback Function to run with the updated localized menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeMainMenu(
    mainMenuType: undefined,
    callback: (menuContent: Localized<MultiColumnMenu>) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
  /**
   * JSDOC SOURCE getUnlocalizedMainMenu
   *
   * Get unlocalized menu content for the main menu
   *
   * @param mainMenuType Does not have to be defined
   * @returns MultiColumnMenu object of unlocalized main menu content
   */
  getUnlocalizedMainMenu(mainMenuType: undefined): Promise<MultiColumnMenu>;
  /** JSDOC DESTINATION getUnlocalizedMainMenu */
  getUnlocalizedMainMenu(): Promise<MultiColumnMenu>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @param mainMenuType Does not have to be defined
   * @param value MultiColumnMenu object to set as the unlocalized main menu
   * @returns Unsubscriber function
   */
  setUnlocalizedMainMenu(
    mainMenuType: undefined,
    value: never,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
  /**
   * Subscribe to run a callback function when the unlocalized main menu data is changed
   *
   * @param mainMenuType Does not have to be defined
   * @param callback Function to run with the updated unlocalized menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeUnlocalizedMainMenu(
    mainMenuType: undefined,
    callback: (menuContent: MultiColumnMenu) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
  /**
   * Get localized menu content for a web view
   *
   * @param webViewType The type of webview for which a menu should be retrieved
   * @returns WebViewMenu object of web view menu content
   */
  getWebViewMenu(webViewType: ReferencedItem): Promise<Localized<WebViewMenu>>;
  /**
   * This data cannot be changed. Trying to use this setter this will always throw
   *
   * @param webViewType The type of webview for which a menu should be set
   * @param value Menu of specified webViewType
   * @returns Unsubscriber function
   */
  setWebViewMenu(
    webViewType: ReferencedItem,
    value: never,
  ): Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
  /**
   * Subscribe to run a callback function when the localized web view menu data is changed
   *
   * @param webViewType The type of webview for which a menu should be subscribed
   * @param callback Function to run with the updated menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeWebViewMenu(
    webViewType: ReferencedItem,
    callback: (menuContent: Localized<WebViewMenu>) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  typeof menuDataServiceObjectToProxy &
  IDataProvider<MenuDataDataTypes>;
