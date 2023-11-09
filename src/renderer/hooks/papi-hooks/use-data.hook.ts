import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import createUseDataHook from '@renderer/hooks/hook-generators/create-use-data-hook.util';
import IDataProvider from '@shared/models/data-provider.interface';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { DataProviderNames, DataProviderTypes, DataProviders } from 'papi-shared-types';

/**
 * React hook to use data from a data provider
 *
 * @example `useData('helloSomeone.people').Greeting('Bill', 'Greeting loading')`
 */
type UseDataHook = {
  <DataProviderName extends DataProviderNames>(
    dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
  ): {
    [TDataType in keyof DataProviderTypes[DataProviderName]]: (
      // @ts-expect-error TypeScript pretends it can't find `selector`, but it works just fine
      selector: DataProviderTypes[DataProviderName][TDataType]['selector'],
      // @ts-expect-error TypeScript pretends it can't find `getData`, but it works just fine
      defaultValue: DataProviderTypes[DataProviderName][TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ) => [
      // @ts-expect-error TypeScript pretends it can't find `getData`, but it works just fine
      DataProviderTypes[DataProviderName][TDataType]['getData'],
      (
        | ((
            // @ts-expect-error TypeScript pretends it can't find `setData`, but it works just fine
            newData: DataProviderTypes[DataProviderName][TDataType]['setData'],
          ) => Promise<DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>>)
        | undefined
      ),
      boolean,
    ];
  };
};

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this object. JSDoc does not usually allow these on the object. One day, we may be able to
// put this comment on an actual function, so we can fix the comments back to using real @
/**
 * ```typescript
 * useData<DataProviderName extends DataProviderNames>(
 *     dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
 *   ).DataType(
 *       selector: DataProviderTypes[DataProviderName][DataType]['selector'],
 *       defaultValue: DataProviderTypes[DataProviderName][DataType]['getData'],
 *       subscriberOptions?: DataProviderSubscriberOptions,
 *     ) => [
 *       DataProviderTypes[DataProviderName][DataType]['getData'],
 *       (
 *         | ((
 *             newData: DataProviderTypes[DataProviderName][DataType]['setData'],
 *           ) => Promise<DataProviderUpdateInstructions<DataProviderTypes[DataProviderName]>>)
 *         | undefined
 *       ),
 *       boolean,
 *     ]
 * ```
 *
 * React hook to use data from a data provider. Subscribes to run a callback on a data provider's
 * data with specified selector on the specified data type that data provider serves.
 *
 * Usage: Specify the data provider and the data type on the data provider with
 * `useData('<data_provider>').<data_type>` and use like any other React hook.
 *
 * _＠example_ Subscribing to Verse data at JHN 11:35 on the `'quickVerse.quickVerse'` data provider:
 *
 * ```typescript
 * const [verseText, setVerseText, verseTextIsLoading] = useData('quickVerse.quickVerse').Verse(
 *   'JHN 11:35',
 *   'Verse text goes here',
 * );
 * ```
 *
 * _＠param_ `dataProviderSource` string name of data provider to get OR dataProvider (result of
 * useDataProvider if you want to consolidate and only get the data provider once)
 *
 * _＠param_ `selector` tells the provider what data this listener is listening for
 *
 * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 * updated every render
 *
 * _＠param_ `defaultValue` the initial value to return while first awaiting the data
 *
 * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 * updated every render
 *
 * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
 *
 * WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference
 * must not be updated every render
 *
 * _＠returns_ `[data, setData, isLoading]`
 *
 * - `data`: the current value for the data from the data provider with the specified data type and
 *   selector, either the defaultValue or the resolved data
 * - `setData`: asynchronous function to request that the data provider update the data at this data
 *   type and selector. Returns true if successful. Note that this function does not update the
 *   data. The data provider sends out an update to this subscription if it successfully updates
 *   data.
 * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data
 *   provider
 */
// Assert the more general and more specific types.
/* eslint-disable no-type-assertion/no-type-assertion */
const useData = createUseDataHook(
  useDataProvider as (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
) as UseDataHook;
/* eslint-enable */

export default useData;
