/**
 * Presents a Node `MessagePort` with the surface of Electron's `MessagePortMain`, so suites can
 * exercise the main-side port adapter against a real channel. The two differ in one place: Node's
 * `message` listener receives the value, Electron's receives `{ data, ports }`.
 */

import type { MessagePort as NodeMessagePort } from 'node:worker_threads';
import type { MessagePortMainLike } from '@main/services/message-port-server-socket';

type MessageListener = (messageEvent: { data: unknown }) => void;
type CloseListener = () => void;

export function wrapNodePortAsMessagePortMain(port: NodeMessagePort): MessagePortMainLike {
  const wrappedByListener = new Map<(...args: never[]) => void, (value: unknown) => void>();
  return {
    on(event: 'message' | 'close', listener: (...args: never[]) => void) {
      if (event === 'message') {
        // One implementation serves both overloads; the event name says which listener shape it is
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const wrapped = (value: unknown) => (listener as MessageListener)({ data: value });
        wrappedByListener.set(listener, wrapped);
        port.on('message', wrapped);
      } else {
        // One implementation serves both overloads; the event name says which listener shape it is
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        port.on('close', listener as CloseListener);
      }
      return this;
    },
    off(event: 'message' | 'close', listener: (...args: never[]) => void) {
      if (event === 'message') {
        const wrapped = wrappedByListener.get(listener);
        if (wrapped) port.off('message', wrapped);
        wrappedByListener.delete(listener);
      } else {
        // One implementation serves both overloads; the event name says which listener shape it is
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        port.off('close', listener as CloseListener);
      }
      return this;
    },
    postMessage: (message: unknown) => port.postMessage(message),
    start: () => port.start(),
    close: () => port.close(),
  };
}
