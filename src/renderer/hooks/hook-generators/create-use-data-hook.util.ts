// Two functions here — `useRunawayLoopGuard` and the generated `useDataForDataProvider` — are
// covered by `react-hooks/rules-of-hooks` only because of their names: the rule analyzes functions
// named `use*` or PascalCase and ignores everything else. Renaming either, or replacing it with an
// anonymous arrow, silently turns hook-order linting off for its body, which is the class of bug
// `adr-runaway-data-hook-guard` records.
import {
  DataProviderSetter,
  DataProviderSubscriber,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
  DataTypeNames,
} from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
import { useEventAsync } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  EventRollingTimeCounter,
  isString,
  newPlatformError,
  PlatformError,
  PlatformEventAsync,
  PlatformEventHandler,
  RESOURCE_EXHAUSTED,
  slice,
  stringLength,
} from 'platform-bible-utils';
import { ExtractDataProviderDataTypes } from '@shared/models/extract-data-provider-data-types.model';
import { logger } from '@shared/services/logger.service';

/**
 * Events of one kind within {@link RUNAWAY_WINDOW_MS} that trip the runaway guard. The threshold is
 * arbitrary, chosen by observing a dev environment; the guard trips ON this many events, so this
 * many is one more than it tolerates.
 */
export const RUNAWAY_EVENTS_PER_WINDOW = 100;
/** Rolling window the runaway guard measures over */
export const RUNAWAY_WINDOW_MS = 1000;
/**
 * How long the guard stays tripped before it re-arms and resubscribes. Long enough that a genuine
 * loop is throttled to a small fraction of its free-running rate, short enough that a legitimate
 * burst — a Send/Receive or bulk import — heals without the user closing the tab. See
 * `adr-runaway-data-hook-guard` for why the trip expires rather than latching.
 */
export const RUNAWAY_COOLDOWN_MS = 5000;

/** The two loop shapes {@link useRunawayLoopGuard} watches, counted independently */
type RunawayCounters = {
  deliveries: EventRollingTimeCounter;
  subscribes: EventRollingTimeCounter;
};

/**
 * Detects a runaway loop in a single `useData` subscription.
 *
 * A runaway shows up as one of two distinct loops, and watching only one misses the other:
 *
 * - Delivery loop: delivery -> re-render -> delivery. Counted per delivery applied.
 * - Resubscribe loop: an unstable selector or data provider gives the subscribe memo a new identity
 *   every render, so the subscription is torn down and rebuilt continuously. Its emissions are
 *   muted by `useEventAsync` because each subscription is superseded before it resolves, so no
 *   delivery is ever counted — this loop is invisible to delivery counting alone, and it is the
 *   loop the warning's "memoize your parameters" advice actually describes.
 *
 * Renders are deliberately NOT counted — a busy consumer is not a broken one. A trip lasts
 * {@link RUNAWAY_COOLDOWN_MS} and then re-arms, on a timer rather than on selector or data provider
 * change: an unstable selector, the very mistake being reported, gets a new identity every render,
 * so re-arming on it would disarm the guard entirely. `adr-runaway-data-hook-guard` records the
 * alternatives behind both choices.
 *
 * The warning text and the `PlatformError` message it produces are developer-facing English and are
 * deliberately NOT localized: they name a data type and prescribe a code fix (memoize the
 * parameters) for whoever is debugging the loop. Do not send them to translators, and do not render
 * them to users as-is — a consumer that wants to say something to the user should recognize the
 * error by its `RESOURCE_EXHAUSTED` code and supply its own localized text.
 *
 * @param dataType Data type name, used to name the offending hook in the warning
 * @param describeDataTypeForWarning Optional. Called only when the guard trips, to name the
 *   offending hook more precisely than `dataType` can on its own - some data providers expose
 *   unnamed data types, so the name alone identifies nothing. Defaults to `dataType`.
 * @returns `recordDelivery` and `recordSubscribe`, each called once per event of that kind and
 *   returning whether the caller may proceed; and `runawayError`, set while the guard is tripped
 */
