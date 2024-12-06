import networkObjectService from '@shared/services/network-object.service';
import {
  ProjectDataProviderFactoryMetadataInfo,
  ProjectMetadata,
  ProjectMetadataWithoutFactoryInfo,
} from '@shared/models/project-metadata.model';
import logger from '@shared/services/logger.service';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { ProjectInterfaces } from 'papi-shared-types';
import IProjectDataProviderFactory, {
  PDP_FACTORY_OBJECT_TYPE,
  ProjectMetadataFilterOptions,
} from '@shared/models/project-data-provider-factory.interface';
import {
  deepClone,
  endsWith,
  ensureArray,
  escapeStringRegexp,
  slice,
  transformAndEnsureRegExpArray,
  transformAndEnsureRegExpRegExpArray,
  wait,
} from 'platform-bible-utils';

export const NETWORK_OBJECT_NAME_PROJECT_LOOKUP_SERVICE = 'ProjectLookupService';

// #region Project data provider factory utilities

/**
 * Suffix on network objects that indicates that the network object is a project data provider
 * factory
 */
const PDP_FACTORY_LABEL = '-pdpf';

/**
 * Transform the well-known pdp factory id into an id for its network object to use
 *
 * @param pdpFactoryId Id extensions use to identify this pdp factory
 * @returns Id for then network object for this pdp factory
 */
export function getPDPFactoryNetworkObjectNameFromId(pdpFactoryId: string) {
  return endsWith(pdpFactoryId, PDP_FACTORY_LABEL)
    ? pdpFactoryId
    : `${pdpFactoryId}${PDP_FACTORY_LABEL}`;
}

/**
 * Transform a network object id for a pdp factory into its well-known pdp factory id
 *
 * @param pdpFactoryNetworkObjectName Id for then network object for this pdp factory
 * @returns Id extensions use to identify this pdp factory
 */
export function getPDPFactoryIdFromNetworkObjectName(pdpFactoryNetworkObjectName: string) {
  return endsWith(pdpFactoryNetworkObjectName, PDP_FACTORY_LABEL)
    ? slice(pdpFactoryNetworkObjectName, 0, -PDP_FACTORY_LABEL.length)
    : pdpFactoryNetworkObjectName;
}

// #endregion

// #region Project lookup service

/**
 * JSDOC SOURCE projectLookupService
 *
 * Provides metadata for projects known by the platform
 *
 * Note: this service runs locally everywhere in the TypeScript processes. It is also exposed on the
 * PAPI websocket. Note these functions are all asynchronous on the PAPI websocket regardless of if
 * their types are synchronous locally.
 */
