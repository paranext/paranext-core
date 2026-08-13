import { createUseNetworkObjectHook } from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';
import { PDP_FACTORY_OBJECT_TYPE } from '@shared/models/project-data-provider-factory.interface';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ProjectDataProviderInterfaces, ProjectInterfaces } from 'papi-shared-types';

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
  // There is no id to compare against for this hook. It is handed a project id, and the PDP it ends
  // up with is registered under a nonce that nothing outside the platform can predict — a PDP does
  // not even exist until someone asks a factory to make one. What CAN be watched for is the factory
  // arriving: a project becomes resolvable again when the process taking an app-global PDP factory
  // over publishes it, which is precisely the gap this listener exists to close. Watching for the
  // PDP itself instead would only catch a project that some other consumer had already brought
  // back, which is the case that needs no help.
  (networkObjectDetails) => networkObjectDetails.objectType === PDP_FACTORY_OBJECT_TYPE,
) as <ProjectInterface extends ProjectInterfaces>(
  projectInterface: ProjectInterface,
  projectDataProviderSource: string | ProjectDataProviderInterfaces[ProjectInterface] | undefined,
  pdpFactoryId?: string,
) => ProjectDataProviderInterfaces[ProjectInterface] | undefined;

export default useProjectDataProvider;
