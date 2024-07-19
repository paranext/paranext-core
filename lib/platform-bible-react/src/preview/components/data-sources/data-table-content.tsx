import {
  ColumnDef,
  SortDirection,
} from '@/components/advanced-components/data-table/data-table.component';
import { Button } from '../../..';

type MyDataType = {
  character: string;
};

const getSortingIcon = (sortDirection: false | SortDirection): string => {
  if (sortDirection === 'asc') {
    return '↑';
  }
  if (sortDirection === 'desc') {
    return '↓';
  }
  return '↕';
};

export const data: MyDataType[] = [
  { character: '🦄' },
  { character: 'a' },
  { character: '1' },
  { character: '-' },
  { character: '#' },
  { character: 'A' },
  { character: 'ç' },
  { character: '€' },
  { character: '$' },
  { character: '𤭢' },
  { character: '𐐷' },
];

export const columns: ColumnDef<MyDataType>[] = [
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
    accessorKey: 'unicode_value',
    header: 'Unicode Value',
    cell: ({ row }) => {
      const character: string = row.getValue('character');
      return character.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    },
  },
  {
    accessorKey: 'surrogate_pair',
    header: 'Surrogate Pair',
    cell: ({ row }) => {
      const character: string = row.getValue('character');
      const codeUnit = character.charCodeAt(0);

      return codeUnit >= 0xd800 && codeUnit <= 0xdfff ? 'Yes' : 'No';
    },
  },
];
