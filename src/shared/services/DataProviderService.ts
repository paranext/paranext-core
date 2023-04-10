/**
 * Handles registering data providers and serving data around the papi.
 * Exposed on the papi.
 */

import {
  DataProviderInfo,
  DisposableDataProviderInfo,
} from '@shared/models/DataProviderInfo';
import IDataProvider, {
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
} from '@shared/models/IDataProvider';
import IDataProviderEngine from '@shared/models/IDataProviderEngine';
import { NetworkObjectContainer } from '@shared/models/NetworkObjectInfo';
import { PEvent } from '@shared/models/PEvent';
import PEventEmitter from '@shared/models/PEventEmitter';
import * as NetworkService from '@shared/services/NetworkService';
import { deepEqual, serializeRequestType } from '@shared/util/PapiUtil';
import networkObjectService from './NetworkObjectService';

/** Suffix on network objects that indicates that the network object is a data provider */
const DATA_PROVIDER_LABEL = 'data';

/** event type for data provider update event */
const ON_DID_UPDATE = 'onDidUpdate';

/** Gets the id for the data provider network object of the specified type */
const getDataProviderObjectId = (dataType: string) =>
  `${dataType}-${DATA_PROVIDER_LABEL}`;

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
    await NetworkService.initialize();

    isInitialized = true;
  })();

  return initializePromise;
};

/** Determine if a data provider with the provided type exists anywhere on the network */
async function has(dataType: string): Promise<boolean> {
  await initialize();

  return networkObjectService.has(getDataProviderObjectId(dataType));
}

