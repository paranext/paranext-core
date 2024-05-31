import {
  ProjectLookupServiceType,
  ProjectMetadataFilterOptions,
} from '@shared/models/project-lookup.service-model';
import networkObjectService from '@shared/services/network-object.service';
import {
  ProjectDataProviderFactoryMetadataInfo,
  ProjectMetadata,
} from '@shared/models/project-metadata.model';
import logger from '@shared/services/logger.service';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { IProjectDataProviderFactory } from '@shared/services/papi-core.service';
import { ProjectInterfaces } from 'papi-shared-types';
import { PDP_FACTORY_OBJECT_TYPE } from '@shared/models/project-data-provider-factory.interface';
import { deepClone } from 'platform-bible-utils';

/**
 * Note: If there are multiple PDPs available whose metadata matches the conditions provided by the
 * parameters, their project metadata will all be combined, so all available `projectInterface`s
 * provided by the PDP Factory with the matching id (or all PDP Factories if no id is specified) for
 * the project will be returned. If you need `projectInterface`s supported by specific PDP
 * Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
 */
async function internalGetMetadata(
  onlyProjectId?: string,
  onlyProjectInterface?: string,
  onlyPdpFactoryId?: string,
): Promise<ProjectMetadata[]> {
  // Get all registered PDP factories
  const networkObjects = await networkObjectStatusService.getAllNetworkObjectDetails();
  const pdpFactoryNames = Object.keys(networkObjects).filter((networkObjectName) => {
    const details = networkObjects[networkObjectName];
    if (
      details.objectType === PDP_FACTORY_OBJECT_TYPE &&
      // If a pdp factory id was specified, only get metadata from that pdp factory id.
      // This means the ProjectMetadata could be partial in some sense because not all projectInterfaces
      // available for that project will be in the ProjectMetadata
      (!onlyPdpFactoryId || onlyPdpFactoryId === networkObjectName)
    )
      return true;
    return false;
  });

  // For each PDP factory, get all available projects
  const allProjectsMetadata = new Map<string, ProjectMetadata>();
  await Promise.all(
    pdpFactoryNames.map(async (pdpFactoryId) => {
      const pdpFactory = await networkObjectService.get<IProjectDataProviderFactory>(pdpFactoryId);
      const projectsMetadata = await pdpFactory?.getAvailableProjects();
      if (projectsMetadata) {
        const clonedProjectsMetadata = deepClone(projectsMetadata);
        clonedProjectsMetadata.forEach((md) => {
          // Type assert to add the factory info to the object
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const enrichedMd = allProjectsMetadata.get(md.id) ?? (md as ProjectMetadata);
          if (!enrichedMd.pdpFactoryInfo) enrichedMd.pdpFactoryInfo = {};

          if (pdpFactoryId in enrichedMd.pdpFactoryInfo) {
            logger.warn(
              `Project ${md.id} already has metadata from pdp factory ${pdpFactoryId}. Skipping additional metadata: ${JSON.stringify(md)}`,
            );
            return;
          }

          // Filter out metadata with the wrong project id
          if (
            onlyProjectId &&
            // We're treating project IDs as case insensitive strings
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator:
            // Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.
            onlyProjectId.localeCompare(md.id, undefined, { sensitivity: 'accent' }) !== 0
          )
            return;

          // Wait to filter metadata by `projectInterface` because we want to return ProjectMetadata
          // for a project including all available `projectInterface`s, not just `projectInterface`s
          // provided by PDPFs that provide that `projectInterface`

          // This project metadata passes project id and pdpf id! Merge it into the existing metadata
          // Put the factory info on
          enrichedMd.pdpFactoryInfo[pdpFactoryId] = {
            projectInterfaces: [...md.projectInterfaces],
          };
          // If there is metadata already in the map, add the new `projectInterface`s
          if (allProjectsMetadata.has(md.id)) {
            md.projectInterfaces.forEach((newProjectInterface) => {
              if (!enrichedMd.projectInterfaces.includes(newProjectInterface))
                enrichedMd.projectInterfaces.push(newProjectInterface);
            });
          } else allProjectsMetadata.set(md.id, enrichedMd);
        });
      }
    }),
  );

  let allProjectsMetadataArray = Array.from(allProjectsMetadata.values());

  // Filter out metadata without the right `projectInterface`
  if (onlyProjectInterface) {
    allProjectsMetadataArray = allProjectsMetadataArray.filter((projectMetadata) =>
      projectMetadata.projectInterfaces.some(
        (projectInterface) => onlyProjectInterface === projectInterface,
      ),
    );
  }

  return allProjectsMetadataArray;
}

async function getMetadataForAllProjects(): Promise<ProjectMetadata[]> {
  return internalGetMetadata();
}

