import { NetworkObjectDetails } from '@shared/models/network-object.model';
// Linked in TSDoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isSubset } from 'platform-bible-utils';

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
/** JSDOC DESTINATION networkObjectStatusService */
export interface NetworkObjectStatusServiceType extends NetworkObjectStatusRemoteServiceType {
  /**
   * Get a promise that resolves when a network object is registered or rejects if a timeout is hit
   *
   * @param objectDetailsToMatch Subset of object details on the network object to wait for.
   *   Compared to object details using {@link isSubset}
   * @param timeoutInMS Max duration to wait for the network object. If not provided, it will wait
   *   indefinitely
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
