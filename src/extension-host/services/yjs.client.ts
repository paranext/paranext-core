import ws from 'ws';
import { WebsocketProvider } from 'y-websocket';
import { newDocCreatedEvent } from './local-yjs.util';

type WsPolyfill = {
  prototype: WebSocket;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
  new (url: string | URL, protocols?: string | string[] | undefined): WebSocket;
};

const YJS_SERVER_URL = 'ws://localhost:8888';

const wsDocMap = new Map<string, WebsocketProvider>();

export default function initialize() {
  newDocCreatedEvent((namedYjsDoc) => {
    wsDocMap.set(
      namedYjsDoc.id,
      new WebsocketProvider(YJS_SERVER_URL, namedYjsDoc.id, namedYjsDoc.doc, {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        WebSocketPolyfill: ws as unknown as WsPolyfill,
      }),
    );
  });
}