async function getMetadataForProject(
  projectId: string,
  projectInterface?: ProjectInterfaces,
  pdpFactoryId?: string,
): Promise<ProjectMetadata> {
  // Wait for an appropriate PDP factory to be registered
  const timeoutInMS = 20 * 1000;
  if (pdpFactoryId) {
    await networkObjectStatusService.waitForNetworkObject(
      { objectType: PDP_FACTORY_OBJECT_TYPE, id: pdpFactoryId },
      timeoutInMS,
    );
  } else if (projectInterface) {
    await networkObjectStatusService.waitForNetworkObject(
      {
        objectType: PDP_FACTORY_OBJECT_TYPE,
        attributes: { projectInterfaces: [projectInterface] },
      },
      timeoutInMS,
    );
  } else {
    await networkObjectStatusService.waitForNetworkObject(
      { objectType: PDP_FACTORY_OBJECT_TYPE },
      timeoutInMS,
    );
  }

  const metadata = await internalGetMetadata(projectId, projectInterface, pdpFactoryId);
  // Get the most minimal match to the projectInterface in question. Hopefully this will give us the
  // PDP that most closely matches the projectInterfaces to avoid unnecessary redirects through
  // layered PDPs
  if (metadata && metadata.length > 0) return metadata[0];
  throw new Error(
    `No project found with ID ${projectId}${projectInterface ? ` and project interface ${projectInterface}` : ''}${pdpFactoryId ? ` from ${pdpFactoryId}` : ''}`,
  );
}

// #region Project utilities

