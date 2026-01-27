import { useMemo } from 'react';
import { Badge, Button, Checkbox, Label, cn } from 'platform-bible-react';
import { ExternalLink } from 'lucide-react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/**
 * Project type classification. Maps to ParatextData.ProjectType. Note: This is a subset of the full
 * ProjectType enum, including only types relevant for registration logic.
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
  | 'Resource'
  | 'XmlResource'
  | 'XmlDictionary';

/** Project visibility in registry. Determines how the project appears in the Paratext Registry. */
export type ProjectVisibility = 'Test' | 'Confidential' | 'Public';

/** Registration information returned from the Paratext Registry server. */
export interface RegistrationInfo {
  /** Unique identifier in the registry */
  registryId: string;
  /** Project visibility setting */
  visibility: ProjectVisibility;
  /** License name associated with the project */
  licenseName: string;
}

/** Reference to a project (simplified for registration context). */
export interface ProjectReference {
  /** Project GUID */
  guid: string;
  /** Short project name */
  shortName: string;
  /** Full project name */
  fullName: string;
  /** Whether the project is registered */
  isRegistered: boolean;
}

/**
 * Registration display state machine states. Determines which UI elements are shown in the
 * RegistrationSelectionControl.
 *
 * @remarks
 * State definitions:
 *
 * - `NotSelected`: Project type not yet chosen - show informational message
 * - `InheritsRegistered`: Type inherits from registered base - show inherited status
 * - `InheritsUnregistered`: Type inherits from unregistered base - show inherited status
 * - `NotRegisteredType`: Type that is never registered (ConsultantNotes) - show info
 * - `Registered`: Project has valid registration - show status and manage link
 * - `CanRegister`: Can register online - show Register button
 * - `OfflineMigration`: No internet - show offline migration checkbox
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
// PROPS AND STATE INTERFACES
// =====================================================

/**
 * Props passed to RegistrationSelectionControl. Based on ui-state-contracts.md
 * RegistrationControlProps interface.
 */
export interface RegistrationControlProps {
  /** Currently selected project type (undefined if not selected) */
  projectType?: ProjectType;
  /** Selected base project (for derived types) */
  baseProject?: ProjectReference;
  /** Whether this is a new project or editing existing (reserved for backend) */
  // eslint-disable-next-line react/no-unused-prop-types
  isNewProject: boolean;
  /** Project GUID (undefined for new projects, reserved for backend) */
  // eslint-disable-next-line react/no-unused-prop-types
  projectGuid?: string;
  /** Current registration info (if already registered) */
  currentRegistration?: RegistrationInfo;
  /** Whether the registry server is available */
  registryServerAvailable?: boolean;
  /** Whether internet connection is available */
  internetAvailable?: boolean;
  /** Callback when Register button is clicked */
  onRegisterClick?: () => void;
  /** Callback when Manage Registration link is clicked */
  onManageClick?: () => void;
  /** Callback when offline migration checkbox changes */
  onOfflineConfirmChange?: (confirmed: boolean) => void;
  /** Current offline migration confirmation state */
  offlineConfirmed?: boolean;
  /** Optional CSS class name for styling */
  className?: string;
  /** Localized strings for status messages */
  localizedStrings?: RegistrationLocalizedStrings;
}

/** Localized strings for the RegistrationSelectionControl component. */
export interface RegistrationLocalizedStrings {
  /** Message when project type not selected */
  '%registration_not_selected%'?: string;
  /** Message when inherits from registered base */
  '%registration_inherits_registered%'?: string;
  /** Message when inherits from unregistered base */
  '%registration_inherits_unregistered%'?: string;
  /** Message when type is not registered (template with {projectType}) */
  '%registration_not_registered_type%'?: string;
  /** Message when project is registered */
  '%registration_registered%'?: string;
  /** Button text for Register online */
  '%registration_register_online%'?: string;
  /** Link text for Manage registration */
  '%registration_manage%'?: string;
  /** Checkbox label for offline migration */
  '%registration_offline_migration%'?: string;
  /** Label for Test visibility */
  '%registration_visibility_test%'?: string;
  /** Label for Confidential visibility */
  '%registration_visibility_confidential%'?: string;
}

