import { describe, expect, it, vi } from 'vitest';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';

// Mock heavy dependencies so this test can run outside the Electron main process.
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', () => ({
  WebSocketServer: vi.fn(() => ({ addListener: vi.fn(), removeListener: vi.fn(), close: vi.fn() })),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

/**
 * `onDidLoseConnection` never fires on this end — only a process holding a client connection can
 * lose one. It exists on `IRpcMethodRegistrar` so shared code (`network.service`) can subscribe in
 * any process without asking which one it is running in.
 *
 * That makes the property itself the contract: shared code calls it unconditionally at startup, so
 * a listener that dropped it, or exposed something that is not subscribable, would break the
 * network service in main with nothing else to catch it. These assertions pin the seam rather than
 * any behavior, because there is no behavior here to pin.
 */
describe('the listener end of the connection-lost seam', () => {
  it('exposes a subscribable onDidLoseConnection that shared code can call unconditionally', () => {
    const listener = new RpcWebSocketListener();

    expect(typeof listener.onDidLoseConnection).toBe('function');

    const callback = vi.fn();
    const unsubscribe = listener.onDidLoseConnection(callback);

    // Subscribing must not throw, and must hand back a working unsubscriber — `network.service`
    // stores it and calls it during `shutdown()`.
    expect(typeof unsubscribe).toBe('function');
    expect(() => unsubscribe()).not.toThrow();
    // Nothing on this end ever emits, so the subscriber is never called.
    expect(callback).not.toHaveBeenCalled();
  });
});
