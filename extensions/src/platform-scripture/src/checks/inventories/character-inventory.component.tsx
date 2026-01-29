import { useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Button,
  ColumnDef,
  Inventory,
  InventoryItem,
  InventoryTableData,
  Scope,
  getInventoryHeader,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';
import { getUnicodeValue } from './inventory-utils';

const CHARACTER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_character%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
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
  unicodeValueLabel: string,
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn(itemLabel),
  {
    accessorKey: 'unicodeValue',
    accessorFn: (row) => getUnicodeValue(row.items[0]),
    header: ({ column }) => getInventoryHeader(column, unicodeValueLabel),
    cell: ({ row }) => {
      const item: string = row.getValue('item');
      return getUnicodeValue(item);
    },
  },
  inventoryCountColumn(countLabel),
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

type CharacterInventoryProps = {
  inventoryItems: InventoryItem[] | undefined;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  areInventoryItemsLoading?: boolean;
};

export function CharacterInventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  scope,
  onScopeChange,
  areInventoryItemsLoading,
}: CharacterInventoryProps) {
  const [characterInventoryStrings] = useLocalizedStrings(CHARACTER_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_character%'],
    [characterInventoryStrings],
  );
  const unicodeValueLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_unicode_value%'],
    [characterInventoryStrings],
  );
  const countLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_count%'],
    [characterInventoryStrings],
  );
  const statusLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_status%'],
    [characterInventoryStrings],
  );

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        unicodeValueLabel,
        countLabel,
        statusLabel,
        approvedItems,
        onApprovedItemsChange,
        unapprovedItems,
        onUnapprovedItemsChange,
      ),
    [
      itemLabel,
      unicodeValueLabel,
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
      inventoryItems={inventoryItems}
      setVerseRef={setVerseRef}
      localizedStrings={localizedStrings}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
      areInventoryItemsLoading={areInventoryItemsLoading}
      classNameForVerseText="scripture-font"
    />
  );
}

export default CharacterInventory;
