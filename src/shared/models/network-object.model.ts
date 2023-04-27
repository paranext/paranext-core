import { Container } from '@shared/utils/util';
import { Dispose, OnDidDispose, CannotHaveOnDidDispose } from './disposal.model';

/**
 * An object of this type is returned from {@link networkObjectService.get}.
 *
 * @see networkObjectService
 */
export type NetworkObject<T> = T & OnDidDispose;

/**
 * An object of this type is returned from {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type DisposableNetworkObject<T> = T & OnDidDispose & Dispose;

/**
 * An object of this type is passed into {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type NetworkableObject<T = object> = CannotHaveOnDidDispose<T>;

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
  networkObjectContainer: Container<NetworkObject<T>>,
) => Partial<NetworkableObject<T>>;
