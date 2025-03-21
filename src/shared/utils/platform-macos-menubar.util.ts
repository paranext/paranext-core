import {
  MultiColumnMenu,
  ReferencedItem,
  LocalizeKey,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  Localized,
} from 'platform-bible-utils';
import macosMenubarObject, {
  LocalizedMacosMenubar,
  MenuItemConstructorOptionsWithOrder,
} from '@shared/data/platform-macos-menubar.data';
import menuDataService from '@shared/services/menu-data.service';
import localizationService from '@shared/services/localization.service';
import * as commandService from '@shared/services/command.service';
import { CommandNames } from 'papi-shared-types';
import { MenuItemConstructorOptions } from 'electron';
import logger from '@shared/services/logger.service';

/**
 * Run a command from a menu
 *
 * @param command Info about the command to run
 * @param tabId The id of the dock layout tab on which the menu command is being run (if the tab is
 *   a web view, this is the same as the web view id) or `undefined` if run from the top menu
 */
export function handleMenuCommand(command: string) {
  (async () => {
    try {
      // Assert the more specific type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await commandService.sendCommand(command as CommandNames);
    } catch (e) {
      throw new Error(`handleMenuCommand error: command: ${command}, ${e}`);
    }
  })();
}

/**
 * Get the macOS menubar items as an array of `MenuItemConstructorOptions` suitable for passing to
 * the Electron `Menu` constructor.
 *
 * If fetching the current platform menus fails, it falls back to `macosMenubarObject`.
 *
 * @returns A promise that resolves to the combined and localized menubar items.
 */
export default async function getCurrentMacosMenubar(): Promise<MenuItemConstructorOptions[]> {
  try {
    const currentPlatformMenus = await menuDataService.getMainMenu();
    return await translatePlatformMenuItemsAndCombine(currentPlatformMenus);
  } catch (error) {
    logger.error(
      'Failed to get current platform menus. Falling back to default macOS menubar.',
      error,
    );
    return fallbackToDefaultMacosMenubar();
  }
}

/**
 * Localizes the labels and tooltips of the macOS menubar items by replacing `LocalizeKey` values
 * with their corresponding localized strings.
 *
 * @param macosMenubar The array of menubar items to be localized, each potentially containing a
 *   label, tooltip, and submenu items with their own labels and tooltips.
 * @returns A promise that resolves to a localized version of the input menubar, with all labels and
 *   tooltips replaced by their localized strings.
 */
async function localizeMacosMenubar(
  macosMenubar: MenuItemConstructorOptionsWithOrder[],
): Promise<LocalizedMacosMenubar> {
  const localizeKeys: LocalizeKey[] = [];
  macosMenubar.forEach((menu) => {
    if (menu.label) localizeKeys.push(menu.label);
    if (menu.toolTip) localizeKeys.push(menu.toolTip);
    menu.submenu?.forEach((item) => {
      if (item.label) localizeKeys.push(item.label);
      if (item.toolTip) localizeKeys.push(item.toolTip);
    });
  });

  const newStrings = await localizationService.getLocalizedStrings({ localizeKeys });

  return macosMenubar.map((menu) => ({
    ...menu,
    label: menu.label ? newStrings[menu.label] : undefined,
    toolTip: menu.toolTip ? newStrings[menu.toolTip] : undefined,
    submenu: menu.submenu?.map((item) => ({
      ...item,
      label: item.label ? newStrings[item.label] : undefined,
      toolTip: item.toolTip ? newStrings[item.toolTip] : undefined,
    })),
  }));
}

/**
 * Combine the platform specific main menu with the MacOS menubar items by translating the platform
 * specific menu items and adding them to the MacOS menubar template.
 *
 * @param currentPlatformMainMenu The platform specific main menu
 * @returns A promise that resolves to the combined menu
 */
async function translatePlatformMenuItemsAndCombine(
  currentPlatformMainMenu: MultiColumnMenu,
): Promise<MenuItemConstructorOptions[]> {
  const localizedMacosMenubar = await localizeMacosMenubar(macosMenubarObject);

  currentPlatformMainMenu.items.forEach((item) => {
    if (item.macosMenuKey === 'macosMenubar.ignore') return;

    const relevantMenu = localizedMacosMenubar.find((menu) => menu.id === item.macosMenuKey);

    if (!relevantMenu) {
      // Handle the case where there is no relevant menu and the item needs to be added to a group
      handleMenuWithoutRelevantMenu(item, currentPlatformMainMenu, localizedMacosMenubar);
    } else {
      // Add the item to the submenu of the relevant menu
      addItemToSubmenu(relevantMenu, item);
    }
  });

  // Sort and clean up the localized menus
  return sortMenuAndRemoveOrder(localizedMacosMenubar);
}

// Helper function to handle adding item when no relevant menu is found

/**
 * Helper function to handle the case where a menu item does not have a macosMenuKey in the MacOS
 * menubar template. We need to find the group and column that the item belongs to and add it to the
 * submenu of the relevant menu in the MacOS menubar.
 *
 * @param item The menu item to add to the submenu
 * @param currentPlatformMainMenu The platform specific main menu
 * @param localizedMacosMenubar The MacOS menubar
 */
