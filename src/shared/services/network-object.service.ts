/**
 * Handles registering and serving objects over the papi.
 * Not sure if this should be exposed on papi.
 * Might only layer over it to prevent name collisions? See DataProviderService for example.
 */

import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  serializeRequestType,
  UnsubscriberAsync,
} from '@shared/utils/papi-util';
import { PapiEvent } from '@shared/models/papi-event.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import { IContainer, isString } from '@shared/utils/util';
import {
  NetworkObject,
  DisposableNetworkObject,
  LocalObjectToProxyCreator,
} from '@shared/models/network-object-info.model';
import { Mutex } from 'async-mutex';
import logger from './logger.service';

// #region initialize

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Sets up the service. Only runs once and always returns the same promise after that */
const initialize = (): Promise<void> => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // TODO: Might be best to make a singleton or something
    await networkService.initialize();

    isInitialized = true;
  })();

  return initializePromise;
};

// #endregion

// #region Helpers for talking to the network about objects

/** Prefix on requests that indicates that the request is related to a network object */
const CATEGORY_NETWORK_OBJECT = 'object';

/** Gets a request type for network requests for the specified network object id and request subtype */
const getNetworkObjectRequestType = (id: string, subtype: NetworkObjectRequestSubtype) =>
  serializeRequestType(CATEGORY_NETWORK_OBJECT, `${id}.${subtype}`);

/** Each type of request that can be executed for each network object */
enum NetworkObjectRequestSubtype {
  /** get(): string[] of functions that are eligible to be run over the network */
  Get = 'get',
  /** function(functionName: string, ...args: unknown[]): unknown - runs a function */
  Function = 'function',
}

/**
 * Determine if a network object with the specified id exists remotely (does not check locally)
 * @param id id of the network object - all processes must use this id to look up this network object
 * @returns empty array if there is a remote network object with this id, undefined otherwise.
 * TODO: return array of all eligible functions
 */
const getRemoteNetworkObjectFunctions = async (id: string): Promise<string[] | undefined> => {
  try {
    return await networkService.request<[], string[]>(
      getNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Get),
    );
  } catch (e) {
    // No processes are registered to handle this get request, meaning a network object with this id does not exist
    // TODO: check the message and throw the error if it is not the right message?
    return undefined;
  }
};

/** This service stores both local and remote network objects together */
enum NetworkObjectRegistrationType {
  Local = 'local',
  Remote = 'remote',
}

/** Information about the network object and how to use it in this service */
type NetworkObjectRegistration = {
  /** Local or Remote */
  registrationType: NetworkObjectRegistrationType;
  /** Proxy object shared with services that don't own the actual object - returned by "get" */
  networkObject: NetworkObject<unknown>;
  /** Emitter that indicates locally when the network object was disposed.
   *  Run when the network disposal emitter runs for this registration's ID.
   */
  onDidDisposeEmitter: PapiEventEmitter<void>;
  /** Function to make the proxy stop working. Should be run on disposing this network object. */
  revokeProxy: () => void;
};

/** Map of id to network object */
const networkObjectRegistrations = new Map<string, NetworkObjectRegistration>();

/**
 * Emitter for when a network object is disposed. Provides the id so that the local emitter specific to that object can be run.
 *
 * Only run on local network object registration! Processes should only dispose their own network objects
 */
const onDidDisposeNetworkObjectEmitter = networkService.createNetworkEventEmitter<string>(
  serializeRequestType(CATEGORY_NETWORK_OBJECT, 'onDidDisposeNetworkObject'),
);

/** Event that fires with a network object id when that object is disposed locally or remotely */
const onDidDisposeNetworkObject = onDidDisposeNetworkObjectEmitter.event;

/** Runs to dispose of local and remote network objects when we receive events telling us to do so */
onDidDisposeNetworkObject((id: string) => {
  const networkObjectRegistration = networkObjectRegistrations.get(id);

  if (networkObjectRegistration) {
    // Alert users of this specific network object that it was disposed
    networkObjectRegistration.onDidDisposeEmitter.emit();

    // Dispose of the network object registration itself
    networkObjectRegistration.onDidDisposeEmitter.dispose();

    // Dispose of the proxy
    networkObjectRegistration.revokeProxy();
  }
});

// #endregion

// #region has

/** Determine whether or not we know locally if a network object with the provided id exists anywhere on the network */
const hasKnown = (id: string): boolean => networkObjectRegistrations.has(id);

/** Determine whether or not a network object with the provided id exists anywhere on the network */
const has = async (id: string): Promise<boolean> => {
  await initialize();

  // Check if we already have this network object
  if (hasKnown(id)) return true;

  // We don't already have this network object. See if other processes have this network object
  // If we get truthy from the request for network object functions, we do have that id
  // TODO: Mark this network object id as available but the object not yet generated so we don't have to run get multiple times
  return !!(await getRemoteNetworkObjectFunctions(id));
};

// #endregion

// #region Helpers for get and set

