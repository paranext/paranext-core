import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  ItemData,
  Scope,
  Status,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useCallback, useMemo } from 'react';
import { extractCharacters } from './inventory-utils';

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
 * @param statusChangeHandler Callback function that handles status updates to selected item(s)
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  unicodeValueLabel: string,
  countLabel: string,
  statusLabel: string,
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
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
  inventoryStatusColumn(statusLabel, statusChangeHandler),
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

function CharacterInventory({
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
  const [characterInventoryStrings] = useLocalizedStrings(
    useMemo(() => CHARACTER_INVENTORY_STRING_KEYS, []),
  );
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

  const getColumns = useCallback(
    (onStatusChange: (changedItems: string[], status: Status) => void) =>
      createColumns(itemLabel, unicodeValueLabel, countLabel, statusLabel, onStatusChange),
    [itemLabel, unicodeValueLabel, countLabel, statusLabel],
  );

  return (
    <Inventory
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={extractCharacters}
      approvedItems={approvedItems}
      onApprovedItemsChange={onApprovedItemsChange}
      unapprovedItems={unapprovedItems}
      onUnapprovedItemsChange={onUnapprovedItemsChange}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      getColumns={getColumns}
    />
  );
}

export default CharacterInventory;
