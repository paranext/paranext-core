// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { WebSocket, WebSocketServer } from 'ws';
import { describeWebSocketCloseEvent } from '@shared/data/rpc.model';

/** Open a server on an ephemeral port, connect, kill the connection, return the close event. */
async function captureCloseEvent(kill: (serverSocket: WebSocket) => void): Promise<unknown> {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 });
  try {
    await new Promise<void>((resolve) => {
      server.once('listening', resolve);
    });
    const address = server.address();
    if (typeof address === 'string' || !address) throw new Error('no port assigned');

    const serverSocketPromise = new Promise<WebSocket>((resolve) => {
      server.once('connection', resolve);
    });
    const client = new WebSocket(`ws://127.0.0.1:${address.port}`);
    const closeEvent = new Promise<unknown>((resolve) => {
      client.addEventListener('close', resolve);
    });

    await new Promise<void>((resolve) => {
      client.addEventListener('open', () => resolve());
    });
    kill(await serverSocketPromise);
    return await closeEvent;
  } finally {
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
