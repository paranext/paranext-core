import { describe, it, expect, expectTypeOf, vi, beforeEach } from 'vitest';
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { logger } from '@shared/services/logger.service';
import { dataProviderService } from '@shared/services/data-provider.service';
import type { registerEngineByType } from '@shared/services/data-provider.service';

/**
 * Tests for dataProviderService.registerEngine and registerEngineByType —
 * NetworkObjectDocumentation parameter.
 *
 * The type-level tests confirm the new `documentation` parameter exists on the public signatures.
 * The runtime test confirms `registerEngine` actually forwards that documentation through to
 * `networkObjectService.set`, where the OpenRPC fanout happens.
 */

// Mock the boundaries registerEngine touches so it can run without the RPC/WebSocket layer.
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    hasKnown: vi.fn(() => false),
    set: vi.fn(),
    get: vi.fn(),
  },
  overrideDispose: vi.fn(),
}));

vi.mock('@shared/services/notification.service', () => ({ notificationService: {} }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// ---------------------------------------------------------------------------
// Type-level tests
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    type Sig = Parameters<typeof dataProviderService.registerEngine>;
    // The 5th parameter (index 4) is the optional documentation parameter.
    expectTypeOf<Sig[4]>().toEqualTypeOf<NetworkObjectDocumentation | undefined>();
  });
});

describe('registerEngineByType — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    type Sig = Parameters<typeof registerEngineByType>;
    expectTypeOf<Sig[4]>().toEqualTypeOf<NetworkObjectDocumentation | undefined>();
  });
});

// ---------------------------------------------------------------------------
// Runtime test: documentation is forwarded to networkObjectService.set
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — documentation forwarding', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // A networked update emitter with the surface buildDataProvider/registerEngine use.
    const mockEmitter = { emit: vi.fn(), event: vi.fn(() => () => {}), dispose: vi.fn() };
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
      // Needed for testing — the real return carries the full emitter surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as Awaited<
        ReturnType<typeof networkService.createNetworkEventEmitterAsync>
      >,
    );

    // set() returns the disposable network object; get() must return a truthy proxy so the
    // registration's AsyncVariable resolves.
    const disposable = { dispose: vi.fn(async () => true) };
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.get).mockResolvedValue({ getData: vi.fn() } as never);
  });

  it('forwards the documentation argument through to networkObjectService.set', async () => {
    // Minimal engine with matching get/set functions so buildDataProvider validates.
    const engine = {
      getData: async () => 1,
      setData: async () => true,
    };
    const documentation: NetworkObjectDocumentation = { 'x-experimental': true };

    await dataProviderService.registerEngine(
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      'test.documentationForwarding' as never,
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      engine as never,
      'dataProvider',
      undefined,
      documentation,
    );

    // networkObjectService.set is called as (id, object, type, attributes, documentation).
    expect(networkObjectService.set).toHaveBeenCalledTimes(1);
    expect(vi.mocked(networkObjectService.set).mock.calls[0][4]).toBe(documentation);
  });

  it('exposes an ignored get___ method as a plain method rather than a data type getter', async () => {
    // The window service shard reaches the main process's navigation commands this way: a
    // `get___` method that is not a data type at all, kept off the get/set matching check by the
    // `ignore` decorator. Both sides of that join are otherwise tested against mocks — the shard's
    // suite stubs the decorator out, and the router's stubs the shard — so nothing else exercises
    // what registration actually does with it. Without the decorator this registration throws for
    // want of a matching setter, taking every window's startup with it.
    const engine = {
      getData: async () => 1,
      setData: async () => true,
      getSomethingThatIsNotADataType: async () => 'answer',
    };
    dataProviderService.decorators.ignore(engine.getSomethingThatIsNotADataType);

    await dataProviderService.registerEngine(
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      'test.ignoredGetter' as never,
      // The name/engine are generic in this test context; cast to satisfy the typed signature.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      engine as never,
    );

    const registeredObject = vi.mocked(networkObjectService.set).mock.calls[0][1];
    const exposedMethod: unknown = Reflect.get(registeredObject, 'getSomethingThatIsNotADataType');
    // Reachable over the network, which is the whole point of putting it on the engine
    expect(exposedMethod).toBeInstanceOf(Function);
    if (exposedMethod instanceof Function) await expect(exposedMethod()).resolves.toBe('answer');
  });

  it('refuses to register an unignored get___ method with no matching setter', async () => {
    // The other half: registration failing this way is what the decorator is holding back, so a
    // decorator quietly dropped from a shard is a window that cannot start
    const engine = {
      getData: async () => 1,
      setData: async () => true,
      getSomethingThatIsNotADataType: async () => 'answer',
    };

    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        'test.unignoredGetter' as never,
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        engine as never,
      ),
    ).rejects.toThrow('matching get and set functions');
  });
});

