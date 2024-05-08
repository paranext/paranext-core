import { ColumnDef, SortDirection } from '@tanstack/react-table';
import { MoreHorizontalIcon, ArrowUpDownIcon, ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { ReactNode } from 'react';
import DataTableColumnHeader from './custom-header.component';

//  DATA

type Status = 'pending' | 'processing' | 'success' | 'failed';

type Payment = {
  id: string;
  amount: number;
  status: Status;
  email: string;
};

const getRandomStatus = (): Status => {
  const statuses: Status[] = ['pending', 'processing', 'success', 'failed'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const getRandomString = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const randomlyGeneratedData = (length: number): Payment[] => {
  const dataArray: Payment[] = [];
  for (let index = 0; index < length; index++) {
    dataArray.push({
      id: getRandomString(5),
      amount: Math.floor(Math.random() * 1000),
      status: getRandomStatus(),
      email: `${getRandomString(8)}@${getRandomString(6)}.com`,
    });
  }
  return dataArray;
};

export default randomlyGeneratedData;

// COLUMNS

// Function that returns an icon based on the current sorting status
const getSortingIcon = (sortDirection: false | SortDirection): ReactNode => {
  if (sortDirection === 'asc') {
    return <ArrowUpIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  if (sortDirection === 'desc') {
    return <ArrowDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  return <ArrowUpDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
};

export const columns: ColumnDef<Payment>[] = [
  // Row selection column, allows you to select rows by ticking a checkbox
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Column with a basic sorting feature
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
          Status
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  // Column with a dropdown menu for sorting/hiding
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  // Column with a custom formatting function for the cell contents
  {
    accessorKey: 'amount',
    header: () => <div className="pr-text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="pr-text-right pr-font-medium">{formatted}</div>;
    },
  },
  // Column with a custom component as the cell content
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pr-h-8 pr-w-8 pr-p-0" size="icon">
              <span className="pr-sr-only">Open menu</span>
              <MoreHorizontalIcon className="pr-h-4 pr-w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
