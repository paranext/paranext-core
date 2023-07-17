import { Grid } from '@mui/material';
import MenuItem, { MenuItemInfo } from './menu-item.component';
import './grid-menu.component.css';
import { CommandHandler } from 'toolbar.component';

export type MenuColumn = {
  /**
   * The name of the menu (displayed as the column header).
   */
  name: string;
  /*
   * The menu items to include.
   */
  items: MenuItemInfo[];
};

type MenuColumnProps = MenuColumn & {
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
  columns: MenuColumn[];
};

export type GridMenuProps = GridMenuInfo & {
  commandHandler: CommandHandler;

  /**
   * Additional css classes to help with unique styling of the toolbar
   */
  className?: string;
};

function MenuColumn({ commandHandler, name, className, items }: MenuColumnProps) {
  return (
    <Grid item xs={1} className={`papi-menu-column ${className ?? ''}`}>
      <h3 className={`papi-menu ${className ?? ''}`}>{name}</h3>
      {items.map((menuItem, index) => (
        <MenuItem
          key={index}
          className={`papi-menu-item ${menuItem.className}`}
          onClick={() => commandHandler(menuItem)}
          {...menuItem}
        />
      ))}
    </Grid>
  );
}

export default function GridMenu({ commandHandler, className, columns }: GridMenuProps) {
  return (
    <Grid
      container
      spacing={0}
      className={`papi-multi-column-menu ${className ?? ''}`}
      columns={columns.length}
    >
      {columns.map((col) => (
        <MenuColumn
          commandHandler={commandHandler}
          name={col.name}
          className={className}
          items={col.items}
        />
      ))}
    </Grid>
  );
}
