import { ProjectTypes, ProjectDataTypes, ProjectDataProviders } from 'papi-shared-types';
import {
  ProjectDataProviderEngineTypes,
  IProjectDataProviderEngineFactory,
} from '@shared/models/project-data-provider-engine.model';
import networkObjectService from '@shared/services/network-object.service';
import { getByType, registerEngineByType } from '@shared/services/data-provider.service';
import { newNonce } from '@shared/utils/util';
import { Dispose, MutexMap, UnsubscriberAsyncList } from 'platform-bible-utils';
import IProjectDataProviderFactory, {
  PDP_FACTORY_OBJECT_TYPE,
} from '@shared/models/project-data-provider-factory.interface';
import projectLookupService from '@shared/services/project-lookup.service';
import { ProjectMetadata } from '@shared/services/papi-core.service';

/**
 * Class that creates Project Data Providers of a specified `projectType`. Layers over
 * extension-provided {@link IProjectDataProviderEngineFactory}. Internal only
 */
class ProjectDataProviderFactory<ProjectType extends ProjectTypes>
  implements IProjectDataProviderFactory
{
  private readonly pdpIdsMutexMap = new MutexMap();
  private readonly pdpIds: Map<string, string> = new Map();
  private readonly projectType: ProjectType;
  private readonly pdpCleanupList: UnsubscriberAsyncList;
  private readonly pdpEngineFactory: IProjectDataProviderEngineFactory<ProjectType>;

  /**
   * Create a new PDP factory that is used to create PDPs
   *
   * @param projectType Specified which project type this PDP factory supports
   * @param pdpEngineFactory Object that can create the engines for PDPs
   */
  constructor(
    projectType: ProjectType,
    pdpEngineFactory: IProjectDataProviderEngineFactory<ProjectType>,
  ) {
    this.projectType = projectType;
    this.pdpCleanupList = new UnsubscriberAsyncList(`PDP Factory for ${projectType}`);
    this.pdpEngineFactory = pdpEngineFactory;
  }

  /**
   * Returns a list of metadata objects for all projects that can be the targets of PDPs created by
   * this factory
   */
  getAvailableProjects(): Promise<ProjectMetadata[]> {
    return this.pdpEngineFactory.getAvailableProjects();
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
    projectDataProviderEngine: ProjectDataProviderEngineTypes[ProjectType],
    projectId: string,
  ): Promise<string> {
    // Add a check for extensions that provide new project types to make sure they fulfill
    // `MandatoryProjectDataTypes`
    if (
      !('getExtensionData' in projectDataProviderEngine) ||
      !('getSetting' in projectDataProviderEngine)
    )
      throw new Error('projectDataProviderEngine must implement "MandatoryProjectDataTypes"');
    const pdpId: string = `${newNonce()}-pdp`;
    const pdp = await registerEngineByType<ProjectDataTypes[ProjectType]>(
      pdpId,
      projectDataProviderEngine,
      'pdp',
      {
        projectId,
        projectType: this.projectType,
      },
    );
    this.pdpCleanupList.add(pdp);
    return pdpId;
  }
}

function getProjectDataProviderFactoryId(projectType: ProjectTypes) {
  return `platform.pdpFactory-${projectType}`;
}

/**
 * Add a new Project Data Provider Factory to PAPI that uses the given engine. There must not be an
 * existing factory already that handles the same project type or this operation will fail.
 *
 * @param projectType Type of project that pdpEngineFactory supports
 * @param pdpEngineFactory Used in a ProjectDataProviderFactory to create ProjectDataProviders
 * @returns Promise that resolves to a disposable object when the registration operation completes
 */
export async function registerProjectDataProviderEngineFactory<ProjectType extends ProjectTypes>(
  projectType: ProjectType,
  pdpEngineFactory: IProjectDataProviderEngineFactory<ProjectType>,
): Promise<Dispose> {
  const factoryId = getProjectDataProviderFactoryId(projectType);
  const factory = new ProjectDataProviderFactory(projectType, pdpEngineFactory);
  return networkObjectService.set<ProjectDataProviderFactory<ProjectType>>(
    factoryId,
    factory,
    PDP_FACTORY_OBJECT_TYPE,
    { projectType },
  );
}

/**
 * Get a Project Data Provider for the given project ID.
 *
 * @example
 *
 * ```typescript
 * const pdp = await get('ParatextStandard', 'ProjectID12345');
 * pdp.getVerse(new VerseRef('JHN', '1', '1'));
 * ```
 *
 * @param projectType Type of the project to load. The TypeScript type for the returned project data
 *   provider will have the project data provider type associated with this project type. If this
 *   argument does not match the project's actual `projectType` (according to its metadata), an
 *   error will be thrown.
 * @param projectId ID for the project to load
 * @returns Data provider with types that are associated with the given project type
 */
export async function get<ProjectType extends ProjectTypes>(
  projectType: ProjectType,
  projectId: string,
): Promise<ProjectDataProviders[ProjectType]> {
  const metadata = await projectLookupService.getMetadataForProject(projectId, projectType);
  const pdpFactory = await networkObjectService.get<ProjectDataProviderFactory<ProjectType>>(
    metadata.pdpFactoryId,
  );
  if (!pdpFactory) throw new Error(`Cannot create project data providers of type ${projectType}`);

  const pdpId = await pdpFactory.getProjectDataProviderId(projectId);
  const pdp = await getByType<ProjectDataProviders[ProjectType]>(pdpId);
  if (!pdp) throw new Error(`Cannot create project data provider for project ID ${projectId}`);
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
