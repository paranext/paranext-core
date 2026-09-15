import {
  ColumnsWithHeaders,
  GroupsInMultiColumnMenu,
  Localized,
  MenuColumnWithHeader,
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
  const columnKeysWithItems = new Set(
    Object.entries(menuData.groups).flatMap(([groupKey, group]) =>
      // A group with no `column` belongs to a submenu, so it contributes to no column of this menu
      'column' in group && groupKeysWithItems.has(groupKey) ? [group.column] : [],
    ),
  );
  return getSortedMenuColumns(menuData.columns)
    .filter(({ columnKey }) => columnKeysWithItems.has(columnKey))
    .map(({ columnKey, column }) => ({ columnKey, label: column.label }));
}
