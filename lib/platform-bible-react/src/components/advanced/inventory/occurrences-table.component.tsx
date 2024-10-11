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
import { extractNumberFromUSFM, getLinesFromUSFM } from './inventory-utils';

type SearchResult = {
  reference: ScriptureReference;
  snippet: string;
  key: number;
};

const extractOccurrences = (
  text: string | undefined,
  item: string,
  items: string[],
  scriptureRef: ScriptureReference,
): SearchResult[] => {
  if (!text || text === '' || item === '') return [];

  const results: SearchResult[] = [];
  const lines = getLinesFromUSFM(text);

  let currentChapter: number | undefined = scriptureRef.chapterNum;
  let currentVerse: number | undefined = scriptureRef.verseNum;
  let key: number = 0;

  lines.forEach((line) => {
    if (line.startsWith('\\id')) {
      currentChapter = 0;
      currentVerse = 0;
    }
    if (line.startsWith('\\c')) {
      currentChapter = extractNumberFromUSFM(line);
      currentVerse = 0;
    }
    if (line.startsWith('\\v')) {
      currentVerse = extractNumberFromUSFM(line);
      if (currentChapter === 0) {
        currentChapter = scriptureRef.chapterNum;
      }
    }

    const uniqueItems: string[] = Array.from(new Set(items));

    const itemsInLine: string[] = [];

    uniqueItems.forEach((uniqueItem) => {
      // Find all occurrences of the item
      const regex = new RegExp(uniqueItem, 'g');
      const matches = line.match(regex);

      if (matches) {
        itemsInLine.push(...matches);
      }
    });

    for (let i = 0; i < itemsInLine.length; i++) {
      const result: SearchResult = {
        reference: {
          ...scriptureRef,
          chapterNum: currentChapter !== undefined ? +currentChapter : -1,
          verseNum: currentVerse !== undefined ? +currentVerse : -1,
        },
        snippet: line,
        key,
      };
      key += 1;
      results.push(result);
    }
  });

  return results;
};

type OccurrencesTableProps = {
  selectedItem: string;
  text: string | undefined;
  items: string[];
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
};

function OccurrencesTable({
  selectedItem,
  text,
  items,
  scriptureReference,
  setScriptureReference,
  localizedStrings,
}: OccurrencesTableProps) {
  const reference = localizedStrings['%webView_inventory_occurrences_table_header_reference%'];
  const occurrence = localizedStrings['%webView_inventory_occurrences_table_header_occurrence%'];
  const [tableData, setTableData] = useState<SearchResult[]>(
    extractOccurrences(text, selectedItem, items, scriptureReference),
  );

  useEffect(
    () => setTableData(extractOccurrences(text, selectedItem, items, scriptureReference)),
    [text, selectedItem, scriptureReference, items],
  );

  return (
    <Table stickyHeader>
      <TableHeader stickyHeader>
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
