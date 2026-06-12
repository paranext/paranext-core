/**
 * Handles requests, responses, subscriptions, etc. to the backend. Likely shouldn't need/want to
 * expose this whole service on papi, but there are a few things that are exposed via
 * papiNetworkService
 */

import {
  CATEGORY_COMMAND,
  EventHandler,
  fixupResponse,
  GET_METHODS,
  InternalRequestHandler,
} from '@shared/data/rpc.model';
import {
  AsyncVariable,
  getErrorMessage,
  indexOf,
  isPlatformError,
  Mutex,
  newPlatformError,
  PlatformError,
  PlatformErrorCode,
  PlatformEvent,
  PlatformEventEmitter,
  stringLength,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  RequestTimeoutSharedStoreKey,
  sharedStoreService,
  StoreChangeEvent,
} from '@shared/services/shared-store.service';
import { deserializeRequestType, SerializedRequestType } from '@shared/utils/util';
import { PapiNetworkEventEmitter } from '@shared/models/papi-network-event-emitter.model';
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';
import { createRpcHandler } from '@shared/services/rpc-handler.factory';
import { logger } from '@shared/services/logger.service';
import {
  SingleMethodDocumentation,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';
import { JSONRPCResponse } from 'json-rpc-2.0';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import type { MultiSourceNetworkEvents, NetworkEvents, NetworkEventTypes } from 'papi-shared-types';
import { MULTI_SOURCE_EVENT_NAMES } from '@shared/data/network-event-names';

export { MULTI_SOURCE_EVENT_NAMES };

// #region Local event handling

/**
 * Map from event type to the emitter for that type as well as if that emitter is "registered" aka
 * one reference to that emitter has been provided somewhere such that that event can be emitted
 * from that one place. NetworkEventEmitter types should not occur multiple times so extensions
 * cannot emit events they shouldn't, so we have a quick and easy no sharing in process rule in
 * createNetworkEventEmitter.
 */
// TODO: sync these between processes
const eventEmittersByEventType = new Map<
  string,
  {
    emitter: PapiNetworkEventEmitter<unknown>;
    isRegistered: boolean;
    /**
     * Whether this emitter's event was registered centrally with the RPC handler (via
     * `jsonRpc.registerEvent`). When `true`, disposing the emitter also unregisters the event from
     * the central registry.
     */
    isCentrallyRegistered: boolean;
  }
>();

/**
 * Emits the appropriate network event on this process according to the event type
 *
 * @param eventType Type of event to handle
 * @param event The event data to emit
 */
const handleEventFromNetwork: EventHandler = <T>(eventType: string, event: T) => {
  eventEmittersByEventType.get(eventType)?.emitter.emitLocal(event);
};

// #endregion

// #region Service initialization and shutdown

const connectionMutex = new Mutex();
let jsonRpc: IRpcMethodRegistrar | undefined;

export async function initialize(): Promise<void> {
  if (jsonRpc) return;
  await connectionMutex.runExclusive(async () => {
    if (jsonRpc) return;

    try {
      jsonRpc = await createRpcHandler();
    } catch (e) {
      throw new Error(`ConnectionService: Failed to create NetworkConnector object: ${e}`);
    }

    const connected = await jsonRpc.connect(handleEventFromNetwork);
    if (!connected) throw new Error(`Unable to connect protocol handler`);
  });
}

/** Closes the network services gracefully */
export const shutdown = async () => {
  if (!jsonRpc) return;
  await connectionMutex.runExclusive(async () => {
    if (!jsonRpc) return;

    await jsonRpc.disconnect();
    // Tear down the handler reference before disposing emitters so their disposers skip the
    // now-pointless per-event unregister call — the whole connection is already going away.
    jsonRpc = undefined;
    await Promise.all(
      [...eventEmittersByEventType.values()].map(async (emitter) => {
        await emitter.emitter.dispose();
      }),
    );
    eventEmittersByEventType.clear();
  });
};

// #endregion

// #region Request handling

// This is a hard coded default that will be replaced with a settings value after it loads
let requestTimeoutMs = 30000;

// Unfortunately we can't just call the settings service to read the timeout. That's because the
// settings service depends on the network service (indirectly). Creating a circular dependency
// between the two services would be bad. So we use a hard coded default and then let something else
// set the timeout after the network service and settings service are both initialized.
/** Set the number of seconds that network requests in this process should wait before timing out */
export function setRequestTimeout(timeoutSeconds: number) {
  if (timeoutSeconds < 0)
    throw new Error(`Invalid request timeout ${timeoutSeconds}: must be a non-negative number`);
  requestTimeoutMs = timeoutSeconds * 1000; // convert to milliseconds
  logger.info(`Request timeout set to ${requestTimeoutMs}ms`);
}

function sharedStoreKeyForRequestType(
  requestType: SerializedRequestType,
): RequestTimeoutSharedStoreKey {
  return `platform.customNetworkTimeoutMs.${requestType}`;
}

function getTimeoutMsForRequestType(requestType: SerializedRequestType): number {
  // Custom timeouts live in the shared store. The sync `get` returns undefined both when no custom
  // timeout has been set (normal) and when the shared store has not finished initializing. Only the
  // latter is noteworthy, so log a debug note when we read undefined before the shared store is
  // initialized; otherwise undefined just means "no custom timeout" and we use the default silently.
  const sharedVal = sharedStoreService.get(sharedStoreKeyForRequestType(requestType));
  if (sharedVal === undefined && !sharedStoreService.isInitialized())
    logger.debug(
      `Custom timeout for request type ${requestType} requested before the shared store finished initializing; using default ${requestTimeoutMs}ms`,
    );
  return typeof sharedVal === 'number' && sharedVal >= 0 ? sharedVal : requestTimeoutMs;
}

function setTimeoutMsForRequestType(requestType: SerializedRequestType, timeoutMs: number) {
  if (timeoutMs < 0)
    throw new Error(`Invalid request timeout ${timeoutMs}: must be a non-negative number`);
  sharedStoreService.set(sharedStoreKeyForRequestType(requestType), timeoutMs);
}

function removeTimeoutMsForRequestType(requestType: SerializedRequestType) {
  sharedStoreService.remove(sharedStoreKeyForRequestType(requestType));
}

/** Inspect a value to see if we should process it as a JSONRPCResponse of some sort */
function isJsonRpcResponse(response: unknown): response is JSONRPCResponse {
  return !!response && typeof response === 'object' && 'jsonrpc' in response;
}

/** Ensure the command name consists of two strings separated by at least one period */
function validateCommandFormatting(commandName: string) {
  if (!commandName)
    throw new Error(`Invalid command name ${commandName}: must be a non-empty string`);
  const periodIndex = indexOf(commandName, '.');
  if (periodIndex < 0)
    throw new Error(`Invalid command name ${commandName}: must have at least one period`);
  if (periodIndex === 0)
    throw new Error(
      `Invalid command name ${commandName}: must have non-empty string before a period`,
    );
  if (periodIndex >= stringLength(commandName) - 1)
    throw new Error(
      `Invalid command name ${commandName}: must have a non-empty string after a period`,
    );
}

/** Check to make sure the request follows any request registration rules */
function validateRequestTypeFormatting(requestType: SerializedRequestType) {
  // This request type doesn't conform to the normal format but is required by OpenRPC
  if (requestType.toString() === GET_METHODS) return;
  const { category, directive } = deserializeRequestType(requestType);
  if (category === CATEGORY_COMMAND) {
    validateCommandFormatting(directive);
  }
}

async function doRequest<TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  args: TParam,
  skipRetry: boolean,
): Promise<TReturn> {
  validateRequestTypeFormatting(requestType);
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  const responseAsyncVariable = new AsyncVariable<JSONRPCResponse | PlatformError>(
    `response to ${requestType}`,
    getTimeoutMsForRequestType(requestType),
  );
  // Resolve the async variable to the JSONRPC response in an IIFE
  (async () => {
    try {
      responseAsyncVariable.resolveToValue(
        fixupResponse(await jsonRpc.request(requestType, args, skipRetry)),
      );
    } catch (e) {
      responseAsyncVariable.resolveToValue(newPlatformError(e));
    }
  })();

  let response: JSONRPCResponse | PlatformError | string | undefined;
  try {
    // Wait for the JSONRPC response to resolve or the timeout to be hit, whichever comes first
    response = await responseAsyncVariable.promise;
  } catch (e) {
    response = getErrorMessage(e);
  }

  // When the backend service throws `PlatformErrorCodes.WithCode(code, message)`
  // (see c-sharp/PlatformErrorCodes.cs), the code is serialized into
  // `error.data.data.platformErrorCode`. Extract it here so it survives the
  // rethrow as a PlatformError with a machine-readable `code` property.
  // FN-002, Theme 7 — manage-books feature.
  //
  // The double `.data?.data?` indirection mirrors StreamJsonRpc's wire shape
  // (Theme 12, 2026-04-30):
  //   - The OUTER `error.data` is the standard JSON-RPC 2.0 error envelope's
  //     `data` field (where StreamJsonRpc places its serialized error payload
  //     for thrown C# exceptions).
  //   - The INNER `.data` is StreamJsonRpc's serialized representation of
  //     the C# `Exception.Data` IDictionary, where
  //     `PlatformErrorCodes.WithCode` writes
  //     `ex.Data["platformErrorCode"] = code` (decision-registry.json
  //     `patterns.errorHandling.platformErrorCodes`).
  // Do NOT flatten this access unless StreamJsonRpc's serialization changes —
  // both levels are intentional.
  let platformErrorCode: PlatformErrorCode | undefined;
  if (isJsonRpcResponse(response)) {
    if (!response.error) return response.result;
    platformErrorCode = response.error.data?.data?.platformErrorCode;
    response = `JSON-RPC Request error (${response.error.code}): ${response.error.message}`;
  } else if (isPlatformError(response)) {
    logger.debug(response.message);
    throw response;
  } else {
    response = responseAsyncVariable.hasTimedOut
      ? `JSON-RPC Request timed out: ${requestType} ${JSON.stringify(args)}`
      : `Invalid JSON-RPC Response: ${response}`;
  }
  logger.debug(response);
  throw newPlatformError(response, platformErrorCode);
}

