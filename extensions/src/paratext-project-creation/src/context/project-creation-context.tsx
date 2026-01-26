import React, { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';
import type {
  ProjectType,
  ProjectNormalization,
  VersificationType,
  ProjectReference,
  ProjectTypeConfiguration,
  RegistrationState,
  EncodingInfo,
} from 'paratext-project-creation';

// =====================================================
// STATE TYPES
// =====================================================

/** Note tag configuration for a project. */
export interface NoteTag {
  id: string;
  icon: string;
  name: string;
  creatorCanResolve: boolean;
  template: string;
}

/** Study Bible category configuration. */
export interface StudyBibleCategory {
  id: string;
  name: string;
  showInSidebars: boolean;
  showInFootnotes: boolean;
}

/** Form state for the project properties form. */
export interface ProjectCreationState {
  // Mode
  mode: 'new' | 'edit';
  projectGuid: string | null;
  isLoading: boolean;
  isSaving: boolean;

  // Tab state
  activeTab: string;

  // General tab - Project Name section
  fullName: string;
  shortName: string;
  copyright: string;

  // General tab - Language section
  languageId: string;
  languageName: string;

  // General tab - Versification
  versification: VersificationType;
  hasCustomVersification: boolean;

  // General tab - Project Type
  projectType: ProjectType;
  typeConfiguration: ProjectTypeConfiguration | null;

  // General tab - Base Project
  baseProjectGuid: string | null;
  baseProject: ProjectReference | null;
  availableBaseProjects: ProjectReference[];

  // General tab - Registration
  registrationState: RegistrationState | null;
  allowDerivedProjectRegistration: boolean;
  offlineConfirmed: boolean;

  // General tab - Transliteration (conditional)
  encodingConverter: string | null;
  encoderReverseDirection: boolean;
  selectedEncoding: EncodingInfo | null;

  // General tab - Info
  minParatextVersion: string;

  // Books tab
  plannedBooks: number[];

  // Associations tab
  associatedLexicalProject: string | null;
  flexIntegration: 'ParatextLexicon' | 'LexicalProject' | 'Both';
  biblicalTermsList: string;
  matchBasedOnStems: boolean;

  // Notes tab
  noteTags: NoteTag[];

  // Advanced tab
  typicalFileName: string;
  stylesheetName: string;
  encodingName: string;
  normalization: ProjectNormalization;
  usfmVersion: 2 | 3;
  editable: boolean;
  allowInvisibleChars: boolean;
  allowReadAccess: boolean;
  allowSharingWithSLDR: boolean;

  // Study Bible tab (conditional)
  allowHidingOfBaseFootnotes: boolean;
  placeCallerToLeftOfSelection: boolean;
  categories: StudyBibleCategory[];

  // Validation state
  validationErrors: Map<string, string>;
  dirtyFields: Set<string>;

  // Subdialog state
  showNameDialog: boolean;
  showLanguageDialog: boolean;
  showEncodingDialog: boolean;
}

// =====================================================
// ACTIONS
// =====================================================

type ProjectCreationAction =
  | { type: 'SET_MODE'; mode: 'new' | 'edit'; projectGuid?: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SAVING'; isSaving: boolean }
  | { type: 'SET_ACTIVE_TAB'; tab: string }
  | { type: 'SET_FULL_NAME'; fullName: string }
  | { type: 'SET_SHORT_NAME'; shortName: string }
  | { type: 'SET_COPYRIGHT'; copyright: string }
  | { type: 'SET_LANGUAGE'; languageId: string; languageName: string }
  | { type: 'SET_VERSIFICATION'; versification: VersificationType }
  | { type: 'SET_PROJECT_TYPE'; projectType: ProjectType; configuration?: ProjectTypeConfiguration }
  | { type: 'SET_TYPE_CONFIGURATION'; configuration: ProjectTypeConfiguration }
  | {
      type: 'SET_BASE_PROJECT';
      baseProjectGuid: string | null;
      baseProject: ProjectReference | null;
    }
  | { type: 'SET_AVAILABLE_BASE_PROJECTS'; projects: ProjectReference[] }
  | { type: 'SET_REGISTRATION_STATE'; state: RegistrationState }
  | { type: 'SET_ALLOW_DERIVED_REGISTRATION'; allow: boolean }
  | { type: 'SET_OFFLINE_CONFIRMED'; confirmed: boolean }
  | { type: 'SET_ENCODING_CONVERTER'; converter: string | null }
  | { type: 'SET_ENCODER_REVERSE'; reverse: boolean }
  | { type: 'SET_SELECTED_ENCODING'; encoding: EncodingInfo | null }
  | { type: 'SET_PLANNED_BOOKS'; books: number[] }
  | { type: 'SET_ASSOCIATED_LEXICAL_PROJECT'; project: string | null }
  | { type: 'SET_FLEX_INTEGRATION'; integration: 'ParatextLexicon' | 'LexicalProject' | 'Both' }
  | { type: 'SET_BIBLICAL_TERMS_LIST'; list: string }
  | { type: 'SET_MATCH_BASED_ON_STEMS'; match: boolean }
  | { type: 'SET_NOTE_TAGS'; tags: NoteTag[] }
  | { type: 'ADD_NOTE_TAG'; tag: NoteTag }
  | { type: 'UPDATE_NOTE_TAG'; id: string; updates: Partial<NoteTag> }
  | { type: 'DELETE_NOTE_TAG'; id: string }
  | { type: 'SET_TYPICAL_FILE_NAME'; fileName: string }
  | { type: 'SET_NORMALIZATION'; normalization: ProjectNormalization }
  | { type: 'SET_USFM_VERSION'; version: 2 | 3 }
  | { type: 'SET_EDITABLE'; editable: boolean }
  | { type: 'SET_ALLOW_INVISIBLE_CHARS'; allow: boolean }
  | { type: 'SET_ALLOW_READ_ACCESS'; allow: boolean }
  | { type: 'SET_ALLOW_SHARING_SLDR'; allow: boolean }
  | { type: 'SET_ALLOW_HIDING_FOOTNOTES'; allow: boolean }
  | { type: 'SET_PLACE_CALLER_LEFT'; placeLeft: boolean }
  | { type: 'SET_CATEGORIES'; categories: StudyBibleCategory[] }
  | { type: 'ADD_CATEGORY'; category: StudyBibleCategory }
  | { type: 'UPDATE_CATEGORY'; id: string; updates: Partial<StudyBibleCategory> }
  | { type: 'DELETE_CATEGORY'; id: string }
  | { type: 'SET_VALIDATION_ERROR'; field: string; error: string | null }
  | { type: 'CLEAR_VALIDATION_ERRORS' }
  | { type: 'MARK_FIELD_DIRTY'; field: string }
  | { type: 'SHOW_NAME_DIALOG'; show: boolean }
  | { type: 'SHOW_LANGUAGE_DIALOG'; show: boolean }
  | { type: 'SHOW_ENCODING_DIALOG'; show: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_PROJECT_DATA'; data: Partial<ProjectCreationState> };

// =====================================================
// INITIAL STATE
// =====================================================

const DEFAULT_NOTE_TAG: NoteTag = {
  id: 'todo',
  icon: '!',
  name: 'To do',
  creatorCanResolve: false,
  template: '',
};

const initialState: ProjectCreationState = {
  mode: 'new',
  projectGuid: null,
  isLoading: false,
  isSaving: false,
  activeTab: 'general',
  fullName: '',
  shortName: '',
  copyright: '',
  languageId: '',
  languageName: '',
  versification: 'English',
  hasCustomVersification: false,
  projectType: 'NotSelected',
  typeConfiguration: null,
  baseProjectGuid: null,
  baseProject: null,
  availableBaseProjects: [],
  registrationState: null,
  allowDerivedProjectRegistration: false,
  offlineConfirmed: false,
  encodingConverter: null,
  encoderReverseDirection: false,
  selectedEncoding: null,
  minParatextVersion: '9.4',
  plannedBooks: [],
  associatedLexicalProject: null,
  flexIntegration: 'ParatextLexicon',
  biblicalTermsList: 'Major Biblical Terms (Greek and Hebrew)',
  matchBasedOnStems: false,
  noteTags: [DEFAULT_NOTE_TAG],
  typicalFileName: '41MATPRJ.SFM',
  stylesheetName: 'usfm.sty',
  encodingName: 'Unicode (UTF-8)',
  normalization: 'NFC',
  usfmVersion: 3,
  editable: true,
  allowInvisibleChars: false,
  allowReadAccess: false,
  allowSharingWithSLDR: false,
  allowHidingOfBaseFootnotes: false,
  placeCallerToLeftOfSelection: false,
  categories: [],
  validationErrors: new Map(),
  dirtyFields: new Set(),
  showNameDialog: false,
  showLanguageDialog: false,
  showEncodingDialog: false,
};

// =====================================================
// REDUCER
// =====================================================

function projectCreationReducer(
  state: ProjectCreationState,
  action: ProjectCreationAction,
): ProjectCreationState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.mode,
        projectGuid: action.projectGuid || null,
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };

    case 'SET_SAVING':
      return { ...state, isSaving: action.isSaving };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.tab };

    case 'SET_FULL_NAME':
      return {
        ...state,
        fullName: action.fullName,
        dirtyFields: new Set(state.dirtyFields).add('fullName'),
      };

    case 'SET_SHORT_NAME':
      return {
        ...state,
        shortName: action.shortName,
        dirtyFields: new Set(state.dirtyFields).add('shortName'),
      };

    case 'SET_COPYRIGHT':
      return {
        ...state,
        copyright: action.copyright,
        dirtyFields: new Set(state.dirtyFields).add('copyright'),
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        languageId: action.languageId,
        languageName: action.languageName,
        dirtyFields: new Set(state.dirtyFields).add('languageId'),
      };

    case 'SET_VERSIFICATION':
      return {
        ...state,
        versification: action.versification,
        dirtyFields: new Set(state.dirtyFields).add('versification'),
      };

    case 'SET_PROJECT_TYPE': {
      const newState = {
        ...state,
        projectType: action.projectType,
        typeConfiguration: action.configuration || state.typeConfiguration,
        dirtyFields: new Set(state.dirtyFields).add('projectType'),
      };

      // Apply type-specific defaults
      if (action.configuration) {
        newState.editable = action.configuration.editableDefault;
        newState.normalization = action.configuration.normalizationDefault;
      }

      // Clear base project if type doesn't require it
      if (action.configuration && !action.configuration.baseProjectRequired) {
        newState.baseProjectGuid = null;
        newState.baseProject = null;
      }

      return newState;
    }

    case 'SET_TYPE_CONFIGURATION':
      return { ...state, typeConfiguration: action.configuration };

    case 'SET_BASE_PROJECT':
      return {
        ...state,
        baseProjectGuid: action.baseProjectGuid,
        baseProject: action.baseProject,
        // Inherit versification from base project for derived types
        versification: action.baseProject?.versification || state.versification,
        dirtyFields: new Set(state.dirtyFields).add('baseProjectGuid'),
      };

    case 'SET_AVAILABLE_BASE_PROJECTS':
      return { ...state, availableBaseProjects: action.projects };

    case 'SET_REGISTRATION_STATE':
      return { ...state, registrationState: action.state };

    case 'SET_ALLOW_DERIVED_REGISTRATION':
      return { ...state, allowDerivedProjectRegistration: action.allow };

    case 'SET_OFFLINE_CONFIRMED':
      return { ...state, offlineConfirmed: action.confirmed };

    case 'SET_ENCODING_CONVERTER':
      return {
        ...state,
        encodingConverter: action.converter,
        dirtyFields: new Set(state.dirtyFields).add('encodingConverter'),
      };

    case 'SET_ENCODER_REVERSE':
      return {
        ...state,
        encoderReverseDirection: action.reverse,
        dirtyFields: new Set(state.dirtyFields).add('encoderReverseDirection'),
      };

    case 'SET_SELECTED_ENCODING':
      return { ...state, selectedEncoding: action.encoding };

    case 'SET_PLANNED_BOOKS':
      return {
        ...state,
        plannedBooks: action.books,
        dirtyFields: new Set(state.dirtyFields).add('plannedBooks'),
      };

    case 'SET_ASSOCIATED_LEXICAL_PROJECT':
      return { ...state, associatedLexicalProject: action.project };

    case 'SET_FLEX_INTEGRATION':
      return { ...state, flexIntegration: action.integration };

    case 'SET_BIBLICAL_TERMS_LIST':
      return { ...state, biblicalTermsList: action.list };

    case 'SET_MATCH_BASED_ON_STEMS':
      return { ...state, matchBasedOnStems: action.match };

    case 'SET_NOTE_TAGS':
      return { ...state, noteTags: action.tags };

    case 'ADD_NOTE_TAG':
      return { ...state, noteTags: [...state.noteTags, action.tag] };

    case 'UPDATE_NOTE_TAG':
      return {
        ...state,
        noteTags: state.noteTags.map((tag) =>
          tag.id === action.id ? { ...tag, ...action.updates } : tag,
        ),
      };

    case 'DELETE_NOTE_TAG':
      return {
        ...state,
        noteTags: state.noteTags.filter((tag) => tag.id !== action.id),
      };

    case 'SET_TYPICAL_FILE_NAME':
      return { ...state, typicalFileName: action.fileName };

    case 'SET_NORMALIZATION':
      return {
        ...state,
        normalization: action.normalization,
        dirtyFields: new Set(state.dirtyFields).add('normalization'),
      };

    case 'SET_USFM_VERSION':
      return {
        ...state,
        usfmVersion: action.version,
        dirtyFields: new Set(state.dirtyFields).add('usfmVersion'),
      };

    case 'SET_EDITABLE':
      return {
        ...state,
        editable: action.editable,
        dirtyFields: new Set(state.dirtyFields).add('editable'),
      };

    case 'SET_ALLOW_INVISIBLE_CHARS':
      return { ...state, allowInvisibleChars: action.allow };

    case 'SET_ALLOW_READ_ACCESS':
      return { ...state, allowReadAccess: action.allow };

    case 'SET_ALLOW_SHARING_SLDR':
      return { ...state, allowSharingWithSLDR: action.allow };

    case 'SET_ALLOW_HIDING_FOOTNOTES':
      return { ...state, allowHidingOfBaseFootnotes: action.allow };

    case 'SET_PLACE_CALLER_LEFT':
      return { ...state, placeCallerToLeftOfSelection: action.placeLeft };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.categories };

    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.category] };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.id ? { ...cat, ...action.updates } : cat,
        ),
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.id),
      };

    case 'SET_VALIDATION_ERROR': {
      const errors = new Map(state.validationErrors);
      if (action.error) {
        errors.set(action.field, action.error);
      } else {
        errors.delete(action.field);
      }
      return { ...state, validationErrors: errors };
    }

    case 'CLEAR_VALIDATION_ERRORS':
      return { ...state, validationErrors: new Map() };

    case 'MARK_FIELD_DIRTY':
      return {
        ...state,
        dirtyFields: new Set(state.dirtyFields).add(action.field),
      };

    case 'SHOW_NAME_DIALOG':
      return { ...state, showNameDialog: action.show };

    case 'SHOW_LANGUAGE_DIALOG':
      return { ...state, showLanguageDialog: action.show };

    case 'SHOW_ENCODING_DIALOG':
      return { ...state, showEncodingDialog: action.show };

    case 'RESET_FORM':
      return { ...initialState };

    case 'LOAD_PROJECT_DATA':
      return {
        ...state,
        ...action.data,
        isLoading: false,
      };

    default:
      return state;
  }
}

