import { PEvent } from '@shared/models/PEvent';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Object that is able to be shared on the network.
 * Shared functions must be called asynchronously on other processes whether
 * or not they are asynchronous, so it is best to make them all asynchronous.
 * All shared functions' arguments and returns must be serializable in order
 * to be called across processes.
 */
// Took the indexing off of NetworkableObject so normal objects could be used,
// but now members can't be accessed by indexing in NetworkObjectService
// TODO: fix it so it is indexable but can have specific members
export type NetworkableObject = {};

/**
 * Information about an object shared on the network.
 * Returned from getting a network object.
 */
export type NetworkObjectInfo<T extends NetworkableObject> = {
  /** Object that is shared on the network */
  networkObject: T;
  /** Event that emits when this network object is being disposed */
  onDidDispose: PEvent<void>;
};

/**
 * Information about an object shared on the network including control over disposing of the object.
 * Returned from setting up a network object (only the process that set up the network object should dispose of it)
 */
export type DisposableNetworkObjectInfo<T extends NetworkableObject> =
  NetworkObjectInfo<T> & {
    /** Unsubscriber to call to remove this object from the network */
    dispose: UnsubscriberAsync;
  };

/**
 * Holds a reference to the final proxied network object that is created (yes, this is self-referencing).
 * Passed into createLocalObjectToProxy on NetworkObjectService.get to allow the local object to call network object methods.
 * Note: networkObjectContainer.networkObject is undefined on first running createLocalObjectToProxy and is populated after createLocalObjectToProxy is run,
 * so please use networkObjectContainer.networkObject to reference the network object inside createLocalObjectToProxy and do not destructure it in order to preserve the reference.
 */
export type NetworkObjectContainer<T> = { networkObject: T | undefined };

/**
 * If a network object with the provided id exists remotely but has not been set up
 * to be used on this process, this function is run in NetworkObjectService.get, and the returned object is used as a base on which to set up a
 * NetworkObject for use on this process. This is useful for setting up network events on a network object.
 *
 * @param id id of the network object to get
 *
 * @param networkObjectContainer holds a reference to the final proxied network object that is created (yes, this is self-referencing).
 * Passed in to allow the local object to call network object methods.
 * Note: networkObjectContainer.networkObject is undefined on running createLocalObjectToProxy and is populated after createLocalObjectToProxy is run,
 * so please use networkObjectContainer.networkObject to reference the network object and do not destructure it in order to preserve the reference.

 * @returns the local object to proxy into a network object.
 */
export type LocalObjectToProxyCreator<T extends NetworkableObject> = (
  id: string,
  networkObjectContainer: NetworkObjectContainer<T>,
) => Record<string, unknown>;
