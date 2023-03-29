/**
 * Handles registering and serving objects over the papi.
 * Not sure if this should be exposed on papi.
 * Might layer over it to prevent name collisions?
 */

import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  serializeRequestType,
  UnsubscriberAsync,
} from '@shared/utils/papi-util';
import PEventEmitter from '@shared/models/PEventEmitter';
import { isString } from '@shared/utils/util';
import {
  DisposableNetworkObjectInfo,
  NetworkableObject,
  NetworkObjectInfo,
} from '@shared/models/NetworkObjectInfo';

/** Prefix on requests that indicates that the request is related to a network object */
const CATEGORY_NETWORK_OBJECT = 'object';

enum NetworkObjectRegistrationType {
  Local = 'local',
  Remote = 'remote',
}

/** Information about the network object and how to use it in this service */
type NetworkObjectRegistration<T extends NetworkableObject> = {
  /** The actual network object stuff returned by get */
  networkObjectInfo: NetworkObjectInfo<T>;
  /** Emitter that indicates locally when the network object was disposed. Run when the network disposal emitter runs for this registration's id */
  onDidDisposeEmitter: PEventEmitter<void>;
} & (
  | {
      registrationType: NetworkObjectRegistrationType.Local;
    }
  | {
      registrationType: NetworkObjectRegistrationType.Remote;
      /** Function to make the proxy stop working. Should be run on disposing this network object */
      revokeProxy: () => void;
    }
);

/** Map of id to network object */
const networkObjectRegistrations = new Map<string, NetworkObjectRegistration<NetworkableObject>>();

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/**
 * Emitter for when a network object is disposed. Provides the id so that the local emitter specific to that object can be run.
 *
 * Only run on local network object registration! Processes should only dispose their own network objects
 */
const onDidDisposeNetworkObjectEmitter = networkService.createNetworkEventEmitter<string>(
  'object:onDidDisposeNetworkObject',
);
/** Event that emits with network object id when that object is disposed */
const onDidDisposeNetworkObject = onDidDisposeNetworkObjectEmitter.event;

// Dispose of local and remote network objects when we receive events telling us to do so
onDidDisposeNetworkObject((id: string) => {
  const networkObjectRegistration = networkObjectRegistrations.get(id);

  if (networkObjectRegistration) {
    // Alert users of this specific network object that it was disposed
    networkObjectRegistration.onDidDisposeEmitter.emit();

    // Dispose of the network object registration itself
    networkObjectRegistration.onDidDisposeEmitter.dispose();
    if (networkObjectRegistration.registrationType === NetworkObjectRegistrationType.Remote)
      networkObjectRegistration.revokeProxy();
  }
});

/** Sets up the service. Only runs once and always returns the same promise after that */
const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // TODO: Might be best to make a singleton or something
    await networkService.initialize();

    isInitialized = true;
  })();

  return initializePromise;
};

/** Each type of request that can be executed for each network object */
enum NetworkObjectRequestSubtype {
  /** get(): string[] of functions that are eligible to be run over the network */
  Get = 'get',
  /** function(functionName: string, ...args: unknown[]): unknown - runs a function */
  Function = 'function',
}

/** Builds a request type for network requests for the specified network object id and request subtype */
const buildNetworkObjectRequestType = (id: string, subtype: NetworkObjectRequestSubtype) =>
  serializeRequestType(CATEGORY_NETWORK_OBJECT, `${id}.${subtype}`);

/**
 * Determine if a network object with the specified id exists remotely (does not check locally)
 * @param id id of the network object - all processes must use this id to look up this network object
 * @returns empty array if there is a remote network object with this id, undefined otherwise.
 * TODO: return array of all eligible functions
 */
const getRemoteNetworkObjectFunctions = async (id: string): Promise<string[] | undefined> => {
  try {
    return await networkService.request<[], string[]>(
      buildNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Get),
    );
  } catch (e) {
    // No processes are registered to handle this get request, meaning a network object with this id does not exist
    return undefined;
  }
};

/** Determine whether or not a network object with the provided id exists anywhere on the network */
const has = async (id: string): Promise<boolean> => {
  await initialize();

  // Check if we already have this network object
  if (networkObjectRegistrations.has(id)) return true;

  // We don't already have this network object. See if other processes have this network object
  // If we get truthy from the request for network object functions, we do have that id
  // TODO: Mark this network object id as available but the object not yet generated so we don't have to run get multiple times
  return !!(await getRemoteNetworkObjectFunctions(id));
};

/**
 * Set up a NetworkableObject as a NetworkObject to be shared on the network.
 * @param id id of the network object - all processes must use this id to look up this network object
 * @param networkObject the object to set up as a network object. This object must conform to the constraints for a NetworkableObject
 * @returns information about an object shared on the network including control over disposing of the object
 */
