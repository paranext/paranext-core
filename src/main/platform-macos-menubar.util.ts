import {
  MultiColumnMenu,
  LocalizeKey,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  Localized,
  GroupsInMultiColumnMenu,
  formatReplacementString,
  PlatformError,
  isPlatformError,
  getErrorMessage,
} from 'platform-bible-utils';
import {
  macosMenubarObject,
  LocalizedMacosMenubar,
  MenuItemConstructorOptionsWithOrder,
} from '@main/platform-macos-menubar.data';
import { menuDataService } from '@shared/services/menu-data.service';
import { localizationService } from '@shared/services/localization.service';
import { Menu, MenuItemConstructorOptions } from 'electron';
import { logger } from '@shared/services/logger.service';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';

/**
 * Subscribe to changes in the main menu data and update the macOS menubar accordingly.
 *
 * After subscribing, whenever the main menu data changes, this function will be called with the new
 * menu data. The new menu data will be translated and combined correctly into the structure
 * expected by the Electron Menu API, and then the macOS menubar will be updated with the new menu
 * structure.
 *
 * If there is an error during the translation and combination process, the default macOS menubar
 * will be used instead.
 */
export async function subscribeCurrentMacosMenubar() {
  return menuDataService.subscribeUnlocalizedMainMenu(
    undefined,
    async (menuContent: MultiColumnMenu | PlatformError) => {
      let currentMacosMenubarTemplate;
      try {
        if (isPlatformError(menuContent))
          throw new Error(`PlatformError: ${getErrorMessage(menuContent)}`);
        currentMacosMenubarTemplate = await translatePlatformMenuItemsAndCombine(menuContent);
      } catch (error) {
        logger.error(
          'Failed to get current platform menus. Falling back to default macOS menubar.',
          error,
        );
        currentMacosMenubarTemplate = await fallbackToDefaultMacosMenubar();
      }

      try {
        const coreMacosMenubar = Menu.buildFromTemplate(currentMacosMenubarTemplate);
        Menu.setApplicationMenu(coreMacosMenubar);
      } catch (error) {
        logger.error('Failed to build current macOS menubar', error);
      }
    },
  );
}

function sortMenuAndRemoveAddedProps(localizedMacosMenubar: LocalizedMacosMenubar) {
  localizedMacosMenubar.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  localizedMacosMenubar.forEach((menu) => {
    if (Array.isArray(menu.submenu)) {
      menu.submenu.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // Remove the `order` property from submenu items
      menu.submenu.forEach((item) => {
        delete item.order;
        delete item.isLabelFormatString;

        // If the submenu item has its own submenu, sort it recursively
        if (Array.isArray(item.submenu)) {
          item.submenu.sort(
            (a: MenuItemConstructorOptionsWithOrder, b: MenuItemConstructorOptionsWithOrder) =>
              (a.order ?? 0) - (b.order ?? 0),
          );
          item.submenu.forEach(
            (subItem: MenuItemConstructorOptionsWithOrder) => delete subItem.order,
          );
        }
      });
    }

    // Remove the `order` property from the top-level menu
    delete menu.order;
  });

  // The only difference between MenuItemConstructorOptions[] and LocalizedMacosMenubar is the `order` property
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return localizedMacosMenubar as MenuItemConstructorOptions[];
}

/** Returns the default macOS menubar after localizing and formatting it correctly. */
async function fallbackToDefaultMacosMenubar(): Promise<MenuItemConstructorOptions[]> {
  return sortMenuAndRemoveAddedProps(await localizeMacosMenubar(macosMenubarObject));
}

async function localizeMacosMenubar(
  macosMenubar: MenuItemConstructorOptionsWithOrder[],
): Promise<LocalizedMacosMenubar> {
  const localizeKeys: LocalizeKey[] = ['%product_name%'];
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
    label: menu.label ? newStrings[menu.label] : menu.label,
    toolTip: menu.toolTip ? newStrings[menu.toolTip] : menu.toolTip,
    submenu: menu.submenu?.map((item) => ({
      ...item,
      label: (() => {
        if (!item.label) return item.label;
        if (item.isLabelFormatString) {
          return formatReplacementString(newStrings[item.label], newStrings);
        }
        return newStrings[item.label];
      })(),
      toolTip: item.toolTip ? newStrings[item.toolTip] : item.toolTip,
    })),
  }));
}