function useRunawayLoopGuard(
  dataType: string,
  describeDataTypeForWarning?: () => string,
): {
  recordDelivery: () => boolean;
  recordSubscribe: () => boolean;
  runawayError: PlatformError | undefined;
} {
  const countersRef = useRef<RunawayCounters | undefined>(undefined);
  // Built on first use rather than per render, and read through a getter rather than captured, so
  // the counters the cooldown replaces can never be written to through a stale closure. Returning
  // a non-nullable value keeps the guard fail-closed: there is no path where a missing counter
  // silently reads as "under the threshold".
  const getCounters = useCallback((): RunawayCounters => {
    let counters = countersRef.current;
    if (!counters) {
      counters = {
        deliveries: new EventRollingTimeCounter(RUNAWAY_EVENTS_PER_WINDOW),
        subscribes: new EventRollingTimeCounter(RUNAWAY_EVENTS_PER_WINDOW),
      };
      countersRef.current = counters;
    }
    return counters;
  }, []);

  // Mirrors `message` as a ref so a burst arriving before React can re-render and drop the
  // subscription warns once rather than once per event
  const hasTrippedRef = useRef(false);
  // State, not a ref: tripping must re-render so consumers see the error and the subscription is
  // dropped
  const [message, setMessage] = useState('');

  const reArmTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(reArmTimeoutRef.current), []);

  // Read through a ref so a caller passing an inline arrow does not change the identity of the
  // record callbacks below every render
  const describeRef = useRef(describeDataTypeForWarning);
  describeRef.current = describeDataTypeForWarning;
  const describeDataTypeOrFallback = useCallback(
    () => describeRef.current?.() ?? dataType,
    [dataType],
  );

  // The clause must begin with the data type name — this prepends `Data of type ` to it
  const trip = useCallback((whatHappenedStartingWithDataType: string) => {
    hasTrippedRef.current = true;
    const runawayMessage = `Data of type ${whatHappenedStartingWithDataType} Please ensure hook calls and their parameters are memoized.`;
    logger.warn(runawayMessage);
    setMessage(runawayMessage);

    // Fresh counters rather than a reset, so the cooldown starts the next window empty and a burst
    // that ended during the cooldown does not immediately re-trip on stale timestamps
    reArmTimeoutRef.current = setTimeout(() => {
      countersRef.current = undefined;
      hasTrippedRef.current = false;
      setMessage('');
    }, RUNAWAY_COOLDOWN_MS);
  }, []);

  const recordDelivery = useCallback(() => {
    if (hasTrippedRef.current) return false;

    const counters = getCounters();
    counters.deliveries.recordInstance();
    if (!counters.deliveries.hasViolatedThreshold(RUNAWAY_WINDOW_MS)) return true;

    trip(
      `${describeDataTypeOrFallback()} was updated ${RUNAWAY_EVENTS_PER_WINDOW} times in the last ${RUNAWAY_WINDOW_MS} milliseconds.`,
    );
    return false;
  }, [describeDataTypeOrFallback, getCounters, trip]);

  const recordSubscribe = useCallback(() => {
    if (hasTrippedRef.current) return false;

    const counters = getCounters();
    counters.subscribes.recordInstance();
    if (!counters.subscribes.hasViolatedThreshold(RUNAWAY_WINDOW_MS)) return true;

    trip(
      `${describeDataTypeOrFallback()} was subscribed to ${RUNAWAY_EVENTS_PER_WINDOW} times in the last ${RUNAWAY_WINDOW_MS} milliseconds.`,
    );
    return false;
  }, [describeDataTypeOrFallback, getCounters, trip]);

  // `RESOURCE_EXHAUSTED` lets consumers recognize a rate-limited hook without matching on message
  // text
  const runawayError = useMemo(
    () => (message ? newPlatformError(message, RESOURCE_EXHAUSTED) : undefined),
    [message],
  );

  return { recordDelivery, recordSubscribe, runawayError };
}

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
  ExtractDataProviderDataTypes<TDataProvider>[TDataType]['getData'] | PlatformError,
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

/** Longest selector description included in the runaway-render warning. Exported for tests. */
export const MAX_SELECTOR_DESCRIPTION_LENGTH = 80;

/**
 * Collapses the characters that would break a line-oriented log, then trims to
 * {@link MAX_SELECTOR_DESCRIPTION_LENGTH} on a grapheme boundary.
 *
 * A selector carries project names, queries and file paths, so it is not ASCII by construction: a
 * native cut can land inside a surrogate pair and write a lone surrogate into both the warning and
 * the `PlatformError` message every consumer of the tripped hook receives. A raw newline would
 * split one warning across log lines, the way `sanitizeForLog` prevents for RPC payloads.
 */
function collapseAndTrim(description: string): string {
  const collapsed = description.replace(/[\p{Cc}\p{Zl}\p{Zp}]+/gu, ' ');
  // Segmenting is the expensive part of the grapheme helpers, so this only reaches for them once
  // the cheap native length says there may be something to cut. Native `length` counts code units,
  // which is never fewer than the graphemes, so a string this says is short enough is short enough.
  if (collapsed.length <= MAX_SELECTOR_DESCRIPTION_LENGTH) return collapsed;
  if (stringLength(collapsed) <= MAX_SELECTOR_DESCRIPTION_LENGTH) return collapsed;
  return `${slice(collapsed, 0, MAX_SELECTOR_DESCRIPTION_LENGTH)}…`;
}

