import MenuItem, { CommandHandler, MenuItemInfo } from './menu-item.component';

export type MenuItemListProps = {
  /** Optional unique identifier */
  id?: string;

  /*
   * The menu items to include.
   */
  items: MenuItemInfo[];

  commandHandler: CommandHandler;

  /**
   * Additional action to perform when any menu item is clicked. Allows the caller can handle event
   * (e.g., to close the menu).
   */
  onClick?: () => void;

  /** Additional css classes to help with unique styling of the menu */
  className?: string;
};

/**
 * This is kind of an "abstract" component in the sense that it will typically not be useful on its
 * own. It is used to generate and lay out the MenuItems to appear on either a GridMenu or a
 * ContextMenu.
 */
export default function MenuItemList({ commandHandler, items, onClick }: MenuItemListProps) {
  const allowForLeadingIcons = items?.find((i) => i.iconPathBefore !== undefined) !== undefined;

  return items?.map((menuItem, index) => (
    <MenuItem
      // By design, menu items will never get reordered. So the index works as a key.
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className={`papi-menu-item ${menuItem.className ?? ''}`}
      allowForLeadingIcons={allowForLeadingIcons}
      onClick={() => {
        if (onClick) onClick();
        commandHandler(menuItem);
      }}
      {...menuItem}
    />
  ));
}
