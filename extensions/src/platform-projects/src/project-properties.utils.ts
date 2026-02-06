/**
 * === NEW IN PT10 === Reason: React component utilities and localized string keys Maps to:
 * UI-PKG-001
 */

import { LocalizeKey } from 'platform-bible-utils';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  // Dialog
  '%webView_projectProperties_title_create%',
  '%webView_projectProperties_title_edit%',
  // Tabs
  '%webView_projectProperties_tab_general%',
  '%webView_projectProperties_tab_books%',
  '%webView_projectProperties_tab_associations%',
  '%webView_projectProperties_tab_notes%',
  '%webView_projectProperties_tab_advanced%',
  '%webView_projectProperties_tab_additions%',
  '%webView_projectProperties_tab_studyBible%',
  // General tab fields
  '%webView_projectProperties_field_fullName%',
  '%webView_projectProperties_field_shortName%',
  '%webView_projectProperties_field_projectType%',
  '%webView_projectProperties_field_language%',
  '%webView_projectProperties_field_versification%',
  '%webView_projectProperties_field_baseProject%',
  '%webView_projectProperties_field_editable%',
  '%webView_projectProperties_field_encodingConverter%',
  '%webView_projectProperties_field_reverseDirection%',
  '%webView_projectProperties_field_fileNamePattern%',
  // Buttons
  '%webView_projectProperties_button_editName%',
  '%webView_projectProperties_button_languageSettings%',
  '%webView_projectProperties_button_ok%',
  '%webView_projectProperties_button_cancel%',
  // Books tab
  '%webView_projectProperties_books_selectAll%',
  '%webView_projectProperties_books_deselectAll%',
  '%webView_projectProperties_books_oldTestament%',
  '%webView_projectProperties_books_newTestament%',
  '%webView_projectProperties_books_deuterocanon%',
  // Validation errors
  '%webView_projectProperties_error_shortNameRequired%',
  '%webView_projectProperties_error_shortNameLength%',
  '%webView_projectProperties_error_shortNameChars%',
  '%webView_projectProperties_error_shortNameExists%',
  '%webView_projectProperties_error_fullNameRequired%',
  '%webView_projectProperties_error_projectTypeRequired%',
  '%webView_projectProperties_error_languageRequired%',
  '%webView_projectProperties_error_versificationRequired%',
  '%webView_projectProperties_error_baseProjectRequired%',
  '%webView_projectProperties_error_encoderRequired%',
  '%webView_projectProperties_error_booksRequired%',
  // Placeholders
  '%webView_projectProperties_placeholder_selectProjectType%',
  '%webView_projectProperties_placeholder_selectLanguage%',
  '%webView_projectProperties_placeholder_selectVersification%',
  '%webView_projectProperties_placeholder_selectBaseProject%',
  '%webView_projectProperties_placeholder_selectEncoder%',
  // Tooltips for disabled features
  '%webView_projectProperties_tooltip_featureNotAvailable%',
  '%webView_projectProperties_tooltip_tabNotImplemented%',
  // Loading states
  '%webView_projectProperties_loading%',
  '%webView_projectProperties_saving%',
  // Aria labels
  '%webView_projectProperties_ariaLabel_fullNameInput%',
  '%webView_projectProperties_ariaLabel_shortNameInput%',
  '%webView_projectProperties_ariaLabel_projectTypeSelect%',
  '%webView_projectProperties_ariaLabel_languageSelect%',
  '%webView_projectProperties_ariaLabel_versificationSelect%',
  '%webView_projectProperties_ariaLabel_baseProjectSelect%',
  '%webView_projectProperties_ariaLabel_editableCheckbox%',
  '%webView_projectProperties_ariaLabel_bookCheckbox%',
];

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type ProjectType =
  | 'Standard'
  | 'BackTranslation'
  | 'Daughter'
  | 'Auxiliary'
  | 'StudyBibleAdditions'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'ConsultantNotes';

export const PROJECT_TYPES: ProjectType[] = [
  'Standard',
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
  'ConsultantNotes',
];

/** Type guard to check if a string is a valid ProjectType */
export function isProjectType(value: string): value is ProjectType {
  return PROJECT_TYPES.some((type) => type === value);
}

/**
 * Derived project types that require a base project INV-005: Derived types must have base project
 * name
 */
