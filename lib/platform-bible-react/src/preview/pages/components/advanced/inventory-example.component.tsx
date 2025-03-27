import { ColumnDef } from '@/components/advanced/data-table/data-table.component';
import {
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from '@/components/advanced/inventory/inventory-columns';
import { InventoryTableData } from '@/components/advanced/inventory/inventory-utils';
import { Inventory, Scope } from '@/components/advanced/inventory/inventory.component';
import { defaultScrRef } from 'platform-bible-utils';
import { useState } from 'react';
import { scriptureSnippet } from './scripture-snippet';

const localizedStrings = {
  '%webView_inventory_all%': 'All items',
  '%webView_inventory_approved%': 'Approved items',
  '%webView_inventory_filter_text%': 'Filter text...',
  '%webView_inventory_show_additional_items%': 'Show Additional Items',
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

export function InventoryExample() {
  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [approvedItems, setApprovedItems] = useState<string[]>(['well', 'he']);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['for', 'of']);
  const [scope, setScope] = useState<Scope>('book');

  return (
    <div>
      <Inventory
        verseRef={scrRef}
        setVerseRef={setScrRef}
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
        // Matches a sequence of letters surrounded by word boundaries followed by that exact same
        // sequence of letters surrounded by word boundaries
        extractItems={/\b(\p{L}+)\b(?=\s\b\1\b)/gu}
        additionalItemsLabels={{
          checkboxText: 'additional header',
          tableHeaders: ['additional header'],
        }}
      />
      Approved items:
      <ul>
        {approvedItems.map((item) => {
          return <li key={item}>- {item}</li>;
        })}
      </ul>
      Unapproved items:
      <ul>
        {unapprovedItems.map((item) => {
          return <li key={item}>- {item}</li>;
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
