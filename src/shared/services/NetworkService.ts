/**
 * Handles requests, responses, subscriptions, etc. to the backend.
 * Likely shouldn't need/want to expose on papi
 */

import memoizeOne from 'memoize-one';
import {
  CLIENT_ID_SERVER,
  RequestHandler,
} from '@shared/data/InternalConnectionTypes';
import {
  ComplexRequest,
  ComplexResponse,
  UnsubscriberAsync,
} from '@shared/util/PapiUtil';
import { getErrorMessage } from '@shared/util/Util';
import * as ConnectionService from '@shared/services/ConnectionService';
import { isClient } from '@shared/util/InternalUtil';

/** Whether this service has finished setting up */
let initialized = false;
/** Map of requestType to registered handler for that request or (on server) information about which connection to send the request */
const requestRegistrations = new Map<string, RequestRegistration>();

/** Request handler that is a local function and can be handled locally */
type LocalRequestRegistration<TParam, TReturn> = {
  registrationType: 'local';
  requestType: string;
  handlerType: RequestHandlerType;
  handler:
    | RoutedRequestHandler<TParam, TReturn>
    | RoutedRequestHandler<TParam[], TReturn>;
};

/** Request handler that is not on this network service and must be requested on the network. Server-only as clients will all just send to the server */
type RemoteRequestRegistration = {
  registrationType: 'remote';
  requestType: string;
  clientId: number;
};

/** Information about the request handler and how to run it */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestRegistration<TParam = any, TReturn = any> =
  | LocalRequestRegistration<TParam, TReturn>
  | RemoteRequestRegistration;

/**
 * Args handler function for a request. Called when a request is handled.
 * The function should accept the spread of the contents array of the request as its parameters.
 * The function should return an object that becomes the contents object of the response.
 * This type of handler is a normal function.
 */
type ArgsRequestHandler<
  // Any is probably fine because we likely never know or care about the args or return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParam extends Array<unknown> = any[],
  // Any is probably fine because we likely never know or care about the args or return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TReturn = any,
> = (...args: TParam) => Promise<TReturn>;

/**
 * Contents handler function for a request. Called when a request is handled.
 * The function should accept the contents object of the request as its single parameter.
 * The function should return an object that becomes the contents object of the response.
 */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentsRequestHandler<TParam = any, TReturn = any> = (
  contents: TParam,
) => Promise<TReturn>;

/**
 * Complex handler function for a request. Called when a request is handled.
 * The function should accept a ComplexRequest object as its single parameter.
 * The function should return a ComplexResponse object that becomes the response..
 * This type of handler is the most flexible of the request handlers.
 */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComplexRequestHandler<TParam = any, TReturn = any> = (
  request: ComplexRequest<TParam>,
) => Promise<ComplexResponse<TReturn>>;

/** Handler function for a request */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RoutedRequestHandler<TParam = any, TReturn = any> =
  | ArgsRequestHandler<TParam[], TReturn>
  | ContentsRequestHandler<TParam, TReturn>
  | ComplexRequestHandler<TParam, TReturn>;

/** Type of request handler - indicates what type of parameters and what return type the handler has */
enum RequestHandlerType {
  Args = 'args',
  Contents = 'contents',
  Complex = 'complex',
}

// #region Private unsafe functions (do not call manually outside of initialization)

/**
 * Send a request to the server and resolve a ComplexResponse after receiving a response.
 * Note: Unless you need access to ComplexResponse properties, you probably just want to use request
 * WARNING: THIS THROWS IF NOT INITIALIZED. DO NOT USE OUTSIDE OF INITIALIZATION. Use requestRaw
 * @param requestType the type of request
 * @param contents contents to send in the request
 * @returns promise that resolves with the response message
 */
const requestRawUnsafe = async <TParam, TReturn>(
  requestType: string,
  contents: TParam,
): Promise<ComplexResponse<TReturn>> => {
  if (!initialized)
    throw new Error(
      `Cannot perform raw request ${requestType} as the NetworkService is not initialized`,
    );
  return ConnectionService.request<TParam, TReturn>(requestType, contents);
};

