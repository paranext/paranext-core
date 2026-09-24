import { isCleanCloseCode } from '@shared/data/rpc.model';
import {
  createPapiPortCloseFrame,
  createSyntheticCloseEvent,
  isPapiPortCloseFrame,
} from '@shared/data/papi-port.model';

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

const PORT_CLOSED_WITHOUT_FRAME_REASON = 'port closed without a close frame';
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
  private hasClosed = false;
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
   */
  constructor(provider: PapiPortProvider, options: { addPageHideListener?: boolean } = {}) {
    this.onPortMessage = this.onPortMessage.bind(this);
    this.onPortClose = this.onPortClose.bind(this);
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
    if (this.hasClosed) return;
    if (this.port) {
      this.port.postMessage(createPapiPortCloseFrame(code, reason));
      this.finish(code, reason, isCleanCloseCode(code));
      this.port.close();
      return;
    }
    // Closed before a port arrived: report it, and refuse the port if one turns up later
    this.finish(code, reason, isCleanCloseCode(code));
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
    if (this.port || this.hasClosed) {
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
    if (this.hasClosed) return;
    this.emit('error', { type: 'error', target: this, message: reason });
    this.finish(1006, reason, false);
  }

  private onPortMessage({ data }: { data: unknown }): void {
    if (this.hasClosed) return;
    if (isPapiPortCloseFrame(data)) {
      this.finish(data.code, data.reason, isCleanCloseCode(data.code));
      this.port?.close();
      return;
    }
    this.emit('message', { type: 'message', target: this, data });
  }

  private onPortClose(): void {
    if (this.hasClosed) return;
    this.finish(1006, PORT_CLOSED_WITHOUT_FRAME_REASON, false);
  }

  /** Record the close, detach from the port, and tell close listeners exactly once */
  private finish(code: number, reason: string, wasClean: boolean): void {
    this.hasClosed = true;
    this.readyState = 3;
    if (this.port) {
      this.port.removeEventListener('message', this.onPortMessage);
      this.port.removeEventListener('close', this.onPortClose);
    }
    this.emit('close', createSyntheticCloseEvent(this, code, reason, wasClean));
  }

  private emit(type: SocketEventName, event: unknown): void {
    // The `on<type>` handlers are typed per event; this dispatches any of them with its own event
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const handler = this[`on${type}`] as unknown as ((ev: unknown) => unknown) | null;
    if (handler) handler.call(this, event);
    this.listeners[type].forEach((listener) => listener(event));
  }
}

export default MessagePortWebSocket;
