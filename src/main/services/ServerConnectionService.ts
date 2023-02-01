/**
 * Handles setting up the endpoint for connection to this backend and exchanging simple messages.
 * Do not use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction over this.
 */

import { ComplexRequest, ComplexResponse } from '@shared/util/PapiUtil';

/** Whether the connection is being set up or has finished connecting (does not return to false when connected is true) */
let connecting = false;
/** Whether this service has a connection */
let connected = false;
/** The client id for this server */
const clientId = 0;
/** The next requestId to use for identifying requests */
// let nextRequestId = 0;

/** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
let connectPromise: Promise<void> | undefined;
/** Function that resolves the connection promise to be run after receiving a client id */
let connectResolve: (() => void) | undefined;
/** Function that rejects the connection promise */
let connectReject: ((reason?: string) => void) | undefined;
/** Function that unsubscribes from listening to server requests */
let unsubscribeRequestHandler: (() => void) | undefined;
/** Function that accepts requests from the server and responds accordingly */
let connectionRequestHandler: RequestHandler;

/** Handler for requests from the server */
type RequestHandler =
  | ((requestType: string, request: ComplexRequest) => Promise<ComplexResponse>)
  | undefined;

/** Disconnects from the server */
export const disconnect = () => {
  if (unsubscribeRequestHandler) unsubscribeRequestHandler();
  connectionRequestHandler = undefined;
  connectPromise = undefined;
  if (!connected && connectReject)
    connectReject('Disconnecting - client never finished connecting');
  connectResolve = undefined;
  connectReject = undefined;
  connecting = false;
  connected = false;
};

/**
 * Sets up the ServerConnectionService by opening an endpoint for clients to connect and setting up event handlers
 * @param requestHandler function that handles requests from the client by accepting a requestType and a ComplexRequest and returning a Promise of a Complex Response
 * @returns Promise that resolves when finished setting up
 */
export const connect = (requestHandler: RequestHandler): Promise<void> => {
  // We don't need to run this more than once
  if (connectPromise /* connecting || connected */) {
    if (requestHandler === connectionRequestHandler) return connectPromise;
    throw new Error('Cannot connect with two different request handlers');
  }

  if (!requestHandler) throw new Error('Must provide a request handler');

  // Start connecting
  connecting = true;
  connectionRequestHandler = requestHandler;

  // Set up subscriptions that the service needs to work
  // Get the client id from the server on new connections
  connected = true;

  // Respond to requests from the server. Server is not able to send us requests until we are finished connecting
  unsubscribeRequestHandler = getClient().onRequest(
    async (requestType, incomingRequest) => {
      // Not sure if it's really responsible to put the whole incomingRequest in. Might want to destructure and just pass ComplexRequest members
      const response = await requestHandler(requestType, incomingRequest);
      return {
        ...response,
        senderId: incomingRequest.senderId,
        requestId: incomingRequest.requestId,
        responderId: clientId,
      } as InternalResponse;
    },
  );

  return Promise.resolve();
};
