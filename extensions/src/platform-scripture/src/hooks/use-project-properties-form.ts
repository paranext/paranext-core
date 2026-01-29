/**
 * Custom hook for Project Properties form state management Uses useReducer for complex form state
 * with 7 tabs
 */

import { useReducer, useCallback, useMemo } from 'react';
import type {
  ProjectPropertiesInput,
  ProjectPropertiesFormState,
  ProjectPropertiesOutput,
  ProjectData,
  CommentTag,
  StudyBibleCategory,
  ProjectPropertiesOptions,
} from '../types/project-properties.types';
import {
  isDerivedProjectType,
  showsEncodingConverter,
  showsStudyBibleTabs,
  TAB_INDICES,
  validateShortName,
} from '../types/project-properties.types';
import { needsOwnRegistration } from './use-registration-status';
import type { ProjectType } from './use-registration-status';

// =============================================================================
// ACTION TYPES
// =============================================================================

type FormAction =
  // Tab navigation
  | { type: 'SET_ACTIVE_TAB'; payload: number }
  // General tab
  | { type: 'SET_FULL_NAME'; payload: string }
  | { type: 'SET_SHORT_NAME'; payload: string }
  | { type: 'SET_COPYRIGHT'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string | undefined }
  | { type: 'SET_VERSIFICATION'; payload: string | undefined }
  | { type: 'SET_PROJECT_TYPE'; payload: string | undefined }
  | { type: 'SET_BASE_PROJECT'; payload: string | undefined }
  | { type: 'SET_BIBLICAL_TERMS_LIST'; payload: string }
  | { type: 'SET_MATCH_BASED_ON_STEMS'; payload: boolean }
  | { type: 'SET_ENCODING_CONVERTER'; payload: string | undefined }
  | { type: 'SET_ENCODER_REVERSE_DIRECTION'; payload: boolean }
  // Books tab
  | { type: 'SET_SELECTED_BOOKS'; payload: string[] }
  | { type: 'TOGGLE_BOOK'; payload: string }
  // Associations tab
  | { type: 'SET_ASSOCIATED_LEXICAL_PROJECT'; payload: string | undefined }
  | { type: 'SET_FLEX_USAGE'; payload: string | undefined }
  // Notes tab
  | { type: 'SET_COMMENT_TAGS'; payload: CommentTag[] }
  | { type: 'ADD_COMMENT_TAG'; payload: CommentTag }
  | { type: 'UPDATE_COMMENT_TAG'; payload: { index: number; tag: CommentTag } }
  | { type: 'REMOVE_COMMENT_TAG'; payload: number }
  // Advanced tab
  | { type: 'SET_FILE_NAME_PATTERN'; payload: string }
  | { type: 'SET_USFM_VERSION'; payload: string }
  | { type: 'SET_NORMALIZATION'; payload: string }
  | { type: 'SET_SIL_ENCODING'; payload: string | undefined }
  | { type: 'SET_EDITABLE'; payload: boolean }
  | { type: 'SET_ALLOW_WHITESPACE'; payload: boolean }
  | { type: 'SET_SHARING_PERMISSION'; payload: boolean }
  | { type: 'SET_SHARE_WITH_SLDR'; payload: boolean }
  | { type: 'SET_ALLOW_DERIVED_REGISTRATION'; payload: boolean }
  // Study Bible tab
  | { type: 'SET_STUDY_BIBLE_CATEGORIES'; payload: StudyBibleCategory[] }
  | { type: 'ADD_STUDY_BIBLE_CATEGORY'; payload: StudyBibleCategory }
  | {
      type: 'UPDATE_STUDY_BIBLE_CATEGORY';
      payload: { index: number; category: StudyBibleCategory };
    }
  | { type: 'REMOVE_STUDY_BIBLE_CATEGORY'; payload: number }
  | { type: 'SET_ALLOW_HIDING_BASE_NOTES'; payload: boolean }
  | { type: 'SET_PLACE_CALLERS_ON_LEFT'; payload: boolean }
  // Form state
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_VALIDATION_ERRORS'; payload: Record<string, string> }
  | { type: 'CLEAR_VALIDATION_ERROR'; payload: string }
  | { type: 'RESET_FORM'; payload: ProjectPropertiesFormState };

