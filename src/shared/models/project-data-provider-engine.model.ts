import { ProjectInterfaces, ProjectInterfaceDataTypes } from 'papi-shared-types';
import IDataProviderEngine, { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderDataTypes } from '@shared/models/data-provider.model';
import { ProjectMetadataWithoutFactoryInfo } from '@shared/models/project-metadata.model';
import { UnionToIntersection } from 'platform-bible-utils';

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
 */
export interface IProjectDataProviderEngineFactory<
  SupportedProjectInterfaces extends ProjectInterfaces[],
> {
  /**
   * Get a list of metadata objects for all projects that can be the targets of PDPs created by this
   * factory engine
   */
  getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]>;
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
 * The object to return from
 * {@link IProjectDataProviderEngineFactory.createProjectDataProviderEngine} that the PAPI registers
 * to create a Project Data Provider for a specific project. The ProjectDataProviderService creates
 * an {@link IProjectDataProvider} on the papi that layers over this engine, providing special
 * functionality.
 *
 * See {@link DataProviderDataTypes} for information on how to make powerful types that work well
 * with Intellisense.
 *
 * Note: papi creates a `notifyUpdate` function on the Project Data Provider Engine if one is not
 * provided, so it is not necessary to provide one in order to call `this.notifyUpdate`. However,
 * TypeScript does not understand that papi will create one as you are writing your Project Data
 * Provider Engine, so you can avoid type errors with one of the following options:
 *
 * 1. If you are using a class to create a Project Data Provider Engine, you can extend the
 *    {@link ProjectDataProviderEngine} class, and it will provide `notifyUpdate` as well as inform
 *    Intellisense that you can run `notifyUpdate` with the `Setting` data type for you:
 *
 * ```typescript
 * class MyPDPE extends ProjectDataProviderEngine<['MyProjectData']> implements IProjectDataProviderEngine<['MyProjectData']> {
 *   ...
 * }
 * ```
 *
 * 2. If you are using an object or class not extending {@link ProjectDataProviderEngine} to create a
 *    Project Data Provider Engine, you can add a `notifyUpdate` function (and, with an object, add
 *    the {@link WithNotifyUpdate} type) to your Project Data Provider Engine like so:
 *
 * ```typescript
 * const myPDPE: IProjectDataProviderEngine<['MyProjectData']> & WithNotifyUpdate<ProjectDataTypes['MyProjectData']> = {
 *   notifyUpdate(updateInstructions) {},
 *   ...
 * }
 * ```
 *
 * OR
 *
 * ```typescript
 * class MyPDPE implements IProjectDataProviderEngine<['MyProjectData']> {
 *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<ProjectDataTypes['MyProjectData']>) {}
 *   ...
 * }
 * ```
 */
export type IProjectDataProviderEngine<SupportedProjectInterfaces extends ProjectInterfaces[]> =
  IDataProviderEngine<
    UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
  >;

/**
 * JSDOC SOURCE ProjectDataProviderEngine
 *
 * Abstract class that provides a placeholder `notifyUpdate` for Project Data Provider Engine
 * classes. If a Project Data Provider Engine class extends this class, it doesn't have to specify
 * its own `notifyUpdate` function in order to use `notifyUpdate`.
 *
 * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
 * `Setting` data type if needed like so:
 *
 * ```typescript
 * this.notifyUpdate('Setting');
 * ```
 *
 * @see {@link IProjectDataProviderEngine} for more information on extending this class.
 */
export abstract class ProjectDataProviderEngine<
  SupportedProjectInterfaces extends ProjectInterfaces[],
  AdditionalDataTypes extends DataProviderDataTypes = {},
> extends DataProviderEngine<
  UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> &
    AdditionalDataTypes
> {}
