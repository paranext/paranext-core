import { LanguageStrings, LocalizeKey, ScriptureReference, split } from 'platform-bible-utils';
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
import {
  Button,
  ColumnDef,
  Inventory,
  getSortingIcon,
  ItemData,
  Status,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useCallback, useMemo } from 'react';

const CHARACTER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_character%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

const createColumns = (
  itemLabel: string,
  unicodeValueLabel: string,
  countLabel: string,
  statusLabel: string,
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
  {
    accessorKey: 'item',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(undefined)}>
        {itemLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
  },
  {
    accessorKey: 'unicodeValue',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(undefined)}>
        {unicodeValueLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => {
      const item: string = row.getValue('item');
      return item.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(undefined)}>
        {countLabel}
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => column.toggleSorting(undefined)}>
              {statusLabel}
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
        </div>
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

const extractItems = (text: string, item: string | undefined = undefined): string[] => {
  let characters: string[] = split(text, '');
  if (item) characters = characters.filter((character) => character === item);
  return characters;
};

type CharacterInventoryProps = {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  scope: string;
  onScopeChange: (scope: string) => void;
};

function CharacterInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  scope,
  onScopeChange,
}: CharacterInventoryProps) {
  const [characterInventoryStrings] = useLocalizedStrings(CHARACTER_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_character%'],
    [characterInventoryStrings],
  );
  const unicodeValueLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_unicode_value%'],
    [characterInventoryStrings],
  );
  const countLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_count%'],
    [characterInventoryStrings],
  );
  const statusLabel = useMemo(
    () => characterInventoryStrings['%webView_inventory_table_header_status%'],
    [characterInventoryStrings],
  );

  const getColumns = useCallback(
    (onStatusChange: (changedItems: string[], status: Status) => void) =>
      createColumns(itemLabel, unicodeValueLabel, countLabel, statusLabel, onStatusChange),
    [itemLabel, unicodeValueLabel, countLabel, statusLabel],
  );

  return (
    <Inventory
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={extractItems}
      approvedItems={approvedItems}
      onApprovedItemsChange={onApprovedItemsChange}
      unapprovedItems={unapprovedItems}
      onUnapprovedItemsChange={onUnapprovedItemsChange}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      getColumns={getColumns}
    />
  );
}

export default CharacterInventory;
