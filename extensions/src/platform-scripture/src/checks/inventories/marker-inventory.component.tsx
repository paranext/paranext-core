import papi from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import {
  Button,
  ColumnDef,
  getBookNumFromId,
  getLinesFromUSFM,
  getNumberFromUSFM,
  getStatusForItem,
  Inventory,
  inventoryCountColumn,
  inventoryItemColumn,
  InventoryItemOccurrence,
  inventoryStatusColumn,
  InventoryTableData,
  Scope,
} from 'platform-bible-react';
import {
  deepEqual,
  LanguageStrings,
  LocalizeKey,
  ScriptureReference,
  substring,
} from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';

const MARKER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_marker%',
  '%webView_inventory_table_header_preceding_marker%',
  '%webView_inventory_table_header_style_name%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_show_preceding_marker%',
];

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

const extractMarkers = (
  text: string | undefined,
  scriptureRef: ScriptureReference,
  approvedItems: string[],
  unapprovedItems: string[],
): InventoryTableData[] => {
  if (!text || text === '') return [];

  const tableData: InventoryTableData[] = [];

  let currentBook: number | undefined = scriptureRef.bookNum;
  let currentChapter: number | undefined = scriptureRef.chapterNum;
  let currentVerse: number | undefined = scriptureRef.verseNum;

  const markerRegex: RegExp = /\\[a-zA-Z0-9]+\*?/g;

  let precedingMarker: string = '';

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

    let match: RegExpExecArray | null = markerRegex.exec(line);
    // RegExp.exec returns null when no match is found
    // eslint-disable-next-line no-null/no-null
    while (match !== null) {
      // For this code to work correctly we need our regular expression to match a single marker
      // on each per match
      if (match.length > 1) throw new Error('Multiple markers found in a single match');
      const items = [match[0], precedingMarker];
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

      match = markerRegex.exec(line);
    }
  });

  return tableData;
};

function getDescription(markerDescriptions: string[], marker: string): string | undefined {
  const markerWithoutBackslash = substring(marker, 1);
  // Escape all characters that need escaping to be handled as plain text
  const escapedMarker = markerWithoutBackslash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Search for whole marker surrounded by whitespace or periods or at string boundaries (^ and $)
  const regex = new RegExp(`(^|[\\s.])${escapedMarker}([\\s.]|$)`);
  return markerDescriptions.find((markerNames) => regex.test(markerNames));
}

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @param styleNameLabel Localized label for the style name column
 * @param markerNames
 * @param countLabel Localized label for the count column
 * @param statusLabel
 * @param approvedItems
 * @param onApprovedItemsChange
 * @param unapprovedItems
 * @param onUnapprovedItemsChange
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  styleNameLabel: string,
  markerNames: string[],
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
    header: () => <Button variant="ghost">{styleNameLabel}</Button>,
    cell: ({ row }) => {
      const marker: string = row.getValue('item');
      return getDescription(markerNames, marker) || 'Unknown marker';
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
  projectId?: string;
};

function MarkerInventory({
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
  projectId,
}: MarkerInventoryProps) {
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [markerNames, setMarkerNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchStylesheet = async () => {
      if (!projectId) return;
      const PDP = await papi.projectDataProviders.get('platformScripture.MarkerNames', projectId);
      const newMarkerNames = await PDP.getMarkerNames(scrRef.bookNum);
      if (newMarkerNames) setMarkerNames(newMarkerNames);
    };

    fetchStylesheet();
  }, [projectId, scrRef.bookNum]);

  const [markerInventoryStrings] = useLocalizedStrings(MARKER_INVENTORY_STRING_KEYS);
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

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        styleNameLabel,
        markerNames,
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
      extractItems={extractMarkers}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
      additionalItemsLabels={{
        checkboxText: showPrecedingMarkerLabel,
        tableHeaders: [precedingMarkerLabel],
      }}
    />
  );
}

export default MarkerInventory;
