/**
 * Converts menu data service contributions (SingleColumnMenu) into the overlay service's
 * ContextMenuItem[] format for rendering context menus.
 */

import type { ContextMenuItem } from '@shared/models/overlay.service-model';
import type { Localized, SingleColumnMenu, MenuGroupDetailsInSubMenu } from 'platform-bible-utils';

/** Type guard to check if a menu item has a `command` field (MenuItemContainingCommand) */
function isCommandItem(
  item: Localized<SingleColumnMenu>['items'][number],
): item is Localized<SingleColumnMenu>['items'][number] & { command: string } {
  return 'command' in item;
}

/** Type guard to check if a menu item has an `id` field (MenuItemContainingSubmenu) */
function isSubmenuItem(
  item: Localized<SingleColumnMenu>['items'][number],
): item is Localized<SingleColumnMenu>['items'][number] & { id: string } {
  return 'id' in item && !('command' in item);
}

/** Type guard to check if a group detail has a `menuItem` field (MenuGroupDetailsInSubMenu) */
function isSubMenuGroup(
  group: Localized<SingleColumnMenu>['groups'][keyof Localized<SingleColumnMenu>['groups']],
): group is Localized<MenuGroupDetailsInSubMenu> {
  return 'menuItem' in group;
}

/**
 * Converts a localized SingleColumnMenu from the menu data service into an array of ContextMenuItem
 * objects suitable for the overlay service's context menu rendering.
 *
 * @param menu The localized SingleColumnMenu to convert
 * @returns An array of ContextMenuItem objects
 */
export function convertContributionToContextMenuItems(
  menu: Localized<SingleColumnMenu>,
): ContextMenuItem[] {
  const { groups, items } = menu;

  if (!items || items.length === 0) return [];

  // Cast groups to a plain Record for string-based indexing
  // (The original type uses ReferencedItem keys which are `${string}.${string}`)
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const groupsRecord = groups as Record<string, (typeof groups)[keyof typeof groups]>;

  // Separate top-level groups from submenu groups
  const topLevelGroupIds: string[] = [];
  const submenuGroupMap = new Map<string, string[]>(); // menuItemId -> groupIds[]

  Object.entries(groupsRecord).forEach(([groupId, groupDetail]) => {
    if (isSubMenuGroup(groupDetail)) {
      const parentMenuItemId = groupDetail.menuItem;
      if (!submenuGroupMap.has(parentMenuItemId)) {
        submenuGroupMap.set(parentMenuItemId, []);
      }
      submenuGroupMap.get(parentMenuItemId)?.push(groupId);
    } else {
      topLevelGroupIds.push(groupId);
    }
  });

  // Sort top-level groups by order
  topLevelGroupIds.sort((a, b) => groupsRecord[a].order - groupsRecord[b].order);

  // Group items by their group field
  const itemsByGroup = new Map<string, Localized<SingleColumnMenu>['items']>();
  items.forEach((item) => {
    const groupId = item.group;
    if (!itemsByGroup.has(groupId)) {
      itemsByGroup.set(groupId, []);
    }
    itemsByGroup.get(groupId)?.push(item);
  });

  // Sort items within each group by order
  Array.from(itemsByGroup.values()).forEach((groupItems) => {
    groupItems.sort((a, b) => a.order - b.order);
  });

  /**
   * Build ContextMenuItem[] for a given submenu item, collecting items from all groups that
   * reference this submenu item.
   */
  function buildSubmenuItems(submenuItemId: string): ContextMenuItem[] {
    const subGroupIds = submenuGroupMap.get(submenuItemId) ?? [];
    // Sort submenu groups by order
    subGroupIds.sort((a, b) => groupsRecord[a].order - groupsRecord[b].order);
    return buildItemsFromGroups(subGroupIds);
  }

  /** Build ContextMenuItem[] from an ordered list of group IDs, inserting separators between groups. */
  function buildItemsFromGroups(groupIds: string[]): ContextMenuItem[] {
    const result: ContextMenuItem[] = [];

    groupIds.forEach((groupId, i) => {
      const groupItems = itemsByGroup.get(groupId) ?? [];

      // Add separator between groups (not before the first group)
      if (i > 0 && groupItems.length > 0) {
        result.push({ type: 'separator' });
      }

      groupItems.forEach((item) => {
        if (isSubmenuItem(item)) {
          // This is a submenu host item - build its children
          result.push({
            type: 'submenu',
            label: item.label,
            items: buildSubmenuItems(item.id),
          });
        } else if (isCommandItem(item)) {
          result.push({
            type: 'item',
            id: item.command,
            label: item.label,
          });
        }
      });
    });

    return result;
  }

  return buildItemsFromGroups(topLevelGroupIds);
}