const set = async <T extends NetworkableObject>(
  id: string,
  networkObject: T,
): Promise<DisposableNetworkObjectInfo<T>> => {
  await initialize();
  if (await has(id)) throw new Error(`Network object with id ${id} is already registered`);

  const networkObjectOnDidDisposeEmitter = new PEventEmitter<void>();

  // Set up request handlers for this network object
  const unsubPromises = [
    networkService.registerRequestHandler(
      buildNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Get),
      () =>
        Promise.resolve([
          // TODO: send the eligible functions over so we can reject function calls locally instead of asking the owning process if the function exists
        ]),
    ),
    networkService.registerRequestHandler(
      buildNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Function),
      (functionName: string, ...args: unknown[]) =>
        Promise.resolve(networkObject[functionName](...args)),
    ),
  ];
  await Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise));

  const dispose: UnsubscriberAsync = async () => {
    // Unsubscribe all requests for this network object
    if (
      !(await aggregateUnsubscriberAsyncs(
        unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
      )())
    )
      // Failed to unsubscribe all requests
      return false;

    // Send an event notifying everyone that this network object is no longer available
    // The event listener removes the network object from the registration map
    onDidDisposeNetworkObjectEmitter.emit(id);
    return true;
  };

  const networkObjectInfo: NetworkObjectInfo<T> = {
    networkObject,
    onDidDispose: networkObjectOnDidDisposeEmitter.event,
  };

  // Set the network object locally
  networkObjectRegistrations.set(id, {
    registrationType: NetworkObjectRegistrationType.Local,
    networkObjectInfo,
    onDidDisposeEmitter: networkObjectOnDidDisposeEmitter,
  });

  // Return the dispose method to the place that set up this network object. Not given out or used anywhere else
  return { dispose, ...networkObjectInfo };
};

/**
 * Get a NetworkObject that has previously been set up to be shared on the network.
 * @param id id of the network object - all processes must use this id to look up this network object
 * @param createLocalObjectToProxy if a network object with the provided id exists remotely but has not been set up
 * to be used on this process, this function is run, and the returned object is used as a base on which to set up a
 * NetworkObject for use on this process. This is useful for setting up network events on a network object.
 * @returns information about the object shared on the network with specified id if one exists, undefined otherwise.
 */
const get = async <T extends NetworkableObject>(
  id: string,
  createLocalObjectToProxy?: (id: string) => Record<string, unknown>,
): Promise<NetworkObjectInfo<T> | undefined> => {
  await initialize();

  // If we already have this network object, return it
  const networkObjectRegistration = networkObjectRegistrations.get(id);
  if (networkObjectRegistration)
    return networkObjectRegistration.networkObjectInfo as NetworkObjectInfo<T>;

  // We don't already have this network object. See if other process have it
  const networkObjectFunctions = await getRemoteNetworkObjectFunctions(id);

  // This network object does not exist
  if (!networkObjectFunctions) return undefined;

  // This object exists remotely but does not yet exist locally. Set up its local proxy so its functions send requests to the remote object

  // Create an individual emitter that indicates when this object is disposed.
  // Called by the event handler that handles general network object disposal
  const networkObjectOnDidDisposeEmitter = new PEventEmitter<void>();

  // Create the local object to be proxied
  const localObject = createLocalObjectToProxy ? createLocalObjectToProxy(id) : {};

  // Create a proxy that, for all unknown properties (function calls that the local object creator didn't set),
  // returns a function that sends a request to the remote network object
  // TODO: use returned networkObjectFunctions to limit the functions available instead of sending a request for anything
  const {
    // The full 'remote' network object which accesses local properties and sends requests for remote functions
    proxy: remoteObject,
    // Function to revoke the proxy aka make the proxy stop working. Should use on disposing the network object
    revoke: revokeProxy,
  } = Proxy.revocable(localObject, {
    get(obj, prop) {
      // If the local network object has the property, return it
      if (prop === 'then' || prop in obj) return obj[prop as keyof typeof obj];

      // If the prop requested is a symbol, that doesn't work over the network. Reject
      if (!isString(prop)) return null;

      // If the local network object doesn't have the property, build a request for it
      const requestFunction = (...args: unknown[]) =>
        networkService.request(
          buildNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Function),
          prop, // Name of function to run
          ...args, // Arguments to put into the function
        );

      // Save the new request function as the actual function on the object so we don't have to create this function multiple times
      // TODO: Try making a separate array of lazy loaded request functions instead of putting them on the object and thereby reducing the usefulness of revokeProxy
      (obj as NetworkableObject)[prop] = requestFunction;
      return requestFunction;
    },
  });

  const networkObjectInfo: NetworkObjectInfo<T> = {
    networkObject: remoteObject as T,
    onDidDispose: networkObjectOnDidDisposeEmitter.event,
  };

  // Save the network object locally
  networkObjectRegistrations.set(id, {
    registrationType: NetworkObjectRegistrationType.Remote,
    networkObjectInfo,
    onDidDisposeEmitter: networkObjectOnDidDisposeEmitter,
    revokeProxy,
  });

  return networkObjectInfo;
};

const networkObjectService = {
  initialize,
  get,
  set,
  has,
};

export default networkObjectService;
