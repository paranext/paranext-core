import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startCommandRoutingService } from '@main/services/command-routing.service';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  registerRequestHandler: vi.fn(),
  request: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  request: mocks.request,
  // Pulled in transitively by the network object service; unused by the routing proxies
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));

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
});
