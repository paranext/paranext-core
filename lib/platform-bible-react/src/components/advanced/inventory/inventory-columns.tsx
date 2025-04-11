import { ColumnDef, SortDirection } from '@/components/advanced/data-table/data-table.component';
import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleXIcon,
} from 'lucide-react';
import { ReactNode } from 'react';
import { InventoryTableData, Status } from './inventory-utils';

/**
 * Gets an icon that indicates the current sorting direction based on the provided input
 *
 * @param sortDirection Sorting direction. Can be ascending ('asc'), descending ('desc') or false (
 *   i.e. not sorted)
 * @returns The appropriate sorting icon for the provided sorting direction
 */
const getSortingIcon = (sortDirection: false | SortDirection): ReactNode => {
  if (sortDirection === 'asc') {
    return <ArrowUpIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
  }
  if (sortDirection === 'desc') {
    return <ArrowDownIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
  }
  return <ArrowUpDownIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
};

/**
 * Function that creates the item column for inventories
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @returns Column that shows the inventory items. Should be used with the DataTable component
 */
export const inventoryItemColumn = (itemLabel: string): ColumnDef<InventoryTableData> => {
  return {
    accessorKey: 'item',
    accessorFn: (row: InventoryTableData) => row.items[0],
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
        {itemLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

/**
 * Function that creates the additional item columns for inventories
 *
 * @param additionalItemLabel Localized label for the additional item column (e.g. 'Preceding
 *   Marker')
 * @param additionalItemIndex Index that locates the desired item in the items array of the
 *   inventory
 * @returns Column that shows additional inventory items. Should be used with the DataTable
 *   component
 */
export const inventoryAdditionalItemColumn = (
  additionalItemLabel: string,
  additionalItemIndex: number,
): ColumnDef<InventoryTableData> => {
  return {
    accessorKey: `item${additionalItemIndex}`,
    accessorFn: (row: InventoryTableData) => row.items[additionalItemIndex],
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
        {additionalItemLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  };
};

/**
 * Function that creates the count column for inventories. Should be used with the DataTable
 * component.
 *
 * @param countLabel Localized label for the count column
 * @returns Column that shows the number of occurrences of the related inventory items
 */
export const inventoryCountColumn = (countLabel: string): ColumnDef<InventoryTableData> => {
  return {
    accessorKey: 'count',
    header: ({ column }) => (
      <div className="tw-flex tw-justify-end tw-tabular-nums">
        <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
          {countLabel}
          {getSortingIcon(column.getIsSorted())}
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="tw-flex tw-justify-end">{row.getValue('count')}</div>,
  };
};

/**
 * Function that updates project settings when status for item(s) changes
 *
 * @param changedItems Array of items for which the status is being updated
 * @param newStatus The status that the items are being given
 * @param approvedItems Array of currently approved items
 * @param onApprovedItemsChange Callback function that stores the updated list of approved items
 * @param unapprovedItems Array of currently unapproved items
 * @param onUnapprovedItemsChange Callback function that stores the updated list of unapproved items
 */
const statusChangeHandler = (
  changedItems: string[],
  newStatus: Status,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
) => {
  let newApprovedItems: string[] = [...approvedItems];
  changedItems.forEach((item) => {
    if (newStatus === 'approved') {
      if (!newApprovedItems.includes(item)) {
        newApprovedItems.push(item);
      }
    } else {
      newApprovedItems = newApprovedItems.filter((validItem) => validItem !== item);
    }
  });
  onApprovedItemsChange(newApprovedItems);

  let newUnapprovedItems: string[] = [...unapprovedItems];
  changedItems.forEach((item) => {
    if (newStatus === 'unapproved') {
      if (!newUnapprovedItems.includes(item)) {
        newUnapprovedItems.push(item);
      }
    } else {
      newUnapprovedItems = newUnapprovedItems.filter((unapprovedItem) => unapprovedItem !== item);
    }
  });
  onUnapprovedItemsChange(newUnapprovedItems);
};

/**
 * Function that creates the status column for inventories. Should be used with the DataTable
 * component.
 *
 * @param statusLabel Localized label for the status column
 * @param approvedItems Array of approved items, typically as defined in `Settings.xml`
 * @param onApprovedItemsChange Callback function that stores the updated list of approved items
 * @param unapprovedItems Array of unapproved items, typically as defined in `Settings.xml`
 * @param onUnapprovedItemsChange Callback function that stores the updated list of unapproved items
 * @returns Column that shows the status buttons for the related inventory item. The button for the
 *   current status of the item is selected
 */
export const inventoryStatusColumn = (
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData> => {
  return {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="tw-flex tw-justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
            {statusLabel}
            {getSortingIcon(column.getIsSorted())}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      const item: string = row.getValue('item');
      return (
        <ToggleGroup value={status} variant="outline" type="single">
          <ToggleGroupItem
            onClick={(event) => {
              event.stopPropagation();
              statusChangeHandler(
                [item],
                'approved',
                approvedItems,
                onApprovedItemsChange,
                unapprovedItems,
                onUnapprovedItemsChange,
              );
            }}
            value="approved"
          >
            <CircleCheckIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={(event) => {
              event.stopPropagation();
              statusChangeHandler(
                [item],
                'unapproved',
                approvedItems,
                onApprovedItemsChange,
                unapprovedItems,
                onUnapprovedItemsChange,
              );
            }}
            value="unapproved"
          >
            <CircleXIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={(event) => {
              event.stopPropagation();
              statusChangeHandler(
                [item],
                'unknown',
                approvedItems,
                onApprovedItemsChange,
                unapprovedItems,
                onUnapprovedItemsChange,
              );
            }}
            value="unknown"
          >
            <CircleHelpIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      );
    },
  };
};
