import { MultiColumnMenu } from 'platform-bible-utils';
import GroupedMenuItemList from './grouped-menu-item-list.component';
import { MenuItemListProps } from './menu-item.component';

/**
 * This will typically not be useful on its own. It is used to generate and lay out the MenuItems to
 * appear on either a GridMenu or a ContextMenu.
 */
export default function TopLevelMenu(props: MenuItemListProps) {
  const { menuDefinition, columnId } = props;

  const groupEntries = Object.entries(menuDefinition.groups);
  // Convert array of entries to array of objects with id and group properties
  const groups = groupEntries.map(([key, value]) => ({ id: key, group: value }));
  let includedGroups = groups.filter((g) => 'column' in g.group);

  // Check if column is provided and menuDefinition is a MultiColumnMenu
  if (
    columnId &&
    'columns' in menuDefinition &&
    // Without this type assertion, TS doesn't know what columns is.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (menuDefinition as MultiColumnMenu).columns[columnId]
  ) {
    // When laying out a single column in a MultiColumnMenu, only include groups associated with
    // the provided column. Note: without the (annoying) redundant check that the included groups
    // have the colum field, TS doesn't think it exists.
    includedGroups = includedGroups.filter(
      (g) => 'column' in g.group && g.group.column === columnId,
    );
  }

  return <GroupedMenuItemList {...props} includedGroups={includedGroups} />;
}