/**
 * Send a request on the network and resolve the response contents.
 *
 * @param requestType The type of request
 * @param args Arguments to send in the request (put in request.contents)
 * @returns Promise that resolves with the response message
 */
export const request = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, false);

/**
 * Send a request on the network without retrying if the handler is not yet registered. Use for
 * requests where immediate failure is preferable to waiting, such as commands sent during app
 * shutdown.
 *
 * @param requestType The type of request
 * @param args Arguments to send in the request (put in request.contents)
 * @returns Promise that resolves with the response message
 */
export const requestNoRetry = async <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
  ...args: TParam
): Promise<TReturn> => doRequest(requestType, args, true);

/**
 * Register a local request handler to run on requests.
 *
 * @param requestType The type of request on which to register the handler
 * @param requestHandler Function to register to run on requests
 * @param requestDocs Documentation for this requestType
 * @param requestHandlerOptions Options to change the behavior of the request handler
 * @returns Promise that resolves if the request successfully registered and unsubscriber function
 *   to run to stop the passed-in function from handling requests
 */
export async function registerRequestHandler(
  requestType: SerializedRequestType,
  requestHandler: InternalRequestHandler,
  requestDocs?: SingleMethodDocumentation,
  requestHandlerOptions?: NetworkMethodHandlerOptions,
): Promise<UnsubscriberAsync> {
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  const success = await jsonRpc.registerMethod(requestType, requestHandler, requestDocs);
  if (!success) throw new Error(`Could not register request handler for ${requestType}`);
  if (requestHandlerOptions?.timeoutMilliseconds !== undefined)
    setTimeoutMsForRequestType(requestType, requestHandlerOptions.timeoutMilliseconds);
  return async () => {
    if (!jsonRpc) return false;
    removeTimeoutMsForRequestType(requestType);
    return jsonRpc.unregisterMethod(requestType);
  };
}

