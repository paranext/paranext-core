// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SyncBlockedBanner } from './sync-blocked-banner.component';

const { sendCommand } = vi.hoisted(() => ({
  sendCommand: vi.fn<(command: string, ...args: unknown[]) => Promise<unknown>>(),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand },
    network: { getNetworkEvent: () => () => () => true },
  },
  logger: { info: vi.fn(), warn: vi.fn() },
}));

const STRINGS = {
  '%webView_platformScriptureEditor_syncEditBlocked_banner_2%': 'Editing is paused while syncing',
  '%general_cancel%': 'Cancel',
};

function renderBanner() {
  render(<SyncBlockedBanner localizedStrings={STRINGS} />);
  return screen.getByRole('button', { name: 'Cancel' });
}

describe('SyncBlockedBanner — Cancel', () => {
  beforeEach(() => {
    sendCommand.mockReset();
  });

  // The same Cancel as the progress toast's and the toolbar's, so projects waiting in the sync
  // queue are asked about.
  it('cancels through the cancel prompt and stays single-shot while it is pending', async () => {
    sendCommand.mockReturnValue(new Promise(() => {}));
    const cancel = renderBanner();

    fireEvent.click(cancel);

    expect(sendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.cancelSyncPrompt');
    expect(sendCommand).not.toHaveBeenCalledWith('paratextBibleSendReceive.cancelSync');
    expect(cancel).toBeDisabled();
  });

  it('offers Cancel again when nothing was cancelled', async () => {
    sendCommand.mockResolvedValue(false);
    const cancel = renderBanner();

    fireEvent.click(cancel);

    await waitFor(() => expect(cancel).toBeEnabled());
  });

  it('stays disabled once the cancel has been sent', async () => {
    let resolveCancel: ((isCancelSent: boolean) => void) | undefined;
    sendCommand.mockReturnValue(
      new Promise((resolve) => {
        resolveCancel = resolve;
      }),
    );
    const cancel = renderBanner();

    fireEvent.click(cancel);
    resolveCancel?.(true);
    await waitFor(() => expect(sendCommand).toHaveBeenCalledTimes(1));
    // Let the resolution reach the handler before checking it did not re-enable the button
    await Promise.resolve();
    await Promise.resolve();

    expect(cancel).toBeDisabled();
  });

  it('offers Cancel again when the request is rejected', async () => {
    sendCommand.mockRejectedValue(new Error('send/receive is not answering'));
    const cancel = renderBanner();

    fireEvent.click(cancel);

    await waitFor(() => expect(cancel).toBeEnabled());
    expect(sendCommand).not.toHaveBeenCalledWith('paratextBibleSendReceive.cancelSync');
  });

  // The backend reports the running sync, so the banner can show while the Send/Receive extension
  // that serves the prompt is not running
  it('cancels the sync directly when the cancel prompt is not registered', async () => {
    sendCommand.mockImplementation(async (command: string) => {
      if (command === 'paratextBibleSendReceive.cancelSyncPrompt')
        throw new Error(
          "JSON-RPC Request error (-32601): 'command:paratextBibleSendReceive.cancelSyncPrompt' not found",
        );
      return undefined;
    });
    const cancel = renderBanner();

    fireEvent.click(cancel);

    await waitFor(() =>
      expect(sendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.cancelSync'),
    );
    await Promise.resolve();
    expect(cancel).toBeDisabled();
  });
});
