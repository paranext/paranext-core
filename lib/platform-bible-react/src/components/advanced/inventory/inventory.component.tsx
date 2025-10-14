import {
  ColumnDef,
  DataTable,
  RowContents,
  RowSelectionState,
  TableContents,
} from '@/components/advanced/data-table/data-table.component';
import { OccurrencesTable } from '@/components/advanced/inventory/occurrences-table.component';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Scope } from '@/components/utils/scripture.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { deepEqual, isString, LocalizedStringValue } from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';
import { inventoryAdditionalItemColumn } from './inventory-columns';
import {
  getStatusForItem,
  InventoryItemOccurrence,
  InventoryTableData,
  Status,
} from './inventory-utils';

/** Represents an item in the inventory with associated text and verse reference. */
export type InventoryItem = {
  /**
   * The label by which the item is shown in the inventory (e.g. the word that is repeated in case
   * of the Repeated Words check). It serves as a unique identifier for the item. It usually is a
   * string, but can be a string[] when there are multiple defining attributes (e.g. when 'show
   * preceding marker' is enabled for the Markers Inventory, the preceding marker will be stored as
   * the second item in the array)
   */
  inventoryText: string | string[];
  /** The snippet of scripture where this occurrence of the `inventoryItem` is found */
  verse: string;
  /** The reference to the location where the `verse` can be found in scripture */
  verseRef: SerializedVerseRef;
  /**
   * Offset used to locate the `inventoryText` (or inventoryText[0] in case of an array) in the
   * `verse` string
   */
  offset: number;
};

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
  '%webView_inventory_show_additional_items%',
  '%webView_inventory_occurrences_table_header_reference%',
  '%webView_inventory_occurrences_table_header_occurrence%',
  '%webView_inventory_no_results%',
] as const);

