import { ReactNode } from 'react';
import {
  ArrowUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  CircleHelpIcon,
} from 'lucide-react';
import { LanguageStrings } from 'platform-bible-utils';
import { Button } from '@/components/shadcn-ui/button';
import DataTable, {
  ColumnDef,
  RowContents,
  SortDirection,
  TableContents,
} from '@/components/advanced-components/data-table/data-table.component';

export type Status = true | false | undefined;

export type CharacterData = {
  character: string;
  count: number;
  status: Status;
};

// #region UtilityFunctions

const getSortingIcon = (sortDirection: false | SortDirection): ReactNode => {
  if (sortDirection === 'asc') {
    return <ArrowUpIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  if (sortDirection === 'desc') {
    return <ArrowDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  return <ArrowUpDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
};

// #endregion

// #region Columns

export const columns = (
  characterLabel: string,
  unicodeValueLabel: string,
  countLabel: string,
  statusLabel: string,
  statusChangeHandler: (characters: string[], status: Status) => void,
): ColumnDef<CharacterData>[] => [
  {
    accessorKey: 'character',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          {characterLabel}
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
      const character: string = row.getValue('character');
      return character.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
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

      const characters: string[] = [];
      selectedRows.forEach((row) => {
        characters.push(row.getValue('character'));
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
                  statusChangeHandler(characters, true);
                }}
              />
            </Button>
            <Button>
              <CircleXIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(characters, false);
                }}
              />
            </Button>
            <Button>
              <CircleHelpIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(characters, undefined);
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

// #endregion

interface InventoryDataTableProps {
  tableData: CharacterData[];
  onStatusChange: (characters: string[], status: Status) => void;
  onSelectCharacter: (character: string) => void;
  localizedStrings: LanguageStrings;
}

function InventoryDataTable({
  tableData,
  onStatusChange,
  onSelectCharacter,
  localizedStrings,
}: InventoryDataTableProps) {
  const characterLabel = localizedStrings['%webView_inventory_table_header_character%'];
  const unicodeValueLabel = localizedStrings['%webView_inventory_table_header_unicode_value%'];
  const countLabel = localizedStrings['%webView_inventory_table_header_count%'];
  const statusLabel = localizedStrings['%webView_inventory_table_header_status%'];

  const rowClickHandler = (
    row: RowContents<CharacterData>,
    table: TableContents<CharacterData>,
  ) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    onSelectCharacter(row.getValue('character'));
  };

  return (
    <div className="pr-overflow-y-auto">
      <DataTable
        columns={columns(
          characterLabel,
          unicodeValueLabel,
          countLabel,
          statusLabel,
          onStatusChange,
        )}
        data={tableData}
        onRowClickHandler={rowClickHandler}
      />
    </div>
  );
}

export default InventoryDataTable;
