// IMPORTANT: THIS CODE HAS NOT BEEN TESTED. MAKE SURE TO EXERCISE CAUTION WHEN USING IT UNTIL IT GETS SOME REAL USAGE.
// Once tested, this code should probably be added to src/extension-host/services/papi-backend.service.ts as PapiNodeWebSocket.
// This is the equivalent of PapiRendererWebSocket but for the extension host process instead of the renderer process.

import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { ClientRequest, ClientRequestArgs, IncomingMessage } from 'http';
import {
  ClientOptions,
  CloseEvent as WebSocketCloseEvent,
  ErrorEvent as WebSocketErrorEvent,
  Event as WebSocketEvent,
  EventListenerOptions,
  MessageEvent as WebSocketMessageEvent,
  RawData,
  WebSocket,
  WebSocketEventMap,
} from 'ws';

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

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/lines-between-class-members, @typescript-eslint/no-unused-vars, @typescript-eslint/class-methods-use-this, no-dupe-class-members */
// Copied from ws types
type BufferLike =
  | string
  | Buffer
  | DataView
  | number
  | ArrayBufferView
  | Uint8Array
  | ArrayBuffer
  | SharedArrayBuffer
  | readonly any[]
  | readonly number[]
  | { valueOf(): ArrayBuffer }
  | { valueOf(): SharedArrayBuffer }
  | { valueOf(): Uint8Array }
  | { valueOf(): readonly number[] }
  | { valueOf(): string }
  | { [Symbol.toPrimitive](hint: string): string };

function notImplementedErrorMessage(methodName: string): string {
  return `Method "${methodName}" is not implemented in PapiNodeWebSocket. This likely means you are using the WebSocket API in an unsupported way.`;
}

/**
 * JSDOC SOURCE PapiNodeWebSocket This wraps Node's WebSocket implementation to provide better
 * control over internet access. It is isomorphic with the Node WebSocket, so it should act as a
 * drop-in replacement.
 *
 * Note that the browser WebSocket implementation is different and not wrapped here.
 */
export class PapiNodeWebSocket implements WebSocket {
  readonly CONNECTING!: 0;
  readonly OPEN!: 1;
  readonly CLOSING!: 2;
  readonly CLOSED!: 3;

