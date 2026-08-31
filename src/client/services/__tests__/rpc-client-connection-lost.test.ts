import { describe, expect, it, vi } from 'vitest';
import { ConnectionStatus, INTENTIONAL_CLOSE_CODE } from '@shared/data/rpc.model';
import { RpcClient } from '@client/services/rpc-client';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/**
 * Drives the client's private close handler the way a real socket would. The handler is bound in
 * the constructor, so reaching it by name is the only way to deliver a close event without standing
 * up a websocket server.
 */
function closeSocket(
  rpcClient: RpcClient,
  ev: { code: number; reason: string; wasClean: boolean },
) {
  // Reaching a private handler is the only way to deliver a close event without a real socket.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  (rpcClient as any).onWebSocketClose(ev);
}

/** Puts the client in the state a live connection leaves it in, without opening a socket. */
function markConnected(rpcClient: RpcClient) {
  // See closeSocket: reaching a private field is the only way to set this without a real socket.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  (rpcClient as any).connectionStatus = ConnectionStatus.Connected;
}

describe('RpcClient connection-lost announcement', () => {
  it('fires onDidLoseConnection when the socket dies unexpectedly', () => {
    const rpcClient = new RpcClient();
    markConnected(rpcClient);
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stays silent when the app closed the socket on purpose', () => {
    const rpcClient = new RpcClient();
    markConnected(rpcClient);
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    closeSocket(rpcClient, {
      code: INTENTIONAL_CLOSE_CODE,
      reason: 'app shutdown',
      wasClean: true,
    });

    expect(listener).not.toHaveBeenCalled();
  });

  it('fires once even if the close handler is invoked again', () => {
    const rpcClient = new RpcClient();
    markConnected(rpcClient);
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });
    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops calling a listener that unsubscribed', () => {
    const rpcClient = new RpcClient();
    markConnected(rpcClient);
    const listener = vi.fn();
    const unsubscribe = rpcClient.onDidLoseConnection(listener);
    unsubscribe();

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).not.toHaveBeenCalled();
  });
});
