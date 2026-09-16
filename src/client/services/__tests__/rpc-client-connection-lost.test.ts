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

/**
 * Drives the client's private error handler the way a real socket would. A refused socket fires
 * `error` before `close`, and that handler settles the connection attempt.
 */
function errorOnSocket(rpcClient: RpcClient) {
  // Reaching a private handler is the only way to deliver an error event without a real socket.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  (rpcClient as any).onError(new Event('error'));
}

/**
 * Builds a client whose in-flight connection attempt is already awaited.
 *
 * `connectionComplete` is armed in a field initializer, and the close handler rejects it for
 * whichever attempt is still waiting. These tests drive the close handler without ever calling
 * `connect`, so nothing would be subscribed and the rejection would surface as an unhandled
 * rejection instead of a test failure.
 *
 * `connectionStatus` is the precondition the loss event is gated on — only an established
 * connection can be lost — so it is set explicitly rather than left at the constructor's
 * `Disconnected`, which no real close would ever be dispatched against.
 */
function createRpcClient(
  connectionStatus: ConnectionStatus = ConnectionStatus.Connected,
): RpcClient {
  const rpcClient = new RpcClient();
  rpcClient.connectionStatus = connectionStatus;
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

  // A socket that never opened is a failed connection attempt, not a lost connection: `connect()`
  // reports it through its own return value, and surfacing a startup that never reached the network
  // is PT-4494 / PT-4495's territory. Both shapes of a failing startup are pinned because they
  // reach this handler differently — one arrives here, the other cannot — and the gate is what
  // makes them agree.
  it('stays silent when a socket dies before the connection was ever established', () => {
    const rpcClient = createRpcClient(ConnectionStatus.Connecting);
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    // A peer that accepts the TCP connection and then drops it before the websocket upgrade emits
    // a close with no preceding error, so this handler does run during the attempt.
    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).not.toHaveBeenCalled();
  });

  it('stays silent on a refused connection that reports an error before the close', () => {
    const rpcClient = createRpcClient(ConnectionStatus.Connecting);
    const listener = vi.fn();
    rpcClient.onDidLoseConnection(listener);

    errorOnSocket(rpcClient);
    closeSocket(rpcClient, { code: 1006, reason: '', wasClean: false });

    expect(listener).not.toHaveBeenCalled();
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
