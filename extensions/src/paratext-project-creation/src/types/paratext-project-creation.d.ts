declare module 'paratext-project-creation' {
  // =====================================================
  // ENUMERATIONS
  // =====================================================

  /** Project type classification. Maps to C# ProjectType enum. */
  export type ProjectType =
    | 'NotSelected'
    | 'Standard'
    | 'BackTranslation'
    | 'Daughter'
    | 'TransliterationManual'
    | 'TransliterationWithEncoder'
    | 'StudyBible'
    | 'ConsultantNotes'
    | 'StudyBibleAdditions'
    | 'Auxiliary'
    | 'AuxiliaryResource'
    | 'XmlResource'
    | 'XmlDictionary'
    | 'Resource'
    | 'MarbleResource'
    | 'SourceLanguage'
    | 'Dictionary'
    | 'EnhancedResource';

  /** Unicode normalization form. */
  export type ProjectNormalization = 'Undefined' | 'NFC' | 'NFD';

  /** Registration status for a project. */
  export type RegistrationStatus =
    | 'NotSelected'
    | 'Registered'
    | 'Unregistered'
    | 'InheritsFromBase'
    | 'NotApplicable';

  /** Book creation mode. */
  export type BookCreationMode = 'Empty' | 'ChapterVerse' | 'BasedOnModel';

  /** Versification type. */
  export type VersificationType =
    | 'Unknown'
    | 'Original'
    | 'Septuagint'
    | 'Vulgate'
    | 'English'
    | 'RussianOrthodox'
    | 'RussianProtestant';

  // =====================================================
  // COMMON TYPES
  // =====================================================

  /** Generic validation result. */
  export interface ValidationResult {
    isValid: boolean;
    errorCode?: string;
    errorParams?: Record<string, string>;
  }

  /** Project reference for dropdowns. */
  export interface ProjectReference {
    guid: string;
    shortName: string;
    fullName: string;
    versification: VersificationType;
    projectType: ProjectType;
    isScripture: boolean;
    isResource: boolean;
    isRegistered: boolean;
  }

  /** Project metadata from registry. */
  export interface ProjectMetadata {
    registryId: string;
    fullName: string;
    visibility: string;
    license?: string;
  }

  /** Language selection with BCP-47 components. */
  export interface LanguageSelection {
    languageId: string;
    languageName: string;
    baseCode: string;
    script?: string;
    region?: string;
    variant?: string;
  }

  /** Configuration for a project type. */
  export interface ProjectTypeConfiguration {
    projectType: ProjectType;
    baseProjectRequired: boolean;
    editableDefault: boolean;
    autoNameFromUser: boolean;
    normalizationDefault: ProjectNormalization;
    registrationRequired: boolean;
    sharesParentRegistration: boolean;
    booksTabVisible: boolean;
    encodingConverterRequired: boolean;
    allowedBaseTypes: ProjectType[];
    isDerivedType: boolean;
    isScripture: boolean;
  }

  /** Registration state for a project. */
  export interface RegistrationState {
    status: RegistrationStatus;
    messageKey?: string;
    canRegisterOnline: boolean;
    canOptOutOfInheritance: boolean;
    metadata?: ProjectMetadata;
    registryServerAvailable: boolean;
  }

  /** Encoding information. */
  export interface EncodingInfo {
    codePage: number;
    name: string;
    displayName: string;
  }

  /** Language information from the database. */
  export interface LanguageInfo {
    code: string;
    name: string;
    altNames: string[];
    scripts: string[];
    regions: string[];
  }

  /** Script option for language selection. */
  export interface ScriptOption {
    code: string;
    name: string;
  }

  /** Region option for language selection. */
  export interface RegionOption {
    code: string;
    name: string;
  }

  /** Variant option for language selection. */
  export interface VariantOption {
    code: string;
    name: string;
    isCustom: boolean;
  }

  /** Request to create a new project. */
  export interface CreateProjectRequest {
    shortName: string;
    fullName: string;
    languageId: string;
    versification: VersificationType;
    projectType: ProjectType;
    baseProjectGuid?: string;
    copyright?: string;
    normalization?: ProjectNormalization;
    usfmVersion?: number;
    editable?: boolean;
    encodingConverter?: string;
    encoderReverseDirection?: boolean;
  }

  /** Result of project creation. */
  export interface CreateProjectResult {
    success: boolean;
    projectGuid?: string;
    errorCode?: string;
    errorMessage?: string;
  }

  /** Registration information for a project. */
  export interface RegistrationInfo {
    registryId: string;
    visibility: 'Test' | 'Confidential' | 'Public';
    licenseName: string;
  }

  // =====================================================
  // UI STATE TYPES
  // =====================================================

  /** Props for ChooseEncodingForm component. */
  export interface ChooseEncodingFormProps {
    currentEncoding: EncodingInfo;
    sampleText?: string;
    onConfirm: (encoding: EncodingInfo) => void;
    onCancel: () => void;
  }

  /** State for ChooseEncodingForm component. */
  export interface ChooseEncodingFormState {
    selectedEncoding: EncodingInfo;
    availableEncodings: EncodingInfo[];
    sampleText: string;
    decodedPreview: string;
    testResult: { success: boolean; message: string } | null;
    isTesting: boolean;
    canSubmit: boolean;
  }

  /** Result from ProjectNameForm. */
  export interface ProjectNameFormResult {
    fullName: string;
    shortName: string;
    copyright: string;
  }

  /** Result from LanguageSelectionForm. */
  export interface LanguageSelectionResult {
    languageId: string;
    languageName: string;
  }

  /** Props for ProjectNameForm component. */
  export interface ProjectNameFormProps {
    fullName: string;
    shortName: string;
    copyright: string;
    isNewProject: boolean;
    isRegistered: boolean;
    onConfirm: (result: ProjectNameFormResult) => void;
    onCancel: () => void;
  }

  /** Props for LanguageSelectionForm component. */
  export interface LanguageSelectionFormProps {
    currentLanguageId?: string;
    projectName?: string;
    isNewLanguage: boolean;
    isRegistered: boolean;
    onConfirm: (result: LanguageSelectionResult) => void;
    onCancel: () => void;
  }

  /** Props for RegistrationSelectionControl component. */
  export interface RegistrationControlProps {
    projectType: ProjectType | null;
    baseProject: ProjectReference | null;
    isNewProject: boolean;
    projectGuid: string | null;
    currentRegistration: RegistrationInfo | null;
    onRegisterOnline?: () => void;
    onManageRegistration?: () => void;
    onOfflineConfirmChange?: (confirmed: boolean) => void;
  }

  /** Display state for registration control. */
  export type RegistrationDisplayState =
    | 'NotSelected'
    | 'InheritsRegistered'
    | 'InheritsUnregistered'
    | 'NotRegisteredType'
    | 'Registered'
    | 'CanRegister'
    | 'OfflineMigration';
}

