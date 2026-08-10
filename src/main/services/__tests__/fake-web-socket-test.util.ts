/**
 * Stand-in for the server end of a client's websocket, shared by the suites that exercise what main
 * does while a client is connected and when one goes away (`rpc-client-disconnect.test.ts` and
 * `rpc-disconnect-announcement-ordering.test.ts`). Both need to fire `close` themselves and to read
 * back, in order, everything main sent to a socket, so the fake lives here rather than being copied
 * into each suite and drifting apart.
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
