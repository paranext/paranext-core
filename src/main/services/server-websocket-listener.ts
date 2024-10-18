import {
  ConnectionStatus,
  InternalNetworkEventHandler,
  InternalEvent,
  createErrorResponse,
  CallerData,
  RequestParams,
  InternalRequestHandler,
} from '@shared/data/internal-connection.model';
import { WEBSOCKET_PORT } from '@shared/data/network-connector.model';
import INetworkProtocolHandler from '@shared/services/network-protocol-handler.interface';
import { Mutex } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';
import logger from '@shared/services/logger.service';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import { SerializedRequestType } from '@shared/utils/util';
import ServerWebSocketProtocolHandler from './server-websocket-protocol-handler';

/** Protocol handler for the listening socket that spins off individual WebSocket protocol handlers */
export default class ServerWebSocketListener implements INetworkProtocolHandler {
  connectionStatus: ConnectionStatus;
  private localEventHandler: InternalNetworkEventHandler | undefined;
  private webSocketServer: WebSocketServer | undefined;
  private readonly connectionMutex = new Mutex();
  private readonly protocolHandlerBySocket = new Map<WebSocket, ServerWebSocketProtocolHandler>();
  private readonly protocolHandlerByMethodName = new Map<string, INetworkProtocolHandler>();
  private readonly localMethods = new Map<string, InternalRequestHandler>();

  constructor() {
    this.bindMethods();
    this.connectionStatus = ConnectionStatus.Disconnected;
  }

  connect(localEventHandler: InternalNetworkEventHandler): Promise<boolean> {
    return this.connectionMutex.runExclusive(() => {
      if (this.connectionStatus !== ConnectionStatus.Disconnected) return false;
      this.localEventHandler = localEventHandler;

      // Start the webSocket server
      this.webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
      this.webSocketServer.addListener('connection', this.onClientConnect);
      this.webSocketServer.addListener('close', this.disconnect);

      this.connectionStatus = ConnectionStatus.Connected;
      return true;
    });
  }

  disconnect(): void {
    this.connectionMutex.runExclusive(() => {
      if (this.webSocketServer) {
        this.webSocketServer.removeListener('connection', this.onClientConnect);
        this.webSocketServer.removeListener('close', this.disconnect);
        this.webSocketServer.close();
        this.webSocketServer = undefined;
      }

      this.connectionStatus = ConnectionStatus.Disconnected;
    });
  }

  async request(
    requestType: SerializedRequestType,
    requestParams: RequestParams,
    serverParams?: CallerData,
  ): Promise<JSONRPCResponse> {
    const handler = this.protocolHandlerByMethodName.get(requestType);
    if (!handler)
      return createErrorResponse(
        0,
        `No handler found for ${requestType}`,
        JSONRPCErrorCode.MethodNotFound,
      );
    if (handler !== this) return handler.request(requestType, requestParams, serverParams);
    const method = this.localMethods.get(requestType);
    if (!method)
      return createErrorResponse(
        0,
        `Locally registered method name missing the actual method`,
        JSONRPCErrorCode.InternalError,
      );
    return method(requestParams, serverParams);
  }

  async registerMethod(methodName: string, method: InternalRequestHandler): Promise<boolean> {
    if (this.protocolHandlerByMethodName.has(methodName) || this.localMethods.has(methodName))
      return false;

    this.protocolHandlerByMethodName.set(methodName, this);
    this.localMethods.set(methodName, method);
    return true;
  }

  async unregisterMethod(methodName: string): Promise<boolean> {
    const handler = this.protocolHandlerByMethodName.get(methodName);
    if (handler !== this) return false;
    return (
      this.protocolHandlerByMethodName.delete(methodName) && this.localMethods.delete(methodName)
    );
  }

  emitEventOnNetwork<T>(eventType: string, event: InternalEvent<T>): void {
    this.protocolHandlerBySocket.forEach((protocolHandler) => {
      protocolHandler.emitEventOnNetwork(eventType, event);
    });
  }

  private onClientConnect(webSocket: WebSocket): void {
    if (!this.localEventHandler) throw new Error(`localEventHandler not set`);
    const handler = new ServerWebSocketProtocolHandler(webSocket, this.protocolHandlerByMethodName);
    handler.connect(this.localEventHandler);
    this.protocolHandlerBySocket.set(webSocket, handler);
    logger.warn(`Websocket client connected: ${webSocket.url}`);
    webSocket.addEventListener('close', this.onClientDisconnect);
  }

  private onClientDisconnect(ev: CloseEvent): void {
    // Assert the correct type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webSocket = ev.target as WebSocket;
    webSocket.removeEventListener('close', this.onClientDisconnect);
    if (!this.protocolHandlerBySocket.delete(webSocket)) {
      logger.warn(`Close called on socket for '${webSocket.url}' but no handler found`);
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
