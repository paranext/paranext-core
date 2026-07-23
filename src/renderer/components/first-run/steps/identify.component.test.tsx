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
} from './identify.component';

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

  it('calls setCanProceed(false) on mount to keep shell Next permanently disabled', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(false);
  });

  it('renders name and code inputs with accessible labels', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(screen.getByLabelText(/registration name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration code/i)).toBeInTheDocument();
  });

  it('renders Save and restart button disabled initially', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('renders a Paratext Registry link', () => {
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);
    const link = screen.getByRole('link', { name: /visit paratext registry/i });
    expect(link).toHaveAttribute('href', 'https://registry.paratext.org/');
  });

  it('calls validateParatextRegistrationData after debounce when name + valid code are entered', async () => {
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

  it('shows valid registration alert when backend confirms the name+code', async () => {
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/registration accepted/i)).toBeInTheDocument());
  });

  it('shows invalid registration alert when backend rejects the name+code', async () => {
    mockSendCommand.mockResolvedValueOnce(false);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  it('enables Save and restart once backend confirms validity', async () => {
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    await user.type(screen.getByLabelText(/registration name/i), 'Test User');
    await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
    vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );
  });

  it('calls setParatextRegistrationData then platform.restart immediately on save', async () => {
    mockSendCommand
      .mockResolvedValueOnce(true) // validateParatextRegistrationData
      .mockResolvedValueOnce(undefined) // setParatextRegistrationData
      .mockResolvedValueOnce(undefined); // platform.restart
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
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextRegistration.setParatextRegistrationData',
        expect.objectContaining({ name: 'Test User', code: VALID_CODE }),
      );
      expect(mockSendCommand).toHaveBeenCalledWith('platform.restart');
    });
    // Verify restart immediately followed save — no intermediate commands between them
    const calls = mockSendCommand.mock.calls.map((c) => c[0]);
    const saveIdx = calls.indexOf('paratextRegistration.setParatextRegistrationData');
    const restartIdx = calls.indexOf('platform.restart');
    expect(saveIdx).toBeLessThan(restartIdx);
  });

  it('enters Restarting state after save (button disabled + label changes, inputs disabled)', async () => {
    mockSendCommand
      .mockResolvedValueOnce(true) // validate
      .mockResolvedValueOnce(undefined) // set
      .mockReturnValueOnce(new Promise(() => {})); // restart — never settles (process reboots)
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
    expect(screen.getByRole('button', { name: /restarting/i })).toBeDisabled();
    expect(screen.getByLabelText(/registration name/i)).toBeDisabled();
    expect(screen.getByLabelText(/registration code/i)).toBeDisabled();
  });

  it('shows error and re-enables button when setParatextRegistrationData fails', async () => {
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

  it('validates with the correct name when code is entered before name', async () => {
    mockSendCommand.mockResolvedValueOnce(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

    // Enter code first, then name — exercises the onNameChange → validateRegistration(code, newName) path
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

    // Backspace one char — Save must disable synchronously before any new debounce fires
    await user.keyboard('{Backspace}');
    expect(screen.getByRole('button', { name: /save and restart/i })).toBeDisabled();
  });

  describe('demo mode', () => {
    beforeEach(() => mockIsDemoMode.mockReturnValue(true));

    it('does not call validateParatextRegistrationData in demo mode', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');
      await user.type(screen.getByLabelText(/registration code/i), VALID_CODE);
      vi.advanceTimersByTime(VALIDATION_DEBOUNCE_MS + 1);

      // Advance deterministically past the debounce, then assert synchronously.
      // waitFor(.not) would pass immediately on the first poll — not meaningful.
      expect(mockSendCommand).not.toHaveBeenCalledWith(
        'paratextRegistration.validateParatextRegistrationData',
        expect.anything(),
      );
    });

    it('enables Save and restart when name is non-empty (no code validation needed)', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<IdentifyStep onNext={onNext} setCanProceed={setCanProceed} />);

      await user.type(screen.getByLabelText(/registration name/i), 'Demo User');
      // No code entered — button should be enabled in demo mode once name is filled

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
