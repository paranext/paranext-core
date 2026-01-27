import { useCallback, useMemo } from 'react';
import { Button, Checkbox, cn, Label } from 'platform-bible-react';

/** Book entry with canonical number and English name. */
interface BookInfo {
  num: number;
  name: string;
}

const OT_BOOKS: BookInfo[] = [
  { num: 1, name: 'Genesis' },
  { num: 2, name: 'Exodus' },
  { num: 3, name: 'Leviticus' },
  { num: 4, name: 'Numbers' },
  { num: 5, name: 'Deuteronomy' },
  { num: 6, name: 'Joshua' },
  { num: 7, name: 'Judges' },
  { num: 8, name: 'Ruth' },
  { num: 9, name: '1 Samuel' },
  { num: 10, name: '2 Samuel' },
  { num: 11, name: '1 Kings' },
  { num: 12, name: '2 Kings' },
  { num: 13, name: '1 Chronicles' },
  { num: 14, name: '2 Chronicles' },
  { num: 15, name: 'Ezra' },
  { num: 16, name: 'Nehemiah' },
  { num: 17, name: 'Esther' },
  { num: 18, name: 'Job' },
  { num: 19, name: 'Psalms' },
  { num: 20, name: 'Proverbs' },
  { num: 21, name: 'Ecclesiastes' },
  { num: 22, name: 'Song of Solomon' },
  { num: 23, name: 'Isaiah' },
  { num: 24, name: 'Jeremiah' },
  { num: 25, name: 'Lamentations' },
  { num: 26, name: 'Ezekiel' },
  { num: 27, name: 'Daniel' },
  { num: 28, name: 'Hosea' },
  { num: 29, name: 'Joel' },
  { num: 30, name: 'Amos' },
  { num: 31, name: 'Obadiah' },
  { num: 32, name: 'Jonah' },
  { num: 33, name: 'Micah' },
  { num: 34, name: 'Nahum' },
  { num: 35, name: 'Habakkuk' },
  { num: 36, name: 'Zephaniah' },
  { num: 37, name: 'Haggai' },
  { num: 38, name: 'Zechariah' },
  { num: 39, name: 'Malachi' },
];

const NT_BOOKS: BookInfo[] = [
  { num: 40, name: 'Matthew' },
  { num: 41, name: 'Mark' },
  { num: 42, name: 'Luke' },
  { num: 43, name: 'John' },
  { num: 44, name: 'Acts' },
  { num: 45, name: 'Romans' },
  { num: 46, name: '1 Corinthians' },
  { num: 47, name: '2 Corinthians' },
  { num: 48, name: 'Galatians' },
  { num: 49, name: 'Ephesians' },
  { num: 50, name: 'Philippians' },
  { num: 51, name: 'Colossians' },
  { num: 52, name: '1 Thessalonians' },
  { num: 53, name: '2 Thessalonians' },
  { num: 54, name: '1 Timothy' },
  { num: 55, name: '2 Timothy' },
  { num: 56, name: 'Titus' },
  { num: 57, name: 'Philemon' },
  { num: 58, name: 'Hebrews' },
  { num: 59, name: 'James' },
  { num: 60, name: '1 Peter' },
  { num: 61, name: '2 Peter' },
  { num: 62, name: '1 John' },
  { num: 63, name: '2 John' },
  { num: 64, name: '3 John' },
  { num: 65, name: 'Jude' },
  { num: 66, name: 'Revelation' },
];

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];
const TOTAL_BOOKS = ALL_BOOKS.length;

export interface BooksTabProps {
  /** Array of selected book numbers (1-66). */
  plannedBooks: number[];
  /** Callback when book selection changes. */
  onPlannedBooksChange: (books: number[]) => void;
  /** Whether the entire tab is disabled. */
  disabled?: boolean;
}

