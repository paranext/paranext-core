import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import useEventAsync from '@renderer/hooks/papi-hooks/use-event-async.hook';
import useDataProvider from '@renderer/hooks/papi-hooks/use-data-provider.hook';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiHooks {
  usePromise: typeof usePromise;
  useEvent: typeof useEvent;
  useEventAsync: typeof useEventAsync;
  useDataProvider: typeof useDataProvider;
  // It's hacky to copy the comments here, but there is something weird about `useData` that keeps
  // comments from propagating like everything else. Maybe it's because `useData` is an object
  // while the others are functions or arrow functions.
  // **** Keep these comments in sync with the comments in use-data.hook.ts ****
  /**
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
  useData: typeof useData;
}

/** All React hooks to be exposed on the papi */
const papiHooks: PapiHooks = {
  usePromise,
  useEvent,
  useEventAsync,
  useDataProvider,
  useData,
};

export default papiHooks;
