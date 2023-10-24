import { useState, useMemo, useEffect } from 'react';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import { Canon, ScrVers, VerseRef } from '@sillsdev/scripture';
import type { UsfmProviderDataTypes } from 'usfm-data-provider';
import { Table } from 'papi-components';
import { WordListEntry } from './word-list-types';

type Row = {
  reference: string;
  text: string;
};

export default function VerseContentViewer({ selectedWord }: { selectedWord: WordListEntry }) {
  const [scrRefNum, setScrRefNum] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [verseText, , isVerseTextLoading] = useData.Verse<UsfmProviderDataTypes, 'Verse'>(
    'usfm',
    useMemo(() => {
      return new VerseRef(
        selectedWord.scrRefs[scrRefNum].bookNum,
        selectedWord.scrRefs[scrRefNum].chapterNum,
        selectedWord.scrRefs[scrRefNum].verseNum,
        ScrVers.English,
      );
    }, [scrRefNum, selectedWord]),
    'Loading verse',
  );

  useEffect(() => {
    setScrRefNum(0);
    setRows([]);
  }, [selectedWord]);

  function getSurroundingText(): string {
    if (!verseText) throw new Error(`No verse text available.`);

    const index = verseText.toLowerCase().indexOf(selectedWord.word);

    let surroundingText = '';

    if (index !== -1) {
      let startIndex = Math.max(0, index - 50);
      let endIndex = Math.min(verseText.length, index + selectedWord.word.length + 50);

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
      const wordEndIndex = wordStartIndex + selectedWord.word.length;
      const beforeWord = surroundingText.slice(0, wordStartIndex);
      const afterWord = surroundingText.slice(wordEndIndex);
      const upperCaseWord = surroundingText.slice(wordStartIndex, wordEndIndex).toUpperCase();

      surroundingText = beforeWord + upperCaseWord + afterWord;
    }
    return surroundingText;
  }

  const processReference = () => {
    const bookName: string = Canon.bookIdToEnglishName(
      Canon.bookNumberToId(selectedWord.scrRefs[scrRefNum].bookNum),
    );
    const fullReference: string = `${bookName} ${selectedWord.scrRefs[scrRefNum].chapterNum}:${selectedWord.scrRefs[scrRefNum].verseNum}`;

    const newRow: Row = { reference: fullReference, text: getSurroundingText() };
    setRows([...rows, newRow]);
  };

  useEffect(() => {
    if (isVerseTextLoading || !verseText) return;

    processReference();

    if (scrRefNum < selectedWord.scrRefs.length - 1) setScrRefNum(scrRefNum + 1);
    // Will fix later! :D
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseText, isVerseTextLoading]);

  return (
    <Table<Row>
      columns={[
        {
          key: 'reference',
          name: 'Reference',
          width: 150,
        },
        {
          key: 'text',
          name: 'Text',
        },
      ]}
      rows={rows}
      rowHeight={60}
      headerRowHeight={50}
    />
  );
}
