import { ProjectInterfaces } from 'papi-shared-types';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { ModifierProject } from 'platform-bible-utils';

export type ProjectMetadataFilterOptions = ModifierProject & {
  /** Project IDs to include */
  includeProjectIds?: string | string[];
  /** Project IDs to exclude */
  excludeProjectIds?: string | string[];
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
   * Note: If there are multiple PDPs available whose metadata matches the conditions provided by
   * the parameters, their project metadata will all be combined, so all available
   * `projectInterface`s provided by the PDP Factory with the matching id (or all PDP Factories if
   * no id is specified) for the project will be returned. If you need `projectInterface`s supported
   * by specific PDP Factories, you can access it at {@link ProjectMetadata.pdpFactoryInfo}.
   *
   * @returns ProjectMetadata for all projects stored on the local system
   */
  getMetadataForAllProjects: () => Promise<ProjectMetadata[]>;

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
  getMetadataForProject: (
    projectId: string,
    projectInterface?: ProjectInterfaces,
    pdpFactoryId?: string,
  ) => Promise<ProjectMetadata>;
}

export const projectLookupServiceNetworkObjectName = 'ProjectLookupService';
