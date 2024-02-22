import { MouseEvent, useState } from 'react';
import { Menu, MenuItem as MuiMenuItem } from '@mui/material';
import {
  MenuGroupDetailsInColumn,
  MenuGroupDetailsInSubMenu,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  ReferencedItem,
} from 'platform-bible-utils';
import MenuItem, { MenuProps } from './menu-item.component';

export type GroupedMenuItemListProps = MenuProps & {
  /** Optional unique (column) identifier */
  columnId?: ReferencedItem;
};

interface ItemInfo {
  item: MenuItemContainingCommand | MenuItemContainingSubmenu;
  isLastItemInGroup: boolean;
}

type SubMenuProps = MenuProps & {
  parentMenuItem: MenuItemContainingSubmenu;
};

function SubMenu(props: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>(undefined);

  const { parentMenuItem, menuDefinition } = props;

  const handleParentMenuItemClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const renderSubMenuItems = () => {
    const groupEntries = Object.entries(menuDefinition.groups);
    // Convert array of entries to array of objects with id and group properties
    const groups = groupEntries.map(([key, value]) => ({ id: key, group: value }));
    let includedGroups = groups.filter((g) => 'menuItem' in g.group);

    // Ensure valid parent menu was provided. (If not, submenu will contain all groups!)
    if (parentMenuItem?.id) {
      // When laying out a submenu, only include groups associated with the provided parent menu.
      // Note: without the (annoying) redundant check that the included groups
      // have the menuItem field, TS doesn't think it exists.
      includedGroups = includedGroups.filter(
        (group) => 'menuItem' in group && group.menuItem === parentMenuItem.id,
      );
    }

    return GroupedMenuItemList(props, includedGroups);
  };

  return (
    <>
      <MuiMenuItem onClick={handleParentMenuItemClick}>{parentMenuItem.label}</MuiMenuItem>
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
  allItems: (MenuItemContainingCommand | MenuItemContainingSubmenu)[],
) => {
  // Filter items that belong to the specified group
  const itemsForGroup = allItems.filter((item) => item.group === groupId);
  // Sort items based on order
  const sortedItems = itemsForGroup.sort((a, b) => (a.order || 0) - (b.order || 0));
  return sortedItems;
};

/**
 * This component is internal; it does not need to be exposed to the outside world since it is not
 * useful on its own. It is used to generate and lay out the MenuItems that appear either on
 * top-level menu (in a GridMenu or ContextMenu) or in a submenu.
 */
export default function GroupedMenuItemList(
  menuProps: MenuProps,
  includedGroups: { id: string; group: MenuGroupDetailsInColumn | MenuGroupDetailsInSubMenu }[],
) {
  const { menuDefinition, onClick, commandHandler } = menuProps;

  const sortedGroups = Object.values(includedGroups).sort(
    (a, b) => (a.group.order || 0) - (b.group.order || 0),
  );

  const items: ItemInfo[] = [];

  sortedGroups.forEach((group) => {
    getOrderedGroupItems(group.id, menuDefinition.items).forEach((item) =>
      items.push({ item, isLastItemInGroup: false }),
    );
    if (items.length > 0) items[items.length - 1].isLastItemInGroup = true;
  });

  // No divider after last item in final group.
  if (items.length > 0) items[items.length - 1].isLastItemInGroup = false;

  const allowForLeadingIcons = items?.some((i) => 'iconPathBefore' in i);

  // Create props for MenuItem component including setting hasDivider for the last item in a group
  const createMenuItemProps = ({ item, isLastItemInGroup }: ItemInfo) => {
    const menuItemProps = {
      className: 'papi-menu-item',
      label: item.label,
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
    <div key={divKey}>
      {/* I can't find anyway to "destructure" items.map. Asked ChatGPT, Google, and co-workers. */}
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {items.map((itemInfo, index) => {
        const { item } = itemInfo;
        const menuItemProps = createMenuItemProps(itemInfo);
        if ('command' in item) {
          const key = item.group + index;
          return (
            <MenuItem
              // By design, menu items will never get reordered. So (combined with the group ID)
              // the index works as a key.
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              onClick={() => {
                onClick?.();
                commandHandler(item);
              }}
              {...menuItemProps}
            />
          );
        }
        return <SubMenu key={divKey + item.id} parentMenuItem={item} {...menuProps} />;
      })}
    </div>
  );
}
