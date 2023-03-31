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

/** Builds the id for the data provider network object of the specified type */
const buildDataProviderObjectId = (dataType: string) =>
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

  return networkObjectService.has(buildDataProviderObjectId(dataType));
}

function createDataProviderSubscriber<TSelector, TData>(
  dataProviderContainer: NetworkObjectContainer<
    IDataProvider<TSelector, TData>
  >,
  onDidUpdate: PEvent<boolean>,
): DataProviderSubscriber<TSelector, TData> {
  return async (
    selector,
    callback,
    options?: DataProviderSubscriberOptions,
  ) => {
    if (!dataProviderContainer.networkObject)
      throw new Error("Somehow the data provider doesn't exist! Investigate");

    // Default options
    const subscriberOptions = {
      getDataImmediately: true,
      skipEqualUpdates: true,
      ...options,
    };

    const { getDataImmediately, skipEqualUpdates } = subscriberOptions;

    /** The most recent data before the newest update. Used for deep comparison checks to prevent useless updates */
    let dataPrevious: TData | undefined;

    // Create a layer that lets us know if we received an update so we don't run the callback with old data
    let receivedUpdate = false;
    const callbackWithUpdate = async () => {
      if (!dataProviderContainer.networkObject)
        throw new Error("Somehow the data provider doesn't exist! Investigate");
      // Get the data at our selector when we receive notification that the data updated
      // TODO: Implement selector events so we can receive the new data with the update instead of reaching back out for it
      const data = await dataProviderContainer.networkObject.get(selector);
      receivedUpdate = true;

      // Only update if the data is not deeply equal
      if (!skipEqualUpdates || !deepEqual(dataPrevious, data)) {
        dataPrevious = data;
        callback(data);
      }
    };

    const unsubscribe = onDidUpdate(callbackWithUpdate);

    if (getDataImmediately) {
      // Get the data to run the callback immediately so it has the data
      const data = await dataProviderContainer.networkObject.get(selector);
      // Only run the callback with this updated data if we have not already received an update so we don't accidentally overwrite the newly updated data with old data
      if (!receivedUpdate) {
        receivedUpdate = true;
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
 * @param dataProviderEngine provider engine that handles setting and getting data as well as informing which listeners should get what updates
 * @param onDidUpdateEmitter event emitter to use for informing subscribers of updates. The event just returns what set returns (should be true according to IDataProvider)
 * @returns data provider layering over the provided data provider engine
 */
function buildDataProvider<TSelector, TData>(
  dataProviderEngine: IDataProviderEngine<TSelector, TData>,
  onDidUpdateEmitter: PEventEmitter<boolean>,
): IDataProvider<TSelector, TData> {
  /** Container to hold a reference to the data provider so the local object can reference the network object in its functions */
  const dataProviderContainer: NetworkObjectContainer<
    IDataProvider<TSelector, TData>
  > = {
    networkObject: undefined,
  };

  const dataProviderInternal: IDataProvider<TSelector, TData> = {
    /** Layered set that emits an update event after running the engine's set */
    set: async (selector: TSelector, data: TData) => {
      const dpeSetResult = await dataProviderEngine.set.bind(
        dataProviderEngine,
      )(selector, data);
      if (dpeSetResult) onDidUpdateEmitter.emit(dpeSetResult);
      return dpeSetResult;
    },
    /** Layered get that runs the engine's get */
    get: dataProviderEngine.get.bind(dataProviderEngine),
    /** Subscribe to run the callback when data changes. Also immediately calls callback with the current value */
    subscribe: createDataProviderSubscriber(
      dataProviderContainer,
      onDidUpdateEmitter.event,
    ),
  };

  // Update the dataProviderContainer so the local object can access the dataProvider appropriately
  dataProviderContainer.networkObject = dataProviderInternal;

  // Create a proxy that runs the data provider method if it exists or runs the engine method otherwise
  const dataProvider = new Proxy(dataProviderEngine, {
    get(obj: IDataProviderEngine<TSelector, TData>, prop) {
      // Pass promises through
      if (prop === 'then') return obj[prop as keyof typeof obj];

      // If the data provider already has the method, run it
      if (prop in dataProviderInternal)
        // There isn't indexing on IDataProvider so normal objects could be used,
        // but now members can't be accessed by indexing in DataProviderService
        // TODO: fix it so it is indexable but can have specific members
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return dataProviderInternal[prop as keyof typeof dataProviderInternal];

      // Get the engine method and bind it
      const engineFunction =
        obj[prop as keyof typeof obj].bind(dataProviderEngine);

      // Save the bound engine method on the data provider to be run later
      // There isn't indexing on IDataProviderEngine so normal objects could be used,
      // but now members can't be accessed by indexing in DataProviderService
      // TODO: fix it so it is indexable but can have specific members
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataProviderInternal as any)[prop] = engineFunction;
      return engineFunction;
    },
    // Type cast the data provider engine proxy because it is an IDataProvider although
    // Typescript can't figure it out
  }) as unknown as IDataProvider<TSelector, TData>;

  return dataProvider;
}

/**
 * Creates a data provider to be shared on the network layering over the provided data provider engine.
 * @param dataType type of data that this provider serves
 * @param dataProviderEngine the object to layer over with a new data provider object
 * @returns information about the data provider including control over disposing of it.
 *  Note that this data provider is a new object distinct from the data provider engine passed in.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TData` - the type of data provided by this data provider based on a provided selector
 */
async function registerEngine<TSelector, TData>(
  dataType: string,
  dataProviderEngine: IDataProviderEngine<TSelector, TData>,
): Promise<DisposableDataProviderInfo<TSelector, TData>> {
  await initialize();
  if (await has(dataType))
    throw new Error(
      `Data provider with type ${dataType} is already registered`,
    );

  // Validate that the data provider engine has what it needs
  if (!dataProviderEngine.get || typeof dataProviderEngine.get !== 'function')
    throw new Error('Data provider engine does not have a get function');
  if (!dataProviderEngine.set || typeof dataProviderEngine.set !== 'function')
    throw new Error('Data provider engine does not have a set function');

  // We are good to go! Create the data provider

  // Get the object id for this data type
  const dataProviderObjectId = buildDataProviderObjectId(dataType);

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
async function get<TSelector, TData>(
  dataType: string,
): Promise<DataProviderInfo<TSelector, TData> | undefined> {
  await initialize();

  // Get the object id for this data type
  const dataProviderObjectId = buildDataProviderObjectId(dataType);

  // Get the network object for this data provider
  const networkObjectInfo = await networkObjectService.get<
    IDataProvider<TSelector, TData>
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
