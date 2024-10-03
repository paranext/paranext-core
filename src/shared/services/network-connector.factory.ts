/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or
 * renderer
 */

import { isClient } from '@shared/utils/internal-util';
import INetworkConnector from '@shared/services/network-connector.interface';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 *
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createNetworkConnector = async (): Promise<INetworkConnector> => {
  if (isClient()) {
    const ClientNetworkConnector = (
      await import('@client/services/client-network-connector.service')
    ).default;
    return new ClientNetworkConnector();
  }
  const ServerNetworkConnector = (await import('@main/services/server-network-connector.service'))
    .default;
  return new ServerNetworkConnector();
};
