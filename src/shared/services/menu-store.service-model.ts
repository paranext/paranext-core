import {
  MenusForOneWebView,
  MultiColumnMenu,
  ReferencedItem,
  SingleColumnMenu,
} from '@shared/schemas/menu-data.types';
import { DataProviderDataType, DataProviderUpdateInstructions } from './papi-core.service';

// Data Type to initialize data provider engine with
// TODO: Selector to change
export type MenuStoreDataTypes = {
  MenuData: DataProviderDataType<string, MenuContent, MenuContent>;
};

/**
 * JSDOC SOURCE menuStoreService
 *
 * Provides Menu data for specific menu
 */
export interface MenuStoreServiceType {
  /**
   * Look up menu data for specific menu key
   *
   * @param menuType String key that corresponds to a menu
   * @returns Menu content object
   */
  getMenuData: (menuType: string) => Promise<MenuContent>; // When I change this one the return fails
  /**
   * Set the menuContent of a specific menuType
   *
   * @param menuType String key that corresponds to a menu
   * @param menuContent Content to set for specific menuType
   * @returns Unsubscriber function
   */
  setMenuData: (
    menuType: string,
    menuContent: MenuContent,
  ) => Promise<DataProviderUpdateInstructions<MenuStoreDataTypes>>;
  /**
   * Subscribe to run a callback function when the "raw" USFM data is changed
   *
   * @param menuType Tells the provider what changes to listen for
   * @param callback Function to run with the updated menuContent for this selector
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber function (run to unsubscribe from listening for updates)
   */
  // subscribeMenuData(
  //   menuType: string,
  //   callback: (menuContent: MenuContent) => void,
  //   options?: DataProviderSubscriberOptions,
  // ): Unsubscriber;
}

export type MenuData = {
  [menuType: string]: MenuContent;
};

// I believe using PlatformBibleMenus instead of MenuData is the ideal implementation,
// but we cannot use this yet because we are leaving menuType as a string for this issue.
// export type MenuData = PlatformBibleMenus;

export type MenuContent =
  | MultiColumnMenu
  | SingleColumnMenu
  | {
      [k: ReferencedItem]: MenusForOneWebView;
    };

export const menuStoreServiceProviderName = 'MenuStoreServiceDataProvider';
