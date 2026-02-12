/**
 * === NEW IN PT10 === Reason: TypeScript utility module for CopyBooks web view Maps to: UI-PKG-005
 * (CAP-UI-002)
 *
 * Provides types, constants, and helper functions for the CopyBooks dialog. Includes project type
 * filtering logic (INV-007, INV-008) and comparison utilities.
 */
import { LocalizeKey } from 'platform-bible-utils';

// ============================================================================
// Types
// ============================================================================

/** Project type enumeration */
export type ProjectType =
  | 'Standard'
  | 'StudyBible'
  | 'StudyBibleAdditions'
  | 'Auxiliary'
  | 'Daughter'
  | 'BackTranslation'
  | 'TransliterationManual';

/** Book comparison state */
export type ComparisonState =
  | 'source-newer'
  | 'dest-newer'
  | 'same'
  | 'source-only'
  | 'dest-only'
  | 'neither';

/** A project option for the copy dropdowns */
export interface CopyProjectOption {
  id: string;
  name: string;
  shortName: string;
  projectType: ProjectType;
  hasBooks: boolean;
  isProtected: boolean;
}

/** Information about a single book in a project */
export interface BookInfo {
  exists: boolean;
  modifiedDate: string | null;
  displayText: string;
}

/** Comparison data for a single book across two projects */
export interface BookComparison {
  bookNum: number;
  bookName: string;
  source: BookInfo | null;
  dest: BookInfo | null;
  comparisonState: ComparisonState;
  isEnabled: boolean;
  defaultInclude: boolean;
}

/** Error during copy operation */
export interface CopyError {
  bookNum: number;
  error: string;
}

/** Input state for the CopyBooks dialog */
export interface CopyBooksInput {
  /** Current project (used for preselection) */
  currentProjectId: string;
  /** Current project type */
  currentProjectType: ProjectType;
  /** Base project ID (for Auxiliary projects) */
  baseProjectId?: string;
  /** Available source projects */
  fromProjects: CopyProjectOption[];
  /** Default filter for To project (based on From selection) */
  projectTypeFilter?: ProjectType[];
}

/** Output state from the CopyBooks dialog */
export interface CopyBooksOutput {
  /** Result of dialog */
  action: 'submit' | 'cancel';
  /** Last copied book number (for navigation) */
  lastCopiedBookNum?: number;
  /** All copied book numbers */
  copiedBooks?: number[];
  /** Errors during copy */
  errors?: CopyError[];
}

/** Request to copy books via PAPI */
export interface CopyBooksRequest {
  sourceProjectId: string;
  destProjectId: string;
  bookNumbers: number[];
}

/** Result from comparing books via PAPI */
export interface BookComparisonResult {
  books: BookComparisonInfo[];
  sourceProject: ProjectInfoSummary;
  destProject: ProjectInfoSummary;
}

/** Info about a single book comparison from the backend */
export interface BookComparisonInfo {
  bookNum: number;
  bookName: string;
  comparison: string;
  sourceExists: boolean;
  destExists: boolean;
  sourceModified: string | null;
  destModified: string | null;
  defaultSelected: boolean;
}

/** Minimal project info from comparison result */
export interface ProjectInfoSummary {
  id: string;
  name: string;
  shortName: string;
}

/** Result from book operation */
export interface BookOperationResult {
  success: boolean;
  processedBooks: number[];
  lastBookNum: number;
  errors?: Array<{ bookNum: number; errorCode: string; message: string }>;
}

// ============================================================================
// Localization
// ============================================================================

/** Localized string keys for the CopyBooks web view */
export const COPY_BOOKS_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_copyBooks_title%',
  '%webView_copyBooks_fromProjectLabel%',
  '%webView_copyBooks_toProjectLabel%',
  '%webView_copyBooks_fromProjectPlaceholder%',
  '%webView_copyBooks_toProjectPlaceholder%',
  '%webView_copyBooks_warningMessage%',
  '%webView_copyBooks_selectAllButton%',
  '%webView_copyBooks_deselectAllButton%',
  '%webView_copyBooks_fromBooksHeader%',
  '%webView_copyBooks_toBooksHeader%',
  '%webView_copyBooks_helpText%',
  '%webView_copyBooks_copying%',
  '%webView_copyBooks_loadingComparison%',
  '%webView_copyBooks_viewDifferencesDisabled%',
  '%webView_copyBooks_fromDropdown_ariaLabel%',
  '%webView_copyBooks_toDropdown_ariaLabel%',
  '%webView_copyBooks_grid_ariaLabel%',
  '%general_ok%',
  '%general_cancel%',
];

// ============================================================================
// Project Type Filtering (INV-007, INV-008)
// ============================================================================

/**
 * Mapping of source project type to allowed destination project types. Implements INV-007 and
 * INV-008 from the specification.
 */
