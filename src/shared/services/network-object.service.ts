// #region imports

import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  serializeRequestType,
  UnsubscriberAsync,
} from '@shared/utils/papi-util';
import { PapiEvent } from '@shared/models/papi-event.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import { isString } from '@shared/utils/util';
import AsyncVariable from '@shared/utils/async-variable';
import {
  NetworkObject,
  DisposableNetworkObject,
  NetworkableObject,
  LocalObjectToProxyCreator,
} from '@shared/models/network-object.model';
import { Mutex } from 'async-mutex';
import { CanHaveOnDidDispose } from '@shared/models/disposal.model';
import logger from './logger.service';

// #endregion

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
 * @param retry whether or not the network service should retry failed requests several times
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
  networkObject: NetworkObject<NetworkableObject>;
  /** Emitter that indicates locally when the network object was disposed.
   *  Run when the network disposal emitter runs for this registration's ID.
   */
  onDidDisposeEmitter: PapiEventEmitter<void>;
  /** Function to make the proxy stop working. Should be run on disposing this network object. */
  revokeProxy: () => void;
};

/** Map of id to network object */
const networkObjectRegistrations = new Map<string, NetworkObjectRegistration>();

/** Search locally known network objects for the given ID. Don't look on the network for more objects.
 *  @returns whether we know of an existing network object with the provided id already on the network */
const hasKnown = (id: string): boolean => networkObjectRegistrations.has(id);

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

    // Dispose of the network object registration
    networkObjectRegistrations.delete(id);
  }
});

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

const getterMutexMap: MutexMap = new MutexMap();
const setterMutexMap: MutexMap = new MutexMap();

/** This proxy enables calling functions on a network object that exists in a different process */
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
      // Assert type of `key` to index `target`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (key === 'then' || key in target) return target[key as keyof typeof target];
      // If onDidDispose wasn't found in the target already, don't create a remote proxy for it
      if (key === 'onDidDispose') return undefined;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
      (target as any)[key] = requestFunction;
      return requestFunction;
    },
    set(obj, prop, value) {
      // If we cached a property previously, purge the cache for that property since it is changing.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
      if ((obj as any)[prop]) delete (obj as any)[prop];

      // Actually set the provided property
      Reflect.set(obj, prop, value);
      return true;
    },
  });

/** This proxy enables calling functions on a network object that exists in the same process, but is
 * owned by some other service. We only give the actual network object to the owning service. */
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

/** Set an `onDidDispose` property on the object to mutate. Throw if one already exists. */
const overrideOnDidDispose = (
  objectId: string,
  objectToMutate: IOnDidDisposableObject,
  newOnDidDispose: PapiEvent<void>,
): void => {
  if (objectToMutate.onDidDispose) {
    throw new Error(
      `You can't register "${objectId}" as a network object since it already has an onDidDispose property`,
    );
  }

  objectToMutate.onDidDispose = newOnDidDispose;
};

interface IDisposableObject {
  dispose?: UnsubscriberAsync;
}

/** If `dispose` already exists on `objectToMutate`, we will call it in addition to `newDispose` */
export function overrideDispose(
  objectToMutate: IDisposableObject,
  newDispose: UnsubscriberAsync,
): void {
  if (objectToMutate.dispose) {
    const oldDispose = objectToMutate.dispose.bind(objectToMutate);

    objectToMutate.dispose = aggregateUnsubscriberAsyncs([oldDispose, newDispose]);
  } else {
    objectToMutate.dispose = newDispose;
  }
}

// #endregion

// #region get

/**
 * Get a network object that has previously been set up to be shared on the network.
 * A network object is a proxy to an object living somewhere else that local code can use.
 *
 * Running this function twice with the same inputs yields the same network object.
 * @param id id of the network object - all processes must use this id to look up this network object
 * @param createLocalObjectToProxy Function that creates an object that the network object proxy
 * will be based upon. The object this function creates cannot have an `onDidDispose` property.
 * This function is useful for setting up network events on a network object.
 * @returns A promise for the network object with specified id if one exists, undefined otherwise
 */
