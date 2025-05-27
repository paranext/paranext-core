import { ColumnDef } from '@/components/advanced/data-table/data-table.component';
import {
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from '@/components/advanced/inventory/inventory-columns';
import { InventoryTableData } from '@/components/advanced/inventory/inventory-utils';
import {
  Inventory,
  InventoryItem,
  Scope,
} from '@/components/advanced/inventory/inventory.component';
import { defaultScrRef } from 'platform-bible-utils';
import { useState } from 'react';

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

const sampleInventoryItems: InventoryItem[] = [
  {
    inventoryText: 'well',
    verse: 'In the beginning God created the heavens and the earth.',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    offset: 0,
  },
  {
    inventoryText: 'he',
    verse:
      'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 2 },
    offset: 4,
  },
  {
    inventoryText: 'for',
    verse: 'And God said, "Let there be light," and there was light.',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 3 },
    offset: 8,
  },
  {
    inventoryText: 'of',
    verse: 'God saw that the light was good, and he separated the light from the darkness.',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 4 },
    offset: 12,
  },
  {
    inventoryText: 'the',
    verse:
      'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 5 },
    offset: 0,
  },
];

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
  const [, setScrRef] = useState(defaultScrRef);
  const [approvedItems, setApprovedItems] = useState<string[]>(['well', 'he']);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['for', 'of']);
  const [scope, setScope] = useState<Scope>('book');

  return (
    <div>
      <Inventory
        inventoryItems={sampleInventoryItems}
        setVerseRef={setScrRef}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        scope={scope}
        onScopeChange={setScope}
        columns={createColumns(
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
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
