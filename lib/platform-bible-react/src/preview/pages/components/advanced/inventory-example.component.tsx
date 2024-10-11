import { ColumnDef } from '@/components/advanced/data-table/data-table.component';
import {
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from '@/components/advanced/inventory/inventory-columns';
import Inventory, {
  ItemData,
  Scope,
  Status,
} from '@/components/advanced/inventory/inventory.component';
import { ScriptureReference } from 'platform-bible-utils';
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
  '%webView_inventory_occurrences_table_header_occurrence%': 'Occurrence',
  '%webView_inventory_occurrences_table_header_reference%': 'Reference',
  '%webView_inventory_scope_currentBook%': 'Current book',
  '%webView_inventory_scope_chapter%': 'Current chapter',
  '%webView_inventory_scope_verse%': 'Current verse',
  '%webView_inventory_unapproved%': 'Unapproved items',
  '%webView_inventory_unknown%': 'Unknown items',
};

const createColumns = (
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
  inventoryItemColumn('Item'),
  inventoryCountColumn('Count'),
  inventoryStatusColumn('Status', statusChangeHandler),
];

const extractItems = (text: string, target: string | undefined = undefined): string[] => {
  // Finds repeated words, and captures the first occurrence of the word
  const repeatedWords = text.match(/\b(\p{L}+)\b(?= \b\1\b)/gu) || [];

  if (target) return repeatedWords?.filter((word) => word === target);

  return repeatedWords;
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
        onApprovedItemsChange={setApprovedItems}
        unapprovedItems={unapprovedItems}
        onUnapprovedItemsChange={setUnapprovedItems}
        scope={scope}
        onScopeChange={setScope}
        text={scriptureSnippet}
        getColumns={createColumns}
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
