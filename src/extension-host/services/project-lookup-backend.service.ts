import os from 'os';
import path from 'path';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import {
  projectLookupServiceNetworkObjectName,
  ProjectLookupServiceType,
} from '@shared/models/project-lookup.model';
import { joinUriPaths } from '@node/utils/util';
import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';
import * as nodeFS from '@node/services/node-file-system.service';

/** This points to the directory where all of the projects "[name]_[id]" subdirectories live */
const PROJECTS_ROOT_URI = joinUriPaths('file://', os.homedir(), '.platform.bible', 'projects');
const METADATA_FILE = 'meta.json';

/** Get URIs to all projects stored locally on the file system */
async function getProjectUris(): Promise<string[]> {
  // Get all the directories in the projects root that match "<name>_<id>"
  const entries = await nodeFS.readDir(PROJECTS_ROOT_URI, (entry) => {
    return /^\w+_[^\W_]+$/.test(path.parse(entry).name);
  });

  return entries.directory;
}

/** Convert the contents of a 'meta.json' file to an object, ensuring its project ID is what we expect */
function convertToMetadata(jsonString: string, expectedID: string): ProjectMetadata {
  const md: ProjectMetadata = JSON.parse(jsonString);
  if ('id' in md && 'name' in md && 'storageType' in md && 'projectType' in md) {
    if (md.id.toUpperCase() !== expectedID.toUpperCase()) throw new Error('Mismatched IDs');
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
        const projectID = uri.substring(uri.lastIndexOf('_') + 1);
        retVal.add(convertToMetadata(metadataString, projectID));
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
  return convertToMetadata(metadataString, projectId);
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
  const existingValue = localProjects.get(projectId);
  if (existingValue) return existingValue;

  // Try to load the project directly in case the files were copied after initialization
  const newMetadata = await getProjectMetadata(projectId);
  localProjects.set(newMetadata.id, newMetadata);
  return newMetadata;
}

const projectLookupService: ProjectLookupServiceType = {
  getMetadataForAllProjects,
  getMetadataForProject,
};

let networkObject: ProjectLookupServiceType;

/**
 * Register the network object that backs the PAPI project lookup service
 */
export async function startProjectLookupService(): Promise<void> {
  await initialize();
  networkObject = await networkObjectService.set<ProjectLookupServiceType>(
    projectLookupServiceNetworkObjectName,
    projectLookupService,
  );
}

export function getNetworkObject(): ProjectLookupServiceType {
  return networkObject;
}