/** Book group section with a heading, select/deselect all toggle, and individual book checkboxes. */
function BookGroup({
  label,
  books,
  selectedBooks,
  onToggleBook,
  onSelectAll,
  onDeselectAll,
  disabled,
}: {
  label: string;
  books: BookInfo[];
  selectedBooks: Set<number>;
  onToggleBook: (bookNum: number, checked: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  disabled?: boolean;
}) {
  const allSelected = books.every((b) => selectedBooks.has(b.num));
  const noneSelected = books.every((b) => !selectedBooks.has(b.num));

  return (
    <fieldset className="tw-border-0 tw-p-0 tw-m-0" disabled={disabled}>
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
        <legend className="tw-font-semibold tw-text-sm">{label}</legend>
        <div className="tw-flex tw-gap-2">
          <Button
            variant="link"
            size="sm"
            onClick={onSelectAll}
            disabled={disabled || allSelected}
            className="tw-h-auto tw-p-0 tw-text-xs"
          >
            Select All
          </Button>
          <span className="tw-text-muted-foreground tw-text-xs">/</span>
          <Button
            variant="link"
            size="sm"
            onClick={onDeselectAll}
            disabled={disabled || noneSelected}
            className="tw-h-auto tw-p-0 tw-text-xs"
          >
            Deselect All
          </Button>
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1">
        {books.map((book) => {
          const id = `book-${book.num}`;
          return (
            <div key={book.num} className="tw-flex tw-items-center tw-gap-2">
              <Checkbox
                id={id}
                checked={selectedBooks.has(book.num)}
                onCheckedChange={(checked: boolean) => onToggleBook(book.num, checked)}
                disabled={disabled}
              />
              <Label htmlFor={id} className="tw-cursor-pointer tw-text-sm tw-font-normal">
                {book.name}
              </Label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * BooksTab - Tab content component for selecting planned books in a project.
 *
 * Displays OT and NT book groups with individual checkboxes and group-level select/deselect
 * toggles. Shows a count of selected books.
 */
export function BooksTab({ plannedBooks, onPlannedBooksChange, disabled }: BooksTabProps) {
  const selectedSet = useMemo(() => new Set(plannedBooks), [plannedBooks]);

  const handleToggleBook = useCallback(
    (bookNum: number, checked: boolean) => {
      if (checked) {
        onPlannedBooksChange([...plannedBooks, bookNum].sort((a, b) => a - b));
      } else {
        onPlannedBooksChange(plannedBooks.filter((b) => b !== bookNum));
      }
    },
    [plannedBooks, onPlannedBooksChange],
  );

  const selectGroup = useCallback(
    (books: BookInfo[]) => {
      const groupNums = new Set(books.map((b) => b.num));
      const otherBooks = plannedBooks.filter((b) => !groupNums.has(b));
      const merged = [...otherBooks, ...books.map((b) => b.num)].sort((a, b) => a - b);
      onPlannedBooksChange(merged);
    },
    [plannedBooks, onPlannedBooksChange],
  );

  const deselectGroup = useCallback(
    (books: BookInfo[]) => {
      const groupNums = new Set(books.map((b) => b.num));
      onPlannedBooksChange(plannedBooks.filter((b) => !groupNums.has(b)));
    },
    [plannedBooks, onPlannedBooksChange],
  );

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4')} data-testid="books-tab">
      <p className="tw-text-sm tw-text-muted-foreground">
        {plannedBooks.length} of {TOTAL_BOOKS} books selected
      </p>

      <BookGroup
        label="Old Testament"
        books={OT_BOOKS}
        selectedBooks={selectedSet}
        onToggleBook={handleToggleBook}
        onSelectAll={() => selectGroup(OT_BOOKS)}
        onDeselectAll={() => deselectGroup(OT_BOOKS)}
        disabled={disabled}
      />

      <BookGroup
        label="New Testament"
        books={NT_BOOKS}
        selectedBooks={selectedSet}
        onToggleBook={handleToggleBook}
        onSelectAll={() => selectGroup(NT_BOOKS)}
        onDeselectAll={() => deselectGroup(NT_BOOKS)}
        disabled={disabled}
      />
    </div>
  );
}

export default BooksTab;
