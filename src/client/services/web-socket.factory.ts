/**
 * Creates the socket a client process uses to reach main: in the extension host, a WebSocket from
 * the node ws library; in the renderer, a MessagePort-backed socket when running in Electron, and
 * the browser WebSocket elsewhere.
 */

import { isRenderer } from '@shared/utils/internal-util';
import type { PapiPortBridge } from '@shared/data/papi-port.model';
import { IWebSocket } from './web-socket.interface';

/** Where the preload puts its bridge; absent outside Electron */
type GlobalWithPapiBridge = typeof globalThis & {
  electronAPI?: { papi?: PapiPortBridge };
};

/**
 * Creates a WebSocket for the renderer or extension host depending on where you're running
 *
 * @returns WebSocket
 */
export const createWebSocket = async (url: string): Promise<IWebSocket> => {
  if (isRenderer()) {
    // Electron hands the page a MessagePort to main, which survives an OS suspend; a Chromium
    // WebSocket does not. A page with no bridge (a non-Electron host) keeps the WebSocket.
    const bridgedGlobal: GlobalWithPapiBridge = globalThis;
    const bridge: PapiPortBridge | undefined = bridgedGlobal.electronAPI?.papi;
    if (typeof bridge?.requestPort === 'function') {
      const [{ MessagePortWebSocket }, { createElectronPapiPortProvider }] = await Promise.all([
        import('@renderer/services/message-port-web-socket'),
        import('@renderer/services/electron-papi-port-provider'),
      ]);
      return new MessagePortWebSocket(createElectronPapiPortProvider());
    }
    const Ws = (await import('@renderer/services/renderer-web-socket.service')).default;
    return new Ws(url);
  }
  const Ws = (await import('@extension-host/services/extension-host-web-socket.model')).default;
  // Assert the return type. Note: this web socket is missing the `dispatchEvent` property that the
  // renderer type has.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return new Ws(url) as unknown as IWebSocket;
};
