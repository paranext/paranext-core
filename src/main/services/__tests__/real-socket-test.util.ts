/**
 * Binds `RpcWebSocketListener` on a real ephemeral port for the suites that exercise it against the
 * host's actual network stack. Shared so the port-race handling is not copied into each suite.
 */

import { vi } from 'vitest';
import { createServer } from 'net';
import { retryUntil } from 'platform-bible-utils';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';

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
 * Binds a listener on a free port, retrying if something else claimed the port first.
 *
 * `getFreePort` releases the port before the listener rebinds it, so a parallel vitest worker or
 * anything else on the machine can take it in between. Without the retry that lost race surfaces as
 * `connect()` resolving false, which reads as though the code under test regressed.
 */
export async function bindOnAFreePort(): Promise<{ listener: RpcWebSocketListener; port: number }> {
  const maxAttempts = 5;
  // `retryUntil` rather than a bespoke loop: the awaits move into the attempt callback, so the
  // attempts stay serial — each must bind before the next port is picked — without suppressing
  // `no-await-in-loop`. A give-up attempt releases its listener before returning `undefined`.
  const bound = await retryUntil(
    async () => {
      const port = await getFreePort();
      const candidate = new RpcWebSocketListener(port);
      if (await candidate.connect(vi.fn())) return { listener: candidate, port };
      await candidate.disconnect();
      return undefined;
    },
    (result) => !!result,
    { maxAttempts },
  );
  if (!bound) throw new Error(`Could not bind a free port in ${maxAttempts} attempts`);
  return bound;
}
