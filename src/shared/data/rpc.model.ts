import { SerializedRequestType } from '@shared/utils/util';
import {
  JSONRPC,
  JSONRPCErrorCode,
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCSuccessResponse,
} from 'json-rpc-2.0';
import { deserialize, serialize } from 'platform-bible-utils';

/** Port to use for the WebSocket */
export const WEBSOCKET_PORT = 8876;

/**
 * Whether an RPC object is setting up or has finished setting up its connection and is ready to
 * communicate on the network
 */
export enum ConnectionStatus {
  /** Not connected to the network */
  Disconnected,
  /** Attempting to connect to the network */
  Connecting,
  /** Finished setting up its connection */
  Connected,
}

/** Parameters provided to an RPC request message */
// Align with types from the JSON RPC package
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestParams = Array<any>;

/**
 * Function to call internally when a request is received. The return value is sent back as the
 * response to the request. If the request was received over the network, the response will be
 * packaged into a JSONRPCSuccessResponse message.
 */
// Align with types from the JSON RPC package
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InternalRequestHandler = (...requestParams: RequestParams) => any;

/** Function that processes an event received locally or over the network */
export type EventHandler = <T>(eventType: string, event: T) => void;

/**
 * ID of an individual request. It must be unique between an RPC client and server for a single
 * connection. Once a connection has closed and reopens, IDs can be reused.
 */
export type RequestId = number | string;

/**
 * Create a JSONRPCRequest message
 *
 * @param requestType Indicates what to do with the request
 * @param requestParams Parameters to pass along when the request is processed
 * @param requestId Unique ID for this connection of this request
 * @returns JSONRPCRequest message that can be serialized and sent over a connection
 */
export function createRequest(
  requestType: SerializedRequestType,
  requestParams: RequestParams,
  requestId: RequestId,
): JSONRPCRequest {
  return { jsonrpc: JSONRPC, id: requestId, method: requestType, params: requestParams };
}

/**
 * Create a JSONRPCSuccessResponse message
 *
 * @param contents Data to return to the requester when the request succeeds
 * @param requestId ID of the request that this response is intended to address. If no ID was
 *   provided, don't pass a value to this parameter.
 * @returns JSONRPCSuccessResponse message that can be serialized and sent over a connection
 */
export function createSuccessResponse<T>(
  contents: T,
  requestId: RequestId = 0,
): JSONRPCSuccessResponse {
  return { jsonrpc: JSONRPC, id: requestId, result: contents };
}

/**
 * Create a JSONRPCErrorResponse message
 *
 * @param errorMessage Text to provide to the requester about why this request failed
 * @param errorCode JSONRPCErrorCode value that best aligns with the purpose of the failure
 * @param requestId ID of the request that this response is intended to address. If no ID was
 *   provided, don't pass a value to this parameter.
 * @returns JSONRPCErrorResponse message that can be serialized and sent over a connection
 */
export function createErrorResponse(
  errorMessage: string,
  errorCode: JSONRPCErrorCode = JSONRPCErrorCode.InternalError,
  requestId: RequestId = 0,
): JSONRPCErrorResponse {
  return { jsonrpc: JSONRPC, id: requestId, error: { code: errorCode, message: errorMessage } };
}

/** Serialize a payload, if needed, and send it over the provided WebSocket */
export function sendPayloadToWebSocket(ws: WebSocket | undefined, payload: unknown): void {
  if (!ws) throw new Error(`Tried to send payload while not connected`);
  if (
    typeof payload === 'string' ||
    payload instanceof ArrayBuffer ||
    payload instanceof Blob ||
    ArrayBuffer.isView(payload)
  ) {
    ws.send(payload);
  } else {
    ws.send(serialize(payload));
  }
}

/**
 * Deserialize a payload from the network and return it as a JSONRPC message or array of messages.
 * Note that all `null` values from the payload will be converted into `undefined` values except for
 * `result` values in JSONRPCSuccessResponse messages. A `null` value as the response to a request
 * must not be converted to `undefined` per the JSONRPC protocol.
 */
export function deserializeMessage(
  payload: string,
): JSONRPCRequest | JSONRPCResponse | Array<JSONRPCRequest | JSONRPCResponse> {
  const message = deserialize(payload);
  const messageType = typeof message;
  if (messageType !== 'object') return message;
  if (Array.isArray(message)) {
    message.forEach((msg) => {
      // Required by the protocol since we convert "undefined" to "null" in "deserialize"
      // eslint-disable-next-line no-null/no-null
      if (typeof msg === 'object' && 'result' in msg && msg.result === undefined) msg.result = null;
    });
  } else if ('result' in message && message.result === undefined)
    // Required by the protocol since we convert "undefined" to "null" in "deserialize"
    // eslint-disable-next-line no-null/no-null
    message.result = null;

  return message;
}

/**
 * Register a method on the network so that requests of the given type are routed to your request
 * handler.
 */
export const REGISTER_METHOD = 'network:registerMethod';

/**
 * Unregister a method on the network so that requests of the given type are no longer routed to
 * your request handler.
 */
export const UNREGISTER_METHOD = 'network:unregisterMethod';

/** Get all methods that are currently registered on the network. */
export const GET_METHODS = 'network:getMethods';

/** Prefix on requests that indicates that the request is a command */
export const CATEGORY_COMMAND = 'command';
