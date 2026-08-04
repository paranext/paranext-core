// @vitest-environment jsdom

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { getJsonRpcRequestErrorMessagePrefix } from '@shared/data/rpc.model';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import { wait } from 'platform-bible-utils';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { InternetSettingsStep } from './internet-settings-step.component';

// Return resolved strings so the Retry button and the "connecting" message have accessible
// text — avoids getByRole('/retry/i') failing because an empty map yields undefined content.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%internetSettings_button_retry%': 'Retry',
      '%firstRun_step_internetSettings_connecting%': 'Getting things ready…',
      '%firstRun_step_internetSettings_loadError%':
        "We couldn't get things ready. Please try again in a moment.",
    },
    false,
  ]),
}));

const mockSendCommand = vi.fn();
vi.mock('@shared/services/command.service', () => ({
  sendCommand: (...args: unknown[]) => mockSendCommand(...args),
}));

// The load-failure path shows a friendly message but logs the raw RPC error — capture warns to assert it.
const mockLoggerWarn = vi.fn();
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: (...args: unknown[]) => mockLoggerWarn(...args) },
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
}));

vi.mock('platform-bible-react/experimental', () => ({
  InternetAccessOptionList: ({ onChange }: { onChange: (value: string) => void }) => (
    <button data-testid="option-list" type="button" onClick={() => onChange('Enabled')}>
      option list
    </button>
  ),
  DeveloperSection: ({ onServerChange }: { onServerChange: (server: string) => void }) => (
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

// The exact "method not found" message sendCommand throws while the handler is still registering —
// built from the same producer the RPC layer uses (network.service.ts), so the fixture stays faithful
// to production and can't silently drift from what the component actually matches.
const methodNotFoundError = () =>
  new Error(
    `${getJsonRpcRequestErrorMessagePrefix(JSONRPCErrorCode.MethodNotFound)}: command:paratextRegistration.getParatextDataInternetSettings not found`,
  );

// A method-not-found rejection that arrives after `ms` of (faked) time — models a real attempt
// blocking on the command layer's ~10 s retry before -32601 propagates, so a test can span more than
// one window instead of rejecting instantly.
async function rejectAsUnregisteredAfter(ms: number): Promise<never> {
  await wait(ms);
  throw methodNotFoundError();
}

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

  it('shows a friendly error alert and retry button when the initial fetch fails', async () => {
    mockSendCommand.mockRejectedValue(new Error('network error'));
    renderStep();

    await waitFor(() => expect(screen.getByText(/couldn't get things ready/i)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    // Raw error is logged, not shown.
    expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('network error'));
  });

  it('clears the error and enables Next when retry succeeds', async () => {
    mockSendCommand
      .mockRejectedValueOnce(new Error('network error'))
      .mockResolvedValue(MOCK_SETTINGS);
    const { setCanProceed } = renderStep();

    await waitFor(() => expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
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

  describe('startup race with the .NET data provider', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    // Wraps timer advancement in act(...) so the retry loop's state updates flush cleanly.
    const advance = (ms: number) => act(() => vi.advanceTimersByTimeAsync(ms));

    it('retries while the handler is unregistered, then shows settings without flashing an error', async () => {
      mockSendCommand
        .mockRejectedValueOnce(methodNotFoundError())
        .mockRejectedValueOnce(methodNotFoundError())
        .mockResolvedValue(MOCK_SETTINGS);
      const { setCanProceed } = renderStep();

      // While retrying, the spinner stays and no error/Retry surfaces.
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();

      await advance(1500); // two 500 ms backoffs, then the resolving attempt

      expect(screen.getByTestId('option-list')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(setCanProceed).toHaveBeenCalledWith(true);
    });

    it('shows "Getting things ready…" once the load passes the wall-clock delay', async () => {
      mockSendCommand.mockRejectedValue(methodNotFoundError());
      renderStep();

      await advance(1500); // before the 2 s connecting-message delay
      expect(screen.queryByText(/getting things ready/i)).not.toBeInTheDocument();

      await advance(1000); // now past 2 s
      expect(screen.getByText(/getting things ready/i)).toBeInTheDocument();
      // Still within budget — no error yet.
      expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
    });

    it('re-issues across more than one command-layer window, then loads once registration completes', async () => {
      // Two attempts that each block ~9 s (like the command layer's own retry) before failing, then
      // success. This is the actual bug scenario: registration outlasts a single ~10 s window.
      mockSendCommand
        .mockImplementationOnce(() => rejectAsUnregisteredAfter(9_000))
        .mockImplementationOnce(() => rejectAsUnregisteredAfter(9_000))
        .mockResolvedValue(MOCK_SETTINGS);
      const { setCanProceed } = renderStep();

      // One ~9 s window is not enough — still retrying, no error.
      await advance(9_500);
      expect(screen.queryByTestId('option-list')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      // A second window later, registration completes and the settings load.
      await advance(10_000);
      expect(screen.getByTestId('option-list')).toBeInTheDocument();
      expect(setCanProceed).toHaveBeenCalledWith(true);
    });

    it('clears the connecting message once a later attempt succeeds', async () => {
      mockSendCommand
        .mockImplementationOnce(() => rejectAsUnregisteredAfter(9_000)) // keeps attempt pending past 2 s
        .mockResolvedValue(MOCK_SETTINGS);
      renderStep();

      await advance(2_500); // connecting message shows while the first attempt is still pending
      expect(screen.getByText(/getting things ready/i)).toBeInTheDocument();

      await advance(7_500); // first attempt fails (~9 s), the retry resolves
      expect(screen.getByTestId('option-list')).toBeInTheDocument();
      expect(screen.queryByText(/getting things ready/i)).not.toBeInTheDocument();
    });

    it('surfaces the real method-not-found error and Retry once the startup budget is spent', async () => {
      mockSendCommand.mockRejectedValue(methodNotFoundError());
      renderStep();

      // Still retrying just before the budget expires — no error yet.
      await advance(29_000);
      expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();

      // Just past the ~30 s budget the friendly error surfaces and the connecting message clears.
      await advance(2_000);
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
      expect(screen.getByText(/couldn't get things ready/i)).toBeInTheDocument();
      expect(screen.queryByText(/getting things ready/i)).not.toBeInTheDocument();
      // The raw -32601 is logged for debugging, not shown to the user.
      expect(screen.queryByText(/-32601/)).not.toBeInTheDocument();
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('-32601'));
    });

    it('ignores a superseded load — a stale attempt cannot clobber a newer one', async () => {
      // First load blocks then fails; a prop change starts a second load that resolves.
      mockSendCommand
        .mockImplementationOnce(() => rejectAsUnregisteredAfter(5_000))
        .mockResolvedValue(MOCK_SETTINGS);
      const { rerender } = render(
        <InternetSettingsStep onNext={vi.fn()} setCanProceed={vi.fn()} />,
      );

      // Changing setCanProceed identity re-runs load() (a new generation) while the first is pending.
      await act(async () => {
        rerender(<InternetSettingsStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
      });

      // The second load resolves; the first load's late rejection must NOT surface an error.
      await advance(6_000);
      expect(screen.getByTestId('option-list')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('surfaces a non-method-not-found error immediately without retrying', async () => {
    mockSendCommand.mockRejectedValue(new Error('network error'));
    renderStep();

    await waitFor(() => expect(screen.getByText(/couldn't get things ready/i)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(mockSendCommand).toHaveBeenCalledTimes(1);
  });
});