// =============================================================================
// INITIAL STATE FACTORY
// =============================================================================

/** Create initial form state from input */
function createInitialState(input: ProjectPropertiesInput): ProjectPropertiesFormState {
  const { mode, existingProject, interlinearContext } = input;

  // Default values for create mode
  let initialState: ProjectPropertiesFormState = {
    activeTab: TAB_INDICES.GENERAL,
    fullName: '',
    shortName: '',
    copyright: '',
    selectedLanguageId: input.options.languages[0]?.id,
    selectedVersification: 'English',
    selectedProjectType: 'Standard',
    selectedBaseProject: undefined,
    biblicalTermsListInfo: '',
    matchBasedOnStems: false,
    encodingConverter: undefined,
    encoderReverseDirection: false,
    selectedBooks: [],
    associatedLexicalProject: undefined,
    flexUsage: undefined,
    commentTags: [],
    fileNamePattern: '',
    usfmVersion: '3',
    normalization: 'NFC',
    silEncoding: undefined,
    editable: true,
    allowWhitespaceAndInvisible: false,
    sharingPermission: false,
    shareWithSldr: false,
    allowDerivedProjectRegistration: true,
    studyBibleCategories: [],
    allowHidingBaseNotes: false,
    placeCallersOnLeft: false,
    isDirty: false,
    isSubmitting: false,
    validationErrors: {},
    tabsWithErrors: [],
    // Computed state
    isDerivedType: false,
    requiresOwnRegistration: true,
    isVersificationLocked: false,
    isBasedOnLocked: false,
    showEncodingConverter: false,
    showAdditionsTab: false,
    showStudyBibleTab: false,
  };

  // Populate from existing project in edit mode
  if (mode === 'edit' && existingProject) {
    initialState = {
      ...initialState,
      fullName: existingProject.fullName,
      shortName: existingProject.shortName,
      copyright: existingProject.copyright,
      selectedLanguageId: existingProject.languageId,
      selectedVersification: existingProject.versification,
      selectedProjectType: existingProject.projectType,
      selectedBaseProject: existingProject.baseProjectGuid,
      biblicalTermsListInfo: existingProject.biblicalTermsListInfo ?? '',
      matchBasedOnStems: existingProject.matchBasedOnStems,
      selectedBooks: existingProject.booksPresentSet,
      associatedLexicalProject: existingProject.associatedLexicalProject,
      flexUsage: existingProject.flexIntegration,
      commentTags: existingProject.commentTags,
      fileNamePattern: existingProject.fileNameForm,
      usfmVersion: existingProject.usfmVersion,
      normalization: existingProject.normalizationForm,
      editable: existingProject.editable,
      allowWhitespaceAndInvisible: existingProject.allowInvisibleChars,
      sharingPermission: existingProject.allowReadAccess,
      shareWithSldr: existingProject.allowSharingWithSLDR,
      allowDerivedProjectRegistration: existingProject.allowDerivedProjectRegistration,
      studyBibleCategories: existingProject.studyBibleCategories ?? [],
      allowHidingBaseNotes: existingProject.allowHidingOfBaseFootnotes ?? false,
      placeCallersOnLeft: existingProject.placeCallerToLeftOfSelection ?? false,
    };
  }

  // Apply interlinear context overrides
  if (interlinearContext) {
    initialState = {
      ...initialState,
      selectedProjectType: interlinearContext.presetProjectType,
      selectedBaseProject: interlinearContext.sourceProjectGuid,
      isBasedOnLocked: interlinearContext.lockBasedOn,
    };
  }

  // Compute derived state
  return computeDerivedState(initialState);
}

