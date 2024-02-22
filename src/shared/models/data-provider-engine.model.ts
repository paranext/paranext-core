import {
  DataProviderDataTypes,
  DataProviderGetters,
  DataProviderUpdateInstructions,
  DataProviderSetters,
} from '@shared/models/data-provider.model';
import { NetworkableObject } from '@shared/models/network-object.model';

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this object. JSDoc does not usually carry these to classes inheriting from
// `DataProviderEngine` for some reason. One day, we may be able to put this comment on an actual
// function, so we can fix the comments back to using real @
/**
 * JSDOC SOURCE DataProviderEngineNotifyUpdate
 *
 * Method to run to send clients updates for a specific data type outside of the `set<data_type>`
 * method. papi overwrites this function on the DataProviderEngine itself to emit an update based on
 * the `updateInstructions` and then run the original `notifyUpdateMethod` from the
 * `DataProviderEngine`.
 *
 * _＠example_ To run `notifyUpdate` function so it updates the Verse and Heresy data types (in a
 * data provider engine):
 *
 * ```typescript
 * this.notifyUpdate(['Verse', 'Heresy']);
 * ```
 *
 * _＠example_ You can log the manual updates in your data provider engine by specifying the
 * following `notifyUpdate` function in the data provider engine:
 *
 * ```typescript
 * notifyUpdate(updateInstructions) {
 *   papi.logger.info(updateInstructions);
 * }
 * ```
 *
 * Note: This function's return is treated the same as the return from `set<data_type>`
 *
 * _＠param_ `updateInstructions` Information that papi uses to interpret whether to send out
 * updates. Defaults to `'*'` (meaning send updates for all data types) if parameter
 * `updateInstructions` is not provided or is undefined. Otherwise returns `updateInstructions`.
 * papi passes the interpreted update value into this `notifyUpdate` function. For example, running
 * `this.notifyUpdate()` will call the data provider engine's `notifyUpdate` with
 * `updateInstructions` of `'*'`.
 *
 * _＠see_ {@link DataProviderUpdateInstructions} for more info on the `updateInstructions` parameter
 *
 * WARNING: Do not update a data type in its `get<data_type>` method (unless you make a base case)!
 * It will create a destructive infinite loop.
 */
export type DataProviderEngineNotifyUpdate<TDataTypes extends DataProviderDataTypes> = (
  updateInstructions?: DataProviderUpdateInstructions<TDataTypes>,
) => void;

/**
 * Addon type for IDataProviderEngine to specify that there is a `notifyUpdate` method on the data
 * provider engine. You do not need to specify this type unless you are creating an object that is
 * to be registered as a data provider engine and you need to use `notifyUpdate`.
 *
 * @see {@link DataProviderEngineNotifyUpdate} for more information on `notifyUpdate`.
 * @see {@link IDataProviderEngine} for more information on using this type.
 */
export type WithNotifyUpdate<TDataTypes extends DataProviderDataTypes> = {
  /** JSDOC DESTINATION DataProviderEngineNotifyUpdate */
  notifyUpdate: DataProviderEngineNotifyUpdate<TDataTypes>;
};

/**
 * The object to register with the DataProviderService to create a data provider. The
 * DataProviderService creates an {@link IDataProvider} on the papi that layers over this engine,
 * providing special functionality.
 *
 * @type TDataTypes - The data types that this data provider engine serves. For each data type
 *   defined, the engine must have corresponding `get<data_type>` and `set<data_type> function`
 *   functions.
 * @see {@link DataProviderDataTypes} for information on how to make powerful types that work well with
 * Intellisense.
 *
 * Note: papi creates a `notifyUpdate` function on the data provider engine if one is not provided, so it
 * is not necessary to provide one in order to call `this.notifyUpdate`. However, TypeScript does
 * not understand that papi will create one as you are writing your data provider engine, so you can
 * avoid type errors with one of the following options:
 *
 * 1. If you are using a class to create a data provider engine, you can extend the
 * {@link DataProviderEngine} class, and it will provide `notifyUpdate` for you:
 * ```typescript
 * class MyDPE extends DataProviderEngine<MyDataTypes> implements IDataProviderEngine<MyDataTypes> {
 *   ...
 * }
 * ```
 *
 * 2. If you are using an object or class not extending {@link DataProviderEngine} to create a data provider engine, you can add a
 * `notifyUpdate` function (and, with an object, add the {@link WithNotifyUpdate} type) to
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
 */
// Try using DataProviderName here instead of TDataTypes?
type IDataProviderEngine<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  NetworkableObject &
    /**
     * Set of all `set<data_type>` methods that a data provider engine must provide according to its
     * data types. papi overwrites this function on the DataProviderEngine itself to emit an update
     * after running the defined `set<data_type>` method in the DataProviderEngine.
     *
     * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>`
     * method.
     *
     * Note: to make a data type read-only, you can always return false or throw from
     * `set<data_type>`.
     *
     * WARNING: Do not run this recursively in its own `set<data_type>` method! It will create as
     * many updates as you run `set<data_type>` methods.
     *
     * @see {@link DataProviderSetter} for more information
     */
    DataProviderSetters<TDataTypes> &
    /**
     * Set of all `get<data_type>` methods that a data provider engine must provide according to its
     * data types. Run by the data provider on `get<data_type>`
     *
     * Note: papi requires that each `set<data_type>` method has a corresponding `get<data_type>`
     * method.
     *
     * @see {@link DataProviderGetter} for more information
     */
    DataProviderGetters<TDataTypes> &
    Partial<WithNotifyUpdate<TDataTypes>>;

export default IDataProviderEngine;

/**
 * JSDOC SOURCE DataProviderEngine
 *
 * Abstract class that provides a placeholder `notifyUpdate` for data provider engine classes. If a
 * data provider engine class extends this class, it doesn't have to specify its own `notifyUpdate`
 * function in order to use `notifyUpdate`.
 *
 * @see {@link IDataProviderEngine} for more information on extending this class.
 */
export abstract class DataProviderEngine<TDataTypes extends DataProviderDataTypes>
  implements WithNotifyUpdate<TDataTypes>
{
  // This is just a placeholder and will be layered over by papi. We don't need it to do anything
  // @ts-expect-error ts(6133) `updateInstructions` is not used in this method, but we don't care
  // because we want inheriting classes to be able to get this method with Intellisense without
  // an underscore that indicates to TypeScript that we aren't using the parameter
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  notifyUpdate(updateInstructions?: DataProviderUpdateInstructions<TDataTypes>): void {}
}
