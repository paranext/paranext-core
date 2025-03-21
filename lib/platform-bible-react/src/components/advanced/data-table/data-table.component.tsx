import { useState } from 'react';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef as TSColumnDef,
  Row as TSRow,
  RowSelectionState as TSRowSelectionState,
  SortDirection as TSSortDirection,
  Table as TSTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { DataTableViewOptions } from '@/components/advanced/data-table/data-table-column-toggle.component';
import { DataTablePagination } from '@/components/advanced/data-table/data-table-pagination.component';
import { Button } from '@/components/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';

export type ColumnDef<TData, TValue = unknown> = TSColumnDef<TData, TValue>;
export type RowContents<TData> = TSRow<TData>;
export type TableContents<TData> = TSTable<TData>;
export type SortDirection = TSSortDirection;
export type RowSelectionState = TSRowSelectionState;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  showPaginationControls?: boolean;
  showColumnVisibilityControls?: boolean;
  stickyHeader?: boolean;
  onRowClickHandler?: (row: RowContents<TData>, table: TableContents<TData>) => void;
}

/**
 * Feature-rich table component that infuses our basic shadcn-based Table component with features
 * from TanStack's React Table library
 */
export function DataTable<TData, TValue>({
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
    <div className="pr-twp">
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
              <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {enablePagination && (
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4">
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
