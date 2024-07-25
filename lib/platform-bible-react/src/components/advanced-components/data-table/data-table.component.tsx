import { useState } from 'react';

import {
  ColumnDef as TSColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row as TSRow,
  SortDirection as TSSortDirection,
  SortingState,
  Table as TSTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Button } from '@/components/shadcn-ui/button';
import DataTablePagination from './data-table-pagination.component';
import DataTableViewOptions from './data-table-column-toggle.component';

export type ColumnDef<TData, TValue = unknown> = TSColumnDef<TData, TValue>;
export type RowContents<TData> = TSRow<TData>;
export type TableContents<TData> = TSTable<TData>;
export type SortDirection = TSSortDirection;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  showPaginationControls?: boolean;
  showColumnVisibilityControls?: boolean;
  stickyHeader?: boolean;
  onRowClickHandler?: (row: RowContents<TData>, table: TableContents<TData>) => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  enablePagination = false,
  showPaginationControls = false,
  showColumnVisibilityControls = false,
  stickyHeader = false,
  onRowClickHandler = () => {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="pr-twp pr-font-sans">
      {showColumnVisibilityControls && <DataTableViewOptions table={table} />}
      <Table stickyHeader={stickyHeader}>
        <TableHeader stickyHeader={stickyHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? undefined
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => onRowClickHandler(row, table)}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="pr-h-24 pr-text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {enablePagination && (
        <div className="pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
      {enablePagination && showPaginationControls && <DataTablePagination table={table} />}
    </div>
  );
}

export default DataTable;
