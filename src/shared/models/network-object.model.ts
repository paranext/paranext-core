// This is used in @see comments in the JSDoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type networkObjectService from '@shared/services/network-object.service';
import {
  Dispose,
  OnDidDispose,
  CannotHaveOnDidDispose,
  CanHaveOnDidDispose,
} from 'platform-bible-utils';

/**
 * An object of this type is returned from {@link networkObjectService.get}.
 *
 * Override the NetworkableObject type's force-undefined onDidDispose to NetworkObject's
 * onDidDispose type because it will have an onDidDispose added.
 *
 * If an object of type T had `dispose` on it, `networkObjectService.get` will remove the ability to
 * call that method. This is because we don't want users of network objects to dispose of them. Only
 * the caller of `networkObjectService.set` should be able to dispose of the network object.
 *
 * @see networkObjectService
 */
export type NetworkObject<T extends NetworkableObject> = Omit<CanHaveOnDidDispose<T>, 'dispose'> &
  OnDidDispose;

/**
 * An object of this type is returned from {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type DisposableNetworkObject<T extends NetworkableObject> = NetworkObject<T> & Dispose;

/**
 * An object of this type is passed into {@link networkObjectService.set}.
 *
 * @see networkObjectService
 */
export type NetworkableObject<T = object> = T & CannotHaveOnDidDispose;

/**
 * If a network object with the provided ID exists remotely but has not been set up to use inside
 * this process, this function is run in {@link networkObjectService.get}, and the returned object is
 * used as a base on which to set up a NetworkObject for use on this process. All properties that
 * are exposed in the base object will be used as-is, and all other properties will be assumed to
 * exist on the remote network object.
 *
 * @param id ID of the network object to get
 * @param networkObjectContainer Holds a reference to the NetworkObject that will be setup within
 *   {@link networkObjectService.get}. It is passed in to allow the return value to call functions on
 *   the NetworkObject. NOTE: networkObjectContainer.contents does not point to a real NetworkObject
 *   while this function is running. The real reference is assigned later, but before the
 *   NetworkObject will be used. The return value should always reference the NetworkObject as
 *   `networkObjectContainer.contents` to avoid acting upon an undefined NetworkObject.
 * @returns The local object to proxy into a network object.
 *
 *   Note: This function should return Partial<T>. For some reason, TypeScript can't infer the type
 *   (probably has to do with that it's a wrapped and layered type). Functions that implement this
 *   type should return Partial<T>
 * @see networkObjectService
 */
export type LocalObjectToProxyCreator<T extends NetworkableObject> = (
  id: string,
  networkObjectPromise: Promise<NetworkObject<T>>,
) => // TODO: This should be Partial<T> but TypeScript can't infer the type of T. Figure this out.
// For example, in dataProviderService.get, it uses createLocalDataProviderToProxy (which does
// return Partial<T> and matches signature with this function), but it was producing a type error
// because its Partial<T> is different than this signature's Partial<T> even though T is generic
// and extends NetworkableObject in both cases.
Partial<NetworkableObject>;

/**
 * Data about an object shared on the network
 *
 * @param id ID of the network object that processes use to reference it
 * @param functionNames Array of strings with the function names exposed on this network object
 */
export type NetworkObjectDetails = {
  id: string;
  functionNames: string[];
};
