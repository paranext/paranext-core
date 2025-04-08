import { GroupsInMultiColumnMenu, Localized } from 'platform-bible-utils';

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
