/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible web view Maps to: UI-PKG-007,
 * SCR-007
 *
 * EXPLANATION: This web view provides a dialog for deleting books from a project. It includes:
 *
 * 1. Warning banner - prominently displayed with danger styling
 * 2. Context header - shows project name
 * 3. Book list grid with chapters/verses statistics
 * 4. Select All / Deselect All buttons
 * 5. Confirmation dialog before deletion
 * 6. Delete / Cancel buttons
 *
 * Key behaviors:
 *
 * - VAL-DEL.1: At least one book must be selected to enable Delete button
 * - Confirmation required before deletion (destructive action)
 */

import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Spinner,
  cn,
} from 'platform-bible-react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import type { BookInfo, DeleteBooksRequest } from 'platform-projects';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookListGrid } from './components/book-list-grid.component';

/** Localized string keys for the Delete Books dialog */
const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_deleteBooks_title%',
  '%webView_deleteBooks_warning_title%',
  '%webView_deleteBooks_warning_message%',
  '%webView_deleteBooks_projectLabel%',
  '%webView_deleteBooks_selectAll%',
  '%webView_deleteBooks_deselectAll%',
  '%webView_deleteBooks_selectAll_ariaLabel%',
  '%webView_deleteBooks_select_ariaLabel%',
  '%webView_deleteBooks_column_book%',
  '%webView_deleteBooks_column_chapters%',
  '%webView_deleteBooks_column_verses%',
  '%webView_deleteBooks_noBooks%',
  '%webView_deleteBooks_selected%',
  '%webView_deleteBooks_noneSelected%',
  '%webView_deleteBooks_button_delete%',
  '%webView_deleteBooks_button_cancel%',
  '%webView_deleteBooks_deleting%',
  '%webView_deleteBooks_success%',
  '%webView_deleteBooks_error%',
  '%webView_deleteBooks_loadingBooks%',
  '%webView_deleteBooks_confirm_title%',
  '%webView_deleteBooks_confirm_message%',
  '%webView_deleteBooks_confirm_bookList%',
  '%webView_deleteBooks_confirm_delete%',
  '%webView_deleteBooks_confirm_cancel%',
];

/**
 * PLACEHOLDER: Mock books for UI development. This will be replaced with real PAPI calls when
 * backend is ready.
 */
const MOCK_BOOKS: BookInfo[] = [
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
];

