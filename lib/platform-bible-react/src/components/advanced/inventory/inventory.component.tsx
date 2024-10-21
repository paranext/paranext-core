import DataTable, {
  ColumnDef,
  RowContents,
  TableContents,
} from '@/components/advanced/data-table/data-table.component';
import OccurrencesTable from '@/components/advanced/inventory/occurrences-table.component';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { RowSelectionState } from '@tanstack/react-table';
import {
  deepEqual,
  LocalizedStringValue,
  ScriptureReference,
  substring,
} from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';
import { inventoryRelatedItemColumn as inventoryAdditionalItemColumn } from './inventory-columns';
import {
  getBookNumFromId,
  getLinesFromUSFM,
  getNumberFromUSFM,
  getStatusForItem,
  InventoryItemOccurrence,
  InventoryTableData,
  Scope,
  StatusFilter,
} from './inventory-utils';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const INVENTORY_STRING_KEYS = Object.freeze([
  '%webView_inventory_all%',
  '%webView_inventory_approved%',
  '%webView_inventory_unapproved%',
  '%webView_inventory_unknown%',
  '%webView_inventory_scope_currentBook%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
  '%webView_inventory_occurrences_table_header_reference%',
  '%webView_inventory_occurrences_table_header_occurrence%',
] as const);

export type InventoryLocalizedStrings = {
  [localizedInventoryKey in (typeof INVENTORY_STRING_KEYS)[number]]?: LocalizedStringValue;
};

export type AdditionalItemsLabels = {
  checkboxText?: string;
  tableHeaders?: string[];
};

/**
 * Filters data that is shown in the DataTable section of the inventory
 *
 * @param itemData All items and their related information
 * @param statusFilter Allows filtering by status (i.e. show all items, or only items that are
 *   'approved', 'unapproved' or 'unknown')
 * @param textFilter Allows filtering by text. All items that include the filter text will be
 *   selected.
 * @returns Array of items and their related information that are matched by the specified filters
 */
const filterItemData = (
  itemData: InventoryTableData[],
  statusFilter: StatusFilter,
  textFilter: string,
): InventoryTableData[] => {
  let filteredItemData: InventoryTableData[] = itemData;

  if (statusFilter !== 'all') {
    filteredItemData = filteredItemData.filter(
      (item) =>
        (statusFilter === 'approved' && item.status === 'approved') ||
        (statusFilter === 'unapproved' && item.status === 'unapproved') ||
        (statusFilter === 'unknown' && item.status === 'unknown'),
    );
  }

  if (textFilter !== '')
    filteredItemData = filteredItemData.filter((item) => item.items[0].includes(textFilter));

  return filteredItemData;
};

const localizeString = (
  strings: InventoryLocalizedStrings,
  key: keyof InventoryLocalizedStrings,
) => {
  return strings[key] ?? key;
};

type InventoryProps = {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: InventoryLocalizedStrings;
  extractItems:
    | RegExp
    | ((
        text: string | undefined,
        scriptureRef: ScriptureReference,
        approvedItems: string[],
        unapprovedItems: string[],
      ) => InventoryTableData[]);
  additionalItemsLabels?: AdditionalItemsLabels;
  approvedItems: string[];
  unapprovedItems: string[];
  text: string | undefined;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  columns: ColumnDef<InventoryTableData>[];
};

/**
 * Turns array of strings into array of inventory items, along with their count and status
 *
 * @param inventoryItems String array that contains inventory items
 * @param getStatusForItem Function that gets status for inventory item from related project
 *   settings
 * @returns Array of inventory items, along with their count and status
 */
const createTableData = (
  text: string | undefined,
  scriptureRef: ScriptureReference,
  approvedItems: string[],
  unapprovedItems: string[],
  itemRegex: RegExp,
): InventoryTableData[] => {
  if (!text || text === '') return [];

  const tableData: InventoryTableData[] = [];

  let currentBook: number | undefined = scriptureRef.bookNum;
  let currentChapter: number | undefined = scriptureRef.chapterNum;
  let currentVerse: number | undefined = scriptureRef.verseNum;

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

    let match: RegExpExecArray | null = itemRegex.exec(line);
    // RegExp.exec returns null when no match is found
    // eslint-disable-next-line no-null/no-null
    while (match !== null) {
      const items = match;
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

      match = itemRegex.exec(line);
    }
  });

  return tableData;
};

