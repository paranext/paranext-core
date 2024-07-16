import { ProjectInterfaces, ProjectInterfaceDataTypes } from 'papi-shared-types';
import IDataProviderEngine, { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderDataTypes } from '@shared/models/data-provider.model';
import { UnionToIntersection } from 'platform-bible-utils';
// Referenced in JSDoc below
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IProjectDataProviderEngineFactory } from '@shared/models/project-data-provider-engine-factory.model.ts';

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
