/**
 * === NEW IN PT10 === Reason: TypeScript utility module for CreateBooks web view Maps to:
 * UI-PKG-004 (CAP-UI-001)
 */
import { LocalizeKey } from 'platform-bible-utils';

/** Creation mode for new books */
export type BookCreationMode = 'empty' | 'cv' | 'model';

/** Input state for CreateBooks */
export interface CreateBooksInput {
  /** The scripture text/project to create books in */
  projectId: string;
  /** Current book number (for preselection) */
  currentBookNum?: number;
  /** Project type determines SBA restrictions */
  projectType: string;
  /** Books already in the project (cannot create these) */
  existingBooks: number[];
  /** Available model projects for "Create based on" option */
  modelProjects: ModelProjectOption[];
  /** Last selected option (from user settings) */
  lastSelectedOption?: BookCreationMode;
  /** Last selected model project (from user settings) */
  lastModelProjectId?: string;
}

/** Option for a model project in the dropdown */
export interface ModelProjectOption {
  id: string;
  name: string;
  shortName: string;
}

/** Form state for CreateBooks */
export interface CreateBooksFormState {
  /** Books selected for creation */
  selectedBooks: number[];
  /** Display text for selected books */
  selectedBooksDisplay: string;
  /** Current creation mode */
  creationMode: BookCreationMode;
  /** Selected model project (when mode === 'model') */
  selectedModelId: string | null;
  /** Whether CV option is available (false for SBA) */
  cvOptionEnabled: boolean;
  /** Whether SBA banner should be shown */
  showSbaBanner: boolean;
  /** UI state */
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
}

/** Output state from CreateBooks */
export interface CreateBooksOutput {
  /** Result of dialog */
  action: 'submit' | 'cancel';
  /** Last created book number (for navigation) */
  lastCreatedBookNum?: number;
  /** All created book numbers */
  createdBooks?: number[];
}

/** Request to create books via PAPI */
export interface CreateBooksRequest {
  projectId: string;
  bookNumbers: number[];
  mode: BookCreationMode;
  modelProjectId?: string;
}

/** Result from creating books via PAPI */
export interface CreateBooksResult {
  success: boolean;
  createdBooks: number[];
  lastCreatedBookNum: number;
  errors?: string[];
}

/** Result from validating model books */
export interface ModelValidationResult {
  valid: boolean;
  missingBooks: number[];
  missingBookNames: string[];
  modelProjectName: string;
}

/** Result from versification compatibility check */
export interface VersificationCheckResult {
  compatible: boolean;
  projectVersification: string;
  modelVersification: string;
  projectName: string;
  modelName: string;
}

/** Localized string keys for the CreateBooks web view */
export const CREATE_BOOKS_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_createBooks_title%',
  '%webView_createBooks_booksLabel%',
  '%webView_createBooks_chooseButton%',
  '%webView_createBooks_optionEmpty%',
  '%webView_createBooks_optionCV%',
  '%webView_createBooks_optionModel%',
  '%webView_createBooks_modelPlaceholder%',
  '%webView_createBooks_sbaBanner%',
  '%webView_createBooks_helpText%',
  '%webView_createBooks_validationModelRequired%',
  '%webView_createBooks_validationModelMissing%',
  '%webView_createBooks_validationVersification%',
  '%webView_createBooks_creating%',
  '%webView_createBooks_noBooksSelected%',
  '%general_ok%',
  '%general_cancel%',
];

/**
 * Determines the initial creation mode based on input state
 *
 * @param input CreateBooks input state
 * @returns The initial creation mode to use
 */
export function getInitialCreationMode(input: CreateBooksInput): BookCreationMode {
  const isSBA = input.projectType === 'StudyBibleAdditions';

  // If last selected option is available and valid, use it
  if (input.lastSelectedOption) {
    // If SBA and last option was CV, fall back to empty
    if (isSBA && input.lastSelectedOption === 'cv') {
      return 'empty';
    }
    return input.lastSelectedOption;
  }

  return 'empty';
}

/**
 * Generates display text for selected books
 *
 * @param selectedBooks Array of selected book numbers
 * @param getBookName Function to get book name from number
 * @returns Formatted display string
 */
export function getSelectedBooksDisplayText(
  selectedBooks: number[],
  getBookName: (bookNum: number) => string,
): string {
  if (selectedBooks.length === 0) {
    return '';
  }
  if (selectedBooks.length <= 5) {
    return selectedBooks.map(getBookName).join(', ');
  }
  const firstFour = selectedBooks.slice(0, 4).map(getBookName).join(', ');
  return `${firstFour}, ... (${selectedBooks.length} books)`;
}

/**
 * Checks if the project is a Study Bible Additions project
 *
 * @param projectType Project type string
 * @returns True if SBA project
 */
export function isSBAProject(projectType: string): boolean {
  return projectType === 'StudyBibleAdditions';
}
