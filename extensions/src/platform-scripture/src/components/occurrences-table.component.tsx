import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { useEffect, useState } from 'react';

interface SearchResult {
  reference: string;
  word: string;
}

const processVerseText = (
  verseText: string,
  character: string,
  book: string,
  chapter: string,
  verse: string,
  results: SearchResult[],
) => {
  const words = verseText.split(/\s+/).map((word) => word.replace(/[^\w']+/g, ''));
  words.forEach((word) => {
    const occurrences = (word.match(new RegExp(character, 'g')) || []).length;
    for (let i = 0; i < occurrences; i++) {
      results.push({
        reference: `${book} ${chapter}:${verse}`,
        word,
      });
    }
  });
};

const searchUSFM = (usfmData: string, character: string): SearchResult[] => {
  if (usfmData === '' || character === '') return [];

  const results: SearchResult[] = [];
  const lines = usfmData.split('\n');

  let currentBook = '';
  let currentChapter = '';
  let currentVerse = '';
  let verseText = '';

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (line.startsWith('\\id ')) {
      // Extract book title
      [, currentBook] = trimmedLine.split(' ');
    }
    if (line.startsWith('\\c ')) {
      // Extract chapter number
      [, currentChapter] = trimmedLine.split(' ');
    } else if (line.startsWith('\\v ')) {
      // When encountering a verse, process the previous verse text
      if (verseText) {
        processVerseText(verseText, character, currentBook, currentChapter, currentVerse, results);
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
    processVerseText(verseText, character, currentBook, currentChapter, currentVerse, results);
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Word</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((result) => (
          <TableRow key={`${result.reference}-${result.word}-${Math.random()}`}>
            <TableCell>{result.reference}</TableCell>
            <TableCell>{result.word}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
