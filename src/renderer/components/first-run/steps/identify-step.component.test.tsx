import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ChangeEvent, ReactNode, Ref } from 'react';
import * as commandService from '@shared/services/command.service';
import * as firstRunStore from '@renderer/services/first-run-store';
import {
  getRegistrationValidity,
  publishRegistrationValidity,
  resetRegistrationValidityStore,
} from '@renderer/services/registration-validity-store';
import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
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
      '%paratextRegistration_label_yourRegistration%': 'Your registration',
      '%firstRun_step_identify_changeRegistration%': 'Change registration',
      '%firstRun_step_identify_keepRegistration%': 'Keep current registration',
      '%firstRun_button_next%': 'Next',
      '%firstRun_button_back%': 'Back',
      '%firstRun_step_identify_restartToApply%': 'Restart and continue',
      '%firstRun_step_identify_registrationValid%': 'Your registration is valid',
      '%firstRun_step_identify_restartToApplyNote%':
        'Your new internet settings take effect after a restart.',
    },
    false,
  ]),
}));
vi.mock('@renderer/services/first-run-store', () => ({
  isDemoMode: vi.fn(() => false),
  markJustRegistered: vi.fn(),
  markWizardRestarting: vi.fn(),
  haveInternetSettingsChanged: vi.fn(() => false),
  continueWithoutRegistration: vi.fn(),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn().mockResolvedValue(undefined) },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
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
    ref,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    ref?: Ref<HTMLButtonElement>;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled} ref={ref}>
      {children}
    </button>
  ),
  Input: ({
    id,
    value,
    onChange,
    ref,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
  }: {
    [key: string]: unknown;
    id?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    ref?: Ref<HTMLInputElement>;
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    'aria-describedby'?: string;
  }) => (
    <input
      id={id}
      value={value}
      onChange={onChange}
      ref={ref}
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
  // Faithful stand-in for the real usePromise (platform-bible-react is fully mocked here): returns
  // the default, then the callback's resolved value so `waitFor` assertions see the update.
  // Mirrors the real hook's `setValue(() => result)` — including when `result` is undefined — so a
  // regression that stops returning a fallback URL surfaces as a missing href rather than being
  // swallowed by the mock and leaving the default in place.
  usePromise: (callback?: () => Promise<unknown>, defaultValue?: unknown) => {
    // A vi.mock factory can't close over hoisted ESM imports, so require pulls the real React hooks.
    // eslint-disable-next-line global-require
    const { useState, useEffect } = require('react');
    const [value, setValue] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      let current = true;
      setIsLoading(!!callback);
      (async () => {
        if (!callback) return;
        const result = await callback();
        if (current) {
          setValue(() => result);
          setIsLoading(false);
        }
      })();
      return () => {
        current = false;
      };
    }, [callback]);
    return [value, isLoading];
  },
}));
vi.mock('lucide-react', () => ({
  CircleCheck: () => <span data-testid="circle-check-icon" />,
  AlertCircle: () => <span data-testid="alert-circle-icon" />,
}));

const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockIsDemoMode = vi.mocked(firstRunStore.isDemoMode);
const mockMarkWizardRestarting = vi.mocked(firstRunStore.markWizardRestarting);
const mockHaveInternetSettingsChanged = vi.mocked(firstRunStore.haveInternetSettingsChanged);
const mockLogger = vi.mocked(logger);

const VALID_CODE = 'ABCDEF-ABCDEF-ABCDEF-ABCDEF-ABCDEF';
const MASKED_CODE = '******-******-******-******-******';

const PRODUCTION_REGISTRY_URL = 'https://registry.paratext.org';

/**
 * Routes `sendCommand` by command name so the mount-time registry-URL fetch never consumes the mock
 * queued for validation/save. Pass per-test overrides for the validation/save outcomes.
 */
