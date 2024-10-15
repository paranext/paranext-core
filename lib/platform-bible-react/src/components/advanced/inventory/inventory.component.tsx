import { useEffect, useMemo, useState } from 'react';
import { LocalizedStringValue, ScriptureReference } from 'platform-bible-utils';
import { Input } from '@/components/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import DataTable, {
  ColumnDef,
  RowContents,
  TableContents,
} from '@/components/advanced/data-table/data-table.component';
import OccurrencesTable from '@/components/advanced/inventory/occurrences-table.component';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';
import { inventoryRelatedItemColumn } from './inventory-columns';
import { InventoryItem, InventoryTableData, Scope, Status, StatusFilter } from './inventory-utils';

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
    filteredItemData = filteredItemData.filter((item) => item.item.includes(textFilter));

  return filteredItemData;
};

const getStatusForItem = (
  item: string,
  approvedItems: string[],
  unapprovedItems: string[],
): Status => {
  if (approvedItems.includes(item)) return 'approved';
  if (unapprovedItems.includes(item)) return 'unapproved';
  return 'unknown';
};

/**
 * Turns array of strings into array of inventory items, along with their count and status
 *
 * @param inventoryItems String array that contains inventory items
 * @param getStatusForItem Function that gets status for inventory item from related project
 *   settings
 * @returns Array of inventory items, along with their count and status
 */
const convertToTableData = (
  inventoryItems: InventoryItem[],
  approvedItems: string[],
  unapprovedItems: string[],
  showRelatedItems: boolean,
): InventoryTableData[] => {
  const tableData: InventoryTableData[] = [];

  for (let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++) {
    const inventoryItem = inventoryItems[itemIndex];
    const existingItem = tableData.find((tableEntry) => {
      return showRelatedItems
        ? tableEntry.item === inventoryItem.item &&
            tableEntry.relatedItem === inventoryItem.relatedItem
        : tableEntry.item === inventoryItem.item;
    });
    if (existingItem) {
      existingItem.count += 1;
    } else {
      const newItem: InventoryTableData = {
        item: inventoryItem.item,
        relatedItem: showRelatedItems ? inventoryItem.relatedItem : undefined,
        count: 1,
        status: getStatusForItem(inventoryItem.item, approvedItems, unapprovedItems),
      };
      tableData.push(newItem);
    }
  }

  return tableData;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
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
  showRelatedItemsButtonText?: string;
  showRelatedItemsTableHeader?: string;
  items: InventoryItem[];
  approvedItems: string[];
  unapprovedItems: string[];
  text: string | undefined;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  columns: ColumnDef<InventoryTableData>[];
};

/** Inventory component that is used to view and control the status of provided project settings */
export default function Inventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  showRelatedItemsButtonText,
  showRelatedItemsTableHeader,
  items,
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

  const [showRelatedItems, setShowRelatedItems] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const showRelatedItemsControl: boolean = useMemo(() => {
    return items.some((item: InventoryItem) => item.relatedItem !== undefined);
  }, [items]);

  const tableData: InventoryTableData[] = useMemo(() => {
    if (!text) return [];
    return convertToTableData(items, approvedItems, unapprovedItems, showRelatedItems);
  }, [items, approvedItems, unapprovedItems, showRelatedItems, text]);

  const allColumns: ColumnDef<InventoryTableData>[] = useMemo(() => {
    if (!showRelatedItems) return columns;
    return [inventoryRelatedItemColumn(showRelatedItemsTableHeader ?? 'Related Item'), ...columns];
  }, [columns, showRelatedItems, showRelatedItemsTableHeader]);

  const filteredTableData = useMemo(() => {
    return filterItemData(tableData, statusFilter, textFilter);
  }, [tableData, statusFilter, textFilter]);

  useEffect(() => {
    setSelectedItem('');
  }, [filteredTableData]);

  const rowClickHandler = (
    row: RowContents<InventoryTableData>,
    table: TableContents<InventoryTableData>,
  ) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    setSelectedItem(row.getValue('item'));
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
        {showRelatedItemsControl && (
          <div className="tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border">
            <Checkbox
              className="tw-m-1"
              checked={showRelatedItems}
              onCheckedChange={(checked: boolean) => setShowRelatedItems(checked)}
            />
            <Label className="tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap">
              {showRelatedItemsButtonText ?? 'Show Related Items'}
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
      {selectedItem !== '' && (
        <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <OccurrencesTable
            selectedItem={selectedItem}
            text={text}
            items={[]} // Fix this
            scriptureReference={scriptureReference}
            setScriptureReference={(newScriptureReference) =>
              setScriptureReference(newScriptureReference)
            }
            localizedStrings={localizedStrings}
          />
        </div>
      )}
    </div>
  );
}
