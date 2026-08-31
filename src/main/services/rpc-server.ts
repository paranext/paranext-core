import {
  isJSONRPCRequest,
  isJSONRPCRequests,
  isJSONRPCResponse,
  isJSONRPCResponses,
  JSONRPCClient,
  JSONRPCErrorCode,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCServer,
} from 'json-rpc-2.0';
import { logger } from '@shared/services/logger.service';
import {
  IRpcEventRegistry,
  IRpcHandler,
  RegisteredRpcMethodDetails,
} from '@shared/models/rpc.interface';
import { isAppShuttingDown } from '@main/services/shutdown-latch.service';
import {
  ANNOUNCE_PEER,
  ConnectionStatus,
  createErrorResponse,
  createRequest,
  createSuccessResponse,
  deserializeMessage,
  describeWebSocketCloseEvent,
  describeWebSocketErrorEvent,
  INTENTIONAL_CLOSE_CODE,
  InternalRequestHandler,
  isCleanCloseEvent,
  REGISTER_EVENT,
  REGISTER_METHOD,
  RequestParams,
  requestWithRetry,
  sendPayloadToWebSocket,
  UNREGISTER_EVENT,
  UNREGISTER_METHOD,
} from '@shared/data/rpc.model';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import {
  SingleMethodDocumentation,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';
import { getErrorMessage } from 'platform-bible-utils';

type PropagateEventMethod = <T>(source: RpcServer, eventType: string, event: T) => void;

/** Called by an RpcServer with the method names its client's departure removed from the registry */
type AnnounceClientDisconnectMethod = (removedMethodNames: string[]) => void;

/**
 * Manages the JSON-RPC protocol on the server end of a websocket owned by main. This class is not
 * intended to be instantiated by anything other than RpcWebSocketListener.
 *
 * Created by RpcWebSocketListener when a client connects to the web socket server. There is one
 * RpcServer object per client that connects to the web socket server.
 */
export class RpcServer implements IRpcHandler {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  /**
   * Whether {@link onWebSocketClose} has already run for the current socket.
   *
   * A closed socket's listener is already removed, but a caller holding a stale reference to the
   * bound handler could still invoke it directly; this makes a second call a no-op rather than
   * double-logging and re-running teardown. Deliberately its own field rather than a read of
   * `connectionStatus`, which is public and mutable: keyed off that, the natural future edit of
   * setting `Disconnected` in `disconnect()` would skip teardown for the close that follows and
   * permanently leak everything the socket had registered.
   */
  private hasCompletedTeardown = false;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  /** Only used for logging to differentiate from other RpcServer objects */
  private readonly name: string;
  /**
   * How the peer on the other end of this socket labels itself in its own logs, once it has said so
   * (see {@link ANNOUNCE_PEER}). Undefined until then, and for a peer that never announces — the
   * .NET data provider does not.
   */
  private peerName: string | undefined;
  /** Refers to the main process */
  private readonly jsonRpcServer: JSONRPCServer;
  /** Refers to any process that connected to main over the websocket */
  private readonly jsonRpcClient: JSONRPCClient;
  private readonly rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>;
  private readonly rpcEventDetailsByEventName: IRpcEventRegistry;
  /** Called by an RpcServer when all other RpcServers should emit an event over the network */
  private readonly propagateEventMethod: PropagateEventMethod;
  /** Called by an RpcServer once its client's methods have been removed from the registry */
  private readonly announceClientDisconnectMethod: AnnounceClientDisconnectMethod;

  constructor(
    name: string,
    webSocket: WebSocket,
    propagateEventMethod: PropagateEventMethod,
    rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>,
    rpcEventDetailsByEventName: IRpcEventRegistry,
    announceClientDisconnectMethod: AnnounceClientDisconnectMethod,
  ) {
    bindClassMethods.call(this);
    this.name = name;
    this.ws = webSocket;
    this.propagateEventMethod = propagateEventMethod;
    this.announceClientDisconnectMethod = announceClientDisconnectMethod;

    // Uncomment the following to log every message sent
    /*
    const originalSend = this.ws.send;
    this.ws.send = (data) => {
      logger.warn(`Sending message on ${this.name}: ${data}`);
      originalSend.call(this.ws, data);
    };
    */

    this.jsonRpcServer = new JSONRPCServer();
    this.jsonRpcClient = new JSONRPCClient(
      (payload) => sendPayloadToWebSocket(this.ws, payload),
      this.createNextRequestId,
    );
    this.rpcMethodDetailsByMethodName = rpcMethodDetailsByMethodName;
    this.rpcEventDetailsByEventName = rpcEventDetailsByEventName;

    this.addMethodToRpcServer(REGISTER_METHOD, this.registerRemoteMethod);
    this.addMethodToRpcServer(UNREGISTER_METHOD, this.unregisterRemoteMethod);
    this.addMethodToRpcServer(REGISTER_EVENT, this.registerRemoteEvent);
    this.addMethodToRpcServer(UNREGISTER_EVENT, this.unregisterRemoteEvent);
    this.addMethodToRpcServer(ANNOUNCE_PEER, this.setPeerName);
  }

  async connect(): Promise<boolean> {
    if (this.connectionStatus === ConnectionStatus.Connected) return false;
    this.hasCompletedTeardown = false;
    this.addEventListenersToWebSocket();
    this.connectionStatus = ConnectionStatus.Connected;
    return true;
  }

  // TODO(PT-4435): Nothing calls this. `RpcWebSocketListener.disconnect()` closes the WebSocket
  // server without iterating its `RpcServer`s, so live client sockets are never closed and
  // `IRpcHandler.disconnect`'s documented "on servers: disconnects from all clients" is unmet —
  // which is also why `INTENTIONAL_CLOSE_CODE` never leaves main. Fixing it means changing what
  // shutdown does to live sockets, so it belongs with the reconnect/teardown work rather than in a
  // diagnosis-only change.
  async disconnect(): Promise<void> {
    if (this.connectionStatus === ConnectionStatus.Disconnected) return;
    if (!this.ws) {
      logger.warn(`Server connected but websocket is not set`);
      return;
    }
    this.ws.close(INTENTIONAL_CLOSE_CODE, 'server shutdown');
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    skipRetry = false,
  ): Promise<JSONRPCResponse> {
    const doRequest = async () => {
      const requestId = this.createNextRequestId();
      const requestToSend = createRequest(requestType, requestParams, requestId);
      // Need to use null since it's part of the API
      // eslint-disable-next-line no-null/no-null
      let response: JSONRPCResponse | null = null;
      const isLocal = this.jsonRpcServer.hasMethod(requestType);
      if (isLocal) response = await this.jsonRpcServer.receive(requestToSend);
      else {
        const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
        if (!methodDetails)
          return createErrorResponse(
            `'${requestType}' not found`,
            JSONRPCErrorCode.MethodNotFound,
            requestId,
          );
        const { handler } = methodDetails;
        if (handler === this) response = await this.jsonRpcClient.requestAdvanced(requestToSend);
        else return handler.request(requestType, requestParams, skipRetry);
      }
      if (response) return response;
      return createErrorResponse(
        `No response from ${isLocal ? 'local' : 'remote'} RPC server`,
        JSONRPCErrorCode.InternalError,
        requestId,
      );
    };
    return skipRetry ? doRequest() : requestWithRetry(doRequest, this.name, requestType);
  }

  // Outgoing event from this server to the client it is connected to
  emitEventOnNetwork<T>(eventType: string, event: T): void {
    // Wrap notify so any synchronous throw inside the JSON-RPC client / underlying
    // WebSocket cannot bubble up as an uncaught exception when the peer socket is
    // half-closed. See D-010.
    try {
      this.jsonRpcClient.notify(eventType, [event]);
    } catch (error) {
      logger.warn(
        `RpcServer ${this.name}: notify('${eventType}') threw; dropping. ${getErrorMessage(error)}`,
      );
    }
  }

  registerRemoteMethod(methodName: string, methodDocs?: SingleMethodDocumentation): boolean {
    if (this.rpcMethodDetailsByMethodName.has(methodName)) return false;
    this.rpcMethodDetailsByMethodName.set(methodName, { handler: this, methodDocs });
    return true;
  }

  unregisterRemoteMethod(methodName: string): boolean {
    // Don't allow one client to tell us to unregister a method from a different client
    const methodDetails = this.rpcMethodDetailsByMethodName.get(methodName);
    const handlersMatch = !!methodDetails && methodDetails.handler === this;
    if (handlersMatch) this.rpcMethodDetailsByMethodName.delete(methodName);
    return handlersMatch;
  }

  registerRemoteEvent(eventName: string, documentation?: SingleNotificationDocumentation): boolean {
    return this.rpcEventDetailsByEventName.tryRegister(this, eventName, documentation);
  }

  unregisterRemoteEvent(eventName: string): boolean {
    return this.rpcEventDetailsByEventName.tryUnregister(this, eventName);
  }

  /**
   * Record how the peer on the other end labels itself, so this socket's log lines can be joined to
   * that process's own. Called remotely by a connecting client; see {@link ANNOUNCE_PEER}.
   *
   * @param peerName The peer's label for itself
   * @returns Whether a usable label was recorded
   */
  setPeerName(peerName: string): boolean {
    if (typeof peerName !== 'string') return false;
    // Peer-supplied text going straight into log lines, so allowlist rather than sanitize: the
    // label a client generates is `<processType>#<discriminator>`, and nothing outside that shape
    // belongs in a log line at all.
    const safePeerName = peerName.replace(/[^\w#.:-]/g, '').slice(0, 60);
    if (!safePeerName) return false;
    this.peerName = safePeerName;
    logger.info(`Websocket ${this.name} is ${safePeerName}`);
    return true;
  }

  private createNextRequestId(): number {
    const retVal = this.requestId;
    this.requestId += 1;
    return retVal;
  }

  private addMethodToRpcServer(methodName: string, method: InternalRequestHandler) {
    this.jsonRpcServer.addMethod(methodName, (params: RequestParams) => method(...params));
  }

  private handleError(message: string, data: unknown): void {
    logger.error(
      `Websocket ${this.describePeer()} ${message}: ${typeof data === 'string' ? data : JSON.stringify(data)}`,
    );
  }

  /**
   * How to name this socket in a log line: main's own incrementing id, plus the peer's self-applied
   * label once it has announced one. Both halves are needed — the id is what main's other lines
   * use, and the label is the only thing that ties a line here to the same disconnect as reported
   * by the process that owns the other end.
   */
  private describePeer(): string {
    return this.peerName ? `${this.name} (${this.peerName})` : this.name;
  }

  private addEventListenersToWebSocket() {
    if (this.ws) {
      this.ws.addEventListener('close', this.onWebSocketClose);
      this.ws.addEventListener('error', this.onWebSocketError);
      this.ws.addEventListener('message', this.onMessageReceivedByWebSocket);
    }
  }

  private removeEventListenersFromWebSocket() {
    if (this.ws) {
      this.ws.removeEventListener('close', this.onWebSocketClose);
      this.ws.removeEventListener('error', this.onWebSocketError);
      this.ws.removeEventListener('message', this.onMessageReceivedByWebSocket);
      this.ws = undefined;
    }
  }

  private onWebSocketClose(ev: CloseEvent): void {
    if (this.hasCompletedTeardown) return;
    this.hasCompletedTeardown = true;

    this.jsonRpcClient.rejectAllPendingRequests(`Web socket ${this.name} has closed`);
    const detail = describeWebSocketCloseEvent(ev);
    const isClean = isCleanCloseEvent(ev);
    // A close with no completed handshake is the fingerprint this ticket exists to make greppable —
    // but on the way down it is also the ordinary case, not a fault. Main's server is still
    // listening while the extension host calls `process.exit()` and each renderer process is torn
    // down, so every peer's socket dies with 1006 on a normal quit. Reporting those at `warn` would
    // fire on every shutdown and bury the signal under the routine.
    const diedDuringShutdown = !isClean && isAppShuttingDown();
    const shutdownNote = diedDuringShutdown ? ', expected during app shutdown' : '';
    // No method count here on purpose: the number that belongs on a close line is what this socket
    // actually took with it, and that is only known once the removal loop below has run — which
    // logs it.
    const summary = `Websocket ${this.describePeer()} closed (${detail}${shutdownNote})`;
    if (isClean || diedDuringShutdown) logger.info(summary);
    else logger.warn(summary);
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
    const removedMethodNames: string[] = [];
    this.rpcMethodDetailsByMethodName.forEach(({ handler }, methodName) => {
      if (handler !== this) return;

      logger.debug(`Method '${methodName}' removed since websocket ${this.name} closed`);
      this.rpcMethodDetailsByMethodName.delete(methodName);
      removedMethodNames.push(methodName);
    });
    // The registry is shared by every connected process, so count what this socket actually took
    // with it rather than what is in the registry
    logger.info(
      `Websocket ${this.describePeer()} closed. Removed ${removedMethodNames.length} methods`,
    );
    this.rpcEventDetailsByEventName.unregisterAll(this);
    // Announced only after the registry no longer holds any of this client's methods, so a
    // subscriber acting on the news can never be told about a death that has not happened yet. That
    // ordering is why the announcement exists here at all: it is derived from the teardown rather
    // than from a message the departing process sent before it, which can outrun its own socket.
    //
    // A second ordering makes the announcement safe to act on blindly, and it is load-bearing: the
    // disposal names an object by id, and whoever receives it drops whatever it holds under that id
    // without checking whether that is still the registration the announcement was about. What rules
    // out dropping a NEWER registration is that this announcement's `ws.send` reaches every surviving
    // socket before any registration request that arrives after this teardown can be answered on the
    // same socket — the announcement path from here to the send awaits nothing real (an
    // already-resolved initialize at most), and a process only records a local registration once its
    // register request has been answered. Introduce a genuine `await` anywhere between here and the
    // send and a re-registration can slip in front of the disposal, which will then revoke it.
    this.announceClientDisconnectMethod(removedMethodNames);
  }

  private onWebSocketError(ev: Event): void {
    const detail = describeWebSocketErrorEvent(ev);
    this.handleError('Server websocket error event occurred', detail);
  }

  private async onMessageReceivedByWebSocket(ev: MessageEvent) {
    try {
      // Uncomment the following line to log every message received
      // logger.warn(`Received message on ${this.name}: ${ev.data}`);
      this.processMessage(deserializeMessage(ev.data));
    } catch (error) {
      this.handleError(
        `Error processing JSONRPC message (${ev.data}): ${getErrorMessage(error)}`,
        error,
      );
    }
  }

  private async processMessage(message: unknown) {
    if (isJSONRPCResponse(message) || isJSONRPCResponses(message)) {
      this.jsonRpcClient.receive(message);
    } else if (isJSONRPCRequest(message) || isJSONRPCRequests(message)) {
      const requests: JSONRPCRequest[] = isJSONRPCRequest(message) ? [message] : message;
      const promises = requests.map(async (request) => {
        try {
          // Repeat events to the whole network
          if (!request.id) {
            this.propagateEventMethod(this, request.method, request.params);
            return;
          }
          const response = await this.request(
            // Assert the required type
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            request.method as SerializedRequestType,
            request.params,
          );
          const payload =
            'result' in response
              ? createSuccessResponse(response.result, request.id)
              : createErrorResponse(response.error.message, response.error.code, request.id);
          sendPayloadToWebSocket(this.ws, payload);
        } catch (error) {
          this.handleError(`Error handling request: ${getErrorMessage(error)}`, request);
        }
      });
      await Promise.all(promises);
    } else {
      const errorText = 'Received an invalid JSON-RPC message';
      this.handleError(errorText, message);
      const id =
        typeof message === 'object' && message && 'id' in message ? JSON.stringify(message.id) : 0;
      const failure = createErrorResponse(errorText, JSONRPCErrorCode.ParseError, id);
      sendPayloadToWebSocket(this.ws, failure);
    }
  }
}

export default RpcServer;
