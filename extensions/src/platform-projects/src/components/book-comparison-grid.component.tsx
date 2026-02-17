import { Canon } from '@sillsdev/scripture';
import { Button, Checkbox, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';

// ============================================================================
// Types
// ============================================================================

export type BookStatus = 'Present' | 'NotPresent' | 'PresentOlder' | 'PresentNewer' | 'PresentSame';

export interface BookCopyInfo {
  bookId: string;
  bookName: string;
  sourceStatus: BookStatus;
  destStatus: BookStatus;
  isCopyable: boolean;
}

export interface BookComparisonGridProps {
  books: BookCopyInfo[];
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

function getStatusDisplayText(status: BookStatus, localizedStrings: LanguageStrings): string {
  switch (status) {
    case 'Present':
      return getStr(localizedStrings, '%platformProjects_copyBooks_statusPresent%', 'Present');
    case 'NotPresent':
      return getStr(
        localizedStrings,
        '%platformProjects_copyBooks_statusNotPresent%',
        'Not Present',
      );
    case 'PresentOlder':
      return getStr(
        localizedStrings,
        '%platformProjects_copyBooks_statusPresentOlder%',
        'Present (older)',
      );
    case 'PresentNewer':
      return getStr(
        localizedStrings,
        '%platformProjects_copyBooks_statusPresentNewer%',
        'Present (newer)',
      );
    case 'PresentSame':
      return getStr(
        localizedStrings,
        '%platformProjects_copyBooks_statusPresentSame%',
        'Present (same)',
      );
    default:
      return status;
  }
}

// ============================================================================
// Component
// ============================================================================

export default function BookComparisonGrid({
  books,
  selectedBookIds,
  onSelectedBookIdsChange,
  localizedStrings,
  disabled = false,
}: BookComparisonGridProps) {
  const copyableBooks = useMemo(() => books.filter((b) => b.isCopyable), [books]);

  const handleSelectAll = useCallback(() => {
    onSelectedBookIdsChange(copyableBooks.map((b) => b.bookId));
  }, [copyableBooks, onSelectedBookIdsChange]);

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
    '%platformProjects_copyBooks_columnBook%',
    'Book',
  );
  const sourceStatusLabel = getStr(
    localizedStrings,
    '%platformProjects_copyBooks_columnSourceStatus%',
    'Source Status',
  );
  const destStatusLabel = getStr(
    localizedStrings,
    '%platformProjects_copyBooks_columnDestStatus%',
    'Destination Status',
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {/* Selection action buttons */}
      <div className="tw-flex tw-gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleSelectAll}
          disabled={disabled || copyableBooks.length === 0}
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

      {/* Book comparison table */}
      <div className="tw-border tw-rounded-md tw-overflow-y-auto tw-max-h-80">
        <table className="tw-w-full tw-text-sm" aria-label={bookColumnLabel}>
          <thead className="tw-sticky tw-top-0 tw-bg-background tw-border-b">
            <tr>
              <th className="tw-p-2 tw-w-10">
                <span className="tw-sr-only">
                  {getStr(localizedStrings, '%platformProjects_copyBooks_selectColumn%', 'Select')}
                </span>
              </th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{bookColumnLabel}</th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{sourceStatusLabel}</th>
              <th className="tw-p-2 tw-text-start tw-font-medium">{destStatusLabel}</th>
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
                      disabled={disabled || !book.isCopyable}
                      aria-label={`${getStr(localizedStrings, '%platformProjects_copyBooks_selectBook%', 'Select')} ${bookDisplayName}`}
                    />
                  </td>
                  <td className="tw-p-2">
                    <Label>{bookDisplayName}</Label>
                  </td>
                  <td className="tw-p-2">
                    {getStatusDisplayText(book.sourceStatus, localizedStrings)}
                  </td>
                  <td className="tw-p-2">
                    {getStatusDisplayText(book.destStatus, localizedStrings)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
