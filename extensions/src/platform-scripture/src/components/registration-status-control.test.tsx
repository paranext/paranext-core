/* eslint-disable no-null/no-null -- null is required for testing ProjectTypeNotSelected state */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationStatusControl } from './registration-status-control.component';
import {
  determineDisplayState,
  getStateMessage,
  determineBlocksSubmit,
  inheritsRegistration,
  needsOwnRegistration,
  isNotRegisterableType,
  RegistrationControlInput,
  RegistrationDisplayState,
  UserContext,
  ProjectType,
} from '../hooks/use-registration-status';

// =============================================================================
// TEST HELPERS
// =============================================================================

/** Creates a default user context for testing */
function createDefaultUserContext(overrides?: Partial<UserContext>): UserContext {
  return {
    isRegistered: true,
    canRegisterProjects: true,
    isOnline: true,
    isGuest: false,
    isObserver: false,
    offlineRegistrationAllowed: false,
    ...overrides,
  };
}

/** Creates a default input for testing */
function createDefaultInput(
  overrides?: Partial<RegistrationControlInput>,
): RegistrationControlInput {
  return {
    projectType: 'Standard',
    isRegistered: false,
    registrationExists: false,
    isRevoked: false,
    userContext: createDefaultUserContext(),
    mode: 'create',
    ...overrides,
  };
}

// =============================================================================
// UNIT TESTS: Helper Functions
// =============================================================================

describe('Registration Status Helper Functions', () => {
  describe('inheritsRegistration', () => {
    it('returns false for null project type', () => {
      expect(inheritsRegistration(null)).toBe(false);
    });

    it('returns true for BackTranslation', () => {
      expect(inheritsRegistration('BackTranslation')).toBe(true);
    });

    it('returns true for Auxiliary', () => {
      expect(inheritsRegistration('Auxiliary')).toBe(true);
    });

    it('returns true for TransliterationManual', () => {
      expect(inheritsRegistration('TransliterationManual')).toBe(true);
    });

    it('returns true for TransliterationWithEncoder', () => {
      expect(inheritsRegistration('TransliterationWithEncoder')).toBe(true);
    });

    it('returns false for Standard', () => {
      expect(inheritsRegistration('Standard')).toBe(false);
    });

    it('returns false for Daughter', () => {
      expect(inheritsRegistration('Daughter')).toBe(false);
    });

    it('returns false for StudyBibleAdditions', () => {
      expect(inheritsRegistration('StudyBibleAdditions')).toBe(false);
    });
  });

  describe('needsOwnRegistration', () => {
    it('returns false for null project type', () => {
      expect(needsOwnRegistration(null)).toBe(false);
    });

    it('returns true for Standard', () => {
      expect(needsOwnRegistration('Standard')).toBe(true);
    });

    it('returns true for Daughter', () => {
      expect(needsOwnRegistration('Daughter')).toBe(true);
    });

    it('returns true for StudyBibleAdditions', () => {
      expect(needsOwnRegistration('StudyBibleAdditions')).toBe(true);
    });

    it('returns false for BackTranslation', () => {
      expect(needsOwnRegistration('BackTranslation')).toBe(false);
    });

    it('returns false for Auxiliary', () => {
      expect(needsOwnRegistration('Auxiliary')).toBe(false);
    });
  });

  describe('isNotRegisterableType', () => {
    it('returns false for null project type', () => {
      expect(isNotRegisterableType(null)).toBe(false);
    });

    it('returns true for ConsultantNotes', () => {
      expect(isNotRegisterableType('ConsultantNotes')).toBe(true);
    });

    it('returns false for Standard', () => {
      expect(isNotRegisterableType('Standard')).toBe(false);
    });

    it('returns false for BackTranslation', () => {
      expect(isNotRegisterableType('BackTranslation')).toBe(false);
    });
  });
});

// =============================================================================
// UNIT TESTS: State Machine (BHV-205)
// =============================================================================

