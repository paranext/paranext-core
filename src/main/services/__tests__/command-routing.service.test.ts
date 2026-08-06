import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startCommandRoutingService } from '@main/services/command-routing.service';
import { withWindows } from '@main/services/__tests__/routing-proxy-test.util';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getWindows: vi.fn(),
  getReadyWindowIds: vi.fn(),
  registerRequestHandler: vi.fn(),
  request: vi.fn(),
  networkObjectGet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getWindows: mocks.getWindows,
  getReadyWindowIds: mocks.getReadyWindowIds,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  request: mocks.request,
  // Pulled in transitively by the network object service; unused by the routing proxies
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
}));

/** A scoped per-window WebViewService whose web views are the given ids */
function windowService(openWebViewIds: string[]) {
  return {
    getOpenWebViewDefinition: vi.fn(async (webViewId: string) =>
      openWebViewIds.includes(webViewId) ? { id: webViewId } : undefined,
    ),
  };
}

/**
 * Wire windows whose scoped WebViewServices own the given web view ids, so a command carrying a web
 * view id can be routed by ownership. Windows named in `unreadyWindowIds` are tracked but have not
 * registered their services yet.
 */
function withWindowsOwning(
  webViewIdsByWindowId: Record<number, string[]>,
  options?: { unreadyWindowIds?: number[] },
) {
  const servicesByWindowId = Object.fromEntries(
    Object.entries(webViewIdsByWindowId).map(([windowId, ownedIds]) => [
      windowId,
      windowService(ownedIds),
    ]),
  );
  withWindows(mocks, servicesByWindowId, options);
  return servicesByWindowId;
}

/** Registrations the service made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown; options: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs, options]) => [
      requestType,
      { handler, docs, options },
    ]),
  );
}

describe('renderer-hosted request routing proxies', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getWindows.mockReturnValue([]);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    mocks.request.mockResolvedValue('result');
    await startCommandRoutingService();
  });

  test('claims the generic command names so callers never address a window directly', () => {
    expect(registrations().has('command:platform.openSettings')).toBe(true);
  });

  test('claims the generic dialog request names too', () => {
    const claimed = registrations();
    expect(claimed.has('dialog:showDialog')).toBe(true);
    expect(claimed.has('dialog:selectProject')).toBe(true);
    expect(claimed.has('dialog:showAboutDialog')).toBe(true);
  });

  test('forwards a command to the focused window’s scoped handler', async () => {
    await registrations().get('command:platform.openSettings')?.handler('arg');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2', 'arg');
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const { handler } = registrations().get('command:platform.openSettings') ?? {};
    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(mocks.request).toHaveBeenLastCalledWith('command:platform.openSettings-3');
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(registrations().get('command:platform.openSettings')?.handler()).rejects.toThrow(
      'No windows available',
    );
  });

  test('disables the timeout on dialog proxies, since a dialog waits for the user', () => {
    expect(registrations().get('dialog:showDialog')?.options).toEqual({ timeoutMilliseconds: 0 });
  });

  test('documents the generic name, which is the one consumers call', () => {
    // The scoped names renderers register under are an implementation detail and stay undocumented
    expect(
      registrations().get('command:platform.navigateLeftInReferenceHistory')?.docs,
    ).toBeDefined();
  });

  test('routes the scripture navigation commands, so two windows cannot fight over them', () => {
    const claimed = registrations();
    expect(claimed.has('command:platform.goToNextChapter')).toBe(true);
    expect(claimed.has('command:platform.openBookChapterControl')).toBe(true);
  });

  test('sends a command carrying a web view id to the window that owns that web view', async () => {
    // Focus is on window 2, but window 3 is the one showing this web view — its settings must open
    // there, where the web view (and so its project) actually is
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-3', 'owned-view');
  });

  test('routes the deprecated openProjectSettings by ownership too', async () => {
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openProjectSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith(
      'command:platform.openProjectSettings-3',
      'owned-view',
    );
  });

  test('falls back to the focused window when no window owns the web view', async () => {
    withWindowsOwning({ 2: [], 3: [] });

    await registrations().get('command:platform.openSettings')?.handler('gone-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2', 'gone-view');
  });

  test('uses the focused window when the command carries no web view id', async () => {
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.openSettings')?.handler();

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2');
  });

  test('does not look for an owner for commands that act on the window itself', async () => {
    // Only the commands that take a web view id pay the ownership fan-out; the rest follow focus
    withWindowsOwning({ 2: [], 3: ['owned-view'] });

    await registrations().get('command:platform.goToNextChapter')?.handler('owned-view');

    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
    expect(mocks.request).toHaveBeenCalledWith('command:platform.goToNextChapter-2', 'owned-view');
  });

  test('does not ask a window that has not registered its services yet', async () => {
    // A window is tracked from the moment it is shown, and asking one that cannot answer costs the
    // network service's whole registration retry — seconds of stall on a user's click — to learn
    // nothing, since a window with no services cannot own a web view
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] }, { unreadyWindowIds: [3] });

    await registrations().get('command:platform.openSettings')?.handler('owned-view');

    expect(services[3].getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-2', 'owned-view');
  });

  test('fails the call rather than running it in the wrong window when a window cannot be asked', async () => {
    // Falling back to focus here opens the settings for a web view in a window that does not have
    // it, against whichever project that window happens to be showing
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] });
    services[3].getOpenWebViewDefinition.mockRejectedValue(new Error('window is busy'));

    await expect(
      registrations().get('command:platform.openSettings')?.handler('owned-view'),
    ).rejects.toThrow('unreachable');
    expect(mocks.request).not.toHaveBeenCalled();
  });

  test('still routes by ownership when the owner answered and another window did not', async () => {
    const services = withWindowsOwning({ 2: [], 3: ['owned-view'] });
    services[2].getOpenWebViewDefinition.mockRejectedValue(new Error('window is busy'));

    await registrations().get('command:platform.openSettings')?.handler('owned-view');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.openSettings-3', 'owned-view');
  });

  test('fails the call when a ready window’s WebView service has not registered yet', async () => {
    // Readiness is keyed on the window service, and a renderer registers its several services
    // moments apart, so a ready window can still be missing the one this asks. That window could
    // not be asked, which is not the same as it answering that it does not own the web view —
    // falling back to focus would run the call against whatever the focused window is showing.
    withWindows(mocks, { 2: windowService([]), 3: undefined });

    await expect(
      registrations().get('command:platform.openSettings')?.handler('owned-view'),
    ).rejects.toThrow('unreachable');
    expect(mocks.request).not.toHaveBeenCalled();
  });
});
