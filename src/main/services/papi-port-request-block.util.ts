/**
 * Blocking WebSocket connections from renderer windows to the PAPI port.
 *
 * PAPI connections are unauthenticated, and web views are same-origin iframes that can borrow the
 * renderer's native `WebSocket` (through `window.top`, a returned socket's `constructor`, or a
 * fresh iframe in the top document), so a block inside the renderer alone cannot stop them. Every
 * WebSocket handshake a window makes passes through its session's `onBeforeRequest`, whatever frame
 * or constructor opened it, so cancelling there closes all of those routes.
 *
 * Nothing legitimate is blocked: windows reach main over a `MessagePort`, and the extension host
 * and the .NET data provider are not in a browser session. External browsers (the OpenRPC
 * playground, a developer testing PAPI) use their own sessions and are unaffected.
 */

import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';

/** The parts of Electron's `OnBeforeRequestListenerDetails` the block reads */
export type PapiPortRequestDetails = {
  url: string;
  resourceType: string;
};

/**
 * Whether a request from a renderer window must be cancelled because it is a WebSocket to the PAPI
 * port. Matches on the port alone, not the host, as `isPotentialConnectionToPapiNetwork` does, so
 * `127.0.0.1`, `[::1]` and other names for this machine are covered too.
 *
 * @param details The request
 * @returns `true` to cancel the request
 */
export function isPapiPortWebSocketRequest(details: PapiPortRequestDetails): boolean {
  if (details.resourceType !== 'webSocket') return false;

  let port: string;
  try {
    ({ port } = new URL(details.url));
  } catch {
    return false;
  }
  return port === `${WEBSOCKET_PORT}`;
}

/** The part of Electron's `Session` that registers an `onBeforeRequest` listener */
export type PapiPortRequestSession = {
  webRequest: {
    onBeforeRequest(
      listener: (
        details: PapiPortRequestDetails,
        callback: (response: { cancel?: boolean }) => void,
      ) => void,
    ): void;
  };
};

/**
 * Cancels every WebSocket request to the PAPI port made in `session`.
 *
 * Electron keeps only one `onBeforeRequest` listener per session: registering another replaces this
 * one and silently removes the block. Anything else that needs `onBeforeRequest` on the same
 * session must be folded into this listener.
 *
 * @param session The session the renderer windows use
 */
export function registerPapiPortRequestBlock(session: PapiPortRequestSession): void {
  session.webRequest.onBeforeRequest((details, callback) => {
    const cancel = isPapiPortWebSocketRequest(details);
    if (cancel)
      logger.warn(`Blocked a WebSocket from a renderer window to the PAPI port: ${details.url}`);
    callback({ cancel });
  });
}
