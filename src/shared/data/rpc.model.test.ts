// Two independent WebSocket event fixture classes are defined in this file, one per describe block.
/* eslint-disable max-classes-per-file */
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import {
  describeWebSocketCloseEvent,
  describeWebSocketErrorEvent,
  INTENTIONAL_CLOSE_CODE,
  isCleanCloseCode,
  isCleanCloseEvent,
  MAX_LOGGED_DETAIL_LENGTH,
  MAX_LOGGED_STACK_LENGTH,
  isRequestTimedOutError,
  JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX,
  MAX_REQUEST_ATTEMPTS,
  REQUEST_ATTEMPT_WAIT_TIME_MS,
  requestWithRetry,
  sendPayloadToWebSocket,
} from '@shared/data/rpc.model';

// Mock the logger so we can assert on warnings without writing to disk.
const { mockLoggerWarn, mockLoggerDebug } = vi.hoisted(() => ({
  mockLoggerWarn: vi.fn(),
  mockLoggerDebug: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    warn: mockLoggerWarn,
    debug: mockLoggerDebug,
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Minimal fake WebSocket matching the shape sendPayloadToWebSocket uses
// (`readyState` + `send`). Built and returned typed as WebSocket so callers
// don't need ad-hoc type assertions in each test.
type FakeSend = ReturnType<typeof vi.fn>;

function makeFakeSocket(readyState: number, sendImpl: FakeSend = vi.fn()): WebSocket {
  // We intentionally produce a structurally-compatible object rather than a full
  // DOM WebSocket — only `readyState` and `send` are exercised by the function under test.
  // The double-cast through `unknown` is required because the fake is intentionally minimal.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { readyState, send: sendImpl } as unknown as WebSocket;
}

describe('sendPayloadToWebSocket — D-010 regression', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockLoggerDebug.mockClear();
  });

  test('throws when ws is undefined (unchanged contract)', () => {
    expect(() => sendPayloadToWebSocket(undefined, 'hi')).toThrow(
      /Tried to send payload while not connected/,
    );
  });

  test('skips send when readyState is CLOSING (2) and logs at debug', () => {
    const send = vi.fn();
    const ws = makeFakeSocket(2, send);

    sendPayloadToWebSocket(ws, 'payload');

    expect(send).not.toHaveBeenCalled();
    expect(mockLoggerDebug).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  test('skips send when readyState is CLOSED (3) and logs at debug', () => {
    const send = vi.fn();
    const ws = makeFakeSocket(3, send);

    sendPayloadToWebSocket(ws, { jsonrpc: '2.0', method: 'event', params: [42] });

    expect(send).not.toHaveBeenCalled();
    expect(mockLoggerDebug).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  test('catches synchronous throw from ws.send and logs warn (D-010 EPIPE path)', () => {
    const epipeError = Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
    const send = vi.fn(() => {
      throw epipeError;
    });
    const ws = makeFakeSocket(1, send);

    // Must NOT throw — this is the crux of the D-010 fix.
    expect(() => sendPayloadToWebSocket(ws, 'hello')).not.toThrow();

    expect(send).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn.mock.calls[0][0]).toMatch(/send failed/);
    expect(mockLoggerWarn.mock.calls[0][0]).toMatch(/EPIPE/);
  });

  test('happy path: OPEN socket receives serialized non-string payload', () => {
    const send = vi.fn();
    const ws = makeFakeSocket(1, send);

    const payload = { jsonrpc: '2.0', method: 'event', params: [1] };
    sendPayloadToWebSocket(ws, payload);

    expect(send).toHaveBeenCalledTimes(1);
    expect(typeof send.mock.calls[0][0]).toBe('string');
    expect(send.mock.calls[0][0]).toContain('"method":"event"');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  test('happy path: string payload passes through unmodified', () => {
    const send = vi.fn();
    const ws = makeFakeSocket(1, send);

    sendPayloadToWebSocket(ws, 'raw-string');

    expect(send).toHaveBeenCalledWith('raw-string');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  test('broadcast fan-out simulation: M dead subscribers do not stop N healthy ones', () => {
    // This emulates RpcWebSocketListener.emitEventOnNetwork iterating over many
    // RpcServers, where each one calls sendPayloadToWebSocket. The contract D-010
    // depends on is: if subscriber K throws, subscribers K+1..N must still be reached.
    // We assert that property at the sendPayloadToWebSocket level — one bad socket
    // must not bubble an exception that would skip the rest of the loop.
    const SUBSCRIBERS = 8;
    const DEAD_INDICES = new Set([0, 3, 5]);
    const sends: FakeSend[] = [];
    const sockets: WebSocket[] = [];

    for (let i = 0; i < SUBSCRIBERS; i += 1) {
      const send: FakeSend = DEAD_INDICES.has(i)
        ? vi.fn(() => {
            throw Object.assign(new Error('write EPIPE'), { code: 'EPIPE' });
          })
        : vi.fn();
      sends.push(send);
      sockets.push(makeFakeSocket(1, send));
    }

    // Caller-side loop intentionally has no try/catch — sendPayloadToWebSocket
    // alone must absorb the EPIPEs. We use forEach (not for-of) per project style.
    sockets.forEach((ws) => {
      sendPayloadToWebSocket(ws, 'broadcast');
    });

    sends.forEach((sendFn) => {
      expect(sendFn).toHaveBeenCalledTimes(1);
    });
    expect(mockLoggerWarn).toHaveBeenCalledTimes(DEAD_INDICES.size);
  });
});

function successResponse(result: unknown): JSONRPCResponse {
  return { jsonrpc: '2.0', id: 1, result };
}
function missingHandlerResponse(): JSONRPCResponse {
  return {
    jsonrpc: '2.0',
    id: 1,
    error: { code: JSONRPCErrorCode.MethodNotFound, message: 'Method not found' },
  };
}

describe('requestWithRetry', () => {
  beforeEach(() => mockLoggerDebug.mockClear());
  afterEach(() => vi.useRealTimers());

  test('returns a successful response without retrying', async () => {
    const cb = vi.fn().mockResolvedValue(successResponse('ok'));
    const response = await requestWithRetry(cb, 'handler', 'testRequest');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(response).toEqual(successResponse('ok'));
  });

  test('returns a non-missing-handler error without retrying', async () => {
    const errorResponse: JSONRPCResponse = {
      jsonrpc: '2.0',
      id: 1,
      error: { code: JSONRPCErrorCode.InternalError, message: 'boom' },
    };
    const cb = vi.fn().mockResolvedValue(errorResponse);
    const response = await requestWithRetry(cb, 'handler', 'testRequest');
    // Only MethodNotFound is the race we retry; any other error is the caller's to handle.
    expect(cb).toHaveBeenCalledTimes(1);
    expect(response).toEqual(errorResponse);
  });

  test('retries a MethodNotFound response, then returns once a handler appears', async () => {
    vi.useFakeTimers();
    const cb = vi
      .fn()
      .mockResolvedValueOnce(missingHandlerResponse())
      .mockResolvedValueOnce(successResponse('ok'));
    const promise = requestWithRetry(cb, 'handler', 'testRequest');
    await vi.advanceTimersByTimeAsync(REQUEST_ATTEMPT_WAIT_TIME_MS); // elapse the backoff → attempt 2
    await expect(promise).resolves.toEqual(successResponse('ok'));
    expect(cb).toHaveBeenCalledTimes(2);
  });

  test('gives up after MAX_REQUEST_ATTEMPTS and returns the missing-handler response (no throw)', async () => {
    vi.useFakeTimers();
    const cb = vi.fn().mockResolvedValue(missingHandlerResponse());
    const promise = requestWithRetry(cb, 'handler', 'testRequest');
    // MAX-1 backoffs separate the MAX attempts; no wait after the last.
    await vi.advanceTimersByTimeAsync(REQUEST_ATTEMPT_WAIT_TIME_MS * (MAX_REQUEST_ATTEMPTS - 1));
    await expect(promise).resolves.toEqual(missingHandlerResponse());
    expect(cb).toHaveBeenCalledTimes(MAX_REQUEST_ATTEMPTS);
  });

  test('logs each retry and a final give-up on exhaustion', async () => {
    vi.useFakeTimers();
    const cb = vi.fn().mockResolvedValue(missingHandlerResponse());
    const promise = requestWithRetry(cb, 'handler', 'myRequest');
    await vi.advanceTimersByTimeAsync(REQUEST_ATTEMPT_WAIT_TIME_MS * (MAX_REQUEST_ATTEMPTS - 1));
    await promise;
    expect(mockLoggerDebug).toHaveBeenCalledWith(
      expect.stringContaining(`attempt 1 of ${MAX_REQUEST_ATTEMPTS}. Retrying...`),
    );
    expect(mockLoggerDebug).toHaveBeenCalledWith(
      expect.stringContaining(
        `attempt ${MAX_REQUEST_ATTEMPTS} of ${MAX_REQUEST_ATTEMPTS}. Giving up.`,
      ),
    );
  });
});

/**
 * Mirrors how the `ws` library builds CloseEvent: values live on symbol keys with enumerable
 * accessors on the prototype. That combination is what makes `JSON.stringify` yield `{}` — only own
 * properties are serialized — so a fixture built from own properties would not exercise the
 * behavior under test.
 */
const kCode = Symbol('code');
const kReason = Symbol('reason');
const kWasClean = Symbol('wasClean');

class WsLikeCloseEvent {
  [key: symbol]: unknown;

  constructor(code?: number, reason?: string, wasClean?: boolean) {
    // Index via symbol keys the way `ws` does
    this[kCode] = code === undefined ? 0 : code;
    this[kReason] = reason === undefined ? '' : reason;
    this[kWasClean] = wasClean === undefined ? false : wasClean;
  }

  get code() {
    return this[kCode];
  }

  get reason() {
    return this[kReason];
  }

  get wasClean() {
    return this[kWasClean];
  }
}
Object.defineProperty(WsLikeCloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(WsLikeCloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(WsLikeCloseEvent.prototype, 'wasClean', { enumerable: true });

describe('isCleanCloseCode', () => {
  test.each([
    [1000, true],
    [1001, true],
    [INTENTIONAL_CLOSE_CODE, true],
    [1005, true],
    [1006, false],
    [4999, false],
  ])('code %i is clean: %s', (code, expected) => {
    expect(isCleanCloseCode(code)).toBe(expected);
  });

  test('rejects a non-numeric code without throwing', () => {
    expect(isCleanCloseCode(undefined)).toBe(false);
    expect(isCleanCloseCode('1000')).toBe(false);
  });
});

describe('isCleanCloseEvent', () => {
  test('trusts wasClean over the code list', () => {
    // A close frame carrying no status arrives as 1005 with wasClean true, which a plain
    // close() produces on every window close and page reload.
    expect(isCleanCloseEvent(new WsLikeCloseEvent(1005, '', true))).toBe(true);
    // A socket that died never completed a handshake, whatever code accompanies it.
    expect(isCleanCloseEvent(new WsLikeCloseEvent(1006, '', false))).toBe(false);
  });

  test('a clean handshake wins even when the code is not on the clean list', () => {
    expect(isCleanCloseEvent(new WsLikeCloseEvent(4321, '', true))).toBe(true);
  });

  test('falls back to the code list when wasClean is absent', () => {
    expect(isCleanCloseEvent({ code: 1000 })).toBe(true);
    expect(isCleanCloseEvent({ code: 1006 })).toBe(false);
  });

  test.each([undefined, {}, 'nope', 42])('treats %p as not clean without throwing', (input) => {
    expect(() => isCleanCloseEvent(input)).not.toThrow();
    expect(isCleanCloseEvent(input)).toBe(false);
  });
});

describe('describeWebSocketCloseEvent', () => {
  test('never marks a cleanly-closed handshake abnormal', () => {
    // Observed in a running app: a page reload produced `code=1005 (abnormal) wasClean=true`,
    // a line that contradicted itself. The marker must agree with wasClean.
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1005, '', true));
    expect(result).toContain('code=1005');
    expect(result).not.toContain('abnormal');
    expect(result).toContain('wasClean=true');
  });

  test('marks a died-without-handshake close abnormal', () => {
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, '', false));
    expect(result).toContain('code=1006 abnormal=true');
    expect(result).toContain('wasClean=false');
  });

  test('emits only space-separated key=value pairs, so a log parser can read the whole detail', () => {
    // The abnormal marker used to live inside the `code=` value as `1006 (abnormal)`, which put a
    // space inside one pair and left a parser with a bare unparseable token.
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, 'went away', false));
    result.split(' ').forEach((token) => {
      // `reason="went away"` legitimately splits on its inner space; every token must either be a
      // pair or the continuation of the quoted reason.
      expect(token).toMatch(/^(\w+=|away")/);
    });
  });

  test('the fixture reproduces the JSON.stringify collapse the formatter exists to avoid', () => {
    // Guards the fixture itself: if this ever stops being `{}`, the fixture stopped
    // modeling `ws` and every test below is weaker than it looks.
    expect(JSON.stringify(new WsLikeCloseEvent(1006, '', false))).toBe('{}');
  });

  test.each([
    [1000, true],
    [1001, true],
    [1005, false],
    [1006, false],
    [4000, true],
    [4999, false],
  ])('surfaces close code %i verbatim', (code, wasClean) => {
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(code, '', wasClean));
    expect(result).toContain(`code=${code}`);
    expect(result).toContain(`wasClean=${wasClean}`);
  });

  test('renders a DOM CloseEvent identically to the ws-shaped one', () => {
    // jsdom supplies CloseEvent (vitest.config.ts sets environment: 'jsdom').
    // This is the renderer's engine; the formatter must not favor one shape.
    const dom = new CloseEvent('close', { code: 1006, reason: 'gone', wasClean: false });
    const wsLike = new WsLikeCloseEvent(1006, 'gone', false);
    expect(describeWebSocketCloseEvent(dom)).toBe(describeWebSocketCloseEvent(wsLike));
  });

  // Each row is a coherent event: a code paired with the wasClean value that really
  // accompanies it. Pairing every code with wasClean true would assert the very
  // contradiction observed in a running app (`code=1006 (abnormal) wasClean=true`).
  test.each([
    [1000, true, false],
    [1001, true, false],
    [4000, true, false],
    [1005, true, false],
    [1006, false, true],
  ])('code %i with wasClean %s is marked abnormal: %s', (code, wasClean, isAbnormal) => {
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(code, '', wasClean));
    expect(result.includes('abnormal=true')).toBe(isAbnormal);
  });

  test.each([
    [1000, false],
    [1005, false],
    [1006, true],
  ])('falls back to the code list for code %i when wasClean is absent: %s', (code, isAbnormal) => {
    expect(describeWebSocketCloseEvent({ code }).includes('abnormal=true')).toBe(isAbnormal);
  });

  test('does not claim a close was abnormal when there is no code to attribute it to', () => {
    // With neither field readable the wasClean pair is the whole story; a bare `abnormal=true`
    // would assert something about a socket this event says nothing about.
    expect(describeWebSocketCloseEvent({ reason: 'hm' })).toBe('code=n/a reason="hm" wasClean=n/a');
  });

  test('reads code and wasClean once each, so the marker cannot contradict the printed code', () => {
    // A non-idempotent accessor is the hostile case these formatters are tested against. Read
    // twice, `code=1006` could be printed while the marker was computed from a clean second read.
    let codeReads = 0;
    const flipping = {
      get code() {
        codeReads += 1;
        return codeReads === 1 ? 1006 : 1000;
      },
      reason: '',
    };

    const result = describeWebSocketCloseEvent(flipping);

    expect(codeReads).toBe(1);
    expect(result).toContain('code=1006 abnormal=true');
  });

  test('renders code 0 rather than swallowing it as falsy', () => {
    expect(describeWebSocketCloseEvent(new WsLikeCloseEvent(0, '', false))).toContain('code=0');
  });

  test('renders an empty reason as empty quotes, never the string "undefined"', () => {
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, '', false));
    expect(result).toContain('reason=""');
    expect(result).not.toContain('undefined');
  });

  test('collapses newlines in reason so one close cannot break line-oriented log parsing', () => {
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, 'a\nb\rc', false));
    expect(result).not.toMatch(/[\r\n]/);
    expect(result).toContain('a b c');
  });

  test.each([
    [MAX_LOGGED_DETAIL_LENGTH - 1, false],
    [MAX_LOGGED_DETAIL_LENGTH, false],
    [MAX_LOGGED_DETAIL_LENGTH + 1, true],
  ])('truncates a reason of length %i (truncated: %s)', (length, shouldTruncate) => {
    const reason = 'x'.repeat(length);
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, reason, false));
    expect(result.includes('…')).toBe(shouldTruncate);
  });

  test('escapes a reason so a peer cannot forge the shape of the log line', () => {
    // Peer-controlled input. Quoting it raw let a reason of `said "goodbye")` close the caller's
    // own `(${detail})` wrapper early and unbalance the quotes around it.
    const result = describeWebSocketCloseEvent(
      new WsLikeCloseEvent(1006, 'said "goodbye")', false),
    );
    // The escaped quotes are what makes the field's end unambiguous: the reason reads back out of
    // the log line intact, `)` and all, instead of the raw quotes closing early and leaving the
    // trailing `)` looking like the end of the caller's own `(${detail})` wrapper.
    const quoted = result.slice(
      result.indexOf('reason=') + 'reason='.length,
      result.indexOf(' wasClean='),
    );
    expect(JSON.parse(quoted)).toBe('said "goodbye")');
  });

  test('escapes a lone surrogate produced by truncating mid-astral-character', () => {
    // The bound is applied by `slice`, which counts UTF-16 units, so a truncation landing inside a
    // surrogate pair is the one place a lone surrogate can actually be MANUFACTURED here — a short
    // reason that merely contains one never reaches that branch.
    const reason = `${'x'.repeat(MAX_LOGGED_DETAIL_LENGTH - 1)}😀tail`;
    const result = describeWebSocketCloseEvent(new WsLikeCloseEvent(1006, reason, false));

    expect(result).toContain(String.raw`\ud83d`);
    expect(result).toContain('code=1006');
  });

  test('replaces control characters that a newline sweep alone would miss', () => {
    // All peer-supplied, and all of them break a line-oriented log — U+2028/U+2029 render as line
    // breaks in JavaScript-based log viewers even though they are not control characters.
    const result = describeWebSocketCloseEvent(
      new WsLikeCloseEvent(1006, 'a\fb\vc\u0000d\u001Be\u0085f\u2028g\u2029h', false),
    );
    expect(result).toContain('a b c d e f g h');
  });

  test('omits wasClean when absent rather than printing undefined', () => {
    const partial = { code: 1006, reason: '' };
    const result = describeWebSocketCloseEvent(partial);
    expect(result).toContain('wasClean=n/a');
  });

  // Every non-object input (undefined, 'nope', 42) and null (typeof 'object' but falsy) hits the
  // early-return branch; {} is a real object so it instead falls through to the property-reading
  // path — but since it has no code/reason/wasClean properties, that path yields the identical
  // n/a triple. All five inputs are therefore pinned to the same exact string, exercising both
  // branches without forcing a shared expectation that isn't actually true of the implementation.
  // null is itself one of the garbage inputs under test
  // eslint-disable-next-line no-null/no-null
  test.each([undefined, null, {}, 'nope', 42])(
    'returns the n/a triple verbatim for garbage input %p',
    (input) => {
      expect(() => describeWebSocketCloseEvent(input)).not.toThrow();
      expect(describeWebSocketCloseEvent(input)).toBe('code=n/a reason=n/a wasClean=n/a');
    },
  );

  test('narrows prototype-less objects, where instanceof would fail', () => {
    // Object.create requires a literal null prototype
    // eslint-disable-next-line no-null/no-null
    const bare = Object.create(null);
    bare.code = 1006;
    expect(describeWebSocketCloseEvent(bare)).toContain('code=1006');
  });

  test('does not throw when a getter throws', () => {
    const hostile = {
      code: 1006,
      get reason(): string {
        throw new Error('hostile getter');
      },
    };
    // A formatter that throws inside a close handler turns a logged disconnect into
    // an unhandled exception during teardown — strictly worse than logging nothing.
    expect(() => describeWebSocketCloseEvent(hostile)).not.toThrow();
    expect(describeWebSocketCloseEvent(hostile)).toContain('code=1006');
  });
});

