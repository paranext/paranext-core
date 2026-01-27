import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  RegistrationControlProps,
  ProjectReference,
  RegistrationInfo,
  RegistrationState,
} from 'paratext-project-creation';
import { RegistrationControl } from './registration-control.component';

// Mock @papi/frontend
vi.mock('@papi/frontend', () => ({
  default: {
    commands: {
      sendCommand: vi.fn(),
    },
  },
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock @papi/frontend/react
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

// Mock lucide-react - preserve all exports used by platform-bible-react
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    AlertCircle: () => <span data-testid="alert-circle-icon" />,
    Info: () => <span data-testid="info-icon" />,
    ShieldCheck: () => <span data-testid="shield-check-icon" />,
  };
});

const { default: papi } = await import('@papi/frontend');
// eslint-disable-next-line no-type-assertion/no-type-assertion
const mockSendCommand = papi.commands.sendCommand as ReturnType<typeof vi.fn>;

const defaultServerState: RegistrationState = {
  status: 'Unregistered',
  canRegisterOnline: true,
  canOptOutOfInheritance: false,
  registryServerAvailable: true,
};

const registeredBase: ProjectReference = {
  guid: 'base-guid',
  shortName: 'BAS',
  fullName: 'Base Project',
  versification: 'English',
  projectType: 'Standard',
  isScripture: true,
  isResource: false,
  isRegistered: true,
};

const unregisteredBase: ProjectReference = {
  ...registeredBase,
  isRegistered: false,
};

const mockRegistration: RegistrationInfo = {
  registryId: 'reg-123',
  visibility: 'Test',
  licenseName: 'CC-BY-SA',
};

const defaultProps: RegistrationControlProps = {
  projectType: undefined,
  baseProject: undefined,
  isNewProject: true,
  projectGuid: undefined,
  currentRegistration: undefined,
};

function renderControl(overrides: Partial<RegistrationControlProps> = {}) {
  return render(<RegistrationControl {...defaultProps} {...overrides} />);
}

describe('RegistrationControl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand.mockResolvedValue(defaultServerState);
  });

  describe('NotSelected state', () => {
    it('shows message when projectType is null', () => {
      renderControl({ projectType: undefined });
      expect(screen.getByTestId('registration-not-selected')).toBeInTheDocument();
      expect(
        screen.getByText('Project type must be selected before registration.'),
      ).toBeInTheDocument();
    });

    it('shows message when projectType is NotSelected', () => {
      renderControl({ projectType: 'NotSelected' });
      expect(screen.getByTestId('registration-not-selected')).toBeInTheDocument();
    });
  });

  describe('NotRegisteredType state', () => {
    it('shows not registered message for ConsultantNotes', () => {
      renderControl({ projectType: 'ConsultantNotes' });
      expect(screen.getByTestId('registration-not-registered-type')).toBeInTheDocument();
      expect(screen.getByText(/Consultant Notes projects are not registered/)).toBeInTheDocument();
    });
  });

  describe('Registered state', () => {
    it('shows registered status with visibility label', () => {
      renderControl({
        projectType: 'Standard',
        currentRegistration: mockRegistration,
      });
      expect(screen.getByTestId('registration-registered')).toBeInTheDocument();
      expect(screen.getByText('Registered.')).toBeInTheDocument();
      expect(screen.getByText('(Test)')).toBeInTheDocument();
    });

    it('does not show visibility label for Public', () => {
      renderControl({
        projectType: 'Standard',
        currentRegistration: { ...mockRegistration, visibility: 'Public' },
      });
      expect(screen.getByText('Registered.')).toBeInTheDocument();
      expect(screen.queryByText(/\(Public\)/)).not.toBeInTheDocument();
    });

    it('shows manage registration button when callback provided', () => {
      const onManage = vi.fn();
      renderControl({
        projectType: 'Standard',
        currentRegistration: mockRegistration,
        onManageRegistration: onManage,
      });
      const manageButton = screen.getByText('Manage registration...');
      fireEvent.click(manageButton);
      expect(onManage).toHaveBeenCalledOnce();
    });
  });

  describe('InheritsRegistered state', () => {
    it('shows inherited registration for registered base', () => {
      renderControl({
        projectType: 'BackTranslation',
        baseProject: registeredBase,
      });
      expect(screen.getByTestId('registration-inherits-registered')).toBeInTheDocument();
      expect(screen.getByText(/inherits registration from its base project/)).toBeInTheDocument();
    });
  });

  describe('InheritsUnregistered state', () => {
    it('shows warning for unregistered base', () => {
      renderControl({
        projectType: 'BackTranslation',
        baseProject: unregisteredBase,
      });
      expect(screen.getByTestId('registration-inherits-unregistered')).toBeInTheDocument();
      expect(screen.getByText(/Unregistered/)).toBeInTheDocument();
    });
  });

  describe('CanRegister state', () => {
    it('shows register button when server is available', async () => {
      const onRegister = vi.fn();
      renderControl({
        projectType: 'Standard',
        onRegisterOnline: onRegister,
      });

      await waitFor(() => {
        expect(screen.getByTestId('registration-can-register')).toBeInTheDocument();
      });

      const registerButton = screen.getByText('Register online...');
      fireEvent.click(registerButton);
      expect(onRegister).toHaveBeenCalledOnce();
    });
  });

  describe('OfflineMigration state', () => {
    it('shows offline checkbox when server unavailable', async () => {
      mockSendCommand.mockResolvedValue({
        ...defaultServerState,
        registryServerAvailable: false,
      });

      const onOfflineConfirm = vi.fn();
      renderControl({
        projectType: 'Standard',
        onOfflineConfirmChange: onOfflineConfirm,
      });

      await waitFor(() => {
        expect(screen.getByTestId('registration-offline-migration')).toBeInTheDocument();
      });

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onOfflineConfirm).toHaveBeenCalledWith(true);
    });
  });

  describe('server state fetching', () => {
    it('calls getRegistrationState with correct params', async () => {
      renderControl({
        projectType: 'Standard',
        projectGuid: 'proj-guid',
        baseProject: registeredBase,
      });

      await waitFor(() => {
        expect(mockSendCommand).toHaveBeenCalledWith(
          'paratextProjectCreation.getRegistrationState',
          'proj-guid',
          'base-guid',
          'Standard',
        );
      });
    });

    it('does not fetch when projectType is null', () => {
      renderControl({ projectType: undefined });
      expect(mockSendCommand).not.toHaveBeenCalled();
    });

    it('handles fetch error gracefully', async () => {
      mockSendCommand.mockRejectedValue(new Error('Network error'));
      renderControl({ projectType: 'Standard' });

      // Should fall through to CanRegister (no server state, no registration)
      await waitFor(() => {
        expect(screen.getByTestId('registration-can-register')).toBeInTheDocument();
      });
    });
  });
});
