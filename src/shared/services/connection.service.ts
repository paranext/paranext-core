/**
 * Handles setting up a connection to the electron backend and exchanging simple messages. Do not
 * use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction
 * over this.
 */
// TODO: Refactor into a class and an interface
// TODO: Combine with NetworkService?

import {
  CLIENT_ID_UNASSIGNED,
  ConnectionStatus,
  InternalEvent,
  InternalNetworkEventHandler,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  NetworkConnectorEventHandlers,
  NetworkEventHandler,
  RequestHandler,
  RequestRouter,
} from '@shared/data/internal-connection.model';
import INetworkConnector from '@shared/services/network-connector.interface';
import { createNetworkConnector } from '@shared/services/network-connector.factory';
import logger from '@shared/services/logger.service';
import { ComplexResponse, SerializedRequestType } from '@shared/utils/util';

/**
 * Whether this connector is setting up or has finished setting up its connection and is ready to
 * communicate on the network
 */
let connectionStatus = ConnectionStatus.Disconnected;
/** The client id for this browser as assigned by the server */
let clientId = CLIENT_ID_UNASSIGNED;
/** The next requestId to use for identifying requests */
let nextRequestId = 0;

/**
 * Promise that resolves when the connection is finished or rejects if disconnected before the
 * connection finishes
 */
let connectPromise: Promise<void> | undefined;
/** Function that resolves the connection promise to be run after receiving a client id */
let connectResolve: (() => void) | undefined;
/** Function that rejects the connection promise */
let connectReject: ((reason?: string) => void) | undefined;
/** Function that accepts requests from the server and responds accordingly. From connect() */
let requestHandler: RequestHandler | undefined;
/**
 * Function that determines the appropriate clientId to which to send requests of the given type.
 * From connect()
 */
let requestRouter: RequestRouter | undefined;
/** Function that accepts events from the server and emits them locally. From connect() */
let eventHandler: NetworkEventHandler | undefined;
/** Function that runs when a client is disconnected. From connect() */
let networkConnectorEventHandlers: NetworkConnectorEventHandlers | undefined;
/** The network connector this service uses to send and receive messages */
let networkConnector: INetworkConnector | undefined;

/**
 * Send a request to the server and resolve after receiving a response
 *
 * @param requestType The type of request
 * @param contents Contents to send in the request
 * @returns Promise that resolves with the response message
 */
export const request = async <TParam, TReturn>(
  requestType: string,
  contents: TParam,
): Promise<ComplexResponse<TReturn>> => {
  if (!networkConnector) throw new Error('request without a networkConnector!');

  // TODO: move the request and clientId code into the NetworkConnector? Leaving for now since it is currently shared between the implementations
  const requestId = nextRequestId;
  nextRequestId += 1;

  // TODO: implement request timeout logic?
  const response = await networkConnector.request<TParam, TReturn>(requestType, {
    requestId,
    senderId: clientId,
    contents,
  });

  if (requestId !== response.requestId)
    throw new Error(
      `Received response from ${response.senderId} with wrong requestId! requestId = ${requestId}, response.requestId = ${response.requestId}`,
    );

  if (clientId !== response.requesterId)
    throw new Error(
      `Received response from ${response.senderId} with wrong requesterId ${response.requesterId}!`,
    );

  return response;
};

/**
 * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
 * run by NetworkEventEmitter after sending on network.
 *
 * @param eventType Unique network event type for coordinating between processes
 * @param event Event to emit on the network
 */
export const emitEventOnNetwork = async <T>(eventType: string, event: T) => {
  if (!networkConnector) throw new Error('emitEventOnNetwork without a networkConnector!');

  await networkConnector.emitEventOnNetwork(eventType, {
    senderId: clientId,
    event,
  });
};