export type ProjectLookupServiceType = {
  /**
   * Provide metadata for all projects that have PDP factories
   *
   * Note: If there are multiple PDPs available whose metadata matches the conditions provided by
   * the parameters, their project metadata will all be combined, so all available
   * `projectInterface`s provided by the PDP Factory with the matching id (or all PDP Factories if
   * no id is specified) for the project will be returned. If you need `projectInterface`s supported
   * by specific PDP Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
   *
   * @param options Options for specifying filters for the project metadata retrieved. If a PDP
   *   Factory Id does not match the filter, it will not be contacted at all for this function call.
   *   As a result, a PDP factory that intends to layer over other PDP factories **must** specify
   *   its id in `options.excludePdpFactoryIds` to avoid an infinite loop of calling this function.
   * @returns ProjectMetadata for all projects stored on the local system
   */
  getMetadataForAllProjects(options?: ProjectMetadataFilterOptions): Promise<ProjectMetadata[]>;
  /**
   * Look up metadata for a specific project ID
   *
   * Note: If there are multiple PDPs available whose metadata matches the conditions provided by
   * the parameters, their project metadata will all be combined, so all available
   * `projectInterface`s provided by the PDP Factory with the matching id (or all PDP Factories if
   * no id is specified) for the project will be returned. If you need `projectInterface`s supported
   * by specific PDP Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
   *
   * @param projectId ID of the project to load
   * @param projectInterface Optional `projectInterface` of the project to load. If not provided,
   *   then look at all `projectInterface`s for the given project ID.
   * @param pdpFactoryId Optional ID of the PDP factory where the project ID should be loaded. If
   *   not provided, then look in all available PDP factories for the given project ID.
   * @returns ProjectMetadata for the given project
   */
  getMetadataForProject(
    projectId: string,
    projectInterface?: ProjectInterfaces,
    pdpFactoryId?: string,
  ): Promise<ProjectMetadata>;
  /**
   * Compare two project ids to determine if they are equal
   *
   * We're treating project IDs as case insensitive strings.
   *
   * From
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator:
   *
   * Only strings that differ in base letters or accents and other diacritic marks compare as
   * unequal. Examples: a ≠ b, a ≠ á, a = A.
   */
  areProjectIdsEqual(projectIdA: string, projectIdB: string): boolean;
  /** Filter an array of {@link ProjectMetadata} in various ways */
  filterProjectsMetadata(
    projectsMetadata: ProjectMetadata[],
    options: ProjectMetadataFilterOptions,
  ): ProjectMetadata[];
  /** Combines two project metadata filters, removing duplicate items */
  mergeMetadataFilters(
    metadataFilter1: ProjectMetadataFilterOptions | undefined,
    metadataFilter2: ProjectMetadataFilterOptions | undefined,
  ): ProjectMetadataFilterOptions;
  /**
   * Get the PDP Factory info whose `projectInterface`s are most minimally matching to the provided
   * `projectInterface`
   *
   * Hopefully this will allow us to get the PDP that most closely matches the `projectInterface`s
   * to avoid unnecessary redirects through layered PDPs
   *
   * @param projectMetadata Metadata for project for which to get minimally matching PDPF
   * @param projectInterface Which `projectInterface` to minimally match for
   * @returns PDP Factory id whose `projectInterface`s minimally match the provided
   *   `projectInterface` if at least one PDP Factory was found that supports the `projectInterface`
   *   provided
   */
  getMinimalMatchPdpFactoryId(
    projectMetadata: ProjectMetadata,
    projectInterface: ProjectInterfaces,
  ): string | undefined;
};

