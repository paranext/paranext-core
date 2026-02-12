/**
 * === NEW IN PT10 === Reason: TypeScript utility module for ImportBooks web view Maps to:
 * UI-PKG-006 (CAP-UI-005)
 *
 * Provides types, constants, and helper functions for the ImportBooks dialog. Includes file
 * comparison logic, duplicate detection (VAL-007), and display formatting.
 *
 * Behaviors implemented:
 *
 * - VAL-007: Duplicate book detection
 * - BHV-118: Comparison state logic
 * - EXT-008: Newer books bold styling support
 *
 * @see ui-spec-import-books.md for full specification
 */
import { LocalizeKey } from 'platform-bible-utils';

// ============================================================================
// Types
// ============================================================================

/** Comparison state for import files vs existing books */
export type ImportComparisonState =
  | 'import-newer'
  | 'existing-newer'
  | 'same'
  | 'new-book'
  | 'no-import';

/** Information about an existing book in the project */
export interface ExistingBookInfo {
  bookNum: number;
  bookName: string;
  modifiedDate: string | null;
  displayText: string;
}

/** Parsed content from a USFM/SFM file */
export interface ParsedBookContent {
  usfm: string;
  chapters: string[];
}

/** Information about a single import file/book entry in the grid */
export interface ImportFileInfo {
  /** Index in the import list */
  index: number;
  /** Source file path */
  filePath: string;
  /** Source file name */
  fileName: string;
  /** Detected book number */
  bookNum: number;
  /** Book name */
  bookName: string;
  /** File modification date */
  fileDate: string | null;
  /** Display text for source column */
  sourceDisplayText: string;
  /** Existing book info (if exists in project) */
  existingBook: ExistingBookInfo | null;
  /** Comparison state */
  comparisonState: ImportComparisonState;
  /** Whether row is enabled for selection */
  isEnabled: boolean;
  /** Default include based on comparison */
  defaultInclude: boolean;
}

/** Error during import */
export interface ImportError {
  fileIndex: number;
  fileName: string;
  error: string;
}

/** Duplicate detection error */
export interface DuplicateError {
  file1: string;
  file2: string;
  bookNum: number;
}

/** Input state for the ImportBooks dialog */
export interface ImportBooksInput {
  /** Project to import into */
  projectId: string;
  /** Project name (for title) */
  projectName: string;
  /** Project encoding */
  projectEncoding: string;
  /** Last used import directory (from settings) */
  lastImportDirectory?: string;
}

/** Output state from the ImportBooks dialog */
export interface ImportBooksOutput {
  /** Result of dialog */
  action: 'submit' | 'cancel';
  /** Books that were imported */
  importedBooks?: number[];
  /** Errors during import */
  errors?: ImportError[];
}

/** Request to import books via PAPI */
export interface ImportBooksRequest {
  projectId: string;
  files: FileImportData[];
  replaceEntireBook: boolean;
}

/** File data for PAPI import request */
export interface FileImportData {
  filePath: string;
  targetBookNum: number;
  include: boolean;
}

/** Result from book operation via PAPI */
export interface BookOperationResult {
  success: boolean;
  processedBooks: number[];
  lastBookNum: number;
  errors?: Array<{ bookNum: number; errorCode: string; message: string }>;
}

/** Result from validate import files via PAPI */
export interface ImportValidationResult {
  isValid: boolean;
  files: ValidatedFileInfo[];
  errorMessage?: string;
}

/** Validated file information from PAPI */
export interface ValidatedFileInfo {
  filePath: string;
  bookNum: number;
  bookName: string;
  comparison: string;
  canImport: boolean;
  tooltip?: string;
  fileDate?: string;
  existingDate?: string;
}

// ============================================================================
// Localization
// ============================================================================

/** Localized string keys for the ImportBooks web view */
export const IMPORT_BOOKS_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_importBooks_title%',
  '%webView_importBooks_booksToImportHeader%',
  '%webView_importBooks_booksInProjectHeader%',
  '%webView_importBooks_selectAllButton%',
  '%webView_importBooks_deselectAllButton%',
  '%webView_importBooks_addFilesButton%',
  '%webView_importBooks_clearListButton%',
  '%webView_importBooks_replaceEntireBooksLabel%',
  '%webView_importBooks_helpText%',
  '%webView_importBooks_importing%',
  '%webView_importBooks_validating%',
  '%webView_importBooks_noFiles%',
  '%webView_importBooks_duplicateError%',
  '%webView_importBooks_usxConfirmation%',
  '%webView_importBooks_grid_ariaLabel%',
  '%webView_importBooks_browseFiles_ariaLabel%',
  '%webView_importBooks_viewDifferencesDisabled%',
  '%general_ok%',
  '%general_cancel%',
];

// ============================================================================
// Comparison Utilities
// ============================================================================

/**
 * Map backend comparison string to ImportComparisonState.
 *
 * @param comparison - Backend comparison string
 * @param existingDate - Whether existing book has a date
 * @returns The comparison state
 */
export function mapImportComparisonState(
  comparison: string,
  existingDate?: string | null,
): ImportComparisonState {
  if (!existingDate) return 'new-book';

  switch (comparison.toLowerCase()) {
    case 'importnewer':
    case 'import-newer':
    case 'import_newer':
    case 'source-newer':
    case 'sourcenewer':
      return 'import-newer';
    case 'existingnewer':
    case 'existing-newer':
    case 'existing_newer':
    case 'dest-newer':
    case 'destnewer':
      return 'existing-newer';
    case 'same':
    case 'equal':
      return 'same';
    default:
      return 'same';
  }
}

