import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
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

const REPEATED_WORDS_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_repeated_words%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

const createColumns = (
  itemLabel: string,
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
        <>
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

interface RepeatedWordsInventoryProps {
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
}

function RepeatedWordsInventory({
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
}: RepeatedWordsInventoryProps) {
  const [repeatedWordsInventoryStrings] = useLocalizedStrings(REPEATED_WORDS_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_repeated_words%'],
    [repeatedWordsInventoryStrings],
  );
  const countLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_count%'],
    [repeatedWordsInventoryStrings],
  );
  const statusLabel = useMemo(
    () => repeatedWordsInventoryStrings['%webView_inventory_table_header_status%'],
    [repeatedWordsInventoryStrings],
  );

  const getColumns = useCallback(
    (onStatusChange: (changedItems: string[], status: Status) => void) =>
      createColumns(itemLabel, countLabel, statusLabel, onStatusChange),
    [itemLabel, countLabel, statusLabel],
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

export default RepeatedWordsInventory;
