/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible - no equivalent in PT9 WinForms
 * Maps to: UI-PKG-007
 *
 * EXPLANATION: This component displays a grid of books with their statistics (chapters, verses).
 * Each row has a checkbox for selection. The grid supports:
 *
 * - Checkbox column for book selection
 * - Book ID/name column
 * - Chapters column
 * - Verses column
 * - Select All / Deselect All buttons
 */

import { Checkbox, Label, cn } from 'platform-bible-react';
import type { LanguageStrings } from 'platform-bible-utils';
import type { BookInfo } from 'platform-projects';
import { useMemo, useCallback } from 'react';

export interface BookListGridProps {
  /** Array of book information */
  books: BookInfo[];
  /** Currently selected book IDs */
  selectedBookIds: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedIds: string[]) => void;
  /** Localized strings for UI labels */
  localizedStrings: LanguageStrings;
  /** Whether the grid is disabled (e.g., during deletion) */
  disabled?: boolean;
}

/** BookListGrid displays a selectable list of books with their chapter and verse statistics. */
export function BookListGrid({
  books,
  selectedBookIds,
  onSelectionChange,
  localizedStrings,
  disabled = false,
}: BookListGridProps) {
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
    onSelectionChange(books.map((book) => book.bookId));
  }, [books, disabled, onSelectionChange]);

  const handleDeselectAll = useCallback(() => {
    if (disabled) return;
    onSelectionChange([]);
  }, [disabled, onSelectionChange]);

  const allSelected = useMemo(
    () => books.length > 0 && books.every((book) => selectedSet.has(book.bookId)),
    [books, selectedSet],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {/* Action buttons */}
      <div className="tw-flex tw-gap-2 tw-mb-2">
        <button
          type="button"
          onClick={handleSelectAll}
          disabled={disabled || books.length === 0}
          className={cn(
            'tw-px-3 tw-py-1 tw-text-sm tw-rounded tw-border tw-border-input',
            'tw-bg-background hover:tw-bg-muted',
            'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed',
          )}
        >
          {localizedStrings['%webView_deleteBooks_selectAll%']}
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
          {localizedStrings['%webView_deleteBooks_deselectAll%']}
        </button>
      </div>

      {/* Grid header */}
      <div
        className={cn(
          'tw-grid tw-grid-cols-[auto_1fr_auto_auto] tw-gap-4 tw-items-center',
          'tw-px-3 tw-py-2 tw-border-b tw-border-border tw-bg-muted/50',
          'tw-font-medium tw-text-sm',
        )}
      >
        <div className="tw-w-6 tw-flex tw-items-center tw-justify-center">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                handleSelectAll();
              } else {
                handleDeselectAll();
              }
            }}
            disabled={disabled || books.length === 0}
            aria-label={localizedStrings['%webView_deleteBooks_selectAll_ariaLabel%']}
          />
        </div>
        <Label className="tw-font-medium">
          {localizedStrings['%webView_deleteBooks_column_book%']}
        </Label>
        <Label className="tw-font-medium tw-text-right tw-min-w-[60px]">
          {localizedStrings['%webView_deleteBooks_column_chapters%']}
        </Label>
        <Label className="tw-font-medium tw-text-right tw-min-w-[60px]">
          {localizedStrings['%webView_deleteBooks_column_verses%']}
        </Label>
      </div>

      {/* Grid body - scrollable */}
      <div className="tw-max-h-[280px] tw-overflow-y-auto tw-border tw-border-border tw-rounded">
        {books.length === 0 ? (
          <div className="tw-p-4 tw-text-center tw-text-muted-foreground">
            {localizedStrings['%webView_deleteBooks_noBooks%']}
          </div>
        ) : (
          books.map((book) => {
            const isSelected = selectedSet.has(book.bookId);

            return (
              <div
                key={book.bookId}
                className={cn(
                  'tw-grid tw-grid-cols-[auto_1fr_auto_auto] tw-gap-4 tw-items-center',
                  'tw-px-3 tw-py-2 tw-border-b tw-border-border last:tw-border-b-0',
                  'hover:tw-bg-muted/50',
                  isSelected && 'tw-bg-muted/30',
                  disabled && 'tw-opacity-50',
                )}
              >
                <div className="tw-w-6 tw-flex tw-items-center tw-justify-center">
                  <Checkbox
                    id={`delete-book-${book.bookId}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleBookToggle(book.bookId, checked === true)}
                    disabled={disabled}
                    aria-label={`${localizedStrings['%webView_deleteBooks_select_ariaLabel%']} ${book.bookName}`}
                  />
                </div>
                <Label
                  htmlFor={`delete-book-${book.bookId}`}
                  className={cn('tw-cursor-pointer tw-text-sm', disabled && 'tw-cursor-default')}
                >
                  {book.bookName} ({book.bookId})
                </Label>
                <span className="tw-text-sm tw-text-muted-foreground tw-text-right tw-min-w-[60px]">
                  {book.chapters}
                </span>
                <span className="tw-text-sm tw-text-muted-foreground tw-text-right tw-min-w-[60px]">
                  {book.verses}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Selection summary */}
      <div className="tw-text-sm tw-text-muted-foreground tw-mt-1">
        {selectedBookIds.length > 0
          ? `${selectedBookIds.length} ${localizedStrings['%webView_deleteBooks_selected%']}`
          : localizedStrings['%webView_deleteBooks_noneSelected%']}
      </div>
    </div>
  );
}
