import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';

import { ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table';
import {
  ArrowUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  CircleHelpIcon,
} from 'lucide-react';
import { DataTable } from '../..';

type Status = true | false | undefined;

export type CharacterData = {
  character: string;
  unicodeValue: string;
  count: number;
  status: Status;
};

const getRandomString = (length: number): string[] => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,/μ';
  const result: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result.push(charset[randomIndex]);
  }
  return result;
};

export const randomlyGeneratedData = (length: number): CharacterData[] => {
  const dataArray: CharacterData[] = [];
  const data = getRandomString(length);
  data.forEach((character) => {
    const dataPoint = dataArray.find((arrayElement) => {
      return arrayElement.character === character;
    });
    if (dataPoint) {
      dataPoint.count += 1;
    } else {
      dataArray.push({
        character,
        unicodeValue: character.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0'),
        count: 1,
        status: undefined,
      });
    }
  });

  return dataArray;
};

// COLUMNS

// Function that returns an icon based on the current sorting status
const getSortingIcon = (sortDirection: false | SortDirection): ReactNode => {
  if (sortDirection === 'asc') {
    return <ArrowUpIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  if (sortDirection === 'desc') {
    return <ArrowDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
  }
  return <ArrowUpDownIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
};

export const columns = (
  updateStatus: (table: Table<CharacterData>, status: Status) => void,
): ColumnDef<CharacterData>[] => [
  {
    accessorKey: 'character',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
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
        <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
          Unicode
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'count',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(undefined)}>
          #{getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ table }) => {
      return (
        <div className="pr-flex pr-flex-col">
          <Button variant="ghost">Status</Button>
          <div className="pr-flex">
            <Button variant="ghost">
              <CircleCheckIcon
                className="pr-h-4 pr-w-4"
                onClick={() => {
                  updateStatus(table, true);
                }}
              />
            </Button>
            <Button variant="ghost">
              <CircleXIcon
                className="pr-h-4 pr-w-4"
                onClick={() => {
                  updateStatus(table, false);
                }}
              />
            </Button>
            <Button variant="ghost">
              <CircleHelpIcon
                className="pr-h-4 pr-w-4"
                onClick={() => {
                  updateStatus(table, undefined);
                }}
              />
            </Button>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      if (status === true) {
        return <CircleCheckIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
      }
      if (status === false) {
        return <CircleXIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
      }
      return <CircleHelpIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
    },
  },
];

// Event handlers

const rowClickHandler = (table: Table<CharacterData>, row: Row<CharacterData>) => {
  table.toggleAllRowsSelected(false);
  row.toggleSelected(true);
};

function DataTablePreview() {
  const [data, setData] = useState<CharacterData[]>([]);

  useEffect(() => {
    setData(randomlyGeneratedData(200));
  }, []);

  const setStatus = (table: Table<CharacterData>, status: Status) => {
    const { rowSelection } = table.getState();
    const selectedRows: number[] = Object.entries(rowSelection)
      .filter(([, value]) => value === true)
      .map(([key]) => Number(key));
    const newData = data.map((character: CharacterData, index: number) => {
      if (selectedRows.includes(index)) {
        character.status = status;
      }
      return character;
    });
    setData(newData);
  };

  return <DataTable columns={columns(setStatus)} data={data} onRowClickHandler={rowClickHandler} />;
}

export default DataTablePreview;
