import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { deepEqual, LanguageStrings } from 'platform-bible-utils';
import { useMemo } from 'react';
import { InventoryItemOccurrence } from './inventory-utils';

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

    occurrenceData.forEach((occurrence) => {
      if (!uniqueOccurrences.some((uniqueOccurrence) => deepEqual(uniqueOccurrence, occurrence))) {
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
              <TableCell>{occurrence.text}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
