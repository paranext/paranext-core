/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or renderer
 */

import { isClient } from '../util/InternalUtil';
import INetworkConnector from './INetworkConnector';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createNetworkConnector = async (): Promise<INetworkConnector> => {
  if (isClient()) {
    const ClientNetworkConnector = (await import('./ClientNetworkConnector'))
      .default;
    return new ClientNetworkConnector();
  }
  const ServerNetworkConnector = (await import('./ServerNetworkConnector'))
    .default;
  return new ServerNetworkConnector();
};
