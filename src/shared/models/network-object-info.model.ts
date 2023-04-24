import { PapiEvent } from '@shared/models/papi-event.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';
import { IContainer } from '@shared/utils/util';

/**
 * An object of this type is returned from {@link networkObjectService.get}.
 *
 * @see networkObjectService
 */
export type NetworkObject<T> = T & {
  /** Event that emits when this network object is being disposed */
  onDidDispose: PapiEvent<void>;
};

/**
 * An object of this type is returned from {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type DisposableNetworkObject<T> = NetworkObject<T> & {
  /** Call this when the network object should be disposed */
  dispose: UnsubscriberAsync;
};

/**
 * An object of this type is passed into {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type NetworkableObject<T> = Partial<DisposableNetworkObject<T>> & {
  onDidDispose: never;
};

/**
 * If a network object with the provided ID exists remotely but has not been set up to use inside
 * this process, this function is run in {@link networkObjectService.get}, and the returned object is used
 * as a base on which to set up a NetworkObject for use on this process. All properties that are
 * exposed in the base object will be used as-is, and all other properties will be assumed to exist
 * on the remote network object.
 *
 * @see networkObjectService
 *
 * @param id ID of the network object to get
 *
 * @param networkObjectContainer Holds a reference to the NetworkObject that will be setup within
 * {@link networkObjectService.get}. It is passed in to allow the return value to call functions on
 * the NetworkObject.
 * NOTE: networkObjectContainer.contents does not point to a real NetworkObject while this function
 * is running. The real reference is assigned later, but before the NetworkObject will be used. The
 * return value should always reference the NetworkObject as `networkObjectContainer.contents` to
 * avoid acting upon an undefined NetworkObject.
 *
 * @returns the local object to proxy into a network object.
 */
export type LocalObjectToProxyCreator<T> = (
  id: string,
  networkObjectContainer: IContainer<T>,
) => Record<string, unknown>;
