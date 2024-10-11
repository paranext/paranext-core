import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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
  SortDirection,
  TableContents,
} from '@/components/advanced/data-table/data-table.component';
import OccurrencesTable from '@/components/advanced/inventory/occurrences-table.component';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

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

export type Scope = 'book' | 'chapter' | 'verse';

export type Status = 'approved' | 'unapproved' | 'unknown';

export type StatusFilter = Status | 'all';

export type ItemData = {
  item: string;
  count: number;
  status: Status;
};

/**
 * Gets an icon that indicates the current sorting direction based on the provided input
 *
 * @param sortDirection Sorting direction. Can be ascending ('asc'), descending ('desc') or false (
 *   i.e. not sorted)
 * @returns The appropriate sorting icon for the provided sorting direction
 */
export const getSortingIcon = (sortDirection: false | SortDirection): ReactNode => {
  if (sortDirection === 'asc') {
    return <ArrowUpIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
  }
  if (sortDirection === 'desc') {
    return <ArrowDownIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
  }
  return <ArrowUpDownIcon className="tw-ms-2 tw-h-4 tw-w-4" />;
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
  itemData: ItemData[],
  statusFilter: StatusFilter,
  textFilter: string,
): ItemData[] => {
  let filteredItemData: ItemData[] = itemData;

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

/**
 * Turns array of strings into array of inventory items, along with their count and status
 *
 * @param items String array that contains inventory items
 * @param getStatusForItem Function that gets status for inventory item from related project
 *   settings
 * @returns Array of inventory items, along with their count and status
 */
const convertToItemData = (
  items: string[],
  getStatusForItem: (item: string) => Status,
): ItemData[] => {
  const itemData: ItemData[] = [];

  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    const item = items[itemIndex];
    const existingItem = itemData.find((entry) => {
      return entry.item === item;
    });
    if (existingItem) {
      existingItem.count += 1;
    } else {
      const newItem: ItemData = {
        item,
        count: 1,
        status: getStatusForItem(item),
      };
      itemData.push(newItem);
    }
  }

  return itemData;
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
  items: string[];
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  getColumns: (
    onStatusChange: (newItems: string[], status: Status) => void,
  ) => ColumnDef<ItemData>[];
};

/** Inventory component that is used to view and control the status of provided project settings */
export default function Inventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  items,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  scope,
  onScopeChange,
  getColumns,
}: InventoryProps) {
  const allItemsText = localizeString(localizedStrings, '%webView_inventory_all%');
  const approvedItemsText = localizeString(localizedStrings, '%webView_inventory_approved%');
  const unapprovedItemsText = localizeString(localizedStrings, '%webView_inventory_unapproved%');
  const unknownItemsText = localizeString(localizedStrings, '%webView_inventory_unknown%');
  const scopeBookText = localizeString(localizedStrings, '%webView_inventory_scope_currentBook%');
  const scopeChapterText = localizeString(localizedStrings, '%webView_inventory_scope_chapter%');
  const scopeVerseText = localizeString(localizedStrings, '%webView_inventory_scope_verse%');
  const filterText = localizeString(localizedStrings, '%webView_inventory_filter_text%');

  const [itemData, setItemData] = useState<ItemData[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const statusChangeHandler = useCallback(
    (changedItems: string[], status: Status) => {
      setItemData((prevTableData) => {
        let tableData: ItemData[] = [];
        changedItems.forEach((item) => {
          tableData = prevTableData.map((tableEntry) => {
            if (tableEntry.item === item && tableEntry.status !== status)
              return { ...tableEntry, status };
            return tableEntry;
          });
        });
        return tableData;
      });

      let newApprovedItems: string[] = [...approvedItems];
      changedItems.forEach((item) => {
        if (status === 'approved') {
          if (!newApprovedItems.includes(item)) {
            newApprovedItems.push(item);
          }
        } else {
          newApprovedItems = newApprovedItems.filter((validItem) => validItem !== item);
        }
      });
      onApprovedItemsChange(newApprovedItems);

      let newUnapprovedItems: string[] = [...unapprovedItems];
      changedItems.forEach((item) => {
        if (status === 'unapproved') {
          if (!newUnapprovedItems.includes(item)) {
            newUnapprovedItems.push(item);
          }
        } else {
          newUnapprovedItems = newUnapprovedItems.filter(
            (unapprovedItem) => unapprovedItem !== item,
          );
        }
      });
      onUnapprovedItemsChange(newUnapprovedItems);
    },
    [approvedItems, onApprovedItemsChange, unapprovedItems, onUnapprovedItemsChange],
  );

  const getStatusForItem = useCallback(
    (item: string): Status => {
      if (approvedItems.includes(item)) return 'approved';
      if (unapprovedItems.includes(item)) return 'unapproved';
      return 'unknown';
    },
    [approvedItems, unapprovedItems],
  );

  useEffect(() => {
    if (!text) return;
    setItemData(convertToItemData(items, getStatusForItem));
  }, [items, text, getStatusForItem]);

  const filteredItemData = useMemo(() => {
    return filterItemData(itemData, statusFilter, textFilter);
  }, [itemData, statusFilter, textFilter]);

  useEffect(() => {
    setSelectedItem('');
  }, [filteredItemData]);

  const rowClickHandler = (row: RowContents<ItemData>, table: TableContents<ItemData>) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    setSelectedItem(row.getValue('item'));
  };

  const columns = useMemo(() => getColumns(statusChangeHandler), [getColumns, statusChangeHandler]);

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
      <div className="tw-flex">
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
      </div>
      <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
        <DataTable
          columns={columns}
          data={filteredItemData}
          onRowClickHandler={rowClickHandler}
          stickyHeader
        />
      </div>
      {selectedItem !== '' && (
        <div className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <OccurrencesTable
            selectedItem={selectedItem}
            text={text}
            items={items}
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
