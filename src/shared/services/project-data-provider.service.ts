import {
  ProjectInterfaces,
  ProjectInterfaceDataTypes,
  ProjectDataProviderInterfaces,
} from 'papi-shared-types';
import { IProjectDataProviderEngine } from '@shared/models/project-data-provider-engine.model';
import networkObjectService from '@shared/services/network-object.service';
import { getByType, registerEngineByType } from '@shared/services/data-provider.service';
import { newNonce } from '@shared/utils/util';
import {
  Dispose,
  MutexMap,
  UnionToIntersection,
  UnsubscriberAsyncList,
} from 'platform-bible-utils';
import IProjectDataProviderFactory, {
  PDP_FACTORY_OBJECT_TYPE,
  ProjectMetadataFilterOptions,
} from '@shared/models/project-data-provider-factory.interface';
import projectLookupService from '@shared/services/project-lookup.service';
import { ProjectMetadataWithoutFactoryInfo } from '@shared/models/project-metadata.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { getPDPFactoryNetworkObjectNameFromId } from '@shared/models/project-lookup.service-model';
import { IProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model';

/**
 * Class that creates Project Data Providers of a specific set of `projectInterface`s. Layers over
 * extension-provided {@link IProjectDataProviderEngineFactory}. Internal only
 */
class ProjectDataProviderFactory<SupportedProjectInterfaces extends ProjectInterfaces[]>
  implements IProjectDataProviderFactory
{
  private readonly pdpIdsMutexMap = new MutexMap();
  private readonly pdpIds: Map<string, string> = new Map();
  private readonly pdpFactoryId: string;
  private readonly projectInterfaces: SupportedProjectInterfaces;
  private readonly pdpCleanupList: UnsubscriberAsyncList;
  private readonly pdpEngineFactory: IProjectDataProviderEngineFactory<SupportedProjectInterfaces>;

  /**
   * Create a new PDP factory that is used to create PDPs
   *
   * @param projectInterfaces All the `projectInterface`s this PDP factory's PDPs can support
   * @param pdpEngineFactory Object that can create the engines for PDPs
   */
  constructor(
    pdpFactoryId: string,
    projectInterfaces: SupportedProjectInterfaces,
    pdpEngineFactory: IProjectDataProviderEngineFactory<SupportedProjectInterfaces>,
  ) {
    this.pdpFactoryId = pdpFactoryId;
    this.projectInterfaces = projectInterfaces;
    this.pdpCleanupList = new UnsubscriberAsyncList(`PDP Factory for ${projectInterfaces}`);
    this.pdpEngineFactory = pdpEngineFactory;
  }

  getAvailableProjects(
    layeringFilters?: ProjectMetadataFilterOptions,
  ): Promise<ProjectMetadataWithoutFactoryInfo[]> {
    return this.pdpEngineFactory.getAvailableProjects(layeringFilters);
  }

  /** Disposes of all PDPs that were created by this PDP Factory */
  async dispose(): Promise<boolean> {
    this.pdpIds.clear();
    return this.pdpCleanupList.runAllUnsubscribers();
  }

  /** Returns the registered network object name of a PDP for the given project ID */
  async getProjectDataProviderId(projectId: string): Promise<string> {
    const key = projectId;
    // Don't allow simultaneous gets to run for the same project data provider id as an easy way to
    // make sure we don't create multiple of the same PDP
    const lock = this.pdpIdsMutexMap.get(key);
    return lock.runExclusive(async () => {
      let pdpId = this.pdpIds.get(key);
      if (!pdpId) {
        pdpId = await this.registerProjectDataProvider(
          await this.pdpEngineFactory.createProjectDataProviderEngine(projectId),
          projectId,
        );
        if (!pdpId) throw new Error(`Could not register project data provider for ${projectId}`);
        this.pdpIds.set(key, pdpId);
      }
      return pdpId;
    });
  }

  /** Convert the PDP engine into a PDP using the data provider service */
  private async registerProjectDataProvider(
    projectDataProviderEngine: IProjectDataProviderEngine<SupportedProjectInterfaces>,
    projectId: string,
  ): Promise<string> {
    // Check to make sure new Base PDPs fulfill the requirements of the `platform.base` `projectInterface`
    if (
      this.projectInterfaces.includes(PROJECT_INTERFACE_PLATFORM_BASE) &&
      (!('getExtensionData' in projectDataProviderEngine) ||
        !('getSetting' in projectDataProviderEngine))
    )
      throw new Error(
        `\`BaseProjectDataProviderEngine\` with project id ${projectId} created by PDP Factory with id ${this.pdpFactoryId} must implement \`${PROJECT_INTERFACE_PLATFORM_BASE}\` \`projectInterface\`. See \`IBaseProjectDataProvider\` for more information`,
      );
    // ENHANCEMENT: Re-add a check for new PDPs to make sure there is some PDP somewhere that
    // fulfills `platform.base`

    const pdpId: string = `${newNonce()}-pdp`;
    const pdp = await registerEngineByType<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    >(pdpId, projectDataProviderEngine, 'pdp', {
      projectId,
      projectInterfaces: this.projectInterfaces,
    });
    this.pdpCleanupList.add(pdp);
    return pdpId;
  }
}

/**
 * Add a new Project Data Provider Factory to PAPI that uses the given engine.
 *
 * @param pdpFactoryId Unique id for this PDP factory
 * @param projectInterfaces The standardized sets of methods (`projectInterface`s) supported by the
 *   Project Data Provider Engines produced by this factory. Indicates what sort of project data
 *   should be available on the PDPEs created by this factory.
 * @param pdpEngineFactory Used in a ProjectDataProviderFactory to create ProjectDataProviders
 * @returns Promise that resolves to a disposable object when the registration operation completes
 */
export async function registerProjectDataProviderEngineFactory<
  SupportedProjectInterfaces extends ProjectInterfaces[],
>(
  pdpFactoryId: string,
  projectInterfaces: SupportedProjectInterfaces,
  pdpEngineFactory: IProjectDataProviderEngineFactory<SupportedProjectInterfaces>,
): Promise<Dispose> {
  const factoryNetworkObjectId = getPDPFactoryNetworkObjectNameFromId(pdpFactoryId);
  const factory = new ProjectDataProviderFactory(pdpFactoryId, projectInterfaces, pdpEngineFactory);
  return networkObjectService.set<ProjectDataProviderFactory<SupportedProjectInterfaces>>(
    factoryNetworkObjectId,
    factory,
    PDP_FACTORY_OBJECT_TYPE,
    { projectInterfaces },
  );
}

/**
 * Get a Project Data Provider for the given project ID.
 *
 * @example
 *
 * ```typescript
 * const pdp = await get('platformScripture.USFM_Verse', 'ProjectID12345');
 * pdp.getVerseUSFM(new VerseRef('JHN', '1', '1'));
 * ```
 *
 * @param projectInterface `projectInterface` that the project to load must support. The TypeScript
 *   type for the returned project data provider will have the project data provider interface type
 *   associated with this `projectInterface`. If the project does not implement this
 *   `projectInterface` (according to its metadata), an error will be thrown.
 * @param projectId ID for the project to load
 * @param pdpFactoryId Optional ID of the PDP factory from which to get the project data provider if
 *   the PDP factory supports this project id and project interface. If not provided, then look in
 *   all available PDP factories for the given project ID.
 * @returns Project data provider with types that are associated with the given `projectInterface`
 * @throws If did not find a project data provider for the project id that supports the requested
 *   `projectInterface` (and from the requested PDP factory if specified)
 */
export async function get<ProjectInterface extends ProjectInterfaces>(
  projectInterface: ProjectInterface,
  projectId: string,
  pdpFactoryId?: string,
): Promise<ProjectDataProviderInterfaces[ProjectInterface]> {
  const metadata = await projectLookupService.getMetadataForProject(
    projectId,
    projectInterface,
    pdpFactoryId,
  );

  const minimalMatchPdpFactoryId = projectLookupService.getMinimalMatchPdpFactoryId(
    metadata,
    projectInterface,
  );

  if (!minimalMatchPdpFactoryId)
    throw new Error(
      `pdpService.get(${projectInterface}, ${projectId}, ${pdpFactoryId}): Somehow there was a project with the id and provided projectInterface, but could not find a PDPF that provided the projectInterface. This should not happen.`,
    );

  const pdpFactory = await networkObjectService.get<ProjectDataProviderFactory<[ProjectInterface]>>(
    getPDPFactoryNetworkObjectNameFromId(minimalMatchPdpFactoryId),
  );
  if (!pdpFactory)
    throw new Error(
      `pdpService.get(${projectInterface}, ${projectId}, ${pdpFactoryId}): Cannot get project data providers with projectInterface ${projectInterface}: Could not get pdpf with id ${minimalMatchPdpFactoryId}`,
    );

  const pdpId = await pdpFactory.getProjectDataProviderId(projectId);
  const pdp = await getByType<ProjectDataProviderInterfaces[ProjectInterface]>(pdpId);
  if (!pdp)
    throw new Error(
      `pdpService.get(${projectInterface}, ${projectId}, ${pdpFactoryId}): Cannot get project data provider for project ID ${projectId}`,
    );
  return pdp;
}

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiBackendProjectDataProviderService {
  registerProjectDataProviderEngineFactory: typeof registerProjectDataProviderEngineFactory;
  get: typeof get;
}

/**
 * JSDOC SOURCE papiBackendProjectDataProviderService
 *
 * Service that registers and gets project data providers
 */
export const papiBackendProjectDataProviderService: PapiBackendProjectDataProviderService = {
  registerProjectDataProviderEngineFactory,
  get,
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiFrontendProjectDataProviderService {
  get: typeof get;
}

/**
 * JSDOC SOURCE papiFrontendProjectDataProviderService
 *
 * Service that gets project data providers
 */
export const papiFrontendProjectDataProviderService = {
  get,
};
