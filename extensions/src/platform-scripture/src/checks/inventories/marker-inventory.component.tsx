import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ColumnDef,
  getInventoryHeader,
  Inventory,
  inventoryCountColumn,
  InventorySummaryItem,
  inventoryItemColumn,
  inventoryStatusColumn,
  InventoryTableData,
  Scope,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Localization keys this inventory needs for its table headers. Resolve these via the Platform's
 * localization hook and pass the result into the `markerInventoryStrings` prop.
 */
export const MARKER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_marker%',
  '%webView_inventory_table_header_preceding_marker%',
  '%webView_inventory_table_header_style_name%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_show_preceding_marker%',
  '%webView_inventory_unknown_marker%',
];

function getDescription(markerDescriptions: string[], marker: string): string | undefined {
  // Search for whole marker surrounded by whitespace or periods or at string boundaries (^ and $)
  const findMarker = new RegExp(`(^|[\\s.])${marker}([\\s.]|$)`);
  return markerDescriptions.find((markerDescription) => findMarker.test(markerDescription));
}

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @param styleNameLabel Localized label for the style name column
 * @param markerNames Full marker name, as defined in the USFM stylesheet for the project
 * @param unicodeValueLabel Localized label for the Unicode Value column
 * @param countLabel Localized label for the count column
 * @param statusLabel Localized label for the status column
 * @param approvedItems Array of approved items, typically as defined in `Settings.xml`
 * @param onApprovedItemsChange Callback function that stores the updated list of approved items
 * @param unapprovedItems Array of unapproved items, typically as defined in `Settings.xml`
 * @param onUnapprovedItemsChange Callback function that stores the updated list of unapproved items
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  styleNameLabel: string,
  markerNames: string[],
  unknownMarkerLabel: string,
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn(itemLabel),
  inventoryCountColumn(countLabel),
  {
    accessorKey: 'styleName',
    accessorFn: (row) => getDescription(markerNames, row.items[0]) || unknownMarkerLabel,
    header: ({ column }) => getInventoryHeader(column, styleNameLabel),
    cell: ({ row }) => {
      const marker: string = row.getValue('item');
      return getDescription(markerNames, marker) || unknownMarkerLabel;
    },
  },
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

type MarkerInventoryProps = {
  inventoryItems: InventorySummaryItem[] | undefined;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  /**
   * Localized strings for this inventory's table headers; resolve via
   * {@link MARKER_INVENTORY_STRING_KEYS}.
   */
  markerInventoryStrings: LanguageStrings;
  /**
   * Full marker descriptions (as defined in the project's USFM stylesheet) for the current book,
   * used to resolve each marker's style-name column. Loaded by the container (webview/story)
   * because reading them depends on the project and book reference.
   */
  markerNames: string[];
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  areInventoryItemsLoading: boolean;
  onItemSelected?: (itemKey: string) => void;
};

export function MarkerInventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  markerInventoryStrings,
  markerNames,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  scope,
  onScopeChange,
  areInventoryItemsLoading,
  onItemSelected,
}: MarkerInventoryProps) {
  const itemLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_marker%'],
    [markerInventoryStrings],
  );
  const precedingMarkerLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_preceding_marker%'],
    [markerInventoryStrings],
  );
  const styleNameLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_style_name%'],
    [markerInventoryStrings],
  );
  const countLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_count%'],
    [markerInventoryStrings],
  );
  const statusLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_status%'],
    [markerInventoryStrings],
  );
  const showPrecedingMarkerLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_show_preceding_marker%'],
    [markerInventoryStrings],
  );
  const unknownMarkerLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_unknown_marker%'],
    [markerInventoryStrings],
  );

  const newInventoryItems: InventorySummaryItem[] | undefined = useMemo(() => {
    if (!inventoryItems) return undefined;
    return inventoryItems.map((item, index) => ({
      ...item,
      key: [String(item.key), String(inventoryItems[Math.max(index - 1, 0)].key)],
    }));
  }, [inventoryItems]);

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        styleNameLabel,
        markerNames,
        unknownMarkerLabel,
        countLabel,
        statusLabel,
        approvedItems,
        onApprovedItemsChange,
        unapprovedItems,
        onUnapprovedItemsChange,
      ),
    [
      itemLabel,
      styleNameLabel,
      markerNames,
      unknownMarkerLabel,
      countLabel,
      statusLabel,
      approvedItems,
      onApprovedItemsChange,
      unapprovedItems,
      onUnapprovedItemsChange,
    ],
  );

  return (
    <Inventory
      inventoryItems={newInventoryItems}
      setVerseRef={setVerseRef}
      localizedStrings={localizedStrings}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
      additionalItemsLabels={{
        checkboxText: showPrecedingMarkerLabel,
        tableHeaders: [precedingMarkerLabel],
      }}
      areInventoryItemsLoading={areInventoryItemsLoading}
      classNameForVerseText="scripture-font"
      onItemSelected={onItemSelected}
    />
  );
}

export default MarkerInventory;
