/**
 * Types for Interlinear Setup Form (UI-PKG-003) Based on ui-state-contracts.md and
 * ui-spec-interlinear-setup.md
 */

/** Task type enumeration for interlinear setups */
export type InterlinearTaskType =
  | 'Glossing'
  | 'GlossingWithoutModel'
  | 'BackTranslation'
  | 'Adaptation';

/** Validation error representation */
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Language option for dropdowns */
export interface LanguageOption {
  id: string;
  code: string;
  displayName: string;
  script?: string;
  region?: string;
  isRTL: boolean;
}

/** Project reference for dropdowns */
export interface ProjectOption {
  name: string;
  guid: string;
  displayName: string;
  isSeparator?: boolean;
}

/** User context shared across screens */
export interface UserContext {
  isRegistered: boolean;
  canRegisterProjects: boolean;
  isOnline: boolean;
  isGuest: boolean;
  isObserver: boolean;
}

/** Represents an existing interlinear setup item */
export interface InterlinearSetupItem {
  id: string;
  taskType: InterlinearTaskType;
  sourceProjectName: string;
  modelTextName?: string;
  modelTextCode?: string;
  outputProjectName?: string;
  languageId?: string;
  displayText: string;
}

/** Input state for Interlinear Setup form */
export interface InterlinearSetupInput {
  projectName: string;
  projectGuid: string;
  isRegistered: boolean;
  existingSetups: InterlinearSetupItem[];
  options: {
    availableProjects: ProjectOption[];
    availableLanguages: LanguageOption[];
  };
  userContext: UserContext;
}

/** Form state for Interlinear Setup form */
export interface InterlinearSetupFormState {
  // Selection state
  selectedSetup: InterlinearSetupItem | null;
  creatingNewTask: boolean;
  newTaskType: InterlinearTaskType | null;

  // Settings panel values
  modelText: string | null;
  relatedLanguages: boolean;
  destination: string | null;
  glossLanguage: string | null;
  outputGlosses: boolean;

  // UI state
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: ValidationError[];

  // Visibility flags (computed from task type)
  isSettingsPanelVisible: boolean;
  showModelText: boolean;
  showRelatedLanguages: boolean;
  showDestination: boolean;
  showGlossLanguage: boolean;
  showOutputGlosses: boolean;

  // Missing projects state
  missingProjects: string[];
  showMissingProjectsWarning: boolean;
}

/** Project type enumeration - matches PT9 ProjectType enum */
export type ProjectType =
  | 'Standard'
  | 'BackTranslation'
  | 'Daughter'
  | 'Auxiliary'
  | 'StudyBibleAdditions'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'ConsultantNotes';

/** Context for creating a new project from interlinear setup */
export interface InterlinearContext {
  sourceProjectName: string;
  sourceProjectGuid: string;
  taskType: InterlinearTaskType;
  presetProjectType: ProjectType;
  lockBasedOn: boolean;
}

/** Output state from Interlinear Setup form */
export interface InterlinearSetupOutput {
  action: 'open' | 'save' | 'cancel' | 'create-project';

  setupData?: {
    taskType: InterlinearTaskType;
    sourceProjectGuid: string;
    modelTextGuid?: string;
    outputProjectGuid?: string;
    languageId?: string;
    relatedLanguages?: boolean;
    outputGlosses?: boolean;
  };

  createProjectContext?: InterlinearContext;
}

/** Determines which settings are visible based on task type */
export interface TaskTypeVisibility {
  showModelText: boolean;
  showRelatedLanguages: boolean;
  showDestination: boolean;
  showGlossLanguage: boolean;
  showOutputGlosses: boolean;
}

/** Get visibility settings for a given task type */
export function getVisibilityForTaskType(
  taskType: InterlinearTaskType | undefined,
  outputGlosses: boolean,
): TaskTypeVisibility {
  if (!taskType) {
    return {
      showModelText: false,
      showRelatedLanguages: false,
      showDestination: false,
      showGlossLanguage: false,
      showOutputGlosses: false,
    };
  }

  switch (taskType) {
    case 'Glossing':
      return {
        showModelText: true,
        showRelatedLanguages: false,
        showDestination: outputGlosses,
        showGlossLanguage: false,
        showOutputGlosses: true,
      };
    case 'GlossingWithoutModel':
      return {
        showModelText: false,
        showRelatedLanguages: false,
        showDestination: outputGlosses,
        showGlossLanguage: true,
        showOutputGlosses: true,
      };
    case 'BackTranslation':
      return {
        showModelText: true,
        showRelatedLanguages: true,
        showDestination: true,
        showGlossLanguage: false,
        showOutputGlosses: false,
      };
    case 'Adaptation':
      return {
        showModelText: false,
        showRelatedLanguages: false,
        showDestination: true,
        showGlossLanguage: false,
        showOutputGlosses: false,
      };
    default:
      return {
        showModelText: false,
        showRelatedLanguages: false,
        showDestination: false,
        showGlossLanguage: false,
        showOutputGlosses: false,
      };
  }
}

/** Get default project type for interlinear task */
export function getDefaultProjectTypeForTask(taskType: InterlinearTaskType): ProjectType {
  switch (taskType) {
    case 'BackTranslation':
      return 'BackTranslation';
    case 'Adaptation':
      return 'Daughter';
    case 'Glossing':
    case 'GlossingWithoutModel':
      return 'Standard';
    default:
      return 'Standard';
  }
}

/** Get the destination field label based on task type */
export function getDestinationLabel(taskType: InterlinearTaskType | undefined): string {
  if (taskType === 'BackTranslation') {
    return 'Back translation:';
  }
  return 'Output:';
}

/** Get instruction text for a task type */
export function getInstructionText(taskType: InterlinearTaskType | undefined): string {
  switch (taskType) {
    case 'Glossing':
      return 'Create glosses using a model text to assist with translation.';
    case 'GlossingWithoutModel':
      return 'Create glosses manually without a reference model text.';
    case 'BackTranslation':
      return 'Create a back translation to help check translation accuracy.';
    case 'Adaptation':
      return 'Create an adaptation or revision based on this project.';
    default:
      return '';
  }
}