declare module 'papi-shared-types' {
  // eslint-disable-next-line import/no-self-import
  import type {
    ProjectType,
    ProjectTypeConfiguration,
    ValidationResult,
    ProjectReference,
    RegistrationState,
    LanguageSelection,
    CreateProjectRequest,
    CreateProjectResult,
    EncodingInfo,
  } from 'paratext-project-creation';

  export interface CommandHandlers {
    /**
     * Gets the configuration for a project type.
     *
     * @param projectType The project type to configure
     * @returns Configuration with all type-specific settings
     */
    'paratextProjectCreation.getTypeConfiguration': (
      projectType: ProjectType,
    ) => Promise<ProjectTypeConfiguration>;

    /**
     * Determines if a candidate project can be used as base for the creating type.
     *
     * @param creatingType Type of project being created
     * @param candidateGuid GUID of candidate base project
     * @returns True if candidate can be used as base
     */
    'paratextProjectCreation.canBeBasedOnType': (
      creatingType: ProjectType,
      candidateGuid: string,
    ) => Promise<boolean>;

    /**
     * Gets all projects that can be used as base for a given type.
     *
     * @param creatingType Type of project being created
     * @returns List of valid base projects
     */
    'paratextProjectCreation.getValidBaseProjects': (
      creatingType: ProjectType,
    ) => Promise<ProjectReference[]>;

