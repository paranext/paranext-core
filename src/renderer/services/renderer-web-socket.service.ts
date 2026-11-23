import { WEBSOCKET_PORT } from '@shared/data/rpc.model';

/**
 * The browser's own `WebSocket`, saved when this module loads so `PapiRendererWebSocket` still
 * reaches it after {@link replaceTopWindowWebSocket} has put `PapiRendererWebSocket` in its place.
 */
const NativeWebSocket = globalThis.WebSocket;

// Allow system networking components to create web sockets that connect back to localhost at first
let allowWebSocketsBackToPapiNetwork: boolean = true;

/**
 * Makes `PapiRendererWebSocket` (the `WebSocket` web views and, after
 * {@link replaceTopWindowWebSocket}, the top window get) refuse connections to the PAPI network. The
 * main process blocks the port for every frame regardless; see "The renderer's PAPI port" in
 * `.context/standards/Security-Guide.md`.
 *
 * Private so that {@link initializeNetworkThenBlockPapiWebSockets} is the only way in: it is what
 * guarantees the block runs after the network service has settled, never before.
 */
const blockWebSocketsToPapiNetwork = (): void => {
  allowWebSocketsBackToPapiNetwork = false;
};

/**
 * Runs `initialize`, then blocks web views from the PAPI network whether it resolved or rejected,
 * so a renderer that failed to connect does not keep running with extension sandboxing off.
 *
 * The block cannot run before `initialize` settles: without an Electron bridge, the renderer's own
 * connection to main is a `PapiRendererWebSocket` to the PAPI port (see `web-socket.factory.ts`).
 * Until it settles (at most about 10 s, the connect timeout) web views are not blocked; none can
 * exist yet, because the web view service starts only after this call in `index.tsx`.
 *
 * @param initialize Starts the renderer's network service
 * @throws Whatever `initialize` threw or rejected with, after blocking
 */
export async function initializeNetworkThenBlockPapiWebSockets(
  initialize: () => Promise<void>,
): Promise<void> {
  try {
    await initialize();
  } finally {
    blockWebSocketsToPapiNetwork();
  }
}

// We are just filtering by port number on purpose to allow other connections to localhost
function isPotentialConnectionToPapiNetwork(url: string | URL): boolean {
  let urlObj: URL;
  if (typeof url === 'string') {
    urlObj = new URL(url);
  } else {
    urlObj = url;
  }

  const { port } = urlObj;
  return parseInt(port, 10) === parseInt(`${WEBSOCKET_PORT}`, 10);
}

/**
 * JSDOC SOURCE PapiRendererWebSocket This wraps the browser's WebSocket implementation to provide
 * better control over internet access. It is isomorphic with the standard WebSocket, so it should
 * act as a drop-in replacement.
 *
 * Note that the Node WebSocket implementation is different and not wrapped here.
 */
export class PapiRendererWebSocket implements WebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  // Use "any" to match the WebSocket interface
  /* eslint-disable @typescript-eslint/no-explicit-any, @stylistic/ts/lines-between-class-members */
  readonly CONNECTING!: 0;
  readonly OPEN!: 1;
  readonly CLOSING!: 2;
  readonly CLOSED!: 3;
  addEventListener!: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  binaryType!: BinaryType;
  bufferedAmount!: number;
  close!: (code?: number, reason?: string) => void;
  dispatchEvent!: (event: Event) => boolean;
  extensions!: string;
  onclose!: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror!: ((this: WebSocket, ev: Event) => any) | null;
  onmessage!: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen!: ((this: WebSocket, ev: Event) => any) | null;
  protocol!: string;
  readyState!: number;
  removeEventListener!: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => void;
  send!: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
  url!: string;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  constructor(url: string | URL, protocols?: string | string[]) {
    // TODO: Hook into something that checks for whether the platform is in offline mode

    // Don't allow extensions to connect back into the network using raw web sockets
    if (!allowWebSocketsBackToPapiNetwork && isPotentialConnectionToPapiNetwork(url))
      throw new Error(`Invalid URL: ${url}`);

    // Return a real object for now.
    // If we ever need something better we could use a Proxy or just hold an inner object.
    // eslint-disable-next-line no-constructor-return
    return new NativeWebSocket(url, protocols);
  }

  /**
   * Sockets this class returns are native `WebSocket` instances, so `socket instanceof WebSocket`
   * keeps working for code that sees this class as its `WebSocket`
   */
  static [Symbol.hasInstance](instance: unknown): boolean {
    return instance instanceof NativeWebSocket;
  }
}

/**
 * Puts `PapiRendererWebSocket` in place of the native `WebSocket` on `target` (the top window), and
 * makes it the `constructor` of every native socket, so a same-origin web view that borrows the
 * constructor through `window.top` or through a socket it was handed gets the PAPI-port check too.
 *
 * This is defence in depth that gives a clear `Invalid URL` error: a fresh iframe in the top
 * document still gets its own native `WebSocket`, so the main process's `onBeforeRequest` block
 * (`papi-port-request-block.util.ts`) is what actually closes the port.
 *
 * @param target The window whose `WebSocket` to replace
 */
export function replaceTopWindowWebSocket(target: { WebSocket: unknown }): void {
  target.WebSocket = PapiRendererWebSocket;
  Object.defineProperty(NativeWebSocket.prototype, 'constructor', {
    value: PapiRendererWebSocket,
    writable: true,
    configurable: true,
    enumerable: false,
  });
}

export default PapiRendererWebSocket;
