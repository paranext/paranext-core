import { useMemo, useState, useEffect, useCallback } from 'react';
import papi, { logger } from '@papi/frontend';
import { Alert, AlertDescription, Button, Checkbox, cn, Label } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { AlertCircle, Info, ShieldCheck } from 'lucide-react';
import type {
  ProjectType,
  RegistrationControlProps,
  RegistrationDisplayState,
  RegistrationState,
} from 'paratext-project-creation';

// Project types that share registration with their parent/base project
const SHARES_PARENT_REGISTRATION: ProjectType[] = [
  'BackTranslation',
  'Auxiliary',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

// Project types that are never registered
const NOT_REGISTERED_TYPES: ProjectType[] = ['ConsultantNotes'];

/**
 * Determines the display state for the registration control based on props and server state.
 *
 * @param props Component props
 * @param serverState Optional server-side registration state
 * @returns The display state to render
 */
function determineDisplayState(
  props: RegistrationControlProps,
  serverState: RegistrationState | undefined,
): RegistrationDisplayState {
  const { projectType, baseProject, currentRegistration } = props;

  if (!projectType || projectType === 'NotSelected') {
    return 'NotSelected';
  }

  if (NOT_REGISTERED_TYPES.includes(projectType)) {
    return 'NotRegisteredType';
  }

  if (currentRegistration) {
    return 'Registered';
  }

  if (SHARES_PARENT_REGISTRATION.includes(projectType)) {
    if (baseProject?.isRegistered) {
      return 'InheritsRegistered';
    }
    return 'InheritsUnregistered';
  }

  // For types requiring own registration, check server availability
  if (serverState && !serverState.registryServerAvailable) {
    return 'OfflineMigration';
  }

  return 'CanRegister';
}

/** Format the project type name for display. */
function formatProjectTypeName(projectType: ProjectType): string {
  // Insert spaces before capital letters for compound names
  return projectType.replace(/([a-z])([A-Z])/g, '$1 $2');
}

/**
 * Registration Selection Control - displays registration status and actions for a project.
 *
 * This is an embedded composite control (not a dialog) that renders different content based on the
 * project type, base project, and current registration state. It handles the full registration
 * state machine including inheritance, offline migration, and online registration.
 */
export function RegistrationControl({
  projectType,
  baseProject,
  isNewProject,
  projectGuid,
  currentRegistration,
  onRegisterOnline,
  onManageRegistration,
  onOfflineConfirmChange,
}: RegistrationControlProps) {
  const [serverState, setServerState] = useState<RegistrationState | undefined>(undefined);
  const [offlineConfirmed, setOfflineConfirmed] = useState(false);

  // Fetch server-side registration state when projectType or baseProject changes
  useEffect(() => {
    let cancelled = false;

    async function fetchState() {
      if (!projectType || projectType === 'NotSelected') {
        setServerState(undefined);
        return;
      }

      try {
        const state = await papi.commands.sendCommand(
          'paratextProjectCreation.getRegistrationState',
          projectGuid ?? undefined,
          baseProject?.guid,
          projectType,
        );
        if (!cancelled) setServerState(state);
      } catch (err) {
        logger.warn(`Failed to fetch registration state: ${getErrorMessage(err)}`);
        if (!cancelled) setServerState(undefined);
      }
    }

    fetchState();
    return () => {
      cancelled = true;
    };
  }, [projectType, baseProject, projectGuid]);

  const displayState = useMemo(
    () =>
      determineDisplayState(
        { projectType, baseProject, isNewProject, projectGuid, currentRegistration },
        serverState,
      ),
    [projectType, baseProject, isNewProject, projectGuid, currentRegistration, serverState],
  );

  const handleOfflineChange = useCallback(
    (checked: boolean) => {
      setOfflineConfirmed(checked);
      onOfflineConfirmChange?.(checked);
    },
    [onOfflineConfirmChange],
  );

  const visibilityLabel = useMemo(() => {
    if (!currentRegistration) return null;
    if (currentRegistration.visibility === 'Public') return null;
    return `(${currentRegistration.visibility})`;
  }, [currentRegistration]);

  return (
    <div className="pr-twp tw-w-full" data-testid="registration-control">
      {displayState === 'NotSelected' && (
        <Alert data-testid="registration-not-selected">
          <Info className="tw-h-4 tw-w-4" />
          <AlertDescription>Project type must be selected before registration.</AlertDescription>
        </Alert>
      )}

      {displayState === 'InheritsRegistered' && (
        <Alert data-testid="registration-inherits-registered">
          <ShieldCheck className="tw-h-4 tw-w-4" />
          <AlertDescription>
            Registered. This type of project inherits registration from its base project.
          </AlertDescription>
        </Alert>
      )}

      {displayState === 'InheritsUnregistered' && (
        <Alert variant="destructive" data-testid="registration-inherits-unregistered">
          <AlertCircle className="tw-h-4 tw-w-4" />
          <AlertDescription>
            Unregistered. This type of project inherits registration from its base project.
          </AlertDescription>
        </Alert>
      )}

      {displayState === 'NotRegisteredType' && projectType && (
        <Alert data-testid="registration-not-registered-type">
          <Info className="tw-h-4 tw-w-4" />
          <AlertDescription>
            {formatProjectTypeName(projectType)} projects are not registered with the Paratext
            Registry.
          </AlertDescription>
        </Alert>
      )}

      {displayState === 'Registered' && (
        <div
          className={cn('tw-flex tw-items-center tw-justify-between tw-gap-2')}
          data-testid="registration-registered"
        >
          <div className="tw-flex tw-items-center tw-gap-2">
            <ShieldCheck className="tw-h-4 tw-w-4 tw-text-green-600" />
            <span className="tw-font-medium">Registered.</span>
            {visibilityLabel && <span className="tw-text-muted-foreground">{visibilityLabel}</span>}
          </div>
          {onManageRegistration && (
            <Button variant="link" onClick={onManageRegistration}>
              Manage registration...
            </Button>
          )}
        </div>
      )}

      {displayState === 'CanRegister' && (
        <div data-testid="registration-can-register">
          {onRegisterOnline && (
            <Button variant="default" onClick={onRegisterOnline}>
              Register online...
            </Button>
          )}
        </div>
      )}

      {displayState === 'OfflineMigration' && (
        <div
          className={cn('tw-flex tw-items-start tw-gap-2')}
          data-testid="registration-offline-migration"
        >
          <Checkbox
            id="offline-migration-confirm"
            checked={offlineConfirmed}
            onCheckedChange={(checked) => handleOfflineChange(checked === true)}
          />
          <Label htmlFor="offline-migration-confirm" className="tw-cursor-pointer tw-leading-snug">
            I do not have access to the Internet, but I want to migrate the project now. (I will
            register later when I have Internet access.)
          </Label>
        </div>
      )}
    </div>
  );
}
