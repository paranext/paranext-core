/**
 * Handles registering data providers and serving data around the papi.
 * Exposed on the papi.
 */

import {
  DataProviderInfo,
  DisposableDataProviderInfo,
} from '@shared/models/DataProviderInfo';
import IDataProvider from '@shared/models/IDataProvider';
import * as NetworkService from '@shared/services/NetworkService';
import networkObjectService from './NetworkObjectService';

/** Suffix on network objects that indicates that the network object is a data provider */
const DATA_PROVIDER_LABEL = 'data';

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

/**
 * Register a data provider to be shared on the network
 * @param dataType type of data that this provider will serve
 * @param dataProvider the object to set up as a data provider
 * @returns information about the data provider including control over disposing of it
 */
async function register<TData, TSelector>(
  dataType: string,
  dataProvider: IDataProvider<TData, TSelector>,
): Promise<DisposableDataProviderInfo<TData, TSelector>> {
  await initialize();
  if (await has(dataType))
    throw new Error(
      `Data provider with type ${dataType} is already registered`,
    );

  // TODO: validate that the dataProvider actually has the things it needs

  const networkObjectInfo = await networkObjectService.set(
    buildDataProviderObjectId(dataType),
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
 * @param dataType type of data that this provider will serve
 * @returns information about the data provider with the specified type if one exists, undefined otherwise
 */
async function get<TData, TSelector>(
  dataType: string,
): Promise<DataProviderInfo<TData, TSelector> | undefined> {
  await initialize();

  const networkObjectInfo = await networkObjectService.get<
    IDataProvider<TData, TSelector>
  >(buildDataProviderObjectId(dataType));

  if (!networkObjectInfo) return undefined;

  return {
    dataProvider: networkObjectInfo.networkObject,
    onDidDispose: networkObjectInfo.onDidDispose,
  };
}

const dataProviderService = {
  has,
  register,
  get,
};

export default dataProviderService;