/** Disconnects from the server */
export const disconnect = () => {
  requestHandler = undefined;
  requestRouter = undefined;
  eventHandler = undefined;
  networkConnectorEventHandlers = undefined;
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
 *
 * @param requestType Type of request to determine which handler to use
 * @param incomingRequest Request message to handle
 * @returns Response message for the request
 */
const handleInternalRequest: InternalRequestHandler = async <TParam, TReturn>(
  requestType: string,
  incomingRequest: InternalRequest<TParam>,
): Promise<InternalResponse<TReturn>> => {
  if (!requestHandler) throw new Error('Handling request without a requestHandler!');

  // Not sure if it's really responsible to put the whole incomingRequest in. Might want to destructure and just pass ComplexRequest members
  const response = await requestHandler<TParam, TReturn>(
    // We don't require requestType to be SerializedRequestType in this service, but they should all
    // be SerializedRequestType if they are all registered as such. Doesn't matter much to us here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    requestType as SerializedRequestType,
    incomingRequest,
  );
  return {
    ...response,
    senderId: clientId,
    requesterId: incomingRequest.senderId,
    requestId: incomingRequest.requestId,
  };
};

/**
 * Function that handles events from the network by running the event handler given in connect()
 *
 * @param eventType Type of request to determine which handler to use
 * @param event Event message to handle
 */
const handleEventFromNetwork: InternalNetworkEventHandler = async <T>(
  eventType: string,
  incomingEvent: InternalEvent<T>,
) => {
  if (!eventHandler) throw new Error('Handling event without an eventHandler!');

  eventHandler<T>(eventType, incomingEvent.event);
};

/**
 * Sets up the ConnectionService by connecting to the server and setting up event handlers
 *
 * @param localRequestHandler Function that handles requests from the server by accepting a
 *   requestType and a ComplexRequest and returning a Promise of a Complex Response
 * @param networkRequestRouter Function that determines the appropriate clientId to which to send
 *   requests of the given type
 * @param localEventHandler Function that handles events from the server by accepting an eventType
 *   and an event and emitting the event locally
 * @param connectorEventHandlers Functions that run when network connector events occur like when
 *   clients are disconnected
 * @returns Promise that resolves when finished connecting
 */
export const connect = async (
  localRequestHandler: RequestHandler,
  networkRequestRouter: RequestRouter,
  localEventHandler: NetworkEventHandler,
  connectorEventHandlers: NetworkConnectorEventHandlers,
): Promise<void> => {
  // Do not run anything asynchronous before we create and assign connectPromise below!
  // We must assign connectPromise immediately so we do not run connect multiple times at once

  // We don't need to run this more than once
  if (connectPromise /* connecting || connected */) {
    if (
      localRequestHandler === requestHandler &&
      networkRequestRouter === requestRouter &&
      localEventHandler === eventHandler &&
      connectorEventHandlers === networkConnectorEventHandlers
    )
      return connectPromise;
    throw new Error('Cannot connect with two different request handlers or request routers');
  }

  if (!localRequestHandler) throw new Error('Must provide a request handler');
  if (!networkRequestRouter) throw new Error('Must provide a request router');
  if (!localEventHandler) throw new Error('Must provide an event handler');
  if (!connectorEventHandlers)
    throw new Error('Must provide an object containing connector event handlers');

  // Start connecting
  connectionStatus = ConnectionStatus.Connecting;
  connectPromise = new Promise<void>((resolve, reject) => {
    connectResolve = resolve;
    connectReject = reject;
  });
  requestHandler = localRequestHandler;
  requestRouter = networkRequestRouter;
  eventHandler = localEventHandler;
  networkConnectorEventHandlers = connectorEventHandlers;

  // Set up subscriptions that the service needs to work

  // Create the network connector
  try {
    networkConnector = await createNetworkConnector();
  } catch (e) {
    connectionStatus = ConnectionStatus.Disconnected;
    connectPromise = undefined;
    const err = `ConnectionService: Failed to create NetworkConnector object: ${e}`;
    if (connectReject) connectReject(err);
    throw new Error(err);
  }

  // Set up the connection and get the client id from the server on new connections
  try {
    if (!requestRouter) throw new Error('requestRouter not defined.');
    if (!networkConnectorEventHandlers)
      throw new Error('networkConnectorEventHandlers not defined.');

    const newConnectorInfo = await networkConnector.connect(
      handleInternalRequest,
      requestRouter,
      handleEventFromNetwork,
      networkConnectorEventHandlers,
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
    logger.info(`Got clientId ${clientId}`);

    if (!networkConnector) {
      if (!connectReject)
        throw new Error('connectReject not defined and networkConnector not defined.');
      connectReject('networkConnector not defined');
      return undefined;
    }

    // Finished setting up and connecting! Resolve the promise
    if (!connectResolve)
      throw new Error('connectResolve not defined. Tried to connect but somehow this is undefined');

    // Server is not able to send us requests until we are finished connecting
    connectionStatus = ConnectionStatus.Connected;
    connectResolve();

    // Notify server that we are finished connecting
    networkConnector.notifyClientConnected();
  } catch (e) {
    connectionStatus = ConnectionStatus.Disconnected;
    connectPromise = undefined;
    const err = `ConnectionService: Connecting and getting clientId failed: ${e}`;
    if (connectReject) connectReject(err);
    throw new Error(err);
  }

  return connectPromise;
};

/** Gets this connection's clientId */
export const getClientId = () => clientId;