describe('determineDisplayState (BHV-205)', () => {
  describe('State 1: ProjectTypeNotSelected', () => {
    it('returns ProjectTypeNotSelected when projectType is null', () => {
      const input = createDefaultInput({ projectType: null });
      expect(determineDisplayState(input)).toBe('ProjectTypeNotSelected');
    });
  });

  describe('State 2: InheritsFromBase', () => {
    const inheritingTypes: ProjectType[] = [
      'BackTranslation',
      'Auxiliary',
      'TransliterationManual',
      'TransliterationWithEncoder',
    ];

    inheritingTypes.forEach((type) => {
      it(`returns InheritsFromBase for ${type}`, () => {
        const input = createDefaultInput({ projectType: type });
        expect(determineDisplayState(input)).toBe('InheritsFromBase');
      });
    });
  });

  describe('State 3: NotRegistrationType', () => {
    it('returns NotRegistrationType for ConsultantNotes', () => {
      const input = createDefaultInput({ projectType: 'ConsultantNotes' });
      expect(determineDisplayState(input)).toBe('NotRegistrationType');
    });
  });

  describe('State 4: Registered / RegisteredPrivate', () => {
    it('returns Registered when isRegistered and not revoked', () => {
      const input = createDefaultInput({
        isRegistered: true,
        isRevoked: false,
        visibility: 'Public',
      });
      expect(determineDisplayState(input)).toBe('Registered');
    });

    it('returns RegisteredPrivate when isRegistered with Private visibility', () => {
      const input = createDefaultInput({
        isRegistered: true,
        isRevoked: false,
        visibility: 'Private',
      });
      expect(determineDisplayState(input)).toBe('RegisteredPrivate');
    });
  });

  describe('State 5: RegistrationRevoked', () => {
    it('returns RegistrationRevoked when registrationExists and isRevoked', () => {
      const input = createDefaultInput({
        isRegistered: false,
        registrationExists: true,
        isRevoked: true,
      });
      expect(determineDisplayState(input)).toBe('RegistrationRevoked');
    });
  });

  describe('State 6: CanRegister', () => {
    it('returns CanRegister when unregistered and user can register online', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: true,
        }),
      });
      expect(determineDisplayState(input)).toBe('CanRegister');
    });
  });

  describe('State 7: OfflineAllowed', () => {
    it('returns OfflineAllowed when unregistered, offline, but offline allowed', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: false,
          offlineRegistrationAllowed: true,
        }),
      });
      expect(determineDisplayState(input)).toBe('OfflineAllowed');
    });
  });

  describe('State 8: CannotRegister', () => {
    it('returns CannotRegister when unregistered and user cannot register', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: false,
        }),
      });
      expect(determineDisplayState(input)).toBe('CannotRegister');
    });
  });

  describe('State 9: Unregistered (default)', () => {
    it('returns Unregistered as default state', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: false,
          offlineRegistrationAllowed: false,
        }),
      });
      expect(determineDisplayState(input)).toBe('Unregistered');
    });
  });

  describe('State priority', () => {
    it('prioritizes InheritsFromBase over registration status', () => {
      const input = createDefaultInput({
        projectType: 'BackTranslation',
        isRegistered: true, // Should still show InheritsFromBase
      });
      expect(determineDisplayState(input)).toBe('InheritsFromBase');
    });

    it('prioritizes NotRegistrationType over registration status', () => {
      const input = createDefaultInput({
        projectType: 'ConsultantNotes',
        isRegistered: true, // Should still show NotRegistrationType
      });
      expect(determineDisplayState(input)).toBe('NotRegistrationType');
    });
  });
});

// =============================================================================
// UNIT TESTS: Message Generation
// =============================================================================

