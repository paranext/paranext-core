/**
 * Type definitions for project creation and project properties functionality. These types support
 * the Project Properties Form and related dialogs.
 */

// =====================================================
// ENUMERATIONS
// =====================================================

/**
 * Project type classification. Maps to ParatextData/ProjectType.cs. Controls which features are
 * available and validation rules applied.
 */
export type ProjectType =
  | 'NotSelected'
  | 'Standard'
  | 'BackTranslation'
  | 'Daughter'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'StudyBibleAdditions'
  | 'Auxiliary'
  | 'ConsultantNotes'
  | 'GlobalConsultantNotes'
  | 'GlobalAnthropologyNotes'
  | 'StudyBible'
  | 'Resource'
  | 'XmlResource'
  | 'SourceLanguage';

/**
 * Standard versification schemes. Maps to SIL.Scripture versification types. Determines chapter and
 * verse structure for the project.
 */
export type VersificationType =
  | 'Original'
  | 'Septuagint'
  | 'Vulgate'
  | 'English'
  | 'RussianOrthodox'
  | 'RussianProtestant';

/** Unicode normalization form. Maps to ProjectSettings.NormalizationForm. */
export type NormalizationForm = 'NFC' | 'NFD' | 'Undefined';

/** FLEx integration mode for lexical project associations. */
export type FlexUsageType = 'ParatextLexicon' | 'LexicalProject' | 'Both';

/** Project visibility in the Paratext Registry. */
export type ProjectVisibility = 'Test' | 'Confidential' | 'Public';

/**
 * Registration display state machine states. Determines which UI elements are shown in the
 * RegistrationSelectionControl.
 */
export type RegistrationDisplayState =
  | 'NotSelected'
  | 'InheritsRegistered'
  | 'InheritsUnregistered'
  | 'NotRegisteredType'
  | 'Registered'
  | 'CanRegister'
  | 'OfflineMigration';

// =====================================================
// COMMON DATA TYPES
// =====================================================

/** Reference to a project for use in dropdowns and selection controls. */
export interface ProjectReference {
  /** Unique project identifier (GUID) */
  guid: string;
  /** Short project name (3-8 characters) */
  shortName: string;
  /** Full descriptive project name */
  fullName: string;
  /** Versification scheme used by the project */
  versification: VersificationType;
  /** Project type classification */
  projectType: ProjectType;
  /** Whether this is a Scripture project */
  isScripture: boolean;
  /** Whether this is a resource project */
  isResource: boolean;
  /** Whether the project is registered with the Paratext Registry */
  isRegistered: boolean;
}

/** Language information from SIL database for language selection. */
export interface LanguageInfo {
  /** ISO 639-3 language code */
  code: string;
  /** Primary language name */
  name: string;
  /** Alternative names for search matching */
  altNames: string[];
  /** Common scripts (ISO 15924 codes) */
  scripts: string[];
  /** Common regions (ISO 3166-1 codes) */
  regions: string[];
}

/** Selected language with assembled BCP-47 components. */
export interface LanguageSelection {
  /** Full BCP-47 language tag (e.g., "eng-Latn-US") */
  languageId: string;
  /** Localized display name for the language */
  languageName: string;
  /** Base ISO 639-3 code */
  baseCode: string;
  /** Optional script subtag (ISO 15924) */
  script?: string;
  /** Optional region subtag (ISO 3166-1) */
  region?: string;
  /** Optional variant subtag */
  variant?: string;
}

/** Information about a text encoding. */
export interface EncodingInfo {
  /** Code page number (e.g., 65001 for UTF-8) */
  codePage: number;
  /** Internal encoding name (e.g., "UTF-8") */
  name: string;
  /** Localized display name for UI */
  displayName: string;
}

/** Registration information from the Paratext Registry. */
export interface RegistrationInfo {
  /** Unique registry identifier */
  registryId: string;
  /** Project visibility setting */
  visibility: ProjectVisibility;
  /** License name associated with the project */
  licenseName: string;
}

