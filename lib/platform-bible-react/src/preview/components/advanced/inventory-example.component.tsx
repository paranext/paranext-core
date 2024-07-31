import Inventory, {
  getSortingIcon,
  ItemData,
  Status,
} from '@/components/advanced/inventory/inventory.component';
import { ScriptureReference } from 'platform-bible-utils';
import { useState } from 'react';
import { ColumnDef } from '@/components/advanced/data-table/data-table.component';
import { Button } from '@/components/shadcn-ui/button';
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
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
  '%webView_inventory_scope_book%': 'Current book',
  '%webView_inventory_scope_chapter%': 'Current chapter',
  '%webView_inventory_scope_verse%': 'Current verse',
  '%webView_inventory_unapproved%': 'Unapproved items',
  '%webView_inventory_unknown%': 'Unknown items',
};

const createColumns = (
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
  {
    accessorKey: 'item',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          Item
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          Count
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column, table }) => {
      const selectedRows = table.getSelectedRowModel().rows;

      const items: string[] = [];
      selectedRows.forEach((row) => {
        items.push(row.getValue('item'));
      });

      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => column.toggleSorting(undefined)}>
              Status
              {getSortingIcon(column.getIsSorted())}
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ margin: 2 }}>
              <CircleCheckIcon
                onClick={() => {
                  statusChangeHandler(items, 'approved');
                }}
              />
            </Button>
            <Button style={{ margin: 2 }}>
              <CircleXIcon
                onClick={() => {
                  statusChangeHandler(items, 'unapproved');
                }}
              />
            </Button>
            <Button style={{ margin: 2 }}>
              <CircleHelpIcon
                onClick={() => {
                  statusChangeHandler(items, 'unknown');
                }}
              />
            </Button>
          </div>
        </>
      );
    },
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      switch (status) {
        case 'approved':
          return <CircleCheckIcon />;
        case 'unapproved':
          return <CircleXIcon />;
        case 'unknown':
        default:
          return <CircleHelpIcon />;
      }
    },
  },
];

const extractItems = (text: string, target: string | undefined = undefined): string[] => {
  const repeatedWords: string[] = [];
  const words = text.split(/[\s]+/);
  words.forEach((word, index, allWords) => {
    if (target && word !== target) return;
    if (index + 1 < allWords.length && word === allWords[index + 1]) repeatedWords.push(word);
  });
  return repeatedWords;
};

function InventoryExample() {
  const [scrRef, setScrRef] = useState(defaultScrRef);
  const [approvedItems, setApprovedItems] = useState<string[]>(['well', 'he']);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(['for', 'of']);
  const [scope, setScope] = useState('book');

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
        extractItems={extractItems}
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
