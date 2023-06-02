/**
 * Handles registering data providers and serving data around the papi.
 * Exposed on the papi.
 */

import IDataProvider, { IDisposableDataProvider } from '@shared/models/data-provider.interface';
import DataProviderInternal, {
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
} from '@shared/models/data-provider.model';
import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { PapiEvent } from '@shared/models/papi-event.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as networkService from '@shared/services/network.service';
import { deepEqual, serializeRequestType } from '@shared/utils/papi-util';
import AsyncVariable from '@shared/utils/async-variable';
import { NetworkObject } from '@shared/models/network-object.model';
import networkObjectService from '@shared/services/network-object.service';
import logger from '@shared/services/logger.service';

/** Suffix on network objects that indicates that the network object is a data provider */
const DATA_PROVIDER_LABEL = 'data';

/** event type for data provider update event */
const ON_DID_UPDATE = 'onDidUpdate';

/**
 * An object reference that is a placeholder for updates for data provider subscribers.
 * We want to make absolutely sure updates that come in are sent to subscribers, so we
 * use this object reference to tell if we have never had an update before.
 */
const SUBSCRIBE_PLACEHOLDER = {};

/** Gets the id for the data provider network object with the given name */
const getDataProviderObjectId = (providerName: string) => `${providerName}-${DATA_PROVIDER_LABEL}`;

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

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

/**
 * Indicate if we are aware of an existing data provider with the given name. If a data provider
 * with the given name is somewhere else on the network, this function won't tell you about it
 * unless something else in the existing process is subscribed to it.
 */
function hasKnown(providerName: string): boolean {
  return networkObjectService.hasKnown(getDataProviderObjectId(providerName));
}

/**
 * Creates a subscribe function for a data provider to allow subscribing to updates on the data
 * @param dataProviderPromise promise to the data provider's network object
 * @param onDidUpdate the event to listen to for updates on the data
 * @returns subscribe function for a data provider
 */
function createDataProviderSubscriber<TSelector, TGetData, TSetData>(
  dataProviderPromise: Promise<IDataProvider<TSelector, TGetData, TSetData>>,
  onDidUpdate: PapiEvent<boolean>,
): DataProviderSubscriber<TSelector, TGetData> {
  return async (selector, callback, options?: DataProviderSubscriberOptions) => {
    const dataProvider: IDataProvider<TSelector, TGetData, TSetData> = await dataProviderPromise;

    // Default options
    const subscriberOptions: DataProviderSubscriberOptions = {
      retrieveDataImmediately: true,
      whichUpdates: 'deeply-equal',
      ...options,
    };

    const { retrieveDataImmediately, whichUpdates } = subscriberOptions;

    /** The most recent data before the newest update. Used for deep comparison checks to prevent useless updates */
    // Start this out as a placeholder so updates definitely run the callback (including if the data is undefined or an empty object)
    // TODO: create a cache for the data provider that holds data returned per selector and shares that cache here
    let dataPrevious: TGetData = SUBSCRIBE_PLACEHOLDER as TGetData;

    // Create a layer over the provided callback that lets us know if we received an update so we don't run the callback with old data after updating
    /** Whether we have already received an update event, meaning our initial `get` will return old data */
    let receivedUpdate = false;
    const callbackWithUpdate = async () => {
      // Get the data at our selector when we receive notification that the data updated
      // TODO: Implement selector events so we can receive the new data with the update instead of reaching back out for it
      const data = await dataProvider.get(selector);
      // Take note that we have received an update so we don't run the callback with the old data below in the `retrieveDataImmediately` code
      receivedUpdate = true;

      // Only update if we should listen to all updates, if the old data is the default placeholder data, or the data is not deeply equal
      if (
        whichUpdates === 'all' ||
        dataPrevious === SUBSCRIBE_PLACEHOLDER ||
        !deepEqual(dataPrevious, data)
      ) {
        dataPrevious = data;
        callback(data);
      }
    };

    const unsubscribe = onDidUpdate(callbackWithUpdate);

    // If the subscriber wants to get the data as soon as possible in addition to running the callback on updates, get the data
    if (retrieveDataImmediately) {
      // Get the data to run the callback immediately so it has the data
      const data = await dataProvider.get(selector);
      // Only run the callback with this updated data if we have not already received an update so we don't accidentally overwrite the newly updated data with old data
      if (!receivedUpdate) {
        receivedUpdate = true;
        dataPrevious = data;
        callback(data);
      }
    }

    // Forcing the unsubscribe to be asynchronous to support selector events in the future
    return async () => unsubscribe();
  };
}

