import {
  ColumnsWithHeaders,
  GroupsInMultiColumnMenu,
  Localized,
  MenuColumnWithHeader,
  MenuGroupDetailsInColumn,
  MenuGroupDetailsInSubMenu,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { isLucideIconName } from '../../basics/lucide-icons.util';

/**
 * Looks up the keys of every sub-menu group whose `menuItem` property is the given submenu item id.
 * A submenu can be fed by more than one group, for example a shared group alongside a group that
 * only some views contribute.
 *
 * @example
 *
 * ```ts
 * const groups = {
 *   'platform.subMenuB': { menuItem: 'platform.subMenuId', order: 2 },
 *   'platform.subMenuA': { menuItem: 'platform.subMenuId', order: 1 },
 *   'platform.subSubMenu': { menuItem: 'platform.subSubMenuId', order: 3 },
 * };
 * const groupKeys = getSubMenuGroupKeysForMenuItemId(groups, 'platform.subMenuId');
 * console.log(groupKeys); // Output: ['platform.subMenuA', 'platform.subMenuB']
 * ```
 *
 * @param groups The JSON Object containing the group definitions
 * @param id The value of the `menuItem` property of the groups to look up
 * @returns The keys of the groups that have the `menuItem` property with the value of `id`, sorted
 *   by the groups' `order`. Empty if no such group exists.
 */
export function getSubMenuGroupKeysForMenuItemId(
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string[] {
  return Object.entries(groups)
    .filter(([, value]) => 'menuItem' in value && value.menuItem === id)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([groupKey]) => groupKey);
}

/**
 * Gets the keys of the groups whose items render under a column, sorted by the groups' `order`.
 *
 * @param groups The localized menu's groups
 * @param columnKey The key of the column being rendered
 * @returns The keys of the groups under the column, sorted by `order`
 */
export function getColumnGroupKeys(
  groups: Localized<GroupsInMultiColumnMenu>,
  columnKey: string,
): string[] {
  return Object.entries(groups)
    .filter(([key, group]) => isGroupUnderColumnOrSubMenu(key, group, columnKey))
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key]) => key);
}

/** A column of a multi-column menu, paired with the key it is stored under */
export type MenuColumnEntry = {
  /** Key of the column */
  columnKey: string;
  /** The column itself */
  column: Localized<MenuColumnWithHeader>;
};

/**
 * Gets the columns of a multi-column menu, sorted by `order`.
 *
 * @param columns The localized menu's columns
 * @returns The columns, sorted by `order`
 */
export function getSortedMenuColumns(columns: Localized<ColumnsWithHeaders>): MenuColumnEntry[] {
  return (
    Object.entries(columns)
      // `columns` also holds boolean flags (`isExtensible`, `isExperimental`); skip them
      .flatMap(([columnKey, column]) => (typeof column === 'object' ? [{ columnKey, column }] : []))
      .sort((a, b) => a.column.order - b.column.order)
  );
}

/**
 * Whether a group's items render under `columnOrSubMenuKey`: either the group names it as its
 * `column`, or the group is the one keyed by it, which is how a submenu addresses its own group.
 *
 * `TabDropdownMenu` picks a column's groups with this and `getMenuSectionsWithItems` decides which
 * columns have something to show with it, so "this column renders nothing" can never mean two
 * different things.
 *
 * @param groupKey The key the group is stored under
 * @param group The group itself
 * @param columnOrSubMenuKey The key of the column or submenu being rendered
 * @returns `true` if the group's items belong under `columnOrSubMenuKey`
 */
export function isGroupUnderColumnOrSubMenu(
  groupKey: string,
  group: Localized<MenuGroupDetailsInColumn | MenuGroupDetailsInSubMenu>,
  columnOrSubMenuKey: string,
): boolean {
  return (
    ('column' in group && group.column === columnOrSubMenuKey) || groupKey === columnOrSubMenuKey
  );
}

/** A column of a multi-column menu that has something to show */
export type MenuSection = {
  /** Key of the column */
  columnKey: string;
  /** The column's localized label */
  label: string;
  /**
   * Whether the section is shown without its label as a heading; see
   * {@link MenuColumnWithHeader.isHeaderHidden}
   */
  isHeaderHidden: boolean;
};

/**
 * Gets the columns of a multi-column menu that directly contain at least one item, sorted by
 * `order`. A submenu item counts even when its submenu is empty.
 *
 * @param menuData The localized menu
 * @returns The columns that directly contain items, sorted by `order`
 */
export function getMenuSectionsWithItems(menuData: Localized<MultiColumnMenu>): MenuSection[] {
  const groupKeysWithItems = new Set(menuData.items.map((item) => item.group));
  const groupsWithItems = Object.entries(menuData.groups).filter(([groupKey]) =>
    groupKeysWithItems.has(groupKey),
  );
  return getSortedMenuColumns(menuData.columns)
    .filter(({ columnKey }) =>
      groupsWithItems.some(([groupKey, group]) =>
        isGroupUnderColumnOrSubMenu(groupKey, group, columnKey),
      ),
    )
    .map(({ columnKey, column }) => ({
      columnKey,
      label: column.label,
      isHeaderHidden: column.isHeaderHidden ?? false,
    }));
}

