/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or renderer
 */

import { isClient } from '@shared/util/InternalUtil';
import INetworkConnector from '@shared/services/INetworkConnector';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createNetworkConnector = async (): Promise<INetworkConnector> => {
  if (isClient()) {
    const ClientNetworkConnector = (
      await import('@client/services/ClientNetworkConnector')
    ).default;
    return new ClientNetworkConnector();
  }
  const ServerNetworkConnector = (
    await import('@main/services/ServerNetworkConnector')
  ).default;
  return new ServerNetworkConnector();
};
