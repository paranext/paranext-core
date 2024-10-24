import {
  ConnectionStatus,
  EventHandler,
  InternalRequestHandler,
  RequestHandler,
} from '@shared/data/rpc.model';

/**
 * Defines the the server and the client functionality for supporting remote procedure calls. Used
 * by the network connector factory to supply the right kind of handler (i.e., server or client) to
 * the network service.
 *
 * NOTE: In JSONRPC jargon, a "request" is made to a "method". In our code we talk about "request
 * types", but JSONRPC doesn't have the notion of a "request type". However, a "request type" is
 * really just the name of a method in JSONRPC. So "method names" and "request types" are treated as
 * the same thing. Similarly, what we call a "request handler" is the same thing as a "method" that
 * has been registered with a JSONRPC server.
 */
export interface IRpcHandler {
  /**
   * Whether this connector is setting up or has finished setting up its connection and is ready to
   * communicate on the network
   */
  connectionStatus: ConnectionStatus;
  /**
   * Sets up the RPC handler by populating connector info, setting up event handlers, and doing one
   * of the following:
   *
   * - On clients: connecting to the server
   * - On servers: opening an endpoint for clients to connect
   *
   * @param localEventHandler Function that handles events from the server by accepting an eventType
   *   and an event and emitting the event locally
   * @returns Promise that resolves when finished connecting
   */
  connect: (localEventHandler: EventHandler) => Promise<boolean>;
  /**
   * Disconnects from the connection:
   *
   * - On clients: disconnects from the server
   * - On servers: disconnects from all clients and closes its connection endpoint
   */
  disconnect: () => Promise<void>;
  /**
   * Send a request and resolve after receiving a response
   *
   * @param requestType The type of request
   * @param requestParams Parameters to send in the request
   * @returns Promise that resolves with the response message
   */
  request: RequestHandler;
  /**
   * Sends an event to other processes. Does NOT run the local event subscriptions as they should be
   * run by NetworkEventEmitter after sending on network.
   *
   * @param eventType Unique network event type for coordinating between processes
   * @param event Event data to emit on the network
   */
  emitEventOnNetwork: EventHandler;
}

/**
 * Represents anything that handles the RPC protocol and allows callers to register methods that can
 * be called remotely over the network.
 *
 * NOTE: In JSONRPC jargon, a "request" is made to a "method". In our code we talk about "request
 * types", but JSONRPC doesn't have the notion of a "request type". However, a "request type" is
 * really just the name of a method in JSONRPC. So "method names" and "request types" are treated as
 * the same thing. Similarly, what we call a "request handler" is the same thing as a "method" that
 * has been registered with a JSONRPC server.
 */
export interface IRpcMethodRegistrar extends IRpcHandler {
  /** Register a method that will be called if an RPC request is made */
  registerMethod: (methodName: string, method: InternalRequestHandler) => Promise<boolean>;
  /** Unregister a method so it is no longer available to RPC requests */
  unregisterMethod: (methodName: string) => Promise<boolean>;
}