const PROJECT_TYPE_COMPATIBILITY: Record<ProjectType, ProjectType[]> = {
  Standard: [
    'Auxiliary',
    'BackTranslation',
    'Daughter',
    'Standard',
    'StudyBible',
    'StudyBibleAdditions',
    'TransliterationManual',
  ],
  StudyBible: ['StudyBible'],
  StudyBibleAdditions: ['StudyBibleAdditions'],
  Auxiliary: [
    'BackTranslation',
    'Daughter',
    'Standard',
    'StudyBible',
    'StudyBibleAdditions',
    'TransliterationManual',
  ],
  BackTranslation: [
    'Auxiliary',
    'Daughter',
    'Standard',
    'StudyBible',
    'StudyBibleAdditions',
    'TransliterationManual',
  ],
  Daughter: [
    'Auxiliary',
    'BackTranslation',
    'Standard',
    'StudyBible',
    'StudyBibleAdditions',
    'TransliterationManual',
  ],
  TransliterationManual: [
    'Auxiliary',
    'BackTranslation',
    'Daughter',
    'Standard',
    'StudyBible',
    'StudyBibleAdditions',
  ],
};

/**
 * Get the allowed destination project types for a given source project type.
 *
 * @param sourceType - The project type of the source/from project
 * @returns Array of allowed destination project types
 */
export function getAllowedTargetTypes(sourceType: ProjectType): ProjectType[] {
  return PROJECT_TYPE_COMPATIBILITY[sourceType] || [];
}

/**
 * Check if a destination project type is compatible with a source project type.
 *
 * @param sourceType - The project type of the source project
 * @param destType - The project type of the destination project
 * @returns True if the copy is allowed
 */
export function isCompatibleProjectType(sourceType: ProjectType, destType: ProjectType): boolean {
  const allowed = getAllowedTargetTypes(sourceType);
  return allowed.includes(destType);
}

/**
 * Filter the list of target projects based on the source project type. Also excludes the source
 * project itself (VAL-010).
 *
 * @param sourceProjectId - The ID of the source project
 * @param sourceProjectType - The project type of the source project
 * @param allProjects - All available projects
 * @returns Filtered list of valid target projects
 */
export function filterCompatibleTargets(
  sourceProjectId: string,
  sourceProjectType: ProjectType,
  allProjects: CopyProjectOption[],
): CopyProjectOption[] {
  const allowedTypes = getAllowedTargetTypes(sourceProjectType);
  return allProjects.filter(
    (project) => project.id !== sourceProjectId && allowedTypes.includes(project.projectType),
  );
}

// ============================================================================
// Preselection Logic (BHV-304)
// ============================================================================

/**
 * Determine preselection for From and To dropdowns based on project type.
 *
 * BHV-T013: Auxiliary projects preselect baseProjectId as From, currentProjectId as To. BHV-T014:
 * Daughter projects preselect currentProjectId as To only. Other types: no preselection.
 *
 * @param input - The CopyBooks input state
 * @returns Object with preselected fromProjectId and toProjectId (null if not preselected)
 */
export function getPreselection(input: CopyBooksInput): {
  fromProjectId: string | null;
  toProjectId: string | null;
} {
  if (input.currentProjectType === 'Auxiliary' && input.baseProjectId) {
    return {
      fromProjectId: input.baseProjectId,
      toProjectId: input.currentProjectId,
    };
  }

  if (input.currentProjectType === 'Daughter') {
    return {
      fromProjectId: null,
      toProjectId: input.currentProjectId,
    };
  }

  return {
    fromProjectId: null,
    toProjectId: null,
  };
}

// ============================================================================
// Comparison Utilities
// ============================================================================

/**
 * Convert backend BookComparisonInfo to UI BookComparison format.
 *
 * @param info - Backend comparison info
 * @returns UI comparison object
 */
export function toBookComparison(info: BookComparisonInfo): BookComparison {
  const comparisonState = mapComparisonState(info.comparison, info.sourceExists, info.destExists);

  return {
    bookNum: info.bookNum,
    bookName: info.bookName,
    source: info.sourceExists
      ? {
          exists: true,
          modifiedDate: info.sourceModified,
          displayText: formatBookDisplay(info.bookName, info.sourceModified),
        }
      : null,
    dest: info.destExists
      ? {
          exists: true,
          modifiedDate: info.destModified,
          displayText: formatBookDisplay(info.bookName, info.destModified),
        }
      : null,
    comparisonState,
    isEnabled: info.sourceExists,
    defaultInclude: info.defaultSelected,
  };
}

/** Map backend comparison string to ComparisonState. */
function mapComparisonState(
  comparison: string,
  sourceExists: boolean,
  destExists: boolean,
): ComparisonState {
  if (!sourceExists && !destExists) return 'neither';
  if (sourceExists && !destExists) return 'source-only';
  if (!sourceExists && destExists) return 'dest-only';

  switch (comparison.toLowerCase()) {
    case 'sourcenewer':
    case 'source-newer':
    case 'source_newer':
      return 'source-newer';
    case 'destnewer':
    case 'dest-newer':
    case 'dest_newer':
      return 'dest-newer';
    case 'same':
    case 'equal':
      return 'same';
    default:
      return 'same';
  }
}

/**
 * Format a book name with its modification date for display.
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

/**
 * Initialize selected books map from comparison data using default selections.
 *
 * @param comparisons - Array of book comparisons
 * @returns Record mapping book numbers to selected state
 */
export function initializeSelectedBooks(comparisons: BookComparison[]): Record<number, boolean> {
  const selected: Record<number, boolean> = {};
  for (const comparison of comparisons) {
    if (comparison.isEnabled) {
      selected[comparison.bookNum] = comparison.defaultInclude;
    }
  }
  return selected;
}
