import { useEffect, useMemo, useState } from 'react';
import { ScrVers, VerseRef } from '@sillsdev/scripture';
import type { UsfmProviderDataTypes } from 'usfm-data-provider';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { RefSelector, ScriptureReference } from 'papi-components';
import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import './word-list.component.scss';
import { WordListEntry } from './word-list-types';
import WordContentViewer from './word-content-viewer.component';
import WordTable from './word-table.component';

export const TAB_TYPE_WORD_LIST = 'word-list';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function compareRefs(a: ScriptureReference, b: ScriptureReference): boolean {
  return a.bookNum === b.bookNum && a.chapterNum === b.chapterNum && a.verseNum === b.verseNum;
}

function getDesiredOccurrence(verseText: string, word: string, occurrence: number): number {
  const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'ig');

  let match = regex.exec(verseText.toLowerCase());
  let occurrenceIndex = 1;

  while (match !== null) {
    if (occurrenceIndex === occurrence) {
      return match.index;
    }
    occurrenceIndex += 1;
    match = regex.exec(verseText.toLowerCase());
  }
  return -1;
}

function getScriptureSnippet(verseText: string, word: string, occurrence: number = 1): string {
  if (!verseText) throw new Error(`No verse text available.`);

  const index = getDesiredOccurrence(verseText, word, occurrence);

  let snippet = '';
  const surroundingCharacters = 40;

  if (index !== -1) {
    let startIndex = Math.max(0, index - surroundingCharacters);
    let endIndex = Math.min(verseText.length, index + word.length + surroundingCharacters);

    while (startIndex > 0 && !/\s/.test(verseText[startIndex - 1])) {
      startIndex -= 1;
    }

    while (endIndex < verseText.length - 1 && !/\s/.test(verseText[endIndex])) {
      endIndex += 1;
    }

    snippet = verseText.substring(startIndex, endIndex);

    const wordStartIndex = index - startIndex;
    const wordEndIndex = wordStartIndex + word.length;
    const beforeWord = snippet.slice(0, wordStartIndex);
    const afterWord = snippet.slice(wordEndIndex);
    const upperCaseWord = snippet.slice(wordStartIndex, wordEndIndex).toUpperCase();

    snippet = beforeWord + upperCaseWord + afterWord;
  }
  return snippet;
}

function processChapter(chapterText: string, scrRef: ScriptureReference) {
  const verseTexts: string[] = chapterText.split(/\\v\s\d+\s/);
  // Delete the first array element, which contains non-verse-related content
  verseTexts.shift();

  const wordList: WordListEntry[] = [];
  verseTexts.forEach((verseText, verseId) => {
    const wordMatches: RegExpMatchArray | null | undefined =
      verseText?.match(/(?<!\\)\b[a-zA-Z’]+\b/g);

    if (wordMatches) {
      wordMatches.forEach((word) => {
        const existingEntry = wordList.find((entry) => entry.word === word.toLocaleLowerCase());
        if (existingEntry) {
          const newRef: ScriptureReference = {
            bookNum: scrRef.bookNum,
            chapterNum: scrRef.chapterNum,
            verseNum: verseId + 1,
          };
          existingEntry.scrRefs.push(newRef);
          const occurrence = existingEntry.scrRefs.reduce(
            (matches, ref) => (compareRefs(ref, newRef) ? matches + 1 : matches),
            0,
          );
          existingEntry.scriptureSnippets.push(getScriptureSnippet(verseText, word, occurrence));
        } else {
          const newEntry: WordListEntry = {
            word: word.toLocaleLowerCase(),
            scrRefs: [
              {
                bookNum: scrRef.bookNum,
                chapterNum: scrRef.chapterNum,
                verseNum: verseId + 1,
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
  const [chapterText, , isChapterTextLoading] = useData.Chapter<UsfmProviderDataTypes, 'Chapter'>(
    'usfm',
    useMemo(
      () => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum, ScrVers.English),
      [scrRef],
    ),
    'Loading verse',
  );
  const [wordList, setWordList] = useState<WordListEntry[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordListEntry>();

  useEffect(() => {
    setWordList([]);
    setSelectedWord(undefined);
  }, [scrRef.bookNum, scrRef.chapterNum]);

  useEffect(() => {
    if (isChapterTextLoading || !chapterText) return;
    setWordList(processChapter(chapterText, scrRef));
  }, [isChapterTextLoading, chapterText, scrRef]);

  function findSelectedWordEntry(word: string) {
    const clickedEntry = wordList.find((entry) => entry.word === word);
    if (clickedEntry) setSelectedWord(clickedEntry);
  }

  return (
    <div className="word-list">
      <RefSelector
        scrRef={scrRef}
        handleSubmit={(newScrRef) => {
          setScrRef(newScrRef);
        }}
      />
      <WordTable wordList={wordList} onWordClick={(word: string) => findSelectedWordEntry(word)} />
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
