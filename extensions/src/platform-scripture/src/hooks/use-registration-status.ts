import { useState, useCallback, useMemo } from 'react';

// =============================================================================
// TYPES (from ui-state-contracts.md)
// =============================================================================

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

/** Registration display state enumeration - 11 possible states */
export type RegistrationDisplayState =
  | 'ProjectTypeNotSelected'
  | 'InheritsFromBase'
  | 'NotRegistrationType'
  | 'Registered'
  | 'RegisteredPrivate'
  | 'RegistrationRevoked'
  | 'CanRegister'
  | 'CannotRegister'
  | 'OfflineAllowed'
  | 'Unregistered';

/** Message type for Alert variant mapping */
export type MessageType = 'info' | 'success' | 'warning' | 'error';

/** User context for registration decisions */
export interface UserContext {
  isRegistered: boolean;
  canRegisterProjects: boolean;
  isOnline: boolean;
  isGuest: boolean;
  isObserver: boolean;
  offlineRegistrationAllowed?: boolean;
}

/** Input state for Registration Selection control (from ui-state-contracts.md) */
export interface RegistrationControlInput {
  projectGuid?: string;
  // eslint-disable-next-line no-null/no-null -- null is required by spec when no type selected
  projectType: ProjectType | null;
  baseProjectName?: string;
  baseProjectGuid?: string;
  isRegistered: boolean;
  registrationExists: boolean;
  isRevoked: boolean;
  visibility?: 'Public' | 'Private';
  baseProjectRegistrationStatus?: {
    isRegistered: boolean;
  };
  userContext: UserContext;
  mode: 'create' | 'edit';
}

/** Control state for Registration Selection (from ui-state-contracts.md) */
export interface RegistrationControlState {
  displayState: RegistrationDisplayState;
  message: string;
  messageType: MessageType;
  showRegisterLink: boolean;
  showManageLink: boolean;
  showOfflineCheckbox: boolean;
  offlineConfirmed: boolean;
}

