import {
  createPortCloseHandshake,
  PortCloseHandshake,
} from '@shared/data/papi-port-close-handshake';
import { SyntheticCloseEvent } from '@shared/data/papi-port.model';
import { bindClassMethods } from '@shared/utils/util';

/**
 * The surface of a DOM `MessagePort` this adapter uses. Node's `worker_threads` `MessagePort`
 * satisfies it too, which is what the in-process tests use.
 *
 * @experimental
 */
export type MessagePortLike = {
  /** @experimental */
  addEventListener(type: 'message', listener: (ev: { data: unknown }) => void): void;
  /** @experimental */
  addEventListener(type: 'close', listener: () => void): void;
  /** @experimental */
  removeEventListener(type: 'message', listener: (ev: { data: unknown }) => void): void;
  /** @experimental */
  removeEventListener(type: 'close', listener: () => void): void;
  /** @experimental */
  postMessage(message: unknown): void;
  /** @experimental */
  start(): void;
  /** @experimental */
  close(): void;
};

/**
 * How the adapter obtains its port. Calls exactly one of the handlers, once. The Electron
 * implementation asks main through the preload; tests hand a port over directly.
 *
 * @experimental
 */
export type PapiPortProvider = (handlers: {
  onPort: (port: MessagePortLike, windowId: string) => void;
  onError: (reason: string) => void;
}) => void;

type SocketEventName = keyof WebSocketEventMap;
type SocketListener = (ev: unknown) => void;

const PAGE_UNLOADING_REASON = 'page unloading';

/**
 * A `WebSocket` whose wire is an Electron `MessagePort` to the main process instead of a TCP
 * socket. Chromium closes every TCP client socket when the OS suspends; a MessagePort is a Mojo
 * pipe, which observes no power events, so the connection survives sleep.
 *
 * Isomorphic with the DOM `WebSocket` for everything `RpcClient` uses: `readyState`, `url`, `send`,
 * `close`, and the `open`/`message`/`error`/`close` events. A port has no close code, so intent
 * travels in a close frame: `close(code, reason)` posts one before closing the port, a frame from
 * main is reported as main's close, and a port that closes with no frame is 1006 with `wasClean:
 * false`, the same shape a websocket that died produces. `pagehide` closes with 1001 so a reload or
 * window close reads as clean on main.
 *
 * Keeps the first port it is handed and ignores any other: the bridge that hands ports out is
 * reachable from same-origin web views, and a page has exactly one connection.
 *
 * @experimental
 */
export class MessagePortWebSocket implements WebSocket {
  /** @experimental */
  readonly CONNECTING = 0 as const;
  /** @experimental */
  readonly OPEN = 1 as const;
  /** @experimental */
  readonly CLOSING = 2 as const;
  /** @experimental */
  readonly CLOSED = 3 as const;

  /** @experimental */
  readyState: number = 0;
  /** @experimental */
  url = 'electron-messageport://papi/';
  /** @experimental */
  readonly bufferedAmount = 0;
  /** @experimental */
  readonly extensions = '';
  /** @experimental */
  readonly protocol = '';
  /** @experimental */
  binaryType: BinaryType = 'blob';

  // The `on*` handlers are `null` when unset because that is what the WebSocket interface declares
  /* eslint-disable no-null/no-null */
  /** @experimental */
  onopen: ((this: WebSocket, ev: Event) => unknown) | null = null;
  /** @experimental */
  onmessage: ((this: WebSocket, ev: MessageEvent) => unknown) | null = null;
  /** @experimental */
  onerror: ((this: WebSocket, ev: Event) => unknown) | null = null;
  /** @experimental */
  onclose: ((this: WebSocket, ev: CloseEvent) => unknown) | null = null;
  /* eslint-enable no-null/no-null */

  private port: MessagePortLike | undefined;
  private readonly handshake: PortCloseHandshake;
  private readonly listeners: Record<SocketEventName, Set<SocketListener>> = {
    open: new Set(),
    message: new Set(),
    error: new Set(),
    close: new Set(),
  };

