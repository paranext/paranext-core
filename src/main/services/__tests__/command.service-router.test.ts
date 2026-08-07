import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startCommandServiceRouter } from '@main/services/command.service-router';

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
  // web-view.service-model reaches the network object service, which touches both of these at
  // module load even though this suite never exercises them
  getNetworkEvent: () => vi.fn(),
  onDidDisconnectClient: () => vi.fn(),
}));

/** Registrations the service made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs]) => [
      requestType,
      { handler, docs },
    ]),
  );
}

describe('renderer-hosted command service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    mocks.request.mockResolvedValue('result');
    await startCommandServiceRouter();
  });

  test('claims the generic command names so callers never address a window directly', () => {
    expect(registrations().has('command:platform.goToNextChapter')).toBe(true);
  });

  test('forwards a command to the focused window’s scoped handler', async () => {
    await registrations().get('command:platform.goToNextChapter')?.handler('arg');

    expect(mocks.request).toHaveBeenCalledWith('command:platform.goToNextChapter-2', 'arg');
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const { handler } = registrations().get('command:platform.goToNextChapter') ?? {};
    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(mocks.request).toHaveBeenLastCalledWith('command:platform.goToNextChapter-3');
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(
      registrations().get('command:platform.goToNextChapter')?.handler(),
    ).rejects.toThrow('No windows available');
  });

  test('documents the generic name, which is the one consumers call', () => {
    // The scoped names renderers register under are an implementation detail and stay undocumented
    expect(
      registrations().get('command:platform.navigateLeftInReferenceHistory')?.docs,
    ).toBeDefined();
  });
});