/**
 * Creates a function that is a request function with a baked requestType. This is also nice because
 * you get TypeScript type support using this function.
 *
 * @param requestType RequestType for request function
 * @returns Function to call with arguments of request that performs the request and resolves with
 *   the response contents
 */
export const createRequestFunction = <TParam extends Array<unknown>, TReturn>(
  requestType: SerializedRequestType,
) => {
  return async (...args: TParam) => request<TParam, TReturn>(requestType, ...args);
};

// #endregion

// #region Event handling

/**
 * Sends an event to other connections. Does NOT run the local event subscriptions as they should be
 * run by NetworkEventEmitter after sending on network.
 *
 * @param eventType Unique network event type for coordinating between connections
 * @param event Event to emit on the network
 */
const emitEventOnNetwork = async <T>(eventType: string, event: T) => {
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  jsonRpc.emitEventOnNetwork(eventType, event);
};

/**
 * Cleans up the record for an event emitter when it is disposed. If the emitter had been centrally
 * registered with the RPC handler, also unregister the (single-source) event from the central
 * registry so it stops appearing in the OpenRPC document and frees the name for re-registration.
 *
 * Multi-source events are intentionally NOT unregistered here: multiple emitters for the same name
 * can exist (even within one process), so unregistering one could disrupt the others. They are
 * cleaned up centrally when the process disconnects (the RPC server unregisters all of a
 * connection's events on close), the same way registered methods are.
 *
 * `dispose` on {@link PapiNetworkEventEmitter} is synchronous, but `unregisterEvent` is async, so we
 * cannot await it here. We fire it from an IIFE and log a warning if it rejects.
 */
