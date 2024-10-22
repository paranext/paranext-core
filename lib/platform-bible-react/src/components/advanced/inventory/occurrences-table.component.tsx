import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Canon } from '@sillsdev/scripture';
import { deepEqual, LanguageStrings, ScriptureReference } from 'platform-bible-utils';
import { useMemo } from 'react';
import { InventoryTableData } from './inventory-utils';

type OccurrencesTableProps = {
  tableData: InventoryTableData[];
  selectedItem: string[];
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
};

function OccurrencesTable({
  tableData,
  selectedItem,
  setScriptureReference,
  localizedStrings,
}: OccurrencesTableProps) {
  const referenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_reference%'];
  const occurrenceHeaderText =
    localizedStrings['%webView_inventory_occurrences_table_header_occurrence%'];

  const selectedTableData = useMemo(
    () =>
      tableData.filter((tableEntry: InventoryTableData) =>
        deepEqual(tableEntry.items, selectedItem),
      ),
    [selectedItem, tableData],
  );

  if (selectedTableData.length > 1) throw new Error('Selected item is not unique');

  return (
    <Table stickyHeader>
      <TableHeader stickyHeader>
        <TableRow>
          <TableHead>{referenceHeaderText}</TableHead>
          <TableHead>{occurrenceHeaderText}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedTableData.length > 0 &&
          selectedTableData[0].occurrences.map((occurrence, index) => (
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
