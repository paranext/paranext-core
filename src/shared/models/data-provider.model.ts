import {
  length,
  UnsubscriberAsync,
  PlatformEventHandler,
  substring,
  startsWith,
} from 'platform-bible-utils';
import { NetworkableObject } from '@shared/models/network-object.model';

/** Various options to adjust how the data provider subscriber emits updates */
export type DataProviderSubscriberOptions = {
  /**
   * Whether to immediately retrieve the data for this subscriber and run the callback as soon as
   * possible.
   *
   * This allows a subscriber to simply subscribe and provide a callback instead of subscribing,
   * running `get`, and managing the race condition of an event coming in to update the data and the
   * initial `get` coming back in.
   *
   * @default true
   */
  retrieveDataImmediately?: boolean;
  /**
   * Under which conditions to run the callback when we receive updates to the data.
   *
   * - `'deeply-equal'` - only run the update callback when the data at this selector has changed.
   *
   *   For example, suppose your selector is targeting John 3:5, and the data provider updates its
   *   data for Luke 5:3. Your data at John 3:5 does not change, and your callback will not run.
   * - `'*'` - run the update callback every time the data has been updated whether or not the data at
   *   this selector has changed.
   *
   *   For example, suppose your selector is targeting John 3:5, and the data provider updates its
   *   data for Luke 5:3. Your data at John 3:5 does not change, but your callback will run again
   *   with the same data anyway.
   *
   * @default 'deeply-equal'
   */
  whichUpdates?: 'deeply-equal' | '*';
};

/**
 * Information that papi uses to interpret whether to send out updates on a data provider when the
 * engine runs `set<data_type>` or `notifyUpdate`.
 *
 * - `'*'` update subscriptions for all data types on this data provider
 * - `string` name of data type - update subscriptions for this data type
 * - `string[]` names of data types - update subscriptions for the data types in the array
 * - `true` (or other truthy values other than strings and arrays)
 *
 *   - In `set<data_type>` - update subscriptions for this data type
 *   - In `notifyUpdate` - same as '*'
 * - `false` (or falsy) do not update subscriptions
 */
export type DataProviderUpdateInstructions<TDataTypes extends DataProviderDataTypes> =
  | '*'
  | DataTypeNames<TDataTypes>
  | DataTypeNames<TDataTypes>[]
  | boolean;

/**
 * Set a subset of data according to the selector.
 *
 * Note: if a data provider engine does not provide `set` (possibly indicating it is read-only),
 * this will throw an exception.
 *
 * @param selector Tells the provider what subset of data is being set
 * @param data The data that determines what to set at the selector
 * @returns Information that papi uses to interpret whether to send out updates. Defaults to `true`
 *   (meaning send updates only for this data type).
 * @see {@link DataProviderUpdateInstructions} for more info on what to return
 */
export type DataProviderSetter<
  TDataTypes extends DataProviderDataTypes,
  DataType extends keyof TDataTypes,
> = (
  selector: TDataTypes[DataType]['selector'],
  data: TDataTypes[DataType]['setData'],
) => Promise<DataProviderUpdateInstructions<TDataTypes>>;

/**
 * Get a subset of data from the provider according to the selector.
 *
 * Note: This is good for retrieving data from a provider once. If you want to keep the data
 * up-to-date, use `subscribe` instead, which can immediately give you the data and keep it
 * up-to-date.
 *
 * @param selector Tells the provider what subset of data to get
 * @returns The subset of data represented by the selector
 */
export type DataProviderGetter<TDataType extends DataProviderDataType> = (
  selector: TDataType['selector'],
) => Promise<TDataType['getData']>;

/**
 * Subscribe to receive updates relevant to the provided selector from this data provider for a
 * specific data type.
 *
 * Note: By default, this `subscribe<data_type>` function automatically retrieves the current state
 * of the data and runs the provided callback as soon as possible. That way, if you want to keep
 * your data up-to-date, you do not also have to run `get<data_type>`. You can turn this
 * functionality off in the `options` parameter.
 *
 * @param selector Tells the provider what data this listener is listening for
 * @param callback Function to run with the updated data for this selector
 * @param options Various options to adjust how the subscriber emits updates
 * @returns Unsubscriber to stop listening for updates
 */
export type DataProviderSubscriber<TDataType extends DataProviderDataType> = (
  selector: TDataType['selector'],
  callback: PlatformEventHandler<TDataType['getData']>,
  options?: DataProviderSubscriberOptions,
) => Promise<UnsubscriberAsync>;

