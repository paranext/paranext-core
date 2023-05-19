/**
 * Handles registering data providers and serving data around the papi.
 * Exposed on the papi.
 */

import IDataProvider, { IDisposableDataProvider } from '@shared/models/data-provider.interface';
import DataProviderInternal, {
  DataProviderDataTypes,
  DataProviderSetter,
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
  DataTypeNames,
  getDataProviderDataTypeFromFunctionName,
} from '@shared/models/data-provider.model';
import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { PapiEvent } from '@shared/models/papi-event.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as networkService from '@shared/services/network.service';
import { deepEqual, serializeRequestType } from '@shared/utils/papi-util';
import { Container, getAllObjectFunctionNames, groupBy, isString } from '@shared/utils/util';
import { NetworkObject } from '@shared/models/network-object.model';
import networkObjectService from '@shared/services/network-object.service';
import logger from './logger.service';

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

/** Determine if a data provider with the given name exists anywhere on the network */
async function has(providerName: string): Promise<boolean> {
  await initialize();

  return networkObjectService.has(getDataProviderObjectId(providerName));
}

/**
 * Creates a subscribe function for a data provider to allow subscribing to updates on the data
 * @param dataProviderContainer container that holds a reference to the network object data provider so this subscribe function can reference the data provider
 * @param onDidUpdate the event to listen to for updates on the data
 * @param dataType the name of the functions to use (ex: `dataProvider.subscribeBook` -> `dataProvider.getBook`)
 * @returns subscribe function for a data provider
 */
