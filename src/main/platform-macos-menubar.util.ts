import {
  MultiColumnMenu,
  LocalizeKey,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  Localized,
  GroupsInMultiColumnMenu,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import macosMenubarObject, {
  LocalizedMacosMenubar,
  MenuItemConstructorOptionsWithOrder,
} from '@main/platform-macos-menubar.data';
import { menuDataService } from '@shared/services/menu-data.service';
import { localizationService } from '@shared/services/localization.service';
import { Menu, MenuItemConstructorOptions } from 'electron';
import { logger } from '@shared/services/logger.service';
import handleMenuCommand from '@shared/data/platform-bible-menu.commands';

export default async function buildCurrentMacosMenubar(): Promise<UnsubscriberAsync> {
  return menuDataService.subscribeMainMenu(
    undefined,
    async (menuContent: Localized<MultiColumnMenu>) => {
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
  localizedMacosMenubar.forEach((menu) => {
    if (Array.isArray(menu.submenu)) {
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
    label: menu.label ? newStrings[menu.label] : '',
    toolTip: menu.toolTip ? newStrings[menu.toolTip] : '',
    submenu: menu.submenu?.map((item) => ({
      ...item,
      label: item.label ? newStrings[item.label] : '',
      toolTip: item.toolTip ? newStrings[item.toolTip] : '',
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

const getMenubarColumnContent = (
  groups: Localized<GroupsInMultiColumnMenu>,
  items: Localized<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]>,
  columnOrSubMenuKey: string | undefined,
): LocalizedMacosMenubar | [] => {
  if (!columnOrSubMenuKey) return [];

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.entries(groups)
    .filter(
      ([key, group]) =>
        ('column' in group && group.column === columnOrSubMenuKey) || key === columnOrSubMenuKey,
    )
    .sort(([, a], [, b]) => a.order - b.order)
    .flatMap(([groupKey]) =>
      items
        .filter((item) => item.group === groupKey)
        .sort((a, b) => a.order - b.order)
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
};

async function translatePlatformMenuItemsAndCombine(
  currentPlatformMainMenu: Localized<MultiColumnMenu>,
): Promise<MenuItemConstructorOptions[]> {
  // Localize the macOS menubar
  const localizedMacosMenubar = await localizeMacosMenubar(macosMenubarObject);

  // Convert the platform-specific main menu into the correct format
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const platformMainMenuMenubarContent = Object.entries(currentPlatformMainMenu.columns)
    .filter(([, column]) => typeof column === 'object')
    .map(([columnKey, columnData]) => ({
      label: typeof columnData === 'object' ? columnData.label : '',
      order: typeof columnData === 'object' ? columnData.order : 0,
      submenu: getMenubarColumnContent(
        currentPlatformMainMenu.groups,
        currentPlatformMainMenu.items,
        columnKey,
      ).filter((menuItem) => menuItem.label !== 'Exit'), // Remove duplicate 'Exit' here
    })) as LocalizedMacosMenubar;

  // Merge the platform menu into the macOS menubar
  const combinedMenubar = [...localizedMacosMenubar];

  platformMainMenuMenubarContent.forEach((column) => {
    if (!Array.isArray(column.submenu)) return;
    const submenuItems = Array.isArray(column.submenu) ? column.submenu : [];

    ['About Platform.Bible', 'Settings', 'Paratext Registration Information...'].forEach(
      (label) => {
        const index = submenuItems.findIndex((item) => item.label === label) ?? -1;
        if (index !== -1) {
          const [menuItem] = submenuItems.splice(index, 1);
          const appMenu = combinedMenubar.find((menu) => menu.id === 'macosMenubar.appMenu');
          if (appMenu) {
            appMenu.submenu = [
              ...(Array.isArray(appMenu.submenu) ? appMenu.submenu : []),
              menuItem,
            ];
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

  logger.info('Combined macOS menubar:', combinedMenubar);
  return sortMenuAndRemoveOrder(combinedMenubar);
}
