import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as commandService from '@shared/services/command.service';
import * as firstRunStore from '@renderer/services/first-run-store';
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
      '%general_error_title%': 'Error',
    },
    false,
  ]),
}));
vi.mock('@renderer/services/first-run-store', () => ({ isDemoMode: vi.fn(() => false) }));

const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockIsDemoMode = vi.mocked(firstRunStore.isDemoMode);

const VALID_CODE = 'ABCDEF-ABCDEF-ABCDEF-ABCDEF-ABCDEF';

beforeEach(() => {
  vi.useFakeTimers();
  mockSendCommand.mockReset();
  mockIsDemoMode.mockReturnValue(false);
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('IdentifyStep', () => {
  const onNext = vi.fn();
  const setCanProceed = vi.fn();

  beforeEach(() => {
    onNext.mockReset();
    setCanProceed.mockReset();
  });

  it('Save button is disabled until both name and code fields are non-empty', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockResolvedValueOnce(false);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());
    expect(onNext).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('replaces form with restart messaging after validation success and save', async () => {
    mockSendCommand
      .mockResolvedValueOnce(true) // validateParatextRegistrationData
      .mockResolvedValueOnce(undefined) // setParatextRegistrationData
      .mockReturnValueOnce(new Promise(() => {})); // platform.restart — never settles
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand
      .mockResolvedValueOnce(true) // validateParatextRegistrationData
      .mockResolvedValueOnce(undefined); // setParatextRegistrationData
    const onRestartAfterSave = vi.fn().mockReturnValue(new Promise<never>(() => {}));
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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

  it('calls setCanProceed(undefined) on mount to suppress the shell Next button entirely', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(undefined);
  });

  it('renders name and code inputs with accessible labels', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(screen.getByLabelText(/registration name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration code/i)).toBeInTheDocument();
  });

  it('renders a Paratext Registry link', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    expect(link).toHaveAttribute('href', 'https://registry.paratext.org/');
  });

  it('shows valid registration alert when backend confirms the name+code', async () => {
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/registration accepted/i)).toBeInTheDocument());
  });

  it('auto-inserts a dash after every 6th alphanumeric character typed', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
  });

  it('removes the dash and the preceding character when backspacing over an auto-inserted dash', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    const codeInput = screen.getByLabelText(/registration code/i);
    await user.type(codeInput, 'ABCDEF');
    expect(codeInput).toHaveValue('ABCDEF-');
    await user.keyboard('{Backspace}');
    expect(codeInput).toHaveValue('ABCDE');
  });

  it('shows format warning and sets aria-invalid after debounce when code has wrong format', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockRejectedValueOnce(new Error('Network error'));
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('clears validation error immediately when user types again', async () => {
    mockSendCommand.mockResolvedValueOnce(false);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
    mockSendCommand.mockResolvedValueOnce(true).mockRejectedValueOnce(new Error('Server error'));
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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

  describe('demo mode', () => {
    beforeEach(() => mockIsDemoMode.mockReturnValue(true));

    it('does not call validateParatextRegistrationData in demo mode', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');

      await waitFor(() =>
        expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
      );
    });

    it('calls onNext (not platform.restart) when Save and restart is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
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
