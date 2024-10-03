/**
 * Creates a WebSocket from the node ws library or from the browser WebSocket depending on if we're
 * in node or browser.
 */

import { isRenderer } from '@shared/utils/internal-util';
import { IWebSocket } from './web-socket.interface';

/**
 * Creates a WebSocket for the renderer or extension host depending on where you're running
 *
 * @returns WebSocket
 */
// eslint-disable-next-line import/prefer-default-export
export const createWebSocket = async (url: string): Promise<IWebSocket> => {
  if (isRenderer()) {
    const Ws = (await import('@renderer/services/renderer-web-socket.service')).default;
    return new Ws(url);
  }
  const Ws = (await import('@extension-host/services/extension-host-web-socket.model')).default;
  // Assert the return type. Note: this web socket is missing the `dispatchEvent` property that the
  // renderer type has.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return new Ws(url) as unknown as IWebSocket;
};
