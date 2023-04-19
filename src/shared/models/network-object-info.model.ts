import { PapiEvent } from '@shared/models/papi-event.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';
import { IContainer } from '@shared/utils/util';

/**
 * An object of this type is returned from NetworkObjectService.get.
 */
export type NetworkObject<T> = T & {
  /** Event that emits when this network object is being disposed */
  onDidDispose: PapiEvent<void>;
};

/**
 * An object of this type is returned from NetworkObjectService.set.
 * Only the process that set the object should call dispose.
 */
export type DisposableNetworkObject<T> = NetworkObject<T> & {
  /** Call this when the network object should be disposed */
  dispose: UnsubscriberAsync;
};

/**
 * An object of this type is passed into NetworkObjectService.set. Its properties related to
 * disposal will be changed.
 *
 * Functions that are shared by this object must be called asynchronously on other processes
 * whether or not they are asynchronous, so it is best to make them all asynchronous. All shared
 * functions' arguments and returns must be serializable in order to be called across processes.
 */
export type NetworkableObject<T> = Partial<DisposableNetworkObject<T>> & {
  onDidDispose: never;
};

/**
 * If a network object with the provided ID exists remotely but has not been set up to be used on
 * this process, this function is run in NetworkObjectService.get, and the returned object is used
 * as a base on which to set up a NetworkObject for use on this process. All properties that are
 * exposed in the base object will be used as-is, and all other properties will be assumed to exist
 * on the remote network object.
 *
 * @param id ID of the network object to get
 *
 * @param baseObject The object that will be proxied within NetworkObjectService.get.
 * Passed in to allow the local object to call network object methods.

* @returns the local object to proxy into a network object.
 */
export type LocalObjectToProxyCreator<T> = (
  id: string,
  baseObject: IContainer<T>,
) => Record<string, unknown>;
