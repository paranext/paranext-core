/** Handles registering data providers and serving data around the papi. Exposed on the papi. */

import IDataProvider, { IDisposableDataProvider } from '@shared/models/data-provider.interface';
import DataProviderInternal, {
  DataProviderDataTypes,
  DataProviderGetter,
  DataProviderUpdateInstructions,
  DataProviderSetter,
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
  DataTypeNames,
  getDataProviderDataTypeFromFunctionName,
} from '@shared/models/data-provider.model';
import IDataProviderEngine, {
  DataProviderEngineNotifyUpdate,
} from '@shared/models/data-provider-engine.model';
import { PapiEvent } from '@shared/models/papi-event.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import * as networkService from '@shared/services/network.service';
import { deepEqual, serializeRequestType } from '@shared/utils/papi-util';
import { getAllObjectFunctionNames, groupBy, isString } from '@shared/utils/util';
import { LocalObjectToProxyCreator, NetworkObject } from '@shared/models/network-object.model';
import networkObjectService, { overrideDispose } from '@shared/services/network-object.service';
import { CannotHaveOnDidDispose } from '@shared/models/disposal.model';
import logger from '@shared/services/logger.service';
import AsyncVariable from '@shared/utils/async-variable';

/** Suffix on network objects that indicates that the network object is a data provider */
const DATA_PROVIDER_LABEL = 'data';

/** Event type for data provider update event */
const ON_DID_UPDATE = 'onDidUpdate';

/**
 * An object reference that is a placeholder for updates for data provider subscribers. We want to
 * make absolutely sure updates that come in are sent to subscribers, so we use this object
 * reference to tell if we have never had an update before.
 */
const SUBSCRIBE_PLACEHOLDER = {};

/**
 * Gets the id for the data provider network object with the given name Don't add the suffix to the
 * provider name if it's already there to avoid duplication
 */
const getDataProviderObjectId = (providerName: string) => {
  return providerName.endsWith(`-${DATA_PROVIDER_LABEL}`)
    ? providerName
    : `${providerName}-${DATA_PROVIDER_LABEL}`;
};

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/**
 * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
 * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
 * function in order to use `notifyUpdate`.
 *
 * @see IDataProviderEngine for more information on extending this class.
 */
abstract class DataProviderEngine<TDataTypes extends DataProviderDataTypes> {
  // This is just a placeholder and will be layered over by papi. We don't need it to do anything
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes> = (_updateInstructions) => {};
}

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
 *
 * @param dataProviderPromise Promise to the data provider's network object
 * @param onDidUpdate The event to listen to for updates on the data
 * @param dataType The name of the functions to use (ex: `dataProvider.subscribeBook` ->
 *   `dataProvider.getBook`)
 * @returns Subscribe function for a data provider
 */
