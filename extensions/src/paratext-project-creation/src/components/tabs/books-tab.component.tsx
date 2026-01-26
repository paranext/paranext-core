import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Label, Checkbox, cn } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useProjectCreation } from '../../context/project-creation-context';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_books_title%',
  '%projectCreation_books_instruction%',
  '%projectCreation_books_notNeeded%',
  '%projectCreation_books_oldTestament%',
  '%projectCreation_books_newTestament%',
  '%projectCreation_books_deuterocanonical%',
  '%projectCreation_books_nonCanonical%',
  '%projectCreation_books_selectAll%',
  '%projectCreation_books_deselectAll%',
];

// Book definitions by category
interface BookInfo {
  num: number;
  abbr: string;
  name: string;
}

const OT_BOOKS: BookInfo[] = [
  { num: 1, abbr: 'GEN', name: 'Genesis' },
  { num: 2, abbr: 'EXO', name: 'Exodus' },
  { num: 3, abbr: 'LEV', name: 'Leviticus' },
  { num: 4, abbr: 'NUM', name: 'Numbers' },
  { num: 5, abbr: 'DEU', name: 'Deuteronomy' },
  { num: 6, abbr: 'JOS', name: 'Joshua' },
  { num: 7, abbr: 'JDG', name: 'Judges' },
  { num: 8, abbr: 'RUT', name: 'Ruth' },
  { num: 9, abbr: '1SA', name: '1 Samuel' },
  { num: 10, abbr: '2SA', name: '2 Samuel' },
  { num: 11, abbr: '1KI', name: '1 Kings' },
  { num: 12, abbr: '2KI', name: '2 Kings' },
  { num: 13, abbr: '1CH', name: '1 Chronicles' },
  { num: 14, abbr: '2CH', name: '2 Chronicles' },
  { num: 15, abbr: 'EZR', name: 'Ezra' },
  { num: 16, abbr: 'NEH', name: 'Nehemiah' },
  { num: 17, abbr: 'EST', name: 'Esther' },
  { num: 18, abbr: 'JOB', name: 'Job' },
  { num: 19, abbr: 'PSA', name: 'Psalms' },
  { num: 20, abbr: 'PRO', name: 'Proverbs' },
  { num: 21, abbr: 'ECC', name: 'Ecclesiastes' },
  { num: 22, abbr: 'SNG', name: 'Song of Songs' },
  { num: 23, abbr: 'ISA', name: 'Isaiah' },
  { num: 24, abbr: 'JER', name: 'Jeremiah' },
  { num: 25, abbr: 'LAM', name: 'Lamentations' },
  { num: 26, abbr: 'EZK', name: 'Ezekiel' },
  { num: 27, abbr: 'DAN', name: 'Daniel' },
  { num: 28, abbr: 'HOS', name: 'Hosea' },
  { num: 29, abbr: 'JOL', name: 'Joel' },
  { num: 30, abbr: 'AMO', name: 'Amos' },
  { num: 31, abbr: 'OBA', name: 'Obadiah' },
  { num: 32, abbr: 'JON', name: 'Jonah' },
  { num: 33, abbr: 'MIC', name: 'Micah' },
  { num: 34, abbr: 'NAM', name: 'Nahum' },
  { num: 35, abbr: 'HAB', name: 'Habakkuk' },
  { num: 36, abbr: 'ZEP', name: 'Zephaniah' },
  { num: 37, abbr: 'HAG', name: 'Haggai' },
  { num: 38, abbr: 'ZEC', name: 'Zechariah' },
  { num: 39, abbr: 'MAL', name: 'Malachi' },
];