/**
 * One selector property, rendered without walking into it.
 *
 * A string property gets the same grapheme-safe cut {@link collapseAndTrim} applies to the whole
 * description, and for the same reason: a selector's string values are project names, queries and
 * file paths rather than anything ASCII by construction. Cutting here natively would put a lone
 * surrogate inside the assembled description, where `collapseAndTrim`'s own length check then finds
 * the total short enough to leave alone — so the damage escapes into both the log warning and the
 * `PlatformError` message every consumer of the tripped hook receives.
 */
function describeSelectorValue(value: unknown): string {
  if (isString(value)) {
    // Same cheap native gate as `collapseAndTrim`: code units are never fewer than graphemes, so a
    // string this says is short enough needs no segmenting.
    if (value.length <= MAX_SELECTOR_DESCRIPTION_LENGTH) return value;
    if (stringLength(value) <= MAX_SELECTOR_DESCRIPTION_LENGTH) return value;
    return `${slice(value, 0, MAX_SELECTOR_DESCRIPTION_LENGTH)}…`;
  }
  if (typeof value === 'object' && value) return Array.isArray(value) ? '[…]' : '{…}';
  return String(value);
}

/**
 * Renders a selector for the warning WITHOUT serializing all of it.
 *
 * This runs inside the guard's trip handler, on the delivery path of the very update loop being
 * reported, so what it costs is paid at the worst possible moment. `JSON.stringify` of the whole
 * selector would walk an arbitrarily large object graph synchronously just so all but 80 characters
 * of the result could be thrown away — a selector holding a USJ chapter or a comment thread list is
 * megabytes. The input is bounded instead: own enumerable properties, one shallow line each, and
 * the walk stops as soon as there is more text than the warning can show.
 *
 * Three layers bound the result, and the LAST one owns the guarantee: `describeSelectorValue` caps
 * each value, the walk here stops once the budget is spent, and `collapseAndTrim` makes the final
 * cut. Only that last cut is promised to hold - the first two keep the work bounded, but the
 * assembled `{ a: …, b: … }` scaffolding can still push the total past the limit on its own.
 */
function describeSelector(selector: unknown): string {
  // A bare string selector is bounded HERE rather than left to `collapseAndTrim`, whose regex
  // `.replace` would otherwise scan the whole string before any length check reached it.
  if (isString(selector)) return describeSelectorValue(selector);
  if (typeof selector !== 'object' || !selector) return String(selector);

  const rendered: string[] = [];
  let remaining = MAX_SELECTOR_DESCRIPTION_LENGTH;
  // `some` rather than `forEach` so the walk can stop; `Object.entries` reads own enumerable
  // properties only, so a prototype chain cannot lengthen it.
  Object.entries(selector).some(([key, value]) => {
    const entry = `${key}: ${describeSelectorValue(value)}`;
    rendered.push(entry);
    remaining -= entry.length + 2;
    return remaining <= 0;
  });
  return `{ ${rendered.join(', ')} }`;
}

/**
 * Renders a data type and its selector for the runaway-render warning.
 *
 * Some data providers expose unnamed data types - `useSetting` reads the settings provider through
 * an empty data type name - so the type alone can identify nothing, and every setting in the app
 * shares one blank name. Including the selector is what lets a reader of the log tell them apart
 * and name the hook that is re-rendering.
 */