    /**
     * Validates a project short name against all naming rules.
     *
     * @param shortName Proposed short name
     * @param isNewProject True if creating new project
     * @param originalName Original name if editing existing project
     * @returns Validation result with error code if invalid
     */
    'paratextProjectCreation.validateShortName': (
      shortName: string,
      isNewProject: boolean,
      originalName?: string,
    ) => Promise<ValidationResult>;

    /**
     * Generates a short name from a full name.
     *
     * @param fullName The full project name
     * @returns Generated short name (3-8 characters)
     */
    'paratextProjectCreation.generateShortName': (fullName: string) => Promise<string>;

    /**
     * Generates a unique project name by appending numbers if needed.
     *
     * @param baseShortName Starting short name
     * @param baseLongName Starting long name
     * @param forceNumbered Always append number even if base is unique
     * @returns Unique short name and long name
     */
    'paratextProjectCreation.generateUniqueName': (
      baseShortName: string,
      baseLongName: string,
      forceNumbered?: boolean,
    ) => Promise<{ shortName: string; longName: string }>;

    /**
     * Determines the registration state for a project.
     *
     * @param projectGuid Project GUID (null for new projects)
     * @param baseProjectGuid Base project GUID (if derived type)
     * @param projectType Current/selected project type
     * @returns Registration state with available actions
     */
    'paratextProjectCreation.getRegistrationState': (
      projectGuid: string | undefined,
      baseProjectGuid: string | undefined,
      projectType: ProjectType,
    ) => Promise<RegistrationState>;

    /**
     * Validates language selection including name uniqueness.
     *
     * @param languageId Selected language ID (BCP-47 tag)
     * @param languageName User-specified language name
     * @param initialLanguageName Original name (for edit mode)
     * @returns Validation result
     */
    'paratextProjectCreation.validateLanguage': (
      languageId: string,
      languageName: string,
      initialLanguageName?: string,
    ) => Promise<ValidationResult>;

    /**
     * Gets all available languages from the language database.
     *
     * @param searchQuery Optional search filter
     * @returns List of available languages
     */
    'paratextProjectCreation.getAvailableLanguages': (
      searchQuery?: string,
    ) => Promise<LanguageSelection[]>;

    /**
     * Gets all available encodings.
     *
     * @returns List of available encodings
     */
    'paratextProjectCreation.getAvailableEncodings': () => Promise<EncodingInfo[]>;

    /**
     * Tests encoding round-trip.
     *
     * @param encoding Encoding to test
     * @param text Sample text to test
     * @returns True if round-trip succeeds
     */
    'paratextProjectCreation.testEncodingRoundTrip': (
      encoding: EncodingInfo,
      text: string,
    ) => Promise<{ success: boolean; message: string }>;

    /**
     * Creates a new project with the specified settings.
     *
     * @param request Project creation request
     * @returns Result with project GUID if successful
     */
    'paratextProjectCreation.createProject': (
      request: CreateProjectRequest,
    ) => Promise<CreateProjectResult>;

    /**
     * Cleans up a partially created project.
     *
     * @param projectGuid Project to clean up
     * @param wasRegistered Whether the project was registered
     * @returns Void
     */
    'paratextProjectCreation.cleanupProject': (
      projectGuid: string,
      wasRegistered: boolean,
    ) => Promise<void>;

    /**
     * Opens the new project dialog.
     *
     * @returns The web view ID if opened successfully
     */
    'paratextProjectCreation.showNewProject': () => Promise<string | undefined>;

    /**
     * Opens the project properties dialog for an existing project.
     *
     * @param projectGuid The GUID of the project to edit
     * @returns The web view ID if opened successfully
     */
    'paratextProjectCreation.showProjectProperties': (
      projectGuid: string,
    ) => Promise<string | undefined>;
  }
}
