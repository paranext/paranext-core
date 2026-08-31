// #region imports

import * as networkService from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import {
  AsyncVariable,
  PlatformEvent,
  PlatformEventEmitter,
  aggregateUnsubscriberAsyncs,
  serialize,
  UnsubscriberAsync,
  getAllObjectFunctionNames,
  getErrorMessage,
  isString,
  CanHaveOnDidDispose,
  MutexMap,
} from 'platform-bible-utils';
import {
  NetworkObject,
  DisposableNetworkObject,
  NetworkableObject,
  LocalObjectToProxyCreator,
  NetworkObjectDetails,
} from '@shared/models/network-object.model';
import { logger } from '@shared/services/logger.service';
import { getEmptyMethodDocs, NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import { EVENT_NAME_ON_DID_CLOSE_WINDOW } from '@shared/data/network-event-names';

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

    // These are pre-approved multi-source events, so create them synchronously and register them
    // centrally in the background (we don't await registration — it isn't needed for the emitter to
    // work). `initialize` is only called after module evaluation is complete, so all module-level
    // variables below are already defined by the time this async body runs.
    const createEmitter = networkService.createCoreMultiSourceEventEmitter(
      'object:onDidCreateNetworkObject',
      {
        notification: {
          summary: 'Emitted when a network object is created in any process.',
          params: [
            {
              name: 'networkObjectDetails',
              required: true,
              summary: "The new network object's details.",
              schema: { type: 'object' },
            },
          ],
        },
      },
    );
    // The emitter variable is declared later in the module; safe at runtime since initialize runs
    // after module evaluation.
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onDidCreateNetworkObjectEmitter = createEmitter.emitter;

    const disposeEmitter = networkService.createCoreMultiSourceEventEmitter(
      'object:onDidDisposeNetworkObject',
      {
        notification: {
          summary: 'Emitted when a network object is disposed in any process.',
          params: [
            {
              name: 'id',
              required: true,
              summary: "The disposed network object's ID.",
              schema: { type: 'string' },
            },
          ],
        },
      },
    );
    // `initialize` runs after module evaluation; the emitter variable is defined later in the module.
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onDidDisposeNetworkObjectEmitter = disposeEmitter.emitter;

    // Central registration runs in the background — it isn't needed for the emitters to work and we
    // don't block startup on it. Consume the results (failures are already logged inside the network
    // service) so a rejected registration can't surface as an unhandled rejection. allSettled never
    // rejects, so nothing escapes this IIFE.
    (async () => {
      await Promise.allSettled([
        createEmitter.registeredEmitterPromise,
        disposeEmitter.registeredEmitterPromise,
      ]);
    })();

    // Subscribe to the dispose event to clean up local and remote network object registrations
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onDidDisposeNetworkObject((id: string) => {
      // forgetRegistration is defined later in the module; safe at runtime since initialize runs
      // after module eval.
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      forgetRegistration(id);
    });

    // A closing window takes its RPC connection down without disposing the objects it hosted, so no
    // dispose event is ever emitted for them. Every process that had fetched one of those objects
    // would otherwise keep serving the dead proxy forever, and — because a cached registration also
    // makes `set` reject the name as taken — no surviving window could re-host it either. The main
    // process announces the close; each process then drops what it can prove is gone.
    networkService.getNetworkEvent<number>(EVENT_NAME_ON_DID_CLOSE_WINDOW)(() => {
      // sweepUnreachableRemoteObjectsAfterWindowClose is defined later in the module; safe at
      // runtime since this handler can only run after module evaluation.
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      sweepUnreachableRemoteObjectsAfterWindowClose().catch((e) => {
        logger.warn(
          `Failed to clean up network objects after a window closed: ${getErrorMessage(e)}`,
        );
      });
    });

    isInitialized = true;
  })();

  return initializePromise;
};

// #endregion

// #region Helpers for talking to the network about objects

/** Prefix on requests that indicates that the request is related to a network object */
const CATEGORY_NETWORK_OBJECT = 'object';