function describeDataType(dataType: unknown, selector: unknown): string {
  const typeName = String(dataType) || '(unnamed)';
  let selectorDescription: string;
  try {
    selectorDescription = collapseAndTrim(describeSelector(selector));
  } catch {
    // A getter or a `toString` on the selector can throw. This runs while the app is already
    // misbehaving, so a throw here would replace a useful warning with a fresh exception at exactly
    // the wrong moment.
    selectorDescription = '[undescribable]';
  }
  return `${typeName} (selector: ${selectorDescription})`;
}

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
    // Named, not an anonymous arrow, so `react-hooks/rules-of-hooks` enforces its rules on the
    // body below — see the note at the top of this file.
    function useDataForDataProvider<
      TDataTypes extends ExtractDataProviderDataTypes<TDataProvider>,
      TDataType extends typeof dataType,
    >(
      selector: TDataTypes[TDataType]['selector'],
      defaultValue: TDataTypes[TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ): [
      TDataTypes[TDataType]['getData'] | PlatformError,
      (
        | ((
            newData: TDataTypes[TDataType]['setData'],
          ) => Promise<DataProviderUpdateInstructions<TDataTypes>>)
        | undefined
      ),
      boolean,
    ] {
      // Held as a ref so the guard's description of this hook is computed only when it trips.
      // Serializing the selector on every render would add work to the hot path the guard exists
      // to protect, and an unstable selector - the very mistake being reported - would give the
      // guard's callbacks a new identity every render.
      const selectorRef = useRef(selector);
      selectorRef.current = selector;
      // No dependencies: `dataType` is fixed when this hook is generated, not a render value
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const describeThisDataType = useCallback(
        () => describeDataType(dataType, selectorRef.current),
        [],
      );
      const { recordDelivery, recordSubscribe, runawayError } = useRunawayLoopGuard(
        String(dataType),
        describeThisDataType,
      );

      // Use subscriberOptions as a ref so it doesn't update dependency arrays
      const subscriberOptionsRef = useRef(subscriberOptions);
      subscriberOptionsRef.current = subscriberOptions;

      // The data from the data provider at this selector
      const [data, setDataInternal] = useState<TDataTypes[TDataType]['getData'] | PlatformError>(
        defaultValue,
      );

      // Get the data provider for this data provider name
      const dataProvider = useDataProviderHook(...args);

      // Indicates if the data with the selector is awaiting retrieval from the data provider
      const [isLoading, setIsLoading] = useState<boolean>(true);

      // Mark that we are loading again whenever we are about to (re)subscribe — synchronously with
      // the data provider/selector change rather than from the outgoing subscription's async
      // teardown. Rapid selector changes tear down multiple subscriptions whose completions settle
      // in unpredictable order, so a teardown-driven `setIsLoading(true)` could land AFTER the
      // current subscription already delivered and wedge the flag at the wrong value.
      //
      // `runawayError` belongs here too: when the guard re-arms it clears, and the fresh
      // subscription has not delivered yet. Without it the hook would report data from before the
      // trip as settled for the whole round trip.
      useEffect(() => {
        setIsLoading(true);
      }, [dataProvider, runawayError, selector]);

      // Wrap subscribe so we can call it as a normal PapiEvent in useEvent
      const wrappedSubscribeEvent:
        | PlatformEventAsync<TDataTypes[TDataType]['getData'] | PlatformError>
        | undefined = useMemo(
        () =>
          // Dropping the subscription once the guard trips stops a runaway loop at its source
          // rather than merely hiding its output
          dataProvider && !runawayError
            ? async (
                eventCallback: PlatformEventHandler<
                  TDataTypes[TDataType]['getData'] | PlatformError
                >,
              ) => {
                // Counted here rather than in the memo body because this runs once per actual
                // subscription. A resubscribe loop never delivers anything — each subscription is
                // superseded before it resolves — so this is the only place it is observable.
                if (!recordSubscribe()) return async () => true;

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
                    eventCallback,
                    subscriberOptionsRef.current,
                  );

                return async () => unsub();
              }
            : undefined,
        [dataProvider, recordSubscribe, runawayError, selector],
      );

      // Emissions reach this only through useEventAsync's per-subscription guard, so a superseded
      // subscription's late emission can neither overwrite `data` nor count toward the runaway
      // threshold.
      const handleSubscriptionData = useCallback(
        (subscriptionData: TDataTypes[TDataType]['getData'] | PlatformError) => {
          // A tripped guard drops the delivery: applying it would feed the loop we are breaking
          if (!recordDelivery()) return;

          setDataInternal(subscriptionData);
          // When we receive updated data, mark that we are not loading
          setIsLoading(false);
        },
        [recordDelivery],
      );

      // Subscribe to the data provider
      useEventAsync(wrappedSubscribeEvent, handleSubscriptionData);

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

      // Every hook above runs on every render, so both paths below render the same hooks in the
      // same order. Any hook added to this function must go ABOVE this line.
      // `isLoading` stays true while tripped because the guard re-arms and resubscribes: the value
      // genuinely has not resolved yet. Reporting `false` would tell every consumer that gates on
      // loading that this IS the answer — painting an empty chapter over real text, resolving a
      // three-state mode check to the wrong mode, or rendering raw localization keys.
      if (runawayError) return [runawayError, undefined, true];

      return [data, setData, isLoading];
    }

    return useDataForDataProvider;
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
          // TypeScript cannot narrow a Proxy `get` trap's `prop` to a known key without an assertion.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return useDataHooksForProvider[prop as keyof typeof useDataHooksForProvider];

        // Build a new useData hook
        if (!isString(prop)) throw new Error('Must provide a string to the useData hook proxy');

        // `prop` is guaranteed to be a string by the check above; casting to the keyed type is safe here.
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
