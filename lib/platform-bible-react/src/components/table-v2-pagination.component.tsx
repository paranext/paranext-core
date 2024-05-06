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

function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="pr-flex pr-items-center pr-justify-between pr-px-2">
      <div className="pr-flex-1 pr-text-sm pr-text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8">
        <div className="pr-flex pr-items-center pr-space-x-2">
          <p className="pr-text-sm pr-font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="pr-h-8 pr-w-[70px]">
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
        <div className="pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="pr-flex pr-items-center pr-space-x-2">
          <Button
            variant="outline"
            className="pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="pr-sr-only">Go to first page</span>
            <ArrowLeftIcon className="pr-h-4 pr-w-4" />
          </Button>
          <Button
            variant="outline"
            className="pr-h-8 pr-w-8 pr-p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="pr-sr-only">Go to previous page</span>
            <ChevronLeftIcon className="pr-h-4 pr-w-4" />
          </Button>
          <Button
            variant="outline"
            className="pr-h-8 pr-w-8 pr-p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="pr-sr-only">Go to next page</span>
            <ChevronRightIcon className="pr-h-4 pr-w-4" />
          </Button>
          <Button
            variant="outline"
            className="pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="pr-sr-only">Go to last page</span>
            <ArrowRightIcon className="pr-h-4 pr-w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
