import { ColumnDef, SortDirection } from '@tanstack/react-table';
import {
  ArrowUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  XIcon,
  ShieldQuestionIcon,
} from 'lucide-react';

import { Button } from '@/components/shadcn-ui/button';

import { ReactNode } from 'react';

//  DATA

type Status = true | false | undefined;

type CharacterData = {
  character: string;
  unicodeValue: string;
  count: number;
  status: Status;
};

const getRandomStatus = (): Status => {
  const statuses: Status[] = [true, false, undefined];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
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
        status: getRandomStatus(),
      });
    }
  });

  return dataArray;
};

export default randomlyGeneratedData;

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

export const columns: ColumnDef<CharacterData>[] = [
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
          Unicode Value
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
          Count
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => {
      return (
        <Button variant="ghost">
          <div className="pr-flex pr-flex-col">
            <div>Status</div>
            <div className="pr-flex">
              <CheckIcon
                className="pr-ml-2 pr-h-4 pr-w-4"
                onClick={() => {
                  console.log('Set accepted');
                }}
              />
              <XIcon
                className="pr-ml-2 pr-h-4 pr-w-4"
                onClick={() => {
                  console.log('Set rejected');
                }}
              />
              <ShieldQuestionIcon
                className="pr-ml-2 pr-h-4 pr-w-4"
                onClick={() => {
                  console.log('Set undefined');
                }}
              />
            </div>
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      if (status === true) {
        return <CheckIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
      }
      if (status === false) {
        return <XIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
      }
      return <ShieldQuestionIcon className="pr-ml-2 pr-h-4 pr-w-4" />;
    },
  },
];
