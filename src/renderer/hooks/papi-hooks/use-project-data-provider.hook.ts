import { ProjectDataProvider } from '@shared/models/project-data-provider-engine.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ProjectTypes } from 'papi-shared-types';
import createUseNetworkObjectHook from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

/**
 * Gets a project data provider with specified provider name
 * @param projectDataProviderSource string name of the id of the project to get OR projectDataProvider (result
 * of useProjectDataProvider, if you want this hook to just return the data provider again)
 * @returns undefined if the project data provider has not been retrieved, the requested project
 *  data provider if it has been retrieved and is not disposed, and undefined again if the project
 *  data provider is disposed
 *
 * @ProjectType `T` - the project type for the project to use. The returned project data provider
 *  will have the project data provider type associated with this project type.
 */

const useProjectDataProvider = createUseNetworkObjectHook(
  papiFrontendProjectDataProviderService.getProjectDataProvider,
) as <ProjectType extends ProjectTypes>(
  projectDataProviderSource: string | ProjectDataProvider[ProjectType] | undefined,
) => ProjectDataProvider[ProjectType] | undefined;

export default useProjectDataProvider;
