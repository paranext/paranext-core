import { useEffect, useState } from 'react';

interface SearchResult {
  reference: string;
  word: string;
}

const processVerseText = (
  verseText: string,
  character: string,
  chapter: string,
  verse: string,
  results: SearchResult[],
) => {
  const words = verseText.split(/\s+/).map((word) => word.replace(/[^\w']+/g, ''));
  words.forEach((word) => {
    const occurrences = (word.match(new RegExp(character, 'g')) || []).length;
    for (let i = 0; i < occurrences; i++) {
      results.push({
        reference: `Gen ${chapter}:${verse}`,
        word,
      });
    }
  });
};

const searchUSFM = (usfmData: string, character: string): SearchResult[] => {
  if (usfmData === '' || character === '') return [];

  const results: SearchResult[] = [];
  const lines = usfmData.split('\n');

  let currentChapter = '';
  let currentVerse = '';
  let verseText = '';

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (line.startsWith('\\c ')) {
      // Extract chapter number
      [, currentChapter] = trimmedLine.split(' ');
    } else if (line.startsWith('\\v ')) {
      // When encountering a verse, process the previous verse text
      if (verseText) {
        processVerseText(verseText, character, currentChapter, currentVerse, results);
      }
      // Extract verse number and start a new verse text
      const parts = line.split(' ');
      [, currentVerse] = parts;
      verseText = parts.slice(2).join(' ');
    } else if (line.startsWith('\\s')) {
      // Handle section breaks
      verseText = ''; // Reset verse text when a new section starts
    } else {
      // Accumulate text for the current verse
      verseText += ` ${line}`;
    }
  });

  // Process the last verse text
  if (verseText) {
    processVerseText(verseText, character, currentChapter, currentVerse, results);
  }

  return results;
};

interface OccurrencesTableProps {
  selectedCharacter: string;
  bookText: string;
}

function OccurrencesTable({ selectedCharacter, bookText }: OccurrencesTableProps) {
  const [tableData, setTableData] = useState<SearchResult[]>(
    searchUSFM(bookText, selectedCharacter),
  );
  useEffect(
    () => setTableData(searchUSFM(bookText, selectedCharacter)),
    [bookText, selectedCharacter],
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Word</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((result) => (
          <tr key={`${result.reference}-${result.word}-${Math.random()}`}>
            <td>{result.reference}</td>
            <td>{result.word}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OccurrencesTable;
