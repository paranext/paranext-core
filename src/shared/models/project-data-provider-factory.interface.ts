import { Dispose } from 'platform-bible-utils';

/**
 * Network object that creates Project Data Providers of a specific `projectType` as requested on
 * the `papi`. These are created internally within the platform to layer over
 * TypeScript-extension-provided {@link IProjectDataProviderEngineFactory} or are created by
 * independent processes on the `papi`.
 */
interface IProjectDataProviderFactory extends Dispose {
  /**
   * Returns the registered network object name of a PDP for the given project ID and PSI. Called by
   * the platform when someone uses the project data provider service to access a project's data.
   *
   * @param projectId Id of the project for which to return a project data provider.
   * @param projectStorageInterpreterId Id of the project storage interpreter that corresponds to
   *   the project to access
   * @returns Id of the project data provider this `IProjectDataProviderFactory` created for this
   *   project id. It should return the same project data provider for the same combination of
   *   parameters throughout one session (in other words, in general, there should just be one
   *   project data provider for one project id).
   */
  getProjectDataProviderId(projectId: string, projectStorageInterpreterId: string): Promise<string>;
}

export default IProjectDataProviderFactory;