  /**
   * @param provider How to obtain the port
   * @param options `addPageHideListener` defaults to true; tests that share one jsdom window pass
   *   false so sockets do not pile listeners onto it
   * @experimental
   */
  constructor(provider: PapiPortProvider, options: { addPageHideListener?: boolean } = {}) {
    bindClassMethods.call(this);
    // Before a port arrives there is nothing to post on or close, so a close then only reports
    this.handshake = createPortCloseHandshake(this, {
      postFrame: (frame) => this.port?.postMessage(frame),
      closePort: () => this.port?.close(),
      onClosed: this.onClosed,
    });
    if (options.addPageHideListener !== false && typeof window !== 'undefined')
      window.addEventListener('pagehide', () => this.close(1001, PAGE_UNLOADING_REASON));
    provider({
      onPort: (port, windowId) => this.acceptPort(port, windowId),
      onError: (reason) => this.failToOpen(reason),
    });
  }

  /** @experimental */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.readyState !== 1 || !this.port)
      throw new Error(
        `Cannot send on a PAPI port that is not open (readyState ${this.readyState})`,
      );
    this.port.postMessage(data);
  }

  /** @experimental */
  close(code: number = 1000, reason: string = ''): void {
    // Closed before a port arrived, this only reports the close; `acceptPort` then refuses the port
    this.handshake.close(code, reason);
  }

  /** @experimental */
  addEventListener<K extends SocketEventName>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => unknown,
  ): void {
    // The listener map is untyped on purpose; the RPC layer's handlers are typed at their call sites.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.listeners[type].add(listener as unknown as SocketListener);
  }

  /** @experimental */
  removeEventListener<K extends SocketEventName>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => unknown,
  ): void {
    // The listener map is untyped on purpose; the RPC layer's handlers are typed at their call sites.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.listeners[type].delete(listener as unknown as SocketListener);
  }

  /** @experimental */
  dispatchEvent(event: Event): boolean {
    // Only the four WebSocket event names have listeners; any other type reaches no one
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.emit(event.type as SocketEventName, event);
    return true;
  }

  private acceptPort(port: MessagePortLike, windowId: string): void {
    if (this.port || this.handshake.isClosed) {
      // Already have one, or already gave up: this port will never be used, so do not leak it
      port.close();
      return;
    }
    this.port = port;
    this.url = `electron-messageport://papi/${windowId}`;
    port.addEventListener('message', this.onPortMessage);
    port.addEventListener('close', this.onPortClose);
    // Nothing is delivered — not a message, not even `close` — until the port is started, and
    // `addEventListener` does not start it the way assigning `onmessage` would.
    port.start();
    this.readyState = 1;
    this.emit('open', { type: 'open', target: this });
  }

  private failToOpen(reason: string): void {
    if (this.handshake.isClosed) return;
    this.emit('error', { type: 'error', target: this, message: reason });
    // No port yet, so this posts nothing and reports 1006, which is not a clean code
    this.handshake.close(1006, reason);
  }

  private onPortMessage({ data }: { data: unknown }): void {
    if (this.handshake.handleIncoming(data)) return;
    this.emit('message', { type: 'message', target: this, data });
  }

  private onPortClose(): void {
    this.handshake.handlePortClosed();
  }

  /** Detach from the port and tell close listeners; the handshake calls this exactly once */
  private onClosed(event: SyntheticCloseEvent): void {
    this.readyState = 3;
    if (this.port) {
      this.port.removeEventListener('message', this.onPortMessage);
      this.port.removeEventListener('close', this.onPortClose);
    }
    this.emit('close', event);
  }

  private emit(type: SocketEventName, event: unknown): void {
    // `dispatchEvent` can hand over any event name; one a WebSocket does not have reaches no one
    const listeners: Set<SocketListener> | undefined = this.listeners[type];
    if (!listeners) return;
    // The `on<type>` handlers are typed per event; this dispatches any of them with its own event
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const handler = this[`on${type}`] as unknown as ((ev: unknown) => unknown) | null;
    if (handler) handler.call(this, event);
    listeners.forEach((listener) => listener(event));
  }
}

export default MessagePortWebSocket;
