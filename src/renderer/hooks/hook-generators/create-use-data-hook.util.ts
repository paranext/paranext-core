import {
  DataProviderSetter,
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
  DataTypeNames,
} from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
import { useEventAsync } from 'platform-bible-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  EventRollingTimeCounter,
  isString,
  PlatformEventAsync,
  PlatformEventHandler,
} from 'platform-bible-utils';
import { ExtractDataProviderDataTypes } from '@shared/models/extract-data-provider-data-types.model';
import { logger } from '@shared/services/logger.service';

/**
 * The final function called as part of the `useData` hook that is the actual React hook
 *
 * This is the `.Greeting(...)` part of `useData('helloSomeone.people').Greeting(...)`
 */
type UseDataFunctionWithProviderType<
  // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TDataProvider extends IDataProvider<any>,
  TDataType extends keyof ExtractDataProviderDataTypes<TDataProvider>,
> = (
  selector: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['selector'],
  defaultValue: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['getData'],
  subscriberOptions?: DataProviderSubscriberOptions,
) => [
  ExtractDataProviderDataTypes<TDataProvider>[TDataType]['getData'],
  (
    | ((
        newData: ExtractDataProviderDataTypes<TDataProvider>[TDataType]['setData'],
      ) => Promise<DataProviderUpdateInstructions<ExtractDataProviderDataTypes<TDataProvider>>>)
    | undefined
  ),
  boolean,
];

/**
 * A proxy that serves the actual hooks for a single data provider
 *
 * This is the `useData('helloSomeone.people')` part of
 * `useData('helloSomeone.people').Greeting(...)`
 */
// Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseDataProxy<TDataProvider extends IDataProvider<any>> = {
  [TDataType in keyof ExtractDataProviderDataTypes<TDataProvider>]: UseDataFunctionWithProviderType<
    TDataProvider,
    TDataType
  >;
};

/**
 * React hook to use data provider data with various data types
 *
 * @example `useData('helloSomeone.people').Greeting('Bill', 'Greeting loading')`
 *
 * @type `TDataProvider` - The type of data provider to get. Use
 *   `IDataProvider<TDataProviderDataTypes>`, specifying your own types, or provide a custom data
 *   provider type
 */
type UseDataHookGeneric<TUseDataProviderParams extends unknown[]> = {
  <
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    ...args: TUseDataProviderParams
  ): UseDataProxy<TDataProvider>;
};

/**
 * Create a `useData(...).DataType(selector, defaultValue, options)` hook for a specific subset of
 * data providers as supported by `useDataProviderHook`
 *
 * @param useDataProviderHook Hook that gets a data provider from a specific subset of data
 *   providers
 * @returns `useData` hook for getting data from a data provider
 */