/**
 * Whether a menu list reserves a leading icon slot, so every label in the list lines up. The slot
 * is 16px, the size of a named icon; an image icon is capped to it.
 */
export type LeadingIconSlot = 'none' | 'icon';

/** The fields of a menu item that decide whether it shows a leading icon */
type ItemWithLeadingIcon = {
  iconNameBefore?: string;
  iconPathBefore?: string;
  /** Defined on a checkbox item, whose check indicator takes the leading slot */
  checked?: boolean;
};

/**
 * Picks the leading icon slot for one rendered list of menu items (one dropdown content, one
 * submenu content, or one menubar menu). Items without a leading icon reserve the same slot as the
 * items that have one, so all labels in the list start at the same position.
 *
 * @param items The items rendered in the list, including submenu trigger items
 * @returns `'icon'` if any item has a leading icon — a known named icon or an image path — or is a
 *   checkbox item (`checked` is defined), and `'none'` otherwise. An unknown icon name counts only
 *   through the image path beside it, if any
 */
export function getLeadingIconSlot(items: ItemWithLeadingIcon[]): LeadingIconSlot {
  return items.some(
    (item) =>
      isLucideIconName(item.iconNameBefore) || item.iconPathBefore || item.checked !== undefined,
  )
    ? 'icon'
    : 'none';
}

/**
 * Gets the items that belong to any of the given groups.
 *
 * @param items All the menu's items
 * @param groupKeys Keys of the groups rendered together in one list
 * @returns The items whose `group` is one of `groupKeys`
 */
export function getItemsInGroups<T extends { group: string }>(
  items: T[],
  groupKeys: string[],
): T[] {
  const keys = new Set(groupKeys);
  return items.filter((item) => keys.has(item.group));
}

/** The rendered content of one menu group, ready to be joined with the groups beside it */
export type GroupContent<T> = { groupKey: string; items: T[] };

/**
 * Joins the groups of one menu list in the order given, with a separator between each pair of
 * groups that have items. A group without items adds nothing, so no separator ever leads, trails or
 * doubles up — which matters because hiding items for an interface mode can empty any group.
 *
 * @param groups The groups' content, already sorted by the groups' `order`
 * @param createSeparator Makes the separator that goes before the given group's items
 * @returns The items of every group, with the separators between them
 */
export function joinGroupsWithSeparators<T>(
  groups: GroupContent<T>[],
  createSeparator: (groupKey: string) => T,
): T[] {
  let hasShownItems = false;
  return groups.flatMap(({ groupKey, items }) => {
    if (items.length === 0) return [];
    const separator = hasShownItems ? [createSeparator(groupKey)] : [];
    hasShownItems = true;
    return [...separator, ...items];
  });
}

/** A menu item of either kind, as the menu components render it */
export type MenuItemNodeSource = Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>;

/** One menu item with the groups of its own submenu, if it opens one */
export type MenuItemNode = {
  /** The item itself */
  item: MenuItemNodeSource;
  /** The submenu's groups, sorted by `order`. Only present on a submenu item. */
  subGroups?: MenuGroupNode[];
};

/** One group of a menu list, holding the group's items sorted by `order` */
export type MenuGroupNode = {
  /** Key of the group */
  groupKey: string;
  /** The group's items, sorted by `order` */
  items: MenuItemNode[];
};

/** One column of the menu tree */
export type MenuColumnNode = MenuColumnEntry & {
  /** The column's groups, sorted by `order` */
  groups: MenuGroupNode[];
};

/** A multi-column menu with its columns, groups, items and submenus resolved and sorted */
export type MenuTree = {
  /** The columns, sorted by `order` */
  columns: MenuColumnNode[];
};

function buildGroupNodes(
  menuData: Localized<MultiColumnMenu>,
  groupKeys: string[],
): MenuGroupNode[] {
  return groupKeys.map((groupKey) => ({
    groupKey,
    items: menuData.items
      .filter((item) => item.group === groupKey)
      .sort((a, b) => a.order - b.order)
      .map((item) =>
        'command' in item
          ? { item }
          : {
              item,
              subGroups: buildGroupNodes(
                menuData,
                getSubMenuGroupKeysForMenuItemId(menuData.groups, item.id),
              ),
            },
      ),
  }));
}

/**
 * Resolves a menu's columns, groups, items and submenus once, so the menu components can render by
 * walking the result instead of filtering and sorting the item list again on every render. An item
 * whose group is not under any column or submenu does not appear in the tree.
 *
 * @param menuData The localized menu, or `undefined` while it is not available
 * @returns The menu tree, with no columns when there is no menu data
 */
export function buildMenuTree(menuData: Localized<MultiColumnMenu> | undefined): MenuTree {
  if (!menuData) return { columns: [] };
  return {
    columns: getSortedMenuColumns(menuData.columns).map((entry) => ({
      ...entry,
      groups: buildGroupNodes(menuData, getColumnGroupKeys(menuData.groups, entry.columnKey)),
    })),
  };
}
