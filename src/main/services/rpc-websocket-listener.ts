import { app } from 'electron';
import {
  ConnectionStatus,
  createErrorResponse,
  createSuccessResponse,
  EventHandler,
  GET_METHODS,
  InternalRequestHandler,
  REGISTER_METHOD,
  RequestParams,
  requestWithRetry,
  UNREGISTER_METHOD,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { IRpcMethodRegistrar, RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import { Mutex } from 'platform-bible-utils';
import { WebSocketServer } from 'ws';
import logger from '@shared/services/logger.service';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import { bindClassMethods, SerializedRequestType } from '@shared/utils/util';
import {
  createEmptyOpenRpc,
  OpenRpc,
  SingleMethodDocumentation,
} from '@shared/models/openrpc.model';
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
  private readonly rpcMethodDetailsByMethodName = new Map<string, RegisteredRpcMethodDetails>();
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
    return requestWithRetry(
      async () => {
        const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
        if (!methodDetails)
          return createErrorResponse(
            `No handler found for ${requestType}`,
            JSONRPCErrorCode.MethodNotFound,
          );
        const { handler } = methodDetails;
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
      },
      'rpc-websocket-listener',
      requestType,
    );
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
    ];
    this.rpcMethodDetailsByMethodName.forEach((details, methodName) => {
      if (details.methodDocs) {
        const newDocs = { name: methodName, ...details.methodDocs.method };
        newDocs.name = methodName;
        openRpcSchema.methods.push(newDocs);
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
        openRpcSchema.methods.push({
          name: methodName,
          summary: '',
          description: 'No documentation provided',
          params: [],
          result: {
            name: 'return value',
            schema: {},
          },
        });
      }
    });
    openRpcSchema.methods.sort((a, b) => a.name.localeCompare(b.name));
    return openRpcSchema;
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
      this.rpcMethodDetailsByMethodName,
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
