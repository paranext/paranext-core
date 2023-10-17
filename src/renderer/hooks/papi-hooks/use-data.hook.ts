import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import createUseDataHook, {
  UseDataHook,
} from '@renderer/hooks/hook-generators/create-use-data-hook.utils';

createUseDataHook(useDataProvider);

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this object. JSDoc does not usually allow these on the object. One day, we may be able to
// put this comment on an actual function, so we can fix the comments back to using real @
/** JSDOC SOURCE UseDataHook
 * Special React hook that subscribes to run a callback on a data provider's data with specified
 * selector on any data type that data provider serves.
 *
 * Usage: Specify the data type on the data provider with `useData.<data_type>` and use like any other
 * React hook. For example, `useData.Verse` lets you subscribe to verses from a data provider.
 *
 * ＠example When subscribing to JHN 11:35 on the `'quickVerse.quickVerse'` data provider, we need
 * to tell the useData.Verse hook what types we are using, so we use the QuickVerseDataTypes and specify
 * that we are using the 'Verse' data types as follows:
 * ```typescript
 * const [verseText, setVerseText, verseTextIsLoading] = useData.Verse<QuickVerseDataTypes, 'Verse'>(
 *   'quickVerse.quickVerse',
 *   'JHN 11:35',
 *   'Verse text goes here',
 * );
 * ```
 *
 * ＠param `dataProviderSource` string name of data provider to get OR dataProvider (result of useDataProvider if you
 * want to consolidate and only get the data provider once)
 *
 * ＠param `selector` tells the provider what data this listener is listening for
 *
 * ＠param `defaultValue` the initial value to return while first awaiting the data
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 *
 * ＠param `subscriberOptions` various options to adjust how the subscriber emits updates
 *
 *    WARNING: If provided, MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 * ＠returns `[data, setData, isLoading]`
 *  - `data`: the current value for the data from the data provider with the specified data type and selector, either the defaultValue or the resolved data
 *  - `setData`: asynchronous function to request that the data provider update the data at this data type and selector. Returns true if successful.
 *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
 *  - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data provider
 */
const useData: UseDataHook = createUseDataHook(useDataProvider);

export default useData;
