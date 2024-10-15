import { ColumnDef } from '@/components/advanced/data-table/data-table.component';
import {
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from '@/components/advanced/inventory/inventory-columns';
import {
  InventoryItem,
  InventoryTableData,
  Scope,
} from '@/components/advanced/inventory/inventory-utils';
import Inventory from '@/components/advanced/inventory/inventory.component';
import { ScriptureReference, substring } from 'platform-bible-utils';
import { useState } from 'react';
import scriptureSnippet from './scripture-snippet';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

const localizedStrings = {
  '%webView_inventory_all%': 'All items',
  '%webView_inventory_approved%': 'Approved items',
  '%webView_inventory_filter_text%': 'Filter text...',
  '%webView_inventory_show_related_items%': 'Show Related Items',
  '%webView_inventory_occurrences_table_header_occurrence%': 'Occurrence',
  '%webView_inventory_occurrences_table_header_reference%': 'Reference',
  '%webView_inventory_scope_currentBook%': 'Current book',
  '%webView_inventory_scope_chapter%': 'Current chapter',
  '%webView_inventory_scope_verse%': 'Current verse',
  '%webView_inventory_unapproved%': 'Unapproved items',
  '%webView_inventory_unknown%': 'Unknown items',
};

const createColumns = (
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn('Item'),
  inventoryCountColumn('Count'),
  inventoryStatusColumn(
    'Status',
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

const extractItems = (text: string, target: string | undefined = undefined): InventoryItem[] => {
  // Finds repeated words, and captures the first occurrence of the word
  const repeatedWords = text.match(/\b(\p{L}+)\b(?= \b\1\b)/gu) || [];

  const inventoryItems: InventoryItem[] = [];
  repeatedWords.forEach((word) => {
    inventoryItems.push({ item: word, relatedItem: substring(word, 2) });
  });

  if (target) return inventoryItems?.filter((item) => item.item === target);

  return inventoryItems;
};

function InventoryExample() {
  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [approvedItems, setApprovedItems] = useState<string[]>(['well', 'he']);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['for', 'of']);
  const [scope, setScope] = useState<Scope>('book');

  return (
    <div>
      <Inventory
        scriptureReference={scrRef}
        setScriptureReference={setScrRef}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        scope={scope}
        onScopeChange={setScope}
        text={scriptureSnippet}
        columns={createColumns(
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
        items={extractItems(scriptureSnippet)}
      />
      Approved items:
      <ul>
        {approvedItems.map((item) => {
          return <li>- {item}</li>;
        })}
      </ul>
      Unapproved items:
      <ul>
        {unapprovedItems.map((item) => {
          return <li>- {item}</li>;
        })}
      </ul>
      <p>
        Note: This Inventory example works on some static scripture data, so the scope selector is
        not functional
      </p>
    </div>
  );
}

export default InventoryExample;