/** Note tag configuration for project notes. */
export interface NoteTag {
  /** Unique identifier for the tag */
  id: string;
  /** Icon identifier for display */
  icon: string;
  /** Display name for the tag */
  name: string;
  /** Whether the note creator can resolve notes with this tag */
  creatorResolve: boolean;
  /** Default template text for notes with this tag */
  template: string;
  /** Whether this is the built-in default tag (cannot be deleted) */
  isDefault: boolean;
}

/** Study Bible category configuration. */
export interface StudyBibleCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display name for the category */
  name: string;
  /** Whether content appears in sidebars */
  showInSidebars: boolean;
  /** Whether content appears in footnotes */
  showInFootnotes: boolean;
}

/** Validation error with field association. */
export interface ValidationError {
  /** Field identifier that this error applies to */
  field: string;
  /** Validation rule ID (e.g., 'VAL-001') */
  ruleId: string;
  /** Localization message key */
  messageKey: string;
  /** Optional parameters for message templating */
  messageParams?: Record<string, string>;
}

// =====================================================
// DROPDOWN OPTION TYPES
// =====================================================

/** Generic dropdown option for select controls. */
export interface SelectOption<T = string> {
  /** Option value */
  value: T;
  /** Display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/** Language dropdown option with additional metadata. */
export interface LanguageOption extends SelectOption<string> {
  /** Full language info for tooltip/details */
  languageInfo: LanguageInfo;
}

/** Project type dropdown option with constraint flags. */
export interface ProjectTypeOption extends SelectOption<ProjectType> {
  /** Whether this type requires a base project */
  requiresBase: boolean;
  /** Whether this type requires registration */
  requiresRegistration: boolean;
}

/** Script dropdown option (ISO 15924). */
export interface ScriptOption {
  /** 4-letter script code */
  code: string;
  /** Display name */
  name: string;
}

/** Region dropdown option (ISO 3166-1). */
export interface RegionOption {
  /** 2-letter region code */
  code: string;
  /** Display name */
  name: string;
}

/** Variant dropdown option. */
export interface VariantOption {
  /** Variant code */
  code: string;
  /** Display name */
  name: string;
  /** Whether this is a user-defined variant */
  isCustom: boolean;
}

// =====================================================
// PROJECT PROPERTIES FORM TYPES
// =====================================================

/** Props passed to ProjectPropertiesForm component. */
export interface ProjectPropertiesFormProps {
  /** Form mode: 'new' for creating, 'edit' for modifying existing project */
  mode: 'new' | 'edit';
  /** Project ID (required for edit mode) */
  projectId?: string;
  /** Pre-selected project type (e.g., from Interlinear setup) */
  initialType?: ProjectType;
  /** Whether to disable the "Based on" field (PTX-23025: for output projects) */
  disableBasedOn?: boolean;
  /** Callback when form is submitted successfully */
  onSubmit?: (result: ProjectPropertiesFormResult) => void;
  /** Callback when form is cancelled */
  onCancel?: () => void;
}

/** Internal state of the ProjectPropertiesForm. */
export interface ProjectPropertiesFormState {
  // === Mode ===
  /** Form mode */
  mode: 'new' | 'edit';
  /** Project ID (for edit mode) */
  projectId?: string;

  // === Tab State ===
  /** Currently active tab index */
  activeTab: number;

  // === General Tab: Project Name Section ===
  /** Full descriptive project name */
  fullName: string;
  /** Short project name (3-8 characters) */
  shortName: string;
  /** Copyright notice */
  copyright: string;

  // === General Tab: Language Section ===
  /** Full BCP-47 language identifier */
  languageId: string;
  /** Display name for the language */
  languageName: string;
  /** Available languages for dropdown */
  availableLanguages: LanguageOption[];