/**
 * Convert ValidatedFileInfo from the backend to ImportFileInfo for the grid.
 *
 * @param info - Backend validated file info
 * @param index - Row index in the grid
 * @returns Import file info for the grid
 */
export function toImportFileInfo(info: ValidatedFileInfo, index: number): ImportFileInfo {
  const comparisonState = mapImportComparisonState(info.comparison, info.existingDate);

  const existingBook: ExistingBookInfo | null = info.existingDate
    ? {
        bookNum: info.bookNum,
        bookName: info.bookName,
        modifiedDate: info.existingDate,
        displayText: formatBookDisplay(info.bookName, info.existingDate),
      }
    : null;

  return {
    index,
    filePath: info.filePath,
    fileName: extractFileName(info.filePath),
    bookNum: info.bookNum,
    bookName: info.bookName,
    fileDate: info.fileDate || null,
    sourceDisplayText: formatSourceDisplay(info.bookName, info.fileDate || null),
    existingBook,
    comparisonState,
    isEnabled: info.canImport,
    defaultInclude: info.canImport && comparisonState !== 'existing-newer',
  };
}

/**
 * Extract file name from a full file path.
 *
 * @param filePath - Full file path
 * @returns Just the file name
 */
export function extractFileName(filePath: string): string {
  const parts = filePath.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1] || filePath;
}

/**
 * Format source file display text with book name and date.
 *
 * @param bookName - The book name
 * @param fileDate - ISO date string or null
 * @returns Formatted display text
 */
export function formatSourceDisplay(bookName: string, fileDate: string | null): string {
  if (!fileDate) {
    return bookName;
  }
  try {
    const date = new Date(fileDate);
    const dateStr = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timeStr = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${bookName} - ${dateStr} ${timeStr}`;
  } catch {
    return bookName;
  }
}

/**
 * Format a book name with its modification date for the existing books column.
 *
 * @param bookName - The book name
 * @param modifiedDate - ISO date string or null
 * @returns Formatted display text
 */
export function formatBookDisplay(bookName: string, modifiedDate: string | null): string {
  if (!modifiedDate) {
    return bookName;
  }
  try {
    const date = new Date(modifiedDate);
    const dateStr = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timeStr = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${bookName} - ${dateStr} ${timeStr}`;
  } catch {
    return bookName;
  }
}

// ============================================================================
// Selection Utilities
// ============================================================================

/**
 * Initialize selected files map from import file data using default selections.
 *
 * @param files - Array of import file info
 * @returns Record mapping file indices to selected state
 */
export function initializeSelectedFiles(files: ImportFileInfo[]): Record<number, boolean> {
  const selected: Record<number, boolean> = {};
  for (const file of files) {
    if (file.isEnabled) {
      selected[file.index] = file.defaultInclude;
    }
  }
  return selected;
}

// ============================================================================
// Duplicate Detection (VAL-007)
// ============================================================================

/**
 * Check if multiple files contain the same book. PT9 Source: ImportBooksForm.cs:244-269
 *
 * @param files - Import file info array
 * @param selectedFiles - Record of selected file indices
 * @returns DuplicateError if found, null otherwise
 */
export function overlappingFilesFound(
  files: ImportFileInfo[],
  selectedFiles: Record<number, boolean>,
): DuplicateError | null {
  const bookToFile = new Map<number, string>();

  for (const file of files) {
    if (!selectedFiles[file.index]) continue;

    const existingFile = bookToFile.get(file.bookNum);
    if (existingFile) {
      return {
        file1: existingFile,
        file2: file.fileName,
        bookNum: file.bookNum,
      };
    }
    bookToFile.set(file.bookNum, file.fileName);
  }
  return null;
}

/**
 * Format duplicate error message.
 *
 * @param error - The duplicate error
 * @returns Formatted error message
 */
export function formatDuplicateError(error: DuplicateError): string {
  return `${error.file1} <=> ${error.file2}: Two files contain information for the same book.`;
}

/**
 * Check if a file path has a USX extension.
 *
 * @param filePath - The file path to check
 * @returns True if the file is a .usx file
 */
export function isUsxFile(filePath: string): boolean {
  return filePath.toLowerCase().endsWith('.usx');
}

/**
 * Build the ImportBooksRequest from current form state.
 *
 * @param projectId - The project ID
 * @param files - Import file info array
 * @param selectedFiles - Record of selected file indices
 * @param replaceEntireBooks - Whether to replace entire book content
 * @returns The import request for PAPI
 */
export function buildImportRequest(
  projectId: string,
  files: ImportFileInfo[],
  selectedFiles: Record<number, boolean>,
  replaceEntireBooks: boolean,
): ImportBooksRequest {
  const importFiles: FileImportData[] = files
    .filter((file) => selectedFiles[file.index])
    .map((file) => ({
      filePath: file.filePath,
      targetBookNum: file.bookNum,
      include: true,
    }));

  return {
    projectId,
    files: importFiles,
    replaceEntireBook: replaceEntireBooks,
  };
}
