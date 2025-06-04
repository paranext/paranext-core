import { Table, TableBody } from 'platform-bible-react';
import { DictionaryEntry, DictionaryListItem } from './dictionary-list-item.component';

export type DictionaryTableProps = {
  /** Array of dictionary entries */
  dictionaryData: DictionaryEntry[];
  /** Callback function to handle entry click */
  handleEntryClick: (entry: DictionaryEntry) => void;
};

/**
 * Renders a table containing a list of dictionary entries. Each entry is displayed as a
 * DictionaryListItem. The table has a sticky header and supports entry click handling.
 */
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