/** Local object of functions to run locally on each process as part of the project lookup service */
export const projectLookupServiceBase: ProjectLookupServiceType = {
  async getMetadataForAllProjects(
    options: ProjectMetadataFilterOptions = {},
  ): Promise<ProjectMetadata[]> {
    return internalGetMetadataWithRetries(options);
  },
  async getMetadataForProject(
    projectId: string,
    projectInterface?: ProjectInterfaces,
    pdpFactoryId?: string,
  ): Promise<ProjectMetadata> {
    // Wait for an appropriate PDP factory to be registered
    const timeoutInMS = 20 * 1000;
    if (pdpFactoryId) {
      try {
        await networkObjectStatusService.waitForNetworkObject(
          {
            objectType: PDP_FACTORY_OBJECT_TYPE,
            id: getPDPFactoryNetworkObjectNameFromId(pdpFactoryId),
          },
          timeoutInMS,
        );
      } catch (e) {
        throw new Error(`getMetadataForProject wait for PDPF ${pdpFactoryId} threw! ${e}`);
      }
    } else if (projectInterface) {
      try {
        await networkObjectStatusService.waitForNetworkObject(
          {
            objectType: PDP_FACTORY_OBJECT_TYPE,
            attributes: { projectInterfaces: [projectInterface] },
          },
          timeoutInMS,
        );
      } catch (e) {
        throw new Error(`getMetadataForProject wait for PDPF with ${projectInterface} threw! ${e}`);
      }
    } else {
      try {
        await networkObjectStatusService.waitForNetworkObject(
          { objectType: PDP_FACTORY_OBJECT_TYPE },
          timeoutInMS,
        );
      } catch (e) {
        throw new Error(`getMetadataForProject wait for any PDPF threw! ${e}`);
      }
    }

    const metadata = await internalGetMetadataWithRetries(
      transformGetMetadataForProjectParametersToFilter(projectId, projectInterface, pdpFactoryId),
    );

    // Get the most minimal match to the projectInterface in question. Hopefully this will give us the
    // PDP that most closely matches the projectInterfaces to avoid unnecessary redirects through
    // layered PDPs
    if (metadata && metadata.length > 0) return metadata[0];
    throw new Error(
      `No project found with ID ${projectId}${projectInterface ? ` and project interface ${projectInterface}` : ''}${pdpFactoryId ? ` from ${pdpFactoryId}` : ''}`,
    );
  },
  areProjectIdsEqual,
  filterProjectsMetadata(
    projectsMetadata: ProjectMetadata[],
    options: ProjectMetadataFilterOptions,
  ): ProjectMetadata[] {
    if (!options) return [...projectsMetadata];

    if (
      !options.excludeProjectIds &&
      !options.includeProjectIds &&
      !options.includeProjectInterfaces &&
      !options.excludeProjectInterfaces &&
      !options.includePdpFactoryIds &&
      !options.excludePdpFactoryIds
    )
      return [...projectsMetadata];

    const {
      excludeProjectIds,
      includeProjectIds,
      includeProjectInterfaces,
      excludeProjectInterfaces,
      includePdpFactoryIds,
      excludePdpFactoryIds,
    } = ensurePopulatedMetadataFilter(options);

    return projectsMetadata.filter((projectMetadata) => {
      // If the project ID isn't in the filters, it's out
      if (!isProjectIdIncluded(projectMetadata.id, includeProjectIds, excludeProjectIds))
        return false;

      // If the `projectInterface`s don't match the filters, it's out
      if (
        !areProjectInterfacesIncluded(
          projectMetadata.projectInterfaces,
          includeProjectInterfaces,
          excludeProjectInterfaces,
        )
      )
        return false;

      // If the pdp factory info doesn't match the filters, it's out
      const pdpFactoryIds = Object.keys(projectMetadata.pdpFactoryInfo);
      if (!arePdpFactoryIdsIncluded(pdpFactoryIds, includePdpFactoryIds, excludePdpFactoryIds))
        return false;

      return true;
    });
  },
  mergeMetadataFilters(
    metadataFilter1: ProjectMetadataFilterOptions | undefined,
    metadataFilter2: ProjectMetadataFilterOptions | undefined,
  ) {
    const mergedFilter: ProjectMetadataFilterOptions = {};

    if (metadataFilter1?.includeProjectIds || metadataFilter2?.includeProjectIds)
      mergedFilter.includeProjectIds = [
        ...new Set([
          ...ensureArray(metadataFilter1?.includeProjectIds),
          ...ensureArray(metadataFilter2?.includeProjectIds),
        ]),
      ];
    if (metadataFilter1?.excludeProjectIds || metadataFilter2?.excludeProjectIds)
      mergedFilter.excludeProjectIds = [
        ...new Set([
          ...ensureArray(metadataFilter1?.excludeProjectIds),
          ...ensureArray(metadataFilter2?.excludeProjectIds),
        ]),
      ];

    if (metadataFilter1?.includeProjectInterfaces || metadataFilter2?.includeProjectInterfaces)
      mergedFilter.includeProjectInterfaces = [
        ...new Set([
          ...ensureArray(metadataFilter1?.includeProjectInterfaces),
          ...ensureArray(metadataFilter2?.includeProjectInterfaces),
        ]),
      ];
    if (metadataFilter1?.excludeProjectInterfaces || metadataFilter2?.excludeProjectInterfaces)
      mergedFilter.excludeProjectInterfaces = [
        ...new Set([
          ...ensureArray(metadataFilter1?.excludeProjectInterfaces),
          ...ensureArray(metadataFilter2?.excludeProjectInterfaces),
        ]),
      ];

    if (metadataFilter1?.includePdpFactoryIds || metadataFilter2?.includePdpFactoryIds)
      mergedFilter.includePdpFactoryIds = [
        ...new Set([
          ...ensureArray(metadataFilter1?.includePdpFactoryIds),
          ...ensureArray(metadataFilter2?.includePdpFactoryIds),
        ]),
      ];
    if (metadataFilter1?.excludePdpFactoryIds || metadataFilter2?.excludePdpFactoryIds)
      mergedFilter.excludePdpFactoryIds = [
        ...new Set([
          ...ensureArray(metadataFilter1?.excludePdpFactoryIds),
          ...ensureArray(metadataFilter2?.excludePdpFactoryIds),
        ]),
      ];

    return mergedFilter;
  },
  getMinimalMatchPdpFactoryId(
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
  },
};

