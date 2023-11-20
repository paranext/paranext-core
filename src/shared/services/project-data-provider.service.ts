import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
import {
  ProjectDataProvider,
  ProjectDataProviderEngineTypes,
  ProjectDataProviderEngineFactory,
} from '@shared/models/project-data-provider-engine.model';
import networkObjectService from '@shared/services/network-object.service';
import { getByType, registerEngineByType } from '@shared/services/data-provider.service';
import { newNonce } from '@shared/utils/util';
import { Dispose } from '@shared/models/disposal.model';
import UnsubscriberAsyncList from '@shared/utils/unsubscriber-async-list';
import projectLookupService from '@shared/services/project-lookup.service';
import logger from '@shared/services/logger.service';

class ProjectDataProviderFactory<ProjectType extends ProjectTypes> {
  private readonly pdpIds: Map<string, string> = new Map();
  private readonly pdpCleanupList: UnsubscriberAsyncList;
  private readonly pdpEngineFactory: ProjectDataProviderEngineFactory<ProjectType>;

  constructor(
    projectType: ProjectType,
    pdpEngineFactory: ProjectDataProviderEngineFactory<ProjectType>,
  ) {
    this.pdpCleanupList = new UnsubscriberAsyncList(`PDP Factory for ${projectType}`);
    this.pdpEngineFactory = pdpEngineFactory;
  }

  /** Disposes of all PDPs that were created by this PDP Factory */
  async dispose(): Promise<boolean> {
    this.pdpIds.clear();
    return this.pdpCleanupList.runAllUnsubscribers();
  }

  /** Returns the registered network object name of a PDP for the given project ID and PSI */
  async getProjectDataProviderId(
    projectId: string,
    projectStorageInterpreterId: string,
  ): Promise<string> {
    const key = projectId.concat(':', projectStorageInterpreterId);
    let pdpId = this.pdpIds.get(key);
    if (!pdpId) {
      pdpId = await this.registerProjectDataProvider(
        this.pdpEngineFactory.createProjectDataProviderEngine(
          projectId,
          projectStorageInterpreterId,
        ),
      );
      if (!pdpId) throw new Error(`Could get register project data provider for ${projectId} `);
      this.pdpIds.set(key, pdpId);
    }
    return pdpId;
  }

  /** Convert the PDP engine into a PDP using the data provider service */
  private async registerProjectDataProvider(
    projectDataProviderEngine: ProjectDataProviderEngineTypes[ProjectType],
  ): Promise<string> {
    // Add a check for extensions that provide new project types
    if (!('getExtensionData' in projectDataProviderEngine))
      throw new Error('projectDataProviderEngine must implement "MandatoryProjectDataTypes"');
    const pdpId: string = `${newNonce()}-pdp`;
    const pdp = await registerEngineByType<ProjectDataTypes[ProjectType]>(
      pdpId,
      projectDataProviderEngine,
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
  pdpEngineFactory: ProjectDataProviderEngineFactory<ProjectType>,
): Promise<Dispose> {
  const factoryId = getProjectDataProviderFactoryId(projectType);
  const factory = new ProjectDataProviderFactory(projectType, pdpEngineFactory);
  return networkObjectService.set<ProjectDataProviderFactory<ProjectType>>(factoryId, factory);
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
 * @param projectType Indicates what you expect the `projectType` to be for the project with the
 *   specified id. The TypeScript type for the returned project data provider will have the project
 *   data provider type associated with this project type. If this argument does not match the
 *   project's actual `projectType` (according to its metadata), a warning will be logged
 * @param projectId ID for the project to load
 * @returns Data provider with types that are associated with the given project type
 */
export async function get<ProjectType extends ProjectTypes>(
  projectType: ProjectType,
  projectId: string,
): Promise<ProjectDataProvider[ProjectType]> {
  const metadata = await projectLookupService.getMetadataForProject(projectId);
  const { projectType: projectTypeFromMetadata } = metadata;
  if (projectType && projectType !== projectTypeFromMetadata)
    logger.warn(
      `Project type for project ${projectId} is ${projectTypeFromMetadata}, but the 'get' function on the ProjectDataProvider was run with mismatching projectType ${projectType}. This could cause issues`,
    );
  const pdpFactoryId: string = getProjectDataProviderFactoryId(projectTypeFromMetadata);
  const pdpFactory = await networkObjectService.get<ProjectDataProviderFactory<ProjectType>>(
    pdpFactoryId,
  );
  if (!pdpFactory)
    throw new Error(`Cannot create project data providers of type ${projectTypeFromMetadata}`);

  // TODO: Get the appropriate PSI ID and pass it into pdpFactory.getProjectDataProviderId instead
  // of the storageType. https://github.com/paranext/paranext-core/issues/367
  const { storageType } = metadata;
  const pdpId = await pdpFactory.getProjectDataProviderId(projectId, storageType);
  const pdp = await getByType<ProjectDataProvider[ProjectType]>(pdpId);
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
