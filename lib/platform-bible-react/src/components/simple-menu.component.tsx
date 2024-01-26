import MenuItem, { CommandHandler, MenuItemInfo } from './menu-item.component';
import './simple-menu.component.css';

export type MenuProps = {
  /** Optional unique identifier */
  id?: string;

  /*
   * The menu items to include.
   */
  items: MenuItemInfo[];

  commandHandler: CommandHandler;

  /** Additional css classes to help with unique styling of the menu */
  className?: string;
};

export default function SimpleMenu({ commandHandler, className, items, id }: MenuProps) {
  return (
    <div id={id} className={`papi-menu ${className ?? ''}`}>
      <>
        {items.map((menuItem, index) => (
          <MenuItem
            // By design, menu items will never get reordered. So the index works as a key.
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`papi-menu-item ${menuItem.className}`}
            onClick={() => {
              commandHandler(menuItem);
            }}
            {...menuItem}
          />
        ))}
      </>
    </div>
  );
}
