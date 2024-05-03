import {
  ProjectLookupServiceType,
  ProjectMetadataFilterOptions,
  ProjectMetadataWithFactoryId,
} from '@shared/models/project-lookup.service-model';
import networkObjectService from '@shared/services/network-object.service';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import logger from '@shared/services/logger.service';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { IProjectDataProviderFactory } from '@shared/services/papi-core.service';
import { ProjectTypes } from 'papi-shared-types';
import { PDP_FACTORY_OBJECT_TYPE } from '@shared/models/project-data-provider-factory.interface';

async function internalGetMetadata(
  onlyProjectId?: string,
  onlyProjectType?: string,
  onlyPdpFactoryId?: string,
): Promise<ProjectMetadataWithFactoryId[]> {
  // Get all registered PDP factories
  const pdpFactoryNames: string[] = [];
  const networkObjects = await networkObjectStatusService.getAllNetworkObjectDetails();
  Object.keys(networkObjects).forEach((networkObjectName) => {
    const details = networkObjects[networkObjectName];
    if (details.objectType === PDP_FACTORY_OBJECT_TYPE) pdpFactoryNames.push(networkObjectName);
  });

  // For each PDP factory, get all available projects
  const allProjectsMetadata = new Map<string, ProjectMetadataWithFactoryId>();
  await Promise.all(
    pdpFactoryNames.map(async (pdpFactoryId) => {
      if (onlyPdpFactoryId && onlyPdpFactoryId !== pdpFactoryId) return;
      const pdpFactory = await networkObjectService.get<IProjectDataProviderFactory>(pdpFactoryId);
      const projectsMetadata = await pdpFactory?.getAvailableProjects();
      if (projectsMetadata) {
        projectsMetadata.forEach((md) => {
          // Type assert to add the factory ID to the object
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const enrichedMd = md as ProjectMetadataWithFactoryId;
          enrichedMd.pdpFactoryId = pdpFactoryId;
          const key = `${md.projectType}-${md.id}`;
          if (allProjectsMetadata.has(key))
            logger.warn(`Project ${key} exists in multiple PDP factories`);
          else if (onlyProjectId || onlyProjectType) {
            if (
              onlyProjectId &&
              // We're treating project IDs as case insensitive strings
              // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator:
              // Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.
              onlyProjectId.localeCompare(md.id, undefined, { sensitivity: 'accent' }) !== 0
            )
              return;
            if (onlyProjectType && onlyProjectType !== md.projectType) return;
            allProjectsMetadata.set(key, enrichedMd);
          } else allProjectsMetadata.set(key, enrichedMd);
        });
      }
    }),
  );
  return Array.from(allProjectsMetadata.values());
}

async function getMetadataForAllProjects(): Promise<ProjectMetadataWithFactoryId[]> {
  return internalGetMetadata();
}

async function getMetadataForProject(
  projectId: string,
  projectType?: ProjectTypes,
  pdpFactoryId?: string,
): Promise<ProjectMetadataWithFactoryId> {
  // Wait for an appropriate PDP factory to be registered
  const timeoutInMS = 20 * 1000;
  if (pdpFactoryId) {
    await networkObjectStatusService.waitForNetworkObject(
      { objectType: PDP_FACTORY_OBJECT_TYPE, id: pdpFactoryId },
      timeoutInMS,
    );
  } else if (projectType) {
    await networkObjectStatusService.waitForNetworkObject(
      { objectType: PDP_FACTORY_OBJECT_TYPE, attributes: { projectType } },
      timeoutInMS,
    );
  } else {
    await networkObjectStatusService.waitForNetworkObject(
      { objectType: PDP_FACTORY_OBJECT_TYPE },
      timeoutInMS,
    );
  }

  const metadata = await internalGetMetadata(projectId, projectType, pdpFactoryId);
  if (metadata && metadata.length > 0) return metadata[0];
  throw new Error(
    `No project found with ID ${projectId}${projectType ? ` and project type ${projectType}` : ''}${pdpFactoryId ? ` from ${pdpFactoryId}` : ''}`,
  );
}

// #region Project utilities

export function filterProjectsMetadata(
  projectsMetadata: ProjectMetadata[],
  options: ProjectMetadataFilterOptions,
): ProjectMetadata[] {
  if (!options) return [...projectsMetadata];

  const { excludeProjectIds, includeProjectTypes, excludeProjectTypes } = options;

  if (!excludeProjectIds && !includeProjectTypes && !excludeProjectTypes)
    return [...projectsMetadata];

  // Get array of excludeProjectIds
  let excludeProjectIdsArray: string[] | undefined;
  if (excludeProjectIds)
    excludeProjectIdsArray = Array.isArray(excludeProjectIds)
      ? excludeProjectIds
      : [excludeProjectIds];

  // Get array of excludeProjectTypes RegExps
  let excludeProjectTypesArray: string[] | undefined;
  if (excludeProjectTypes)
    excludeProjectTypesArray = Array.isArray(excludeProjectTypes)
      ? excludeProjectTypes
      : [excludeProjectTypes];
  const excludeProjectTypesRegExps = excludeProjectTypesArray
    ? excludeProjectTypesArray.map((excludeProjectType) => new RegExp(excludeProjectType))
    : undefined;

  // Get array of includeProjectTypes RegExps
  let includeProjectTypesArray: string[] | undefined;
  if (includeProjectTypes)
    includeProjectTypesArray = Array.isArray(includeProjectTypes)
      ? includeProjectTypes
      : [includeProjectTypes];
  const includeProjectTypesRegExps = includeProjectTypesArray
    ? includeProjectTypesArray.map((includeProjectType) => new RegExp(includeProjectType))
    : undefined;

  return projectsMetadata.filter((projectMetadata) => {
    // If the project ID is excluded, it's out
    if (excludeProjectIdsArray?.some((id) => projectMetadata.id === id)) return false;

    // If the project type is excluded, it's out
    if (
      excludeProjectTypesRegExps?.some((excludeRegExp) =>
        excludeRegExp.test(projectMetadata.projectType),
      )
    )
      return false;

    // If the project type isn't included, it's out
    if (
      includeProjectTypesRegExps &&
      !includeProjectTypesRegExps.some((includeRegExp) =>
        includeRegExp.test(projectMetadata.projectType),
      )
    )
      return false;

    return true;
  });
}

// #endregion

const projectLookupService: ProjectLookupServiceType = {
  getMetadataForAllProjects,
  getMetadataForProject,
};

export default projectLookupService;
