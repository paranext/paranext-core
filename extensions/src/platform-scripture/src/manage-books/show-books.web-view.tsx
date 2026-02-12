/**
 * === NEW IN PT10 === Reason: React component pattern - ShowBooks dialog for displaying project
 * books Maps to: UI-PKG-002 (CAP-UI-006)
 *
 * Behaviors implemented:
 *
 * - BHV-310: ShowCreatedBooks - read-only display with checkmarks for existing books
 *
 * This component displays a multi-column list of all books in the project's versification, with
 * checkmarks indicating which books currently exist in the project.
 *
 * @see ui-spec-show-books.md for full specification
 */
import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import { Button } from 'platform-bible-react';
import { useCallback, useEffect, useMemo } from 'react';

// ============================================================================
// Types
// ============================================================================

/** Input state for the ShowBooks dialog */
export interface ShowBooksInput {
  /** Project to show books for */
  projectId: string;
  /** Project name (for title) */
  projectName: string;
  /** All books in the versification */
  allPossibleBooks: number[];
  /** Books that exist in the project */
  existingBooks: number[];
}

/** Output state from ShowBooks dialog */
export interface ShowBooksOutput {
  /** Always 'close' since this is read-only */
  action: 'close';
}

/** Display data for each book in the list */
interface BookDisplayItem {
  bookNum: number;
  bookName: string;
  exists: boolean;
  isObsolete: boolean;
}

// ============================================================================
// Constants
// ============================================================================

/** Localization keys for ShowBooks component */
const SHOW_BOOKS_LOCALIZED_STRINGS = [
  '%showBooks_title%',
  '%showBooks_helpText%',
  '%showBooks_close%',
  '%showBooks_bookExists%',
  '%showBooks_bookNotExists%',
];

// Obsolete books (deprecated apocrypha that should only show if they exist)
const OBSOLETE_BOOKS: number[] = [83, 84]; // Prayer of Manasseh, Psalm 151

/** Default input for development/testing */
const DEFAULT_INPUT: ShowBooksInput = {
  projectId: '',
  projectName: '',
  allPossibleBooks: [],
  existingBooks: [],
};

// ============================================================================
// Helper Functions
// ============================================================================

/** Get the book name for a book number using Canon API. */
function getBookName(bookNum: number): string {
  try {
    return Canon.bookNumberToEnglishName(bookNum);
  } catch {
    return `Book ${bookNum}`;
  }
}

/** Check if a book is obsolete */
function isObsolete(bookNum: number): boolean {
  return OBSOLETE_BOOKS.includes(bookNum);
}

/**
 * Build the display items for the book list. BHV-310: ShowCreatedBooks - filters obsolete books
 * unless they exist
 */
function buildBookDisplayItems(
  allPossibleBooks: number[],
  existingBooks: number[],
): BookDisplayItem[] {
  const existingSet = new Set(existingBooks);

  return allPossibleBooks
    .filter((bookNum) => {
      // Filter out obsolete books unless they exist in the project
      if (isObsolete(bookNum) && !existingSet.has(bookNum)) {
        return false;
      }
      return true;
    })
    .map((bookNum) => ({
      bookNum,
      bookName: getBookName(bookNum),
      exists: existingSet.has(bookNum),
      isObsolete: isObsolete(bookNum),
    }));
}

// ============================================================================
// Component
// ============================================================================

/**
 * ShowBooks web view component - read-only display of project books
 *
 * Features:
 *
 * - Multi-column book list with checkmarks for existing books
 * - Obsolete book filtering (shown only if they exist)
 * - Help text explaining the display
 * - Close button and keyboard support (Enter/Escape)
 */
global.webViewComponent = function ShowBooksWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // Localization
  const [localizedStrings] = useLocalizedStrings(useMemo(() => SHOW_BOOKS_LOCALIZED_STRINGS, []));

  // Get input from web view state (passed by provider)
  const [inputState] = useWebViewState<ShowBooksInput>('input', DEFAULT_INPUT);
  const { allPossibleBooks, existingBooks, projectName } = inputState;

  // Output state
  const [, setOutput] = useWebViewState<ShowBooksOutput | undefined>('output', undefined);

  // Build display items from input
  const bookDisplayItems = useMemo(
    () => buildBookDisplayItems(allPossibleBooks, existingBooks),
    [allPossibleBooks, existingBooks],
  );

  // Format title with project name
  const dialogTitle = useMemo(() => {
    const template = localizedStrings['%showBooks_title%'] || 'Show Book(s) - {projectName}';
    return template.replace('{projectName}', projectName);
  }, [localizedStrings, projectName]);

  // Handle close action
  const handleClose = useCallback(() => {
    setOutput({ action: 'close' });
  }, [setOutput]);

  // Handle keyboard events for dialog close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4" data-testid="ShowBooksForm">
      {/* Dialog Header */}
      <h2 className="tw-text-lg tw-font-semibold tw-mb-4 tw-text-foreground">{dialogTitle}</h2>

      {/* Book List - Multi-column layout */}
      <div
        className="tw-flex-1 tw-overflow-auto tw-border tw-rounded tw-p-2 tw-mb-4"
        role="list"
        aria-label={localizedStrings['%showBooks_helpText%'] || 'List of books in project'}
      >
        <div className="tw-grid tw-grid-cols-3 tw-gap-2 md:tw-grid-cols-4 lg:tw-grid-cols-5">
          {bookDisplayItems.map((item) => (
            <div
              key={item.bookNum}
              className="tw-flex tw-items-center tw-gap-2 tw-py-1"
              role="listitem"
              aria-label={`${item.bookName}, ${
                item.exists
                  ? localizedStrings['%showBooks_bookExists%'] || 'Book exists in project'
                  : localizedStrings['%showBooks_bookNotExists%'] ||
                    'Book does not exist in project'
              }`}
            >
              {/* Checkmark for existing books */}
              <span
                className={`tw-w-4 tw-text-center ${
                  item.exists ? 'tw-text-green-600' : 'tw-text-transparent'
                }`}
                aria-hidden="true"
              >
                {item.exists ? '\u2713' : '\u00A0'}
              </span>
              {/* Book name */}
              <span
                className={`tw-truncate ${
                  item.isObsolete ? 'tw-italic tw-text-muted-foreground' : ''
                }`}
                title={item.bookName}
              >
                {item.bookName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="tw-text-sm tw-text-muted-foreground tw-mb-4 tw-p-2 tw-bg-muted tw-rounded">
        {localizedStrings['%showBooks_helpText%'] ||
          'This dialog lists every book that could exist in a project based on all the different versifications. A checkmark indicates that the book exists in the project.'}
      </div>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end">
        <Button
          type="button"
          onClick={handleClose}
          aria-label={localizedStrings['%showBooks_close%'] || 'Close'}
        >
          {localizedStrings['%showBooks_close%'] || 'Close'}
        </Button>
      </div>
    </div>
  );
};