const disposeNetworkEventEmitter = (eventType: string) => {
  const emitterRecord = eventEmittersByEventType.get(eventType);
  eventEmittersByEventType.delete(eventType);
  if (!emitterRecord?.isCentrallyRegistered || !jsonRpc) return;
  if (MULTI_SOURCE_EVENT_NAMES.has(eventType)) return;
  const rpc = jsonRpc;
  (async () => {
    try {
      await rpc.unregisterEvent(eventType);
    } catch (e) {
      logger.warn(
        `Failed to unregister event "${eventType}" from the central registry: ${getErrorMessage(e)}`,
      );
    }
  })();
};

/**
 * Marks an event emitter's record as centrally registered so that disposing it also unregisters the
 * event from the central registry. See {@link disposeNetworkEventEmitter}.
 */
const markEmitterCentrallyRegistered = (eventType: string) => {
  const emitterRecord = eventEmittersByEventType.get(eventType);
  if (emitterRecord) emitterRecord.isCentrallyRegistered = true;
};

const createNetworkEventEmitterInternal = <T>(
  eventType: string,
  registerEmitter: boolean,
): PlatformEventEmitter<T> => {
  let emitterRecord = eventEmittersByEventType.get(eventType);
  if (!emitterRecord) {
    emitterRecord = {
      // Match the collection type
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      emitter: new PapiNetworkEventEmitter<T>(
        (event) => emitEventOnNetwork(eventType, event),
        () => disposeNetworkEventEmitter(eventType),
      ) as PapiNetworkEventEmitter<unknown>,
      isRegistered: false,
      isCentrallyRegistered: false,
    };
    eventEmittersByEventType.set(eventType, emitterRecord);
  }

  if (registerEmitter) {
    if (emitterRecord.isRegistered)
      throw new Error(`type ${eventType} is already registered to a network event emitter`);

    emitterRecord.isRegistered = true;
  }

  // Assert as emitter with an unknown type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return emitterRecord.emitter as PlatformEventEmitter<T>;
};

/**
 * Creates an event emitter that works properly over the network.
 *
 * @deprecated 8 June 2026. Use `createNetworkEventEmitterAsync`. Events created via the sync API
 *   are not centrally registered and do not appear in the OpenRPC document. The async version
 *   restricts central _registration_ of an event name to a single source (unless the event is
 *   declared in {@link MultiSourceNetworkEvents}, in which case it accepts multiple registrants by
 *   design). Note this restricts registration only — emission itself is not gated by the registry;
 *   the central registry instead warns when an event is announced unregistered or from a process
 *   that did not register it.
 *
 *   WARNING: You can only create a network event emitter once per eventType to prevent hijacked event
 *   emitters.
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event emitter whose event works between connections
 */
