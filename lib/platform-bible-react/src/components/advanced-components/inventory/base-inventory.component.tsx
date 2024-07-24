import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageStrings, ScriptureReference } from 'platform-bible-utils';
import { Input } from '@/components/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { ColumnDef } from '@/components/advanced-components/data-table/data-table.component';
import InventoryDataTable from '@/components/advanced-components/inventory/subcomponents/inventory-data-table.component';
import OccurrencesTable from '@/components/advanced-components/inventory/subcomponents/occurrences-table.component';
import { ItemData, Status } from './types';

const filterItemData = (
  items: ItemData[],
  statusFilter: string,
  textFilter: string,
): ItemData[] => {
  let filteredItemData: ItemData[] = items;

  if (statusFilter !== 'all') {
    filteredItemData = filteredItemData.filter(
      (item) =>
        (statusFilter === 'approved' && item.status === true) ||
        (statusFilter === 'unapproved' && item.status === false) ||
        (statusFilter === 'unknown' && item.status === undefined),
    );
  }

  if (textFilter !== '')
    filteredItemData = filteredItemData.filter((item) => item.item.includes(textFilter));

  return filteredItemData;
};

const convertTextToItemData = (
  text: string,
  getInventoryItems: (text: string) => string[],
  getStatusForItem: (item: string) => Status,
): ItemData[] => {
  const itemData: ItemData[] = [];

  const items: string[] = getInventoryItems(text);

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

interface InventoryProps {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  extractItems: (text: string, item?: string | undefined) => string[];
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  scope: string;
  onScopeChange: (scope: string) => void;
  columns: (onStatusChange: (newItems: string[], status: Status) => void) => ColumnDef<ItemData>[];
}

function BaseInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  extractItems,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  scope,
  onScopeChange,
  columns,
}: InventoryProps) {
  const allItemsText = localizedStrings['%webView_inventory_all%'];
  const approvedItemsText = localizedStrings['%webView_inventory_approved%'];
  const unapprovedItemsText = localizedStrings['%webView_inventory_unapproved%'];
  const unknownItemsText = localizedStrings['%webView_inventory_unknown%'];
  const scopeBookText = localizedStrings['%webView_inventory_scope_book%'];
  const scopeChapterText = localizedStrings['%webView_inventory_scope_chapter%'];
  const scopeVerseText = localizedStrings['%webView_inventory_scope_verse%'];
  const filterText = localizedStrings['%webView_inventory_filter_text%'];

  const [items, setItems] = useState<ItemData[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const statusChangeHandler = (changedItems: string[], status: Status) => {
    setItems((prevTableData) => {
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
      if (status === true) {
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
      if (status === false) {
        if (!newUnapprovedItems.includes(item)) {
          newUnapprovedItems.push(item);
        }
      } else {
        newUnapprovedItems = newUnapprovedItems.filter((unapprovedItem) => unapprovedItem !== item);
      }
    });
    onUnapprovedItemsChange(newUnapprovedItems);
  };

  const getStatusForItem = useCallback(
    (item: string): Status => {
      if (approvedItems.includes(item)) return true;
      if (unapprovedItems.includes(item)) return false;
      return undefined;
    },
    [approvedItems, unapprovedItems],
  );

  useEffect(() => {
    if (!text) return;
    setItems(convertTextToItemData(text, extractItems, getStatusForItem));
  }, [extractItems, scriptureReference, text, getStatusForItem]);

  const filteredItemData = useMemo(() => {
    return filterItemData(items, statusFilter, textFilter);
  }, [items, statusFilter, textFilter]);

  return (
    <div className="pr-flex pr-h-full pr-flex-col">
      <div className="pr-flex">
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue={statusFilter}>
          <SelectTrigger className="pr-m-1">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="all">{allItemsText}</SelectItem>
            <SelectItem value="approved">{approvedItemsText}</SelectItem>
            <SelectItem value="unapproved">{unapprovedItemsText}</SelectItem>
            <SelectItem value="unknown">{unknownItemsText}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onScopeChange(value)} defaultValue={scope}>
          <SelectTrigger className="pr-m-1">
            <SelectValue placeholder="Select scope" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="book">{scopeBookText}</SelectItem>
            <SelectItem value="chapter">{scopeChapterText}</SelectItem>
            <SelectItem value="verse">{scopeVerseText}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="pr-m-1 pr-rounded-md pr-border"
          placeholder={filterText}
          value={textFilter}
          onChange={(event) => {
            setTextFilter(event.target.value);
          }}
        />
      </div>
      <div className="pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border">
        <InventoryDataTable
          columns={columns(statusChangeHandler)}
          tableData={filteredItemData}
          onSelectItem={(item: string) => {
            setSelectedItem(item);
          }}
        />
      </div>
      {selectedItem !== '' && (
        <div className="pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border">
          <OccurrencesTable
            selectedItem={selectedItem}
            text={text}
            extractItems={extractItems}
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

export default BaseInventory;