  // === General Tab: Versification ===
  /** Selected versification scheme */
  versification: VersificationType;
  /** Whether project has custom.vrs file */
  hasCustomVersification: boolean;

  // === General Tab: Project Type ===
  /** Selected project type */
  projectType: ProjectType;
  /** Available project types for dropdown */
  availableProjectTypes: ProjectTypeOption[];

  // === General Tab: Base Project ===
  /** GUID of selected base project (for derived types) */
  baseProjectGuid: string | null;
  /** Display name of base project */
  baseProjectName: string | null;
  /** Available base projects for dropdown (filtered by type rules) */
  availableBaseProjects: ProjectReference[];

  // === General Tab: Registration ===
  /** Current registration state for display */
  registrationState: RegistrationDisplayState;
  /** Registration info if already registered */
  registrationInfo: RegistrationInfo | null;
  /** Whether derived project can be registered separately */
  allowDerivedProjectRegistration: boolean;

  // === General Tab: Transliteration (conditional) ===
  /** Selected encoding converter (for TransliterationWithEncoder) */
  encodingConverter: string | null;
  /** Whether to apply encoder in reverse direction */
  encoderReverseDirection: boolean;
  /** Available encoding converters */
  availableEncoders: EncodingInfo[];

  // === General Tab: Info ===
  /** Minimum Paratext version required */
  minParatextVersion: string;

  // === Books Tab ===
  /** Set of planned book codes */
  plannedBooks: string[];

  // === Associations Tab ===
  /** Associated FLEx lexical project name */
  associatedLexicalProject: string | null;
  /** FLEx integration mode */
  flexIntegration: FlexUsageType;
  /** Biblical terms list name */
  biblicalTermsList: string;
  /** Whether to match renderings based on stems */
  matchBasedOnStems: boolean;

  // === Notes Tab ===
  /** Configured note tags */
  noteTags: NoteTag[];

  // === Advanced Tab ===
  /** File naming: prefix part */
  fileNamePrePart: string;
  /** File naming: form part */
  fileNameForm: string;
  /** File naming: suffix part */
  fileNamePostPart: string;
  /** Derived typical filename */
  typicalFileName: string;
  /** Stylesheet name */
  stylesheetName: string;
  /** Whether project has custom stylesheet */
  hasCustomStylesheet: boolean;
  /** Text encoding */
  encoding: EncodingInfo;
  /** Unicode normalization form */
  normalizationForm: NormalizationForm;
  /** USFM version */
  usfmVersion: 2 | 3;
  /** Whether project is editable */
  editable: boolean;
  /** Whether to allow invisible characters */
  allowInvisibleChars: boolean;
  /** Whether to allow read access to non-publishable resources */
  allowReadAccess: boolean;
  /** Whether to share with SIL Locale Data Repository */
  allowSharingWithSLDR: boolean;

  // === Study Bible Tab (conditional) ===
  /** Whether base project footnotes can be hidden */
  allowHidingOfBaseFootnotes: boolean;
  /** Whether to place callers to left of selection */
  placeCallerToLeftOfSelection: boolean;
  /** Study Bible categories */
  categories: StudyBibleCategory[];

  // === Validation State ===
  /** Map of field to validation error */
  validationErrors: Map<string, ValidationError>;
  /** Set of fields that have been modified */
  dirtyFields: Set<string>;
  /** Whether form can be submitted */
  canSubmit: boolean;

