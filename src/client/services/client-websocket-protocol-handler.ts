import { WEBSOCKET_PORT } from '@shared/data/network-connector.model';
import {
  JSONRPCClient,
  JSONRPCErrorCode,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCServer,
  JSONRPCServerAndClient,
  JSONRPCServerMiddlewareNext,
} from 'json-rpc-2.0';
import logger from '@shared/services/logger.service';
import INetworkProtocolHandler from '@shared/services/network-protocol-handler.interface';
import {
  ConnectionStatus,
  InternalNetworkEventHandler,
  InternalEvent,
  CallerData,
  createErrorResponse,
  createSuccessResponse,
  createRequest,
  RequestParams,
  InternalRequestHandler,
  REGISTER_METHOD,
  UNREGISTER_METHOD,
} from '@shared/data/internal-connection.model';
import { createWebSocket } from '@client/services/web-socket.factory';
import { AsyncVariable, Mutex, MutexMap } from 'platform-bible-utils';
import { SerializedRequestType } from '@shared/utils/util';

export default class ClientWebSocketProtocolHandler implements INetworkProtocolHandler {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  private readonly rpcServer: JSONRPCServer<CallerData>;
  private readonly rpcClient: JSONRPCClient<void>;
  private readonly rpcClientServer: JSONRPCServerAndClient<CallerData>;
  private readonly localMethods: Set<string> = new Set<string>();
  private readonly connectionMutex: Mutex = new Mutex();
  private readonly registrationMutexMap: MutexMap = new MutexMap();
  private readonly connectionComplete = new AsyncVariable<void>('websocket connected');

  constructor() {
    this.bindMethods();
    this.rpcServer = new JSONRPCServer();
    this.rpcClient = new JSONRPCClient(this.sendRequestFunction);
    this.rpcClientServer = new JSONRPCServerAndClient(this.rpcServer, this.rpcClient, {
      errorListener: ClientWebSocketProtocolHandler.handleError,
    });
  }

  get nextRequestId(): number {
    const retVal = this.requestId;
    this.requestId += 1;
    return retVal;
  }

