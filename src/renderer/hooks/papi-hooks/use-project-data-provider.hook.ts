import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
import createUseNetworkObjectHook from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';
import IDataProvider from '@shared/models/data-provider.interface';

/**
 * Gets a project data provider with specified provider name
 *
 * @type `ProjectType` - The `projectType` for the project to use. The returned project data
 *   provider will have the project data provider type associated with this project type.
 *   Alternatively, specify this as the second argument to this function for Intellisense support
 * @param projectDataProviderSource String name of the id of the project to get OR
 *   projectDataProvider (result of useProjectDataProvider, if you want this hook to just return the
 *   data provider again)
 * @param projectType Indicates what you expect the `projectType` to be for the project with the
 *   specified id. Currently, this does nothing but indicate to TypeScript what type the Project
 *   Data Provider is. This is an alternative way to specify the `ProjectType` generic type.
 *   Optional.
 * @returns `undefined` if the project data provider has not been retrieved, the requested project
 *   data provider if it has been retrieved and is not disposed, and undefined again if the project
 *   data provider is disposed
 */

// Assert to specific data type for this hook.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const useProjectDataProvider = createUseNetworkObjectHook(
  papiFrontendProjectDataProviderService.getProjectDataProvider,
) as <ProjectType extends ProjectTypes>(
  projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
  projectType?: ProjectType,
) => IDataProvider<ProjectDataTypes[ProjectType]> | undefined;

export default useProjectDataProvider;
