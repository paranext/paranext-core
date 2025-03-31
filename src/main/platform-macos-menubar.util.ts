import {
  MultiColumnMenu,
  LocalizeKey,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  Localized,
  GroupsInMultiColumnMenu,
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
  await menuDataService.subscribeUnlocalizedMainMenu(
    undefined,
    async (menuContent: MultiColumnMenu) => {
      let currentMacosMenubarTemplate;
      try {
        currentMacosMenubarTemplate = await translatePlatformMenuItemsAndCombine(menuContent);
      } catch (error) {
        logger.error(
          'Failed to get current platform menus. Falling back to default macOS menubar.',
          error,
        );
        currentMacosMenubarTemplate = await fallbackToDefaultMacosMenubar();
      }

      const coreMacosMenubar = Menu.buildFromTemplate(currentMacosMenubarTemplate);
      Menu.setApplicationMenu(coreMacosMenubar);
    },
  );
}

function sortMenuAndRemoveOrder(localizedMacosMenubar: LocalizedMacosMenubar) {
  localizedMacosMenubar.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  localizedMacosMenubar.forEach((menu) => {
    if (Array.isArray(menu.submenu)) {
      menu.submenu.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // Remove the `order` property from submenu items
      menu.submenu.forEach((item) => {
        delete item.order;

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
  return sortMenuAndRemoveOrder(await localizeMacosMenubar(macosMenubarObject));
}

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
    label: menu.label ? newStrings[menu.label] : menu.label,
    toolTip: menu.toolTip ? newStrings[menu.toolTip] : menu.toolTip,
    submenu: menu.submenu?.map((item) => ({
      ...item,
      label: item.label ? newStrings[item.label] : item.label,
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
                click: () => handleMenuCommand({ label: item.label, command: item.command }),
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

async function translatePlatformMenuItemsAndCombine(
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

  const combinedMenubar = [...macosMenubarObject];

  // Manually move the 'About Platform.Bible', 'Settings', and 'Open Paratext Registration' items to the app menu
  platformMainMenuContent.forEach((column) => {
    if (!column.submenu || !Array.isArray(column.submenu)) return;
    ['%mainMenu_about%', '%mainMenu_settings%', '%mainMenu_openParatextRegistration%'].forEach(
      (localizeKey) => {
        const index = Array.isArray(column.submenu)
          ? column.submenu.findIndex((item) => item.label === localizeKey)
          : -1;
        if (index !== -1) {
          const [menuItem] = Array.isArray(column.submenu) ? column.submenu.splice(index, 1) : [];
          const appMenu: MenuItemConstructorOptionsWithOrder | undefined = combinedMenubar.find(
            (menu) => menu.id === 'macosMenubar.appMenu',
          );
          if (appMenu) {
            const newSubmenu: MenuItemConstructorOptionsWithOrder[] = [
              ...(Array.isArray(appMenu.submenu) ? appMenu.submenu : []),
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              menuItem as MenuItemConstructorOptionsWithOrder,
            ];
            appMenu.submenu = newSubmenu;
          }
        }
      },
    );

    const existingMenu = combinedMenubar.find(
      (menu) =>
        menu.label?.toLowerCase() === column.label?.toLowerCase() ||
        menu.role?.toLowerCase() === column.label?.toLowerCase(),
    );

    if (existingMenu) {
      existingMenu.submenu = column.submenu;
    } else {
      combinedMenubar.push(column);
    }
  });

  const localizedMenu = await localizeMacosMenubar(combinedMenubar);
  return sortMenuAndRemoveOrder(localizedMenu);
}