const NT_BOOKS: BookInfo[] = [
  { num: 40, abbr: 'MAT', name: 'Matthew' },
  { num: 41, abbr: 'MRK', name: 'Mark' },
  { num: 42, abbr: 'LUK', name: 'Luke' },
  { num: 43, abbr: 'JHN', name: 'John' },
  { num: 44, abbr: 'ACT', name: 'Acts' },
  { num: 45, abbr: 'ROM', name: 'Romans' },
  { num: 46, abbr: '1CO', name: '1 Corinthians' },
  { num: 47, abbr: '2CO', name: '2 Corinthians' },
  { num: 48, abbr: 'GAL', name: 'Galatians' },
  { num: 49, abbr: 'EPH', name: 'Ephesians' },
  { num: 50, abbr: 'PHP', name: 'Philippians' },
  { num: 51, abbr: 'COL', name: 'Colossians' },
  { num: 52, abbr: '1TH', name: '1 Thessalonians' },
  { num: 53, abbr: '2TH', name: '2 Thessalonians' },
  { num: 54, abbr: '1TI', name: '1 Timothy' },
  { num: 55, abbr: '2TI', name: '2 Timothy' },
  { num: 56, abbr: 'TIT', name: 'Titus' },
  { num: 57, abbr: 'PHM', name: 'Philemon' },
  { num: 58, abbr: 'HEB', name: 'Hebrews' },
  { num: 59, abbr: 'JAS', name: 'James' },
  { num: 60, abbr: '1PE', name: '1 Peter' },
  { num: 61, abbr: '2PE', name: '2 Peter' },
  { num: 62, abbr: '1JN', name: '1 John' },
  { num: 63, abbr: '2JN', name: '2 John' },
  { num: 64, abbr: '3JN', name: '3 John' },
  { num: 65, abbr: 'JUD', name: 'Jude' },
  { num: 66, abbr: 'REV', name: 'Revelation' },
];

const DC_BOOKS: BookInfo[] = [
  { num: 67, abbr: 'TOB', name: 'Tobit' },
  { num: 68, abbr: 'JDT', name: 'Judith' },
  { num: 69, abbr: 'ESG', name: 'Esther (Greek)' },
  { num: 70, abbr: 'WIS', name: 'Wisdom of Solomon' },
  { num: 71, abbr: 'SIR', name: 'Sirach' },
  { num: 72, abbr: 'BAR', name: 'Baruch' },
  { num: 73, abbr: 'LJE', name: 'Letter of Jeremiah' },
  { num: 74, abbr: 'S3Y', name: 'Song of Three Youths' },
  { num: 75, abbr: 'SUS', name: 'Susanna' },
  { num: 76, abbr: 'BEL', name: 'Bel and the Dragon' },
  { num: 77, abbr: '1MA', name: '1 Maccabees' },
  { num: 78, abbr: '2MA', name: '2 Maccabees' },
];

