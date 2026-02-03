import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inventory, InventoryItem } from '@/components/advanced/inventory/inventory.component';
import {
  getInventoryHeader,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from '@/components/advanced/inventory/inventory-columns';
import { InventoryTableData } from '@/components/advanced/inventory/inventory-utils';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ColumnDef } from '@tanstack/react-table';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Scope } from '@/components/utils/scripture.util';
import { useState } from 'react';

const localizedStrings = {
  '%webView_inventory_all%': 'All items',
  '%webView_inventory_approved%': 'Approved items',
  '%webView_inventory_unapproved%': 'Unapproved items',
  '%webView_inventory_unknown%': 'Unknown items',
  '%webView_inventory_filter_text%': 'Filter text...',
  '%webView_inventory_show_additional_items%': 'Show Additional Items',
  '%webView_inventory_occurrences_table_header_occurrence%': 'Occurrence',
  '%webView_inventory_occurrences_table_header_reference%': 'Reference',
  '%webView_inventory_scope_currentBook%': 'Current book',
  '%webView_inventory_scope_chapter%': 'Current chapter',
  '%webView_inventory_scope_verse%': 'Current verse',
};

const sampleInventoryItems: InventoryItem[] = [
  {
    inventoryText: 'the the',
    verse: 'In the the beginning was the Word',
    verseRef: { book: 'JHN', chapterNum: 1, verseNum: 1 },
    offset: 7,
  },
  {
    inventoryText: 'and and',
    verse: 'And and God said, Let there be light',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 3 },
    offset: 4,
  },
  {
    inventoryText: 'is is',
    verse: 'God is is good and merciful',
    verseRef: { book: 'PSA', chapterNum: 25, verseNum: 8 },
    offset: 4,
  },
  {
    inventoryText: 'word  word',
    verse: 'Every word  word has meaning',
    verseRef: { book: 'MAT', chapterNum: 4, verseNum: 4 },
    offset: 6,
  },
];

const defaultScope: Scope = 'book';

const createColumns = (
  itemLabel: string,
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn(itemLabel),
  inventoryCountColumn(countLabel),
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

const meta: Meta<typeof Inventory> = {
  title: 'Advanced/Inventory',
  component: Inventory,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Inventory>;

export const Default: Story = {
  render: () => {
    const [approvedItems, setApprovedItems] = useState<string[]>(['the the']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['and and', 'word  word']);

    return (
      <Inventory
        inventoryItems={sampleInventoryItems}
        setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        scope={defaultScope}
        onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)}
        columns={createColumns(
          'Item',
          'Count',
          'Status',
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A complete inventory component for reviewing and managing translation checking items.',
      },
    },
  },
};

export const RepeatedWords: Story = {
  render: () => {
    const repeatedWordsItems: InventoryItem[] = [
      {
        inventoryText: 'the the',
        verse: 'In the the beginning was the Word',
        verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        offset: 7,
      },
      {
        inventoryText: 'and and',
        verse: 'And and God said, Let there be light',
        verseRef: { book: 'GEN', chapterNum: 1, verseNum: 3 },
        offset: 4,
      },
      {
        inventoryText: 'is is',
        verse: 'God is is good and merciful',
        verseRef: { book: 'PSA', chapterNum: 25, verseNum: 8 },
        offset: 4,
      },
    ];

    const [approvedItems, setApprovedItems] = useState<string[]>(['and and']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['the the', 'is is']);

    return (
      <Inventory
        inventoryItems={repeatedWordsItems}
        setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        scope="chapter"
        onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)}
        columns={createColumns(
          'Repeated Words',
          'Count',
          'Status',
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component specifically configured for repeated words checking.',
      },
    },
  },
};

function getDescription(markerDescriptions: string[], marker: string): string | undefined {
  // Search for whole marker surrounded by whitespace or periods or at string boundaries (^ and $)
  const findMarker = new RegExp(`(^|[\\s.])${marker}([\\s.]|$)`);
  return markerDescriptions.find((markerDescription) => findMarker.test(markerDescription));
}

const markerNames: string[] = [
  'xt - Cross Reference - Target References',
  'toc2 - File - Short Table of Contents Text',
  'fig - Auxiliary - Figure/Illustration/Map',
  'f - Footnote',
  'fq - Footnote - Footnote Translation Quotation',
];

const createMarkerColumns = (
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  inventoryItemColumn('Marker'),
  inventoryCountColumn('Count'),
  {
    accessorKey: 'styleName',
    accessorFn: (row) => getDescription(markerNames, row.items[0]) || 'unknownMarkerLabel',
    header: ({ column }) => getInventoryHeader(column, 'Style Name'),
    cell: ({ row }) => {
      const marker: string = row.getValue('item');
      return getDescription(markerNames, marker) || 'unknownMarkerLabel';
    },
  },
  inventoryStatusColumn(
    'Status',
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

export const MarkersInventory: Story = {
  render: () => {
    const markersItems: InventoryItem[] = [
      {
        inventoryText: ['xt', 'p'],
        verse: 'In the beginning God created the heavens and the earth.',
        verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        offset: 7,
      },
      {
        inventoryText: ['f', 'v'],
        verse: 'And God said, "Let there be light," and there was light.',
        verseRef: { book: 'GEN', chapterNum: 1, verseNum: 3 },
        offset: 4,
      },
      {
        inventoryText: ['toc2', 'c'],
        verse: 'The LORD is good and upright; therefore he instructs sinners in his ways.',
        verseRef: { book: 'PSA', chapterNum: 25, verseNum: 8 },
        offset: 4,
      },
      {
        inventoryText: ['fig', 'p'],
        verse: 'God blessed them and said to them, "Be fruitful and increase in number."',
        verseRef: { book: 'GEN', chapterNum: 1, verseNum: 28 },
        offset: 4,
      },
    ];

    const [approvedItems, setApprovedItems] = useState<string[]>(['xt']);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['f']);

    return (
      <Inventory
        inventoryItems={markersItems}
        setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        additionalItemsLabels={{
          checkboxText: 'Show Preceding Markers',
          tableHeaders: ['Preceding Markers'],
        }}
        scope="chapter"
        onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)}
        columns={createMarkerColumns(
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component for checking markers.',
      },
    },
  },
};

export const EmptyInventory: Story = {
  render: () => {
    const [approvedItems, setApprovedItems] = useState<string[]>([]);
    const [unapprovedItems, setUnapprovedItems] = useState<string[]>([]);

    return (
      <Inventory
        inventoryItems={[]}
        setVerseRef={(ref: SerializedVerseRef) => console.log('Set verse ref:', ref)}
        localizedStrings={localizedStrings}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        scope={defaultScope}
        onScopeChange={(scope: Scope) => console.log('Scope changed:', scope)}
        columns={createColumns(
          'Item',
          'Count',
          'Status',
          approvedItems,
          setApprovedItems,
          unapprovedItems,
          setUnapprovedItems,
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory component with no items to display.',
      },
    },
  },
};
