import { Grid } from '@mui/material';
import MenuItem, { Command, CommandHandler, MenuItemInfo } from './menu-item.component';
import './grid-menu.component.css';

export type MenuColumnInfo = {
  /**
   * The name of the menu (displayed as the column header).
   */
  name: string;
  /*
   * The menu items to include.
   */
  items: MenuItemInfo[];
};

type MenuColumnProps = MenuColumnInfo & {
  /**
   *  Optional unique identifier
   */
  id?: string;

  commandHandler: CommandHandler;

  /**
   * Additional css classes to help with unique styling of the toolbar
   */
  className?: string;
};

export type GridMenuInfo = {
  /**
   * The columns to display on the dropdown menu.
   */
  columns: MenuColumnInfo[];
};

export type GridMenuProps = GridMenuInfo & {
  /**
   *  Optional unique identifier
   */
  id?: string;

  commandHandler: CommandHandler;

  /**
   * Additional css classes to help with unique styling of the toolbar
   */
  className?: string;
};

function MenuColumn({ commandHandler, name, className, items, id }: MenuColumnProps) {
  return (
    <Grid id={id} item xs="auto" className={`papi-menu-column ${className ?? ''}`}>
      <h3 className={`papi-menu ${className ?? ''}`}>{name}</h3>
      {items.map((menuItem, index) => (
        <MenuItem
          // By design, menu items will never get reordered. So the index works as a key.
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`papi-menu-item ${menuItem.className}`}
          onClick={() => {
            commandHandler({ name: menuItem.name, command: menuItem.command } as Command);
          }}
          {...menuItem}
        />
      ))}
    </Grid>
  );
}

export default function GridMenu({ commandHandler, className, columns, id }: GridMenuProps) {
  return (
    <Grid
      container
      spacing={0}
      className={`papi-multi-column-menu ${className ?? ''}`}
      columns={columns.length}
      id={id}
    >
      {columns.map((col, index) => (
        <MenuColumn
          // By design, menu items will never get reordered. So the index works as a key.
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          commandHandler={commandHandler}
          name={col.name}
          className={className}
          items={col.items}
        />
      ))}
    </Grid>
  );
}
