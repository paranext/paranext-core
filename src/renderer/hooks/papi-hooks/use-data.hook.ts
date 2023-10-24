import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import createUseDataHook, {
  UseDataHook,
} from '@renderer/hooks/hook-generators/create-use-data-hook.util';

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this object. JSDoc does not usually allow these on the object. One day, we may be able to
// put this comment on an actual function, so we can fix the comments back to using real @
/** JSDOC SOURCE UseDataHook
 * ```typescript
 * useData.DataType<TDataTypes extends DataProviderDataTypes, TDataType extends keyof TDataTypes>(
 *   dataProviderSource: string | IDataProvider<TDataTypes> | undefined,
 *   selector: TDataTypes[TDataType]['selector'],
 *   defaultValue: TDataTypes[TDataType]['getData'],
 *   subscriberOptions?: DataProviderSubscriberOptions,
 * ): [
 *   TDataTypes[TDataType]['getData'],
 *   (
 *     | ((
 *         newData: TDataTypes[TDataType]['setData'],
 *       ) => Promise<DataProviderUpdateInstructions<TDataTypes>>)
 *     | undefined
 *   ),
 *   boolean,
 * ]
 * ```
 *
 * Special React hook that subscribes to run a callback on a data provider's data with specified
 * selector on any data type that data provider serves.
 *
 * Usage: Specify the data type on the data provider with `useData.<data_type>` and use like any other
 * React hook. Specify the generic types in order to receive type support from Intellisense. For
 * example, `useData.Verse<QuickVerseDataTypes, 'Verse'>` lets you subscribe to verses from a data
 * provider that serves `QuickVerseDataTypes`.
 *
 * *＠example* When subscribing to JHN 11:35 on the `'quickVerse.quickVerse'` data provider, we need
 * to tell the useData.Verse hook what types we are using, so we use the `QuickVerseDataTypes` data
 * types and specify that we are using the `'Verse'` data type as follows:
 * ```typescript
 * const [verseText, setVerseText, verseTextIsLoading] = useData.Verse<QuickVerseDataTypes, 'Verse'>(
 *   'quickVerse.quickVerse',
 *   'JHN 11:35',
 *   'Verse text goes here',
 * );
 * ```
 *
 * *＠param* `dataProviderSource` string name of data provider to get OR dataProvider (result of useDataProvider if you
 * want to consolidate and only get the data provider once)
 *
 * *＠param* `selector` tells the provider what data this listener is listening for
 *
 * *＠param* `defaultValue` the initial value to return while first awaiting the data
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 *
 * *＠param* `subscriberOptions` various options to adjust how the subscriber emits updates
 *
 *    WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 *
 * *＠returns* `[data, setData, isLoading]`
 *  - `data`: the current value for the data from the data provider with the specified data type and selector, either the defaultValue or the resolved data
 *  - `setData`: asynchronous function to request that the data provider update the data at this data type and selector. Returns true if successful.
 *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
 *  - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data provider
 *
 * *＠type* `TDataTypes` - the data provider data types served by the data provider whose data to use.
 *
 * *＠type* `TDataType` - the specific data type on this data provider that you want to use. Must match
 * the data type specified in `useData.<data_type>`
 */
const useData: UseDataHook = createUseDataHook(useDataProvider);

export default useData;
