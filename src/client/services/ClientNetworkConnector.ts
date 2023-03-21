import {
  ConnectionStatus,
  CONNECTOR_INFO_DISCONNECTED,
  InternalEvent,
  InternalNetworkEventHandler,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  NetworkConnectorInfo,
  RequestRouter,
} from '@shared/data/InternalConnectionTypes';
import { Unsubscriber } from '@shared/util/PapiUtil';
import INetworkConnector from '@shared/services/INetworkConnector';
import {
  InitClient,
  Message,
  MessageType,
  WebSocketEvent,
  WebSocketRequest,
  WebSocketResponse,
  WEBSOCKET_ATTEMPTS_MAX,
  WEBSOCKET_ATTEMPTS_WAIT,
  WEBSOCKET_PORT,
} from '@shared/data/NetworkConnectorTypes';
import { getErrorMessage } from '@shared/util/Util';
import logger from '@shared/util/logger';
import PEventEmitter from '@shared/models/PEventEmitter';
import { createWebSocket } from '@client/services/WebSocketFactory';
import { IWebSocket } from '@client/services/IWebSocket';

// #region local variables

// TODO: implement request timeout logic
/** Holds promises for a request */
type LiveRequest<TReturn> = {
  requestId: number;
  resolve: (
    value: InternalResponse<TReturn> | PromiseLike<InternalResponse<TReturn>>,
  ) => void;
  reject: (reason?: unknown) => void;
};

/** localStorage key to store the current clientGuid */
const CLIENT_GUID_KEY = 'client-network-connector:clientGuid';

// #endregion

/**
 * Handles the connection from the client to the server
 */
export default class ClientNetworkConnector implements INetworkConnector {
  // #region INetworkConnector members

  connectorInfo: NetworkConnectorInfo = CONNECTOR_INFO_DISCONNECTED;
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;

  // #endregion

  // #region private members

  /** The webSocket connected to the server */
  private webSocket?: IWebSocket;

  /** All message subscriptions - emitters that emit an event each time a message with a specific message type comes in */
  private messageEmitters = new Map<MessageType, PEventEmitter<Message>>();

  /** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
  private connectPromise?: Promise<NetworkConnectorInfo>;

  /** Function that removes this initClient handler from the connection */
  private unsubscribeHandleInitClientMessage?: Unsubscriber;
  /** Function that removes this response handler from the connection */
  private unsubscribeHandleResponseMessage?: Unsubscriber;
  /** Function that removes this handleRequest from the connection */
  private unsubscribeHandleRequestMessage?: Unsubscriber;
  /** Function that removes this handleEvent from the connection */
  private unsubscribeHandleEventMessage?: Unsubscriber;

  /**
   * Function to call when we receive a request that is registered on this connector.
   * Handles requests from the connection and returns a response to send back
   */
  private localRequestHandler?: InternalRequestHandler;
  /**
   * Function to call when we are sending a request.
   * Returns a clientId to which to send the request based on the requestType
   */
  private requestRouter?: RequestRouter;
  /**
   * Function to call when we receive an event.
   * Handles events from the connection by emitting the event locally
   */
  private localEventHandler?: InternalNetworkEventHandler;

  /** All requests that are waiting for a response */
  // Disabled no-explicit-any because assigning a request with generic type to LiveRequest<unknown> gave error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private requests = new Map<number, LiveRequest<any>>();

  /** Unique Guid associated with this connection. Used to verify certain things with server */
  private clientGuid: string | undefined;

  // #endregion

  // #region INetworkConnector methods

