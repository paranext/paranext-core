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
import {
  createTableData,
  InventoryItem,
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
  extractItems: (text: string) => InventoryItem[];
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
  extractItems,
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
  const [selectedItem, setSelectedItem] = useState<InventoryItem>({ item: '' });

  const tableData: InventoryTableData[] = useMemo(() => {
    if (!text) return [];
    return createTableData(
      text,
      scriptureReference,
      approvedItems,
      unapprovedItems,
      extractItems,
      showRelatedItems,
    );
  }, [text, scriptureReference, approvedItems, unapprovedItems, extractItems, showRelatedItems]);

  const showRelatedItemsControl: boolean = useMemo(() => {
    return tableData.some((tableEntry: InventoryTableData) => tableEntry.relatedItem !== undefined);
  }, [tableData]);

  const allColumns: ColumnDef<InventoryTableData>[] = useMemo(() => {
    if (!showRelatedItems) return columns;
    return [inventoryRelatedItemColumn(showRelatedItemsTableHeader ?? 'Related Item'), ...columns];
  }, [columns, showRelatedItems, showRelatedItemsTableHeader]);

  const filteredTableData = useMemo(() => {
    return filterItemData(tableData, statusFilter, textFilter);
  }, [tableData, statusFilter, textFilter]);

  useEffect(() => {
    setSelectedItem({ item: '' });
  }, [filteredTableData]);

  const rowClickHandler = (
    row: RowContents<InventoryTableData>,
    table: TableContents<InventoryTableData>,
  ) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    setSelectedItem({
      item: row.getValue('item'),
      relatedItem: showRelatedItems ? row.getValue('relatedItem') : undefined,
    });
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
      {selectedItem.item !== '' && (
        <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <OccurrencesTable
            tableData={filteredTableData}
            selectedItem={selectedItem}
            showRelatedItems={showRelatedItems}
            setScriptureReference={setScriptureReference}
            localizedStrings={localizedStrings}
          />
        </div>
      )}
    </div>
  );
}