/** Output state for Registration Selection control (from ui-state-contracts.md) */
export interface RegistrationControlOutput {
  currentState: {
    displayState: RegistrationDisplayState;
    offlineConfirmed: boolean;
    blocksSubmit: boolean;
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Derived project types that inherit registration from base project (BHV-102) These types do NOT
 * need their own project license
 */
const INHERITS_REGISTRATION_TYPES: ProjectType[] = [
  'BackTranslation',
  'Auxiliary',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/**
 * Project types that require their own registration (BHV-102) NeedOwnProjectLicense() returns true
 * for these
 */
const NEEDS_OWN_REGISTRATION_TYPES: ProjectType[] = ['Standard', 'Daughter', 'StudyBibleAdditions'];

/** Project types that cannot be registered at all */
const NOT_REGISTERABLE_TYPES: ProjectType[] = ['ConsultantNotes'];

/** Check if project type is derived and inherits registration from base */
export function inheritsRegistration(projectType: ProjectType | null): boolean {
  if (!projectType) return false;
  return INHERITS_REGISTRATION_TYPES.includes(projectType);
}

/** Check if project type needs its own registration (BHV-102: NeedOwnProjectLicense) */
export function needsOwnRegistration(projectType: ProjectType | null): boolean {
  if (!projectType) return false;
  return NEEDS_OWN_REGISTRATION_TYPES.includes(projectType);
}

/** Check if project type is not registerable */
export function isNotRegisterableType(projectType: ProjectType | null): boolean {
  if (!projectType) return false;
  return NOT_REGISTERABLE_TYPES.includes(projectType);
}

// =============================================================================
// STATE MACHINE (BHV-205)
// =============================================================================

/** Message templates for each display state */
const STATE_MESSAGES: Record<RegistrationDisplayState, string> = {
  ProjectTypeNotSelected: 'Project type must be selected to determine registration status.',
  InheritsFromBase: '{status} - Inherits from base project.',
  NotRegistrationType: '{type} projects are not registered with the Paratext Registry.',
  Registered: 'Registered.',
  RegisteredPrivate:
    'Registered. Note: This project has "private" visibility on the Paratext Registry.',
  RegistrationRevoked: 'Registration exists, but is revoked. Contact your administrator.',
  CanRegister: 'Unregistered.',
  CannotRegister: 'Unregistered. You do not have permission to register projects.',
  OfflineAllowed: 'Unregistered. Network unavailable.',
  Unregistered: 'Unregistered.',
};

/** Message type mapping for each display state */
const STATE_MESSAGE_TYPES: Record<RegistrationDisplayState, MessageType> = {
  ProjectTypeNotSelected: 'info',
  InheritsFromBase: 'info',
  NotRegistrationType: 'info',
  Registered: 'success',
  RegisteredPrivate: 'warning',
  RegistrationRevoked: 'error',
  CanRegister: 'warning',
  CannotRegister: 'warning',
  OfflineAllowed: 'warning',
  Unregistered: 'warning',
};

/**
 * Determines the registration display state based on input (BHV-205)
 *
 * State machine logic:
 *
 * 1. If projectType === null -> ProjectTypeNotSelected
 * 2. If derived type (BackTranslation, Auxiliary, Transliteration) -> InheritsFromBase
 * 3. If not registerable type -> NotRegistrationType
 * 4. If registered and not revoked -> Registered or RegisteredPrivate
 * 5. If registration revoked -> RegistrationRevoked
 * 6. If can register online -> CanRegister
 * 7. If offline allowed -> OfflineAllowed
 * 8. If cannot register -> CannotRegister
 * 9. Default -> Unregistered
 *
 * @param input - Registration control input state
 * @returns Display state determination
 */
export function determineDisplayState(input: RegistrationControlInput): RegistrationDisplayState {
  const { projectType, isRegistered, registrationExists, isRevoked, visibility, userContext } =
    input;

  // 1. No project type selected
  // eslint-disable-next-line no-null/no-null -- null check per spec for ProjectTypeNotSelected state
  if (projectType === null) {
    return 'ProjectTypeNotSelected';
  }

  // 2. Derived type that inherits registration from base
  if (inheritsRegistration(projectType)) {
    return 'InheritsFromBase';
  }

  // 3. Type that doesn't support registration
  if (isNotRegisterableType(projectType)) {
    return 'NotRegistrationType';
  }

  // 4. Registered and not revoked
  if (isRegistered && !isRevoked) {
    if (visibility === 'Private') {
      return 'RegisteredPrivate';
    }
    return 'Registered';
  }

  // 5. Registration exists but is revoked
  if (registrationExists && isRevoked) {
    return 'RegistrationRevoked';
  }

  // 6. Not registered, check if user can register
  if (!isRegistered && userContext.canRegisterProjects) {
    if (userContext.isOnline) {
      return 'CanRegister';
    }
    // 7. Offline but offline registration allowed
    if (userContext.offlineRegistrationAllowed) {
      return 'OfflineAllowed';
    }
  }

  // 8. Cannot register (no permission)
  if (!isRegistered && !userContext.canRegisterProjects) {
    return 'CannotRegister';
  }

  // 9. Default state
  return 'Unregistered';
}

/** Get the message for a display state, with variable substitution */
export function getStateMessage(
  displayState: RegistrationDisplayState,
  input: RegistrationControlInput,
): string {
  let message = STATE_MESSAGES[displayState];

  // Substitute variables
  if (displayState === 'InheritsFromBase') {
    const baseStatus = input.baseProjectRegistrationStatus?.isRegistered
      ? 'Registered'
      : 'Unregistered';
    message = message.replace('{status}', baseStatus);
  }

  if (displayState === 'NotRegistrationType' && input.projectType) {
    message = message.replace('{type}', input.projectType);
  }

  return message;
}

/** Determine if the current state blocks form submission */
export function determineBlocksSubmit(
  displayState: RegistrationDisplayState,
  offlineConfirmed: boolean,
): boolean {
  // States that block submission
  const blockingStates: RegistrationDisplayState[] = [
    'RegistrationRevoked',
    'CannotRegister',
    'OfflineAllowed',
    'Unregistered',
  ];

  // OfflineAllowed doesn't block if offline is confirmed
  if (displayState === 'OfflineAllowed' && offlineConfirmed) {
    return false;
  }

  return blockingStates.includes(displayState);
}

// =============================================================================
// HOOK
// =============================================================================

export interface UseRegistrationStatusReturn {
  // State
  state: RegistrationControlState;

  // Output for parent form
  output: RegistrationControlOutput;

  // Handlers
  handleRegisterClick: () => void;
  handleManageClick: () => void;
  handleOfflineConfirmChange: (confirmed: boolean) => void;
}

/**
 * Custom hook for managing Registration Status Control state
 *
 * Implements behaviors:
 *
 * - BHV-205: Registration control state display
 * - BHV-102: Registration requirement by project type
 * - BHV-111: Registry server project registration
 * - BHV-210: Registration offline confirmation
 */
export function useRegistrationStatus(
  input: RegistrationControlInput,
  callbacks?: {
    onRegisterClicked?: () => void;
    onManageClicked?: () => void;
    onOfflineConfirmChanged?: (confirmed: boolean) => void;
  },
): UseRegistrationStatusReturn {
  // Offline confirmation checkbox state (BHV-210)
  const [offlineConfirmed, setOfflineConfirmed] = useState(false);

  // Compute display state from input
  const displayState = useMemo(() => determineDisplayState(input), [input]);

  // Compute message and type
  const message = useMemo(() => getStateMessage(displayState, input), [displayState, input]);

  const messageType = STATE_MESSAGE_TYPES[displayState];

  // Determine which actions to show
  const showRegisterLink = displayState === 'CanRegister';
  const showManageLink =
    displayState === 'Registered' ||
    displayState === 'RegisteredPrivate' ||
    displayState === 'RegistrationRevoked';
  const showOfflineCheckbox = displayState === 'OfflineAllowed';

  // Build state object
  const state: RegistrationControlState = useMemo(
    () => ({
      displayState,
      message,
      messageType,
      showRegisterLink,
      showManageLink,
      showOfflineCheckbox,
      offlineConfirmed,
    }),
    [
      displayState,
      message,
      messageType,
      showRegisterLink,
      showManageLink,
      showOfflineCheckbox,
      offlineConfirmed,
    ],
  );

  // Build output for parent form
  const output: RegistrationControlOutput = useMemo(
    () => ({
      currentState: {
        displayState,
        offlineConfirmed,
        blocksSubmit: determineBlocksSubmit(displayState, offlineConfirmed),
      },
    }),
    [displayState, offlineConfirmed],
  );

  // Handle register click (BHV-111)
  const handleRegisterClick = useCallback(() => {
    // In a real implementation, this would launch browser to registry
    // For now, call the callback if provided
    callbacks?.onRegisterClicked?.();
  }, [callbacks]);

  // Handle manage click
  const handleManageClick = useCallback(() => {
    // In a real implementation, this would launch browser to management page
    callbacks?.onManageClicked?.();
  }, [callbacks]);

  // Handle offline confirm change (BHV-210)
  const handleOfflineConfirmChange = useCallback(
    (confirmed: boolean) => {
      setOfflineConfirmed(confirmed);
      callbacks?.onOfflineConfirmChanged?.(confirmed);
    },
    [callbacks],
  );

  return {
    state,
    output,
    handleRegisterClick,
    handleManageClick,
    handleOfflineConfirmChange,
  };
}
