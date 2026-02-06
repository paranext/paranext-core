/**
 * Utility types, constants, and reducer for the Project Properties form. Extracted to keep the web
 * view file focused on rendering.
 */

import { LocalizeKey } from 'platform-bible-utils';

// ============================================================================
// TYPES
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

export type VersificationType =
  | 'English'
  | 'Septuagint'
  | 'Original'
  | 'Vulgate'
  | 'RussianOrthodox'
  | 'RussianProtestant';

export type NormalizationType = 'Undefined' | 'NFD' | 'NFC';

export interface ProjectTypeOption {
  type: ProjectType;
  displayName: string;
  isDerived: boolean;
  requiresEncoder: boolean;
}

export interface LanguageOption {
  id: string;
  name: string;
  isRightToLeft: boolean;
  script?: string;
}

export interface VersificationOption {
  type: VersificationType;
  displayName: string;
}

export interface ProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  projectType: ProjectType;
}

export interface EncoderOption {
  name: string;
  displayName: string;
  isBidirectional: boolean;
}

// ============================================================================
// FORM STATE
// ============================================================================

export interface ProjectPropertiesFormState {
  fullName: string;
  shortName: string;
  projectType: ProjectType | undefined;
  languageId: string | undefined;
  versification: VersificationType | undefined;
  baseProjectGuid: string | undefined;
  editable: boolean;
  encoderName: string | undefined;
  encoderReverseDirection: boolean;
  selectedBooks: string[];
  fileNameForm: string;
  normalization: NormalizationType;
  activeTab: string;
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
  tabsWithErrors: string[];
  showBaseProject: boolean;
  showEncoderFields: boolean;
  showStudyBibleTab: boolean;
  languageRequired: boolean;
  baseProjectRequired: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const DERIVED_PROJECT_TYPES: ProjectType[] = [
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

export function isDerivedType(type: ProjectType | undefined): boolean {
  if (!type) return false;
  return DERIVED_PROJECT_TYPES.includes(type);
}

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  {
    type: 'Standard',
    displayName: 'Standard Translation',
    isDerived: false,
    requiresEncoder: false,
  },
  {
    type: 'BackTranslation',
    displayName: 'Back Translation',
    isDerived: true,
    requiresEncoder: false,
  },
  { type: 'Daughter', displayName: 'Daughter', isDerived: true, requiresEncoder: false },
  { type: 'Auxiliary', displayName: 'Auxiliary', isDerived: true, requiresEncoder: false },
  {
    type: 'StudyBibleAdditions',
    displayName: 'Study Bible Additions',
    isDerived: true,
    requiresEncoder: false,
  },
  {
    type: 'TransliterationManual',
    displayName: 'Transliteration (Manual)',
    isDerived: true,
    requiresEncoder: false,
  },
  {
    type: 'TransliterationWithEncoder',
    displayName: 'Transliteration (With Encoder)',
    isDerived: true,
    requiresEncoder: true,
  },
  {
    type: 'ConsultantNotes',
    displayName: 'Consultant Notes',
    isDerived: false,
    requiresEncoder: false,
  },
];

export const VERSIFICATION_OPTIONS: VersificationOption[] = [
  { type: 'English', displayName: 'English' },
  { type: 'Septuagint', displayName: 'Septuagint' },
  { type: 'Original', displayName: 'Original' },
  { type: 'Vulgate', displayName: 'Vulgate' },
  { type: 'RussianOrthodox', displayName: 'Russian Orthodox' },
  { type: 'RussianProtestant', displayName: 'Russian Protestant' },
];

export const NORMALIZATION_OPTIONS: { value: NormalizationType; label: string }[] = [
  { value: 'Undefined', label: 'Undefined' },
  { value: 'NFD', label: 'NFD' },
  { value: 'NFC', label: 'NFC' },
];

/** Short name validation: 3-8 chars, A-Z, 0-9, _ only */
export const SHORT_NAME_PATTERN = /^[A-Za-z0-9_]+$/;

/** All 66 canonical books plus deuterocanonical. Using standard three-letter abbreviations. */
export const OT_BOOKS = [
  'GEN',
  'EXO',
  'LEV',
  'NUM',
  'DEU',
  'JOS',
  'JDG',
  'RUT',
  '1SA',
  '2SA',
  '1KI',
  '2KI',
  '1CH',
  '2CH',
  'EZR',
  'NEH',
  'EST',
  'JOB',
  'PSA',
  'PRO',
  'ECC',
  'SNG',
  'ISA',
  'JER',
  'LAM',
  'EZK',
  'DAN',
  'HOS',
  'JOL',
  'AMO',
  'OBA',
  'JON',
  'MIC',
  'NAM',
  'HAB',
  'ZEP',
  'HAG',
  'ZEC',
  'MAL',
];

export const NT_BOOKS = [
  'MAT',
  'MRK',
  'LUK',
  'JHN',
  'ACT',
  'ROM',
  '1CO',
  '2CO',
  'GAL',
  'EPH',
  'PHP',
  'COL',
  '1TH',
  '2TH',
  '1TI',
  '2TI',
  'TIT',
  'PHM',
  'HEB',
  'JAS',
  '1PE',
  '2PE',
  '1JN',
  '2JN',
  '3JN',
  'JUD',
  'REV',
];

export const DC_BOOKS = [
  'TOB',
  'JDT',
  'ESG',
  'WIS',
  'SIR',
  'BAR',
  'LJE',
  'S3Y',
  'SUS',
  'BEL',
  '1MA',
  '2MA',
  '1ES',
  'MAN',
  'PS2',
  '3MA',
  '4MA',
];

export const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS];

