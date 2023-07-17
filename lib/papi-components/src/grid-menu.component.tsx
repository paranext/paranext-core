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
  doCommand: CommandHandler;
  /**
   * The index of the menu column.
   */
  index: number;
};

export type GridMenuInfo = {
  /**
   * The columns to display on the dropdown menu.
   */
  columns: MenuColumn[];
};

export type GridMenuProps = GridMenuInfo & {
  doCommand: CommandHandler;
};

function MenuColumn({ doCommand, name, index, items }: MenuColumnProps) {
  return (
    <Grid item xs={index}>
      <h3 className="menu">{name}</h3>
      {items.map((menuItem, index) => (
        <MenuItem
          key={index}
          className={`menu-item ${menuItem.className}`}
          onClick={() => doCommand(menuItem)}
          {...menuItem}
        />
      ))}
    </Grid>
  );
}

export default function GridMenu({ doCommand, columns }: GridMenuProps) {
  return (
    <Grid container spacing={0} className="multi-colum-menu" columns={columns.length}>
      {columns.map((col, index) => (
        <MenuColumn doCommand={doCommand} name={col.name} index={index} items={col.items} />
      ))}
    </Grid>
  );
}
