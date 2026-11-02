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
import { contextKeysService } from '@shared/services/context-keys.service';
import { evaluateMenuRecordingReads } from '@shared/utils/evaluate-menu-recording-reads.util';
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
 * Incremented at the start of every menubar rebuild. A rebuild awaits localization, so rebuilds can
 * overlap; only the latest one may apply its result.
 */
let latestRebuildGeneration = 0;

/**
 * The id a contributed platform menu item carries in the native macOS menu, so a later evaluation
 * can find the item and update it in place.
 */
export function getMacosMenuItemId(
  item:
    | MenuItemContainingCommand
    | MenuItemContainingSubmenu
    | Localized<MenuItemContainingCommand>
    | Localized<MenuItemContainingSubmenu>,
): string {
  return `platformMenu:${item.group}:${'command' in item ? item.command : item.id}`;
}

/**
 * Describes everything about an evaluated menu except `disabled`/`checked` values: which columns,
 * groups and items exist, in what order, with what label, and whether an item is a checkbox. Two
 * evaluations with equal signatures differ only in values that can be updated on the existing
 * native items.
 *
 * @returns The signature, or `undefined` when two items share an id (an item cannot then be found
 *   unambiguously by id)
 */
function getMenuStructureSignature(menu: MultiColumnMenu): string | undefined {
  const ids = menu.items.map(getMacosMenuItemId);
  if (new Set(ids).size !== ids.length) return undefined;
  return JSON.stringify({
    columns: Object.keys(menu.columns).sort(),
    groups: Object.keys(menu.groups).sort(),
    items: menu.items.map((item, index) => [
      ids[index],
      item.label,
      item.order,
      'command' in item && item.checked !== undefined,
    ]),
  });
}

/**
 * Subscribe to changes in the main menu data and context keys, and update the macOS menubar
 * accordingly.
 *
 * Whenever the main menu data changes, the menu data is evaluated (when/enabledWhen/checkedWhen
 * expressions), translated (which also re-localizes it) and combined into the structure expected by
 * the Electron Menu API, and the macOS menubar is rebuilt.
 *
 * A context key change matters only if the last evaluation read that key. Then the `enabled` and
 * `checked` state of the existing native items is updated in place. A change to which items are
 * visible (a `when` expression) or to the menu's structure rebuilds the whole menubar, since
 * evaluation removes hidden items rather than marking them.
 *
 * If there is an error during the translation and combination process, the default macOS menubar
 * will be used instead.
 */
