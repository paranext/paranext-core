import {
  MultiColumnMenu,
  ReferencedItem,
  SingleColumnMenu,
  WebViewMenu,
  WebViewMenus,
} from '@shared/schemas/menu-data.types';
import { OnDidDispose, UnsubscriberAsync } from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { IDataProvider } from './papi-core.service';

/**
 * Name used to register the data provider
 *
 * You can use this name
 */
export const menuDataServiceProviderName = 'platform.menuDataServiceDataProvider';
export const menuDataServiceObjectToProxy = Object.freeze({
  dataProviderName: menuDataServiceProviderName,
});

// Data Type to initialize data provider engine with
export type MenuDataDataTypes = {
  MainMenu: DataProviderDataType<'mainMenu', MultiColumnMenu, never>;
  WebViewMenu: DataProviderDataType<ReferencedItem, WebViewMenu, never>;
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
  /**
   * Get menu content for the main menu
   *
   * @param 'mainMenu'
   * @returns MultiColumnMenu object of main menu content
   */
  getMainMenu: (menuType: 'mainMenu') => Promise<MultiColumnMenu>;
  /**
   * Set the menuContent of the main menu
   *
   * @returns Unsubscriber function
   */
  setMainMenu: () => Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
  /**
   * Subscribe to run a callback function when the main menu data is changed
   *
   * @param callback Function to run with the updated menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeMainMenu: (
    callback: (menuContent: MultiColumnMenu) => void,
    options?: DataProviderSubscriberOptions,
  ) => Promise<UnsubscriberAsync>;
  /**
   * Get menu content for a web view
   *
   * @returns WebViewMenu object of web view menu content
   */
  getWebViewMenu: (webViewName: ReferencedItem) => Promise<WebViewMenu>;
  /**
   * Set the menuContent of a web view menu
   *
   * @returns Unsubscriber function
   */
  setWebViewMenu: () => Promise<DataProviderUpdateInstructions<MenuDataDataTypes>>;
  /**
   * Subscribe to run a callback function when the web view menu data is changed
   *
   * @param callback Function to run with the updated menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeWebViewMenu: (
    callback: (menuContent: WebViewMenu) => void,
    options?: DataProviderSubscriberOptions,
  ) => Promise<UnsubscriberAsync>;
} & OnDidDispose &
  typeof menuDataServiceObjectToProxy &
  IDataProvider<MenuDataDataTypes>;

export type MenuData = {
  [menuType: string]: MenuContent;
};

export type MenuContent = MultiColumnMenu | WebViewMenus | SingleColumnMenu;
