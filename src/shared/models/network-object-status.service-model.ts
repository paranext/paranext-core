import { NetworkObjectDetails } from '@shared/models/network-object.model';

// Functions that are exposed through the network object
export interface NetworkObjectStatusRemoteServiceType {
  /**
   * Get details about all available network objects
   *
   * @returns Object whose keys are the names of the network objects and whose values are the
   *   {@link NetworkObjectDetails} for each network object
   */
  getAllNetworkObjectDetails: () => Promise<Record<string, NetworkObjectDetails>>;
}

// Functions that are added in the service client on top of what is provided by the network object
/** Provides functions related to the set of available network objects */
export interface NetworkObjectStatusServiceType extends NetworkObjectStatusRemoteServiceType {
  /**
   * Get a promise that resolves when a network object is registered or rejects if a timeout is hit
   *
   * @returns Promise that either resolves to the {@link NetworkObjectDetails} for a network object
   *   once the network object is registered, or rejects if a timeout is provided and the timeout is
   *   reached before the network object is registered
   */
  waitForNetworkObject: (
    objectDetailsToMatch: Partial<NetworkObjectDetails>,
    timeoutInMS?: number,
  ) => Promise<NetworkObjectDetails>;
}

export const networkObjectStatusServiceNetworkObjectName = 'NetworkObjectStatusService';
