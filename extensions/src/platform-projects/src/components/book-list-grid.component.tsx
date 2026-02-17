import { Canon } from '@sillsdev/scripture';
import { Button, Checkbox, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface BookListInfo {
  bookId: string;
  bookName: string;
  chapters: number;
  verses: number;
}

export interface BookListGridProps {
  books: BookListInfo[];
  selectedBookIds: string[];
  onSelectedBookIdsChange: (bookIds: string[]) => void;
  localizedStrings: LanguageStrings;
  disabled?: boolean;
}

// ============================================================================
// Helpers
// ============================================================================

function getStr(localizedStrings: LanguageStrings, key: LocalizeKey, fallback: string): string {
  const val = localizedStrings[key];
  return typeof val === 'string' ? val : fallback;
}

// ============================================================================
// Component
// ============================================================================

export default function BookListGrid({
  books,
  selectedBookIds,
  onSelectedBookIdsChange,
  localizedStrings,
  disabled = false,
}: BookListGridProps) {
  const handleSelectAll = useCallback(() => {
    onSelectedBookIdsChange(books.map((b) => b.bookId));
  }, [books, onSelectedBookIdsChange]);

  const handleDeselectAll = useCallback(() => {
    onSelectedBookIdsChange([]);
  }, [onSelectedBookIdsChange]);

  const handleBookToggle = useCallback(
    (bookId: string, checked: boolean | 'indeterminate') => {
      if (disabled) return;
      if (typeof checked !== 'boolean') return;

      if (checked) {
        onSelectedBookIdsChange([...selectedBookIds, bookId]);
      } else {
        onSelectedBookIdsChange(selectedBookIds.filter((id) => id !== bookId));
      }
    },
    [disabled, selectedBookIds, onSelectedBookIdsChange],
  );

  const selectAllLabel = getStr(
    localizedStrings,
    '%platformProjects_books_selectAll%',
    'Select All',
  );
  const deselectAllLabel = getStr(
    localizedStrings,
    '%platformProjects_books_deselectAll%',
    'Deselect All',
  );
  const bookColumnLabel = getStr(
    localizedStrings,
    '%platformProjects_deleteBooks_columnBook%',
    'Book',
  );
  const chaptersColumnLabel = getStr(
    localizedStrings,
    '%platformProjects_deleteBooks_columnChapters%',
    'Chapters',
  );
  const versesColumnLabel = getStr(
    localizedStrings,
    '%platformProjects_deleteBooks_columnVerses%',
    'Verses',
  );

  const selectColumnAriaLabel = useMemo(
    () => getStr(localizedStrings, '%platformProjects_deleteBooks_selectColumn%', 'Select'),
    [localizedStrings],
  );

  const selectBookAriaLabel = useMemo(
    () => getStr(localizedStrings, '%platformProjects_deleteBooks_selectBook%', 'Select'),
    [localizedStrings],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {/* Selection action buttons */}
      <div className="tw-flex tw-gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleSelectAll}
          disabled={disabled || books.length === 0}
        >
          {selectAllLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleDeselectAll}
          disabled={disabled || selectedBookIds.length === 0}
        >
          {deselectAllLabel}
        </Button>
      </div>

      {/* Book list table */}
      <div className="tw-border tw-rounded-md tw-overflow-y-auto tw-max-h-80">
        <table className="tw-w-full tw-text-sm" aria-label={bookColumnLabel}>
          <thead className="tw-sticky tw-top-0 tw-bg-background tw-border-b">
            <tr>
              <th className="tw-p-2 tw-w-10">
                <span className="tw-sr-only">{selectColumnAriaLabel}</span>
              </th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{bookColumnLabel}</th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{chaptersColumnLabel}</th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{versesColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const isSelected = selectedBookIds.includes(book.bookId);
              const bookDisplayName = Canon.bookIdToEnglishName(book.bookId);

              return (
                <tr
                  key={book.bookId}
                  className="tw-border-b tw-transition-colors hover:tw-bg-muted/50"
                >
                  <td className="tw-p-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleBookToggle(book.bookId, checked)}
                      disabled={disabled}
                      aria-label={`${selectBookAriaLabel} ${bookDisplayName}`}
                    />
                  </td>
                  <td className="tw-p-2">
                    <Label>{bookDisplayName}</Label>
                  </td>
                  <td className="tw-p-2">{book.chapters}</td>
                  <td className="tw-p-2">{book.verses}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
