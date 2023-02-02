/**
 * Handles requests, responses, subscriptions, etc. to the backend.
 * Likely shouldn't need/want to expose on papi
 */

import * as ClientConnectionService from '@services/ClientConnectionService';
import { RequestHandler } from '@shared/data/InternalConnectionTypes';
import {
  ComplexRequest,
  ComplexResponse,
  Unsubscriber,
} from '@shared/util/PapiUtil';
import { getErrorMessage } from '@shared/util/Util';
import memoizeOne from 'memoize-one';

/** Whether this service has finished setting up */
let initialized = false;
/** Map of requestType to registered handler for that request */
const requestRegistrations = new Map<string, RequestRegistration>();

/** Information about the request handler and how to run it */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestRegistration<TParam = any, TReturn = any> = {
  requestType: string;
  handler:
    | RoutedRequestHandler<TParam, TReturn>
    | RoutedRequestHandler<TParam[], TReturn>;
  handlerType: RequestHandlerType;
};

/**
 * Args handler function for a request. Called when a request is handled.
 * The function should accept the spread of the contents array of the request as its parameters.
 * The function should return an object that becomes the contents object of the response.
 * This type of handler is a normal function.
 */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgsRequestHandler<T extends Array<unknown> = any[], K = any> = (
  ...args: T
) => K;

/**
 * Contents handler function for a request. Called when a request is handled.
 * The function should accept the contents object of the request as its single parameter.
 * The function should return an object that becomes the contents object of the response.
 */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentsRequestHandler<T = any, K = any> = (contents: T) => K;

/**
 * Complex handler function for a request. Called when a request is handled.
 * The function should accept a ComplexRequest object as its single parameter.
 * The function should return a ComplexResponse object that becomes the response..
 * This type of handler is the most flexible of the request handlers.
 */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComplexRequestHandler<T = any, K = any> = (
  request: ComplexRequest<T>,
) => ComplexResponse<K>;

/** Handler function for a request */
// Any is probably fine because we likely never know or care about the args or return
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RoutedRequestHandler<T = any, K = any> =
  | ArgsRequestHandler<T[], K>
  | ContentsRequestHandler<T, K>
  | ComplexRequestHandler<T, K>;

/** Type of request handler - indicates what type of parameters and what return type the handler has */
enum RequestHandlerType {
  Args = 'args',
  Contents = 'contents',
  Complex = 'complex',
}

/**
 * Calls the appropriate request handler according to the request type and returns a promise of the response
 * @param requestType type of request to handle
 * @param request the request to handle
 * @returns promise of response to the request
 */
const routeIncomingRequest: RequestHandler = async <TParam, TReturn>(
  requestType: string,
  incomingRequest: ComplexRequest<TParam>,
): Promise<ComplexResponse<TReturn>> => {
  const registration = requestRegistrations.get(requestType);

  let result: TReturn | undefined;
  let success = false;
  let errorMessage = '';

  if (!registration)
    // There is no handler registered for this request. Respond failure
    errorMessage = 'No handler was found to process the request';
  else
    switch (registration.handlerType) {
      case RequestHandlerType.Args:
        try {
          result = incomingRequest.contents
            ? (registration.handler as ArgsRequestHandler)(
                ...(incomingRequest.contents as unknown[]),
              )
            : (registration.handler as ArgsRequestHandler)();
          success = true;
        } catch (e) {
          errorMessage = getErrorMessage(e);
        }
        break;
      case RequestHandlerType.Contents:
        try {
          result = (registration.handler as ContentsRequestHandler)(
            incomingRequest.contents,
          );
          success = true;
        } catch (e) {
          errorMessage = getErrorMessage(e);
        }
        break;
      case RequestHandlerType.Complex: {
        try {
          const response = (registration.handler as ComplexRequestHandler)(
            incomingRequest,
          );
          // Break out the contents of the ComplexResponse to use existing variables. Should we destructure instead to future-proof for other fields? It was not playing well with Typescript
          result = response.contents;
          success = response.success;
          errorMessage = response.errorMessage;
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
    errorMessage = 'The JS-handled request was not handled successfully';
  }

  return {
    contents: result,
    success,
    errorMessage,
  };
};

/**
 * Unregisters a request handler from running on requests
 * @param requestType the type of request from which to unregister the handler
 * @param handler function to unregister from running on requests
 * @returns true if successfully unregistered
 * Likely will never need to be exported from this file. Just use registerRequestHandler, which returns a matching unsubscriber function that runs this.
 */
function unregisterRequestHandler(
  requestType: string,
  handler: RoutedRequestHandler,
): boolean {
  if (requestRegistrations.get(requestType)?.handler === handler) {
    requestRegistrations.delete(requestType);
    return true;
  }
  return false;
}

/**
 * Register a request handler to run on requests. Must register requests with the server to receive them here.
 * @param requestType the type of request on which to register the handler
 * @param handler function to register to run on requests
 * @param handlerType type of handler function - indicates what type of parameters and what return type the handler has
 * @returns unsubscriber function to run to stop the passed-in function from handling requests
 */
export function registerRequestHandler(
  requestType: string,
  handler: ContentsRequestHandler,
  handlerType?: RequestHandlerType,
): Unsubscriber;
export function registerRequestHandler(
  requestType: string,
  handler: ComplexRequestHandler,
  handlerType?: RequestHandlerType,
): Unsubscriber;
export function registerRequestHandler(
  requestType: string,
  handler: ArgsRequestHandler,
  handlerType?: RequestHandlerType,
): Unsubscriber;
export function registerRequestHandler(
  requestType: string,
  handler: RoutedRequestHandler,
  handlerType = RequestHandlerType.Args,
): Unsubscriber {
  requestRegistrations.set(requestType, {
    requestType,
    handler,
    handlerType,
  });
  return () => unregisterRequestHandler(requestType, handler);
}

/**
 * Send a request to the server and resolve after receiving a response
 * @param requestType the type of request
 * @param contents contents to send in the request
 * @returns promise that resolves with the response message
 */
export const request = async <TParam, TReturn>(
  requestType: string,
  contents: TParam,
) => {
  return ClientConnectionService.request<TParam, TReturn>(
    requestType,
    contents,
  );
};

/** Sets up the NetworkService. Runs only once */
export const initialize = memoizeOne(async (): Promise<void> => {
  if (initialized) return;

  // Wait to connect to the server
  await ClientConnectionService.connect(routeIncomingRequest);

  // On closing, try to close the connection
  // TODO: should probably do this on the server when the connection closes
  window.addEventListener('beforeunload', async () => {
    await ClientConnectionService.disconnect();
  });

  initialized = true;
});