export async function subscribeCurrentMacosMenubar() {
  let currentMainMenu: MultiColumnMenu | undefined;
  let appliedMenu: Menu | undefined;
  let appliedSignature: string | undefined;
  // The context keys the latest evaluation of `currentMainMenu` read
  let readKeys: ReadonlySet<string> = new Set();
  // Rebuilds that have started and not finished; an in-place update could be overwritten by, or
  // applied to a menu already replaced by, one of them
  let pendingRebuilds = 0;

  const onWhenExpressionError = (expression: string, error: unknown) =>
    logger.warn(
      `Error evaluating macOS menubar when-expression '${expression}': ${getErrorMessage(error)}`,
    );

  // Reads `currentMainMenu` from the enclosing scope; falls back to the default menubar when no
  // valid menu data is available (e.g. after a PlatformError, which is logged by the subscriber)
  async function rebuildMacosMenubar(): Promise<void> {
    pendingRebuilds += 1;
    try {
      latestRebuildGeneration += 1;
      const thisRebuildGeneration = latestRebuildGeneration;
      let currentMacosMenubarTemplate;
      let signature: string | undefined;
      if (!currentMainMenu) {
        readKeys = new Set();
        // If this fallback fails, the current menubar stays in place, by design
        currentMacosMenubarTemplate = await fallbackToDefaultMacosMenubar();
      } else {
        // Set once evaluation succeeds; a later translation failure keeps these keys, so a change to
        // one of them still triggers the rebuild that retries the real menu
        let evaluationReadKeys: ReadonlySet<string> = new Set();
        try {
          // The main menu has no template variables; its expressions can reference only global keys
          const { evaluatedMenu, readKeys: evaluatedReadKeys } = evaluateMenuRecordingReads(
            currentMainMenu,
            {},
            onWhenExpressionError,
          );
          evaluationReadKeys = evaluatedReadKeys;
          readKeys = evaluatedReadKeys;
          signature = getMenuStructureSignature(evaluatedMenu);
          currentMacosMenubarTemplate = await translatePlatformMenuItemsAndCombine(evaluatedMenu);
        } catch (error) {
          logger.error(
            'Failed to get current platform menus. Falling back to default macOS menubar.',
            error,
          );
          if (thisRebuildGeneration === latestRebuildGeneration) readKeys = evaluationReadKeys;
          signature = undefined;
          currentMacosMenubarTemplate = await fallbackToDefaultMacosMenubar();
        }
      }

      // A newer rebuild started while this one awaited, so this result is stale
      if (thisRebuildGeneration !== latestRebuildGeneration) return;

      try {
        const coreMacosMenubar = Menu.buildFromTemplate(currentMacosMenubarTemplate);
        Menu.setApplicationMenu(coreMacosMenubar);
        appliedMenu = coreMacosMenubar;
        appliedSignature = signature;
      } catch (error) {
        logger.error('Failed to build current macOS menubar', error);
      }
    } finally {
      pendingRebuilds -= 1;
    }
  }

  function updateAppliedMenuInPlace(menu: Menu, evaluatedMenu: MultiColumnMenu) {
    evaluatedMenu.items.forEach((item) => {
      const nativeItem = menu.getMenuItemById(getMacosMenuItemId(item));
      if (!nativeItem) return;
      nativeItem.enabled = !item.disabled;
      if ('command' in item && item.checked !== undefined) nativeItem.checked = item.checked;
    });
  }

  function handleContextKeyChange(key: string) {
    if (!readKeys.has(key)) return;
    if (pendingRebuilds > 0 || !appliedMenu || !currentMainMenu) {
      rebuildMacosMenubar().catch((error) =>
        logger.error('Failed to rebuild macOS menubar after context key change', error),
      );
      return;
    }
    const { evaluatedMenu, readKeys: evaluatedReadKeys } = evaluateMenuRecordingReads(
      currentMainMenu,
      {},
      onWhenExpressionError,
    );
    const signature = getMenuStructureSignature(evaluatedMenu);
    if (signature === undefined || signature !== appliedSignature) {
      rebuildMacosMenubar().catch((error) =>
        logger.error('Failed to rebuild macOS menubar after context key change', error),
      );
      return;
    }
    readKeys = evaluatedReadKeys;
    updateAppliedMenuInPlace(appliedMenu, evaluatedMenu);
  }

  // Subscribed before the first menu delivery so a key that changes during the first build is not
  // missed
  const unsubscribeContextKeys = contextKeysService.onDidChange((event) => {
    try {
      handleContextKeyChange(event.key);
    } catch (error) {
      logger.error('Failed to update macOS menubar after context key change', error);
    }
  });

  const unsubscribeMenuData = await menuDataService.subscribeUnlocalizedMainMenu(
    undefined,
    async (menuContent: MultiColumnMenu | PlatformError) => {
      if (isPlatformError(menuContent)) {
        currentMainMenu = undefined;
        logger.error(`PlatformError getting main menu: ${getErrorMessage(menuContent)}`);
      } else {
        currentMainMenu = menuContent;
      }
      await rebuildMacosMenubar();
    },
  );

  return async () => {
    unsubscribeContextKeys();
    return unsubscribeMenuData();
  };
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
                id: getMacosMenuItemId(item),
                label: item.label,
                // Since the item has a command, we know it is a MenuItemContainingCommand.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                click: () => handleMenuCommand(item as MenuItemContainingCommand, groupKey),
                order: item.order,
                enabled: !item.disabled,
                ...(item.checked === undefined
                  ? {}
                  : { type: 'checkbox' as const, checked: item.checked }),
              }
            : {
                id: getMacosMenuItemId(item),
                label: item.label,
                enabled: !item.disabled,
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
