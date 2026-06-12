import { vi } from 'vitest';
import * as networkService from '@shared/services/network.service';
import { ProcessType } from '@shared/global-this.model';
import { PlatformEventEmitter } from 'platform-bible-utils';
import {
  initialize as initializeSharedStore,
  resetForTesting,
  sharedStoreService,
  waitForInitialization,
} from './shared-store.service';

// Mock dependencies
vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
  createNetworkEventEmitterAsync: vi.fn(),
  createCoreMultiSourceEventEmitter: vi.fn(),
  getNetworkEvent: vi.fn(),
  request: vi.fn(),
  registerRequestHandler: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('sharedStoreService', () => {
  // Mock event emitter for testing
  const mockEmitter = {
    emit: vi.fn(),
    event: vi.fn(),
    subscribe: vi.fn(),
    subscribeOnce: vi.fn(),
    dispose: vi.fn(),
    emitLocal: vi.fn(),
  };

  // Save original globalThis.processType
  const originalProcessType = globalThis.processType;

  const testKey = 'platform.customNetworkTimeoutMs.test';

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock event emitter creation
    vi.mocked(networkService.createNetworkEventEmitter).mockReturnValue(
      // Needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as PlatformEventEmitter<unknown>,
    );
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
      // Needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as Awaited<
        ReturnType<typeof networkService.createNetworkEventEmitterAsync>
      >,
    );
    // Multi-source events (like 'shared-store:change') use the synchronous
    // createCoreMultiSourceEventEmitter, which returns the emitter and a registration promise that
    // resolves to that same emitter. The shared store subscribes to changes via the emitter's
    // `event`, so no getNetworkEvent mock is needed.
    vi.mocked(networkService.createCoreMultiSourceEventEmitter).mockReturnValue(
      // Needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        emitter: mockEmitter,
        registeredEmitterPromise: Promise.resolve(mockEmitter),
      } as unknown as ReturnType<typeof networkService.createCoreMultiSourceEventEmitter>,
    );

    // Set process type to Main by default
    globalThis.processType = ProcessType.Main;
  });

  afterEach(() => {
    // Restore original process type
    globalThis.processType = originalProcessType;

    resetForTesting();
  });

  describe('initialize', () => {
    it('should initialize the service with a unique process ID', async () => {
      await initializeSharedStore(networkService);
      expect(networkService.createCoreMultiSourceEventEmitter).toHaveBeenCalledWith(
        'shared-store:change',
        expect.objectContaining({ notification: expect.any(Object) }),
      );
      // The store subscribes to remote changes via the emitter's `event`.
      expect(mockEmitter.event).toHaveBeenCalled();
    });

    it('should register a request handler for store access in the Main process', async () => {
      globalThis.processType = ProcessType.Main;
      await initializeSharedStore(networkService);

      expect(networkService.registerRequestHandler).toHaveBeenCalledWith(
        'shared-store:get',
        expect.any(Function),
        expect.any(Object),
      );
    });

    it('should fetch initial store data in non-Main processes', async () => {
      globalThis.processType = ProcessType.ExtensionHost;
      const mockStoreData = {
        'platform.customNetworkTimeouts': { 'test.request': 5000 },
      };
      vi.mocked(networkService.request).mockResolvedValue(mockStoreData);

      await initializeSharedStore(networkService);
      expect(networkService.request).toHaveBeenCalledWith('shared-store:get');
    });

    it('should be idempotent — subsequent initialize calls return the same promise', async () => {
      const first = initializeSharedStore(networkService);
      const second = initializeSharedStore(networkService);
      // Both calls return the same in-flight promise
      expect(second).toBe(first);
      await first;
      // After resolution, further calls still no-op (no second registration of handlers/emitters)
      const createEmitterCallCount = vi.mocked(networkService.createCoreMultiSourceEventEmitter)
        .mock.calls.length;
      await initializeSharedStore(networkService);
      expect(vi.mocked(networkService.createCoreMultiSourceEventEmitter).mock.calls.length).toBe(
        createEmitterCallCount,
      );
    });
  });

  describe('waitForInitialization', () => {
    it('resolves immediately when initialize() has already been called', async () => {
      await initializeSharedStore(networkService);
      await expect(waitForInitialization()).resolves.toBeUndefined();
    });

    it('resolves once initialize() starts within the timeout', async () => {
      // Begin waiting before initialize() is called; the generous timeout has not elapsed.
      const waiting = waitForInitialization(1000);
      await initializeSharedStore(networkService);
      await expect(waiting).resolves.toBeUndefined();
    });

    it('throws if initialize() does not start within the timeout', async () => {
      // initialize() is never called, so the start-timeout should elapse and reject.
      await expect(waitForInitialization(30)).rejects.toThrow(
        /initialize\(\) was not called within 30ms/,
      );
    });
  });

  describe('get/set/remove operations', () => {
    beforeEach(async () => {
      await initializeSharedStore(networkService);
    });

    it('should get a value from the store with proper typing', () => {
      const testValue = 5000;
      sharedStoreService.set(testKey, testValue);
      const result = sharedStoreService.get(testKey);
      expect(result).toEqual(testValue);
    });

    it('should return undefined when getting a non-existent key', () => {
      const result = sharedStoreService.get(testKey);
      expect(result).toBeUndefined();
    });

    it('should set a value and emit a change event', () => {
      const testValue = 5000;
      sharedStoreService.set(testKey, testValue);

      expect(mockEmitter.emit).toHaveBeenCalledWith({
        key: testKey,
        value: testValue,
        clock: expect.objectContaining({
          counter: expect.any(Number),
          processId: expect.any(String),
        }),
      });
    });

    it('should not allow setting a value if another process set it already', () => {
      const testValue = 5000;
      const newValue = 6000;

      // Simulate receiving a remote change
      const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: testValue,
        clock: {
          counter: 1,
          processId: 'other-process',
        },
      });

      sharedStoreService.set(testKey, newValue);
      expect(sharedStoreService.get(testKey)).toBe(testValue);
    });

    it('should remove a value, emitting a deleted change event', () => {
      const testValue = 5000;
      sharedStoreService.set(testKey, testValue);

      // Reset mock to check just the remove operation
      vi.mocked(mockEmitter.emit).mockClear();

      // Now remove it
      sharedStoreService.remove(testKey);
      expect(mockEmitter.emit).toHaveBeenCalledWith({
        key: testKey,
        value: undefined,
        deleted: true,
        clock: expect.objectContaining({
          counter: expect.any(Number),
          processId: expect.any(String),
        }),
      });

      // Verify the value is gone
      const valueAfterRemove = sharedStoreService.get(testKey);
      expect(valueAfterRemove).toBeUndefined();
    });

    it('get returns undefined before initialization; set/remove throw', async () => {
      resetForTesting();
      const error = 'Shared store service is not initialized';

      // get no longer throws before init — it returns undefined until the store is populated.
      expect(sharedStoreService.get(testKey)).toBeUndefined();
      // set/remove still require the service to be initialized so they can broadcast the change.
      expect(() => sharedStoreService.set(testKey, 5000)).toThrow(error);
      expect(() => sharedStoreService.remove(testKey)).toThrow(error);
    });
  });

  describe('async get/set/remove operations', () => {
    beforeEach(async () => {
      await initializeSharedStore(networkService);
    });

    it('getAsync resolves to a stored value', async () => {
      sharedStoreService.set(testKey, 5000);
      await expect(sharedStoreService.getAsync(testKey)).resolves.toBe(5000);
    });

    it('getAsync throws when the key is absent and no default is provided', async () => {
      await expect(sharedStoreService.getAsync(testKey)).rejects.toThrow(
        /no default value was provided/,
      );
    });

    it('getAsync returns the provided default when the key is absent', async () => {
      await expect(sharedStoreService.getAsync(testKey, 1234)).resolves.toBe(1234);
    });

    it('getAsync returns an explicit undefined default when the key is absent', async () => {
      await expect(sharedStoreService.getAsync(testKey, undefined)).resolves.toBeUndefined();
    });

    it('getAsync returns a present value that is explicitly undefined', async () => {
      // `undefined` is a valid live value (distinct from removed); getAsync returns it without
      // applying a default or throwing.
      sharedStoreService.set(testKey, undefined);
      await expect(sharedStoreService.getAsync(testKey)).resolves.toBeUndefined();
    });

    it('getAsync throws after a key is removed (removed means no value)', async () => {
      sharedStoreService.set(testKey, 5000);
      sharedStoreService.remove(testKey);
      await expect(sharedStoreService.getAsync(testKey)).rejects.toThrow(
        /no default value was provided/,
      );
    });

    it('getAsync returns the default after a key is removed', async () => {
      sharedStoreService.set(testKey, 5000);
      sharedStoreService.remove(testKey);
      await expect(sharedStoreService.getAsync(testKey, 99)).resolves.toBe(99);
    });

    it('getAsync rejects (rather than returning undefined) when the stored value cannot be cloned', async () => {
      // Inject a value that cannot be serialized (a circular reference) via a simulated remote
      // change. setFromRemote stores the raw entry without cloning, so the unserializable value
      // reaches the store; cloning it on read then throws, which getAsync must surface rather than
      // swallow as `undefined`.
      const circular: { self?: unknown } = {};
      circular.self = circular;
      const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: circular,
        clock: { counter: 1, processId: 'other-process' },
      });
      await expect(sharedStoreService.getAsync(testKey)).rejects.toThrow();
    });

    it('setAsync waits for initialization, then sets and emits the change', async () => {
      await sharedStoreService.setAsync(testKey, 5000);
      expect(sharedStoreService.get(testKey)).toBe(5000);
      expect(mockEmitter.emit).toHaveBeenCalled();
    });

    it('removeAsync waits for initialization, then removes the value', async () => {
      sharedStoreService.set(testKey, 5000);
      await sharedStoreService.removeAsync(testKey);
      expect(sharedStoreService.get(testKey)).toBeUndefined();
    });
  });

  describe('conflict resolution with Lamport clocks', () => {
    beforeEach(async () => {
      await initializeSharedStore(networkService);
    });

    it('should handle remote changes with higher counter values', () => {
      const initialValue = 5000;
      const newValue = 6000;

      sharedStoreService.set(testKey, initialValue);

      // Simulate receiving a remote change with higher counter
      const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: newValue,
        clock: {
          counter: 100, // Higher counter than local
          processId: 'other-process',
        },
      });

      // Local store should be updated to remote value
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(newValue);
    });

    it('should ignore remote changes with lower counter values', () => {
      const initialValue = 5000;
      const newValue = 6000;

      // Set an initial value that will have a higher counter
      sharedStoreService.set(testKey, initialValue);
      sharedStoreService.set(testKey, initialValue + 1);

      // Simulate receiving a remote change with lower counter
      const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: newValue,
        clock: {
          counter: 1, // Lower counter than local
          processId: 'other-process',
        },
      });

      // Local store should still have original value
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(initialValue + 1);
    });

    it('should use process ID for tie-breaking when counters are equal', () => {
      const initialValue = 5000;
      const newValue = 6000;

      sharedStoreService.set(testKey, initialValue);

      // Get the current counter value
      const currentCounter = vi.mocked(mockEmitter.emit).mock.calls[0][0].clock.counter;

      // Simulate receiving a remote change with same counter but alphabetically higher process ID
      const changeEventHandler = vi.mocked(mockEmitter.event).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: newValue,
        clock: {
          counter: currentCounter,
          processId: 'zzz-process', // Should win in alphabetical tie-break
        },
      });

      // Local store should be updated to remote value due to tie-breaking
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(newValue);

      // Now try with a lower process ID
      changeEventHandler({
        key: testKey,
        value: initialValue,
        clock: {
          counter: currentCounter,
          processId: 'aaa-process', // Should lose in alphabetical tie-break
        },
      });

      // Local store should still have the remote value
      const finalValue = sharedStoreService.get(testKey);
      expect(finalValue).toEqual(newValue);
    });
  });
});
