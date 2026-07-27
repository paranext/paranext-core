// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { InternetSettingsStep } from './internet-settings-step.component';

// Return a resolved retry-key so the Retry button has an accessible name — avoids
// getByRole('/retry/i') failing because an empty map yields undefined button text.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{ '%internetSettings_button_retry%': 'Retry' }, false]),
}));

const mockSendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => mockSendCommand(...args),
}));

// Targeted stubs — do NOT use importOriginal spread here. Spreading the whole
// platform-bible-react barrel evaluates shadcn/Radix components that require
// ResizeObserver and a CSS import, which jsdom doesn't provide. Stub only what
// InternetSettingsStep actually uses.
vi.mock('platform-bible-react', () => ({
  Alert: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <div role="alert" data-variant={variant}>
      {children}
    </div>
  ),
  AlertDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  Spinner: () => <div data-testid="spinner" />,
  InternetAccessOptionList: ({ onChange }: { onChange: (v: string) => void }) => (
    <button data-testid="option-list" type="button" onClick={() => onChange('Enabled')}>
      option list
    </button>
  ),
  DeveloperSection: ({ onServerChange }: { onServerChange: (s: string) => void }) => (
    <button data-testid="dev-section" type="button" onClick={() => onServerChange('Development')}>
      dev section
    </button>
  ),
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: [],
  DEVELOPER_SECTION_STRING_KEYS: [],
}));

const MOCK_SETTINGS = {
  permittedInternetUse: 'VpnRequired' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

function renderStep(setCanProceed = vi.fn()) {
  const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
  return { ...render(<InternetSettingsStep {...props} />), setCanProceed };
}

describe('InternetSettingsStep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables Next during the initial fetch then enables it after fetch resolves', async () => {
    mockSendCommand.mockResolvedValue(MOCK_SETTINGS);
    const { setCanProceed } = renderStep();

    // Mount must call setCanProceed(false) before the async fetch
    expect(setCanProceed).toHaveBeenCalledWith(false);
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('shows an error alert and retry button when the initial fetch fails', async () => {
    mockSendCommand.mockRejectedValue(new Error('network error'));
    renderStep();

    await waitFor(() => expect(screen.getByText(/network error/i)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('clears the error and enables Next when retry succeeds', async () => {
    mockSendCommand
      .mockRejectedValueOnce(new Error('network error'))
      .mockResolvedValue(MOCK_SETTINGS);
    const { setCanProceed } = renderStep();

    await waitFor(() => expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => expect(screen.queryByText(/network error/i)).not.toBeInTheDocument());
    expect(setCanProceed).toHaveBeenCalledWith(true);
  });

  it('calls setParatextDataInternetSettings immediately when a selection changes', async () => {
    mockSendCommand.mockResolvedValue(MOCK_SETTINGS);
    renderStep();

    await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
    await userEvent.click(screen.getByTestId('option-list'));

    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextRegistration.setParatextDataInternetSettings',
      expect.objectContaining({ permittedInternetUse: 'Enabled' }),
    );
  });

  it('shows a save error alert and disables Next when a save fails', async () => {
    mockSendCommand
      .mockResolvedValueOnce(MOCK_SETTINGS) // initial fetch succeeds
      .mockRejectedValue(new Error('save failed')); // all saves fail
    const { setCanProceed } = renderStep();

    await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
    // setCanProceed(false) must be called after the failed save
    const calls = setCanProceed.mock.calls.map((c) => c[0]);
    expect(calls.at(-1)).toBe(false);
  });

  it('clears the save error and re-enables Next when the next save succeeds', async () => {
    mockSendCommand
      .mockResolvedValueOnce(MOCK_SETTINGS) // initial fetch
      .mockRejectedValueOnce(new Error('save failed')) // first save fails
      .mockResolvedValue(MOCK_SETTINGS); // subsequent saves succeed
    const { setCanProceed } = renderStep();

    await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
    await userEvent.click(screen.getByTestId('option-list')); // triggers failing save
    await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());

    await userEvent.click(screen.getByTestId('dev-section')); // triggers succeeding save
    await waitFor(() => expect(screen.queryByText(/save failed/i)).not.toBeInTheDocument());
    expect(setCanProceed).toHaveBeenLastCalledWith(true);
  });
});