globalThis.webViewComponent = function DeleteBooksWebView({ useWebViewState }: WebViewProps) {
  // State from web view initialization
  const [projectGuid] = useWebViewState<string | undefined>('projectGuid', undefined);
  const [projectName] = useWebViewState<string>('projectName', 'Unknown Project');

  // Local state
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  // Localization
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  // Validation - at least one book must be selected (VAL-DEL.1)
  const canDelete = useMemo(() => {
    return selectedBookIds.length > 0 && !isDeleting;
  }, [selectedBookIds, isDeleting]);

  // Get names of selected books for confirmation dialog
  const selectedBookNames = useMemo(() => {
    return selectedBookIds
      .map((id) => {
        const book = books.find((b) => b.bookId === id);
        return book ? book.bookName : id;
      })
      .join(', ');
  }, [selectedBookIds, books]);

  // Load books on mount
  useEffect(() => {
    async function loadBooks() {
      if (!projectGuid) {
        setIsLoadingBooks(false);
        return;
      }

      setIsLoadingBooks(true);
      setErrorMessage(undefined);

      try {
        // PLACEHOLDER: Use mock data until backend is ready
        // Real implementation would be:
        // const bookList = await papi.commands.sendCommand(
        //   'platformProjects.getProjectBooks',
        //   projectGuid
        // );
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        }); // Simulate network delay
        setBooks(MOCK_BOOKS);

        logger.debug(`Loaded ${MOCK_BOOKS.length} books for Delete Books dialog`);
      } catch (error) {
        logger.error('Failed to load books:', error);
        setErrorMessage(localizedStrings['%webView_deleteBooks_error%'] ?? 'Failed to load books');
      } finally {
        setIsLoadingBooks(false);
      }
    }

    loadBooks();
  }, [projectGuid, localizedStrings]);

  // Handle delete button click - show confirmation dialog
  const handleDeleteClick = useCallback(() => {
    if (!canDelete) return;
    setShowConfirmation(true);
  }, [canDelete]);

  // Handle confirmation - execute deletion
  const handleConfirmDelete = useCallback(async () => {
    if (!projectGuid || selectedBookIds.length === 0) return;

    setIsDeleting(true);
    setShowConfirmation(false);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);

    try {
      const request: DeleteBooksRequest = {
        projectGuid,
        bookIds: selectedBookIds,
      };

      // PLACEHOLDER: Backend not yet implemented
      // Real implementation would be:
      // const result = await papi.commands.sendCommand('platformProjects.deleteBooks', request);
      logger.info('Delete books request:', request);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      }); // Simulate operation

      // Simulate success - remove deleted books from list
      const deletedCount = selectedBookIds.length;
      setBooks((prevBooks) => prevBooks.filter((book) => !selectedBookIds.includes(book.bookId)));
      setSelectedBookIds([]);

      setSuccessMessage(
        formatReplacementString(localizedStrings['%webView_deleteBooks_success%'] ?? '', {
          count: deletedCount.toString(),
        }),
      );

      logger.info(`Successfully deleted ${deletedCount} books`);
    } catch (error) {
      logger.error('Failed to delete books:', error);
      setErrorMessage(localizedStrings['%webView_deleteBooks_error%'] ?? 'Failed to delete books');
    } finally {
      setIsDeleting(false);
    }
  }, [projectGuid, selectedBookIds, localizedStrings]);

  // Handle cancel confirmation
  const handleCancelConfirmation = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  // Handle cancel button
  const handleCancel = useCallback(() => {
    // Close the web view
    logger.debug('Delete Books dialog cancelled');
  }, []);

  // Render loading state
  if (isLoadingBooks) {
    return (
      <div className="pr-twp tw-flex tw-items-center tw-justify-center tw-h-full tw-p-4">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
          <Spinner />
          <span className="tw-text-muted-foreground">
            {localizedStrings['%webView_deleteBooks_loadingBooks%']}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4">
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">
        {localizedStrings['%webView_deleteBooks_title%']}
      </h2>

      {/* Warning banner - prominently displayed */}
      <Alert variant="destructive" className="tw-border-2">
        <AlertTitle className="tw-font-bold">
          {localizedStrings['%webView_deleteBooks_warning_title%']}
        </AlertTitle>
        <AlertDescription>
          {localizedStrings['%webView_deleteBooks_warning_message%']}
        </AlertDescription>
      </Alert>

      {/* Project context */}
      <div className="tw-text-sm tw-text-foreground">
        {formatReplacementString(localizedStrings['%webView_deleteBooks_projectLabel%'] ?? '', {
          projectName,
        })}
      </div>

      {/* Error/Success messages */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Book list grid */}
      <div className="tw-flex-1 tw-min-h-0 tw-overflow-hidden">
        {books.length === 0 ? (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
            {localizedStrings['%webView_deleteBooks_noBooks%']}
          </div>
        ) : (
          <BookListGrid
            books={books}
            selectedBookIds={selectedBookIds}
            onSelectionChange={setSelectedBookIds}
            localizedStrings={localizedStrings}
            disabled={isDeleting}
          />
        )}
      </div>

      {/* Action buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-2 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel} disabled={isDeleting}>
          {localizedStrings['%webView_deleteBooks_button_cancel%']}
        </Button>
        <Button variant="destructive" onClick={handleDeleteClick} disabled={!canDelete}>
          {isDeleting ? (
            <>
              <Spinner className="tw-mr-2 tw-h-4 tw-w-4" />
              {localizedStrings['%webView_deleteBooks_deleting%']}
            </>
          ) : (
            localizedStrings['%webView_deleteBooks_button_delete%']
          )}
        </Button>
      </div>

      {/* Confirmation modal overlay */}
      {showConfirmation && (
        <div
          className={cn(
            'tw-fixed tw-inset-0 tw-z-50',
            'tw-flex tw-items-center tw-justify-center',
            'tw-bg-black/50',
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <Card className="tw-w-full tw-max-w-md tw-mx-4 tw-shadow-lg">
            <CardHeader>
              <CardTitle id="confirm-delete-title">
                {localizedStrings['%webView_deleteBooks_confirm_title%']}
              </CardTitle>
            </CardHeader>
            <CardContent className="tw-space-y-4">
              <p className="tw-text-sm tw-text-muted-foreground">
                {formatReplacementString(
                  localizedStrings['%webView_deleteBooks_confirm_message%'] ?? '',
                  {
                    count: selectedBookIds.length.toString(),
                  },
                )}
              </p>
              <div>
                <p className="tw-text-sm tw-font-medium tw-mb-2">
                  {localizedStrings['%webView_deleteBooks_confirm_bookList%']}
                </p>
                <p className="tw-text-sm tw-text-muted-foreground tw-max-h-[150px] tw-overflow-y-auto tw-p-2 tw-bg-muted tw-rounded">
                  {selectedBookNames}
                </p>
              </div>
            </CardContent>
            <CardFooter className="tw-flex tw-justify-end tw-gap-2">
              <Button variant="outline" onClick={handleCancelConfirmation}>
                {localizedStrings['%webView_deleteBooks_confirm_cancel%']}
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                {localizedStrings['%webView_deleteBooks_confirm_delete%']}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
