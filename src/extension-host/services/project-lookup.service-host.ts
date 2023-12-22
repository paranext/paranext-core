import os from 'os';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import {
  projectLookupServiceNetworkObjectName,
  ProjectLookupServiceType,
} from '@shared/services/project-lookup.service-model';
import { joinUriPaths } from '@node/utils/util';
import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';
import * as nodeFS from '@node/services/node-file-system.service';
import { deserialize } from '@shared/utils/papi-util';
import { wait } from '@shared/utils/util';

/** This points to the directory where all of the project subdirectories live */
const PROJECTS_ROOT_URI = joinUriPaths('file://', os.homedir(), '.platform.bible', 'projects');
const METADATA_FILE = 'meta.json';

/** Get URIs to all projects stored locally on the file system */
async function getProjectUris(): Promise<string[]> {
  // Get all the directories in the projects root
  let entries = await nodeFS.readDir(PROJECTS_ROOT_URI);
  if (entries.directory.length === 0) {
    // TODO: This is a temporary solution that waits for a project directory when none are found.
    // Ideally we would want to run `reloadMetadata()` whenever
    // a project is added to or removed from the projects directory.
    // https://github.com/paranext/paranext-core/issues/691
    await wait(5000);
    entries = await nodeFS.readDir(PROJECTS_ROOT_URI);
  }
  return entries.directory;
}

/**
 * Convert the contents of a 'meta.json' file to an object, ensuring its project ID is what we
 * expect
 */
function convertToMetadata(jsonString: string): ProjectMetadata {
  const md: ProjectMetadata = deserialize(jsonString);
  if ('id' in md && 'name' in md && 'storageType' in md && 'projectType' in md) {
    return md;
  }
  throw new Error(`Invalid ProjectMetadata JSON: ${jsonString}`);
}

/** Load the contents of all 'meta.json' files from disk */
async function loadAllProjectsMetadata(): Promise<Set<ProjectMetadata>> {
  const retVal = new Set<ProjectMetadata>();
  const uris = await getProjectUris();

  await Promise.all(
    uris.map(async (uri) => {
      try {
        const metadataString = await nodeFS.readFileText(joinUriPaths(uri, METADATA_FILE));
        retVal.add(convertToMetadata(metadataString));
      } catch (error) {
        logger.warn(`Skipping project directory with missing/invalid metadata file: ${uri}`);
      }
    }),
  );

  return retVal;
}

/** Lookup or load the contents of a 'meta.json' file from disk for a given project ID */
async function getProjectMetadata(projectId: string): Promise<ProjectMetadata> {
  const idUpper = projectId.toUpperCase();
  const uris = await getProjectUris();
  const matches = uris.filter((uri) => uri.toUpperCase().endsWith(`_${idUpper}`));
  if (matches.length === 0) throw new Error(`No known project with ID ${projectId}`);
  if (matches.length > 1) throw new Error(`${matches.length} projects share the ID ${projectId}`);

  const metadataPath = joinUriPaths(matches[0], METADATA_FILE);
  const metadataString = await nodeFS.readFileText(metadataPath);
  return convertToMetadata(metadataString);
}

// Map of project ID to 'meta.json' contents for that project
const localProjects = new Map<string, ProjectMetadata>();

/** Refresh the map of all project 'meta.json' data */
async function reloadMetadata(): Promise<void> {
  const allMetadata = await loadAllProjectsMetadata();
  localProjects.clear();
  allMetadata.forEach((metadata) => {
    localProjects.set(metadata.id.toUpperCase(), metadata);
  });
}

let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await reloadMetadata();
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

async function getMetadataForAllProjects(): Promise<ProjectMetadata[]> {
  await initialize();
  return [...localProjects.values()];
}

async function getMetadataForProject(projectId: string): Promise<ProjectMetadata> {
  await initialize();
  const idUpper = projectId.toUpperCase();
  const existingValue = localProjects.get(idUpper);
  if (existingValue) return existingValue;

  // Try to load the project directly in case the files were copied after initialization
  const newMetadata = await getProjectMetadata(idUpper);
  localProjects.set(newMetadata.id, newMetadata);
  return newMetadata;
}

const projectLookupService: ProjectLookupServiceType = {
  getMetadataForAllProjects,
  getMetadataForProject,
};

/** Register the network object that backs the PAPI project lookup service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `project-lookup.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startProjectLookupService(): Promise<void> {
  await initialize();
  await networkObjectService.set<ProjectLookupServiceType>(
    projectLookupServiceNetworkObjectName,
    projectLookupService,
  );
}