/** Compute derived state fields based on project type */
/** Valid project types for type guarding */
const VALID_PROJECT_TYPES_LIST: readonly string[] = [
  'Standard',
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
  'ConsultantNotes',
];

/** Type guard for checking if a string is a valid ProjectType */
function isProjectType(value: string | undefined): value is ProjectType {
  return value !== undefined && VALID_PROJECT_TYPES_LIST.includes(value);
}

function computeDerivedState(state: ProjectPropertiesFormState): ProjectPropertiesFormState {
  const projectType = state.selectedProjectType;
  // Convert to ProjectType | null for registration check (needsOwnRegistration expects null)
  /* eslint-disable no-null/no-null */
  const projectTypeForRegistration: ProjectType | null =
    projectType && isProjectType(projectType) ? projectType : null;
  /* eslint-enable no-null/no-null */

  return {
    ...state,
    isDerivedType: isDerivedProjectType(projectType),
    requiresOwnRegistration: needsOwnRegistration(projectTypeForRegistration),
    isVersificationLocked: isDerivedProjectType(projectType),
    showEncodingConverter: showsEncodingConverter(projectType),
    showAdditionsTab: showsStudyBibleTabs(projectType),
    showStudyBibleTab: showsStudyBibleTabs(projectType),
  };
}

/** Compute which tabs have errors */
function computeTabsWithErrors(errors: Record<string, string>): number[] {
  const tabsWithErrors: Set<number> = new Set();

  // Map field names to tab indices
  const fieldToTab: Record<string, number> = {
    fullName: TAB_INDICES.GENERAL,
    shortName: TAB_INDICES.GENERAL,
    copyright: TAB_INDICES.GENERAL,
    selectedLanguageId: TAB_INDICES.GENERAL,
    selectedVersification: TAB_INDICES.GENERAL,
    selectedProjectType: TAB_INDICES.GENERAL,
    selectedBaseProject: TAB_INDICES.GENERAL,
    encodingConverter: TAB_INDICES.GENERAL,
    selectedBooks: TAB_INDICES.BOOKS,
    associatedLexicalProject: TAB_INDICES.ASSOCIATIONS,
    flexUsage: TAB_INDICES.ASSOCIATIONS,
    commentTags: TAB_INDICES.NOTES,
    fileNamePattern: TAB_INDICES.ADVANCED,
    usfmVersion: TAB_INDICES.ADVANCED,
    normalization: TAB_INDICES.ADVANCED,
    studyBibleCategories: TAB_INDICES.STUDY_BIBLE,
  };

  Object.keys(errors).forEach((field) => {
    const tabIndex = fieldToTab[field];
    if (tabIndex !== undefined) {
      tabsWithErrors.add(tabIndex);
    }
  });

  return Array.from(tabsWithErrors).sort((a, b) => a - b);
}

// =============================================================================
// REDUCER
// =============================================================================

