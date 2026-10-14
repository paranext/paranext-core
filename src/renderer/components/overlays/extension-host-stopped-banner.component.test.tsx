import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import {
  getExtensionHostNotice,
  markExtensionHostRestarted,
  reportExtensionHostStopped,
  resetExtensionHostStopped,
} from '@renderer/services/extension-host-stopped-store';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import {
  ENGLISH_FALLBACKS,
  EXTENSION_HOST_STOPPED_DISMISS_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  EXTENSION_HOST_STOPPED_RESTART_APP_KEY,
  EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTING_KEY,
  EXTENSION_HOST_STOPPED_TITLE_KEY,
  ExtensionHostStoppedBanner,
  LOCALIZED_STRING_KEYS,
  RESTART_READY_FALLBACK_MS,
} from './extension-host-stopped-banner.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({ useLocalizedStrings: vi.fn() }));
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({ useIsPowerMode: vi.fn(() => true) }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

/** What `useLocalizedStrings` returns while loading: the raw keys themselves. */
const UNRESOLVED = Object.fromEntries(LOCALIZED_STRING_KEYS.map((key) => [key, key]));

const RESTART_EXTENSIONS = {
  name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY],
};
const RESTART_APP = { name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_APP_KEY] };
const DISMISS = { name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_DISMISS_KEY] };

/** Resolves or rejects the restart command only when the test says so. */
function deferredRestart() {
  let settle: () => void = () => {};
  let fail: (error: Error) => void = () => {};
  const promise = new Promise<void>((resolve, reject) => {
    settle = resolve;
    fail = reject;
  });
  vi.mocked(sendCommand).mockReturnValue(promise);
  return { resolve: settle, reject: fail };
}

function stop(reason: 'lost-connection' | 'crashed') {
  act(() => reportExtensionHostStopped({ reason }));
}

/** What the listener does when `platform.onDidStartExtensionHost` arrives. */
function extensionHostStarts() {
  act(() => markExtensionHostRestarted());
}

describe('ExtensionHostStoppedBanner', () => {
  beforeEach(() => {
    resetExtensionHostStopped();
    resetConnectionLost();
    vi.mocked(sendCommand).mockReset();
    vi.mocked(logger.error).mockClear();
    vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, false]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps an empty live region mounted while the extension host is running', () => {
    render(<ExtensionHostStoppedBanner />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('shows the lost-connection wording in English when localization has not resolved', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_TITLE_KEY]);
    expect(banner).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeInTheDocument();
    expect(screen.getByRole('button', RESTART_APP)).toBeInTheDocument();
    expect(screen.queryByRole('button', DISMISS)).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the crashed wording for a crash', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY],
    );
  });

  it('prefers resolved translations over the English fallbacks', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        ...UNRESOLVED,
        [EXTENSION_HOST_STOPPED_TITLE_KEY]: 'Las extensiones han dejado de funcionar',
      },
      false,
    ]);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    expect(screen.getByRole('status')).toHaveTextContent('Las extensiones han dejado de funcionar');
  });

  it('sends the restart command and stays in the restarting state after the command settles', async () => {
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');

    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    expect(sendCommand).toHaveBeenCalledWith('platform.restartExtensionHost');
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'lost-connection' });
    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTING_KEY],
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    screen.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());

    // The command settles at fork time; the new process is not up yet, so nothing changes.
    await act(async () => restart.resolve());
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'lost-connection' });
    expect(screen.getAllByRole('button')).toHaveLength(2);
    screen.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
  });

  it('moves to the restarted state when the extension host announces it started', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    extensionHostStarts();

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
      ),
    );
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();
    expect(screen.getByRole('button', DISMISS)).toBeEnabled();
    expect(screen.queryByRole('button', RESTART_EXTENSIONS)).not.toBeInTheDocument();
  });

  it('falls back to the restarted state after the timeout if no start announcement comes', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });

    await act(async () => {
      vi.advanceTimersByTime(RESTART_READY_FALLBACK_MS);
    });

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted' });
  });

  it('disarms the fallback timer when the phase leaves restarting', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    await act(async () => restart.reject(new Error('main did not answer')));
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'crashed' });
    await act(async () => {
      vi.advanceTimersByTime(89_000);
    });

    vi.mocked(sendCommand).mockResolvedValue(undefined);
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    await act(async () => {
      vi.advanceTimersByTime(5_000);
    });

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });
  });

  it('dismiss clears the restarted state', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    extensionHostStarts();
    await waitFor(() => expect(screen.getByRole('button', DISMISS)).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', DISMISS));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(getExtensionHostNotice()).toBeUndefined();
  });

  it('a new stop after a restart brings the alarm back', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    extensionHostStarts();
    await waitFor(() => expect(screen.getByRole('button', DISMISS)).toBeInTheDocument());

    stop('lost-connection');

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
  });

  it('reverts to the alarm, with both buttons enabled, when the restart command rejects', async () => {
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    await act(async () => restart.reject(new Error('main did not answer')));

    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(2));
    screen.getAllByRole('button').forEach((button) => expect(button).toBeEnabled());
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'lost-connection' });
  });

  it('restarts the app from the second button', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    await userEvent.click(screen.getByRole('button', RESTART_APP));

    expect(sendCommand).toHaveBeenCalledWith('platform.restart');
  });

  it('logs and leaves the banner unchanged when restarting the app fails', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('main did not answer'));
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    await userEvent.click(screen.getByRole('button', RESTART_APP));

    await waitFor(() => expect(logger.error).toHaveBeenCalledTimes(1));
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'crashed' });
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
  });

  it('moves a stopped banner to restarted when another window restarts the extension host', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    extensionHostStarts();

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
    );
  });

  it('keeps an empty live region mounted while the connection is lost', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    act(() => reportConnectionLost());

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