function ensureArray<T>(maybeArray: T | T[] | undefined): T[] {
  if (!maybeArray) return [];

  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function transformAndEnsureRegExpArray(stringMaybeArray: string | string[] | undefined): RegExp[] {
  if (!stringMaybeArray) return [];

  const stringArray = ensureArray(stringMaybeArray);

  const regExpArray = stringArray.map((str) => new RegExp(str));

  return regExpArray;
}

function transformAndEnsureRegExpRegExpArray(
  stringStringMaybeArray: string | (string | string[])[] | undefined,
): (RegExp | RegExp[])[] {
  if (!stringStringMaybeArray) return [];

  const stringStringArray = ensureArray(stringStringMaybeArray);

  const regExpRegExpArray = stringStringArray.map((stringMaybeStringArray) =>
    Array.isArray(stringMaybeStringArray)
      ? stringMaybeStringArray.map((str) => new RegExp(str))
      : new RegExp(stringMaybeStringArray),
  );

  return regExpRegExpArray;
}

export function filterProjectsMetadata(
  projectsMetadata: ProjectMetadata[],
  options: ProjectMetadataFilterOptions,
): ProjectMetadata[] {
  if (!options) return [...projectsMetadata];

  const {
    excludeProjectIds,
    includeProjectIds,
    includeProjectInterfaces,
    excludeProjectInterfaces,
    includePdpFactoryIds,
    excludePdpFactoryIds,
  } = options;

  if (
    !excludeProjectIds &&
    !includeProjectIds &&
    !includeProjectInterfaces &&
    !excludeProjectInterfaces &&
    !includePdpFactoryIds &&
    !excludePdpFactoryIds
  )
    return [...projectsMetadata];

  // Get array of excludeProjectIds
  const excludeProjectIdsArray = ensureArray(excludeProjectIds);

  // Get array of includeProjectIds
  const includeProjectIdsArray = ensureArray(includeProjectIds);

  // Get array of excludeProjectInterfaces RegExps
  const excludeProjectInterfacesRegExps =
    transformAndEnsureRegExpRegExpArray(excludeProjectInterfaces);

  // Get array of includeProjectInterfaces RegExps
  const includeProjectInterfacesRegExps =
    transformAndEnsureRegExpRegExpArray(includeProjectInterfaces);

  // Get array of includePdpFactoryIds RegExps
  const includePdpFactoryIdsRegExps = transformAndEnsureRegExpArray(includePdpFactoryIds);

  // Get array of excludePdpFactoryIds RegExps
  const excludePdpFactoryIdsRegExps = transformAndEnsureRegExpArray(excludePdpFactoryIds);

  return projectsMetadata.filter((projectMetadata) => {
    // If the project ID is excluded, it's out
    if (excludeProjectIdsArray.length > 0 && excludeProjectIdsArray.includes(projectMetadata.id))
      return false;

    // If the project ID is not included, it's out
    if (includeProjectIdsArray.length > 0 && !includeProjectIdsArray.includes(projectMetadata.id))
      return false;

    // If the project interface is excluded, it's out
    if (
      excludeProjectInterfacesRegExps.length > 0 &&
      excludeProjectInterfacesRegExps.some((excludeRegExp) =>
        Array.isArray(excludeRegExp)
          ? excludeRegExp.every((subExcludeRegExp) =>
              projectMetadata.projectInterfaces.some((projectInterface) =>
                subExcludeRegExp.test(projectInterface),
              ),
            )
          : projectMetadata.projectInterfaces.some((projectInterface) =>
              excludeRegExp.test(projectInterface),
            ),
      )
    )
      return false;

    // If the project interface isn't included, it's out
    if (
      includeProjectInterfacesRegExps.length > 0 &&
      !includeProjectInterfacesRegExps.some((includeRegExp) =>
        Array.isArray(includeRegExp)
          ? includeRegExp.every((subIncludeRegExp) =>
              projectMetadata.projectInterfaces.some((projectInterface) =>
                subIncludeRegExp.test(projectInterface),
              ),
            )
          : projectMetadata.projectInterfaces.some((projectInterface) =>
              includeRegExp.test(projectInterface),
            ),
      )
    )
      return false;

    const pdpFactoryIds = Object.keys(projectMetadata.pdpFactoryInfo);
    // If the PDP Factory Id is excluded, it's out
    if (
      excludePdpFactoryIdsRegExps.length > 0 &&
      excludePdpFactoryIdsRegExps.some((excludeRegExp) =>
        pdpFactoryIds.some((pdpFactoryId) => excludeRegExp.test(pdpFactoryId)),
      )
    )
      return false;

    // If the PDP Factory Id isn't included, it's out
    if (
      includePdpFactoryIdsRegExps.length > 0 &&
      (pdpFactoryIds.length === 0 ||
        !includePdpFactoryIdsRegExps.some((includeRegExp) =>
          pdpFactoryIds.some((pdpFactoryId) => includeRegExp.test(pdpFactoryId)),
        ))
    )
      return false;

    return true;
  });
}

/**
 * Compare function (for array sorting and such) that compares two PDPF Metadata infos by most
 * minimal match to the `projectInterface` in question.
 *
 * Hopefully this will allow us to get the PDP that most closely matches the `projectInterface`s to
 * avoid unnecessary redirects through layered PDPs
 *
 * @param pdpFMetadataInfoA First ProjectDataProviderFactoryMetadataInfo to compare
 * @param pdpFMetadataInfoB Second ProjectDataProviderFactoryMetadataInfo to compare
 * @returns -1 if a is less than b, 0 if equal, and 1 otherwise
 */
function compareProjectDataProviderFactoryMetadataInfoMinimalMatch(
  pdpFMetadataInfoA: ProjectDataProviderFactoryMetadataInfo | undefined,
  pdpFMetadataInfoB: ProjectDataProviderFactoryMetadataInfo | undefined,
): -1 | 0 | 1 {
  if (!pdpFMetadataInfoA) {
    if (!pdpFMetadataInfoB) return 0;
    return 1;
  }
  if (!pdpFMetadataInfoB) {
    return -1;
  }
  // Note: we could convert these arrays to sets first to ensure no duplicates to make sure
  // these comparisons are accurate, but let's just say extension developers should write them
  // with no duplicates until we have a reason to say something else
  const lengthA = pdpFMetadataInfoA.projectInterfaces.length;
  const lengthB = pdpFMetadataInfoB.projectInterfaces.length;

  // If one only has the original interface or is smaller than the other, it should be first
  if (lengthA === 1 || lengthA < lengthB) return -1;
  if (lengthB === 1 || lengthB < lengthA) return 1;
  // Otherwise they are pretty much the same as far as we can tell
  return 0;
}

/**
 * Get the PDP Factory info whose `projectInterface`s are most minimally matching to the provided
 * `projectInterface`
 *
 * Hopefully this will allow us to get the PDP that most closely matches the `projectInterface`s to
 * avoid unnecessary redirects through layered PDPs
 *
 * @param projectMetadata Metadata for project for which to get minimally matching PDPF
 * @param projectInterface Which `projectInterface` to minimally match for
 * @returns PDP Factory id whose `projectInterface`s minimally match the provided `projectInterface`
 *   if at least one PDP Factory was found that supports the `projectInterface` provided
 */
export function getMinimalMatchPdpFactoryId(
  projectMetadata: ProjectMetadata,
  projectInterface: ProjectInterfaces,
): string | undefined {
  const minimalMatch = Object.entries(projectMetadata.pdpFactoryInfo).reduce(
    (previousPdpfInfoEntry, nextPdpfInfoEntry) =>
      nextPdpfInfoEntry[1]?.projectInterfaces.includes(projectInterface) &&
      compareProjectDataProviderFactoryMetadataInfoMinimalMatch(
        previousPdpfInfoEntry[1],
        nextPdpfInfoEntry[1],
      ) > 0
        ? nextPdpfInfoEntry
        : previousPdpfInfoEntry,
    ['', undefined],
  );

  return minimalMatch[0] && minimalMatch[1] ? minimalMatch[0] : undefined;
}

// #endregion

// #region testing

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingProjectLookupService = {
  internalGetMetadata,
  compareProjectDataProviderFactoryMetadataInfoMinimalMatch,
};

// #endregion

const projectLookupService: ProjectLookupServiceType = {
  getMetadataForAllProjects,
  getMetadataForProject,
};

export default projectLookupService;
