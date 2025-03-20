import {
  MenuItem,
  MenuItemListProps,
  MenuItemProps,
  MenuPropsBase,
} from '@/components/mui/menu-item.component';
import { Menu } from '@mui/material';
import {
  Localized,
  MenuGroupDetailsInSubMenu,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  OrderedExtensibleContainer,
  ReferencedItem,
  SingleColumnMenu,
} from 'platform-bible-utils';
import { MouseEvent, useMemo, useState } from 'react';

/**
 * All the exported types in this file should be regarded as "internal" (i.e., they should not be
 * exposed via index.ts).
 */

export type GroupedMenuPropsBase = MenuPropsBase & {
  /** Optional unique (column) identifier */
  columnId?: ReferencedItem;
};

export type GroupedMenuItemListProps = MenuItemListProps & {
  /**
   * If the menuDefinition includes "top-level" groups (i.e., those that belong to a column as
   * opposed to those that belong to a submenu) that should not be included in the list, then this
   * array specifies which groups to include. Likewise, for a submenu, this list indicates which
   * groups are pertinent for that submenu. So then for a context menu this property need not be
   * specified since it is a top-level menu based on a "true" SingleColumnMenu (i.e., one that is
   * not a MultiColumnMenu).
   */
  includedGroups?: {
    id: string;
    group: Localized<OrderedExtensibleContainer | MenuGroupDetailsInSubMenu>;
  }[];
};

interface ItemInfo {
  item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>;
  isLastItemInGroup: boolean;
}

type SubMenuProps = MenuPropsBase & {
  parentMenuItem: Localized<MenuItemContainingSubmenu>;
  parentItemProps: Omit<Omit<MenuItemProps, 'onClick'>, 'iconPathAfter'>;
};

function getAllGroups(menuDefinition: Localized<SingleColumnMenu>) {
  const groupEntries = Object.entries(menuDefinition.groups);
  // Convert array of entries to array of objects with id and group properties
  return groupEntries.map(([key, value]) => ({ id: key, group: value }));
}

function SubMenu(props: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>(undefined);

  const { parentMenuItem, parentItemProps, menuDefinition } = props;

  const handleParentMenuItemClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const renderSubMenuItems = () => {
    let includedGroups = getAllGroups(menuDefinition).filter((g) => 'menuItem' in g.group);

    // Ensure valid parent menu was provided. (If not, submenu will contain all groups!)
    if (!parentMenuItem?.id) throw new Error('A valid parent menu item is required for submenus.');

    // When laying out a submenu, only include groups associated with the provided parent menu.
    // Note: without the (annoying) redundant check that the included groups
    // have the menuItem field, TS doesn't think it exists.
    includedGroups = includedGroups.filter(
      (group) => 'menuItem' in group.group && group.group.menuItem === parentMenuItem.id,
    );

    return <GroupedMenuItemList {...props} includedGroups={includedGroups} />;
  };

  return (
    <>
      <MenuItem onClick={handleParentMenuItemClick} {...parentItemProps} isSubMenuParent />
      <Menu
        key={parentMenuItem.id}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderSubMenuItems()}
      </Menu>
    </>
  );
}

const getOrderedGroupItems = (
  groupId: string,
  allItems: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>[],
) => {
  // Filter items that belong to the specified group
  const itemsForGroup = allItems.filter((item) => item.group === groupId);
  // Sort items based on order
  const sortedItems = itemsForGroup.sort((a, b) => (a.order || 0) - (b.order || 0));
  return sortedItems;
};

/**
 * This component is internal; it does not need to be exposed to the outside world since it is not
 * useful on its own. It is used to generate and lay out the MenuItems that appear either on a
 * top-level menu (in a GridMenu or ContextMenu) or in a submenu.
 */
export function GroupedMenuItemList(menuProps: GroupedMenuItemListProps) {
  const { menuDefinition, onClick, commandHandler, includedGroups } = menuProps;

  const { items, allowForLeadingIcons } = useMemo(() => {
    const groupsToInclude =
      includedGroups && includedGroups.length > 0
        ? includedGroups
        : // We're apparently laying out a single-column menu (presumably a context menu). In this
          // case, all groups should be included except ones that belong to a submenu.
          getAllGroups(menuDefinition).filter((g) => !('menuItem' in g.group));

    const sortedGroups = Object.values(groupsToInclude).sort(
      (a, b) => (a.group.order || 0) - (b.group.order || 0),
    );

    const itemArray: ItemInfo[] = [];

    sortedGroups.forEach((group) => {
      getOrderedGroupItems(group.id, menuDefinition.items).forEach((item) =>
        itemArray.push({ item, isLastItemInGroup: false }),
      );
      if (itemArray.length > 0) itemArray[itemArray.length - 1].isLastItemInGroup = true;
    });

    // No divider after last item in final group.
    if (itemArray.length > 0) itemArray[itemArray.length - 1].isLastItemInGroup = false;

    const allowSpaceForLeadingIcons = itemArray.some(
      (i) => 'iconPathBefore' in i.item && i.item.iconPathBefore,
    );

    return { items: itemArray, allowForLeadingIcons: allowSpaceForLeadingIcons };
  }, [includedGroups, menuDefinition]);

  // Create props for MenuItem component including setting hasDivider for the last item in a group
  const createMenuItemProps = ({ item, isLastItemInGroup }: ItemInfo) => {
    const menuItemProps = {
      className: 'papi-menu-item',
      label: item.label,
      tooltip: item.tooltip,
      iconPathBefore: 'iconPathBefore' in item ? item.iconPathBefore : undefined,
      iconPathAfter: 'iconPathAfter' in item ? item.iconPathAfter : undefined,
      hasDivider: isLastItemInGroup, // Set hasDivider to true for the last item in a group
      allowForLeadingIcons,
    };

    return menuItemProps;
  };

  const [firstItem] = items;

  if (!firstItem) return <div />;

  const divKey = firstItem.item.group;

  return (
    <div key={divKey} role="menu" aria-label={divKey}>
      {items.map((itemInfo, index) => {
        const { item } = itemInfo;
        const menuItemProps = createMenuItemProps(itemInfo);
        if ('command' in item) {
          const key = item.group + index;
          return (
            <MenuItem
              key={key}
              onClick={(event: MouseEvent<HTMLElement>) => {
                onClick?.(event);
                commandHandler(item);
              }}
              {...menuItemProps}
            />
          );
        }
        return (
          <SubMenu
            key={divKey + item.id}
            parentMenuItem={item}
            parentItemProps={menuItemProps}
            {...menuProps}
          />
        );
      })}
    </div>
  );
}

export default GroupedMenuItemList;