describe('getStateMessage', () => {
  it('returns correct message for ProjectTypeNotSelected', () => {
    const input = createDefaultInput({ projectType: null });
    expect(getStateMessage('ProjectTypeNotSelected', input)).toBe(
      'Project type must be selected to determine registration status.',
    );
  });

  it('substitutes base project status for InheritsFromBase', () => {
    const inputRegistered = createDefaultInput({
      projectType: 'BackTranslation',
      baseProjectRegistrationStatus: { isRegistered: true },
    });
    expect(getStateMessage('InheritsFromBase', inputRegistered)).toBe(
      'Registered - Inherits from base project.',
    );

    const inputUnregistered = createDefaultInput({
      projectType: 'BackTranslation',
      baseProjectRegistrationStatus: { isRegistered: false },
    });
    expect(getStateMessage('InheritsFromBase', inputUnregistered)).toBe(
      'Unregistered - Inherits from base project.',
    );
  });

  it('substitutes project type for NotRegistrationType', () => {
    const input = createDefaultInput({ projectType: 'ConsultantNotes' });
    expect(getStateMessage('NotRegistrationType', input)).toBe(
      'ConsultantNotes projects are not registered with the Paratext Registry.',
    );
  });

  it('returns correct message for Registered', () => {
    const input = createDefaultInput({ isRegistered: true });
    expect(getStateMessage('Registered', input)).toBe('Registered.');
  });

  it('returns correct message for RegisteredPrivate', () => {
    const input = createDefaultInput({ isRegistered: true, visibility: 'Private' });
    expect(getStateMessage('RegisteredPrivate', input)).toBe(
      'Registered. Note: This project has "private" visibility on the Paratext Registry.',
    );
  });

  it('returns correct message for RegistrationRevoked', () => {
    const input = createDefaultInput({ registrationExists: true, isRevoked: true });
    expect(getStateMessage('RegistrationRevoked', input)).toBe(
      'Registration exists, but is revoked. Contact your administrator.',
    );
  });

  it('returns correct message for CanRegister', () => {
    const input = createDefaultInput();
    expect(getStateMessage('CanRegister', input)).toBe('Unregistered.');
  });

  it('returns correct message for CannotRegister', () => {
    const input = createDefaultInput();
    expect(getStateMessage('CannotRegister', input)).toBe(
      'Unregistered. You do not have permission to register projects.',
    );
  });

  it('returns correct message for OfflineAllowed', () => {
    const input = createDefaultInput();
    expect(getStateMessage('OfflineAllowed', input)).toBe('Unregistered. Network unavailable.');
  });
});

// =============================================================================
// UNIT TESTS: blocksSubmit Logic
// =============================================================================

describe('determineBlocksSubmit', () => {
  describe('blocking states', () => {
    it('blocks for RegistrationRevoked', () => {
      expect(determineBlocksSubmit('RegistrationRevoked', false)).toBe(true);
    });

    it('blocks for CannotRegister', () => {
      expect(determineBlocksSubmit('CannotRegister', false)).toBe(true);
    });

    it('blocks for Unregistered', () => {
      expect(determineBlocksSubmit('Unregistered', false)).toBe(true);
    });

    it('blocks for OfflineAllowed when not confirmed', () => {
      expect(determineBlocksSubmit('OfflineAllowed', false)).toBe(true);
    });
  });

  describe('non-blocking states', () => {
    it('does not block for ProjectTypeNotSelected', () => {
      expect(determineBlocksSubmit('ProjectTypeNotSelected', false)).toBe(false);
    });

    it('does not block for InheritsFromBase', () => {
      expect(determineBlocksSubmit('InheritsFromBase', false)).toBe(false);
    });

    it('does not block for NotRegistrationType', () => {
      expect(determineBlocksSubmit('NotRegistrationType', false)).toBe(false);
    });

    it('does not block for Registered', () => {
      expect(determineBlocksSubmit('Registered', false)).toBe(false);
    });

    it('does not block for RegisteredPrivate', () => {
      expect(determineBlocksSubmit('RegisteredPrivate', false)).toBe(false);
    });

    it('does not block for CanRegister', () => {
      expect(determineBlocksSubmit('CanRegister', false)).toBe(false);
    });

    it('does not block for OfflineAllowed when confirmed (BHV-210)', () => {
      expect(determineBlocksSubmit('OfflineAllowed', true)).toBe(false);
    });
  });
});