  connect = async (
    localRequestHandler: InternalRequestHandler,
    requestRouter: RequestRouter,
    localEventHandler: InternalNetworkEventHandler,
  ) => {
    // NOTE: This does not protect against sending two different request handlers. See ConnectionService for that
    // We don't need to run this more than once
    if (this.connectPromise) return this.connectPromise;

    this.connectionStatus = ConnectionStatus.Connecting;
    this.localRequestHandler = localRequestHandler;
    this.requestRouter = requestRouter;
    this.localEventHandler = localEventHandler;

    /** Function that resolves the connection promise to be run after receiving a client id */
    let resolveConnect: (
      value: NetworkConnectorInfo | PromiseLike<NetworkConnectorInfo>,
    ) => void;
    /** Function that rejects the connection promise */
    let rejectConnect: (reason?: string) => void;

    /** The promise that resolves when the service is finished connecting */
    this.connectPromise = new Promise<NetworkConnectorInfo>(
      (resolve, reject) => {
        resolveConnect = resolve;
        rejectConnect = reject;
      },
    );

    // Set up subscriptions that the service needs to work
    // Get the client id from the server on new connections
    this.unsubscribeHandleInitClientMessage = this.subscribe(
      MessageType.InitClient,
      ({ connectorInfo: newConnectorInfo, clientGuid }: InitClient) => {
        this.connectorInfo = Object.freeze(newConnectorInfo);
        this.clientGuid = clientGuid;

        if (!this.webSocket) {
          rejectConnect('webSocket is gone!');
          return;
        }

        // Listen for responses from the server and resolve the request promise
        this.unsubscribeHandleResponseMessage = this.subscribe(
          MessageType.Response,
          this.handleResponseMessage,
        );

        // Listen for requests from the server and run the request handler
        this.unsubscribeHandleRequestMessage = this.subscribe(
          MessageType.Request,
          (requestMessage: WebSocketRequest) =>
            this.handleRequestMessage(requestMessage, true),
        );

        this.unsubscribeHandleEventMessage = this.subscribe(
          MessageType.Event,
          (eventMessage: WebSocketEvent<unknown>) =>
            this.handleEventMessage(eventMessage),
        );

        // Finished setting up WebSocketService and connecting! Resolve the promise
        this.connectionStatus = ConnectionStatus.Connected;
        resolveConnect(this.connectorInfo);
      },
    );

    // Connect the webSocket - try a few times
    let attempts = 0;
    const tryConnectWebSocket = async () => {
      if (attempts < WEBSOCKET_ATTEMPTS_MAX) {
        attempts += 1;
        this.webSocket = await createWebSocket(
          `ws://localhost:${WEBSOCKET_PORT}`,
        );

        // Attach event listeners
        this.webSocket.addEventListener('message', this.onMessage);
        this.webSocket.addEventListener('close', this.disconnect);

        // Remove event listeners and try connecting again
        const retry = (e: Event) => {
          const err = (e as Event & { error?: Error }).error;
          logger.warn(
            `ClientNetworkConnector WebSocket did not connect on attempt ${attempts}. Trying again. Error: ${getErrorMessage(
              err,
            )}`,
          );
          if (this.webSocket) {
            this.webSocket.removeEventListener('message', this.onMessage);
            this.webSocket.removeEventListener('close', this.disconnect);
            this.webSocket.removeEventListener('error', retry);
          }
          setTimeout(tryConnectWebSocket, WEBSOCKET_ATTEMPTS_WAIT);
        };

        this.webSocket.addEventListener('error', retry);

        // When we have successfully connected, remove retry-related listeners
        const finishConnecting = () => {
          if (this.webSocket) {
            this.webSocket.removeEventListener('error', retry);
            this.webSocket.removeEventListener('open', finishConnecting);
          }
        };

        this.webSocket.addEventListener('open', finishConnecting);
      } else {
        throw new Error(
          `ClientNetworkConnector WebSocket was not able to connect after ${attempts} attempts.`,
        );
      }
    };
    tryConnectWebSocket();

    return this.connectPromise;
  };

  notifyClientConnected = async () => {
    // Check if this client is reconnecting (such as if the browser refreshed) and tell the server so it can remove all request registrations associated with the old clientId
    const reconnectingClientGuid = localStorage.getItem(CLIENT_GUID_KEY);

    this.sendMessage({
      type: MessageType.ClientConnect,
      senderId: this.connectorInfo.clientId,
      reconnectingClientGuid,
    });

    // Save the new clientGuid so we can check it when reconnecting
    if (this.clientGuid) localStorage.setItem(CLIENT_GUID_KEY, this.clientGuid);
    else localStorage.removeItem(CLIENT_GUID_KEY);

    // In webSocket land, we do not receive a response from the server when we notify client connected
    // TODO: change the clientConnected into a request that resolves properly. Then we can also know if we reconnected, I suppose
    return Promise.resolve();
  };

  disconnect = () => {
    if (this.connectionStatus !== ConnectionStatus.Connected)
      throw new Error('Web socket closed without connecting');

    this.connectionStatus = ConnectionStatus.Disconnected;
    this.localRequestHandler = undefined;
    this.requestRouter = undefined;
    this.localEventHandler = undefined;
    this.connectPromise = undefined;
    this.connectorInfo = CONNECTOR_INFO_DISCONNECTED;
    if (this.unsubscribeHandleInitClientMessage)
      this.unsubscribeHandleInitClientMessage();
    if (this.unsubscribeHandleResponseMessage)
      this.unsubscribeHandleResponseMessage();
    if (this.unsubscribeHandleRequestMessage)
      this.unsubscribeHandleRequestMessage();
    if (this.unsubscribeHandleEventMessage)
      this.unsubscribeHandleEventMessage();

    if (this.webSocket) {
      this.webSocket.removeEventListener('message', this.onMessage);
      this.webSocket.removeEventListener('close', this.disconnect);
      this.webSocket.close();
      this.webSocket = undefined;
    }
  };

