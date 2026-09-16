import {
  ColumnsWithHeaders,
  GroupsInMultiColumnMenu,
  Localized,
  MenuColumnWithHeader,
  MenuGroupDetailsInColumn,
  MenuGroupDetailsInSubMenu,
  MultiColumnMenu,
} from 'platform-bible-utils';

/**
 * Function that looks up the key of a sub-menu group using the value of it's `menuItem` property.
 *
 * @example
 *
 * ```ts
 * const groups = {
 *   'platform.subMenu': { menuItem: 'platform.subMenuId', order: 1 },
 *   'platform.subSubMenu': { menuItem: 'platform.subSubMenuId', order: 2 },
 * };
 * const id = 'platform.subMenuId';
 * const groupKey = getSubMenuGroupKeyForMenuItemId(groups, id);
 * console.log(groupKey); // Output: 'platform.subMenu'
 * ```
 *
 * @param groups The JSON Object containing the group definitions
 * @param id The value of the `menuItem` property of the group to look up
 * @returns The key of the group that has the `menuItem` property with the value of `id` or
 *   `undefined` if no such group exists.
 */
export function getSubMenuGroupKeyForMenuItemId(
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string | undefined {
  return Object.entries(groups).find(
    ([, value]) => 'menuItem' in value && value.menuItem === id,
  )?.[0];
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
 * `TabDropdownMenu` picks a column's groups with this and {@link getMenuSectionsWithItems} decides
 * which columns have something to show with it, so "this column renders nothing" can never mean two
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
    .map(({ columnKey, column }) => ({ columnKey, label: column.label }));
}
