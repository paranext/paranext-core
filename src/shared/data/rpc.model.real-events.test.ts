// @vitest-environment node
import { describe, expect, test, vi } from 'vitest';
import { WebSocket, WebSocketServer } from 'ws';
import { describeWebSocketCloseEvent, describeWebSocketErrorEvent } from '@shared/data/rpc.model';

// vi.mock is hoisted above the static imports at transform time, so the imports can be written
// first here to satisfy import/first. Without it the real electron-log stack initializes in a plain
// node worker — printing `Unexpected process type: undefined` on stderr every run — even though the
// formatters under test never log.
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

/**
 * Find a port nothing is listening on: bind an ephemeral server, read the port it was assigned,
 * then close it immediately.
 *
 * A time-of-check/time-of-use race, not a guarantee: nothing stops another process on a loaded
 * runner from taking the freed port before the test dials it, in which case the connect succeeds
 * and the test fails on its timeout rather than on its assertion. Accepted over hard-coding a port
 * that could collide outright, and over retry logic in a test whose whole value is that it uses
 * real sockets.
 */
async function getUnusedPort(): Promise<number> {
  const probe = new WebSocketServer({ host: '127.0.0.1', port: 0 });
  await new Promise<void>((resolve) => {
    probe.once('listening', resolve);
  });
  const address = probe.address();
  if (typeof address === 'string' || !address) throw new Error('no port assigned');
  const { port } = address;
  await new Promise<void>((resolve) => {
    probe.close(() => resolve());
  });
  return port;
}

/** Open a server on an ephemeral port, connect, kill the connection, return the close event. */
async function captureCloseEvent(kill: (serverSocket: WebSocket) => void): Promise<unknown> {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 });
  // Declared out here so the finally can close it however the try exits.
  let client: WebSocket | undefined;
  try {
    await new Promise<void>((resolve) => {
      server.once('listening', resolve);
    });
    const address = server.address();
    if (typeof address === 'string' || !address) throw new Error('no port assigned');

    const serverSocketPromise = new Promise<WebSocket>((resolve) => {
      server.once('connection', resolve);
    });
    const socket = new WebSocket(`ws://127.0.0.1:${address.port}`);
    client = socket;
    const closeEvent = new Promise<unknown>((resolve) => {
      socket.addEventListener('close', resolve);
    });

    await new Promise<void>((resolve) => {
      socket.addEventListener('open', () => resolve());
    });
    kill(await serverSocketPromise);
    return await closeEvent;
  } finally {
    // Both handles, so a hang or a thrown assertion above cannot leak them and hold the worker open.
    client?.terminate();
    server.close();
  }
}

describe('describeWebSocketCloseEvent against real ws events', () => {
  test('an abnormally terminated connection reports an abnormal close', async () => {
    // terminate() destroys the socket without a close frame — the closest analogue to a
    // connection dying, which is what the suspend failure looks like.
    const ev = await captureCloseEvent((serverSocket) => serverSocket.terminate());

    const result = describeWebSocketCloseEvent(ev);
    expect(result).toContain('wasClean=false');
    expect(result).toContain('code=1006');
  });

  test('a politely closed connection reports the code it was closed with', async () => {
    const ev = await captureCloseEvent((serverSocket) => serverSocket.close(1001, 'going away'));

    const result = describeWebSocketCloseEvent(ev);
    expect(result).toContain('code=1001');
    expect(result).toContain('going away');
  });

  test('a real ws close event confirms the unit-test fixture premise', async () => {
    const ev = await captureCloseEvent((serverSocket) => serverSocket.terminate());

    // The premise behind the symbol-keyed fixtures: real ws events carry no own
    // properties, so JSON.stringify yields {} and fields must be read explicitly.
    expect(JSON.stringify(ev)).toBe('{}');
    expect(typeof ev === 'object' && ev && 'reason' in ev && typeof ev.reason).toBe('string');
  });
});

describe('describeWebSocketErrorEvent against a real ws refused connection', () => {
  test('a refused connection reports ECONNREFUSED and confirms the {} fixture premise', async () => {
    // No server is listening on this port — the same shape a client dialing before the
    // server is up would see, and the real-world fingerprint this case exists to catch.
    const port = await getUnusedPort();
    const client = new WebSocket(`ws://127.0.0.1:${port}`);
    try {
      const errorEvent = await new Promise<unknown>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error('timed out waiting for error event')),
          5000,
        );
        client.addEventListener('error', (ev) => {
          clearTimeout(timer);
          resolve(ev);
        });
      });

      // Same premise the unit fixtures rest on: a real `ws` error event carries no own
      // properties, so JSON.stringify collapses it and fields must be read explicitly.
      expect(JSON.stringify(errorEvent)).toBe('{}');
      expect(describeWebSocketErrorEvent(errorEvent)).toContain('ECONNREFUSED');
    } finally {
      client.terminate();
    }
  }, 10000);
});
