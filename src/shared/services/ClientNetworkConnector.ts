import {
  CONNECTOR_INFO_DISCONNECTED,
  InternalRequest,
  InternalRequestHandler,
  InternalResponse,
  NetworkConnectorInfo,
} from '@shared/data/InternalConnectionTypes';
import { Unsubscriber } from '@shared/util/PapiUtil';
import INetworkConnector from '@shared/services/INetworkConnector';

/** Websocket message type that indicates how to handle it */
enum MessageType {
  InitClient = 'initClient',
  ClientConnect = 'clientConnect',
  Request = 'request',
  Response = 'response',
}

/** Message sent to the client to give it NetworkConnectorInfo */
type InitClient = {
  type: MessageType.InitClient;
  connectorInfo: NetworkConnectorInfo;
};

/** Message responding to the server to let it know this connection is ready to receive messages */
type ClientConnect = {
  type: MessageType.ClientConnect;
  connectorInfo: NetworkConnectorInfo;
};

/** Request to do something and to respond */
type WebsocketRequest<TParam = unknown> = {
  type: MessageType.Request;
  /** What kind of request this is. Certain command, event, etc */
  requestType: string;
} & InternalRequest<TParam>;

/** Response to a request */
type WebsocketResponse<TReturn = unknown> = {
  type: MessageType.Response;
  /** What kind of request this is. Certain command, event, etc */
  requestType: string;
} & InternalResponse<TReturn>;

/** Messages send by the WebSocket */
export type Message =
  | InitClient
  | ClientConnect
  | WebsocketRequest
  | WebsocketResponse;

// TODO: implement request timeout logic
/** Holds promises for a request */
type LiveRequest<TReturn> = {
  requestId: number;
  resolve: (
    value: InternalResponse<TReturn> | PromiseLike<InternalResponse<TReturn>>,
  ) => void;
  reject: (reason?: unknown) => void;
};

/**
 * Handles the connection from the client to the server
 */
export default class ClientNetworkConnector implements INetworkConnector {
  connectorInfo: NetworkConnectorInfo = CONNECTOR_INFO_DISCONNECTED;

  connecting = false;

  connected = false;

  /** The websocket connected to the server */
  private websocket: WebSocket | undefined;

  /** All message subscriptions - arrays of functions that run each time a message with a specific message type comes in */
  private messageSubscriptions = new Map<
    MessageType,
    ((eventData: Message) => void)[]
  >();

  /** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
  private connectPromise?: Promise<NetworkConnectorInfo>;

  /** Function that removes this initClient handler from the connection */
  private unsubscribeHandleInitClientMessage?: () => boolean;

  /** Function that removes this response handler from the connection */
  private unsubscribeHandleResponseMessage?: () => boolean;

  /** Function that removes this handleRequest from the connection */
  private unsubscribeHandleRequestMessage?: () => boolean;

  /** All requests that are waiting for a response */
  // Disabled no-explicit-any because assigning a request with generic type to LiveRequest<unknown> gave error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private requests = new Map<number, LiveRequest<any>>();

  /**
   * Send a message to the server via websocket. Throws if not connected
   * @param message message to send
   */
  // Add if needed: @param unsafe whether to get the client even if we aren't connected. WARNING: SETTING THIS FLAG MEANS NOT CHECKING FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. There may be no clientId
  private sendMessage(message: Message): void {
    // TODO: add message queueing
    if (!this.connected || !this.websocket)
      throw new Error(
        `Trying to send message when not connected! Message ${message}`,
      );

    this.websocket.send(JSON.stringify(message));
  }

  /**
   * Receives and appropriately publishes server websocket messages
   * @param event websocket message information
   */
  private onMessage(event: MessageEvent<string>) {
    const data = JSON.parse(event.data) as Message;

    const callbacks = this.messageSubscriptions.get(data.type);
    if (callbacks) callbacks.forEach((callback) => callback(data));
  }

  /**
   * Unsubscribes a function from running on websocket messages
   * @param messageType the type of message from which to unsubscribe the function
   * @param callback function to unsubscribe from being run on websocket messages.
   * @returns true if successfully unsubscribed
   * Likely will never need to be exported from this file. Just use subscribe, which returns a matching unsubscriber function that runs this.
   */
  private unsubscribe(
    messageType: MessageType,
    callback: (eventData: Message) => void,
  ): boolean {
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
  }

