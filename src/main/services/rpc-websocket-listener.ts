import { app } from 'electron';
import {
  ConnectionStatus,
  createErrorResponse,
  createSuccessResponse,
  EventHandler,
  GET_METHODS,
  InternalRequestHandler,
  REGISTER_EVENT,
  REGISTER_METHOD,
  RequestParams,
  requestWithRetry,
  UNREGISTER_EVENT,
  UNREGISTER_METHOD,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { IRpcMethodRegistrar, RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import { SingleNotificationDocumentation } from '@shared/models/openrpc.model';
import { SHARED_EVENT_NAMES } from '@shared/services/network.service';
import type { SharedNetworkEventTypes } from 'papi-shared-types';
import { getErrorMessage, Mutex } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';
import { logger } from '@shared/services/logger.service';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import {
  createEmptyOpenRpc,
  getEmptyMethodDocs,
  OpenRpc,
  OpenRpcNotification,
  SingleMethodDocumentation,
} from '@shared/models/openrpc.model';
import { RpcServer } from './rpc-server';

interface EventRegistrant {
  handler: unknown;
  documentation?: SingleNotificationDocumentation;
}

/**
 * Tracks registered network event emitters, enforcing shared vs. exclusive ownership policy.
 *
 * @internal Exported for unit-testing only; not part of the public API.
 */
export class RpcEventRegistry {
  private byName = new Map<string, EventRegistrant[]>();

  /**
   * Try to register an event. Returns `true` if accepted, `false` if rejected.
   *
   * - Name in `SHARED_EVENT_NAMES` (shared): multiple handlers may register; same handler twice
   *   rejected.
   * - Name not in `SHARED_EVENT_NAMES` (exclusive): first registrant wins; any subsequent
   *   registration from any handler is rejected.
   */
  tryRegister(
    handler: unknown,
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): boolean {
    const isShared = SHARED_EVENT_NAMES.has(eventName as keyof SharedNetworkEventTypes);
    const existing = this.byName.get(eventName);

    if (!existing) {
      this.byName.set(eventName, [{ handler, documentation }]);
      return true;
    }

    if (isShared) {
      if (existing.some((r) => r.handler === handler)) return false;
      existing.push({ handler, documentation });
      return true;
    }

    return false;
  }

  /** Remove a registrant. Returns `true` if the handler had registered this event. */
  tryUnregister(handler: unknown, eventName: string): boolean {
    const existing = this.byName.get(eventName);
    if (!existing) return false;
    const index = existing.findIndex((r) => r.handler === handler);
    if (index < 0) return false;
    existing.splice(index, 1);
    if (existing.length === 0) this.byName.delete(eventName);
    return true;
  }

  /** Remove all event registrations for the given handler (e.g. when a websocket closes) */
  unregisterAll(handler: unknown): void {
    this.byName.forEach((registrants, eventName) => {
      const filtered = registrants.filter((r) => r.handler !== handler);
      if (filtered.length === 0) this.byName.delete(eventName);
      else this.byName.set(eventName, filtered);
    });
  }

  entries(): IterableIterator<[string, EventRegistrant[]]> {
    return this.byName.entries();
  }
}

/**
 * Owns the WebSocketServer that listens for clients to connect to the web socket. When a client
 * connects, an RpcServer is created in this same process to service that connection.
 *
 * Also owns a map of all registered methods tied to the IRpcHandler that knows how to respond to
 * those methods. Methods registered within "main" will be tied to this class. Methods registered by
 * other processes will be tied to the RPCServer that services the connection for that other
 * process.
 *
 * Created by the main process on start up when the network service initializes
 */
export class RpcWebSocketListener implements IRpcMethodRegistrar {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private localEventHandler: EventHandler | undefined;
  private webSocketServer: WebSocketServer | undefined;
  private nextSocketNumber = 1;
  private readonly connectionMutex = new Mutex();
  private readonly rpcServerBySocket = new Map<WebSocket, RpcServer>();
  private readonly rpcMethodDetailsByMethodName = new Map<string, RegisteredRpcMethodDetails>();
  private readonly localMethodsByMethodName = new Map<string, InternalRequestHandler>();
  private readonly rpcEventDetailsByEventName = new RpcEventRegistry();

  constructor() {
    bindClassMethods.call(this);
  }

  get nextSocketId(): string {
    const retVal = this.nextSocketNumber.toString(10);
    this.nextSocketNumber += 1;
    return retVal;
  }

  connect(localEventHandler: EventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(() => {
      if (this.connectionStatus !== ConnectionStatus.Disconnected) return false;
      this.localEventHandler = localEventHandler;
      this.registerMethod(GET_METHODS, this.generateOpenRpcSchema, {
        method: {
          summary: 'Get documentation for all available methods on the PAPI websocket',
          params: [],
          result: {
            name: 'return value',
            schema: {
              type: 'object',
            },
          },
        },
      });

      this.webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
      this.webSocketServer.addListener('connection', this.onClientConnect);
      this.webSocketServer.addListener('close', this.disconnect);

      this.connectionStatus = ConnectionStatus.Connected;
      return true;
    });
  }

  async disconnect(): Promise<void> {
    return this.connectionMutex.runExclusive(() => {
      if (this.webSocketServer) {
        this.webSocketServer.removeListener('connection', this.onClientConnect);
        this.webSocketServer.removeListener('close', this.disconnect);
        this.webSocketServer.close();
        this.webSocketServer = undefined;
      }

      this.localEventHandler = undefined;
      this.connectionStatus = ConnectionStatus.Disconnected;
    });
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    skipRetry = false,
  ): Promise<JSONRPCResponse> {
    const doRequest = async () => {
      const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
      if (!methodDetails)
        return createErrorResponse(
          `No handler found for ${requestType}`,
          JSONRPCErrorCode.MethodNotFound,
        );
      const { handler } = methodDetails;
      if (handler !== this) return handler.request(requestType, requestParams, skipRetry);
      const method = this.localMethodsByMethodName.get(requestType);
      if (!method)
        return createErrorResponse(
          `Locally registered method name missing the actual method`,
          JSONRPCErrorCode.InternalError,
        );
      try {
        const result = method(...requestParams);
        const awaitedResult = result instanceof Promise ? await result : result;
        return createSuccessResponse(awaitedResult);
      } catch (error) {
        return createErrorResponse(getErrorMessage(error), JSONRPCErrorCode.InternalError);
      }
    };
    return skipRetry
      ? doRequest()
      : requestWithRetry(doRequest, 'rpc-websocket-listener', requestType);
  }

  async registerMethod(
    methodName: string,
    method: InternalRequestHandler,
    methodDocs?: SingleMethodDocumentation,
  ): Promise<boolean> {
    if (
      this.rpcMethodDetailsByMethodName.has(methodName) ||
      this.localMethodsByMethodName.has(methodName)
    )
      return false;

    this.rpcMethodDetailsByMethodName.set(methodName, { handler: this, methodDocs });
    this.localMethodsByMethodName.set(methodName, method);
    return true;
  }

  async unregisterMethod(methodName: string): Promise<boolean> {
    const methodDetails = this.rpcMethodDetailsByMethodName.get(methodName);
    if (!methodDetails || methodDetails.handler !== this) return false;
    this.rpcMethodDetailsByMethodName.delete(methodName);
    this.localMethodsByMethodName.delete(methodName);
    return true;
  }

  async registerEvent(
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): Promise<boolean> {
    return this.rpcEventDetailsByEventName.tryRegister(this, eventName, documentation);
  }

  async unregisterEvent(eventName: string): Promise<boolean> {
    return this.rpcEventDetailsByEventName.tryUnregister(this, eventName);
  }

  generateOpenRpcSchema(): OpenRpc {
    const openRpcSchema = createEmptyOpenRpc(app.getVersion());
    openRpcSchema.methods = [
      {
        name: REGISTER_METHOD,
        summary: 'Register a method on the network',
        params: [
          {
            name: 'methodName',
            required: true,
            summary: 'Name of the method to register',
            schema: { type: 'string' },
          },
          {
            name: 'methodDocs',
            required: false,
            summary: 'Documentation for the method in OpenRPC format',
            schema: { type: 'object' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'Whether the method was successfully registered',
          schema: { type: 'boolean' },
        },
      },
      {
        name: UNREGISTER_METHOD,
        summary: 'Unregister a method on the network',
        params: [
          {
            name: 'methodName',
            required: true,
            summary: 'Name of the method to unregister',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'Whether the method was successfully unregistered',
          schema: { type: 'boolean' },
        },
      },
      {
        name: REGISTER_EVENT,
        summary: 'Register a network event emitter with the main process',
        params: [
          {
            name: 'eventName',
            required: true,
            summary: 'Name of the event to register',
            schema: { type: 'string' },
          },
          {
            name: 'documentation',
            required: false,
            summary: 'Documentation for the event in OpenRPC notification format',
            schema: { type: 'object' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'Whether the event was successfully registered',
          schema: { type: 'boolean' },
        },
      },
      {
        name: UNREGISTER_EVENT,
        summary: 'Unregister a network event emitter from the main process',
        params: [
          {
            name: 'eventName',
            required: true,
            summary: 'Name of the event to unregister',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'Whether the event was successfully unregistered',
          schema: { type: 'boolean' },
        },
      },
    ];
    this.rpcMethodDetailsByMethodName.forEach((details, methodName) => {
      if (details.methodDocs) {
        const newDocs = { name: methodName, ...details.methodDocs.method };
        // Overwrite the name with `methodName` in case `details.methodDocs.method` included a name
        newDocs.name = methodName;
        openRpcSchema.methods.push(newDocs);
        if (details.methodDocs.components) {
          openRpcSchema.components = {
            schemas: {
              ...details.methodDocs.components.schemas,
              ...openRpcSchema.components?.schemas,
            },
            contentDescriptors: {
              ...details.methodDocs.components.contentDescriptors,
              ...openRpcSchema.components?.contentDescriptors,
            },
            examples: {
              ...details.methodDocs.components.examples,
              ...openRpcSchema.components?.examples,
            },
            links: {
              ...details.methodDocs.components.links,
              ...openRpcSchema.components?.links,
            },
            errors: {
              ...details.methodDocs.components.errors,
              ...openRpcSchema.components?.errors,
            },
            tags: {
              ...details.methodDocs.components.tags,
              ...openRpcSchema.components?.tags,
            },
          };
        }
      } else {
        openRpcSchema.methods.push({
          name: methodName,
          ...getEmptyMethodDocs(),
        });
      }
    });
    for (const [eventName, registrants] of this.rpcEventDetailsByEventName.entries()) {
      // First registration's documentation wins (matches the conflict policy).
      const docs = registrants.find((r) => r.documentation)?.documentation;
      if (!docs) continue; // events with no documentation are not surfaced in OpenRPC

      const notificationEntry: OpenRpcNotification = {
        name: eventName,
        ...docs.notification,
      };
      openRpcSchema.methods.push(notificationEntry);

      if (docs.components) {
        openRpcSchema.components = {
          schemas: {
            ...docs.components.schemas,
            ...openRpcSchema.components?.schemas,
          },
          contentDescriptors: {
            ...docs.components.contentDescriptors,
            ...openRpcSchema.components?.contentDescriptors,
          },
          examples: {
            ...docs.components.examples,
            ...openRpcSchema.components?.examples,
          },
          links: {
            ...docs.components.links,
            ...openRpcSchema.components?.links,
          },
          errors: {
            ...docs.components.errors,
            ...openRpcSchema.components?.errors,
          },
          tags: {
            ...docs.components.tags,
            ...openRpcSchema.components?.tags,
          },
        };
      }
    }
    openRpcSchema.methods.sort((a, b) => a.name.localeCompare(b.name));
    return openRpcSchema;
  }

  emitEventOnNetwork<T>(eventType: string, event: T): void {
    // Wrap each subscriber's emit in try/catch so one broken socket cannot abort the
    // broadcast to the remaining (healthy) subscribers. See D-010: `write EPIPE`
    // unhandled exception during multi-webview scroll-group fan-out.
    this.rpcServerBySocket.forEach((rpcServer) => {
      try {
        rpcServer.emitEventOnNetwork(eventType, event);
      } catch (error) {
        logger.warn(
          `emitEventOnNetwork: failed to emit '${eventType}' to one subscriber; continuing. ${getErrorMessage(error)}`,
        );
      }
    });
  }

  // This is run by an RPCServer when it receives an event message on the websocket from a client
  private propagateEvent<T>(source: RpcServer, eventType: string, event: T): void {
    if (!this.localEventHandler) throw new Error(`localEventHandler not set`);
    if (!Array.isArray(event) || event.length !== 1) throw new Error(`event not wrapped in array`);
    this.localEventHandler(eventType, event[0]);
    this.rpcServerBySocket.forEach((rpcServer) => {
      if (rpcServer === source) return;
      // See note in emitEventOnNetwork — protect the fan-out from a single bad subscriber.
      try {
        rpcServer.emitEventOnNetwork(eventType, event[0]);
      } catch (error) {
        logger.warn(
          `propagateEvent: failed to forward '${eventType}' to one subscriber; continuing. ${getErrorMessage(error)}`,
        );
      }
    });
  }

  private onClientConnect(webSocket: WebSocket): void {
    const rpcServer = new RpcServer(
      this.nextSocketId,
      webSocket,
      this.propagateEvent,
      this.rpcMethodDetailsByMethodName,
      this.rpcEventDetailsByEventName,
    );
    rpcServer.connect();
    this.rpcServerBySocket.set(webSocket, rpcServer);
    logger.warn(`Websocket client connected: ${webSocket.url}`);
    webSocket.addEventListener('close', this.onClientDisconnect);
  }

  private onClientDisconnect(ev: CloseEvent): void {
    // Assert the correct type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webSocket = ev.target as WebSocket;
    webSocket.removeEventListener('close', this.onClientDisconnect);
    if (!this.rpcServerBySocket.delete(webSocket)) {
      logger.warn(`Close called on socket for '${webSocket.url}' but no handler found`);
    }
  }
}

export default RpcWebSocketListener;
