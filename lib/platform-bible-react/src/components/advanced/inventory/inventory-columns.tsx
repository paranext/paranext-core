import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
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
    header: ({ column }) => {
      return (
        <Button className="pr-mt-1" variant="ghost" onClick={() => column.toggleSorting(undefined)}>
          {statusLabel}
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      const item: string = row.getValue('item');
      return (
        <ToggleGroup value={status} variant="outline" type="single">
          <ToggleGroupItem onClick={() => statusChangeHandler([item], 'approved')} value="approved">
            <CircleCheckIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={() => statusChangeHandler([item], 'unapproved')}
            value="unapproved"
          >
            <CircleXIcon />
          </ToggleGroupItem>
          <ToggleGroupItem onClick={() => statusChangeHandler([item], 'unknown')} value="unknown">
            <CircleHelpIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      );
    },
  };
};
