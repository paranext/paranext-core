import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as commandService from '@shared/services/command.service';
import * as firstRunStore from '@renderer/services/first-run-store';
import { IdentifyStep, VALIDATION_DEBOUNCE_MS } from './identify.component';

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
});
