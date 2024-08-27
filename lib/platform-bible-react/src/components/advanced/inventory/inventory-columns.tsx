import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { ColumnDef } from '../data-table/data-table.component';
import { getSortingIcon, ItemData, Status } from './inventory.component';

/**
 * Function that creates the item column for inventories
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @returns Column that shows the inventory items. Should be used with the DataTable component
 */
export const inventoryItemColumn = (itemLabel: string): ColumnDef<ItemData> => {
  return {
    accessorKey: 'item',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
        {itemLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

/**
 * Function that creates the count column for inventories. Should be used with the DataTable
 * component.
 *
 * @param itemLabel Localized label for the count column
 * @returns Column that shows the number of occurrences of the related inventory items
 */
export const inventoryCountColumn = (countLabel: string): ColumnDef<ItemData> => {
  return {
    accessorKey: 'count',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
        {countLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

/**
 * Function that creates the status column for inventories. Should be used with the DataTable
 * component.
 *
 * @param itemLabel Localized label for the status column
 * @param statusChangeHandler Callback function that handles status updates to selected item(s)
 * @returns Column that shows the status of the related inventory items.
 */
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
            <Button
              className="pr-mt-1"
              variant="ghost"
              onClick={() => column.toggleSorting(undefined)}
            >
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
