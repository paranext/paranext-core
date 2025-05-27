import { TableCell, TableRow } from '@/components/shadcn-ui/table';
import { SerializedVerseRef } from '@sillsdev/scripture';

/** DictionaryEntry is a type that represents a dictionary entry. */
export type DictionaryEntry = {
  id: string;
  hebrew: string;
  transliteration: string;
  strongsNumber: string;
  partOfSpeech: string;
  definition: string;
  usage: SerializedVerseRef[];
};

/** Props for the DictionaryListItem component */
type DictionaryListItemProps = {
  /** The dictionary entry to render */
  dictionaryEntry: DictionaryEntry;
  /** Callback function to handle entry click */
  handleEntryClick: (entry: DictionaryEntry) => void;
};

/**
 * Renders a list item for a dictionary entry.
 *
 * @property {DictionaryEntry} dictionaryEntry - The dictionary entry to render.
 * @param {DictionaryListItemProps} props
 * @returns {JSX.Element} The rendered list item.
 */
export function DictionaryListItem({ dictionaryEntry, handleEntryClick }: DictionaryListItemProps) {
  return (
    <TableRow
      key={dictionaryEntry.id}
      onClick={() => handleEntryClick(dictionaryEntry)}
      onSelect={() => handleEntryClick(dictionaryEntry)}
      className="tw-flex tw-cursor-pointer tw-items-center tw-border-b-0"
    >
      <TableCell colSpan={100} className="tw-p-2">
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-font-bold">{dictionaryEntry.hebrew}</span>
          <span className="tw-text-sm tw-text-muted-foreground">
            {dictionaryEntry.transliteration}
          </span>
          <span className="tw-rounded tw-bg-blue-100 tw-px-1.5 tw-py-0.5 tw-text-xs">
            {dictionaryEntry.strongsNumber}
          </span>
        </div>
        <p className="tw-truncate tw-text-sm tw-text-muted-foreground">
          {dictionaryEntry.definition}
        </p>
      </TableCell>
    </TableRow>
  );
}

DictionaryListItem.displayName = 'DictionaryListItem';
