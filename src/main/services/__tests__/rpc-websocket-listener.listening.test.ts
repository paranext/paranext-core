// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { wait } from 'platform-bible-utils';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { logger } from '@shared/services/logger.service';
import { WebSocketServer } from 'ws';
import type { FakeWebSocketServer } from './fake-web-socket-test.util';

/**
 * `new WebSocketServer({...})` binds asynchronously, so `connect()` must wait for the server's
 * `listening` event before reporting success. Main resolves `networkService.initialize()` on that
 * result and immediately spawns the extension host, which gets one connect attempt and no retry —
 * so reporting connected while the socket is still unbound refuses that attempt, leaving no
 * settings/localization/theme provider registered and the UI rendering raw localize keys.
 */

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

// Collected in hoisted state rather than in the util, so the reference survives module resets.
const servers = vi.hoisted<FakeWebSocketServer[]>(() => []);
// Driven by hand rather than auto-completing the handshake: these tests control exactly when
// binding finishes.
vi.mock('ws', async () => {
  const { createFakeWebSocketServer } = await import('./fake-web-socket-test.util');
  return {
    WebSocketServer: vi.fn(() => {
      const server = createFakeWebSocketServer(false);
      servers.push(server);
      return server;
    }),
  };
});

/** Lets pending microtasks run so a resolved `connect()` would have settled by now. */
const flush = () => wait(0);

describe('the PAPI websocket reports connected only once it is accepting', () => {
  let listener: RpcWebSocketListener;

  beforeEach(() => {
    vi.mocked(WebSocketServer).mockClear();
    vi.mocked(logger.error).mockClear();
    servers.length = 0;
    listener = new RpcWebSocketListener();
  });

  it('does not resolve connect() until the server has finished binding', async () => {
    let settled = false;
    const connecting = listener.connect(vi.fn()).then((result) => {
      settled = true;
      return result;
    });

    await flush();
    // Binding has not completed, so main must not believe the websocket is usable yet.
    expect(settled).toBe(false);

    servers[0].emit('listening');

    await expect(connecting).resolves.toBe(true);
  });

  it('reports failure when the server errors instead of binding', async () => {
    const connecting = listener.connect(vi.fn());

    await flush();
    servers[0].emit('error', new Error('listen EADDRINUSE: address already in use'));

    await expect(connecting).resolves.toBe(false);
    // A half-open server that is never closed keeps whatever the OS did hand it, so the failure
    // path has to release it rather than just reporting false.
    expect(servers[0].isClosed).toBe(true);
  });

  it('can connect again after a failed bind', async () => {
    // The whole point of unwinding state on a failed bind is that the next attempt can still
    // succeed. If the rollback ever misses a field, `connect()` returns false at its
    // already-connecting guard and never reaches a second server.
    const firstAttempt = listener.connect(vi.fn());
    await flush();
    servers[0].emit('error', new Error('listen EADDRINUSE: address already in use'));
    await expect(firstAttempt).resolves.toBe(false);

    const secondAttempt = listener.connect(vi.fn());
    await flush();
    expect(servers).toHaveLength(2);
    servers[1].emit('listening');

    await expect(secondAttempt).resolves.toBe(true);
  });

  it('gives up rather than hanging when the server never binds', async () => {
    vi.useFakeTimers();
    try {
      const connecting = listener.connect(vi.fn());
      // The server emits neither `listening` nor `error` — a wedged resolver. Without a bound this
      // never settles, and main waits forever before creating any window. Run the pending timers
      // out rather than advancing a fixed span, so the bound's length stays the listener's business.
      await vi.runAllTimersAsync();

      await expect(connecting).resolves.toBe(false);
      expect(servers[0].isClosed).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps handling server errors once it is bound', async () => {
    const connecting = listener.connect(vi.fn());
    await flush();
    servers[0].emit('listening');
    await expect(connecting).resolves.toBe(true);

    // `ws` forwards the underlying HTTP server's errors for as long as the server is up, and Node
    // throws on an `error` event with no listener — which in main is an uncaught exception that
    // takes every window with it. The bind-time handler is gone by now, so something else has to be
    // holding the event.
    const serverError = new Error('accept EMFILE: too many open files');
    expect(() => servers[0].emit('error', serverError)).not.toThrow();
    expect(vi.mocked(logger.error).mock.calls.map((args) => String(args[0]))).toContainEqual(
      expect.stringContaining('EMFILE'),
    );
  });
});
