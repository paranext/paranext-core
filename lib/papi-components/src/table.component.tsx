import DataGrid, {
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  CopyEvent,
  FormatterProps,
  PasteEvent,
  RowsChangeData,
  SelectColumn,
  SortColumn,
  textEditor,
} from 'react-data-grid';
import { Key, ReactElement, ReactNode, UIEvent, useMemo } from 'react';

import 'react-data-grid/lib/styles.css';
import './table.component.css';

export interface TableCalculatedColumn<T> extends TableColumn<T> {
  readonly idx: number;
  readonly width: number | string;
  readonly minWidth: number;
  readonly maxWidth: number | undefined;
  readonly resizable: boolean;
  readonly sortable: boolean;
  readonly frozen: boolean;
  readonly isLastFrozenColumn: boolean;
  readonly rowGroup: boolean;
  readonly formatter: (props: TableFormatterProps<T>) => ReactNode;
}
export type TableCellClickArgs<T> = CellClickArgs<T>;
export type TableCellKeyboardEvent = CellKeyboardEvent;
export type TableCellKeyDownArgs<T> = CellKeyDownArgs<T>;
export type TableCellMouseEvent = CellMouseEvent;
export type TableColumn<T> = {
  /**
   * The name of the column. By default it will be displayed in the header cell
   */
  readonly name: string | ReactElement;
  /**
   * A unique key to distinguish each column
   */
  readonly key: string;
  /**
   * Column width. If not specified, it will be determined automatically
   * based on grid width and specified widths of other columns
   */
  readonly width?: number | string | null;
  /**
   * Minimum column width in px.
   */
  readonly minWidth?: number | null;
  /**
   * Maximum column width in px.
   */
  readonly maxWidth?: number | null;
  /**
   * Enables cell editing
   */
  readonly editable?: boolean | ((row: T) => boolean) | null;
  /**
   * Formatter to be used to render the cell content
   */
  readonly formatter?: ((props: TableFormatterProps<T>) => ReactNode) | null;
  /**
   * Determines whether column is frozen or not
   */
  readonly frozen?: boolean | null;
  /**
   * Enable resizing of a column
   */
  readonly resizable?: boolean | null;
  /**
   * Enable sorting of a column
   */
  readonly sortable?: boolean | null;
  /**
   * Sets the column sort order to be descending instead of ascending the first time
   * the column is sorted
   */
  readonly sortDescendingFirst?: boolean | null;
  /**
   * Editor to be rendered when cell of column is being edited.
   * If set, then the column is automatically set to be editable
   */
  readonly editor?: ((props: TableEditorProps<T>) => ReactNode) | null;
};
export type TableCopyEvent<T> = CopyEvent<T>;
export type TableEditorProps<T> = {
  column: TableCalculatedColumn<T>;
  row: T;
  onRowChange: (row: T, commitChanges?: boolean) => void;
  onClose: (commitChanges?: boolean) => void;
};
export type TableFormatterProps<T> = FormatterProps<T>;
export type TablePasteEvent<T> = PasteEvent<T>;
export type TableRowsChangeData<T> = RowsChangeData<T>;
export type TableSortColumn = SortColumn;
export const TableTextEditor = textEditor;

// Subset of https://github.com/adazzle/react-data-grid#api
export type TableProps<T> = {
  /**
   * An array of objects representing each column on the grid
   */
  columns: readonly TableColumn<T>[];
  /**
   * Whether or not a column with checkboxes is inserted that allows you to select rows
   */
  enableSelectColumn?: boolean;
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
  rows: readonly T[];
  /**
   * A function that returns the key for a given row
   */
  rowKeyGetter?: (row: T) => Key;
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
  onRowsChange?: (rows: T[], data: TableRowsChangeData<T>) => void;
  /**
   * A callback function that is called when a cell is clicked
   * @param event The event source of the callback
   */
  onCellClick?: (args: TableCellClickArgs<T>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is double-clicked
   * @param event The event source of the callback
   */
  onCellDoubleClick?: (args: TableCellClickArgs<T>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is right-clicked
   * @param event The event source of the callback
   */
  onCellContextMenu?: (args: TableCellClickArgs<T>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a key is pressed while a cell is focused
   * @param event The event source of the callback
   */
  onCellKeyDown?: (args: TableCellKeyDownArgs<T>, event: TableCellKeyboardEvent) => void;
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
   * A callback function that is called when the user copies data from the table.
   * @param event The event source of the callback
   */
  onCopy?: (event: TableCopyEvent<T>) => void;
  /**
   * A callback function that is called when the user pastes data into the table.
   * @param event The event source of the callback
   */
  onPaste?: (event: TablePasteEvent<T>) => T;
  /**
   * Additional css classes to help with unique styling of the table
   */
  className?: string;
};

/**
 * Configurable table component
 *
 * Thanks to Adazzle for heavy inspiration and documentation
 * https://adazzle.github.io/react-data-grid/
 */
function Table<T>({
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
  enableSelectColumn,
  rowKeyGetter,
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
  onCopy,
  onPaste,
  onScroll,
  className,
}: TableProps<T>) {
  const cachedColumns = useMemo(() => {
    return enableSelectColumn ? [SelectColumn, ...columns] : columns;
  }, [enableSelectColumn, columns]);
  return (
    <DataGrid<T>
      columns={cachedColumns}
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
      onCopy={onCopy}
      onPaste={onPaste}
      onScroll={onScroll}
      className={`${className ?? ''}`}
    />
  );
}

export default Table;
