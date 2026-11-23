import {
  ColumnDef,
  ContentZoomRoot,
  InventoryTableData,
  inventoryItemColumn,
} from 'platform-bible-react';

/**
 * The inventory item column, with each item rendered as project text. The item is marked for
 * content zoom, so it scales with the pane's zoom while the column header keeps interface size. For
 * the markers inventory the item is the marker token, which zooms like the text it belongs to.
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @returns Column definition to pass to the inventory component
 */
export function zoomableInventoryItemColumn(itemLabel: string): ColumnDef<InventoryTableData> {
  return {
    ...inventoryItemColumn(itemLabel),
    cell: ({ row }) => <ContentZoomRoot as="span">{row.getValue('item')}</ContentZoomRoot>,
  };
}
