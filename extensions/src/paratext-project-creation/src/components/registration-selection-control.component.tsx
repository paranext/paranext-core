import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { logger } from '@papi/frontend';
import { Button, Checkbox } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey, formatReplacementString } from 'platform-bible-utils';
import { ExternalLink } from 'lucide-react';
import type {
  RegistrationControlProps,
  RegistrationDisplayState,
  ProjectType,
} from 'paratext-project-creation';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_registration_notSelected%',
  '%projectCreation_registration_inheritsRegistered%',
  '%projectCreation_registration_inheritsUnregistered%',
  '%projectCreation_registration_notRegisteredType%',
  '%projectCreation_registration_registered%',
  '%projectCreation_registration_registerOnline%',
  '%projectCreation_registration_manageRegistration%',
  '%projectCreation_registration_offlineCheckbox%',
];

/** Project types that share license with parent */
const SHARES_LICENSE_TYPES: ProjectType[] = [
  'BackTranslation',
  'Auxiliary',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/** Project types that need their own license */
const NEEDS_OWN_LICENSE_TYPES: ProjectType[] = ['Standard', 'Daughter', 'StudyBibleAdditions'];

/** Project types that are never registered */
const NOT_REGISTERED_TYPES: ProjectType[] = ['ConsultantNotes'];

/** Determine if a project type shares license with parent */
function sharesProjectLicenseWithParent(projectType: ProjectType): boolean {
  return SHARES_LICENSE_TYPES.includes(projectType);
}

/** Determine if a project type needs its own license */
function needOwnProjectLicense(projectType: ProjectType): boolean {
  return NEEDS_OWN_LICENSE_TYPES.includes(projectType);
}

/** Determine registration display state */
function determineRegistrationState(
  projectType: ProjectType | null,
  baseProject: RegistrationControlProps['baseProject'],
  currentRegistration: RegistrationControlProps['currentRegistration'],
  registryServerAvailable: boolean,
  internetAvailable: boolean,
): RegistrationDisplayState {
  // No type selected yet
  if (!projectType || projectType === 'NotSelected') {
    return 'NotSelected';
  }

  // Type that is never registered
  if (NOT_REGISTERED_TYPES.includes(projectType)) {
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

/** Get status message for display state */
function getStatusMessage(
  state: RegistrationDisplayState,
  projectType: ProjectType | null,
  localizedStrings: Record<LocalizeKey, string>,
): string {
  switch (state) {
    case 'NotSelected':
      return localizedStrings['%projectCreation_registration_notSelected%'];
    case 'InheritsRegistered':
      return localizedStrings['%projectCreation_registration_inheritsRegistered%'];
    case 'InheritsUnregistered':
      return localizedStrings['%projectCreation_registration_inheritsUnregistered%'];
    case 'NotRegisteredType':
      return formatReplacementString(
        localizedStrings['%projectCreation_registration_notRegisteredType%'],
        { type: projectType || 'Unknown' },
      );
    case 'Registered':
      return localizedStrings['%projectCreation_registration_registered%'];
    case 'CanRegister':
    case 'OfflineMigration':
      return '';
    default:
      return '';
  }
}

/**
 * Registration Selection Control (CAP-UI-005)
 *
 * A composite control that displays the registration status of a project and provides appropriate
 * actions based on project type and current state. It handles the complex rules around which
 * project types require registration, which inherit from a base project, and which are never
 * registered.
 */
export function RegistrationSelectionControl({
  projectType,
  baseProject,
  currentRegistration,
  onRegisterOnline,
  onManageRegistration,
  onOfflineConfirmChange,
}: RegistrationControlProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // State
  const [offlineConfirmed, setOfflineConfirmed] = useState(false);
  const [registryServerAvailable, setRegistryServerAvailable] = useState(true);
  const [internetAvailable] = useState(true); // Assume internet is available for now

  // Check registry server availability
  useEffect(() => {
    const checkServer = async () => {
      try {
        // For now, assume the registry server is available
        // This would typically call a PAPI command to check
        setRegistryServerAvailable(true);
      } catch (error) {
        logger.warn(`Failed to check registry server: ${getErrorMessage(error)}`);
        setRegistryServerAvailable(false);
      }
    };

    checkServer();
  }, []);

  // Determine display state
  const displayState = useMemo(() => {
    return determineRegistrationState(
      projectType,
      baseProject,
      currentRegistration,
      registryServerAvailable,
      internetAvailable,
    );
  }, [projectType, baseProject, currentRegistration, registryServerAvailable, internetAvailable]);

  // Get status message
  const statusMessage = useMemo(() => {
    return getStatusMessage(displayState, projectType, localizedStrings);
  }, [displayState, projectType, localizedStrings]);

  // Get visibility label for registered projects
  const visibilityLabel = useMemo(() => {
    if (!currentRegistration) return null;

    switch (currentRegistration.visibility) {
      case 'Test':
        return '(Test)';
      case 'Confidential':
        return '(Confidential)';
      case 'Public':
      default:
        return null;
    }
  }, [currentRegistration]);

  // Handle register online click
  const handleRegisterOnline = useCallback(() => {
    if (onRegisterOnline) {
      onRegisterOnline();
    }
  }, [onRegisterOnline]);

  // Handle manage registration click
  const handleManageRegistration = useCallback(() => {
    if (onManageRegistration) {
      onManageRegistration();
    }
  }, [onManageRegistration]);

  // Handle offline checkbox change
  const handleOfflineChange = useCallback(
    (checked: boolean) => {
      setOfflineConfirmed(checked);
      if (onOfflineConfirmChange) {
        onOfflineConfirmChange(checked);
      }
    },
    [onOfflineConfirmChange],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-rounded-md tw-border tw-bg-muted/30 tw-p-4">
      {/* Status Message */}
      {statusMessage && (
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-text-sm">{statusMessage}</span>
          {visibilityLabel && (
            <span className="tw-text-sm tw-text-muted-foreground">{visibilityLabel}</span>
          )}
        </div>
      )}

      {/* Registered - Show manage link */}
      {displayState === 'Registered' && (
        <Button
          variant="link"
          onClick={handleManageRegistration}
          className="tw-h-auto tw-justify-start tw-p-0"
        >
          <ExternalLink className="tw-mr-2 tw-h-4 tw-w-4" />
          {localizedStrings['%projectCreation_registration_manageRegistration%']}
        </Button>
      )}

      {/* Can Register - Show register button */}
      {displayState === 'CanRegister' && (
        <Button variant="default" onClick={handleRegisterOnline} className="tw-w-fit">
          <ExternalLink className="tw-mr-2 tw-h-4 tw-w-4" />
          {localizedStrings['%projectCreation_registration_registerOnline%']}
        </Button>
      )}

      {/* Offline Migration - Show checkbox */}
      {displayState === 'OfflineMigration' && (
        <div className="tw-flex tw-items-start tw-gap-3">
          <Checkbox
            id="offline-confirm"
            checked={offlineConfirmed}
            onCheckedChange={handleOfflineChange}
          />
          <label
            htmlFor="offline-confirm"
            className="tw-cursor-pointer tw-text-sm tw-leading-relaxed"
          >
            {localizedStrings['%projectCreation_registration_offlineCheckbox%']}
          </label>
        </div>
      )}
    </div>
  );
}

export default RegistrationSelectionControl;