export function createUseDataHook<TUseDataProviderParams extends unknown[]>(
  useDataProviderHook: (...args: TUseDataProviderParams) => IDataProvider | undefined,
): UseDataHookGeneric<TUseDataProviderParams> {
  function createUseDataHookForDataProviderInternal<
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    dataType: keyof ExtractDataProviderDataTypes<TDataProvider>,
    ...args: TUseDataProviderParams
  ): UseDataFunctionWithProviderType<TDataProvider, typeof dataType> {
    return <
      TDataTypes extends ExtractDataProviderDataTypes<TDataProvider>,
      TDataType extends typeof dataType,
    >(
      selector: TDataTypes[TDataType]['selector'],
      defaultValue: TDataTypes[TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ): [
      TDataTypes[TDataType]['getData'],
      (
        | ((
            newData: TDataTypes[TDataType]['setData'],
          ) => Promise<DataProviderUpdateInstructions<TDataTypes>>)
        | undefined
      ),
      boolean,
    ] => {
      // 100+ renders within 1 second is an arbitrary threshold based on observing a dev environment
      const maxRenderRollingCount = 100;
      const minRenderRollingTimeMs = 1000;
      const renderCountRef = useRef(new EventRollingTimeCounter(maxRenderRollingCount));
      const tooManyRenders = useRef(false);
      useEffect(() => {
        renderCountRef.current.recordInstance();
        if (renderCountRef.current.hasViolatedThreshold(minRenderRollingTimeMs)) {
          logger.warn(
            `Data of type ${String(dataType)} was updated ${maxRenderRollingCount} times in the last ${minRenderRollingTimeMs} milliseconds. Please ensure hook calls and their parameters are memoized.`,
          );
          tooManyRenders.current = true;
        }
      });

      if (tooManyRenders.current) {
        return [defaultValue, undefined, false];
      }

      // Use subscriberOptions as a ref so it doesn't update dependency arrays
      const subscriberOptionsRef = useRef(subscriberOptions);
      subscriberOptionsRef.current = subscriberOptions;

      // The data from the data provider at this selector
      const [data, setDataInternal] = useState<TDataTypes[TDataType]['getData']>(defaultValue);

      // Get the data provider for this data provider name
      const dataProvider = useDataProviderHook(...args);

      // Indicates if the data with the selector is awaiting retrieval from the data provider
      const [isLoading, setIsLoading] = useState<boolean>(true);

      // Wrap subscribe so we can call it as a normal PapiEvent in useEvent
      const wrappedSubscribeEvent:
        | PlatformEventAsync<TDataTypes[TDataType]['getData']>
        | undefined = useMemo(
        () =>
          dataProvider
            ? async (eventCallback: PlatformEventHandler<TDataTypes[TDataType]['getData']>) => {
                const unsub =
                  // We need any here because for some reason IDataProvider loses its ability to
                  // index subscribe. Assert to specified generic type.
                  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion */
                  await (
                    (dataProvider as any)[
                      `subscribe${dataType as DataTypeNames<TDataTypes>}`
                    ] as DataProviderSubscriber<TDataTypes[TDataType]>
                  )(
                    /* eslint-enable */
                    selector,
                    (subscriptionData: TDataTypes[TDataType]['getData']) => {
                      eventCallback(subscriptionData);
                      // When we receive updated data, mark that we are not loading
                      setIsLoading(false);
                    },
                    subscriberOptionsRef.current,
                  );

                return async () => {
                  // When we change data type or selector, mark that we are loading
                  setIsLoading(true);
                  return unsub();
                };
              }
            : undefined,
        [dataProvider, selector],
      );

      // Subscribe to the data provider
      useEventAsync(wrappedSubscribeEvent, setDataInternal);

      // TODO: cache latest setStateAction and fire until we have dataProvider instead of having setData be undefined until we have dataProvider?
      /**
       * Send an update to the backend to update the data. Let the update handle actually updating
       * our data here
       */
      const setData = useMemo(
        () =>
          dataProvider
            ? async (newData: TDataTypes[TDataType]['setData']) =>
                // We need any here because for some reason IDataProvider loses its ability to index
                // subscribe. Assert to specified generic type.
                /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion */
                (
                  (dataProvider as any)[
                    `set${dataType as DataTypeNames<TDataTypes>}`
                  ] as DataProviderSetter<TDataTypes, typeof dataType>
                )(
                  /* eslint-enable */
                  selector,
                  newData,
                )
            : undefined,
        [dataProvider, selector],
      );

      return [data, setData, isLoading];
    };
  }

  // People can make whatever data hook they want. We don't have type information here
  /**
   * "Map" of useDataProviderHook `args` to use data provider hook proxy
   *
   * Every entry in this array is an array consisting of `[args, proxy]` where every time we look
   * for an existing proxy, we look for a entry whose `args` array contents match the contents of
   * the `args` passed into the function. Essentially we are mapping based on all the args combined
   * into one
   */
  const useDataCachedHooks: [TUseDataProviderParams, UseDataProxy<IDataProvider>][] = [];

  const useData: UseDataHookGeneric<TUseDataProviderParams> = <
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    ...args: TUseDataProviderParams
  ) => {
    // Look for an existing proxy with the same args as passed in
    const existingProxyEntry = useDataCachedHooks.find(([cacheArgs]) => {
      if (args.length !== cacheArgs.length) return false;

      if (args.some((arg, i) => arg !== cacheArgs[i])) return false;

      return true;
    });
    if (existingProxyEntry) return existingProxyEntry[1];

    // Did not find an existing proxy, so create one
    // The object has nothing in it, but it's about to be proxied to have stuff
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const useDataHooksForProvider = {} as UseDataProxy<TDataProvider>;
    const useDataProxy = new Proxy(useDataHooksForProvider, {
      get(obj, prop) {
        // Pass promises through. Assert type of `prop` to index `obj`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (prop === 'then') return obj[prop as keyof typeof obj];

        // Special react prop to tell if it's a component
        if (prop === '$$typeof') return undefined;

        // If we have already generated the hook, return the cached version
        if (prop in useDataHooksForProvider)
          // Assert type of `prop` to index `useDataHooksForProvider`.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return useDataHooksForProvider[prop as keyof typeof useDataHooksForProvider];

        // Build a new useData hook
        if (!isString(prop)) throw new Error('Must provide a string to the useData hook proxy');

        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const dataType = prop as keyof ExtractDataProviderDataTypes<TDataProvider>;

        const newHook = createUseDataHookForDataProviderInternal(dataType, ...args);

        // Save the hook in the cache to be used later
        useDataHooksForProvider[dataType] = newHook;

        return newHook;
      },
      set() {
        // Doing this makes no sense
        throw new Error('Cannot set useData hook');
      },
    });

    useDataCachedHooks.push([args, useDataProxy]);
    return useDataProxy;
  };
  return useData;
}

export default createUseDataHook;
