import { CommandHandler } from '@/components/advanced/platform-menubar.component';
import '@/components/mui/grid-menu.component.css';
import { GroupedMenuPropsBase } from '@/components/mui/grouped-menu-item-list.component';
import TopLevelMenu from '@/components/mui/top-level-menu.component';
import { Grid, List } from '@mui/material';
import {
  Localized,
  MenuColumnWithHeader,
  MultiColumnMenu,
  ReferencedItem,
} from 'platform-bible-utils';
import { useMemo } from 'react';

type ColumnInfo = {
  /*
   * The ID (`${string}.${string}`) of a specific menu column.
   */
  id: ReferencedItem;

  /*
   * Metadata (label, order, etc.) for a specific menu column.
   */
  metadata: Localized<MenuColumnWithHeader>;
};

type MenuColumnProps = ColumnInfo &
  GroupedMenuPropsBase & {
    /** Additional css classes to help with unique styling of the menu column */
    className?: string;
  };

export type GridMenuInfo = {
  /** The menu object containing information about the columns, groups, and items to display. */
  multiColumnMenu: Localized<MultiColumnMenu>;
};

export type GridMenuProps = GridMenuInfo & {
  /** Optional unique identifier */
  id?: string;

  commandHandler: CommandHandler;

  /** Additional css classes to help with unique styling of the grid menu */
  className?: string;
};

function MenuColumn({
  commandHandler,
  menuDefinition,
  id,
  metadata,
  onClick,
  className,
}: MenuColumnProps) {
  return (
    <Grid
      id={id}
      item
      xs="auto"
      role="menu"
      aria-label={id}
      className={`papi-menu-column ${className ?? ''}`}
    >
      <h3 aria-label={metadata.label} className={`papi-menu-column-header ${className ?? ''}`}>
        {metadata.label}
      </h3>
      {/* It would seem as though this List component were unnecessary, since it only contains one
      thing, but the "dense" property does affect the layout of the items (in a way I don't fully
      understand). There might be a better way. */}
      <List id={id} dense className={className ?? ''}>
        <TopLevelMenu
          commandHandler={commandHandler}
          menuDefinition={menuDefinition}
          columnId={id}
          onClick={onClick}
        />
      </List>
    </Grid>
  );
}

export default function GridMenu({
  commandHandler,
  className,
  multiColumnMenu,
  id,
}: GridMenuProps) {
  const { columns } = multiColumnMenu;

  const sortedColumns = useMemo(() => {
    const columnNumbers = new Map<number, ColumnInfo>();
    Object.getOwnPropertyNames(columns).forEach((columnName: string) => {
      // We know for sure there is a (boolean) property 'isExtensible' that we are not interested in.
      if (columnName === 'isExtensible') return;
      // TS doesn't allow `columnName` above to be a ReferencedItem even though the type says it is
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const columnId = columnName as ReferencedItem;
      const column = columns[columnId];
      // As of right now (and hopefully forever after), all remaining properties of the
      // ColumnsWithHeaders object are columns whose property names are the IDs of the columns.
      // This is an additional (redundant) sanity check. Specifically we're interested in
      // MenuColumnWithHeader objects, which TypeScript now "knows" we have, but at runtime all we
      // can check for is that it's an object with a valid numeric order field. That's likely good
      // enough.
      if (
        typeof column === 'object' &&
        typeof column.order === 'number' &&
        !Number.isNaN(column.order)
      )
        columnNumbers.set(column.order, { id: columnId, metadata: column });
      else
        console.warn(
          `Property ${columnName} (${typeof column}) on menu ${id} is not a valid column and is being ignored. This might indicate data corruption`,
        );
    });

    // Extract values and sort them based on the 'order' property
    return Array.from(columnNumbers.values()).sort((a, b) => {
      return (a.metadata.order || 0) - (b.metadata.order || 0);
    });
  }, [columns, id]);

  // We might need something like this if we need to be able to prevent empty columns
  // sortedColumns.filter((c) => multiColumnMenu.groups.some((g) => 'column' in g && (g as .column)...

  return (
    <Grid
      container
      spacing={0}
      className={`papi-multi-column-menu ${className ?? ''}`}
      columns={sortedColumns.length}
      role="menu"
      aria-label="GridMenu"
      id={id}
    >
      {sortedColumns.map((col, index) => (
        <MenuColumn
          // By design, menu items will never get reordered. So the index works as a key.
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          commandHandler={commandHandler}
          menuDefinition={multiColumnMenu}
          {...col}
          className={className}
        />
      ))}
    </Grid>
  );
}