  // === Derived State ===
  /** Whether this is a resource project type */
  isResourceProject: boolean;
  /** Whether project type requires a base project */
  isDerivedType: boolean;
  /** Whether to show Study Bible tab */
  showStudyBibleTab: boolean;
  /** Whether to show Books tab */
  showBooksTab: boolean;
  /** Whether to show encoding fields */
  showEncodingFields: boolean;
  /** Whether "Based on" field is disabled */
  basedOnDisabled: boolean;
}

/** Result returned when ProjectPropertiesForm is submitted. */
export interface ProjectPropertiesFormResult {
  /** Created or modified project ID */
  projectId: string;
  /** Short project name */
  shortName: string;
  /** Whether a new project was created */
  created: boolean;
}

// =====================================================
// SUB-DIALOG TYPES
// =====================================================

/** State for managing which sub-dialog is currently open. */
export interface SubDialogState {
  /** Which dialog is open (null if none) */
  openDialog: 'projectName' | 'languageSelection' | 'chooseEncoding' | null;
}

// =====================================================
// LOCALIZED STRINGS
// =====================================================

/** Localized strings for the ProjectPropertiesForm component. */
export interface ProjectPropertiesFormLocalizedStrings {
  // Dialog
  '%project_properties_title_new%'?: string;
  '%project_properties_title_edit%'?: string;
  '%project_properties_ok%'?: string;
  '%project_properties_cancel%'?: string;

  // Tab names
  '%project_properties_tab_general%'?: string;
  '%project_properties_tab_books%'?: string;
  '%project_properties_tab_associations%'?: string;
  '%project_properties_tab_notes%'?: string;
  '%project_properties_tab_advanced%'?: string;
  '%project_properties_tab_study_bible%'?: string;

  // General tab - Project Name section
  '%project_properties_group_project_name%'?: string;
  '%project_properties_full_name%'?: string;
  '%project_properties_short_name%'?: string;
  '%project_properties_copyright%'?: string;
  '%project_properties_edit%'?: string;

  // General tab - Language section
  '%project_properties_group_language%'?: string;
  '%project_properties_language%'?: string;
  '%project_properties_new_language%'?: string;
  '%project_properties_language_settings%'?: string;

  // General tab - Other fields
  '%project_properties_versification%'?: string;
  '%project_properties_versification_customized%'?: string;
  '%project_properties_project_type%'?: string;
  '%project_properties_based_on%'?: string;
  '%project_properties_open_base%'?: string;

  // General tab - Registration section
  '%project_properties_group_registration%'?: string;
  '%project_properties_allow_derived_registration%'?: string;

  // General tab - Transliteration section
  '%project_properties_sil_encoding%'?: string;
  '%project_properties_encoder_reverse%'?: string;

  // General tab - Info
  '%project_properties_min_version%'?: string;

  // Books tab
  '%project_properties_books_instruction%'?: string;
  '%project_properties_books_not_needed%'?: string;

  // Associations tab
  '%project_properties_associated_lexical%'?: string;
  '%project_properties_choose%'?: string;
  '%project_properties_flex_usage%'?: string;
  '%project_properties_biblical_terms%'?: string;
  '%project_properties_match_stems%'?: string;
  '%project_properties_match_stems_help%'?: string;

  // Advanced tab
  '%project_properties_file_name%'?: string;
  '%project_properties_stylesheet%'?: string;
  '%project_properties_stylesheet_customized%'?: string;
  '%project_properties_encoding%'?: string;
  '%project_properties_normalization%'?: string;
  '%project_properties_usfm_version%'?: string;
  '%project_properties_editable%'?: string;
  '%project_properties_allow_whitespace%'?: string;
  '%project_properties_allow_read_access%'?: string;
  '%project_properties_share_sldr%'?: string;
  '%project_properties_why_share%'?: string;

  // Study Bible tab
  '%project_properties_allow_hiding_footnotes%'?: string;
  '%project_properties_callers_left%'?: string;
  '%project_properties_categories%'?: string;

  // Project types
  '%project_type_not_selected%'?: string;
  '%project_type_standard%'?: string;
  '%project_type_back_translation%'?: string;
  '%project_type_daughter%'?: string;
  '%project_type_transliteration_manual%'?: string;
  '%project_type_transliteration_encoder%'?: string;
  '%project_type_study_bible_additions%'?: string;
  '%project_type_auxiliary%'?: string;
  '%project_type_consultant_notes%'?: string;

