import { useEffect, useState } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { projectDataProviders, projectLookup } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import { ScriptureReference } from 'platform-bible-react';
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

const getBookText = async (projectId: string, bookNum: number): Promise<string> => {
  const projectDataProvider = await papi.projectDataProviders.get(
    'platformScripture.USFM_Book',
    projectId,
  );
  const verseRef = new VerseRef(bookNum, 1, 1);
  const bookText = await projectDataProvider.getBookUSFM(verseRef);

  if (!bookText) return '';

  return bookText;
};

const buildTableData = async (
  bookText: string,
  validCharacters: string[],
  invalidCharacters: string[],
): Promise<CharacterData[]> => {
  const characterData: CharacterData[] = [];
  bookText.split('').forEach((character) => {
    const characterDataPoint = characterData.find((dataPoint) => {
      return dataPoint.character === character;
    });
    if (characterDataPoint) {
      characterDataPoint.count += 1;
    } else {
      let characterStatus: Status;
      if (validCharacters.includes(character)) characterStatus = true;
      if (invalidCharacters.includes(character)) characterStatus = false;
      const newCharacter: CharacterData = {
        character,
        count: 1,
        status: characterStatus,
      };
      characterData.push(newCharacter);
    }
  });

  return characterData;
};

global.webViewComponent = function CharacterInventory({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef] = useSetting('platform.verseRef', defaultVerseRef);
  const [validCharacters, setValidCharacters] = useState<string[]>([]);
  const [invalidCharacters, setInvalidCharacters] = useState<string[]>([]);
  const [bookText, setBookText] = useState<string>('');
  const [inventoryTableData, setInventoryTableData] = useState<CharacterData[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

  const statusChangeHandler = (characters: string[], status: Status) => {
    setInventoryTableData((prevTableData) => {
      let tableData: CharacterData[] = [];
      characters.forEach((character) => {
        tableData = prevTableData.map((tableElement) => {
          if (tableElement.character === character) {
            if (tableElement.status === status) return tableElement;
            return { ...tableElement, status };
          }
          return tableElement;
        });
      });

      const updatedCharacters = new Set(characters);

      const characterData = tableData.filter((tableElement) =>
        updatedCharacters.has(tableElement.character),
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

      return prevTableData;
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
        const newBookText = await getBookText(projectId, scriptureRef.bookNum);
        setBookText(newBookText);
        setInventoryTableData(
          await buildTableData(newBookText, validCharacters, invalidCharacters),
        );
      } catch (error) {
        throw new Error('Failed building table data');
      }
    };

    buildData();
  }, [projectId, scriptureRef.bookNum, validCharacters, invalidCharacters]);

  const selectCharacterHandler = (character: string) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="pr-twp pr-font-sans">
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
          <OccurrencesTable selectedCharacter={selectedCharacter} bookText={bookText} />
        </div>
      )}
    </div>
  );
};
