import { useLocalizedStrings } from '@papi/frontend/react';
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

const MIXED_CAPITALIZATION_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_mixed_capitalization%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

/**
 * Function that constructs the columns for the Mixed Capitalization inventory component.
 *
 * Mixed Capitalization uses the standard combined column set (item, count, status) per the
 * `gm-016-column-set-mixed-cap` golden master `standard-non-sba` result. PT9's Mixed Capitalization
 * check has `SupportsSeparateInventories === false`, so the verse/non-verse split columns are never
 * rendered; the SBA base-text/study-content variant is owned by the wiring layer's column
 * selection.
 *
 * @param itemLabel Localized label for the item column (e.g. 'Mixed Capitalization Word')
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

export interface MixedCapitalizationInventoryProps {
  inventoryItems: InventorySummaryItem[] | undefined;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  areInventoryItemsLoading?: boolean;
  onItemSelected?: (itemKey: string) => void;
}

export function MixedCapitalizationInventory({
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
  onItemSelected,
}: MixedCapitalizationInventoryProps) {
  const [mixedCapitalizationInventoryStrings] = useLocalizedStrings(
    MIXED_CAPITALIZATION_INVENTORY_STRING_KEYS,
  );
  const itemLabel = useMemo(
    () =>
      mixedCapitalizationInventoryStrings['%webView_inventory_table_header_mixed_capitalization%'],
    [mixedCapitalizationInventoryStrings],
  );
  const countLabel = useMemo(
    () => mixedCapitalizationInventoryStrings['%webView_inventory_table_header_count%'],
    [mixedCapitalizationInventoryStrings],
  );
  const statusLabel = useMemo(
    () => mixedCapitalizationInventoryStrings['%webView_inventory_table_header_status%'],
    [mixedCapitalizationInventoryStrings],
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

export default MixedCapitalizationInventory;
