import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ColumnDef,
  Inventory,
  InventorySummaryItem,
  InventoryTableData,
  Scope,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Localization keys this inventory needs for its table headers. Resolve these via the Platform's
 * localization hook and pass the result into the `repeatedWordsInventoryStrings` prop.
 */
export const REPEATED_WORDS_INVENTORY_STRING_KEYS: LocalizeKey[] = [
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
  inventoryItems: InventorySummaryItem[] | undefined;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  /**
   * Localized strings for this inventory's table headers; resolve via
   * {@link REPEATED_WORDS_INVENTORY_STRING_KEYS}.
   */
  repeatedWordsInventoryStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  areInventoryItemsLoading: boolean;
  onItemSelected?: (itemKey: string) => void;
}

export function RepeatedWordsInventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  repeatedWordsInventoryStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  scope,
  onScopeChange,
  areInventoryItemsLoading,
  onItemSelected,
}: RepeatedWordsInventoryProps) {
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
      classNameForVerseText="scripture-font"
      onItemSelected={onItemSelected}
    />
  );
}

export default RepeatedWordsInventory;