const get = async <T extends object>(
  id: string,
  createLocalObjectToProxy?: LocalObjectToProxyCreator<T>,
): Promise<NetworkObject<T> | undefined> => {
  await initialize();

  // Don't allow simultaneous gets to run for the same network object
  const lock: Mutex = getterMutexMap.get(id);
  return lock.runExclusive(async () => {
    // If we already have this network object, return it
    const networkObjectRegistration = networkObjectRegistrations.get(id);
    if (networkObjectRegistration)
      // Assert to specified generic type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return networkObjectRegistration.networkObject as NetworkObject<T>;

    // We don't already have this network object. See if it exists somewhere else.
    const networkObjectFunctions = await getRemoteNetworkObjectFunctions(id);
    if (!networkObjectFunctions) return undefined;

    // Before we create a remote proxy, see if there was a race condition for a local proxy.
    // It is possible we called `get`, then while awaiting the network response something else in
    // this process called `set` on the object we were looking for.
    const networkObjectRegistrationSecondChance = networkObjectRegistrations.get(id);
    if (networkObjectRegistrationSecondChance)
      // Assert to specified generic type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return networkObjectRegistrationSecondChance.networkObject as NetworkObject<T>;

    // At this point, the object exists remotely but does not yet exist locally.

    // The base object created below might need a reference to the final network object. Since the
    // network object doesn't exist yet, create an async variable now and fill it in after the
    // network object is created.
    const networkObjectVariable: AsyncVariable<NetworkObject<T>> = new AsyncVariable(
      `NetworkObject-${id}`,
    );

    // Create the base object that will be proxied for remote calls.
    // If a property exists on the base object, we use it and won't look for it on the remote object.
    // If a property does not exist on the base object, it is assumed to exist on the remote object.
    const baseObject: Partial<T> = createLocalObjectToProxy
      ? // Assert to specified generic type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        (createLocalObjectToProxy(id, networkObjectVariable.promise) as Partial<T>)
      : {};

    // Create a proxy with functions that will send requests to the remote object
    const remoteProxy = createRemoteProxy(id, baseObject);

    // Setup onDidDispose so that services will know when the proxy is dead
    const eventEmitter = new PapiEventEmitter<void>();
    overrideOnDidDispose(id, remoteProxy.proxy, eventEmitter.event);

    // The network object is finished! Rename it so we know it is finished.
    // Assert to specified generic type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const networkObject = remoteProxy.proxy as NetworkObject<T>;

    // Save the network object for future lookups
    networkObjectRegistrations.set(id, {
      registrationType: NetworkObjectRegistrationType.Remote,
      onDidDisposeEmitter: eventEmitter,
      networkObject,
      revokeProxy: remoteProxy.revoke,
    });

    // Resolve the promise to the network object so promise holders can complete their work
    networkObjectVariable.resolveToValue(networkObject);

    return networkObject;
  });
};

// #endregion

// #region set

/**
 * Set up an object to be shared on the network.
 * @param id ID of the object to share on the network. All processes must use this ID to look it up.
 * @param objectToShare The object to set up as a network object. It will have an event named
 * `onDidDispose` added to its properties. An error will be thrown if the object already had an
 * `onDidDispose` property on it. If the object already contained a `dispose` function, a new
 * `dispose` function will be set that calls the existing function (amongst other things). If the
 * object did not already define a `dispose` function, one will be added.
 *
 * WARNING: setting a network object mutates the provided object.
 * @returns `objectToShare` modified to be a network object
 */

const set = async <T extends NetworkableObject>(
  id: string,
  objectToShare: T,
): Promise<DisposableNetworkObject<T>> => {
  await initialize();

  // Don't allow simultaneous sets to run for the same network object
  const lock: Mutex = setterMutexMap.get(id);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
          Promise.resolve((objectToShare as any)[functionName](...args)),
      ),
    ];

    // Await all of the registrations finishing, successful or not
    const registrationResponses = await Promise.allSettled(unsubPromises);
    const didSuccessfullyRegister = registrationResponses.every(
      (response) => response.status === 'fulfilled',
    );

    if (!didSuccessfullyRegister) {
      // Clean up by unregistering any successful request handlers
      const rejectedRequestHandlerReasons: string[] = [];
      await Promise.all(
        registrationResponses.map(async (response, registrationIndex) => {
          if (response.status === 'fulfilled')
            // Run the unsubscriber for this registration
            (await unsubPromises[registrationIndex])();
          // Collect the reasons for failure so we can throw a useful error
          else rejectedRequestHandlerReasons.push(response.reason);
        }),
      );

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
    overrideOnDidDispose(id, objectToShare, onDidDisposeLocalEmitter.event);

    // Override dispose on the object passed in to clean up the network object
    overrideDispose(objectToShare, async (): Promise<boolean> => {
      // Unsubscribe all requests for this network object
      const unsubscribers = aggregateUnsubscriberAsyncs(await Promise.all(unsubPromises));
      if (!(await unsubscribers())) {
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
      // Assert to specified generic type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      networkObject: localProxy.proxy as NetworkObject<T>,
      revokeProxy: localProxy.revoke,
    });

    // Override objectToShare's type's force-undefined onDidDispose to DisposableNetworkObject's
    // onDidDispose type because it had an onDidDispose added in overrideOnDidDispose.
    // Assert to specified generic type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return objectToShare as Omit<CanHaveOnDidDispose<T>, 'dispose'> as DisposableNetworkObject<T>;
  });
};

// #endregion

// Declare an interface for the object we're exporting so that JSDoc comments propagate
interface NetworkObjectService {
  initialize: typeof initialize;
  hasKnown: typeof hasKnown;
  get: typeof get;
  set: typeof set;
}

/**
 * Network objects are distributed objects within PAPI for TS/JS objects.
 * @see https://en.wikipedia.org/wiki/Distributed_object
 *
 * Objects registered via {@link networkObjectService.set} are retrievable using {@link networkObjectService.get}.
 *
 * Function calls made on network objects retrieved via {@link networkObjectService.get} are proxied and
 * sent to the original objects registered via {@link networkObjectService.set}.
 *
 * Functions on a network object will be called asynchronously by other processes regardless of
 * whether the functions are synchronous or asynchronous, so it is best to make them all
 * asynchronous. All shared functions' arguments and return values must be serializable to be
 * called across processes.
 *
 * When a service registers an object via {@link networkObjectService.set}, it is the responsibility of
 * that service, and only that service, to call `dispose` on that object when it is no longer
 * intended to be shared with other services.
 *
 * When an object is disposed by calling `dispose`, all functions registered with the `onDidDispose`
 * event handler will be called. After an object is disposed, calls to its functions will no longer
 * be proxied to the original object.
 */
const networkObjectService: NetworkObjectService = {
  initialize,
  hasKnown,
  get,
  set,
};

export default networkObjectService;
