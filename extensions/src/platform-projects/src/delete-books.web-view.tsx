/**
 * === NEW IN PT10 === Reason: React component - WebViews don't exist in PT9's WinForms architecture
 * Maps to: UI-PKG-007
 */

import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Checkbox, Label, Spinner } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { KeyboardEvent, useCallback, useMemo, useState } from 'react';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRINGS: LocalizeKey[] = [
  // Dialog
  '%webView_deleteBooks_title%',
  // Warning banner
  '%webView_deleteBooks_warning%',
  // Labels
  '%webView_deleteBooks_label_selectBooks%',
  // Grid headers
  '%webView_deleteBooks_grid_book%',
  '%webView_deleteBooks_grid_chapters%',
  '%webView_deleteBooks_grid_verses%',
  '%webView_deleteBooks_grid_select%',
  '%webView_deleteBooks_grid_selected%',
  '%webView_deleteBooks_grid_empty%',
  // Buttons
  '%webView_deleteBooks_button_selectAll%',
  '%webView_deleteBooks_button_deselectAll%',
  '%webView_deleteBooks_button_delete%',
  '%webView_deleteBooks_button_cancel%',
  // Confirmation dialog
  '%webView_deleteBooks_confirm_title%',
  '%webView_deleteBooks_confirm_message%',
  '%webView_deleteBooks_confirm_delete%',
  '%webView_deleteBooks_confirm_cancel%',
  // Loading states
  '%webView_deleteBooks_deleting%',
  // Errors
  '%webView_deleteBooks_error_deleteFailed%',
  // Aria labels
  '%webView_deleteBooks_ariaLabel_bookGrid%',
  '%webView_deleteBooks_ariaLabel_gridHeader%',
  '%webView_deleteBooks_ariaLabel_selectBook%',
  '%webView_deleteBooks_ariaLabel_warningBanner%',
];

// ============================================================================
// INTERFACES
// ============================================================================

/** Book information for delete books form */
interface BookInfo {
  /** Book ID (e.g., "GEN", "MAT") */
  bookId: string;
  /** Book display name (e.g., "Genesis", "Matthew") */
  bookName: string;
  /** Number of chapters in the book */
  chapters: number;
  /** Number of verses in the book */
  verses: number;
}

// ============================================================================
// BOOK GRID COMPONENT
// ============================================================================

interface BookDeleteGridProps {
  books: BookInfo[];
  selectedBookIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  localizedStrings: Record<string, string>;
  disabled?: boolean;
}

