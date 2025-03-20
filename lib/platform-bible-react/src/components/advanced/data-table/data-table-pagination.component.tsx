import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3">
      <div className="tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8">
        <div className="tw-flex-1 tw-text-sm tw-text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <p className="tw-text-nowrap tw-text-sm tw-font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="tw-h-8 tw-w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="tw-sr-only">Go to first page</span>
            <ArrowLeftIcon className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="tw-h-8 tw-w-8 tw-p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="tw-sr-only">Go to previous page</span>
            <ChevronLeftIcon className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="tw-h-8 tw-w-8 tw-p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="tw-sr-only">Go to next page</span>
            <ChevronRightIcon className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="tw-sr-only">Go to last page</span>
            <ArrowRightIcon className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
