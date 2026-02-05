/**
 * === NEW IN PT10 === Reason: React component for book selection grid Maps to: UI-PKG-001
 * (BooksTab)
 */

import { Button, Checkbox, Label } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import { BookInfo, CANON_BOOKS, NT_BOOKS, OT_BOOKS } from '../project-properties.utils';

export interface BookSelectorProps {
  /** Currently selected book IDs */
  selectedBooks: string[];
  /** Callback when selection changes */
  onSelectionChange: (selectedBooks: string[]) => void;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Whether the selector is disabled */
  disabled?: boolean;
}

/**
 * BookSelector component for selecting books in a project Displays books in a grid organized by Old
 * Testament and New Testament
 */
export function BookSelector({
  selectedBooks,
  onSelectionChange,
  localizedStrings,
  disabled = false,
}: BookSelectorProps) {
  const selectedSet = useMemo(() => new Set(selectedBooks), [selectedBooks]);

  const handleBookToggle = useCallback(
    (bookId: string) => {
      if (disabled) return;

      const newSet = new Set(selectedSet);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      onSelectionChange(Array.from(newSet));
    },
    [disabled, selectedSet, onSelectionChange],
  );

  const handleSelectAll = useCallback(() => {
    if (disabled) return;
    onSelectionChange(CANON_BOOKS.map((b) => b.id));
  }, [disabled, onSelectionChange]);

  const handleDeselectAll = useCallback(() => {
    if (disabled) return;
    onSelectionChange([]);
  }, [disabled, onSelectionChange]);

  const handleSelectTestament = useCallback(
    (testament: 'OT' | 'NT', select: boolean) => {
      if (disabled) return;

      const testamentBooks = testament === 'OT' ? OT_BOOKS : NT_BOOKS;
      const newSet = new Set(selectedSet);

      testamentBooks.forEach((book) => {
        if (select) {
          newSet.add(book.id);
        } else {
          newSet.delete(book.id);
        }
      });

      onSelectionChange(Array.from(newSet));
    },
    [disabled, selectedSet, onSelectionChange],
  );

  const renderBookGrid = useCallback(
    (books: BookInfo[], sectionLabel: string) => {
      const allSelected = books.every((b) => selectedSet.has(b.id));
      const someSelected = books.some((b) => selectedSet.has(b.id));

      return (
        <div className="tw-mb-4">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <Label className="tw-font-semibold tw-text-foreground">{sectionLabel}</Label>
            <Checkbox
              checked={allSelected}
              // Use data attribute to track indeterminate state
              data-indeterminate={someSelected && !allSelected}
              onCheckedChange={(checked) =>
                handleSelectTestament(
                  books === OT_BOOKS ? 'OT' : 'NT',
                  checked === true || checked === 'indeterminate',
                )
              }
              disabled={disabled}
              aria-label={`Select all ${sectionLabel}`}
            />
          </div>
          <div className="tw-grid tw-grid-cols-6 tw-gap-1">
            {books.map((book) => (
              <div
                key={book.id}
                className="tw-flex tw-items-center tw-gap-1 tw-p-1 tw-rounded hover:tw-bg-muted"
              >
                <Checkbox
                  id={`book-${book.id}`}
                  checked={selectedSet.has(book.id)}
                  onCheckedChange={() => handleBookToggle(book.id)}
                  disabled={disabled}
                  aria-label={
                    localizedStrings['%webView_projectProperties_ariaLabel_bookCheckbox%']
                  }
                />
                <Label
                  htmlFor={`book-${book.id}`}
                  className="tw-text-xs tw-cursor-pointer tw-select-none"
                >
                  {book.id}
                </Label>
              </div>
            ))}
          </div>
        </div>
      );
    },
    [selectedSet, handleBookToggle, handleSelectTestament, localizedStrings, disabled],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      {/* Action buttons */}
      <div className="tw-flex tw-gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          disabled={disabled}
        >
          {localizedStrings['%webView_projectProperties_books_selectAll%']}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDeselectAll}
          disabled={disabled}
        >
          {localizedStrings['%webView_projectProperties_books_deselectAll%']}
        </Button>
      </div>

      {/* Selection count */}
      <div className="tw-text-sm tw-text-muted-foreground">
        {selectedBooks.length} / {CANON_BOOKS.length} books selected
      </div>

      {/* Book grids */}
      <div className="tw-overflow-y-auto tw-max-h-96">
        {renderBookGrid(
          OT_BOOKS,
          localizedStrings['%webView_projectProperties_books_oldTestament%'],
        )}
        {renderBookGrid(
          NT_BOOKS,
          localizedStrings['%webView_projectProperties_books_newTestament%'],
        )}
      </div>
    </div>
  );
}

export default BookSelector;