// We need this to protect simultaneous calls to get and/or set the same network objects
class MutexMap {
  private mutexesByID = new Map<string, Mutex>();

  get(mutexID: string): Mutex {
    let retVal = this.mutexesByID.get(mutexID);
    if (retVal) return retVal;

    retVal = new Mutex();
    this.mutexesByID.set(mutexID, retVal);
    return retVal;
  }
}

const mutexMap: MutexMap = new MutexMap();

/** Remote proxy means a proxy object referencing something on the other side of the network */
const createRemoteProxy = (
  id: string,
  base: object | undefined,
): {
  // The full 'remote' network object which accesses local properties and sends requests for remote functions
  proxy: object;
  // Function to revoke the proxy. Should use on disposing the network object.
  revoke: () => void;
} =>
  Proxy.revocable(base ?? {}, {
    get: (target, key) => {
      if (key === 'dispose') return undefined;
      // onDidDispose
      if (key === 'then' || key in target) return target[key as keyof typeof target];

      // If the prop requested is a symbol, that doesn't work over the network. Reject
      if (!isString(key)) return null;

      // If the local network object doesn't have the property, build a request for it
      const requestFunction = (...args: unknown[]) =>
        networkService.request(
          getNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Function),
          key,
          ...args,
        );

      // Save the new request function as the actual function on the object so we don't have to
      // create this function multiple times.
      // TODO: Try making a separate array of lazy loaded request functions instead of putting them
      // on the object and thereby reducing the usefulness of revokeProxy
      // Took the indexing off of NetworkableObject so normal objects could be used,
      // but now members can't be accessed by indexing in NetworkObjectService
      // TODO: fix it so it is indexable but can have specific members
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[key] = requestFunction;
      return requestFunction;
    },
  });

/** Local proxy means a proxy object in the same process used by something that didn't set the object */
const createLocalProxy = (
  objectBeingSet: object,
): {
  // Thin layer over the object being set
  proxy: object;
  // Function to revoke the proxy. Should use on disposing the network object
  revoke: () => void;
} =>
  Proxy.revocable(objectBeingSet, {
    get: (target, key) => {
      if (key === 'dispose') return undefined;
      return Reflect.get(target, key, objectBeingSet);
    },
  });

interface IOnDidDisposableObject {
  onDidDispose?: PapiEvent<void>;
}

/** Don't pass in a remote proxy object as `objectToCheck`, because that will cause it to create `onDidDispose` */
const overrideOnDidDispose = (
  objectToCheck: IOnDidDisposableObject,
  objectToMutate: IOnDidDisposableObject,
  newOnDidDispose: PapiEvent<void>,
): void => {
  if (objectToCheck.onDidDispose) {
    throw new Error(
      "You can't register an object as a network object if it already has an onDidDispose property",
    );
  }

  objectToMutate.onDidDispose = newOnDidDispose;
};

interface IDisposableObject {
  dispose?: UnsubscriberAsync;
}

/** If `dispose` already exists on `objectToMutate`, we will call it in addition to `newDispose` */
const overrideDispose = (
  objectToMutate: IDisposableObject,
  newDispose: UnsubscriberAsync,
): void => {
  if (objectToMutate.dispose) {
    const oldDispose = objectToMutate.dispose.bind(objectToMutate);

    objectToMutate.dispose = aggregateUnsubscriberAsyncs([oldDispose, newDispose]);
  } else {
    objectToMutate.dispose = newDispose;
  }
};

// #endregion

// #region get

/**
 * Get a network object that has previously been set up to be shared on the network.
 * A network object is a proxy to an object living somewhere else that local code can use.
 *
 * Running this function twice with the same inputs yields the same network object.
 * @param id id of the network object - all processes must use this id to look up this network object
 * @param base Object that the proxy will be based upon when building the return value
 * @returns A promise for the network object with specified id if one exists, undefined otherwise
 */
const get = async <T extends object>(
  id: string,
  createLocalObjectToProxy?: LocalObjectToProxyCreator<T>,
): Promise<NetworkObject<T> | undefined> => {
  await initialize();

  // Don't allow simultaneous gets and/or sets to run for the same network object
  const lock: Mutex = mutexMap.get(id);
  return lock.runExclusive(async () => {
    // If we already have this network object, return it
    const networkObjectRegistration = networkObjectRegistrations.get(id);
    if (networkObjectRegistration)
      return Promise.resolve(networkObjectRegistration.networkObject as NetworkObject<T>);

    // We don't already have this network object. See if it exists somewhere else.
    const networkObjectFunctions = await getRemoteNetworkObjectFunctions(id);
    if (!networkObjectFunctions) return undefined;

    // At this point, the object exists remotely but does not yet exist locally.

    // The base object created below might need a reference to the final proxy. Since the proxy
    // doesn't exist yet, create a container now and fill it in after the proxy is created.
    const proxyContainer: IContainer<T> = { contents: undefined };

    // Create the base object that will be proxied for remote calls.
    // If a property exists on the base object, we use it and won't look for it on the remote object.
    // If a property does not exist on the base object, it is assumed to exist on the remote object.
    const baseObject = createLocalObjectToProxy ? createLocalObjectToProxy(id, proxyContainer) : {};

    // Create a proxy with functions that will send requests to the remote object
    const remoteProxy = createRemoteProxy(id, baseObject);

    // Store the proxy in the container so baseObject has a valid reference
    proxyContainer.contents = remoteProxy.proxy as T;

    // Setup onDidDispose so that services will know when the proxy is dead
    const eventEmitter = new PapiEventEmitter<void>();
    overrideOnDidDispose(baseObject, remoteProxy.proxy, eventEmitter.event);

    // Save the network object for future lookups
    networkObjectRegistrations.set(id, {
      registrationType: NetworkObjectRegistrationType.Remote,
      onDidDisposeEmitter: eventEmitter,
      networkObject: remoteProxy.proxy as NetworkObject<T>,
      revokeProxy: remoteProxy.revoke,
    });

    return remoteProxy.proxy as NetworkObject<T>;
  });
};

