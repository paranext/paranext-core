import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Checkbox, Label } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { Canon } from '@sillsdev/scripture';
import { useCallback, useMemo } from 'react';
import type { ProjectPropertiesFormState } from 'platform-projects';

// #region Constants

/** First scripture book number (Genesis) */
const FIRST_SCR_BOOK_NUM = 1;
/** Last scripture book number */
const LAST_SCR_BOOK_NUM = 87;

/** Book number ranges for each Testament section */
const OT_BOOKS = { start: 1, end: 39 }; // Genesis to Malachi
const NT_BOOKS = { start: 40, end: 66 }; // Matthew to Revelation
const DC_BOOKS = { start: 67, end: 87 }; // Deuterocanonical books

// #region Localized Strings

const BOOKS_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_booksTab_header_ot%',
  '%webView_projectProperties_booksTab_header_nt%',
  '%webView_projectProperties_booksTab_header_dc%',
  '%webView_projectProperties_booksTab_selectAll%',
  '%webView_projectProperties_booksTab_deselectAll%',
  '%webView_projectProperties_booksTab_selectAllBooks%',
  '%webView_projectProperties_booksTab_deselectAllBooks%',
  '%webView_projectProperties_booksTab_validation_atLeastOne%',
];

// #endregion

// #region Types