// ============================================================================
// TAB CONSTANTS
// ============================================================================

export const TAB_GENERAL = 'general';
export const TAB_BOOKS = 'books';
export const TAB_ASSOCIATIONS = 'associations';
export const TAB_NOTES = 'notes';
export const TAB_ADVANCED = 'advanced';
export const TAB_ADDITIONS = 'additions';
export const TAB_STUDY_BIBLE = 'studyBible';

// ============================================================================
// ACTIONS
// ============================================================================

export type FormAction =
  | { type: 'SET_FIELD'; field: string; value: unknown }
  | { type: 'SET_PROJECT_TYPE'; projectType: ProjectType }
  | { type: 'SET_BASE_PROJECT'; baseProjectGuid: string | undefined }
  | { type: 'SET_BOOKS'; selectedBooks: string[] }
  | { type: 'SET_ACTIVE_TAB'; tab: string }
  | { type: 'SET_VALIDATION_ERRORS'; errors: Record<string, string>; tabsWithErrors: string[] }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

// ============================================================================
// INITIAL STATE
// ============================================================================

export function createInitialState(): ProjectPropertiesFormState {
  return {
    fullName: '',
    shortName: '',
    projectType: 'Standard',
    languageId: undefined,
    versification: 'English',
    baseProjectGuid: undefined,
    editable: true,
    encoderName: undefined,
    encoderReverseDirection: false,
    selectedBooks: [...ALL_BOOKS],
    fileNameForm: '41MAT{project}.SFM',
    normalization: 'NFC',
    activeTab: TAB_GENERAL,
    isDirty: false,
    isSubmitting: false,
    validationErrors: {},
    tabsWithErrors: [],
    showBaseProject: false,
    showEncoderFields: false,
    showStudyBibleTab: false,
    languageRequired: true,
    baseProjectRequired: false,
  };
}

// ============================================================================
// REDUCER
// ============================================================================