function createDataProviderSubscriber<TSelector, TGetData, TSetData>(
  dataProviderContainer: NetworkObjectContainer<
    IDataProvider<TSelector, TGetData, TSetData>
  >,
  onDidUpdate: PEvent<boolean>,
): DataProviderSubscriber<TSelector, TGetData> {
  return async (
    selector,
    callback,
    options?: DataProviderSubscriberOptions,
  ) => {
    if (!dataProviderContainer.networkObject)
      throw new Error("Somehow the data provider doesn't exist! Investigate");

    // Default options
    const subscriberOptions: DataProviderSubscriberOptions = {
      retrieveDataImmediately: true,
      whichUpdates: 'deeply-equal',
      ...options,
    };

    const { retrieveDataImmediately, whichUpdates } = subscriberOptions;

    /** The most recent data before the newest update. Used for deep comparison checks to prevent useless updates */
    // Start this out as a new object so updates definitely run the callback (including if the data is undefined)
    // TODO: create a cache for the data provider that holds data returned per selector and shares that cache here
    let dataPrevious: TGetData = {} as TGetData;

    // Create a layer that lets us know if we received an update so we don't run the callback with old data
    let receivedUpdate = false;
    const callbackWithUpdate = async () => {
      if (!dataProviderContainer.networkObject)
        throw new Error("Somehow the data provider doesn't exist! Investigate");
      // Get the data at our selector when we receive notification that the data updated
      // TODO: Implement selector events so we can receive the new data with the update instead of reaching back out for it
      const data = await dataProviderContainer.networkObject.get(selector);
      receivedUpdate = true;

      // Only update if we should listen to all updates or the data is not deeply equal
      if (whichUpdates === 'all' || !deepEqual(dataPrevious, data)) {
        dataPrevious = data;
        callback(data);
      }
    };

    const unsubscribe = onDidUpdate(callbackWithUpdate);

    if (retrieveDataImmediately) {
      // Get the data to run the callback immediately so it has the data
      const data = await dataProviderContainer.networkObject.get(selector);
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
 * @param onDidUpdateEmitter event emitter to use for informing subscribers of updates. The event just returns what set returns (should be true according to IDataProvider)
 * @returns data provider layering over the provided data provider engine
 */
function buildDataProvider<TSelector, TGetData, TSetData>(
  dataProviderEngine: IDataProviderEngine<TSelector, TGetData, TSetData>,
  onDidUpdateEmitter: PEventEmitter<boolean>,
): IDataProvider<TSelector, TGetData, TSetData> {
  /** Container to hold a reference to the data provider so the local object can reference the network object in its functions */
  const dataProviderContainer: NetworkObjectContainer<
    IDataProvider<TSelector, TGetData, TSetData>
  > = {
    networkObject: undefined,
  };

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
  const dataProviderInternal: Omit<
    IDataProvider<TSelector, TGetData, TSetData>,
    'set'
  > = {
    /** Layered get that runs the engine's get */
    get: dataProviderEngine.get.bind(dataProviderEngine),
    /** Subscribe to run the callback when data changes. Also immediately calls callback with the current value */
    subscribe: createDataProviderSubscriber(
      dataProviderContainer,
      onDidUpdateEmitter.event,
    ),
  };

  // Update the dataProviderContainer so the local object can access the dataProvider appropriately
  // See above for why dataProviderInternal does not have set and why it needs to be type asserted here for now
  dataProviderContainer.networkObject = dataProviderInternal as IDataProvider<
    TSelector,
    TGetData,
    TSetData
  >;

  // Create a proxy that runs the data provider method if it exists or runs the engine method otherwise
  const dataProvider = new Proxy(dataProviderEngine, {
    get(obj: IDataProviderEngine<TSelector, TGetData, TSetData>, prop) {
      // Pass promises through
      if (prop === 'then') return obj[prop as keyof typeof obj];

      // Do not let anyone but the data provider engine send updates
      if (prop === 'notifyUpdate')
        throw new Error(
          'Cannot run notifyUpdate outside of data provider engine',
        );

      // If the data provider already has the method, run it
      if (prop in dataProviderInternal)
        return dataProviderInternal[prop as keyof typeof dataProviderInternal];

      // Get the engine method and bind it
      const engineMethod =
        obj[prop as keyof typeof obj]?.bind(dataProviderEngine);

      // Save the bound engine method on the data provider to be run later
      // There isn't indexing on IDataProviderEngine so normal objects could be used,
      // but now members can't be accessed by indexing in DataProviderService
      // TODO: fix it so it is indexable but can have specific members
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataProviderInternal as any)[prop] = engineMethod;
      return engineMethod;
    },
    // Type assert the data provider engine proxy because it is an IDataProvider although
    // Typescript can't figure it out
  }) as unknown as IDataProvider<TSelector, TGetData, TSetData>;

  return dataProvider;
}

/**
 * Creates a data provider to be shared on the network layering over the provided data provider engine.
 * @param dataType type of data that this provider serves
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
  dataType: string,
  dataProviderEngine: IDataProviderEngine<TSelector, TGetData, TSetData>,
): Promise<DisposableDataProviderInfo<TSelector, TGetData, TSetData>> {
  await initialize();
  if (await has(dataType))
    throw new Error(
      `Data provider with type ${dataType} is already registered`,
    );

  // Validate that the data provider engine has what it needs
  if (!dataProviderEngine.get || typeof dataProviderEngine.get !== 'function')
    throw new Error('Data provider engine does not have a get function');

  // We are good to go! Create the data provider

  // Get the object id for this data type
  const dataProviderObjectId = getDataProviderObjectId(dataType);

  // Create a networked update event
  const onDidUpdateEmitter = NetworkService.createNetworkEventEmitter<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );

  // Build the data provider
  const dataProvider = buildDataProvider(
    dataProviderEngine,
    onDidUpdateEmitter,
  );

  // Set up the data provider to be a network object so other processes can use it
  const networkObjectInfo = await networkObjectService.set(
    dataProviderObjectId,
    dataProvider,
  );

  return {
    dataProvider: networkObjectInfo.networkObject,
    dispose: networkObjectInfo.dispose,
    onDidDispose: networkObjectInfo.onDidDispose,
  };
}

/**
 * Get a data provider that has previously been set up
 * @param dataType type of data that this provider serves
 * @returns information about the data provider with the specified type if one exists, undefined otherwise
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TData` - the type of data provided by this data provider based on a provided selector
 */
async function get<TSelector, TGetData, TSetData>(
  dataType: string,
): Promise<DataProviderInfo<TSelector, TGetData, TSetData> | undefined> {
  await initialize();

  // Get the object id for this data type
  const dataProviderObjectId = getDataProviderObjectId(dataType);

  // Get the network object for this data provider
  const networkObjectInfo = await networkObjectService.get<
    IDataProvider<TSelector, TGetData, TSetData>
  >(dataProviderObjectId, (_id, networkObjectContainer) => {
    // Create a networked update event
    const onDidUpdate = NetworkService.getNetworkEvent<boolean>(
      serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
    );
    return {
      subscribe: createDataProviderSubscriber(
        networkObjectContainer,
        onDidUpdate,
      ),
    };
  });

  if (!networkObjectInfo) return undefined;

  return {
    dataProvider: networkObjectInfo.networkObject,
    onDidDispose: networkObjectInfo.onDidDispose,
  };
}

const dataProviderService = {
  has,
  registerEngine,
  get,
};

export default dataProviderService;