export const createNetworkEventEmitter = <T>(eventType: string): PlatformEventEmitter<T> =>
  createNetworkEventEmitterInternal(eventType, true);

/**
 * Create a network event emitter that participates in central registration. Every centrally
 * registered event appears in the OpenRPC document; providing `documentation` fills in its summary,
 * params, and `x-experimental` flag, otherwise it is surfaced with placeholder docs.
 *
 * If the event name is in {@link MultiSourceNetworkEvents}, the central registry uses multi-source
 * semantics: multiple processes may register the same name (each process registers once); all
 * corresponding emitters are valid sources.
 *
 * Otherwise the registry uses single-source semantics: only one process may register a given name;
 * subsequent registrations from any process are rejected.
 *
 * Intra-process duplicate registration is always rejected regardless of the event's domain.
 *
 * See {@link MultiSourceNetworkEvents} for multi-source vs single-source semantics.
 *
 * @param eventType The name of the event to register. Must be a key of {@link NetworkEvents}.
 * @param documentation Optional notification documentation. Carries
 *   `notification['x-experimental']: true` to mark the event as experimental.
 */
export const createNetworkEventEmitterAsync = async <EventType extends NetworkEventTypes>(
  eventType: EventType,
  documentation?: SingleNotificationDocumentation,
): Promise<PlatformEventEmitter<NetworkEvents[EventType]>> => {
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  const accepted = await jsonRpc.registerEvent(eventType, documentation);
  if (!accepted) {
    throw new Error(
      `Event "${eventType}" was rejected by the central registry (likely already registered from another process).`,
    );
  }
  const emitter = createNetworkEventEmitterInternal<NetworkEvents[EventType]>(eventType, true);
  // Tie the central registration to this emitter so disposing it also unregisters the event.
  markEmitterCentrallyRegistered(eventType);
  return emitter;
};

/**
 * How to buffer emits made before a buffered network event finishes registering.
 *
 * - `'queue'` — keep every buffered event and flush them in emit order.
 * - `{ latestByKey }` — keep only the most recent buffered event per key, flushed in first-seen key
 *   order. Use for "only the latest matters" events (e.g. a scroll reference per scroll group, or a
 *   web view update per web view id).
 */
export type NetworkEventBufferStrategy<T> = 'queue' | { latestByKey: (event: T) => string };

/**
 * Buffers network events emitted before their emitter is ready, per a
 * {@link NetworkEventBufferStrategy}. Exported only for unit testing.
 *
 * @internal
 */
export class NetworkEventBuffer<T> {
  private readonly queued: T[] = [];

  private readonly latest = new Map<string, T>();

  constructor(private readonly strategy: NetworkEventBufferStrategy<T>) {}

  add(event: T): void {
    if (this.strategy === 'queue') {
      this.queued.push(event);
      return;
    }
    // `Map.set` on an existing key updates the value but keeps the original insertion position, so
    // the latest value per key flushes in first-seen key order.
    this.latest.set(this.strategy.latestByKey(event), event);
  }

  /** Returns the buffered events in flush order and empties the buffer. */
  drain(): T[] {
    if (this.strategy === 'queue') return this.queued.splice(0);
    const events = [...this.latest.values()];
    this.latest.clear();
    return events;
  }

  clear(): void {
    this.queued.length = 0;
    this.latest.clear();
  }
}

