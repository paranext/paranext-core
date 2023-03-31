import 'react-data-grid/lib/styles.css';
import DataGrid, {
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  Column,
  CopyEvent,
  FillEvent,
  PasteEvent,
  RowsChangeData,
  SortColumn,
} from 'react-data-grid';
import { Key, UIEvent } from 'react';

// Make default TRow type
type TRow = {};

export type TableCellClickArgs<T = TRow> = CellClickArgs<T>;
export type TableCellKeyboardEvent = CellKeyboardEvent;
export type TableCellKeyDownArgs<T = TRow> = CellKeyDownArgs<T>;
export type TableCellMouseEvent = CellMouseEvent;
export type TableColumn<T = TRow> = Column<T>;
export type TableCopyEvent<T = TRow> = CopyEvent<T>;
export type TableFillEvent<T = TRow> = FillEvent<T>;
export type TablePasteEvent<T = TRow> = PasteEvent<T>;
export type TableRowsChangeData<T = TRow> = RowsChangeData<T>;
export type TableSortColumn = SortColumn;

// Subset of https://github.com/adazzle/react-data-grid#api
export type TableProps = {
  // Add comments & defaults
  columns: readonly TableColumn<unknown>[];
  sortColumns?: readonly TableSortColumn[];
  onSortColumnsChange?: (sortColumns: TableSortColumn[]) => void;
  onColumnResize?: (idx: number, width: number) => void;
  sortable?: boolean;
  resizable?: boolean;
  rows: readonly unknown[];
  rowKeyGetter?: (row: unknown) => Key;
  rowClass?: (row: unknown) => string;
  rowHeight?: number;
  headerRowHeight?: number;
  selectedRows?: ReadonlySet<Key>;
  onSelectedRowsChange?: (selectedRows: Set<Key>) => void;
  onRowsChange?: (rows: unknown[], data: TableRowsChangeData<unknown>) => void;
  onCellClick?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  onCellDoubleClick?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  onCellContextMenu?: (args: TableCellClickArgs<unknown>, event: TableCellMouseEvent) => void;
  onCellKeyDown?: (args: TableCellKeyDownArgs<unknown>, event: TableCellKeyboardEvent) => void;
  direction?: 'ltr' | 'rtl';
  enableVirtualization?: boolean;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onFill?: (event: TableFillEvent<unknown>) => unknown;
  onCopy?: (event: TableCopyEvent<unknown>) => void;
  onPaste?: (event: TablePasteEvent<unknown>) => unknown;
  className?: string;
};

function Table({
  columns,
  sortColumns,
  onSortColumnsChange,
  onColumnResize,
  sortable,
  resizable,
  rows,
  rowKeyGetter,
  rowClass,
  rowHeight,
  headerRowHeight,
  selectedRows,
  onSelectedRowsChange,
  onRowsChange,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  onCellKeyDown,
  direction,
  enableVirtualization,
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
        sortable,
        resizable,
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
