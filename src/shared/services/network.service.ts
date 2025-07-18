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
  indexOf,
  isPlatformError,
  Mutex,
  newPlatformError,
  PlatformEvent,
  PlatformEventEmitter,
  stringLength,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  RequestTimeoutSharedStoreKey,
  sharedStoreService,
} from '@shared/services/shared-store.service';
import { deserializeRequestType, SerializedRequestType } from '@shared/utils/util';
import { PapiNetworkEventEmitter } from '@shared/models/papi-network-event-emitter.model';
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';
import { createRpcHandler } from '@shared/services/rpc-handler.factory';
import { logger } from '@shared/services/logger.service';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { JSONRPCResponse } from 'json-rpc-2.0';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';

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
  { emitter: PapiNetworkEventEmitter<unknown>; isRegistered: boolean }
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
    await Promise.all(
      [...eventEmittersByEventType.values()].map(async (emitter) => {
        await emitter.emitter.dispose();
      }),
    );
    eventEmittersByEventType.clear();
    jsonRpc = undefined;
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
  const sharedVal = sharedStoreService.get(sharedStoreKeyForRequestType(requestType));
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
): Promise<TReturn> => {
  validateRequestTypeFormatting(requestType);
  await initialize();
  if (!jsonRpc) throw new Error('RPC handler not set');
  let timeoutOccurred = false;
  let response: unknown;
  const timeoutMs = getTimeoutMsForRequestType(requestType);
  // If the request takes longer than the configured timeout, throw an error
  if (timeoutMs > 0) {
    await Promise.race([
      (async () => {
        try {
          response = fixupResponse(await jsonRpc.request(requestType, args));
        } catch (e) {
          response = newPlatformError(e);
        }
      })(),
      new Promise<void>((resolve) => {
        setTimeout(() => {
          timeoutOccurred = true;
          resolve();
        }, timeoutMs);
      }),
    ]);
  }
  // There is no timeout so we can run the request normally
  else {
    try {
      response = fixupResponse(await jsonRpc.request(requestType, args));
    } catch (e) {
      response = newPlatformError(e);
    }
  }

  if (isJsonRpcResponse(response)) {
    if (!response.error) return response.result;
    response = `JSON-RPC Request error (${response.error.code}): ${response.error.message}`;
  } else if (isPlatformError(response)) {
    logger.debug(response.message);
    throw response;
  } else {
    response = timeoutOccurred
      ? `JSON-RPC Request timed out: ${requestType} ${JSON.stringify(args)}`
      : `Invalid JSON-RPC Response: ${JSON.stringify(response)}`;
  }
  logger.debug(response);
  throw newPlatformError(response);
};

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
        () => eventEmittersByEventType.delete(eventType),
      ) as PapiNetworkEventEmitter<unknown>,
      isRegistered: false,
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
 * Creates an event emitter that works properly over the network. Other connections receive this
 * event when it is emitted.
 *
 * WARNING: You can only create a network event emitter once per eventType to prevent hijacked event
 * emitters.
 *
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event emitter whose event works between connections
 */
export const createNetworkEventEmitter = <T>(eventType: string): PlatformEventEmitter<T> =>
  createNetworkEventEmitterInternal(eventType, true);

/**
 * Gets the network event with the specified type. Creates the emitter if it does not exist
 *
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event for the event type that runs the callback provided when the event is emitted
 */
export const getNetworkEvent = <T>(eventType: string): PlatformEvent<T> => {
  // Return event with the generic type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return createNetworkEventEmitterInternal(eventType, false).event as PlatformEvent<T>;
};

// #endregion

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiNetworkService {
  createNetworkEventEmitter: typeof createNetworkEventEmitter;
  getNetworkEvent: typeof getNetworkEvent;
}

/**
 * JSDOC SOURCE papiNetworkService
 *
 * Service that provides a way to send and receive network events
 */
export const papiNetworkService: PapiNetworkService = {
  createNetworkEventEmitter,
  getNetworkEvent,
};