const getSubMenuKeyForId = (
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string | undefined => {
  return Object.entries(groups).find(
    ([, value]) => 'menuItem' in value && value.menuItem === id,
  )?.[0];
};

function getMenubarColumnContent(
  groups: Localized<GroupsInMultiColumnMenu>,
  items: Localized<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]>,
  columnOrSubMenuKey: string | undefined,
): LocalizedMacosMenubar | [] {
  if (!columnOrSubMenuKey) return [];

  // Object.entries() turns groups into an array of key value pairs. After we filter and map the items, it is a LocalizedMacosMenubar object.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.entries(groups)
    .filter(
      ([key, group]) =>
        ('column' in group && group.column === columnOrSubMenuKey) || key === columnOrSubMenuKey,
    )
    .flatMap(([groupKey]) =>
      items
        .filter((item) => item.group === groupKey)
        .map((item) =>
          'command' in item
            ? {
                label: item.label,
                // Since the item has a command, we know it is a MenuItemContainingCommand.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                click: () => handleMenuCommand(item as MenuItemContainingCommand, groupKey),
                order: item.order,
              }
            : {
                label: item.label,
                submenu: getMenubarColumnContent(
                  groups,
                  items,
                  getSubMenuKeyForId(groups, item.id),
                ),
              },
        ),
    ) as LocalizedMacosMenubar;
}

/**
 * Merges the contributed platform main menu into the macOS menubar template.
 *
 * Exported for `platform-macos-menubar.util.test.ts`, which drives the real combine rather than a
 * helper the combine could stop calling. Main-process-internal; it is on no PAPI surface.
 */
export async function translatePlatformMenuItemsAndCombine(
  currentPlatformMainMenu: MultiColumnMenu,
): Promise<MenuItemConstructorOptions[]> {
  // Convert the platform-specific main menu into the correct format
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const platformMainMenuContent = Object.entries(currentPlatformMainMenu.columns)
    .filter(([, column]) => typeof column === 'object')
    .map(([columnKey, columnData]) => ({
      label: typeof columnData === 'object' ? columnData.label : '',
      order: typeof columnData === 'object' ? columnData.order : 0,
      submenu: getMenubarColumnContent(
        currentPlatformMainMenu.groups,
        currentPlatformMainMenu.items,
        columnKey,
      ).filter((menuItem) => menuItem.label !== '%mainMenu_exit%'), // Remove duplicate 'Exit' here
    })) as MenuItemConstructorOptionsWithOrder[];

  // Each entry gets its own object AND its own submenu array: the combine below pushes contributed
  // items into the app menu's and a matching column's submenu, and `macosMenubarObject` is a
  // module-level template that `fallbackToDefaultMacosMenubar` and every later rebuild read again.
  // Writing through it would leave every later build carrying the items of the builds before it —
  // one more copy of each contributed item per menu rebuild, for the life of the process.
  // Deliberately not `structuredClone` or a JSON round trip: the zoom items carry `click` closures,
  // which `structuredClone` refuses outright and a JSON round trip drops silently — leaving menu
  // items that render and do nothing.
  const combinedMenubar: MenuItemConstructorOptionsWithOrder[] = macosMenubarObject.map((menu) => ({
    ...menu,
    submenu: Array.isArray(menu.submenu) ? [...menu.submenu] : menu.submenu,
  }));

  platformMainMenuContent.forEach((column) => {
    if (!column.submenu || !Array.isArray(column.submenu)) return;
    const appMenu: MenuItemConstructorOptionsWithOrder | undefined = combinedMenubar.find(
      (menu) => menu.id === 'macosMenubar.appMenu',
    );
    // Move 'Platform' menu items to macOS generated app menu and remove duplicate app menu
    if (column.label === '%product_shortName%' && appMenu) {
      appMenu.submenu?.push(...column.submenu);
      column.submenu = [];
      column.label = '%%'; // If there is no label, this menu item won't show up
      return;
    }

    const existingMenu = combinedMenubar.find(
      (menu) =>
        menu.label?.toLowerCase() === column.label?.toLowerCase() ||
        menu.role?.toLowerCase() === column.label?.toLowerCase(),
    );

    if (existingMenu) {
      // Combine rather than replace: a contributed column sharing a header with a platform menu
      // must not displace that menu's own items. On the View menu those are the only delivery path
      // for ⌘=/⌘-/⌘0, reload, dev tools and full screen. `sortMenuAndRemoveAddedProps` interleaves
      // both sets by `order`, the same way a contributed app-menu column is merged above.
      if (Array.isArray(existingMenu.submenu)) existingMenu.submenu.push(...column.submenu);
      else existingMenu.submenu = column.submenu;
    } else {
      combinedMenubar.push(column);
    }
  });

  const localizedMenu = await localizeMacosMenubar(combinedMenubar);
  return sortMenuAndRemoveAddedProps(localizedMenu);
}