/**
 * A helper type describing the types associated with a data provider's methods for a specific data
 * type it handles.
 *
 * @type `TSelector` - The type of selector used to get some data from this provider at this data
 *   type. A selector is an object a caller provides to the data provider to tell the provider what
 *   subset of data it wants at this data type.
 * @type `TGetData` - The type of data provided by this data provider when you run `get<data_type>`
 *   based on a provided selector
 * @type `TSetData` - The type of data ingested by this data provider when you run `set<data_type>`
 *   based on a provided selector
 */
export type DataProviderDataType<TSelector = unknown, TGetData = TSelector, TSetData = TGetData> = {
  /**
   * The type of selector used to get some data from this provider at this data type. A selector is
   * an object a caller provides to the data provider to tell the provider what subset of data it
   * wants at this data type.
   */
  selector: TSelector;
  /**
   * The type of data provided by this data provider when you run `get<data_type>` based on a
   * provided selector
   */
  getData: TGetData;
  /**
   * The type of data ingested by this data provider when you run `set<data_type>` based on a
   * provided selector
   */
  setData: TSetData;
};

/**
 * A helper type describing all the data types a data provider handles. Each property on this type
 * (consisting of a DataProviderDataType, which describes the types that correspond to that data
 * type) describes a data type that the data provider handles. The data provider has a
 * `set<data_type>`, `get<data_type>`, and `subscribe<data_type>` for each property (aka data type)
 * listed in this type.
 *
 * @example A data provider that handles greeting strings and age numbers (as well as an All data
 * type that just provides all the data) could have a DataProviderDataTypes that looks like the
 * following:
 *
 * ```typescript
 * {
 * Greeting: DataProviderDataType<string, string | undefined, string>;
 * Age: DataProviderDataType<string, number | undefined, number>;
 * All: DataProviderDataType<undefined, { greeting: string, age: number }, never>;
 * }
 * ```
 */
export type DataProviderDataTypes = {
  [dataType: string]: DataProviderDataType;
};

/**
 * Names of data types in a DataProviderDataTypes type. Indicates the data types that a data
 * provider can handle (so it will have methods with these names like `set<data_type>`)
 *
 * @see {@link DataProviderDataTypes} for more information
 */
export type DataTypeNames<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  keyof TDataTypes & string;

/**
 * Set of all `set<data_type>` methods that a data provider provides according to its data types.
 *
 * @see {@link DataProviderSetter} for more information
 */
export type DataProviderSetters<TDataTypes extends DataProviderDataTypes> = {
  [DataType in keyof TDataTypes as `set${DataType & string}`]: DataProviderSetter<
    TDataTypes,
    DataType
  >;
};

/**
 * Set of all `get<data_type>` methods that a data provider provides according to its data types.
 *
 * @see {@link DataProviderGetter} for more information
 */
export type DataProviderGetters<TDataTypes extends DataProviderDataTypes> = {
  [DataType in keyof TDataTypes as `get${DataType & string}`]: DataProviderGetter<
    TDataTypes[DataType]
  >;
};

/**
 * Set of all `subscribe<data_type>` methods that a data provider provides according to its data
 * types.
 *
 * @see {@link DataProviderSubscriber} for more information
 */
export type DataProviderSubscribers<TDataTypes extends DataProviderDataTypes> = {
  [DataType in keyof TDataTypes as `subscribe${DataType & string}`]: DataProviderSubscriber<
    TDataTypes[DataType]
  >;
};

/**
 * An internal object created locally when someone runs dataProviderService.registerEngine. This
 * object layers over the data provider engine and runs its methods along with other methods. This
 * object is transformed into an IDataProvider by networkObjectService.set.
 *
 * @see {@link IDataProvider}
 */
type DataProviderInternal<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  NetworkableObject<
    DataProviderSetters<TDataTypes> &
      DataProviderGetters<TDataTypes> &
      DataProviderSubscribers<TDataTypes>
  >;

/** The functions that a data provider has for each data type */
const dataProviderFunctionPrefixes = ['set', 'get', 'subscribe'];

/**
 * Get the data type for a data provider function based on its name
 *
 * @param fnName Name of data provider function e.g. `getVerse`
 * @returns Data type for that data provider function e.g. `Verse`
 */
export function getDataProviderDataTypeFromFunctionName<
  TDataTypes extends DataProviderDataTypes = DataProviderDataTypes,
>(fnName: string) {
  const fnPrefix = dataProviderFunctionPrefixes.find((prefix) => startsWith(fnName, prefix));
  if (!fnPrefix) throw new Error(`${fnName} is not a data provider data type function`);

  // Assert the expected return type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return substring(fnName, length(fnPrefix)) as DataTypeNames<TDataTypes>;
}

export default DataProviderInternal;
