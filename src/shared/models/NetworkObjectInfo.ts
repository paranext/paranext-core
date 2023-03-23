import { PEvent } from '@shared/models/PEvent';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Object that is able to be shared on the network.
 * Shared functions must be called asynchronously on other processes whether
 * or not they are asynchronous, so it is best to make them all asynchronous.
 * All shared functions' arguments and returns must be serializable in order
 * to be called across processes.
 */
export type NetworkableObject = Record<
  string,
  // Need to be able to have any args because the only thing we can control here is the return being async
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any) => Promise<unknown>
>;

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
export type DisposableNetworkObjectInfo<T extends NetworkableObject> = NetworkObjectInfo<T> & {
  /** Unsubscriber to call to remove this object from the network */
  dispose: UnsubscriberAsync;
};