// =====================================================
// CONTEXT
// =====================================================

interface ProjectCreationContextValue {
  state: ProjectCreationState;
  dispatch: React.Dispatch<ProjectCreationAction>;

  // Derived state
  canSubmit: boolean;
  isResourceProject: boolean;
  isDerivedType: boolean;
  showStudyBibleTab: boolean;
  showBooksTab: boolean;
  showEncodingFields: boolean;
}

const ProjectCreationContext = createContext<ProjectCreationContextValue | null>(null);

// =====================================================
// PROVIDER
// =====================================================

interface ProjectCreationProviderProps {
  children: ReactNode;
  initialMode?: 'new' | 'edit';
  projectGuid?: string;
}

export function ProjectCreationProvider({
  children,
  initialMode = 'new',
  projectGuid,
}: ProjectCreationProviderProps) {
  const [state, dispatch] = useReducer(projectCreationReducer, {
    ...initialState,
    mode: initialMode,
    projectGuid: projectGuid || null,
  });

  // Derived state calculations
  const canSubmit = useMemo(() => {
    // Required fields check
    if (!state.fullName.trim()) return false;
    if (!state.shortName.trim()) return false;
    if (state.projectType === 'NotSelected') return false;
    if (!state.languageId) return false;

    // Derived type check
    if (state.typeConfiguration?.baseProjectRequired && !state.baseProjectGuid) {
      return false;
    }

    // Encoding check for transliteration
    if (state.typeConfiguration?.encodingConverterRequired && !state.encodingConverter) {
      return false;
    }

    // No validation errors
    if (state.validationErrors.size > 0) return false;

    return true;
  }, [state]);

  const isResourceProject = useMemo(() => {
    return (
      state.projectType === 'Resource' ||
      state.projectType === 'MarbleResource' ||
      state.projectType === 'AuxiliaryResource' ||
      state.projectType === 'XmlResource' ||
      state.projectType === 'EnhancedResource'
    );
  }, [state.projectType]);

  const isDerivedType = useMemo(() => {
    return state.typeConfiguration?.isDerivedType ?? false;
  }, [state.typeConfiguration]);

  const showStudyBibleTab = useMemo(() => {
    return state.projectType === 'StudyBibleAdditions' && state.mode === 'edit';
  }, [state.projectType, state.mode]);

  const showBooksTab = useMemo(() => {
    return !isResourceProject && state.projectType !== 'ConsultantNotes';
  }, [isResourceProject, state.projectType]);

  const showEncodingFields = useMemo(() => {
    return (
      state.projectType === 'TransliterationManual' ||
      state.projectType === 'TransliterationWithEncoder'
    );
  }, [state.projectType]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      canSubmit,
      isResourceProject,
      isDerivedType,
      showStudyBibleTab,
      showBooksTab,
      showEncodingFields,
    }),
    [
      state,
      canSubmit,
      isResourceProject,
      isDerivedType,
      showStudyBibleTab,
      showBooksTab,
      showEncodingFields,
    ],
  );

  return (
    <ProjectCreationContext.Provider value={value}>{children}</ProjectCreationContext.Provider>
  );
}

// =====================================================
// HOOK
// =====================================================

export function useProjectCreation(): ProjectCreationContextValue {
  const context = useContext(ProjectCreationContext);
  if (!context) {
    throw new Error('useProjectCreation must be used within a ProjectCreationProvider');
  }
  return context;
}

export { initialState as projectCreationInitialState };