/**
 * Synchronously create a buffered emitter for a single-source network event. Use this for events
 * that may be emitted before the network emitter finishes registering — e.g. from a UI handler or a
 * command that can fire during extension activation, where the eager
 * {@link createNetworkEventEmitterAsync} would leave a module-level emitter `undefined`.
 *
 * The returned `emit` is usable immediately. Emits made before central registration completes are
 * buffered per `options.bufferStrategy` and flushed once registration succeeds; after that `emit`
 * passes straight through. If registration fails, buffered events are dropped (with a warning) and
 * `registeredEmitter` rejects so the caller can respond.
 *
 * @param eventType A key of {@link NetworkEvents}.
 * @param documentation Optional notification documentation. Carries
 *   `notification['x-experimental']: true` to mark the event as experimental.
 * @param options.bufferStrategy How to buffer pre-registration emits. Defaults to `'queue'`.
 * @returns `emit` (usable immediately), `registeredEmitter` (resolves to the underlying emitter, or
 *   rejects if registration failed), and `dispose`.
 */
export const createBufferedNetworkEventEmitter = <EventType extends NetworkEventTypes>(
  eventType: EventType,
  documentation?: SingleNotificationDocumentation,
  options?: { bufferStrategy?: NetworkEventBufferStrategy<NetworkEvents[EventType]> },
): {
  emit: (event: NetworkEvents[EventType]) => void;
  registeredEmitter: Promise<PlatformEventEmitter<NetworkEvents[EventType]>>;
  dispose: () => void;
} => {
  const buffer = new NetworkEventBuffer<NetworkEvents[EventType]>(
    options?.bufferStrategy ?? 'queue',
  );
  let readyEmitter: PlatformEventEmitter<NetworkEvents[EventType]> | undefined;
  let failed = false;
  let disposed = false;

  const registeredEmitter = (async () => {
    let emitter: PlatformEventEmitter<NetworkEvents[EventType]>;
    try {
      emitter = await createNetworkEventEmitterAsync(eventType, documentation);
    } catch (e) {
      failed = true;
      buffer.clear();
      logger.warn(
        `Buffered network event "${eventType}" failed to register; dropping buffered events: ${getErrorMessage(e)}`,
      );
      throw e;
    }
    if (disposed) {
      // Disposed before registration finished — tear down the emitter we just created.
      emitter.dispose();
      return emitter;
    }
    readyEmitter = emitter;
    buffer.drain().forEach((event) => emitter.emit(event));
    return emitter;
  })();
  // Consume the rejection internally so a caller that ignores `registeredEmitter` doesn't surface an
  // unhandled rejection (the failure is already logged above). Callers that want to respond can
  // still await/catch `registeredEmitter` independently.
  (async () => {
    try {
      await registeredEmitter;
    } catch {
      // Already handled above.
    }
  })();

  const emit = (event: NetworkEvents[EventType]) => {
    if (readyEmitter) {
      readyEmitter.emit(event);
      return;
    }
    if (failed) {
      logger.warn(`Network event "${eventType}" emit dropped — its emitter failed to register`);
      return;
    }
    buffer.add(event);
  };

  const dispose = () => {
    disposed = true;
    buffer.clear();
    readyEmitter?.dispose();
  };

  return { emit, registeredEmitter, dispose };
};

/**
 * Core-internal map of multi-source network events. Extends the public
 * {@link MultiSourceNetworkEvents} with platform-internal multi-source events that are intentionally
 * NOT advertised on the PAPI — the shared store change event, for example, because the shared store
 * service is not part of the public API. Used to type {@link createCoreMultiSourceEventEmitter}.
 */
export type InternalMultiSourceNetworkEvents = MultiSourceNetworkEvents & {
  'shared-store:change': StoreChangeEvent;
};

/**
 * Synchronously create a network event emitter for one of the pre-approved multi-source events —
 * those listed in {@link MULTI_SOURCE_EVENT_NAMES}. Throws synchronously if `eventType` is not such
 * an event.
 *
 * This is core-internal (not exposed on `papiNetworkService`, hence the `Core` in the name):
 * multi-source events are platform events, not for extensions to create.
 *
 * Unlike {@link createNetworkEventEmitterAsync}, the emitter is returned immediately so callers can
 * use it without awaiting. Central registration with the RPC handler is performed in the
 * background; the returned `registeredEmitterPromise` resolves to the same emitter once
 * registration completes. If registration fails, the promise logs a warning and rejects with the
 * underlying error.
 *
 * Multi-source emitters are NOT unregistered on dispose (multiple emitters for the same name can
 * coexist); the central registry cleans them up when the process disconnects. See
 * {@link disposeNetworkEventEmitter}.
 *
 * @param eventType The name of the multi-source event to create. Must be a key of
 *   {@link InternalMultiSourceNetworkEvents}.
 * @param documentation Optional notification documentation. Carries
 *   `notification['x-experimental']: true` to mark the event as experimental.
 * @returns An object with the synchronously-created `emitter` and a `registeredEmitterPromise` that
 *   resolves to that same emitter when central registration completes.
 */
