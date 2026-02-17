import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import BookListGrid, { BookListInfo } from './components/book-list-grid.component';

// ============================================================================
// Types
// ============================================================================

interface DeleteBooksFormState {
  selectedBookIds: string[];
  showConfirmation: boolean;
  isDeleting: boolean;
}

// ============================================================================
// Mock data (Phase 3 - replaced by PAPI calls in Integration phase)
// ============================================================================

const MOCK_PROJECT_NAME = 'My Translation Project';

const MOCK_BOOKS: BookListInfo[] = [
  { bookId: 'GEN', bookName: 'Genesis', chapters: 50, verses: 1533 },
  { bookId: 'EXO', bookName: 'Exodus', chapters: 40, verses: 1213 },
  { bookId: 'LEV', bookName: 'Leviticus', chapters: 27, verses: 859 },
  { bookId: 'NUM', bookName: 'Numbers', chapters: 36, verses: 1288 },
  { bookId: 'DEU', bookName: 'Deuteronomy', chapters: 34, verses: 959 },
  { bookId: 'MAT', bookName: 'Matthew', chapters: 28, verses: 1071 },
  { bookId: 'MRK', bookName: 'Mark', chapters: 16, verses: 678 },
  { bookId: 'LUK', bookName: 'Luke', chapters: 24, verses: 1151 },
  { bookId: 'JHN', bookName: 'John', chapters: 21, verses: 879 },
  { bookId: 'ACT', bookName: 'Acts', chapters: 28, verses: 1007 },
  { bookId: 'ROM', bookName: 'Romans', chapters: 16, verses: 433 },
];

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformProjects_deleteBooks_title%',
  '%platformProjects_deleteBooks_warning%',
  '%platformProjects_deleteBooks_selectLabel%',
  '%platformProjects_deleteBooks_columnBook%',
  '%platformProjects_deleteBooks_columnChapters%',
  '%platformProjects_deleteBooks_columnVerses%',
  '%platformProjects_deleteBooks_selectColumn%',
  '%platformProjects_deleteBooks_selectBook%',
  '%platformProjects_deleteBooks_deleteButton%',
  '%platformProjects_deleteBooks_confirmTitle%',
  '%platformProjects_deleteBooks_confirmMessage%',
  '%platformProjects_deleteBooks_confirmDelete%',
  '%platformProjects_books_selectAll%',
  '%platformProjects_books_deselectAll%',
  '%platformProjects_button_cancel%',
];

// ============================================================================
// Helpers
// ============================================================================

function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function DeleteBooksWebView(_webViewProps: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Form state
  const [formState, setFormState] = useState<DeleteBooksFormState>({
    selectedBookIds: [],
    showConfirmation: false,
    isDeleting: false,
  });

  // Derived state
  const selectedBooks = useMemo(
    () => MOCK_BOOKS.filter((book) => formState.selectedBookIds.includes(book.bookId)),
    [formState.selectedBookIds],
  );

  const isDeleteDisabled = formState.isDeleting || formState.selectedBookIds.length === 0;

  // Handlers
  const handleSelectedBookIdsChange = useCallback((bookIds: string[]) => {
    setFormState((prev) => ({ ...prev, selectedBookIds: bookIds }));
  }, []);

  const handleDeleteClick = useCallback(() => {
    setFormState((prev) => ({ ...prev, showConfirmation: true }));
  }, []);

  const handleConfirmCancel = useCallback(() => {
    setFormState((prev) => ({ ...prev, showConfirmation: false }));
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setFormState((prev) => ({ ...prev, isDeleting: true, showConfirmation: false }));
    // Phase 3 mock: simulate delete operation
    // In production: call creatingProjects.deleteBooks via PAPI
    setTimeout(() => {
      setFormState((prev) => ({ ...prev, isDeleting: false }));
    }, 1000);
  }, []);

  const handleCancel = useCallback(() => {
    // In production: close the web view
  }, []);

  // Build confirmation message with count
  const confirmMessageText = useMemo(() => {
    const template = l(
      '%platformProjects_deleteBooks_confirmMessage%',
      'Are you sure you want to permanently delete {0} book(s)? This action cannot be undone.',
    );
    return template.replace('{0}', String(formState.selectedBookIds.length));
  }, [l, formState.selectedBookIds.length]);

  const confirmDeleteButtonText = useMemo(() => {
    const template = l('%platformProjects_deleteBooks_confirmDelete%', 'Delete {0} Book(s)');
    return template.replace('{0}', String(formState.selectedBookIds.length));
  }, [l, formState.selectedBookIds.length]);

  const selectLabelText = useMemo(() => {
    const template = l(
      '%platformProjects_deleteBooks_selectLabel%',
      'Select books to delete from {0}:',
    );
    return template.replace('{0}', MOCK_PROJECT_NAME);
  }, [l]);

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_deleteBooks_title%', 'Delete Books')}
        </h2>

        {/* Warning Banner */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-destructive tw-bg-destructive/10 tw-p-3">
          <span className="tw-text-destructive tw-font-bold tw-text-lg" aria-hidden="true">
            &#9888;
          </span>
          <span className="tw-text-destructive tw-font-semibold" role="alert">
            {l('%platformProjects_deleteBooks_warning%', 'WARNING: This action cannot be undone!')}
          </span>
        </div>

        {/* Project Context Label */}
        <Label>{selectLabelText}</Label>

        {/* Book Selection Grid */}
        <div className="tw-flex-1 tw-min-h-0">
          <BookListGrid
            books={MOCK_BOOKS}
            selectedBookIds={formState.selectedBookIds}
            onSelectedBookIdsChange={handleSelectedBookIdsChange}
            localizedStrings={localizedStrings}
            disabled={formState.isDeleting}
          />
        </div>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-mt-auto">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteClick}
            disabled={isDeleteDisabled}
          >
            {l('%platformProjects_deleteBooks_deleteButton%', 'Delete')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={formState.isDeleting}
          >
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {formState.showConfirmation ? (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-foreground/50">
          <div className="tw-bg-background tw-rounded-lg tw-border tw-p-6 tw-max-w-md tw-w-full tw-mx-4">
            {/* Confirmation Title */}
            <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
              {l('%platformProjects_deleteBooks_confirmTitle%', 'Confirm Deletion')}
            </h3>

            {/* Confirmation Message */}
            <p className="tw-text-sm tw-text-muted-foreground tw-mb-4">{confirmMessageText}</p>

            {/* List of books to delete */}
            <div className="tw-border tw-rounded-md tw-p-3 tw-mb-4 tw-max-h-40 tw-overflow-y-auto">
              <ul className="tw-list-disc tw-list-inside tw-text-sm">
                {selectedBooks.map((book) => (
                  <li key={book.bookId}>{book.bookName}</li>
                ))}
              </ul>
            </div>

            {/* Confirmation Actions */}
            <div className="tw-flex tw-justify-end tw-gap-2">
              <Button type="button" variant="outline" onClick={handleConfirmCancel}>
                {l('%platformProjects_button_cancel%', 'Cancel')}
              </Button>
              <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
                {confirmDeleteButtonText}
              </Button>
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};