function formReducer(
  state: ProjectPropertiesFormState,
  action: FormAction,
): ProjectPropertiesFormState {
  let newState: ProjectPropertiesFormState;

  switch (action.type) {
    // Tab navigation
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    // General tab
    case 'SET_FULL_NAME':
      return { ...state, fullName: action.payload, isDirty: true };

    case 'SET_SHORT_NAME':
      return { ...state, shortName: action.payload, isDirty: true };

    case 'SET_COPYRIGHT':
      return { ...state, copyright: action.payload, isDirty: true };

    case 'SET_LANGUAGE':
      return { ...state, selectedLanguageId: action.payload, isDirty: true };

    case 'SET_VERSIFICATION':
      return { ...state, selectedVersification: action.payload, isDirty: true };

    case 'SET_PROJECT_TYPE':
      newState = { ...state, selectedProjectType: action.payload, isDirty: true };
      // Clear base project if switching to non-derived type
      if (!isDerivedProjectType(action.payload)) {
        newState.selectedBaseProject = undefined;
      }
      return computeDerivedState(newState);

    case 'SET_BASE_PROJECT':
      return { ...state, selectedBaseProject: action.payload, isDirty: true };

    case 'SET_BIBLICAL_TERMS_LIST':
      return { ...state, biblicalTermsListInfo: action.payload, isDirty: true };

    case 'SET_MATCH_BASED_ON_STEMS':
      return { ...state, matchBasedOnStems: action.payload, isDirty: true };

    case 'SET_ENCODING_CONVERTER':
      return { ...state, encodingConverter: action.payload, isDirty: true };

    case 'SET_ENCODER_REVERSE_DIRECTION':
      return { ...state, encoderReverseDirection: action.payload, isDirty: true };

    // Books tab
    case 'SET_SELECTED_BOOKS':
      return { ...state, selectedBooks: action.payload, isDirty: true };

    case 'TOGGLE_BOOK': {
      const book = action.payload;
      const selectedBooks = state.selectedBooks.includes(book)
        ? state.selectedBooks.filter((b) => b !== book)
        : [...state.selectedBooks, book];
      return { ...state, selectedBooks, isDirty: true };
    }

    // Associations tab
    case 'SET_ASSOCIATED_LEXICAL_PROJECT':
      return { ...state, associatedLexicalProject: action.payload, isDirty: true };

    case 'SET_FLEX_USAGE':
      return { ...state, flexUsage: action.payload, isDirty: true };

    // Notes tab
    case 'SET_COMMENT_TAGS':
      return { ...state, commentTags: action.payload, isDirty: true };

    case 'ADD_COMMENT_TAG':
      return { ...state, commentTags: [...state.commentTags, action.payload], isDirty: true };

    case 'UPDATE_COMMENT_TAG': {
      const { index, tag } = action.payload;
      const commentTags = [...state.commentTags];
      commentTags[index] = tag;
      return { ...state, commentTags, isDirty: true };
    }

    case 'REMOVE_COMMENT_TAG':
      return {
        ...state,
        commentTags: state.commentTags.filter((_, i) => i !== action.payload),
        isDirty: true,
      };

    // Advanced tab
    case 'SET_FILE_NAME_PATTERN':
      return { ...state, fileNamePattern: action.payload, isDirty: true };

    case 'SET_USFM_VERSION':
      return { ...state, usfmVersion: action.payload, isDirty: true };

    case 'SET_NORMALIZATION':
      return { ...state, normalization: action.payload, isDirty: true };

    case 'SET_SIL_ENCODING':
      return { ...state, silEncoding: action.payload, isDirty: true };

    case 'SET_EDITABLE':
      return { ...state, editable: action.payload, isDirty: true };

    case 'SET_ALLOW_WHITESPACE':
      return { ...state, allowWhitespaceAndInvisible: action.payload, isDirty: true };

    case 'SET_SHARING_PERMISSION':
      return { ...state, sharingPermission: action.payload, isDirty: true };

    case 'SET_SHARE_WITH_SLDR':
      return { ...state, shareWithSldr: action.payload, isDirty: true };

    case 'SET_ALLOW_DERIVED_REGISTRATION':
      return { ...state, allowDerivedProjectRegistration: action.payload, isDirty: true };

    // Study Bible tab
    case 'SET_STUDY_BIBLE_CATEGORIES':
      return { ...state, studyBibleCategories: action.payload, isDirty: true };

    case 'ADD_STUDY_BIBLE_CATEGORY':
      return {
        ...state,
        studyBibleCategories: [...state.studyBibleCategories, action.payload],
        isDirty: true,
      };

    case 'UPDATE_STUDY_BIBLE_CATEGORY': {
      const { index, category } = action.payload;
      const studyBibleCategories = [...state.studyBibleCategories];
      studyBibleCategories[index] = category;
      return { ...state, studyBibleCategories, isDirty: true };
    }

    case 'REMOVE_STUDY_BIBLE_CATEGORY':
      return {
        ...state,
        studyBibleCategories: state.studyBibleCategories.filter((_, i) => i !== action.payload),
        isDirty: true,
      };

    case 'SET_ALLOW_HIDING_BASE_NOTES':
      return { ...state, allowHidingBaseNotes: action.payload, isDirty: true };

    case 'SET_PLACE_CALLERS_ON_LEFT':
      return { ...state, placeCallersOnLeft: action.payload, isDirty: true };

    // Form state
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: action.payload,
        tabsWithErrors: computeTabsWithErrors(action.payload),
      };

    case 'CLEAR_VALIDATION_ERROR': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: removedError, ...remainingErrors } = state.validationErrors;
      return {
        ...state,
        validationErrors: remainingErrors,
        tabsWithErrors: computeTabsWithErrors(remainingErrors),
      };
    }

    case 'RESET_FORM':
      return action.payload;

    default:
      return state;
  }
}

