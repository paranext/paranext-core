import { ProjectDataProvider } from '@shared/models/project-data-provider-engine.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ProjectTypes } from 'papi-shared-types';
import createUseNetworkObjectHook from '@renderer/hooks/create-use-network-object-hook.util';

/**
 * Gets a project data provider with specified provider name
 * @param dataProviderSource string name of the data provider to get OR projectDataProvider (result
 * of useProjectDataProvider, if you want this hook to just return the data provider again)
 * @returns undefined if the project data provider has not been retrieved, the requested project
 *  data provider if it has been retrieved and is not disposed, and undefined again if the project
 *  data provider is disposed
 *
 * @type `T` - the type of project data provider to return. Use
 *  `IProjectDataProvider<TProjectDataProviderDataTypes>`, specifying your own types, or provide a
 *  custom project data provider type
 */

const useProjectDataProvider = createUseNetworkObjectHook(
  papiFrontendProjectDataProviderService.getProjectDataProvider,
) as <ProjectType extends ProjectTypes>(
  dataProviderSource: string | ProjectDataProvider[ProjectType] | undefined,
) => ProjectDataProvider[ProjectType] | undefined;

export default useProjectDataProvider;
