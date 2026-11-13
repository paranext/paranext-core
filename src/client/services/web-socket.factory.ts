/**
 * Creates the socket a client process uses to reach main: in the extension host, a WebSocket from
 * the node ws library; in the renderer, a MessagePort-backed socket when running in Electron, and
 * the browser WebSocket elsewhere.
 */

import { isRenderer } from '@shared/utils/internal-util';
import type { PapiPortBridge } from '@shared/data/papi-port.model';
import { IWebSocket } from './web-socket.interface';
import { markLocalConnectionIdentified, takeLaunchCredentials } from './launch-credentials';

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
      // Main serves every port its broker hands out as a renderer
      markLocalConnectionIdentified('renderer');
      return new MessagePortWebSocket(createElectronPapiPortProvider());
    }
    const Ws = (await import('@renderer/services/renderer-web-socket.service')).default;
    return new Ws(url);
  }
  const { default: Ws, createIdentifiedWebSocket } = await import(
    '@extension-host/services/extension-host-web-socket.model'
  );
  const credentials = takeLaunchCredentials();
  const socket = credentials ? createIdentifiedWebSocket(url, credentials) : new Ws(url);
  // Assert the return type. Note: this web socket is missing the `dispatchEvent` property that the
  // renderer type has.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return socket as unknown as IWebSocket;
};
