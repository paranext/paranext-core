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

  /** Options for the project name dialog Maps to: UI-PKG-002 */
  export interface ProjectNameWebViewOptions {
    /** Initial values to populate the form */
    initialValues?: {
      fullName: string;
      shortName: string;
      copyright: string;
    };
    /** Configuration for field editability */
    config?: {
      /** Whether the short name field can be edited */
      allowShortNameEdit: boolean;
      /** Whether the full name field can be edited */
      allowFullNameEdit: boolean;
      /** Whether the copyright field can be edited */
      allowCopyrightEdit: boolean;
      /** Whether to show registry change message (for restricted projects) */
      showRegistryMessage: boolean;
    };
    /** Existing project names for uniqueness validation */
    existingProjectNames?: string[];
  }

  /** Output from the project name dialog */
  export interface ProjectNameFormOutput {
    /** The action taken by the user */
    action: 'submit' | 'cancel';
    /** Data returned when action is 'submit' */
    data?: {
      fullName: string;
      shortName: string;
      copyright: string;
    };
  }

  // #endregion

  // #region Language Settings Types (UI-PKG-003)

  /** Font option for dropdown */
  export interface FontOption {
    name: string;
    isGraphite: boolean;
    supportsRightToLeft: boolean;
  }

  /** Input state for Language Settings Form Maps to: ui-spec-language-settings-form.md */
  export interface LanguageSettingsFormInput {
    /** Project context */
    projectName: string;
    projectGuid: string;

    /** Current language settings */
    currentSettings: LanguageSettings;

    /** Options for dropdowns */
    options: {
      availableFonts: FontOption[];
      fontSizes: number[];
    };

    /** Configuration */
    config: {
      canUpdateAllSettings: boolean;
      defaultFontResetEnabled: boolean;
      hasGraphiteFeatures: boolean;
    };

    /** For copy-from functionality */
    copyableProjects: ProjectReference[];
  }

  /** Language settings data */
  export interface LanguageSettings {
    fontName: string;
    fontSize: number;
    rightToLeft: boolean;
    htmlLanguage: string;
    fontFeatures: string;
    separator: string;
    characterRules: string;
    medialPunctuation: string;
    diacritics: string;
    footnoteCallers: string;
    crossRefCallers: string;
    verseSegments: string;
    wordBreakChars: string;
  }

  /** Form state for language settings */
  export interface LanguageSettingsFormState extends LanguageSettings {
    /** UI state */
    activeTab: string;
    isDirty: boolean;
    isSubmitting: boolean;
    validationErrors: Record<string, string>;
  }

  /** Output from the language settings dialog */
  export interface LanguageSettingsFormOutput {
    action: 'submit' | 'cancel';
    data?: LanguageSettings;
  }

  /** Options for the language settings dialog Maps to: UI-PKG-003 */
  export interface LanguageSettingsWebViewOptions {
    /** Project GUID */
    projectGuid: string;
    /** Project name for display */
    projectName: string;
    /** Whether user can update all settings (admin only) */
    canUpdateAllSettings?: boolean;
  }

  /** Character validation error type Maps to: VAL-013, gm-003 */
  export interface CharacterValidationError {
    type: 'invalid-syntax' | 'capitalization' | 'duplicate' | 'icu-error' | 'case-duplicate';
    character?: string;
    message: string;
    position?: number;
  }

  /** Character rules validation result Maps to: EXT-006, VAL-013 */
  export interface CharacterValidationResult {
    isValid: boolean;
    errors: CharacterValidationError[];
  }

  /** Request to validate character rules Maps to: EXT-006, VAL-013 */
  export interface CharacterRulesValidationRequest {
    separator: string;
    rulesText: string;
    languageId: string;
  }

  /** Request to save language settings Maps to: EXT-007, BHV-163, BHV-164 */
  export interface LanguageSettingsRequest {
    projectGuid: string;
    fontName: string;
    fontSize: number;
    fontFeatures: string;
    rightToLeft: boolean;
    characterRules: string;
    separator: string;
    diacritics: string;
    medialPunctuation: string;
    footnoteCallers: string;
    crossReferenceCallers: string;
    verseSegments: string;
    wordBreakChars: string;
  }

  // #endregion

  // #region Choose Encoding Types (UI-PKG-004)

  /** Options for the choose encoding dialog Maps to: UI-PKG-004, SCR-004 */
  export interface ChooseEncodingWebViewOptions {
    /** Available encoder options */
    encoders: EncoderOption[];
    /** Initial encoder selection (for edit mode) */
    initialEncoderName?: string;
    /** Initial reverse direction value */
    initialReverseDirection?: boolean;
  }

  /** Output from the choose encoding dialog */
  export interface ChooseEncodingFormOutput {
    /** The action taken by the user */
    action: 'submit' | 'cancel';
    /** Data returned when action is 'submit' */
    data?: {
      encoderName: string;
      reverseDirection: boolean;
    };
  }

  // #endregion

  // #region Edit Filing Pattern Types (UI-PKG-005)

  /**
   * Context for resolving pattern placeholders in preview Maps to:
   * ui-spec-edit-filing-pattern-form.md
   */
  export interface PatternPreviewContext {
    /** Project short name for {project} placeholder */
    projectShortName: string;
    /** Sample book ID for {BBB} placeholder (e.g., "MAT") */
    sampleBookId: string;
    /** Sample book number for {nn} placeholder (e.g., 41) */
    sampleBookNumber: number;
  }

  /** Options for the edit filing pattern dialog Maps to: UI-PKG-005, SCR-005, BHV-514 */
  export interface EditFilingPatternWebViewOptions {
    /** Initial pattern value */
    initialPattern: string;
    /** Context for generating the preview */
    previewContext: PatternPreviewContext;
  }

  /** Output from the edit filing pattern dialog Maps to: ui-spec-edit-filing-pattern-form.md */
  export interface EditFilingPatternFormOutput {
    /** The action taken by the user */
    action: 'submit' | 'cancel';
    /** Data returned when action is 'submit' */
    data?: {
      pattern: string;
    };
  }

  // #endregion

  // #region Copy Books Types (UI-PKG-006)

  /** Status of a book in source or destination project */
  export type BookStatus =
    | 'Present'
    | 'NotPresent'
    | 'PresentOlder'
    | 'PresentNewer'
    | 'PresentSame';

  /** Information about a book for the copy comparison grid Maps to: ui-spec-copy-books-form.md */
  export interface BookCopyInfo {
    /** Book ID (e.g., "GEN", "MAT") */
    bookId: string;
    /** Localized book name */
    bookName: string;
    /** Status in source project */
    sourceStatus: BookStatus;
    /** Status in destination project */
    destStatus: BookStatus;
    /** Whether this book can be copied */
    isCopyable: boolean;
  }

  /** Input state for Copy Books Form Maps to: ui-spec-copy-books-form.md */
  export interface CopyBooksFormInput {
    /** Available projects for selection */
    availableProjects: ProjectReference[];
    /** Optional pre-selection of source project */
    preSelectedFromProject?: string;
    /** Optional pre-selection of destination project */
    preSelectedToProject?: string;
  }

  /** Form state for copy books dialog */
  export interface CopyBooksFormState {
    /** Selected source project GUID */
    fromProjectGuid: string | null;
    /** Selected destination project GUID */
    toProjectGuid: string | null;
    /** Book comparison information */
    books: BookCopyInfo[];
    /** Currently selected book IDs for copying */
    selectedBookIds: string[];
    /** Whether to show warning message */
    showWarning: boolean;
    /** Warning message text */
    warningMessage: string;
    /** Loading state */
    isLoading: boolean;
    /** Submitting state */
    isSubmitting: boolean;
    /** Error message if any */
    errorMessage: string | null;
  }

  /** Output from the copy books dialog */
  export interface CopyBooksFormOutput {
    /** The action taken by the user */
    action: 'submit' | 'cancel';
    /** Data returned when action is 'submit' */
    data?: {
      fromProjectGuid: string;
      toProjectGuid: string;
      bookIds: string[];
    };
  }

  /** Options for the copy books dialog Maps to: UI-PKG-006, SCR-006 */
  export interface CopyBooksWebViewOptions {
    /** Optional pre-selected source project GUID */
    fromProjectGuid?: string;
    /** Optional pre-selected destination project GUID */
    toProjectGuid?: string;
  }

  /** Request to copy books between projects Maps to: EXT-008 */
  export interface CopyBooksRequest {
    /** Source project GUID */
    fromProjectGuid: string;
    /** Destination project GUID */
    toProjectGuid: string;
    /** Book IDs to copy */
    bookIds: string[];
  }

  /** Result of copy books operation */
  export interface CopyBooksResult {
    /** Whether the operation succeeded */
    success: boolean;
    /** Books that were successfully copied */
    copiedBooks: string[];
    /** Errors for individual books if any */
    errors?: Array<{ bookId: string; error: string }>;
  }

  // #endregion

  // #region Delete Books Types (UI-PKG-007)

  /**
   * Information about a book for deletion, including statistics Maps to:
   * ui-spec-delete-books-form.md
   */
  export interface BookInfo {
    /** Book ID (e.g., "GEN", "MAT") */
    bookId: string;
    /** Localized book name */
    bookName: string;
    /** Number of chapters in the book */
    chapters: number;
    /** Number of verses in the book */
    verses: number;
  }

  /** Input state for Delete Books Form Maps to: ui-spec-delete-books-form.md */
  export interface DeleteBooksFormInput {
    /** Project context */
    projectGuid: string;
    projectName: string;
    /** Books in the project */
    books: BookInfo[];
  }

  /** Form state for delete books dialog */
  export interface DeleteBooksFormState {
    /** Book selection */
    selectedBookIds: string[];
    /** Confirmation dialog state */
    showConfirmation: boolean;
    /** Deleting state */
    isDeleting: boolean;
  }

  /** Output from the delete books dialog */
  export interface DeleteBooksFormOutput {
    /** The action taken by the user */
    action: 'submit' | 'cancel';
    /** Data returned when action is 'submit' */
    data?: {
      deletedBookIds: string[];
    };
  }

  /** Options for the delete books dialog Maps to: UI-PKG-007, SCR-007 */
  export interface DeleteBooksWebViewOptions {
    /** Project GUID */
    projectGuid: string;
    /** Project name for display */
    projectName: string;
  }

  /** Request to delete books from a project Maps to: ui-spec-delete-books-form.md */
  export interface DeleteBooksRequest {
    /** Project GUID */
    projectGuid: string;
    /** Book IDs to delete */
    bookIds: string[];
  }

  /** Result of delete books operation */
  export interface DeleteBooksResult {
    /** Whether the operation succeeded */
    success: boolean;
    /** Books that were successfully deleted */
    deletedBooks: string[];
    /** Errors for individual books if any */
    errors?: Array<{ bookId: string; error: string }>;
  }

  // #endregion
}

