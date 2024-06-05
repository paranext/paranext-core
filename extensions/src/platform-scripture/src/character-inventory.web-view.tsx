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

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

const getSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('ParatextStandard', projectMetadata.id);
  return (await pdp.getSetting(`platformScripture.${characterSet}`)).split(' ');
};

const setSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
  characters: string[],
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('ParatextStandard', projectMetadata.id);
  pdp.setSetting(`platformScripture.${characterSet}`, characters.join(' '));
};

const buildTableData = async (
  projectId: string,
  bookNum: number,
  validCharacters: string[],
  invalidCharacters: string[],
): Promise<CharacterData[]> => {
  const projectDataProvider = await papi.projectDataProviders.get('ParatextStandard', projectId);
  const verseRef = new VerseRef(bookNum, 1, 1);
  const bookText = await projectDataProvider.getBookUSFM(verseRef);

  if (!bookText) return [];

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
  const [tableData, setTableData] = useState<CharacterData[]>([]);

  const statusChangeHandler = (character: string, status: Status) => {
    setTableData((prevTableData) => {
      const newTableData = prevTableData.map((tableElement) => {
        if (tableElement.character === character) {
          if (tableElement.status === status) return tableElement;
          return { ...tableElement, status };
        }
        return tableElement;
      });

      const characterData = newTableData.find(
        (tableElement) => tableElement.character === character,
      );
      if (!characterData) return newTableData;

      setValidCharacters((prevValidCharacters) => {
        let newValidCharacters: string[] = [];
        if (status === true) {
          newValidCharacters = prevValidCharacters.includes(character)
            ? prevValidCharacters
            : [...prevValidCharacters, character];
        } else {
          newValidCharacters = prevValidCharacters.filter((validChar) => validChar !== character);
        }

        setSetting('validCharacters', projectId, newValidCharacters);
        return newValidCharacters;
      });

      setInvalidCharacters((prevInvalidCharacters) => {
        let newInvalidCharacters: string[] = [];
        if (status === false) {
          newInvalidCharacters = prevInvalidCharacters.includes(character)
            ? prevInvalidCharacters
            : [...prevInvalidCharacters, character];
        } else {
          newInvalidCharacters = prevInvalidCharacters.filter(
            (invalidChar) => invalidChar !== character,
          );
        }
        setSetting('invalidCharacters', projectId, newInvalidCharacters);
        return newInvalidCharacters;
      });

      return newTableData;
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
        setTableData(
          await buildTableData(projectId, scriptureRef.bookNum, validCharacters, invalidCharacters),
        );
      } catch (error) {
        throw new Error('Failed building table data');
      }
    };

    buildData();
  }, [projectId, scriptureRef.bookNum, validCharacters, invalidCharacters]);

  return <InventoryDataTable tableData={tableData} onStatusChange={statusChangeHandler} />;
};
