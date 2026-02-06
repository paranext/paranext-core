declare module 'papi-shared-types' {
  import type {
    ProjectCreateRequest,
    ProjectOptionsResponse,
    ProjectCreateResult,
  } from 'platform-projects';

  export interface CommandHandlers {
    'platformProjects.openCreateProject': () => Promise<string | undefined>;
    'platformProjects.openProjectName': () => Promise<string | undefined>;
    'platformProjects.openLanguageSettings': () => Promise<string | undefined>;
    'platformProjects.openChooseEncoding': () => Promise<string | undefined>;
    'platformProjects.getProjectOptions': () => Promise<ProjectOptionsResponse>;
    'platformProjects.createProject': (
      request: ProjectCreateRequest,
    ) => Promise<ProjectCreateResult>;
    'platformProjects.validateShortName': (
      shortName: string,
    ) => Promise<{ isValid: boolean; error?: string }>;
  }
}

declare module 'platform-projects' {
  // ============================================================================
  // PROJECT TYPES
  // ============================================================================

  type ProjectType =
    | 'Standard'
    | 'BackTranslation'
    | 'Daughter'
    | 'Auxiliary'
    | 'StudyBibleAdditions'
    | 'TransliterationManual'
    | 'TransliterationWithEncoder'
    | 'ConsultantNotes';

  type VersificationType =
    | 'English'
    | 'Septuagint'
    | 'Original'
    | 'Vulgate'
    | 'RussianOrthodox'
    | 'RussianProtestant';

  type NormalizationType = 'Undefined' | 'NFD' | 'NFC';

  // ============================================================================
  // OPTION TYPES
  // ============================================================================

  interface ProjectTypeOption {
    type: ProjectType;
    displayName: string;
    isDerived: boolean;
    requiresEncoder: boolean;
  }

  interface LanguageOption {
    id: string;
    name: string;
    isRightToLeft: boolean;
    script?: string;
  }

  interface VersificationOption {
    type: VersificationType;
    displayName: string;
  }

  interface ProjectReference {
    guid: string;
    shortName: string;
    fullName: string;
    projectType: ProjectType;
    booksPresent?: string[];
    editable?: boolean;
  }

  interface EncoderOption {
    name: string;
    displayName: string;
    isBidirectional: boolean;
  }

  interface NoteTagConfig {
    name: string;
    icon: string;
    defaultStatus: string;
  }

  interface StudyBibleCategory {
    name: string;
    description: string;
  }

  // ============================================================================
  // FORM STATE
  // ============================================================================

  interface ProjectPropertiesFormState {
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
  // ACTIONS
  // ============================================================================

  type FormAction =
    | { type: 'SET_FIELD'; field: string; value: unknown }
    | { type: 'SET_PROJECT_TYPE'; projectType: ProjectType }
    | { type: 'SET_BASE_PROJECT'; baseProjectGuid: string | undefined }
    | { type: 'SET_BOOKS'; selectedBooks: string[] }
    | { type: 'SET_ACTIVE_TAB'; tab: string }
    | { type: 'SET_VALIDATION_ERRORS'; errors: Record<string, string>; tabsWithErrors: string[] }
    | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
    | { type: 'RESET' };

  // ============================================================================
  // PROJECT CREATE REQUEST
  // ============================================================================

  interface ProjectCreateRequest {
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

  // ============================================================================
  // PAPI RESPONSE TYPES
  // ============================================================================

  interface ProjectOptionsResponse {
    projectTypes: ProjectTypeOption[];
    languages: LanguageOption[];
    versifications: VersificationOption[];
    baseProjects: ProjectReference[];
    encoders: EncoderOption[];
  }

  interface ProjectCreateResult {
    success: boolean;
    projectGuid?: string;
    error?: string;
  }
}