function createDataProviderSubscriber<TDataTypes extends DataProviderDataTypes>(
  dataProviderPromise: Promise<IDataProvider<TDataTypes>>,
  onDidUpdate: PapiEvent<DataProviderUpdateInstructions<TDataTypes>>,
  dataType: DataTypeNames<TDataTypes>,
): DataProviderSubscriber<TDataTypes[typeof dataType]> {
  return async (selector, callback, options?: DataProviderSubscriberOptions) => {
    const dataProvider = await dataProviderPromise;

    // Default options
    const subscriberOptions: DataProviderSubscriberOptions = {
      retrieveDataImmediately: true,
      whichUpdates: 'deeply-equal',
      ...options,
    };

    const { retrieveDataImmediately, whichUpdates } = subscriberOptions;

    /**
     * The most recent data before the newest update. Used for deep comparison checks to prevent
     * useless updates
     */
    // Start this out as a placeholder so updates definitely run the callback (including if the data is undefined or an empty object)
    // TODO: create a cache for the data provider that holds data returned per selector and shares that cache here
    let dataPrevious: unknown = SUBSCRIBE_PLACEHOLDER;

    // Create a layer over the provided callback that lets us know if we received an update so we don't run the callback with old data after updating
    /**
     * Whether we have already received an update event, meaning our initial `get` will return old
     * data
     */
    let receivedUpdate = false;
    const callbackWithUpdate = async (
      updateEventResult: DataProviderUpdateInstructions<TDataTypes>,
    ) => {
      if (
        updateEventResult !== '*' &&
        (!Array.isArray(updateEventResult) || !updateEventResult.includes(dataType))
      )
        // The update does not apply to this data type. Ignore
        return;

      // The update is relevant to this data type, so continue with this subscription
      // Get the data at our selector when we receive notification that the data updated
      // TODO: Implement selector events so we can receive the new data with the update instead of reaching back out for it
      // TypeScript seems to be unable to figure out these `get${dataType}` types when we wrap
      // DataProviderInternal in NetworkObject to make IDataProvider, so we have to do all this work
      // to specify the specific types
      /* eslint-disable no-type-assertion/no-type-assertion */
      const data = await (
        (dataProvider as unknown as DataProviderInternal<TDataTypes>)[
          `get${dataType}`
        ] as DataProviderGetter<TDataTypes[typeof dataType]>
      )(selector);
      /* eslint-enable */
      // Take note that we have received an update so we don't run the callback with the old data below in the `retrieveDataImmediately` code
      receivedUpdate = true;

      // Only update if we should listen to all updates, if the old data is the default placeholder data, or the data is not deeply equal
      if (
        whichUpdates === '*' ||
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
      // TypeScript seems to be unable to figure out these `get${dataType}` types when we wrap
      // DataProviderInternal in NetworkObject to make IDataProvider, so we have to do all this work
      // to specify the specific types
      /* eslint-disable no-type-assertion/no-type-assertion */
      const data = await (
        (dataProvider as unknown as DataProviderInternal<TDataTypes>)[
          `get${dataType}`
        ] as DataProviderGetter<TDataTypes[typeof dataType]>
      )(selector);
      /* eslint-enable */
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
 * Creates a data provider proxy with `subscribe<data_type>` functions. Runs locally and remote
 *
 * @param dataProviderEngine Engine to make the data provider proxy over if local. `undefined` if
 *   remote
 * @param dataProviderPromise Promise to the data provider's network object
 * @param onDidUpdate The event to listen to for updates on the data
 * @returns Data provider proxy with `subscribe<data_type>` functions
 */
function createDataProviderProxy<TDataTypes extends DataProviderDataTypes>(
  dataProviderEngine: IDataProviderEngine<TDataTypes> | undefined,
  dataProviderPromise: Promise<IDataProvider<TDataTypes>>,
  onDidUpdate: PapiEvent<DataProviderUpdateInstructions<TDataTypes>>,
): DataProviderInternal<TDataTypes> {
  // Object whose methods to run first when the data provider's method is called if they exist here
  // before falling back to the dataProviderEngine's methods. Caches subscribe functions and bound
  // data provider engine methods.
  // TODO: update network objects so remote objects know when methods do not exist, then make IDataProvider.set optional
  const dataProviderInternal: Partial<DataProviderInternal<TDataTypes>> = {};

  // Create a proxy that runs the data provider method if it exists or runs the engine method
  // otherwise.
  // Type assert the data provider engine proxy because it is a DataProviderInternal.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dataProvider = new Proxy(
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    dataProviderEngine ?? (dataProviderInternal as IDataProviderEngine<TDataTypes>),
    {
      get(obj, prop) {
        // Pass promises through. Assert type of `prop` to index `obj`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (prop === 'then') return obj[prop as keyof typeof obj];

        // Do not let anyone but the data provider engine send updates
        if (isString(prop) && prop === 'notifyUpdate')
          throw new Error('Cannot run notifyUpdate outside of data provider engine');

        // If the data provider already has the method, run it
        if (prop in dataProviderInternal)
          // Assert type of `prop` to index `dataProviderInternal`.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return dataProviderInternal[prop as keyof typeof dataProviderInternal];

        /** Figure out the method that will go on the data provider to run */
        // Any because we want this method to be any method on the data provider type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let newDataProviderMethod: DataProviderInternal<TDataTypes>[any] | undefined;

        // If they want a subscriber, build a subscribe function specific to the data type used
        if (isString(prop) && prop.startsWith('subscribe')) {
          const dataType = getDataProviderDataTypeFromFunctionName(prop);
          // Subscribe to run the callback when data changes. Also immediately calls callback with the current value
          newDataProviderMethod = createDataProviderSubscriber<TDataTypes>(
            dataProviderPromise,
            onDidUpdate,
            dataType,
          );
        }
        // If it's not a subscribe and the data provider engine is provided (meaning this proxy is
        // being created for a local data provider), try to get the engine method
        else if (dataProviderEngine) {
          // Otherwise, get the engine method and bind it
          // There isn't indexing on IDataProviderEngine so normal objects could be used,
          // but now members can't be accessed by indexing in DataProviderService
          // TODO: fix it so it is indexable but can have specific members
          newDataProviderMethod = // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
            (obj[prop as keyof typeof obj] as IDataProviderEngine<TDataTypes>[any])?.bind(
              dataProviderEngine,
            );
        }

        // Save the bound engine method on the data provider to be run later
        if (newDataProviderMethod) {
          // There isn't indexing on IDataProviderEngine so normal objects could be used,
          // but now members can't be accessed by indexing in DataProviderService
          // TODO: fix it so it is indexable but can have specific members
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
          (dataProviderInternal as any)[prop] = newDataProviderMethod;
        }
        return newDataProviderMethod;
      },
      set(obj, prop, value) {
        // We create `subscribe<data_type>` and `notifyUpdate` for extensions, and
        // `subscribe<data_type>` uses `get<data_type>` internally, so those 3 properties can't
        // change after the data provider has been created or bad things will happen.
        if (
          isString(prop) &&
          (prop === 'get' || prop.startsWith('subscribe') || prop === 'notifyUpdate')
        )
          return false;

        // If we cached a property previously, purge the cache for that property since it is changing.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
        if ((dataProviderInternal as any)[prop]) delete (dataProviderInternal as any)[prop];

        // Actually set the provided property
        Reflect.set(obj, prop, value);
        return true;
      },
      has(obj, prop) {
        if (prop in dataProviderInternal) return true;
        // This proxy provides subscribe methods, so make sure they seem to exist
        if (isString(prop) && prop.startsWith('subscribe')) return true;
        return prop in obj;
      },
    },
  ) as DataProviderInternal<TDataTypes>;

  return dataProvider;
}

/**
 * Maps from update instructions returned from `notifyUpdate` or a `set<data_type>` function to an
 * update event to send over the network to inform subscribers to update their data
 *
 * @param updateInstructions Update instructions to reformat into an update event
 * @param dataType The data type of the update instructions (e.g. 'Verse' if update instructions
 *   came from `setVerse`) or `undefined` if being mapped for `notifyUpdate`, which doesn't have a
 *   data type
 * @returns Update event information to send in the `onDidUpdate` event emitter to tell subscribers
 *   to update
 */
function mapUpdateInstructionsToUpdateEvent<TDataTypes extends DataProviderDataTypes>(
  updateInstructions: DataProviderUpdateInstructions<TDataTypes> | undefined,
  dataType: DataTypeNames<TDataTypes> | undefined,
): DataProviderUpdateInstructions<TDataTypes> {
  // If they want to update all data types, let them do it
  if (updateInstructions === '*') return updateInstructions;
  // If the update instructions are a string other than '*' (hopefully one of the data types), send
  // an update specifically for that data type
  if (isString(updateInstructions)) return [updateInstructions];
  if (Array.isArray(updateInstructions)) {
    // If the update instructions are a non-empty array, send it
    if (updateInstructions.length > 0) return updateInstructions;
    // If the update instructions are an empty array, don't update (count as falsy)
    return false;
  }
  // If the update instructions are truthy but neither an array or a string or '*', it means we should just send an update for its own data type
  // However, we don't have a data type if we're mapping for `notifyUpdate`, so just return '*' to update everything.
  if (updateInstructions) return dataType !== undefined ? [dataType] : '*';
  // If the update instructions are falsy, do not update
  return false;
}

/**
 * Decorator function that marks a data provider engine `set___` or `get___` method to be ignored.
 * papi will not layer over these methods or consider them to be data type methods
 *
 * @example Use this as a decorator on a class's method:
 *
 * ```typescript
 * class MyDataProviderEngine {
 * ＠papi.dataProvider.decorators.ignore
 * async getInternal() {}
 * }
 * ```
 *
 * WARNING: Do not copy and paste this example. The `@` symbol does not render correctly in JSDoc
 * code blocks, so a different unicode character was used. Please use a normal `@` when using a
 * decorator.
 *
 * OR
 *
 * @example Call this function signature on an object's method:
 *
 * ```typescript
 * const myDataProviderEngine = {
 *   async getInternal() {},
 * };
 * papi.dataProvider.decorators.ignore(dataProviderEngine.getInternal);
 * ```
 *
 * @param method The method to ignore
 */
function ignore(method: Function & { isIgnored?: boolean }): void;
/**
 * Decorator function that marks a data provider engine `set___` or `get___` method to be ignored.
 * papi will not layer over these methods or consider them to be data type methods
 *
 * @param target The class that has the method to ignore
 * @param member The name of the method to ignore
 *
 *   Note: this is the signature that provides the actual decorator functionality. However, since
 *   users will not be using this signature, the example usage is provided in the signature above.
 */
function ignore<T extends object>(target: T, member: keyof T): void;
function ignore<T extends object>(
  target: T | (Function & { isIgnored?: boolean }),
  member?: keyof T,
): void {
  if (typeof target === 'function') target.isIgnored = true;
  else {
    // We don't care what type the decorated object is. Just want to set some function metadata
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
    (target[member as keyof T] as any).isIgnored = true;
  }
}

/**
 * A collection of decorators to be used with the data provider service
 *
 * @example To use the `ignore` a decorator on a class's method:
 *
 * ```typescript
 * class MyDataProviderEngine {
 * ＠papi.dataProvider.decorators.ignore
 * async getInternal() {}
 * }
 * ```
 *
 * WARNING: Do not copy and paste this example. The `@` symbol does not render correctly in JSDoc
 * code blocks, so a different unicode character was used. Please use a normal `@` when using a
 * decorator.
 */
const decorators = {
  ignore,
};

/**
 * Wrap a data provider engine to create a data provider that handles subscriptions for it.
 *
 * Note: This should only run locally when you have the data provider engine. The remote data
 * provider is pretty much just a network object
 *
 * WARNING: this function mutates the provided object. Its `notifyUpdate` and `set<data_type>`
 * methods are layered over to facilitate data provider subscriptions.
 *
 * @param dataProviderEngine Provider engine that handles setting and getting data as well as
 *   informing which listeners should get what updates
 * @param dataProviderPromise Promise to the data provider's network object
 * @param onDidUpdateEmitter Event emitter to use for informing subscribers of updates. The event
 *   just returns what set returns (should be true according to IDataProviderEngine)
 * @returns Data provider layering over the provided data provider engine
 */
function buildDataProvider<TDataTypes extends DataProviderDataTypes>(
  dataProviderEngine: IDataProviderEngine<TDataTypes>,
  dataProviderPromise: Promise<IDataProvider<TDataTypes>>,
  onDidUpdateEmitter: PapiEventEmitter<DataProviderUpdateInstructions<TDataTypes>>,
): DataProviderInternal<TDataTypes> {
  // Figure out the available get/set methods' data types
  const dataTypes = groupBy<string, 'get' | 'set' | 'other', DataTypeNames<TDataTypes>>(
    getAllObjectFunctionNames(dataProviderEngine),
    (fnName) => {
      // If the function was decorated with @ignore, do not consider it a special function
      // We don't care about types. We just want to check the decorator
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
      if ((dataProviderEngine as any)[fnName].isIgnored) return 'other';

      if (fnName.startsWith('get')) return 'get';
      if (fnName.startsWith('set')) return 'set';
      return 'other';
    },
    (fnName, fnType) => {
      // If it's not a get or a set, just return an empty string. We aren't planning to use this
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (fnType === 'other') return '' as DataTypeNames<TDataTypes>;

      // Grab the data type out of the function names
      return getDataProviderDataTypeFromFunctionName<TDataTypes>(fnName);
    },
  );

  // Validate that the data provider engine has matching get and set functions
  if (
    dataTypes.get('get')?.length !== dataTypes.get('set')?.length ||
    dataTypes.get('get')?.some((getDataType) => !dataTypes.get('set')?.includes(getDataType))
  )
    throw new Error('Data provider engine does not have matching get and set functions!');

  // Layer over data provider engine methods to give it control over emitting updates

  // Layer over the data provider engine's notifyUpdate with one that actually emits an update
  // or if the dpe doesn't have notifyUpdate, give it one
  const dpeNotifyUpdate = dataProviderEngine.notifyUpdate
    ? dataProviderEngine.notifyUpdate.bind(dataProviderEngine)
    : undefined;
  dataProviderEngine.notifyUpdate = (updateInstructions = true, ...args) => {
    // emit an update if updateInstructions indicate to do so
    const updateEventResult = mapUpdateInstructionsToUpdateEvent<TDataTypes>(
      updateInstructions,
      undefined,
    );
    // Run the data provider engine's original `notifyUpdate` with the update result before we send the update
    if (dpeNotifyUpdate) dpeNotifyUpdate(updateEventResult, ...args);
    if (updateEventResult) onDidUpdateEmitter.emit(updateEventResult);
  };

  // Layer over the data provider engine's set methods with set methods that actually emit an update
  // if they return true
  dataTypes.get('set')?.forEach((dataType) => {
    if (dataProviderEngine[`set${dataType}`]) {
      /* eslint-disable no-type-assertion/no-type-assertion */
      /** Saved bound version of the data provider engine's set so we can call it from here */
      const dpeSet = (
        dataProviderEngine[`set${dataType}`] as DataProviderSetter<TDataTypes, typeof dataType>
      ).bind(dataProviderEngine);
      /** Layered set that emits an update event after running the engine's set */
      (dataProviderEngine[`set${dataType}`] as DataProviderSetter<TDataTypes, typeof dataType>) =
        /* eslint-enable */
        async (...args) => {
          const dpeSetResult = await dpeSet(...args);
          const updateEventResult = mapUpdateInstructionsToUpdateEvent<TDataTypes>(
            dpeSetResult,
            dataType,
          );
          if (updateEventResult) onDidUpdateEmitter.emit(updateEventResult);
          return dpeSetResult;
        };
    }
  });

  // Layer over the data provider engine's dispose method to make sure its update emitter is
  // disposed when it is disposed.
  overrideDispose(dataProviderEngine, async () => onDidUpdateEmitter.dispose());

  return createDataProviderProxy(dataProviderEngine, dataProviderPromise, onDidUpdateEmitter.event);
}

/**
 * Creates a data provider to be shared on the network layering over the provided data provider
 * engine.
 *
 * @type `TSelector` - The type of selector used to get some data from this provider. A selector is
 *   an object a caller provides to the data provider to tell the provider what subset of data it
 *   wants. Note: A selector must be stringifiable.
 * @type `TData` - The type of data provided by this data provider based on a provided selector
 * @param providerName Name this data provider should be called on the network
 * @param dataProviderEngine The object to layer over with a new data provider object
 *
 *   WARNING: registering a dataProviderEngine mutates the provided object. Its `notifyUpdate` and
 *   `set` methods are layered over to facilitate data provider subscriptions.
 * @returns The data provider including control over disposing of it. Note that this data provider
 *   is a new object distinct from the data provider engine passed in.
 */
async function registerEngine<TDataTypes extends DataProviderDataTypes>(
  providerName: string,
  dataProviderEngine: IDataProviderEngine<TDataTypes>,
): Promise<IDisposableDataProvider<TDataTypes>> {
  await initialize();

  if (hasKnown(providerName))
    throw new Error(`Data provider with name ${providerName} is already registered`);

  // We are good to go! Create the data provider

  // Get the object id for this data provider name
  const dataProviderObjectId = getDataProviderObjectId(providerName);

  /**
   * Variable to hold a promise to the final data provider's network object so the local object can
   * reference the network object in its functions
   */
  const dataProviderVariable = new AsyncVariable<IDataProvider<TDataTypes>>(
    `DataProvider-${providerName}`,
  );

  // Create a networked update event
  const onDidUpdateEmitter = networkService.createNetworkEventEmitter<
    DataProviderUpdateInstructions<TDataTypes>
  >(serializeRequestType(dataProviderObjectId, ON_DID_UPDATE));

  // Build the data provider
  const dataProviderInternal = buildDataProvider(
    dataProviderEngine,
    dataProviderVariable.promise,
    onDidUpdateEmitter,
  );

  // Set up the data provider to be a network object so other processes can use it
  const disposableDataProvider: IDisposableDataProvider<TDataTypes> =
    await networkObjectService.set(dataProviderObjectId, dataProviderInternal);

  // Get the local network object proxy for the data provider so the provider can't be disposed
  // outside the service that registered the provider engine. Assert type without NetworkObject.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dataProvider = (await networkObjectService.get<IDataProvider<TDataTypes>>(
    dataProviderObjectId,
  )) as IDataProvider<TDataTypes>;

  // Update the dataProviderVariable so the internal data provider (specifically its subscribe
  // function) can access the dataProvider appropriately
  if (dataProvider) dataProviderVariable.resolveToValue(dataProvider);
  else throw Error(`Unable to get network object for data provider: ${dataProviderObjectId}`);

  return disposableDataProvider;
}

/**
 * Create a mock local data provider object for connecting to the remote data provider
 *
 * @param dataProviderObjectId Network object id corresponding to this data provider
 * @param dataProviderContainer Container that holds a reference to the data provider so this
 *   subscribe function can reference the data provider
 * @returns Local data provider object that represents a remote data provider
 */
// This generic type should be DataProviderInternal because we are making part of a local/internal data provider
function createLocalDataProviderToProxy<T extends DataProviderInternal>(
  dataProviderObjectId: string,
  // NetworkObject<DataProviderInternal> is our way to convert from DataProviderInternal to IDataProvider without specifying generics
  dataProviderPromise: Promise<NetworkObject<T>>,
): Partial<T> {
  // Create a networked update event
  const onDidUpdate = networkService.getNetworkEvent<boolean>(
    serializeRequestType(dataProviderObjectId, ON_DID_UPDATE),
  );
  // Assert to specified generic type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return createDataProviderProxy(undefined, dataProviderPromise, onDidUpdate) as Partial<T>;
}

/**
 * Get a data provider that has previously been set up
 *
 * @param providerName Name of the desired data provider
 * @returns The data provider with the given name if one exists, undefined otherwise
 */
// Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<T extends IDataProvider<any>>(providerName: string): Promise<T | undefined> {
  await initialize();

  // Get the object id for this data provider name
  const dataProviderObjectId = getDataProviderObjectId(providerName);

  // Get the network object for this data provider. Assert to specified generic type.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const dataProvider = (await networkObjectService.get<CannotHaveOnDidDispose & T>(
    dataProviderObjectId,
    createLocalDataProviderToProxy as LocalObjectToProxyCreator<CannotHaveOnDidDispose & T>,
  )) as T | undefined;
  /* eslint-enable */

  if (!dataProvider) {
    logger.info(`No data provider found with name = ${providerName}`);
    return undefined;
  }

  return dataProvider;
}

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface DataProviderService {
  hasKnown: typeof hasKnown;
  registerEngine: typeof registerEngine;
  get: typeof get;
  decorators: typeof decorators;
  DataProviderEngine: typeof DataProviderEngine;
}

/**
 * JSDOC SOURCE dataProviderService
 *
 * Service that allows extensions to send and receive data to/from other extensions
 */
const dataProviderService: DataProviderService = {
  hasKnown,
  registerEngine,
  get,
  decorators,
  DataProviderEngine,
};

export default dataProviderService;