interface BooksTabProps {
  formState: ProjectPropertiesFormState;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

interface BookInfo {
  bookId: string;
  bookNum: number;
  shortName: string;
}

// #endregion

// #region Helper Functions

/** Get all books in a range */
function getBooksInRange(start: number, end: number): BookInfo[] {
  const books: BookInfo[] = [];
  for (let bookNum = start; bookNum <= end; bookNum++) {
    // Only include valid book numbers
    if (bookNum >= FIRST_SCR_BOOK_NUM && bookNum <= LAST_SCR_BOOK_NUM) {
      const bookId = Canon.bookNumberToId(bookNum);
      books.push({
        bookId,
        bookNum,
        shortName: Canon.bookIdToEnglishName(bookId),
      });
    }
  }
  return books;
}

/** Get all available books grouped by section */
function getAllBooks(): { ot: BookInfo[]; nt: BookInfo[]; dc: BookInfo[] } {
  return {
    ot: getBooksInRange(OT_BOOKS.start, OT_BOOKS.end),
    nt: getBooksInRange(NT_BOOKS.start, NT_BOOKS.end),
    dc: getBooksInRange(DC_BOOKS.start, DC_BOOKS.end),
  };
}

// #endregion

// #region Book Section Component

interface BookSectionProps {
  title: string;
  books: BookInfo[];
  selectedBooks: string[];
  onSelectBook: (bookId: string, selected: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectAllLabel: string;
  deselectAllLabel: string;
  isDisabled: boolean;
}

function BookSection({
  title,
  books,
  selectedBooks,
  onSelectBook,
  onSelectAll,
  onDeselectAll,
  selectAllLabel,
  deselectAllLabel,
  isDisabled,
}: BookSectionProps) {
  // Check if all books in section are selected
  const allSelected = books.every((book) => selectedBooks.includes(book.bookId));
  const noneSelected = books.every((book) => !selectedBooks.includes(book.bookId));

  return (
    <div className="tw-mb-4">
      {/* Section Header */}
      <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-border tw-pb-2">
        <Label className="tw-text-base tw-font-semibold">{title}</Label>
        <div className="tw-flex tw-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            disabled={isDisabled || allSelected}
          >
            {selectAllLabel}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDeselectAll}
            disabled={isDisabled || noneSelected}
          >
            {deselectAllLabel}
          </Button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="tw-grid tw-grid-cols-4 tw-gap-1 sm:tw-grid-cols-6 md:tw-grid-cols-8 lg:tw-grid-cols-10">
        {books.map((book) => (
          <div key={book.bookId} className="tw-flex tw-items-center tw-gap-1">
            <Checkbox
              id={`book-${book.bookId}`}
              checked={selectedBooks.includes(book.bookId)}
              onCheckedChange={(checked) => onSelectBook(book.bookId, !!checked)}
              disabled={isDisabled}
            />
            <Label
              htmlFor={`book-${book.bookId}`}
              className="tw-cursor-pointer tw-text-xs"
              title={book.shortName}
            >
              {book.bookId}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

// #endregion

// #region Main Component

export function BooksTab({
  formState,
  onFieldChange,
  validationErrors,
  isDisabled,
}: BooksTabProps) {
  const [localizedStrings] = useLocalizedStrings(BOOKS_TAB_LOCALIZED_KEYS);

  // Get all available books
  const allBooks = useMemo(() => getAllBooks(), []);

  // Handle individual book selection
  const handleSelectBook = useCallback(
    (bookId: string, selected: boolean) => {
      const currentBooks = formState.selectedBooks;
      let newBooks: string[];

      if (selected) {
        newBooks = [...currentBooks, bookId];
      } else {
        newBooks = currentBooks.filter((id) => id !== bookId);
      }

      onFieldChange('selectedBooks', newBooks);
    },
    [formState.selectedBooks, onFieldChange],
  );

  // Handle select all for a section
  const handleSelectAllSection = useCallback(
    (books: BookInfo[]) => {
      const currentBooks = formState.selectedBooks;
      const newBookIds = books.map((b) => b.bookId);
      const combined = [...new Set([...currentBooks, ...newBookIds])];
      onFieldChange('selectedBooks', combined);
    },
    [formState.selectedBooks, onFieldChange],
  );

  // Handle deselect all for a section
  const handleDeselectAllSection = useCallback(
    (books: BookInfo[]) => {
      const currentBooks = formState.selectedBooks;
      const bookIdsToRemove = new Set(books.map((b) => b.bookId));
      const remaining = currentBooks.filter((id) => !bookIdsToRemove.has(id));
      onFieldChange('selectedBooks', remaining);
    },
    [formState.selectedBooks, onFieldChange],
  );

  // Handle select all books
  const handleSelectAllBooks = useCallback(() => {
    const allBookIds = [...allBooks.ot, ...allBooks.nt, ...allBooks.dc].map((b) => b.bookId);
    onFieldChange('selectedBooks', allBookIds);
  }, [allBooks, onFieldChange]);

  // Handle deselect all books
  const handleDeselectAllBooks = useCallback(() => {
    onFieldChange('selectedBooks', []);
  }, [onFieldChange]);

  // Validation error display
  const booksError = validationErrors.selectedBooks;

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Global Actions */}
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button variant="default" size="sm" onClick={handleSelectAllBooks} disabled={isDisabled}>
          {localizedStrings['%webView_projectProperties_booksTab_selectAllBooks%']}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeselectAllBooks}
          disabled={isDisabled || formState.selectedBooks.length === 0}
        >
          {localizedStrings['%webView_projectProperties_booksTab_deselectAllBooks%']}
        </Button>
      </div>

      {/* Validation Error */}
      {booksError && (
        <div className="tw-rounded-md tw-border tw-border-destructive tw-bg-destructive/10 tw-p-2 tw-text-sm tw-text-destructive">
          {booksError}
        </div>
      )}

      {/* Selection Count */}
      <div className="tw-text-sm tw-text-muted-foreground">
        {formState.selectedBooks.length} book(s) selected
      </div>

      {/* Book Sections */}
      <div className="tw-max-h-[400px] tw-overflow-y-auto tw-pr-2">
        {/* Old Testament */}
        <BookSection
          title={localizedStrings['%webView_projectProperties_booksTab_header_ot%']}
          books={allBooks.ot}
          selectedBooks={formState.selectedBooks}
          onSelectBook={handleSelectBook}
          onSelectAll={() => handleSelectAllSection(allBooks.ot)}
          onDeselectAll={() => handleDeselectAllSection(allBooks.ot)}
          selectAllLabel={localizedStrings['%webView_projectProperties_booksTab_selectAll%']}
          deselectAllLabel={localizedStrings['%webView_projectProperties_booksTab_deselectAll%']}
          isDisabled={isDisabled}
        />

        {/* New Testament */}
        <BookSection
          title={localizedStrings['%webView_projectProperties_booksTab_header_nt%']}
          books={allBooks.nt}
          selectedBooks={formState.selectedBooks}
          onSelectBook={handleSelectBook}
          onSelectAll={() => handleSelectAllSection(allBooks.nt)}
          onDeselectAll={() => handleDeselectAllSection(allBooks.nt)}
          selectAllLabel={localizedStrings['%webView_projectProperties_booksTab_selectAll%']}
          deselectAllLabel={localizedStrings['%webView_projectProperties_booksTab_deselectAll%']}
          isDisabled={isDisabled}
        />

        {/* Deuterocanon */}
        <BookSection
          title={localizedStrings['%webView_projectProperties_booksTab_header_dc%']}
          books={allBooks.dc}
          selectedBooks={formState.selectedBooks}
          onSelectBook={handleSelectBook}
          onSelectAll={() => handleSelectAllSection(allBooks.dc)}
          onDeselectAll={() => handleDeselectAllSection(allBooks.dc)}
          selectAllLabel={localizedStrings['%webView_projectProperties_booksTab_selectAll%']}
          deselectAllLabel={localizedStrings['%webView_projectProperties_booksTab_deselectAll%']}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default BooksTab;

// #endregion
