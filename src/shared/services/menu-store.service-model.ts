/**
 * JSDOC SOURCE menuStoreService
 *
 * Provides Menu data for specific menu
 */
export interface MenuStoreServiceType {
  /**
   * Look up menu data for specific menu key
   *
   * @param menuKey String key that corresponds to a specific menu
   * @returns Menu data object
   */
  getMenuData: (menuKey: string) => Promise<{}>;
  /**
   * Subscribe to updates to the menu for the specific menu key
   *
   * @param menuKey String key that corresponds to a specific menu
   * @returns Unsubscriber function
   */
  // subscribe: (menuKey: string) => Promise<void>; // TODO: Update return type
}

export type MenuDataType = { [menuType: string]: {} };

export const menuStoreServiceNetworkObjectName = 'MenuStoreService';
