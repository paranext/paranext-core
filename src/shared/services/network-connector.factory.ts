/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or
 * renderer
 */

import { isClient } from '@shared/utils/internal-util';
import INetworkProtocolHandler from '@shared/services/network-protocol-handler.interface';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 *
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createProtocolHandler = async (): Promise<INetworkProtocolHandler> => {
  if (isClient()) {
    const ClientProtocolHandler = (
      await import('@client/services/client-websocket-protocol-handler')
    ).default;
    return new ClientProtocolHandler();
  }
  const ServerProtocolHandler = (await import('@main/services/server-websocket-listener')).default;
  return new ServerProtocolHandler();
};
