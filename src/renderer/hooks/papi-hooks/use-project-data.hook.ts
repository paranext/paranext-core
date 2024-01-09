import createUseDataHook from '@renderer/hooks/hook-generators/create-use-data-hook.util';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import IDataProvider from '@shared/models/data-provider.interface';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { ProjectDataProviders, ProjectDataTypes, ProjectTypes } from 'papi-shared-types';

/**
 * React hook to use data from a project data provider
 *
 * @example `useProjectData('ParatextStandard', 'project id').VerseUSFM(...);`
 */
type UseProjectDataHook = {
  <ProjectType extends ProjectTypes>(
    projectType: ProjectType,
    projectDataProviderSource: string | ProjectDataProviders[ProjectType] | undefined,
  ): {
    [TDataType in keyof ProjectDataTypes[ProjectType]]: (
      // @ts-ignore TypeScript pretends it can't find `selector`, but it works just fine
      selector: ProjectDataTypes[ProjectType][TDataType]['selector'],
      // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
      defaultValue: ProjectDataTypes[ProjectType][TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ) => [
      // @ts-ignore TypeScript pretends it can't find `getData`, but it works just fine
      ProjectDataTypes[ProjectType][TDataType]['getData'],
      (
        | ((
            // @ts-ignore TypeScript pretends it can't find `setData`, but it works just fine
            newData: ProjectDataTypes[ProjectType][TDataType]['setData'],
          ) => Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>>)
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
 * useProjectData<ProjectType extends ProjectTypes>(
 *     projectType: ProjectType,
 *     projectDataProviderSource: string | ProjectDataProviders[ProjectType] | undefined,
 *   ).DataType(
 *       selector: ProjectDataTypes[ProjectType][DataType]['selector'],
 *       defaultValue: ProjectDataTypes[ProjectType][DataType]['getData'],
 *       subscriberOptions?: DataProviderSubscriberOptions,
 *     ) => [
 *       ProjectDataTypes[ProjectType][DataType]['getData'],
 *       (
 *         | ((
 *             newData: ProjectDataTypes[ProjectType][DataType]['setData'],
 *           ) => Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>>)
 *         | undefined
 *       ),
 *       boolean,
 *     ]
 * ```
 *
 * React hook to use data from a project data provider. Subscribes to run a callback on a project
 * data provider's data with specified selector on the specified data type that the project data
 * provider serves according to its `projectType`.
 *
 * Usage: Specify the project type, the project id, and the data type on the project data provider
 * with `useProjectData('<project_type>', '<project_id>').<data_type>` and use like any other React
 * hook.
 *
 * _＠example_ Subscribing to Verse USFM info at JHN 11:35 on a `ParatextStandard` project with
 * projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`:
 *
 * ```typescript
 * const [verse, setVerse, verseIsLoading] = useProjectData(
 *   'ParatextStandard',
 *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
 * ).VerseUSFM(
 *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
 *   'Loading verse ',
 * );
 * ```
 *
 * _＠param_ `projectType` Indicates what you expect the `projectType` to be for the project with the
 * specified id. The TypeScript type for the returned project data provider will have the project
 * data provider type associated with this project type. If this argument does not match the
 * project's actual `projectType` (according to its metadata), a warning will be logged
 *
 * _＠param_ `projectDataProviderSource` String name of the id of the project to get OR
 * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
 * project data provider once)
 *
 * _＠param_ `selector` tells the provider what data this listener is listening for
 *
 * WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 * updated every render
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
 */
// Assert the more general and more specific types.
/* eslint-disable no-type-assertion/no-type-assertion */
const useProjectData = createUseDataHook(
  useProjectDataProvider as (
    projectType: ProjectTypes,
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
) as UseProjectDataHook;
/* eslint-enable */

export default useProjectData;