function mockCommands(
  overrides: {
    validate?: boolean;
    validateError?: Error;
    saveError?: Error;
    url?: string;
    /** The name on the existing registration (e.g. copied from Paratext 9). */
    existingName?: string;
    /** Reading the existing registration fails. */
    existingError?: Error;
  } = {},
) {
  mockSendCommand.mockImplementation((command: string) => {
    switch (command) {
      case 'paratextRegistration.getParatextRegistrationData':
        if (overrides.existingError) return Promise.reject(overrides.existingError);
        return Promise.resolve({
          name: overrides.existingName ?? '',
          code: overrides.existingName ? MASKED_CODE : '',
          email: '',
          supporterName: '',
        });
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
      case 'platform.restart':
        return Promise.resolve(undefined);
      default:
        // Every command IdentifyStep sends is named above, so an unlisted one means the component
        // grew a dependency this helper does not model. Fail loudly rather than hand back a silent
        // `undefined` that some later assertion misreads as a real answer.
        return Promise.reject(new Error(`Unexpected command: ${command}`));
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
  mockHaveInternetSettingsChanged.mockReturnValue(false);
  // Module-global and shared with the toolbar, so a value published by one test would otherwise be
  // the starting state of the next.
  resetRegistrationValidityStore();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

/**
 * Renders the step and lets its mount-time check for an existing registration settle, so the test
 * starts on whichever view (registered or form) that check chose.
 */
async function renderSettled(ui: Parameters<typeof render>[0]) {
  const result = render(ui);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  return result;
}

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
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

  it('clears a cached invalid registration in this session once the save succeeds', async () => {
    const user = setupUser();
    mockCommands({ validate: true });
    // The toolbar mounts behind the wizard and has already cached a definitive answer.
    publishRegistrationValidity('invalid');
    // A restart that never settles models the best-effort restart failing to take the process down.
    const onRestartAfterSave = vi.fn().mockReturnValue(new Promise<never>(() => {}));

    await renderSettled(
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

    // Verify that the cached registration state was corrected so the reminder dot won't nag.
    await waitFor(() => expect(getRegistrationValidity()).toBe('valid'));
  });

  it('calls onRestartAfterSave instead of platform.restart when provided', async () => {
    const user = setupUser();
    mockCommands({ validate: true });
    const onRestartAfterSave = vi.fn().mockReturnValue(new Promise<never>(() => {}));

    await renderSettled(
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

    await renderSettled(
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

  it('calls setCanProceed(undefined) on mount to suppress the shell Next button entirely', async () => {
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(undefined);
  });

  it('renders name and code inputs with accessible labels', async () => {
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(screen.getByLabelText(/registration name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration code/i)).toBeInTheDocument();
  });

  it('renders a Paratext Registry link pointing at the selected server environment', async () => {
    mockCommands({ url: 'https://registry-dev.paratext.org' });
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    await waitFor(() => expect(link).toHaveAttribute('href', 'https://registry-dev.paratext.org'));
  });

  it('falls back to the production registry link when the URL lookup fails', async () => {
    mockSendCommand.mockImplementation((command: string) =>
      command === 'paratextRegistration.getParatextRegistryUrl'
        ? Promise.reject(new Error('offline'))
        : Promise.resolve(undefined),
    );
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    // Flush the rejected lookup inside `act` so React commits the resulting state update. `waitFor`
    // cannot poll here: these tests install fake timers, which stall its polling interval.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(mockLogger.warn).toHaveBeenCalledWith(expect.stringContaining('offline'));
    // The failed lookup leaves the link on the production fallback rather than going blank.
    // Production is also usePromise's initial value, so this assertion only means something because
    // the usePromise stand-in commits whatever the callback resolves to: delete the catch block's
    // `return PRODUCTION_REGISTRY_URL` and the href disappears instead of resting on the default.
    expect(link).toHaveAttribute('href', PRODUCTION_REGISTRY_URL);
  });

  it('shows valid registration alert when backend confirms the name+code', async () => {
    const user = setupUser();
    mockCommands({ validate: true });

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/registration accepted/i)).toBeInTheDocument());
  });

  it('auto-inserts a dash after every 6th alphanumeric character typed', async () => {
    const user = setupUser();
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
  });

  it('removes the dash and the preceding character when backspacing over an auto-inserted dash', async () => {
    const user = setupUser();
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
    await user.keyboard('{Backspace}');
    expect(codeInput).toHaveValue('ABCDE');
  });

  it('shows format warning and sets aria-invalid after debounce when code has wrong format', async () => {
    const user = setupUser();
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('clears validation error immediately when user types again', async () => {
    const user = setupUser();
    mockCommands({ validate: false });

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

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

describe('IdentifyStep with an existing registration', () => {
  const onNext = vi.fn();
  const onBack = vi.fn();
  const setCanProceed = vi.fn();

  beforeEach(() => {
    onNext.mockReset();
    onBack.mockReset();
    setCanProceed.mockReset();
  });

  it('shows the existing registration as text, with the code as the backend masks it', async () => {
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    expect(screen.getByText('Your registration')).toBeInTheDocument();
    expect(screen.getByText('Pat Translator')).toBeInTheDocument();
    expect(screen.getByText(MASKED_CODE)).toBeInTheDocument();
    expect(screen.getByText('Your registration is valid')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /save and restart/i })).not.toBeInTheDocument();
  });

  it('follows the startup decision rather than asking the backend whether it is valid', async () => {
    // The gate may have counted a just-saved registration as valid while the backend still said
    // otherwise; the step must agree with the gate, which is what resumed the wizard.
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextRegistration.doesUserHaveValidRegistration',
    );
  });

  it('shows the form when the registration was not valid as the wizard started', async () => {
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    expect(screen.getByRole('button', { name: /save and restart/i })).toBeInTheDocument();
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextRegistration.getParatextRegistrationData',
    );
  });

  it('moves on with Next without saving or restarting', async () => {
    const user = setupUser();
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep
        onNext={onNext}
        onBack={onBack}
        setCanProceed={setCanProceed}
        registrationValidAtStart
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(onNext).toHaveBeenCalledOnce();
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextRegistration.setParatextRegistrationData',
      expect.anything(),
    );
    expect(mockSendCommand).not.toHaveBeenCalledWith('platform.restart');
  });

  it('restarts to apply changed internet settings instead of moving on', async () => {
    const user = setupUser();
    mockHaveInternetSettingsChanged.mockReturnValue(true);
    mockCommands({ existingName: 'Pat Translator' });
    const onRestartAfterSave = vi.fn().mockReturnValue(new Promise<never>(() => {}));
    await renderSettled(
      <IdentifyStep
        onNext={onNext}
        setCanProceed={setCanProceed}
        registrationValidAtStart
        onRestartAfterSave={onRestartAfterSave}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Restart and continue' }));

    expect(mockMarkWizardRestarting).toHaveBeenCalledOnce();
    expect(onRestartAfterSave).toHaveBeenCalledOnce();
    expect(onNext).not.toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextRegistration.setParatextRegistrationData',
      expect.anything(),
    );
  });

  it('offers Back to the previous step', async () => {
    const user = setupUser();
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep
        onNext={onNext}
        onBack={onBack}
        setCanProceed={setCanProceed}
        registrationValidAtStart
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(onBack).toHaveBeenCalledOnce();
  });

  it('switches to an empty form on Change registration, and back on Keep current registration', async () => {
    const user = setupUser();
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    await user.click(screen.getByRole('button', { name: 'Change registration' }));

    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
    expect(screen.getByLabelText(/registration name/i)).toHaveValue('');
    expect(screen.getByLabelText(/registration code/i)).toHaveValue('');

    await user.type(screen.getByLabelText(/registration name/i), 'Someone Else');
    await user.click(screen.getByRole('button', { name: 'Keep current registration' }));

    expect(screen.getByText('Pat Translator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('moves focus into the view that replaced the button just pressed', async () => {
    const user = setupUser();
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    await user.click(screen.getByRole('button', { name: 'Change registration' }));
    expect(screen.getByLabelText(/registration name/i)).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Keep current registration' }));
    expect(screen.getByRole('button', { name: 'Change registration' })).toHaveFocus();
  });

  it('does not move focus when the step first opens', async () => {
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    expect(screen.getByRole('button', { name: 'Change registration' })).not.toHaveFocus();
  });

  it('keeps the registered view, with the values blank, when they cannot be read', async () => {
    mockCommands({ existingError: new Error('backend down') });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    expect(screen.queryByText(MASKED_CODE)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(mockLogger.warn).toHaveBeenCalled();
  });

  it('shows the error and stays on the step when the restart to apply settings fails', async () => {
    const user = setupUser();
    mockHaveInternetSettingsChanged.mockReturnValue(true);
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep
        onNext={onNext}
        setCanProceed={setCanProceed}
        registrationValidAtStart
        onRestartAfterSave={vi.fn().mockRejectedValue(new Error('restart refused'))}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Restart and continue' }));

    expect(await screen.findByText('restart refused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restart and continue' })).toBeInTheDocument();
    expect(screen.queryByText(/restarting/i)).not.toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it('never shows the registered view in re-register mode', async () => {
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep
        onNext={onNext}
        setCanProceed={setCanProceed}
        registrationValidAtStart
        allowContinueWithoutRegistration
      />,
    );

    expect(screen.getByRole('button', { name: /save and restart/i })).toBeInTheDocument();
  });

  it('never shows the registered view in demo mode', async () => {
    mockIsDemoMode.mockReturnValue(true);
    mockCommands({ existingName: 'Pat Translator' });
    await renderSettled(
      <IdentifyStep onNext={onNext} setCanProceed={setCanProceed} registrationValidAtStart />,
    );

    expect(screen.getByRole('button', { name: /save and restart/i })).toBeInTheDocument();
  });
});