  // Versification types
  '%versification_original%'?: string;
  '%versification_septuagint%'?: string;
  '%versification_vulgate%'?: string;
  '%versification_english%'?: string;
  '%versification_russian_orthodox%'?: string;
  '%versification_russian_protestant%'?: string;

  // FLEx usage types
  '%flex_usage_paratext_lexicon%'?: string;
  '%flex_usage_lexical_project%'?: string;
  '%flex_usage_both%'?: string;

  // Normalization types
  '%normalization_nfc%'?: string;
  '%normalization_nfd%'?: string;
  '%normalization_off%'?: string;
}

/** Keys for localizing project properties form components. */
export type ProjectPropertiesFormStringKey =
  | '%project_properties_title_new%'
  | '%project_properties_title_edit%'
  | '%project_properties_ok%'
  | '%project_properties_cancel%'
  | '%project_properties_tab_general%'
  | '%project_properties_tab_books%'
  | '%project_properties_tab_associations%'
  | '%project_properties_tab_notes%'
  | '%project_properties_tab_advanced%'
  | '%project_properties_tab_study_bible%'
  | '%project_properties_group_project_name%'
  | '%project_properties_full_name%'
  | '%project_properties_short_name%'
  | '%project_properties_copyright%'
  | '%project_properties_edit%'
  | '%project_properties_group_language%'
  | '%project_properties_language%'
  | '%project_properties_new_language%'
  | '%project_properties_language_settings%'
  | '%project_properties_versification%'
  | '%project_properties_versification_customized%'
  | '%project_properties_project_type%'
  | '%project_properties_based_on%'
  | '%project_properties_open_base%'
  | '%project_properties_group_registration%'
  | '%project_properties_allow_derived_registration%'
  | '%project_properties_sil_encoding%'
  | '%project_properties_encoder_reverse%'
  | '%project_properties_min_version%'
  | '%project_properties_books_instruction%'
  | '%project_properties_books_not_needed%'
  | '%project_properties_associated_lexical%'
  | '%project_properties_choose%'
  | '%project_properties_flex_usage%'
  | '%project_properties_biblical_terms%'
  | '%project_properties_match_stems%'
  | '%project_properties_match_stems_help%'
  | '%project_properties_file_name%'
  | '%project_properties_stylesheet%'
  | '%project_properties_stylesheet_customized%'
  | '%project_properties_encoding%'
  | '%project_properties_normalization%'
  | '%project_properties_usfm_version%'
  | '%project_properties_editable%'
  | '%project_properties_allow_whitespace%'
  | '%project_properties_allow_read_access%'
  | '%project_properties_share_sldr%'
  | '%project_properties_why_share%'
  | '%project_properties_allow_hiding_footnotes%'
  | '%project_properties_callers_left%'
  | '%project_properties_categories%';

// =====================================================
// HELPER TYPE FUNCTIONS (for runtime use in .ts files)
// =====================================================

// Note: The following function definitions are for documentation.
// Actual implementations should be in a separate .ts file.

/**
 * Check if project type is derived (requires base project). Maps to ProjectType.IsDerivedType().
 *
 * @param type - The project type to check
 * @returns True if the type requires a base project
 */
export function isDerivedType(type: ProjectType): boolean;

/**
 * Check if project type needs its own registration. Maps to ProjectType.NeedOwnProjectLicense().
 *
 * @param type - The project type to check
 * @returns True if the type requires its own registration
 */
export function needsOwnRegistration(type: ProjectType): boolean;

/**
 * Check if project type shares parent registration. Maps to
 * ProjectType.SharesProjectLicenseWithParent().
 *
 * @param type - The project type to check
 * @returns True if the type shares its parent's registration
 */
export function sharesParentRegistration(type: ProjectType): boolean;

/**
 * Check if project type is Scripture. Maps to ProjectType.IsScripture().
 *
 * @param type - The project type to check
 * @returns True if the type is a Scripture project
 */
export function isScriptureType(type: ProjectType): boolean;
