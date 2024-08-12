import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { FilterIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/shadcn-ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="pr-ml-auto pr-hidden pr-h-8 lg:pr-flex">
          <FilterIcon className="pr-mr-2 pr-h-4 pr-w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="pr-w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="pr-capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableViewOptions;