// =============================================================================
// COMPONENT TESTS
// =============================================================================

describe('RegistrationStatusControl Component', () => {
  describe('rendering states', () => {
    it('renders ProjectTypeNotSelected message', () => {
      const input = createDefaultInput({ projectType: null });
      render(<RegistrationStatusControl input={input} />);

      expect(
        screen.getByText('Project type must be selected to determine registration status.'),
      ).toBeInTheDocument();
    });

    it('renders Registered state with success styling', () => {
      const input = createDefaultInput({
        isRegistered: true,
        isRevoked: false,
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByText('Registration Status')).toBeInTheDocument();
      expect(screen.getByText('Registered.')).toBeInTheDocument();
    });

    it('renders CanRegister state with register link', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: true,
        }),
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByText('Unregistered.')).toBeInTheDocument();
      expect(screen.getByText('Register online...')).toBeInTheDocument();
    });

    it('renders Registered state with manage link', () => {
      const input = createDefaultInput({
        isRegistered: true,
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByText('Manage registration...')).toBeInTheDocument();
    });

    it('renders OfflineAllowed state with checkbox', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: false,
          offlineRegistrationAllowed: true,
        }),
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByText('Migrate without registering (offline)')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders InheritsFromBase with base project status', () => {
      const input = createDefaultInput({
        projectType: 'BackTranslation',
        baseProjectRegistrationStatus: { isRegistered: true },
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByText('Registered - Inherits from base project.')).toBeInTheDocument();
    });

    it('renders NotRegistrationType with project type', () => {
      const input = createDefaultInput({ projectType: 'ConsultantNotes' });
      render(<RegistrationStatusControl input={input} />);

      expect(
        screen.getByText('ConsultantNotes projects are not registered with the Paratext Registry.'),
      ).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onRegisterClick when register link is clicked', () => {
      const onRegisterClick = vi.fn();
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: true,
        }),
      });
      render(<RegistrationStatusControl input={input} onRegisterClick={onRegisterClick} />);

      fireEvent.click(screen.getByText('Register online...'));
      expect(onRegisterClick).toHaveBeenCalledTimes(1);
    });

    it('calls onManageClick when manage link is clicked', () => {
      const onManageClick = vi.fn();
      const input = createDefaultInput({
        isRegistered: true,
      });
      render(<RegistrationStatusControl input={input} onManageClick={onManageClick} />);

      fireEvent.click(screen.getByText('Manage registration...'));
      expect(onManageClick).toHaveBeenCalledTimes(1);
    });

    it('calls onOfflineConfirmChange when checkbox is toggled', () => {
      const onOfflineConfirmChange = vi.fn();
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: false,
          offlineRegistrationAllowed: true,
        }),
      });
      render(
        <RegistrationStatusControl input={input} onOfflineConfirmChange={onOfflineConfirmChange} />,
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onOfflineConfirmChange).toHaveBeenCalledWith(true);
    });

    it('calls onStateChange with updated output', () => {
      const onStateChange = vi.fn();
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: true,
        }),
      });
      render(<RegistrationStatusControl input={input} onStateChange={onStateChange} />);

      expect(onStateChange).toHaveBeenCalledWith({
        currentState: {
          displayState: 'CanRegister',
          offlineConfirmed: false,
          blocksSubmit: false,
        },
      });
    });
  });

  describe('accessibility', () => {
    it('has role="status" for screen reader announcements', () => {
      const input = createDefaultInput({ isRegistered: true });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live="polite" for status updates', () => {
      const input = createDefaultInput({ isRegistered: true });
      render(<RegistrationStatusControl input={input} />);

      const statusRegion = screen.getByRole('status');
      expect(statusRegion).toHaveAttribute('aria-live', 'polite');
    });

    it('links checkbox label to checkbox input', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: false,
          offlineRegistrationAllowed: true,
        }),
      });
      render(<RegistrationStatusControl input={input} />);

      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Migrate without registering (offline)');

      expect(checkbox).toHaveAttribute('id', 'offline-confirm');
      expect(label).toHaveAttribute('for', 'offline-confirm');
    });
  });

  describe('conditional rendering', () => {
    it('does not show register link when state is not CanRegister', () => {
      const input = createDefaultInput({ isRegistered: true });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.queryByText('Register online...')).not.toBeInTheDocument();
    });

    it('does not show manage link when state is not Registered variants', () => {
      const input = createDefaultInput({
        isRegistered: false,
        userContext: createDefaultUserContext({
          canRegisterProjects: true,
          isOnline: true,
        }),
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.queryByText('Manage registration...')).not.toBeInTheDocument();
    });

    it('does not show offline checkbox when state is not OfflineAllowed', () => {
      const input = createDefaultInput({
        isRegistered: true,
      });
      render(<RegistrationStatusControl input={input} />);

      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
  });

  describe('all 11 states render correctly', () => {
    const stateTestCases: Array<{
      name: RegistrationDisplayState;
      input: Partial<RegistrationControlInput>;
      expectedText: string;
    }> = [
      {
        name: 'ProjectTypeNotSelected',
        input: { projectType: null },
        expectedText: 'Project type must be selected to determine registration status.',
      },
      {
        name: 'InheritsFromBase',
        input: {
          projectType: 'BackTranslation',
          baseProjectRegistrationStatus: { isRegistered: true },
        },
        expectedText: 'Registered - Inherits from base project.',
      },
      {
        name: 'NotRegistrationType',
        input: { projectType: 'ConsultantNotes' },
        expectedText: 'ConsultantNotes projects are not registered with the Paratext Registry.',
      },
      {
        name: 'Registered',
        input: { isRegistered: true, isRevoked: false, visibility: 'Public' },
        expectedText: 'Registered.',
      },
      {
        name: 'RegisteredPrivate',
        input: { isRegistered: true, isRevoked: false, visibility: 'Private' },
        expectedText:
          'Registered. Note: This project has "private" visibility on the Paratext Registry.',
      },
      {
        name: 'RegistrationRevoked',
        input: { isRegistered: false, registrationExists: true, isRevoked: true },
        expectedText: 'Registration exists, but is revoked. Contact your administrator.',
      },
      {
        name: 'CanRegister',
        input: {
          isRegistered: false,
          userContext: createDefaultUserContext({ canRegisterProjects: true, isOnline: true }),
        },
        expectedText: 'Unregistered.',
      },
      {
        name: 'CannotRegister',
        input: {
          isRegistered: false,
          userContext: createDefaultUserContext({ canRegisterProjects: false }),
        },
        expectedText: 'Unregistered. You do not have permission to register projects.',
      },
      {
        name: 'OfflineAllowed',
        input: {
          isRegistered: false,
          userContext: createDefaultUserContext({
            canRegisterProjects: true,
            isOnline: false,
            offlineRegistrationAllowed: true,
          }),
        },
        expectedText: 'Unregistered. Network unavailable.',
      },
      {
        name: 'Unregistered',
        input: {
          isRegistered: false,
          userContext: createDefaultUserContext({
            canRegisterProjects: true,
            isOnline: false,
            offlineRegistrationAllowed: false,
          }),
        },
        expectedText: 'Unregistered.',
      },
    ];

    stateTestCases.forEach(({ name, input, expectedText }) => {
      it(`renders ${name} state correctly`, () => {
        const fullInput = createDefaultInput(input);
        render(<RegistrationStatusControl input={fullInput} />);

        expect(screen.getByText(expectedText)).toBeInTheDocument();
      });
    });
  });
});
