"use strict";
exports.id = "src_main_services_rpc-websocket-listener_ts";
exports.ids = ["src_main_services_rpc-websocket-listener_ts"];
exports.modules = {

/***/ "./src/main/services/rpc-server.ts":
/*!*****************************************!*\
  !*** ./src/main/services/rpc-server.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RpcServer: () => (/* binding */ RpcServer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! json-rpc-2.0 */ "./node_modules/json-rpc-2.0/dist/index.js");
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/services/logger.service */ "./src/shared/services/logger.service.ts");
/* harmony import */ var _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/data/rpc.model */ "./src/shared/data/rpc.model.ts");
/* harmony import */ var _shared_utils_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/utils/util */ "./src/shared/utils/util.ts");
/* harmony import */ var platform_bible_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! platform-bible-utils */ "./lib/platform-bible-utils/dist/index.js");





/**
 * Manages the JSON-RPC protocol on the server end of a websocket owned by main. This class is not
 * intended to be instantiated by anything other than RpcWebSocketListener.
 *
 * Created by RpcWebSocketListener when a client connects to the web socket server. There is one
 * RpcServer object per client that connects to the web socket server.
 */
class RpcServer {
    connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.ConnectionStatus.Disconnected;
    ws;
    requestId = 1;
    /** Only used for logging to differentiate from other RpcServer objects */
    name;
    /** Refers to the main process */
    jsonRpcServer;
    /** Refers to any process that connected to main over the websocket */
    jsonRpcClient;
    rpcMethodDetailsByMethodName;
    /** Called by an RpcServer when all other RpcServers should emit an event over the network */
    propagateEventMethod;
    constructor(name, webSocket, propagateEventMethod, rpcMethodDetailsByMethodName) {
        _shared_utils_util__WEBPACK_IMPORTED_MODULE_3__.bindClassMethods.call(this);
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
        this.jsonRpcServer = new json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCServer();
        this.jsonRpcClient = new json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCClient((payload) => (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.sendPayloadToWebSocket)(this.ws, payload), this.createNextRequestId);
        this.rpcMethodDetailsByMethodName = rpcMethodDetailsByMethodName;
        this.addMethodToRpcServer(_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.REGISTER_METHOD, this.registerRemoteMethod);
        this.addMethodToRpcServer(_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.UNREGISTER_METHOD, this.unregisterRemoteMethod);
    }
    async connect() {
        if (this.connectionStatus === _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.ConnectionStatus.Connected)
            return false;
        this.addEventListenersToWebSocket();
        this.connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.ConnectionStatus.Connected;
        return true;
    }
    async disconnect() {
        if (this.connectionStatus === _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.ConnectionStatus.Disconnected)
            return;
        if (!this.ws) {
            _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_1__.logger.warn(`Server connected but websocket is not set`);
            return;
        }
        this.ws.close();
    }
    async request(requestType, requestParams) {
        return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.requestWithRetry)(async () => {
            const requestId = this.createNextRequestId();
            const requestToSend = (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createRequest)(requestType, requestParams, requestId);
            // Need to use null since it's part of the API
            // eslint-disable-next-line no-null/no-null
            let response = null;
            const isLocal = this.jsonRpcServer.hasMethod(requestType);
            if (isLocal)
                response = await this.jsonRpcServer.receive(requestToSend);
            else {
                const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
                if (!methodDetails)
                    return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createErrorResponse)(`'${requestType}' not found`, json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCErrorCode.MethodNotFound, requestId);
                const { handler } = methodDetails;
                if (handler === this)
                    response = await this.jsonRpcClient.requestAdvanced(requestToSend);
                else
                    return handler.request(requestType, requestParams);
            }
            if (response)
                return response;
            return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createErrorResponse)(`No response from ${isLocal ? 'local' : 'remote'} RPC server`, json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCErrorCode.InternalError, requestId);
        }, this.name, requestType);
    }
    // Outgoing event from this server to the client it is connected to
    emitEventOnNetwork(eventType, event) {
        this.jsonRpcClient.notify(eventType, [event]);
    }
    registerRemoteMethod(methodName, methodDocs) {
        if (this.rpcMethodDetailsByMethodName.has(methodName))
            return false;
        this.rpcMethodDetailsByMethodName.set(methodName, { handler: this, methodDocs });
        return true;
    }
    unregisterRemoteMethod(methodName) {
        // Don't allow one client to tell us to unregister a method from a different client
        const methodDetails = this.rpcMethodDetailsByMethodName.get(methodName);
        const handlersMatch = !!methodDetails && methodDetails.handler === this;
        if (handlersMatch)
            this.rpcMethodDetailsByMethodName.delete(methodName);
        return handlersMatch;
    }
    createNextRequestId() {
        const retVal = this.requestId;
        this.requestId += 1;
        return retVal;
    }
    addMethodToRpcServer(methodName, method) {
        this.jsonRpcServer.addMethod(methodName, (params) => method(...params));
    }
    handleError(message, data) {
        _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_1__.logger.error(`Websocket ${this.name} ${message}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
    }
    addEventListenersToWebSocket() {
        if (this.ws) {
            this.ws.addEventListener('close', this.onWebSocketClose);
            this.ws.addEventListener('error', this.onWebSocketError);
            this.ws.addEventListener('message', this.onMessageReceivedByWebSocket);
        }
    }
    removeEventListenersFromWebSocket() {
        if (this.ws) {
            this.ws.removeEventListener('close', this.onWebSocketClose);
            this.ws.removeEventListener('error', this.onWebSocketError);
            this.ws.removeEventListener('message', this.onMessageReceivedByWebSocket);
            this.ws = undefined;
        }
    }
    onWebSocketClose() {
        this.jsonRpcClient.rejectAllPendingRequests(`Web socket ${this.name} has closed`);
        this.removeEventListenersFromWebSocket();
        this.connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.ConnectionStatus.Disconnected;
        this.rpcMethodDetailsByMethodName.forEach(({ handler }, methodName) => {
            if (handler !== this)
                return;
            _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_1__.logger.info(`Method '${methodName}' removed since websocket ${this.name} closed`);
            this.rpcMethodDetailsByMethodName.delete(methodName);
        });
    }
    onWebSocketError(ev) {
        this.handleError('Server websocket error event occurred', ev);
    }
    async onMessageReceivedByWebSocket(ev) {
        try {
            // Uncomment the following line to log every message received
            // logger.warn(`Received message on ${this.name}: ${ev.data}`);
            this.processMessage((0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.deserializeMessage)(ev.data));
        }
        catch (error) {
            this.handleError(`Error processing JSONRPC message (${ev.data}): ${(0,platform_bible_utils__WEBPACK_IMPORTED_MODULE_4__.getErrorMessage)(error)}`, error);
        }
    }
    async processMessage(message) {
        if ((0,json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.isJSONRPCResponse)(message) || (0,json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.isJSONRPCResponses)(message)) {
            this.jsonRpcClient.receive(message);
        }
        else if ((0,json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.isJSONRPCRequest)(message) || (0,json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.isJSONRPCRequests)(message)) {
            const requests = (0,json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.isJSONRPCRequest)(message) ? [message] : message;
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
                    request.method, request.params);
                    const payload = 'result' in response
                        ? (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createSuccessResponse)(response.result, request.id)
                        : (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createErrorResponse)(response.error.message, response.error.code, request.id);
                    (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.sendPayloadToWebSocket)(this.ws, payload);
                }
                catch (error) {
                    this.handleError(`Error handling request: ${(0,platform_bible_utils__WEBPACK_IMPORTED_MODULE_4__.getErrorMessage)(error)}`, request);
                }
            });
            await Promise.all(promises);
        }
        else {
            const errorText = 'Received an invalid JSON-RPC message';
            this.handleError(errorText, message);
            const id = typeof message === 'object' && message && 'id' in message ? JSON.stringify(message.id) : 0;
            const failure = (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.createErrorResponse)(errorText, json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCErrorCode.ParseError, id);
            (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_2__.sendPayloadToWebSocket)(this.ws, failure);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RpcServer);


/***/ }),

/***/ "./src/main/services/rpc-websocket-listener.ts":
/*!*****************************************************!*\
  !*** ./src/main/services/rpc-websocket-listener.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RpcWebSocketListener: () => (/* binding */ RpcWebSocketListener),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/data/rpc.model */ "./src/shared/data/rpc.model.ts");
/* harmony import */ var platform_bible_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! platform-bible-utils */ "./lib/platform-bible-utils/dist/index.js");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ws */ "./node_modules/ws/wrapper.mjs");
/* harmony import */ var _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/services/logger.service */ "./src/shared/services/logger.service.ts");
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! json-rpc-2.0 */ "./node_modules/json-rpc-2.0/dist/index.js");
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_utils_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/utils/util */ "./src/shared/utils/util.ts");
/* harmony import */ var _shared_models_openrpc_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/models/openrpc.model */ "./src/shared/models/openrpc.model.ts");
/* harmony import */ var _rpc_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rpc-server */ "./src/main/services/rpc-server.ts");









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
class RpcWebSocketListener {
    connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.ConnectionStatus.Disconnected;
    localEventHandler;
    webSocketServer;
    nextSocketNumber = 1;
    connectionMutex = new platform_bible_utils__WEBPACK_IMPORTED_MODULE_2__.Mutex();
    rpcServerBySocket = new Map();
    rpcMethodDetailsByMethodName = new Map();
    localMethodsByMethodName = new Map();
    constructor() {
        _shared_utils_util__WEBPACK_IMPORTED_MODULE_6__.bindClassMethods.call(this);
    }
    get nextSocketId() {
        const retVal = this.nextSocketNumber.toString(10);
        this.nextSocketNumber += 1;
        return retVal;
    }
    connect(localEventHandler) {
        return this.connectionMutex.runExclusive(() => {
            if (this.connectionStatus !== _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.ConnectionStatus.Disconnected)
                return false;
            this.localEventHandler = localEventHandler;
            this.registerMethod(_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.GET_METHODS, this.generateOpenRpcSchema, {
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
            this.webSocketServer = new ws__WEBPACK_IMPORTED_MODULE_3__.WebSocketServer({ port: _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.WEBSOCKET_PORT });
            this.webSocketServer.addListener('connection', this.onClientConnect);
            this.webSocketServer.addListener('close', this.disconnect);
            this.connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.ConnectionStatus.Connected;
            return true;
        });
    }
    async disconnect() {
        return this.connectionMutex.runExclusive(() => {
            if (this.webSocketServer) {
                this.webSocketServer.removeListener('connection', this.onClientConnect);
                this.webSocketServer.removeListener('close', this.disconnect);
                this.webSocketServer.close();
                this.webSocketServer = undefined;
            }
            this.localEventHandler = undefined;
            this.connectionStatus = _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.ConnectionStatus.Disconnected;
        });
    }
    async request(requestType, requestParams) {
        return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.requestWithRetry)(async () => {
            const methodDetails = this.rpcMethodDetailsByMethodName.get(requestType);
            if (!methodDetails)
                return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.createErrorResponse)(`No handler found for ${requestType}`, json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5__.JSONRPCErrorCode.MethodNotFound);
            const { handler } = methodDetails;
            if (handler !== this)
                return handler.request(requestType, requestParams);
            const method = this.localMethodsByMethodName.get(requestType);
            if (!method)
                return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.createErrorResponse)(`Locally registered method name missing the actual method`, json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5__.JSONRPCErrorCode.InternalError);
            try {
                const result = method(...requestParams);
                const awaitedResult = result instanceof Promise ? await result : result;
                return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.createSuccessResponse)(awaitedResult);
            }
            catch (error) {
                return (0,_shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.createErrorResponse)((0,platform_bible_utils__WEBPACK_IMPORTED_MODULE_2__.getErrorMessage)(error), json_rpc_2_0__WEBPACK_IMPORTED_MODULE_5__.JSONRPCErrorCode.InternalError);
            }
        }, 'rpc-websocket-listener', requestType);
    }
    async registerMethod(methodName, method, methodDocs) {
        if (this.rpcMethodDetailsByMethodName.has(methodName) ||
            this.localMethodsByMethodName.has(methodName))
            return false;
        this.rpcMethodDetailsByMethodName.set(methodName, { handler: this, methodDocs });
        this.localMethodsByMethodName.set(methodName, method);
        return true;
    }
    async unregisterMethod(methodName) {
        const methodDetails = this.rpcMethodDetailsByMethodName.get(methodName);
        if (!methodDetails || methodDetails.handler !== this)
            return false;
        this.rpcMethodDetailsByMethodName.delete(methodName);
        this.localMethodsByMethodName.delete(methodName);
        return true;
    }
    generateOpenRpcSchema() {
        const openRpcSchema = (0,_shared_models_openrpc_model__WEBPACK_IMPORTED_MODULE_7__.createEmptyOpenRpc)(electron__WEBPACK_IMPORTED_MODULE_0__.app.getVersion());
        openRpcSchema.methods = [
            {
                name: _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.REGISTER_METHOD,
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
                name: _shared_data_rpc_model__WEBPACK_IMPORTED_MODULE_1__.UNREGISTER_METHOD,
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
                // Overwrite the name with `methodName` in case `details.methodDocs.method` included a name
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
            }
            else {
                openRpcSchema.methods.push({
                    name: methodName,
                    ...(0,_shared_models_openrpc_model__WEBPACK_IMPORTED_MODULE_7__.getEmptyMethodDocs)(),
                });
            }
        });
        openRpcSchema.methods.sort((a, b) => a.name.localeCompare(b.name));
        return openRpcSchema;
    }
    emitEventOnNetwork(eventType, event) {
        this.rpcServerBySocket.forEach((rpcServer) => {
            rpcServer.emitEventOnNetwork(eventType, event);
        });
    }
    // This is run by an RPCServer when it receives an event message on the websocket from a client
    propagateEvent(source, eventType, event) {
        if (!this.localEventHandler)
            throw new Error(`localEventHandler not set`);
        if (!Array.isArray(event) || event.length !== 1)
            throw new Error(`event not wrapped in array`);
        this.localEventHandler(eventType, event[0]);
        this.rpcServerBySocket.forEach((rpcServer) => {
            if (rpcServer !== source)
                rpcServer.emitEventOnNetwork(eventType, event[0]);
        });
    }
    onClientConnect(webSocket) {
        const rpcServer = new _rpc_server__WEBPACK_IMPORTED_MODULE_8__.RpcServer(this.nextSocketId, webSocket, this.propagateEvent, this.rpcMethodDetailsByMethodName);
        rpcServer.connect();
        this.rpcServerBySocket.set(webSocket, rpcServer);
        _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_4__.logger.warn(`Websocket client connected: ${webSocket.url}`);
        webSocket.addEventListener('close', this.onClientDisconnect);
    }
    onClientDisconnect(ev) {
        // Assert the correct type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const webSocket = ev.target;
        webSocket.removeEventListener('close', this.onClientDisconnect);
        if (!this.rpcServerBySocket.delete(webSocket)) {
            _shared_services_logger_service__WEBPACK_IMPORTED_MODULE_4__.logger.warn(`Close called on socket for '${webSocket.url}' but no handler found`);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RpcWebSocketListener);


/***/ })

};
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX21haW5fc2VydmljZXNfcnBjLXdlYnNvY2tldC1saXN0ZW5lcl90cy5idW5kbGUuZGV2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVc0I7QUFDbUM7QUFjekI7QUFDNkM7QUFFdEI7QUFJdkQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxTQUFTO0lBQ3BCLGdCQUFnQixHQUFxQixvRUFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDM0QsRUFBRSxDQUF3QjtJQUMxQixTQUFTLEdBQVcsQ0FBQyxDQUFDO0lBQzlCLDBFQUEwRTtJQUN6RCxJQUFJLENBQVM7SUFDOUIsaUNBQWlDO0lBQ2hCLGFBQWEsQ0FBZ0I7SUFDOUMsc0VBQXNFO0lBQ3JELGFBQWEsQ0FBZ0I7SUFDN0IsNEJBQTRCLENBQTBDO0lBQ3ZGLDZGQUE2RjtJQUM1RSxvQkFBb0IsQ0FBdUI7SUFFNUQsWUFDRSxJQUFZLEVBQ1osU0FBb0IsRUFDcEIsb0JBQTBDLEVBQzFDLDRCQUFxRTtRQUVyRSxnRUFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDcEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBRWpELG9EQUFvRDtRQUNwRDs7Ozs7O1VBTUU7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdURBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx1REFBYSxDQUNwQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsOEVBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFDckQsSUFBSSxDQUFDLG1CQUFtQixDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLDRCQUE0QixHQUFHLDRCQUE0QixDQUFDO1FBRWpFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtRUFBZSxF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Q0gsQ0FBQztDQUNGO0FBRUQsaUVBQWUsb0JBQW9CLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9zZXJ2aWNlcy9ycGMtc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluL3NlcnZpY2VzL3JwYy13ZWJzb2NrZXQtbGlzdGVuZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNKU09OUlBDUmVxdWVzdCxcbiAgaXNKU09OUlBDUmVxdWVzdHMsXG4gIGlzSlNPTlJQQ1Jlc3BvbnNlLFxuICBpc0pTT05SUENSZXNwb25zZXMsXG4gIEpTT05SUENDbGllbnQsXG4gIEpTT05SUENFcnJvckNvZGUsXG4gIEpTT05SUENSZXF1ZXN0LFxuICBKU09OUlBDUmVzcG9uc2UsXG4gIEpTT05SUENTZXJ2ZXIsXG59IGZyb20gJ2pzb24tcnBjLTIuMCc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdAc2hhcmVkL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IElScGNIYW5kbGVyLCBSZWdpc3RlcmVkUnBjTWV0aG9kRGV0YWlscyB9IGZyb20gJ0BzaGFyZWQvbW9kZWxzL3JwYy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGlvblN0YXR1cyxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZSxcbiAgY3JlYXRlUmVxdWVzdCxcbiAgY3JlYXRlU3VjY2Vzc1Jlc3BvbnNlLFxuICBkZXNlcmlhbGl6ZU1lc3NhZ2UsXG4gIEludGVybmFsUmVxdWVzdEhhbmRsZXIsXG4gIFJFR0lTVEVSX01FVEhPRCxcbiAgUmVxdWVzdFBhcmFtcyxcbiAgcmVxdWVzdFdpdGhSZXRyeSxcbiAgc2VuZFBheWxvYWRUb1dlYlNvY2tldCxcbiAgVU5SRUdJU1RFUl9NRVRIT0QsXG59IGZyb20gJ0BzaGFyZWQvZGF0YS9ycGMubW9kZWwnO1xuaW1wb3J0IHsgYmluZENsYXNzTWV0aG9kcywgU2VyaWFsaXplZFJlcXVlc3RUeXBlIH0gZnJvbSAnQHNoYXJlZC91dGlscy91dGlsJztcbmltcG9ydCB7IFNpbmdsZU1ldGhvZERvY3VtZW50YXRpb24gfSBmcm9tICdAc2hhcmVkL21vZGVscy9vcGVucnBjLm1vZGVsJztcbmltcG9ydCB7IGdldEVycm9yTWVzc2FnZSB9IGZyb20gJ3BsYXRmb3JtLWJpYmxlLXV0aWxzJztcblxudHlwZSBQcm9wYWdhdGVFdmVudE1ldGhvZCA9IDxUPihzb3VyY2U6IFJwY1NlcnZlciwgZXZlbnRUeXBlOiBzdHJpbmcsIGV2ZW50OiBUKSA9PiB2b2lkO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIEpTT04tUlBDIHByb3RvY29sIG9uIHRoZSBzZXJ2ZXIgZW5kIG9mIGEgd2Vic29ja2V0IG93bmVkIGJ5IG1haW4uIFRoaXMgY2xhc3MgaXMgbm90XG4gKiBpbnRlbmRlZCB0byBiZSBpbnN0YW50aWF0ZWQgYnkgYW55dGhpbmcgb3RoZXIgdGhhbiBScGNXZWJTb2NrZXRMaXN0ZW5lci5cbiAqXG4gKiBDcmVhdGVkIGJ5IFJwY1dlYlNvY2tldExpc3RlbmVyIHdoZW4gYSBjbGllbnQgY29ubmVjdHMgdG8gdGhlIHdlYiBzb2NrZXQgc2VydmVyLiBUaGVyZSBpcyBvbmVcbiAqIFJwY1NlcnZlciBvYmplY3QgcGVyIGNsaWVudCB0aGF0IGNvbm5lY3RzIHRvIHRoZSB3ZWIgc29ja2V0IHNlcnZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFJwY1NlcnZlciBpbXBsZW1lbnRzIElScGNIYW5kbGVyIHtcbiAgY29ubmVjdGlvblN0YXR1czogQ29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuRGlzY29ubmVjdGVkO1xuICBwcml2YXRlIHdzOiBXZWJTb2NrZXQgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgcmVxdWVzdElkOiBudW1iZXIgPSAxO1xuICAvKiogT25seSB1c2VkIGZvciBsb2dnaW5nIHRvIGRpZmZlcmVudGlhdGUgZnJvbSBvdGhlciBScGNTZXJ2ZXIgb2JqZWN0cyAqL1xuICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgLyoqIFJlZmVycyB0byB0aGUgbWFpbiBwcm9jZXNzICovXG4gIHByaXZhdGUgcmVhZG9ubHkganNvblJwY1NlcnZlcjogSlNPTlJQQ1NlcnZlcjtcbiAgLyoqIFJlZmVycyB0byBhbnkgcHJvY2VzcyB0aGF0IGNvbm5lY3RlZCB0byBtYWluIG92ZXIgdGhlIHdlYnNvY2tldCAqL1xuICBwcml2YXRlIHJlYWRvbmx5IGpzb25ScGNDbGllbnQ6IEpTT05SUENDbGllbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgcnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZTogTWFwPHN0cmluZywgUmVnaXN0ZXJlZFJwY01ldGhvZERldGFpbHM+O1xuICAvKiogQ2FsbGVkIGJ5IGFuIFJwY1NlcnZlciB3aGVuIGFsbCBvdGhlciBScGNTZXJ2ZXJzIHNob3VsZCBlbWl0IGFuIGV2ZW50IG92ZXIgdGhlIG5ldHdvcmsgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBwcm9wYWdhdGVFdmVudE1ldGhvZDogUHJvcGFnYXRlRXZlbnRNZXRob2Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHdlYlNvY2tldDogV2ViU29ja2V0LFxuICAgIHByb3BhZ2F0ZUV2ZW50TWV0aG9kOiBQcm9wYWdhdGVFdmVudE1ldGhvZCxcbiAgICBycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lOiBNYXA8c3RyaW5nLCBSZWdpc3RlcmVkUnBjTWV0aG9kRGV0YWlscz4sXG4gICkge1xuICAgIGJpbmRDbGFzc01ldGhvZHMuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMud3MgPSB3ZWJTb2NrZXQ7XG4gICAgdGhpcy5wcm9wYWdhdGVFdmVudE1ldGhvZCA9IHByb3BhZ2F0ZUV2ZW50TWV0aG9kO1xuXG4gICAgLy8gVW5jb21tZW50IHRoZSBmb2xsb3dpbmcgdG8gbG9nIGV2ZXJ5IG1lc3NhZ2Ugc2VudFxuICAgIC8qXG4gICAgY29uc3Qgb3JpZ2luYWxTZW5kID0gdGhpcy53cy5zZW5kO1xuICAgIHRoaXMud3Muc2VuZCA9IChkYXRhKSA9PiB7XG4gICAgICBsb2dnZXIud2FybihgU2VuZGluZyBtZXNzYWdlIG9uICR7dGhpcy5uYW1lfTogJHtkYXRhfWApO1xuICAgICAgb3JpZ2luYWxTZW5kLmNhbGwodGhpcy53cywgZGF0YSk7XG4gICAgfTtcbiAgICAqL1xuXG4gICAgdGhpcy5qc29uUnBjU2VydmVyID0gbmV3IEpTT05SUENTZXJ2ZXIoKTtcbiAgICB0aGlzLmpzb25ScGNDbGllbnQgPSBuZXcgSlNPTlJQQ0NsaWVudChcbiAgICAgIChwYXlsb2FkKSA9PiBzZW5kUGF5bG9hZFRvV2ViU29ja2V0KHRoaXMud3MsIHBheWxvYWQpLFxuICAgICAgdGhpcy5jcmVhdGVOZXh0UmVxdWVzdElkLFxuICAgICk7XG4gICAgdGhpcy5ycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lID0gcnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZTtcblxuICAgIHRoaXMuYWRkTWV0aG9kVG9ScGNTZXJ2ZXIoUkVHSVNURVJfTUVUSE9ELCB0aGlzLnJlZ2lzdGVyUmVtb3RlTWV0aG9kKTtcbiAgICB0aGlzLmFkZE1ldGhvZFRvUnBjU2VydmVyKFVOUkVHSVNURVJfTUVUSE9ELCB0aGlzLnVucmVnaXN0ZXJSZW1vdGVNZXRob2QpO1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkNvbm5lY3RlZCkgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb1dlYlNvY2tldCgpO1xuICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuQ29ubmVjdGVkO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkRpc2Nvbm5lY3RlZCkgcmV0dXJuO1xuICAgIGlmICghdGhpcy53cykge1xuICAgICAgbG9nZ2VyLndhcm4oYFNlcnZlciBjb25uZWN0ZWQgYnV0IHdlYnNvY2tldCBpcyBub3Qgc2V0YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgcmVxdWVzdFR5cGU6IFNlcmlhbGl6ZWRSZXF1ZXN0VHlwZSxcbiAgICByZXF1ZXN0UGFyYW1zOiBSZXF1ZXN0UGFyYW1zLFxuICApOiBQcm9taXNlPEpTT05SUENSZXNwb25zZT4ge1xuICAgIHJldHVybiByZXF1ZXN0V2l0aFJldHJ5KFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB0aGlzLmNyZWF0ZU5leHRSZXF1ZXN0SWQoKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdFRvU2VuZCA9IGNyZWF0ZVJlcXVlc3QocmVxdWVzdFR5cGUsIHJlcXVlc3RQYXJhbXMsIHJlcXVlc3RJZCk7XG4gICAgICAgIC8vIE5lZWQgdG8gdXNlIG51bGwgc2luY2UgaXQncyBwYXJ0IG9mIHRoZSBBUElcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW51bGwvbm8tbnVsbFxuICAgICAgICBsZXQgcmVzcG9uc2U6IEpTT05SUENSZXNwb25zZSB8IG51bGwgPSBudWxsO1xuICAgICAgICBjb25zdCBpc0xvY2FsID0gdGhpcy5qc29uUnBjU2VydmVyLmhhc01ldGhvZChyZXF1ZXN0VHlwZSk7XG4gICAgICAgIGlmIChpc0xvY2FsKSByZXNwb25zZSA9IGF3YWl0IHRoaXMuanNvblJwY1NlcnZlci5yZWNlaXZlKHJlcXVlc3RUb1NlbmQpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtZXRob2REZXRhaWxzID0gdGhpcy5ycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lLmdldChyZXF1ZXN0VHlwZSk7XG4gICAgICAgICAgaWYgKCFtZXRob2REZXRhaWxzKVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgICAgIGAnJHtyZXF1ZXN0VHlwZX0nIG5vdCBmb3VuZGAsXG4gICAgICAgICAgICAgIEpTT05SUENFcnJvckNvZGUuTWV0aG9kTm90Rm91bmQsXG4gICAgICAgICAgICAgIHJlcXVlc3RJZCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgeyBoYW5kbGVyIH0gPSBtZXRob2REZXRhaWxzO1xuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0aGlzKSByZXNwb25zZSA9IGF3YWl0IHRoaXMuanNvblJwY0NsaWVudC5yZXF1ZXN0QWR2YW5jZWQocmVxdWVzdFRvU2VuZCk7XG4gICAgICAgICAgZWxzZSByZXR1cm4gaGFuZGxlci5yZXF1ZXN0KHJlcXVlc3RUeXBlLCByZXF1ZXN0UGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgYE5vIHJlc3BvbnNlIGZyb20gJHtpc0xvY2FsID8gJ2xvY2FsJyA6ICdyZW1vdGUnfSBSUEMgc2VydmVyYCxcbiAgICAgICAgICBKU09OUlBDRXJyb3JDb2RlLkludGVybmFsRXJyb3IsXG4gICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHRoaXMubmFtZSxcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICk7XG4gIH1cblxuICAvLyBPdXRnb2luZyBldmVudCBmcm9tIHRoaXMgc2VydmVyIHRvIHRoZSBjbGllbnQgaXQgaXMgY29ubmVjdGVkIHRvXG4gIGVtaXRFdmVudE9uTmV0d29yazxUPihldmVudFR5cGU6IHN0cmluZywgZXZlbnQ6IFQpOiB2b2lkIHtcbiAgICB0aGlzLmpzb25ScGNDbGllbnQubm90aWZ5KGV2ZW50VHlwZSwgW2V2ZW50XSk7XG4gIH1cblxuICByZWdpc3RlclJlbW90ZU1ldGhvZChtZXRob2ROYW1lOiBzdHJpbmcsIG1ldGhvZERvY3M/OiBTaW5nbGVNZXRob2REb2N1bWVudGF0aW9uKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZS5oYXMobWV0aG9kTmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICB0aGlzLnJwY01ldGhvZERldGFpbHNCeU1ldGhvZE5hbWUuc2V0KG1ldGhvZE5hbWUsIHsgaGFuZGxlcjogdGhpcywgbWV0aG9kRG9jcyB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJSZW1vdGVNZXRob2QobWV0aG9kTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gRG9uJ3QgYWxsb3cgb25lIGNsaWVudCB0byB0ZWxsIHVzIHRvIHVucmVnaXN0ZXIgYSBtZXRob2QgZnJvbSBhIGRpZmZlcmVudCBjbGllbnRcbiAgICBjb25zdCBtZXRob2REZXRhaWxzID0gdGhpcy5ycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lLmdldChtZXRob2ROYW1lKTtcbiAgICBjb25zdCBoYW5kbGVyc01hdGNoID0gISFtZXRob2REZXRhaWxzICYmIG1ldGhvZERldGFpbHMuaGFuZGxlciA9PT0gdGhpcztcbiAgICBpZiAoaGFuZGxlcnNNYXRjaCkgdGhpcy5ycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lLmRlbGV0ZShtZXRob2ROYW1lKTtcbiAgICByZXR1cm4gaGFuZGxlcnNNYXRjaDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTmV4dFJlcXVlc3RJZCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHJldFZhbCA9IHRoaXMucmVxdWVzdElkO1xuICAgIHRoaXMucmVxdWVzdElkICs9IDE7XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWV0aG9kVG9ScGNTZXJ2ZXIobWV0aG9kTmFtZTogc3RyaW5nLCBtZXRob2Q6IEludGVybmFsUmVxdWVzdEhhbmRsZXIpIHtcbiAgICB0aGlzLmpzb25ScGNTZXJ2ZXIuYWRkTWV0aG9kKG1ldGhvZE5hbWUsIChwYXJhbXM6IFJlcXVlc3RQYXJhbXMpID0+IG1ldGhvZCguLi5wYXJhbXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IobWVzc2FnZTogc3RyaW5nLCBkYXRhOiB1bmtub3duKTogdm9pZCB7XG4gICAgbG9nZ2VyLmVycm9yKFxuICAgICAgYFdlYnNvY2tldCAke3RoaXMubmFtZX0gJHttZXNzYWdlfTogJHt0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSl9YCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRFdmVudExpc3RlbmVyc1RvV2ViU29ja2V0KCkge1xuICAgIGlmICh0aGlzLndzKSB7XG4gICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgdGhpcy5vbldlYlNvY2tldENsb3NlKTtcbiAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uV2ViU29ja2V0RXJyb3IpO1xuICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZEJ5V2ViU29ja2V0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXJzRnJvbVdlYlNvY2tldCgpIHtcbiAgICBpZiAodGhpcy53cykge1xuICAgICAgdGhpcy53cy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25XZWJTb2NrZXRDbG9zZSk7XG4gICAgICB0aGlzLndzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbldlYlNvY2tldEVycm9yKTtcbiAgICAgIHRoaXMud3MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlUmVjZWl2ZWRCeVdlYlNvY2tldCk7XG4gICAgICB0aGlzLndzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25XZWJTb2NrZXRDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmpzb25ScGNDbGllbnQucmVqZWN0QWxsUGVuZGluZ1JlcXVlc3RzKGBXZWIgc29ja2V0ICR7dGhpcy5uYW1lfSBoYXMgY2xvc2VkYCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyc0Zyb21XZWJTb2NrZXQoKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRpc2Nvbm5lY3RlZDtcbiAgICB0aGlzLnJwY01ldGhvZERldGFpbHNCeU1ldGhvZE5hbWUuZm9yRWFjaCgoeyBoYW5kbGVyIH0sIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgIGlmIChoYW5kbGVyICE9PSB0aGlzKSByZXR1cm47XG5cbiAgICAgIGxvZ2dlci5pbmZvKGBNZXRob2QgJyR7bWV0aG9kTmFtZX0nIHJlbW92ZWQgc2luY2Ugd2Vic29ja2V0ICR7dGhpcy5uYW1lfSBjbG9zZWRgKTtcbiAgICAgIHRoaXMucnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZS5kZWxldGUobWV0aG9kTmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uV2ViU29ja2V0RXJyb3IoZXY6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVFcnJvcignU2VydmVyIHdlYnNvY2tldCBlcnJvciBldmVudCBvY2N1cnJlZCcsIGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25NZXNzYWdlUmVjZWl2ZWRCeVdlYlNvY2tldChldjogTWVzc2FnZUV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUgdG8gbG9nIGV2ZXJ5IG1lc3NhZ2UgcmVjZWl2ZWRcbiAgICAgIC8vIGxvZ2dlci53YXJuKGBSZWNlaXZlZCBtZXNzYWdlIG9uICR7dGhpcy5uYW1lfTogJHtldi5kYXRhfWApO1xuICAgICAgdGhpcy5wcm9jZXNzTWVzc2FnZShkZXNlcmlhbGl6ZU1lc3NhZ2UoZXYuZGF0YSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmhhbmRsZUVycm9yKFxuICAgICAgICBgRXJyb3IgcHJvY2Vzc2luZyBKU09OUlBDIG1lc3NhZ2UgKCR7ZXYuZGF0YX0pOiAke2dldEVycm9yTWVzc2FnZShlcnJvcil9YCxcbiAgICAgICAgZXJyb3IsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJvY2Vzc01lc3NhZ2UobWVzc2FnZTogdW5rbm93bikge1xuICAgIGlmIChpc0pTT05SUENSZXNwb25zZShtZXNzYWdlKSB8fCBpc0pTT05SUENSZXNwb25zZXMobWVzc2FnZSkpIHtcbiAgICAgIHRoaXMuanNvblJwY0NsaWVudC5yZWNlaXZlKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAoaXNKU09OUlBDUmVxdWVzdChtZXNzYWdlKSB8fCBpc0pTT05SUENSZXF1ZXN0cyhtZXNzYWdlKSkge1xuICAgICAgY29uc3QgcmVxdWVzdHM6IEpTT05SUENSZXF1ZXN0W10gPSBpc0pTT05SUENSZXF1ZXN0KG1lc3NhZ2UpID8gW21lc3NhZ2VdIDogbWVzc2FnZTtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gcmVxdWVzdHMubWFwKGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gUmVwZWF0IGV2ZW50cyB0byB0aGUgd2hvbGUgbmV0d29ya1xuICAgICAgICAgIGlmICghcmVxdWVzdC5pZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVFdmVudE1ldGhvZCh0aGlzLCByZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC5wYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChcbiAgICAgICAgICAgIC8vIEFzc2VydCB0aGUgcmVxdWlyZWQgdHlwZVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXR5cGUtYXNzZXJ0aW9uL25vLXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICByZXF1ZXN0Lm1ldGhvZCBhcyBTZXJpYWxpemVkUmVxdWVzdFR5cGUsXG4gICAgICAgICAgICByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPVxuICAgICAgICAgICAgJ3Jlc3VsdCcgaW4gcmVzcG9uc2VcbiAgICAgICAgICAgICAgPyBjcmVhdGVTdWNjZXNzUmVzcG9uc2UocmVzcG9uc2UucmVzdWx0LCByZXF1ZXN0LmlkKVxuICAgICAgICAgICAgICA6IGNyZWF0ZUVycm9yUmVzcG9uc2UocmVzcG9uc2UuZXJyb3IubWVzc2FnZSwgcmVzcG9uc2UuZXJyb3IuY29kZSwgcmVxdWVzdC5pZCk7XG4gICAgICAgICAgc2VuZFBheWxvYWRUb1dlYlNvY2tldCh0aGlzLndzLCBwYXlsb2FkKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGBFcnJvciBoYW5kbGluZyByZXF1ZXN0OiAke2dldEVycm9yTWVzc2FnZShlcnJvcil9YCwgcmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvclRleHQgPSAnUmVjZWl2ZWQgYW4gaW52YWxpZCBKU09OLVJQQyBtZXNzYWdlJztcbiAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3JUZXh0LCBtZXNzYWdlKTtcbiAgICAgIGNvbnN0IGlkID1cbiAgICAgICAgdHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnICYmIG1lc3NhZ2UgJiYgJ2lkJyBpbiBtZXNzYWdlID8gSlNPTi5zdHJpbmdpZnkobWVzc2FnZS5pZCkgOiAwO1xuICAgICAgY29uc3QgZmFpbHVyZSA9IGNyZWF0ZUVycm9yUmVzcG9uc2UoZXJyb3JUZXh0LCBKU09OUlBDRXJyb3JDb2RlLlBhcnNlRXJyb3IsIGlkKTtcbiAgICAgIHNlbmRQYXlsb2FkVG9XZWJTb2NrZXQodGhpcy53cywgZmFpbHVyZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJwY1NlcnZlcjtcbiIsImltcG9ydCB7IGFwcCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25TdGF0dXMsXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2UsXG4gIGNyZWF0ZVN1Y2Nlc3NSZXNwb25zZSxcbiAgRXZlbnRIYW5kbGVyLFxuICBHRVRfTUVUSE9EUyxcbiAgSW50ZXJuYWxSZXF1ZXN0SGFuZGxlcixcbiAgUkVHSVNURVJfTUVUSE9ELFxuICBSZXF1ZXN0UGFyYW1zLFxuICByZXF1ZXN0V2l0aFJldHJ5LFxuICBVTlJFR0lTVEVSX01FVEhPRCxcbiAgV0VCU09DS0VUX1BPUlQsXG59IGZyb20gJ0BzaGFyZWQvZGF0YS9ycGMubW9kZWwnO1xuaW1wb3J0IHsgSVJwY01ldGhvZFJlZ2lzdHJhciwgUmVnaXN0ZXJlZFJwY01ldGhvZERldGFpbHMgfSBmcm9tICdAc2hhcmVkL21vZGVscy9ycGMuaW50ZXJmYWNlJztcbmltcG9ydCB7IGdldEVycm9yTWVzc2FnZSwgTXV0ZXggfSBmcm9tICdwbGF0Zm9ybS1iaWJsZS11dGlscyc7XG5pbXBvcnQgeyBXZWJTb2NrZXRTZXJ2ZXIgfSBmcm9tICd3cyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdAc2hhcmVkL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IEpTT05SUENFcnJvckNvZGUsIEpTT05SUENSZXNwb25zZSB9IGZyb20gJ2pzb24tcnBjLTIuMCc7XG5pbXBvcnQgeyBiaW5kQ2xhc3NNZXRob2RzLCBTZXJpYWxpemVkUmVxdWVzdFR5cGUgfSBmcm9tICdAc2hhcmVkL3V0aWxzL3V0aWwnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRW1wdHlPcGVuUnBjLFxuICBnZXRFbXB0eU1ldGhvZERvY3MsXG4gIE9wZW5ScGMsXG4gIFNpbmdsZU1ldGhvZERvY3VtZW50YXRpb24sXG59IGZyb20gJ0BzaGFyZWQvbW9kZWxzL29wZW5ycGMubW9kZWwnO1xuaW1wb3J0IHsgUnBjU2VydmVyIH0gZnJvbSAnLi9ycGMtc2VydmVyJztcblxuLyoqXG4gKiBPd25zIHRoZSBXZWJTb2NrZXRTZXJ2ZXIgdGhhdCBsaXN0ZW5zIGZvciBjbGllbnRzIHRvIGNvbm5lY3QgdG8gdGhlIHdlYiBzb2NrZXQuIFdoZW4gYSBjbGllbnRcbiAqIGNvbm5lY3RzLCBhbiBScGNTZXJ2ZXIgaXMgY3JlYXRlZCBpbiB0aGlzIHNhbWUgcHJvY2VzcyB0byBzZXJ2aWNlIHRoYXQgY29ubmVjdGlvbi5cbiAqXG4gKiBBbHNvIG93bnMgYSBtYXAgb2YgYWxsIHJlZ2lzdGVyZWQgbWV0aG9kcyB0aWVkIHRvIHRoZSBJUnBjSGFuZGxlciB0aGF0IGtub3dzIGhvdyB0byByZXNwb25kIHRvXG4gKiB0aG9zZSBtZXRob2RzLiBNZXRob2RzIHJlZ2lzdGVyZWQgd2l0aGluIFwibWFpblwiIHdpbGwgYmUgdGllZCB0byB0aGlzIGNsYXNzLiBNZXRob2RzIHJlZ2lzdGVyZWQgYnlcbiAqIG90aGVyIHByb2Nlc3NlcyB3aWxsIGJlIHRpZWQgdG8gdGhlIFJQQ1NlcnZlciB0aGF0IHNlcnZpY2VzIHRoZSBjb25uZWN0aW9uIGZvciB0aGF0IG90aGVyXG4gKiBwcm9jZXNzLlxuICpcbiAqIENyZWF0ZWQgYnkgdGhlIG1haW4gcHJvY2VzcyBvbiBzdGFydCB1cCB3aGVuIHRoZSBuZXR3b3JrIHNlcnZpY2UgaW5pdGlhbGl6ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFJwY1dlYlNvY2tldExpc3RlbmVyIGltcGxlbWVudHMgSVJwY01ldGhvZFJlZ2lzdHJhciB7XG4gIGNvbm5lY3Rpb25TdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRpc2Nvbm5lY3RlZDtcbiAgcHJpdmF0ZSBsb2NhbEV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHdlYlNvY2tldFNlcnZlcjogV2ViU29ja2V0U2VydmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIG5leHRTb2NrZXROdW1iZXIgPSAxO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbm5lY3Rpb25NdXRleCA9IG5ldyBNdXRleCgpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJwY1NlcnZlckJ5U29ja2V0ID0gbmV3IE1hcDxXZWJTb2NrZXQsIFJwY1NlcnZlcj4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lID0gbmV3IE1hcDxzdHJpbmcsIFJlZ2lzdGVyZWRScGNNZXRob2REZXRhaWxzPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsTWV0aG9kc0J5TWV0aG9kTmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBJbnRlcm5hbFJlcXVlc3RIYW5kbGVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGJpbmRDbGFzc01ldGhvZHMuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIGdldCBuZXh0U29ja2V0SWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCByZXRWYWwgPSB0aGlzLm5leHRTb2NrZXROdW1iZXIudG9TdHJpbmcoMTApO1xuICAgIHRoaXMubmV4dFNvY2tldE51bWJlciArPSAxO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBjb25uZWN0KGxvY2FsRXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uTXV0ZXgucnVuRXhjbHVzaXZlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMgIT09IENvbm5lY3Rpb25TdGF0dXMuRGlzY29ubmVjdGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLmxvY2FsRXZlbnRIYW5kbGVyID0gbG9jYWxFdmVudEhhbmRsZXI7XG4gICAgICB0aGlzLnJlZ2lzdGVyTWV0aG9kKEdFVF9NRVRIT0RTLCB0aGlzLmdlbmVyYXRlT3BlblJwY1NjaGVtYSwge1xuICAgICAgICBtZXRob2Q6IHtcbiAgICAgICAgICBzdW1tYXJ5OiAnR2V0IGRvY3VtZW50YXRpb24gZm9yIGFsbCBhdmFpbGFibGUgbWV0aG9kcyBvbiB0aGUgUEFQSSB3ZWJzb2NrZXQnLFxuICAgICAgICAgIHBhcmFtczogW10sXG4gICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBuYW1lOiAncmV0dXJuIHZhbHVlJyxcbiAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLndlYlNvY2tldFNlcnZlciA9IG5ldyBXZWJTb2NrZXRTZXJ2ZXIoeyBwb3J0OiBXRUJTT0NLRVRfUE9SVCB9KTtcbiAgICAgIHRoaXMud2ViU29ja2V0U2VydmVyLmFkZExpc3RlbmVyKCdjb25uZWN0aW9uJywgdGhpcy5vbkNsaWVudENvbm5lY3QpO1xuICAgICAgdGhpcy53ZWJTb2NrZXRTZXJ2ZXIuYWRkTGlzdGVuZXIoJ2Nsb3NlJywgdGhpcy5kaXNjb25uZWN0KTtcblxuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5Db25uZWN0ZWQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbk11dGV4LnJ1bkV4Y2x1c2l2ZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy53ZWJTb2NrZXRTZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXRTZXJ2ZXIucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3Rpb24nLCB0aGlzLm9uQ2xpZW50Q29ubmVjdCk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0U2VydmVyLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIHRoaXMuZGlzY29ubmVjdCk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0U2VydmVyLmNsb3NlKCk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0U2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvY2FsRXZlbnRIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5EaXNjb25uZWN0ZWQ7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KFxuICAgIHJlcXVlc3RUeXBlOiBTZXJpYWxpemVkUmVxdWVzdFR5cGUsXG4gICAgcmVxdWVzdFBhcmFtczogUmVxdWVzdFBhcmFtcyxcbiAgKTogUHJvbWlzZTxKU09OUlBDUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gcmVxdWVzdFdpdGhSZXRyeShcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kRGV0YWlscyA9IHRoaXMucnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZS5nZXQocmVxdWVzdFR5cGUpO1xuICAgICAgICBpZiAoIW1ldGhvZERldGFpbHMpXG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgICBgTm8gaGFuZGxlciBmb3VuZCBmb3IgJHtyZXF1ZXN0VHlwZX1gLFxuICAgICAgICAgICAgSlNPTlJQQ0Vycm9yQ29kZS5NZXRob2ROb3RGb3VuZCxcbiAgICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGhhbmRsZXIgfSA9IG1ldGhvZERldGFpbHM7XG4gICAgICAgIGlmIChoYW5kbGVyICE9PSB0aGlzKSByZXR1cm4gaGFuZGxlci5yZXF1ZXN0KHJlcXVlc3RUeXBlLCByZXF1ZXN0UGFyYW1zKTtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5sb2NhbE1ldGhvZHNCeU1ldGhvZE5hbWUuZ2V0KHJlcXVlc3RUeXBlKTtcbiAgICAgICAgaWYgKCFtZXRob2QpXG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgICBgTG9jYWxseSByZWdpc3RlcmVkIG1ldGhvZCBuYW1lIG1pc3NpbmcgdGhlIGFjdHVhbCBtZXRob2RgLFxuICAgICAgICAgICAgSlNPTlJQQ0Vycm9yQ29kZS5JbnRlcm5hbEVycm9yLFxuICAgICAgICAgICk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gbWV0aG9kKC4uLnJlcXVlc3RQYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IGF3YWl0ZWRSZXN1bHQgPSByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlID8gYXdhaXQgcmVzdWx0IDogcmVzdWx0O1xuICAgICAgICAgIHJldHVybiBjcmVhdGVTdWNjZXNzUmVzcG9uc2UoYXdhaXRlZFJlc3VsdCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yUmVzcG9uc2UoZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgSlNPTlJQQ0Vycm9yQ29kZS5JbnRlcm5hbEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdycGMtd2Vic29ja2V0LWxpc3RlbmVyJyxcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICk7XG4gIH1cblxuICBhc3luYyByZWdpc3Rlck1ldGhvZChcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgbWV0aG9kOiBJbnRlcm5hbFJlcXVlc3RIYW5kbGVyLFxuICAgIG1ldGhvZERvY3M/OiBTaW5nbGVNZXRob2REb2N1bWVudGF0aW9uLFxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnJwY01ldGhvZERldGFpbHNCeU1ldGhvZE5hbWUuaGFzKG1ldGhvZE5hbWUpIHx8XG4gICAgICB0aGlzLmxvY2FsTWV0aG9kc0J5TWV0aG9kTmFtZS5oYXMobWV0aG9kTmFtZSlcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnJwY01ldGhvZERldGFpbHNCeU1ldGhvZE5hbWUuc2V0KG1ldGhvZE5hbWUsIHsgaGFuZGxlcjogdGhpcywgbWV0aG9kRG9jcyB9KTtcbiAgICB0aGlzLmxvY2FsTWV0aG9kc0J5TWV0aG9kTmFtZS5zZXQobWV0aG9kTmFtZSwgbWV0aG9kKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIHVucmVnaXN0ZXJNZXRob2QobWV0aG9kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgbWV0aG9kRGV0YWlscyA9IHRoaXMucnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZS5nZXQobWV0aG9kTmFtZSk7XG4gICAgaWYgKCFtZXRob2REZXRhaWxzIHx8IG1ldGhvZERldGFpbHMuaGFuZGxlciAhPT0gdGhpcykgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMucnBjTWV0aG9kRGV0YWlsc0J5TWV0aG9kTmFtZS5kZWxldGUobWV0aG9kTmFtZSk7XG4gICAgdGhpcy5sb2NhbE1ldGhvZHNCeU1ldGhvZE5hbWUuZGVsZXRlKG1ldGhvZE5hbWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2VuZXJhdGVPcGVuUnBjU2NoZW1hKCk6IE9wZW5ScGMge1xuICAgIGNvbnN0IG9wZW5ScGNTY2hlbWEgPSBjcmVhdGVFbXB0eU9wZW5ScGMoYXBwLmdldFZlcnNpb24oKSk7XG4gICAgb3BlblJwY1NjaGVtYS5tZXRob2RzID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiBSRUdJU1RFUl9NRVRIT0QsXG4gICAgICAgIHN1bW1hcnk6ICdSZWdpc3RlciBhIG1ldGhvZCBvbiB0aGUgbmV0d29yaycsXG4gICAgICAgIHBhcmFtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdtZXRob2ROYW1lJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgc3VtbWFyeTogJ05hbWUgb2YgdGhlIG1ldGhvZCB0byByZWdpc3RlcicsXG4gICAgICAgICAgICBzY2hlbWE6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdtZXRob2REb2NzJyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN1bW1hcnk6ICdEb2N1bWVudGF0aW9uIGZvciB0aGUgbWV0aG9kIGluIE9wZW5SUEMgZm9ybWF0JyxcbiAgICAgICAgICAgIHNjaGVtYTogeyB0eXBlOiAnb2JqZWN0JyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIG5hbWU6ICdyZXR1cm4gdmFsdWUnLFxuICAgICAgICAgIHN1bW1hcnk6ICdXaGV0aGVyIHRoZSBtZXRob2Qgd2FzIHN1Y2Nlc3NmdWxseSByZWdpc3RlcmVkJyxcbiAgICAgICAgICBzY2hlbWE6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBVTlJFR0lTVEVSX01FVEhPRCxcbiAgICAgICAgc3VtbWFyeTogJ1VucmVnaXN0ZXIgYSBtZXRob2Qgb24gdGhlIG5ldHdvcmsnLFxuICAgICAgICBwYXJhbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbWV0aG9kTmFtZScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN1bW1hcnk6ICdOYW1lIG9mIHRoZSBtZXRob2QgdG8gdW5yZWdpc3RlcicsXG4gICAgICAgICAgICBzY2hlbWE6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBuYW1lOiAncmV0dXJuIHZhbHVlJyxcbiAgICAgICAgICBzdW1tYXJ5OiAnV2hldGhlciB0aGUgbWV0aG9kIHdhcyBzdWNjZXNzZnVsbHkgdW5yZWdpc3RlcmVkJyxcbiAgICAgICAgICBzY2hlbWE6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF07XG4gICAgdGhpcy5ycGNNZXRob2REZXRhaWxzQnlNZXRob2ROYW1lLmZvckVhY2goKGRldGFpbHMsIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgIGlmIChkZXRhaWxzLm1ldGhvZERvY3MpIHtcbiAgICAgICAgY29uc3QgbmV3RG9jcyA9IHsgbmFtZTogbWV0aG9kTmFtZSwgLi4uZGV0YWlscy5tZXRob2REb2NzLm1ldGhvZCB9O1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIG5hbWUgd2l0aCBgbWV0aG9kTmFtZWAgaW4gY2FzZSBgZGV0YWlscy5tZXRob2REb2NzLm1ldGhvZGAgaW5jbHVkZWQgYSBuYW1lXG4gICAgICAgIG5ld0RvY3MubmFtZSA9IG1ldGhvZE5hbWU7XG4gICAgICAgIG9wZW5ScGNTY2hlbWEubWV0aG9kcy5wdXNoKG5ld0RvY3MpO1xuICAgICAgICBpZiAoZGV0YWlscy5tZXRob2REb2NzLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICBvcGVuUnBjU2NoZW1hLmNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICBzY2hlbWFzOiB7XG4gICAgICAgICAgICAgIC4uLmRldGFpbHMubWV0aG9kRG9jcy5jb21wb25lbnRzLnNjaGVtYXMsXG4gICAgICAgICAgICAgIC4uLm9wZW5ScGNTY2hlbWEuY29tcG9uZW50cz8uc2NoZW1hcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250ZW50RGVzY3JpcHRvcnM6IHtcbiAgICAgICAgICAgICAgLi4uZGV0YWlscy5tZXRob2REb2NzLmNvbXBvbmVudHMuY29udGVudERlc2NyaXB0b3JzLFxuICAgICAgICAgICAgICAuLi5vcGVuUnBjU2NoZW1hLmNvbXBvbmVudHM/LmNvbnRlbnREZXNjcmlwdG9ycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAuLi5kZXRhaWxzLm1ldGhvZERvY3MuY29tcG9uZW50cy5leGFtcGxlcyxcbiAgICAgICAgICAgICAgLi4ub3BlblJwY1NjaGVtYS5jb21wb25lbnRzPy5leGFtcGxlcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rczoge1xuICAgICAgICAgICAgICAuLi5kZXRhaWxzLm1ldGhvZERvY3MuY29tcG9uZW50cy5saW5rcyxcbiAgICAgICAgICAgICAgLi4ub3BlblJwY1NjaGVtYS5jb21wb25lbnRzPy5saW5rcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICAgICAgLi4uZGV0YWlscy5tZXRob2REb2NzLmNvbXBvbmVudHMuZXJyb3JzLFxuICAgICAgICAgICAgICAuLi5vcGVuUnBjU2NoZW1hLmNvbXBvbmVudHM/LmVycm9ycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiB7XG4gICAgICAgICAgICAgIC4uLmRldGFpbHMubWV0aG9kRG9jcy5jb21wb25lbnRzLnRhZ3MsXG4gICAgICAgICAgICAgIC4uLm9wZW5ScGNTY2hlbWEuY29tcG9uZW50cz8udGFncyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlblJwY1NjaGVtYS5tZXRob2RzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICAgICAgLi4uZ2V0RW1wdHlNZXRob2REb2NzKCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9wZW5ScGNTY2hlbWEubWV0aG9kcy5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcbiAgICByZXR1cm4gb3BlblJwY1NjaGVtYTtcbiAgfVxuXG4gIGVtaXRFdmVudE9uTmV0d29yazxUPihldmVudFR5cGU6IHN0cmluZywgZXZlbnQ6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnJwY1NlcnZlckJ5U29ja2V0LmZvckVhY2goKHJwY1NlcnZlcikgPT4ge1xuICAgICAgcnBjU2VydmVyLmVtaXRFdmVudE9uTmV0d29yayhldmVudFR5cGUsIGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgcnVuIGJ5IGFuIFJQQ1NlcnZlciB3aGVuIGl0IHJlY2VpdmVzIGFuIGV2ZW50IG1lc3NhZ2Ugb24gdGhlIHdlYnNvY2tldCBmcm9tIGEgY2xpZW50XG4gIHByaXZhdGUgcHJvcGFnYXRlRXZlbnQ8VD4oc291cmNlOiBScGNTZXJ2ZXIsIGV2ZW50VHlwZTogc3RyaW5nLCBldmVudDogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sb2NhbEV2ZW50SGFuZGxlcikgdGhyb3cgbmV3IEVycm9yKGBsb2NhbEV2ZW50SGFuZGxlciBub3Qgc2V0YCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50KSB8fCBldmVudC5sZW5ndGggIT09IDEpIHRocm93IG5ldyBFcnJvcihgZXZlbnQgbm90IHdyYXBwZWQgaW4gYXJyYXlgKTtcbiAgICB0aGlzLmxvY2FsRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSwgZXZlbnRbMF0pO1xuICAgIHRoaXMucnBjU2VydmVyQnlTb2NrZXQuZm9yRWFjaCgocnBjU2VydmVyKSA9PiB7XG4gICAgICBpZiAocnBjU2VydmVyICE9PSBzb3VyY2UpIHJwY1NlcnZlci5lbWl0RXZlbnRPbk5ldHdvcmsoZXZlbnRUeXBlLCBldmVudFswXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uQ2xpZW50Q29ubmVjdCh3ZWJTb2NrZXQ6IFdlYlNvY2tldCk6IHZvaWQge1xuICAgIGNvbnN0IHJwY1NlcnZlciA9IG5ldyBScGNTZXJ2ZXIoXG4gICAgICB0aGlzLm5leHRTb2NrZXRJZCxcbiAgICAgIHdlYlNvY2tldCxcbiAgICAgIHRoaXMucHJvcGFnYXRlRXZlbnQsXG4gICAgICB0aGlzLnJwY01ldGhvZERldGFpbHNCeU1ldGhvZE5hbWUsXG4gICAgKTtcbiAgICBycGNTZXJ2ZXIuY29ubmVjdCgpO1xuICAgIHRoaXMucnBjU2VydmVyQnlTb2NrZXQuc2V0KHdlYlNvY2tldCwgcnBjU2VydmVyKTtcbiAgICBsb2dnZXIud2FybihgV2Vic29ja2V0IGNsaWVudCBjb25uZWN0ZWQ6ICR7d2ViU29ja2V0LnVybH1gKTtcbiAgICB3ZWJTb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xpZW50RGlzY29ubmVjdCk7XG4gIH1cblxuICBwcml2YXRlIG9uQ2xpZW50RGlzY29ubmVjdChldjogQ2xvc2VFdmVudCk6IHZvaWQge1xuICAgIC8vIEFzc2VydCB0aGUgY29ycmVjdCB0eXBlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXR5cGUtYXNzZXJ0aW9uL25vLXR5cGUtYXNzZXJ0aW9uXG4gICAgY29uc3Qgd2ViU29ja2V0ID0gZXYudGFyZ2V0IGFzIFdlYlNvY2tldDtcbiAgICB3ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uQ2xpZW50RGlzY29ubmVjdCk7XG4gICAgaWYgKCF0aGlzLnJwY1NlcnZlckJ5U29ja2V0LmRlbGV0ZSh3ZWJTb2NrZXQpKSB7XG4gICAgICBsb2dnZXIud2FybihgQ2xvc2UgY2FsbGVkIG9uIHNvY2tldCBmb3IgJyR7d2ViU29ja2V0LnVybH0nIGJ1dCBubyBoYW5kbGVyIGZvdW5kYCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJwY1dlYlNvY2tldExpc3RlbmVyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9