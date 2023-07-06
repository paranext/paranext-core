import { Grid } from '@mui/material';
import MenuItem, { MenuItemProps } from './menu-item.component';
import './grid-menu.component.css';

export type MenuColumn = {
  /**
   * The name of the menu (displayed as the column header).
   */
  name: string;
  /*
   * The menu items to include.
   */
  items: MenuItemProps[];
};

type MenuColumnProps = MenuColumn & {
  /**
   * The index of the menu column.
   */
  index: number;
};

export type GridMenuProps = {
  /**
   * The columns to display on the dropdown menu.
   */
  columns: MenuColumn[];
};

function MenuColumn({ name, index, items }: MenuColumnProps) {
  return (
    <Grid item xs={index}>
      <h3 className="menu">{name}</h3>
      {items.map((menuItem, index) => (
        <MenuItem
          key={index}
          className={`menu-item ${menuItem.className}`}
          isDense={menuItem.isDense}
          hasDivider={menuItem.hasDivider}
          onClick={menuItem.onClick}
        >
          {menuItem.children}
        </MenuItem>
      ))}
    </Grid>
  );
}

export default function GridMenu({ columns }: GridMenuProps) {
  return (
    <Grid container spacing={0} className="multi-colum-menu" columns={columns.length}>
      {columns.map((col, index) => (
        <MenuColumn name={col.name} index={index} items={col.items} />
      ))}
    </Grid>
  );
}
