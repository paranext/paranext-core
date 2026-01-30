/**
 * Types for Project Properties Dialog (UI-PKG-001) Based on ui-state-contracts.md and
 * ui-spec-project-properties.md
 */

// =============================================================================
// SHARED TYPES (re-exported from registration for consistency)
// =============================================================================

export type { ProjectType, UserContext } from '../hooks/use-registration-status';
export { needsOwnRegistration, inheritsRegistration } from '../hooks/use-registration-status';

// =============================================================================
// VALIDATION
// =============================================================================

/** Validation error representation */
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

// =============================================================================
// OPTION TYPES (for dropdowns)
// =============================================================================

/** Language option for dropdowns */
export interface LanguageOption {
  id: string;
  code: string;
  displayName: string;
  script?: string;
  region?: string;
  isRTL: boolean;
}

/** Versification option for dropdowns */
export interface VersificationOption {
  id: string;
  displayName: string;
  isCustomized: boolean;
}

/** Project reference for dropdowns */
export interface ProjectOption {
  name: string;
  guid: string;
  displayName: string;
  isSeparator?: boolean;
}

/** Biblical terms list option */
export interface BiblicalTermsListOption {
  id: string;
  displayName: string;
}

/** Encoding converter option */
export interface EncoderOption {
  id: string;
  displayName: string;
}

/** Encoding option */
export interface EncodingOption {
  id: string;
  displayName: string;
}

/** Normalization option */
export interface NormalizationOption {
  id: string;
  displayName: string;
}

/** FLEx usage option */
export interface FlexUsageOption {
  id: string;
  displayName: string;
}

/** Project type option for dropdown */
export interface ProjectTypeOption {
  value: string;
  label: string;
}

// =============================================================================
// COMMENT TAG
// =============================================================================

/** Comment tag configuration */
export interface CommentTag {
  icon: string;
  name: string;
  creatorResolve: boolean;
  template: string;
}

// =============================================================================
// STUDY BIBLE
// =============================================================================

/** Study Bible category */
export interface StudyBibleCategory {
  name: string;
  showInSidebars: boolean;
  showInFootnotes: boolean;
}

// =============================================================================
// INTERLINEAR CONTEXT (from ui-state-contracts.md)
// =============================================================================

/** Task type enumeration for interlinear setups */
export type InterlinearTaskType =
  | 'Glossing'
  | 'GlossingWithoutModel'
  | 'BackTranslation'
  | 'Adaptation';

/** Context for creating a new project from interlinear setup */
export interface InterlinearContext {
  sourceProjectName: string;
  sourceProjectGuid: string;
  taskType: InterlinearTaskType;
  presetProjectType: string;
  lockBasedOn: boolean;
}

// =============================================================================
// EXISTING PROJECT DATA (for edit mode)
// =============================================================================

/** Existing project data for edit mode */
export interface ExistingProjectData {
  shortName: string;
  fullName: string;
  copyright: string;
  languageId: string;
  versification: string;
  projectType: string;
  baseProjectName?: string;
  baseProjectGuid?: string;
  biblicalTermsListInfo?: string;
  matchBasedOnStems: boolean;
  booksPresentSet: string[];
  associatedLexicalProject?: string;
  flexIntegration?: string;
  commentTags: CommentTag[];
  fileNameForm: string;
  usfmVersion: string;
  stylesheet: string;
  isStylesheetCustomized: boolean;
  encoding: string;
  normalizationForm: string;
  editable: boolean;
  allowInvisibleChars: boolean;
  allowReadAccess: boolean;
  allowSharingWithSLDR: boolean;
  allowDerivedProjectRegistration: boolean;
  // Study Bible specific (SBA only)
  studyBibleCategories?: StudyBibleCategory[];
  allowHidingOfBaseFootnotes?: boolean;
  placeCallerToLeftOfSelection?: boolean;
}

