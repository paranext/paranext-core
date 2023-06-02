/// <reference types="node" />
declare module 'shared/global-this.model' {
  import { FunctionComponent } from 'react';
  /**
   * Variables that are defined in global scope. These must be defined in main.ts (main), index.ts (renderer), and extension-host.ts (extension host)
   */
  global {
    /** Type of process this is. Helps with running specific code based on which process you're in */
    var processType: ProcessType;
    /** Whether this process is packaged or running from sources */
    var isPackaged: boolean;
    /** Path to the app's resources directory. This is a string representation of the resources uri on frontend */
    var resourcesPath: string;
    /**
     * A function that each React WebView extension must provide for Paranext to display it.
     * Only used in WebView iframes
     */
    var webViewComponent: FunctionComponent;
  }
  /** Type of Paranext process */
  export enum ProcessType {
    Main = 'main',
    Renderer = 'renderer',
    ExtensionHost = 'extension-host',
  }
}
declare module 'shared/utils/util' {
  export function newGuid(): string;
  /**
   * Create a nonce that is at least 128 bits long and should be (is not currently) cryptographically random.
   * See nonce spec at https://w3c.github.io/webappsec-csp/#security-nonces
   *
   * WARNING: THIS IS NOT CURRENTLY CRYPTOGRAPHICALLY SECURE!
   * TODO: Make this cryptographically random! Use some polymorphic library that works in all contexts?
   * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues only works in browser
   */
  export function newNonce(): string;
  /**
   * Determine whether the object is a string
   * @param o object to determine if it is a string
   * @returns true if the object is a string; false otherwise
   */
  export function isString(o: unknown): o is string;
  /**
   * Get a function that reduces calls to the function passed in
   * @param fn The function to debounce
   * @param delay How much delay in milliseconds after the most recent call to the debounced function to call the function
   * @returns function that, when called, only calls the function passed in at maximum every delay ms
   */
  export function debounce<T extends (...args: any[]) => void>(fn: T, delay?: number): T;
  /**
   * Groups each item in the array of items into a map according to the keySelector
   * @param items array of items to group by
   * @param keySelector function to run on each item to get the key for the group to which it belongs
   * @param valueSelector function to run on each item to get the value it should have in the group (like map function). If not provided, uses the item itself
   * @returns map of keys to groups of values corresponding to each item
   */
  export function groupBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, Array<T>>;
  export function groupBy<T, K, V>(
    items: T[],
    keySelector: (item: T) => K,
    valueSelector: (item: T) => V,
  ): Map<K, Array<V>>;
  /**
   * Function to get an error message from the object (useful for getting error message in a catch block)
   * @param error error object whose message to get
   * @returns message of the error - if object has message, returns message. Otherwise tries to stringify
   * @example
   *  try {...}
   *  catch (e) { logger.info(getErrorMessage(e)) }
   */
  export function getErrorMessage(error: unknown): string;
  /**
   * Asynchronously waits for the specified number of milliseconds.
   * (wraps setTimeout in a promise)
   */
  export function wait(ms: number): Promise<void>;
  /**
   * Runs the specified function and will timeout if it takes longer than the specified wait time
   * @param fn The function to run
   * @param maxWaitTimeInMS The maximum amount of time to wait for the function to resolve
   * @returns Promise that resolves to the resolved value of the function or null if it
   * ran longer than the specified wait time
   */
  export function waitForDuration<TResult>(
    fn: () => Promise<TResult>,
    maxWaitTimeInMS: number,
  ): Promise<Awaited<TResult> | null>;
}
declare module 'shared/utils/papi-util' {
  import { ProcessType } from 'shared/global-this.model';
  /** Function to run to dispose of something. Returns true if successfully unsubscribed */
  export type Unsubscriber = () => boolean;
  /**
   * Returns an Unsubscriber function that combines all the unsubscribers passed in.
   * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
   * @returns function that unsubscribes from all passed in unsubscribers when run
   */
  export const aggregateUnsubscribers: (unsubscribers: Unsubscriber[]) => Unsubscriber;
  /** Function to run to dispose of something that runs asynchronously. The promise resolves to true if successfully unsubscribed */
  export type UnsubscriberAsync = () => Promise<boolean>;
  /**
   * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
   * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
   * @returns function that unsubscribes from all passed in unsubscribers when run
   */
  export const aggregateUnsubscriberAsyncs: (
    unsubscribers: UnsubscriberAsync[],
  ) => UnsubscriberAsync;
  /**
   * Creates a safe version of a register function that returns a Promise<UnsubscriberAsync>.
   * @param unsafeRegisterFn function that does some kind of async registration and returns an unsubscriber and a promise that resolves when the registration is finished
   * @param isInitialized whether the service associated with this safe UnsubscriberAsync function is initialized
   * @param initialize promise that resolves when the service is finished initializing
   * @returns safe version of an unsafe function that returns a promise to an UnsubscriberAsync (meaning it will wait to register until the service is initialized)
   */
  export const createSafeRegisterFn: <TParam extends unknown[]>(
    unsafeRegisterFn: (...args: TParam) => Promise<UnsubscriberAsync>,
    isInitialized: boolean,
    initialize: () => Promise<void>,
  ) => (...args: TParam) => Promise<UnsubscriberAsync>;
  /**
   * Type of object passed to a complex request handler that provides information about the request.
   * This type is used as the public-facing interface for requests
   */
  export type ComplexRequest<TParam = unknown> = {
    contents: TParam;
  };
  type ComplexResponseSuccess<TReturn = unknown> = {
    /** Whether the handler that created this response was successful in handling the request */
    success: true;
    /** Content with which to respond to the request. Must be provided unless the response failed or TReturn is undefined */
    contents: TReturn;
  };
  type ComplexResponseFailure = {
    /** Whether the handler that created this response was successful in handling the request */
    success: false;
    /**
     * Content with which to respond to the request. Must be provided unless the response failed or TReturn is undefined
     * Removed from failure so we do not change the type of contents for type safety. We could add errorContents one day if we really need it
     */
    /** Error explaining the problem that is only populated if success is false */
    errorMessage: string;
  };
  /**
   * Type of object to create when handling a complex request where you desire to provide additional information beyond the contents of the response
   * This type is used as the public-facing interface for responses
   */
  export type ComplexResponse<TReturn = unknown> =
    | ComplexResponseSuccess<TReturn>
    | ComplexResponseFailure;
  /** Type of request handler - indicates what type of parameters and what return type the handler has */
  export enum RequestHandlerType {
    Args = 'args',
    Contents = 'contents',
    Complex = 'complex',
  }
  /**
   * Handler function for a command. Called when a command is executed.
   * The function should accept the command's parameters as its parameters.
   * The function should return a promise that resolves with the "return" value of the command.
   */
  export type CommandHandler<TParam extends Array<unknown> = any[], TReturn = any> = (
    ...args: TParam
  ) => Promise<TReturn> | TReturn;
  /** Check that two objects are deeply equal, comparing members of each object and such */
  export function deepEqual(a: unknown, b: unknown): boolean;
  /** Information about a request that tells us what to do with it */
  export type RequestType = {
    /** the general category of request */
    category: string;
    /** specific identifier for this type of request */
    directive: string;
  };
  /**
   * Create a request message requestType string from a category and a directive
   * @param category the general category of request
   * @param directive specific identifier for this type of request
   * @returns full requestType for use in network calls
   */
  export function serializeRequestType(category: string, directive: string): string;
  /** Split a request message requestType string into its parts */
  export function deserializeRequestType(requestType: string): RequestType;
  /**
   * HTML Encodes the provided string.
   * Thanks to ChatGPT
   * @param str string to HTML encode
   * @returns HTML-encoded string
   */
  export const htmlEncode: (str: string) => string;
  /**
   * Modules that someone might try to require in their extensions that we have similar apis for.
   * When an extension requires these modules, an error throws that lets them know about our similar api.
   */
  export const MODULE_SIMILAR_APIS: Readonly<{
    [moduleName: string]:
      | string
      | {
          [process in ProcessType | 'default']?: string;
        }
      | undefined;
  }>;
  /**
   * Get a message that says the module import was rejected and to try a similar api if available.
   * @param moduleName name of `require`d module that was rejected
   * @returns string that says the import was rejected and a similar api to try
   */
  export function getModuleSimilarApiMessage(moduleName: string): string;
}
declare module 'shared/data/internal-connection.model' {
  /**
   * Types that are internal to the communication we do through WebSocket.
   * These types should not need to be used outside of NetworkConnectors and ConnectionService.ts
   */
  import { ComplexRequest, ComplexResponse } from 'shared/utils/papi-util';
  /** Represents when the client id has not been assigned by the server */
  export const CLIENT_ID_UNASSIGNED = -1;
  /** "Client id" for the server */
  export const CLIENT_ID_SERVER = 0;
  /** Represents when the connector info has not been populated by the server */
  export const CONNECTOR_INFO_DISCONNECTED: Readonly<{
    clientId: -1;
  }>;
  /** Information about the network connector */
  export type NetworkConnectorInfo = Readonly<{
    clientId: number;
  }>;
  /** Event emitted when client connections are established */
  export type ClientConnectEvent = {
    clientId: number;
    didReconnect: boolean;
  };
  /** Event emitted when client connections are lost */
  export type ClientDisconnectEvent = {
    clientId: number;
  };
  /**
   * Functions that run when network connector events occur.
   * These should likely be emit functions from NetworkEventEmitters so the events inform all interested connections
   */
  export type NetworkConnectorEventHandlers = {
    /** Handles when a new connection is established */
    didClientConnectHandler?: (event: ClientConnectEvent) => void;
    /** Handles when a client disconnects */
    didClientDisconnectHandler?: (event: ClientDisconnectEvent) => void;
  };
  /** Whether this connector is setting up or has finished setting up its connection and is ready to communicate on the network */
  export enum ConnectionStatus {
    /** This connector is not connected to the network */
    Disconnected = 0,
    /** This connector is attempting to connect to the network and retrieve connectorInfo */
    Connecting = 1,
    /** This connector has finished setting up its connection - has connectorInfo and such */
    Connected = 2,
  }
  /** Request to do something and to respond */
  export type InternalRequest<TParam = unknown> = {
    senderId: number;
    requestId: number;
  } & ComplexRequest<TParam>;
  /** Response to a request */
  export type InternalResponse<TReturn = unknown> = {
    /** The process that sent this Response */
    senderId: number;
    requestId: number;
    /** The process that originally sent the Request that matches to this response */
    requesterId: number;
  } & ComplexResponse<TReturn>;
  /** Handler for requests from the server. Used internally between network connector and Connection Service */
  export type InternalRequestHandler = <TParam, TReturn>(
    requestType: string,
    request: InternalRequest<TParam>,
  ) => Promise<InternalResponse<TReturn>>;
  /** Handler for requests from the server */
  export type RequestHandler = <TParam, TReturn>(
    requestType: string,
    request: ComplexRequest<TParam>,
  ) => Promise<ComplexResponse<TReturn>>;
  /** Function that returns a clientId to which to send the request based on the requestType */
  export type RequestRouter = (requestType: string) => number;
  /** Event to be sent out throughout all processes */
  export type InternalEvent<T> = {
    /** The process that emitted this Event */
    senderId: number;
    /** Contents of the event */
    event: T;
  };
  /** Handler for events from on the network. Used internally between network connector and Connection Service */
  export type InternalNetworkEventHandler = <T>(
    eventType: string,
    incomingEvent: InternalEvent<T>,
  ) => void;
  /** Handler for events from on the network */
  export type NetworkEventHandler = <T>(eventType: string, event: T) => void;
}
declare module 'shared/services/network-connector.interface' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequestHandler,
    NetworkConnectorEventHandlers,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  /**
   * Interface that defines the network connection functionality the server and the client must implement.
   * Used by NetworkConnectorFactory to supply the right kind of NetworkConnector to ConnectionService
   */
  export default interface INetworkConnector {
    /** Information about the connector. Populated by the server while connecting */
    connectorInfo: NetworkConnectorInfo;
    /** Whether this connector is setting up or has finished setting up its connection and is ready to communicate on the network */
    connectionStatus: ConnectionStatus;
    /**
     * Sets up the NetworkConnector by populating connector info, setting up event handlers, and doing one of the following:
     * - On Client: connecting to the server.
     * - On Server: opening an endpoint for clients to connect.
     * MUST ALSO RUN notifyClientConnected() WHEN PROMISE RESOLVES
     * @param localRequestHandler function that handles requests from the connection. Only called when this connector can handle the request
     * @param requestRouter function that returns a clientId to which to send the request based on the requestType. If requestRouter returns this connector's clientId, localRequestHandler is used
     * @param localEventHandler function that handles events from the server by accepting an eventType and an event and emitting the event locally
     * @param networkConnectorEventHandlers functions that run when network connector events occur like when clients are disconnected
     * @returns Promise that resolves with connector info when finished connecting
     */
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
      networkConnectorEventHandlers: NetworkConnectorEventHandlers,
    ) => Promise<NetworkConnectorInfo>;
    /**
     * Notify the server that this client has received its connectorInfo and is ready to go.
     * MUST RUN AFTER connect() WHEN ITS PROMISE RESOLVES
     * TODO: Is this necessary?
     */
    notifyClientConnected: () => Promise<void>;
    /**
     * Disconnects from the connection:
     * - On Client: disconnects from the server
     * - On Server: disconnects from clients and closes its connection endpoint
     */
    disconnect: () => void;
    /**
     * Send a request to the server/a client and resolve after receiving a response
     * @param requestType the type of request
     * @param contents contents to send in the request
     * @returns promise that resolves with the response message
     */
    request: InternalRequestHandler;
    /**
     * Sends an event to other processes. Does NOT run the local event subscriptions
     * as they should be run by NetworkEventEmitter after sending on network.
     * @param eventType unique network event type for coordinating between processes
     * @param event event to emit on the network
     */
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
  }
}
declare module 'shared/utils/internal-util' {
  /**
   * Utility functions specific to the internal technologies we are using.
   */
  import { ProcessType } from 'shared/global-this.model';
  /**
   * Determine if running on a client process (renderer, extension-host) or on the server.
   * @returns Returns true if running on a client, false otherwise
   */
  export const isClient: () => boolean;
  /**
   * Determine if running on the server process (main)
   * @returns Returns true if running on the server, false otherwise
   */
  export const isServer: () => boolean;
  /**
   * Determine if running on the renderer process
   * @returns Returns true if running on the renderer, false otherwise
   */
  export const isRenderer: () => boolean;
  /**
   * Determine if running on the extension host
   * @returns Returns true if running on the extension host, false otherwise
   */
  export const isExtensionHost: () => boolean;
  /**
   * Gets which kind of process this is (main, renderer, extension-host)
   * @returns ProcessType for this process
   */
  export const getProcessType: () => ProcessType;
}
declare module 'shared/data/network-connector.model' {
  /**
   * Types that are relevant particularly to the implementation of communication on NetworkConnector.ts files
   * Do not use these types outside of ClientNetworkConnector.ts and ServerNetworkConnector.ts
   */
  import {
    InternalEvent,
    InternalRequest,
    InternalResponse,
    NetworkConnectorInfo,
  } from 'shared/data/internal-connection.model';
  /** Port to use for the webSocket */
  export const WEBSOCKET_PORT = 8876;
  /** Number of attempts a client will make to connect to the WebSocket server before failing */
  export const WEBSOCKET_ATTEMPTS_MAX = 5;
  /** Time in ms for the client to wait before attempting to connect to the WebSocket server again after a failure */
  export const WEBSOCKET_ATTEMPTS_WAIT = 1000;
  /** WebSocket message type that indicates how to handle it */
  export enum MessageType {
    InitClient = 'init-client',
    ClientConnect = 'client-connect',
    Request = 'request',
    Response = 'response',
    Event = 'event',
  }
  /** Message sent to the client to give it NetworkConnectorInfo */
  export type InitClient = {
    type: MessageType.InitClient;
    senderId: number;
    connectorInfo: NetworkConnectorInfo;
    /** Guid unique to this connection. Used to verify important messages like reconnecting */
    clientGuid: string;
  };
  /** Message responding to the server to let it know this connection is ready to receive messages */
  export type ClientConnect = {
    type: MessageType.ClientConnect;
    senderId: number;
    /** clientGuid for this client the last time it was connected to the server. Used when reconnecting (like if the browser refreshes):
     * if the server has a connection with this clientGuid, it will unregister all requests on that client so the reconnecting client
     * can register its request handlers again.
     */
    reconnectingClientGuid?: string | null;
  };
  /** Request to do something and to respond */
  export type WebSocketRequest<TParam = unknown> = {
    type: MessageType.Request;
    /** What kind of request this is. Certain command, etc */
    requestType: string;
  } & InternalRequest<TParam>;
  /** Response to a request */
  export type WebSocketResponse<TReturn = unknown> = {
    type: MessageType.Response;
    /** What kind of request this is. Certain command, etc */
    requestType: string;
  } & InternalResponse<TReturn>;
  /** Event to be sent out throughout all processes */
  export type WebSocketEvent<T> = {
    type: MessageType.Event;
    /** What kind of event this is */
    eventType: string;
  } & InternalEvent<T>;
  /** Messages send by the WebSocket */
  export type Message =
    | InitClient
    | ClientConnect
    | WebSocketRequest
    | WebSocketResponse
    | WebSocketEvent<unknown>;
}
declare module 'shared/services/logger.service' {
  import log from 'electron-log';
  export const WARN_TAG = '<WARN>';
  /**
   * Format a string of a service message
   * @param message message from the service
   * @param serviceName name of the service to show in the log
   * @param tag optional tag at the end of the service name
   * @returns formatted string of a service message
   */
  export function formatLog(message: string, serviceName: string, tag?: string): string;
  const logger: log.Logger & {
    default: log.Logger;
  };
  export default logger;
}
declare module 'shared/models/papi-event.model' {
  import { Unsubscriber, UnsubscriberAsync } from 'shared/utils/papi-util';
  /** Callback function that accepts an event and should run when an event is emitted */
  export type PapiEventHandler<T> = (event: T) => void;
  /**
   * Function that subscribes the provided callback to run when this event is emitted.
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  export type PapiEvent<T> = (callback: PapiEventHandler<T>) => Unsubscriber;
  /**
   * A PapiEvent that subscribes asynchronously and resolves an asynchronous unsubscriber.
   *
   * Note: The callback itself is not asynchronous.
   */
  export type PapiEventAsync<T> = (callback: PapiEventHandler<T>) => Promise<UnsubscriberAsync>;
}
declare module 'shared/models/papi-event-emitter.model' {
  /**
   * Interfaces, classes, and functions related to events and event emitters
   */
  import { PapiEvent } from 'shared/models/papi-event.model';
  /**
   * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the event is emitted
   * Use eventEmitter.event(callback) to subscribe to the event.
   * Use eventEmitter.emit(event) to run the subscriptions.
   * Generally, this EventEmitter should be private, and its event should be public. That way, the emitter is not publicized,
   * but anyone can subscribe to the event.
   */
  export default class PapiEventEmitter<T> {
    /**
     * Subscribes a function to run when this event is emitted.
     * @alias event
     * @param callback function to run with the event when it is emitted
     * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
     */
    subscribe: PapiEvent<T>;
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    private subscriptions?;
    /** Event for listeners to subscribe to. Lazy loaded */
    private lazyEvent?;
    /** Whether this emitter has been disposed */
    private isDisposed;
    /**
     * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
     * Use like `const unsubscriber = event(callback)`
     * @param callback function to run with the event when it is emitted
     * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
     */
    get event(): PapiEvent<T>;
    /** Disposes of this event, preparing it to release from memory */
    dispose: () => void;
    /**
     * Runs the subscriptions for the event
     * @param event event data to provide to subscribed callbacks
     */
    emit: (event: T) => void;
    /**
     * Function that runs the subscriptions for the event.
     * Added here so children can override emit and still call the base functionality.
     * See NetworkEventEmitter.emit for example
     */
    protected emitFn(event: T): void;
    /** Check to make sure this emitter is not disposed. Throw if it is */
    protected assertNotDisposed(): void;
    /**
     * Disposes of this event, preparing it to release from memory.
     * Added here so children can override emit and still call the base functionality.
     */
    protected disposeFn(): void;
  }
}
declare module 'client/services/web-socket.interface' {
  /**
   * Interface that defines the webSocket functionality the extension host and the renderer must implement.
   * Used by WebSocketFactory to supply the right kind of WebSocket to ClientNetworkConnector.
   * For now, we are just using the browser WebSocket type. We may need specific functionality that don't
   * line up between the ws library's implementation and the browser implementation. We can adjust as needed at that point.
   */
  export type IWebSocket = WebSocket;
}
declare module 'renderer/services/renderer-web-socket.model' {
  /**
   * The renderer's implementation of WebSocket is the browser-supplied WebSocket, which doesn't work in Node
   */
  export default WebSocket;
}
declare module 'extension-host/services/extension-host-web-socket.model' {
  import ws from 'ws';
  /**
   * extension-host client uses ws as its WebSocket client, but the renderer can't use it. So we need to exclude it from the renderer webpack bundle like this.
   */
  export default ws;
}
declare module 'client/services/web-socket.factory' {
  import { IWebSocket } from 'client/services/web-socket.interface';
  /**
   * Creates a WebSocket for the renderer or extension host depending on where you're running
   * @returns WebSocket
   */
  export const createWebSocket: (url: string) => Promise<IWebSocket>;
}
declare module 'client/services/client-network-connector.service' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequest,
    InternalRequestHandler,
    InternalResponse,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import INetworkConnector from 'shared/services/network-connector.interface';
  /**
   * Handles the connection from the client to the server
   */
  export default class ClientNetworkConnector implements INetworkConnector {
    connectorInfo: NetworkConnectorInfo;
    connectionStatus: ConnectionStatus;
    /** The webSocket connected to the server */
    private webSocket?;
    /** All message subscriptions - emitters that emit an event each time a message with a specific message type comes in */
    private messageEmitters;
    /** Promise that resolves when the connection is finished or rejects if disconnected before the connection finishes */
    private connectPromise?;
    /** Function that removes this initClient handler from the connection */
    private unsubscribeHandleInitClientMessage?;
    /** Function that removes this response handler from the connection */
    private unsubscribeHandleResponseMessage?;
    /** Function that removes this handleRequest from the connection */
    private unsubscribeHandleRequestMessage?;
    /** Function that removes this handleEvent from the connection */
    private unsubscribeHandleEventMessage?;
    /**
     * Function to call when we receive a request that is registered on this connector.
     * Handles requests from the connection and returns a response to send back
     */
    private localRequestHandler?;
    /**
     * Function to call when we are sending a request.
     * Returns a clientId to which to send the request based on the requestType
     */
    private requestRouter?;
    /**
     * Function to call when we receive an event.
     * Handles events from the connection by emitting the event locally
     */
    private localEventHandler?;
    /** All requests that are waiting for a response */
    private requests;
    /** Unique Guid associated with this connection. Used to verify certain things with server */
    private clientGuid;
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
    ) => Promise<
      Readonly<{
        clientId: number;
      }>
    >;
    notifyClientConnected: () => Promise<void>;
    disconnect: () => void;
    request: <TParam, TReturn>(
      requestType: string,
      request: InternalRequest<TParam>,
    ) => Promise<InternalResponse<TReturn>>;
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
    /**
     * Send a message to the server via webSocket. Throws if not connected
     * @param message message to send
     */
    private sendMessage;
    /**
     * Receives and appropriately publishes server webSocket messages
     * @param event webSocket message information
     * @param fromSelf whether this message is from this connector instead of from someone else
     */
    private onMessage;
    /**
     * Subscribes a function to run on webSocket messages of a particular type
     * @param messageType the type of message on which to subscribe the function
     * @param callback function to run with the contents of the webSocket message
     * @returns unsubscriber function to run to stop calling the passed-in function on webSocket messages
     */
    private subscribe;
    /**
     * Function that handles webSocket messages of type Response.
     * Resolves the request associated with the received response message
     * @param response Response message to resolve
     */
    private handleResponseMessage;
    /**
     * Function that handles incoming webSocket messages and locally sent messages of type Request.
     * Runs the requestHandler provided in connect() and sends a message with the response
     * @param requestMessage request message to handle
     * @param isIncoming whether this message is coming from the server and we should definitely handle it locally
     *   or if it is a locally sent request and we should send to the server if we don't have a local handler
     */
    private handleRequestMessage;
    /**
     * Function that handles incoming webSocket messages of type Event.
     * Runs the eventHandler provided in connect()
     * @param eventMessage event message to handle
     */
    private handleEventMessage;
  }
}
declare module 'main/services/server-network-connector.service' {
  import {
    ConnectionStatus,
    InternalEvent,
    InternalNetworkEventHandler,
    InternalRequest,
    InternalRequestHandler,
    InternalResponse,
    NetworkConnectorEventHandlers,
    NetworkConnectorInfo,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import INetworkConnector from 'shared/services/network-connector.interface';
  /**
   * Handles the endpoint and connections from the server to the clients
   */
  export default class ServerNetworkConnector implements INetworkConnector {
    connectorInfo: NetworkConnectorInfo;
    connectionStatus: ConnectionStatus;
    /** The webSocket connected to the server */
    private webSocketServer?;
    /** The next client id to use for a new connection. Starts at 1 because the server is 0 */
    private nextClientId;
    /** The webSocket clients that are connected and information about them */
    private clientSockets;
    /** All message subscriptions - emitters that emit an event each time a message with a specific message type comes in */
    private messageEmitters;
    /** Promise that resolves when finished starting the server or rejects if disconnected before the server finishes */
    private connectPromise?;
    /** Function that removes this clientConnect handler from connections */
    private unsubscribeHandleClientConnectMessage?;
    /** Function that removes this response handler from connections */
    private unsubscribeHandleResponseMessage?;
    /** Function that removes this handleRequest from connections */
    private unsubscribeHandleRequestMessage?;
    /** Function that removes this handleEvent from the connection */
    private unsubscribeHandleEventMessage?;
    /**
     * Function to call when we receive a request that is registered on this connector.
     * Handles requests from connections and returns a response to send back
     */
    private localRequestHandler?;
    /**
     * Function to call when we are sending a request.
     * Returns a clientId to which to send the request based on the requestType
     */
    private requestRouter?;
    /**
     * Function to call when we receive an event.
     * Handles events from connections and emits the event locally
     */
    private localEventHandler?;
    /**
     * Functions to run when network connector events occur like when clients are disconnected
     */
    private networkConnectorEventHandlers?;
    /** All requests that are waiting for a response */
    private requests;
    connect: (
      localRequestHandler: InternalRequestHandler,
      requestRouter: RequestRouter,
      localEventHandler: InternalNetworkEventHandler,
      networkConnectorEventHandlers: NetworkConnectorEventHandlers,
    ) => Promise<
      Readonly<{
        clientId: number;
      }>
    >;
    notifyClientConnected: () => Promise<void>;
    disconnect: () => void;
    request: <TParam, TReturn>(
      requestType: string,
      request: InternalRequest<TParam>,
    ) => Promise<InternalResponse<TReturn>>;
    emitEventOnNetwork: <T>(eventType: string, event: InternalEvent<T>) => Promise<void>;
    /** Get the client socket for a certain clientId. Throws if not found */
    private getClientSocket;
    /**
     * Attempts to get the client socket for a certain clientGuid. Returns undefined if not found.
     * This does not throw because it will likely be very common that we do not have a clientId for a certain clientGuid
     * as connecting clients will often supply old clientGuids.
     */
    private getClientSocketFromGuid;
    /** Get the clientId for a certain webSocket. Throws if not found */
    private getClientIdFromSocket;
    /**
     * Send a message to a client via webSocket. Throws if not connected
     * @param message message to send
     * @param recipientId the client to which to send the message. TODO: determine if we can intuit this instead
     */
    private sendMessage;
    /**
     * Receives and appropriately publishes webSocket messages
     * @param event webSocket message information
     * @param fromSelf whether this message is from this connector instead of from someone else
     */
    private onMessage;
    /**
     * Subscribes a function to run on webSocket messages of a particular type
     * @param messageType the type of message on which to subscribe the function
     * @param callback function to run with the contents of the webSocket message
     * @returns unsubscriber function to run to stop calling the passed-in function on webSocket messages
     */
    private subscribe;
    /**
     * Registers an incoming webSocket connection and sends connection info with InitClient.
     * Does not consider the client fully connected yet until they respond and tell us they connected with ClientConnect
     */
    private onClientConnect;
    /** Handles when client connection disconnects. Unregisters and such */
    private onClientDisconnect;
    /** Closes connection and unregisters a client webSocket when it has disconnected */
    private disconnectClient;
    /**
     * Function that handles webSocket messages of type ClientConnect.
     * Mark the connection fully connected and notify that a client connected or reconnected
     * @param clientConnect message from the client about the connection
     * @param connectorId clientId of the client who is sending this ClientConnect message
     */
    private handleClientConnectMessage;
    /**
     * Function that handles webSocket messages of type Response.
     * Resolves the request associated with the received response message or forwards to appropriate client
     * @param response Response message to resolve
     * @param responderId responding client
     */
    private handleResponseMessage;
    /**
     * Function that handles incoming webSocket messages and locally sent messages of type Request.
     * Handles the request and sends a response if we have a handler or forwards to the appropriate client
     * @param requestMessage request to handle
     * @param requesterId who sent this message
     */
    private handleRequestMessage;
    /**
     * Function that handles incoming webSocket messages of type Event.
     * Runs the eventHandler provided in connect() and forwards the event to other clients
     * @param eventMessage event message to handle
     */
    private handleEventMessage;
  }
}
declare module 'shared/services/network-connector.factory' {
  import INetworkConnector from 'shared/services/network-connector.interface';
  /**
   * Creates a NetworkConnector for the client or the server depending on where you're running
   * @returns NetworkConnector
   */
  export const createNetworkConnector: () => Promise<INetworkConnector>;
}
declare module 'shared/services/connection.service' {
  /**
   * Handles setting up a connection to the electron backend and exchanging simple messages.
   * Do not use outside NetworkService.ts. For communication, use NetworkService.ts as it is an abstraction over this.
   */
  import {
    NetworkConnectorEventHandlers,
    NetworkEventHandler,
    RequestHandler,
    RequestRouter,
  } from 'shared/data/internal-connection.model';
  import { ComplexResponse } from 'shared/utils/papi-util';
  /**
   * Send a request to the server and resolve after receiving a response
   * @param requestType the type of request
   * @param contents contents to send in the request
   * @returns promise that resolves with the response message
   */
  export const request: <TParam, TReturn>(
    requestType: string,
    contents: TParam,
  ) => Promise<ComplexResponse<TReturn>>;
  /**
   * Sends an event to other processes. Does NOT run the local event subscriptions
   * as they should be run by NetworkEventEmitter after sending on network.
   * @param eventType unique network event type for coordinating between processes
   * @param event event to emit on the network
   */
  export const emitEventOnNetwork: <T>(eventType: string, event: T) => Promise<void>;
  /** Disconnects from the server */
  export const disconnect: () => void;
  /**
   * Sets up the ConnectionService by connecting to the server and setting up event handlers
   * @param localRequestHandler function that handles requests from the server by accepting a requestType and a ComplexRequest and returning a Promise of a Complex Response
   * @param networkRequestRouter function that determines the appropriate clientId to which to send requests of the given type
   * @param localEventHandler function that handles events from the server by accepting an eventType and an event and emitting the event locally
   * @param connectorEventHandlers functions that run when network connector events occur like when clients are disconnected
   * @returns Promise that resolves when finished connecting
   */
  export const connect: (
    localRequestHandler: RequestHandler,
    networkRequestRouter: RequestRouter,
    localEventHandler: NetworkEventHandler,
    connectorEventHandlers: NetworkConnectorEventHandlers,
  ) => Promise<void>;
  /** Gets this connection's clientId */
  export const getClientId: () => number;
}
declare module 'shared/models/papi-network-event-emitter.model' {
  import { PapiEventHandler } from 'shared/models/papi-event.model';
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  /**
   * Networked version of EventEmitter - accepts subscriptions to an event and runs the subscription callbacks when the event is emitted.
   * Events on NetworkEventEmitters can be emitted across processes. They are coordinated between processes by their type.
   * Use eventEmitter.event(callback) to subscribe to the event.
   * Use eventEmitter.emit(event) to run the subscriptions.
   * Generally, this EventEmitter should be private, and its event should be public. That way, the emitter is not publicized,
   * but anyone can subscribe to the event.
   *
   * WARNING: Do not use this class directly outside of NetworkService, or it will not do what you expect. Use NetworkService.createNetworkEventEmitter.
   *
   * WARNING: You cannot emit events with complex types on the network.
   */
  export default class PapiNetworkEventEmitter<T> extends PapiEventEmitter<T> {
    /** Callback that sends the event to other processes on the network when it is emitted */
    private networkSubscriber;
    /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
    private networkDisposer;
    /**
     * Creates a NetworkEventEmitter
     * @param networkSubscriber callback that accepts the event and emits it to other processes
     * @param networkDisposer callback that unlinks this emitter from the network
     */
    constructor(
      /** Callback that sends the event to other processes on the network when it is emitted */
      networkSubscriber: PapiEventHandler<T>,
      /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
      networkDisposer: () => void,
    );
    emit: (event: T) => void;
    /**
     * Runs only the subscriptions for the event that are on this process. Does not send over network
     * @param event event data to provide to subscribed callbacks
     */
    emitLocal(event: T): void;
    dispose: () => void;
  }
}
declare module 'shared/services/network.service' {
  /**
   * Handles requests, responses, subscriptions, etc. to the backend.
   * Likely shouldn't need/want to expose this whole service on papi,
   * but there are a few things that are exposed via papiNetworkService
   */
  import { ClientConnectEvent, ClientDisconnectEvent } from 'shared/data/internal-connection.model';
  import {
    CommandHandler,
    ComplexRequest,
    ComplexResponse,
    RequestHandlerType,
    UnsubscriberAsync,
  } from 'shared/utils/papi-util';
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  import { PapiEvent } from 'shared/models/papi-event.model';
  /**
   * Args handler function for a request. Called when a request is handled.
   * The function should accept the spread of the contents array of the request as its parameters.
   * The function should return an object that becomes the contents object of the response.
   * This type of handler is a normal function.
   */
  type ArgsRequestHandler<TParam extends Array<unknown> = any[], TReturn = any> = CommandHandler<
    TParam,
    TReturn
  >;
  /**
   * Contents handler function for a request. Called when a request is handled.
   * The function should accept the contents object of the request as its single parameter.
   * The function should return an object that becomes the contents object of the response.
   */
  type ContentsRequestHandler<TParam = any, TReturn = any> = (contents: TParam) => Promise<TReturn>;
  /**
   * Complex handler function for a request. Called when a request is handled.
   * The function should accept a ComplexRequest object as its single parameter.
   * The function should return a ComplexResponse object that becomes the response..
   * This type of handler is the most flexible of the request handlers.
   */
  type ComplexRequestHandler<TParam = any, TReturn = any> = (
    request: ComplexRequest<TParam>,
  ) => Promise<ComplexResponse<TReturn>>;
  /** Event that emits with clientId when a client connects */
  export const onDidClientConnect: PapiEvent<ClientConnectEvent>;
  /** Event that emits with clientId when a client disconnects */
  export const onDidClientDisconnect: PapiEvent<ClientDisconnectEvent>;
  /** Closes the network services gracefully */
  export const shutdown: () => void;
  /** Sets up the NetworkService. Runs only once */
  export const initialize: () => Promise<void>;
  /**
   * Send a request on the network and resolve the response contents.
   * @param requestType the type of request
   * @param args arguments to send in the request (put in request.contents)
   * @returns promise that resolves with the response message
   */
  export const request: <TParam extends unknown[], TReturn>(
    requestType: string,
    ...args: TParam
  ) => Promise<TReturn>;
  /**
   * Register a local request handler to run on requests.
   * @param requestType the type of request on which to register the handler
   * @param handler function to register to run on requests
   * @param handlerType type of handler function - indicates what type of parameters and what return type the handler has
   * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
   */
  export function registerRequestHandler(
    requestType: string,
    handler: ArgsRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  export function registerRequestHandler(
    requestType: string,
    handler: ContentsRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  export function registerRequestHandler(
    requestType: string,
    handler: ComplexRequestHandler,
    handlerType?: RequestHandlerType,
  ): Promise<UnsubscriberAsync>;
  /**
   * Creates an event emitter that works properly over the network.
   * Other connections receive this event when it is emitted.
   *
   * WARNING: You can only create a network event emitter once per eventType to prevent hijacked event emitters.
   *
   * WARNING: You cannot emit events with complex types on the network.
   * @param eventType unique network event type for coordinating between connections
   * @returns event emitter whose event works between connections
   */
  export const createNetworkEventEmitter: <T>(eventType: string) => PapiEventEmitter<T>;
  /**
   * Gets the network event with the specified type. Creates the emitter if it does not exist
   * @param eventType unique network event type for coordinating between connections
   * @returns event for the event type that runs the callback provided when the event is emitted
   */
  export const getNetworkEvent: <T>(eventType: string) => PapiEvent<T>;
  /**
   * Creates a function that is a request function with a baked requestType.
   * This is also nice because you get TypeScript type support using this function.
   * @param requestType requestType for request function
   * @returns function to call with arguments of request that performs the request and resolves with the response contents
   */
  export const createRequestFunction: <TParam extends unknown[], TReturn>(
    requestType: string,
  ) => (...args: TParam) => Promise<TReturn>;
  /** All the exports in this service that are to be exposed on the PAPI */
  export const papiNetworkService: {
    onDidClientConnect: PapiEvent<ClientConnectEvent>;
    onDidClientDisconnect: PapiEvent<ClientDisconnectEvent>;
    createNetworkEventEmitter: <T>(eventType: string) => PapiEventEmitter<T>;
    getNetworkEvent: <T_1>(eventType: string) => PapiEvent<T_1>;
  };
}
declare module 'shared/services/command.service' {
  import { CommandHandler, UnsubscriberAsync } from 'shared/utils/papi-util';
  /**
   * Register a command on the papi to be handled here.
   *
   * WARNING: THIS DOES NOT CHECK FOR INITIALIZATION. DO NOT USE OUTSIDE OF INITIALIZATION. Use registerCommand
   * @param commandName command name to register for handling here
   * @param handler function to run when the command is invoked
   * @returns promise that resolves if the request successfully registered and unsubscriber function to run to stop the passed-in function from handling requests
   */
  export const registerCommandUnsafe: (
    commandName: string,
    handler: CommandHandler,
  ) => Promise<UnsubscriberAsync>;
  /** Sets up the CommandService. Only runs once and always returns the same promise after that */
  export const initialize: () => Promise<void>;
  /**
   * Send a command to the backend.
   */
  export const sendCommand: <TParam extends unknown[], TReturn>(
    commandName: string,
    ...args: TParam
  ) => Promise<TReturn>;
  /**
   * Creates a function that is a command function with a baked commandName.
   * This is also nice because you get TypeScript type support using this function.
   * @param commandName command name for command function
   * @returns function to call with arguments of command that sends the command and resolves with the result of the command
   */
  export const createSendCommandFunction: <TParam extends unknown[], TReturn>(
    commandName: string,
  ) => (...args: TParam) => Promise<TReturn>;
  /**
   * Register a command on the papi to be handled here
   * @param commandName command name to register for handling here
   * @param handler function to run when the command is invoked
   * @returns true if successfully registered, throws with error message if not
   */
  export const registerCommand: (
    commandName: string,
    handler: CommandHandler,
  ) => Promise<UnsubscriberAsync>;
}
declare module 'shared/data/web-view.model' {
  import { ReactNode } from 'react';
  /** Props that are passed to the web view component */
  export type WebViewProps = WebViewContents & Pick<SavedTabInfo, 'id'>;
  /**
   * Serialized information used to recreate a tab.
   *
   * {@link TabLoader} deserializes this into {@link TabInfo}
   */
  export type SavedTabInfo = {
    /**
     * Tab ID - a unique identifier that identifies this tab
     */
    id: string;
    /**
     * Type of tab - indicates what kind of built-in tab this info represents
     */
    tabType: string;
    /**
     * Data needed to deserialize the tab during load
     */
    data?: unknown;
  };
  /**
   * Information that Paranext uses to create a tab in the dock layout.
   *
   * {@link TabLoader} deserialize {@link SavedTabInfo} into this
   */
  export type TabInfo = SavedTabInfo & {
    /**
     * Text to show on the title bar of the tab
     */
    title: string;
    /**
     * Content to show inside the tab.
     */
    content: ReactNode;
    /**
     * (optional) Minimum width that the tab can become
     */
    minWidth?: number;
    /**
     * (optional) Minimum height that the tab can become
     */
    minHeight?: number;
  };
  /**
   * Function that takes a serialized tab and creates a Paranext tab out of it. Each type of tab must
   * provide a TabLoader.
   *
   * For now all tab creators must do their own data type verification
   */
  export type TabLoader = (savedTabInfo: SavedTabInfo) => TabInfo;
  /**
   * Function that takes a Paranext tab and creates a serialized tab out of it. Each type of tab can
   * provide a TabSaver. If they do not provide one, the `SavedTabInfo` properties are stripped from
   * TabInfo before saving.
   */
  export type TabSaver = (tabInfo: TabInfo) => SavedTabInfo;
  export enum WebViewContentType {
    React = 'react',
    HTML = 'html',
  }
  /** Base WebView properties that all WebViews share */
  type WebViewContentsBase = {
    webViewType: string;
    content: string;
    title?: string;
  };
  /** WebView representation using React */
  export type WebViewContentsReact = WebViewContentsBase & {
    contentType?: WebViewContentType.React;
    styles?: string;
  };
  /** WebView representation using HTML */
  export type WebViewContentsHtml = WebViewContentsBase & {
    contentType: WebViewContentType.HTML;
  };
  /** WebView definition created by extensions to show web content */
  export type WebViewContents = WebViewContentsReact | WebViewContentsHtml;
  /** Serialized WebView information that does not contain the content of the WebView */
  export type WebViewContentsSerialized =
    | Omit<WebViewContentsReact, 'content'>
    | Omit<WebViewContentsHtml, 'content'>;
  interface TabLayout {
    type: 'tab';
  }
  export interface FloatLayout {
    type: 'float';
    floatSize?: {
      width: number;
      height: number;
    };
  }
  export type PanelDirection =
    | 'left'
    | 'right'
    | 'bottom'
    | 'top'
    | 'before-tab'
    | 'after-tab'
    | 'maximize'
    | 'move'
    | 'active'
    | 'update';
  interface PanelLayout {
    type: 'panel';
    direction?: PanelDirection;
    /** If undefined, it will add in the `direction` relative to the previously added tab. */
    targetTabId?: string;
  }
  export type Layout = TabLayout | FloatLayout | PanelLayout;
  /** Event emitted when webViews are added */
  export type AddWebViewEvent = {
    webView: WebViewProps;
    layout: Layout;
  };
}
declare module 'shared/services/web-view.service' {
  import {
    AddWebViewEvent,
    Layout,
    SavedTabInfo,
    TabInfo,
    WebViewContents,
  } from 'shared/data/web-view.model';
  /** Event that emits with webView info when a webView is added */
  export const onDidAddWebView: import('shared/models/papi-event.model').PapiEvent<AddWebViewEvent>;
  export function saveTabInfoBase(tabInfo: TabInfo): SavedTabInfo;
  /**
   * Adds a WebView and runs all event handlers who are listening to this event
   * @param webView full html document to set as the webview iframe contents. Can be shortened to just a string
   * @returns promise that resolves nothing if we successfully handled the webView
   */
  export const addWebView: (webView: WebViewContents, layout?: Layout) => Promise<void>;
  /** Sets up the WebViewService. Runs only once */
  export const initialize: () => Promise<void>;
  /** All the exports in this service that are to be exposed on the PAPI */
  export const papiWebViewService: {
    onDidAddWebView: import('shared/models/papi-event.model').PapiEvent<AddWebViewEvent>;
    addWebView: (webView: WebViewContents, layout?: Layout) => Promise<void>;
    initialize: () => Promise<void>;
  };
}
declare module 'shared/services/internet.service' {
  const internetService: {
    fetch: typeof fetch;
  };
  export default internetService;
}
declare module 'shared/utils/async-variable' {
  /**
   * This class provides a convenient way for one task to wait on a variable that another task sets.
   */
  export default class AsyncVariable<T> {
    private readonly variableName;
    private readonly promiseToValue;
    private resolver;
    private rejecter;
    /**
     * Creates an instance of the class
     * @param variableName name to use when logging about this variable
     * @param rejectIfNotSettledWithinMS milliseconds to wait before verifying if the promise was
     * settled (resolved or rejected); will reject if it has not settled by that time.  Use -1 if you
     * do not want a timeout at all.
     */
    constructor(variableName: string, rejectIfNotSettledWithinMS?: number);
    /**
     * Get this variable's promise to a value. This always returns the same promise even after the
     * value has been resolved or rejected.
     * @returns the promise for the value to be set
     */
    get promise(): Promise<T>;
    /**
     * A simple way to see if this variable's promise was resolved or rejected already
     * @returns whether the variable was already resolved or rejected
     */
    get hasSettled(): boolean;
    /**
     * Resolve this variable's promise to the given value
     * @param value this variable's promise will resolve to this value
     * @param throwIfAlreadySettled determines whether to throw if the variable was already resolved or rejected
     */
    resolveToValue(value: T, throwIfAlreadySettled?: boolean): void;
    /**
     * Reject this variable's promise for the value with the given reason
     * @param reason this variable's promise will be rejected with this reason
     * @param throwIfAlreadySettled determines whether to throw if the variable was already resolved or rejected
     */
    rejectWithReason(reason: string, throwIfAlreadySettled?: boolean): void;
    /**
     * Prevent any further updates to this variable
     */
    private complete;
  }
}
declare module 'shared/models/disposal.model' {
  import { PapiEvent } from 'shared/models/papi-event.model';
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  /** Require a `dispose` function */
  export interface Dispose {
    /** Release resources and notify dependent services when tearing down an object */
    dispose: UnsubscriberAsync;
  }
  /** Require an `onDidDispose` event */
  export interface OnDidDispose {
    /** Event that emits when `dispose` is called on an object */
    onDidDispose: PapiEvent<void>;
  }
  /** Indicates than an object cannot have an `onDidDispose` event.
   *  Also allows an object to include a `dispose` function. */
  export interface CannotHaveOnDidDispose {
    /** Release resources and notify dependent services when tearing down an object */
    dispose?: UnsubscriberAsync;
    /** Event that emits when `dispose` is called on an object */
    onDidDispose?: undefined;
  }
  /** Allow onDidDispose to exist on the type if it was previously disallowed by CannotHaveOnDidDispose */
  export type CanHaveOnDidDispose<T extends CannotHaveOnDidDispose> = Omit<T, 'onDidDispose'>;
}
declare module 'shared/services/network-object.service' {
  import {
    NetworkObject,
    DisposableNetworkObject,
    NetworkableObject,
    LocalObjectToProxyCreator,
  } from 'shared/models/network-object.model';
  /**
   * Network objects are distributed objects within PAPI for TS/JS objects.
   * @see https://en.wikipedia.org/wiki/Distributed_object
   *
   * Objects registered via {@link networkObjectService.set} are retrievable using {@link networkObjectService.get}.
   *
   * Function calls made on network objects retrieved via {@link networkObjectService.get} are proxied and
   * sent to the original objects registered via {@link networkObjectService.set}.
   *
   * Functions on a network object will be called asynchronously by other processes regardless of
   * whether the functions are synchronous or asynchronous, so it is best to make them all
   * asynchronous. All shared functions' arguments and return values must be serializable to be
   * called across processes.
   *
   * When a service registers an object via {@link networkObjectService.set}, it is the responsibility of
   * that service, and only that service, to call `dispose` on that object when it is no longer
   * intended to be shared with other services.
   *
   * When an object is disposed by calling `dispose`, all functions registered with the `onDidDispose`
   * event handler will be called. After an object is disposed, calls to its functions will no longer
   * be proxied to the original object.
   */
  const networkObjectService: {
    initialize: () => Promise<void>;
    hasKnown: (id: string) => boolean;
    get: <T extends object>(
      id: string,
      createLocalObjectToProxy?: LocalObjectToProxyCreator<T> | undefined,
    ) => Promise<NetworkObject<T> | undefined>;
    set: <T_1 extends NetworkableObject<object>>(
      id: string,
      objectToShare: T_1,
    ) => Promise<DisposableNetworkObject<T_1>>;
  };
  export default networkObjectService;
}
declare module 'shared/models/network-object.model' {
  import {
    Dispose,
    OnDidDispose,
    CannotHaveOnDidDispose,
    CanHaveOnDidDispose,
  } from 'shared/models/disposal.model';
  /**
   * An object of this type is returned from {@link networkObjectService.get}.
   *
   * Override the NetworkableObject type's force-undefined onDidDispose to NetworkObject's
   * onDidDispose type because it will have an onDidDispose added.
   *
   * @see networkObjectService
   */
  export type NetworkObject<T extends NetworkableObject> = CanHaveOnDidDispose<T> & OnDidDispose;
  /**
   * An object of this type is returned from {@link networkObjectService.set}.
   *
   * @see networkObjectService
   */
  export type DisposableNetworkObject<T extends NetworkableObject> = NetworkObject<T> & Dispose;
  /**
   * An object of this type is passed into {@link networkObjectService.set}.
   *
   * @see networkObjectService
   */
  export type NetworkableObject<T = object> = T & CannotHaveOnDidDispose;
  /**
   * If a network object with the provided ID exists remotely but has not been set up to use inside
   * this process, this function is run in {@link networkObjectService.get}, and the returned object is used
   * as a base on which to set up a NetworkObject for use on this process. All properties that are
   * exposed in the base object will be used as-is, and all other properties will be assumed to exist
   * on the remote network object.
   *
   * @see networkObjectService
   *
   * @param id ID of the network object to get
   *
   * @param networkObjectContainer Holds a reference to the NetworkObject that will be setup within
   * {@link networkObjectService.get}. It is passed in to allow the return value to call functions on
   * the NetworkObject.
   * NOTE: networkObjectContainer.contents does not point to a real NetworkObject while this function
   * is running. The real reference is assigned later, but before the NetworkObject will be used. The
   * return value should always reference the NetworkObject as `networkObjectContainer.contents` to
   * avoid acting upon an undefined NetworkObject.
   *
   * @returns the local object to proxy into a network object.
   *
   * Note: This function should return Partial<T>. For some reason, TypeScript can't infer the type
   * (probably has to do with that it's a wrapped and layered type). Functions that implement this
   * type should return Partial<T>
   */
  export type LocalObjectToProxyCreator<T extends NetworkableObject> = (
    id: string,
    networkObjectPromise: Promise<NetworkObject<T>>,
  ) => Partial<NetworkableObject>;
}
declare module 'shared/models/data-provider.model' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { PapiEventHandler } from 'shared/models/papi-event.model';
  import { NetworkableObject } from 'shared/models/network-object.model';
  /** Various options to adjust how the data provider subscriber emits updates */
  export type DataProviderSubscriberOptions = {
    /**
     * Whether to immediately retrieve the data for this subscriber and run the callback as soon as possible.
     *
     * This allows a subscriber to simply subscribe and provide a callback instead of subscribing, running `get`,
     * and managing the race condition of an event coming in to update the data and the initial `get` coming back in.
     * @default true
     */
    retrieveDataImmediately?: boolean;
    /**
     * Under which conditions to run the callback when we receive updates to the data.
     *  - `'deeply-equal'` - only run the update callback when the data at this selector has changed.
     *
     *    For example, suppose your selector is targeting John 3:5, and the data provider updates its data for Luke 5:3. Your data
     *    at John 3:5 does not change, and your callback will not run.
     *  - `'all'` - run the update callback every time the data has been updated whether or not the data
     *    at this selector has changed.
     *
     *    For example, suppose your selector is targeting John 3:5, and the data provider updates its data for Luke 5:3. Your data
     *    at John 3:5 does not change, but your callback will run again with the same data anyway.
     *
     * @default 'deeply-equal'
     */
    whichUpdates?: 'deeply-equal' | 'all';
  };
  /**
   * Subscribe to receive updates from this data provider that are relevant to the provided selector.
   *
   * Note: By default, this `subscribe` function automatically retrieves the current state of the data
   * and runs the provided callback as soon as possible. That way, if you want to keep your data up-to-date,
   * you do not also have to run `get`. You can turn this functionality off in the `options` parameter.
   * @param selector tells the provider what data this listener is listening for
   * @param callback function to run with the updated data for this selector
   * @param options various options to adjust how the subscriber emits updates
   * @returns unsubscriber to stop listening for updates
   */
  export type DataProviderSubscriber<TSelector, TGetData> = (
    selector: TSelector,
    callback: PapiEventHandler<TGetData>,
    options?: DataProviderSubscriberOptions,
  ) => Promise<UnsubscriberAsync>;
  /**
   * An internal object created locally when someone runs dataProviderService.registerEngine.
   * This object layers over the data provider engine and runs its methods along with other methods.
   * This object is transformed into an IDataProvider by networkObjectService.set.
   *
   * @type `TSelector` - the type of selector used to get some data from this provider.
   *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
   *  Note: A selector must be stringifiable.
   * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
   * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
   *
   * @see IDataProvider
   */
  interface DataProviderInternal<TSelector, TGetData, TSetData> extends NetworkableObject {
    /**
     * Set a subset of data according to the selector.
     *
     * Note: if a data provider engine does not provide `set` (possibly indicating it is read-only), this will throw an exception.
     * @param selector tells the provider what subset of data is being set
     * @param data the data that determines what to set at the selector
     * @returns true if successfully set (will send updates), false otherwise (will not send updates)
     */
    set: (selector: TSelector, data: TSetData) => Promise<boolean>;
    /**
     * Get a subset of data from the provider according to the selector.
     *
     * Note: This is good for retrieving data from a provider once. If you want to keep the data up-to-date,
     * use `subscribe` instead, which can immediately give you the data and keep it up-to-date.
     * @param selector tells the provider what subset of data to get
     * @returns the subset of data represented by the selector
     */
    get: (selector: TSelector) => Promise<TGetData>;
    /**
     * Subscribe to receive updates from this data provider that are relevant to the provided selector.
     *
     * Note: By default, this `subscribe` function automatically retrieves the current state of the data
     * and runs the provided callback as soon as possible. That way, if you want to keep your data up-to-date,
     * you do not also have to run `get`. You can turn this functionality off in the `options` parameter.
     * @param selector tells the provider what data this listener is listening for
     * @param callback function to run with the updated data for this selector
     * @param options various options to adjust how the subscriber emits updates
     * @returns unsubscriber to stop listening for updates
     */
    subscribe: DataProviderSubscriber<TSelector, TGetData>;
  }
  export default DataProviderInternal;
}
declare module 'shared/models/data-provider.interface' {
  import DataProviderInternal from 'shared/models/data-provider.model';
  import {
    DisposableNetworkObject,
    NetworkObject,
    NetworkableObject,
  } from 'shared/models/network-object.model';
  import { CanHaveOnDidDispose } from 'shared/models/disposal.model';
  /**
   * An object on the papi that manages data and has methods for interacting with that data.
   * Created by the papi and layers over an IDataProviderEngine provided by an extension.
   * Returned from getting a data provider with dataProviderService.get.
   * @type `TSelector` - the type of selector used to get some data from this provider.
   *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
   *  Note: A selector must be stringifiable.
   * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
   * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
   */
  interface IDataProvider<TSelector, TGetData, TSetData>
    extends NetworkObject<NetworkableObject>,
      CanHaveOnDidDispose<DataProviderInternal<TSelector, TGetData, TSetData>> {}
  export default IDataProvider;
  /**
   * A data provider that has control over disposing of it with dispose.
   * Returned from registering a data provider (only the service that set it up should dispose of it)
   * with dataProviderService.registerEngine
   *
   * @see IDataProvider
   */
  export interface IDisposableDataProvider<TSelector, TGetData, TSetData>
    extends DisposableNetworkObject<NetworkableObject>,
      Omit<IDataProvider<TSelector, TGetData, TSetData>, 'dispose'> {}
}
declare module 'shared/models/data-provider-engine.model' {
  import { NetworkableObject } from 'shared/models/network-object.model';
  /**
   * The object to register with the DataProviderService to create a data provider.
   * The DataProviderService creates an IDataProvider on the papi that layers over this engine, providing special functionality
   *
   * Note: methods on objects that implement this interface must be unbound functions, not arrow functions.
   * @type `TSelector` - the type of selector used to get some data from this provider.
   *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
   * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
   * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
   */
  interface IDataProviderEngine<TSelector, TGetData, TSetData> extends NetworkableObject {
    /**
     * Method to run to send clients updates outside of the `set` method.
     * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `notifyUpdate` method in the DataProviderEngine.
     *
     * WARNING: Never run this in the `get` method! It will create a destructive infinite loop.
     *
     * @returns true if we should send updates, false otherwise (will not send updates). Same return as `set`
     */
    notifyUpdate?(): boolean;
    /**
     * Set a subset of data according to the selector.
     * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `set` method in the DataProviderEngine.
     *
     * Note: you could consider this data provider to be read-only if this method is not provided.
     *
     * WARNING: Do not run this recursively in its own `set` method! It will create as many updates as you run `set` methods.
     * @param selector tells the provider what subset of data is being set
     * @param data the data that determines what to set at the selector
     * @returns true if successfully set (will send updates), false otherwise (will not send updates)
     */
    set?(selector: TSelector, data: TSetData): Promise<boolean>;
    /**
     * Get a subset of data from the provider according to the selector.
     * Run by the data provider on get
     * @param selector tells the provider what subset of data to get
     * @returns the subset of data represented by the selector
     */
    get(selector: TSelector): Promise<TGetData>;
  }
  export default IDataProviderEngine;
}
declare module 'shared/services/data-provider.service' {
  /**
   * Handles registering data providers and serving data around the papi.
   * Exposed on the papi.
   */
  import IDataProvider, { IDisposableDataProvider } from 'shared/models/data-provider.interface';
  import IDataProviderEngine from 'shared/models/data-provider-engine.model';
  /**
   * Indicate if we are aware of an existing data provider with the given name. If a data provider
   * with the given name is somewhere else on the network, this function won't tell you about it
   * unless something else in the existing process is subscribed to it.
   */
  function hasKnown(providerName: string): boolean;
  /**
   * Creates a data provider to be shared on the network layering over the provided data provider engine.
   * @param providerName name this data provider should be called on the network
   * @param dataProviderEngine the object to layer over with a new data provider object
   *
   * WARNING: registering a dataProviderEngine mutates the provided object.
   * Its `notifyUpdate` and `set` methods are layered over to facilitate data provider subscriptions.
   * @returns information about the data provider including control over disposing of it.
   *  Note that this data provider is a new object distinct from the data provider engine passed in.
   * @type `TSelector` - the type of selector used to get some data from this provider.
   *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
   *  Note: A selector must be stringifiable.
   * @type `TData` - the type of data provided by this data provider based on a provided selector
   */
  function registerEngine<TSelector, TGetData, TSetData>(
    providerName: string,
    dataProviderEngine: IDataProviderEngine<TSelector, TGetData, TSetData>,
  ): Promise<IDisposableDataProvider<TSelector, TGetData, TSetData>>;
  /**
   * Get a data provider that has previously been set up
   * @param providerName Name of the desired data provider
   * @returns The data provider with the given name if one exists, undefined otherwise
   */
  function get<T extends IDataProvider<any, any, any>>(
    providerName: string,
  ): Promise<T | undefined>;
  const dataProviderService: {
    hasKnown: typeof hasKnown;
    registerEngine: typeof registerEngine;
    get: typeof get;
  };
  export default dataProviderService;
}
declare module 'shared/data/file-system.model' {
  /**
   * Types to use with file system operations
   */
  /**
   * Represents a path in file system or other.
   * Has a scheme followed by :// followed by a relative path.
   * If no scheme is provided, the app scheme is used.
   * Available schemes are as follows:
   *  - app:// - goes to the app's data directory (platform-dependent)
   *  - resources:// - goes to the resources directory installed in the app
   */
  export type Uri = string;
}
declare module 'node/utils/util' {
  import { Uri } from 'shared/data/file-system.model';
  export function resolveHtmlPath(htmlFileName: string): string;
  /**
   * Gets the platform-specific user appdata folder for this application
   * Thanks to Luke at https://stackoverflow.com/a/26227660
   */
  export const getAppDir: import('memoize-one').MemoizedFn<() => string>;
  /**
   * Resolves the uri to a path
   * @param uri the uri to resolve
   * @returns real path to the uri supplied
   */
  export function getPathFromUri(uri: Uri): string;
  /**
   * Combines the uri passed in with the paths passed in to make one uri
   * @param uri uri to start from
   * @param paths paths to combine into the uri
   * @returns one uri that combines the uri and the paths in left-to-right order
   */
  export function joinUriPaths(uri: Uri, ...paths: string[]): Uri;
}
declare module 'node/services/node-file-system.service' {
  import { Uri } from 'shared/data/file-system.model';
  /**
   * Reads a text file asynchronously
   * @param uri Uri of file
   * @returns promise that resolves to the contents of the file
   */
  export function readFileText(uri: Uri): Promise<string>;
  /**
   * Reads a binary file asynchronously
   * @param uri Uri of file
   * @returns promise that resolves to the contents of the file
   */
  export function readFileBinary(uri: Uri): Promise<Buffer>;
  /**
   * Writes the string to a file asynchronously
   * @param uri Uri of file
   * @param fileContents string to write into the file
   * @returns promise that resolves after writing the file
   */
  export function writeFileText(uri: Uri, fileContents: string): Promise<void>;
  export function deleteFile(uri: Uri): Promise<void>;
  /** Type of file system item in a directory */
  export enum EntryType {
    File = 'file',
    Directory = 'directory',
    Unknown = 'unknown',
  }
  /** All entries in a directory, mapped from entry type to array of uris for the entries */
  export type DirectoryEntries = Readonly<{
    [entryType in EntryType]: Uri[];
  }>;
  /**
   * Reads a directory and returns lists of entries in the directory by entry type
   * @param uri uri of directory
   * @returns map of entry type to list of uris for each entry in the directory with that type
   */
  export function readDir(uri: Uri): Promise<DirectoryEntries>;
}
declare module 'node/utils/crypto-util' {
  export function createUuid(): string;
  /**
   * Create a cryptographically secure nonce that is at least 128 bits long
   * See nonce spec at https://w3c.github.io/webappsec-csp/#security-nonces
   *
   * @param encoding: "base64url" (HTML safe, shorter string) or "hex" (longer string)
   * From https://base64.guru/standards/base64url, the purpose of this encoding is
   * "the ability to use the encoding result as filename or URL address"
   * @param numberOfBytes: number of bytes the resulting nonce should contain
   * @returns cryptographically secure, pseudo-randomly generated value encoded as a string
   */
  export function createNonce(encoding: 'base64url' | 'hex', numberOfBytes?: number): string;
}
declare module 'node/models/execution-token.model' {
  /** For now this is just for extensions, but maybe we will want to expand this in the future */
  export type ExecutionTokenType = 'extension';
  /** Execution tokens can be passed into API calls to provide context about their identity */
  export class ExecutionToken {
    readonly type: ExecutionTokenType;
    readonly name: string;
    readonly nonce: string;
    constructor(tokenType: ExecutionTokenType, name: string);
    getHash(): string;
  }
}
declare module 'node/services/execution-token.service' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  /** This should be called when extensions are being loaded
   *  @param extensionName Name of the extension to register
   *  @returns Token that can be passed to `tokenIsValid` to authenticate or authorize API callers.
   *  It is important that the token is not shared to avoid impersonation of API callers.
   */
  function registerExtension(extensionName: string): ExecutionToken;
  /** Remove a registered token.  Note that a hash of a token is what is needed to unregister, not
   *  the full token itself (notably not the nonce), so something can be delegated the ability to
   *  unregister a token without having been given the full token itself.
   *  @param extensionName Name of the extension that was originally registered
   *  @param tokenHash Value of `getHash()` of the token that was originally registered.
   *  @returns `true` if the token was successfully unregistered, `false` otherwise
   */
  function unregisterExtension(extensionName: string, tokenHash: string): boolean;
  /** This should only be needed by services that need to contextualize the response for the caller
   *  @param executionToken Token that was previously registered.
   *  @returns `true` if the token matches a token that was previous registered, `false` otherwise.
   */
  function tokenIsValid(executionToken: ExecutionToken): boolean;
  const executionTokenService: {
    registerExtension: typeof registerExtension;
    unregisterExtension: typeof unregisterExtension;
    tokenIsValid: typeof tokenIsValid;
  };
  export default executionTokenService;
}
declare module 'extension-host/services/extension-storage.service' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  import { Buffer } from 'buffer';
  /** This is only intended to be called by the extension service.
   *  This service cannot call into the extension service or it causes a circular dependency.
   */
  export function setExtensionUris(urisPerExtension: Map<string, string>): void;
  /** Return a path to the specified file within the extension's installation directory */
  export function buildExtensionPathFromName(extensionName: string, fileName: string): string;
  /** Read a text file from the the extension's installation directory
   *  @param token ExecutionToken provided to the extension when `activate()` was called
   *  @param fileName Name of the file to be read
   *  @returns Promise for a string with the contents of the file
   */
  function readTextFileFromInstallDirectory(
    token: ExecutionToken,
    fileName: string,
  ): Promise<string>;
  /** Read a binary file from the the extension's installation directory
   *  @param token ExecutionToken provided to the extension when `activate()` was called
   *  @param fileName Name of the file to be read
   *  @returns Promise for a Buffer with the contents of the file
   */
  function readBinaryFileFromInstallDirectory(
    token: ExecutionToken,
    fileName: string,
  ): Promise<Buffer>;
  /** Read data specific to the user (as identified by the OS) and extension (as identified by
   *  the ExecutionToken)
   *  @param token ExecutionToken provided to the extension when `activate()` was called
   *  @param key Unique identifier of the data
   *  @returns Promise for a string containing the data
   */
  function readUserData(token: ExecutionToken, key: string): Promise<string>;
  /** Write data specific to the user (as identified by the OS) and extension (as identified by
   *  the ExecutionToken)
   *  @param token ExecutionToken provided to the extension when `activate()` was called
   *  @param key Unique identifier of the data
   *  @param data Data to be written
   *  @returns Promise that will resolve if the data is written successfully
   */
  function writeUserData(token: ExecutionToken, key: string, data: string): Promise<void>;
  /** Delete data previously written that is specific to the user (as identified by the OS)
   *  and extension (as identified by the ExecutionToken)
   *  @param token ExecutionToken provided to the extension when `activate()` was called
   *  @param key Unique identifier of the data
   *  @returns Promise that will resolve if the data is deleted successfully
   */
  function deleteUserData(token: ExecutionToken, key: string): Promise<void>;
  /** This service provides extensions in the extension host the ability to read/write data
   *  based on the extension identity and current user (as identified by the OS). This service will
   *  not work within the renderer.
   */
  const extensionStorageService: {
    readTextFileFromInstallDirectory: typeof readTextFileFromInstallDirectory;
    readBinaryFileFromInstallDirectory: typeof readBinaryFileFromInstallDirectory;
    readUserData: typeof readUserData;
    writeUserData: typeof writeUserData;
    deleteUserData: typeof deleteUserData;
  };
  export default extensionStorageService;
  export type ExtensionStorageService = typeof extensionStorageService;
}
declare module 'renderer/context/papi-context/test.context' {
  const TestContext: import('react').Context<string>;
  export default TestContext;
}
declare module 'renderer/context/papi-context/index' {
  /** All React contexts to be exposed on the papi */
  const papiContext: {
    TestContext: import('react').Context<string>;
  };
  export default papiContext;
  export type PapiContext = typeof papiContext;
}
declare module 'renderer/hooks/papi-hooks/use-promise.hook' {
  /**
   * Awaits a promise and returns a loading value while the promise is unresolved
   * @param promiseFactoryCallback a function that returns the promise to await. If the promise resolves to null, the value will not change.
   * If this callback is undefined, the current value will be returned (defaultValue unless it was previously changed and preserveValue is true), and there will be no loading.
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render
   * @param defaultValue the initial value to return while first awaiting the promise. If preserveValue is false, this value is also shown while awaiting the promise on subsequent calls.
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
   * @param preserveValue whether to leave the value as the most recent resolved promise value or set it back to defaultValue while running the promise again. Default to true
   * @returns [value, isLoading]
   *  - `value`: the current value for the promise, either the defaultValue or the resolved promise value
   *  - `isLoading`: whether the promise is waiting to be resolved
   */
  const usePromise: <T>(
    promiseFactoryCallback: (() => Promise<T | null>) | undefined,
    defaultValue: T,
    preserveValue?: boolean,
  ) => [value: T, isLoading: boolean];
  export default usePromise;
}
declare module 'renderer/hooks/papi-hooks/use-event.hook' {
  import { PapiEvent, PapiEventHandler } from 'shared/models/papi-event.model';
  /**
   * Adds an event handler to an event so the event handler runs when the event is emitted
   * @param event the event to subscribe to. Can be either a string or an Event
   *  - If event is a `string`, the network event associated with this type will automatically be used
   *  - If event is a `PapiEvent`, that event will be used
   *  - If event is undefined, the callback will not be subscribed. Useful if the event is not yet available for example
   * @param eventHandler the callback to run when the event is emitted
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render
   */
  const useEvent: <T>(
    event: string | PapiEvent<T> | undefined,
    eventHandler: PapiEventHandler<T>,
  ) => void;
  export default useEvent;
}
declare module 'renderer/hooks/papi-hooks/use-event-async.hook' {
  import { PapiEvent, PapiEventAsync, PapiEventHandler } from 'shared/models/papi-event.model';
  /**
   * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler runs when the event is emitted
   * @param event the asynchronously (un)subscribing event to subscribe to. Can be either a string or an Event
   *  - If event is a `string`, the network event associated with this type will automatically be used
   *  - If event is a `PapiEvent` or `PapiEventAsync`, that event will be used
   *  - If event is undefined, the callback will not be subscribed. Useful if the event is not yet available for example
   * @param eventHandler the callback to run when the event is emitted
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render
   */
  const useEventAsync: <T>(
    event: string | PapiEvent<T> | PapiEventAsync<T> | undefined,
    eventHandler: PapiEventHandler<T>,
  ) => void;
  export default useEventAsync;
}
declare module 'renderer/hooks/papi-hooks/use-data-provider.hook' {
  import IDataProvider from 'shared/models/data-provider.interface';
  /**
   * Gets a data provider with specified name
   * @param providerName name of the data provider to get
   * @returns undefined if the data provider has not been retrieved,
   *  data provider if it has been retrieved and is not disposed,
   *  and undefined again if the data provider is disposed
   *
   * @type `T` - the type of data provider to return. Use `IDataProvider<TSelector, TGetData, TSetData>`,
   *  specifying your own types, or provide a custom data provider type
   */
  function useDataProvider<T extends IDataProvider<any, any, any>>(
    providerName: string | undefined,
  ): T | undefined;
  /**
   * Passes the provided data provider through. Used to support hooks that already have a dataProvider
   * @param dataProvider result of useDataProvider if you want this hook to just return the data provider again
   * @returns undefined if the data provider has not been retrieved,
   *  data provider if it has been retrieved and is not disposed,
   *  and undefined again if the data provider is disposed
   *
   * @type `T` - the type of data provider to return. Use `IDataProvider<TSelector, TGetData, TSetData>`,
   *  specifying your own types, or provide a custom data provider type
   */
  function useDataProvider<T extends IDataProvider<any, any, any>>(
    dataProvider: T | undefined,
  ): T | undefined;
  /**
   * Gets a data provider with specified provider name
   * @param dataProviderSource string name of the data provider to get OR dataProvider (result of useDataProvider if you
   * want this hook to just return the data provider again)
   * @returns undefined if the data provider has not been retrieved,
   *  data provider if it has been retrieved and is not disposed,
   *  and undefined again if the data provider is disposed
   *
   * @type `T` - the type of data provider to return. Use `IDataProvider<TSelector, TGetData, TSetData>`,
   *  specifying your own types, or provide a custom data provider type
   */
  function useDataProvider<T extends IDataProvider<any, any, any>>(
    dataProviderSource: string | T | undefined,
  ): T | undefined;
  export default useDataProvider;
}
declare module 'renderer/hooks/papi-hooks/use-data.hook' {
  import { DataProviderSubscriberOptions } from 'shared/models/data-provider.model';
  import IDataProvider from 'shared/models/data-provider.interface';
  /**
   * Subscribes to run a callback on a data provider's data with specified selector
   * @param providerName name of the data provider to subscribe to
   * @param selector tells the provider what data this listener is listening for
   * @param defaultValue the initial value to return while first awaiting the data
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
   * @param subscriberOptions various options to adjust how the subscriber emits updates
   *
   *    WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
   * @returns [data, setData, isLoading]
   *  - `data`: the current value for the data from the data provider with the specified selector, either the defaultValue or the resolved data
   *  - `setData`: asynchronous function to request that the data provider update the data at this selector. Returns true if successful.
   *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
   *  - `isLoading`: whether the data with the selector is awaiting retrieval from the data provider
   */
  function useData<TSelector, TGetData, TSetData>(
    providerName: string | undefined,
    selector: TSelector,
    defaultValue: TGetData,
    subscriberOptions?: DataProviderSubscriberOptions,
  ): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
  /**
   * Subscribes to run a callback on a data provider's data with specified selector
   * @param dataProvider result of useDataProvider if you want to consolidate and only get the data provider once
   * @param selector tells the provider what data this listener is listening for
   * @param defaultValue the initial value to return while first awaiting the data
   *
   *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
   * @param subscriberOptions various options to adjust how the subscriber emits updates
   *
   *    WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
   * @returns [data, setData, isLoading]
   *  - `data`: the current value for the data from the data provider with the specified selector, either the defaultValue or the resolved data
   *  - `setData`: asynchronous function to request that the data provider update the data at this selector. Returns true if successful.
   *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
   *  - `isLoading`: whether the data with the selector is awaiting retrieval from the data provider
   */
  function useData<TSelector, TGetData, TSetData>(
    dataProvider: IDataProvider<TSelector, TGetData, TSetData> | undefined,
    selector: TSelector,
    defaultValue: TGetData,
    subscriberOptions?: DataProviderSubscriberOptions,
  ): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
  export default useData;
}
declare module 'renderer/hooks/papi-hooks/index' {
  import useDataProvider from 'renderer/hooks/papi-hooks/use-data-provider.hook';
  import useData from 'renderer/hooks/papi-hooks/use-data.hook';
  /** All React hooks to be exposed on the papi */
  const papiHooks: {
    usePromise: <T>(
      promiseFactoryCallback: (() => Promise<T | null>) | undefined,
      defaultValue: T,
      preserveValue?: boolean,
    ) => [value: T, isLoading: boolean];
    useEvent: <T_1>(
      event: string | import('shared/models/papi-event.model').PapiEvent<T_1> | undefined,
      eventHandler: import('shared/models/papi-event.model').PapiEventHandler<T_1>,
    ) => void;
    useEventAsync: <T_2>(
      event:
        | string
        | import('shared/models/papi-event.model').PapiEvent<T_2>
        | import('shared/models/papi-event.model').PapiEventAsync<T_2>
        | undefined,
      eventHandler: import('shared/models/papi-event.model').PapiEventHandler<T_2>,
    ) => void;
    useDataProvider: typeof useDataProvider;
    useData: typeof useData;
  };
  export default papiHooks;
  export type PapiHooks = typeof papiHooks;
}
declare module 'papi' {
  /**
   * Unified module for accessing API features in extensions.
   *
   * WARNING: DO NOT IMPORT papi IN ANY FILE THAT papi IMPORTS AND EXPOSES.
   */
  import * as commandService from 'shared/services/command.service';
  import * as papiUtil from 'shared/utils/papi-util';
  import * as webViewService from 'shared/services/web-view.service';
  import PapiEventEmitter from 'shared/models/papi-event-emitter.model';
  const papi: {
    EventEmitter: typeof PapiEventEmitter;
    fetch: typeof fetch;
    commands: typeof commandService;
    util: typeof papiUtil;
    webViews: typeof webViewService;
    react: {
      context: {
        TestContext: import('react').Context<string>;
      };
      hooks: {
        usePromise: <T>(
          promiseFactoryCallback: (() => Promise<T | null>) | undefined,
          defaultValue: T,
          preserveValue?: boolean,
        ) => [value: T, isLoading: boolean];
        useEvent: <T_1>(
          event: string | import('shared/models/papi-event.model').PapiEvent<T_1> | undefined,
          eventHandler: import('shared/models/papi-event.model').PapiEventHandler<T_1>,
        ) => void;
        useEventAsync: <T_2>(
          event:
            | string
            | import('shared/models/papi-event.model').PapiEvent<T_2>
            | import('shared/models/papi-event.model').PapiEventAsync<T_2>
            | undefined,
          eventHandler: import('shared/models/papi-event.model').PapiEventHandler<T_2>,
        ) => void;
        useDataProvider: typeof import('renderer/hooks/papi-hooks/use-data-provider.hook').default;
        useData: typeof import('renderer/hooks/papi-hooks/use-data.hook').default;
      };
    };
    network: {
      onDidClientConnect: import('shared/models/papi-event.model').PapiEvent<
        import('shared/data/internal-connection.model').ClientConnectEvent
      >;
      onDidClientDisconnect: import('shared/models/papi-event.model').PapiEvent<
        import('shared/data/internal-connection.model').ClientDisconnectEvent
      >;
      createNetworkEventEmitter: <T_3>(eventType: string) => PapiEventEmitter<T_3>;
      getNetworkEvent: <T_4>(
        eventType: string,
      ) => import('shared/models/papi-event.model').PapiEvent<T_4>;
    };
    logger: import('electron-log').Logger & {
      default: import('electron-log').Logger;
    };
    internet: {
      fetch: typeof fetch;
    };
    dataProvider: {
      hasKnown: (providerName: string) => boolean;
      registerEngine: <TSelector, TGetData, TSetData>(
        providerName: string,
        dataProviderEngine: import('shared/models/data-provider-engine.model').default<
          TSelector,
          TGetData,
          TSetData
        >,
      ) => Promise<
        import('shared/models/data-provider.interface').IDisposableDataProvider<
          TSelector,
          TGetData,
          TSetData
        >
      >;
      get: <T_5 extends import('shared/models/data-provider.interface').default<any, any, any>>(
        providerName: string,
      ) => Promise<T_5 | undefined>;
    };
    storage: {
      readTextFileFromInstallDirectory: (
        token: import('node/models/execution-token.model').ExecutionToken,
        fileName: string,
      ) => Promise<string>;
      readBinaryFileFromInstallDirectory: (
        token: import('node/models/execution-token.model').ExecutionToken,
        fileName: string,
      ) => Promise<Buffer>;
      readUserData: (
        token: import('node/models/execution-token.model').ExecutionToken,
        key: string,
      ) => Promise<string>;
      writeUserData: (
        token: import('node/models/execution-token.model').ExecutionToken,
        key: string,
        data: string,
      ) => Promise<void>;
      deleteUserData: (
        token: import('node/models/execution-token.model').ExecutionToken,
        key: string,
      ) => Promise<void>;
    };
  };
  export default papi;
}
declare module 'extension-host/extension-types/extension-activation-context.model' {
  import { ExecutionToken } from 'node/models/execution-token.model';
  /** An object of this type is passed into `activate()` for each extension during initialization */
  export type ExecutionActivationContext = {
    executionToken: ExecutionToken;
  };
}
declare module 'extension-host/extension-types/extension.interface' {
  import { UnsubscriberAsync } from 'shared/utils/papi-util';
  import { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
  /** Interface for all extensions to implement */
  export interface IExtension {
    /**
     * Sets up this extension! Runs when paranext wants this extension to activate. For example, activate() should register commands for this extension
     * @param context data and utilities that are specific to this particular extension
     * @returns unsubscriber to run to deactivate this extension
     */
    activate: (context: ExecutionActivationContext) => Promise<UnsubscriberAsync>;
    /**
     * Deactivate anything in this extension that is not covered by the unsubscriber returned from the activate function, unsubscribing from things and such.
     * @returns promise that resolves to true if successfully deactivated
     */
    deactivate?: UnsubscriberAsync;
  }
}
