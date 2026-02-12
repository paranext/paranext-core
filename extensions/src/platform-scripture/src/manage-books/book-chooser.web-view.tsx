/**
 * === NEW IN PT10 === Reason: React component pattern - BookChooser dialog for selecting scripture
 * books Maps to: UI-PKG-001 (CAP-UI-006)
 *
 * Behaviors implemented:
 *
 * - BHV-314: Tab navigation (Books tab only, Priority tab deferred)
 * - BHV-315: Quick select buttons (All, OT, NT, DC, Extra, Deselect)
 * - BHV-316: Button enable/disable based on available books
 * - EXT-013: SBA warning banner for base project overlap
 */
import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import { Alert, AlertDescription, Button, cn, Separator } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BOOK_CHOOSER_LOCALIZED_STRINGS,
  filterBooksByRange,
  getBooksNotInBase,
  getQuickSelectButtonStates,
  isDeuterocanon,
  isExtraMaterial,
  isNewTestament,
  isOldTestament,
} from './book-chooser.utils';

/** Input state for BookChooser */
export interface BookChooserInput {
  /** Dialog title */
  caption: string;
  /** Books available for selection */
  availableBooks: number[];
  /** Books initially selected */
  selectedBooks: number[];
  /** Project context for SBA handling */
  projectContext?: {
    projectId: string;
    projectType: string;
    baseProjectBooks?: number[];
    showPriorityTab: boolean;
  };
  /** Whether at least one book must be selected */
  requireSelectedBook?: boolean;
  /** Help text to display */
  helpText?: string;
}

/** Output state from BookChooser */
export interface BookChooserOutput {
  /** Result of dialog */
  action: 'submit' | 'cancel';
  /** Selected book numbers */
  selectedBooks?: number[];
}

/** Default input for development/testing */
const DEFAULT_INPUT: BookChooserInput = {
  caption: 'Select Books',
  availableBooks: Array.from({ length: 66 }, (_, i) => i + 1),
  selectedBooks: [],
  requireSelectedBook: false,
};

/**
 * BookChooser web view component for selecting scripture books
 *
 * Features:
 *
 * - Multi-select book list with canonical ordering
 * - Quick-select buttons for book ranges (All, OT, NT, DC, Extra)
 * - SBA base project warning banner
 * - Keyboard navigation support
 */
