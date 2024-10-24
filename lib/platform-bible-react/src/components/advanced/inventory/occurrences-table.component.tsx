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
import { InventoryItemOccurrence } from './inventory-utils';

/** Props for the OccurrencesTable component */
type OccurrencesTableProps = {
  /** Data that contains scriptures references and snippets of scripture */
  occurrenceData: InventoryItemOccurrence[];
  /** Callback function that is executed when the scripture reference is changed */
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
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
function OccurrencesTable({
  occurrenceData,
  setScriptureReference,
  localizedStrings,
}: OccurrencesTableProps) {
  const referenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_reference%'];
  const occurrenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_occurrence%'];

  return (
    <Table stickyHeader>
      <TableHeader stickyHeader>
        <TableRow>
          <TableHead>{referenceHeaderText}</TableHead>
          <TableHead>{occurrenceHeaderText}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {occurrenceData.length > 0 &&
          occurrenceData.map((occurrence, index) => (
            <TableRow
              // This might need to be fixed
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => {
                setScriptureReference(occurrence.reference);
              }}
            >
              <TableCell>{`${Canon.bookNumberToEnglishName(occurrence.reference.bookNum)} ${occurrence.reference.chapterNum}:${occurrence.reference.verseNum}`}</TableCell>
              <TableCell>{occurrence.text}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default OccurrencesTable;
