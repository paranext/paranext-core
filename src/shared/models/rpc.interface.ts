import {
  ConnectionStatus,
  EventHandler,
  InternalRequestHandler,
  RequestParams,
} from '@shared/data/rpc.model';
import {
  SingleMethodDocumentation,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';
import { SerializedRequestType } from '@shared/utils/util';
import { JSONRPCResponse } from 'json-rpc-2.0';

/**
 * Defines how to support sending requests on the network and emitting events on the network
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
   *   and an event and emitting the event locally. Used when receiving an event over the network.
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
   * @param requestType Type of request (or "method" in JSONRPC jargon) to call
   * @param requestParams Parameters associated with this request
   * @param skipRetry Whether to skip the retry process that will retry up to 10 times
   * @returns Promise that resolves to a JSONRPCSuccessResponse or JSONRPCErrorResponse message
   */
  request: (
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    skipRetry?: boolean,
  ) => Promise<JSONRPCResponse>;
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
  registerMethod: (
    methodName: string,
    method: InternalRequestHandler,
    methodDocs?: SingleMethodDocumentation,
  ) => Promise<boolean>;
  /** Unregister a method so it is no longer available to RPC requests */
  unregisterMethod: (methodName: string) => Promise<boolean>;
  /**
   * Register a centrally-tracked network event with the main process. Shared vs exclusive semantics
   * is determined by looking up the event name in `SHARED_EVENT_NAMES`. See
   * {@link SharedNetworkEventTypes} for shared vs exclusive semantics.
   *
   * Returns `true` if the registration was accepted, `false` otherwise. Used by
   * `createNetworkEventEmitterAsync`; not for direct caller use.
   */
  registerEvent: (
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ) => Promise<boolean>;
  /** Unregister a network event emitter so it is no longer tracked centrally */
  unregisterEvent: (eventName: string) => Promise<boolean>;
}

export type RegisteredRpcMethodDetails = {
  handler: IRpcHandler;
  methodDocs?: SingleMethodDocumentation;
};

/**
 * Minimal interface for event registries so that {@link RpcServer} can participate in event
 * registration without importing from `rpc-websocket-listener.ts` (which would create a circular
 * dependency).
 *
 * @internal
 */
export interface IRpcEventRegistry {
  tryRegister(
    handler: unknown,
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): boolean;
  tryUnregister(handler: unknown, eventName: string): boolean;
  /** Remove all event registrations for the given handler (e.g. when a websocket closes) */
  unregisterAll(handler: unknown): void;
}
