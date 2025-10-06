import { useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ColumnDef,
  Inventory,
  InventoryItem,
  InventoryTableData,
  Scope,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';

const REPEATED_WORDS_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_repeated_words%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
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
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn(itemLabel),
  inventoryCountColumn(countLabel),
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

interface RepeatedWordsInventoryProps {
  inventoryItems: InventoryItem[] | undefined;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  areInventoryItemsLoading: boolean;
}

export function RepeatedWordsInventory({
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
}: RepeatedWordsInventoryProps) {
  const [repeatedWordsInventoryStrings] = useLocalizedStrings(REPEATED_WORDS_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_repeated_words%'],
    [repeatedWordsInventoryStrings],
  );
  const countLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_count%'],
    [repeatedWordsInventoryStrings],
  );
  const statusLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_status%'],
    [repeatedWordsInventoryStrings],
  );

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        countLabel,
        statusLabel,
        approvedItems,
        onApprovedItemsChange,
        unapprovedItems,
        onUnapprovedItemsChange,
      ),
    [
      itemLabel,
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
    />
  );
}

export default RepeatedWordsInventory;
