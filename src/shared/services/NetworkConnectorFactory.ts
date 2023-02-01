/**
 * Creates a ServerNetworkConnector or a ClientNetworkConnector depending on if we're in main or renderer
 */

import { isClient } from '@shared/util/InternalUtil';
import INetworkConnector from '@shared/services/INetworkConnector';
import ClientNetworkConnector from '@shared/services/ClientNetworkConnector';
import ServerNetworkConnector from '@shared/services/ServerNetworkConnector';

/**
 * Creates a NetworkConnector for the client or the server depending on where you're running
 * @returns NetworkConnector
 */
// eslint-disable-next-line import/prefer-default-export
export const createNetworkConnector = (): INetworkConnector => {
  if (isClient()) return new ClientNetworkConnector();
  return new ServerNetworkConnector();
};
