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
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';
import {
  ConnectionStatus,
  createErrorResponse,
  createRequest,
  describeWebSocketCloseEvent,
  describeWebSocketErrorEvent,
  deserializeMessage,
  EventHandler,
  INTENTIONAL_CLOSE_CODE,
  InternalRequestHandler,
  isCleanCloseEvent,
  REGISTER_EVENT,
  REGISTER_METHOD,
  RequestParams,
  sendPayloadToWebSocket,
  UNREGISTER_EVENT,
  UNREGISTER_METHOD,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { createWebSocket } from '@client/services/web-socket.factory';
import { AsyncVariable, getErrorMessage, Mutex, MutexMap } from 'platform-bible-utils';
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
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  /** Refers to the current process that created this object (i.e., not main) */
  private readonly jsonRpcServer: JSONRPCServer;
  /** Refers to main */
  private readonly jsonRpcClient: JSONRPCClient<void>;
  private readonly jsonRpcClientServer: JSONRPCServerAndClient;
  private readonly connectionMutex: Mutex = new Mutex();
  private readonly registrationMutexMap: MutexMap = new MutexMap();
  // TODO(PT-4435): `AsyncVariable` is single-shot and freezes itself once settled, so this
  // field cannot be reused across connection attempts — a second connect() resolves
  // instantly and reports Connected before the handshake finishes. Recreate it per attempt
  // (and move applyMiddleware to the constructor) before adding reconnect.
  private readonly connectionComplete = new AsyncVariable<void>('websocket connected');
  /**
   * Label identifying this process in connection log lines, so multi-window logs stay readable.
   *
   * The logger already prefixes every line with a per-process-type tag (`[rend]`/`[exth]`), so
   * `peerName` alone (e.g. plain `'renderer'`) would add nothing. Each `BrowserWindow` is its own
   * renderer process, so two windows would otherwise emit identical lines; a per-instance
   * discriminator is appended so they can be told apart.
   */
  private readonly peerName: string;

  constructor(peerName: string = 'client') {
    bindClassMethods.call(this);
    this.peerName = `${peerName}#${RpcClient.getPeerDiscriminator()}`;
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

  /**
   * A discriminator distinguishing this process from another of the same type, for the `peerName`
   * label. `process.pid` is the natural choice, differing across `BrowserWindow`s (each its own
   * renderer process). The renderer may or may not expose `process` depending on Electron's
   * `webPreferences`, so fall back to a random id rather than printing `undefined` when it doesn't
   * — two clients in the very same process will then share a pid anyway, which is expected and
   * harmless: the label still identifies the process pair, not a specific in-process instance.
   */
  private static getPeerDiscriminator(): string {
    if (typeof process !== 'undefined' && typeof process.pid === 'number') return `${process.pid}`;
    return Math.random().toString(36).slice(2, 8);
  }

  private static onError(ev: Event): void {
    RpcClient.handleError('Client websocket error event occurred', describeWebSocketErrorEvent(ev));
  }

  async connect(localEventHandler: EventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(async () => {
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
        this.addEventListenersToWebSocket();

        // Wait for the socket to finish connecting before continuing (0 means connecting)
        if (this.ws.readyState !== 0) this.connectionComplete.resolveToValue();
        await this.connectionComplete.promise;

        this.connectionStatus = ConnectionStatus.Connected;
        logger.info(`Websocket connected to ${this.ws.url}`);
      } catch (error) {
        // Log the peer and the failure text; the socket object itself carries no own
        // properties worth serializing.
        RpcClient.handleError(
          `RPC client connection error for ${this.peerName}`,
          getErrorMessage(error),
        );
        this.removeEventListenersFromWebSocket();
        this.connectionStatus = ConnectionStatus.Disconnected;
        this.ws = undefined;
        return false;
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
      logger.info(`Websocket for ${this.peerName} disconnecting from ${this.ws.url}`);
      this.ws.close(INTENTIONAL_CLOSE_CODE, 'app shutdown');
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
      this.ws.addEventListener('error', RpcClient.onError);
      this.ws.addEventListener('message', this.onMessageReceivedByWebSocket);
      this.ws.addEventListener('open', this.onWebSocketOpen);
    }
  }

  private removeEventListenersFromWebSocket() {
    if (this.ws) {
      this.ws.removeEventListener('close', this.onWebSocketClose);
      this.ws.removeEventListener('error', RpcClient.onError);
      this.ws.removeEventListener('message', this.onMessageReceivedByWebSocket);
      this.ws.removeEventListener('open', this.onWebSocketOpen);
      this.ws = undefined;
    }
  }

  private onWebSocketOpen(): void {
    this.connectionComplete.resolveToValue();
  }

  private onWebSocketClose(ev: CloseEvent): void {
    // A closed socket's listener is already removed, but a caller holding a stale reference to
    // this bound handler could still invoke it directly; guard so a second call is a no-op rather
    // than double-logging and re-running teardown.
    if (this.connectionStatus === ConnectionStatus.Disconnected) return;

    this.jsonRpcClientServer.rejectAllPendingRequests('The web socket has closed');
    const detail = describeWebSocketCloseEvent(ev);
    const summary = `Websocket for ${this.peerName} closed (${detail})`;
    // Intent travels in the close code, so a close that arrives after an intentional
    // disconnect is still reported honestly if the socket actually died.
    if (isCleanCloseEvent(ev)) logger.info(summary);
    else logger.warn(summary);
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
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
