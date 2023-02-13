/**
 * Handles setting up a connection to the electron backend and exchanging simple messages.
 * Do not use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction over this.
 */
// TODO: Refactor into a class and an interface
// TODO: Combine with NetworkSerice?

import {
  CLIENT_ID_UNASSIGNED,
  ConnectionStatus,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  RequestHandler,
} from '@shared/data/InternalConnectionTypes';
import INetworkConnector from '@shared/services/INetworkConnector';
import * as NetworkConnectorFactory from '@shared/services/NetworkConnectorFactory';
import { ComplexResponse } from '@shared/util/PapiUtil';

/** Whether this connector is setting up or has finished setting up its connection and is ready to communicate on the network */
let connectionStatus = ConnectionStatus.Disconnected;
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
/** Function that accepts requests from the server and responds accordingly. From connect() */
let requestHandler: RequestHandler | undefined;
/** Function that determines the appropriate clientId to which to send requests of the given type. From connect() */
let requestRouter: ((requestType: string) => number) | undefined;
/** The network connector this service uses to send and receive messages */
let networkConnector: INetworkConnector | undefined;

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
  if (!networkConnector) throw Error('request without a networkConnector!');

  // TODO: move the request and clientId code into the NetworkConnector? Leaving for now since it is currently shared between the implementations
  const requestId = nextRequestId;
  nextRequestId += 1;

  // TODO: implement request timeout logic?
  const response = await networkConnector.request<TParam, TReturn>(
    requestType,
    {
      requestId,
      senderId: clientId,
      contents,
    },
  );

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
  requestHandler = undefined;
  requestRouter = undefined;
  connectPromise = undefined;
  if (networkConnector) {
    networkConnector.disconnect();
    networkConnector = undefined;
  }
  if (connectionStatus !== ConnectionStatus.Connected && connectReject)
    connectReject('Disconnecting - client never finished connecting');
  connectResolve = undefined;
  connectReject = undefined;
  connectionStatus = ConnectionStatus.Disconnected;
};

/**
 * Function that handles internal requests by running the requestHandler given in connect()
 * @param requestType type of request to determine which handler to use
 * @param incomingRequest request message to handle
 * @returns response message for the request
 */
const handleInternalRequest: InternalRequestHandler = async <TParam, TReturn>(
  requestType: string,
  incomingRequest: InternalRequest<TParam>,
) => {
  if (!requestHandler)
    throw Error('Handling request without a requestHandler!');

  // Not sure if it's really responsible to put the whole incomingRequest in. Might want to destructure and just pass ComplexRequest members
  const response = await requestHandler<TParam, TReturn>(
    requestType,
    incomingRequest,
  );
  return {
    ...response,
    senderId: incomingRequest.senderId,
    requestId: incomingRequest.requestId,
    responderId: clientId,
  } as InternalResponse<TReturn>;
};

/**
 * Sets up the ConnectionService by connecting to the server and setting up event handlers
 * @param networkRequestHandler function that handles requests from the server by accepting a requestType and a ComplexRequest and returning a Promise of a Complex Response
 * @returns Promise that resolves when finished connecting
 */
export const connect = (
  networkRequestHandler: RequestHandler,
  networkRequestRouter: (requestType: string) => number,
): Promise<void> => {
  // We don't need to run this more than once
  if (connectPromise /* connecting || connected */) {
    if (
      networkRequestHandler === requestHandler &&
      networkRequestRouter === requestRouter
    )
      return connectPromise;
    throw new Error(
      'Cannot connect with two different request handlers or request routers',
    );
  }

  if (!networkRequestHandler) throw new Error('Must provide a request handler');
  if (!networkRequestRouter) throw new Error('Must provide a request router');

  // Start connecting
  connectionStatus = ConnectionStatus.Connecting;
  connectPromise = new Promise<void>((resolve, reject) => {
    connectResolve = resolve;
    connectReject = reject;
  });
  requestHandler = networkRequestHandler;
  requestRouter = networkRequestRouter;

  // Set up subscriptions that the service needs to work
  // Get the client id from the server on new connections
  NetworkConnectorFactory.createNetworkConnector()
    .then(async (nC) => {
      networkConnector = nC;

      try {
        if (!requestRouter) throw new Error('requestRouter not defined.');

        const newConnectorInfo = await networkConnector.connect(
          handleInternalRequest,
          requestRouter,
        );

        if (clientId !== CLIENT_ID_UNASSIGNED) {
          if (!connectReject)
            throw new Error(
              'connectReject not defined. Not connecting? But we already have a clientId',
            );
          connectReject(
            `Received clientId when already assigned! Current clientId: ${clientId}. New clientId: ${newConnectorInfo}`,
          );
          return undefined;
        }

        clientId = newConnectorInfo.clientId;
        console.log(`Got clientId ${clientId}`);

        if (connectionStatus === ConnectionStatus.Disconnected) {
          if (!connectReject)
            throw new Error('connectReject not defined and not connecting.');
          connectReject('No longer connecting');
          return undefined;
        }

        if (!networkConnector) {
          if (!connectReject)
            throw new Error(
              'connectReject not defined and networkConnector not defined.',
            );
          connectReject('networkConnector not defined');
          return undefined;
        }

        // Finished setting up and connecting! Resolve the promise
        if (!connectResolve)
          throw new Error(
            'connectResolve not defined. Tried to connect but somehow this is undefined',
          );

        // Server is not able to send us requests until we are finished connecting
        connectionStatus = ConnectionStatus.Connected;
        connectResolve();

        // Notify server that we are finished connecting
        networkConnector.notifyClientConnected();
      } catch (e) {
        connectionStatus = ConnectionStatus.Disconnected;
        const err = `ConnectionService: Connecting and getting clientId failed: ${e}`;
        if (connectReject) connectReject(err);
        throw new Error(err);
      }

      return networkConnector;
    })
    .catch((e) => {
      connectionStatus = ConnectionStatus.Disconnected;
      const err = `ConnectionService: Failed to create NetworkConnection object: ${e}`;
      if (connectReject) connectReject(err);
      throw new Error(err);
    });

  return connectPromise;
};

/** Gets this connection's clientId */
export const getClientId = () => clientId;
