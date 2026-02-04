declare module 'platform-projects' {
  // #region Enums and Type Unions

  /** Project type - one of 8 supported types Maps to: ProjectType enum in C# */
  export type ProjectType =
    | 'Standard'
    | 'BackTranslation'
    | 'Daughter'
    | 'Auxiliary'
    | 'StudyBibleAdditions'
    | 'TransliterationManual'
    | 'TransliterationWithEncoder'
    | 'ConsultantNotes';

  /** Versification system Maps to: ScrVersType enum in C# */
  export type VersificationType =
    | 'English'
    | 'Septuagint'
    | 'Original'
    | 'Vulgate'
    | 'RussianOrthodox'
    | 'RussianProtestant';

  /** Unicode normalization form */
  export type NormalizationType = 'Undefined' | 'NFD' | 'NFC';

  /** USFM version */
  export type UsfmVersionOption = 'Version2' | 'Version3';

  // #endregion

  // #region Option Types for Dropdowns

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
    booksPresent?: string[];
    editable?: boolean;
  }

  export interface EncoderOption {
    name: string;
    displayName: string;
    isBidirectional: boolean;
  }

  export interface BiblicalTermsListOption {
    id: string;
    name: string;
  }

  // #endregion

  // #region Request/Response Types

  /** Available options for project creation form */
  export interface ProjectOptionsResponse {
    projectTypes: ProjectTypeOption[];
    languages: LanguageOption[];
    versifications: VersificationOption[];
    baseProjects: ProjectReference[];
    encoders: EncoderOption[];
    biblicalTermsLists: BiblicalTermsListOption[];
    lexicalProjects: ProjectReference[];
  }

  /** Project type rules and constraints Maps to: EXT-001 */
  export interface ProjectTypeRules {
    /** Whether this type requires a base project */
    requiresBaseProject: boolean;
    /** Whether this type can be used as a base for other projects */
    canBeBaseProject: boolean;
    /** Default editability for this type */
    defaultEditable: boolean;
    /** Description of base project constraints */
    baseConstraints: string | null;
    /** Whether to show the based-on dropdown */
    showBasedOnDropdown: boolean;
    /** Whether to show the encoder dropdown */
    showEncoderDropdown: boolean;
    /** Whether this type shares license with parent */
    sharesLicenseWithParent: boolean;
    /** Whether admin role is required for base project */
    requiresAdminRole?: boolean;
    /** Whether this type inherits language from base */
    inheritsLanguage?: boolean;
    /** Whether this type inherits book names from base */
    inheritsBookNames?: boolean;
    /** Whether this type auto-generates name from username */
    autoGeneratesName?: boolean;
    /** Whether this type requires an encoder */
    requiresEncoder?: boolean;
  }

  /** Request to validate a project short name Maps to: EXT-002, VAL-001 */
  export interface ShortNameValidationRequest {
    /** Short name to validate */
    shortName: string;
    /** True if creating new project, false if editing existing */
    isNewProject: boolean;
    /** Original name if editing (for change detection) */
    originalName?: string;
  }

  /** Generic validation result Used by: EXT-002, EXT-006, EXT-010, EXT-011 */
  export interface ValidationResult {
    /** Whether validation passed */
    isValid: boolean;
    /** Error message if invalid */
    errorMessage: string | null;
    /** Localization key for error message */
    errorMessageKey: string | null;
    /** Format arguments for parameterized messages */
    formatArgs?: string[];
  }

  /** Note tag configuration */
  export interface NoteTagConfig {
    name: string;
    icon: string;
    defaultStatus: string;
  }

  /** Study Bible category */
  export interface StudyBibleCategory {
    name: string;
    description: string;
  }

  /** Request to create a new Paratext project Maps to: BHV-510, BHV-511, BHV-512 */
  export interface ProjectCreateRequest {
    /** Project short name (3-8 chars, A-Za-z0-9_) */
    shortName: string;
    /** Full display name */
    fullName: string;
    /** Project type - one of 8 supported types */
    projectType: ProjectType;
    /** BCP-47 language identifier (undefined for StudyBibleAdditions) */
    languageId: string | undefined;
    /** Versification system */
    versification: VersificationType;
    /** GUID of base project for derived types (undefined for Standard/ConsultantNotes) */
    baseProjectGuid: string | undefined;
    /** Whether project is editable (false for TransliterationWithEncoder) */
    editable: boolean;
    /** Encoder name for TransliterationWithEncoder projects */
    encoderName: string | undefined;
    /** Use encoder in reverse direction */
    encoderReverseDirection: boolean;
    /** Book IDs included in project scope */
    booksPresent: string[];
    /** File naming template (e.g., "41MAT") */
    fileNameForm: string;
    /** Unicode normalization form */
    normalization: NormalizationType;
    /** USFM version (2 or 3) */
    usfmVersion: UsfmVersionOption;
    /** Note tag configurations */
    noteTags: NoteTagConfig[];
    /** Biblical terms list association */
    biblicalTermsListId: string | undefined;
    /** Associated lexical project GUID */
    associatedLexicalProjectGuid: string | undefined;
    /** Study Bible categories (only for StudyBibleAdditions) */
    studyBibleCategories?: StudyBibleCategory[];
  }

  /** Error codes for project creation */
  export type ProjectCreateErrorCode =
    | 'INVALID_SHORT_NAME'
    | 'INVALID_FULL_NAME'
    | 'INVALID_PROJECT_TYPE'
    | 'INVALID_LANGUAGE'
    | 'INVALID_BASE_PROJECT'
    | 'INVALID_ENCODER'
    | 'DUPLICATE_NAME'
    | 'PERMISSION_DENIED'
    | 'IO_ERROR'
    | 'VCS_ERROR'
    | 'UNKNOWN_ERROR';

  /** Error information for project creation */
  export interface ProjectCreateError {
    code: ProjectCreateErrorCode;
    message: string;
    field?: string;
  }

  /** Result of project creation Maps to: BHV-512 */
  export type ProjectCreateResult =
    | { success: true; projectGuid: string; projectPath: string }
    | { success: false; error: ProjectCreateError };

  /** Complete project validation result Maps to: EXT-003 */
  export interface ProjectValidationResult {
    /** Overall validity */
    isValid: boolean;
    /** Field-level errors */
    fieldErrors: Record<string, ValidationError>;
    /** Whether any major errors exist */
    hasMajorErrors: boolean;
    /** Whether any minor errors exist */
    hasMinorErrors: boolean;
  }

  export interface ValidationError {
    field: string;
    message: string;
    severity: 'error' | 'warning';
  }

  // #endregion

  // #region Form State Types

  /** Form state for project properties */
  export interface ProjectPropertiesFormState {
    // General tab
    fullName: string;
    shortName: string;
    projectType: ProjectType | undefined;
    languageId: string | undefined;
    versification: VersificationType | undefined;
    baseProjectGuid: string | undefined;
    editable: boolean;
    encoderName: string | undefined;
    encoderReverseDirection: boolean;

    // Books tab
    selectedBooks: string[];

    // Associations tab
    biblicalTermsListId: string | undefined;
    associatedLexicalProjectGuid: string | undefined;

    // Notes tab
    noteTags: NoteTagConfig[];

    // Advanced tab
    fileNameForm: string;
    normalization: NormalizationType;

    // Study Bible tab (conditional)
    studyBibleCategories: StudyBibleCategory[];

    // UI state
    activeTab: string;
    isDirty: boolean;
    isSubmitting: boolean;
    validationErrors: Record<string, string>;
    tabsWithErrors: string[];

    // Derived state (computed from projectType)
    showBaseProject: boolean;
    showEncoderFields: boolean;
    showStudyBibleTab: boolean;
    languageRequired: boolean;
    baseProjectRequired: boolean;
  }

  /** Props for the project properties web view - extends OpenWebViewOptions */
  export interface ProjectPropertiesWebViewOptions {
    mode: 'create' | 'edit';
    projectGuid?: string;
    /** Whether to request an existing web view with a specific ID */
    existingId?: string | '?';
    /** Whether to create a new WebView if existingId was not found */
    createNewIfNotFound?: boolean;
    /** Whether to bring the WebView to the front if it already exists */
    bringToFront?: boolean;
  }

  // #endregion
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens the Create Project dialog
     *
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openCreateProject': () => Promise<string | undefined>;

    /**
     * Opens the Edit Project dialog for a specific project
     *
     * @param projectGuid - The GUID of the project to edit
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openEditProject': (projectGuid: string) => Promise<string | undefined>;
  }
}
