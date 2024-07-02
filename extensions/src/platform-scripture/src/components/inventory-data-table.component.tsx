import { Button, DataTable } from 'platform-bible-react';
import { ReactNode } from 'react';
import {
  ArrowUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  CircleHelpIcon,
} from 'lucide-react';
// TODO: Is this okay or should we integrate this into our DataTable component and re-export from there?
// Also there's a name conflict between tanstack Table and our shadcn Table component (which we're not using here, fortunately)
import { ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table';

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
  statusChangeHandler: (characters: string[], status: Status) => void,
): ColumnDef<CharacterData>[] => [
  {
    accessorKey: 'character',
    header: ({ column }) => {
      return (
        <Button onClick={() => column.toggleSorting(undefined)}>
          Character
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
          Unicode Value
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
          Count
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ table }) => {
      const selectedRows = table.getSelectedRowModel().rows;

      const characters: string[] = [];
      selectedRows.forEach((row) => {
        characters.push(row.getValue('character'));
      });

      // eslint-disable-next-line consistent-return
      return (
        <div>
          <div className="pr-flex pr-justify-center">Status</div>
          <div className="pr-flex pr-justify-center">
            <Button className="pr-p-1">
              <CircleCheckIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(characters, true);
                }}
              />
            </Button>
            <Button className="pr-m-1">
              <CircleXIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  statusChangeHandler(characters, false);
                }}
              />
            </Button>
            <Button className="pr-m-1">
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
}

function InventoryDataTable({
  tableData,
  onStatusChange,
  onSelectCharacter,
}: InventoryDataTableProps) {
  const rowClickHandler = (row: Row<CharacterData>, table: Table<CharacterData>) => {
    table.toggleAllRowsSelected(false); // this is pretty hacky, and also prevents us from selecting multiple rows
    row.toggleSelected(undefined);

    onSelectCharacter(row.getValue('character'));
  };

  return (
    <div className="pr-overflow-y-auto">
      <DataTable
        columns={columns(onStatusChange)}
        data={tableData}
        onRowClickHandler={rowClickHandler}
      />
    </div>
  );
}

export default InventoryDataTable;
