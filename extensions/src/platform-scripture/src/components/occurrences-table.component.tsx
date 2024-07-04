import { useSetting } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import {
  ScriptureReference,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { useEffect, useState } from 'react';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

type SearchResult = {
  reference: ScriptureReference;
  snippet: string;
};

const extractOccurrences = (
  text: string,
  character: string,
  scriptureRef: ScriptureReference,
): SearchResult[] => {
  if (text === '' || character === '') return [];

  const results: SearchResult[] = [];
  const lines = text.split('\n');

  let currentChapter: string = '0';
  let currentVerse: string = '0';

  lines.forEach((line) => {
    const words = line.split(/\s+/);
    if (line.startsWith('\\c')) {
      [, currentChapter] = words;
      currentVerse = '0';
    }
    if (line.startsWith('\\v')) {
      [, currentVerse] = words;
      if (currentChapter === '0') {
        currentChapter = scriptureRef.chapterNum.toString();
      }
    }

    for (let i = 0; i < words.length; i++) {
      if (words[i].includes(character)) {
        const start = Math.max(0, i - 2);
        const end = Math.min(words.length, i + 3);
        const snippet = words.slice(start, end).join(' ');
        const result: SearchResult = {
          reference: { ...scriptureRef, chapterNum: +currentChapter, verseNum: +currentVerse },
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
  text: string;
}

function OccurrencesTable({ selectedCharacter, text }: OccurrencesTableProps) {
  const [scriptureRef, setScriptureRef] = useSetting('platform.verseRef', defaultVerseRef);
  const [tableData, setTableData] = useState<SearchResult[]>(
    extractOccurrences(text, selectedCharacter, scriptureRef),
  );

  useEffect(
    () => setTableData(extractOccurrences(text, selectedCharacter, scriptureRef)),
    [text, selectedCharacter, scriptureRef],
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
          // This needs a unique key
          <TableRow
            onClick={() => {
              setScriptureRef(result.reference);
            }}
          >
            <TableCell>{`${Canon.bookNumberToEnglishName(result.reference.bookNum)} ${result.reference.chapterNum}:${result.reference.verseNum}`}</TableCell>
            <TableCell>{result.snippet}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
