import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { useEffect, useState } from 'react';

type SearchResult = {
  reference: string;
  snippet: string;
};

const extractOccurrences = (text: string, character: string): SearchResult[] => {
  if (text === '' || character === '') return [];

  const results: SearchResult[] = [];
  const lines = text.split('\n');

  let currentBook: string = '';
  let currentChapter: number = 0;
  let currentVerse: number = 0;

  lines.forEach((line) => {
    const words = line.split(/\s+/);
    if (line.startsWith('\\id')) {
      [, currentBook] = words;
    }
    if (line.startsWith('\\c')) {
      currentChapter += 1;
      currentVerse = 0;
    }
    if (line.startsWith('\\v')) {
      currentVerse += 1;
    }

    for (let i = 0; i < words.length; i++) {
      if (words[i].includes(character)) {
        const start = Math.max(0, i - 2);
        const end = Math.min(words.length, i + 3);
        const snippet = words.slice(start, end).join(' ');
        const result: SearchResult = {
          reference: `${currentBook} ${currentChapter}:${currentVerse}`,
          snippet,
        };
        results.push(result);
      }
    }
  });

  return results;
};

interface OccurrencesTableProps {
  selectedCharacter: string;
  bookText: string;
}

function OccurrencesTable({ selectedCharacter, bookText }: OccurrencesTableProps) {
  const [tableData, setTableData] = useState<SearchResult[]>(
    extractOccurrences(bookText, selectedCharacter),
  );

  useEffect(
    () => setTableData(extractOccurrences(bookText, selectedCharacter)),
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
          <TableRow key={`${result.reference}-${result.snippet}-${Math.random()}`}>
            <TableCell>{result.reference}</TableCell>
            <TableCell>{result.snippet}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