  private static handleError(message: string, data: unknown): void {
    logger.error(`${message}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  }

  private static onError(ev: Event): void {
    ClientWebSocketProtocolHandler.handleError('Client websocket error event occurred', ev);
  }

  async connect(localEventHandler: InternalNetworkEventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(async () => {
      if (this.connectionStatus === ConnectionStatus.Connected) return true;
      if (this.ws) {
        logger.warn('Client connect() called when websocket exists but not connected');
        return false;
      }

      try {
        this.connectionStatus = ConnectionStatus.Connecting;
        this.ws = await createWebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
        this.addEventListenersToWebSocket();

        // Wait for the socket to finish connecting before continuing
        if (this.ws.readyState !== 0) this.connectionComplete.resolveToValue();
        await this.connectionComplete.promise;

        this.connectionStatus = ConnectionStatus.Connected;
        logger.info(`Websocket connected to ${this.ws.url}`);
      } catch (error) {
        ClientWebSocketProtocolHandler.handleError(
          `Client websocket could not connect: ${error}`,
          this.ws,
        );
        this.removeEventListenersFromWebSocket();
        this.connectionStatus = ConnectionStatus.Disconnected;
        return false;
      }

      // Notifications are requests without IDs
      this.rpcServer.applyMiddleware(
        async (
          next: JSONRPCServerMiddlewareNext<CallerData>,
          request: JSONRPCRequest,
          serverParams: CallerData,
        ) => {
          if (!request.id) localEventHandler(request.method, { event: request.params });
          return next(request, serverParams);
        },
      );
      return true;
    });
  }

  disconnect(): void {
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
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
  ): Promise<JSONRPCResponse> {
    const requestId = this.nextRequestId;
    const requestToSend = createRequest(requestId, requestType, requestParams);
    // Need to use null since it's part of the API
    // eslint-disable-next-line no-null/no-null
    let response: JSONRPCResponse | null = null;
    const isLocal = this.rpcServer.hasMethod(requestType);
    if (isLocal) response = await this.rpcServer.receive(requestToSend);
    else response = await this.rpcClient.requestAdvanced(requestToSend);
    if (!response)
      return createErrorResponse(
        requestId,
        `No response from ${isLocal ? 'local' : 'remote'} RPC server`,
        JSONRPCErrorCode.InternalError,
      );
    if (response.error)
      return createErrorResponse(requestId, response.error.message, response.error.code);
    return createSuccessResponse(requestId, response.result);
  }

  emitEventOnNetwork<T>(eventType: string, event: InternalEvent<T>): void {
    this.rpcClient.notify(eventType, event);
  }

  async registerMethod(methodName: string, method: InternalRequestHandler): Promise<boolean> {
    if (this.rpcServer.hasMethod(methodName)) return false;
    const mutex = this.registrationMutexMap.get(methodName);
    return mutex.runExclusive(async () => {
      if (this.rpcServer.hasMethod(methodName)) return false;
      const successful = await this.rpcClient.request(REGISTER_METHOD, { methodName });
      if (successful) {
        this.rpcServer.addMethod(methodName, method);
        this.localMethods.add(methodName);
      }
      return successful;
    });
  }

  async unregisterMethod(methodName: string): Promise<boolean> {
    if (!this.rpcServer.hasMethod(methodName)) return false;
    const mutex = this.registrationMutexMap.get(methodName);
    return mutex.runExclusive(async () => {
      if (!this.rpcServer.hasMethod(methodName)) return false;
      const successful = await this.rpcClient.request(UNREGISTER_METHOD, { methodName });
      if (successful) {
        this.rpcServer.removeMethod(methodName);
        this.localMethods.delete(methodName);
      }
      return successful;
    });
  }

  private addEventListenersToWebSocket() {
    if (this.ws) {
      this.ws.addEventListener('close', this.onClose);
      this.ws.addEventListener('error', ClientWebSocketProtocolHandler.onError);
      this.ws.addEventListener('message', this.onMessage);
      this.ws.addEventListener('open', this.onOpen);
    }
  }

  private removeEventListenersFromWebSocket() {
    if (this.ws) {
      this.ws.removeEventListener('close', this.onClose);
      this.ws.removeEventListener('error', ClientWebSocketProtocolHandler.onError);
      this.ws.removeEventListener('message', this.onMessage);
      this.ws.removeEventListener('open', this.onOpen);
      this.ws = undefined;
    }
  }

  private onOpen(): void {
    this.connectionComplete.resolveToValue();
  }

  private onClose(): void {
    this.rpcClientServer.rejectAllPendingRequests('The web socket has closed');
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
  }

  private async onMessage(ev: MessageEvent) {
    try {
      const message = JSON.parse(ev.data);
      await this.rpcClientServer.receiveAndSend(message, { origin: ev.origin }, undefined);
    } catch (error) {
      ClientWebSocketProtocolHandler.handleError(
        `Error processing message "${JSON.stringify(ev.data)}"`,
        error,
      );
    }
  }

  // This is the signature required by the framework
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sendRequestFunction(payload: any): void {
    if (!this.ws) throw new Error(`Tried to send request while not connected`);
    if (
      typeof payload === 'string' ||
      payload instanceof ArrayBuffer ||
      payload instanceof Blob ||
      ArrayBuffer.isView(payload)
    ) {
      this.ws.send(payload);
    } else {
      this.ws.send(JSON.stringify(payload));
    }
  }

  private bindMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    methods.forEach((method) => {
      // Allow indexing to work for this class
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
      const thisAsAny = this as any;
      if (typeof thisAsAny[method] === 'function') {
        thisAsAny[method] = thisAsAny[method].bind(this);
      }
    });
  }
}
