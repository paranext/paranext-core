import {
  ProjectTypes,
  ProjectDataTypes,
  ProjectDataProviderTypes,
  ProjectDataProviderEngineTypes,
} from 'declarations/project-data-types';
import { ProjectDataProviderEngineFactory } from '@shared/models/project-data-provider.model';
import networkObjectService from '@shared/services/network-object.service';
import dataProviderService from '@shared/services/data-provider.service';
import { newNonce } from '@shared/utils/util';
import UnsubscriberAsyncList from '@shared/utils/unsubscriber-async-list';

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
    const pdpId: string = newNonce();
    const pdp = await dataProviderService.registerEngine<ProjectDataTypes[ProjectType]>(
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
 * @param projectType Type of project that pdpEngineFactory supports
 * @param pdpEngineFactory Used in a ProjectDataProviderFactory to create ProjectDataProviders
 * @returns Promise that resolves when the registration operation completes
 */
export async function registerProjectDataProviderEngineFactory<ProjectType extends ProjectTypes>(
  projectType: ProjectType,
  pdpEngineFactory: ProjectDataProviderEngineFactory<ProjectType>,
): Promise<void> {
  const pdpFactoryId = getProjectDataProviderFactoryId(projectType);
  const pdpFactory = new ProjectDataProviderFactory(projectType, pdpEngineFactory);
  await networkObjectService.set<ProjectDataProviderFactory<ProjectType>>(pdpFactoryId, pdpFactory);
}

/**
 * Get a Project Data Provider for the given project details.
 * @param projectId ID for the project to load
 * @param projectType Type of the project referenced by the given ID
 * @param storageType Storage type of the project referenced by the given ID
 * @returns Data provider with types that are associated with the given project type
 */
export async function getProjectDataProvider<ProjectType extends ProjectTypes>(
  projectId: string,
  projectType: ProjectType,
  storageType: string,
): Promise<ProjectDataProviderTypes[ProjectType]> {
  const pdpFactoryId: string = getProjectDataProviderFactoryId(projectType);
  const pdpFactory = await networkObjectService.get<ProjectDataProviderFactory<ProjectType>>(
    pdpFactoryId,
  );
  if (!pdpFactory) throw new Error(`Cannot create project data providers of type ${projectType}`);

  const pdpId = await pdpFactory.getProjectDataProviderId(projectId, storageType);
  const pdp = await dataProviderService.get<ProjectDataProviderTypes[ProjectType]>(pdpId);
  if (!pdp) throw new Error(`Cannot create project data provider for project ID ${projectId}`);
  return pdp;
}
