import {
  projectSettingsServiceNetworkObjectName,
  IProjectSettingsService,
  projectSettingsServiceObjectToProxy,
} from '@shared/services/project-settings.service-model';
import networkObjectService from '@shared/services/network-object.service';
import {
  createSyncProxyForAsyncObject,
  Localized,
  ReferencedItem,
  transformAndEnsureRegExpRegExpArray,
} from 'platform-bible-utils';
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { areProjectInterfacesIncluded } from '@shared/models/project-lookup.service-model';

/**
 * Filters project settings contributions based on the provided project interfaces.
 *
 * This function iterates over a set of project settings contributions and filters their properties
 * based on whether the project's interfaces match the specified inclusion and exclusion criteria.
 *
 * @param contributions - An object containing project settings contributions, which may be
 *   localized.
 * @param projectInterfaces - An array of keys representing the project interfaces to filter the
 *   contributions by.
 * @returns A filtered set of contributions, or `undefined` if no contributions match the project
 *   interfaces.
 */
export function filterProjectSettingsContributionsByProjectInterfaces(
  contributions: Localized<ProjectSettingsContributionInfo['contributions']> | undefined,
  projectInterfaces: (keyof ProjectDataProviderInterfaces)[],
): Localized<ProjectSettingsContributionInfo['contributions']> | undefined {
  if (!contributions) return undefined;

  const resultingContributions: Localized<ProjectSettingsContributionInfo['contributions']> = {};

  Object.entries(contributions).forEach(([extensionName, contributionArray]) => {
    if (!contributionArray) return;

    const filteredContributions = contributionArray
      .map((contribution) => {
        const filteredProperties: (typeof contribution)['properties'] = {};

        Object.entries(contribution.properties).forEach(([key, property]) => {
          const { includeProjectInterfaces, excludeProjectInterfaces } = property;

          if (includeProjectInterfaces && excludeProjectInterfaces) {
            if (
              areProjectInterfacesIncluded(
                projectInterfaces,
                transformAndEnsureRegExpRegExpArray(includeProjectInterfaces),
                transformAndEnsureRegExpRegExpArray(excludeProjectInterfaces),
              )
            ) {
              // map turns this into a string, but it needs to be ReferencedItem
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              filteredProperties[key as ReferencedItem] = property;
            }
          } else {
            // map turns this into a string, but it needs to be ReferencedItem
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            filteredProperties[key as ReferencedItem] = property;
          }
        });

        return {
          ...contribution,
          properties: filteredProperties,
        };
      })
      .filter((contribution) => Object.keys(contribution.properties).length > 0);

    if (filteredContributions.length > 0) {
      resultingContributions[extensionName] = filteredContributions;
    }
  });

  return Object.keys(resultingContributions).length > 0 ? resultingContributions : undefined;
}

let networkObject: IProjectSettingsService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localProjectSettingsService =
            await networkObjectService.get<IProjectSettingsService>(
              projectSettingsServiceNetworkObjectName,
            );
          if (!localProjectSettingsService)
            throw new Error(
              `${projectSettingsServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localProjectSettingsService;
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

const projectSettingsService = createSyncProxyForAsyncObject<IProjectSettingsService>(async () => {
  await initialize();
  return networkObject;
}, projectSettingsServiceObjectToProxy);

export default projectSettingsService;
