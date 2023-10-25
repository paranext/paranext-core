import { useCallback, useEffect, useMemo, useState } from 'react';
import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import type { UsfmProviderDataTypes } from 'usfm-data-provider';

import './word-list.component.scss';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import {
  RefSelector,
  ScriptureReference,
  Table,
  TableCellClickArgs,
  TableSortColumn,
} from 'papi-components';
import { ScrVers, VerseRef } from '@sillsdev/scripture';
import WordContentViewer from './word-content-viewer.component';
import { WordListEntry } from './word-list-types';

export const TAB_TYPE_WORD_LIST = 'word-list';

type Row = {
  word: string;
  count: number;
};

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

const defaultSortColumns: TableSortColumn[] = [{ columnKey: 'word', direction: 'ASC' }];

// function getScriptureSnippet(verseText: string, word: string, count?: number): string {
function getScriptureSnippet(verseText: string, word: string): string {
  if (!verseText) throw new Error(`No verse text available.`);

  // Use count to find the desired occurrence of the word in the verse

  const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'i');
  const match = verseText.toLowerCase().match(regex);

  const index = match ? match.index || -1 : -1;

  let surroundingText = '';

  if (index !== -1) {
    let startIndex = Math.max(0, index - 50);
    let endIndex = Math.min(verseText.length, index + word.length + 50);

    // Ensure startIndex starts at the beginning of a word
    while (startIndex > 0 && !/\s/.test(verseText[startIndex - 1])) {
      startIndex -= 1;
    }

    // Ensure endIndex ends at the end of a word
    while (endIndex < verseText.length - 1 && !/\s/.test(verseText[endIndex])) {
      endIndex += 1;
    }

    surroundingText = verseText.substring(startIndex, endIndex);

    // Find and convert selectedWord.word to uppercase
    const wordStartIndex = index - startIndex;
    const wordEndIndex = wordStartIndex + word.length;
    const beforeWord = surroundingText.slice(0, wordStartIndex);
    const afterWord = surroundingText.slice(wordEndIndex);
    const upperCaseWord = surroundingText.slice(wordStartIndex, wordEndIndex).toUpperCase();

    surroundingText = beforeWord + upperCaseWord + afterWord;
  }
  return surroundingText;
}

function processChapter(chapterText: string, scrRef: ScriptureReference) {
  const verseTexts: string[] = chapterText.split(/\\v\s\d+\s/);
  // Delete the first array element, which contains all markers/content before the chapter starts
  verseTexts.shift();

  const wordList: WordListEntry[] = [];
  verseTexts.forEach((verseText, id) => {
    const wordMatches: RegExpMatchArray | null | undefined =
      verseText?.match(/(?<!\\)\b[a-zA-Z’]+\b/g);

    if (wordMatches) {
      wordMatches.forEach((word) => {
        const existingEntry = wordList.find((entry) => entry.word === word.toLocaleLowerCase());
        if (existingEntry) {
          // Find number of occurences of this scrRef in this entry. Pass that count to getScriptureSnipper
          existingEntry.scrRefs.push({
            bookNum: scrRef.bookNum,
            chapterNum: scrRef.chapterNum,
            verseNum: id + 1,
          });
          existingEntry.scriptureSnippets.push(getScriptureSnippet(verseText, word));
        } else {
          const newEntry: WordListEntry = {
            word: word.toLocaleLowerCase(),
            scrRefs: [
              {
                bookNum: scrRef.bookNum,
                chapterNum: scrRef.chapterNum,
                verseNum: id + 1,
              },
            ],
            scriptureSnippets: [getScriptureSnippet(verseText, word)],
          };
          wordList.push(newEntry);
        }
      });
    }
  });
  return wordList;
}

export default function WordList() {
  const [scrRef, setScrRef] = useSetting('platform.verseRef', defaultScrRef);
  const [wordList, setWordList] = useState<WordListEntry[]>([]);
  const [chapterText, , isChapterTextLoading] = useData.Chapter<UsfmProviderDataTypes, 'Chapter'>(
    'usfm',
    useMemo(
      () => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum, ScrVers.English),
      [scrRef],
    ),
    'Loading verse',
  );
  const [rows, setRows] = useState<Row[]>([]);
  const [sortColumns, setSortColumns] = useState<TableSortColumn[]>(defaultSortColumns);
  const onSortColumnsChange = useCallback((changedSortColumns: TableSortColumn[]) => {
    setSortColumns(changedSortColumns.slice(-1));
  }, []);
  const [selectedWord, setSelectedWord] = useState<WordListEntry>();

  useEffect(() => {
    setWordList([]);
    setSelectedWord(undefined);
  }, [scrRef.bookNum, scrRef.chapterNum]);

  useEffect(() => {
    if (isChapterTextLoading || !chapterText) return;
    setWordList(processChapter(chapterText, scrRef));
  }, [isChapterTextLoading, chapterText, scrRef]);

  useEffect(() => {
    const newRows: Row[] = [];
    wordList.forEach((word) => {
      newRows.push({ word: word.word, count: word.scrRefs.length });
    });
    setRows(newRows);
  }, [wordList]);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;
    const { columnKey, direction } = sortColumns[0];

    let sortedRowsLocal: Row[] = [...rows];

    switch (columnKey) {
      case 'word':
        sortedRowsLocal = sortedRowsLocal.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
        break;
      case 'count':
        sortedRowsLocal = sortedRowsLocal.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
      default:
    }
    return direction === 'DESC' ? sortedRowsLocal.reverse() : sortedRowsLocal;
  }, [rows, sortColumns]);

  useEffect(() => {
    if (sortColumns.length === 0) {
      setSortColumns(defaultSortColumns);
    }
  }, [sortColumns]);

  const onCellClick = (args: TableCellClickArgs<Row>) => {
    const clickedWord = wordList.find((entry) => entry.word === args.row.word);
    if (clickedWord) setSelectedWord(clickedWord);
  };

  return (
    <div className="word-list">
      <RefSelector
        scrRef={scrRef}
        handleSubmit={(newScrRef) => {
          setScrRef(newScrRef);
        }}
      />
      <Table<Row>
        columns={[
          {
            key: 'word',
            name: 'Word',
          },
          {
            key: 'count',
            name: 'Count',
          },
        ]}
        rows={sortedRows}
        rowKeyGetter={(row: Row) => {
          return row.word;
        }}
        onRowsChange={(changedRows: Row[]) => setRows(changedRows)}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        rowHeight={60}
        headerRowHeight={50}
        onCellClick={onCellClick}
      />
      {selectedWord && <WordContentViewer selectedWord={selectedWord} />}
    </div>
  );
}

export function loadWordListTab(savedTabInfo: SavedTabInfo): TabInfo {
  return {
    ...savedTabInfo,
    tabTitle: 'Word List',
    content: <WordList />,
  };
}
