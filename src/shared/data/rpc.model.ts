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

/**
 * Maximum characters retained from a single logged detail that can originate from a remote peer (a
 * close `reason`, an error `message`)
 */
export const MAX_LOGGED_DETAIL_LENGTH = 200;

/**
 * Maximum characters retained from a logged stack trace.
 *
 * Far more generous than {@link MAX_LOGGED_DETAIL_LENGTH} because a stack is generated locally
 * rather than supplied by a peer, so the flood-protection rationale does not apply — and because a
 * stack bounded to a couple of hundred characters is one or two frames, which is rarely the frame
 * that explains a disconnect.
 */
export const MAX_LOGGED_STACK_LENGTH = 4000;

/**
 * Close code used when we close a PAPI socket on purpose (shutdown, teardown). The WebSocket spec
 * reserves 3000-4999 for application use, so carrying intent in the code itself lets a close
 * handler tell a deliberate shutdown from a connection that died, with no extra state to keep in
 * sync.
 */
export const INTENTIONAL_CLOSE_CODE = 4000;

/**
 * Whether a WebSocket close `code` represents a clean, expected shutdown rather than a connection
 * that died.
 *
 * Clean codes: 1000 (normal), 1001 (going away — a page or window navigating away or closing), 1005
 * (no status code was present in the close frame, which a plain `close()` with no arguments
 * produces), and {@link INTENTIONAL_CLOSE_CODE}, this codebase's own marker for a close we initiated
 * on purpose. What all four have in common is that a closing handshake completed. The code that
 * matters is 1006: no close frame was ever received, the fingerprint of a connection that died
 * rather than being closed — the shape a suspend produces.
 *
 * Shared so the client and server close handlers cannot independently drift on which codes count as
 * clean. {@link isCleanCloseEvent} is the predicate to use where the event itself is in hand.
 *
 * @param code `code` from a WebSocket `close` event
 * @returns `true` if the code indicates a completed closing handshake, `false` otherwise (including
 *   for a non-numeric code)
 */
export function isCleanCloseCode(code: unknown): boolean {
  return code === 1000 || code === 1001 || code === 1005 || code === INTENTIONAL_CLOSE_CODE;
}

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
 * Collapse characters that would break line-oriented log parsing and bound the length, so a single
 * event cannot flood a log line. Values here can originate from a remote peer.
 *
 * The character class covers every C0/C1 control (so `\f`, `\v`, NUL, ESC and U+0085 as well as
 * `\r\n\t`) plus the Unicode line and paragraph separators U+2028/U+2029, which are not control
 * characters but do render as line breaks in JavaScript-based log viewers.
 *
 * @param value Text to make safe for a single log line
 * @param maxLength Characters to retain. Defaults to {@link MAX_LOGGED_DETAIL_LENGTH}; pass
 *   {@link MAX_LOGGED_STACK_LENGTH} for a locally generated stack.
 * @returns The collapsed text, suffixed with an ellipsis if it had to be truncated
 */
function sanitizeForLog(value: string, maxLength: number = MAX_LOGGED_DETAIL_LENGTH): string {
  const collapsed = value.replace(/[\p{Cc}\p{Zl}\p{Zp}]+/gu, ' ');
  return collapsed.length > maxLength ? `${collapsed.slice(0, maxLength)}…` : collapsed;
}

/**
 * Whether a close event's already-read fields represent an orderly shutdown rather than a
 * connection that died.
 *
 * Takes the values rather than the event so a caller needing both the verdict and the values reads
 * each property exactly once. Two independent reads of the same accessor can disagree — precisely
 * the hostile case these formatters are tested against — which would let a printed code contradict
 * the `abnormal` marker derived from it.
 */
function isCleanFromCloseParts(wasClean: unknown, code: unknown): boolean {
  if (typeof wasClean === 'boolean') return wasClean;
  return isCleanCloseCode(code);
}

