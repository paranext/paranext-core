import {
  ProjectTypes,
  ProjectDataTypes,
  ProjectStorageInterpreters,
  ProjectSettingNames,
  ProjectSettingTypes,
  ProjectStorageSettingDataScope,
  WithProjectDataProviderEngineSettingMethods,
} from 'papi-shared-types';
import IDataProviderEngine, { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import {
  DataProviderDataType,
  DataProviderDataTypes,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import {
  ExtensionDataScope,
  MandatoryProjectDataTypes,
  WithProjectDataProviderEngineExtensionDataMethods,
} from '@shared/models/project-data-provider.model';
import { ProjectStorageExtensionDataScope } from '@shared/models/project-storage-interpreter.model';
import { UnsubscriberAsync, UnsubscriberAsyncList } from 'platform-bible-utils';
import dataProviderService from '@shared/services/data-provider.service';

/** All possible types for ProjectDataProviderEngines: IProjectDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = {
  [ProjectType in ProjectTypes]: IProjectDataProviderEngine<ProjectDataTypes[ProjectType]>;
};

export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
  createProjectDataProviderEngine(
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes[ProjectType];
}

/**
 * The object to return from {@link ProjectDataProviderEngineFactory.createProjectDataProviderEngine}
 * that the PAPI registers to create a Project Data Provider for a specific project. The
 * ProjectDataProviderService creates an {@link IProjectDataProvider} on the papi that layers over
 * this engine, providing special functionality.
 *
 * @type TProjectDataTypes - The data types that this Project Data Provider Engine serves. For each
 *   data type defined, the engine must have corresponding `get<data_type>` and `set<data_type>
 *   function` functions. These data types correspond to the `projectType` of the project.
 * @see {@link DataProviderDataTypes} for information on how to make powerful types that work well with
 * Intellisense.
 *
 * Note: papi creates a `notifyUpdate` function on the Project Data Provider Engine if one is not
 * provided, so it is not necessary to provide one in order to call `this.notifyUpdate`. However,
 * TypeScript does not understand that papi will create one as you are writing your Project Data
 * Provider Engine, so you can avoid type errors with one of the following options:
 *
 * 1. If you are using a class to create a Project Data Provider Engine, you can extend the
 * {@link ProjectDataProviderEngine} class, and it will provide `notifyUpdate` as well as other helpful
 * default method implementations to meet the requirements of {@link MandatoryProjectDataTypes}
 * automatically by passing these calls through to the Project Storage Interpreter for you:
 * ```typescript
 * class MyPDPE extends DataProviderEngine<MyDataTypes> implements IDataProviderEngine<MyDataTypes> {
 *   ...
 * }
 * ```
 *
 * 2. If you are using an object or class to create a Project Data Provider Engine, you can add a
 * `notifyUpdate` function (and, with an object, add the {@link WithNotifyUpdate} type) to
 * your Project Data Provider Engine like so:
 * ```typescript
 * const myPDPE: IProjectDataProviderEngine<MyDataTypes> & WithNotifyUpdate<MyDataTypes> = {
 *   notifyUpdate(updateInstructions) {},
 *   ...
 * }
 * ```
 * OR
 * ```typescript
 * class MyPDPE implements IProjectDataProviderEngine<MyDataTypes> {
 *   notifyUpdate(updateInstructions?: DataProviderEngineNotifyUpdate<MyDataTypes>) {}
 *   ...
 * }
 * ```
 */
export type IProjectDataProviderEngine<TProjectDataTypes extends DataProviderDataTypes> =
  IDataProviderEngine<TProjectDataTypes & MandatoryProjectDataTypes> &
    WithProjectDataProviderEngineSettingMethods<TProjectDataTypes> &
    WithProjectDataProviderEngineExtensionDataMethods<TProjectDataTypes>;

/**
 * JSDOC SOURCE ProjectDataProviderEngine
 *
 * Abstract class that provides default implementations of a number of {@link IProjectDataProvider}
 * functions including all the `Setting` and `ExtensionData`-related methods. Extensions can create
 * their own Project Data Provider Engine classes and implement this class to meet the requirements
 * of {@link MandatoryProjectDataTypes} automatically by passing these calls through to the Project
 * Storage Interpreter. This class also subscribes to `Setting` and `ExtensionData` updates from the
 * PSI to make sure it keeps its data up-to-date.
 *
 * This class also provides a placeholder `notifyUpdate` for Project Data Provider Engine classes.
 * If a Project Data Provider Engine class extends this class, it doesn't have to specify its own
 * `notifyUpdate` function in order to use `notifyUpdate`.
 *
 * @see {@link IProjectDataProviderEngine} for more information on extending this class.
 */
export abstract class ProjectDataProviderEngine<ProjectType extends ProjectTypes>
  extends DataProviderEngine<
    ProjectDataTypes[ProjectType] & {
      // Including `Setting` here so we can emit `Setting` events though the event types are not
      // tight enough to use on the actual `Setting` data type and methods
      Setting: DataProviderDataType<
        ProjectSettingNames,
        ProjectSettingTypes[ProjectSettingNames],
        ProjectSettingTypes[ProjectSettingNames]
      >;
    }
  >
  implements
    WithProjectDataProviderEngineSettingMethods<ProjectDataTypes[ProjectType]>,
    WithProjectDataProviderEngineExtensionDataMethods<ProjectDataTypes[ProjectType]>
{
  protected readonly projectStorageInterpreter: ProjectStorageInterpreters[ProjectType];

  private psiSettingUnsubscriberPromise: Promise<UnsubscriberAsync>;
  private psiExtensionDataUnsubscriberPromise: Promise<UnsubscriberAsync>;

  /**
   * Create a `ProjectDataProviderEngine` instance
   *
   * @param projectId The project id this Project Data Provider represents for which it serves data
   * @param projectStorageInterpreter The {@link IProjectStorageInterpreter} this Project Data
   *   Provider uses to access raw project data
   */
  protected constructor(
    protected readonly projectId: string,
    protected readonly projectStorageInterpreterId: string,
  ) {
    super();

    // TODO: Get the appropriate PSI and pass it in instead of this fake PSI that does literally
    // nothing https://github.com/paranext/paranext-core/issues/367
    // @ts-expect-error 2322
    this.projectStorageInterpreter = {};

    // Set up subscriptions to listen for changes to the PSI Settings and ExtensionData and update
    // our own subscribers
    this.psiSettingUnsubscriberPromise = this.projectStorageInterpreter.subscribeSetting(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      // TODO: How will we subscribe to all updates from the PSI? We need to notifyUpdate Setting if
      // one of our own settings changed, not a setting from literally any project served by the PSI
      { key: 'platform.fullName', projectId: this.projectId },
      () => {
        this.notifyUpdate('Setting');
      },
      { whichUpdates: '*' },
    );
    this.psiExtensionDataUnsubscriberPromise =
      this.projectStorageInterpreter.subscribeExtensionData(
        // Just used empty strings because we don't need anything in particular here because we're
        // listening for all updates
        // TODO: How will we subscribe to all updates from the PSI? We need to notifyUpdate Setting if
        // one of our own settings changed, not a setting from literally any project served by the PSI
        { dataQualifier: '', extensionName: '', projectId: this.projectId },
        () => {
          this.notifyUpdate('ExtensionData');
        },
        { whichUpdates: '*' },
      );
  }

  // Do not emit update events when running this method because we are subscribing to `Setting`
  // updates on the PSI and sending out update events in the constructor
  @dataProviderService.decorators.doNotNotify
  setSetting<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
    newSetting: ProjectSettingTypes[ProjectSettingName],
  ): Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>> {
    return this.projectStorageInterpreter.setSetting(
      this.getProjectStorageSettingDataScope(key),
      newSetting,
    );
  }

  // Do not emit update events when running this method because we are subscribing to `Setting`
  // updates on the PSI and sending out update events in the constructor
  @dataProviderService.decorators.doNotNotify
  setExtensionData(
    dataScope: ExtensionDataScope,
    data: string,
  ): Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>> {
    return this.projectStorageInterpreter.setExtensionData(
      this.getProjectStorageExtensionDataScope(dataScope),
      data,
    );
  }

  /**
   * Get the {@link ProjectStorageSettingDataScope} for this project for the specified project
   * setting. This can be used when passing setting-related calls to the Project Storage
   * Interpreter.
   *
   * @param key The string id of the project setting to get a setting data scope for
   * @returns `ProjectStorageSettingDataScope` for this project for the specified project setting
   */
  @dataProviderService.decorators.ignore
  protected getProjectStorageSettingDataScope<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
  ): ProjectStorageSettingDataScope<ProjectSettingName> {
    return { projectId: this.projectId, key };
  }

  /**
   * Get the {@link ProjectStorageExtensionDataScope} for this project for the specified
   * {@link ExtensionDataScope}. This can be used when passing `ExtensionData`-related calls to the
   * Project Storage Interpreter.
   *
   * @param dataScope Information about what data is being referenced by the calling extension given
   *   to this Project Data Provider
   * @returns Information about what data is being referenced by the calling extension that this
   *   Project Data Provider should give to its Project Storage Interpreter
   */
  @dataProviderService.decorators.ignore
  protected getProjectStorageExtensionDataScope(
    dataScope: ExtensionDataScope,
  ): ProjectStorageExtensionDataScope {
    return { ...dataScope, projectId: this.projectId };
  }

  getSetting<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
  ): Promise<ProjectSettingTypes[ProjectSettingName]> {
    return this.projectStorageInterpreter.getSetting(this.getProjectStorageSettingDataScope(key));
  }

  resetSetting<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
  ): Promise<boolean> {
    return this.projectStorageInterpreter.resetSetting(this.getProjectStorageSettingDataScope(key));
  }

  getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined> {
    return this.projectStorageInterpreter.getExtensionData(
      this.getProjectStorageExtensionDataScope(dataScope),
    );
  }

  /**
   * Disposes of this Project Data Provider Engine. Unsubscribes from listening to the Project
   * Storage Interpreter
   *
   * @returns `true` if successfully unsubscribed
   */
  async dispose(): Promise<boolean> {
    const unsubscriberList = new UnsubscriberAsyncList(
      `PDP Engine ${this.projectId} PSI Unsubscribers`,
    );

    unsubscriberList.add(
      await this.psiSettingUnsubscriberPromise,
      await this.psiExtensionDataUnsubscriberPromise,
    );

    return unsubscriberList.runAllUnsubscribers();
  }
}
