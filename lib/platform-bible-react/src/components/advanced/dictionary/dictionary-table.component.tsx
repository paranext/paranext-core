import { Table, TableBody } from '@/components/shadcn-ui/table';
import { DictionaryEntry, DictionaryListItem } from './dictionary-list-item.component';

type DictionaryTableProps = {
  /** Array of dictionary entries */
  dictionaryData: DictionaryEntry[];
  /** Callback function to handle entry click */
  handleEntryClick: (entry: DictionaryEntry) => void;
};

export function DictionaryTable({ dictionaryData, handleEntryClick }: DictionaryTableProps) {
  return (
    <Table stickyHeader>
      <TableBody>
        {dictionaryData.map((entry) => (
          <DictionaryListItem
            key={entry.id}
            dictionaryEntry={entry}
            handleEntryClick={handleEntryClick}
          />
        ))}
      </TableBody>
    </Table>
  );
}
