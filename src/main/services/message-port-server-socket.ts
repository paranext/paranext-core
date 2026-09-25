import { isCleanCloseCode, ServerSocketLike } from '@shared/data/rpc.model';
import {
  createPapiPortCloseFrame,
  createSyntheticCloseEvent,
  isPapiPortCloseFrame,
} from '@shared/data/papi-port.model';
import { bindClassMethods } from '@shared/utils/util';

/**
 * The surface of Electron's `MessagePortMain` this adapter uses, typed structurally so tests can
 * hand it a Node `MessagePort` behind a shim.
 */
export type MessagePortMainLike = {
  on(event: 'message', listener: (messageEvent: { data: unknown }) => void): unknown;
  on(event: 'close', listener: () => void): unknown;
  off(event: 'message', listener: (messageEvent: { data: unknown }) => void): unknown;
  off(event: 'close', listener: () => void): unknown;
  postMessage(message: unknown): void;
  start(): void;
  close(): void;
};

type SocketEventName = 'close' | 'error' | 'message';
type SocketListener = (ev: unknown) => void;

const PORT_CLOSED_WITHOUT_FRAME_REASON = 'port closed without a close frame';

/**
 * Presents the main end of a renderer's `MessagePort` as the socket `RpcServer` and
 * `RpcWebSocketListener` program against.
 *
 * A port has no close code, so intent travels in a close frame: `close(code, reason)` posts one
 * before closing the port, and a frame arriving from the peer is reported as that peer's close. A
 * port that closes with no frame first is reported as 1006 with `wasClean: false`, the same shape a
 * websocket that died produces, so the RPC layer's severity split applies unchanged.
 *
 * Messages are delivered as `{ data }` with the port's payload untouched; whether it parses is the
 * RPC layer's business, as it is for a websocket.
 */
export class MessagePortServerSocket implements ServerSocketLike {
  readyState = 1;

  private readonly listeners: Record<SocketEventName, Set<SocketListener>> = {
    close: new Set(),
    error: new Set(),
    message: new Set(),
  };

  private hasClosed = false;

  constructor(private readonly port: MessagePortMainLike) {
    bindClassMethods.call(this);
    port.on('message', this.onPortMessage);
    port.on('close', this.onPortClose);
    // Nothing is delivered on a MessagePortMain — not a message, not even `close` — until it is
    // started, and attaching listeners does not start it.
    port.start();
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.hasClosed) return;
    this.port.postMessage(data);
  }

  close(code: number = 1000, reason: string = ''): void {
    if (this.hasClosed) return;
    this.port.postMessage(createPapiPortCloseFrame(code, reason));
    this.finish(code, reason, isCleanCloseCode(code));
    this.port.close();
  }

  addEventListener<K extends SocketEventName>(
    type: K,
    listener: (ev: WebSocketEventMap[K]) => void,
  ): void {
    // The listener map is untyped on purpose; the RPC layer's handlers are typed at their call sites.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.listeners[type].add(listener as SocketListener);
  }

  removeEventListener<K extends SocketEventName>(
    type: K,
    listener: (ev: WebSocketEventMap[K]) => void,
  ): void {
    // The listener map is untyped on purpose; the RPC layer's handlers are typed at their call sites.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.listeners[type].delete(listener as SocketListener);
  }

  private onPortMessage({ data }: { data: unknown }): void {
    if (this.hasClosed) return;
    if (isPapiPortCloseFrame(data)) {
      this.finish(data.code, data.reason, isCleanCloseCode(data.code));
      this.port.close();
      return;
    }
    this.listeners.message.forEach((listener) => listener({ data }));
  }

  private onPortClose(): void {
    if (this.hasClosed) return;
    this.finish(1006, PORT_CLOSED_WITHOUT_FRAME_REASON, false);
  }

  /** Record the close, detach from the port, and tell close listeners exactly once */
  private finish(code: number, reason: string, wasClean: boolean): void {
    this.hasClosed = true;
    this.readyState = 3;
    this.port.off('message', this.onPortMessage);
    this.port.off('close', this.onPortClose);
    const event = createSyntheticCloseEvent(this, code, reason, wasClean);
    this.listeners.close.forEach((listener) => listener(event));
  }
}

export default MessagePortServerSocket;
