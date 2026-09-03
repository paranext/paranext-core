import { afterEach, describe, expect, test, vi, beforeEach } from 'vitest';
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

describe('RpcClient reconnect gaps (deferred — see TODO(PT-4435) in rpc-client.ts)', () => {
  beforeEach(() => {
    listeners.clear();
    fakeSocket.readyState = 1;
  });

  // These bodies are EXPECTED to throw, and `test.fails` reports a throw as a pass — so a case that
  // installs fake timers and throws before restoring them would leak the fake clock into the next
  // test while still looking green, landing the symptom on a different test than the cause.
  afterEach(() => {
    vi.useRealTimers();
  });

  // TODO(PT-4435): Pins a premature `Connected` status on reconnect — `connectionComplete` is a
  // single-shot `AsyncVariable` frozen by the first connect, so a later attempt resolves instantly.
  // `test.fails` inverts the result, so this case turns red the moment the defect is fixed; when
  // PT-4435 lands, drop the `.fails` rather than deleting the case.
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
  // TODO(PT-4435): Pins a first-connect timeout being permanently fatal — the settled
  // `connectionComplete` rejection cannot be retried. `test.fails` inverts the result, so this case
  // turns red once the defect is fixed; when PT-4435 lands, drop the `.fails` rather than deleting
  // the case.
  test.fails('a connect after a timed-out first attempt is not permanently fatal', async () => {
    vi.useFakeTimers();
    const client = new RpcClient('renderer-1');
    fakeSocket.readyState = 0;
    const first = client.connect(() => {});
    // AsyncVariable rejects after its 10s default (platform-bible-utils's async-variable.ts)
    await vi.advanceTimersByTimeAsync(10_001);
    await first;
    vi.useRealTimers();

    fakeSocket.readyState = 1;
    const second = await client.connect(() => {});

    expect(second).toBe(true);
  });

  // TODO(PT-4435): Pins `applyMiddleware` stacking once per `connect()` call, duplicating event
  // delivery after a reconnect. `test.fails` inverts the result, so this case turns red once the
  // defect is fixed; when PT-4435 lands, drop the `.fails` rather than deleting the case.
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

    // applyMiddleware runs on every connect() in rpc-client.ts, duplicating delivery.
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
