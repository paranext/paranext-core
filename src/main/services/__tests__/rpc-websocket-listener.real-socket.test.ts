// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServer } from 'net';
import { WebSocket } from 'ws';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';

/**
 * Companion to `rpc-websocket-listener.listening.test.ts`, which proves the `listening` handshake
 * with a stubbed `ws`. This one deliberately does NOT mock `ws`: it binds a real socket so the
 * promise `connect()` awaits is resolved by the host's actual network stack.
 *
 * That is the part worth running on every OS in CI. Whether `connect()` resolving implies "a client
 * can connect right now" depends on the platform's bind/listen semantics and on how `localhost`
 * resolves (IPv4 vs IPv6) — details that a stubbed server cannot exercise and that differ across
 * Windows, macOS, and Linux.
 */

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

/**
 * Asks the OS for a free port and releases it, since binding the app's real port would collide with
 * a dev app on a developer machine.
 *
 * Hand-rolled rather than using the `detect-port` devDependency because that probes upward from a
 * starting port, so parallel runs and a dev app converge on the same low ports. Asking the OS for
 * an ephemeral port instead makes a collision the OS's problem, and scopes the probe to `localhost`
 * — the interface the listener actually binds.
 */
function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on('error', reject);
    probe.listen(0, 'localhost', () => {
      const address = probe.address();
      if (address && typeof address === 'object') {
        const { port } = address;
        probe.close(() => resolve(port));
      } else {
        probe.close(() => reject(new Error('Could not determine a free port')));
      }
    });
  });
}

/**
 * Resolves whether a client can complete a websocket handshake against `port` right now.
 *
 * Bounded, because a peer that accepts the TCP connection but never completes the upgrade emits
 * neither `open` nor `error` — without the timer that reports as a hung suite rather than a false.
 */
function canConnect(port: number, timeoutMs = 2000): Promise<boolean> {
  return new Promise((resolve) => {
    const client = new WebSocket(`ws://localhost:${port}`);
    let timeout: ReturnType<typeof setTimeout>;
    const settle = (result: boolean) => {
      clearTimeout(timeout);
      // Keep an error handler attached through the close handshake: `ws` sockets are bare
      // EventEmitters, so a late `error` with no listener throws inside the test worker.
      client.removeAllListeners();
      client.on('error', () => {});
      client.close();
      resolve(result);
    };
    timeout = setTimeout(() => settle(false), timeoutMs);
    client.on('open', () => settle(true));
    client.on('error', () => settle(false));
  });
}

/**
 * Binds a listener on a free port, retrying if something else claimed the port first.
 *
 * `getFreePort` releases the port before the listener rebinds it, so a parallel vitest worker or
 * anything else on the machine can take it in between. Without the retry that lost race surfaces as
 * `connect()` resolving false, which reads as though the code under test regressed.
 */
async function bindOnAFreePort(): Promise<{ listener: RpcWebSocketListener; port: number }> {
  const attempts = 5;
  for (let attempt = 0; attempt < attempts; attempt++) {
    // Each attempt must bind before the next port is picked, so these are deliberately serial.
    /* eslint-disable no-await-in-loop */
    const port = await getFreePort();
    const candidate = new RpcWebSocketListener(port);
    if (await candidate.connect(vi.fn())) return { listener: candidate, port };
    await candidate.disconnect();
    /* eslint-enable no-await-in-loop */
  }
  throw new Error(`Could not bind a free port in ${attempts} attempts`);
}

describe('the PAPI websocket against a real socket', () => {
  let listener: RpcWebSocketListener | undefined;

  afterEach(async () => {
    await listener?.disconnect();
    listener = undefined;
  });

  it('accepts a client immediately after connect() resolves', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;

    // No delay and no retry between connect() resolving and this attempt. That is the guarantee
    // main depends on when it spawns the extension host straight after initializing the network
    // service.
    await expect(canConnect(bound.port)).resolves.toBe(true);
  });

  it('reports failure rather than claiming success when the port is already taken', async () => {
    // Retries past a lost port race, so reaching the assertion below means the port really is held
    // by the squatter rather than by an unrelated process.
    const squatting = await bindOnAFreePort();
    const squatter = squatting.listener;

    try {
      listener = new RpcWebSocketListener(squatting.port);
      await expect(listener.connect(vi.fn())).resolves.toBe(false);
    } finally {
      await squatter.disconnect();
    }
  });
});
