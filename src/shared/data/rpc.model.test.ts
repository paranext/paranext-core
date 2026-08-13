import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { JSONRPCErrorCode, JSONRPCResponse } from 'json-rpc-2.0';
import {
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
