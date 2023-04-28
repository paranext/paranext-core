import { DataProviderSubscriberOptions } from '@shared/models/data-provider.interface';
import { DataProvider } from '@shared/models/data-provider.model';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import { useMemo, useState } from 'react';
import { PapiEventAsync, PapiEventHandler } from '@shared/models/papi-event.model';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';

/**
 * Subscribes to run a callback on a data provider's data with specified selector
 * @param providerName name of the data provider to subscribe to
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
  providerName: string | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
/**
 * Subscribes to run a callback on a data provider's data with specified selector
 * @param dataProvider result of useDataProvider if you want to consolidate and only get the data provider once
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
  dataProvider: DataProvider<TSelector, TGetData, TSetData> | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean];
/**
 * @param dataProviderSource string name of data provider to get OR dataProvider (result of useDataProvider if you
 * want to consolidate and only get the data provider once)
 */
function useData<TSelector, TGetData, TSetData>(
  dataProviderSource: string | DataProvider<TSelector, TGetData, TSetData> | undefined,
  selector: TSelector,
  defaultValue: TGetData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TGetData, ((newData: TSetData) => Promise<boolean>) | undefined, boolean] {
  // The data from the data provider at this selector
  const [data, setDataInternal] = useState<TGetData>(defaultValue);

  // Get the data provider for this data provider name
  const dataProvider =
    useDataProvider<DataProvider<TSelector, TGetData, TSetData>>(dataProviderSource);

  // Indicates if the data with the selector is awaiting retrieval from the data provider
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Wrap subscribe so we can call it as a normal PapiEvent in useEvent
  const wrappedSubscribeEvent: PapiEventAsync<TGetData> | undefined = useMemo(
    () =>
      dataProvider
        ? async (eventCallback: PapiEventHandler<TGetData>) => {
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
    [dataProvider, selector, subscriberOptions],
  );

  // Subscribe to the data provider
  useEventAsync(wrappedSubscribeEvent, setDataInternal);

  // TODO: cache latest setStateAction and fire until we have dataProvider instead of having setData be undefined until we have dataProvider?
  /** Send an update to the backend to update the data. Let the update handle actually updating our data here */
  const setData = useMemo(
    () =>
      dataProvider ? async (newData: TSetData) => dataProvider.set(selector, newData) : undefined,
    [dataProvider, selector],
  );

  return [data, setData, isLoading];
}

export default useData;
