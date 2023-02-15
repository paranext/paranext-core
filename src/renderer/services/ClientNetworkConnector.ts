import {
  ConnectionStatus,
  CONNECTOR_INFO_DISCONNECTED,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';
import { Unsubscriber } from '@shared/util/PapiUtil';
import INetworkConnector from '@shared/services/INetworkConnector';
import {
  InitClient,
  Message,
  MessageType,
  WebSocketRequest,
  WebSocketResponse,
  WEBSOCKET_PORT,
} from '@shared/data/NetworkConnectorTypes';

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
  private webSocket?: WebSocket;

  /** All message subscriptions - arrays of functions that run each time a message with a specific message type comes in */
  private messageSubscriptions = new Map<
    MessageType,
    ((eventData: Message) => void)[]
  >();

  /** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
  private connectPromise?: Promise<NetworkConnectorInfo>;

  /** Function that removes this initClient handler from the connection */
  private unsubscribeHandleInitClientMessage?: Unsubscriber;

  /** Function that removes this response handler from the connection */
  private unsubscribeHandleResponseMessage?: Unsubscriber;

  /** Function that removes this handleRequest from the connection */
  private unsubscribeHandleRequestMessage?: Unsubscriber;

  /**
   * Function to call when we receive a request that is registered on this connector.
   * Handles requests from the connection and returns a response to send back
   */
  private localRequestHandler?: InternalRequestHandler;

  /**
   * Function to call when we are sending a request.
   * Returns a clientId to which to send the request based on the requestType
   */
  private requestRouter?: (requestType: string) => number;

  /** All requests that are waiting for a response */
  // Disabled no-explicit-any because assigning a request with generic type to LiveRequest<unknown> gave error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private requests = new Map<number, LiveRequest<any>>();

  // #endregion

  // #region INetworkConnector methods

  connect = async (
    localRequestHandler: InternalRequestHandler,
    requestRouter: (requestType: string) => number,
  ) => {
    // NOTE: This does not protect against sending two different request handlers. See ConnectionService for that
    // We don't need to run this more than once
    if (this.connectPromise) return this.connectPromise;

    this.connectionStatus = ConnectionStatus.Connecting;
    this.localRequestHandler = localRequestHandler;
    this.requestRouter = requestRouter;

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
      ({ connectorInfo: newConnectorInfo }: InitClient) => {
        this.connectorInfo = newConnectorInfo;

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

        // Finished setting up WebSocketService and connecting! Resolve the promise
        this.connectionStatus = ConnectionStatus.Connected;
        resolveConnect(this.connectorInfo);
      },
    );

    // Connect the webSocket
    this.webSocket = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);

    // Attach event listeners
    this.webSocket.addEventListener('message', this.onMessage);
    this.webSocket.addEventListener('close', this.disconnect);

    return this.connectPromise;
  };

  notifyClientConnected = async () => {
    this.sendMessage({
      type: MessageType.ClientConnect,
      senderId: this.connectorInfo.clientId,
    });
    // In webSocket land, we do not receive a response from the server when we notify client connected
    // TODO: change the clientconnected into a request that resolves properly
    return Promise.resolve();
  };

  disconnect = () => {
    if (this.connectionStatus !== ConnectionStatus.Connected)
      throw new Error('Web socket closed without connecting');

    this.connectionStatus = ConnectionStatus.Disconnected;
    this.localRequestHandler = undefined;
    this.connectPromise = undefined;
    this.connectorInfo = CONNECTOR_INFO_DISCONNECTED;
    if (this.unsubscribeHandleInitClientMessage)
      this.unsubscribeHandleInitClientMessage();
    if (this.unsubscribeHandleResponseMessage)
      this.unsubscribeHandleResponseMessage();
    if (this.unsubscribeHandleRequestMessage)
      this.unsubscribeHandleRequestMessage();

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

  // #endregion

  // #region private methods

  /**
   * Send a message to the server via webSocket. Throws if not connected
   * @param message message to send
   */
  // Add if needed: @param unsafe whether to get the client even if we aren't connected. WARNING: SETTING THIS FLAG MEANS NOT CHECKING FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. There may be no clientId
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

    const callbacks = this.messageSubscriptions.get(data.type);
    callbacks?.forEach((callback) => callback(data));
  };

  /**
   * Unsubscribes a function from running on webSocket messages
   * @param messageType the type of message from which to unsubscribe the function
   * @param callback function to unsubscribe from being run on webSocket messages.
   * @returns true if successfully unsubscribed
   * Likely will never need to be exported from this file. Just use subscribe, which returns a matching unsubscriber function that runs this.
   */
  private unsubscribe = (
    messageType: MessageType,
    callback: (eventData: Message) => void,
  ): boolean => {
    const callbacks = this.messageSubscriptions.get(messageType);

    if (!callbacks) return false; // Did not find any callbacks for the message type

    const callbackIndex = callbacks.indexOf(callback);
    if (callbackIndex < 0) return false; // Did not find this callback for the message type

    // Remove the callback
    callbacks.splice(callbackIndex, 1);

    // Remove the map entry if there are no more callbacks
    if (callbacks.length === 0) this.messageSubscriptions.delete(messageType);

    // Indicate successfully removed the callback
    return true;
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
    let callbacks = this.messageSubscriptions.get(messageType);
    if (!callbacks) {
      callbacks = [];
      this.messageSubscriptions.set(messageType, callbacks);
    }
    callbacks.push(callback);

    return () => this.unsubscribe(messageType, callback);
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

  // #endregion
}
