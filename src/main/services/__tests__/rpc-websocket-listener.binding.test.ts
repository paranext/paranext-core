import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { WebSocketServer } from 'ws';

// Mock heavy dependencies so this test can run outside the Electron main process. The
// WebSocketServer mock returns a listener-shaped stub because connect() wires handlers onto the
// instance it constructs.
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
// connect() waits for the server's `listening` event before reporting success, so the fake has to
// finish the handshake or connect() would never resolve.
vi.mock('ws', async () => {
  const { createFakeWebSocketServer } = await import('./fake-web-socket-test.util');
  return { WebSocketServer: vi.fn(() => createFakeWebSocketServer()) };
});
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

describe('the PAPI websocket listens on loopback only', () => {
  let listener: RpcWebSocketListener;

  beforeEach(() => {
    vi.mocked(WebSocketServer).mockClear();
    listener = new RpcWebSocketListener();
  });

  it('binds to a loopback host so off-machine clients cannot connect', async () => {
    await listener.connect(vi.fn());

    // Connections to the websocket are unauthenticated, so binding off loopback would expose every
    // registered PAPI method to the network. Accept any loopback spelling — the security property
    // is the address family-independent one, not the literal.
    expect(WebSocketServer).toHaveBeenCalledTimes(1);
    expect(vi.mocked(WebSocketServer).mock.calls[0][0]).toEqual(
      expect.objectContaining({
        host: expect.stringMatching(/^(localhost|127\.0\.0\.1|::1)$/),
        port: WEBSOCKET_PORT,
      }),
    );
  });
});
