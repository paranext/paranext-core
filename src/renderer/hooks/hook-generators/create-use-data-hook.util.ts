import {
  DataProviderDataTypes,
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

/**
 * Proxy object that provides hooks to use data provider data with various data types
 *
 * @example `useData.Greeting<PeopleDataTypes, 'Greeting'>(...)`
 *
 * @type `TDataTypes` - the data provider data types served by the data provider whose data to use.
 * @type `TDataType` - the specific data type on this data provider that you want to use. Must match
 * the data type specified in `useData.<data_type>`
 */
export type UseDataHook = {
  [DataType in string]: <
    TDataTypes extends DataProviderDataTypes,
    TDataType extends keyof TDataTypes,
  >(
    dataProviderSource: string | IDataProvider<TDataTypes> | undefined,
    selector: TDataTypes[TDataType]['selector'],
    defaultValue: TDataTypes[TDataType]['getData'],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [
    TDataTypes[TDataType]['getData'],
    (
      | ((
          newData: TDataTypes[TDataType]['setData'],
        ) => Promise<DataProviderUpdateInstructions<TDataTypes>>)
      | undefined
    ),
    boolean,
  ];
};

function createUseDataHook(
  useDataProviderHook: (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
): UseDataHook {
  function createUseDataHookForDataTypeInternal(dataType: string) {
    return <TDataTypes extends DataProviderDataTypes, TDataType extends typeof dataType>(
      dataProviderSource: string | IDataProvider<TDataTypes> | undefined,
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
                    await // We need any here because for some reason IDataProvider loses its ability to index subscribe
                    (
                      (
                        dataProvider as /* eslint-disable @typescript-eslint/no-explicit-any */ any
                      ) /* eslint-enable */[
                        `subscribe${dataType as DataTypeNames<TDataTypes>}`
                      ] as DataProviderSubscriber<TDataTypes[TDataType]>
                    )(
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
      /** Send an update to the backend to update the data. Let the update handle actually updating our data here */
      const setData = useMemo(
        () =>
          dataProvider
            ? async (newData: TDataTypes[TDataType]['setData']) =>
                // We need any here because for some reason IDataProvider loses its ability to index subscribe
                (
                  (dataProvider as /* eslint-disable @typescript-eslint/no-explicit-any */ any)[
                    /* eslint-enable */ `set${dataType as DataTypeNames<TDataTypes>}`
                  ] as DataProviderSetter<TDataTypes, typeof dataType>
                )(selector, newData)
            : undefined,
        [dataProvider, selector],
      );

      return [data, setData, isLoading];
    };
  }

  // People can make whatever data hook they want
  const useDataCachedHooks: UseDataHook = {};

  const useData: UseDataHook = new Proxy(useDataCachedHooks, {
    get(obj, prop) {
      // Pass promises through
      if (prop === 'then') return obj[prop as keyof typeof obj];

      // Special react prop to tell if it's a component
      if (prop === '$$typeof') return undefined;

      // If we have already generated the hook, return the cached version
      if (prop in useDataCachedHooks)
        return useDataCachedHooks[prop as keyof typeof useDataCachedHooks];

      // Build a new useData hook
      if (!isString(prop)) throw new Error('Must provide a string to the useData hook proxy');

      const newHook = createUseDataHookForDataTypeInternal(prop);

      // Save the hook in the cache to be used later
      useDataCachedHooks[prop as keyof typeof useDataCachedHooks] = newHook;

      return newHook;
    },
    set() {
      // Doing this makes no sense
      throw new Error('Cannot set useData hook');
    },
  });
  return useData;
}

export default createUseDataHook;
