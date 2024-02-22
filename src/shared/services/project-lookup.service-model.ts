import { ProjectMetadata } from '@shared/models/project-metadata.model';

export type ProjectMetadataFilterOptions = {
  /** Project IDs to exclude */
  excludeProjectIds?: string | string[];
  /**
   * String representation of `RegExp` pattern(s) to match against projects' `projectType` (using
   * the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if they should be included.
   *
   * Defaults to all {@link ProjectTypes}, so all projects that do not match `excludeProjectTypes`
   * will be included
   */
  includeProjectTypes?: string | string[];
  /**
   * String representation of `RegExp` pattern(s) to match against projects' `projectType` (using
   * the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if they should absolutely not be included even if they match with
   * `includeProjectTypes`
   *
   * Defaults to no {@link ProjectTypes}, so all projects that match `includeProjectTypes` will be
   * included
   */
  excludeProjectTypes?: string | string[];
};

/**
 * JSDOC SOURCE projectLookupService
 *
 * Provides metadata for projects known by the platform
 */
export interface ProjectLookupServiceType {
  /**
   * Provide metadata for all projects found on the local system
   *
   * @returns ProjectMetadata for all projects stored on the local system
   */
  getMetadataForAllProjects: () => Promise<ProjectMetadata[]>;

  /**
   * Look up metadata for a specific project ID
   *
   * @param projectId ID of the project to load
   * @returns ProjectMetadata from the 'meta.json' file for the given project
   */
  getMetadataForProject: (projectId: string) => Promise<ProjectMetadata>;
}

export const projectLookupServiceNetworkObjectName = 'ProjectLookupService';
