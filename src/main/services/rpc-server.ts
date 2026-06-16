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
import {
  ConnectionStatus,
  createErrorResponse,
  createRequest,
  createSuccessResponse,
  deserializeMessage,
  InternalRequestHandler,
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

/**
 * Manages the JSON-RPC protocol on the server end of a websocket owned by main. This class is not
 * intended to be instantiated by anything other than RpcWebSocketListener.
 *
 * Created by RpcWebSocketListener when a client connects to the web socket server. There is one
 * RpcServer object per client that connects to the web socket server.
 */
export class RpcServer implements IRpcHandler {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private ws: WebSocket | undefined;
  private requestId: number = 1;
  /** Only used for logging to differentiate from other RpcServer objects */
  private readonly name: string;
  /** Refers to the main process */
  private readonly jsonRpcServer: JSONRPCServer;
  /** Refers to any process that connected to main over the websocket */
  private readonly jsonRpcClient: JSONRPCClient;
  private readonly rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>;
  private readonly rpcEventDetailsByEventName: IRpcEventRegistry;
  /** Called by an RpcServer when all other RpcServers should emit an event over the network */
  private readonly propagateEventMethod: PropagateEventMethod;

  constructor(
    name: string,
    webSocket: WebSocket,
    propagateEventMethod: PropagateEventMethod,
    rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>,
    rpcEventDetailsByEventName: IRpcEventRegistry,
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
    this.rpcMethodDetailsByMethodName = rpcMethodDetailsByMethodName;
    this.rpcEventDetailsByEventName = rpcEventDetailsByEventName;

    this.addMethodToRpcServer(REGISTER_METHOD, this.registerRemoteMethod);
    this.addMethodToRpcServer(UNREGISTER_METHOD, this.unregisterRemoteMethod);
    this.addMethodToRpcServer(REGISTER_EVENT, this.registerRemoteEvent);
    this.addMethodToRpcServer(UNREGISTER_EVENT, this.unregisterRemoteEvent);
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
    logger.info(
      `Websocket ${this.name} closed. Removing ${this.rpcMethodDetailsByMethodName.size} methods`,
    );
    this.rpcMethodDetailsByMethodName.forEach(({ handler }, methodName) => {
      if (handler !== this) return;

      logger.debug(`Method '${methodName}' removed since websocket ${this.name} closed`);
      this.rpcMethodDetailsByMethodName.delete(methodName);
    });
    this.rpcEventDetailsByEventName.unregisterAll(this);
  }

  private onWebSocketError(ev: Event): void {
    // The ws `ErrorEvent` carries the real reason on `.error` / `.message`; `JSON.stringify(ev)`
    // collapses to "{}" because those properties are non-enumerable. Surface them explicitly so
    // the actual transport failure (invalid UTF-8 frame, max-payload, ECONNRESET, ...) is logged.
    // Narrow with `in`/`instanceof` (no type assertions) since `Event` does not declare these.
    let message = 'unknown';
    let code = 'n/a';
    let stack = '';
    if ('message' in ev && typeof ev.message === 'string') message = ev.message;
    if ('error' in ev && ev.error instanceof Error) {
      message = ev.error.message;
      stack = ev.error.stack ?? '';
      if ('code' in ev.error && typeof ev.error.code === 'string') code = ev.error.code;
    }
    const detail = `message=${message} code=${code}${stack ? `\nstack: ${stack}` : ''}`;
    this.handleError(`Server websocket error event occurred: ${detail}`, detail);
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
