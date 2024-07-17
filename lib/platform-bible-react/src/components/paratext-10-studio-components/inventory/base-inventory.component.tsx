import { useEffect, useState } from 'react';
import { LanguageStrings, ScriptureReference } from 'platform-bible-utils';
import { Input } from '@/components/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { ColumnDef } from '@tanstack/react-table';
import InventoryDataTable from './tables/inventory-data-table.component';
import OccurrencesTable from './tables/occurrences-table.component';
import { ItemData, Status } from './types';

const buildTableData = (
  items: string[],
  statusFilter: string,
  textFilter: string,
  approvedItems: string[],
  unapprovedItems: string[],
): ItemData[] => {
  const itemData: ItemData[] = [];
  items.forEach((item) => {
    if (textFilter !== '' && !item.includes(textFilter)) return;
    const characterDataPoint = itemData.find((dataPoint) => {
      return dataPoint.item === item;
    });
    if (characterDataPoint) {
      characterDataPoint.count += 1;
    } else {
      let status: Status;
      if (approvedItems.includes(item)) status = true;
      if (unapprovedItems.includes(item)) status = false;
      if (
        statusFilter === 'all' ||
        (statusFilter === 'approved' && status === true) ||
        (statusFilter === 'unapproved' && status === false) ||
        (statusFilter === 'unknown' && status === undefined)
      ) {
        const newCharacter: ItemData = {
          item,
          count: 1,
          status,
        };
        itemData.push(newCharacter);
      }
    }
  });

  return itemData;
};

export type ItemKeys =
  | 'validCharacters'
  | 'invalidCharacters'
  | 'repeatableWords'
  | 'nonRepeatableWords';

interface InventoryProps {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  projectId: string;
  getSetting: (itemSet: ItemKeys, projectId: string) => Promise<string[]>;
  setSetting: (itemSet: ItemKeys, projectId: string, items: string[]) => void;
  getText: (
    projectId: string,
    scriptureRef: ScriptureReference,
    scope: string,
  ) => Promise<string | undefined>;
  approvedItemsKey: ItemKeys;
  unapprovedItemsKey: ItemKeys;
  convertTextToItems: (text: string) => string[];
  columns: (onStatusChange: (newItems: string[], status: Status) => void) => ColumnDef<ItemData>[];
}

function BaseInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  projectId,
  getSetting,
  setSetting,
  getText,
  approvedItemsKey,
  unapprovedItemsKey,
  convertTextToItems,
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
  const [approvedItems, setApprovedItems] = useState<string[]>([]);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [scope, setScope] = useState<string>('book');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [inventoryTableData, setInventoryTableData] = useState<ItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const statusChangeHandler = (newItems: string[], status: Status) => {
    setInventoryTableData((prevTableData) => {
      let tableData: ItemData[] = [];
      newItems.forEach((item) => {
        tableData = prevTableData.map((tableEntry) => {
          if (tableEntry.item === item && tableEntry.status !== status)
            return { ...tableEntry, status };
          return tableEntry;
        });
      });

      setApprovedItems((prevApprovedItems) => {
        let newApprovedItems: string[] = [...prevApprovedItems];
        newItems.forEach((item) => {
          if (status === true) {
            if (!newApprovedItems.includes(item)) {
              newApprovedItems.push(item);
            }
          } else {
            newApprovedItems = newApprovedItems.filter((validItem) => validItem !== item);
          }
        });

        setSetting(approvedItemsKey, projectId, newApprovedItems);
        return newApprovedItems;
      });

      setUnapprovedItems((prevUnapprovedItems) => {
        let newUnapprovedItems: string[] = [...prevUnapprovedItems];
        newItems.forEach((item) => {
          if (status === false) {
            if (!newUnapprovedItems.includes(item)) {
              newUnapprovedItems.push(item);
            }
          } else {
            newUnapprovedItems = newUnapprovedItems.filter(
              (unapprovedItem) => unapprovedItem !== item,
            );
          }
        });

        setSetting(unapprovedItemsKey, projectId, newUnapprovedItems);
        return newUnapprovedItems;
      });

      return tableData;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApprovedItems(await getSetting(approvedItemsKey, projectId));
        setUnapprovedItems(await getSetting(unapprovedItemsKey, projectId));
      } catch (error) {
        throw new Error('Failed to fetch (un)approved items from project settings');
      }
    };

    fetchData();
  }, [projectId, getSetting, approvedItemsKey, unapprovedItemsKey]);

  useEffect(() => {
    const getNewText = async () => {
      try {
        const newText = await getText(projectId, scriptureReference, scope);
        setText(newText || '');
      } catch (error) {
        throw new Error('Failed getting scripture text');
      }
    };

    getNewText();
  }, [projectId, scriptureReference, scope, getText]);

  useEffect(() => {
    setItems(convertTextToItems(text));
  }, [convertTextToItems, text]);

  useEffect(() => {
    if (items.length === 0) {
      setInventoryTableData([]);
      return;
    }
    const buildData = () => {
      try {
        setInventoryTableData(
          buildTableData(items, statusFilter, textFilter, approvedItems, unapprovedItems),
        );
      } catch (error) {
        throw new Error('Failed building table data');
      }
    };

    buildData();
  }, [approvedItems, unapprovedItems, items, statusFilter, textFilter]);

  return (
    <div className="pr-twp pr-font-sans">
      <div className="pr-flex">
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="all">{allItemsText}</SelectItem>
            <SelectItem value="approved">{approvedItemsText}</SelectItem>
            <SelectItem value="unapproved">{unapprovedItemsText}</SelectItem>
            <SelectItem value="unknown">{unknownItemsText}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setScope(value)} defaultValue={scope}>
          <SelectTrigger>
            <SelectValue placeholder="Select scope" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="book">{scopeBookText}</SelectItem>
            <SelectItem value="chapter">{scopeChapterText}</SelectItem>
            <SelectItem value="verse">{scopeVerseText}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="pr-rounded-md pr-border"
          placeholder={filterText}
          value={textFilter}
          onChange={(event) => {
            setTextFilter(event.target.value);
          }}
        />
      </div>
      <div
        className={`pr-overflow-y-auto pr-rounded-md pr-border ${selectedItem !== '' && 'pr-max-h-96'}`}
      >
        <InventoryDataTable
          columns={columns(statusChangeHandler)}
          tableData={inventoryTableData}
          onSelectItem={(item: string) => {
            setSelectedItem(item);
          }}
        />
      </div>
      {selectedItem !== '' && (
        <div className="pr-mt-4 pr-rounded-md pr-border">
          <OccurrencesTable
            selectedItem={selectedItem}
            text={text}
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
