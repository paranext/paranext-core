import IDataProvider, {
  DataProviderSubscriberOptions,
} from '@shared/models/IDataProvider';
import useEventAsync from '@renderer/hooks/papi-hooks/useEventAsync';
import { useMemo, useState } from 'react';
import { PEventAsync, PEventHandler } from '@shared/models/PEvent';
import useDataProvider from '@renderer/hooks/papi-hooks/useDataProvider';

/**
 * Subscribes to run a callback on a data provider's data with specified selector
 * @param dataProviderSource string data type to get data provider for OR [dataProvider, isDisposed] result of useDataProvider if you
 * want to consolidate and only get the data provider once.
 * @param selector tells the provider what data this listener is listening for
 * @param defaultValue the initial value to return while first awaiting the data
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 * @param subscriberOptions various options to adjust how the subscriber emits updates
 *
 *    WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 * @returns [data, setData, isLoading]
 *  - `data`: the current value for the data from the data provider with the specified selector, either the defaultValue or the resolved data
 *  - `setData`: asynchronous function to request that the data provider update the data at this selector. Returns true if successful.
 *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
 *  - `isLoading`: whether the data with the selector is awaiting retrieval from the data provider
 */
function useData<TSelector, TGetData, TSetData>(
  dataType: string | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
function useData<TSelector, TGetData, TSetData>(
  dataProvider:
    | [IDataProvider<TSelector, TGetData, TSetData> | undefined, boolean]
    | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
function useData<TSelector, TGetData, TSetData>(
  dataProviderSource:
    | string
    | [IDataProvider<TSelector, TGetData, TSetData> | undefined, boolean]
    | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean] {
  // The data from the data provider at this selector
  const [data, setDataInternal] = useState<TGetData>(defaultValue);

  // Get the data provider info for this data type
  const [dataProvider, isDisposed] =
    useDataProvider<IDataProvider<TSelector, TGetData, TSetData>>(
      dataProviderSource,
    );

  // Indicates if the data with the selector is awaiting retrieval from the data provider
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Wrap subscribe so we can call it as a normal PEvent in useEvent
  const wrappedSubscribeEvent: PEventAsync<TGetData> | undefined = useMemo(
    () =>
      dataProvider && !isDisposed
        ? async (eventCallback: PEventHandler<TGetData>) => {
            const unsub = await dataProvider.subscribe(
              selector,
              (subscriptionData) => {
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
    [dataProvider, selector, subscriberOptions, isDisposed],
  );

  // Subscribe to the data provider
  useEventAsync(wrappedSubscribeEvent, setDataInternal);

  // TODO: cache latest setStateAction and fire until we have dataProvider instead of having setData be undefined until we have dataProvider?
  /** Send an update to the backend to update the data. Let the update handle actually updating our data here */
  const setData = useMemo(
    () =>
      dataProvider && !isDisposed
        ? async (newData: TSetData) => dataProvider.set(selector, newData)
        : undefined,
    [dataProvider, selector, isDisposed],
  );

  return [data, setData, isLoading];
}

export default useData;
