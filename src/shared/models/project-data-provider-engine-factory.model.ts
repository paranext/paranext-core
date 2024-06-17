import { ProjectInterfaces } from 'papi-shared-types';
import { ProjectMetadataFilterOptions } from '@shared/models/project-data-provider-factory.interface';
import { ProjectMetadataWithoutFactoryInfo } from '@shared/models/project-metadata.model';
import { IProjectDataProviderEngine } from '@shared/models/project-data-provider-engine.model';
import projectLookupService from '@shared/services/project-lookup.service';
import { escapeStringRegexp } from 'platform-bible-utils';

/**
 * A factory object registered with the papi that creates a Project Data Provider Engine for each
 * project with the factory's specified `projectInterface`s when the papi requests. Used by the papi
 * to create {@link IProjectDataProviderEngine}s for a specific project and `projectInterface` when
 * someone gets a project data provider with `papi.projectDataProviders.get`. When this factory
 * object is registered with `papi.projectDataProviders.registerProjectDataProviderEngineFactory`,
 * the papi creates a {@link ProjectDataProviderFactory} that layers over this engine to create
 * {@link IProjectDataProvider}s.
 *
 * Project Data Provider Engine Factories create Project Data Provider Engines for specific
 * `projectInterface`s. For each project id available on a Project Data Provider Factory, the
 * factory that supports that project with some set of `projectInterface`s creates a new instance of
 * a PDP with the supported `projectInterface`s.
 *
 * A PDP Factory can provide its own unique project ids (Base PDP Factory) or layer over other PDPFs
 * and provide additional `projectInterface`s on those projects (Layering PDP Factory). Base PDP
 * Factories must create PDPs that support the `platform.base` `projectInterface`. See
 * {@link IBaseProjectDataProvider} and {@link ProjectDataProviderInterfaces} for more information.
 *
 * WARNING: For Layering PDPFs, `getAvailableProjects` has very specific requirements that
 * **absolutely must** be met.
 *
 * To make creating a Layering PDPF easier, you can extend
 * {@link LayeringProjectDataProviderEngineFactory}, which automatically fulfills the special
 * requirements for Layering PDPFs. We highly recommend using it.
 */
export interface IProjectDataProviderEngineFactory<
  SupportedProjectInterfaces extends ProjectInterfaces[],
> {
  /** JSDOC DESTINATION IProjectDataProviderFactoryGetAvailableProjects */
  getAvailableProjects(
    layeringFilters?: ProjectMetadataFilterOptions,
  ): Promise<ProjectMetadataWithoutFactoryInfo[]>;
  /**
   * Create a {@link IProjectDataProviderEngine} for the project requested so the papi can create an
   * {@link IProjectDataProvider} for the project. This project will have the same
   * `projectInterface`s as this Project Data Provider Engine Factory
   *
   * @param projectId Id of the project for which to create a {@link IProjectDataProviderEngine}
   * @returns A promise that resolves to a {@link IProjectDataProviderEngine} for the project passed
   *   in
   */
  createProjectDataProviderEngine(
    projectId: string,
  ): Promise<IProjectDataProviderEngine<SupportedProjectInterfaces>>;
}

/**
 * JSDOC SOURCE LayeringProjectDataProviderEngineFactory
 *
 * Abstract class with partial implementation of {@link IProjectDataProviderEngineFactory}
 * specifically for Layering PDPFs. You can extend this class to make creating a Layering PDPF
 * easier.
 *
 * Extending this class automatically fulfills the special requirements for Layering PDPfs, so we
 * highly recommend extending this class.
 */
export abstract class LayeringProjectDataProviderEngineFactory<
  SupportedProjectInterfaces extends ProjectInterfaces[],
> {
  /** Regex-escaped string of this `pdpfId`. */
  protected pdpfIdRegexString: string;

  /**
   * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
   * (using the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if they should be included in the available projects this Layering PDPF
   * provides. This is used as {@link ProjectMetadataFilterOptions.includeProjectInterfaces} when
   * determining what available projects this layering PDPF supports. You should list here all
   * combinations of `projectInterface`s your Layering PDPs require to make sure this layering PDPF
   * announces that it supports the right projects.
   *
   * See {@link ProjectMetadataFilterOptions.includeProjectInterfaces} for more information on how to
   * use this field.
   *
   * @example
   *
   * ```typescript
   * projectInterfacesToLayerOver: ['one', ['two', 'three']];
   * ```
   *
   * This layering PDPF will announce that it supports projects whose `projectInterface`s fulfill at
   * least one of the following conditions (At least one entry in the array must match) and will
   * provide `providedProjectInterfaces` for those projects:
   *
   * - Include `one`
   * - Include both `two` and `three`.
   */
  abstract projectInterfacesToLayerOver: undefined | string | (string | string[])[];
  /**
   * The list of `projectInterface`s that this layering PDPF provides on top of existing projects.
   *
   * @example
   *
   * ```typescript
   * providedProjectInterfaces: ['four', 'five'];
   * ```
   *
   * This layering PDPF will announce that its provides the `projectInterface`s `four` and `five`
   * for projects that match `projectInterfacesToLayerOver`.
   */
  abstract providedProjectInterfaces: SupportedProjectInterfaces;

  /** @param pdpfId The id of this Project Data Provider Factory */
  constructor(public pdpfId: string) {
    this.pdpfIdRegexString = escapeStringRegexp(pdpfId);
  }

  /**
   * Implementation of {@link IProjectDataProviderEngineFactory.getAvailableProjects} that properly
   * fulfills the requirements of the method for Layering PDPFs. Announces that this Layering PDPF
   * provides the `providedProjectInterfaces` for projects that match
   * `projectInterfacesToLayerOver`.
   */
  async getAvailableProjects(
    layeringFilters?: ProjectMetadataFilterOptions,
  ): Promise<ProjectMetadataWithoutFactoryInfo[]> {
    try {
      const filters = projectLookupService.mergeMetadataFilters(layeringFilters, {
        // We want to layer over certain `projectInterface`s with our interfaces, so
        // include them in the list of projects we provide
        includeProjectInterfaces: this.projectInterfacesToLayerOver,
        // Make sure this pdpf is excluded so it doesn't get into an infinite loop with itself. This
        // is also done when the project lookup service calls this method, so this is a sanity
        // check more than anything else.
        excludePdpFactoryIds: this.pdpfIdRegexString,
        // Do not exclude the `projectInterface`s that this layering PDP serves. If we
        // did exclude them because they already exist, we would cancel out with
        // duplicate layering PDPs, and neither would serve these interfaces at all
      });
      const projectsToOverlayMetadata =
        await projectLookupService.getMetadataForAllProjects(filters);
      return projectsToOverlayMetadata.map((projectMetadataToOverlay) => {
        projectMetadataToOverlay.projectInterfaces = this.providedProjectInterfaces;
        return projectMetadataToOverlay;
      });
    } catch (e) {
      throw new Error(`${this.pdpfId} was not able to get metadata for projects to overlay. ${e}`);
    }
  }
}
