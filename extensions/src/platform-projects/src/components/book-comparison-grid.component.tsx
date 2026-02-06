/**
 * === NEW IN PT10 === Reason: React component for book comparison grid Maps to: UI-PKG-006
 * (CopyBooksForm)
 */

import { Checkbox, Label } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { KeyboardEvent, useCallback, useMemo } from 'react';

// ============================================================================
// INTERFACES
// ============================================================================

/** Status of a book in a project */
export type BookStatus = 'Present' | 'NotPresent' | 'PresentOlder' | 'PresentNewer' | 'PresentSame';

/** Information about a book for the comparison grid */
export interface BookComparisonInfo {
  /** Book ID (e.g., "GEN", "MAT") */
  bookId: string;
  /** Book display name (e.g., "Genesis", "Matthew") */
  bookName: string;
  /** Status in source project */
  sourceStatus: BookStatus;
  /** Status in destination project */
  destStatus: BookStatus;
  /** Whether this book can be copied */
  isCopyable: boolean;
}

export interface BookComparisonGridProps {
  /** Books to display in the grid */
  books: BookComparisonInfo[];
  /** Currently selected book IDs */
  selectedBookIds: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedIds: string[]) => void;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Whether the grid is disabled */
  disabled?: boolean;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/** Get localized display text for a book status */
function getStatusDisplayText(status: BookStatus, localizedStrings: LanguageStrings): string {
  switch (status) {
    case 'Present':
      return localizedStrings['%webView_copyBooks_status_present%'] || 'Present';
    case 'NotPresent':
      return localizedStrings['%webView_copyBooks_status_notPresent%'] || 'Not Present';
    case 'PresentOlder':
      return localizedStrings['%webView_copyBooks_status_presentOlder%'] || 'Present (older)';
    case 'PresentNewer':
      return localizedStrings['%webView_copyBooks_status_presentNewer%'] || 'Present (newer)';
    case 'PresentSame':
      return localizedStrings['%webView_copyBooks_status_presentSame%'] || 'Present (same)';
    default:
      return status;
  }
}

