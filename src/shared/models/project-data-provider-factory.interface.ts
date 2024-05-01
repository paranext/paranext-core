import { Dispose } from 'platform-bible-utils';
import { ProjectMetadata } from './project-metadata.model';

export const PDP_FACTORY_OBJECT_TYPE: string = 'pdpFactory';

/**
 * Network object that creates Project Data Providers of a specific `projectType` as requested on
 * the `papi`. These are created internally within the platform to layer over
 * TypeScript-extension-provided {@link IProjectDataProviderEngineFactory} or are created by
 * independent processes on the `papi`.
 */
interface IProjectDataProviderFactory extends Dispose {
  /** Get data about all projects that can be created by this PDP factory */
  getAvailableProjects(): Promise<ProjectMetadata[]>;
  /**
   * Returns the registered network object name of a PDP for the given project ID. Called by the
   * platform when someone uses the project data provider service to access a project's data.
   *
   * @param projectId Id of the project for which to return a project data provider.
   * @returns Id of the project data provider this `IProjectDataProviderFactory` created for this
   *   project id. It should return the same project data provider for the same combination of
   *   parameters throughout one session (in other words, in general, there should just be one
   *   project data provider for one project id).
   */
  getProjectDataProviderId(projectId: string): Promise<string>;
}

export default IProjectDataProviderFactory;