function handleMenuWithoutRelevantMenu(
  item: MenuItemContainingCommand | MenuItemContainingSubmenu,
  currentPlatformMainMenu: MultiColumnMenu,
  localizedMacosMenubar: LocalizedMacosMenubar,
) {
  const relevantGroupKey = findRelevantGroupKey(item, currentPlatformMainMenu);

  const relevantColumnKey = getRelevantColumnKey(relevantGroupKey, currentPlatformMainMenu);

  if (relevantColumnKey) {
    const columnLabel = currentPlatformMainMenu.columns[relevantColumnKey].label;
    const existingMenuLocation = localizedMacosMenubar.find((menu) => menu.label === columnLabel);

    if (existingMenuLocation) {
      addItemToSubmenu(existingMenuLocation, item);
    } else {
      createNewMenuAndAddItem(columnLabel, relevantColumnKey, item, localizedMacosMenubar);
    }
  }
}

/**
 * Finds the group key in the current platform main menu that matches the group key of the given
 * menu item.
 *
 * @param item The menu item to find the group key for
 * @param currentPlatformMainMenu The current platform main menu
 * @returns The group key in the current platform main menu that matches the group key of the given
 *   menu item
 */
function findRelevantGroupKey(
  item: MenuItemContainingCommand | MenuItemContainingSubmenu,
  currentPlatformMainMenu: MultiColumnMenu,
) {
  // Object.keys returns a string[], but groupKey needs to be a ReferencedItem to index menu data
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.keys(currentPlatformMainMenu.groups).find(
    (groupKey) => groupKey === item.group,
  ) as ReferencedItem;
}

/**
 * Finds the column key in the current platform main menu that matches the group key of the given
 * group key.
 *
 * @param relevantGroupKey The group key to find the column key for
 * @param currentPlatformMainMenu The current platform main menu
 * @returns The column key in the current platform main menu that matches the group key of the given
 *   group key, or undefined if no match is found
 */
function getRelevantColumnKey(
  relevantGroupKey: ReferencedItem,
  currentPlatformMainMenu: MultiColumnMenu,
) {
  return 'column' in currentPlatformMainMenu.groups[relevantGroupKey]
    ? currentPlatformMainMenu.groups[relevantGroupKey].column
    : undefined;
}

/**
 * Creates a new menu with the given column label and adds the given item to its submenu.
 *
 * @param columnLabel The label of the column to add the menu item to
 * @param relevantColumnKey The key of the column to add the menu item to
 * @param item The menu item to add to the submenu
 * @param localizedMacosMenubar The localized MacOS menubar to add the new menu to
 */
function createNewMenuAndAddItem(
  columnLabel: string,
  relevantColumnKey: string,
  item: MenuItemContainingCommand | MenuItemContainingSubmenu,
  localizedMacosMenubar: LocalizedMacosMenubar,
) {
  localizedMacosMenubar.push({
    label: columnLabel,
    id: relevantColumnKey,
    submenu: [
      {
        label: item.label,
        id: item.label,
        order: item.order,
        click: 'command' in item ? () => handleMenuCommand(item.command) : undefined,
      },
    ],
  });
}

/**
 * Adds a menu item to a submenu.
 *
 * @param menu The menu to add the item to. Must have a submenu that is an array.
 * @param item The item to add to the submenu
 */
function addItemToSubmenu(
  menu: Localized<MenuItemConstructorOptionsWithOrder>,
  item: MenuItemContainingCommand | MenuItemContainingSubmenu,
) {
  if (Array.isArray(menu.submenu)) {
    menu.submenu.push({
      label: item.label,
      id: item.label,
      order: item.order,
      click: 'command' in item ? () => handleMenuCommand(item.command) : undefined,
    });
  }
}

/**
 * Sorts the submenu items of each menu in the localized MacOS menubar by their 'order' property,
 * then removes the 'order' property from each item. This function modifies the input menubar in
 * place and returns it as an array of `MenuItemConstructorOptions`.
 *
 * @param localizedMacosMenubar The localized MacOS menubar containing menus with submenus to be
 *   sorted and cleaned up.
 * @returns The modified menubar as an array of `MenuItemConstructorOptions` without the 'order'
 *   property in submenu items.
 */

function sortMenuAndRemoveOrder(localizedMacosMenubar: LocalizedMacosMenubar) {
  localizedMacosMenubar.forEach((menu) => {
    if (menu.submenu && Array.isArray(menu.submenu)) {
      menu.submenu.sort((a, b) => a.order - b.order);
      menu.submenu.forEach((item) => {
        delete item.order;
      });
    }
  });

  // The only difference between MenuItemConstructorOptions[] and LocalizedMacosMenubar is the order property
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return localizedMacosMenubar as MenuItemConstructorOptions[];
}

/** Returns the default macOS menubar after localizing and formatting it correctly. */
async function fallbackToDefaultMacosMenubar(): Promise<MenuItemConstructorOptions[]> {
  return sortMenuAndRemoveOrder(await localizeMacosMenubar(macosMenubarObject));
}
