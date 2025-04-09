import {
  deepEqual,
  deserialize,
  getErrorMessage,
  PlatformEventEmitter,
  serialize,
} from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { ProcessType } from '@shared/global-this.model';

const SHARED_STORE_PREFIX = 'shared-store';
const STORE_GET_REQUEST = `${SHARED_STORE_PREFIX}:get`;
const STORE_CHANGE_EVENT = `${SHARED_STORE_PREFIX}:change`;

// https://en.wikipedia.org/wiki/Lamport_timestamp
let localCounter: number = 0;

// Unique process ID used for tie-breaking in Lamport clock comparisons
let processId: string = '';

// Lamport clock for ordering events across processes
type LamportClock = {
  counter: number;
  processId: string;
};

// Store entry with Lamport clock for conflict resolution
type StoreEntry = {
  value?: unknown;
  clock: LamportClock;
};

// Store change event emitted when a value is set or removed
type StoreChangeEvent = StoreEntry & {
  key: string;
};

// Copy of the store within this process
const localStore: Record<string, StoreEntry> = {};

/** Increments the local counter and returns a new LamportClock object */
function getNextClock(): LamportClock {
  localCounter += 1;
  return {
    counter: localCounter,
    processId,
  };
}

/**
 * Compares two Lamport clocks to determine their relative order
 *
 * @param x One Lamport clock
 * @param y Another Lamport clock
 * @returns Negative value if `x` should be considered before `y`, positive value if `x` should be
 *   considered after `y`, and 0 if they are equal
 */
function compareClocks(x: LamportClock, y: LamportClock): number {
  if (x.counter !== y.counter) return x.counter - y.counter;
  // If counters are the same, compare processIds for deterministic tie breaking
  return x.processId.localeCompare(y.processId, 'en-US', { sensitivity: 'base' });
}

// Create an event emitter to notify about store changes
let storeChangeEmitter: PlatformEventEmitter<StoreChangeEvent> | undefined;

// Cannot import the network service directly because it would create a circular dependency
type NetworkService = typeof import('@shared/services/network.service');

/**
 * Initialize the shared store service, setting up request handlers and event listeners. This
 * function should be called by each of our JS processes early during start up.
 *
 * @param networkService The network service to use for communication between processes
 * @returns A promise that resolves when the service is initialized
 */
export async function initialize(networkService: NetworkService): Promise<void> {
  if (processId) throw new Error('Shared store service is already initialized');
  processId = `${globalThis.processType}-${Math.random().toString(36).substring(2, 10)}`;
  logger.debug(`[${globalThis.processType}] Initializing shared store service`);

  // Prepare to emit changes as they are made to the local store
  storeChangeEmitter = networkService.createNetworkEventEmitter(STORE_CHANGE_EVENT);

  // Listen for changes from other processes to update the local store
  networkService.getNetworkEvent<StoreChangeEvent>(STORE_CHANGE_EVENT)((event) => {
    if (event.clock.processId !== processId) setFromRemote(event.key, event);
  });

  // Outside of the main process, sync the local store to the main store's data initially
  if (globalThis.processType !== ProcessType.Main) {
    try {
      const initial: Record<string, StoreEntry> = await networkService.request(STORE_GET_REQUEST);
      if (!initial) return;
      Object.entries(initial).forEach(([key, entry]) => setFromRemote(key, entry));
    } catch (error) {
      logger.warn(`Error initializing local store: ${getErrorMessage(error)}`);
    }
  }
  // Inside the main process, handle get requests to return data
  else {
    await networkService.registerRequestHandler(
      STORE_GET_REQUEST,
      (key?: string) => (key === undefined ? { ...localStore } : localStore[key]?.value),
      {
        method: {
          summary: 'Get values from the shared store',
          params: [
            {
              name: 'key',
              required: false,
              summary: 'The key of the value to retrieve (leave undefined to get the entire store)',
              schema: { type: 'string' },
            },
          ],
          result: {
            name: 'return value',
            summary: 'The value associated with the key, or the entire store if no key is provided',
            schema: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'object' },
                { type: 'array' },
                { type: 'null' },
              ],
            },
          },
        },
      },
    );
  }
}

/**
 * Reset the shared store service state for testing. This function is only exported for testing
 * purposes and should not be used in production code.
 */
