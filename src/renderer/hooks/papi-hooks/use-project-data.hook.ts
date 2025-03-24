import { createUseDataHook } from '@renderer/hooks/hook-generators/create-use-data-hook.util';
import { useProjectDataProvider } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import {
  ProjectDataProviderInterfaces,
  ProjectInterfaceDataTypes,
  ProjectInterfaces,
} from 'papi-shared-types';

/**
 * React hook to use data from a Project Data Provider
 *
 * @example `useProjectData('platformScripture.USFM_Verse', 'project id').VerseUSFM(...);`
 */
type UseProjectDataHook = {
  <ProjectInterface extends ProjectInterfaces>(
    projectInterface: ProjectInterface,
    projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
  ): {
    [TDataType in keyof ProjectInterfaceDataTypes[ProjectInterface]]: (
      // @ts-ignore TypeScript pretends it can't find `selector`, but it works just fine
      selector: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['selector'],
      // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
      defaultValue: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ) => [
      // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
      ProjectInterfaceDataTypes[ProjectInterface][TDataType]['getData'],
      (
        | ((
            // @ts-ignore TypeScript pretends it can't find `setData`, but it works just fine
            newData: ProjectInterfaceDataTypes[ProjectInterface][TDataType]['setData'],
          ) => Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes[ProjectInterface]>>)
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
 * useProjectData<ProjectInterface extends ProjectInterfaces>(
 *     projectInterface: ProjectInterface,
 *     projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
 *   ).DataType(
 *       selector: ProjectInterfaceDataTypes[ProjectInterface][DataType]['selector'],
 *       defaultValue: ProjectInterfaceDataTypes[ProjectInterface][DataType]['getData'],
 *       subscriberOptions?: DataProviderSubscriberOptions,
 *     ) => [
 *       ProjectInterfaceDataTypes[ProjectInterface][DataType]['getData'],
 *       (
 *         | ((
 *             newData: ProjectInterfaceDataTypes[ProjectInterface][DataType]['setData'],
 *           ) => Promise<DataProviderUpdateInstructions<ProjectInterfaceDataTypes[ProjectInterface]>>)
 *         | undefined
 *       ),
 *       boolean,
 *     ]
 * ```
 *
 * React hook to use data from a Project Data Provider. Subscribes to run a callback on a Project
 * Data Provider's data with specified selector on the specified data type that the Project Data
 * Provider serves according to its supported `projectInterface`s.
 *
 * Usage: Specify the `projectInterface`, the project id, and the data type on the Project Data
 * Provider with `useProjectData('<projectInterface>', '<project_id>').<data_type>` and use like any
 * other React hook.
 *
 * _＠example_ Subscribing to Verse USFM info at JHN 11:35 on a `platformScripture.USFM_Verse`
 * project with projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`:
 *
 * ```typescript
 * const [verse, setVerse, verseIsLoading] = useProjectData(
 *   'platformScripture.USFM_Verse',
 *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
 * ).VerseUSFM(
 *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
 *   'Loading verse ',
 * );
 * ```
 *
 * _＠param_ `projectInterface` `projectInterface` that the project to load must support. The
 * TypeScript type for the returned project data provider will have the project data provider
 * interface type associated with this `projectInterface`. If the project does not implement this
 * `projectInterface` (according to its metadata), an error will be thrown.
 *
 * _＠param_ `projectDataProviderSource` String name of the id of the project to get OR
 * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
 * Project Data Provider once)
 *
 * _＠param_ `selector` tells the provider what data this listener is listening for
 *
 * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 * updated every render
 *
 * _＠param_ `defaultValue` the initial value to return while first awaiting the data
 *
 * _＠param_ `subscriberOptions` various options to adjust how the subscriber emits updates
 *
 * Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 * to re-run with its new value. This means that `subscriberOptions` will be passed to the Project
 * Data Provider's `subscribe<data_type>` method as soon as possible and will not be updated again
 * until `projectDataProviderSource` or `selector` changes.
 *
 * _＠returns_ `[data, setData, isLoading]`
 *
 * - `data`: the current value for the data from the Project Data Provider with the specified data
 *   type and selector, either the `defaultValue` or the resolved data
 * - `setData`: asynchronous function to request that the Project Data Provider update the data at
 *   this data type and selector. Returns `true` if successful. Note that this function does not
 *   update the data. The Project Data Provider sends out an update to this subscription if it
 *   successfully updates data.
 * - `isLoading`: whether the data with the data type and selector is awaiting retrieval from the data
 *   provider
 */
// Assert the more general and more specific types.
/* eslint-disable no-type-assertion/no-type-assertion */
export const useProjectData = createUseDataHook(
  useProjectDataProvider as (
    projectInterface: ProjectInterfaces,
    dataProviderSource: string | IDataProvider | undefined,
    pdpFactoryId?: string,
  ) => IDataProvider | undefined,
) as UseProjectDataHook;
/* eslint-enable */

export default useProjectData;
