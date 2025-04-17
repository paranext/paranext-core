import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as networkService from '@shared/services/network.service';
import { ProcessType } from '@shared/global-this.model';
import { PlatformEventEmitter } from 'platform-bible-utils';
import {
  initialize as initializeSharedStore,
  resetForTesting,
  sharedStoreService,
} from './shared-store.service';

// Mock dependencies
vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
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

  // Mock network event handler function
  const mockEventHandler = vi.fn();

  // Save original globalThis.processType
  const originalProcessType = globalThis.processType;

  const testKey = 'platform.customNetworkTimeouts';

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock event emitter creation
    vi.mocked(networkService.createNetworkEventEmitter).mockReturnValue(
      // Needed for testing
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      mockEmitter as unknown as PlatformEventEmitter<unknown>,
    );

    // Mock event handler subscription
    vi.mocked(networkService.getNetworkEvent).mockReturnValue(mockEventHandler);

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
      expect(networkService.createNetworkEventEmitter).toHaveBeenCalledWith('shared-store:change');
      expect(networkService.getNetworkEvent).toHaveBeenCalledWith('shared-store:change');
      expect(mockEventHandler).toHaveBeenCalled();
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

    it('should throw if initialized multiple times', async () => {
      await initializeSharedStore(networkService);
      await expect(initializeSharedStore(networkService)).rejects.toThrow(
        'Shared store service is already initialized',
      );
    });
  });

  describe('get/set/remove operations', () => {
    beforeEach(async () => {
      await initializeSharedStore(networkService);
    });

    it('should get a value from the store with proper typing', () => {
      const testValue = { 'test.request': 5000 };
      sharedStoreService.set(testKey, testValue);
      const result = sharedStoreService.get(testKey);
      expect(result).toEqual(testValue);
    });

    it('should return undefined when getting a non-existent key', () => {
      const result = sharedStoreService.get(testKey);
      expect(result).toBeUndefined();
    });

    it('should set a value and emit a change event', () => {
      const testValue = { 'test.request': 5000 };
      const result = sharedStoreService.set(testKey, testValue);

      expect(result).toBe(true);
      expect(mockEmitter.emit).toHaveBeenCalledWith({
        key: testKey,
        value: testValue,
        clock: expect.objectContaining({
          counter: expect.any(Number),
          processId: expect.any(String),
        }),
      });
    });

    it('should remove a value by setting it to undefined', () => {
      const testValue = { 'test.request': 5000 };
      sharedStoreService.set(testKey, testValue);

      // Reset mock to check just the remove operation
      vi.mocked(mockEmitter.emit).mockClear();

      // Now remove it
      const result = sharedStoreService.remove(testKey);
      expect(result).toBe(true);
      expect(mockEmitter.emit).toHaveBeenCalledWith({
        key: testKey,
        value: undefined,
        clock: expect.objectContaining({
          counter: expect.any(Number),
          processId: expect.any(String),
        }),
      });

      // Verify the value is gone
      const valueAfterRemove = sharedStoreService.get(testKey);
      expect(valueAfterRemove).toBeUndefined();
    });

    it('should throw if trying to use the service before initialization', async () => {
      resetForTesting();
      const error = 'Shared store service is not initialized';

      expect(() => sharedStoreService.get(testKey)).toThrow(error);
      expect(() => sharedStoreService.set(testKey, { 'test.request': 5000 })).toThrow(error);
      expect(() => sharedStoreService.remove(testKey)).toThrow(error);
    });
  });

  describe('conflict resolution with Lamport clocks', () => {
    beforeEach(async () => {
      await initializeSharedStore(networkService);
    });

    it('should handle remote changes with higher counter values', () => {
      const localValue = { 'test.request': 5000 };
      const remoteValue = { 'test.request': 10000 };

      // Set a local value
      sharedStoreService.set(testKey, localValue);

      // Simulate receiving a remote change with higher counter
      const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: remoteValue,
        clock: {
          counter: 100, // Higher counter than local
          processId: 'other-process',
        },
      });

      // Local store should be updated to remote value
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(remoteValue);
    });

    it('should ignore remote changes with lower counter values', () => {
      const localValue = { 'test.request': 5000 };
      const remoteValue = { 'test.request': 10000 };

      // Set a local value that will have a higher counter
      sharedStoreService.set(testKey, localValue);

      // Force local counter to a high value
      for (let i = 0; i < 10; i++) {
        sharedStoreService.set(testKey, localValue);
      }

      // Simulate receiving a remote change with lower counter
      const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: remoteValue,
        clock: {
          counter: 1, // Lower counter than local
          processId: 'other-process',
        },
      });

      // Local store should still have original value
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(localValue);
    });

    it('should use process ID for tie-breaking when counters are equal', () => {
      const localValue = { 'test.request': 5000 };
      const remoteValue = { 'test.request': 10000 };

      // Set a local value
      sharedStoreService.set(testKey, localValue);

      // Get the current counter value
      const currentCounter = vi.mocked(mockEmitter.emit).mock.calls[0][0].clock.counter;

      // Simulate receiving a remote change with same counter but alphabetically higher process ID
      const changeEventHandler = vi.mocked(mockEventHandler).mock.calls[0][0];
      changeEventHandler({
        key: testKey,
        value: remoteValue,
        clock: {
          counter: currentCounter,
          processId: 'zzz-process', // Should win in alphabetical tie-break
        },
      });

      // Local store should be updated to remote value due to tie-breaking
      const updatedValue = sharedStoreService.get(testKey);
      expect(updatedValue).toEqual(remoteValue);

      // Now try with a lower process ID
      changeEventHandler({
        key: testKey,
        value: localValue,
        clock: {
          counter: currentCounter,
          processId: 'aaa-process', // Should lose in alphabetical tie-break
        },
      });

      // Local store should still have the remote value
      const finalValue = sharedStoreService.get(testKey);
      expect(finalValue).toEqual(remoteValue);
    });
  });
});
