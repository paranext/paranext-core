import {
  ConnectionStatus,
  createErrorResponse,
  createSuccessResponse,
  EventHandler,
  InternalRequestHandler,
  RequestParams,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { IRpcMethodRegistrar, IRpcHandler } from '@shared/models/rpc.interface';
import { Mutex } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';
import logger from '@shared/services/logger.service';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import RpcServer from './rpc-server';

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
export default class RpcWebSocketListener implements IRpcMethodRegistrar {
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
  private localEventHandler: EventHandler | undefined;
  private webSocketServer: WebSocketServer | undefined;
  private nextSocketNumber = 1;
  private readonly connectionMutex = new Mutex();
  private readonly rpcServerBySocket = new Map<WebSocket, RpcServer>();
  private readonly rpcHandlerByMethodName = new Map<string, IRpcHandler>();
  private readonly localMethodsByMethodName = new Map<string, InternalRequestHandler>();

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
  ): Promise<JSONRPCResponse> {
    const handler = this.rpcHandlerByMethodName.get(requestType);
    if (!handler)
      return createErrorResponse(
        `No handler found for ${requestType}`,
        JSONRPCErrorCode.MethodNotFound,
      );
    if (handler !== this) return handler.request(requestType, requestParams);
    const method = this.localMethodsByMethodName.get(requestType);
    if (!method)
      return createErrorResponse(
        `Locally registered method name missing the actual method`,
        JSONRPCErrorCode.InternalError,
      );
    try {
      const result = method(requestParams);
      const awaitedResult = result instanceof Promise ? await result : result;
      return createSuccessResponse(awaitedResult);
    } catch (error) {
      return createErrorResponse(JSON.stringify(error), JSONRPCErrorCode.InternalError);
    }
  }

  async registerMethod(methodName: string, method: InternalRequestHandler): Promise<boolean> {
    if (
      this.rpcHandlerByMethodName.has(methodName) ||
      this.localMethodsByMethodName.has(methodName)
    )
      return false;

    this.rpcHandlerByMethodName.set(methodName, this);
    this.localMethodsByMethodName.set(methodName, method);
    return true;
  }

  async unregisterMethod(methodName: string): Promise<boolean> {
    const handler = this.rpcHandlerByMethodName.get(methodName);
    if (handler !== this) return false;
    this.rpcHandlerByMethodName.delete(methodName);
    this.localMethodsByMethodName.delete(methodName);
    return true;
  }

  emitEventOnNetwork<T>(eventType: string, event: T): void {
    this.rpcServerBySocket.forEach((rpcServer) => {
      rpcServer.emitEventOnNetwork(eventType, event);
    });
  }

  // This is run by an RPCServer when it receives an event message on the websocket from a client
  private propagateEvent<T>(source: RpcServer, eventType: string, event: T): void {
    if (!this.localEventHandler) throw new Error(`localEventHandler not set`);
    if (!Array.isArray(event) || event.length !== 1) throw new Error(`event not wrapped in array`);
    this.localEventHandler(eventType, event[0]);
    this.rpcServerBySocket.forEach((rpcServer) => {
      if (rpcServer !== source) rpcServer.emitEventOnNetwork(eventType, event[0]);
    });
  }

  private onClientConnect(webSocket: WebSocket): void {
    const rpcServer = new RpcServer(
      this.nextSocketId,
      webSocket,
      this.propagateEvent,
      this.rpcHandlerByMethodName,
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