  /**
   * Subscribes a function to run on websocket messages of a particular type
   * @param messageType the type of message on which to subscribe the function
   * @param callback function to run with the contents of the websocket message
   * @returns unsubscriber function to run to stop calling the passed-in function on websocket messages
   */
  private subscribe(
    messageType: MessageType,
    // Any is here because I dunno how to narrow Message type to a specific message type in parameters of a function
    // TODO: investigate this further another time
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (eventData: Message | any) => void,
  ): Unsubscriber {
    let callbacks = this.messageSubscriptions.get(messageType);
    if (!callbacks) {
      callbacks = [];
      this.messageSubscriptions.set(messageType, callbacks);
    }
    callbacks.push(callback);

    return () => this.unsubscribe(messageType, callback);
  }

  /**
   * Function to call when we receive a request.
   * Handles requests from the connection and returns a response to send back
   */
  private requestHandler?: InternalRequestHandler;

  async connect(requestHandler: InternalRequestHandler) {
    // NOTE: This does not protect against sending two different request handlers. See ConnectionService for that
    // We don't need to run this more than once
    if (this.connectPromise) return this.connectPromise;

    this.connecting = true;
    this.requestHandler = requestHandler;

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

        if (!this.websocket) {
          rejectConnect('websocket is gone!');
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
          this.handleRequestMessage,
        );

        // Finished setting up WebSocketService and connecting! Resolve the promise
        this.connected = true;
        resolveConnect(this.connectorInfo);
      },
    );

    this.websocket = new WebSocket('ws://localhost:5122/ws ???');
    this.websocket.addEventListener('message', this.onMessage);
    this.websocket.addEventListener('close', this.disconnect);

    return this.connectPromise;
  }

  /**
   * Function that handles websocket messages of type Response.
   * Resolves the request associated with the received response message
   * @param response Response message to resolve
   */
  private handleResponseMessage(response: WebsocketResponse<unknown>) {
    const { senderId, responderId, requestId } = response;
    if (this.connectorInfo.clientId !== senderId)
      throw new Error(
        `Received response from responderId ${responderId} with wrong senderId ${senderId}!`,
      );

    const liveRequest = this.requests.get(requestId);
    if (!liveRequest)
      throw new Error(
        `Received response from responderId ${responderId} for nonexistent requestId ${requestId}`,
      );

    // Remove the request from the requests because it is receiving a response
    this.requests.delete(requestId);

    // Run the request's response function with the response
    liveRequest.resolve(response);
  }

  /**
   * Function that handles websocket messages of type Request.
   * Runs the requestHandler provided in connect() and sends a message with the response
   * @param requestMessage request message to handle
   */
  private async handleRequestMessage(
    requestMessage: WebsocketRequest<unknown>,
  ) {
    if (!this.requestHandler)
      throw Error('Handling request without a requestHandler!');
    // Run the request handler for this request
    const response = await this.requestHandler(
      requestMessage.requestType,
      requestMessage,
    );

    // Send the response to this request
    this.sendMessage({
      type: MessageType.Response,
      requestType: requestMessage.requestType,
      ...response,
    });
  }

  async notifyClientConnected() {
    this.sendMessage({
      type: MessageType.ClientConnect,
      connectorInfo: this.connectorInfo,
    });
    // In websocket land, we do not receive a response from the server when we notify client connected
    // TODO: change the clientconnected into a request that resolves properly
    return Promise.resolve();
  }

  disconnect() {
    if (!this.connected)
      throw new Error('Web socket closed without connecting');

    this.connecting = false;
    this.requestHandler = undefined;
    this.connected = false;
    this.connectPromise = undefined;
    this.connectorInfo = CONNECTOR_INFO_DISCONNECTED;
    if (this.unsubscribeHandleInitClientMessage)
      this.unsubscribeHandleInitClientMessage();
    if (this.unsubscribeHandleResponseMessage)
      this.unsubscribeHandleResponseMessage();
    if (this.unsubscribeHandleRequestMessage)
      this.unsubscribeHandleRequestMessage();
  }

  /**
   * Send a request to the server and resolve after receiving a response
   * @param requestType the type of request
   * @param contents contents to send in the request
   * @returns promise that resolves with the response message
   */
  async request<TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ): Promise<InternalResponse<TReturn>> {
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
    this.sendMessage({
      type: MessageType.Request,
      requestType,
      ...request,
    });

    return requestPromise;
  }
}
