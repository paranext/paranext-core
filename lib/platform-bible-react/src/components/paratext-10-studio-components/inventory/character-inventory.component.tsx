import { LanguageStrings, ScriptureReference, split } from 'platform-bible-utils';
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { ColumnDef } from '@/components/advanced-components/data-table/data-table.component';
import BaseInventory from './base-inventory.component';
import { ItemData, Status } from './types';
import { getSortingIcon } from './utils';

const buildColumns = (
  itemLabel: string,
  unicodeValueLabel: string,
  countLabel: string,
  statusLabel: string,
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
  {
    accessorKey: 'item',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          {itemLabel}
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'unicodeValue',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          {unicodeValueLabel}
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
    cell: ({ row }) => {
      const item: string = row.getValue('item');
      return item.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          {countLabel}
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
        <div>
          <div className="pr-flex pr-justify-center">
            <Button onClick={() => column.toggleSorting(undefined)}>
              {statusLabel}
              {getSortingIcon(column.getIsSorted())}
            </Button>
          </div>
          <div className="pr-flex pr-justify-center">
            <Button>
              <CircleCheckIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(items, true);
                }}
              />
            </Button>
            <Button>
              <CircleXIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(items, false);
                }}
              />
            </Button>
            <Button>
              <CircleHelpIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(items, undefined);
                }}
              />
            </Button>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const status: Status = row.getValue('status');
      if (status === true) {
        return <CircleCheckIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
      }
      if (status === false) {
        return <CircleXIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
      }
      return <CircleHelpIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
    },
  },
];

const convertTextToItems = (text: string): string[] => {
  return split(text, '');
};

interface CharacterInventoryProps {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  onScopeChange: (scope: string) => void;
}

function CharacterInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  onScopeChange,
}: CharacterInventoryProps) {
  const itemLabel = localizedStrings['%webView_inventory_table_header_character%'];
  const unicodeValueLabel = localizedStrings['%webView_inventory_table_header_unicode_value%'];
  const countLabel = localizedStrings['%webView_inventory_table_header_count%'];
  const statusLabel = localizedStrings['%webView_inventory_table_header_status%'];

  const columns = (onStatusChange: (newItems: string[], status: Status) => void) => {
    return buildColumns(itemLabel, unicodeValueLabel, countLabel, statusLabel, onStatusChange);
  };

  return (
    <div className="pr-twp">
      <BaseInventory
        scriptureReference={scriptureReference}
        setScriptureReference={setScriptureReference}
        localizedStrings={localizedStrings}
        convertTextToItems={convertTextToItems}
        approvedItems={approvedItems}
        onApprovedItemsChange={onApprovedItemsChange}
        unapprovedItems={unapprovedItems}
        onUnapprovedItemsChange={onUnapprovedItemsChange}
        text={text}
        onScopeChange={onScopeChange}
        columns={columns}
      />
    </div>
  );
}

export default CharacterInventory;
