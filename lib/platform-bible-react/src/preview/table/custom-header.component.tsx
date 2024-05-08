import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, EyeOffIcon } from 'lucide-react';
import { Column } from '@tanstack/react-table';

import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { HTMLAttributes, ReactNode } from 'react';

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const getSortIcon = (isSorted: string | boolean): ReactNode => {
    if (isSorted === 'desc') return <ArrowDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
    if (isSorted === 'asc') return <ArrowUpIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
    return <ArrowUpDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  };

  return (
    <div className={cn('pr-flex pr-items-center pr-space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="pr-data-[state=open]:pr-bg-accent pr-ml-3 pr-h-8"
          >
            <span>{title}</span>
            {getSortIcon(column.getIsSorted())}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <div className="pr-flex">
              <ArrowUpIcon className="pr-mr-2 pr-h-3.5 pr-w-3.5 pr-text-muted-foreground/70" />
              Ascending
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <div className="pr-flex">
              <ArrowDownIcon className="pr-mr-2 pr-h-3.5 pr-w-3.5 pr-text-muted-foreground/70" />
              Descending
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <div className="pr-flex">
              {' '}
              <EyeOffIcon className="pr-mr-2 pr-h-3.5 pr-w-3.5 pr-text-muted-foreground/70" />
              Hide
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableColumnHeader;
