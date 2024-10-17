/**
 * Handles requests, responses, subscriptions, etc. to the backend. Likely shouldn't need/want to
 * expose this whole service on papi, but there are a few things that are exposed via
 * papiNetworkService
 */

import {
  NetworkEventHandler,
  CATEGORY_COMMAND,
  InternalRequestHandler,
} from '@shared/data/internal-connection.model';
import {
  stringLength,
  UnsubscriberAsync,
  PlatformEventEmitter,
  PlatformEvent,
  indexOf,
  Mutex,
} from 'platform-bible-utils';
import { deserializeRequestType, SerializedRequestType } from '@shared/utils/util';
import PapiNetworkEventEmitter from '@shared/models/papi-network-event-emitter.model';
import { createProtocolHandler } from './network-connector.factory';
import INetworkProtocolHandler from './network-protocol-handler.interface';

// #region Local event handling

/**
 * Map from event type to the emitter for that type as well as if that emitter is "registered" aka
 * one reference to that emitter has been provided somewhere such that that event can be emitted
 * from that one place. NetworkEventEmitter types should not occur multiple times so extensions
 * cannot emit events they shouldn't, so we have a quick and easy no sharing in process rule in
 * createNetworkEventEmitter.
 */
// TODO: sync these between processes
const eventEmittersByEventType = new Map<string, PapiNetworkEventEmitter<unknown>>();

/**
 * Emits the appropriate network event on this process according to the event type
 *
 * @param eventType Type of event to handle
 * @param event The event data to emit
 */
const handleEventFromNetwork: NetworkEventHandler = <T>(eventType: string, event: T) => {
  eventEmittersByEventType.get(eventType)?.emitLocal(event);
};

// #endregion

// #region Service initialization and shutdown

const connectionMutex = new Mutex();
let protocolHandler: INetworkProtocolHandler | undefined;

export async function initialize(): Promise<void> {
  if (protocolHandler) return;
  await connectionMutex.runExclusive(async () => {
    if (protocolHandler) return;

    try {
      protocolHandler = await createProtocolHandler();
    } catch (e) {
      throw new Error(`ConnectionService: Failed to create NetworkConnector object: ${e}`);
    }

    await protocolHandler.connect(handleEventFromNetwork);
  });
}

/** Closes the network services gracefully */
export const shutdown = async () => {
  if (!protocolHandler) return;
  await connectionMutex.runExclusive(async () => {
    if (!protocolHandler) return;

    protocolHandler.disconnect();
    await Promise.all(
      [...eventEmittersByEventType.values()].map(async (emitter) => {
        await emitter.dispose();
      }),
    );
    eventEmittersByEventType.clear();
    protocolHandler = undefined;
  });
};

// #endregion

// #region Request handling

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
  if (!protocolHandler) throw new Error('Protocol handler not set');
  const response = await protocolHandler.request(requestType, args);
  if (response.error)
    throw new Error(`Request error (${response.error.code}): ${response.error.message}`);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return response.result as TReturn;
};

/**
 * Register a local request handler to run on requests.
 *
 * @param requestType The type of request on which to register the handler
 * @param handler Function to register to run on requests
 * @returns Promise that resolves if the request successfully registered and unsubscriber function
 *   to run to stop the passed-in function from handling requests
 */
export async function registerRequestHandler(
  requestType: SerializedRequestType,
  requestHandler: InternalRequestHandler,
): Promise<UnsubscriberAsync> {
  await initialize();
  if (!protocolHandler) throw new Error('Protocol handler not set');
  const success = await protocolHandler?.registerMethod(requestType, requestHandler);
  if (!success) throw new Error(`Could not register request handler for ${requestType}`);
  return async () => {
    if (!protocolHandler) return false;
    return protocolHandler.unregisterMethod(requestType);
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
  if (!protocolHandler) throw new Error('Protocol handler not set');
  if (typeof event === 'object' && event && 'event' in event)
    protocolHandler.emitEventOnNetwork(eventType, event);
  else protocolHandler.emitEventOnNetwork(eventType, { event });
};

const createNetworkEventEmitterInternal = <T>(
  eventType: string,
  returnExistingEmitter: boolean,
): PlatformEventEmitter<T> => {
  const existingEmitter = eventEmittersByEventType.get(eventType);
  if (existingEmitter) {
    // Assert emitter with return type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (returnExistingEmitter) return existingEmitter as PlatformEventEmitter<T>;
    throw new Error(`type ${eventType} is already registered to a network event emitter`);
  }

  const newEmitter = new PapiNetworkEventEmitter<T>(
    (event) => emitEventOnNetwork(eventType, event),
    () => eventEmittersByEventType.delete(eventType),
  );

  // Assert as emitter with an unknown type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  eventEmittersByEventType.set(eventType, newEmitter as PapiNetworkEventEmitter<unknown>);
  return newEmitter;
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
  createNetworkEventEmitterInternal(eventType, false);

/**
 * Gets the network event with the specified type. Creates the emitter if it does not exist
 *
 * @param eventType Unique network event type for coordinating between connections
 * @returns Event for the event type that runs the callback provided when the event is emitted
 */
export const getNetworkEvent = <T>(eventType: string): PlatformEvent<T> => {
  // Return event with the generic type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return createNetworkEventEmitterInternal(eventType, true).event as PlatformEvent<T>;
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