/**
 * Gets a request type for network requests for the specified network object ID and function name
 * (if provided)
 */
const getNetworkObjectRequestType = (id: string, functionName?: string) =>
  serializeRequestType(CATEGORY_NETWORK_OBJECT, `${id}${functionName ? `.${functionName}` : ''}`);

/**
 * Determine if a network object with the specified ID exists remotely (does not check locally)
 *
 * @param id ID of the network object - all processes must use this ID to look up this network
 *   object
 * @param retry Whether or not the network service should retry failed requests several times
 * @returns Empty array if there is a remote network object with this ID, undefined otherwise. TODO:
 *   return array of all eligible functions
 */
const getRemoteNetworkObjectFunctions = async (id: string): Promise<boolean | undefined> => {
  try {
    return await networkService.request<[], boolean>(getNetworkObjectRequestType(id));
  } catch {
    // No processes are registered to handle this get request, meaning a network object with this ID does not exist
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
  /**
   * Emitter that indicates locally when the network object was disposed. Run when the network
   * disposal emitter runs for this registration's ID.
   */
  onDidDisposeEmitter: PlatformEventEmitter<void>;
  /** Function to make the proxy stop working. Should be run on disposing this network object. */
  revokeProxy: () => void;
};

/** Map of ID to network object */
const networkObjectRegistrations = new Map<string, NetworkObjectRegistration>();

/**
 * Search locally known network objects for the given ID. Don't look on the network for more
 * objects.
 *
 * @returns Whether we know of an existing network object with the provided ID already on the
 *   network
 */
const hasKnown = (id: string): boolean => networkObjectRegistrations.has(id);

/**
 * Drop this process's registration for a network object and tell everyone holding it that it is
 * gone: run and tear down its `onDidDispose` event, revoke its proxy so later calls fail loudly
 * instead of hanging, and free the ID for a future `set`.
 *
 * @param id ID of the network object to forget
 * @returns Whether there was a registration to forget
 */
const forgetRegistration = (id: string): boolean => {
  const networkObjectRegistration = networkObjectRegistrations.get(id);
  if (!networkObjectRegistration) return false;

  // Alert users of this specific network object that it was disposed
  networkObjectRegistration.onDidDisposeEmitter.emit();

  // Dispose of the network object registration itself
  networkObjectRegistration.onDidDisposeEmitter.dispose();

  // Dispose of the proxy
  networkObjectRegistration.revokeProxy();

  // Dispose of the network object registration
  networkObjectRegistrations.delete(id);

  return true;
};

/**
 * Emitter for when a network object is created. Includes the list of functions exposed by the
 * network object. Initialized inside `initialize()`.
 */
let onDidCreateNetworkObjectEmitter: PlatformEventEmitter<NetworkObjectDetails> | undefined;

/**
 * Event that fires when a new object has been created on the network (locally or remotely). The
 * event contains information about the new network object.
 */
export const onDidCreateNetworkObject = networkService.getNetworkEvent(
  'object:onDidCreateNetworkObject',
);

/**
 * Emitter for when a network object is disposed. Provides the ID so that the local emitter specific
 * to that object can be run.
 *
 * Only run on local network object registration! Processes should only dispose their own network
 * objects. Initialized inside `initialize()`.
 */
let onDidDisposeNetworkObjectEmitter: PlatformEventEmitter<string> | undefined;

/** Event that fires with a network object ID when that object is disposed locally or remotely */
export const onDidDisposeNetworkObject = networkService.getNetworkEvent(
  'object:onDidDisposeNetworkObject',
);

// #endregion

// #region Helpers for get and set

// We need this to protect simultaneous calls to get and/or set the same network objects
const getterMutexMap = new MutexMap();
const setterMutexMap = new MutexMap();

/**
 * Drop every cached registration for a network object living in another process that can no longer
 * be reached, as if that object had been disposed.
 *
 * This is platform-internal core plumbing between the process that hosted a departed network object
 * and the processes still holding registrations for it, not part of the `@papi/*` surface.
 *
 * Disposal is normally announced by the process that owns the object, but a process that goes away
 * abruptly — most commonly a window the user closed — never gets to announce anything. Its
 * registered methods are dropped from the central registry, yet every other process still holds a
 * registration pointing at it. That cached registration is why the name looks taken to
 * {@link set}/`registerEngine`, so app-global services hosted by one window can only be re-hosted
 * elsewhere once it is cleared.
 *
 * Only remote registrations are considered, and only ones the network confirms are gone, so a call
 * made while every object is still alive changes nothing. Runs under the same per-ID lock as
 * {@link get} so a concurrent lookup cannot resurrect the registration mid-sweep.
 *
 * Reachability is decided with the same probe {@link get} uses, which retries a missing handler on
 * the main process's registration-race cadence. Confirming a genuinely gone object therefore takes
 * a few seconds — deliberately, since erring the other way would revoke a proxy that consumers are
 * still legitimately using. Objects that are alive answer on the first attempt, so a sweep costs
 * nothing when nothing has gone away.
 *
 * @returns IDs of the network objects that were forgotten
 * @experimental
 */
export const forgetUnreachableRemoteObjects = async (): Promise<string[]> => {
  await initialize();

  const remoteIds = [...networkObjectRegistrations.entries()]
    .filter(
      ([, registration]) => registration.registrationType === NetworkObjectRegistrationType.Remote,
    )
    .map(([id]) => id);

  const forgottenIds = await Promise.all(
    remoteIds.map(async (id) => {
      const lock = getterMutexMap.get(id);
      return lock.runExclusive(async () => {
        // Another sweep or a dispose event may have removed it while we waited for the lock
        if (!networkObjectRegistrations.has(id)) return undefined;
        if (await getRemoteNetworkObjectFunctions(id)) return undefined;
        logger.info(`Forgetting network object '${id}'; it is no longer reachable on the network`);
        return forgetRegistration(id) ? id : undefined;
      });
    }),
  );

  return forgottenIds.filter((id) => id !== undefined);
};

/**
 * How long after a close announcement whose sweep confirmed nothing to sweep again. Long enough for
 * a closing renderer's connection to be torn down and its methods dropped from the central
 * registry, short enough that a window taking an app-global service over is not a visible stall.
 */
const RETRY_SWEEP_AFTER_WINDOW_CLOSE_DELAY_MS = 2000;

/** The one retry sweep a close announcement has scheduled, while it is still pending */
let retrySweepAfterWindowCloseTimeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Drop what a closed window left behind, and — if nothing turned out to be droppable yet — sweep
 * once more shortly after.
 *
 * The close is announced from the closing window's `closed` handler, which can run before the
 * socket teardown that removes that renderer's methods from the central registry. A sweep landing
 * inside that millisecond-wide gap still gets its reachability probes answered, so it confirms
 * nothing is gone. The announcement is the only signal there is and it has been consumed by then,
 * so nothing would ever probe again: every process would keep serving the dead window's proxies,
 * and the app-global services exactly one window publishes — the theme engine, the scroll group
 * service — would be left with no host for the rest of the session. The retry runs once the
 * connection is certainly gone, and the disposals it raises are what those service hosts re-enter
 * their races on.
 *
 * Scheduled only when the sweep forgot nothing, so a close that cleaned up normally costs no extra
 * probing. At most one retry is ever pending: a newer announcement takes the pending one over,
 * since it sweeps immediately and schedules its own retry if it still needs one.
 */
const sweepUnreachableRemoteObjectsAfterWindowClose = async (): Promise<void> => {
  // Cleared before the first await so the announcement that supersedes a pending retry cancels it
  // synchronously, whatever else is in flight
  if (retrySweepAfterWindowCloseTimeout !== undefined)
    clearTimeout(retrySweepAfterWindowCloseTimeout);
  retrySweepAfterWindowCloseTimeout = undefined;

  const forgottenIds = await forgetUnreachableRemoteObjects();
  if (forgottenIds.length > 0) return;

  retrySweepAfterWindowCloseTimeout = setTimeout(() => {
    retrySweepAfterWindowCloseTimeout = undefined;
    forgetUnreachableRemoteObjects().catch((e) => {
      logger.warn(
        `Failed to clean up network objects on the retry after a window closed: ${getErrorMessage(e)}`,
      );
    });
  }, RETRY_SWEEP_AFTER_WINDOW_CLOSE_DELAY_MS);
};

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
      // Block access to constructors and dispose
      if (key === 'constructor' || key === 'dispose') return undefined;
      // Assert type of `key` to index `target`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (key === 'then' || key in target) return target[key as keyof typeof target];
      // If the prop requested is a symbol, that doesn't work over the network. Reject
      if (!isString(key)) return undefined;
      // Don't create remote proxies for events. Native `startsWith` for the same reason as the
      // data provider proxy traps — ASCII both sides, fresh key per access, nothing to reuse.
      if (key.startsWith('on')) return undefined;

      // If the local network object doesn't have the property, build a request for it
      const requestFunction = (...args: unknown[]) =>
        networkService.request(getNetworkObjectRequestType(id, key), ...args);

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

/**
 * This proxy enables calling functions on a network object that exists in the same process, but is
 * owned by some other service. We only give the actual network object to the owning service.
 */
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
      // Block access to constructors and dispose
      if (key === 'constructor' || key === 'dispose') return undefined;
      // Don't proxy events except "onDidDispose" since that's the only way for callers to
      // register functions to run when the object is going away
      if (isString(key) && key.startsWith('on') && key !== 'onDidDispose') return undefined;

      const property = Reflect.get(target, key, objectBeingSet);

      // Bind function to the object being set so it calls the object's method on the object even
      // when going through multiple proxies
      if (typeof property === 'function') return property.bind(target);

      return property;
    },
  });