declare module 'papi-shared-types' {
  import type {
    ProjectNameWebViewOptions,
    LanguageSettingsWebViewOptions,
    ChooseEncodingWebViewOptions,
    CharacterRulesValidationRequest,
    CharacterValidationResult,
    EditFilingPatternWebViewOptions,
    CopyBooksWebViewOptions,
    CopyBooksRequest,
    CopyBooksResult,
    ProjectReference,
    BookCopyInfo,
    DeleteBooksWebViewOptions,
    DeleteBooksRequest,
    DeleteBooksResult,
    BookInfo,
  } from 'platform-projects';

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

    /**
     * Opens the Project Name dialog for editing project identification fields
     *
     * @param options - Configuration including initial values and edit permissions
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openProjectNameDialog': (
      options?: ProjectNameWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Opens the Language Settings dialog for a project
     *
     * @param options - Configuration including project GUID and permissions
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openLanguageSettings': (
      options: LanguageSettingsWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Validates character rules for language settings Maps to: EXT-006, VAL-013, gm-003
     *
     * @param request - The validation request with separator and rules text
     * @returns The validation result
     */
    'platformProjects.validateCharacterRules': (
      request: CharacterRulesValidationRequest,
    ) => Promise<CharacterValidationResult>;

    /**
     * Opens the Choose Encoding dialog for selecting an encoding converter Maps to: UI-PKG-004,
     * SCR-004, BHV-109
     *
     * @param options - Configuration including available encoders
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openChooseEncoding': (
      options: ChooseEncodingWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Opens the Edit Filing Pattern dialog for customizing book file naming Maps to: UI-PKG-005,
     * SCR-005, BHV-514, VAL-006
     *
     * @param options - Configuration including initial pattern and preview context
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openEditFilingPattern': (
      options: EditFilingPatternWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Opens the Copy Books dialog for copying books between projects Maps to: UI-PKG-006, SCR-006,
     * BHV-166, BHV-167, BHV-168, EXT-008
     *
     * @param options - Configuration including optional pre-selected projects
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openCopyBooks': (
      options?: CopyBooksWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Gets the list of available projects for project selection Maps to: UI-PKG-006
     *
     * @returns Array of project references
     */
    'platformProjects.getProjects': () => Promise<ProjectReference[]>;