/**
 * Wrap a data provider engine to create a data provider that handles subscriptions for it.
 *
 * Note: This should only run locally when you have the data provider engine. The remote data provider is pretty much just a network object
 *
 * WARNING: this function mutates the provided object. Its `notifyUpdate` and `set` methods are layered over to facilitate data provider subscriptions.
 * @param dataProviderEngine provider engine that handles setting and getting data as well as informing which listeners should get what updates
 * @param dataProviderPromise promise to the data provider's network object
 * @param onDidUpdateEmitter event emitter to use for informing subscribers of updates. The event just returns what set returns (should be true according to IDataProviderEngine)
 * @returns data provider layering over the provided data provider engine
 */
function buildDataProvider<TSelector, TGetData, TSetData>(
  dataProviderEngine: IDataProviderEngine<TSelector, TGetData, TSetData>,
  dataProviderPromise: Promise<IDataProvider<TSelector, TGetData, TSetData>>,
  onDidUpdateEmitter: PapiEventEmitter<boolean>,
): DataProviderInternal<TSelector, TGetData, TSetData> {
  // Layer over data provider engine methods to give it control over emitting updates
  // Layer over the data provider engine's notifyUpdate with one that actually emits an update
  // or if the dpe doesn't have notifyUpdate, give it one
  const dpeNotifyUpdate = dataProviderEngine.notifyUpdate
    ? dataProviderEngine.notifyUpdate.bind(dataProviderEngine)
    : undefined;
  dataProviderEngine.notifyUpdate = (...args) => {
    // If notifyUpdate is not overridden, just return true
    let dpeNotifyUpdateResult = true;
    if (dpeNotifyUpdate) dpeNotifyUpdateResult = dpeNotifyUpdate(...args);
    if (dpeNotifyUpdateResult) onDidUpdateEmitter.emit(dpeNotifyUpdateResult);
    return dpeNotifyUpdateResult;
  };

  // Layer over the data provider engine's set with one that actually emits an update if set returns true
  if (dataProviderEngine.set) {
    /** Saved bound version of the data provider engine's set so we can call it from here */
    const dpeSet = dataProviderEngine.set.bind(dataProviderEngine);
    /** Layered set that emits an update event after running the engine's set */
    dataProviderEngine.set = async (...args) => {
      const dpeSetResult = await dpeSet(...args);
      if (dpeSetResult) onDidUpdateEmitter.emit(dpeSetResult);
      return dpeSetResult;
    };
  }

  // Object whose methods to run first when the data provider's method is called if they exist here
  // before falling back to the dataProviderEngine's methods. Also stores bound versions of the dpe methods
  // Currently, set is omitted because it may or may not be provided on the data provider engine, and we want to
  // throw an exception if someone uses it without it being provided.
  // TODO: update network objects so remote objects know when methods do not exist, then make IDataProvider.set optional
  const dataProviderInternal: Omit<DataProviderInternal<TSelector, TGetData, TSetData>, 'set'> = {
    /** Layered get that runs the engine's get */
    get: dataProviderEngine.get.bind(dataProviderEngine),
    /** Subscribe to run the callback when data changes. Also immediately calls callback with the current value */
    subscribe: createDataProviderSubscriber(dataProviderPromise, onDidUpdateEmitter.event),
  };

  // Create a proxy that runs the data provider method if it exists or runs the engine method otherwise
  const dataProvider = new Proxy(dataProviderEngine, {
    get(obj: IDataProviderEngine<TSelector, TGetData, TSetData>, prop) {
      // Pass promises through
      if (prop === 'then') return obj[prop as keyof typeof obj];

      // Do not let anyone but the data provider engine send updates
      if (prop === 'notifyUpdate')
        throw new Error('Cannot run notifyUpdate outside of data provider engine');

      // If the data provider already has the method, run it
      if (prop in dataProviderInternal)
        return dataProviderInternal[prop as keyof typeof dataProviderInternal];

      // Get the engine method and bind it
      const engineMethod = obj[prop as keyof typeof obj]?.bind(dataProviderEngine);

      // Save the bound engine method on the data provider to be run later
      // There isn't indexing on IDataProviderEngine so normal objects could be used,
      // but now members can't be accessed by indexing in DataProviderService
      // TODO: fix it so it is indexable but can have specific members
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (engineMethod) (dataProviderInternal as any)[prop] = engineMethod;
      return engineMethod;
    },
    set(obj: IDataProviderEngine<TSelector, TGetData, TSetData>, prop, value) {
      // We create `subscribe` for extensions, and `subscribe` uses `get` internally, so those 2
      // properties can't change after the data provider has been created or bad things will happen.
      if (prop === 'get' || prop === 'subscribe') return false;

      // If we cached a property previously, purge the cache for that property since it is changing.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((dataProviderInternal as any)[prop]) delete (dataProviderInternal as any)[prop];

      // Actually set the provided property
      Reflect.set(obj, prop, value);
      return true;
    },
    // Type assert the data provider engine proxy because it is a DataProviderInternal although
    // Typescript can't figure it out
  }) as unknown as DataProviderInternal<TSelector, TGetData, TSetData>;

  return dataProvider;
}

