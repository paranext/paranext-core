import { describe, expect, it, vi } from 'vitest';
import { INTENTIONAL_CLOSE_CODE } from '@shared/data/rpc.model';
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

/**
 * Builds a client whose in-flight connection attempt is already awaited.
 *
 * `connectionComplete` is armed in a field initializer, and the close handler rejects it for
 * whichever attempt is still waiting. These tests drive the close handler without ever calling
 * `connect`, so nothing would be subscribed and the rejection would surface as an unhandled
 * rejection instead of a test failure.
 */
function createRpcClient(): RpcClient {
  const rpcClient = new RpcClient();
  // Reaching a private field is the only way to subscribe to an attempt that `connect` never made.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  ((rpcClient as any).connectionComplete.promise as Promise<void>).catch(() => {});
  return rpcClient;
}

describe('RpcClient connection-lost announcement', () => {
  it('fires onDidLoseConnection when the socket dies unexpectedly', () => {
    const rpcClient = createRpcClient();
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stays silent when the close completed a handshake', () => {
    const rpcClient = createRpcClient();
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
    const rpcClient = createRpcClient();
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });
    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops calling a listener that unsubscribed', () => {
    const rpcClient = createRpcClient();
    const listener = vi.fn();
    const unsubscribe = rpcClient.onDidLoseConnection(listener);
    unsubscribe();

    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).not.toHaveBeenCalled();
  });
});
