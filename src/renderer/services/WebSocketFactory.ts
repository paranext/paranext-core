/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or renderer
 */

import { isRenderer } from '@shared/util/InternalUtil';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createWebSocket = async (url: string): Promise<WebSocket> => {
  if (isRenderer()) {
    return new WebSocket(url);
  }
  const Ws = (await import('@extension-host/services/ExtensionHostWebSocket'))
    .default;
  return new Ws(url) as unknown as WebSocket;
};
