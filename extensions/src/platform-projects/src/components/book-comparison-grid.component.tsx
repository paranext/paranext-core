/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible - no equivalent in PT9 WinForms
 * Maps to: UI-PKG-006, BHV-168
 *
 * EXPLANATION: This component displays a grid of books with their status in both source and
 * destination projects. Each row has a checkbox for selection. The grid supports:
 *
 * - Checkbox column for book selection
 * - Book ID/name column
 * - Source status column (Present/Not Present)
 * - Destination status column (Present/Not Present/Older/Newer/Same)
 * - Disabled rows for books that cannot be copied
 */

import { Checkbox, Label, cn } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import type { BookCopyInfo, BookStatus } from 'platform-projects';
import { useMemo, useCallback } from 'react';

export interface BookComparisonGridProps {
  /** Array of book comparison information */
  books: BookCopyInfo[];
  /** Currently selected book IDs */
  selectedBookIds: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedIds: string[]) => void;
  /** Localized strings for UI labels */
  localizedStrings: LanguageStrings;
  /** Whether the grid is disabled (e.g., during loading) */
  disabled?: boolean;
}

/** Gets the display class for a book status */
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
      return 'tw-text-blue-600 dark:tw-text-blue-400';
    default:
      return 'tw-text-foreground';
  }
}

/** Map of book status to localized string key */
const STATUS_LOCALIZE_KEYS: Record<BookStatus, LocalizeKey> = {
  Present: '%webView_copyBooks_status_Present%',
  NotPresent: '%webView_copyBooks_status_NotPresent%',
  PresentOlder: '%webView_copyBooks_status_PresentOlder%',
  PresentNewer: '%webView_copyBooks_status_PresentNewer%',
  PresentSame: '%webView_copyBooks_status_PresentSame%',
};

/** Gets the localized display text for a book status */
function getStatusText(status: BookStatus, localizedStrings: LanguageStrings): string {
  const key = STATUS_LOCALIZE_KEYS[status];
  return localizedStrings[key] ?? status;
}

/**
 * BookComparisonGrid displays a selectable list of books with their status in both source and
 * destination projects.
 */
export function BookComparisonGrid({
  books,
  selectedBookIds,
  onSelectionChange,
  localizedStrings,
  disabled = false,
}: BookComparisonGridProps) {
  const copyableBooks = useMemo(() => books.filter((book) => book.isCopyable), [books]);

  const selectedSet = useMemo(() => new Set(selectedBookIds), [selectedBookIds]);

  const handleBookToggle = useCallback(
    (bookId: string, checked: boolean) => {
      if (disabled) return;
      if (checked) {
        onSelectionChange([...selectedBookIds, bookId]);
      } else {
        onSelectionChange(selectedBookIds.filter((id) => id !== bookId));
      }
    },
    [disabled, onSelectionChange, selectedBookIds],
  );

  const handleSelectAll = useCallback(() => {
    if (disabled) return;
    onSelectionChange(copyableBooks.map((book) => book.bookId));
  }, [copyableBooks, disabled, onSelectionChange]);

  const handleDeselectAll = useCallback(() => {
    if (disabled) return;
    onSelectionChange([]);
  }, [disabled, onSelectionChange]);

  const allCopyableSelected = useMemo(
    () => copyableBooks.length > 0 && copyableBooks.every((book) => selectedSet.has(book.bookId)),
    [copyableBooks, selectedSet],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {/* Action buttons */}
      <div className="tw-flex tw-gap-2 tw-mb-2">
        <button
          type="button"
          onClick={handleSelectAll}
          disabled={disabled || copyableBooks.length === 0}
          className={cn(
            'tw-px-3 tw-py-1 tw-text-sm tw-rounded tw-border tw-border-input',
            'tw-bg-background hover:tw-bg-muted',
            'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed',
          )}
        >
          {localizedStrings['%webView_copyBooks_selectAll%']}
        </button>
        <button
          type="button"
          onClick={handleDeselectAll}
          disabled={disabled || selectedBookIds.length === 0}
          className={cn(
            'tw-px-3 tw-py-1 tw-text-sm tw-rounded tw-border tw-border-input',
            'tw-bg-background hover:tw-bg-muted',
            'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed',
          )}
        >
          {localizedStrings['%webView_copyBooks_deselectAll%']}
        </button>
      </div>

      {/* Grid header */}
      <div
        className={cn(
          'tw-grid tw-grid-cols-[auto_1fr_1fr_1fr] tw-gap-2 tw-items-center',
          'tw-px-2 tw-py-1 tw-border-b tw-border-border tw-bg-muted/50',
          'tw-font-medium tw-text-sm',
        )}
      >
        <div className="tw-w-6 tw-flex tw-items-center tw-justify-center">
          <Checkbox
            checked={allCopyableSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                handleSelectAll();
              } else {
                handleDeselectAll();
              }
            }}
            disabled={disabled || copyableBooks.length === 0}
            aria-label={localizedStrings['%webView_copyBooks_selectAll_ariaLabel%']}
          />
        </div>
        <Label className="tw-font-medium">
          {localizedStrings['%webView_copyBooks_column_book%']}
        </Label>
        <Label className="tw-font-medium">
          {localizedStrings['%webView_copyBooks_column_source%']}
        </Label>
        <Label className="tw-font-medium">
          {localizedStrings['%webView_copyBooks_column_destination%']}
        </Label>
      </div>

      {/* Grid body - scrollable */}
      <div className="tw-max-h-[300px] tw-overflow-y-auto tw-border tw-border-border tw-rounded">
        {books.length === 0 ? (
          <div className="tw-p-4 tw-text-center tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_noBooks%']}
          </div>
        ) : (
          books.map((book) => {
            const isSelected = selectedSet.has(book.bookId);
            const isDisabled = disabled || !book.isCopyable;

            return (
              <div
                key={book.bookId}
                className={cn(
                  'tw-grid tw-grid-cols-[auto_1fr_1fr_1fr] tw-gap-2 tw-items-center',
                  'tw-px-2 tw-py-1.5 tw-border-b tw-border-border last:tw-border-b-0',
                  'hover:tw-bg-muted/50',
                  isSelected && 'tw-bg-muted/30',
                  isDisabled && 'tw-opacity-50',
                )}
              >
                <div className="tw-w-6 tw-flex tw-items-center tw-justify-center">
                  <Checkbox
                    id={`book-${book.bookId}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleBookToggle(book.bookId, checked === true)}
                    disabled={isDisabled}
                    aria-label={`${localizedStrings['%webView_copyBooks_select_ariaLabel%']} ${book.bookName}`}
                  />
                </div>
                <Label
                  htmlFor={`book-${book.bookId}`}
                  className={cn('tw-cursor-pointer tw-text-sm', isDisabled && 'tw-cursor-default')}
                >
                  {book.bookName} ({book.bookId})
                </Label>
                <span className={cn('tw-text-sm', getStatusClass(book.sourceStatus))}>
                  {getStatusText(book.sourceStatus, localizedStrings)}
                </span>
                <span className={cn('tw-text-sm', getStatusClass(book.destStatus))}>
                  {getStatusText(book.destStatus, localizedStrings)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Selection summary */}
      <div className="tw-text-sm tw-text-muted-foreground tw-mt-1">
        {selectedBookIds.length > 0
          ? `${selectedBookIds.length} ${localizedStrings['%webView_copyBooks_selected%']}`
          : localizedStrings['%webView_copyBooks_noneSelected%']}
      </div>
    </div>
  );
}