// #endregion

// #region Project Lookup Service utility functions

/**
 * How long since start of the current process to count as time that the PDPFs possibly still
 * haven't all started up
 */
const LOAD_TIME_GRACE_PERIOD_MS = 30 * 1000;
/**
 * How long to wait in-between attempts to get project metadata during the time since the current
 * process started
 */
const GRACE_PERIOD_WAIT_TIME_MS = 1 * 1000;

/**
 * Gets project metadata from PDPFs filtered down by various filtering options
 *
 * Note: If there are multiple PDPs available whose metadata matches the conditions provided by the
 * parameters, their project metadata will all be combined, so all available `projectInterface`s
 * provided by the PDP Factory with the matching id (or all PDP Factories if no id is specified) for
 * the project will be returned. If you need `projectInterface`s supported by specific PDP
 * Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
 */
async function internalGetMetadata(
  options: ProjectMetadataFilterOptions = {},
): Promise<ProjectMetadata[]> {
  const {
    excludeProjectIds,
    includeProjectIds,
    includeProjectInterfaces,
    excludeProjectInterfaces,
    includePdpFactoryIds,
    excludePdpFactoryIds,
  } = ensurePopulatedMetadataFilter(options);

  // Get all registered PDP factories and filter down to just the included ones
  const networkObjects = await networkObjectStatusService.getAllNetworkObjectDetails();
  const pdpFactoryIds = Object.keys(networkObjects)
    .filter((pdpfNetworkObjectName) => {
      const details = networkObjects[pdpfNetworkObjectName];
      if (
        details.objectType === PDP_FACTORY_OBJECT_TYPE &&
        // If a pdp factory id was specified, only get metadata from that pdp factory id.
        // This means the ProjectMetadata could be partial in some sense because not all projectInterfaces
        // available for that project will be in the ProjectMetadata
        arePdpFactoryIdsIncluded(
          [getPDPFactoryIdFromNetworkObjectName(pdpfNetworkObjectName)],
          includePdpFactoryIds,
          excludePdpFactoryIds,
        )
      )
        return true;
      return false;
    })
    .map(getPDPFactoryIdFromNetworkObjectName);

  // For each PDP factory, get all available projects
  const allProjectsMetadata = new Map<string, ProjectMetadata>();
  await Promise.all(
    pdpFactoryIds.map(async (pdpFactoryId) => {
      const pdpFactory = await networkObjectService.get<IProjectDataProviderFactory>(
        getPDPFactoryNetworkObjectNameFromId(pdpFactoryId),
      );
      // Get all projects from the PDP factory, and pass in the include/exclude PDP factory ids to
      // make sure two layering PDPFs don't get into an infinite loop together. Each layering PDP
      // factory should call all other pdp factories matching this filter merged with its own
      // filter. We need to pass these but not the other filter properties because we can filter the
      // other properties later in this function (and doing so gives us the full metadata for each
      // project), but we cannot filter these properties for any layering PDP factory we're calling
      const projectsMetadata = await pdpFactory?.getAvailableProjects({
        includePdpFactoryIds: options.includePdpFactoryIds,
        // Add this pdp factory id onto the excluded PDP factory IDs to be sure the Layering PDPF
        // doesn't get into an infinite loop with itself. Then it should pass these back into this
        // function to pass to other layering PDPFs so they don't call each other infinitely
        excludePdpFactoryIds: [
          ...ensureArray(options.excludePdpFactoryIds),
          escapeStringRegexp(pdpFactoryId),
        ],
      });
      if (projectsMetadata) {
        const clonedProjectsMetadata = deepClone(projectsMetadata);
        clonedProjectsMetadata.forEach((md) => {
          // The metadata that comes in from PDPs could have extra pdpFactoryInfo on it, but we
          // want to build it ourselves. So we want to delete it when it comes in
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          delete (md as ProjectMetadataWithoutFactoryInfo & Partial<ProjectMetadata>)
            .pdpFactoryInfo;

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
          if (!isProjectIdIncluded(md.id, includeProjectIds, excludeProjectIds)) return;

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
  if (includeProjectInterfaces.length > 0 || excludeProjectInterfaces.length > 0) {
    allProjectsMetadataArray = allProjectsMetadataArray.filter((projectMetadata) =>
      areProjectInterfacesIncluded(
        projectMetadata.projectInterfaces,
        includeProjectInterfaces,
        excludeProjectInterfaces,
      ),
    );
  }

  return allProjectsMetadataArray;
}

/**
 * Gets project metadata from PDPFs filtered down by various filtering options. If this process
 * started recently and this finds no project metadata, waits a bit and tries again because it may
 * be that not all PDPFs have started yet.
 *
 * Note: If there are multiple PDPs available whose metadata matches the conditions provided by the
 * parameters, their project metadata will all be combined, so all available `projectInterface`s
 * provided by the PDP Factory with the matching id (or all PDP Factories if no id is specified) for
 * the project will be returned. If you need `projectInterface`s supported by specific PDP
 * Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
 */
async function internalGetMetadataWithRetries(
  options: ProjectMetadataFilterOptions = {},
): Promise<ProjectMetadata[]> {
  let allProjectsMetadataArray: ProjectMetadata[] = await internalGetMetadata(options);

  // If we're in the first little while of the process, there's a chance not all the PDPFs have
  // loaded. Let's wait a bit and try again if we got no matching project metadata
  let retryTimes = 0;
  while (allProjectsMetadataArray.length === 0 && performance.now() < LOAD_TIME_GRACE_PERIOD_MS) {
    logger.debug(
      `Did not find any project metadata around ${performance.now()} for ${JSON.stringify(options)}. Will retry`,
    );
    // Intentionally stopping this method execution to wait some time
    // eslint-disable-next-line no-await-in-loop
    await wait(GRACE_PERIOD_WAIT_TIME_MS);
    // Intentionally stopping this method execution to try getting project metadata again
    // eslint-disable-next-line no-await-in-loop
    allProjectsMetadataArray = await internalGetMetadata(options);
    retryTimes += 1;
    if (allProjectsMetadataArray.length > 0)
      logger.debug(
        `Finally found project metadata on retry ${retryTimes} around ${performance.now()} for ${JSON.stringify(options)}! ${JSON.stringify(allProjectsMetadataArray)}`,
      );
  }
  if (allProjectsMetadataArray.length === 0) {
    logger.warn(
      `Did not find any project metadata${retryTimes > 0 ? ` on retry ${retryTimes}` : ''} for ${JSON.stringify(options)} after the grace period. If you expected to find projects for these filters, this probably indicates a problem. Maybe not all PDPFs loaded in time.`,
    );
  }

  return allProjectsMetadataArray;
}

function transformGetMetadataForProjectParametersToFilter(
  projectId?: string,
  projectInterface?: ProjectInterfaces,
  pdpFactoryId?: string,
) {
  // Escape `projectInterface` and `pdpFactoryId` because we don't want regexp matching. These
  // fields should match exactly
  return {
    includeProjectIds: projectId,
    includeProjectInterfaces: projectInterface
      ? escapeStringRegexp(projectInterface)
      : projectInterface,
    includePdpFactoryIds: pdpFactoryId ? escapeStringRegexp(pdpFactoryId) : pdpFactoryId,
  };
}

// #endregion

// #region Smaller project utilities

function ensurePopulatedMetadataFilter(options: ProjectMetadataFilterOptions) {
  const {
    excludeProjectIds,
    includeProjectIds,
    includeProjectInterfaces,
    excludeProjectInterfaces,
    includePdpFactoryIds,
    excludePdpFactoryIds,
  } = options;

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

  return {
    excludeProjectIds: excludeProjectIdsArray,
    includeProjectIds: includeProjectIdsArray,
    includeProjectInterfaces: includeProjectInterfacesRegExps,
    excludeProjectInterfaces: excludeProjectInterfacesRegExps,
    includePdpFactoryIds: includePdpFactoryIdsRegExps,
    excludePdpFactoryIds: excludePdpFactoryIdsRegExps,
  };
}

function areProjectIdsEqual(projectIdA: string, projectIdB: string): boolean {
  return projectIdA.localeCompare(projectIdB, undefined, { sensitivity: 'accent' }) === 0;
}

function isProjectIdIncluded(
  projectId: string,
  includeProjectIds: string[],
  excludeProjectIds: string[],
) {
  // If the project ID is excluded, it's out
  if (
    excludeProjectIds.length > 0 &&
    excludeProjectIds.some((excludeProjectId) => areProjectIdsEqual(excludeProjectId, projectId))
  )
    return false;

  // If the project ID is not included, it's out
  if (
    includeProjectIds.length > 0 &&
    !includeProjectIds.some((includeProjectId) => areProjectIdsEqual(includeProjectId, projectId))
  )
    return false;

  return true;
}

/**
 * Determines whether the given project interfaces are included based on specified inclusion and
 * exclusion rules.
 *
 * This function checks if a set of project interfaces meets the criteria defined by regular
 * expressions for inclusion and exclusion.
 *
 * - A project interface is excluded if it matches any of the provided exclusion patterns.
 * - A project interface is included only if it matches at least one of the provided inclusion
 *   patterns.
 *
 * @param projectInterfaces - An array of project interfaces to evaluate against the inclusion and
 *   exclusion patterns.
 * @param includeProjectInterfaces - An array of regular expressions or arrays of regular
 *   expressions defining which interfaces should be included.
 * @param excludeProjectInterfaces - An array of regular expressions or arrays of regular
 *   expressions defining which interfaces should be excluded.
 * @returns A boolean value indicating whether the project interfaces satisfy the inclusion and
 *   exclusion criteria.
 */
export function areProjectInterfacesIncluded(
  projectInterfaces: ProjectInterfaces[],
  includeProjectInterfaces: (RegExp | RegExp[])[],
  excludeProjectInterfaces: (RegExp | RegExp[])[],
) {
  // If the project interface is excluded, it's out
  if (
    excludeProjectInterfaces.length > 0 &&
    excludeProjectInterfaces.some((excludeRegExp) =>
      Array.isArray(excludeRegExp)
        ? excludeRegExp.every((subExcludeRegExp) =>
            projectInterfaces.some((projectInterface) => subExcludeRegExp.test(projectInterface)),
          )
        : projectInterfaces.some((projectInterface) => excludeRegExp.test(projectInterface)),
    )
  )
    return false;

  // If the project interface isn't included, it's out
  if (
    includeProjectInterfaces.length > 0 &&
    !includeProjectInterfaces.some((includeRegExp) =>
      Array.isArray(includeRegExp)
        ? includeRegExp.every((subIncludeRegExp) =>
            projectInterfaces.some((projectInterface) => subIncludeRegExp.test(projectInterface)),
          )
        : projectInterfaces.some((projectInterface) => includeRegExp.test(projectInterface)),
    )
  )
    return false;

  return true;
}

/** All works with the well-known PDP factory ids, not the network object names */
function arePdpFactoryIdsIncluded(
  pdpFactoryIds: string[],
  includePdpFactoryIds: RegExp[],
  excludePdpFactoryIds: RegExp[],
) {
  // If any of the PDP Factory Id are excluded, it's out
  if (
    excludePdpFactoryIds.length > 0 &&
    excludePdpFactoryIds.some((excludeRegExp) =>
      pdpFactoryIds.some((pdpFactoryId) => excludeRegExp.test(pdpFactoryId)),
    )
  )
    return false;

  // If none of the PDP Factory Ids are included, it's out
  if (
    includePdpFactoryIds.length > 0 &&
    (pdpFactoryIds.length === 0 ||
      !includePdpFactoryIds.some((includeRegExp) =>
        pdpFactoryIds.some((pdpFactoryId) => includeRegExp.test(pdpFactoryId)),
      ))
  )
    return false;

  return true;
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

// #endregion

// #region testing

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingProjectLookupService = {
  internalGetMetadata,
  compareProjectDataProviderFactoryMetadataInfoMinimalMatch,
  transformGetMetadataForProjectParametersToFilter,
  LOAD_TIME_GRACE_PERIOD_MS,
};

// #endregion
