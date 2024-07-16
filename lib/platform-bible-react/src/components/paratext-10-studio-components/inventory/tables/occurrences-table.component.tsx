import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Canon } from '@sillsdev/scripture';
import { LanguageStrings, ScriptureReference } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

type SearchResult = {
  reference: ScriptureReference;
  snippet: string;
  key: number;
};

const extractOccurrences = (
  text: string | undefined,
  item: string,
  scriptureRef: ScriptureReference,
): SearchResult[] => {
  if (!text || text === '' || item === '') return [];

  const results: SearchResult[] = [];
  const lines = text.split('\n');

  let currentChapter: string = '0';
  let currentVerse: string = '0';
  let key: number = 0;


  /* Refactor to WebView */
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
      if (words[i].includes(item)) {
        const start = Math.max(0, i - 2);
        const end = Math.min(words.length, i + 3);
        const snippet = words.slice(start, end).join(' ');
        const result: SearchResult = {
          reference: { ...scriptureRef, chapterNum: +currentChapter, verseNum: +currentVerse },
          snippet,
          key,
        };
        key += 1;
        results.push(result);
      }
    }
    /* end */
  });

  return results;
};

interface OccurrencesTableProps {
  selectedItem: string;
  text: string | undefined;
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
}

function OccurrencesTable({
  selectedItem,
  text,
  scriptureReference,
  setScriptureReference,
  localizedStrings,
}: OccurrencesTableProps) {
  const reference = localizedStrings['%webView_inventory_occurrences_table_header_reference%'];
  const occurrence = localizedStrings['%webView_inventory_occurrences_table_header_occurrence%'];
  const [tableData, setTableData] = useState<SearchResult[]>(
    extractOccurrences(text, selectedItem, scriptureReference),
  );

  useEffect(
    () => setTableData(extractOccurrences(text, selectedItem, scriptureReference)),
    [text, selectedItem, scriptureReference],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{reference}</TableHead>
          <TableHead>{occurrence}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((result) => (
          <TableRow
            key={result.key}
            onClick={() => {
              setScriptureReference(result.reference);
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
