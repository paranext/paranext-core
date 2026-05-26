import {
  ProjectInterfaces,
  ProjectInterfaceDataTypes,
  WithProjectDataProviderEngineSettingMethods,
  ProjectSettingNames,
  ProjectSettingTypes,
} from 'papi-shared-types';
import {
  PROJECT_INTERFACE_PLATFORM_BASE,
  WithProjectDataProviderEngineExtensionDataMethods,
} from '@shared/models/project-data-provider.model';
import { DataProviderDataType } from '@shared/models/data-provider.model';
import { UnionToIntersection } from 'platform-bible-utils';
import {
  IProjectDataProviderEngine,
  ProjectDataProviderEngine,
} from '@shared/models/project-data-provider-engine.model';

/**
 * The object to return from
 * {@link IProjectDataProviderEngineFactory.createProjectDataProviderEngine} that the PAPI registers
 * to create a Base Project Data Provider for a specific project. The ProjectDataProviderService
 * creates an {@link IBaseProjectDataProvider} on the papi that layers over this engine, providing
 * special functionality.
 *
 * See {@link DataProviderDataTypes} for information on how to make powerful types that work well
 * with Intellisense.
 *
 * Note: papi creates a `notifyUpdate` function on the Project Data Provider Engine if one is not
 * provided, so it is not necessary to provide one in order to call `this.notifyUpdate`. However,
 * TypeScript does not understand that papi will create one as you are writing your Base Project
 * Data Provider Engine, so you can avoid type errors with one of the following options:
 *
 * 1. If you are using a class to create a Base Project Data Provider Engine, you can extend the
 *    {@link BaseProjectDataProviderEngine} class, and it will provide `notifyUpdate` as well as
 *    inform Intellisense that you can run `notifyUpdate` with the `Setting` data type for you:
 *
 * ```typescript
 * class MyPDPE extends BaseProjectDataProviderEngine<['MyProjectData']> implements IBaseProjectDataProviderEngine<['MyProjectData']> {
 *   ...
 * }
 * ```
 *
 * 2. If you are using an object or class not extending {@link BaseProjectDataProviderEngine} to create
 *    a Base Project Data Provider Engine, you can add a `notifyUpdate` function (and, with an
 *    object, add the {@link WithNotifyUpdate} type) to your Base Project Data Provider Engine like
 *    so:
 *
 * ```typescript
 * const myPDPE: IBaseProjectDataProviderEngine<['MyProjectData']> & WithNotifyUpdate<ProjectDataTypes['MyProjectData']> = {
 *   notifyUpdate(updateInstructions) {},
 *   ...
 * }
 * ```
 *
 * OR
 *
 * ```typescript
 * class MyPDPE implements IBaseProjectDataProviderEngine<['MyProjectData']> {
 *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<ProjectDataTypes['MyProjectData']>) {}
 *   ...
 * }
 * ```
 */
export type IBaseProjectDataProviderEngine<SupportedProjectInterfaces extends ProjectInterfaces[]> =
  IProjectDataProviderEngine<
    [typeof PROJECT_INTERFACE_PLATFORM_BASE, ...SupportedProjectInterfaces]
  > &
    WithProjectDataProviderEngineSettingMethods<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    > &
    WithProjectDataProviderEngineExtensionDataMethods<
      UnionToIntersection<ProjectInterfaceDataTypes[SupportedProjectInterfaces[number]]> & {}
    >;

/**
 * JSDOC SOURCE BaseProjectDataProviderEngine
 *
 * Abstract class that provides a placeholder `notifyUpdate` for Base Project Data Provider Engine
 * classes. If a Base Project Data Provider Engine class extends this class, it doesn't have to
 * specify its own `notifyUpdate` function in order to use `notifyUpdate`.
 *
 * Additionally, extending this class informs Intellisense that you can run `notifyUpdate` with the
 * `Setting` data type if needed like so:
 *
 * ```typescript
 * this.notifyUpdate('Setting');
 * ```
 *
 * @see {@link IBaseProjectDataProviderEngine} for more information on extending this class.
 */
export abstract class BaseProjectDataProviderEngine<
  SupportedProjectInterfaces extends ProjectInterfaces[],
> extends ProjectDataProviderEngine<
  [typeof PROJECT_INTERFACE_PLATFORM_BASE, ...SupportedProjectInterfaces],
  {
    // Including `Setting` here so we can emit `Setting` events though the event types are not
    // tight enough to use on the actual `Setting` data type and methods
    Setting: DataProviderDataType<
      ProjectSettingNames,
      ProjectSettingTypes[ProjectSettingNames],
      ProjectSettingTypes[ProjectSettingNames]
    >;
  }
> {}
