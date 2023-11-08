import createUseDataHook from '@renderer/hooks/hook-generators/create-use-data-hook.util';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import IDataProvider from '@shared/models/data-provider.interface';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { ProjectDataTypes, ProjectTypes } from 'papi-shared-types';

/**
 * React hook to use data from a project data provider
 *
 * @example `useProjectData.VerseUSFM<ProjectDataTypes['ParatextStandard'], 'VerseUSFM'>(...);`
 *
 * @example `useProjectData('<project_id>', 'ParatextStandard').VerseUSFM(...)`
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
 *   # As such, this hook proxy actually has the same types as `UseDataHook` but with a couple of things
 *
 *   Renamed for easier readability.
 * @type `ProjectType` - The `projectType` of the project whose data to retrieve. Alternatively,
 *   specify this as the second argument to the `useProjectData` function for Intellisense support
 */
type UseProjectDataHook = {
  // Here we do not use `ProjectType extends ProjectTypes` because `useProjectData<''>` Intellisense
  // was not working to show the options. Whereas `useProjectData<ProjectDataTypes['']>` does
  <ProjectType extends ProjectTypes>(
    projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
    projectType?: ProjectType,
  ): {
    [TDataType in keyof ProjectDataTypes[ProjectType]]: (
      // @ts-expect-error For some reason, TypeScript pretends it can't find `selector`, but it
      // works just fine
      selector: ProjectDataTypes[ProjectType][TDataType]['selector'],
      // @ts-expect-error For some reason, TypeScript pretends it can't find `getData`, but it
      // works just fine
      defaultValue: ProjectDataTypes[ProjectType][TDataType]['getData'],
      subscriberOptions?: DataProviderSubscriberOptions,
    ) => [
      // @ts-expect-error For some reason, TypeScript pretends it can't find `getData`, but it
      // works just fine
      ProjectDataTypes[ProjectType][TDataType]['getData'],
      (
        | ((
            // @ts-expect-error For some reason, TypeScript pretends it can't find `setData`, but it
            // works just fine
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
 * JSDOC SOURCE UseProjectDataHook
 *
 * ```typescript
 * useProjectData<ProjectType extends ProjectTypes>(
 *     projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
 *     projectType?: ProjectType,
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
 * Usage: Specify the project id, the project type, and the data type on the project data provider
 * with `useProjectData('<project_id>', '<project_type>').<data_type>` and use like any other React
 * hook.
 *
 * _＠example_ Subscribing to Verse USFM info at JHN 11:35 on a `ParatextStandard` project with
 * projectId `32664dc3288a28df2e2bb75ded887fc8f17a15fb`:
 *
 * ```typescript
 * const [verse, setVerse, verseIsLoading] = useProjectData(
 *   '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
 *   'ParatextStandard',
 * ).VerseUSFM(
 *   useMemo(() => new VerseRef('JHN', '11', '35', ScrVers.English), []),
 *   'Loading verse ',
 * );
 * ```
 *
 * _＠param_ `projectDataProviderSource` string name of the id of the project to get OR
 * projectDataProvider (result of useProjectDataProvider if you want to consolidate and only get the
 * project data provider once)
 *
 * _＠param_ `projectType` indicates what you expect the `projectType` to be for the project with the
 * specified id. Currently, this does nothing but indicate to TypeScript what type the Project Data
 * Provider is. This is an alternative way to specify the `ProjectType` generic type. Optional.
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
 *
 * _＠type_ `ProjectType` - the `projectType` of the project whose data to retrieve. Alternatively,
 * specify this as the second argument to the `useProjectData` function for Intellisense support
 */
// Assert the more general and more specific types.
/* eslint-disable no-type-assertion/no-type-assertion */
const useProjectData = createUseDataHook(
  useProjectDataProvider as (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
) as UseProjectDataHook;
/* eslint-enable */

export default useProjectData;
