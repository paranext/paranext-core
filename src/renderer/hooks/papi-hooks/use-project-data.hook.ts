import createUseDataHook from '@renderer/hooks/hook-generators/create-use-data-hook.util';
import {
  DataProviderDataTypes,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import IDataProvider from '@shared/models/data-provider.interface';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';

/**
 * Proxy object that provides hooks to use project data provider data with various data types
 *
 * @example `useProjectData.VerseUSFM<ProjectDataTypes['ParatextStandard'], 'VerseUSFM'>(...);`
 *
 * @type `TProjectDataTypes` - The project data types associated with the `projectType` used. You
 *   can specify this type with `ProjectDataTypes['<project_type>']`
 * @type `TDataType` - The specific data type on this project you want to use. Must match the data
 *   type specified in `useProjectData.<data_type>`
 *
 *   Unfortunately, accessing properties from the `DataProviderDataType`s in `ProjectDataTypes` did
 *   not work. Maybe TypeScript refuses to look at all properties in each member of
 *   `ProjectDataTypes` and tell that they're all `DataProviderDataType`s. So this did not work
 *   because it refused to accept that `'selector'` was a valid member:
 *   `ProjectDataTypes[ProjectType][TDataType]['selector']`
 *
 *   As such, this hook proxy actually has the same types as `UseDataHook` but with a couple of things
 *   renamed for easier readability.
 */
type UseProjectDataHook = {
  [DataType in string]: <
    TProjectDataTypes extends DataProviderDataTypes,
    TDataType extends keyof TProjectDataTypes,
  >(
    projectDataProviderSource: string | IDataProvider<TProjectDataTypes> | undefined,
    selector: TProjectDataTypes[TDataType]['selector'],
    defaultValue: TProjectDataTypes[TDataType]['getData'],
    subscriberOptions?: DataProviderSubscriberOptions,
  ) => [
    TProjectDataTypes[TDataType]['getData'],
    (
      | ((
          newData: TProjectDataTypes[TDataType]['setData'],
        ) => Promise<DataProviderUpdateInstructions<TProjectDataTypes>>)
      | undefined
    ),
    boolean,
  ];
};

// Note: the following comment uses ＠, not the actual @ character, to hackily provide @param and
// such on this object. JSDoc does not usually allow these on the object. One day, we may be able to
// put this comment on an actual function, so we can fix the comments back to using real @
/**
 * JSDOC SOURCE UseProjectDataHook
 *
 * ```typescript
 * useProjectData.DataType<TProjectDataTypes extends DataProviderDataTypes, TDataType extends keyof TProjectDataTypes>(
 *   projectDataProviderSource: string | IDataProvider<TProjectDataTypes> | undefined,
 *   selector: TProjectDataTypes[TDataType]['selector'],
 *   defaultValue: TProjectDataTypes[TDataType]['getData'],
 *   subscriberOptions?: DataProviderSubscriberOptions,
 * ): [
 *   TProjectDataTypes[TDataType]['getData'],
 *   (
 *     | ((
 *         newData: TProjectDataTypes[TDataType]['setData'],
 *       ) => Promise<DataProviderUpdateInstructions<TProjectDataTypes>>)
 *     | undefined
 *   ),
 *   boolean,
 * ]
 * ```
 *
 * Special React hook that subscribes to run a callback on a project data provider's data with
 * specified selector on any data type that the project data provider serves according to its
 * projectType.
 *
 * Usage: Specify the data type on the project data provider with `useProjectData.<data_type>` and
 * use like any other React hook. Specify the generic types in order to receive type support from
 * Intellisense. For example, `useProjectData.VerseUSFM<ProjectDataTypes['ParatextStandard'],
 * 'VerseUSFM'>` lets you subscribe to verse USFM from a project data provider for the
 * `ParatextStandard` `projectType`.
 *
 * _＠example_ When subscribing to JHN 11:35 Verse USFM info on a `ParatextStandard` project with
 * projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`, we need to tell the
 * `useProjectData.VerseUSFM` hook what types we are using, so we specify the project data types as
 * `ProjectDataTypes['ParatextStandard']` and specify that we are using the `'VerseUSFM'` data type
 * as follows:
 *
 * ```typescript
 * const [verse, setVerse, verseIsLoading] = useProjectData.VerseUSFM<
 *   ProjectDataTypes['ParatextStandard'],
 *   'Verse'
 * >(
 *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
 *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
 *   'Loading verse ',
 * );
 * ```
 *
 * _＠param_ `projectDataProviderSource` string name of the id of the project to get OR
 * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
 * project data provider once)
 *
 * _＠param_ `selector` tells the provider what data this listener is listening for
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
 * - `data`: the current value for the data from the project data provider for the specified project
 *   id with the specified data type and selector, either the defaultValue or the resolved data
 * - `setData`: asynchronous function to request that the data provider for the specified project id
 *   update the data at this data type and selector. Returns true if successful. Note that this
 *   function does not update the data. The project data provider sends out an update to this
 *   subscription if it successfully updates data.
 * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the
 *   project data provider for this project id
 *
 * _＠type_ `TProjectDataTypes` - the project data types associated with the `projectType` used. You
 * can specify this type with `ProjectDataTypes['<project_type>']`
 *
 * _＠type_ `TDataType` - the specific data type on this project you want to use. Must match the data
 * type specified in `useProjectData.<data_type>`
 */
// Assert the more general and more specific types.
/* eslint-disable no-type-assertion/no-type-assertion */
const useProjectData: UseProjectDataHook = createUseDataHook(
  useProjectDataProvider as (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
) as UseProjectDataHook;
/* eslint-enable */

export default useProjectData;
