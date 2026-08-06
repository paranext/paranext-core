import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ChangeEvent, ReactNode } from 'react';
import * as commandService from '@shared/services/command.service';
import * as firstRunStore from '@renderer/services/first-run-store';
import { settingsService } from '@shared/services/settings.service';
import {
  IdentifyStep,
  INVALID_CODE_DISPLAY_DEBOUNCE_MS,
  VALIDATION_DEBOUNCE_MS,
} from './identify-step.component';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%paratextRegistration_label_registrationName%': 'Registration name',
      '%paratextRegistration_label_registrationCode%': 'Registration code',
      '%paratextRegistration_alert_validRegistration%': 'Registration accepted',
      '%paratextRegistration_alert_invalidRegistration%': 'Not found',
      '%paratextRegistration_alert_invalidRegistration_description%': 'Check name and code.',
      '%paratextRegistration_button_saveAndRestart%': 'Save and restart',
      '%paratextRegistration_button_restarting%': 'Restarting...',
      '%paratextRegistration_warning_invalid_registration_length%': 'Code must be 30 hex chars.',
      '%firstRun_step_identify_heading%': 'Enter your registration information',
      '%firstRun_step_identify_registryHelp%': "Can't find your registration code?",
      '%firstRun_step_identify_registryLink%': 'Visit Paratext Registry',
      '%firstRun_step_identify_validatingCode%': 'Checking your registration…',
      '%firstRun_step_identify_reRegisterNotice%':
        'Your Paratext registration is no longer valid. Re-register to continue.',
      '%firstRun_button_continueWithoutRegistration%': 'Continue without registration',
      '%firstRun_step_identify_dontShowAgain%': "Don't show this on startup again",
      '%general_error_title%': 'Error',
    },
    false,
  ]),
}));
vi.mock('@renderer/services/first-run-store', () => ({
  isDemoMode: vi.fn(() => false),
  markJustRegistered: vi.fn(),
  continueWithoutRegistration: vi.fn(),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn().mockResolvedValue(undefined) },
}));
vi.mock('platform-bible-react', () => ({
  Alert: ({ children, variant }: { children: ReactNode; variant?: string }) => (
    <div role="alert" data-variant={variant}>
      {children}
    </div>
  ),
  AlertTitle: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
  AlertDescription: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Input: ({
    id,
    value,
    onChange,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
  }: {
    [key: string]: unknown;
    id?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    'aria-describedby'?: string;
  }) => (
    <input
      id={id}
      value={value}
      onChange={onChange}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
    />
  ),
  Spinner: () => <span data-testid="spinner" />,
  Checkbox: ({
    id,
    checked,
    onCheckedChange,
  }: {
    id?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }) => (
    <input
      type="checkbox"
      id={id}
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
    />
  ),
  Label: ({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));
vi.mock('lucide-react', () => ({
  CircleCheck: () => <span data-testid="circle-check-icon" />,
  AlertCircle: () => <span data-testid="alert-circle-icon" />,
}));

const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockIsDemoMode = vi.mocked(firstRunStore.isDemoMode);

const VALID_CODE = 'ABCDEF-ABCDEF-ABCDEF-ABCDEF-ABCDEF';

const PRODUCTION_REGISTRY_URL = 'https://registry.paratext.org/';

/**
 * Routes `sendCommand` by command name so the mount-time registry-URL fetch never consumes the mock
 * queued for validation/save. Pass per-test overrides for the validation/save outcomes.
 */
function mockCommands(
  overrides: { validate?: boolean; validateError?: Error; saveError?: Error; url?: string } = {},
) {
  mockSendCommand.mockImplementation((command: string) => {
    switch (command) {
      case 'paratextRegistration.getParatextRegistryUrl':
        return Promise.resolve(overrides.url ?? PRODUCTION_REGISTRY_URL);
      case 'paratextRegistration.validateParatextRegistrationData':
        return overrides.validateError
          ? Promise.reject(overrides.validateError)
          : Promise.resolve(overrides.validate ?? false);
      case 'paratextRegistration.setParatextRegistrationData':
        return overrides.saveError
          ? Promise.reject(overrides.saveError)
          : Promise.resolve(undefined);
      default:
        return Promise.resolve(undefined);
    }
  });
}

beforeEach(() => {
  // Clear call history between tests (keeps factory/mockResolvedValue implementations) so
  // per-test call-count assertions on continueWithoutRegistration / settingsService.set don't
  // accumulate across the re-register-mode cases.
  vi.clearAllMocks();
  mockSendCommand.mockReset();
  mockCommands();
  mockIsDemoMode.mockReturnValue(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

/** Creates a fresh userEvent instance after fake timers are installed. */
function setupUser() {
  return userEvent.setup({ advanceTimers: vi.advanceTimersByTimeAsync });
}

describe('IdentifyStep', () => {
  const onNext = vi.fn();
  const setCanProceed = vi.fn();

  beforeEach(() => {
    onNext.mockReset();
    setCanProceed.mockReset();
  });

  it('Save button is disabled until both name and code fields are non-empty', async () => {
    const user = setupUser();
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    // Name only: still disabled (real mode requires validated code)
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();

    // Entering a valid code triggers validation; button remains disabled until backend confirms
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('submit calls validateParatextRegistrationData with the entered name and code', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextRegistration.validateParatextRegistrationData',
        expect.objectContaining({ name: 'Test User', code: VALID_CODE }),
      );
    });
  });

  it('shows inline error without advancing when validation fails', async () => {
    const user = setupUser();
    mockCommands({ validate: false });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());
    expect(onNext).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('replaces form with restart messaging after validation success and save', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );

    await user.click(screen.getByRole('button', { name: /save and restart/i }));

    await waitFor(() => expect(screen.getByText(/restarting/i)).toBeInTheDocument());
    expect(screen.queryByLabelText(/registration name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/registration code/i)).not.toBeInTheDocument();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextRegistration.setParatextRegistrationData',
      expect.objectContaining({ name: 'Test User', code: VALID_CODE }),
    );
  });

  it('calls onRestartAfterSave instead of platform.restart when provided', async () => {
    const user = setupUser();
    mockCommands({ validate: true });
    const onRestartAfterSave = vi.fn().mockReturnValue(new Promise<never>(() => {}));

    render(
      <IdentifyStep
        onNext={onNext}
        setCanProceed={setCanProceed}
        onRestartAfterSave={onRestartAfterSave}
      />,
    );

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );

    await user.click(screen.getByRole('button', { name: /save and restart/i }));

    await waitFor(() => expect(onRestartAfterSave).toHaveBeenCalledOnce());
    expect(mockSendCommand).not.toHaveBeenCalledWith('platform.restart');
  });

  it('clears the spinner overlay when onRestartAfterSave resolves', async () => {
    const user = setupUser();
    mockCommands({ validate: true });
    const onRestartAfterSave = vi.fn().mockResolvedValue(undefined);

    render(
      <IdentifyStep
        onNext={onNext}
        setCanProceed={setCanProceed}
        onRestartAfterSave={onRestartAfterSave}
      />,
    );

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );

    await user.click(screen.getByRole('button', { name: /save and restart/i }));

    // Spinner overlay must clear once onRestartAfterSave resolves
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).toBeInTheDocument(),
    );
    expect(screen.queryByText(/restarting/i)).not.toBeInTheDocument();
  });

  it('calls setCanProceed(undefined) on mount to suppress the shell Next button entirely', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(undefined);
  });

  it('renders name and code inputs with accessible labels', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(screen.getByLabelText(/registration name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration code/i)).toBeInTheDocument();
  });

  it('renders a Paratext Registry link pointing at the selected server', async () => {
    mockCommands({ url: 'https://registry-dev.paratext.org/' });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    await waitFor(() => expect(link).toHaveAttribute('href', 'https://registry-dev.paratext.org/'));
  });

  it('falls back to the production registry link when the URL lookup fails', async () => {
    mockSendCommand.mockImplementation((command: string) =>
      command === 'paratextRegistration.getParatextRegistryUrl'
        ? Promise.reject(new Error('offline'))
        : Promise.resolve(undefined),
    );
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    // Never blank/broken: stays on the production fallback.
    expect(link).toHaveAttribute('href', 'https://registry.paratext.org/');
  });

  it('shows valid registration alert when backend confirms the name+code', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/registration accepted/i)).toBeInTheDocument());
  });

  it('auto-inserts a dash after every 6th alphanumeric character typed', async () => {
    const user = setupUser();
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
  });

  it('removes the dash and the preceding character when backspacing over an auto-inserted dash', async () => {
    const user = setupUser();
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
    await user.keyboard('{Backspace}');
    expect(codeInput).toHaveValue('ABCDE');
  });

  it('shows format warning and sets aria-invalid after debounce when code has wrong format', async () => {
    const user = setupUser();
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration code/i), 'ABC');
    expect(screen.queryByText(/code must be/i)).not.toBeInTheDocument();

    vi.advanceTimersByTime(INVALID_CODE_DISPLAY_DEBOUNCE_MS + 1);

    await waitFor(() => {
      expect(screen.getByText(/code must be/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/registration code/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('shows error and keeps Save disabled when validation request throws', async () => {
    const user = setupUser();
    mockCommands({ validateError: new Error('Network error') });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('clears validation error immediately when user types again', async () => {
    const user = setupUser();
    mockCommands({ validate: false });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());

    // Typing clears the error immediately (without waiting for debounce).
    await user.keyboard('{Backspace}');
    expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
  });

  it('validates with the correct name when code is entered before name', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => {
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextRegistration.validateParatextRegistrationData',
        expect.objectContaining({ name: 'Test User', code: VALID_CODE }),
      );
    });
  });

  it('re-disables Save immediately when a valid code is edited (synchronous state reset)', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );

    await user.keyboard('{Backspace}');
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('shows error and re-enables Save when setParatextRegistrationData fails', async () => {
    const user = setupUser();
    mockCommands({ validate: true, saveError: new Error('Server error') });

    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );

    await user.click(screen.getByRole('button', { name: /save and restart/i }));

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled();
    });
  });

  describe('re-register mode (allowContinueWithoutRegistration)', () => {
    it('shows the escape hatch and suppression checkbox only in re-register mode', () => {
      const { unmount } = render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Continue without registration' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('checkbox', { name: "Don't show this on startup again" }),
      ).toBeInTheDocument();
      expect(screen.getByText(/registration is no longer valid/i)).toBeInTheDocument();
      unmount();

      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
      expect(
        screen.queryByRole('button', { name: 'Continue without registration' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('checkbox', { name: "Don't show this on startup again" }),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/registration is no longer valid/i)).not.toBeInTheDocument();
    });

    it('escape hatch calls continueWithoutRegistration', async () => {
      const user = setupUser();
      render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Continue without registration' }));
      expect(firstRunStore.continueWithoutRegistration).toHaveBeenCalledTimes(1);
    });

    it('suppression checkbox persists platform.showRegistrationReminderOnStartup = false', async () => {
      const user = setupUser();
      render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      await user.click(screen.getByRole('checkbox', { name: "Don't show this on startup again" }));
      expect(settingsService.set).toHaveBeenCalledWith(
        'platform.showRegistrationReminderOnStartup',
        false,
      );
    });

    it('un-checking the suppression checkbox re-enables the reminder (sets true)', async () => {
      const user = setupUser();
      render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      const checkbox = screen.getByRole('checkbox', { name: "Don't show this on startup again" });
      // First click: suppress (false)
      await user.click(checkbox);
      expect(settingsService.set).toHaveBeenCalledWith(
        'platform.showRegistrationReminderOnStartup',
        false,
      );
      // Second click: un-suppress (true)
      await user.click(checkbox);
      expect(settingsService.set).toHaveBeenCalledWith(
        'platform.showRegistrationReminderOnStartup',
        true,
      );
    });

    it('escape hatch does not persist the suppression setting when checkbox is untouched', async () => {
      const user = setupUser();
      render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Continue without registration' }));
      expect(firstRunStore.continueWithoutRegistration).toHaveBeenCalledTimes(1);
      expect(settingsService.set).not.toHaveBeenCalled();
    });

    it('reverts the suppression checkbox when the settings write fails', async () => {
      const user = setupUser();
      vi.mocked(settingsService.set).mockRejectedValueOnce(new Error('write failed'));
      render(
        <IdentifyStep
          onNext={onNext}
          setCanProceed={setCanProceed}
          allowContinueWithoutRegistration
        />,
      );
      const checkbox = screen.getByRole('checkbox', { name: "Don't show this on startup again" });
      await user.click(checkbox);
      // Optimistic check reverted after the failed write, so the box matches the unchanged setting.
      await waitFor(() => expect(checkbox).not.toBeChecked());
    });
  });

  describe('demo mode', () => {
    beforeEach(() => mockIsDemoMode.mockReturnValue(true));

    it('does not call validateParatextRegistrationData in demo mode', async () => {
      const user = setupUser();
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');
      await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
      vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

      expect(mockSendCommand).not.toHaveBeenCalledWith(
        'paratextRegistration.validateParatextRegistrationData',
        expect.anything(),
      );
    });

    it('enables Save and restart when name is non-empty (no code validation needed)', async () => {
      const user = setupUser();
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');

      await waitFor(() =>
        expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
      );
    });

    it('calls onNext (not platform.restart) when Save and restart is clicked', async () => {
      const user = setupUser();
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');
      await waitFor(() =>
        expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
      );

      await user.click(screen.getByRole('button', { name: /save and restart/i }));

      expect(onNext).toHaveBeenCalledOnce();
      expect(mockSendCommand).not.toHaveBeenCalledWith('platform.restart');
      expect(mockSendCommand).not.toHaveBeenCalledWith(
        'paratextRegistration.setParatextRegistrationData',
        expect.anything(),
      );
    });
  });
});
