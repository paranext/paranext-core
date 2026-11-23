import { describe, expect, it, vi } from 'vitest';
import { RpcClient } from '@client/services/rpc-client';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));
vi.mock('@client/services/web-socket.factory', () => ({ createWebSocket: vi.fn() }));

describe('client processes see the disconnect seam but never a disconnect', () => {
  it('exposes a subscribable onDidDisconnectClient that no client-side event can fire', () => {
    const rpcClient = new RpcClient();
    const handler = vi.fn();

    const unsubscribe = rpcClient.onDidDisconnectClient(handler);

    // Only the process holding the websocket server learns that a client's methods died with it.
    // Shared code subscribes in every process regardless, so the client's event has to be real
    // enough to subscribe to and unsubscribe from.
    expect(handler).not.toHaveBeenCalled();
    expect(unsubscribe()).toBe(true);
  });
});
