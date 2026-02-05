declare module 'platform-projects' {
  // ============================================================================
  // PROJECT TYPES
  // ============================================================================

  /** All supported project types PT9 Source: ParatextData/ProjectType.cs */
  export type ProjectType =
    | 'Standard'
    | 'BackTranslation'
    | 'Daughter'
    | 'Auxiliary'
    | 'StudyBibleAdditions'
    | 'TransliterationManual'
    | 'TransliterationWithEncoder'
    | 'ConsultantNotes';

  /** Standard versification systems */
  export type VersificationType =
    | 'English'
    | 'Septuagint'
    | 'Original'
    | 'Vulgate'
    | 'RussianOrthodox'
    | 'RussianProtestant';

  /** Unicode normalization forms */
  export type NormalizationType = 'Undefined' | 'NFD' | 'NFC';

  // ============================================================================
  // OPTION TYPES (used in dropdowns)
  // ============================================================================

  /** Language option for dropdowns */
  export interface LanguageOption {
    id: string;
    name: string;
    isRightToLeft: boolean;
    script?: string;
  }

  /** Project reference for dropdowns and associations */
  export interface ProjectReference {
    guid: string;
    shortName: string;
    fullName: string;
    projectType: ProjectType;
    booksPresent?: string[];
    editable?: boolean;
  }

  /** Encoder option for TransliterationWithEncoder projects */
  export interface EncoderOption {
    name: string;
    displayName: string;
    isBidirectional: boolean;
  }

  /** Project type option with metadata */
  export interface ProjectTypeOption {
    type: ProjectType;
    displayName: string;
    isDerived: boolean;
    requiresEncoder: boolean;
  }

  /** Versification option for dropdowns */
  export interface VersificationOption {
    type: VersificationType;
    displayName: string;
  }

  // ============================================================================
  // REQUEST/RESPONSE TYPES
  // ============================================================================

  /** Options returned for populating the project creation form */
  export interface ProjectOptionsResponse {
    projectTypes: ProjectTypeOption[];
    languages: LanguageOption[];
    versifications: VersificationOption[];
    baseProjects: ProjectReference[];
    encoders: EncoderOption[];
  }

  /** Request to create a new project */
  export interface ProjectCreateRequest {
    shortName: string;
    fullName: string;
    projectType: ProjectType;
    languageId: string | null;
    versification: VersificationType;
    baseProjectGuid: string | null;
    editable: boolean;
    encoderName: string | null;
    encoderReverseDirection: boolean;
    booksPresent: string[];
    fileNameForm: string;
    normalization?: NormalizationType;
  }

  /** Result of project creation */
  export interface ProjectCreateResult {
    success: boolean;
    projectGuid?: string;
    error?: string;
  }

  /** Validation result for short name */
  export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }

  /** Project type rules for conditional UI */
  export interface ProjectTypeRules {
    requiresBaseProject: boolean;
    requiresEncoder: boolean;
    requiresLanguage: boolean;
    defaultEditable: boolean;
    baseProjectFilter: string[];
  }

  // ============================================================================
  // COPY BOOKS TYPES (UI-PKG-006)
  // ============================================================================

  /** Request to copy books between projects */
  export interface CopyBooksRequest {
    fromProjectGuid: string;
    toProjectGuid: string;
    bookIds: string[];
  }

  /** Result of copy books operation */
  export interface CopyBooksResult {
    success: boolean;
    copiedBooks?: string[];
    errors?: Array<{ bookId: string; error: string }>;
    error?: string;
  }

  /** Project reference for copy books with required fields */
  export interface CopyBooksProjectReference {
    guid: string;
    shortName: string;
    fullName: string;
    projectType: ProjectType;
    booksPresent: string[];
    editable: boolean;
  }

  // ============================================================================
  // RESTORE TYPES (CAP-012, CAP-013)
  // ============================================================================

  /** USFM version options */
  export type UsfmVersionOption = 'Version2' | 'Version3';

  /** USFM version warning for project creation */
  export interface UsfmVersionWarning {
    showWarning: boolean;
    warningMessageKey: string;
    confirmButtonKey: string;
    cancelButtonKey: string;
  }

  /** File comparison state for restore operations */
  export type FileComparisonState =
    | 'DestDoesNotExist'
    | 'FilesAreSame'
    | 'SourceIsHigherVersion'
    | 'DestIsHigherVersion'
    | 'VersionsConflict';

  /** Project info from backup */
  export interface BackupProjectInfo {
    shortName: string;
    fullName: string;
    guid: string;
    projectType: string;
  }

  /** File info from backup */
  export interface RestoreFileInfo {
    fileName: string;
    bookId: string | null;
    sourceVersion: string;
    comparisonState: FileComparisonState;
  }

  /** Result of backup analysis */
  export interface RestoreAnalysisResult {
    projectInfo: BackupProjectInfo;
    files: RestoreFileInfo[];
    isSharedProjectBackup: boolean;
    warningMessage: string | null;
  }

  /** Request to restore a project */
  export interface RestoreProjectRequest {
    backupFilePath: string;
    targetProjectGuid: string | null;
    bookIds: string[] | null;
  }

  /** Result of project restore */
  export interface RestoreProjectResult {
    success: boolean;
    projectGuid?: string;
    restoredBooks: string[];
    errors?: string[];
  }
}

