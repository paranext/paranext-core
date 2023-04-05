import 'react-data-grid/lib/styles.css';
import DataGrid, {
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  CopyEvent,
  FillEvent,
  PasteEvent,
  RowsChangeData,
  SortColumn,
} from 'react-data-grid';
import { Key, UIEvent } from 'react';

export type TableCellClickArgs<T> = CellClickArgs<T>;
export type TableCellKeyboardEvent = CellKeyboardEvent;
export type TableCellKeyDownArgs<T> = CellKeyDownArgs<T>;
export type TableCellMouseEvent = CellMouseEvent;
export type TableColumn = {
  /**
   * The name of the column. By default it will be displayed in the header cell
   */
  readonly name: string;
  /**
   * A unique key to distinguish each column
   */
  readonly key: string;
  /**
   * Column width. If not specified, it will be determined automatically
   * based on grid width and specified widths of other columns
   */
  readonly width?: number;
  /**
   * Minimum column width in px.
   */
  readonly minWidth?: number;
  /**
   * Maximum column width in px.
   */
  readonly maxWidth?: number;
  /**
   * Enables cell editing
   */
  readonly editable?: boolean;
  /**
   * Determines whether column is frozen or not
   */
  readonly frozen?: boolean;
  /**
   * Enable resizing of a column
   */
  readonly resizable?: boolean;
  /**
   * Enable sorting of a column
   */
  readonly sortable?: boolean;
  /**
   * Sets the column sort order to be descending instead of ascending the first time
   * the column is sorted
   */
  readonly sortDescendingFirst?: boolean;
};
export type TableCopyEvent<T> = CopyEvent<T>;
export type TableFillEvent<T> = FillEvent<T>;
export type TablePasteEvent<T> = PasteEvent<T>;
export type TableRowsChangeData<T> = RowsChangeData<T>;
export type TableSortColumn = SortColumn;

// Subset of https://github.com/adazzle/react-data-grid#api
export type TableProps = {
  /**
   * An array of objects representing each column on the grid
   */
  columns: readonly TableColumn[];
  /**
   * An array of objects representing the currently sorted columns
   */
  sortColumns?: readonly TableSortColumn[];
  /**
   * A callback function that is called when the sorted columns change
   * @param sortColumns An array of objects representing the currently sorted columns in the table.
   */
  onSortColumnsChange?: (sortColumns: TableSortColumn[]) => void;
  /**
   * A callback function that is called when a column is resized
   * @param idx The index of the column being resized
   * @param width The new width of the column in pixels
   */
  onColumnResize?: (idx: number, width: number) => void;
  /**
   * Default column width. If not specified, it will be determined automatically
   * based on grid width and specified widths of other columns
   */
  defaultColumnWidth?: number;
  /**
   * Minimum column width in px.
   */
  defaultColumnMinWidth?: number;
  /**
   * Maximum column width in px.
   */
  defaultColumnMaxWidth?: number;
  /**
   * Whether or not columns are sortable by default
   * @default true
   */
  defaultColumnSortable?: boolean;
  /**
   * Whether or not columns are resizable by default
   * @default true
   */
  defaultColumnResizable?: boolean;
  /**
   * An array of objects representing the rows in the grid
   */
  rows: readonly unknown[];
  /**
   * A function that returns the key for a given row
   */
  rowKeyGetter?: (row: unknown) => Key;
  /**
   * A function that returns the class name for a given row
   */
  rowClass?: (row: unknown) => string;
  /**
   * The height of each row in pixels
   * @default 35
   */
  rowHeight?: number;
  /**
   * The height of the header row in pixels
   * @default 35
   */
  headerRowHeight?: number;
  /**
   * A set of keys representing the currently selected rows
   */
  selectedRows?: ReadonlySet<Key>;
  /**
   * A callback function that is called when the selected rows change
   */
  onSelectedRowsChange?: (selectedRows: Set<Key>) => void;
  /**
   * A callback function that is called when the rows in the grid change
   */
  onRowsChange?: (rows: unknown[], data: TableRowsChangeData<unknown>) => void;
  /**
   * A callback function that is called when a cell is clicked
   * @param event The event source of the callback
   */
  onCellClick?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is double-clicked
   * @param event The event source of the callback
   */
  onCellDoubleClick?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is right-clicked
   * @param event The event source of the callback
   */
  onCellContextMenu?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a key is pressed while a cell is focused
   * @param event The event source of the callback
   */
  onCellKeyDown?: (args: TableCellKeyDownArgs<unknown>, event: TableCellKeyboardEvent) => void;
  /**
   * The text direction of the table
   * @default "ltr"
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Whether or not virtualization is enabled for the table
   * @default true
   */
  enableVirtualization?: boolean;
  /**
   * A callback function that is called when the table is scrolled
   * @param event The event source of the callback
   */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  /**
   * A callback function that is called when the table is filled with data
   * @param event The event source of the callback
   */
  onFill?: (event: TableFillEvent<unknown>) => unknown;
  /**
   * A callback function that is called when the user copies data from the table.
   * @param event The event source of the callback
   */
  onCopy?: (event: TableCopyEvent<unknown>) => void;
  /**
   * A callback function that is called when the user pastes data into the table.
   * @param event The event source of the callback
   */
  onPaste?: (event: TablePasteEvent<unknown>) => unknown;
  /**
   * Additional css classes to help with unique styling of the table
   */
  className?: string;
};

function Table({
  columns,
  sortColumns,
  onSortColumnsChange,
  onColumnResize,
  defaultColumnWidth,
  defaultColumnMinWidth,
  defaultColumnMaxWidth,
  defaultColumnSortable = true,
  defaultColumnResizable = true,
  rows,
  rowKeyGetter,
  rowClass,
  rowHeight = 35,
  headerRowHeight = 35,
  selectedRows,
  onSelectedRowsChange,
  onRowsChange,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  onCellKeyDown,
  direction = 'ltr',
  enableVirtualization = true,
  onFill,
  onCopy,
  onPaste,
  onScroll,
  className,
}: TableProps) {
  return (
    <DataGrid
      columns={columns}
      defaultColumnOptions={{
        width: defaultColumnWidth,
        minWidth: defaultColumnMinWidth,
        maxWidth: defaultColumnMaxWidth,
        sortable: defaultColumnSortable,
        resizable: defaultColumnResizable,
      }}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      onColumnResize={onColumnResize}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      rowClass={rowClass}
      rowHeight={rowHeight}
      headerRowHeight={headerRowHeight}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      onRowsChange={onRowsChange}
      onCellClick={onCellClick}
      onCellDoubleClick={onCellDoubleClick}
      onCellContextMenu={onCellContextMenu}
      onCellKeyDown={onCellKeyDown}
      direction={direction}
      enableVirtualization={enableVirtualization}
      onFill={onFill}
      onCopy={onCopy}
      onPaste={onPaste}
      onScroll={onScroll}
      className={className}
    />
  );
}

export default Table;