/**
 * Whether a close event represents an orderly shutdown rather than a connection that died.
 *
 * `wasClean` is the authoritative answer — it reports whether a closing handshake completed — so it
 * wins whenever the event carries it. Both Chromium and the `ws` library always set it; the
 * {@link isCleanCloseCode} fallback covers a partial or foreign event shape that does not.
 *
 * Deciding on the code alone would misreport a close frame that carried no status: that arrives as
 * 1005 with `wasClean` true, which a plain `close()` produces on every window close and page
 * reload. Marking those abnormal would bury a genuine socket death under routine noise.
 *
 * @param ev A WebSocket `close` event, or anything at all — a non-event is reported as not clean
 * @returns Whether a closing handshake completed
 */
export function isCleanCloseEvent(ev: unknown): boolean {
  if (typeof ev !== 'object' || !ev) return false;
  return isCleanFromCloseParts(readEventProperty(ev, 'wasClean'), readEventProperty(ev, 'code'));
}

/**
 * Describe a WebSocket `close` event for a log line.
 *
 * Chromium and the `ws` library deliver structurally different close events, and both keep
 * `code`/`reason`/`wasClean` as accessors on the prototype rather than own properties — so
 * `JSON.stringify` on one yields `{}`. Read the fields explicitly instead.
 *
 * `code` is the single most diagnostic field: 1006 (no close frame) means the connection died
 * rather than being closed politely. A reader should not need the WebSocket code table memorized to
 * see that, so an event that {@link isCleanCloseEvent} rejects also carries an `abnormal=true` pair.
 * The marker is its own pair rather than a parenthetical inside `code=` so the whole detail stays a
 * sequence of space-separated `key=value` pairs.
 *
 * @param ev A WebSocket `close` event, or anything at all
 * @returns Space-separated `key=value` pairs — `code`, `abnormal` (only when the connection died),
 *   `reason` (JSON-quoted, so a reason containing a quote or a bracket cannot forge the surrounding
 *   log line) and `wasClean`. A field that cannot be read is reported as `n/a`, so a non-event
 *   yields `code=n/a reason=n/a wasClean=n/a` rather than throwing.
 */
