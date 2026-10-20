import { vi } from 'vitest';
import * as networkServiceTypes from '@shared/services/network.service';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * Load a fresh copy of the module under test with a fresh mock emitter. The module keeps its
 * emitter in module state, so each test needs its own copy to observe the not-yet-registered
 * state.
 */
async function loadFreshModule() {
  vi.resetModules();
  const networkService = await import('@shared/services/network.service');
  const emit = vi.fn();
  vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
    // Only `emit` is exercised here; the rest of the emitter surface is irrelevant
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    { emit } as unknown as Awaited<
      ReturnType<typeof networkServiceTypes.createNetworkEventEmitterAsync>
    >,
  );
  const module = await import('./announce-extension-host-started');
  return { ...module, emit, networkService };
}

describe('registerExtensionHostStartedEvent', () => {
  it('registers the event flagged as experimental', async () => {
    const { registerExtensionHostStartedEvent, networkService } = await loadFreshModule();

    await registerExtensionHostStartedEvent();

    expect(networkService.createNetworkEventEmitterAsync).toHaveBeenCalledWith(
      'platform.onDidStartExtensionHost',
      expect.objectContaining({
        notification: expect.objectContaining({ 'x-experimental': true }),
      }),
    );
  });

  it('resolves to undefined and makes announce a no-op when registration fails', async () => {
    vi.resetModules();
    const networkService = await import('@shared/services/network.service');
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockRejectedValue(
      new Error('rejected by the central registry'),
    );
    const { registerExtensionHostStartedEvent, announceExtensionHostStarted } = await import(
      './announce-extension-host-started'
    );

    await expect(registerExtensionHostStartedEvent()).resolves.toBeUndefined();
    expect(() => announceExtensionHostStarted()).not.toThrow();
  });
});

describe('announceExtensionHostStarted', () => {
  it('emits undefined once registered, and nothing before', async () => {
    const { registerExtensionHostStartedEvent, announceExtensionHostStarted, emit } =
      await loadFreshModule();

    announceExtensionHostStarted();
    expect(emit).not.toHaveBeenCalled();

    await registerExtensionHostStartedEvent();
    announceExtensionHostStarted();
    expect(emit).toHaveBeenCalledWith(undefined);
  });

  it('warns and swallows when emitting throws', async () => {
    const { registerExtensionHostStartedEvent, announceExtensionHostStarted, emit } =
      await loadFreshModule();
    await registerExtensionHostStartedEvent();
    const { logger } = await import('@shared/services/logger.service');
    emit.mockImplementation(() => {
      throw new Error('emitter is disposed');
    });

    expect(() => announceExtensionHostStarted()).not.toThrow();
    expect(logger.warn).toHaveBeenCalled();
  });
});
