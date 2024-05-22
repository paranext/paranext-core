import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { ProjectTypes } from 'papi-shared-types';

export type ProjectMetadataWithFactoryId = ProjectMetadata & { pdpFactoryId: string };

export type ProjectMetadataFilterOptions = {
  /** Project IDs to exclude */
  excludeProjectIds?: string | string[];
  /** Project IDs to include */
  includeProjectIds?: string | string[];
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
   * Provide metadata for all projects that have PDP factories
   *
   * @returns ProjectMetadata for all projects stored on the local system
   */
  getMetadataForAllProjects: () => Promise<ProjectMetadataWithFactoryId[]>;

  /**
   * Look up metadata for a specific project ID
   *
   * @param projectId ID of the project to load
   * @param projectType Optional type of the project to load. If not provided, then look at all
   *   project types for the given project ID.
   * @param pdpFactoryId Optional ID of the PDP factory where the project ID should be loaded. If
   *   not provided, then look in all available PDP factories for the given project ID.
   * @returns ProjectMetadata for the given project
   */
  getMetadataForProject: (
    projectId: string,
    projectType?: ProjectTypes,
    pdpFactoryId?: string,
  ) => Promise<ProjectMetadataWithFactoryId>;
}

export const projectLookupServiceNetworkObjectName = 'ProjectLookupService';
