// Functions that are exposed through the network object
export interface NetworkObjectStatusRemoteServiceType {
  /**
   * Get all available network objects and their available functions
   *
   * @returns Object whose keys are the names of the network objects and whose values are the
   *   functions available for each network object
   */
  getAllNetworkObjects: () => Promise<Record<string, string[]>>;
}

// Functions that are added in the service client on top of what is provided by the network object
/** Provides functions related to the set of available network objects */
export interface NetworkObjectStatusServiceType extends NetworkObjectStatusRemoteServiceType {
  /**
   * Get a promise that resolves when a network object is registered or rejects if a timeout is hit
   *
   * @returns Promise that either resolves to the list of available functions on a network object
   *   once the network object is registered, or rejects if a timeout is provided and the timeout is
   *   reached before the network object is registered
   */
  waitForNetworkObject: (id: string, timeoutInMS?: number) => Promise<string[]>;
}

export const networkObjectStatusServiceNetworkObjectName = 'NetworkObjectStatusService';
