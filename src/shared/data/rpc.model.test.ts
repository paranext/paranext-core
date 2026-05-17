import { describe, expect, test, vi, beforeEach } from 'vitest';
import { sendPayloadToWebSocket } from '@shared/data/rpc.model';

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
