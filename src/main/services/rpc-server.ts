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
import logger from '@shared/services/logger.service';
import { IRpcHandler } from '@shared/models/rpc.interface';
import {
  ConnectionStatus,
  createErrorResponse,
  createRequest,
  createSuccessResponse,
  deserializeMessage,
  InternalRequestHandler,
  REGISTER_METHOD,
  RequestParams,
  requestWithRetry,
  sendPayloadToWebSocket,
  UNREGISTER_METHOD,
} from '@shared/data/rpc.model';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';

type PropagateEventMethod = <T>(source: RpcServer, eventType: string, event: T) => void;

/**
 * Manages the JSON-RPC protocol on the server end of a websocket owned by main. This class is not
 * intended to be instantiated by anything other than RpcWebSocketListener.
 *
 * Created by RpcWebSocketListener when a client connects to the web socket server. There is one
 * RpcServer object per client that connects to the web socket server.
 */
export default class RpcServer implements IRpcHandler {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  /** Only used for logging to differentiate from other RpcServer objects */
  private readonly name: string;
  /** Refers to the main process */
  private readonly jsonRpcServer: JSONRPCServer;
  /** Refers to any process that connected to main over the websocket */
  private readonly jsonRpcClient: JSONRPCClient;
  private readonly rpcHandlerByMethodName: Map<string, IRpcHandler>;
  /** Called by an RpcServer when all other RpcServers should emit an event over the network */
  private readonly propagateEventMethod: PropagateEventMethod;

  constructor(
    name: string,
    webSocket: WebSocket,
    propagateEventMethod: PropagateEventMethod,
    rpcHandlerByMethodName: Map<string, IRpcHandler>,
  ) {
    bindClassMethods.call(this);
    this.name = name;
    this.ws = webSocket;
    this.propagateEventMethod = propagateEventMethod;

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
    this.rpcHandlerByMethodName = rpcHandlerByMethodName;

    this.addMethodToRpcServer(REGISTER_METHOD, this.registerRemoteMethod);
    this.addMethodToRpcServer(UNREGISTER_METHOD, this.unregisterRemoteMethod);
  }

  async connect(): Promise<boolean> {
    if (this.connectionStatus === ConnectionStatus.Connected) return false;
    this.addEventListenersToWebSocket();
    this.connectionStatus = ConnectionStatus.Connected;
    return true;
  }

  async disconnect(): Promise<void> {
    if (this.connectionStatus === ConnectionStatus.Disconnected) return;
    if (!this.ws) {
      logger.warn(`Server connected but websocket is not set`);
      return;
    }
    this.ws.close();
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
  ): Promise<JSONRPCResponse> {
    return requestWithRetry(
      async () => {
        const requestId = this.createNextRequestId();
        const requestToSend = createRequest(requestType, requestParams, requestId);
        // Need to use null since it's part of the API
        // eslint-disable-next-line no-null/no-null
        let response: JSONRPCResponse | null = null;
        const isLocal = this.jsonRpcServer.hasMethod(requestType);
        if (isLocal) response = await this.jsonRpcServer.receive(requestToSend);
        else {
          const handler = this.rpcHandlerByMethodName.get(requestType);
          if (handler === this) response = await this.jsonRpcClient.requestAdvanced(requestToSend);
          else if (!handler)
            return createErrorResponse(
              `'${requestType}' not found`,
              JSONRPCErrorCode.MethodNotFound,
              requestId,
            );
          else return handler.request(requestType, requestParams);
        }
        if (response) return response;
        return createErrorResponse(
          `No response from ${isLocal ? 'local' : 'remote'} RPC server`,
          JSONRPCErrorCode.InternalError,
          requestId,
        );
      },
      this.name,
      requestType,
    );
  }

  // Outgoing event from this server to the client it is connected to
  emitEventOnNetwork<T>(eventType: string, event: T): void {
    this.jsonRpcClient.notify(eventType, [event]);
  }

  registerRemoteMethod(methodName: string): boolean {
    if (this.rpcHandlerByMethodName.has(methodName)) return false;
    this.rpcHandlerByMethodName.set(methodName, this);
    return true;
  }

  unregisterRemoteMethod(methodName: string): boolean {
    // Don't allow one client to tell us to unregister a method from a different client
    const registeredHandler = this.rpcHandlerByMethodName.get(methodName);
    const handlersMatch = registeredHandler === this;
    if (handlersMatch) this.rpcHandlerByMethodName.delete(methodName);
    return handlersMatch;
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
      `Websocket ${this.name} ${message}: ${typeof data === 'string' ? data : JSON.stringify(data)}`,
    );
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

  private onWebSocketClose(): void {
    this.jsonRpcClient.rejectAllPendingRequests(`Web socket ${this.name} has closed`);
    this.removeEventListenersFromWebSocket();
    this.connectionStatus = ConnectionStatus.Disconnected;
    this.rpcHandlerByMethodName.forEach((handler, methodName) => {
      logger.info(`Method '${methodName}' removed since websocket ${this.name} closed`);
      if (handler === this) this.rpcHandlerByMethodName.delete(methodName);
    });
  }

  private onWebSocketError(ev: Event): void {
    this.handleError('Server websocket error event occurred', ev);
  }

  private async onMessageReceivedByWebSocket(ev: MessageEvent) {
    try {
      // Uncomment the following line to log every message received
      // logger.warn(`Received message on ${this.name}: ${ev.data}`);
      this.processMessage(deserializeMessage(ev.data));
    } catch (error) {
      this.handleError(
        `Error processing JSONRPC message (${ev.data}): ${JSON.stringify(error)}`,
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
          this.handleError(`Error handling request: ${JSON.stringify(error)}`, request);
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