// ---------------------------------------------------------------------------
// Runtime test: a failed registration settles its AsyncVariable
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — failure does not leak a pending variable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const disposable = { dispose: vi.fn(async () => true) };
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    /* eslint-disable no-type-assertion/no-type-assertion */
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);
    vi.mocked(networkObjectService.get).mockResolvedValue({ getData: vi.fn() } as never);
    /* eslint-enable no-type-assertion/no-type-assertion */
  });

  it('rejects immediately rather than leaving a variable to time out unhandled', async () => {
    // `buildDataProvider` creates an AsyncVariable with a long timeout BEFORE the awaits that can
    // fail. A failure after that point used to leave it pending, so it rejected on its own timer
    // long after the fact with nothing listening — an unhandled rejection pointing nowhere near the
    // cause. This is reachable whenever a name is free but its update event is not, which is what a
    // window taking over an app-global service hits.
    vi.useFakeTimers();
    const unhandled: unknown[] = [];
    const recordUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on('unhandledRejection', recordUnhandled);

    try {
      vi.mocked(networkService.createNetworkEventEmitterAsync).mockRejectedValue(
        new Error('Event was rejected by the central registry'),
      );
      const engine = { getData: async () => 1, setData: async () => true };

      await expect(
        dataProviderService.registerEngine(
          // The name/engine are generic in this test context; cast to satisfy the typed signature.
          /* eslint-disable no-type-assertion/no-type-assertion */
          'test.registrationFailure' as never,
          engine as never,
          /* eslint-enable no-type-assertion/no-type-assertion */
        ),
      ).rejects.toThrow('central registry');

      // Run out the variable's own timeout. If registration left it pending, it rejects here with
      // nobody listening.
      await vi.advanceTimersByTimeAsync(60_000);
      await Promise.resolve();
    } finally {
      process.off('unhandledRejection', recordUnhandled);
      vi.useRealTimers();
    }

    expect(unhandled).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Runtime tests: a failed registration does not leak its update event emitter
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — failure disposes the update event emitter', () => {
  let mockEmitter: {
    emit: ReturnType<typeof vi.fn>;
    event: ReturnType<typeof vi.fn>;
    dispose: ReturnType<typeof vi.fn>;
  };
  const engine = { getData: async () => 1, setData: async () => true };

  beforeEach(() => {
    vi.clearAllMocks();
    mockEmitter = { emit: vi.fn(), event: vi.fn(() => () => {}), dispose: vi.fn() };
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
      // Needed for testing — the real return carries the full emitter surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as Awaited<
        ReturnType<typeof networkService.createNetworkEventEmitterAsync>
      >,
    );
    // The mock stands in for the full proxy type; cast the minimal test double.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.get).mockResolvedValue({ getData: vi.fn() } as never);
  });

  it('disposes the emitter and propagates the original error when object registration fails', async () => {
    // The update event is centrally registered before the network object is. Losing the
    // object-name race to another process must dispose the emitter (which unregisters the event);
    // otherwise the event name would stay registered under this process's live connection and
    // reject every future attempt to host this provider, app-wide.
    vi.mocked(networkObjectService.set).mockRejectedValue(
      new Error('object name is already registered'),
    );

    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        /* eslint-disable no-type-assertion/no-type-assertion */
        'test.emitterCleanupOnSetFailure' as never,
        engine as never,
        /* eslint-enable no-type-assertion/no-type-assertion */
      ),
    ).rejects.toThrow('object name is already registered');

    expect(mockEmitter.dispose).toHaveBeenCalledTimes(1);
  });

  it('still propagates the registration error when disposing the emitter itself fails', async () => {
    vi.mocked(networkObjectService.set).mockRejectedValue(
      new Error('object name is already registered'),
    );
    mockEmitter.dispose.mockImplementation(() => {
      throw new Error('dispose exploded');
    });

    // The dispose failure must not mask the error that actually broke the registration
    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        /* eslint-disable no-type-assertion/no-type-assertion */
        'test.emitterDisposeFailure' as never,
        engine as never,
        /* eslint-enable no-type-assertion/no-type-assertion */
      ),
    ).rejects.toThrow('object name is already registered');

    expect(mockEmitter.dispose).toHaveBeenCalledTimes(1);
    // An error rather than a warning: the event name stays claimed under this connection, so this
    // provider can never be hosted again for the rest of the session
    expect(vi.mocked(logger.error)).toHaveBeenCalledWith(
      expect.stringContaining('dispose exploded'),
    );
  });

  it('does not attempt a dispose when the failure happens before the emitter exists', async () => {
    // When event creation itself is what failed, there is nothing to clean up — the cleanup must
    // not turn the real error into a crash on a missing emitter.
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockRejectedValue(
      new Error('event was rejected by the central registry'),
    );
    const disposable = { dispose: vi.fn(async () => true) };
    // The mock stands in for the full disposable type; cast the minimal test double.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);

    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        /* eslint-disable no-type-assertion/no-type-assertion */
        'test.noEmitterToDispose' as never,
        engine as never,
        /* eslint-enable no-type-assertion/no-type-assertion */
      ),
    ).rejects.toThrow('event was rejected by the central registry');

    expect(mockEmitter.dispose).not.toHaveBeenCalled();
  });

  it('unregisters the published object when it cannot be resolved back', async () => {
    // `set` publishing the object and the follow-up `get` answering `undefined` is the one failure
    // that arrives with the provider already on the network. Unregistering the update event and
    // leaving the object published would make it resolvable and subscribable but unable to ever
    // notify, so the whole registration is unwound instead — the object's own disposal is what takes
    // the update event down with it (layered on in `buildDataProvider`).
    const disposable = { dispose: vi.fn(async () => true) };
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    /* eslint-disable no-type-assertion/no-type-assertion */
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);
    vi.mocked(networkObjectService.get).mockResolvedValue(undefined as never);
    /* eslint-enable no-type-assertion/no-type-assertion */

    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        /* eslint-disable no-type-assertion/no-type-assertion */
        'test.publishedButUnresolvable' as never,
        engine as never,
        /* eslint-enable no-type-assertion/no-type-assertion */
      ),
    ).rejects.toThrow('Unable to get network object');

    expect(disposable.dispose).toHaveBeenCalledTimes(1);
    expect(mockEmitter.dispose).not.toHaveBeenCalled();
  });

  it('still propagates the registration error when unwinding the published object fails', async () => {
    const disposable = {
      dispose: vi.fn(async () => {
        throw new Error('unregister exploded');
      }),
    };
    // The mocks stand in for the full disposable/proxy types; cast the minimal test doubles.
    /* eslint-disable no-type-assertion/no-type-assertion */
    vi.mocked(networkObjectService.set).mockResolvedValue(disposable as never);
    vi.mocked(networkObjectService.get).mockResolvedValue(undefined as never);
    /* eslint-enable no-type-assertion/no-type-assertion */

    await expect(
      dataProviderService.registerEngine(
        // The name/engine are generic in this test context; cast to satisfy the typed signature.
        /* eslint-disable no-type-assertion/no-type-assertion */
        'test.unwindFailure' as never,
        engine as never,
        /* eslint-enable no-type-assertion/no-type-assertion */
      ),
    ).rejects.toThrow('Unable to get network object');

    // An error rather than a warning: the provider stays published under a name nothing holds a
    // disposable for, which nothing can undo short of a restart
    expect(vi.mocked(logger.error)).toHaveBeenCalledWith(
      expect.stringContaining('unregister exploded'),
    );
  });
});