export const createCoreMultiSourceEventEmitter = <
  EventType extends keyof InternalMultiSourceNetworkEvents,
>(
  eventType: EventType,
  documentation?: SingleNotificationDocumentation,
): {
  emitter: PlatformEventEmitter<InternalMultiSourceNetworkEvents[EventType]>;
  registeredEmitterPromise: Promise<
    PlatformEventEmitter<InternalMultiSourceNetworkEvents[EventType]>
  >;
} => {
  if (!MULTI_SOURCE_EVENT_NAMES.has(eventType))
    throw new Error(
      `Event "${eventType}" is not a pre-approved multi-source event. Use createNetworkEventEmitterAsync for single-source events.`,
    );

  // Create the emitter synchronously so the caller can use it right away.
  const emitter = createNetworkEventEmitterInternal<InternalMultiSourceNetworkEvents[EventType]>(
    eventType,
    true,
  );

  // Register the event centrally in the background. The returned promise resolves to the same
  // emitter so callers can await registration completion when they need it.
  const registeredEmitterPromise = (async () => {
    try {
      await initialize();
      if (!jsonRpc) throw new Error('RPC handler not set');
      const accepted = await jsonRpc.registerEvent(eventType, documentation);
      if (!accepted)
        throw new Error(
          `Event "${eventType}" was rejected by the central registry (likely already registered from this process).`,
        );
      // Record that this emitter's event is registered centrally. Disposing it will NOT unregister
      // (disposeNetworkEventEmitter skips multi-source names); the flag just reflects reality.
      markEmitterCentrallyRegistered(eventType);
      return emitter;
    } catch (e) {
      logger.warn(
        `Failed to register multi-source event "${eventType}" with the central registry: ${getErrorMessage(e)}`,
      );
      throw e;
    }
  })();

  return { emitter, registeredEmitterPromise };
};

/**
 * Subscribe to a typed network event. The payload type is inferred from the event's declaration in
 * {@link NetworkEvents}.
 *
 * @param eventType The name of the event to subscribe to. Must be a key of {@link NetworkEvents}.
 * @returns Event for the event type that runs the callback provided when the event is emitted
 */
export function getNetworkEvent<EventType extends NetworkEventTypes>(
  eventType: EventType,
): PlatformEvent<NetworkEvents[EventType]>;
/**
 * Subscribe to a network event with an explicit payload type.
 *
 * @deprecated 8 June 2026. Use the typed signature: declare the event in {@link NetworkEvents} and
 *   call `getNetworkEvent('your.event.name')` without an explicit type parameter.
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event for the event type that runs the callback provided when the event is emitted
 */
export function getNetworkEvent<T>(eventType: string): PlatformEvent<T>;
export function getNetworkEvent(eventType: string): PlatformEvent<unknown> {
  return createNetworkEventEmitterInternal(eventType, false).event;
}

// #endregion

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiNetworkService {
  createNetworkEventEmitter: typeof createNetworkEventEmitter;
  createNetworkEventEmitterAsync: typeof createNetworkEventEmitterAsync;
  createBufferedNetworkEventEmitter: typeof createBufferedNetworkEventEmitter;
  getNetworkEvent: typeof getNetworkEvent;
}

/**
 * JSDOC SOURCE papiNetworkService
 *
 * Service that provides a way to send and receive network events
 */
export const papiNetworkService: PapiNetworkService = {
  createNetworkEventEmitter,
  createNetworkEventEmitterAsync,
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
};