export type InventoryLocalizedStrings = {
  [localizedInventoryKey in (typeof INVENTORY_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/** Status values that the status filter can select from */
type StatusFilter = Status | 'all';

/** Text labels for the inventory columns and the control components of additional inventory items */
type AdditionalItemsLabels = {
  checkboxText?: string;
  tableHeaders?: string[];
};

/**
 * Filters data that is shown in the DataTable section of the Inventory
 *
 * @param itemData All inventory items and their related information
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

/**
 * Turns array of strings into array of inventory items, along with their count and status. The
 * approvedItems and unapprovedItems arrays are used to determine the status of each item, by
 * matching them to the `inventoryText` of the InventoryItem.
 *
 * @param inventoryItems Detailed information on the items that are to be shown in the inventory
 * @param approvedItems Array of approved items, typically as defined in `Settings.xml`
 * @param unapprovedItems Array of unapproved items, typically as defined in `Settings.xml`
 * @returns Array of inventory items, along with their count and status
 */
const processInventoryItems = (
  inventoryItems: InventoryItem[],
  approvedItems: string[],
  unapprovedItems: string[],
): InventoryTableData[] => {
  const tableData: InventoryTableData[] = [];

  inventoryItems.forEach((item) => {
    const existingItem = tableData.find((tableEntry) =>
      deepEqual(
        tableEntry.items,
        isString(item.inventoryText) ? [item.inventoryText] : item.inventoryText,
      ),
    );

    if (existingItem) {
      existingItem.count += 1;
      existingItem.occurrences.push({
        reference: item.verseRef,
        text: item.verse,
      });
    } else {
      const newItem: InventoryTableData = {
        items: isString(item.inventoryText) ? [item.inventoryText] : item.inventoryText,
        count: 1,
        status: getStatusForItem(
          isString(item.inventoryText) ? item.inventoryText : item.inventoryText[0],
          approvedItems,
          unapprovedItems,
        ),
        occurrences: [
          {
            reference: item.verseRef,
            text: item.verse,
          },
        ],
      };
      tableData.push(newItem);
    }
  });

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

/** Props for the Inventory component */
type InventoryProps = {
  /** The inventory items that the inventory should be populated with */
  inventoryItems: InventoryItem[] | undefined;
  /** Callback function that is executed when the scripture reference is changed */
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  /**
   * Object with all localized strings that the Inventory needs to work well across multiple
   * languages. When using this component with Platform.Bible, you can import
   * `INVENTORY_STRING_KEYS` from this library, pass it in to the Platform's localization hook, and
   * pass the localized keys that are returned by the hook into this prop.
   */
  localizedStrings: InventoryLocalizedStrings;
  /**
   * Text labels for control elements and additional column headers in case your Inventory has more
   * than one item to show (e.g. The 'Preceding Marker' in the Markers Inventory)
   */
  additionalItemsLabels?: AdditionalItemsLabels;
  /** Array of approved items, typically as defined in `Settings.xml` */
  approvedItems: string[];
  /** Array of unapproved items, typically as defined in `Settings.xml` */
  unapprovedItems: string[];
  /** Scope of scripture that the inventory will operate on */
  scope: Scope;
  /** Callback function that is executed when the scope is changed from the Inventory */
  onScopeChange: (scope: Scope) => void;
  /**
   * Column definitions for the Inventory data table. The most commonly used column definitions are
   * pre-configured for your convenience and can be imported (e.g. inventoryItemColumn,
   * inventoryAdditionalItemColumn inventoryCountColumn, and inventoryStatusColumn). If you need any
   * other columns you can add these yourself
   */
  columns: ColumnDef<InventoryTableData>[];
  /** Unique identifier for the Inventory component */
  id?: string;
  /** Whether the inventory items are still loading */
  areInventoryItemsLoading?: boolean;
};

/** Inventory component that is used to view and control the status of provided project settings */
export function Inventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  additionalItemsLabels,
  approvedItems,
  unapprovedItems,
  scope,
  onScopeChange,
  columns,
  id,
  areInventoryItemsLoading = false,
}: InventoryProps) {
  const allItemsText = localizeString(localizedStrings, '%webView_inventory_all%');
  const approvedItemsText = localizeString(localizedStrings, '%webView_inventory_approved%');
  const unapprovedItemsText = localizeString(localizedStrings, '%webView_inventory_unapproved%');
  const unknownItemsText = localizeString(localizedStrings, '%webView_inventory_unknown%');
  const scopeBookText = localizeString(localizedStrings, '%webView_inventory_scope_currentBook%');
  const scopeChapterText = localizeString(localizedStrings, '%webView_inventory_scope_chapter%');
  const scopeVerseText = localizeString(localizedStrings, '%webView_inventory_scope_verse%');
  const filterText = localizeString(localizedStrings, '%webView_inventory_filter_text%');
  const showAdditionalItemsText = localizeString(
    localizedStrings,
    '%webView_inventory_show_additional_items%',
  );
  const noResultsText = localizeString(localizedStrings, '%webView_inventory_no_results%');

  const [showAdditionalItems, setShowAdditionalItems] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const tableData: InventoryTableData[] = useMemo(() => {
    const safeInventoryItems = inventoryItems ?? [];
    if (safeInventoryItems.length === 0) return [];
    return processInventoryItems(safeInventoryItems, approvedItems, unapprovedItems);
  }, [inventoryItems, approvedItems, unapprovedItems]);

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
    if (reducedTableData.length === 0) return [];
    return filterItemData(reducedTableData, statusFilter, textFilter);
  }, [reducedTableData, statusFilter, textFilter]);

  const allColumns: ColumnDef<InventoryTableData>[] = useMemo(() => {
    if (!showAdditionalItems) return columns;

    const numberOfAdditionalItems = additionalItemsLabels?.tableHeaders?.length;
    if (!numberOfAdditionalItems) return columns;

    const additionalColumns: ColumnDef<InventoryTableData>[] = [];

    for (let index = 0; index < numberOfAdditionalItems; index++) {
      additionalColumns.push(
        inventoryAdditionalItemColumn(
          additionalItemsLabels?.tableHeaders?.[index] || 'Additional Item',
          index + 1,
        ),
      );
    }

    return [...additionalColumns, ...columns];
  }, [additionalItemsLabels?.tableHeaders, columns, showAdditionalItems]);

  useEffect(() => {
    if (filteredTableData.length === 0) {
      setSelectedItem([]);
    } else if (filteredTableData.length === 1) {
      setSelectedItem(filteredTableData[0].items);
    }
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

  const occurrenceData: InventoryItemOccurrence[] = useMemo(() => {
    if (reducedTableData.length === 0 || selectedItem.length === 0) return [];
    const occurrence = reducedTableData.filter((tableEntry: InventoryTableData) => {
      return deepEqual(
        showAdditionalItems ? tableEntry.items : [tableEntry.items[0]],
        selectedItem,
      );
    });
    if (occurrence.length > 1) throw new Error('Selected item is not unique');
    if (occurrence.length === 0) return [];
    return occurrence[0].occurrences;
  }, [selectedItem, showAdditionalItems, reducedTableData]);

  return (
    <div id={id} className="pr-twp tw-flex tw-h-full tw-flex-col">
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
        {additionalItemsLabels && (
          <div className="tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border">
            <Checkbox
              className="tw-m-1"
              checked={showAdditionalItems}
              onCheckedChange={(checked: boolean) => {
                setShowAdditionalItems(checked);
              }}
            />
            <Label className="tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap">
              {additionalItemsLabels?.checkboxText ?? showAdditionalItemsText}
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
          isLoading={areInventoryItemsLoading}
          noResultsMessage={noResultsText}
        />
      </div>
      {occurrenceData.length > 0 && (
        <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <OccurrencesTable
            occurrenceData={occurrenceData}
            setScriptureReference={setVerseRef}
            localizedStrings={localizedStrings}
          />
        </div>
      )}
    </div>
  );
}

export default Inventory;