/**
 * Creates a data provider to be shared on the network layering over the provided data provider engine.
 * @param providerName name this data provider should be called on the network
 * @param dataProviderEngine the object to layer over with a new data provider object
 *
 * WARNING: registering a dataProviderEngine mutates the provided object.
 * Its `notifyUpdate` and `set` methods are layered over to facilitate data provider subscriptions.
 * @returns information about the data provider including control over disposing of it.
 *  Note that this data provider is a new object distinct from the data provider engine passed in.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TData` - the type of data provided by this data provider based on a provided selector
 */
async function registerEngine<TSelector, TGetData, TSetData>(
  providerName: string,
  dataProviderEngine: IDataProviderEngine<TSelector, TGetData, TSetData>,
): Promise<IDisposableDataProvider<TSelector, TGetData, TSetData>> {
  await initialize();

  if (hasKnown(providerName))
    throw new Error(`Data provider with name ${providerName} is already registered`);

  // Validate that the data provider engine has what it needs
  if (!dataProviderEngine.get || typeof dataProviderEngine.get !== 'function')
    throw new Error('Data provider engine does not have a get function');

  // We are good to go! Create the data provider

  // Get the object id for this data provider name
  const dataProviderObjectId = getDataProviderObjectId(providerName);

  /** Variable to hold a promise to the final data provider's network object so the local object
   *  can reference the network object in its functions
   */
  const dataProviderVariable = new AsyncVariable<IDataProvider<TSelector, TGetData, TSetData>>(
    `DataProvider-${providerName}`,
  );

  // Create a networked update event
  const onDidUpdateEmitter = networkService.createNetworkEventEmitter<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );

  // Build the data provider
  const dataProviderInternal = buildDataProvider(
    dataProviderEngine,
    dataProviderVariable.promise,
    onDidUpdateEmitter,
  );

  // Set up the data provider to be a network object so other processes can use it
  const disposableDataProvider = (await networkObjectService.set(
    dataProviderObjectId,
    dataProviderInternal,
  )) as IDisposableDataProvider<TSelector, TGetData, TSetData>;

  // Get the local network object proxy for the data provider so the provider can't be disposed by extensions
  const dataProvider = await networkObjectService.get<IDataProvider<TSelector, TGetData, TSetData>>(
    dataProviderObjectId,
  );

  // Update the dataProviderVariable so the internal data provider (specifically its subscribe
  // function) can access the dataProvider appropriately
  if (dataProvider) dataProviderVariable.resolveToValue(dataProvider);
  else throw Error(`Unable to get network object for data provider: ${dataProviderObjectId}`);

  return disposableDataProvider;
}

/**
 * Create a mock local data provider object for connecting to the remote data provider
 * @param dataProviderObjectId network object id corresponding to this data provider
 * @param dataProviderContainer container that holds a reference to the data provider so this subscribe function can reference the data provider
 * @returns local data provider object that represents a remote data provider
 */
// This generic type should be DataProviderInternal because we are making part of a local/internal data provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLocalDataProviderToProxy<T extends DataProviderInternal<any, any, any>>(
  dataProviderObjectId: string,
  // NetworkObject<DataProviderInternal> is our way to convert from DataProviderInternal to IDataProvider without specifying generics
  dataProviderPromise: Promise<NetworkObject<T>>,
): Partial<T> {
  // Create a networked update event
  const onDidUpdate = networkService.getNetworkEvent<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );
  return {
    subscribe: createDataProviderSubscriber(dataProviderPromise, onDidUpdate),
  } as Partial<T>;
}

/**
 * Get a data provider that has previously been set up
 * @param providerName Name of the desired data provider
 * @returns The data provider with the given name if one exists, undefined otherwise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<T extends IDataProvider<any, any, any>>(
  providerName: string,
): Promise<T | undefined> {
  await initialize();

  // Get the object id for this data provider name
  const dataProviderObjectId = getDataProviderObjectId(providerName);

  // Get the network object for this data provider
  const dataProvider = (await networkObjectService.get<T>(
    dataProviderObjectId,
    createLocalDataProviderToProxy,
  )) as T;

  if (!dataProvider) {
    logger.info(`No data provider found with name = ${providerName}`);
    return undefined;
  }

  return dataProvider;
}

const dataProviderService = {
  hasKnown,
  registerEngine,
  get,
};

export default dataProviderService;
