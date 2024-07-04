import { useEffect, useState } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { projectDataProviders, projectLookup } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import {
  Input,
  ScriptureReference,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import type { ProjectDataProviderInterfaces as PDPI } from 'papi-shared-types';
import InventoryDataTable, {
  CharacterData,
  Status,
} from './components/inventory-data-table.component';
import OccurrencesTable from './components/occurrences-table.component';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

const getSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  return (await pdp.getSetting(`platformScripture.${characterSet}`)).split(' ');
};

const setSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
  characters: string[],
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  pdp.setSetting(`platformScripture.${characterSet}`, characters.join(' '));
};

const getText = async (
  projectId: string,
  scriptureRef: ScriptureReference,
  scope: string,
): Promise<string> => {
  let projectInterface: keyof PDPI = 'platformScripture.USFM_Book';
  if (scope === 'Current chapter') {
    projectInterface = 'platformScripture.USFM_Chapter';
  } else if (scope === 'Current verse') {
    projectInterface = 'platformScripture.USFM_Verse';
  }

  const PDP = await papi.projectDataProviders.get(projectInterface, projectId);

  const verseRef = new VerseRef(
    scriptureRef.bookNum,
    scriptureRef.chapterNum,
    scriptureRef.verseNum,
  );
  let text: string | undefined;

  if (projectInterface === 'platformScripture.USFM_Book') {
    // We know the PDP interface is of type `platformScripture.USFM_Book`
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    text = await (PDP as PDPI['platformScripture.USFM_Book']).getBookUSFM(verseRef);
  } else if (projectInterface === 'platformScripture.USFM_Chapter') {
    // We know the PDP interface is of type `platformScripture.USFM_Chapter`
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    text = await (PDP as PDPI['platformScripture.USFM_Chapter']).getChapterUSFM(verseRef);
  } else if (projectInterface === 'platformScripture.USFM_Verse') {
    // We know the PDP interface is of type `platformScripture.USFM_Verse`
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    text = await (PDP as PDPI['platformScripture.USFM_Verse']).getVerseUSFM(verseRef);
  }

  if (!text) return '';

  return text;
};

const buildTableData = async (
  bookText: string,
  statusFilter: string,
  textFilter: string,
  validCharacters: string[],
  invalidCharacters: string[],
): Promise<CharacterData[]> => {
  const characterData: CharacterData[] = [];
  bookText.split('').forEach((character) => {
    if (textFilter !== '' && !character.includes(textFilter)) return;
    const characterDataPoint = characterData.find((dataPoint) => {
      return dataPoint.character === character;
    });
    if (characterDataPoint) {
      characterDataPoint.count += 1;
    } else {
      let characterStatus: Status;
      if (validCharacters.includes(character)) characterStatus = true;
      if (invalidCharacters.includes(character)) characterStatus = false;
      if (
        statusFilter === 'All characters' ||
        (statusFilter === 'Approved' && characterStatus === true) ||
        (statusFilter === 'Unapproved' && characterStatus === false) ||
        (statusFilter === 'Unknown' && characterStatus === undefined)
      ) {
        const newCharacter: CharacterData = {
          character,
          count: 1,
          status: characterStatus,
        };
        characterData.push(newCharacter);
      }
    }
  });

  return characterData;
};

global.webViewComponent = function CharacterInventory({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef] = useSetting('platform.verseRef', defaultVerseRef);
  const [validCharacters, setValidCharacters] = useState<string[]>([]);
  const [invalidCharacters, setInvalidCharacters] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [inventoryTableData, setInventoryTableData] = useState<CharacterData[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [scope, setScope] = useState<string>('Current book');
  const [statusFilter, setStatusFilter] = useState<string>('All characters');
  const [textFilter, setTextFilter] = useState<string>('');

  const statusChangeHandler = (characters: string[], status: Status) => {
    setInventoryTableData((prevTableData) => {
      // Update local table data
      let tableData: CharacterData[] = [];
      characters.forEach((character) => {
        tableData = prevTableData.map((tableEntry) => {
          if (tableEntry.character === character && tableEntry.status !== status)
            return { ...tableEntry, status };
          return tableEntry;
        });
      });

      // Early return if changed characters don't appear in table
      const updatedCharacters = new Set(characters);
      const characterData = tableData.filter((tableEntry) =>
        updatedCharacters.has(tableEntry.character),
      );
      if (characterData.length === 0) return tableData;

      setValidCharacters((prevValidCharacters) => {
        let newValidCharacters: string[] = [...prevValidCharacters];
        characters.forEach((character) => {
          if (status === true) {
            if (!newValidCharacters.includes(character)) {
              newValidCharacters.push(character);
            }
          } else {
            newValidCharacters = newValidCharacters.filter((validChar) => validChar !== character);
          }
        });

        setSetting('validCharacters', projectId, newValidCharacters);
        return newValidCharacters;
      });

      setInvalidCharacters((prevInvalidCharacters) => {
        let newInvalidCharacters: string[] = [...prevInvalidCharacters];
        characters.forEach((character) => {
          if (status === false) {
            if (!newInvalidCharacters.includes(character)) {
              newInvalidCharacters.push(character);
            }
          } else {
            newInvalidCharacters = newInvalidCharacters.filter(
              (invalidChar) => invalidChar !== character,
            );
          }
        });

        setSetting('invalidCharacters', projectId, newInvalidCharacters);
        return newInvalidCharacters;
      });

      return tableData;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setValidCharacters(await getSetting('validCharacters', projectId));
        setInvalidCharacters(await getSetting('invalidCharacters', projectId));
      } catch (error) {
        throw new Error('Failed to fetch characters from project settings');
      }
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const buildData = async () => {
      try {
        const newText = await getText(projectId, scriptureRef, scope);
        setText(newText);
        setInventoryTableData(
          await buildTableData(
            newText,
            statusFilter,
            textFilter,
            validCharacters,
            invalidCharacters,
          ),
        );
      } catch (error) {
        throw new Error('Failed building table data');
      }
    };

    buildData();
  }, [
    projectId,
    scriptureRef,
    validCharacters,
    invalidCharacters,
    scope,
    statusFilter,
    textFilter,
  ]);

  const selectCharacterHandler = (character: string) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="pr-twp pr-font-sans">
      <div className="pr-flex">
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="All characters">All characters</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Unapproved">Unapproved</SelectItem>
            <SelectItem value="Unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setScope(value)} defaultValue={scope}>
          <SelectTrigger>
            <SelectValue placeholder="Select scope" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="Current book">Current book</SelectItem>
            <SelectItem value="Current chapter">Current chapter</SelectItem>
            <SelectItem value="Current verse">Current verse</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter text..."
          value={textFilter}
          onChange={(event) => {
            setTextFilter(event.target.value);
          }}
        />
      </div>
      <div
        className={`pr-rounded-md pr-border pr-overflow-y-auto ${selectedCharacter !== '' && 'pr-max-h-96'}`}
      >
        <InventoryDataTable
          tableData={inventoryTableData}
          onStatusChange={statusChangeHandler}
          onSelectCharacter={selectCharacterHandler}
        />
      </div>
      {selectedCharacter !== '' && (
        <div className="pr-mt-4 pr-rounded-md pr-border">
          <OccurrencesTable selectedCharacter={selectedCharacter} text={text} />
        </div>
      )}
    </div>
  );
};
