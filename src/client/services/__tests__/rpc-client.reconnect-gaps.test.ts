import { describe, expect, test, vi, beforeEach } from 'vitest';
import { RpcClient } from '@client/services/rpc-client';
import { ConnectionStatus } from '@shared/data/rpc.model';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

const listeners = new Map<string, (ev: unknown) => void>();
const fakeSocket = {
  url: 'ws://localhost:8876/',
  readyState: 0,
  send: vi.fn(),
  close: vi.fn(),
  addEventListener: (type: string, handler: (ev: unknown) => void) => listeners.set(type, handler),
  removeEventListener: (type: string) => listeners.delete(type),
};

vi.mock('@client/services/web-socket.factory', () => ({
  createWebSocket: vi.fn(async () => fakeSocket),
}));

function dispatch(type: string, ev: unknown) {
  listeners.get(type)?.(ev);
}

describe('RpcClient reconnect gaps (deferred — see TODO(PT-4435) at rpc-client.ts:51)', () => {
  beforeEach(() => {
    listeners.clear();
    fakeSocket.readyState = 1;
  });

  test.fails(
    'a reconnect does not report Connected while the socket is still CONNECTING',
    async () => {
      const client = new RpcClient('renderer-1');
      fakeSocket.readyState = 1;
      await client.connect(() => {});
      dispatch('close', new CloseEvent('close', { code: 1006 }));

      // connectionComplete was resolved and frozen by the first connect, so the second
      // connect's await returns instantly and status is set before the handshake finishes.
      fakeSocket.readyState = 0;
      await client.connect(() => {});

      expect(client.connectionStatus).not.toBe(ConnectionStatus.Connected);
    },
  );

  // Field-confirmed: an extension host that loses its single startup connect attempt cannot
  // recover in place, which is why that failure needs an app restart to clear.
  test.fails('a connect after a timed-out first attempt is not permanently fatal', async () => {
    vi.useFakeTimers();
    const client = new RpcClient('renderer-1');
    fakeSocket.readyState = 0;
    const first = client.connect(() => {});
    // AsyncVariable rejects after its 10s default (async-variable.ts:19)
    await vi.advanceTimersByTimeAsync(10_001);
    await first;
    vi.useRealTimers();

    fakeSocket.readyState = 1;
    const second = await client.connect(() => {});

    expect(second).toBe(true);
  });

  test.fails('reconnecting does not stack local event middleware', async () => {
    const handler = vi.fn();
    const client = new RpcClient('renderer-1');
    await client.connect(handler);
    dispatch('close', new CloseEvent('close', { code: 1006 }));
    await client.connect(handler);

    dispatch('message', {
      data: JSON.stringify({ jsonrpc: '2.0', method: 'test:event', params: [{}] }),
    });
    await Promise.resolve();

    // applyMiddleware runs on every connect() (rpc-client.ts:82), duplicating delivery.
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
