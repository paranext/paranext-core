import DataGrid, {
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  CopyEvent,
  PasteEvent,
  RowsChangeData,
  RenderCellProps,
  RenderCheckboxProps,
  SelectColumn,
  SortColumn,
} from 'react-data-grid';
import React, { ChangeEvent, Key, ReactElement, ReactNode, useMemo } from 'react';
import Checkbox from './checkbox.component';
import TextField from './text-field.component';

import 'react-data-grid/lib/styles.css';
import './table.component.css';

export interface TableCalculatedColumn<R> extends TableColumn<R> {
  readonly idx: number;
  readonly width: number | string;
  readonly minWidth: number;
  readonly maxWidth: number | undefined;
  readonly resizable: boolean;
  readonly sortable: boolean;
  readonly frozen: boolean;
  readonly isLastFrozenColumn: boolean;
  readonly rowGroup: boolean;
  readonly renderCell: (props: RenderCellProps<R>) => ReactNode;
}
export type TableCellClickArgs<R> = CellClickArgs<R>;
export type TableCellKeyboardEvent = CellKeyboardEvent;
export type TableCellKeyDownArgs<R> = CellKeyDownArgs<R>;
export type TableCellMouseEvent = CellMouseEvent;
export type TableColumn<R> = {
  /** The name of the column. By default it will be displayed in the header cell */
  readonly name: string | ReactElement;
  /** A unique key to distinguish each column */
  readonly key: string;
  /**
   * Column width. If not specified, it will be determined automatically based on grid width and
   * specified widths of other columns
   */
  readonly width?: number | string;
  /** Minimum column width in px. */
  readonly minWidth?: number;
  /** Maximum column width in px. */
  readonly maxWidth?: number;
  /**
   * If `true`, editing is enabled. If no custom cell editor is provided through `renderEditCell`
   * the default text editor will be used for editing. Note: If `editable` is set to 'true' and no
   * custom `renderEditCell` is provided, the internal logic that sets the `renderEditCell` will
   * shallow clone the column.
   */
  readonly editable?: boolean | ((row: R) => boolean) | null;
  /** Determines whether column is frozen or not */
  readonly frozen?: boolean;
  /** Enable resizing of a column */
  readonly resizable?: boolean;
  /** Enable sorting of a column */
  readonly sortable?: boolean;
  /**
   * Sets the column sort order to be descending instead of ascending the first time the column is
   * sorted
   */
  readonly sortDescendingFirst?: boolean | null;
  /**
   * Editor to be rendered when cell of column is being edited. Don't forget to also set the
   * `editable` prop to true in order to enable editing.
   */
  readonly renderEditCell?: ((props: TableEditorProps<R>) => ReactNode) | null;
};
export type TableCopyEvent<R> = CopyEvent<R>;
export type TableEditorProps<R> = {
  column: TableCalculatedColumn<R>;
  row: R;
  onRowChange: (row: R, commitChanges?: boolean) => void;
  // Unused currently, but needed to commit changes from editing
  // eslint-disable-next-line react/no-unused-prop-types
  onClose: (commitChanges?: boolean) => void;
};
export type TablePasteEvent<R> = PasteEvent<R>;
export type TableRowsChangeData<R> = RowsChangeData<R>;
export type TableSortColumn = SortColumn;

function TableTextEditor<R>({ onRowChange, row, column }: TableEditorProps<R>): ReactElement {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onRowChange({ ...row, [column.key]: e.target.value });
  };

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return <TextField defaultValue={row[column.key as keyof R]} onChange={changeHandler} />;
}

const renderCheckbox = ({ onChange, disabled, checked, ...props }: RenderCheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  };

  return (
    <Checkbox
      {...props}
      // key={} Any idea how we can get a unique ID for each checkbox?
      isChecked={checked}
      isDisabled={disabled}
      onChange={handleChange}
    />
  );
};

