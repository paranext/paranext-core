import {
  AsyncVariable,
  deepEqual,
  deserialize,
  getErrorMessage,
  PlatformEventEmitter,
  serialize,
} from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { ProcessType } from '@shared/global-this.model';
import type { SingleNotificationDocumentation } from '@shared/models/openrpc.model';

const SHARED_STORE_PREFIX = 'shared-store';
/**
 * Internal request type used by the shared store service to fetch the initial store contents from
 * the main process during its own initialization.
 */
const STORE_GET_REQUEST = `${SHARED_STORE_PREFIX}:get`;
/**
 * The `shared-store:change` event name. This is a multi-source network event the platform uses
 * internally; it is intentionally NOT declared in the public `MultiSourceNetworkEvents`/
 * `NetworkEvents` types (the shared store service is not part of the public API), but it is tracked
 * as multi-source at runtime via `MULTI_SOURCE_EVENT_NAMES` and surfaced in the OpenRPC document.
 */
const STORE_CHANGE_EVENT = `${SHARED_STORE_PREFIX}:change` as const;

/** OpenRPC notification documentation for the {@link STORE_CHANGE_EVENT} network event. */
const STORE_CHANGE_EVENT_DOCS: SingleNotificationDocumentation = {
  notification: {
    'x-experimental': true,
    summary: 'Emitted when a value in the shared store changes.',
    params: [
      {
        name: 'change',
        required: true,
        summary: 'The changed key and new value with its Lamport timestamp.',
        schema: { type: 'object' },
      },
    ],
  },
};

// https://en.wikipedia.org/wiki/Lamport_timestamp
let localCounter: number = 0;

// Unique process ID used for tie-breaking in Lamport clock comparisons
let processId: string = '';

// Whether initialize() has fully completed (process ID assigned, emitter ready, and — outside the
// main process — initial store data synced). Used by isInitialized().
let isFullyInitialized = false;

// Lamport clock for ordering events across processes
type LamportClock = {
  counter: number;
  processId: string;
};

// Store entry with Lamport clock for conflict resolution.
type StoreEntry = {
  value?: unknown;
  clock: LamportClock;
  // True for a removed key. The entry (and its clock) is kept for conflict resolution, but the key
  // is treated as absent: reads return no value. A removed key is distinct from a key whose value
  // is `undefined`.
  deleted?: boolean;
};

