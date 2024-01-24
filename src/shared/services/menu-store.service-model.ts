import {
  MenusForOneWebView,
  MultiColumnMenu,
  ReferencedItem,
  SingleColumnMenu,
} from '@shared/schemas/menu-data.types';
import { DataProviderDataType, DataProviderUpdateInstructions } from './papi-core.service';

// Data Type to initialize data provider engine with
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
   * @param menuType String key that corresponds to a specific menu
   * @returns Menu content object
   */
  getMenuData: (menuType: string) => Promise<MenuContent>;
  /**
   * Set the menuContent of a specific menuType
   *
   * @param menuType String key that corresponds to a specific menu
   * @returns Unsubscriber function
   */
  setMenuData: (
    menuType: string,
    menuContent: MenuContent,
  ) => Promise<DataProviderUpdateInstructions<MenuStoreDataTypes>>;
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