/** Mirrors `ws`'s ErrorEvent: symbol-keyed values, enumerable prototype accessors. */
const kMessage = Symbol('message');
const kError = Symbol('error');

class WsLikeErrorEvent {
  [key: symbol]: unknown;

  constructor(message: string, error?: unknown) {
    this[kMessage] = message;
    this[kError] = error;
  }

  get message() {
    return this[kMessage];
  }

  get error() {
    return this[kError];
  }
}
Object.defineProperty(WsLikeErrorEvent.prototype, 'message', { enumerable: true });
Object.defineProperty(WsLikeErrorEvent.prototype, 'error', { enumerable: true });

describe('describeWebSocketErrorEvent', () => {
  test('surfaces the message from a ws-shaped ErrorEvent that JSON.stringify reports as {}', () => {
    const ev = new WsLikeErrorEvent('read ECONNRESET');
    // Serializing the event directly yields nothing useful (own properties only); the
    // formatter must read the accessor instead so the detail survives into the log.
    expect(JSON.stringify(ev)).toBe('{}');
    expect(describeWebSocketErrorEvent(ev)).toBe('message=read ECONNRESET code=n/a');
  });

  test('returns a useful string for a bare DOM Event, the only shape Chromium sends on error', () => {
    const result = describeWebSocketErrorEvent(new Event('error'));
    expect(result).toBe('message=unknown code=n/a');
  });

  test('surfaces an Error message, string code, and stack', () => {
    const error = new Error('socket hang up');
    Object.defineProperty(error, 'code', { value: 'ECONNRESET', enumerable: true });
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', error));
    // Stack content is environment-dependent (varies by runtime/formatting), so pin the
    // fixed prefix exactly and assert the stack text follows rather than hard-coding it.
    const expectedPrefix = 'message=socket hang up code=ECONNRESET stack: ';
    expect(result.startsWith(expectedPrefix)).toBe(true);
    expect(result.length).toBeGreaterThan(expectedPrefix.length);
  });

  test('never emits a line break, so an error stays one log record', () => {
    // `formatLog` wraps any message containing a newline as `[main]\n…\n[/main]`, so a stack
    // introduced with `\n` gave socket errors a different record shape from every other line here.
    const error = new Error('socket hang up');
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', error));
    expect(result).toContain('stack: ');
    expect(result).not.toMatch(/[\r\n]/);
  });

  test('keeps a populated outer message when the inner error carries an empty one', () => {
    const result = describeWebSocketErrorEvent(
      new WsLikeErrorEvent('read ECONNRESET', { message: '' }),
    );
    expect(result).toContain('read ECONNRESET');
  });

  test('surfaces an error that is itself a string', () => {
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', 'just a string'));
    expect(result).toContain('just a string');
  });

  test('bounds the message and its cause together, not each half separately', () => {
    const error = new Error('m'.repeat(MAX_LOGGED_DETAIL_LENGTH), {
      cause: new Error('c'.repeat(MAX_LOGGED_DETAIL_LENGTH)),
    });
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', error));

    const message = result.slice('message='.length, result.indexOf(' code='));
    // Bounding the halves independently let the pair run to twice the stated bound. The ellipsis
    // costs one character beyond it.
    expect(message.length).toBeLessThanOrEqual(MAX_LOGGED_DETAIL_LENGTH + 1);
  });

  test('surfaces a refused-connection error, the startup-race fingerprint', () => {
    // A refused connect is what `ws` reports when a client dials before the server is
    // listening. Rendering this as `{}` is what made that class of startup failure opaque.
    const error = new Error('connect ECONNREFUSED 127.0.0.1:8876');
    Object.defineProperty(error, 'code', { value: 'ECONNREFUSED', enumerable: true });
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', error));
    expect(result).toContain('ECONNREFUSED');
    expect(result).toContain('8876');
  });

  test('surfaces a numeric error code, not only a string one', () => {
    const error = new Error('boom');
    Object.defineProperty(error, 'code', { value: 4091, enumerable: true });
    expect(describeWebSocketErrorEvent(new WsLikeErrorEvent('outer', error))).toContain('4091');
  });

  test('surfaces a nested cause, as Node transport errors routinely nest', () => {
    const inner = new Error('ECONNRESET inner');
    const outer = new Error('outer failure', { cause: inner });
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('e', outer));
    expect(result).toContain('ECONNRESET inner');
  });

  test('handles an error that is not an Error object', () => {
    expect(() =>
      describeWebSocketErrorEvent(new WsLikeErrorEvent('e', 'just a string')),
    ).not.toThrow();
    expect(describeWebSocketErrorEvent(new WsLikeErrorEvent('e', { odd: true }))).toContain(
      'message=',
    );
  });

  test('omits the stack section entirely when there is no stack', () => {
    const error = new Error('no stack here');
    error.stack = undefined;
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('e', error));
    expect(result).not.toContain('stack:');
    expect(result).not.toContain('undefined');
  });

  test('bounds a very long stack', () => {
    const error = new Error('long');
    error.stack = 'y'.repeat(MAX_LOGGED_STACK_LENGTH * 3);
    expect(describeWebSocketErrorEvent(new WsLikeErrorEvent('e', error))).toContain('…');
  });

  test('keeps a stack longer than the peer-supplied detail bound', () => {
    const error = new Error('long');
    // A stack is generated locally, so it gets the more generous stack bound; truncating it to the
    // peer-detail bound would discard the frames a disconnect is diagnosed from.
    error.stack = 'y'.repeat(MAX_LOGGED_DETAIL_LENGTH * 3);
    const result = describeWebSocketErrorEvent(new WsLikeErrorEvent('e', error));
    expect(result).not.toContain('…');
    expect(result).toContain('y'.repeat(MAX_LOGGED_DETAIL_LENGTH * 3));
  });

  test('surfaces a cross-realm error, which an instanceof check would miss', () => {
    // Duck-typed: an object carrying a string `message` is treated as error-like.
    const foreign = { message: 'from another realm' };
    expect(describeWebSocketErrorEvent(new WsLikeErrorEvent('e', foreign))).toContain(
      'from another realm',
    );
  });

  // null is itself one of the garbage inputs under test
  // eslint-disable-next-line no-null/no-null
  // `not.toBe('{}')` would be non-falsifiable here — the function's only return statement starts
  // with `message=`, so no input can produce `{}`. Pin the sentinel these inputs must actually
  // yield instead.
  // null is itself one of the garbage inputs under test
  // eslint-disable-next-line no-null/no-null
  test.each([undefined, null, {}, 'nope', 42])(
    'reports the unknown sentinel for input %p rather than throwing',
    (input) => {
      expect(() => describeWebSocketErrorEvent(input)).not.toThrow();
      expect(describeWebSocketErrorEvent(input)).toBe('message=unknown code=n/a');
    },
  );

  test('does not throw when a getter throws', () => {
    const hostile = {
      get message(): string {
        throw new Error('hostile');
      },
    };
    expect(() => describeWebSocketErrorEvent(hostile)).not.toThrow();
  });
});

describe('isRequestTimedOutError', () => {
  test('recognizes the message doRequest builds for a client-side request timeout', () => {
    expect(
      isRequestTimedOutError(
        new Error(`${JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX} command:test.thing ["arg"]`),
      ),
    ).toBe(true);
  });

  test('does not match other request failures or non-errors', () => {
    expect(
      isRequestTimedOutError(new Error("JSON-RPC Request error (-32601): 'command:x' not found")),
    ).toBe(false);
    expect(isRequestTimedOutError(new Error('some unrelated failure'))).toBe(false);
    expect(isRequestTimedOutError(undefined)).toBe(false);
  });
});