export const DERIVED_PROJECT_TYPES: ProjectType[] = [
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/** Check if a project type is derived (requires base project) */
export function isDerivedType(type: ProjectType | null): boolean {
  if (!type) return false;
  return DERIVED_PROJECT_TYPES.includes(type);
}

/** Check if a project type requires an encoder */
export function requiresEncoder(type: ProjectType | null): boolean {
  return type === 'TransliterationWithEncoder';
}

/** Check if a project type requires a language */
export function requiresLanguage(type: ProjectType | null): boolean {
  // All types require language except StudyBibleAdditions
  return type !== 'StudyBibleAdditions';
}

// ============================================================================
// VERSIFICATION TYPES
// ============================================================================

export type VersificationType =
  | 'English'
  | 'Septuagint'
  | 'Original'
  | 'Vulgate'
  | 'RussianOrthodox'
  | 'RussianProtestant';

export const VERSIFICATION_TYPES: VersificationType[] = [
  'English',
  'Septuagint',
  'Original',
  'Vulgate',
  'RussianOrthodox',
  'RussianProtestant',
];

/** Type guard to check if a string is a valid VersificationType */
export function isVersificationType(value: string): value is VersificationType {
  return VERSIFICATION_TYPES.some((vers) => vers === value);
}

// ============================================================================
// BOOK DATA
// ============================================================================

export interface BookInfo {
  id: string;
  name: string;
  number: number;
  testament: 'OT' | 'NT' | 'DC';
}

/** Standard book list with numbers */
export const CANON_BOOKS: BookInfo[] = [
  // Old Testament
  { id: 'GEN', name: 'Genesis', number: 1, testament: 'OT' },
  { id: 'EXO', name: 'Exodus', number: 2, testament: 'OT' },
  { id: 'LEV', name: 'Leviticus', number: 3, testament: 'OT' },
  { id: 'NUM', name: 'Numbers', number: 4, testament: 'OT' },
  { id: 'DEU', name: 'Deuteronomy', number: 5, testament: 'OT' },
  { id: 'JOS', name: 'Joshua', number: 6, testament: 'OT' },
  { id: 'JDG', name: 'Judges', number: 7, testament: 'OT' },
  { id: 'RUT', name: 'Ruth', number: 8, testament: 'OT' },
  { id: '1SA', name: '1 Samuel', number: 9, testament: 'OT' },
  { id: '2SA', name: '2 Samuel', number: 10, testament: 'OT' },
  { id: '1KI', name: '1 Kings', number: 11, testament: 'OT' },
  { id: '2KI', name: '2 Kings', number: 12, testament: 'OT' },
  { id: '1CH', name: '1 Chronicles', number: 13, testament: 'OT' },
  { id: '2CH', name: '2 Chronicles', number: 14, testament: 'OT' },
  { id: 'EZR', name: 'Ezra', number: 15, testament: 'OT' },
  { id: 'NEH', name: 'Nehemiah', number: 16, testament: 'OT' },
  { id: 'EST', name: 'Esther', number: 17, testament: 'OT' },
  { id: 'JOB', name: 'Job', number: 18, testament: 'OT' },
  { id: 'PSA', name: 'Psalms', number: 19, testament: 'OT' },
  { id: 'PRO', name: 'Proverbs', number: 20, testament: 'OT' },
  { id: 'ECC', name: 'Ecclesiastes', number: 21, testament: 'OT' },
  { id: 'SNG', name: 'Song of Songs', number: 22, testament: 'OT' },
  { id: 'ISA', name: 'Isaiah', number: 23, testament: 'OT' },
  { id: 'JER', name: 'Jeremiah', number: 24, testament: 'OT' },
  { id: 'LAM', name: 'Lamentations', number: 25, testament: 'OT' },
  { id: 'EZK', name: 'Ezekiel', number: 26, testament: 'OT' },
  { id: 'DAN', name: 'Daniel', number: 27, testament: 'OT' },
  { id: 'HOS', name: 'Hosea', number: 28, testament: 'OT' },
  { id: 'JOL', name: 'Joel', number: 29, testament: 'OT' },
  { id: 'AMO', name: 'Amos', number: 30, testament: 'OT' },
  { id: 'OBA', name: 'Obadiah', number: 31, testament: 'OT' },
  { id: 'JON', name: 'Jonah', number: 32, testament: 'OT' },
  { id: 'MIC', name: 'Micah', number: 33, testament: 'OT' },
  { id: 'NAM', name: 'Nahum', number: 34, testament: 'OT' },
  { id: 'HAB', name: 'Habakkuk', number: 35, testament: 'OT' },
  { id: 'ZEP', name: 'Zephaniah', number: 36, testament: 'OT' },
  { id: 'HAG', name: 'Haggai', number: 37, testament: 'OT' },
  { id: 'ZEC', name: 'Zechariah', number: 38, testament: 'OT' },
  { id: 'MAL', name: 'Malachi', number: 39, testament: 'OT' },
  // New Testament
  { id: 'MAT', name: 'Matthew', number: 40, testament: 'NT' },
  { id: 'MRK', name: 'Mark', number: 41, testament: 'NT' },
  { id: 'LUK', name: 'Luke', number: 42, testament: 'NT' },
  { id: 'JHN', name: 'John', number: 43, testament: 'NT' },
  { id: 'ACT', name: 'Acts', number: 44, testament: 'NT' },
  { id: 'ROM', name: 'Romans', number: 45, testament: 'NT' },
  { id: '1CO', name: '1 Corinthians', number: 46, testament: 'NT' },
  { id: '2CO', name: '2 Corinthians', number: 47, testament: 'NT' },
  { id: 'GAL', name: 'Galatians', number: 48, testament: 'NT' },
  { id: 'EPH', name: 'Ephesians', number: 49, testament: 'NT' },
  { id: 'PHP', name: 'Philippians', number: 50, testament: 'NT' },
  { id: 'COL', name: 'Colossians', number: 51, testament: 'NT' },
  { id: '1TH', name: '1 Thessalonians', number: 52, testament: 'NT' },
  { id: '2TH', name: '2 Thessalonians', number: 53, testament: 'NT' },
  { id: '1TI', name: '1 Timothy', number: 54, testament: 'NT' },
  { id: '2TI', name: '2 Timothy', number: 55, testament: 'NT' },
  { id: 'TIT', name: 'Titus', number: 56, testament: 'NT' },
  { id: 'PHM', name: 'Philemon', number: 57, testament: 'NT' },
  { id: 'HEB', name: 'Hebrews', number: 58, testament: 'NT' },
  { id: 'JAS', name: 'James', number: 59, testament: 'NT' },
  { id: '1PE', name: '1 Peter', number: 60, testament: 'NT' },
  { id: '2PE', name: '2 Peter', number: 61, testament: 'NT' },
  { id: '1JN', name: '1 John', number: 62, testament: 'NT' },
  { id: '2JN', name: '2 John', number: 63, testament: 'NT' },
  { id: '3JN', name: '3 John', number: 64, testament: 'NT' },
  { id: 'JUD', name: 'Jude', number: 65, testament: 'NT' },
  { id: 'REV', name: 'Revelation', number: 66, testament: 'NT' },
];

export const OT_BOOKS = CANON_BOOKS.filter((b) => b.testament === 'OT');
export const NT_BOOKS = CANON_BOOKS.filter((b) => b.testament === 'NT');

// ============================================================================
// VALIDATION
// ============================================================================

/** Validates a project short name VAL-001: 3-8 chars, A-Z/0-9/_ only */
export function validateShortName(shortName: string): { isValid: boolean; error?: string } {
  if (!shortName || shortName.trim().length === 0) {
    return { isValid: false, error: 'Project name must be specified' };
  }

  if (shortName.length < 3 || shortName.length > 8) {
    return {
      isValid: false,
      error: 'Short name must not be less than 3 or more than 8 characters in length',
    };
  }

  if (!/^[A-Za-z0-9_]+$/.test(shortName)) {
    return {
      isValid: false,
      error: 'Short name can only contain letters A-Z, digits 0-9, and underscores.',
    };
  }

  if (/\s/.test(shortName)) {
    return { isValid: false, error: 'Short name must not contain spaces' };
  }

  return { isValid: true };
}

/** Validates full name VAL-002: required */
export function validateFullName(fullName: string): { isValid: boolean; error?: string } {
  if (!fullName || fullName.trim().length === 0) {
    return { isValid: false, error: 'You must enter a full name' };
  }
  return { isValid: true };
}
