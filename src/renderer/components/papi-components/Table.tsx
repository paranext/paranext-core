import 'react-data-grid/lib/styles.css';
import DataGrid, {
  CellClickArgs,
  CellMouseEvent,
  Column,
  CopyEvent,
  FillEvent,
  PasteEvent,
  RowsChangeData,
} from 'react-data-grid';
import { Key } from 'react';

export type TableProps = {
  columns: readonly Column<unknown, unknown>[];
  rows: readonly unknown[];
  rowKeyGetter?: (row: unknown) => Key;
  onRowsChange?: (rows: unknown[], data: RowsChangeData<unknown, unknown>) => void;
  onFill?: (event: FillEvent<unknown>) => unknown;
  onCopy?: (event: CopyEvent<unknown>) => void;
  onPaste?: (event: PasteEvent<unknown>) => unknown;
  rowHeight?: number;
  selectedRows?: ReadonlySet<Key>;
  onSelectedRowsChange?: (selectedRows: Set<Key>) => void;
  className?: string;
  rowClass?: (row: unknown) => string;
  direction?: 'ltr' | 'rtl';
  onCellClick?: (args: CellClickArgs<unknown, unknown>, event: CellMouseEvent) => void;
};

function Table({
  columns,
  rows,
  rowKeyGetter,
  onRowsChange,
  onFill,
  onCopy,
  onPaste,
  rowHeight,
  selectedRows,
  onSelectedRowsChange,
  className,
  rowClass,
  direction,
  onCellClick,
}: TableProps) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      onRowsChange={onRowsChange}
      onFill={onFill}
      onCopy={onCopy}
      onPaste={onPaste}
      rowHeight={rowHeight}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      className={className}
      rowClass={rowClass}
      direction={direction}
      onCellClick={onCellClick}
    />
  );
}

export default Table;