declare module 'papi-shared-types' {
  import type {
    ProjectOptionsResponse,
    ProjectCreateRequest,
    ProjectCreateResult,
    ValidationResult,
    ProjectTypeRules,
    ProjectType,
    UsfmVersionOption,
    UsfmVersionWarning,
    RestoreAnalysisResult,
    RestoreProjectRequest,
    RestoreProjectResult,
    ProjectReference,
  } from 'platform-projects';

  export interface CommandHandlers {
    /**
     * Open the Create Project dialog
     *
     * @returns ID of the opened web view
     */
    'platformProjects.openCreateProject': () => Promise<string | undefined>;

    /**
     * Open the Edit Project dialog for a specific project
     *
     * @param projectGuid - GUID of the project to edit
     * @returns ID of the opened web view
     */
    'platformProjects.openEditProject': (projectGuid: string) => Promise<string | undefined>;

    /**
     * Open the Project Name dialog (for editing project identification)
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openProjectName': (options?: {
      initialValues?: { fullName: string; shortName: string; copyright: string };
      config?: {
        allowShortNameEdit: boolean;
        allowFullNameEdit: boolean;
        allowCopyrightEdit: boolean;
        showRegistryMessage: boolean;
      };
      existingProjectNames?: string[];
    }) => Promise<string | undefined>;

    /**
     * Open the Language Settings dialog (for configuring font, character rules, etc.)
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openLanguageSettings': (options?: {
      projectName?: string;
      projectGuid?: string;
      currentSettings?: {
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
      };
      config?: {
        canUpdateAllSettings: boolean;
        defaultFontResetEnabled: boolean;
        hasGraphiteFeatures: boolean;
      };
    }) => Promise<string | undefined>;

    /**
     * Open the Choose Encoding dialog (for selecting encoding converter)
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openChooseEncoding': (options?: {
      encoders?: Array<{
        name: string;
        displayName: string;
        isBidirectional: boolean;
      }>;
      initialValues?: {
        encoderName: string;
        reverseDirection: boolean;
      };
    }) => Promise<string | undefined>;

    /**
     * Validate character rules (ICU collation syntax)
     *
     * @param rules - The character rules to validate
     * @returns Validation result with any errors
     */
    'platformProjects.validateCharacterRules': (rules: string) => Promise<{
      isValid: boolean;
      errors?: Array<{
        type: 'invalid-syntax' | 'capitalization' | 'duplicate';
        character?: string;
        message: string;
        position?: number;
      }>;
    }>;

    /**
     * Save language settings for a project
     *
     * @param settings - The language settings to save
     * @returns Result of the save operation
     */
    'platformProjects.saveLanguageSettings': (settings: {
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
    }) => Promise<{ success: boolean; error?: string }>;

    /**
     * Get options for populating the project creation form
     *
     * @returns Available options for project creation
     */
    'platformProjects.getProjectOptions': () => Promise<ProjectOptionsResponse>;

