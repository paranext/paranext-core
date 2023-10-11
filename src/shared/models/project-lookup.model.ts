import { ProjectMetadata } from './project-metadata.model';

/** JSDOC SOURCE projectLookupService
 * Provides metadata for projects known by the platform
 */
export interface ProjectLookupServiceType {
  /**
   * Provide metadata for all projects found on the local system
   * @returns ProjectMetadata for all projects stored on the local system
   */
  getMetadataForAllProjects: () => Promise<ProjectMetadata[]>;

  /**
   * Look up metadata for a specific project ID
   * @param projectId ID of the project to load
   * @returns ProjectMetadata from the 'meta.json' file for the given project
   */
  getMetadataForProject: (projectId: string) => Promise<ProjectMetadata>;
}

export const projectLookupServiceNetworkObjectName = 'ProjectLookupService';