// =============================================================================
// HOOK INTERFACE
// =============================================================================

export interface UseProjectPropertiesFormReturn {
  // State
  state: ProjectPropertiesFormState;
  options: ProjectPropertiesOptions;
  mode: 'create' | 'edit';

  // Tab navigation
  setActiveTab: (tab: number) => void;

  // General tab handlers
  setFullName: (value: string) => void;
  setShortName: (value: string) => void;
  setCopyright: (value: string) => void;
  setLanguage: (value: string | undefined) => void;
  setVersification: (value: string | undefined) => void;
  setProjectType: (value: string | undefined) => void;
  setBaseProject: (value: string | undefined) => void;
  setBiblicalTermsList: (value: string) => void;
  setMatchBasedOnStems: (value: boolean) => void;
  setEncodingConverter: (value: string | undefined) => void;
  setEncoderReverseDirection: (value: boolean) => void;

  // Books tab handlers
  setSelectedBooks: (books: string[]) => void;
  toggleBook: (book: string) => void;

  // Associations tab handlers
  setAssociatedLexicalProject: (value: string | undefined) => void;
  setFlexUsage: (value: string | undefined) => void;

  // Notes tab handlers
  setCommentTags: (tags: CommentTag[]) => void;
  addCommentTag: (tag: CommentTag) => void;
  updateCommentTag: (index: number, tag: CommentTag) => void;
  removeCommentTag: (index: number) => void;

  // Advanced tab handlers
  setFileNamePattern: (value: string) => void;
  setUsfmVersion: (value: string) => void;
  setNormalization: (value: string) => void;
  setSilEncoding: (value: string | undefined) => void;
  setEditable: (value: boolean) => void;
  setAllowWhitespace: (value: boolean) => void;
  setSharingPermission: (value: boolean) => void;
  setShareWithSldr: (value: boolean) => void;
  setAllowDerivedRegistration: (value: boolean) => void;

  // Study Bible tab handlers
  setStudyBibleCategories: (categories: StudyBibleCategory[]) => void;
  addStudyBibleCategory: (category: StudyBibleCategory) => void;
  updateStudyBibleCategory: (index: number, category: StudyBibleCategory) => void;
  removeStudyBibleCategory: (index: number) => void;
  setAllowHidingBaseNotes: (value: boolean) => void;
  setPlaceCallersOnLeft: (value: boolean) => void;

  // Validation
  validate: () => boolean;
  clearValidationError: (field: string) => void;

  // Form submission
  handleSubmit: () => ProjectPropertiesOutput;
  handleCancel: () => ProjectPropertiesOutput;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

/**
 * Custom hook for managing Project Properties form state
 *
 * Implements behaviors:
 *
 * - BHV-100: Project type enumeration
 * - BHV-101: Derived type classification
 * - BHV-102: Registration requirement by type
 * - BHV-107: Versification inheritance for derived types
 * - BHV-200-203: Name auto-generation and validation
 * - BHV-204: Tab navigation
 */
export function useProjectPropertiesForm(
  input: ProjectPropertiesInput,
): UseProjectPropertiesFormReturn {
  const [state, dispatch] = useReducer(formReducer, input, createInitialState);

  // ==========================================================================
  // Tab navigation
  // ==========================================================================
  const setActiveTab = useCallback((tab: number) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  // ==========================================================================
  // General tab handlers
  // ==========================================================================
  const setFullName = useCallback((value: string) => {
    // Replace backslash with forward slash (BHV-202)
    const sanitized = value.replace(/\\/g, '/');
    dispatch({ type: 'SET_FULL_NAME', payload: sanitized });
  }, []);

  const setShortName = useCallback((value: string) => {
    dispatch({ type: 'SET_SHORT_NAME', payload: value });
  }, []);

  const setCopyright = useCallback((value: string) => {
    dispatch({ type: 'SET_COPYRIGHT', payload: value });
  }, []);

  const setLanguage = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_LANGUAGE', payload: value });
  }, []);