  request = async <TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ): Promise<InternalResponse<TReturn>> => {
    // Set up a promise we can resolve later
    let liveRequest: LiveRequest<TReturn> | undefined;
    const requestPromise = new Promise<InternalResponse<TReturn>>(
      (resolve, reject) => {
        liveRequest = {
          requestId: request.requestId,
          resolve,
          reject,
        };
      },
    );

    if (!liveRequest)
      throw new Error(
        `Live request was not created for requestId ${request.requestId}`,
      );

    // Save the live request to resolve when we get the response
    this.requests.set(request.requestId, liveRequest);

    // Send the request corresponding to the live request promise
    this.handleRequestMessage(
      {
        type: MessageType.Request,
        requestType,
        ...request,
      },
      false,
    );

    return requestPromise;
  };

  emitEventOnNetwork = async <T>(
    eventType: string,
    event: InternalEvent<T>,
  ) => {
    // TODO: implement some kind of waiting for a connection? This method is async for hopeful forward compatibility
    this.sendMessage({
      type: MessageType.Event,
      eventType,
      ...event,
    });
  };

  // #endregion

  // #region private methods

  /**
   * Send a message to the server via webSocket. Throws if not connected
   * @param message message to send
   */
  private sendMessage = (message: Message): void => {
    // TODO: add message queueing
    if (this.connectionStatus !== ConnectionStatus.Connected || !this.webSocket)
      throw new Error(
        `Trying to send message when not connected! Message ${message}`,
      );

    if (
      message.type === MessageType.Response &&
      this.connectorInfo.clientId === message.requesterId
    ) {
      // This message is from us and for us. Handle the message as if we just received it
      this.onMessage(
        {
          data: message as unknown as string,
        } as MessageEvent,
        true,
      );
    } else {
      // This message is for someone else. Send the message
      this.webSocket.send(JSON.stringify(message));
    }
  };

  /**
   * Receives and appropriately publishes server webSocket messages
   * @param event webSocket message information
   * @param fromSelf whether this message is from this connector instead of from someone else
   */
  private onMessage = (event: MessageEvent<string>, fromSelf = false) => {
    const data = fromSelf
      ? (event.data as unknown as Message)
      : (JSON.parse(event.data as string) as Message);

    const emitter = this.messageEmitters.get(data.type);
    emitter?.emit(data);
  };

  /**
   * Subscribes a function to run on webSocket messages of a particular type
   * @param messageType the type of message on which to subscribe the function
   * @param callback function to run with the contents of the webSocket message
   * @returns unsubscriber function to run to stop calling the passed-in function on webSocket messages
   */
  private subscribe = (
    messageType: MessageType,
    // Any is here because I dunno how to narrow Message type to a specific message type in parameters of a function
    // TODO: investigate this further another time
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (eventData: Message | any) => void,
  ): Unsubscriber => {
    let emitter = this.messageEmitters.get(messageType);
    if (!emitter) {
      emitter = new PEventEmitter<Message>();
      this.messageEmitters.set(messageType, emitter);
    }
    return emitter.subscribe(callback);
  };

  /**
   * Function that handles webSocket messages of type Response.
   * Resolves the request associated with the received response message
   * @param response Response message to resolve
   */
  private handleResponseMessage = (response: WebSocketResponse<unknown>) => {
    const { requesterId, senderId, requestId } = response;
    if (this.connectorInfo.clientId !== requesterId)
      throw new Error(
        `Received response from responder senderId ${senderId} with wrong requesterId ${requesterId}!`,
      );

    const liveRequest = this.requests.get(requestId);
    if (!liveRequest)
      throw new Error(
        `Received response from responder senderId ${senderId} for nonexistent requestId ${requestId}`,
      );

    // Remove the request from the requests because it is receiving a response
    this.requests.delete(requestId);

    // Run the request's response function with the response
    liveRequest.resolve(response);
  };

  /**
   * Function that handles incoming webSocket messages and locally sent messages of type Request.
   * Runs the requestHandler provided in connect() and sends a message with the response
   * @param requestMessage request message to handle
   * @param isIncoming whether this message is coming from the server and we should definitely handle it locally
   *   or if it is a locally sent request and we should send to the server if we don't have a local handler
   */
  private handleRequestMessage = async (
    requestMessage: WebSocketRequest<unknown>,
    isIncoming: boolean,
  ) => {
    if (!this.requestRouter)
      throw new Error(
        `Received a request but cannot route it without a requestRouter`,
      );

    // Figure out if we can handle this request or if we need to send it
    // We should handle it here if it came from the server (which means the server thinks we have a handler for it)
    // or if we actually have a handler for it. Otherwise send the request to the server
    if (
      isIncoming ||
      this.connectorInfo.clientId ===
        this.requestRouter(requestMessage.requestType)
    ) {
      // This request is ours. Handle the request
      if (!this.localRequestHandler)
        throw Error('Handling request without a requestHandler!');

      // Run the request handler for this request
      const response = await this.localRequestHandler(
        requestMessage.requestType,
        requestMessage,
      );

      // Send the response to this request
      this.sendMessage({
        type: MessageType.Response,
        requestType: requestMessage.requestType,
        ...response,
      });
    } else {
      // This request is for someone else. Send the request to the server to handle/forward
      this.sendMessage(requestMessage);
    }
  };

  /**
   * Function that handles incoming webSocket messages of type Event.
   * Runs the eventHandler provided in connect()
   * @param eventMessage event message to handle
   */
  private handleEventMessage = (eventMessage: WebSocketEvent<unknown>) => {
    if (!this.localEventHandler)
      throw new Error(
        `Received an event but cannot handle it without an eventHandler`,
      );

    this.localEventHandler(eventMessage.eventType, eventMessage);
  };

  // #endregion
}