/** Inventory component that is used to view and control the status of provided project settings */
export default function Inventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  extractItems,
  additionalItemsLabels,
  approvedItems,
  unapprovedItems,
  text,
  scope,
  onScopeChange,
  columns,
}: InventoryProps) {
  const allItemsText = localizeString(localizedStrings, '%webView_inventory_all%');
  const approvedItemsText = localizeString(localizedStrings, '%webView_inventory_approved%');
  const unapprovedItemsText = localizeString(localizedStrings, '%webView_inventory_unapproved%');
  const unknownItemsText = localizeString(localizedStrings, '%webView_inventory_unknown%');
  const scopeBookText = localizeString(localizedStrings, '%webView_inventory_scope_currentBook%');
  const scopeChapterText = localizeString(localizedStrings, '%webView_inventory_scope_chapter%');
  const scopeVerseText = localizeString(localizedStrings, '%webView_inventory_scope_verse%');
  const filterText = localizeString(localizedStrings, '%webView_inventory_filter_text%');

  const [showAdditionalItems, setShowAdditionalItems] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const tableData: InventoryTableData[] = useMemo(() => {
    if (!text) return [];
    if (extractItems instanceof RegExp)
      return createTableData(
        text,
        scriptureReference,
        approvedItems,
        unapprovedItems,
        extractItems,
      );
    return extractItems(text, scriptureReference, approvedItems, unapprovedItems);
  }, [text, extractItems, scriptureReference, approvedItems, unapprovedItems]);

  const showAdditionalItemsControl: boolean = useMemo(() => {
    return !!additionalItemsLabels;
  }, [additionalItemsLabels]);

  const reducedTableData: InventoryTableData[] = useMemo(() => {
    if (showAdditionalItems) return tableData;

    const newTableData: InventoryTableData[] = [];

    tableData.forEach((tableEntry) => {
      const firstItem = tableEntry.items[0];

      const existingEntry = newTableData.find(
        (newTableEntry) => newTableEntry.items[0] === firstItem,
      );

      if (existingEntry) {
        existingEntry.count += tableEntry.count;
        existingEntry.occurrences = existingEntry.occurrences.concat(tableEntry.occurrences);
      } else {
        newTableData.push({
          items: [firstItem],
          count: tableEntry.count,
          occurrences: tableEntry.occurrences,
          status: tableEntry.status,
        });
      }
    });

    return newTableData;
  }, [showAdditionalItems, tableData]);

  const filteredTableData: InventoryTableData[] = useMemo(() => {
    return filterItemData(reducedTableData, statusFilter, textFilter);
  }, [reducedTableData, statusFilter, textFilter]);

  const allColumns: ColumnDef<InventoryTableData>[] = useMemo(() => {
    if (!showAdditionalItems) return columns;
    const additionalColumns: ColumnDef<InventoryTableData>[] = [];

    const numberOfAdditionalItems = filteredTableData.reduce((maxAdditionalItems, obj) => {
      return Math.max(maxAdditionalItems, obj.items.length - 1);
    }, 0);

    for (let index = 0; index < numberOfAdditionalItems; index++) {
      additionalColumns.push(
        inventoryAdditionalItemColumn(
          additionalItemsLabels?.tableHeaders?.[index] || 'Additional Item',
          index,
        ),
      );
    }

    return [...additionalColumns, ...columns];
  }, [additionalItemsLabels?.tableHeaders, columns, filteredTableData, showAdditionalItems]);

  useEffect(() => {
    setSelectedItem([]);
  }, [filteredTableData]);

  const rowClickHandler = (
    row: RowContents<InventoryTableData>,
    table: TableContents<InventoryTableData>,
  ) => {
    table.setRowSelection(() => {
      const newSelection: RowSelectionState = {};
      newSelection[row.index] = true;
      return newSelection;
    });

    setSelectedItem(row.original.items);
  };

  const handleScopeChange = (value: string) => {
    if (value === 'book' || value === 'chapter' || value === 'verse') {
      onScopeChange(value);
    } else {
      throw new Error(`Invalid scope value: ${value}`);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    if (value === 'all' || value === 'approved' || value === 'unapproved' || value === 'unknown') {
      setStatusFilter(value);
    } else {
      throw new Error(`Invalid status filter value: ${value}`);
    }
  };

  return (
    <div className="pr-twp tw-flex tw-h-full tw-flex-col">
      <div className="tw-flex tw-items-stretch">
        <Select
          onValueChange={(value) => handleStatusFilterChange(value)}
          defaultValue={statusFilter}
        >
          <SelectTrigger className="tw-m-1">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{allItemsText}</SelectItem>
            <SelectItem value="approved">{approvedItemsText}</SelectItem>
            <SelectItem value="unapproved">{unapprovedItemsText}</SelectItem>
            <SelectItem value="unknown">{unknownItemsText}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleScopeChange(value)} defaultValue={scope}>
          <SelectTrigger className="tw-m-1">
            <SelectValue placeholder="Select scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">{scopeBookText}</SelectItem>
            <SelectItem value="chapter">{scopeChapterText}</SelectItem>
            <SelectItem value="verse">{scopeVerseText}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="tw-m-1 tw-rounded-md tw-border"
          placeholder={filterText}
          value={textFilter}
          onChange={(event) => {
            setTextFilter(event.target.value);
          }}
        />
        {showAdditionalItemsControl && (
          <div className="tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border">
            <Checkbox
              className="tw-m-1"
              checked={showAdditionalItems}
              onCheckedChange={(checked: boolean) => {
                setSelectedItem([]);
                setShowAdditionalItems(checked);
              }}
            />
            <Label className="tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap">
              {additionalItemsLabels?.checkboxText ?? 'Show Related Items'}
            </Label>
          </div>
        )}
      </div>
      <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
        <DataTable
          columns={allColumns}
          data={filteredTableData}
          onRowClickHandler={rowClickHandler}
          stickyHeader
        />
      </div>
      {selectedItem[0] !== '' && (
        <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <OccurrencesTable
            tableData={filteredTableData}
            selectedItem={selectedItem}
            setScriptureReference={setScriptureReference}
            localizedStrings={localizedStrings}
          />
        </div>
      )}
    </div>
  );
}