export function formReducer(
  state: ProjectPropertiesFormState,
  action: FormAction,
): ProjectPropertiesFormState {
  switch (action.type) {
    case 'SET_FIELD': {
      return {
        ...state,
        [action.field]: action.value,
        isDirty: true,
      };
    }

    case 'SET_PROJECT_TYPE': {
      const { projectType } = action;
      const derived = isDerivedType(projectType);
      return {
        ...state,
        projectType,
        showBaseProject: derived,
        showEncoderFields: projectType === 'TransliterationWithEncoder',
        showStudyBibleTab: false,
        languageRequired: projectType !== 'StudyBibleAdditions',
        baseProjectRequired: derived,
        editable: projectType !== 'TransliterationWithEncoder',
        baseProjectGuid: undefined,
        encoderName: projectType === 'TransliterationWithEncoder' ? state.encoderName : undefined,
        encoderReverseDirection:
          projectType === 'TransliterationWithEncoder' ? state.encoderReverseDirection : false,
        isDirty: true,
      };
    }

    case 'SET_BASE_PROJECT': {
      return {
        ...state,
        baseProjectGuid: action.baseProjectGuid,
        isDirty: true,
      };
    }

    case 'SET_BOOKS': {
      return {
        ...state,
        selectedBooks: action.selectedBooks,
        isDirty: true,
      };
    }

    case 'SET_ACTIVE_TAB': {
      return {
        ...state,
        activeTab: action.tab,
      };
    }

    case 'SET_VALIDATION_ERRORS': {
      return {
        ...state,
        validationErrors: action.errors,
        tabsWithErrors: action.tabsWithErrors,
      };
    }

    case 'SET_SUBMITTING': {
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    }

    case 'RESET': {
      return createInitialState();
    }

    default:
      return state;
  }
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationResult {
  errors: Record<string, string>;
  tabsWithErrors: string[];
}

export function validateForm(state: ProjectPropertiesFormState): ValidationResult {
  const errors: Record<string, string> = {};
  const errorTabs = new Set<string>();

  // VAL-002: Full name required
  if (!state.fullName || state.fullName.trim().length === 0) {
    errors.fullName = 'You must enter a full name';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-001: Short name validation
  if (!state.shortName || state.shortName.trim().length === 0) {
    errors.shortName = 'Project name must be specified';
    errorTabs.add(TAB_GENERAL);
  } else if (state.shortName.length < 3 || state.shortName.length > 8) {
    errors.shortName = 'Short name must not be less than 3 or more than 8 characters in length';
    errorTabs.add(TAB_GENERAL);
  } else if (!SHORT_NAME_PATTERN.test(state.shortName)) {
    errors.shortName = 'Short name can only contain letters A-Z, digits 0-9, and underscores.';
    errorTabs.add(TAB_GENERAL);
  } else if (/\s/.test(state.shortName)) {
    errors.shortName = 'Short name must not contain spaces';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-003: Project type required
  if (!state.projectType) {
    errors.projectType = 'Project type must be selected';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-004: Versification required
  if (!state.versification) {
    errors.versification = 'Versification must be selected';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-005: Language required (conditional)
  if (state.languageRequired && !state.languageId) {
    errors.languageId = 'Language must be selected';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-007: Base project required for derived types
  if (state.baseProjectRequired && !state.baseProjectGuid) {
    errors.baseProjectGuid = 'No base project specified';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-008: Encoder required for TransliterationWithEncoder
  if (state.projectType === 'TransliterationWithEncoder' && !state.encoderName) {
    errors.encoderName = 'Encoding converter must be selected';
    errorTabs.add(TAB_GENERAL);
  }

  // VAL-009: At least one book selected
  if (state.selectedBooks.length === 0) {
    errors.selectedBooks = 'Specify all the books which will be in this project';
    errorTabs.add(TAB_BOOKS);
  }

  // VAL-006: File name pattern
  if (!state.fileNameForm || state.fileNameForm.trim().length === 0) {
    errors.fileNameForm = 'File naming convention must be specified';
    errorTabs.add(TAB_ADVANCED);
  } else if (state.fileNameForm.toLowerCase().endsWith('.ptx')) {
    errors.fileNameForm = 'File naming convention cannot end with .ptx';
    errorTabs.add(TAB_ADVANCED);
  }

  return {
    errors,
    tabsWithErrors: Array.from(errorTabs),
  };
}

export function validateShortName(value: string): string | undefined {
  if (!value || value.trim().length === 0) {
    return undefined; // Don't show error for empty on-change
  }
  if (value.length < 3 || value.length > 8) {
    return 'Short name must not be less than 3 or more than 8 characters in length';
  }
  if (!SHORT_NAME_PATTERN.test(value)) {
    return 'Short name can only contain letters A-Z, digits 0-9, and underscores.';
  }
  if (/\s/.test(value)) {
    return 'Short name must not contain spaces';
  }
  return undefined;
}

// ============================================================================
// SHORT NAME AUTO-GENERATION (BHV-601)
// ============================================================================

/**
 * Generate short name from full name (FormTextNameAbbrev algorithm). PT9 Source:
 * ProjectNameForm.cs:80-126
 *
 * @param fullName - The full project name
 * @returns Auto-generated short name (max 8 characters)
 */
export function generateShortName(fullName: string): string {
  // 1. Replace backslashes with forward slashes (BHV-306)
  const normalized = fullName.replace(/\\/g, '/');

  // 2. Split into words (by spaces, hyphens, underscores)
  const words = normalized.split(/[\s\-_]+/).filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  if (words.length === 1) {
    // Single word: take first 8 characters, uppercase
    return words[0].substring(0, 8).toUpperCase();
  }

  // Multiple words: take first letter of each word (max 8 chars)
  let result = words.reduce((acc, word) => {
    if (acc.length >= 8) return acc;
    const firstChar = word[0];
    if (/[A-Za-z0-9]/.test(firstChar)) {
      return acc + firstChar.toUpperCase();
    }
    return acc;
  }, '');

  // 3. Ensure minimum 3 characters by padding from first word
  if (result.length < 3 && words.length > 0) {
    const firstWord = words[0].toUpperCase();
    result = firstWord.substring(0, Math.max(3, result.length));
  }

  // 4. Ensure only valid characters
  result = result.replace(/[^A-Za-z0-9_]/g, '');

  // 5. Ensure max 8 characters
  return result.substring(0, 8);
}

// ============================================================================
// PROJECT CREATE REQUEST
// ============================================================================

export interface ProjectCreateRequest {
  shortName: string;
  fullName: string;
  projectType: ProjectType;
  languageId: string | undefined;
  versification: VersificationType;
  baseProjectGuid: string | undefined;
  editable: boolean;
  encoderName: string | undefined;
  encoderReverseDirection: boolean;
  booksPresent: string[];
  fileNameForm: string;
  normalization: NormalizationType;
}

/** Build a ProjectCreateRequest from the current form state. Assumes validation has already passed. */
export function buildCreateRequest(state: ProjectPropertiesFormState): ProjectCreateRequest {
  return {
    shortName: state.shortName,
    fullName: state.fullName,
    projectType: state.projectType ?? 'Standard',
    languageId: state.languageId,
    versification: state.versification ?? 'English',
    baseProjectGuid: state.baseProjectGuid,
    editable: state.editable,
    encoderName: state.encoderName,
    encoderReverseDirection: state.encoderReverseDirection,
    booksPresent: state.selectedBooks,
    fileNameForm: state.fileNameForm,
    normalization: state.normalization,
  };
}

// ============================================================================
// LOCALIZED STRINGS
// ============================================================================

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_projectProperties_title_create%',
  '%webView_projectProperties_title_edit%',
  '%webView_projectProperties_tab_general%',
  '%webView_projectProperties_tab_books%',
  '%webView_projectProperties_tab_associations%',
  '%webView_projectProperties_tab_notes%',
  '%webView_projectProperties_tab_advanced%',
  '%webView_projectProperties_tab_additions%',
  '%webView_projectProperties_tab_studyBible%',
  '%webView_projectProperties_field_fullName%',
  '%webView_projectProperties_field_shortName%',
  '%webView_projectProperties_field_projectType%',
  '%webView_projectProperties_field_language%',
  '%webView_projectProperties_field_versification%',
  '%webView_projectProperties_field_baseProject%',
  '%webView_projectProperties_field_editable%',
  '%webView_projectProperties_field_encoder%',
  '%webView_projectProperties_field_reverseDirection%',
  '%webView_projectProperties_field_fileNamePattern%',
  '%webView_projectProperties_field_normalization%',
  '%webView_projectProperties_button_ok%',
  '%webView_projectProperties_button_cancel%',
  '%webView_projectProperties_button_editName%',
  '%webView_projectProperties_button_languageSettings%',
  '%webView_projectProperties_button_selectAll%',
  '%webView_projectProperties_button_deselectAll%',
  '%webView_projectProperties_error_incompleteTabs%',
  '%webView_projectProperties_section_ot%',
  '%webView_projectProperties_section_nt%',
  '%webView_projectProperties_section_dc%',
  '%webView_projectProperties_placeholder_selectLanguage%',
  '%webView_projectProperties_placeholder_selectBaseProject%',
  '%webView_projectProperties_placeholder_selectEncoder%',
  '%webView_projectProperties_tooltip_notImplemented%',
];