export function resetForTesting(): void {
  processId = '';
  localCounter = 0;
  Object.keys(localStore).forEach((key) => delete localStore[key]);
  storeChangeEmitter = undefined;
}

/**
 * Get a value from the shared store with proper typing
 *
 * @param key The key of the value to retrieve
 * @returns A cloned copy of the value associated with the key, or undefined if not found
 */
function get<K extends SharedStoreKeys>(key: K): SharedStoreValues[K] | undefined {
  if (!processId) throw new Error('Shared store service is not initialized');
  try {
    // Assert the specific type associated with this key
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return deserialize(serialize(localStore[key]?.value)) as SharedStoreValues[K];
  } catch (error) {
    logger.error(`Error getting value for key ${key} from shared store:`, error);
    return undefined;
  }
}

/**
 * Set a value in the shared store and notify other processes. Note that if a value with the given
 * key already exists, it can only be set again by the process that created it. This is to prevent
 * race conditions between processes setting values that don't incorporate each others' updates.
 *
 * @param key The key to set
 * @param value The value to set. Note that the stored value is a cloned copy of the provided value,
 *   so changes to the original value will not affect the stored value. Also, any non-serializable
 *   data will removed from the value during the cloning process.
 * @returns True if the value was set successfully, false otherwise
 */
function set<K extends SharedStoreKeys>(key: K, value?: SharedStoreValues[K]): boolean {
  if (!processId || !storeChangeEmitter) throw new Error('Shared store service is not initialized');
  try {
    const currentEntry = localStore[key];
    if (currentEntry && currentEntry.clock.processId !== processId)
      throw new Error('Cannot set value from a different process than the one that created it');
    if (currentEntry && deepEqual(currentEntry.value, value)) return true;
    const clock = getNextClock();
    const clonedValue = deserialize(serialize(value));
    localStore[key] = {
      value: clonedValue,
      clock,
    };
    storeChangeEmitter.emit({
      key,
      value: clonedValue,
      clock,
    });
    return true;
  } catch (error) {
    logger.error(`Error setting value for key ${key} in shared store:`, error);
    return false;
  }
}

/** Update the local store based on an update from another process */
function setFromRemote(key: string, entry: StoreEntry): void {
  localCounter = Math.max(localCounter, entry.clock.counter);
  if (!localStore[key] || compareClocks(entry.clock, localStore[key].clock) > 0)
    localStore[key] = entry;
}

/**
 * Remove a value from the shared store and notify other processes of the change.
 *
 * Note that removing a key sets its value to undefined in the store. The key-value pair isn't
 * actually deleted. This is done to avoid race conditions if a value for this key is set again
 * quickly.
 *
 * @param key The key to remove
 * @returns True if the value was removed or there was nothing to remove, false otherwise
 */
function remove<K extends SharedStoreKeys>(key: K): boolean {
  if (!processId || !storeChangeEmitter) throw new Error('Shared store service is not initialized');
  return key in localStore ? set(key, undefined) : true;
}

// Keep in sync with SharedStoreTypedKeys.cs
/**
 * Defines the keys and types of values held in key-value pairs within the shared store service.
 * Since this service is not part of the public API, the keys and types are not included in
 * `papi-shared-types.ts`. If the platform needs more key-value pairs, they should be added here.
 */
export interface SharedStoreValues {
  /** This key isn't actually used directly. We dynamically construct keys using this as a prefix */
  'platform.customNetworkTimeoutMs': number;
}

export type SharedStoreKeys = keyof SharedStoreValues;

/**
 * This provides an in-memory, key-value store that can be read without a network call but updates
 * automatically in the background using network events. This allows synchronous reading of shared,
 * non-persisted key-value pairs between processes. It can be thought of as a distributed key-value
 * store. It relies only on the network service, not other services like network objects or
 * settings.
 *
 * This uses {@link https://en.wikipedia.org/wiki/Lamport_timestamp | Lamport logical clocks} for
 * conflict resolution to ensure consistency across processes.
 *
 * This service is not intended to be accessed directly by extensions. It was created as a utility
 * for the platform and is not part of the public API. Extensions should use settings and other data
 * providers for sharing data.
 */
export const sharedStoreService = {
  get,
  set,
  remove,
};
