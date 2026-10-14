import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as networkServiceTypes from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_STOP_EXTENSION_HOST,
  EVENT_NAME_ON_WILL_SHUT_DOWN,
} from '@shared/models/extension-host-lifecycle.model';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * Load a fresh copy of the module under test with fresh mock emitters, one per event name. The
 * module keeps its emitters in module state, so each test needs its own copy.
 */
async function loadFreshModule() {
  vi.resetModules();
  const networkService = await import('@shared/services/network.service');
  const emits = new Map<string, ReturnType<typeof vi.fn>>();
  vi.mocked(networkService.createNetworkEventEmitterAsync).mockImplementation(
    async (eventName: string) => {
      const emit = vi.fn();
      emits.set(eventName, emit);
      // Only `emit` is exercised here; the rest of the emitter surface is irrelevant
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { emit } as unknown as Awaited<
        ReturnType<typeof networkServiceTypes.createNetworkEventEmitterAsync>
      >;
    },
  );
  const lifecycle = await import('./lifecycle-events.util');
  const { logger } = await import('@shared/services/logger.service');
  return { ...lifecycle, emits, networkService, logger };
}

describe('lifecycle events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers both events as experimental notifications', async () => {
    const { startLifecycleEvents, networkService } = await loadFreshModule();

    await startLifecycleEvents();

    const { calls } = vi.mocked(networkService.createNetworkEventEmitterAsync).mock;
    const names = calls.map(([name]) => name);
    expect(names).toEqual(
      expect.arrayContaining([EVENT_NAME_ON_DID_STOP_EXTENSION_HOST, EVENT_NAME_ON_WILL_SHUT_DOWN]),
    );
    calls.forEach(([, docs]) => {
      expect(docs?.notification?.['x-experimental']).toBe(true);
    });
  });

  it('emits the stop reason when the extension host stopped', async () => {
    const { startLifecycleEvents, announceExtensionHostStopped, emits } = await loadFreshModule();
    await startLifecycleEvents();

    announceExtensionHostStopped({ reason: 'lost-connection' });

    expect(emits.get(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST)).toHaveBeenCalledWith({
      reason: 'lost-connection',
    });
  });

  it('emits the shutdown event with no payload', async () => {
    const { startLifecycleEvents, announceAppWillShutDown, emits } = await loadFreshModule();
    await startLifecycleEvents();

    announceAppWillShutDown();

    expect(emits.get(EVENT_NAME_ON_WILL_SHUT_DOWN)).toHaveBeenCalledWith(undefined);
  });

  // `before-quit` fires again after `window-all-closed` re-issues `app.quit()`, by which time the
  // network service has disposed the emitter.
  it('announces the shutdown once per process: a second call emits nothing and logs nothing', async () => {
    const { startLifecycleEvents, announceAppWillShutDown, emits, logger } =
      await loadFreshModule();
    await startLifecycleEvents();
    const emit = emits.get(EVENT_NAME_ON_WILL_SHUT_DOWN);
    announceAppWillShutDown();
    emit?.mockImplementation(() => {
      throw new Error('Emitter is disposed');
    });

    announceAppWillShutDown();

    expect(emit).toHaveBeenCalledTimes(1);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('warns and carries on when an emit throws', async () => {
    const { startLifecycleEvents, announceExtensionHostStopped, emits, logger } =
      await loadFreshModule();
    await startLifecycleEvents();
    emits.get(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST)?.mockImplementation(() => {
      throw new Error('emitter is disposed');
    });

    expect(() => announceExtensionHostStopped({ reason: 'crashed' })).not.toThrow();
    expect(logger.warn).toHaveBeenCalled();
  });

  it('does not take down startup when registration fails, and announcing is then a no-op', async () => {
    vi.resetModules();
    const networkService = await import('@shared/services/network.service');
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockRejectedValue(
      new Error('rejected by the central registry'),
    );
    const { logger } = await import('@shared/services/logger.service');
    vi.mocked(logger.warn).mockClear();
    const { startLifecycleEvents, announceExtensionHostStopped, announceAppWillShutDown } =
      await import('./lifecycle-events.util');

    await expect(startLifecycleEvents()).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST),
    );
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining(EVENT_NAME_ON_WILL_SHUT_DOWN));
    expect(() => announceExtensionHostStopped({ reason: 'crashed' })).not.toThrow();
    expect(() => announceAppWillShutDown()).not.toThrow();
  });

  it('still registers the second event when only the first registration rejects', async () => {
    const { startLifecycleEvents, announceAppWillShutDown, emits, networkService, logger } =
      await loadFreshModule();
    const registerOne = vi.mocked(networkService.createNetworkEventEmitterAsync);
    const registerNormally = registerOne.getMockImplementation();
    registerOne.mockImplementation(async (eventName, documentation) => {
      if (eventName === EVENT_NAME_ON_DID_STOP_EXTENSION_HOST)
        throw new Error('rejected by the central registry');
      if (!registerNormally) throw new Error('loadFreshModule installs an implementation');
      return registerNormally(eventName, documentation);
    });

    await startLifecycleEvents();
    announceAppWillShutDown();

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST),
    );
    expect(emits.get(EVENT_NAME_ON_WILL_SHUT_DOWN)).toHaveBeenCalledWith(undefined);
  });
});
