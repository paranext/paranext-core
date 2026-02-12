/**
 * === NEW IN PT10 === Reason: TypeScript utility module for BookChooser web view Maps to:
 * UI-PKG-001
 */
import { LocalizeKey } from 'platform-bible-utils';

/** Localized string keys for the BookChooser web view */
export const BOOK_CHOOSER_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_bookChooser_title%',
  '%webView_bookChooser_btnAll%',
  '%webView_bookChooser_btnOT%',
  '%webView_bookChooser_btnNT%',
  '%webView_bookChooser_btnDC%',
  '%webView_bookChooser_btnExtra%',
  '%webView_bookChooser_btnDeselect%',
  '%webView_bookChooser_sbaWarning%',
  '%webView_bookChooser_tabBooks%',
  '%webView_bookChooser_helpText%',
  '%general_ok%',
  '%general_cancel%',
];

/** Canon book ranges */
export const CANON_RANGES = {
  /** Old Testament: Genesis - Malachi (1-39) */
  OT_START: 1,
  OT_END: 39,
  /** New Testament: Matthew - Revelation (40-66) */
  NT_START: 40,
  NT_END: 66,
  /** Deuterocanon typical range */
  DC_START: 67,
  DC_END: 75,
  /** Extra material starts at */
  EXTRA_START: 76,
} as const;

/**
 * Checks if a book number is in the Old Testament range
 *
 * @param bookNum Book number (1-based)
 * @returns True if OT book
 */
export function isOldTestament(bookNum: number): boolean {
  return bookNum >= CANON_RANGES.OT_START && bookNum <= CANON_RANGES.OT_END;
}

/**
 * Checks if a book number is in the New Testament range
 *
 * @param bookNum Book number (1-based)
 * @returns True if NT book
 */
export function isNewTestament(bookNum: number): boolean {
  return bookNum >= CANON_RANGES.NT_START && bookNum <= CANON_RANGES.NT_END;
}

/**
 * Checks if a book number is in the Deuterocanon range
 *
 * @param bookNum Book number (1-based)
 * @returns True if DC book
 */
export function isDeuterocanon(bookNum: number): boolean {
  return bookNum >= CANON_RANGES.DC_START && bookNum <= CANON_RANGES.DC_END;
}

/**
 * Checks if a book number is extra material (non-canonical)
 *
 * @param bookNum Book number (1-based)
 * @returns True if extra material
 */
export function isExtraMaterial(bookNum: number): boolean {
  return bookNum >= CANON_RANGES.EXTRA_START;
}

/**
 * Gets books from available list that match a range filter
 *
 * @param availableBooks Array of available book numbers
 * @param filterFn Function to filter books
 * @returns Filtered array of book numbers
 */
export function filterBooksByRange(
  availableBooks: number[],
  filterFn: (bookNum: number) => boolean,
): number[] {
  return availableBooks.filter(filterFn);
}

/**
 * Determines which quick-select buttons should be enabled based on available books
 *
 * @param availableBooks Array of available book numbers
 * @returns Object with enabled state for each button
 */
export function getQuickSelectButtonStates(availableBooks: number[]): {
  otEnabled: boolean;
  ntEnabled: boolean;
  dcEnabled: boolean;
  extraEnabled: boolean;
} {
  return {
    otEnabled: availableBooks.some(isOldTestament),
    ntEnabled: availableBooks.some(isNewTestament),
    dcEnabled: availableBooks.some(isDeuterocanon),
    extraEnabled: availableBooks.some(isExtraMaterial),
  };
}

/**
 * Checks if selected books include any not in the base project (for SBA warning)
 *
 * @param selectedBooks Currently selected books
 * @param baseProjectBooks Books in the SBA base project
 * @returns Books that are selected but not in base project
 */
export function getBooksNotInBase(selectedBooks: number[], baseProjectBooks: number[]): number[] {
  const baseSet = new Set(baseProjectBooks);
  return selectedBooks.filter((book) => !baseSet.has(book));
}
