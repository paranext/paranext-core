import { LanguageStrings } from 'platform-bible-utils';
import BookSelectorGrid from './book-selector.component';

export interface BooksTabProps {
  selectedBooks: string[];
  onSelectedBooksChange: (books: string[]) => void;
  localizedStrings: LanguageStrings;
  validationError?: string;
}

export default function BooksTab({
  selectedBooks,
  onSelectedBooksChange,
  localizedStrings,
  validationError,
}: BooksTabProps) {
  const selectedCountValue = localizedStrings['%platformProjects_books_selectedCount%'];
  const selectedCountLabel =
    typeof selectedCountValue === 'string' ? selectedCountValue : 'Selected books: {0}';

  const displayCount = selectedCountLabel.replace('{0}', String(selectedBooks.length));

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <div className="tw-text-sm tw-text-muted-foreground">{displayCount}</div>

      {validationError && <div className="tw-text-sm tw-text-destructive">{validationError}</div>}

      <BookSelectorGrid
        selectedBooks={selectedBooks}
        onSelectedBooksChange={onSelectedBooksChange}
        localizedStrings={localizedStrings}
      />
    </div>
  );
}
