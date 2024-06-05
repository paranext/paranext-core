import { projectDataProviders, projectLookup } from '@papi/frontend';
import { Button, DataTable } from 'platform-bible-react';
import { ReactNode, useEffect, useState } from 'react';
import {
  ArrowUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  CircleHelpIcon,
} from 'lucide-react';
import { ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table'; // TODO: Is this okay or should we integrate this into our DataTable component and re-export from there?

type Status = true | false | undefined;

export type CharacterData = {
  character: string;
  count: number;
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
  updateStatus: (character: string, status: Status) => void,
  validCharacters: string[],
  invalidCharacters: string[],
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

      if (selectedRows.length === 0) {
        return;
      }
      if (selectedRows.length > 1) {
        throw new Error(
          'No more than one row can be selected when setting status of inventory item.',
        );
      }
      const character: string = selectedRows[0].getValue('character');

      // eslint-disable-next-line consistent-return
      return (
        <div className="pr-flex pr-flex-col">
          <Button>Status</Button>
          <div className="pr-flex">
            <Button>
              <CircleCheckIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  updateStatus(character, true);
                }}
              />
            </Button>
            <Button>
              <CircleXIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  updateStatus(character, false);
                }}
              />
            </Button>
            <Button>
              <CircleHelpIcon
                className="pr-h-5 pr-w-5"
                onClick={() => {
                  updateStatus(character, undefined);
                }}
              />
            </Button>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const character: string = row.getValue('character');
      if (validCharacters.includes(character)) {
        return <CircleCheckIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
      }
      if (invalidCharacters.includes(character)) {
        return <CircleXIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
      }
      return <CircleHelpIcon className="pr-ml-2 pr-h-5 pr-w-5" />;
    },
  },
];

// #endregion

// #region EventHandlers

const rowClickHandler = (table: Table<CharacterData>, row: Row<CharacterData>) => {
  table.toggleAllRowsSelected(false);
  row.toggleSelected(true);
};

const getSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('ParatextStandard', projectMetadata.id);
  const command =
    characterSet === 'validCharacters'
      ? 'platformScripture.validCharacters'
      : 'platformScripture.invalidCharacters';
  return (await pdp.getSetting(command)).split(' ');
};

const setSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
  characters: string[],
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('ParatextStandard', projectMetadata.id);
  const command =
    characterSet === 'validCharacters'
      ? 'platformScripture.validCharacters'
      : 'platformScripture.invalidCharacters';
  pdp.setSetting(command, characters.join(' '));
};

// #endregion

interface InventoryDataTableProps {
  projectId: string;
  tableData: CharacterData[];
}

function InventoryDataTable({ projectId, tableData }: InventoryDataTableProps) {
  const [validCharacters, setValidCharacters] = useState<string[]>([]);
  const [invalidCharacters, setInvalidCharacters] = useState<string[]>([]);

  useEffect(() => {
    setSetting('validCharacters', projectId, validCharacters);
  }, [projectId, validCharacters]);

  useEffect(() => {
    setSetting('invalidCharacters', projectId, invalidCharacters);
  }, [invalidCharacters, projectId]);

  useEffect(() => {
    (async () => {
      setValidCharacters(await getSetting('validCharacters', projectId));
      setInvalidCharacters(await getSetting('invalidCharacters', projectId));
    })();
    return () => {};
  }, [projectId]);

  const setStatus = (character: string, status: Status) => {
    if (status === true) {
      if (!validCharacters.includes(character))
        setValidCharacters((prevValidCharacters) => [...prevValidCharacters, character].sort());
      if (invalidCharacters.includes(character))
        setInvalidCharacters(
          invalidCharacters.filter((invalidCharacter) => invalidCharacter !== character),
        );
    } else if (status === false) {
      if (validCharacters.includes(character))
        setValidCharacters(
          validCharacters.filter((validCharacter) => validCharacter !== character),
        );
      if (!invalidCharacters.includes(character))
        setInvalidCharacters((prevInvalidCharacters) =>
          [...prevInvalidCharacters, character].sort(),
        );
    } else if (status === undefined) {
      if (validCharacters.includes(character))
        setValidCharacters(
          validCharacters.filter((validCharacter) => validCharacter !== character),
        );
      if (invalidCharacters.includes(character))
        setInvalidCharacters(
          invalidCharacters.filter((invalidCharacter) => invalidCharacter !== character),
        );
    } else {
      throw new Error('Trying to set unexpected status for character');
    }
  };

  return (
    <div className="pr-overflow-y-auto">
      <DataTable
        columns={columns(setStatus, validCharacters, invalidCharacters)}
        data={tableData}
        onRowClickHandler={rowClickHandler}
      />
    </div>
  );
}

export default InventoryDataTable;
