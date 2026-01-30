/** BooksTab - Book selection tab for Project Properties dialog */

import { Alert, AlertDescription, cn } from 'platform-bible-react';
import { Info } from 'lucide-react';
import { BookChooser } from '../book-chooser.component';

// =============================================================================
// PROPS
// =============================================================================

export interface BooksTabProps {
  /** Currently selected books */
  selectedBooks: string[];

  /** Callback when selection changes */
  onSelectedBooksChange: (books: string[]) => void;

  /** Callback to toggle a single book */
  onToggleBook: (code: string) => void;

  /** Whether this is a derived project */
  isDerivedType: boolean;

  /** Base project books (for derived projects) */
  baseProjectBooks?: string[];

  /** Optional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * BooksTab - Second tab in Project Properties dialog
 *
 * Implements BHV-114: Books present tracking
 */
export function BooksTab({
  selectedBooks,
  onSelectedBooksChange,
  onToggleBook,
  isDerivedType,
  baseProjectBooks,
  className,
}: BooksTabProps) {
  // Check if selected books exceed base project books
  const hasExcessBooks =
    isDerivedType &&
    baseProjectBooks &&
    selectedBooks.some((book) => !baseProjectBooks.includes(book));

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Instructions */}
      <p className="tw-text-sm tw-text-muted-foreground">
        Select the books you want in the project. Books can be added or removed later.
      </p>

      {/* Warning for derived projects with excess books */}
      {hasExcessBooks && (
        <Alert className="tw-border-yellow-200 tw-bg-yellow-50">
          <Info className="tw-h-4 tw-w-4 tw-text-yellow-600" />
          <AlertDescription className="tw-text-yellow-700">
            Some selected books are not present in the base project. These books will need to be
            created from scratch.
          </AlertDescription>
        </Alert>
      )}

      {/* Book Chooser */}
      <BookChooser
        selectedBooks={selectedBooks}
        onSelectedBooksChange={onSelectedBooksChange}
        onToggleBook={onToggleBook}
        showDeuterocanonical
      />
    </div>
  );
}

export default BooksTab;