export function describeWebSocketCloseEvent(ev: unknown): string {
  if (typeof ev !== 'object' || !ev) return 'code=n/a reason=n/a wasClean=n/a';

  // Read each field exactly once; see isCleanFromCloseParts for why that matters here.
  const rawCode = readEventProperty(ev, 'code');
  const rawWasClean = readEventProperty(ev, 'wasClean');
  const rawReason = readEventProperty(ev, 'reason');

  const isClean = isCleanFromCloseParts(rawWasClean, rawCode);
  const code = typeof rawCode === 'number' ? `${rawCode}` : 'n/a';
  // Only claim a close was abnormal when there is a code to attribute it to; with no readable code
  // the `wasClean` pair is the whole story and a bare `abnormal=true` would overstate it.
  const abnormal = typeof rawCode === 'number' && !isClean ? ' abnormal=true' : '';
  const reason = typeof rawReason === 'string' ? JSON.stringify(sanitizeForLog(rawReason)) : 'n/a';
  const wasClean = typeof rawWasClean === 'boolean' ? `${rawWasClean}` : 'n/a';

  return `code=${code}${abnormal} reason=${reason} wasClean=${wasClean}`;
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
 *
 * @param ev A WebSocket `error` event, or anything at all
 * @returns A single log line holding `message=`, `code=` and, when the error carried one, a
 *   `stack:` section. Never contains a line break, so an error keeps the one-record-per-line shape
 *   every other line here has; a field that cannot be read is reported as `unknown`/`n/a` rather
 *   than throwing.
 */
export function describeWebSocketErrorEvent(ev: unknown): string {
  let message = 'unknown';
  let code = 'n/a';
  let stack = '';
  let cause = '';

  if (typeof ev === 'object' && ev) {
    const rawMessage = readEventProperty(ev, 'message');
    if (typeof rawMessage === 'string' && rawMessage) message = sanitizeForLog(rawMessage);

    const error = readEventProperty(ev, 'error');
    // A thrown non-Error is very often a bare string, and then it is the only detail the event
    // carries — dropping it for want of an object would report `message=unknown` over real text.
    if (typeof error === 'string' && error) message = sanitizeForLog(error);
    else if (typeof error === 'object' && error) {
      // Duck-type rather than `instanceof Error`: Electron main and renderer are separate
      // realms, so a genuine Error from the other side fails an instanceof check.
      const errorMessage = readEventProperty(error, 'message');
      // Require a non-empty string: an error whose own message is empty must not blank out a
      // populated outer message, which is the more informative of the two.
      if (typeof errorMessage === 'string' && errorMessage) message = sanitizeForLog(errorMessage);

      const errorCode = readEventProperty(error, 'code');
      if (typeof errorCode === 'string' || typeof errorCode === 'number')
        code = sanitizeForLog(`${errorCode}`);

      const errorStack = readEventProperty(error, 'stack');
      if (typeof errorStack === 'string')
        stack = sanitizeForLog(errorStack, MAX_LOGGED_STACK_LENGTH);

      const errorCause = readEventProperty(error, 'cause');
      if (typeof errorCause === 'object' && errorCause) {
        const causeMessage = readEventProperty(errorCause, 'message');
        if (typeof causeMessage === 'string' && causeMessage) cause = sanitizeForLog(causeMessage);
      }
    }
  }

  // Bound the composed value as a whole. Bounding the message and the cause separately lets the
  // pair run to twice MAX_LOGGED_DETAIL_LENGTH while the constant claims one.
  const describedMessage = cause ? sanitizeForLog(`${message} (cause: ${cause})`) : message;

  return `message=${describedMessage} code=${code}${stack ? ` stack: ${stack}` : ''}`;
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
 * Tell main which peer is on the other end of this socket, so main's connection log lines can be
 * joined to the client's own. Main labels each socket with an incrementing id, which appears
 * nowhere in the client's logs; the client labels itself with a name it alone knows.
 */
export const ANNOUNCE_PEER = 'network:announcePeer';

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
 * Whether `error` is what `networkService`'s request plumbing (`doRequest` in `network.service.ts`)
 * throws for a JSON-RPC "method not found" response — i.e. no handler for the requested method has
 * registered anywhere on the network.
 *
 * Callers that want to treat "nobody is listening" as a benign outcome must key off the JSON-RPC
 * error _code_, never off the human-readable text that follows it. The two producers of a
 * method-not-found response word that text differently (`'<method>' not found` in `rpc-server.ts`,
 * `No handler found for <method>` in `rpc-websocket-listener.ts`), and matching the text alone also
 * matches an unrelated failure from a handler that _did_ run and threw a message with the same
 * words in it — turning "no validator, allow it" into "the validator rejected this, allow it
 * anyway". The code is the only part that distinguishes the two.
 *
 * The code has to be read back out of the message because `doRequest` flattens every RPC-level
 * error — method-not-found and a handler throwing alike — into a thrown value whose `message` is
 * `JSON-RPC Request error (${code}): ${message}`, with no other machine-readable marker (the richer
 * `platformErrorCode` field is populated only for C# `PlatformErrorCodes.WithCode` throws, which a
 * "no handler yet" response never carries — it has no `error.data` at all). Deriving the format
 * from {@link getJsonRpcRequestErrorMessagePrefix}, the same producer `doRequest` builds the message
 * with, keeps this matcher in lockstep with any reformat there.
 *
 * @param error Error thrown by a `networkService` request
 * @param requestType If provided, additionally require the error to name this request type, so a
 *   method-not-found response for some _other_ request cannot be mistaken for this one's. Both
 *   producers embed the raw request type in their message.
 * @returns Whether `error` is a method-not-found response (for `requestType`, when given)
 * @experimental
 */
export function isJsonRpcMethodNotFoundError(error: unknown, requestType?: string): boolean {
  const message = getErrorMessage(error);
  if (!message.includes(getJsonRpcRequestErrorMessagePrefix(JSONRPCErrorCode.MethodNotFound)))
    return false;
  return requestType === undefined || message.includes(requestType);
}

/**
 * Prefix that `network.service`'s `doRequest` embeds in the message it throws when a request times
 * out client-side before any response arrives. Exported for the same drift-prevention reason as
 * {@link getJsonRpcRequestErrorMessagePrefix}.
 *
 * @experimental
 */
export const JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX = 'JSON-RPC Request timed out:';
