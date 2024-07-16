import { Dispose, ModifierProject } from 'platform-bible-utils';
import { ProjectMetadataWithoutFactoryInfo } from './project-metadata.model';

export const PDP_FACTORY_OBJECT_TYPE: string = 'pdpFactory';

export type ProjectMetadataFilterOptions = ModifierProject & {
  /** Project IDs to include */
  includeProjectIds?: string | string[];
  /** Project IDs to exclude */
  excludeProjectIds?: string | string[];
};

/**
 * Network object that creates Project Data Providers of a specific set of `projectInterface`s as
 * requested on the `papi`. These are created internally within the platform to layer over
 * TypeScript-extension-provided {@link IProjectDataProviderEngineFactory} or are created by
 * independent processes on the `papi`.
 *
 * A PDP Factory can provide its own unique project ids (Base PDP Factory) or layer over other PDPFs
 * and provide additional `projectInterface`s on those projects (Layering PDP Factory). Base PDP
 * Factories must create PDPs that support the `platform.base` `projectInterface`. See
 * {@link IBaseProjectDataProvider} and {@link ProjectDataProviderInterfaces} for more information.
 */
interface IProjectDataProviderFactory extends Dispose {
  /**
   * JSDOC SOURCE IProjectDataProviderFactoryGetAvailableProjects
   *
   * Get metadata about all projects that can be served by PDPs created by this PDP factory.
   *
   * If this is a Base PDP Factory, this method should return this PDP Factory's own unique project
   * IDs.
   *
   * If this is a Layering PDP Factory, this method should call
   * `papi.projectLookup.getMetadataForAllProjects` with some set of metadata filters in order to
   * determine which projects it can layer over. The set of metadata filters relevant to this PDP
   * Factory **absolutely must** be merged with the `layeringFilters` provided using
   * `papi.projectLookup.mergeMetadataFilters`, or it will get into an infinite loop of calling
   * other layering PDPs.
   *
   * WARNING: If this is a Layering PDP Factory, it **absolutely must** merge its metadata filters
   * with `layeringFilters` provided using `papi.projectLookup.mergeMetadataFilters`! Otherwise you
   * will cause an infinite loop that will break things.
   *
   * @param layeringFilters If applicable, filters used to prevent this Layering PDP Factory from
   *   entering an infinite loop with another Layering PDP Factory. You **absolutely must** merge
   *   these filters with your own filters using `papi.projectLookup.mergeMetadataFilters` when
   *   calling `papi.projectLookup.getMetadataForAllProjects` inside this method. If you are not
   *   calling `getMetadataForAllProjects` inside this method (likely if this is a Base PDPF), you
   *   can safely ignore this parameter.
   */
  getAvailableProjects(
    layeringFilters?: ProjectMetadataFilterOptions,
  ): Promise<ProjectMetadataWithoutFactoryInfo[]>;
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