function createDataProviderSubscriber<TDataTypes extends DataProviderDataTypes>(
  dataProviderContainer: Container<IDataProvider<TDataTypes>>,
  onDidUpdate: PapiEvent<boolean>,
  dataType: DataTypeNames<TDataTypes>,
): DataProviderSubscriber<TDataTypes[typeof dataType]> {
  return async (selector, callback, options?: DataProviderSubscriberOptions) => {
    if (!dataProviderContainer.contents)
      throw new Error("subscribe: Somehow the data provider doesn't exist! Investigate");

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
    let dataPrevious: unknown = SUBSCRIBE_PLACEHOLDER;

    // Create a layer over the provided callback that lets us know if we received an update so we don't run the callback with old data after updating
    /** Whether we have already received an update event, meaning our initial `get` will return old data */
    let receivedUpdate = false;
    const callbackWithUpdate = async () => {
      if (!dataProviderContainer.contents)
        throw new Error("onDidUpdate: Somehow the data provider doesn't exist! Investigate");
      // Get the data at our selector when we receive notification that the data updated
      // TODO: Implement selector events so we can receive the new data with the update instead of reaching back out for it
      const data = await dataProviderContainer.contents[`get${dataType}`](selector);
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
      const data = await dataProviderContainer.contents[`get${dataType}`](selector);
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
 * @param dataProviderContainer container that holds a reference to the network object data provider so the subscribe function can reference the data provider
 * @param onDidUpdateEmitter event emitter to use for informing subscribers of updates. The event just returns what set returns (should be true according to IDataProviderEngine)
 * @returns data provider layering over the provided data provider engine
 */
function buildDataProvider<TDataTypes extends DataProviderDataTypes>(
  dataProviderEngine: IDataProviderEngine<TDataTypes>,
  dataProviderContainer: Container<IDataProvider<TDataTypes>>,
  onDidUpdateEmitter: PapiEventEmitter<boolean>,
): DataProviderInternal<TDataTypes> {
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

  // Figure out the available get/set methods' data types
  const dataTypes = groupBy<string, 'get' | 'set' | 'other', DataTypeNames<TDataTypes>>(
    getAllObjectFunctionNames(dataProviderEngine),
    (fnName) => {
      if (fnName.startsWith('get')) return 'get';
      if (fnName.startsWith('set')) return 'set';
      return 'other';
    },
    (fnName, fnType) => {
      // If it's not a get or a set, just return an empty string. We aren't planning to use this
      if (fnType === 'other') return '' as DataTypeNames<TDataTypes>;

      // Grab the data type out of the function names
      return getDataProviderDataTypeFromFunctionName<TDataTypes>(fnName);
    },
  );

  // Layer over the data provider engine's set methods with set methods that actually emit an update
  // if they return true
  dataTypes.get('set')?.forEach((dataType) => {
    if (dataProviderEngine[`set${dataType}`]) {
      /** Saved bound version of the data provider engine's set so we can call it from here */
      const dpeSet = (
        dataProviderEngine[`set${dataType}`] as DataProviderSetter<TDataTypes[typeof dataType]>
      ).bind(dataProviderEngine);
      /** Layered set that emits an update event after running the engine's set */
      (dataProviderEngine[`set${dataType}`] as DataProviderSetter<TDataTypes[typeof dataType]>) =
        async (...args) => {
          const dpeSetResult = await dpeSet(...args);
          if (dpeSetResult) onDidUpdateEmitter.emit(dpeSetResult);
          return dpeSetResult;
        };
    }
  });

  // Object whose methods to run first when the data provider's method is called if they exist here
  // before falling back to the dataProviderEngine's methods. Caches subscribe functions and bound
  // data provider engine methods.
  // TODO: update network objects so remote objects know when methods do not exist, then make IDataProvider.set optional
  const dataProviderInternal: Partial<DataProviderInternal<TDataTypes>> = {};

  // Create a proxy that runs the data provider method if it exists or runs the engine method otherwise
  const dataProvider = new Proxy(dataProviderEngine, {
    get(obj, prop) {
      // Pass promises through
      if (prop === 'then') return obj[prop as keyof typeof obj];

      // Do not let anyone but the data provider engine send updates
      if (prop === 'notifyUpdate')
        throw new Error('Cannot run notifyUpdate outside of data provider engine');

      // If the data provider already has the method, run it
      if (prop in dataProviderInternal)
        return dataProviderInternal[prop as keyof typeof dataProviderInternal];

      /** Method that will go on the data provider to run */
      // Any because we want this method to be any method on the data provider type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let newDataProviderMethod: DataProviderInternal<TDataTypes>[any] | undefined;

      // If they want a subscriber, build a subscribe function specific to the data type used
      if (isString(prop) && prop.startsWith('subscribe')) {
        const dataType = getDataProviderDataTypeFromFunctionName(prop);
        // Subscribe to run the callback when data changes. Also immediately calls callback with the current value
        newDataProviderMethod = createDataProviderSubscriber<TDataTypes>(
          dataProviderContainer,
          onDidUpdateEmitter.event,
          dataType,
        );
      }

      // Otherwise, get the engine method and bind it
      newDataProviderMethod = obj[prop as keyof typeof obj]?.bind(dataProviderEngine);

      // Save the bound engine method on the data provider to be run later
      if (newDataProviderMethod) {
        // There isn't indexing on IDataProviderEngine so normal objects could be used,
        // but now members can't be accessed by indexing in DataProviderService
        // TODO: fix it so it is indexable but can have specific members
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (dataProviderInternal as any)[prop] = newDataProviderMethod;
      }
      return newDataProviderMethod;
    },
    set(obj, prop, value) {
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
    // Type assert the data provider engine proxy because it is a DataProviderInternal
  }) as DataProviderInternal<TDataTypes>;

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
async function registerEngine<TDataTypes extends DataProviderDataTypes>(
  providerName: string,
  dataProviderEngine: IDataProviderEngine<TDataTypes>,
): Promise<IDisposableDataProvider<TDataTypes>> {
  await initialize();

  // There is a potential networking sync issue here. We check for a data provider, then we create a network event, then we create a network object.
  // If someone else registers an engine with the same data provider name at the same time, the two registrations could get intermixed and mess stuff up
  // TODO: fix this split network request issue. Just try to register the network object. If it succeeds, continue. If it fails, give up.
  if (await has(providerName))
    throw new Error(`Data provider with type ${providerName} is already registered`);

  // Validate that the data provider engine has what it needs
  if (!dataProviderEngine.get || typeof dataProviderEngine.get !== 'function')
    throw new Error('Data provider engine does not have a get function');

  // We are good to go! Create the data provider

  // Get the object id for this data provider name
  const dataProviderObjectId = getDataProviderObjectId(providerName);

  /** Container to hold a reference to the final network object data provider so the local object
   * can reference the network object in its functions
   */
  const dataProviderContainer: Container<IDataProvider<TDataTypes>> = {
    contents: undefined,
  };

  // Create a networked update event
  const onDidUpdateEmitter = networkService.createNetworkEventEmitter<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );

  // Build the data provider
  const dataProviderInternal = buildDataProvider(
    dataProviderEngine,
    dataProviderContainer,
    onDidUpdateEmitter,
  );

  // Temporarily fix a race condition where we register dataProviderInternal as a network object,
  // then we get the network object in order to get the local proxy that doesn't have dispose on it,
  // then we set the container to the local network object. If a process tries to call something on
  // this data provider after it is set and before dataProviderContainer is properly set after the
  // get below, an error occurred that the dataProviderContainer.contents was undefined. So we set
  // dataProviderContainer.contents here to have a temporary fix where the container will have
  // something in it immediately once it is set as a network object.
  // TODO: Fix this issue - having contents set here essentially opens up data providers to be
  // disposed by other things for a fraction of a second. Maybe we could set the container's
  // contents in networkObjectService.set
  // https://github.com/paranext/paranext-core/issues/185
  dataProviderContainer.contents = dataProviderInternal as unknown as IDataProvider<TDataTypes>;

  // Set up the data provider to be a network object so other processes can use it
  const disposableDataProvider = (await networkObjectService.set(
    dataProviderObjectId,
    dataProviderInternal,
  )) as IDisposableDataProvider<TDataTypes>;

  // Get the local network object proxy for the data provider so you can't call
  // dataProviderContainer.contents.dispose
  const dataProvider = (await networkObjectService.get<IDataProvider<TDataTypes>>(
    dataProviderObjectId,
  )) as IDataProvider<TDataTypes>;

  // Update the dataProviderContainer so the internal data provider (specifically its subscribe
  // function) can access the dataProvider appropriately
  dataProviderContainer.contents = dataProvider;

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
  dataProviderContainer: Container<NetworkObject<T>>,
): Partial<T> {
  // Create a networked update event
  const onDidUpdate = networkService.getNetworkEvent<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );
  return {
    subscribe: createDataProviderSubscriber(dataProviderContainer, onDidUpdate),
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
  has,
  registerEngine,
  get,
};

export default dataProviderService;
