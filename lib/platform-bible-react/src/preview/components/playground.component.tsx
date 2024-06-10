import DataTable from '@/components/advanced-components/data-table/data-table.component';
import Button from '@/components/button.component';
import { ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table';
import { ReactNode, useEffect, useState } from 'react';

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
    return '^';
  }
  if (sortDirection === 'desc') {
    return 'v';
  }
  return '^v';
};

export const columns = (
  updateStatus: (table: Table<CharacterData>, status: Status) => void,
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
        <Button onClick={() => column.toggleSorting(undefined)}>
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
          <Button>Status</Button>
          <div className="pr-flex">
            <Button
              onClick={() => {
                updateStatus(table, true);
              }}
            >
              V{' '}
            </Button>
            <Button
              onClick={() => {
                updateStatus(table, false);
              }}
            >
              X
            </Button>
            <Button
              onClick={() => {
                updateStatus(table, undefined);
              }}
            >
              ?
            </Button>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      if (status === true) {
        return 'V';
      }
      if (status === false) {
        return 'X';
      }
      return '?';
    },
  },
];

const rowClickHandler = (table: Table<CharacterData>, row: Row<CharacterData>) => {
  table.toggleAllRowsSelected(false);
  row.toggleSelected(undefined);
};

function Playground() {
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

  return (
    <>
      <p>Put here whatever you want </p>
      <p className="pr-text-5xl">&#127881;</p>
      <DataTable columns={columns(setStatus)} data={data} onRowClickHandler={rowClickHandler} />
    </>
  );
}

export default Playground;