/** Get CSS class for status display */
function getStatusClass(status: BookStatus): string {
  switch (status) {
    case 'Present':
    case 'PresentSame':
      return 'tw-text-foreground';
    case 'NotPresent':
      return 'tw-text-muted-foreground';
    case 'PresentOlder':
      return 'tw-text-amber-600 dark:tw-text-amber-400';
    case 'PresentNewer':
      return 'tw-text-green-600 dark:tw-text-green-400';
    default:
      return 'tw-text-foreground';
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * BookComparisonGrid component for displaying book status comparison between source and destination
 * projects. Used in the Copy Books dialog to show which books are available and their status.
 */
export function BookComparisonGrid({
  books,
  selectedBookIds,
  onSelectionChange,
  localizedStrings,
  disabled = false,
}: BookComparisonGridProps) {
  const selectedSet = useMemo(() => new Set(selectedBookIds), [selectedBookIds]);

  // Count of copyable books
  const copyableBooks = useMemo(() => books.filter((b) => b.isCopyable), [books]);

  const handleBookToggle = useCallback(
    (bookId: string) => {
      if (disabled) return;

      const book = books.find((b) => b.bookId === bookId);
      if (!book?.isCopyable) return;

      const newSet = new Set(selectedSet);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      onSelectionChange(Array.from(newSet));
    },
    [disabled, books, selectedSet, onSelectionChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, bookId: string) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleBookToggle(bookId);
      }
    },
    [handleBookToggle],
  );

  // Header labels
  const headerBook = localizedStrings['%webView_copyBooks_grid_book%'] || 'Book';
  const headerSourceStatus =
    localizedStrings['%webView_copyBooks_grid_sourceStatus%'] || 'Source Status';
  const headerDestStatus =
    localizedStrings['%webView_copyBooks_grid_destStatus%'] || 'Destination Status';

  return (
    <div className="tw-flex tw-flex-col tw-border tw-border-border tw-rounded-md tw-overflow-hidden">
      {/* Header */}
      <div
        className="tw-grid tw-grid-cols-[40px_80px_1fr_1fr] tw-gap-2 tw-p-2 tw-bg-muted tw-border-b tw-border-border tw-font-semibold tw-text-sm"
        role="row"
        aria-label={localizedStrings['%webView_copyBooks_ariaLabel_gridHeader%'] || 'Grid header'}
      >
        <div className="tw-flex tw-items-center tw-justify-center">
          <span className="tw-sr-only">
            {localizedStrings['%webView_copyBooks_grid_select%'] || 'Select'}
          </span>
        </div>
        <div className="tw-text-foreground">{headerBook}</div>
        <div className="tw-text-foreground">{headerSourceStatus}</div>
        <div className="tw-text-foreground">{headerDestStatus}</div>
      </div>

      {/* Body with scrolling */}
      <div
        className="tw-overflow-y-auto tw-max-h-64"
        role="grid"
        aria-label={
          localizedStrings['%webView_copyBooks_ariaLabel_bookGrid%'] || 'Book comparison grid'
        }
        aria-rowcount={books.length}
      >
        {books.map((book, index) => {
          const isSelected = selectedSet.has(book.bookId);
          const isSelectable = book.isCopyable && !disabled;

          return (
            <div
              key={book.bookId}
              className={`tw-grid tw-grid-cols-[40px_80px_1fr_1fr] tw-gap-2 tw-p-2 tw-border-b tw-border-border last:tw-border-b-0 tw-transition-colors ${
                isSelected ? 'tw-bg-muted/50' : ''
              } ${isSelectable ? 'hover:tw-bg-muted/30 tw-cursor-pointer' : 'tw-opacity-60'}`}
              role="row"
              aria-rowindex={index + 1}
              onClick={() => isSelectable && handleBookToggle(book.bookId)}
              onKeyDown={(e) => isSelectable && handleKeyDown(e, book.bookId)}
              tabIndex={isSelectable ? 0 : -1}
            >
              {/* Checkbox */}
              <div className="tw-flex tw-items-center tw-justify-center" role="gridcell">
                <Checkbox
                  id={`book-copy-${book.bookId}`}
                  checked={isSelected}
                  onCheckedChange={() => handleBookToggle(book.bookId)}
                  disabled={!book.isCopyable || disabled}
                  aria-label={`${localizedStrings['%webView_copyBooks_ariaLabel_selectBook%'] || 'Select'} ${book.bookName}`}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Book ID */}
              <div className="tw-flex tw-items-center" role="gridcell">
                <Label
                  htmlFor={`book-copy-${book.bookId}`}
                  className="tw-text-sm tw-font-medium tw-text-foreground tw-cursor-pointer"
                >
                  {book.bookId}
                </Label>
              </div>

              {/* Source Status */}
              <div className="tw-flex tw-items-center" role="gridcell">
                <span className={`tw-text-sm ${getStatusClass(book.sourceStatus)}`}>
                  {getStatusDisplayText(book.sourceStatus, localizedStrings)}
                </span>
              </div>

              {/* Destination Status */}
              <div className="tw-flex tw-items-center" role="gridcell">
                <span className={`tw-text-sm ${getStatusClass(book.destStatus)}`}>
                  {getStatusDisplayText(book.destStatus, localizedStrings)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {books.length === 0 && (
          <div className="tw-p-4 tw-text-center tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_grid_empty%'] || 'No books available'}
          </div>
        )}
      </div>

      {/* Selection summary */}
      <div className="tw-p-2 tw-bg-muted tw-border-t tw-border-border tw-text-sm tw-text-muted-foreground">
        {`${selectedBookIds.length} / ${copyableBooks.length} ${localizedStrings['%webView_copyBooks_grid_selected%'] || 'books selected'}`}
      </div>
    </div>
  );
}

export default BookComparisonGrid;