/** Book Chooser Section Component */
function BookSection({
  title,
  books,
  selectedBooks,
  onBookToggle,
  onSelectAll,
  onDeselectAll,
  localizedStrings,
}: {
  title: string;
  books: BookInfo[];
  selectedBooks: number[];
  onBookToggle: (bookNum: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  localizedStrings: Record<LocalizeKey, string>;
}) {
  const allSelected = useMemo(
    () => books.every((book) => selectedBooks.includes(book.num)),
    [books, selectedBooks],
  );

  const noneSelected = useMemo(
    () => books.every((book) => !selectedBooks.includes(book.num)),
    [books, selectedBooks],
  );

  return (
    <div className="tw-rounded-md tw-border tw-p-4">
      <div className="tw-mb-3 tw-flex tw-items-center tw-justify-between">
        <Label className="tw-font-semibold">{title}</Label>
        <div className="tw-flex tw-gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            disabled={allSelected}
            className={cn(
              'tw-text-sm tw-text-primary hover:tw-underline',
              allSelected && 'tw-cursor-not-allowed tw-opacity-50',
            )}
          >
            {localizedStrings['%projectCreation_books_selectAll%'] || 'Select All'}
          </button>
          <span className="tw-text-muted-foreground">|</span>
          <button
            type="button"
            onClick={onDeselectAll}
            disabled={noneSelected}
            className={cn(
              'tw-text-sm tw-text-primary hover:tw-underline',
              noneSelected && 'tw-cursor-not-allowed tw-opacity-50',
            )}
          >
            {localizedStrings['%projectCreation_books_deselectAll%'] || 'Deselect All'}
          </button>
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-4 tw-gap-2 md:tw-grid-cols-6 lg:tw-grid-cols-8">
        {books.map((book) => (
          <div key={book.num} className="tw-flex tw-items-center tw-gap-1" title={book.name}>
            <Checkbox
              id={`book-${book.num}`}
              checked={selectedBooks.includes(book.num)}
              onCheckedChange={() => onBookToggle(book.num)}
            />
            <Label
              htmlFor={`book-${book.num}`}
              className="tw-cursor-pointer tw-truncate tw-text-xs"
            >
              {book.abbr}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Books Tab Component (part of CAP-UI-001)
 *
 * Allows users to select the books planned for the project. Provides book selection organized by
 * Old Testament, New Testament, and Deuterocanonical sections with select/deselect all
 * functionality.
 *
 * Note: This is a placeholder implementation. The full book creation functionality is deferred to a
 * separate "book-creation" feature.
 */
export function BooksTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch } = useProjectCreation();

  // For ConsultantNotes, show message that books are not needed
  if (state.projectType === 'ConsultantNotes') {
    return (
      <div className="tw-flex tw-h-[300px] tw-items-center tw-justify-center tw-text-muted-foreground">
        {localizedStrings['%projectCreation_books_notNeeded%'] ||
          'Books are not needed for this type of project.'}
      </div>
    );
  }

  // Toggle a single book
  const handleBookToggle = useCallback(
    (bookNum: number) => {
      const newBooks = state.plannedBooks.includes(bookNum)
        ? state.plannedBooks.filter((b) => b !== bookNum)
        : [...state.plannedBooks, bookNum];
      dispatch({ type: 'SET_PLANNED_BOOKS', books: newBooks.sort((a, b) => a - b) });
    },
    [dispatch, state.plannedBooks],
  );

  // Select all books in a category
  const selectAllInCategory = useCallback(
    (books: BookInfo[]) => {
      const bookNums = books.map((b) => b.num);
      const newBooks = [...new Set([...state.plannedBooks, ...bookNums])].sort((a, b) => a - b);
      dispatch({ type: 'SET_PLANNED_BOOKS', books: newBooks });
    },
    [dispatch, state.plannedBooks],
  );

  // Deselect all books in a category
  const deselectAllInCategory = useCallback(
    (books: BookInfo[]) => {
      const bookNums = new Set(books.map((b) => b.num));
      const newBooks = state.plannedBooks.filter((b) => !bookNums.has(b));
      dispatch({ type: 'SET_PLANNED_BOOKS', books: newBooks });
    },
    [dispatch, state.plannedBooks],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <p className="tw-text-sm tw-text-muted-foreground">
        {localizedStrings['%projectCreation_books_instruction%'] ||
          'Select the books planned for this project:'}
      </p>

      {/* Old Testament */}
      <BookSection
        title={localizedStrings['%projectCreation_books_oldTestament%'] || 'Old Testament'}
        books={OT_BOOKS}
        selectedBooks={state.plannedBooks}
        onBookToggle={handleBookToggle}
        onSelectAll={() => selectAllInCategory(OT_BOOKS)}
        onDeselectAll={() => deselectAllInCategory(OT_BOOKS)}
        localizedStrings={localizedStrings}
      />

      {/* New Testament */}
      <BookSection
        title={localizedStrings['%projectCreation_books_newTestament%'] || 'New Testament'}
        books={NT_BOOKS}
        selectedBooks={state.plannedBooks}
        onBookToggle={handleBookToggle}
        onSelectAll={() => selectAllInCategory(NT_BOOKS)}
        onDeselectAll={() => deselectAllInCategory(NT_BOOKS)}
        localizedStrings={localizedStrings}
      />

      {/* Deuterocanonical */}
      <BookSection
        title={localizedStrings['%projectCreation_books_deuterocanonical%'] || 'Deuterocanonical'}
        books={DC_BOOKS}
        selectedBooks={state.plannedBooks}
        onBookToggle={handleBookToggle}
        onSelectAll={() => selectAllInCategory(DC_BOOKS)}
        onDeselectAll={() => deselectAllInCategory(DC_BOOKS)}
        localizedStrings={localizedStrings}
      />
    </div>
  );
}

export default BooksTab;