// =============================================================================
// OPTIONS
// =============================================================================

/** Option lists for dropdowns */
export interface ProjectPropertiesOptions {
  languages: LanguageOption[];
  versifications: VersificationOption[];
  projectTypes: ProjectTypeOption[];
  availableBaseProjects: ProjectOption[];
  biblicalTermsLists: BiblicalTermsListOption[];
  encodingConverters: EncoderOption[];
  encodings: EncodingOption[];
  normalizations: NormalizationOption[];
  flexUsageModes: FlexUsageOption[];
}

// =============================================================================
// INPUT STATE
// =============================================================================

/** User context for project creation */
export interface ProjectUserContext {
  isRegistered: boolean;
  canRegisterProjects: boolean;
  isOnline: boolean;
  isGuest?: boolean;
  isObserver?: boolean;
}

/** Input state for Project Properties dialog */
export interface ProjectPropertiesInput {
  mode: 'create' | 'edit';
  existingProject?: ExistingProjectData;
  interlinearContext?: InterlinearContext;
  options: ProjectPropertiesOptions;
  userContext: ProjectUserContext;
}

// =============================================================================
// FORM STATE (internal state during editing)
// =============================================================================

/** Form state for Project Properties dialog */
export interface ProjectPropertiesFormState {
  // Active tab
  activeTab: number;

  // General tab values
  fullName: string;
  shortName: string;
  copyright: string;
  selectedLanguageId: string | undefined;
  selectedVersification: string | undefined;
  selectedProjectType: string | undefined;
  selectedBaseProject: string | undefined;
  biblicalTermsListInfo: string;
  matchBasedOnStems: boolean;
  encodingConverter: string | undefined;
  encoderReverseDirection: boolean;

  // Books tab values
  selectedBooks: string[];

  // Associations tab values
  associatedLexicalProject: string | undefined;
  flexUsage: string | undefined;

  // Notes tab values
  commentTags: CommentTag[];

  // Advanced tab values
  fileNamePattern: string;
  usfmVersion: string;
  normalization: string;
  silEncoding: string | undefined;
  editable: boolean;
  allowWhitespaceAndInvisible: boolean;
  sharingPermission: boolean;
  shareWithSldr: boolean;
  allowDerivedProjectRegistration: boolean;

  // Study Bible tab values (SBA only)
  studyBibleCategories: StudyBibleCategory[];
  allowHidingBaseNotes: boolean;
  placeCallersOnLeft: boolean;

  // UI state
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
  tabsWithErrors: number[];

  // Computed/derived state (recalculated on type change)
  isDerivedType: boolean;
  requiresOwnRegistration: boolean;
  isVersificationLocked: boolean;
  isBasedOnLocked: boolean;
  showEncodingConverter: boolean;
  showAdditionsTab: boolean;
  showStudyBibleTab: boolean;
}

// =============================================================================
// OUTPUT STATE
// =============================================================================

/** Output project data */
export interface ProjectData {
  shortName: string;
  fullName: string;
  copyright: string;
  languageId: string;
  versification: string;
  projectType: string;
  baseProjectName?: string;
  baseProjectGuid?: string;
  biblicalTermsListInfo: string;
  matchBasedOnStems: boolean;
  booksPresentSet: string[];
  associatedLexicalProject?: string;
  flexIntegration?: string;
  commentTags: CommentTag[];
  fileNameForm: string;
  usfmVersion: string;
  encoding: string;
  normalizationForm: string;
  editable: boolean;
  allowInvisibleChars: boolean;
  allowReadAccess: boolean;
  allowSharingWithSLDR: boolean;
  allowDerivedProjectRegistration: boolean;
  encodingConverter?: string;
  encoderReverseDirection?: boolean;
  studyBibleCategories?: StudyBibleCategory[];
  allowHidingOfBaseFootnotes?: boolean;
  placeCallerToLeftOfSelection?: boolean;
}

