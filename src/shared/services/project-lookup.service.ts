import {
  projectLookupServiceNetworkObjectName,
  ProjectLookupServiceType,
  ProjectMetadataFilterOptions,
} from '@shared/services/project-lookup.service-model';
import networkObjectService from '@shared/services/network-object.service';
import { ProjectMetadata } from '@shared/models/project-metadata.model';

let networkObject: ProjectLookupServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localProjectLookupService =
            await networkObjectService.get<ProjectLookupServiceType>(
              projectLookupServiceNetworkObjectName,
            );
          if (!localProjectLookupService)
            throw new Error(
              `${projectLookupServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localProjectLookupService;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
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
  getMetadataForAllProjects: async () => {
    await initialize();
    return networkObject.getMetadataForAllProjects();
  },
  getMetadataForProject: async (projectId: string) => {
    await initialize();
    return networkObject.getMetadataForProject(projectId);
  },
};

export default projectLookupService;