/**
 * Send a request on the network and resolve the response contents.
 * WARNING: THIS THROWS IF NOT INITIALIZED. DO NOT USE OUTSIDE OF INITIALIZATION. Use request
 * @param requestType the type of request
 * @param args arguments to send in the request (put in request.contents)
 * @returns promise that resolves with the response message
 */
const requestUnsafe = async <TParam extends Array<unknown>, TReturn>(
  requestType: string,
  ...args: TParam
) => {
  if (!initialized)
    throw new Error(
      `Cannot perform request ${requestType} as the NetworkService is not initialized`,
    );
  const response = await requestRawUnsafe<TParam, TReturn>(requestType, args);
  if (!response.success) throw new Error(response.errorMessage);
  return response.contents;
};

/**
 * Unregisters a local request handler from running on requests.
 * WARNING: THIS THROWS IF NOT INITIALIZED. DO NOT USE OUTSIDE OF INITIALIZATION. Use unregisterRequestHandler (not created yet as it may never be necessary)
 * @param requestType the type of request from which to unregister the handler
 * @param handler function to unregister from running on requests
 * @returns true if successfully unregistered, false if registration not found or trying to unregister a handler that is not local. Throws if provided handler is not the correct handler
 * Likely will never need to be exported from this file. Just use registerRequestHandler, which returns a matching unsubscriber function that runs this.
 */
async function unregisterRequestHandlerUnsafe(
  requestType: string,
  handler: RoutedRequestHandler,
): Promise<boolean> {
  const requestRegistration = requestRegistrations.get(requestType);

  if (!requestRegistration)
    // The request isn't registered locally
    // TODO: If you run the unsubscribe from registerRequestHandler before it resolves, you
    // may accidentally hit here before the handler is registered. That would be a memory
    // leak, I suppose. We should consider a better solution
    return false;

  if (requestRegistration.registrationType === 'remote')
    // The request handler is someone else's to unregister. Is this egregious enough that we should throw here? This only really happens if you're the server right now as the server holds remote handlers
    return false;

  if (requestRegistration.handler !== handler)
    // Somehow the handlers do not match. Probably can't happen unless you call this function directly which shouldn't happen. Is this egregious enough that we should throw? I guess...?
    throw new Error(
      `Handler to unsubscribe from ${requestType} does not match registered handler`,
    );

  // Check with the server to make sure we can unregister this registration
  const remoteUnregisterSuccessful = isClient()
    ? await requestUnsafe(
        'server:unregisterRequest',
        requestType,
        ConnectionService.getClientId(),
      )
    : true;

  if (!remoteUnregisterSuccessful)
    // The server did not allow us to unregister
    return false;

  // We can unregister this handler! Remove it from the registrations
  requestRegistrations.delete(requestType);
  return true;
}

/**
 * Register a local request handler to run on requests.
 * WARNING: THIS THROWS IF NOT INITIALIZED. DO NOT USE OUTSIDE OF INITIALIZATION. Use unregisterRequestHandler (not created yet as it may never be necessary)
 * @param requestType the type of request on which to register the handler
 * @param handler function to register to run on requests
 * @param handlerType type of handler function - indicates what type of parameters and what return type the handler has
 * @returns unsubscriber function to run to stop the passed-in function from handling requests
 */
