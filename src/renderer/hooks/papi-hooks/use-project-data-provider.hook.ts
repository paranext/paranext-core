import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ProjectInterfaces, ProjectDataProviderInterfaces } from 'papi-shared-types';
import createUseNetworkObjectHook from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

/**
 * Takes the parameters passed into the hook and returns the `projectDataProviderSource` associated
 * with those parameters.
 *
 * @param projectInterface `projectInterface` that the project to load must support. The TypeScript
 *   type for the returned project data provider will have the project data provider interface type
 *   associated with this `projectInterface`. If the project does not implement this
 *   `projectInterface` (according to its metadata), an error will be thrown.
 * @param projectDataProviderSource String name of the id of the project to get OR
 *   projectDataProvider (result of useProjectDataProvider, if you want this hook to just return the
 *   data provider again)
 * @returns `projectDataProviderSource` for getting the Project Data Provider
 */
function mapParametersToProjectDataProviderSource<ProjectInterface extends ProjectInterfaces>(
  _projectInterface: ProjectInterface,
  projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
) {
  return projectDataProviderSource;
}

/**
 * Gets a project data provider with specified provider name
 *
 * @param projectInterface `projectInterface` that the project to load must support. The TypeScript
 *   type for the returned project data provider will have the project data provider interface type
 *   associated with this `projectInterface`. If the project does not implement this
 *   `projectInterface` (according to its metadata), an error will be thrown.
 * @param projectDataProviderSource String name of the id of the project to get OR
 *   projectDataProvider (result of useProjectDataProvider, if you want this hook to just return the
 *   data provider again)
 * @param pdpFactoryId Optional ID of the PDP factory from which to get the project data provider if
 *   the PDP factory supports this project id and project interface. If not provided, then look in
 *   all available PDP factories for the given project ID.
 * @returns `undefined` if the Project Data Provider has not been retrieved, the requested Project
 *   Data Provider if it has been retrieved and is not disposed, and undefined again if the Project
 *   Data Provider is disposed
 */

// Assert to specific data type for this hook.
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const useProjectDataProvider = createUseNetworkObjectHook(
  papiFrontendProjectDataProviderService.get,
  mapParametersToProjectDataProviderSource,
) as <ProjectInterface extends ProjectInterfaces>(
  projectInterface: ProjectInterface,
  projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
  pdpFactoryId?: string,
) => ProjectDataProviderInterfaces[ProjectInterface] | undefined;

export default useProjectDataProvider;
