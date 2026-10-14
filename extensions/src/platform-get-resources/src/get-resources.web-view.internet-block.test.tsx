// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useState, type ComponentType } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import { INTERNET_BLOCKED_NOTIFICATION_ID } from './internet-block-notification.utils';

/*
 * The classification itself is unit-tested; what only a render can show is that the web view
 * actually raises the notification — the one surface that names the setting responsible and offers
 * to open it.
 */

const { mockSendCommand, mockSendNotification, mockInstallDblResource } = vi.hoisted(() => ({
  mockSendCommand: vi.fn(),
  mockSendNotification: vi.fn(),
  mockInstallDblResource: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: (...args: unknown[]) => mockSendCommand(...args) },
    notifications: { send: (...args: unknown[]) => mockSendNotification(...args) },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    { '%resources_get%': 'Get', '%resources_retry%': 'Try again' },
    false,
  ],
  useDataProvider: () => ({
    installDblResource: (...args: unknown[]) => mockInstallDblResource(...args),
    uninstallDblResource: vi.fn(),
  }),
}));

// Must follow the vi.mock calls; the file assigns globalThis.webViewComponent as a side effect.
// eslint-disable-next-line import/first
import './get-resources.web-view';

// The two blocks' texts, as they arrive across the process boundary: ParatextData's own, and the
// data provider's gate on the "Disable access to some Bible translation services" setting.
const ALL_ACCESS_DISABLED_ERROR =
  'JSON-RPC Request error (-32000): Bug in Paratext caused attempted access to Internet. Request has been blocked.';
const SERVICES_BLOCKED_ERROR =
  'JSON-RPC Request error (-32000): Internet access is disabled in “Internet & connectivity”. Please enable it and try again. (INTERNET_SERVICES_BLOCKED)';

const RESOURCE = {
  dblEntryUid: 'uid-1',
  displayName: 'NIV',
  fullName: 'New International Version',
  bestLanguageName: 'English',
  type: 'ScriptureResource' as const,
  size: 1000,
  installed: false,
  updateAvailable: false,
  projectId: 'proj-1',
};

beforeEach(() => {
  vi.clearAllMocks();
  // Radix uses ResizeObserver, which jsdom does not implement.
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}

    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}

    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

function renderWebView() {
  // globalThis is a special interface; cast to read the property the web view file added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const GetResourcesWebView = (globalThis as Record<string, unknown>)
    .webViewComponent as ComponentType<WebViewProps>;
  // Only the props this web view reads; the double cast avoids restating every optional field.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const props = {
    useWebViewState: (_key: string, defaultValue: unknown) => useState(defaultValue),
  } as unknown as WebViewProps;
  return render(<GetResourcesWebView {...props} />);
}

describe('Get Resources web view', () => {
  it('reports a blocked catalog fetch with the notification that opens the setting', async () => {
    mockSendCommand.mockRejectedValue(new Error(SERVICES_BLOCKED_ERROR));

    renderWebView();

    await waitFor(() =>
      expect(mockSendNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%data_loading_error_internetAccess_disabled_2%',
          clickCommand: 'paratextRegistration.showInternetSettings',
          notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
        }),
      ),
    );
  });

  it('reports a blocked install with the notification that opens the setting', async () => {
    mockSendCommand.mockResolvedValue({ status: 'available', resources: [RESOURCE] });
    mockInstallDblResource.mockRejectedValue(new Error(ALL_ACCESS_DISABLED_ERROR));

    renderWebView();

    fireEvent.click(await screen.findByRole('button', { name: 'Get' }));

    await waitFor(() =>
      expect(mockSendNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '%data_loading_error_internetAccess_disabled_2%',
          notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
        }),
      ),
    );
  });

  // The notification is raised from an effect keyed on the committed fetch rather than from the
  // fetch's own catch, so a retry that succeeds does not leave a block notification standing over a
  // list that loaded fine — and does not raise a second one.
  it('does not report the block again once a retry succeeds', async () => {
    mockSendCommand
      .mockRejectedValueOnce(new Error(SERVICES_BLOCKED_ERROR))
      .mockResolvedValue({ status: 'available', resources: [RESOURCE] });

    renderWebView();

    await waitFor(() => expect(mockSendNotification).toHaveBeenCalledTimes(1));

    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('button', { name: 'Get' })).toBeInTheDocument();
    expect(mockSendNotification).toHaveBeenCalledTimes(1);
  });

  it('stays quiet for a failure that is not an internet block', async () => {
    mockSendCommand.mockResolvedValue({ status: 'available', resources: [RESOURCE] });
    mockInstallDblResource.mockRejectedValue(
      new Error('JSON-RPC Request error (-32000): This resource is no longer available'),
    );

    renderWebView();

    fireEvent.click(await screen.findByRole('button', { name: 'Get' }));

    await waitFor(() => expect(mockInstallDblResource).toHaveBeenCalled());
    expect(mockSendNotification).not.toHaveBeenCalled();
  });
});
