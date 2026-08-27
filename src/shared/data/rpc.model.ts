import { logger } from '@shared/services/logger.service';
import { SerializedRequestType } from '@shared/utils/util';
import {
  JSONRPC,
  JSONRPCErrorCode,
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCSuccessResponse,
} from 'json-rpc-2.0';
import { deserialize, getErrorMessage, retryUntil, serialize } from 'platform-bible-utils';

/** Port to use for the WebSocket */
export const WEBSOCKET_PORT = 8876;

/**
 * How many times to try sending a request before giving up if the request is not yet registered.
 * Exported so callers that layer their own retry policy on top of {@link requestWithRetry}'s cadence
 * (e.g. the Power-mode startup sync's boot-race loop) can derive from this shared policy instead of
 * re-declaring the literal and silently diverging if it is ever retuned.
 *
 * @experimental
 */
export const MAX_REQUEST_ATTEMPTS = 10;
/**
 * How long in ms to wait between request attempts if the request is not yet registered. Exported
 * for the same derive-don't-duplicate reason as {@link MAX_REQUEST_ATTEMPTS}.
 *
 * @experimental
 */
export const REQUEST_ATTEMPT_WAIT_TIME_MS = 1000;

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

/** Maximum characters retained from a single logged detail (close reason, error stack) */
export const MAX_LOGGED_DETAIL_LENGTH = 200;

/**
 * Read a property without trusting the source object. Returns `undefined` if the property is absent
 * or if reading it throws — a hostile or exotic accessor must not turn a logged disconnect into an
 * unhandled exception inside a close handler.
 */
function readEventProperty(source: object, key: string): unknown {
  try {
    return Reflect.get(source, key);
  } catch {
    return undefined;
  }
}

/**
 * Collapse whitespace that would break line-oriented log parsing and bound the length, so a single
 * event cannot flood a log line. Values here can originate from a remote peer.
 */
function sanitizeForLog(value: string): string {
  const collapsed = value.replace(/[\r\n\t]+/g, ' ');
  return collapsed.length > MAX_LOGGED_DETAIL_LENGTH
    ? `${collapsed.slice(0, MAX_LOGGED_DETAIL_LENGTH)}…`
    : collapsed;
}

/**
 * Describe a WebSocket `close` event for a log line.
 *
 * Chromium and the `ws` library deliver structurally different close events, and both keep
 * `code`/`reason`/`wasClean` as accessors on the prototype rather than own properties — so
 * `JSON.stringify` on one yields `{}`. Read the fields explicitly instead.
 *
 * `code` is the single most diagnostic field: 1006 (abnormal, no close frame) means the connection
 * died rather than being closed politely.
 */
export function describeWebSocketCloseEvent(ev: unknown): string {
  if (typeof ev !== 'object' || !ev) return 'code=n/a reason=n/a wasClean=n/a';

  const rawCode = readEventProperty(ev, 'code');
  const code = typeof rawCode === 'number' ? `${rawCode}` : 'n/a';

  const rawReason = readEventProperty(ev, 'reason');
  const reason = typeof rawReason === 'string' ? `"${sanitizeForLog(rawReason)}"` : 'n/a';

  const rawWasClean = readEventProperty(ev, 'wasClean');
  const wasClean = typeof rawWasClean === 'boolean' ? `${rawWasClean}` : 'n/a';

  return `code=${code} reason=${reason} wasClean=${wasClean}`;
}

/**
 * Describe a WebSocket `error` event for a log line.
 *
 * The `ws` library's `ErrorEvent` keeps `message` and `error` as accessors on the prototype, so
 * `JSON.stringify` on the event yields `{}` — only own properties are serialized. Read the fields
 * explicitly.
 *
 * Note a browser `WebSocket` fires a plain `Event` on error, carrying no detail at all by
 * specification, so `message=unknown` is the expected result on the renderer end.
 */
export function describeWebSocketErrorEvent(ev: unknown): string {
  let message = 'unknown';
  let code = 'n/a';
  let stack = '';

  if (typeof ev === 'object' && ev) {
    const rawMessage = readEventProperty(ev, 'message');
    if (typeof rawMessage === 'string') message = sanitizeForLog(rawMessage);

    const error = readEventProperty(ev, 'error');
    if (typeof error === 'object' && error) {
      // Duck-type rather than `instanceof Error`: Electron main and renderer are separate
      // realms, so a genuine Error from the other side fails an instanceof check.
      const errorMessage = readEventProperty(error, 'message');
      if (typeof errorMessage === 'string') message = sanitizeForLog(errorMessage);

      const errorCode = readEventProperty(error, 'code');
      if (typeof errorCode === 'string' || typeof errorCode === 'number')
        code = sanitizeForLog(`${errorCode}`);

      const errorStack = readEventProperty(error, 'stack');
      if (typeof errorStack === 'string') stack = sanitizeForLog(errorStack);

      const cause = readEventProperty(error, 'cause');
      if (typeof cause === 'object' && cause) {
        const causeMessage = readEventProperty(cause, 'message');
        if (typeof causeMessage === 'string')
          message = `${message} (cause: ${sanitizeForLog(causeMessage)})`;
      }
    }
  }

  return `message=${message} code=${code}${stack ? `\nstack: ${stack}` : ''}`;
}