  const setVersification = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_VERSIFICATION', payload: value });
  }, []);

  const setProjectType = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_PROJECT_TYPE', payload: value });
  }, []);

  const setBaseProject = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_BASE_PROJECT', payload: value });
  }, []);

  const setBiblicalTermsList = useCallback((value: string) => {
    dispatch({ type: 'SET_BIBLICAL_TERMS_LIST', payload: value });
  }, []);

  const setMatchBasedOnStems = useCallback((value: boolean) => {
    dispatch({ type: 'SET_MATCH_BASED_ON_STEMS', payload: value });
  }, []);

  const setEncodingConverter = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_ENCODING_CONVERTER', payload: value });
  }, []);

  const setEncoderReverseDirection = useCallback((value: boolean) => {
    dispatch({ type: 'SET_ENCODER_REVERSE_DIRECTION', payload: value });
  }, []);

  // ==========================================================================
  // Books tab handlers
  // ==========================================================================
  const setSelectedBooks = useCallback((books: string[]) => {
    dispatch({ type: 'SET_SELECTED_BOOKS', payload: books });
  }, []);

  const toggleBook = useCallback((book: string) => {
    dispatch({ type: 'TOGGLE_BOOK', payload: book });
  }, []);

  // ==========================================================================
  // Associations tab handlers
  // ==========================================================================
  const setAssociatedLexicalProject = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_ASSOCIATED_LEXICAL_PROJECT', payload: value });
  }, []);

  const setFlexUsage = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_FLEX_USAGE', payload: value });
  }, []);

  // ==========================================================================
  // Notes tab handlers
  // ==========================================================================
  const setCommentTags = useCallback((tags: CommentTag[]) => {
    dispatch({ type: 'SET_COMMENT_TAGS', payload: tags });
  }, []);

  const addCommentTag = useCallback((tag: CommentTag) => {
    dispatch({ type: 'ADD_COMMENT_TAG', payload: tag });
  }, []);

  const updateCommentTag = useCallback((index: number, tag: CommentTag) => {
    dispatch({ type: 'UPDATE_COMMENT_TAG', payload: { index, tag } });
  }, []);

  const removeCommentTag = useCallback((index: number) => {
    dispatch({ type: 'REMOVE_COMMENT_TAG', payload: index });
  }, []);

  // ==========================================================================
  // Advanced tab handlers
  // ==========================================================================
  const setFileNamePattern = useCallback((value: string) => {
    dispatch({ type: 'SET_FILE_NAME_PATTERN', payload: value });
  }, []);

  const setUsfmVersion = useCallback((value: string) => {
    dispatch({ type: 'SET_USFM_VERSION', payload: value });
  }, []);

  const setNormalization = useCallback((value: string) => {
    dispatch({ type: 'SET_NORMALIZATION', payload: value });
  }, []);

  const setSilEncoding = useCallback((value: string | undefined) => {
    dispatch({ type: 'SET_SIL_ENCODING', payload: value });
  }, []);

  const setEditable = useCallback((value: boolean) => {
    dispatch({ type: 'SET_EDITABLE', payload: value });
  }, []);

  const setAllowWhitespace = useCallback((value: boolean) => {
    dispatch({ type: 'SET_ALLOW_WHITESPACE', payload: value });
  }, []);

  const setSharingPermission = useCallback((value: boolean) => {
    dispatch({ type: 'SET_SHARING_PERMISSION', payload: value });
  }, []);

  const setShareWithSldr = useCallback((value: boolean) => {
    dispatch({ type: 'SET_SHARE_WITH_SLDR', payload: value });
  }, []);

  const setAllowDerivedRegistration = useCallback((value: boolean) => {
    dispatch({ type: 'SET_ALLOW_DERIVED_REGISTRATION', payload: value });
  }, []);

  // ==========================================================================
  // Study Bible tab handlers
  // ==========================================================================
  const setStudyBibleCategories = useCallback((categories: StudyBibleCategory[]) => {
    dispatch({ type: 'SET_STUDY_BIBLE_CATEGORIES', payload: categories });
  }, []);

  const addStudyBibleCategory = useCallback((category: StudyBibleCategory) => {
    dispatch({ type: 'ADD_STUDY_BIBLE_CATEGORY', payload: category });
  }, []);

  const updateStudyBibleCategory = useCallback((index: number, category: StudyBibleCategory) => {
    dispatch({ type: 'UPDATE_STUDY_BIBLE_CATEGORY', payload: { index, category } });
  }, []);

  const removeStudyBibleCategory = useCallback((index: number) => {
    dispatch({ type: 'REMOVE_STUDY_BIBLE_CATEGORY', payload: index });
  }, []);

  const setAllowHidingBaseNotes = useCallback((value: boolean) => {
    dispatch({ type: 'SET_ALLOW_HIDING_BASE_NOTES', payload: value });
  }, []);

  const setPlaceCallersOnLeft = useCallback((value: boolean) => {
    dispatch({ type: 'SET_PLACE_CALLERS_ON_LEFT', payload: value });
  }, []);

  // ==========================================================================
  // Validation
  // ==========================================================================
  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    // Required fields in create mode
    if (input.mode === 'create') {
      if (!state.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }

      if (!state.shortName.trim()) {
        errors.shortName = 'Short name is required';
      } else {
        const shortNameValidation = validateShortName(state.shortName);
        if (!shortNameValidation.isValid && shortNameValidation.error) {
          errors.shortName = shortNameValidation.error;
        }
      }

      if (!state.selectedProjectType) {
        errors.selectedProjectType = 'Project type is required';
      }
    }

    // Language always required
    if (!state.selectedLanguageId) {
      errors.selectedLanguageId = 'Language is required';
    }

    // Versification always required
    if (!state.selectedVersification) {
      errors.selectedVersification = 'Versification is required';
    }

    // Base project required for derived types
    if (state.isDerivedType && !state.selectedBaseProject) {
      errors.selectedBaseProject = 'Base project is required for this project type';
    }

    // Encoding converter required for transliteration with encoder
    if (state.showEncodingConverter && !state.encodingConverter) {
      errors.encodingConverter = 'Encoding converter is required for transliteration';
    }

    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });
    return Object.keys(errors).length === 0;
  }, [input.mode, state]);

  const clearValidationError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_VALIDATION_ERROR', payload: field });
  }, []);

  // ==========================================================================
  // Form submission
  // ==========================================================================
  const handleSubmit = useCallback((): ProjectPropertiesOutput => {
    if (!validate()) {
      // Navigate to first tab with error
      if (state.tabsWithErrors.length > 0) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: state.tabsWithErrors[0] });
      }
      return { action: 'cancel' };
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    // Find base project name from GUID
    const baseProject = input.options.availableBaseProjects.find(
      (p) => p.guid === state.selectedBaseProject,
    );

    const projectData: ProjectData = {
      shortName: state.shortName,
      fullName: state.fullName,
      copyright: state.copyright,
      languageId: state.selectedLanguageId ?? '',
      versification: state.selectedVersification ?? 'English',
      projectType: state.selectedProjectType ?? 'Standard',
      baseProjectName: baseProject?.name,
      baseProjectGuid: state.selectedBaseProject,
      biblicalTermsListInfo: state.biblicalTermsListInfo,
      matchBasedOnStems: state.matchBasedOnStems,
      booksPresentSet: state.selectedBooks,
      associatedLexicalProject: state.associatedLexicalProject,
      flexIntegration: state.flexUsage,
      commentTags: state.commentTags,
      fileNameForm: state.fileNamePattern,
      usfmVersion: state.usfmVersion,
      encoding: 'UTF-8',
      normalizationForm: state.normalization,
      editable: state.editable,
      allowInvisibleChars: state.allowWhitespaceAndInvisible,
      allowReadAccess: state.sharingPermission,
      allowSharingWithSLDR: state.shareWithSldr,
      allowDerivedProjectRegistration: state.allowDerivedProjectRegistration,
    };

    // Add encoding converter fields for transliteration
    if (state.showEncodingConverter) {
      projectData.encodingConverter = state.encodingConverter;
      projectData.encoderReverseDirection = state.encoderReverseDirection;
    }

    // Add Study Bible fields
    if (state.showStudyBibleTab) {
      projectData.studyBibleCategories = state.studyBibleCategories;
      projectData.allowHidingOfBaseFootnotes = state.allowHidingBaseNotes;
      projectData.placeCallerToLeftOfSelection = state.placeCallersOnLeft;
    }

    return {
      action: 'submit',
      projectData,
      promptForUsfmVersion: input.mode === 'create' && state.usfmVersion === '2',
    };
  }, [validate, state, input.options.availableBaseProjects, input.mode]);

  const handleCancel = useCallback((): ProjectPropertiesOutput => {
    return { action: 'cancel' };
  }, []);

  // ==========================================================================
  // Return value
  // ==========================================================================
  return useMemo(
    () => ({
      state,
      options: input.options,
      mode: input.mode,
      setActiveTab,
      setFullName,
      setShortName,
      setCopyright,
      setLanguage,
      setVersification,
      setProjectType,
      setBaseProject,
      setBiblicalTermsList,
      setMatchBasedOnStems,
      setEncodingConverter,
      setEncoderReverseDirection,
      setSelectedBooks,
      toggleBook,
      setAssociatedLexicalProject,
      setFlexUsage,
      setCommentTags,
      addCommentTag,
      updateCommentTag,
      removeCommentTag,
      setFileNamePattern,
      setUsfmVersion,
      setNormalization,
      setSilEncoding,
      setEditable,
      setAllowWhitespace,
      setSharingPermission,
      setShareWithSldr,
      setAllowDerivedRegistration,
      setStudyBibleCategories,
      addStudyBibleCategory,
      updateStudyBibleCategory,
      removeStudyBibleCategory,
      setAllowHidingBaseNotes,
      setPlaceCallersOnLeft,
      validate,
      clearValidationError,
      handleSubmit,
      handleCancel,
    }),
    [
      state,
      input.options,
      input.mode,
      setActiveTab,
      setFullName,
      setShortName,
      setCopyright,
      setLanguage,
      setVersification,
      setProjectType,
      setBaseProject,
      setBiblicalTermsList,
      setMatchBasedOnStems,
      setEncodingConverter,
      setEncoderReverseDirection,
      setSelectedBooks,
      toggleBook,
      setAssociatedLexicalProject,
      setFlexUsage,
      setCommentTags,
      addCommentTag,
      updateCommentTag,
      removeCommentTag,
      setFileNamePattern,
      setUsfmVersion,
      setNormalization,
      setSilEncoding,
      setEditable,
      setAllowWhitespace,
      setSharingPermission,
      setShareWithSldr,
      setAllowDerivedRegistration,
      setStudyBibleCategories,
      addStudyBibleCategory,
      updateStudyBibleCategory,
      removeStudyBibleCategory,
      setAllowHidingBaseNotes,
      setPlaceCallersOnLeft,
      validate,
      clearValidationError,
      handleSubmit,
      handleCancel,
    ],
  );
}