// #endregion

// #region set

/**
 * Set up an object to be shared on the network.
 * @param id ID of the object to share on the network. All processes must use this ID to look it up.
 * @param objectToShare The object to set up as a network object. Its `dispose` and `onDidDispose` properties will be written/overwritten.
 * @returns INetworkObjectDisposer wrapping the object to share
 */
const set = async <T extends object>(
  id: string,
  objectToShare: T,
): Promise<DisposableNetworkObject<T>> => {
  await initialize();

  // Don't allow simultaneous gets and/or sets to run for the same network object
  const lock: Mutex = mutexMap.get(id);
  return lock.runExclusive(async () => {
    // Check to see if we already know there is a network object with this id.
    if (hasKnown(id)) throw new Error(`Network object with id ${id} is already registered`);

    // Check if there is a network object with this id remotely by trying to register it
    const unsubPromises = [
      networkService.registerRequestHandler(
        getNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Get),
        () =>
          Promise.resolve([
            // TODO: send the eligible functions over so we can reject function calls locally
            // instead of asking the owning process if the function exists
          ]),
      ),
      networkService.registerRequestHandler(
        getNetworkObjectRequestType(id, NetworkObjectRequestSubtype.Function),
        (functionName: string, ...args: unknown[]) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Promise.resolve((objectToShare as any)[functionName](...args)),
      ),
    ];

    // Await all of the registrations finishing, successful or not
    const registrationResponses = await Promise.allSettled(
      unsubPromises.map((unsubPromise) => unsubPromise.promise),
    );

    const didSuccessfullyRegister = registrationResponses.every(
      (response) => response.status === 'fulfilled',
    );

    if (!didSuccessfullyRegister) {
      // Clean up by unregistering any successful request handlers
      const unregisterRequestHandlerPromises: Promise<boolean>[] = [];
      const rejectedRequestHandlerReasons: string[] = [];
      registrationResponses.forEach((response, registrationIndex) => {
        if (response.status === 'fulfilled')
          unregisterRequestHandlerPromises.push(
            // Run the unsubscriber for this registration
            unsubPromises[registrationIndex].unsubscriber(),
          );
        // Collect the reasons for failure so we can throw a useful error
        else rejectedRequestHandlerReasons.push(response.reason);
      });

      throw new Error(
        `Unable to register network object with id ${id}:\n\t${rejectedRequestHandlerReasons.join(
          '\n\t',
        )}`,
      );
    }

    // The network object was successfully registered!
    logger.info(`Network object registered: ${id}`);

    // Create a proxy object that blocks "dispose" for anyone else in the same process
    const localProxy = createLocalProxy(objectToShare);

    // Setup onDidDispose so that services will know when the proxy is dead
    const onDidDisposeLocalEmitter = new PapiEventEmitter<void>();
    overrideOnDidDispose(objectToShare, objectToShare, onDidDisposeLocalEmitter.event);

    // Override dispose on the object passed in to clean up the network object
    overrideDispose(objectToShare, async (): Promise<boolean> => {
      // Unsubscribe all requests for this network object
      if (
        !(await aggregateUnsubscriberAsyncs(
          unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
        )())
      ) {
        logger.error(`Failed to unsubscribe all requests for ${id}`);
        return false;
      }

      // Send an event notifying everyone that this network object is no longer available
      // The event listener removes the network object from the registration map
      onDidDisposeNetworkObjectEmitter.emit(id);
      return true;
    });

    // Set the network object locally
    networkObjectRegistrations.set(id, {
      registrationType: NetworkObjectRegistrationType.Local,
      onDidDisposeEmitter: onDidDisposeLocalEmitter,
      networkObject: localProxy.proxy as NetworkObject<T>,
      revokeProxy: localProxy.revoke,
    });

    return objectToShare as DisposableNetworkObject<T>;
  });
};

// #endregion

const networkObjectService = {
  initialize,
  has,
  get,
  set,
};

export default networkObjectService;
