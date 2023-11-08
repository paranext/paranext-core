import {
  DataProviderSetter,
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
  DataTypeNames,
} from '@shared/models/data-provider.model';
import IDataProvider from '@shared/models/data-provider.interface';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import { useMemo, useState } from 'react';
import { PapiEventAsync, PapiEventHandler } from '@shared/models/papi-event.model';
import { isString } from '@shared/utils/util';
import ExtractDataProviderDataTypes from '@shared/models/extract-data-provider-data-types.model';

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
type UseDataHookGeneric = {
  <
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    dataProviderSource: string | TDataProvider | undefined,
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
function createUseDataHook(
  useDataProviderHook: (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
): UseDataHookGeneric {
  function createUseDataHookForDataProviderInternal<
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    dataProviderSource: string | TDataProvider | undefined,
    dataType: keyof ExtractDataProviderDataTypes<TDataProvider>,
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
      // The data from the data provider at this selector
      const [data, setDataInternal] = useState<TDataTypes[TDataType]['getData']>(defaultValue);

      // Get the data provider for this data provider name
      const dataProvider = useDataProviderHook(
        // Type assertion needed because useDataProviderHook will have different generic types
        // based on which hook we are generating, but they will all be returning an IDataProvider
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        dataProviderSource as string | IDataProvider | undefined,
      );

      // Indicates if the data with the selector is awaiting retrieval from the data provider
      const [isLoading, setIsLoading] = useState<boolean>(true);

      // Wrap subscribe so we can call it as a normal PapiEvent in useEvent
      const wrappedSubscribeEvent: PapiEventAsync<TDataTypes[TDataType]['getData']> | undefined =
        useMemo(
          () =>
            dataProvider
              ? async (eventCallback: PapiEventHandler<TDataTypes[TDataType]['getData']>) => {
                  const unsub =
                    // We need any here because for some reason IDataProvider loses its ability to
                    // index subscribe. Assert to specified generic type.
                    /* eslint-disable @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion */
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
                      subscriberOptions,
                    );

                  return async () => {
                    // When we change data type or selector, mark that we are loading
                    setIsLoading(true);
                    return unsub();
                  };
                }
              : undefined,
          [dataProvider, selector, subscriberOptions],
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
                /* eslint-disable @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion */
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
  /** Map of Data Provider Source to use data provider hook proxy */
  const useDataCachedHooks = new Map<
    string | IDataProvider | undefined,
    UseDataProxy<IDataProvider>
  >();

  const useData: UseDataHookGeneric = <
    // Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TDataProvider extends IDataProvider<any>,
  >(
    dataProviderSource: string | TDataProvider | undefined,
  ) => {
    if (useDataCachedHooks.has(dataProviderSource))
      // We just determined that it exists, so assert that it is not `undefined`
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return useDataCachedHooks.get(dataProviderSource)!;

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

        const newHook = createUseDataHookForDataProviderInternal(dataProviderSource, dataType);

        // Save the hook in the cache to be used later
        useDataHooksForProvider[dataType] = newHook;

        return newHook;
      },
      set() {
        // Doing this makes no sense
        throw new Error('Cannot set useData hook');
      },
    });

    useDataCachedHooks.set(dataProviderSource, useDataProxy);
    return useDataProxy;
  };
  return useData;
}

export default createUseDataHook;