    /**
     * Gets compatible destination projects for copying books from a source project Maps to:
     * EXT-008, BHV-606
     *
     * @param sourceProjectGuid - The GUID of the source project
     * @returns Array of compatible destination project references
     */
    'platformProjects.getCompatibleDestinations': (
      sourceProjectGuid: string,
    ) => Promise<ProjectReference[]>;

    /**
     * Compares books between source and destination projects Maps to: BHV-168
     *
     * @param fromProjectGuid - Source project GUID
     * @param toProjectGuid - Destination project GUID
     * @returns Array of book comparison information
     */
    'platformProjects.compareBooks': (
      fromProjectGuid: string,
      toProjectGuid: string,
    ) => Promise<BookCopyInfo[]>;

    /**
     * Copies books between projects Maps to: BHV-166, BHV-167
     *
     * @param request - The copy books request
     * @returns Result of the copy operation
     */
    'platformProjects.copyBooks': (request: CopyBooksRequest) => Promise<CopyBooksResult>;

    /**
     * Opens the Delete Books dialog for deleting books from a project Maps to: UI-PKG-007, SCR-007
     *
     * @param options - Configuration including project GUID and name
     * @returns The web view ID of the opened dialog, or undefined if failed
     */
    'platformProjects.openDeleteBooks': (
      options: DeleteBooksWebViewOptions,
    ) => Promise<string | undefined>;

    /**
     * Gets the list of books present in a project with statistics Maps to: CAP-020
     *
     * @param projectGuid - The GUID of the project
     * @returns Array of book information with chapters and verses
     */
    'platformProjects.getProjectBooks': (projectGuid: string) => Promise<BookInfo[]>;

    /**
     * Deletes books from a project Maps to: ui-spec-delete-books-form.md
     *
     * @param request - The delete books request
     * @returns Result of the delete operation
     */
    'platformProjects.deleteBooks': (request: DeleteBooksRequest) => Promise<DeleteBooksResult>;
  }
}
