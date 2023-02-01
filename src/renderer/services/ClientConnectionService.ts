/**
 * Handles setting up a connection to the electron backend and exchanging simple messages.
 * Do not use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction over this.
 */
// TODO: Refactor into a class and an interface

import {
  CLIENT_ID_UNASSIGNED,
  InternalResponse,
  RequestHandler,
} from '@shared/data/InternalConnectionTypes';
import { ComplexResponse } from '@shared/util/PapiUtil';

/** Whether the connection is being set up or has finished connecting (does not return to false when connected is true) */
let connecting = false;
/** Whether this service has a connection */
let connected = false;
/** The client id for this browser as assigned by the server */
let clientId = CLIENT_ID_UNASSIGNED;
/** The next requestId to use for identifying requests */
let nextRequestId = 0;

/** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
let connectPromise: Promise<void> | undefined;
/** Function that resolves the connection promise to be run after receiving a client id */
let connectResolve: (() => void) | undefined;
/** Function that rejects the connection promise */
let connectReject: ((reason?: string) => void) | undefined;
/** Function that unsubscribes from listening to server requests */
let unsubscribeRequestHandler: (() => void) | undefined;
/** Function that accepts requests from the server and responds accordingly */
let connectionRequestHandler: RequestHandler | undefined;

/**
 * Gets the electron client connection if connected. Throws otherwise.
 * Similar in concept to a sendMessage function in that it checks for connection and then lets you do connection things.
 * @param unsafe whether to get the client even if we aren't connected. WARNING: SETTING THIS FLAG MEANS NOT CHECKING FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. There may be no clientId
 * @returns electronAPI.client for use in communicating to the main process
 */
const getClient = (unsafe = false) => {
  // TODO: add message queueing?
  if (!unsafe && !connected)
    throw new Error(`Trying to use client when not connected!`);
  return window.electronAPI.client;
};

/**
 * Send a request to the server and resolve after receiving a response
 * @param requestType the type of request
 * @param contents contents to send in the request
 * @returns promise that resolves with the response message
 */
export const request = async <TParam, TReturn>(
  requestType: string,
  contents: TParam,
): Promise<ComplexResponse<TReturn>> => {
  // TODO: move the request and clientId code into the NetworkConnector? Leaving for now since it is currently shared between the implementations
  const requestId = nextRequestId;
  nextRequestId += 1;

  // TODO: implement request timeout logic?
  const response = await getClient().request<TParam, TReturn>(requestType, {
    requestId,
    senderId: clientId,
    contents,
  });

  if (requestId !== response.requestId)
    throw new Error(
      `Received response from ${response.responderId} with wrong requestId! requestId = ${requestId}, response.requestId = ${response.requestId}`,
    );

  if (clientId !== response.senderId)
    throw new Error(
      `Received response from ${response.responderId} with wrong senderId ${response.senderId}!`,
    );

  return response;
};

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
 * Sets up the ClientConnectionService by connecting to the server and setting up event handlers
 * @param requestHandler function that handles requests from the server by accepting a requestType and a ComplexRequest and returning a Promise of a Complex Response
 * @returns Promise that resolves when finished connecting
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
  connectPromise = new Promise<void>((resolve, reject) => {
    connectResolve = resolve;
    connectReject = reject;
  });
  connectionRequestHandler = requestHandler;

  // Set up subscriptions that the service needs to work
  // Get the client id from the server on new connections
  getClient(true)
    .getId()
    .then((newClientId) => {
      if (clientId !== CLIENT_ID_UNASSIGNED) {
        if (!connectReject)
          throw new Error(
            'connectReject not defined. Not connecting? But we already have a clientId',
          );
        connectReject(
          `Received clientId when already assigned! Current clientId: ${clientId}. New clientId: ${newClientId}`,
        );
        return undefined;
      }

      clientId = newClientId;
      console.log(`Got clientId ${clientId}`);

      if (!connecting) {
        if (!connectReject)
          throw new Error('connectReject not defined and not connecting.');
        connectReject('No longer connecting');
        return undefined;
      }

      // Finished setting up and connecting! Resolve the promise
      if (!connectResolve)
        throw new Error(
          'connectResolve not defined. Tried to connect but somehow this is undefined',
        );
      // Respond to requests from the server. Server is not able to send us requests until we are finished connecting
      unsubscribeRequestHandler = getClient(true).handleRequest(
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
      connected = true;
      connectResolve();

      // Notify server that we are finished connecting
      getClient().notifyClientConnected(clientId);

      return undefined;
    })
    .catch((e) => {
      connecting = false;
      const err = `ClientConnectionService: Getting clientId failed: ${e}`;
      if (connectReject) connectReject(err);
      throw new Error(err);
    });

  return connectPromise;
};