    /**
     * Validate a project short name
     *
     * @param shortName - The short name to validate
     * @param isNewProject - Whether this is for a new project
     * @returns Validation result
     */
    'platformProjects.validateShortName': (
      shortName: string,
      isNewProject: boolean,
    ) => Promise<ValidationResult>;

    /**
     * Get rules for a specific project type
     *
     * @param projectType - The project type to get rules for
     * @returns Rules for the project type
     */
    'platformProjects.getProjectTypeRules': (projectType: ProjectType) => Promise<ProjectTypeRules>;

    /**
     * Validate all project settings before creation
     *
     * @param request - The project creation request to validate
     * @returns Validation result
     */
    'platformProjects.validateProjectSettings': (
      request: ProjectCreateRequest,
    ) => Promise<ValidationResult>;

    /**
     * Create a new project
     *
     * @param request - Project creation parameters
     * @returns Result of the creation operation
     */
    'platformProjects.createProject': (
      request: ProjectCreateRequest,
    ) => Promise<ProjectCreateResult>;

    /**
     * Open the Copy Books dialog
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openCopyBooks': (options?: {
      availableProjects?: Array<{
        guid: string;
        shortName: string;
        fullName: string;
        projectType: ProjectType;
        booksPresent: string[];
        editable: boolean;
      }>;
      preSelectedFromProject?: string;
      preSelectedToProject?: string;
    }) => Promise<string | undefined>;

    /**
     * Copy books from one project to another (CAP-009)
     *
     * @param request - Copy books request with source, destination, and book IDs
     * @returns Result of the copy operation
     */
    'platformProjects.copyBooks': (request: {
      fromProjectGuid: string;
      toProjectGuid: string;
      bookIds: string[];
    }) => Promise<{
      success: boolean;
      copiedBooks?: string[];
      errors?: Array<{ bookId: string; error: string }>;
      error?: string;
    }>;

    /**
     * Generate an abbreviation from a full name (CAP-005)
     *
     * @param fullName - The full project name
     * @returns Generated abbreviation (3-8 characters)
     */
    'platformProjects.generateAbbreviation': (fullName: string) => Promise<string>;

    /**
     * Get compatible destination projects for book copy (CAP-008)
     *
     * @param sourceProjectGuid - GUID of the source project
     * @returns List of compatible destination projects
     */
    'platformProjects.getCompatibleDestinations': (
      sourceProjectGuid: string,
    ) => Promise<ProjectReference[]>;

    /**
     * Get USFM version warning if applicable (CAP-004)
     *
     * @param version - The USFM version selected
     * @param isNewProject - Whether this is a new project
     * @returns Warning info if warning should be shown, null otherwise
     */
    'platformProjects.getUsfmVersionWarning': (
      version: UsfmVersionOption,
      isNewProject: boolean,
    ) => Promise<UsfmVersionWarning | null>;

    /**
     * Analyze a backup file before restore (CAP-013)
     *
     * @param backupFilePath - Path to the backup ZIP file
     * @returns Analysis result with project info and file list
     */
    'platformProjects.analyzeBackup': (backupFilePath: string) => Promise<RestoreAnalysisResult>;

    /**
     * Restore a project from backup (CAP-012)
     *
     * @param request - Restore request with backup path and options
     * @returns Result of the restore operation
     */
    'platformProjects.restoreProject': (
      request: RestoreProjectRequest,
    ) => Promise<RestoreProjectResult>;

    /**
     * Open the Edit Filing Pattern dialog
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openEditFilingPattern': (options?: {
      currentPattern?: string;
      bookNames?: Array<{ bookId: string; shortName: string; longName: string }>;
    }) => Promise<string | undefined>;

    /**
     * Open the Delete Books dialog
     *
     * @param options - Optional configuration for the dialog
     * @returns ID of the opened web view
     */
    'platformProjects.openDeleteBooks': (options?: {
      projectGuid?: string;
      projectName?: string;
      booksPresent?: string[];
    }) => Promise<string | undefined>;
  }
}
