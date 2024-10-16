import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
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
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';

const REPEATED_WORDS_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_repeated_words%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

/**
 * Extracts repeated words from scripture text. If a target is provided, only extracts occurences of
 * the provided target
 *
 * @param text The scripture text from which the characters will be extracted
 * @returns An array of repeated words extracted from the provided scripture text
 */
export const extractRepeatedWords = (text: string): InventoryItem[] => {
  // Finds repeated words, and captures the first occurrence of the word
  const repeatedWords = text.match(/\b(\p{L}+)\b(?= \b\1\b)/gu) || [];

  const inventoryItems: InventoryItem[] = [];
  repeatedWords.forEach((repeatedWord) => {
    inventoryItems.push({ item: repeatedWord });
  });

  return inventoryItems;
};

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @param countLabel Localized label for the count column
 * @param statusLabel Localized label for the status column
 * @param statusChangeHandler Callback function that handles status updates to selected item(s)
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
}

function RepeatedWordsInventory({
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
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={extractRepeatedWords}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
    />
  );
}

export default RepeatedWordsInventory;