// Store change event emitted when a value is set or removed
export type StoreChangeEvent = StoreEntry & {
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

// Type-only reference to the network service. Type-only imports are erased at compile time and do
// not create a runtime cycle, so it's safe even though network.service statically imports from
// this module.
type NetworkService = typeof import('@shared/services/network.service');

/**
 * In-flight initialization promise. Subsequent calls to {@link initialize} return this same promise
 * so the function is idempotent.
 */
let initializationPromise: Promise<void> | undefined;

/**
 * Resolved when {@link initialize} is first called (regardless of whether it has completed).
 * {@link waitForInitialization} awaits this to know when to start waiting on the actual init
 * promise. Recreated by {@link resetForTesting} so each test starts with a fresh signal.
 */
let initializationStartedResolve: () => void;
let initializationStartedPromise: Promise<void>;
function resetInitializationStartedSignal(): void {
  initializationStartedPromise = new Promise<void>((resolve) => {
    initializationStartedResolve = resolve;
  });
}
resetInitializationStartedSignal();

/**
 * Initialize the shared store service, setting up request handlers and event listeners. Idempotent:
 * subsequent calls return the same promise as the first call.
 *
 * @param networkService The network service module.
 * @returns A promise that resolves when the service is initialized
 */
export function initialize(networkService: NetworkService): Promise<void> {
  if (initializationPromise) return initializationPromise;
  initializationStartedResolve();
  initializationPromise = (async () => {
    // Generate a unique process ID for this process that still includes the process type
    processId = `${globalThis.processType}-${Math.random().toString(36).substring(2, 10)}`;
    logger.debug(`Initializing shared store service`);

    // Create the multi-source emitter for `shared-store:change` synchronously and assign it
    // immediately so the store can emit and subscribe right away. Central registration with the RPC
    // handler runs in the background — we don't await it (it isn't needed for the emitter to work),
    // keeping startup simple.
    const { emitter, registeredEmitterPromise } = networkService.createCoreMultiSourceEventEmitter(
      STORE_CHANGE_EVENT,
      STORE_CHANGE_EVENT_DOCS,
    );
    storeChangeEmitter = emitter;
    // Consume the registration result in the background (failures are already logged inside the
    // network service) so a rejection can't surface as an unhandled rejection.
    (async () => {
      try {
        await registeredEmitterPromise;
      } catch {
        // Registration failure is already logged inside createCoreMultiSourceEventEmitter.
      }
    })();

    // Listen for changes from other processes to update the local store.
    storeChangeEmitter.event((event) => {
      if (event.clock.processId !== processId) setFromRemote(event.key, event);
    });

    if (globalThis.processType !== ProcessType.Main) {
      // Outside the main process, sync the local store to the main store's data initially.
      try {
        const initial = await networkService.request<[], Record<string, StoreEntry>>(
          STORE_GET_REQUEST,
        );
        if (initial) Object.entries(initial).forEach(([key, entry]) => setFromRemote(key, entry));
      } catch (error) {
        logger.warn(`Error initializing local store: ${getErrorMessage(error)}`);
      }
    } else {
      // Inside the main process, register the handler that serves the other processes' initial-fetch
      // requests.
      await networkService.registerRequestHandler(
        STORE_GET_REQUEST,
        (key?: string) => (key === undefined ? { ...localStore } : localStore[key]?.value),
        {
          method: {
            'x-experimental': true,
            summary: 'Get values from the shared store',
            params: [
              {
                name: 'key',
                required: false,
                summary:
                  'The key of the value to retrieve (leave undefined to get the entire store)',
                schema: { type: 'string' },
              },
            ],
            result: {
              name: 'return value',
              summary:
                'The value associated with the key, or the entire store if no key is provided',
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

    // The store is now fully initialized (process ID assigned, emitter ready, and — outside main —
    // initial data synced).
    isFullyInitialized = true;
  })();
  return initializationPromise;
}

/**
 * Wait for the shared store service to be ready.
 *
 * - If {@link initialize} has already been called, returns the existing in-flight promise (no timeout
 *   — we wait as long as init takes).
 * - Otherwise waits for {@link initialize} to be called, then returns the resulting promise.
 *
 * @param startTimeoutMs Time to wait for initialize() to be called before throwing. A non-positive
 *   value (the default, `0`) waits indefinitely. A positive value throws if initialize() is not
 *   called within that many milliseconds. Callers that can tolerate the absence of a ready shared
 *   store should pass a positive timeout and catch/fall back.
 * @throws If `startTimeoutMs` is positive and initialize() is not called within that window.
 */
export async function waitForInitialization(startTimeoutMs: number = 0): Promise<void> {
  if (initializationPromise) return initializationPromise;

  if (startTimeoutMs <= 0) {
    // Wait indefinitely for initialize() to be called.
    await initializationStartedPromise;
  } else {
    // Bounded wait. Use AsyncVariable for the timeout (per the async-coordination decision registry
    // entry) rather than a raw Promise.race. Bridge the long-lived `initializationStartedPromise`
    // signal into the gate from an IIFE; it only ever resolves, never rejects.
    const startGate = new AsyncVariable<undefined>(
      'shared store initialization start',
      startTimeoutMs,
    );
    (async () => {
      try {
        await initializationStartedPromise;
        startGate.resolveToValue(undefined);
      } catch {
        // `initializationStartedPromise` never rejects; nothing to handle.
      }
    })();
    try {
      await startGate.promise;
    } catch {
      // The gate timed out waiting for initialize() to start.
    }
    if (!initializationPromise)
      throw new Error(
        `Shared store service initialize() was not called within ${startTimeoutMs}ms — caller cannot wait for readiness.`,
      );
  }

  // `initializationPromise` is assigned synchronously immediately after the start signal resolves in
  // initialize(), so it is defined here once we have observed the start signal.
  if (!initializationPromise)
    throw new Error('Shared store service initialize() did not start as expected');
  return initializationPromise;
}

/**
 * Reset the shared store service state for testing. This function is only exported for testing
 * purposes and should not be used in production code.
 */
export function resetForTesting(): void {
  processId = '';
  isFullyInitialized = false;
  localCounter = 0;
  Object.keys(localStore).forEach((key) => delete localStore[key]);
  storeChangeEmitter = undefined;
  initializationPromise = undefined;
  resetInitializationStartedSignal();
}

/**
 * Returns a cloned copy of the value currently stored at the key. Throws if the value cannot be
 * cloned (serialize/deserialize failure). Does not check presence — callers that care about
 * presence should check {@link hasValue} first.
 */
function cloneStoredValue<K extends SharedStoreKeys>(key: K): SharedStoreValues[K] {
  // Assert the specific type associated with this key
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return deserialize(serialize(localStore[key]?.value)) as SharedStoreValues[K];
}

/**
 * Get a value from the shared store with proper typing.
 *
 * This runs synchronously and does not wait for initialization: it may return `undefined` if the
 * shared store service has not yet been populated (e.g. during the bootstrap window, before initial
 * sync completes). Use {@link getAsync} if you need to wait for a populated value. Note that even
 * after the store is populated, the returned value may not reflect the most up-to-date value, since
 * changes from other processes arrive asynchronously.
 *
 * @param key The key of the value to retrieve
 * @returns A cloned copy of the value associated with the key, or `undefined` if not found, not yet
 *   populated, or the value could not be cloned
 */
function get<K extends SharedStoreKeys>(key: K): SharedStoreValues[K] | undefined {
  try {
    return cloneStoredValue(key);
  } catch (error) {
    logger.error(`Error getting value for key ${key} from shared store:`, getErrorMessage(error));
    return undefined;
  }
}

/**
 * Set a value in the shared store and notify other processes. Note that if a value with the given
 * key already exists, it can only be set again by the process that created it. This is to prevent
 * race conditions between processes setting values that don't incorporate each others' updates.
 *
 * This runs synchronously and throws if the shared store service has not started initializing (it
 * must be able to broadcast the change). Use {@link setAsync} if you need to wait for initialization
 * before setting.
 *
 * @param key The key to set
 * @param value The value to set. Note that the stored value is a cloned copy of the provided value,
 *   so changes to the original value will not affect the stored value. Also, any non-serializable
 *   data will removed from the value during the cloning process.
 */
function set<K extends SharedStoreKeys>(key: K, value?: SharedStoreValues[K]): void {
  if (!processId || !storeChangeEmitter) throw new Error('Shared store service is not initialized');
  try {
    const currentEntry = localStore[key];
    if (currentEntry && currentEntry.clock.processId !== processId)
      throw new Error('Cannot set value from a different process than the one that created it');
    // Skip a redundant set only when there is already a live (non-removed) value equal to the new
    // one. A removed key must be re-set even if its stored value also happens to equal `value`.
    if (currentEntry && !currentEntry.deleted && deepEqual(currentEntry.value, value)) return;
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
  } catch (error) {
    logger.error(`Error setting value for key ${key} in shared store:`, getErrorMessage(error));
  }
}

/** Update the local store based on an update from another process */
function setFromRemote(key: string, entry: StoreEntry): void {
  localCounter = Math.max(localCounter, entry.clock.counter);
  if (!localStore[key] || compareClocks(entry.clock, localStore[key].clock) > 0)
    localStore[key] = entry;
}

/** Whether there is a live (set, not removed) value at the key in the local store. */
function hasValue(key: string): boolean {
  const entry = localStore[key];
  return entry !== undefined && !entry.deleted;
}

/**
 * Remove a value from the shared store and notify other processes of the change.
 *
 * After removal the key is treated as absent — reads return no value (a removed key is distinct
 * from a key whose value is `undefined`). The entry and its Lamport clock are retained internally
 * for conflict resolution (so the removal can win against concurrent sets and the key can be re-set
 * quickly), but they are not exposed as a value.
 *
 * This runs synchronously and throws if the shared store service has not started initializing. Use
 * {@link removeAsync} if you need to wait for initialization before removing.
 *
 * @param key The key to remove
 */
function remove<K extends SharedStoreKeys>(key: K): void {
  if (!processId || !storeChangeEmitter) throw new Error('Shared store service is not initialized');
  try {
    const currentEntry = localStore[key];
    if (currentEntry && currentEntry.clock.processId !== processId)
      throw new Error('Cannot remove value from a different process than the one that created it');
    // Nothing to remove if the key is already absent or already removed.
    if (!currentEntry || currentEntry.deleted) return;
    const clock = getNextClock();
    localStore[key] = { value: undefined, clock, deleted: true };
    storeChangeEmitter.emit({ key, value: undefined, clock, deleted: true });
  } catch (error) {
    logger.error(`Error removing value for key ${key} from shared store:`, getErrorMessage(error));
  }
}

/**
 * Get a value from the shared store, waiting for the shared store service to be initialized first.
 *
 * Unlike {@link get}, this waits (via {@link waitForInitialization}) until the shared store service
 * is initialized, then reads synchronously. A key with a live value returns that value — which may
 * legitimately be `undefined`. A key that is absent or has been removed has no value: with no
 * `defaultValue` argument this throws; with a `defaultValue` (which may itself be `undefined`) it
 * returns that default.
 *
 * If the shared store service is already initialized, the awaited promise is already settled, so
 * execution continues here on the next microtask without yielding to timers or other queued
 * macrotasks — effectively synchronous from the caller's perspective. Note the returned value may
 * not reflect the most up-to-date value, since changes from other processes arrive asynchronously.
 *
 * @param key The key of the value to retrieve
 * @param defaultValue Returned when the key has no value. Omit to throw instead.
 * @returns A cloned copy of the stored value, or `defaultValue` if the key has no value
 * @throws If the key has no value and no `defaultValue` was provided
 */
function getAsync<K extends SharedStoreKeys>(key: K): Promise<SharedStoreValues[K]>;
function getAsync<K extends SharedStoreKeys>(
  key: K,
  defaultValue: SharedStoreValues[K],
): Promise<SharedStoreValues[K]>;
async function getAsync<K extends SharedStoreKeys>(
  key: K,
  ...rest: [defaultValue?: SharedStoreValues[K]]
): Promise<SharedStoreValues[K]> {
  await waitForInitialization();
  // Live value present — return a clone of it (which may legitimately be undefined). Use the
  // throwing clone rather than `get`, so a serialize/deserialize failure rejects this promise
  // instead of being silently swallowed as `undefined`.
  if (hasValue(key)) return cloneStoredValue(key);
  // No value at the key (absent or removed). `rest.length === 0` means no default was passed.
  if (rest.length === 0)
    throw new Error(`Shared store has no value for key "${key}" and no default value was provided`);
  // rest[0] is typed `SharedStoreValues[K] | undefined` (optional tuple element); the public
  // overloads guarantee a provided default is a valid SharedStoreValues[K].
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return rest[0] as SharedStoreValues[K];
}

/**
 * Set a value in the shared store, waiting for the shared store service to be initialized first.
 *
 * Unlike {@link set}, this waits (via {@link waitForInitialization}) until the shared store service
 * has been initialized, then performs the set synchronously. See {@link set} for the per-key
 * ownership and cloning semantics.
 *
 * If the shared store service is already initialized, the awaited promise is already settled, so
 * execution continues here on the next microtask without yielding to timers or other queued
 * macrotasks — effectively synchronous from the caller's perspective.
 *
 * @param key The key to set
 * @param value The value to set
 */
async function setAsync<K extends SharedStoreKeys>(
  key: K,
  value?: SharedStoreValues[K],
): Promise<void> {
  await waitForInitialization();
  set(key, value);
}

/**
 * Remove a value from the shared store, waiting for the shared store service to be initialized
 * first.
 *
 * Unlike {@link remove}, this waits (via {@link waitForInitialization}) until the shared store
 * service has been initialized, then performs the removal synchronously.
 *
 * If the shared store service is already initialized, the awaited promise is already settled, so
 * execution continues here on the next microtask without yielding to timers or other queued
 * macrotasks — effectively synchronous from the caller's perspective.
 *
 * @param key The key to remove
 */
async function removeAsync<K extends SharedStoreKeys>(key: K): Promise<void> {
  await waitForInitialization();
  remove(key);
}

/**
 * Returns `true` once {@link initialize} has fully completed (process ID assigned, emitter ready,
 * and — outside the main process — initial store data synced). Used to distinguish "value genuinely
 * absent" from "shared store not initialized yet" for optional reads that have a sensible default.
 */
function isInitialized(): boolean {
  return isFullyInitialized;
}

/**
 * Keys for timeout lengths for network requests. Keys are dynamically constructed by adding this
 * prefix to the `requestType`.
 */
export type RequestTimeoutSharedStoreKey = `platform.customNetworkTimeoutMs.${string}`;

// Keep in sync with SharedStoreTypedKeys.cs
/**
 * Defines the keys and types of values held in key-value pairs within the shared store service.
 * Since this service is not part of the public API, the keys and types are not included in
 * `papi-shared-types.ts`. If the platform needs more key-value pairs, they should be added here.
 */
export interface SharedStoreValues {
  [timeoutKey: RequestTimeoutSharedStoreKey]: number | undefined;
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
  getAsync,
  setAsync,
  removeAsync,
  isInitialized,
};
