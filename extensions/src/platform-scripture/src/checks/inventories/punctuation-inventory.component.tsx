import { useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Button,
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

const PUNCTUATION_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_punctuation%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_table_header_unicode_value%',
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
): ColumnDef<InventoryTableData>[] => {
  return [
    {
      ...inventoryItemColumn(itemLabel),
      cell: ({ row }) => (
        <div className="tw-text-lg tw-font-bold tw-font-mono tw-flex tw-justify-center">
          {row.getValue('item')}
        </div>
      ),
    },
    {
      accessorKey: 'unicodeValue',
      header: () => <Button variant="ghost">{unicodeValueLabel}</Button>,
      //  Q: How to style the <td> and <th> directly?
      cell: ({ row }) => (
        <div className="tw-font-mono tw-flex tw-justify-center">
          {String(row.getValue('item')).charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}
        </div>
      ),
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
};

type PunctuationInventoryProps = {
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
};

export function PunctuationInventory({
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
}: PunctuationInventoryProps) {
  const [punctuationInventoryStrings] = useLocalizedStrings(PUNCTUATION_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_punctuation%'],
    [punctuationInventoryStrings],
  );
  const unicodeValueLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_unicode_value%'],
    [punctuationInventoryStrings],
  );
  const countLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_count%'],
    [punctuationInventoryStrings],
  );
  const statusLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_status%'],
    [punctuationInventoryStrings],
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
    />
  );
}

export default PunctuationInventory;
