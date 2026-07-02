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
} from '@shared/data/rpc.model';
import { IRpcMethodRegistrar, RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import {
  createEmptyOpenRpc,
  getEmptyMethodDocs,
  getEmptyNotificationDocs,
  OpenRpcNotification,
  OpenRpc,
  SingleMethodDocumentation,
  SingleNotificationDocumentation,
  withExperimentalPrefix,
  withNotificationPrefix,
} from '@shared/models/openrpc.model';
import { getErrorMessage, Mutex } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';
import { logger } from '@shared/services/logger.service';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import { createPapiWebSocketServer } from '@main/services/web-socket-server.factory';
import { RpcServer } from './rpc-server';
// RpcEventRegistry was extracted to its own file to satisfy max-classes-per-file
import { RpcEventRegistry } from './rpc-event-registry';

export { RpcEventRegistry };

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
  /**
   * Event names we've already warned about being announced while unregistered. Deduped so a
   * high-frequency unregistered event does not flood the log — the deprecation notice only needs to
   * be surfaced once per event name.
   */
  private readonly warnedUnregisteredAnnouncements = new Set<string>();
  /**
   * Event names we've already warned about being announced from a process that did not register the
   * single-source event. Deduped for the same reason as {@link warnedUnregisteredAnnouncements}.
   */
  private readonly warnedForeignAnnouncements = new Set<string>();

  constructor() {
    bindClassMethods.call(this);
  }

  get nextSocketId(): string {
    const retVal = this.nextSocketNumber.toString(10);
    this.nextSocketNumber += 1;
    return retVal;
  }

  connect(localEventHandler: EventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(async () => {
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

      // Prefer the default port, but fall back to a free port when it is already in use so this
      // app runs its own isolated PAPI network (e.g. another paranext-based app is running)
      const { webSocketServer, port } = await createPapiWebSocketServer();
      this.webSocketServer = webSocketServer;
      // Advertise the port to the rest of main and to the processes main spawns (renderer,
      // extension host, .NET data provider) so this app's clients connect to this app's server
      globalThis.webSocketPort = port;
      logger.info(`PAPI WebSocket server is listening on port ${port}`);
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

    // A method and a network event (notification) must not share a name: both surface in the OpenRPC
    // document's `methods` array, where names must be unique. By convention events are `on*`-prefixed
    // and methods are not, so this realistically never collides — reject loudly if it somehow does
    // rather than emit a malformed document.
    if (this.rpcEventDetailsByEventName.has(methodName)) {
      logger.warn(
        `Cannot register method "${methodName}": a network event (notification) with this name is already registered. Method and notification names must be unique across both.`,
      );
      return false;
    }

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
    // Mirror of registerMethod's cross-kind guard: a network event must not share a name with a
    // method, since both land in the OpenRPC `methods` array where names must be unique.
    if (
      this.rpcMethodDetailsByMethodName.has(eventName) ||
      this.localMethodsByMethodName.has(eventName)
    ) {
      logger.warn(
        `Cannot register network event "${eventName}": a method with this name is already registered. Method and notification names must be unique across both.`,
      );
      return false;
    }
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
        // Prepend the experimental prefix ([EXPERIMENTAL] ) to the summary/description when the
        // method is experimental.
        openRpcSchema.methods.push(withExperimentalPrefix(newDocs));
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
        // Wrap the placeholder too (a no-op unless experimental) so methods and events handle the
        // experimental prefix consistently regardless of whether docs were provided.
        openRpcSchema.methods.push(
          withExperimentalPrefix({ name: methodName, ...getEmptyMethodDocs() }),
        );
      }
    });
    // Convert the entries iterator to an array so we can use .forEach() (avoids for-of + continue)
    Array.from(this.rpcEventDetailsByEventName.entries()).forEach(([eventName, registrants]) => {
      // First registration's documentation wins (matches the conflict policy).
      const docs = registrants.find((r) => r.documentation)?.documentation;
      // Surface every registered event, mirroring how undocumented methods are surfaced above:
      // events without their own documentation get a placeholder entry so the OpenRPC document
      // lists all events, not just documented ones.
      const notificationEntry: OpenRpcNotification = docs
        ? { name: eventName, ...docs.notification }
        : { name: eventName, ...getEmptyNotificationDocs() };
      // Overwrite the name after the spread (mirrors the method path above). `docs.notification`
      // arrives as untyped JSON over the websocket, so without this a client could list its event
      // under a different name.
      notificationEntry.name = eventName;
      // A notification is identified by having no `result`; strip any `result` smuggled in over the
      // websocket so an event can't masquerade as a method.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      delete (notificationEntry as { result?: unknown }).result;
      // Mark it as a notification — OpenRPC lists notifications alongside methods, so the
      // `(Notification) ` summary prefix distinguishes them. Then prepend the experimental prefix
      // ([EXPERIMENTAL] ) to the summary/description when the event is experimental.
      openRpcSchema.methods.push(withNotificationPrefix(withExperimentalPrefix(notificationEntry)));

      if (docs?.components) {
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
    });
    openRpcSchema.methods.sort((a, b) => a.name.localeCompare(b.name));
    return openRpcSchema;
  }

  emitEventOnNetwork<T>(eventType: string, event: T): void {
    // Main is announcing one of its own events; `this` is the handler the event was registered under.
    this.warnIfInvalidEventAnnouncement(this, eventType);
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
    // A client (`source`) is announcing this event; validate the announcement against the registry.
    this.warnIfInvalidEventAnnouncement(source, eventType);
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

  /**
   * Warn (once per event name) when an event is announced (emitted) on the network that the central
   * registry would flag as misuse:
   *
   * - The event is single-source and was never registered centrally — emitting an unregistered event
   *   is deprecated and the ability to do so will be removed in a future release.
   * - The event is single-source but is being announced from a process that did not register it,
   *   which is also deprecated.
   *
   * Announcements are never blocked; this only surfaces a warning to help authors migrate to
   * `createNetworkEventEmitterAsync` or `createCoreMultiSourceEventEmitter` for core code.
   *
   * @param handler The handler announcing the event (an {@link RpcServer} for a client, or `this`
   *   for main's own emissions).
   * @param eventType The event name being announced.
   */
  private warnIfInvalidEventAnnouncement(handler: unknown, eventType: string): void {
    const status = this.rpcEventDetailsByEventName.checkAnnouncement(handler, eventType);
    if (status === 'ok') return;

    if (status === 'unregistered') {
      if (this.warnedUnregisteredAnnouncements.has(eventType)) return;
      this.warnedUnregisteredAnnouncements.add(eventType);
      logger.warn(
        `Network event '${eventType}' was announced but is not registered with the central registry. Announcing unregistered network events is deprecated as of 12 June 2026 and will be removed in a future release; create the emitter with createNetworkEventEmitterAsync.`,
      );
      return;
    }

    // status === 'foreign-single-source'
    if (this.warnedForeignAnnouncements.has(eventType)) return;
    this.warnedForeignAnnouncements.add(eventType);
    logger.warn(
      `Single-source network event '${eventType}' was announced from a process that did not register it. Announcing a single-source event from a different process is deprecated as of 12 June 2026; only the process that registered the event should announce it.`,
    );
  }

  private onClientConnect(webSocket: WebSocket): void {
    const socketId = this.nextSocketId;
    const rpcServer = new RpcServer(
      socketId,
      webSocket,
      this.propagateEvent,
      this.rpcMethodDetailsByMethodName,
      this.rpcEventDetailsByEventName,
    );
    rpcServer.connect();
    this.rpcServerBySocket.set(webSocket, rpcServer);
    // Note: `webSocket.url` is always undefined for server-side sockets, so log the socket id
    logger.info(`Websocket client ${socketId} connected`);
    webSocket.addEventListener('close', this.onClientDisconnect);
  }

  private onClientDisconnect(ev: CloseEvent): void {
    // Assert the correct type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webSocket = ev.target as WebSocket;
    webSocket.removeEventListener('close', this.onClientDisconnect);
    if (!this.rpcServerBySocket.delete(webSocket)) {
      logger.warn('Close called on a websocket, but no rpc server handler was found for it');
    }
  }
}

export default RpcWebSocketListener;
