import {
  isJSONRPCRequest,
  isJSONRPCRequests,
  isJSONRPCResponse,
  isJSONRPCResponses,
  JSONRPC,
  JSONRPCClient,
  JSONRPCErrorCode,
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCServer,
  JSONRPCServerMiddlewareNext,
} from 'json-rpc-2.0';
import logger from '@shared/services/logger.service';
import INetworkProtocolHandler from '@shared/services/network-protocol-handler.interface';
import {
  ConnectionStatus,
  InternalNetworkEventHandler,
  InternalEvent,
  createErrorResponse,
  createSuccessResponse,
  CallerData,
  RequestParams,
  createRequest,
  REGISTER_METHOD,
  UNREGISTER_METHOD,
  InternalRequestHandler,
} from '@shared/data/internal-connection.model';
import { SerializedRequestType } from '@shared/utils/util';

/** Single websocket protocol handler on the "main" side of a client connection */
export default class ServerWebSocketProtocolHandler implements INetworkProtocolHandler {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  private readonly rpcServer: JSONRPCServer<CallerData>;
  private readonly rpcClient: JSONRPCClient<void>;
  private readonly protocolHandlerByMethodName: Map<string, INetworkProtocolHandler>;

  constructor(
    webSocket: WebSocket,
    protocolHandlerByMethodName: Map<string, INetworkProtocolHandler>,
  ) {
    this.bindMethods();
    this.ws = webSocket;

    // Log every message sent
    const originalSend = this.ws.send;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ws.send = (data: any) => {
      logger.warn(`Sending message: ${data}`);
      originalSend.call(this.ws, data);
    };

    this.rpcServer = new JSONRPCServer();
    this.rpcClient = new JSONRPCClient(this.sendRequestFunction);
    this.protocolHandlerByMethodName = protocolHandlerByMethodName;

    this.rpcServer.addMethod(REGISTER_METHOD, this.registerRemoteMethod);
    this.rpcServer.addMethod(UNREGISTER_METHOD, this.unregisterRemoteMethod);
  }

  get nextRequestId(): number {
    const retVal = this.requestId;
    this.requestId += 1;
    return retVal;
  }

  private static handleError(message: string, data: unknown): void {
    logger.error(`${message}: ${JSON.stringify(data)}`);
  }

  private static onError(ev: Event): void {
    ServerWebSocketProtocolHandler.handleError('Server websocket error event occurred', ev);
  }

  connectSync(localEventHandler: InternalNetworkEventHandler): void {
    if (this.connectionStatus === ConnectionStatus.Connected) return;
    this.addEventListenersToWebSocket();
    this.connectionStatus = ConnectionStatus.Connected;

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
  }

  async connect(localEventHandler: InternalNetworkEventHandler): Promise<boolean> {
    this.connectSync(localEventHandler);
    return true;
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
    this.ws.close();
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    serverParams?: CallerData,
  ): Promise<JSONRPCResponse> {
    const requestId = this.nextRequestId;
    const requestToSend = createRequest(requestId, requestType, requestParams);
    // Need to use null since it's part of the API
    // eslint-disable-next-line no-null/no-null
    let response: JSONRPCResponse | null = null;
    const isLocal = this.rpcServer.hasMethod(requestType);
    if (isLocal) response = await this.rpcServer.receive(requestToSend);
    else {
      const handler = this.protocolHandlerByMethodName.get(requestType);
      if (handler === this) response = await this.rpcClient.requestAdvanced(requestToSend);
      else if (!handler)
        return createErrorResponse(
          requestId,
          `'${requestType}' not found`,
          JSONRPCErrorCode.MethodNotFound,
        );
      else return handler.request(requestType, requestParams, serverParams);
    }

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

  registerRemoteMethod(methodName: string): boolean {
    if (this.protocolHandlerByMethodName.has(methodName)) return false;
    this.protocolHandlerByMethodName.set(methodName, this);
    return true;
  }

  unregisterRemoteMethod(methodName: string): boolean {
    // Don't allow one client to tell us to unregister a method from a different client
    const registeredHandler = this.protocolHandlerByMethodName.get(methodName);
    const handlersMatch = registeredHandler === this;
    if (handlersMatch) this.protocolHandlerByMethodName.delete(methodName);
    return handlersMatch;
  }

  // Required for IProtocolHandler, but all register/unregister calls for the server should come
  // over the web socket, not from local API calls.
  /* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
  async registerMethod(_methodName: string, _method: InternalRequestHandler): Promise<boolean> {
    throw new Error('No methods should be registered with this protocol handler');
  }

  async unregisterMethod(_methodName: string): Promise<boolean> {
    throw new Error('No methods should be registered with this protocol handler');
  }
  /* eslint-enable @typescript-eslint/no-unused-vars, class-methods-use-this */

  private addEventListenersToWebSocket() {
    if (this.ws) {
      this.ws.addEventListener('close', this.onClose);
      this.ws.addEventListener('error', ServerWebSocketProtocolHandler.onError);
      this.ws.addEventListener('message', this.onMessage);
    }
  }

  private removeEventListenersFromWebSocket() {
    if (this.ws) {
      this.ws.removeEventListener('close', this.onClose);
      this.ws.removeEventListener('error', ServerWebSocketProtocolHandler.onError);
      this.ws.removeEventListener('message', this.onMessage);
      this.ws = undefined;
    }
  }

  private onClose(): void {
    this.rpcClient.rejectAllPendingRequests('The web socket has closed');
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
    this.protocolHandlerByMethodName.forEach((handler, methodName) => {
      logger.info(`Method '${methodName}' removed since the websocket closed`);
      if (handler === this) this.protocolHandlerByMethodName.delete(methodName);
    });
  }

  private async onMessage(ev: MessageEvent) {
    try {
      logger.warn(`Received message: ${ev.data}`);
      this.processMessage(JSON.parse(ev.data));
    } catch (error) {
      ServerWebSocketProtocolHandler.handleError(
        `Error processing JSONRPC message (${ev.data}): ${JSON.stringify(error)}`,
        error,
      );
    }
  }

  private async processMessage(message: unknown) {
    if (isJSONRPCResponse(message) || isJSONRPCResponses(message)) {
      this.rpcClient.receive(message);
    } else if (isJSONRPCRequest(message) || isJSONRPCRequests(message)) {
      const requests: JSONRPCRequest[] = isJSONRPCRequest(message) ? [message] : message;
      const promises = requests.map(async (request) => {
        if (!request.id) return;
        const internalResponse = await this.request(
          // Assume the type matches
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          request.method as SerializedRequestType,
          request.params,
        );
        if ('result' in internalResponse)
          await this.rpcClient.send(createSuccessResponse(request.id, internalResponse.result));
        else
          await this.rpcClient.send(
            createErrorResponse(
              request.id,
              internalResponse.error.message,
              internalResponse.error.code,
            ),
          );
      });
      await Promise.all(promises);
    } else {
      const errorText = 'Received an invalid JSON-RPC message';
      ServerWebSocketProtocolHandler.handleError(errorText, message);
      const id =
        typeof message === 'object' && message && 'id' in message ? JSON.stringify(message.id) : 0;
      const failure: JSONRPCErrorResponse = {
        jsonrpc: JSONRPC,
        id,
        error: { code: JSONRPCErrorCode.ParseError, message: errorText },
      };
      this.ws?.send(JSON.stringify(failure));
    }
  }

  // Use of "any" required by the JSONRPC framework
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
