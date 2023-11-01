import {
  DataProviderDataTypes,
  DataProviderGetters,
  DataProviderUpdateInstructions,
  DataProviderSetters,
} from '@shared/models/data-provider.model';
import { NetworkableObject } from '@shared/models/network-object.model';

/** JSDOC SOURCE DataProviderEngineNotifyUpdate
 * Method to run to send clients updates for a specific data type outside of the `set<data_type>` method.
 * papi overwrites this function on the DataProviderEngine itself to emit an update after running
 * the `notifyUpdate` method in the DataProviderEngine.
 *
 * @param updateInstructions information that papi uses to interpret whether to send out updates.
 * Defaults to `'*'` (meaning send updates for all data types) if parameter `updateInstructions` is
 * not provided or is undefined. Otherwise returns `updateInstructions`. papi passes the interpreted
 * update value into this `notifyUpdate` function. For example, running `this.notifyUpdate()` will
 * call the data provider engine's `notifyUpdate` with `updateInstructions` of `'*'`.
 *
 * @see DataProviderUpdateInstructions for more info on the `updateInstructions` parameter
 *
 * WARNING: Do not update a data type in its `get<data_type>` method (unless you make a base case)!
 * It will create a destructive infinite loop.
 *
 * @example To run `notifyUpdate` function so it updates the Verse and Heresy data types
 * (in a data provider engine):
 * ```typescript
 * this.notifyUpdate(['Verse', 'Heresy']);
 * ```
 *
 * @example You can log the manual updates in your data provider engine by specifying the following
 * `notifyUpdate` function in the data provider engine:
 * ```typescript
 * notifyUpdate(updateInstructions) {
 *   papi.logger.info(updateInstructions);
 * }
 * ```
 *
 * Note: This function's return is treated the same as the return from `set<data_type>`
 */
export type DataProviderEngineNotifyUpdate<TDataTypes extends DataProviderDataTypes> = (
  updateInstructions?: DataProviderUpdateInstructions<TDataTypes>,
) => void;

/**
 * Addon type for IDataProviderEngine to specify that there is a `notifyUpdate` method on the data
 * provider engine. You do not need to specify this type unless you are creating an object that is
 * to be registered as a data provider engine and you need to use `notifyUpdate`.
 *
 * @see DataProviderEngineNotifyUpdate for more information on `notifyUpdate`.
 * @see IDataProviderEngine for more information on using this type.
 */
export type WithNotifyUpdate<TDataTypes extends DataProviderDataTypes> = {
  /** JSDOC DESTINATION DataProviderEngineNotifyUpdate */
  notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes>;
};

/**
 * The object to register with the DataProviderService to create a data provider.
 * The DataProviderService creates an IDataProvider on the papi that layers over this engine,
 * providing special functionality.
 *
 * @type TDataTypes - the data types that this data provider engine serves. For each data type defined,
 * the engine must have corresponding `get<data_type>` and `set<data_type> function` functions.
 *
 * @see DataProviderDataTypes for information on how to make powerful types that work well with
 * Intellisense.
 *
 * Note: papi creates a `notifyUpdate` function on the data provider engine if one is not provided, so it
 * is not necessary to provide one in order to call `this.notifyUpdate`. However, TypeScript does
 * not understand that papi will create one as you are writing your data provider engine, so you can
 * avoid type errors with one of the following options:
 *
 * 1. If you are using an object or class to create a data provider engine, you can add a
 * `notifyUpdate` function (and, with an object, add the WithNotifyUpdate type) to
 * your data provider engine like so:
 * ```typescript
 * const myDPE: IDataProviderEngine<MyDataTypes> & WithNotifyUpdate<MyDataTypes> = {
 *   notifyUpdate(updateInstructions) {},
 *   ...
 * }
 * ```
 * OR
 * ```typescript
 * class MyDPE implements IDataProviderEngine<MyDataTypes> {
 *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<MyDataTypes>) {}
 *   ...
 * }
 * ```
 *
 * 2. If you are using a class to create a data provider engine, you can extend the `DataProviderEngine`
 * class, and it will provide `notifyUpdate` for you:
 * ```typescript
 * class MyDPE extends DataProviderEngine<MyDataTypes> implements IDataProviderEngine<MyDataTypes> {
 *   ...
 * }
 * ```
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
    Partial<WithNotifyUpdate<TDataTypes>>;

export default IDataProviderEngine;