  addEventListener!: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: (event: WebSocketEventMap[K]) => void,
    options?: EventListenerOptions,
  ) => void;
  binaryType!: 'nodebuffer' | 'arraybuffer' | 'fragments';
  bufferedAmount!: number;
  close!: (code?: number, data?: string | Buffer) => void;
  emit!: (eventName: string | symbol, ...args: unknown[]) => boolean;
  eventNames!: () => Array<string | symbol>;
  extensions!: string;
  getMaxListeners!: () => number;
  isPaused!: boolean;
  listenerCount!: (
    eventName: string | symbol,
    listener?: (event: unknown, data: unknown) => void,
  ) => number;
  listeners!: (eventName: string) => Array<Function>;
  onclose!: ((event: WebSocketCloseEvent) => void) | null;
  onerror!: ((event: WebSocketErrorEvent) => void) | null;
  onmessage!: ((event: WebSocketMessageEvent) => void) | null;
  onopen!: ((event: WebSocketEvent) => void) | null;
  pause!: () => void;
  ping!: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
  pong!: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
  prependListener!: (
    eventName: string | symbol,
    listener: (event: unknown, data: unknown) => void,
  ) => this;
  prependOnceListener!: (
    eventName: string | symbol,
    listener: (event: unknown, data: unknown) => void,
  ) => this;
  protocol!: string;
  rawListeners!: (eventName: string) => Array<Function>;
  readonly readyState!:
    | typeof WebSocket.CONNECTING
    | typeof WebSocket.OPEN
    | typeof WebSocket.CLOSING
    | typeof WebSocket.CLOSED;
  removeAllListeners!: (eventName?: string | symbol) => this;
  removeEventListener!: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: (event: WebSocketEventMap[K]) => void,
  ) => void;
  resume!: () => void;
  setMaxListeners!: (n: number) => this;
  terminate!: () => void;
  url!: string;

  constructor(
    address: string | URL | null,
    protocols?: string | string[],
    options?: ClientOptions | ClientRequestArgs,
  ) {
    // TODO: Hook into something that checks for whether the platform is in offline mode

    // Don't allow extensions to connect back into the network using raw web sockets
    // eslint-disable-next-line no-null/no-null
    if (address && address !== null && isPotentialConnectionToPapiNetwork(address))
      throw new Error(`Invalid URL: ${address}`);

    // null required by the WebSocket constructor
    // eslint-disable-next-line no-null/no-null, no-constructor-return
    if (address === null) return new WebSocket(null);

    const retVal = new WebSocket(address, protocols, options);
    retVal.on('redirect', (url: string) => {
      if (isPotentialConnectionToPapiNetwork(url)) {
        logger.error(`Websocket redirected to invalid URL: ${url}`);
        retVal.close();
      }
    });

    // Return a real object for now.
    // If we ever need something better we could use a Proxy or just hold an inner object.
    // eslint-disable-next-line no-constructor-return
    return retVal;
  }

  // Overloaded functions

  send(data: BufferLike, cb?: (err?: Error) => void): void;
  send(
    data: BufferLike,
    options: {
      mask?: boolean | undefined;
      binary?: boolean | undefined;
      compress?: boolean | undefined;
      fin?: boolean | undefined;
    },
    cb?: (err?: Error) => void,
  ): void;
  send(): void {
    throw new Error(notImplementedErrorMessage('send'));
  }

  // Overloaded events

  addListener(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  addListener(event: 'error', listener: (error: Error) => void): this;
  addListener(event: 'upgrade', listener: (request: IncomingMessage) => void): this;
  addListener(event: 'message', listener: (data: RawData, isBinary: boolean) => void): this;
  addListener(event: 'open', listener: () => void): this;
  addListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  addListener(event: 'redirect', listener: (url: string, request: ClientRequest) => void): this;
  addListener(
    event: 'unexpected-response',
    listener: (request: ClientRequest, response: IncomingMessage) => void,
  ): this;
  addListener(_event: string | symbol, _listener: (...args: any[]) => void): this {
    throw new Error(notImplementedErrorMessage('addListener'));
  }

  off(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  off(event: 'error', listener: (this: WebSocket, error: Error) => void): this;
  off(event: 'upgrade', listener: (this: WebSocket, request: IncomingMessage) => void): this;
  off(
    event: 'message',
    listener: (this: WebSocket, data: RawData, isBinary: boolean) => void,
  ): this;
  off(event: 'open', listener: (this: WebSocket) => void): this;
  off(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  off(
    event: 'redirect',
    listener: (this: WebSocket, url: string, request: ClientRequest) => void,
  ): this;
  off(
    event: 'unexpected-response',
    listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
  ): this;
  off(_event: string | symbol, _listener: (this: WebSocket, ...args: any[]) => void): this {
    throw new Error(notImplementedErrorMessage('off'));
  }

  on(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  on(event: 'error', listener: (this: WebSocket, error: Error) => void): this;
  on(event: 'upgrade', listener: (this: WebSocket, request: IncomingMessage) => void): this;
  on(event: 'message', listener: (this: WebSocket, data: RawData, isBinary: boolean) => void): this;
  on(event: 'open', listener: (this: WebSocket) => void): this;
  on(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  on(
    event: 'redirect',
    listener: (this: WebSocket, url: string, request: ClientRequest) => void,
  ): this;
  on(
    event: 'unexpected-response',
    listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
  ): this;
  on(_event: string | symbol, _listener: (this: WebSocket, ...args: any[]) => void): this {
    throw new Error(notImplementedErrorMessage('on'));
  }

  once(event: 'close', listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  once(event: 'error', listener: (this: WebSocket, error: Error) => void): this;
  once(event: 'upgrade', listener: (this: WebSocket, request: IncomingMessage) => void): this;
  once(
    event: 'message',
    listener: (this: WebSocket, data: RawData, isBinary: boolean) => void,
  ): this;
  once(event: 'open', listener: (this: WebSocket) => void): this;
  once(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  once(
    event: 'redirect',
    listener: (this: WebSocket, url: string, request: ClientRequest) => void,
  ): this;
  once(
    event: 'unexpected-response',
    listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
  ): this;
  once(_event: string | symbol, _listener: (this: WebSocket, ...args: any[]) => void): this {
    throw new Error(notImplementedErrorMessage('once'));
  }

  removeListener(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  removeListener(event: 'error', listener: (error: Error) => void): this;
  removeListener(event: 'upgrade', listener: (request: IncomingMessage) => void): this;
  removeListener(event: 'message', listener: (data: RawData, isBinary: boolean) => void): this;
  removeListener(event: 'open', listener: () => void): this;
  removeListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  removeListener(event: 'redirect', listener: (url: string, request: ClientRequest) => void): this;
  removeListener(
    event: 'unexpected-response',
    listener: (request: ClientRequest, response: IncomingMessage) => void,
  ): this;
  removeListener(_event: string | symbol, _listener: (...args: any[]) => void): this {
    throw new Error(notImplementedErrorMessage('removeListener'));
  }
}

export default PapiNodeWebSocket;