// Subset of https://github.com/adazzle/react-data-grid#api
export type TableProps<R> = {
  /** An array of objects representing each column on the grid */
  columns: readonly TableColumn<R>[];
  /** Whether or not a column with checkboxes is inserted that allows you to select rows */
  enableSelectColumn?: boolean;
  /**
   * Specifies the width of the select column. Only relevant when enableSelectColumn is true
   *
   * @default 50
   */
  selectColumnWidth?: number;
  /** An array of objects representing the currently sorted columns */
  sortColumns?: readonly TableSortColumn[];
  /**
   * A callback function that is called when the sorted columns change
   *
   * @param sortColumns An array of objects representing the currently sorted columns in the table.
   */
  onSortColumnsChange?: (sortColumns: TableSortColumn[]) => void;
  /**
   * A callback function that is called when a column is resized
   *
   * @param idx The index of the column being resized
   * @param width The new width of the column in pixels
   */
  onColumnResize?: (idx: number, width: number) => void;
  /**
   * Default column width. If not specified, it will be determined automatically based on grid width
   * and specified widths of other columns
   */
  defaultColumnWidth?: number;
  /** Minimum column width in px. */
  defaultColumnMinWidth?: number;
  /** Maximum column width in px. */
  defaultColumnMaxWidth?: number;
  /**
   * Whether or not columns are sortable by default
   *
   * @default true
   */
  defaultColumnSortable?: boolean;
  /**
   * Whether or not columns are resizable by default
   *
   * @default true
   */
  defaultColumnResizable?: boolean;
  /** An array of objects representing the rows in the grid */
  rows: readonly R[];
  /** A function that returns the key for a given row */
  rowKeyGetter?: (row: R) => Key;
  /**
   * The height of each row in pixels
   *
   * @default 35
   */
  rowHeight?: number;
  /**
   * The height of the header row in pixels
   *
   * @default 35
   */
  headerRowHeight?: number;
  /** A set of keys representing the currently selected rows */
  selectedRows?: ReadonlySet<Key>;
  /** A callback function that is called when the selected rows change */
  onSelectedRowsChange?: (selectedRows: Set<Key>) => void;
  /** A callback function that is called when the rows in the grid change */
  onRowsChange?: (rows: R[], data: TableRowsChangeData<R>) => void;
  /**
   * A callback function that is called when a cell is clicked
   *
   * @param event The event source of the callback
   */
  onCellClick?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is double-clicked
   *
   * @param event The event source of the callback
   */
  onCellDoubleClick?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a cell is right-clicked
   *
   * @param event The event source of the callback
   */
  onCellContextMenu?: (args: TableCellClickArgs<R>, event: TableCellMouseEvent) => void;
  /**
   * A callback function that is called when a key is pressed while a cell is focused
   *
   * @param event The event source of the callback
   */
  onCellKeyDown?: (args: TableCellKeyDownArgs<R>, event: TableCellKeyboardEvent) => void;
  /**
   * The text direction of the table
   *
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Whether or not virtualization is enabled for the table
   *
   * @default true
   */
  enableVirtualization?: boolean;
  /**
   * A callback function that is called when the table is scrolled
   *
   * @param event The event source of the callback
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  /**
   * A callback function that is called when the user copies data from the table.
   *
   * @param event The event source of the callback
   */
  onCopy?: (event: TableCopyEvent<R>) => void;
  /**
   * A callback function that is called when the user pastes data into the table.
   *
   * @param event The event source of the callback
   */
  onPaste?: (event: TablePasteEvent<R>) => R;
  /** Additional css classes to help with unique styling of the table */
  className?: string;
  /** Optional unique identifier */
  // Patched react-data-grid@7.0.0-beta.34 to add this prop, link to issue: https://github.com/adazzle/react-data-grid/issues/3305
  id?: string;
};

/**
 * Configurable table component
 *
 * Thanks to Adazzle for heavy inspiration and documentation
 * https://adazzle.github.io/react-data-grid/
 */
function Table<R>({
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
  selectColumnWidth = 50,
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
  id,
}: TableProps<R>) {
  const cachedColumns = useMemo(() => {
    const editableColumns = columns.map((column) => {
      if (typeof column.editable === 'function') {
        const editableFalsy = (row: R) => {
          // We've already confirmed that editable is a function
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return !!(column.editable as (row: R) => boolean)(row);
        };
        return {
          ...column,
          editable: editableFalsy,
          renderEditCell: column.renderEditCell || TableTextEditor,
        };
      }
      if (column.editable && !column.renderEditCell) {
        return { ...column, renderEditCell: TableTextEditor };
      }
      if (column.renderEditCell && !column.editable) {
        return { ...column, editable: false };
      }
      return column;
    });

    return enableSelectColumn
      ? [{ ...SelectColumn, minWidth: selectColumnWidth }, ...editableColumns]
      : editableColumns;
  }, [columns, enableSelectColumn, selectColumnWidth]);

  return (
    <DataGrid<R>
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
      renderers={{ renderCheckbox }}
      className={className ?? 'rdg-light'}
      id={id}
    />
  );
}

export default Table;
