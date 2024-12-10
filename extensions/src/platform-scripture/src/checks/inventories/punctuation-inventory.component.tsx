import {
  deepEqual,
  LanguageStrings,
  LocalizeKey,
  ScriptureReference,
  substring,
} from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  InventoryItemOccurrence,
  InventoryTableData,
  Scope,
  getBookNumFromId,
  getLinesFromUSFM,
  getNumberFromUSFM,
  getStatusForItem,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';

const PUNCTUATION_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_context%',
  '%webView_inventory_table_header_punctuation%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_table_header_unicode_value%',
];

type PunctuationContext = 'Word Initial' | 'Word Medial' | 'Word Final' | 'Isolated' | 'Unknown';

const extractPunctuation = (
  text: string | undefined,
  scriptureRef: ScriptureReference,
  approvedItems: string[],
  unapprovedItems: string[],
): InventoryTableData[] => {
  if (!text) return [];

  const tableData: InventoryTableData[] = [];

  let currentBook: number | undefined = scriptureRef.bookNum;
  let currentChapter: number | undefined = scriptureRef.chapterNum;
  let currentVerse: number | undefined = scriptureRef.verseNum;

  // Matches all punctuation characters
  const punctuationRegex: RegExp = /[\p{P}]/gu;

  let punctuationContext: PunctuationContext = 'Unknown';

  const lines = getLinesFromUSFM(text);

  lines.forEach((line: string) => {
    if (line.startsWith('\\id')) {
      currentBook = getBookNumFromId(line);
      currentChapter = 0;
      currentVerse = 0;
    }
    if (line.startsWith('\\c')) {
      currentChapter = getNumberFromUSFM(line);
      currentVerse = 0;
    }
    if (line.startsWith('\\v')) {
      currentVerse = getNumberFromUSFM(line);
      if (currentChapter === 0) {
        currentChapter = scriptureRef.chapterNum;
      }
    }

    let match: RegExpExecArray | undefined = punctuationRegex.exec(line) ?? undefined;
    while (match) {
      // For this code to work correctly we need our regular expression to match a single marker
      // on each per match
      if (match.length > 1)
        throw new Error('Multiple punctuation characters found in a single match');

      const item = match[0];
      [precedingMarker] = match;
      const itemIndex = match.index;
      const existingItem = tableData.find((tableEntry) => deepEqual(tableEntry.items, items));
      const newReference: InventoryItemOccurrence = {
        reference: {
          bookNum: currentBook !== undefined ? currentBook : -1,
          chapterNum: currentChapter !== undefined ? currentChapter : -1,
          verseNum: currentVerse !== undefined ? currentVerse : -1,
        },
        text: substring(line, Math.max(0, itemIndex - 25), Math.min(itemIndex + 25, line.length)),
      };
      if (existingItem) {
        existingItem.count += 1;
        existingItem.occurrences.push(newReference);
      } else {
        const newItem: InventoryTableData = {
          items,
          count: 1,
          status: getStatusForItem(items[0], approvedItems, unapprovedItems),
          occurrences: [newReference],
        };
        tableData.push(newItem);
      }

      match = punctuationRegex.exec(line) ?? undefined;
    }
  });

  return tableData;
};

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
  contextLabel: string,
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
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
  inventoryCountColumn(countLabel),
  {
    accessorKey: 'context',
    header: () => <Button variant="ghost">{contextLabel}</Button>,
    cell: () => {
      return 'TBD';
    },
  },
];

type PunctuationInventoryProps = {
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

function PunctuationInventory({
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
  const contextLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_context%'],
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
        contextLabel,
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
      contextLabel,
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
      extractItems={extractPunctuation}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
    />
  );
}

export default PunctuationInventory;
