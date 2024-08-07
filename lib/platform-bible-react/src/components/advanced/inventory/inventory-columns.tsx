import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { ColumnDef } from '../data-table/data-table.component';
import { getSortingIcon, ItemData, Status } from './inventory.component';

export const inventoryItemColumn = (itemLabel: string): ColumnDef<ItemData> => {
  return {
    accessorKey: 'item',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(undefined)}>
        {itemLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

export const inventoryCountColumn = (countLabel: string): ColumnDef<ItemData> => {
  return {
    accessorKey: 'count',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(undefined)}>
        {countLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

export const inventoryStatusColumn = (
  statusLabel: string,
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData> => {
  return {
    accessorKey: 'status',
    header: ({ column, table }) => {
      const selectedRows = table.getSelectedRowModel().rows;

      const items: string[] = [];
      selectedRows.forEach((row) => {
        items.push(row.getValue('item'));
      });

      return (
        <div>
          <div className="pr-flex pr-justify-center">
            <Button className="pr-mt-1" onClick={() => column.toggleSorting(undefined)}>
              {statusLabel}
              {getSortingIcon(column.getIsSorted())}
            </Button>
          </div>
          <div className="pr-flex pr-justify-center">
            <Button className="pr-m-1">
              <CircleCheckIcon
                onClick={() => {
                  statusChangeHandler(items, 'approved');
                }}
              />
            </Button>
            <Button className="pr-m-1">
              <CircleXIcon
                onClick={() => {
                  statusChangeHandler(items, 'unapproved');
                }}
              />
            </Button>
            <Button className="pr-m-1">
              <CircleHelpIcon
                onClick={() => {
                  statusChangeHandler(items, 'unknown');
                }}
              />
            </Button>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      switch (status) {
        case 'approved':
          return <CircleCheckIcon />;
        case 'unapproved':
          return <CircleXIcon />;
        case 'unknown':
        default:
          return <CircleHelpIcon />;
      }
    },
  };
};
