import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ExecutionActivationContext } from '@papi/core';

/*
 * Pins the fix for review finding #9 on PR #2913: `showInternetSettings` is the `clickCommand`
 * target of two notifications, which invoke it with the notification's own id string as its first
 * argument. Before the fix, that string reached a `requestDeveloperSettings?: boolean` parameter;
 * taking no parameters at all removes the type mismatch at its root, and these tests reproduce the
 * notification call shape to prove it can never unlock the server-selection control.
 */

const { mockOpenWebView, registeredCommands } = vi.hoisted(() => ({
  mockOpenWebView: vi.fn(async () => 'internet-settings-1'),
  registeredCommands: new Map<string, (...args: unknown[]) => unknown>(),
}));

vi.mock('@papi/backend', () => ({
  default: {
    commands: {
      registerCommand: vi.fn(async (name: string, handler: (...args: unknown[]) => unknown) => {
        registeredCommands.set(name, handler);
        return { dispose: vi.fn() };
      }),
    },
    webViews: { openWebView: mockOpenWebView },
    webViewProviders: {
      registerWebViewProvider: vi.fn(async () => ({ dispose: vi.fn() })),
    },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('./paratext-registration.web-view-provider', () => ({
  ParatextRegistrationWebViewProvider: vi.fn(() => ({})),
  paratextRegistrationWebViewType: 'paratextRegistration.registrationView',
}));

vi.mock('./internet-settings.web-view-provider', () => ({
  InternetSettingsWebViewProvider: vi.fn(() => ({})),
  internetSettingsWebViewType: 'paratextRegistration.internetSettingsView',
}));

// Must follow the vi.mock() calls so `activate` registers commands against the mock boundaries
// above.
// eslint-disable-next-line import/first
import { activate } from './main';

function getRegisteredCommand(name: string): (...args: unknown[]) => unknown {
  const command = registeredCommands.get(name);
  if (!command) throw new Error(`Command ${name} was not registered`);
  return command;
}

describe('paratext-registration main — Internet Settings commands', () => {
  beforeEach(async () => {
    registeredCommands.clear();
    mockOpenWebView.mockClear();
    // The literal supplies only what `activate` reads from the context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await activate({ registrations: { add: vi.fn() } } as unknown as ExecutionActivationContext);
  });

  it('showInternetSettings never requests developer settings, even invoked with a notification id string', async () => {
    const showInternetSettings = getRegisteredCommand('paratextRegistration.showInternetSettings');

    // Reproduces how the notification service invokes a clickCommand: with the notification's own
    // id as the first (here, undeclared) argument.
    await showInternetSettings('platform.internetBlocked');

    expect(mockOpenWebView).toHaveBeenCalledWith(
      'paratextRegistration.internetSettingsView',
      expect.anything(),
      expect.objectContaining({ requestDeveloperSettings: false }),
    );
  });

  it('showInternetSettingsWithServerSelection always requests developer settings', async () => {
    const showInternetSettingsWithServerSelection = getRegisteredCommand(
      'paratextRegistration.showInternetSettingsWithServerSelection',
    );

    await showInternetSettingsWithServerSelection();

    expect(mockOpenWebView).toHaveBeenCalledWith(
      'paratextRegistration.internetSettingsView',
      expect.anything(),
      expect.objectContaining({ requestDeveloperSettings: true }),
    );
  });
});
