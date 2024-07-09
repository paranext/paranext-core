import { useEffect, useState } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { projectDataProviders, projectLookup } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
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
import { LocalizeKey, split } from 'platform-bible-utils';
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
  return split(await pdp.getSetting(`platformScripture.${characterSet}`), ' ');
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
): Promise<string | undefined> => {
  const verseRef = new VerseRef(
    scriptureRef.bookNum,
    scriptureRef.chapterNum,
    scriptureRef.verseNum,
  );

  if (scope === 'book') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Book', projectId);
    return PDP.getBookUSFM(verseRef);
  }
  if (scope === 'chapter') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Chapter', projectId);
    return PDP.getChapterUSFM(verseRef);
  }
  if (scope === 'verse') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Verse', projectId);
    return PDP.getVerseUSFM(verseRef);
  }

  throw new Error('Cannot get scripture for unknown scope');
};

const buildTableData = async (
  text: string,
  statusFilter: string,
  textFilter: string,
  validCharacters: string[],
  invalidCharacters: string[],
): Promise<CharacterData[]> => {
  const characterData: CharacterData[] = [];
  split(text, '').forEach((character) => {
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
        statusFilter === 'all' ||
        (statusFilter === 'approved' && characterStatus === true) ||
        (statusFilter === 'unapproved' && characterStatus === false) ||
        (statusFilter === 'unknown' && characterStatus === undefined)
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

const STRING_KEYS: LocalizeKey[] = [
  '%webView_characterInventory_characters_all%',
  '%webView_characterInventory_characters_approved%',
  '%webView_characterInventory_characters_unapproved%',
  '%webView_characterInventory_characters_unknown%',
  '%webView_inventory_scope_book%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
];

global.webViewComponent = function CharacterInventory({ useWebViewState }: WebViewProps) {
  const [
    {
      '%webView_characterInventory_characters_all%': allCharacters,
      '%webView_characterInventory_characters_approved%': approvedCharacters,
      '%webView_characterInventory_characters_unapproved%': unapprovedCharacters,
      '%webView_characterInventory_characters_unknown%': unknownCharacters,
      '%webView_inventory_scope_book%': scopeBook,
      '%webView_inventory_scope_chapter%': scopeChapter,
      '%webView_inventory_scope_verse%': scopeVerse,
      '%webView_inventory_filter_text%': filterText,
    },
  ] = useLocalizedStrings(STRING_KEYS);
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef] = useSetting('platform.verseRef', defaultVerseRef);
  const [validCharacters, setValidCharacters] = useState<string[]>([]);
  const [invalidCharacters, setInvalidCharacters] = useState<string[]>([]);
  const [text, setText] = useState<string | undefined>(undefined);
  const [scope, setScope] = useState<string>('book');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [textFilter, setTextFilter] = useState<string>('');
  const [inventoryTableData, setInventoryTableData] = useState<CharacterData[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

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
    const getNewText = async () => {
      try {
        const newText = await getText(projectId, scriptureRef, scope);
        setText(newText);
      } catch (error) {
        throw new Error('Failed getting scripture text');
      }
    };

    getNewText();
  }, [projectId, scriptureRef, scope]);

  useEffect(() => {
    if (!text) {
      setInventoryTableData([]);
      return;
    }
    const buildData = async () => {
      try {
        setInventoryTableData(
          await buildTableData(text, statusFilter, textFilter, validCharacters, invalidCharacters),
        );
      } catch (error) {
        throw new Error('Failed building table data');
      }
    };

    buildData();
  }, [validCharacters, invalidCharacters, text, statusFilter, textFilter]);

  return (
    <div className="pr-twp pr-font-sans">
      <div className="pr-flex">
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="all">{allCharacters}</SelectItem>
            <SelectItem value="approved">{approvedCharacters}</SelectItem>
            <SelectItem value="unapproved">{unapprovedCharacters}</SelectItem>
            <SelectItem value="unknown">{unknownCharacters}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setScope(value)} defaultValue={scope}>
          <SelectTrigger>
            <SelectValue placeholder="Select scope" />
          </SelectTrigger>
          <SelectContent className="pr-font-sans">
            <SelectItem value="book">{scopeBook}</SelectItem>
            <SelectItem value="chapter">{scopeChapter}</SelectItem>
            <SelectItem value="verse">{scopeVerse}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="pr-border pr-rounded-md"
          placeholder={filterText}
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
          onSelectCharacter={(character: string) => {
            setSelectedCharacter(character);
          }}
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