/** Serialize a payload, if needed, and send it over the provided WebSocket */
export function sendPayloadToWebSocket(ws: WebSocket | undefined, payload: unknown): void {
  if (!ws) throw new Error(`Tried to send payload while not connected`);

  // Skip if the socket is already closing/closed. This avoids `ws.send` throwing
  // synchronously with "WebSocket is not open" or queuing a write that will fail.
  // 0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED
  if (ws.readyState !== 1) {
    logger.debug(
      `sendPayloadToWebSocket: skipping send to non-OPEN socket (readyState=${ws.readyState})`,
    );
    return;
  }

  // Wrap ws.send in try/catch so a broken pipe / closed-socket error cannot bubble
  // up as an uncaught exception in the main process. EPIPE is observed in the broadcast
  // fan-out when one subscriber's underlying TCP socket has been torn down but the
  // WebSocket's readyState transition has not yet propagated (see D-010).
  try {
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
  } catch (error) {
    // Log at warn (not error) — this is recoverable and very chatty on disconnects.
    // The owning RpcServer will get the WebSocket 'close' event and clean up shortly.
    logger.warn(
      `sendPayloadToWebSocket: send failed (likely closed peer); dropping payload. ${getErrorMessage(error)}`,
    );
  }
}

/**
 * Deserialize a payload from the network and return it as a JSONRPC message or array of messages.
 * Note that all `null` values from the payload will be converted into `undefined` values except for
 * `result` values in JSONRPCSuccessResponse messages. A `null` value as the response to a request
 * must not be converted to `undefined` per the JSONRPC protocol.
 *
 * After a request has been processed by the protocol stack, call `fixupResponse` to restore
 * `undefined` responses.
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
 * Convert `null` results back to `undefined` once we're out of the protocol stack.
 *
 * This works in tandem with `deserializeMessage` to properly handle `null` values in JSONRPC
 * messages.
 */
export function fixupResponse(response: JSONRPCResponse): JSONRPCResponse {
  // Convert "null" back to "undefined" before it flows back out to callers
  // eslint-disable-next-line no-null/no-null
  if ('result' in response && response.result === null) response.result = undefined;
  return response;
}

/**
 * Runs the request callback and retries a number of times if `requestCallback` resolves to a method
 * not found error
 *
 * @param requestCallback Function to run to send a JSON-RPC request. Should return a JSONRPC error
 *   with code {@link JSONRPCErrorCode.MethodNotFound} if it fails to find the method
 * @param name Name of the handler running this request for logging purposes
 * @param requestType Type of request for logging purposes
 * @returns The response from the request including the method not found error if it times out
 */
export async function requestWithRetry(
  requestCallback: () => Promise<JSONRPCResponse>,
  name: string,
  requestType: string,
): Promise<JSONRPCResponse> {
  // https://github.com/paranext/paranext-core/issues/51
  // If the request type doesn't have a registered handler yet, retry a few times to help with race
  // conditions. This approach is hacky but works well enough for now.
  // One predicate for "handler not registered yet" so the attempt-side log and the retry-side
  // stop condition can never disagree about what counts as the retryable race.
  const isMissingHandler = (response: JSONRPCResponse): boolean =>
    !!response.error && response.error.code === JSONRPCErrorCode.MethodNotFound;
  return retryUntil(
    async (attemptNumber) => {
      const response = await requestCallback();
      if (isMissingHandler(response))
        logger.debug(
          `RPC handler ${name} could not find a request handler for requestType ${requestType} on attempt ${attemptNumber} of ${MAX_REQUEST_ATTEMPTS}. ${attemptNumber >= MAX_REQUEST_ATTEMPTS ? 'Giving up.' : 'Retrying...'}`,
        );
      return response;
    },
    // Stop as soon as the response is not a missing-handler error — a success or any other error is
    // the caller's to handle, only MethodNotFound is the race we retry.
    (response) => !isMissingHandler(response),
    { maxAttempts: MAX_REQUEST_ATTEMPTS, delayMs: REQUEST_ATTEMPT_WAIT_TIME_MS },
  );
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

/**
 * Register a network event emitter with the main process so that the event is tracked centrally.
 * Multi-source vs. single-source semantics are determined by looking up the event name in
 * `MULTI_SOURCE_EVENT_NAMES`.
 */
export const REGISTER_EVENT = 'network:registerEvent';

/**
 * Unregister a network event emitter from the main process so that the event is no longer tracked
 * centrally.
 */
export const UNREGISTER_EVENT = 'network:unregisterEvent';

/**
 * Get all methods that are currently registered on the network. Required to be 'rpc.discover' by
 * the OpenRPC specification.
 */
export const GET_METHODS = 'rpc.discover';

/** Prefix on requests that indicates that the request is a command */
export const CATEGORY_COMMAND = 'command';

/**
 * Builds the exact prefix that `network.service`'s `doRequest` embeds in the message it throws for
 * a JSON-RPC _error response_ with the given `code` — the full thrown message is this prefix
 * followed by `: <error message>`.
 *
 * Exported so the few callers that must classify these thrown errors by message (there is no richer
 * machine-readable marker for a "method not found" response) derive the format from this single
 * producer instead of hand-copying the literal. Hand-copied copies silently drift: reformat the
 * producer and a separate matcher/fixture keeps matching its old string while real errors stop
 * matching, and the tests stay green. Everything routing through this function stays in lockstep.
 *
 * @param code The JSON-RPC error code from the error response being classified
 * @returns The exact message prefix `doRequest` uses for an error response with that `code`
 * @experimental
 */
export function getJsonRpcRequestErrorMessagePrefix(code: number): string {
  return `JSON-RPC Request error (${code})`;
}

/**
 * Prefix that `network.service`'s `doRequest` embeds in the message it throws when a request times
 * out client-side before any response arrives. Exported for the same drift-prevention reason as
 * {@link getJsonRpcRequestErrorMessagePrefix}.
 *
 * @experimental
 */
export const JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX = 'JSON-RPC Request timed out:';
