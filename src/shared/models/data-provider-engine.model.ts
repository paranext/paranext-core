import {
  DataProviderDataTypes,
  DataProviderGetters,
  DataProviderUpdateInstructions,
  DataProviderSetters,
  DataTypeNames,
} from '@shared/models/data-provider.model';
import { NetworkableObject } from '@shared/models/network-object.model';

/**
 * Method to run to send clients updates for a specific data type outside of the `set<data_type>` method.
 * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `notifyUpdate<data_type>` method in the DataProviderEngine.
 *
 * @param updateInstructions you can pass in update instructions if you want. If you want to match default
 * behavior, you should return this parameter directly or `true` if this parameter is undefined.
 *
 * WARNING: Never run this in the `get<data_type>` method! It will create a destructive infinite loop.
 *
 * @returns information that papi uses to interpret whether to send out updates. Defaults to `true`
 * if parameter `updateInstructions` is undefined. Otherwise returns `updateInstructions`.
 *
 * @example A `notifyUpdate<data_type>` function for the Verse data type that mimics default
 * functionality follows:
 * ```typescript
 * notifyUpdateVerse(updateInstructions) {
 *   return updateInstructions === undefined ? true : updateInstructions;
 * }
 * ```
 *
 * Note: This function's return is treated the same as the return from `set<data_type>`
 *
 * @see DataProviderUpdateInstructions for more info on what to return
 */
export type DataProviderEngineNotifyUpdate<TDataTypes extends DataProviderDataTypes> = (
  updateInstructions?: DataProviderUpdateInstructions<TDataTypes>,
) => DataProviderUpdateInstructions<TDataTypes> | undefined;

/**
 * Set of all `notifyUpdate<data_type>` methods available for a data provider engine to run.
 *
 * Note: papi only overwrites the `notifyUpdate<data_type>` functions that have a corresponding
 * `set<data_type>` function defined. Others will not send updates.
 *
 * @see DataProviderEngineNotifyUpdate for more information.
 */
export type DataProviderEngineNotifyUpdates<TDataTypes extends DataProviderDataTypes> = Record<
  `notifyUpdate${DataTypeNames<TDataTypes>}`,
  DataProviderEngineNotifyUpdate<TDataTypes>
>;

/**
 * The object to register with the DataProviderService to create a data provider.
 * The DataProviderService creates an IDataProvider on the papi that layers over this engine, providing special functionality
 *
 * @type TDataTypes - the data types that this data provider engine serves. For each data type defined,
 * the engine must have corresponding `get<data_type>` and `set<data_type> function` functions. It may also
 * have a `notifyUpdate<data_type>` function for each data type, but it is not necessary to write one -
 * they are automatically provided (However, TypeScript does not understand this, so it may be best
 * to provide one if you use it just so you do not have type errors).
 * @see DataProviderDataTypes for more information
 */
type IDataProviderEngine<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  NetworkableObject &
    /**
     * Set of all `set<data_type>` methods that a data provider engine must provide according to its data types.
     * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `set<data_type>` method in the DataProviderEngine.
     *
     * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>` method.
     *
     * Note: to make a data type read-only, you can always return false or throw from `set<data_type>`.
     *
     * WARNING: Do not run this recursively in its own `set<data_type>` method! It will create as many updates as you run `set<data_type>` methods.
     *
     * @see DataProviderSetter for more information
     */
    DataProviderSetters<TDataTypes> &
    /**
     * Set of all `get<data_type>` methods that a data provider engine must provide according to its data types.
     * Run by the data provider on `get<data_type>`
     *
     * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>` method.
     *
     * @see DataProviderGetter for more information
     */
    DataProviderGetters<TDataTypes> &
    Partial<DataProviderEngineNotifyUpdates<TDataTypes>>;

export default IDataProviderEngine;