/** Output state from Project Properties dialog */
export interface ProjectPropertiesOutput {
  action: 'submit' | 'cancel';
  projectData?: ProjectData;
  promptForUsfmVersion?: boolean;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Derived project types that require a base project (BHV-101) */
const DERIVED_TYPES: string[] = [
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/** Check if project type is derived and requires a base project */
export function isDerivedProjectType(projectType: string | undefined): boolean {
  if (!projectType) return false;
  return DERIVED_TYPES.includes(projectType);
}

/** Check if project type shows encoding converter fields */
export function showsEncodingConverter(projectType: string | undefined): boolean {
  return projectType === 'TransliterationWithEncoder';
}

/** Check if project type shows Study Bible tabs */
export function showsStudyBibleTabs(projectType: string | undefined): boolean {
  return projectType === 'StudyBibleAdditions';
}

/** Tab indices */
export const TAB_INDICES = {
  GENERAL: 0,
  BOOKS: 1,
  ASSOCIATIONS: 2,
  NOTES: 3,
  ADVANCED: 4,
  ADDITIONS: 5,
  STUDY_BIBLE: 6,
} as const;

/** Tab names for display */
export const TAB_NAMES = [
  'General',
  'Books',
  'Associations',
  'Notes',
  'Advanced',
  'Additions',
  'Study Bible',
] as const;

/** Get visible tabs based on project type */
export function getVisibleTabs(projectType: string | undefined): number[] {
  const baseTabs = [
    TAB_INDICES.GENERAL,
    TAB_INDICES.BOOKS,
    TAB_INDICES.ASSOCIATIONS,
    TAB_INDICES.NOTES,
    TAB_INDICES.ADVANCED,
  ];

  if (showsStudyBibleTabs(projectType)) {
    return [...baseTabs, TAB_INDICES.ADDITIONS, TAB_INDICES.STUDY_BIBLE];
  }

  return baseTabs;
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/** Reserved Windows file names that cannot be used as short names */
const RESERVED_NAMES = [
  'CON',
  'PRN',
  'AUX',
  'NUL',
  'COM1',
  'COM2',
  'COM3',
  'COM4',
  'COM5',
  'COM6',
  'COM7',
  'COM8',
  'COM9',
  'LPT1',
  'LPT2',
  'LPT3',
  'LPT4',
  'LPT5',
  'LPT6',
  'LPT7',
  'LPT8',
  'LPT9',
];

/** Validate short name according to PT9 rules (BHV-201) */
export function validateShortName(name: string): { isValid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Short name is required' };
  }
  if (name.length < 3 || name.length > 8) {
    return { isValid: false, error: 'Short name must be 3-8 characters' };
  }
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { isValid: false, error: 'Short name must contain only letters and numbers' };
  }
  if (/\s/.test(name)) {
    return { isValid: false, error: 'Short name cannot contain spaces' };
  }
  if (RESERVED_NAMES.includes(name.toUpperCase())) {
    return { isValid: false, error: `'${name}' is a reserved Windows name` };
  }
  return { isValid: true };
}

/** Generate short name from full name (BHV-200) */
export function generateShortName(fullName: string): string {
  if (!fullName || fullName.trim().length === 0) {
    return '';
  }

  const words = fullName.trim().split(/\s+/);
  let abbrev = words.map((w) => w[0]?.toUpperCase() || '').join('');

  // Extract trailing digits from full name
  const digitMatch = fullName.match(/(\d{2})$/);
  if (digitMatch) {
    abbrev += digitMatch[1];
  }

  // Ensure minimum length of 3
  if (abbrev.length < 3 && words[0]) {
    abbrev = (words[0].substring(0, 3) + abbrev.substring(words[0].length)).toUpperCase();
  }

  // Ensure maximum length of 8
  if (abbrev.length > 8) {
    abbrev = abbrev.substring(0, 8);
  }

  return abbrev;
}
