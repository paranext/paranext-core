import {
  JSONRPCClient,
  JSONRPCErrorCode,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCServer,
  JSONRPCServerAndClient,
  JSONRPCServerMiddlewareNext,
} from 'json-rpc-2.0';
import { logger } from '@shared/services/logger.service';
import { IRpcMethodRegistrar, RpcClientDisconnectEvent } from '@shared/models/rpc.interface';
import {
  ConnectionStatus,
  createErrorResponse,
  createRequest,
  deserializeMessage,
  EventHandler,
  InternalRequestHandler,
  REGISTER_EVENT,
  REGISTER_METHOD,
  RequestParams,
  sendPayloadToWebSocket,
  UNREGISTER_EVENT,
  UNREGISTER_METHOD,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { createWebSocket } from '@client/services/web-socket.factory';
import {
  AsyncVariable,
  getErrorMessage,
  Mutex,
  MutexMap,
  PlatformEvent,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import {
  SingleMethodDocumentation,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';

/**
 * Manages the JSON-RPC protocol on the client end of a websocket that connects to main
 *
 * Created by any process that connects to the websocket server owned by main
 */
export class RpcClient implements IRpcMethodRegistrar {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  /**
   * Never fires here. Only the process that owns the websocket server sees a connection being lost;
   * this end of the seam exists so shared code can subscribe in any process without asking which
   * one it is running in.
   *
   * @experimental
   */
  readonly onDidDisconnectClient: PlatformEvent<RpcClientDisconnectEvent>;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  /** Refers to the current process that created this object (i.e., not main) */
  private readonly jsonRpcServer: JSONRPCServer;
  /** Refers to main */
  private readonly jsonRpcClient: JSONRPCClient<void>;
  private readonly jsonRpcClientServer: JSONRPCServerAndClient;
  private readonly connectionMutex: Mutex = new Mutex();
  private readonly registrationMutexMap: MutexMap = new MutexMap();
  /**
   * Tracks the connection attempt currently in flight, so the socket's `open`/`error`/`close`
   * events can settle it. Recreated per attempt since an {@link AsyncVariable} is single-use, and
   * `undefined` whenever no attempt is in flight.
   */
  private connectionComplete: AsyncVariable<void> | undefined;
  private readonly clientDisconnectEmitter = new PlatformEventEmitter<RpcClientDisconnectEvent>();

  constructor() {
    bindClassMethods.call(this);
    this.onDidDisconnectClient = this.clientDisconnectEmitter.event;
    this.jsonRpcServer = new JSONRPCServer();
    this.jsonRpcClient = new JSONRPCClient(
      (payload) => sendPayloadToWebSocket(this.ws, payload),
      this.createNextRequestId,
    );
    this.jsonRpcClientServer = new JSONRPCServerAndClient(this.jsonRpcServer, this.jsonRpcClient, {
      errorListener: RpcClient.handleError,
    });
  }

  private static handleError(message: string, data: unknown): void {
    logger.error(`${message}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  }

  async connect(localEventHandler: EventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(async () => {
      // TODO(PT-4495): `true` here means "already connected", the opposite answer the other two
      // IRpcHandler implementations give for the same condition.
      if (this.connectionStatus === ConnectionStatus.Connected) return true;
      if (this.ws) {
        logger.warn('Client connect() called when websocket exists but not connected');
        return false;
      }

      // Locally process incoming events from other parts of the network
      this.jsonRpcServer.applyMiddleware(
        async (next: JSONRPCServerMiddlewareNext<void>, request: JSONRPCRequest) => {
          if (!request.id) {
            const eventData = request.params;
            if (!Array.isArray(eventData) || eventData.length !== 1)
              throw new Error(`event data for ${request.method} not wrapped in array`);
            localEventHandler(request.method, eventData[0]);
          }
          return next(request);
        },
      );

      try {
        this.connectionStatus = ConnectionStatus.Connecting;
        this.ws = await createWebSocket(`ws://localhost:${WEBSOCKET_PORT}`);

        // Created per connect() call rather than once per instance: an AsyncVariable is single-use,
        // and its timeout would otherwise start counting from construction instead of from the
        // attempt. Note this does NOT make the object reconnectable — `applyMiddleware` above
        // composes onto the existing chain with no way to remove it, so a second connect() would
        // double-deliver every network event. Reconnect support would have to fix that first.
        // Created only once there is a socket to wait on, and so only on a path that goes on to
        // await it: an AsyncVariable nobody awaits still rejects when its timeout expires, and that
        // rejection would be unhandled.
        const connectionComplete = new AsyncVariable<void>('websocket connected');
        this.connectionComplete = connectionComplete;
        this.addEventListenersToWebSocket();

        // Wait for the socket to finish connecting before continuing. 0 is CONNECTING, and the
        // listeners just attached will settle the attempt. Only 1 (OPEN) is already connected —
        // treating CLOSING/CLOSED as connected would report success on a dead socket, and every
        // later send would be dropped until the caller's own request timeout expired.
        if (this.ws.readyState === 1) connectionComplete.resolveToValue();
        else if (this.ws.readyState !== 0)
          this.failConnectionAttempt(
            `The web socket was already closing or closed (readyState ${this.ws.readyState})`,
          );
        await connectionComplete.promise;

        this.connectionStatus = ConnectionStatus.Connected;
        logger.info(`Websocket connected to ${this.ws.url}`);
      } catch (error) {
        // An AsyncVariable rejects with a plain string reason; passing that through
        // `getErrorMessage` would JSON-quote and escape the diagnostic rather than print it.
        const reason = typeof error === 'string' ? error : getErrorMessage(error);
        RpcClient.handleError('RPC client connection error', reason);
        // Close before dropping the reference. A socket still connecting would otherwise complete
        // unattended, and main would build an RpcServer for a client that will never respond.
        this.ws?.close();
        this.removeEventListenersFromWebSocket();
        this.connectionStatus = ConnectionStatus.Disconnected;
        this.ws = undefined;
        return false;
      } finally {
        this.connectionComplete = undefined;
      }

      return true;
    });
  }

  async disconnect(): Promise<void> {
    return this.connectionMutex.runExclusive(async () => {
      if (this.connectionStatus === ConnectionStatus.Disconnected) return;
      if (this.connectionStatus === ConnectionStatus.Connecting) {
        logger.warn(`Cannot disconnect client websocket while connecting`);
        return;
      }
      if (!this.ws) {
        logger.warn(`Client connected but websocket is not set`);
        return;
      }
      logger.info(`Websocket disconnecting from ${this.ws.url}`);
      this.ws.close();
    });
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
  ): Promise<JSONRPCResponse> {
    const newRequest = createRequest(requestType, requestParams, this.createNextRequestId());
    // Need to use null since it's part of the API
    // eslint-disable-next-line no-null/no-null
    let response: JSONRPCResponse | null = null;
    const isLocal = this.jsonRpcServer.hasMethod(requestType);
    if (isLocal) response = await this.jsonRpcServer.receive(newRequest);
    else response = await this.jsonRpcClient.requestAdvanced(newRequest);
    if (response) return response;
    return createErrorResponse(
      `No response from ${isLocal ? 'local' : 'remote'} RPC server`,
      JSONRPCErrorCode.InternalError,
    );
  }

  // Outgoing events from this client to the rest of the network
  emitEventOnNetwork<T>(eventType: string, event: T): void {
    this.jsonRpcClient.notify(eventType, [event]);
  }

  async registerMethod(
    methodName: string,
    method: InternalRequestHandler,
    methodDocs?: SingleMethodDocumentation,
  ): Promise<boolean> {
    if (this.jsonRpcServer.hasMethod(methodName)) {
      logger.warn(`RPC method ${methodName} already registered`);
      return false;
    }
    const mutex = this.registrationMutexMap.get(methodName);
    return mutex.runExclusive(async () => {
      if (this.jsonRpcServer.hasMethod(methodName)) {
        logger.warn(`RPC method ${methodName} already registered`);
        return false;
      }
      const success = await this.jsonRpcClient.request(REGISTER_METHOD, [methodName, methodDocs]);
      if (success)
        this.jsonRpcServer.addMethod(methodName, (params: RequestParams) => method(...params));
      return success;
    });
  }

  async unregisterMethod(methodName: string): Promise<boolean> {
    if (!this.jsonRpcServer.hasMethod(methodName)) {
      logger.warn(`Cannot unregister RPC method ${methodName}: not locally registered`);
      return false;
    }
    const mutex = this.registrationMutexMap.get(methodName);
    return mutex.runExclusive(async () => {
      if (!this.jsonRpcServer.hasMethod(methodName)) {
        logger.warn(`Cannot unregister RPC method ${methodName}: not locally registered`);
        return false;
      }
      const successful = await this.jsonRpcClient.request(UNREGISTER_METHOD, [methodName]);
      if (successful) this.jsonRpcServer.removeMethod(methodName);
      else logger.warn(`Remote failed to unregister RPC method ${methodName}`);
      return successful;
    });
  }

  async registerEvent(
    eventName: string,
    documentation?: SingleNotificationDocumentation,
  ): Promise<boolean> {
    const mutex = this.registrationMutexMap.get(eventName);
    return mutex.runExclusive(async () => {
      const success = await this.jsonRpcClient.request(REGISTER_EVENT, [eventName, documentation]);
      return success;
    });
  }

  async unregisterEvent(eventName: string): Promise<boolean> {
    const mutex = this.registrationMutexMap.get(eventName);
    return mutex.runExclusive(async () => {
      const successful = await this.jsonRpcClient.request(UNREGISTER_EVENT, [eventName]);
      return successful;
    });
  }

  private createNextRequestId(): number {
    const retVal = this.requestId;
    this.requestId += 1;
    return retVal;
  }

  private addEventListenersToWebSocket() {
    if (this.ws) {
      this.ws.addEventListener('close', this.onWebSocketClose);
      this.ws.addEventListener('error', this.onError);
      this.ws.addEventListener('message', this.onMessageReceivedByWebSocket);
      this.ws.addEventListener('open', this.onWebSocketOpen);
    }
  }

  private removeEventListenersFromWebSocket() {
    if (this.ws) {
      this.ws.removeEventListener('close', this.onWebSocketClose);
      this.ws.removeEventListener('error', this.onError);
      this.ws.removeEventListener('message', this.onMessageReceivedByWebSocket);
      this.ws.removeEventListener('open', this.onWebSocketOpen);
      this.ws = undefined;
    }
  }

  /**
   * Settles the in-flight connection attempt as failed so {@link RpcClient.connect} stops waiting
   * immediately rather than running out the {@link AsyncVariable} timeout. Without this, a
   * connection refused because main is not yet accepting would stall the process for the full
   * timeout before reporting the failure.
   */
  private failConnectionAttempt(reason: string): void {
    // `rejectWithReason` is already a no-op once settled, but it logs a debug line when it declines.
    // A refusal fires `error` then `close`, so both handlers land here on every failed attempt; the
    // guard keeps the second one from adding noise to the log this path exists to make readable.
    if (this.connectionComplete && !this.connectionComplete.hasSettled)
      this.connectionComplete.rejectWithReason(reason);
  }

  private onError(ev: Event): void {
    const description = describeWebSocketError(ev);
    // The socket context is the floor: a browser `error` event carries no cause of its own, so
    // without this the renderer's log says nothing at all.
    const context = `url=${this.ws?.url ?? 'unknown'} readyState=${this.ws?.readyState ?? 'unknown'}`;
    const detail = description ? `${description} ${context}` : context;
    RpcClient.handleError('Client websocket error event occurred', detail);
    // Carry the cause into the rejection too, so connect()'s own failure log records it as well.
    this.failConnectionAttempt(`Websocket reported an error event: ${detail}`);
  }

  private onWebSocketOpen(): void {
    this.connectionComplete?.resolveToValue();
  }

  private onWebSocketClose(): void {
    this.jsonRpcClientServer.rejectAllPendingRequests('The web socket has closed');
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
    // A close arriving before `open` means this attempt never connected, so settle the waiter now
    // instead of leaving it to time out.
    this.failConnectionAttempt('The web socket closed before connecting');
  }

  private async onMessageReceivedByWebSocket(ev: MessageEvent) {
    try {
      await this.jsonRpcClientServer.receiveAndSend(deserializeMessage(ev.data));
    } catch (error) {
      RpcClient.handleError(`Error processing message "${JSON.stringify(ev.data)}"`, error);
    }
  }
}

export default RpcClient;

/**
 * Describes a websocket `error` event for the log.
 *
 * `ws` delivers failures through its own `ErrorEvent`, which keeps the underlying error behind a
 * symbol exposed by a prototype getter (node_modules/ws/lib/event-target.js). `JSON.stringify`
 * therefore renders the entire event as `{}`, leaving no error code and forcing the cause to be
 * inferred from timestamps. Unwrap the nested error and report its system fields instead.
 *
 * Only the Node/`ws` half carries those fields: the renderer's socket is the browser `WebSocket`,
 * whose `error` event is a bare `Event` by spec, so the caller supplies the socket context that
 * keeps that path's log useful.
 *
 * `RpcServer.onWebSocketError` unwraps the same event shape for main's end of the socket. The two
 * are deliberately separate internals rather than one shared export: the only home reachable from
 * both would put a logging helper on a published API surface. They report different fields — the
 * server end logs a stack, this end the system fields a failed connect carries — so they are twins
 * in shape only, not copies to keep identical.
 */
function describeWebSocketError(event: unknown): string {
  // The truthiness check both excludes null and narrows `value` to `object` for Reflect.get, which
  // reads through the prototype accessors that JSON.stringify cannot see.
  const readProperty = (value: unknown, key: string): unknown =>
    typeof value === 'object' && value ? Reflect.get(value, key) : undefined;

  const nested = readProperty(event, 'error');
  const cause = nested ?? event;

  // `getErrorMessage` falls back to `JSON.stringify`, which renders a bare browser `Event` as `{}`
  // (`{"isTrusted":false}` in Chrome) — noise in front of the socket context that is the renderer's
  // only diagnostic. Report a message only when the cause carries one.
  const message = typeof readProperty(cause, 'message') === 'string' ? getErrorMessage(cause) : '';
  const details = message ? [message] : [];
  ['code', 'errno', 'syscall', 'address', 'port'].forEach((key) => {
    const value = readProperty(cause, key);
    // Nullish rather than truthy, so a legitimate 0 or '' is still reported. Spelled through `??`
    // to test for null without naming it, which `no-null/no-null` forbids.
    if ((value ?? undefined) !== undefined) details.push(`${key}=${String(value)}`);
  });
  return details.join(' ');
}