global.webViewComponent = function BookChooserWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // Get localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => BOOK_CHOOSER_LOCALIZED_STRINGS, []));

  // Get input from web view state (passed by provider)
  const [inputState] = useWebViewState<BookChooserInput>('input', DEFAULT_INPUT);
  const {
    caption,
    availableBooks,
    selectedBooks: initialSelectedBooks,
    projectContext,
    requireSelectedBook,
    helpText,
  } = inputState;

  // Local state for selected books
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(
    () => new Set(initialSelectedBooks),
  );

  // Track last clicked for shift-select
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  // Calculate button states based on available books
  const buttonStates = useMemo(() => getQuickSelectButtonStates(availableBooks), [availableBooks]);

  // Calculate SBA warning state
  const sbaWarning = useMemo(() => {
    if (!projectContext?.baseProjectBooks) {
      return null;
    }
    const booksNotInBase = getBooksNotInBase(
      Array.from(selectedBooks),
      projectContext.baseProjectBooks,
    );
    if (booksNotInBase.length === 0) {
      return null;
    }
    const bookNames = booksNotInBase
      .map((bookNum) => Canon.bookNumberToEnglishName(bookNum))
      .join(', ');
    return (
      localizedStrings['%webView_bookChooser_sbaWarning%']?.replace('{books}', bookNames) ||
      `You have selected books not in the base project: ${bookNames}`
    );
  }, [selectedBooks, projectContext?.baseProjectBooks, localizedStrings]);

  // Sort available books in canonical order
  const sortedBooks = useMemo(() => {
    return [...availableBooks].sort((a, b) => a - b);
  }, [availableBooks]);

  // Handle book click with Ctrl/Shift support
  const handleBookClick = useCallback(
    (bookNum: number, index: number, event: React.MouseEvent) => {
      setSelectedBooks((prev) => {
        const newSelection = new Set(prev);

        if (event.shiftKey && lastClickedIndex !== null) {
          // Shift+Click: select range
          const start = Math.min(lastClickedIndex, index);
          const end = Math.max(lastClickedIndex, index);
          for (let i = start; i <= end; i++) {
            newSelection.add(sortedBooks[i]);
          }
        } else if (event.ctrlKey || event.metaKey) {
          // Ctrl/Cmd+Click: toggle single
          if (newSelection.has(bookNum)) {
            newSelection.delete(bookNum);
          } else {
            newSelection.add(bookNum);
          }
        } else {
          // Regular click: select only this one
          newSelection.clear();
          newSelection.add(bookNum);
        }

        return newSelection;
      });
      setLastClickedIndex(index);
    },
    [lastClickedIndex, sortedBooks],
  );

  // Quick select handlers (BHV-315)
  const handleSelectAll = useCallback(() => {
    setSelectedBooks(new Set(availableBooks));
  }, [availableBooks]);

  const handleSelectOT = useCallback(() => {
    setSelectedBooks((prev) => {
      const newSelection = new Set(prev);
      filterBooksByRange(availableBooks, isOldTestament).forEach((book) => newSelection.add(book));
      return newSelection;
    });
  }, [availableBooks]);

  const handleSelectNT = useCallback(() => {
    setSelectedBooks((prev) => {
      const newSelection = new Set(prev);
      filterBooksByRange(availableBooks, isNewTestament).forEach((book) => newSelection.add(book));
      return newSelection;
    });
  }, [availableBooks]);

  const handleSelectDC = useCallback(() => {
    setSelectedBooks((prev) => {
      const newSelection = new Set(prev);
      filterBooksByRange(availableBooks, isDeuterocanon).forEach((book) => newSelection.add(book));
      return newSelection;
    });
  }, [availableBooks]);

  const handleSelectExtra = useCallback(() => {
    setSelectedBooks((prev) => {
      const newSelection = new Set(prev);
      filterBooksByRange(availableBooks, isExtraMaterial).forEach((book) => newSelection.add(book));
      return newSelection;
    });
  }, [availableBooks]);

  const handleDeselectAll = useCallback(() => {
    setSelectedBooks(new Set());
  }, []);

  // Result handlers - set web view state for parent to read
  const [, setOutput] = useWebViewState<BookChooserOutput | undefined>('output', undefined);

  const handleOk = useCallback(() => {
    setOutput({
      action: 'submit',
      selectedBooks: Array.from(selectedBooks),
    });
  }, [selectedBooks, setOutput]);

  const handleCancel = useCallback(() => {
    setOutput({
      action: 'cancel',
    });
  }, [setOutput]);

  // Keyboard handler for Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter') {
        if (!requireSelectedBook || selectedBooks.size > 0) {
          handleOk();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleOk, requireSelectedBook, selectedBooks.size]);

  // Determine if OK button should be disabled
  const isOkDisabled = requireSelectedBook && selectedBooks.size === 0;

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4"
      data-testid="BookChooserForm"
    >
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">{caption}</h2>

      {/* SBA Warning Banner (EXT-013) */}
      {sbaWarning && (
        <Alert variant="destructive">
          <AlertDescription>{sbaWarning}</AlertDescription>
        </Alert>
      )}

      {/* Quick Select Buttons (BHV-315, BHV-316) */}
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          aria-label={localizedStrings['%webView_bookChooser_btnAll%'] || 'All Books'}
        >
          {localizedStrings['%webView_bookChooser_btnAll%'] || 'All Books'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectOT}
          disabled={!buttonStates.otEnabled}
          aria-label={localizedStrings['%webView_bookChooser_btnOT%'] || 'Old Testament'}
        >
          {localizedStrings['%webView_bookChooser_btnOT%'] || 'Old Testament'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectNT}
          disabled={!buttonStates.ntEnabled}
          aria-label={localizedStrings['%webView_bookChooser_btnNT%'] || 'New Testament'}
        >
          {localizedStrings['%webView_bookChooser_btnNT%'] || 'New Testament'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectDC}
          disabled={!buttonStates.dcEnabled}
          aria-label={localizedStrings['%webView_bookChooser_btnDC%'] || 'Deuterocanon'}
        >
          {localizedStrings['%webView_bookChooser_btnDC%'] || 'Deuterocanon'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSelectExtra}
          disabled={!buttonStates.extraEnabled}
          aria-label={localizedStrings['%webView_bookChooser_btnExtra%'] || 'Extra Material'}
        >
          {localizedStrings['%webView_bookChooser_btnExtra%'] || 'Extra Material'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDeselectAll}
          aria-label={localizedStrings['%webView_bookChooser_btnDeselect%'] || 'Deselect All'}
        >
          {localizedStrings['%webView_bookChooser_btnDeselect%'] || 'Deselect All'}
        </Button>
      </div>

      <Separator />

      {/* Book List - Multi-column layout with scrolling */}
      <div className="tw-flex-1 tw-min-h-0 tw-overflow-y-auto">
        <div
          className="tw-grid tw-grid-cols-3 tw-gap-1 tw-p-2"
          role="listbox"
          aria-label={localizedStrings['%webView_bookChooser_tabBooks%'] || 'Books'}
          aria-multiselectable="true"
        >
          {sortedBooks.map((bookNum, index) => {
            const bookName = Canon.bookNumberToEnglishName(bookNum);
            const isSelected = selectedBooks.has(bookNum);
            return (
              <div
                key={bookNum}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={cn(
                  'tw-px-2 tw-py-1 tw-rounded tw-cursor-pointer tw-text-sm',
                  'tw-select-none tw-transition-colors',
                  'focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary',
                  isSelected ? 'tw-bg-primary tw-text-primary-foreground' : 'hover:tw-bg-muted',
                )}
                onClick={(e) => handleBookClick(bookNum, index, e)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleBookClick(bookNum, index, e as unknown as React.MouseEvent);
                  }
                }}
              >
                {bookName}
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Text */}
      {helpText && (
        <div className="tw-text-sm tw-text-muted-foreground tw-p-2 tw-bg-muted tw-rounded">
          {helpText}
        </div>
      )}

      <Separator />

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {localizedStrings['%general_cancel%'] || 'Cancel'}
        </Button>
        <Button type="button" onClick={handleOk} disabled={isOkDisabled}>
          {localizedStrings['%general_ok%'] || 'OK'}
        </Button>
      </div>
    </div>
  );
};