/** Construct details about an object that is becoming a network object */
function createNetworkObjectDetails(
  id: string,
  objectType: string,
  objectToShare: { [property: string]: unknown },
  objectAttributes: { [property: string]: unknown } | undefined,
): NetworkObjectDetails {
  const objectFunctionNames = getAllObjectFunctionNames(objectToShare, id);

  // Remove functions we don't allow to be called remotely on network objects
  objectFunctionNames.delete('constructor');
  objectFunctionNames.delete('dispose');
  objectFunctionNames.forEach((functionName) => {
    // If we come up with some better way to identify events, we can remove this and related checks
    if (functionName.startsWith('on')) objectFunctionNames.delete(functionName);
  });
  return {
    id,
    objectType,
    functionNames: [...objectFunctionNames].sort(),
    attributes: objectAttributes,
  };
}

interface IOnDidDisposableObject {
  onDidDispose?: PlatformEvent<void>;
}

/** Set an `onDidDispose` property on the object to mutate. Throw if one already exists. */
const overrideOnDidDispose = (
  objectId: string,
  objectToMutate: IOnDidDisposableObject,
  newOnDidDispose: PlatformEvent<void>,
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
 * Get a network object that has previously been set up to be shared on the network. A network
 * object is a proxy to an object living somewhere else that local code can use.
 *
 * Running this function twice with the same inputs yields the same network object.
 *
 * @param id ID of the network object - all processes must use this ID to look up this network
 *   object
 * @param createLocalObjectToProxy Function that creates an object that the network object proxy
 *   will be based upon. The object this function creates cannot have an `onDidDispose` property.
 *   This function is useful for setting up network events on a network object.
 * @returns A promise for the network object with specified ID if one exists, undefined otherwise
 */
const get = async <T extends object>(
  id: string,
  createLocalObjectToProxy?: LocalObjectToProxyCreator<T>,
): Promise<NetworkObject<T> | undefined> => {
  await initialize();

  // Don't allow simultaneous gets to run for the same network object
  const lock = getterMutexMap.get(id);
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
      ? // The factory returns an untyped object that the caller guarantees satisfies `Partial<T>`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        (createLocalObjectToProxy(id, networkObjectVariable.promise) as Partial<T>)
      : {};

    // Create a proxy with functions that will send requests to the remote object
    const remoteProxy = createRemoteProxy(id, baseObject);

    // Setup onDidDispose so that services will know when the proxy is dead
    const eventEmitter = new PlatformEventEmitter<void>();
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
 *
 * @param id ID of the object to share on the network. All processes must use this ID to look it up.
 * @param objectToShare The object to set up as a network object. It will have an event named
 *   `onDidDispose` added to its properties. An error will be thrown if the object already had an
 *   `onDidDispose` property on it. If the object already contained a `dispose` function, a new
 *   `dispose` function will be set that calls the existing function (amongst other things). If the
 *   object did not already define a `dispose` function, one will be added.
 *
 *   WARNING: setting a network object mutates the provided object.
 * @param objectType String identifier for the network object type (e.g. `'object'`,
 *   `'dataProvider'`)
 * @param objectAttributes Optional key-value metadata attached to the network object registration.
 * @param objectDocumentation Optional {@link NetworkObjectDocumentation} for this network object.
 *   Set `objectDocumentation['x-experimental']: true` to mark all methods on this network object as
 *   experimental.
 * @returns `objectToShare` modified to be a network object
 */

const set = async <T extends NetworkableObject>(
  id: string,
  objectToShare: T,
  objectType: string = 'object',
  objectAttributes: { [property: string]: unknown } | undefined = undefined,
  objectDocumentation: NetworkObjectDocumentation = {},
): Promise<DisposableNetworkObject<T>> => {
  await initialize();

  // Don't allow simultaneous sets to run for the same network object
  const lock = setterMutexMap.get(id);
  return lock.runExclusive(async () => {
    // Check to see if we already know there is a network object with this ID.
    if (hasKnown(id)) throw new Error(`Network object with id ${id} is already registered`);

    // Check if there is a network object with this ID remotely by trying to register it
    const unsubPromises = [
      networkService.registerRequestHandler(
        getNetworkObjectRequestType(id),
        () => Promise.resolve(true),
        {
          method: {
            // The existence method (`object:{id}`) carries the object's own summary, so it must also
            // carry the object-level experimental marker — otherwise it would render unmarked while
            // every `object:{id}.method` is `[EXPERIMENTAL]`.
            'x-experimental': objectDocumentation['x-experimental'],
            summary: objectDocumentation.summary ?? '',
            description: objectDocumentation.description ?? '',
            params: [],
            result: {
              name: 'return value',
              summary: 'Does the network object exist?',
              required: true,
              schema: {
                type: 'boolean',
              },
            },
          },
          components: objectDocumentation.components,
        },
      ),
    ];

    // Also check if we can register all of the network object's functions
    const netObjDetails = createNetworkObjectDetails(
      id,
      objectType,
      // NetworkableObject isn't specific enough and changing it is painful
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      objectToShare as Record<string, unknown>,
      objectAttributes,
    );

    const objectIsExperimental = objectDocumentation['x-experimental'] === true;

    netObjDetails.functionNames.forEach((functionName) => {
      const requestType = getNetworkObjectRequestType(id, functionName);
      const baseMethodDocs =
        objectDocumentation.methods?.find((method) => method.name === functionName) ??
        getEmptyMethodDocs();
      // Fan out the object-level experimental marker onto each method's docs. A per-method explicit
      // 'x-experimental' wins; absent that, the object-level value propagates.
      const methodDocs =
        objectIsExperimental && baseMethodDocs['x-experimental'] === undefined
          ? { ...baseMethodDocs, 'x-experimental': true as const }
          : baseMethodDocs;
      const unsub = networkService.registerRequestHandler(
        requestType,
        // Assert as any to allow indexing on the function name
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
        (...args: unknown[]) => Promise.resolve((objectToShare as any)[functionName](...args)),
        { method: methodDocs },
      );
      unsubPromises.push(unsub);
    });

    // Warn about documentation entries for methods that don't match any exposed function name
    // (typos, or names filtered out such as on*/dispose) — those entries are otherwise silently
    // discarded and the method falls back to placeholder docs.
    objectDocumentation.methods?.forEach((method) => {
      if (!netObjDetails.functionNames.includes(method.name))
        logger.warn(
          `Network object "${id}" documentation includes method "${method.name}" that matches no exposed function name; the entry is ignored.`,
        );
    });

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

    // At this point, the network object has been registered
    // Create a proxy object that blocks functions like "dispose" for others in the same process
    const localProxy = createLocalProxy(objectToShare);

    // Setup onDidDispose so that services will know when the proxy is dead
    const onDidDisposeLocalEmitter = new PlatformEventEmitter<void>();
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
      if (!onDidDisposeNetworkObjectEmitter)
        throw new Error(
          'network-object.service not initialized — call initialize() before emitting onDidDisposeNetworkObject',
        );
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

    // Notify that the network object was successfully registered
    logger.debug(`Network object registered: ${serialize(netObjDetails)}`);
    if (!onDidCreateNetworkObjectEmitter)
      throw new Error(
        'network-object.service not initialized — call initialize() before emitting onDidCreateNetworkObject',
      );
    onDidCreateNetworkObjectEmitter.emit(netObjDetails);

    // Override objectToShare's type's force-undefined onDidDispose to DisposableNetworkObject's
    // onDidDispose type because it had an onDidDispose added in overrideOnDidDispose.
    // Assert to specified generic type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return objectToShare as Omit<CanHaveOnDidDispose<T>, 'dispose'> as DisposableNetworkObject<T>;
  });
};

// #endregion

// Declare an interface for the object we will export to PAPI frontend
export interface FrontendNetworkObjectService {
  get: typeof get;
  onDidCreateNetworkObject: typeof onDidCreateNetworkObject;
}

// Declare an interface for the object we will export to PAPI backend
export interface BackendNetworkObjectService extends FrontendNetworkObjectService {
  set: typeof set;
}

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface NetworkObjectService extends BackendNetworkObjectService {
  initialize: typeof initialize;
  hasKnown: typeof hasKnown;
}

/**
 * JSDOC SOURCE networkObjectService
 *
 * Network objects are distributed objects within PAPI for TS/JS objects. @see
 * https://en.wikipedia.org/wiki/Distributed_object
 *
 * Objects registered via {@link networkObjectService.set} are retrievable using
 * {@link networkObjectService.get}.
 *
 * Function calls made on network objects retrieved via {@link networkObjectService.get} are proxied
 * and sent to the original objects registered via {@link networkObjectService.set}. All functions on
 * the registered object are proxied except for constructors, `dispose`, and functions starting with
 * `on` since those should be events (which are not intended to be proxied) based on our naming
 * convention. If you don't want a function to be proxied, don't make it a property of the
 * registered object.
 *
 * Functions on a network object will be called asynchronously by other processes regardless of
 * whether the functions are synchronous or asynchronous, so it is best to make them all
 * asynchronous. All shared functions' arguments and return values must be serializable to be called
 * across processes.
 *
 * When a service registers an object via {@link networkObjectService.set}, it is the responsibility
 * of that service, and only that service, to call `dispose` on that object when it is no longer
 * intended to be shared with other services.
 *
 * When an object is disposed by calling `dispose`, all functions registered with the `onDidDispose`
 * event handler will be called. After an object is disposed, calls to its functions will no longer
 * be proxied to the original object.
 */
export const networkObjectService: NetworkObjectService = {
  initialize,
  hasKnown,
  get,
  set,
  onDidCreateNetworkObject,
};

export default networkObjectService;

// This is only intended for use on PAPI frontend
/** JSDOC DESTINATION networkObjectService */
export const frontendNetworkObjectService: FrontendNetworkObjectService = {
  get,
  onDidCreateNetworkObject,
};

// This is only intended for use on PAPI backend
/** JSDOC DESTINATION networkObjectService */
export const backendNetworkObjectService: BackendNetworkObjectService = {
  get,
  set,
  onDidCreateNetworkObject,
};