/** Keys for localizing registration control components. */
export const REGISTRATION_STRING_KEYS = Object.freeze([
  '%registration_not_selected%',
  '%registration_inherits_registered%',
  '%registration_inherits_unregistered%',
  '%registration_not_registered_type%',
  '%registration_registered%',
  '%registration_register_online%',
  '%registration_manage%',
  '%registration_offline_migration%',
  '%registration_visibility_test%',
  '%registration_visibility_confidential%',
] as const);

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Project types that share registration/license with their parent project. These types inherit
 * their registration status from the base project they are derived from.
 *
 * Maps to ProjectType.SharesProjectLicenseWithParent() in ParatextData.
 */
const TYPES_SHARING_PARENT_LICENSE: ProjectType[] = [
  'BackTranslation',
  'Auxiliary',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/**
 * Project types that require their own separate registration. These types must be independently
 * registered with the Paratext Registry.
 *
 * Maps to ProjectType.NeedOwnProjectLicense() in ParatextData.
 */
const TYPES_NEEDING_OWN_LICENSE: ProjectType[] = [
  'Standard',
  'Daughter',
  'StudyBibleAdditions',
  'XmlResource',
  'XmlDictionary',
];

/** Project types that are never registered with the Paratext Registry. */
const TYPES_NOT_REGISTERED: ProjectType[] = ['ConsultantNotes'];

/**
 * Checks if a project type shares registration with its parent project. This is used for derived
 * project types that inherit their registration status.
 *
 * @example SharesProjectLicenseWithParent('BackTranslation'); // true
 * sharesProjectLicenseWithParent('Standard'); // false
 *
 * @param projectType - The project type to check
 * @returns True if the type shares parent registration
 */
export function sharesProjectLicenseWithParent(projectType: ProjectType): boolean {
  return TYPES_SHARING_PARENT_LICENSE.includes(projectType);
}

/**
 * Checks if a project type needs its own registration. This is used to determine whether a project
 * must be independently registered.
 *
 * @example NeedOwnProjectLicense('Standard'); // true needOwnProjectLicense('BackTranslation'); //
 * false
 *
 * @param projectType - The project type to check
 * @returns True if the type requires its own registration
 */
export function needOwnProjectLicense(projectType: ProjectType): boolean {
  return TYPES_NEEDING_OWN_LICENSE.includes(projectType);
}

/**
 * Checks if a project type is never registered with the registry.
 *
 * @param projectType - The project type to check
 * @returns True if the type is never registered
 */
export function isNotRegisteredType(projectType: ProjectType): boolean {
  return TYPES_NOT_REGISTERED.includes(projectType);
}

/**
 * Determines the registration display state based on project properties. This is a pure function
 * implementing the registration state machine from BHV-031.
 *
 * @remarks
 * State determination rules by project type:
 *
 * | Type | State | Notes | | --- | --- | --- | | NotSelected/null | NotSelected | | |
 *
 * ConsultantNotes | NotRegisteredType | Never registered | | (any with registration) | Registered |
 * Already registered | | BackTranslation, Auxiliary, Transliteration* |
 * InheritsRegistered/Unregistered | Based on base project | | Standard, Daughter,
 * StudyBibleAdditions | CanRegister/OfflineMigration | Based on connectivity |
 * @param projectType - Currently selected project type
 * @param baseProject - Base project reference (for derived types)
 * @param currentRegistration - Current registration info (if registered)
 * @param registryServerAvailable - Whether registry server is reachable
 * @param internetAvailable - Whether internet connection is available
 * @returns The appropriate RegistrationDisplayState
 */
export function determineRegistrationState(
  projectType: ProjectType | undefined,
  baseProject: ProjectReference | undefined,
  currentRegistration: RegistrationInfo | undefined,
  registryServerAvailable: boolean = true,
  internetAvailable: boolean = true,
): RegistrationDisplayState {
  // No type selected yet
  if (!projectType || projectType === 'NotSelected') {
    return 'NotSelected';
  }

  // Type that is never registered
  if (isNotRegisteredType(projectType)) {
    return 'NotRegisteredType';
  }

  // Already registered
  if (currentRegistration) {
    return 'Registered';
  }

  // Derived type that inherits registration
  if (sharesProjectLicenseWithParent(projectType)) {
    if (baseProject?.isRegistered) {
      return 'InheritsRegistered';
    }
    return 'InheritsUnregistered';
  }

  // Requires own registration
  if (needOwnProjectLicense(projectType)) {
    if (registryServerAvailable && internetAvailable) {
      return 'CanRegister';
    }
    return 'OfflineMigration';
  }

  return 'NotSelected';
}

/**
 * Gets a human-readable display name for a project type. Used in status messages.
 *
 * @param projectType - The project type
 * @returns Display name for the type
 */
export function getProjectTypeDisplayName(projectType: ProjectType): string {
  const displayNames: Record<ProjectType, string> = {
    NotSelected: 'Not Selected',
    Standard: 'Standard Translation',
    BackTranslation: 'Back Translation',
    Daughter: 'Daughter Translation',
    TransliterationManual: 'Transliteration (Manual)',
    TransliterationWithEncoder: 'Transliteration (With Encoder)',
    StudyBibleAdditions: 'Study Bible Additions',
    Auxiliary: 'Auxiliary',
    ConsultantNotes: 'Consultant Notes',
    Resource: 'Resource',
    XmlResource: 'XML Resource',
    XmlDictionary: 'XML Dictionary',
  };
  return displayNames[projectType] || projectType;
}

// =====================================================
// STATUS MESSAGE GENERATION
// =====================================================

/**
 * Default status messages for each registration state. These can be overridden via localizedStrings
 * prop.
 */
const DEFAULT_STATUS_MESSAGES: Record<RegistrationDisplayState, string> = {
  NotSelected: 'Project type must be selected before registration.',
  InheritsRegistered:
    'Registered. This type of project inherits registration from its base project.',
  InheritsUnregistered:
    'Unregistered. This type of project inherits registration from its base project.',
  NotRegisteredType: '{projectType} projects are not registered with the Paratext Registry.',
  Registered: 'Registered.',
  CanRegister: '', // No message - just button
  OfflineMigration: '', // No message - just checkbox
};

/**
 * Gets the appropriate status message for a registration state.
 *
 * @param state - The registration display state
 * @param projectType - The project type (for template substitution)
 * @param localizedStrings - Optional localized strings
 * @returns The status message to display
 */
function getStatusMessage(
  state: RegistrationDisplayState,
  projectType: ProjectType | null,
  localizedStrings?: RegistrationLocalizedStrings,
): string {
  const localizationKeyMap: Record<RegistrationDisplayState, keyof RegistrationLocalizedStrings> = {
    NotSelected: '%registration_not_selected%',
    InheritsRegistered: '%registration_inherits_registered%',
    InheritsUnregistered: '%registration_inherits_unregistered%',
    NotRegisteredType: '%registration_not_registered_type%',
    Registered: '%registration_registered%',
    CanRegister: '%registration_register_online%',
    OfflineMigration: '%registration_offline_migration%',
  };

  const key = localizationKeyMap[state];
  let message = localizedStrings?.[key] ?? DEFAULT_STATUS_MESSAGES[state];

  // Substitute {projectType} placeholder
  if (projectType && message.includes('{projectType}')) {
    message = message.replace('{projectType}', getProjectTypeDisplayName(projectType));
  }

  return message;
}

/**
 * Gets the visibility label for a registered project. Returns null for Public visibility (no label
 * shown).
 *
 * @param visibility - The project visibility
 * @param localizedStrings - Optional localized strings
 * @returns The visibility label or null
 */
function getVisibilityLabel(
  visibility: ProjectVisibility,
  localizedStrings?: RegistrationLocalizedStrings,
): string | undefined {
  if (visibility === 'Public') {
    return undefined;
  }

  if (visibility === 'Test') {
    return localizedStrings?.['%registration_visibility_test%'] ?? '(Test)';
  }

  return localizedStrings?.['%registration_visibility_confidential%'] ?? '(Confidential)';
}

// =====================================================
// COMPONENT
// =====================================================

/**
 * Registration Selection Control component. Displays registration status and provides appropriate
 * actions based on project type and current state. This component implements the registration state
 * machine from BHV-031.
 *
 * @remarks
 * This component is embedded in the General tab of the ProjectPropertiesForm. It displays different
 * content based on the registration state:
 *
 * - **NotSelected**: Informational message
 * - **InheritsRegistered/InheritsUnregistered**: Status message about inheritance
 * - **NotRegisteredType**: Message that type is not registered
 * - **Registered**: Status message + visibility badge + manage link
 * - **CanRegister**: Register button
 * - **OfflineMigration**: Offline migration checkbox
 *
 * @example
 *
 * ```tsx
 * <RegistrationSelectionControl
 *   projectType="Standard"
 *   baseProject={null}
 *   isNewProject={true}
 *   projectGuid={null}
 *   currentRegistration={null}
 *   registryServerAvailable={true}
 *   internetAvailable={true}
 *   onRegisterClick={() => handleRegister()}
 * />
 * ```;
 * ```
 */
export function RegistrationSelectionControl({
  projectType,
  baseProject,
  // Note: isNewProject and projectGuid are in props for future backend integration
  currentRegistration,
  registryServerAvailable = true,
  internetAvailable = true,
  onRegisterClick,
  onManageClick,
  onOfflineConfirmChange,
  offlineConfirmed = false,
  className,
  localizedStrings,
}: RegistrationControlProps) {
  // Determine the registration state
  const registrationState = useMemo(
    () =>
      determineRegistrationState(
        projectType,
        baseProject,
        currentRegistration,
        registryServerAvailable,
        internetAvailable,
      ),
    [projectType, baseProject, currentRegistration, registryServerAvailable, internetAvailable],
  );

  // Get status message
  const statusMessage = useMemo(
    () => getStatusMessage(registrationState, projectType ?? null, localizedStrings),
    [registrationState, projectType, localizedStrings],
  );

  // Get visibility label for registered projects
  const visibilityLabel = useMemo(() => {
    if (registrationState !== 'Registered' || !currentRegistration) {
      return undefined;
    }
    return getVisibilityLabel(currentRegistration.visibility, localizedStrings);
  }, [registrationState, currentRegistration, localizedStrings]);

  // Button/link text
  const registerButtonText =
    localizedStrings?.['%registration_register_online%'] ?? 'Register online...';
  const manageLinkText = localizedStrings?.['%registration_manage%'] ?? 'Manage registration...';
  const offlineCheckboxText =
    localizedStrings?.['%registration_offline_migration%'] ??
    'I do not have access to the Internet, but I want to migrate the project now. (I will register later...)';

  // Handle Register button click
  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    }
  };

  // Handle Manage link click
  const handleManageClick = () => {
    if (onManageClick) {
      onManageClick();
    }
  };

  // Handle offline checkbox change
  const handleOfflineChange = (checked: boolean) => {
    if (onOfflineConfirmChange) {
      onOfflineConfirmChange(checked);
    }
  };

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      {/* NotSelected State */}
      {registrationState === 'NotSelected' && (
        <Label className="tw-text-muted-foreground">{statusMessage}</Label>
      )}

      {/* InheritsRegistered State */}
      {registrationState === 'InheritsRegistered' && (
        <Label className="tw-text-foreground">{statusMessage}</Label>
      )}

      {/* InheritsUnregistered State */}
      {registrationState === 'InheritsUnregistered' && (
        <Label className="tw-text-muted-foreground">{statusMessage}</Label>
      )}

      {/* NotRegisteredType State */}
      {registrationState === 'NotRegisteredType' && (
        <Label className="tw-text-muted-foreground">{statusMessage}</Label>
      )}

      {/* Registered State */}
      {registrationState === 'Registered' && (
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
          <Label className="tw-text-foreground">{statusMessage}</Label>
          {visibilityLabel && (
            <Badge variant="secondary" className="tw-text-xs">
              {visibilityLabel}
            </Badge>
          )}
          <Button
            variant="link"
            size="sm"
            className="tw-h-auto tw-p-0 tw-text-sm"
            onClick={handleManageClick}
          >
            {manageLinkText}
            <ExternalLink className="tw-ml-1 tw-h-3 tw-w-3" />
          </Button>
        </div>
      )}

      {/* CanRegister State */}
      {registrationState === 'CanRegister' && (
        <Button variant="default" size="sm" onClick={handleRegisterClick} className="tw-w-fit">
          {registerButtonText}
          <ExternalLink className="tw-ml-1 tw-h-4 tw-w-4" />
        </Button>
      )}

      {/* OfflineMigration State */}
      {registrationState === 'OfflineMigration' && (
        <div className="tw-flex tw-items-start tw-gap-2">
          <Checkbox
            id="offline-migration"
            checked={offlineConfirmed}
            onCheckedChange={(checked) => handleOfflineChange(checked === true)}
            aria-describedby="offline-migration-label"
          />
          <Label
            htmlFor="offline-migration"
            id="offline-migration-label"
            className="tw-text-sm tw-font-normal tw-leading-normal tw-cursor-pointer"
          >
            {offlineCheckboxText}
          </Label>
        </div>
      )}
    </div>
  );
}

export default RegistrationSelectionControl;
