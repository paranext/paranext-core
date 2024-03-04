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
  /** Get menu content for the main menu */
  getMainMenu(): Promise<Localized<MultiColumnMenu>>;
  /**
   * Subscribe to run a callback function when the main menu data is changed
   *
   * @param callback Function to run with the updated menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  subscribeMainMenu(
    callback: (menuContent: Localized<MultiColumnMenu>) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
  /**
   * Get menu content for a web view
   *
   * @param webViewType The type of webview for which a menu should be retrieved
   * @returns WebViewMenu object of web view menu content
   */
  getWebViewMenu(webViewType: ReferencedItem): Promise<Localized<WebViewMenu>>;
  /**
   * Subscribe to run a callback function when the web view menu data is changed
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