function BookDeleteGrid({
  books,
  selectedBookIds,
  onSelectionChange,
  localizedStrings,
  disabled = false,
}: BookDeleteGridProps) {
  const selectedSet = useMemo(() => new Set(selectedBookIds), [selectedBookIds]);

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
  const headerBook = localizedStrings['%webView_deleteBooks_grid_book%'] || 'Book';
  const headerChapters = localizedStrings['%webView_deleteBooks_grid_chapters%'] || 'Chapters';
  const headerVerses = localizedStrings['%webView_deleteBooks_grid_verses%'] || 'Verses';

  return (
    <div className="tw-flex tw-flex-col tw-border tw-border-border tw-rounded-md tw-overflow-hidden">
      {/* Header */}
      <div
        className="tw-grid tw-grid-cols-[40px_100px_1fr_1fr] tw-gap-2 tw-p-2 tw-bg-muted tw-border-b tw-border-border tw-font-semibold tw-text-sm"
        role="row"
        aria-label={localizedStrings['%webView_deleteBooks_ariaLabel_gridHeader%'] || 'Grid header'}
      >
        <div className="tw-flex tw-items-center tw-justify-center">
          <span className="tw-sr-only">
            {localizedStrings['%webView_deleteBooks_grid_select%'] || 'Select'}
          </span>
        </div>
        <div className="tw-text-foreground">{headerBook}</div>
        <div className="tw-text-foreground tw-text-right tw-pr-4">{headerChapters}</div>
        <div className="tw-text-foreground tw-text-right tw-pr-4">{headerVerses}</div>
      </div>

      {/* Body with scrolling */}
      <div
        className="tw-overflow-y-auto tw-max-h-64"
        role="grid"
        aria-label={
          localizedStrings['%webView_deleteBooks_ariaLabel_bookGrid%'] || 'Book deletion grid'
        }
        aria-rowcount={books.length}
      >
        {books.map((book, index) => {
          const isSelected = selectedSet.has(book.bookId);
          const isSelectable = !disabled;

          return (
            <div
              key={book.bookId}
              className={`tw-grid tw-grid-cols-[40px_100px_1fr_1fr] tw-gap-2 tw-p-2 tw-border-b tw-border-border last:tw-border-b-0 tw-transition-colors ${
                isSelected ? 'tw-bg-destructive/10' : ''
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
                  id={`book-delete-${book.bookId}`}
                  checked={isSelected}
                  onCheckedChange={() => handleBookToggle(book.bookId)}
                  disabled={disabled}
                  aria-label={`${localizedStrings['%webView_deleteBooks_ariaLabel_selectBook%'] || 'Select'} ${book.bookName}`}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Book ID */}
              <div className="tw-flex tw-items-center" role="gridcell">
                <Label
                  htmlFor={`book-delete-${book.bookId}`}
                  className="tw-text-sm tw-font-medium tw-text-foreground tw-cursor-pointer"
                >
                  {book.bookId}
                </Label>
              </div>

              {/* Chapters */}
              <div className="tw-flex tw-items-center tw-justify-end tw-pr-4" role="gridcell">
                <span className="tw-text-sm tw-text-foreground">{book.chapters}</span>
              </div>

              {/* Verses */}
              <div className="tw-flex tw-items-center tw-justify-end tw-pr-4" role="gridcell">
                <span className="tw-text-sm tw-text-foreground">{book.verses}</span>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {books.length === 0 && (
          <div className="tw-p-4 tw-text-center tw-text-muted-foreground">
            {localizedStrings['%webView_deleteBooks_grid_empty%'] || 'No books available'}
          </div>
        )}
      </div>

      {/* Selection summary */}
      <div className="tw-p-2 tw-bg-muted tw-border-t tw-border-border tw-text-sm tw-text-muted-foreground">
        {`${selectedBookIds.length} / ${books.length} ${localizedStrings['%webView_deleteBooks_grid_selected%'] || 'books selected'}`}
      </div>
    </div>
  );
}

// ============================================================================
// CONFIRMATION DIALOG COMPONENT
// ============================================================================

interface ConfirmationDialogProps {
  isOpen: boolean;
  bookCount: number;
  bookList: string[];
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
  localizedStrings: Record<string, string>;
}

function ConfirmationDialog({
  isOpen,
  bookCount,
  bookList,
  onConfirm,
  onCancel,
  isDeleting,
  localizedStrings,
}: ConfirmationDialogProps) {
  if (!isOpen) return undefined;

  const title = localizedStrings['%webView_deleteBooks_confirm_title%'] || 'Confirm Deletion';
  const messageTemplate =
    localizedStrings['%webView_deleteBooks_confirm_message%'] ||
    'Are you sure you want to permanently delete {count} book(s)? This action cannot be undone.';
  const message = messageTemplate.replace('{count}', String(bookCount));

  const confirmButtonText = (
    localizedStrings['%webView_deleteBooks_confirm_delete%'] || 'Delete {count} Book(s)'
  ).replace('{count}', String(bookCount));
  const cancelButtonText =
    localizedStrings['%webView_deleteBooks_confirm_cancel%'] ||
    localizedStrings['%webView_deleteBooks_button_cancel%'] ||
    'Cancel';

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/50">
      <div
        className="tw-bg-background tw-border tw-border-border tw-rounded-lg tw-shadow-lg tw-max-w-md tw-w-full tw-mx-4"
        role="alertdialog"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        {/* Header */}
        <div className="tw-p-4 tw-border-b tw-border-border">
          <h2 id="confirm-dialog-title" className="tw-text-lg tw-font-semibold tw-text-foreground">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="tw-p-4">
          <p id="confirm-dialog-description" className="tw-text-sm tw-text-foreground tw-mb-4">
            {message}
          </p>

          {/* Book list */}
          <div className="tw-max-h-32 tw-overflow-y-auto tw-bg-muted tw-rounded tw-p-2 tw-mb-4">
            <ul className="tw-list-disc tw-list-inside tw-text-sm tw-text-foreground">
              {bookList.map((bookId) => (
                <li key={bookId}>{bookId}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isDeleting}>
            {cancelButtonText}
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Spinner className="tw-mr-2 tw-h-4 tw-w-4" />
                {localizedStrings['%webView_deleteBooks_deleting%'] || 'Deleting...'}
              </>
            ) : (
              confirmButtonText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WEB VIEW COMPONENT
// ============================================================================

global.webViewComponent = function DeleteBooksWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  // Get state from web view
  const [projectGuid] = useWebViewState<string>('projectGuid', '');
  const [projectName] = useWebViewState<string>('projectName', '');
  const [books] = useWebViewState<BookInfo[]>('books', []);

  // Form state
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  // UI state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleSelectAll = useCallback(() => {
    const allIds = books.map((b) => b.bookId);
    setSelectedBookIds(allIds);
  }, [books]);

  const handleDeselectAll = useCallback(() => {
    setSelectedBookIds([]);
  }, []);

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedBookIds(ids);
    setErrorMessage(undefined);
  }, []);

  // Called when Delete button is clicked - shows confirmation
  const handleDeleteClick = useCallback(() => {
    if (selectedBookIds.length === 0) return;
    setShowConfirmation(true);
  }, [selectedBookIds.length]);

  // Called when user confirms deletion
  const handleConfirmDelete = useCallback(async () => {
    if (!projectGuid || selectedBookIds.length === 0) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(undefined);

    try {
      // Call backend to delete books
      const result = await papi.commands.sendCommand('platformProjects.deleteBooks', {
        projectGuid,
        bookIds: selectedBookIds,
      });

      if (result && result.success) {
        logger.info(
          `Successfully deleted ${selectedBookIds.length} books from project ${projectGuid}`,
        );
        // Dialog would close on success
        setShowConfirmation(false);
      } else {
        const errorMsg =
          result?.error ||
          localizedStrings['%webView_deleteBooks_error_deleteFailed%'] ||
          'Failed to delete books';
        setErrorMessage(errorMsg);
        logger.error('Delete books failed:', errorMsg);
        setShowConfirmation(false);
      }
    } catch (error) {
      const errorMsg =
        localizedStrings['%webView_deleteBooks_error_deleteFailed%'] || 'Failed to delete books';
      setErrorMessage(errorMsg);
      logger.error('Delete books error:', error);
      setShowConfirmation(false);
    } finally {
      setIsDeleting(false);
    }
  }, [projectGuid, selectedBookIds, localizedStrings]);

  // Called when user cancels confirmation
  const handleCancelConfirmation = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleCancel = useCallback(() => {
    logger.info('Delete books dialog cancelled');
    // Close the web view
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================

  const isDeleteDisabled = isDeleting || selectedBookIds.length === 0;
  const labelText = (
    localizedStrings['%webView_deleteBooks_label_selectBooks%'] ||
    'Select books to delete from {projectName}:'
  ).replace('{projectName}', projectName);

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Warning Banner Zone */}
      <div
        className="tw-p-3 tw-bg-destructive/10 tw-border-b tw-border-destructive tw-flex tw-items-center tw-gap-2"
        role="alert"
        aria-label={
          localizedStrings['%webView_deleteBooks_ariaLabel_warningBanner%'] || 'Warning banner'
        }
      >
        <svg
          className="tw-h-5 tw-w-5 tw-text-destructive tw-flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <p className="tw-text-sm tw-font-semibold tw-text-destructive">
          {localizedStrings['%webView_deleteBooks_warning%'] ||
            'WARNING: This action cannot be undone!'}
        </p>
      </div>

      {/* Context Label Zone */}
      <div className="tw-p-4 tw-border-b tw-border-border">
        <p className="tw-text-sm tw-text-foreground">{labelText}</p>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="tw-p-3 tw-bg-destructive/10 tw-border-b tw-border-destructive">
          <p className="tw-text-sm tw-text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* Book Selection Grid Zone */}
      <div className="tw-flex-1 tw-overflow-hidden tw-p-4">
        {books.length > 0 ? (
          <BookDeleteGrid
            books={books}
            selectedBookIds={selectedBookIds}
            onSelectionChange={handleSelectionChange}
            localizedStrings={localizedStrings}
            disabled={isDeleting}
          />
        ) : (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
            {localizedStrings['%webView_deleteBooks_grid_empty%'] || 'No books available'}
          </div>
        )}
      </div>

      {/* Selection Actions Zone */}
      {books.length > 0 && (
        <div className="tw-flex tw-gap-2 tw-px-4 tw-pb-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            disabled={isDeleting || books.length === 0}
          >
            {localizedStrings['%webView_deleteBooks_button_selectAll%'] || 'Select All'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            disabled={isDeleting || selectedBookIds.length === 0}
          >
            {localizedStrings['%webView_deleteBooks_button_deselectAll%'] || 'Deselect All'}
          </Button>
        </div>
      )}

      {/* Dialog Actions Zone */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isDeleting}>
          {localizedStrings['%webView_deleteBooks_button_cancel%'] || 'Cancel'}
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDeleteClick}
          disabled={isDeleteDisabled}
        >
          {localizedStrings['%webView_deleteBooks_button_delete%'] || 'Delete'}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        bookCount={selectedBookIds.length}
        bookList={selectedBookIds}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelConfirmation}
        isDeleting={isDeleting}
        localizedStrings={localizedStrings}
      />
    </div>
  );
};
