/**
 * Stand-ins for both ends of main's websocket, shared by the suites that exercise what main does
 * while a client is connected, when one goes away, and while its own server is binding. The fakes
 * live here rather than being copied into each suite and drifting apart.
 */

import { serialize } from 'platform-bible-utils';

/** Listeners a fake socket collected, keyed by the event name they were added for */
type FakeWebSocketListeners = { [eventName: string]: ((event: unknown) => void)[] };

/**
 * Minimal stand-in for the server end of a client's websocket: it records the listeners the RPC
 * layer attaches so a test can fire `close` (and hand it messages) itself.
 */
export function createFakeWebSocket() {
  const listeners: FakeWebSocketListeners = {};
  const sentPayloads: string[] = [];
  const fakeWebSocket = {
    readyState: 1,
    send: (payload: string) => sentPayloads.push(payload),
    addEventListener: (eventName: string, listener: (event: unknown) => void) => {
      listeners[eventName] = [...(listeners[eventName] ?? []), listener];
    },
    removeEventListener: (eventName: string, listener: (event: unknown) => void) => {
      listeners[eventName] = (listeners[eventName] ?? []).filter((l) => l !== listener);
    },
    close: () => {},
  };
  return {
    // The fake only implements what the RPC layer touches; the real type is far wider.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    webSocket: fakeWebSocket as unknown as WebSocket,
    sentPayloads,
    receiveMessage: (message: unknown) => {
      listeners.message?.forEach((listener) => listener({ data: serialize(message) }));
    },
    close: () => listeners.close?.forEach((listener) => listener({ target: fakeWebSocket })),
  };
}

type Handler = (arg?: unknown) => void;

/**
 * Stand-in for `ws`'s `WebSocketServer`, which `RpcWebSocketListener.connect` waits on: it must
 * complete the `listening` handshake or `connect()` never resolves.
 */
export class FakeWebSocketServer {
  isClosed = false;

  private handlers = new Map<string, Set<Handler>>();

  /**
   * Handlers registered through {@link once}, which {@link emit} drops after firing them. Tracked
   * alongside `handlers` rather than registering a self-removing wrapper, because production
   * removes these by their original reference — `removeListener('error', onError)` — and a wrapper
   * would make that a no-op.
   */
  private onceHandlers = new Set<Handler>();

  /**
   * @param autoListen Whether to fire `listening` on the next tick, which is what a suite that only
   *   needs `connect()` to succeed wants. Pass false to drive the events by hand with
   *   {@link FakeWebSocketServer.emit}.
   */
  constructor(private readonly autoListen: boolean) {}

  addListener(type: string, handler: Handler) {
    this.on(type, handler);
  }

  on(type: string, handler: Handler) {
    const forType = this.handlers.get(type) ?? new Set<Handler>();
    forType.add(handler);
    this.handlers.set(type, forType);
  }

  once(type: string, handler: Handler) {
    this.on(type, handler);
    this.onceHandlers.add(handler);
    if (this.autoListen && type === 'listening')
      setTimeout(() => {
        this.emit('listening');
      }, 0);
  }

  removeListener(type: string, handler: Handler) {
    this.handlers.get(type)?.delete(handler);
    this.onceHandlers.delete(handler);
  }

  /**
   * The first handler registered for `type`, for suites that drive it directly — handing the
   * `connection` handler a client the way a real `WebSocketServer` would, say.
   */
  getHandler(type: string): Handler | undefined {
    return [...(this.handlers.get(type) ?? [])][0];
  }

  close() {
    this.isClosed = true;
  }

  /**
   * Drives the event the production code is waiting on.
   *
   * Throws an unhandled `error` the way a real EventEmitter does, so a test can tell the difference
   * between an error that is handled and one that would take the process down.
   */
  emit(type: string, arg?: unknown) {
    const handlers = [...(this.handlers.get(type) ?? [])];
    if (type === 'error' && handlers.length === 0) throw arg;
    handlers.forEach((handler) => {
      if (this.onceHandlers.has(handler)) {
        this.onceHandlers.delete(handler);
        this.handlers.get(type)?.delete(handler);
      }
      handler(arg);
    });
  }
}

/**
 * Creates a {@link FakeWebSocketServer}.
 *
 * Deliberately keeps no registry of what it created: a suite that needs the instance should collect
 * it in `vi.hoisted` state, which survives the `vi.resetModules()` some of these suites call.
 * Module-level state here would not — the mocked `ws` factory and the test body can end up holding
 * different copies of this module.
 *
 * @param autoListen Whether to complete the `listening` handshake automatically on the next tick,
 *   which is what a suite that only needs `connect()` to succeed wants. Pass false to drive the
 *   events by hand with {@link FakeWebSocketServer.emit}.
 */
export function createFakeWebSocketServer(autoListen = true): FakeWebSocketServer {
  return new FakeWebSocketServer(autoListen);
}
