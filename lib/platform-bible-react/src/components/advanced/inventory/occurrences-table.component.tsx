import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';
import { ReactNode, useMemo } from 'react';
import { InventoryItemOccurrence } from './inventory-utils';

/**
 * Convert text with `\\word\\` markers to React elements with bold formatting.
 *
 * @param text Text containing `\\word\\` markers for bolding
 * @returns Array of React nodes with text and bold elements
 */
function formatTextWithBold(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  // Look for text wrapped in double backslashes (e.g., \\bolded text\\)
  const regex = /\\\\(.+?)\\\\/g;
  let match;

  // regex.exec() returns null when no match is found
  // eslint-disable-next-line no-null/no-null, no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the bold text
    parts.push(<b key={match.index}>{match[1]}</b>);
    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/** Props for the OccurrencesTable component */
type OccurrencesTableProps = {
  /** Data that contains scriptures references and snippets of scripture */
  occurrenceData: InventoryItemOccurrence[];
  /** Callback function that is executed when the scripture reference is changed */
  setScriptureReference: (scriptureReference: SerializedVerseRef) => void;
  /**
   * Object with all localized strings that the OccurrencesTable needs to work well across multiple
   * languages
   */
  localizedStrings: LanguageStrings;
};

/**
 * Table that shows occurrences of specified inventory item(s). The first column shows the related
 * scripture reference. The second column shows the snippet of scripture that contains the specified
 * inventory item
 */
export function OccurrencesTable({
  occurrenceData,
  setScriptureReference,
  localizedStrings,
}: OccurrencesTableProps) {
  const referenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_reference%'];
  const occurrenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_occurrence%'];

  const occurrences: InventoryItemOccurrence[] = useMemo(() => {
    const uniqueOccurrences: InventoryItemOccurrence[] = [];
    const seen = new Set<string>();

    occurrenceData.forEach((occurrence) => {
      const key = `${occurrence.reference.book}:${occurrence.reference.chapterNum}:${occurrence.reference.verseNum}:${occurrence.text}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueOccurrences.push(occurrence);
      }
    });

    return uniqueOccurrences;
  }, [occurrenceData]);

  return (
    <Table stickyHeader>
      <TableHeader stickyHeader>
        <TableRow>
          <TableHead>{referenceHeaderText}</TableHead>
          <TableHead>{occurrenceHeaderText}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {occurrences.length > 0 &&
          occurrences.map((occurrence) => (
            <TableRow
              key={`${occurrence.reference.book} ${occurrence.reference.chapterNum}:${
                occurrence.reference.verseNum
              }-${occurrence.text}`}
              onClick={() => {
                setScriptureReference(occurrence.reference);
              }}
            >
              <TableCell>{`${Canon.bookIdToEnglishName(occurrence.reference.book)} ${occurrence.reference.chapterNum}:${occurrence.reference.verseNum}`}</TableCell>
              <TableCell>{formatTextWithBold(occurrence.text)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
