import { WEBSOCKET_PORT } from '@shared/data/network-connector.model';

// Allow system networking components to create web sockets that connect back to localhost at first
let allowWebSocketsBackToPapiNetwork: boolean = true;

/** Once our network is running, run this to stop extensions from connecting to it directly */
export const blockWebSocketsToPapiNetwork = (): void => {
  allowWebSocketsBackToPapiNetwork = false;
};

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
export default class PapiRendererWebSocket implements WebSocket {
  // Use "any" to match the WebSocket interface
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/lines-between-class-members */
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
    return new WebSocket(url, protocols);
  }
}
