import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  InventoryTableData,
  Scope,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';

const CHARACTER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_character%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

// Matches all characters
const charactersRegex: RegExp = /./g;

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
    header: () => <Button variant="ghost">{unicodeValueLabel}</Button>,
    cell: ({ row }) => {
      const item: string = row.getValue('item');
      return item.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
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
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
};

export function CharacterInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  scope,
  onScopeChange,
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
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={charactersRegex}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
    />
  );
}

export default CharacterInventory;