function registerRequestHandlerUnsafe(
  requestType: string,
  handler: ArgsRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
function registerRequestHandlerUnsafe(
  requestType: string,
  handler: ContentsRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
function registerRequestHandlerUnsafe(
  requestType: string,
  handler: ComplexRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
function registerRequestHandlerUnsafe(
  requestType: string,
  handler: RoutedRequestHandler,
  handlerType = RequestHandlerType.Args,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync } {
  let resolveRegistration:
    | ((value: void | PromiseLike<void>) => void)
    | undefined;
  let rejectRegistration: ((reason: string) => void) | undefined;
  /** Promise that resolves when this request successfully finishes registering */
  const promise = new Promise<void>((resolve, reject) => {
    resolveRegistration = resolve;
    rejectRegistration = reject;
  });
  // Typescript does not understand these are definitely defined because the promise above is synchronous
  if (!resolveRegistration || !rejectRegistration)
    throw new Error(`Somehow the promise functions are not defined`);
  // Only register the first handler provided for this request type
  // Check locally if we already have a handler for this requestType
  if (requestRegistrations.has(requestType)) {
    // This rejectRegistration before remoteRequest so we can reject the promise returned instead
    // of throwing an error is the only reason we can't just return remoteRequest and avoid all
    // the complication of holding promise resolve and reject and all this. Consider just
    // throwing an exception. That would mean you would have to check for registerRequestHandler
    // to throw exceptions in addition to .catch-ing its promise, but maybe it's worth it. Dunno
    rejectRegistration(
      `requestType ${requestType} already has a local handler registered`,
    );
    return { promise, unsubscriber: async () => false };
  }

  // Check with the server if it already has a handler for this requestType
  const remoteRequest: Promise<void> = isClient()
    ? // If we are the client, try to register with the server because server has all registrations
      requestUnsafe(
        'server:registerRequest',
        requestType,
        ConnectionService.getClientId(),
      )
    : // If we are the server, we just checked if there was already a registration
      Promise.resolve();

  remoteRequest
    .then(() => {
      // We have successfully checked that this is the first registration for this requestType, set up the handler
      requestRegistrations.set(requestType, {
        registrationType: 'local',
        requestType,
        handler,
        handlerType,
      });
      if (!resolveRegistration)
        throw new Error(`Somehow resolveRegistration is not defined`);
      resolveRegistration();
      return undefined;
    })
    .catch((e) => {
      if (!rejectRegistration)
        throw new Error(`Somehow rejectRegistration is not defined`);
      rejectRegistration(e);
    });

  return {
    promise,
    unsubscriber: () => unregisterRequestHandlerUnsafe(requestType, handler),
  };
}

// #endregion

// #region Server-only variables and functions

/**
 * Unregisters a client connection's request handler
 * SERVER-ONLY. This should not be needed on the client
 * @param requestType the type of request on which to unregister the handler
 * @param clientId clientId of the client who wants to unregister the handler
 * @returns true if successfully unregistered, false otherwise
 */
const unregisterRemoteRequestHandler = async (
  requestType: string,
  clientId: number,
): Promise<boolean> => {
  const requestRegistration = requestRegistrations.get(requestType);

  if (!requestRegistration)
    // The request isn't registered
    return false;

  if (
    requestRegistration.registrationType === 'local' ||
    requestRegistration.clientId !== clientId
  )
    // The request handler is not theirs to unregister. Is this egregious enough that we should throw here?
    return false;

  // We can unregister this handler! Remove it from the registrations
  requestRegistrations.delete(requestType);
  return true;
};

/**
 * Registers a client connection's request handler
 * SERVER-ONLY. This should not be needed on the client
 * @param requestType the type of request on which to register the handler
 * @param clientId clientId of the client who wants to register the handler
 */
const registerRemoteRequestHandler = async (
  requestType: string,
  clientId: number,
): Promise<void> => {
  // TODO: Consider a good way to expose senderId in this scenario instead of just passing it as an argument.
  // Maybe create a registerRequestHandlerInternal function that uses InternalRequest and InternalResponse?

  // Check to see if there is already a handler for this requestType
  if (requestRegistrations.has(requestType)) {
    throw new Error(
      `requestType ${requestType} already has a remote handler registered`,
    );
  }

  // Once we have checked that this is the first registration for this requestType, set up the handler
  requestRegistrations.set(requestType, {
    registrationType: 'remote',
    requestType,
    clientId,
  });
};

/** Map of requestTypes to server-side handlers for those requests */
const serverRequestHandlers = {
  'server:registerRequest': registerRemoteRequestHandler,
  'server:unregisterRequest': unregisterRemoteRequestHandler,
};
/** Function that unsubscribes all the server request handlers */
let unsubscribeServerRequestHandlers: UnsubscriberAsync | undefined;

// #endregion

/**
 * Calls the appropriate request handler according to the request type and returns a promise of the response
 * @param requestType type of request to handle
 * @param request the request to handle
 * @returns promise of response to the request
 */
const handleLocalRequest: RequestHandler = async <TParam, TReturn>(
  requestType: string,
  incomingRequest: ComplexRequest<TParam>,
): Promise<ComplexResponse<TReturn>> => {
  const registration = requestRegistrations.get(requestType);

  // Result can be undefined if there is an error, so we initialize it here to undefined. But it should always be of type TReturn if there is a success
  let result: TReturn = undefined as TReturn;
  let success = false;
  let errorMessage = '';

  if (!registration)
    // There is no handler registered for this request. Respond failure
    errorMessage = `No handler was found to process the request of type ${requestType}`;
  else if (registration.registrationType === 'remote')
    errorMessage = `Requested to handle local request but request ${requestType} is remote`;
  else
    switch (registration.handlerType) {
      case RequestHandlerType.Args:
        try {
          result = await (incomingRequest.contents
            ? (registration.handler as ArgsRequestHandler)(
                ...(incomingRequest.contents as unknown[]),
              )
            : (registration.handler as ArgsRequestHandler)());
          success = true;
        } catch (e) {
          errorMessage = getErrorMessage(e);
        }
        break;
      case RequestHandlerType.Contents:
        try {
          result = await (registration.handler as ContentsRequestHandler)(
            incomingRequest.contents,
          );
          success = true;
        } catch (e) {
          errorMessage = getErrorMessage(e);
        }
        break;
      case RequestHandlerType.Complex: {
        try {
          const response = await (
            registration.handler as ComplexRequestHandler
          )(incomingRequest);
          // Break out the contents of the ComplexResponse to use existing variables. Should we destructure instead to future-proof for other fields? It was not playing well with Typescript
          success = response.success;
          if (response.success) result = response.contents;
          else errorMessage = response.errorMessage;
        } catch (e) {
          errorMessage = getErrorMessage(e);
        }
        break;
      }
      default:
        throw Error(
          `RequestHandlerType.${registration.handlerType} not supported! On requestType ${requestType}`,
        );
    }

  if (!success && !errorMessage) {
    errorMessage = `The JS-handled request of type ${requestType} was not handled successfully`;
  }

  return {
    contents: result,
    success,
    errorMessage,
  };
};

/**
 * Determines the appropriate clientId to which to send requests of the given type
 * @param requestType type of request to determine which clientId will handle the request
 * @returns clientId that handles requests of the given type
 */
const routeRequest = (requestType: string): number => {
  const registration = requestRegistrations.get(requestType);
  if (!registration)
    // We are the client and we need to send the request to the server or we are the server and we need to return an error
    return CLIENT_ID_SERVER;
  if (registration.registrationType === 'local')
    // We will handle this request here
    return ConnectionService.getClientId();
  // This registration is for another connection
  return registration.clientId;
};

/** Sets up the NetworkService. Runs only once */
export const initialize = memoizeOne(async (): Promise<void> => {
  if (initialized) return;

  // Wait to connect to the server
  await ConnectionService.connect(handleLocalRequest, routeRequest);

  // Register server-only request handlers
  if (!isClient()) {
    const registrationUnsubAndPromises = Object.entries(
      serverRequestHandlers,
    ).map(([requestType, handler]) =>
      registerRequestHandlerUnsafe(requestType, handler),
    );
    unsubscribeServerRequestHandlers = async () => {
      // Run the unsubscriber for each handler
      const unsubPromises = registrationUnsubAndPromises.map(
        ({ unsubscriber }) => unsubscriber(),
      );
      // If any of the unsubscribers resolves to false, we did not succeed
      // TODO: make a util function to tune up this Promise.all so they all resolve even if one throws
      return !(await Promise.all(unsubPromises)).includes(false);
    };
    // Wait to successfully register all requests
    await Promise.all(
      registrationUnsubAndPromises.map(({ promise }) => promise),
    );
  }

  // On closing, try to close the connection
  // TODO: should probably do this on the server when the connection closes
  if (isClient())
    window.addEventListener('beforeunload', async () => {
      ConnectionService.disconnect();
      if (unsubscribeServerRequestHandlers) unsubscribeServerRequestHandlers();
    });

  initialized = true;
});

// #region Public safe functions (call these, not the private unsafe functions above)

/**
 * Send a request to the server and resolve a ComplexResponse after receiving a response.
 * Note: Unless you need access to ComplexResponse properties, you probably just want to use request
 * @param requestType the type of request
 * @param contents contents to send in the request
 * @returns promise that resolves with the response message
 */
/* const requestRaw = async <TParam, TReturn>(
  requestType: string,
  contents: TParam,
): Promise<ComplexResponse<TReturn>> => {
  await initialize();
  return requestRawUnsafe<TParam, TReturn>(requestType, contents);
}; */

/**
 * Send a request on the network and resolve the response contents
 * @param requestType the type of request
 * @param args arguments to send in the request (put in request.contents)
 * @returns promise that resolves with the response message
 */
export const request = async <TParam extends Array<unknown>, TReturn>(
  requestType: string,
  ...args: TParam
) => {
  await initialize();
  return requestUnsafe<TParam, TReturn>(requestType, ...args);
};

/**
 * Register a local request handler to run on requests.
 * TODO: This isn't quite safe yet. See TODO below. Basically, if you run this
 * before initializing, the unsubscriber returned may not work if you call it
 * immediately, and it will throw an exception (we can remove this if we
 * actually run into this case and it seems to work fine). You must wait to call it later
 * @param requestType the type of request on which to register the handler
 * @param handler function to register to run on requests
 * @param handlerType type of handler function - indicates what type of parameters and what return type the handler has
 * @returns unsubscriber function to run to stop the passed-in function from handling requests
 */
export function registerRequestHandler(
  requestType: string,
  handler: ArgsRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
export function registerRequestHandler(
  requestType: string,
  handler: ContentsRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
export function registerRequestHandler(
  requestType: string,
  handler: ComplexRequestHandler,
  handlerType?: RequestHandlerType,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync };
export function registerRequestHandler(
  requestType: string,
  handler: RoutedRequestHandler,
  handlerType = RequestHandlerType.Args,
): { promise: Promise<void>; unsubscriber: UnsubscriberAsync } {
  // If we're already initialized, run registerRequestHandler almost like normal but with an initialize check in the unsubscriber
  if (initialized) {
    const { promise, unsubscriber: regUnsubscriber } =
      registerRequestHandlerUnsafe(requestType, handler, handlerType);
    // Use the returned unsubAndPromise's unsubscriber to make a safe unregisterRequestHandler
    return {
      promise,
      unsubscriber: async () => {
        await initialize();
        return regUnsubscriber();
      },
    };
  }

  // Create an object with a stable unsubscriber reference that we can change when we get the real unsubscriber after awaiting intialize
  const unsubRef: { unsubscriber: UnsubscriberAsync } = {
    unsubscriber: async () => {
      // TODO: The unsubscriber we return might not actually do anything meaningful at first (it expliticly calls unregisterRequestHandlerUnsafe, which is a no-no), so it throws an exception. Refactor this mess so we aren't giving a stunted unsubscriber at first and then subsequently empowering it after initialize is finished
      // TODO: Should the unsubscriber await initialize first, or should it just go ahead and run it? Also below
      const unregistered = await unregisterRequestHandlerUnsafe(
        requestType,
        handler,
      );
      throw new Error(
        `unsubscribe run from registerRequestHandler before NetworkService finished initializing! unsubscribe was${
          unregistered ? '' : ' not'
        } successful.`,
      );
    },
  };
  return {
    promise: initialize().then(() => {
      const newUnsubAndPromise = registerRequestHandlerUnsafe(
        requestType,
        handler,
        handlerType,
      );
      // Change the returned unsubAndPromise's unsubscriber to be a safe unregisterRequestHandler
      unsubRef.unsubscriber = async () => {
        // TODO: Should the unsubscriber await initialize first, or should it just go ahead and run it? Also above
        await initialize();
        return newUnsubAndPromise.unsubscriber();
      };
      return newUnsubAndPromise.promise;
    }),
    unsubscriber: () => unsubRef.unsubscriber(),
  };
}

// #endregion

/**
 * Creates a function that is a request function with a baked requestType.
 * This is also nice because you get TypeScript type support using this function.
 * @param requestType requestType for request function
 * @returns function to call with arguments of request that performs the request and resolves with the response contents
 */
export const createRequestFunction = <TParam extends Array<unknown>, TReturn>(
  requestType: string,
) => {
  return async (...args: TParam) =>
    request<TParam, TReturn>(requestType, ...args);
};
