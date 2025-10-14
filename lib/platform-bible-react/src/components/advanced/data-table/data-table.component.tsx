import React, { useMemo, useState } from 'react';

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
import { Skeleton } from '@/components/shadcn-ui/skeleton';

export type ColumnDef<TData, TValue = unknown> = TSColumnDef<TData, TValue>;
export type RowContents<TData> = TSRow<TData>;
export type TableContents<TData> = TSTable<TData>;
export type SortDirection = TSSortDirection;
export type RowSelectionState = TSRowSelectionState;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  enablePagination?: boolean;
  showPaginationControls?: boolean;
  showColumnVisibilityControls?: boolean;
  stickyHeader?: boolean;
  onRowClickHandler?: (row: RowContents<TData>, table: TableContents<TData>) => void;
  id?: string;
  isLoading?: boolean;
  noResultsMessage: string;
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
  id,
  isLoading = false,
  noResultsMessage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const normalizedData = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: normalizedData,
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

  const visibleColumns = table.getVisibleFlatColumns();
  let bodyContent: React.ReactNode;

  if (isLoading) {
    const rowCount = 10;
    const skeletonRowIds = Array.from({ length: rowCount }).map((_, idx) => `skeleton-row-${idx}`);
    bodyContent = skeletonRowIds.map((rowId) => (
      <TableRow key={rowId}>
        <TableCell colSpan={visibleColumns.length ?? columns.length} className="tw-border-0 tw-p-0">
          <div className="tw-w-full tw-py-2">
            <Skeleton className="tw-h-14 tw-w-full tw-rounded-md" />
          </div>
        </TableCell>
      </TableRow>
    ));
  } else if (table.getRowModel().rows?.length > 0) {
    bodyContent = table.getRowModel().rows.map((row) => (
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
    ));
  } else {
    bodyContent = (
      <TableRow>
        <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
          {noResultsMessage}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div className="pr-twp" id={id}>
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
        <TableBody>{bodyContent}</TableBody>
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
