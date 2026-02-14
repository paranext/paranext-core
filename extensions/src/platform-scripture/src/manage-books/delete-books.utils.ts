/**
 * === NEW IN PT10 === Reason: TypeScript utility module for DeleteBooks web view Maps to:
 * UI-PKG-003 (CAP-UI-003)
 *
 * Provides types, constants, and helper functions for the DeleteBooks dialog. Includes localization
 * keys, display formatting, and SBA detection.
 *
 * @see ui-spec-delete-books.md for full specification
 */
import { Canon } from '@sillsdev/scripture';
import { LocalizeKey } from 'platform-bible-utils';

// ============================================================================
// Types
// ============================================================================

/** Project types supported by the delete books dialog */
export type ProjectType =
  | 'Standard'
  | 'Auxiliary'
  | 'Daughter'
  | 'StudyBible'
  | 'StudyBibleAdditions'
  | 'BackTranslation'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'ConsultantNotes'
  | 'GlobalConsultantNotes'
  | 'GlobalAnthropologyNotes';

/** Project option in the project dropdown */
export interface DeleteProjectOption {
  /** Project unique identifier */
  id: string;
  /** Project display name */
  name: string;
  /** Project short name */
  shortName: string;
  /** Project type */
  projectType: ProjectType;
  /** Whether project uses Send/Receive */
  isShared: boolean;
  /** Books that exist in the project */
  existingBooks: number[];
}

/** Input state for DeleteBooks dialog */
export interface DeleteBooksInput {
  /** Current project ID for preselection */
  currentProjectId: string;
  /** Projects where user is administrator */
  adminProjects: DeleteProjectOption[];
  /** Project type of current project */
  projectType: ProjectType;
}

/** Form state for DeleteBooks dialog */
export interface DeleteBooksFormState {
  selectedProjectId: string | null;
  selectedProject: DeleteProjectOption | null;
  selectedBooks: number[];
  selectedBooksDisplay: string;
  showSbaBanner: boolean;
  isAdminOfSelected: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: string[];
}

/** Output from DeleteBooks dialog */
export interface DeleteBooksOutput {
  /** Result of dialog */
  action: 'submit' | 'cancel';
  /** Number of books deleted (on submit) */
  deletedCount?: number;
}

// ============================================================================
// Localization Keys
// ============================================================================

/** All localization keys used by the DeleteBooks component */
export const DELETE_BOOKS_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_deleteBooks_title%',
  '%webView_deleteBooks_projectLabel%',
  '%webView_deleteBooks_booksLabel%',
  '%webView_deleteBooks_chooseButton%',
  '%webView_deleteBooks_chooseButton_ariaLabel%',
  '%webView_deleteBooks_sbaBanner%',
  '%webView_deleteBooks_helpText%',
  '%webView_deleteBooks_chooserCaption%',
  '%webView_deleteBooks_chooserHelpText%',
  '%webView_deleteBooks_confirmTitle%',
  '%webView_deleteBooks_confirmShared%',
  '%webView_deleteBooks_confirmNonShared%',
  '%webView_deleteBooks_allBooksWarning%',
  '%webView_deleteBooks_projectDropdown_ariaLabel%',
  '%webView_deleteBooks_booksField_ariaLabel%',
  '%general_ok%',
  '%general_cancel%',
  '%general_yes%',
  '%general_no%',
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the display name for a book number using Canon API. Falls back to "Book N" if the book number
 * is not recognized.
 *
 * @param bookNum - The book number (1-based)
 * @returns The book name
 */
export function getBookName(bookNum: number): string {
  try {
    return Canon.bookNumberToEnglishName(bookNum);
  } catch {
    return `Book ${bookNum}`;
  }
}

/**
 * Format an array of book numbers as a display string. For small arrays, shows all book names. For
 * larger arrays, shows first few and a count.
 *
 * @param books - Array of book numbers
 * @param maxDisplay - Maximum number of book names to show before truncating (default: 5)
 * @returns Formatted string like "Genesis, Exodus, Leviticus" or "Genesis, Exodus, ... (10 books)"
 */
export function formatBooksDisplay(books: number[], maxDisplay: number = 5): string {
  if (books.length === 0) return '';

  if (books.length <= maxDisplay) {
    return books.map(getBookName).join(', ');
  }

  const displayCount = Math.max(3, Math.floor(maxDisplay / 2));
  const firstBooks = books.slice(0, displayCount).map(getBookName).join(', ');
  return `${firstBooks}, ... (${books.length} books)`;
}

/**
 * Format a localized string template with replacement values.
 *
 * @example FormatString('Delete {count} books from {projectName}?', { count: 5, projectName: 'My
 * Project' }) // => 'Delete 5 books from My Project?'
 *
 * @param template - String template with {key} placeholders
 * @param replacements - Object mapping keys to replacement values
 * @returns Formatted string with replacements applied
 */
export function formatString(
  template: string,
  replacements: Record<string, string | number>,
): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}

/**
 * Check if a project type is Study Bible Additions (SBA). SBA projects have special restrictions on
 * which books can be deleted.
 *
 * @param projectType - The project type string
 * @returns True if the project is SBA
 */
export function isStudyBibleAdditions(projectType: string): boolean {
  return projectType === 'StudyBibleAdditions';
}

/**
 * Get the canonical range a book belongs to.
 *
 * @param bookNum - The book number
 * @returns 'OT' | 'NT' | 'DC' | 'Extra'
 */
export function getBookRange(bookNum: number): 'OT' | 'NT' | 'DC' | 'Extra' {
  if (bookNum >= 1 && bookNum <= 39) return 'OT';
  if (bookNum >= 40 && bookNum <= 66) return 'NT';
  if (bookNum >= 67 && bookNum <= 84) return 'DC';
  return 'Extra';
}

/**
 * Check if a book is non-canonical (can be deleted from SBA projects). SBA projects can only delete
 * books that are not in the base canon (OT/NT).
 *
 * @param bookNum - The book number
 * @returns True if the book is non-canonical (DC or Extra)
 */
export function isNonCanonical(bookNum: number): boolean {
  const range = getBookRange(bookNum);
  return range === 'DC' || range === 'Extra';
}
