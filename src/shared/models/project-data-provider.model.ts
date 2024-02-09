import type {
  DataProviderDataType,
  DataProviderDataTypes,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';

/** Indicates to a PDP what extension data is being referenced */
export type ExtensionDataScope = {
  /** Name of an extension as provided in its manifest */
  extensionName: string;
  /**
   * Name of a unique partition or segment of data within the extension. Some examples include (but
   * are not limited to):
   *
   * - Name of an important data structure that is maintained in a project
   * - Name of a downloaded data set that is being cached
   * - Name of a resource created by a user that should be maintained in a project
   *
   * This is the smallest level of granularity provided by a PDP for accessing extension data. There
   * is no way to get or set just a portion of data identified by a single `dataQualifier` value.
   */
  dataQualifier: string;
};

/**
 * `DataProviderDataTypes` that each project data provider **must** implement. They are assumed to
 * exist and are used by project storage interpreters and other data providers
 *
 *     ---
 *
 * ### Setting
 *
 * The `Setting` data type handles getting and setting project settings. All Project Data Providers
 * must implement these methods `getSetting` and `setSetting` as well as `resetSetting` in order to
 * properly support project settings. In most cases, the Project Data Provider only needs to pass
 * the setting calls through to the Project Storage Interpreter.
 *
 * Note: the `Setting` data type is not actually part of {@link MandatoryProjectDataTypes} because
 * the methods would not be able to create a generic type extending from `ProjectSettingNames` in
 * order to return the specific setting type being requested. As such, `getSetting`, `setSetting`,
 * and `subscribeSetting` are all specified on {@link IProjectDataProvider} instead. Unfortunately,
 * as a result, using Intellisense with `useProjectData` will not show `Setting` as a data type
 * option, but you can use `useProjectSetting` instead. However, do note that the `Setting` data
 * type is fully functional.
 *
 *     ---
 *
 * ### ExtensionData
 *
 * All Project Data Provider data types must have an `ExtensionData` type. We strongly recommend all
 * Project Data Provider data types extend from this type in order to standardize the
 * `ExtensionData` types.
 *
 * Benefits of following this standard:
 *
 * - All project storage interpreters that support this `projectType` can use a standardized
 *   `ExtensionData` interface
 * - If an extension uses the `ExtensionData` endpoint for any project, it will likely use this
 *   standardized interface, so using this interface on your Project Data Provider data types
 *   enables your PDP to support generic extension data
 * - In the future, we may enforce that callers to `ExtensionData` endpoints include `extensionName`,
 *   so following this interface ensures your PDP will not break if such a requirement is
 *   implemented.
 */
export type MandatoryProjectDataTypes = {
  /* Setting: DataProviderDataType<
    ProjectSettingNames,
    ProjectSettingTypes[ProjectSettingNames],
    ProjectSettingTypes[ProjectSettingNames]
  >; */
  ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
};

/**
 * The `ExtensionData` methods required for a Project Data Provider Engine to fulfill the
 * requirements of {@link MandatoryProjectDataTypes}'s `ExtensionData` data type.
 *
 * Note: These methods are already covered by {@link MandatoryProjectDataTypes}, but this type adds
 * JSDocs for them.
 */
export type WithProjectDataProviderEngineExtensionDataMethods<
  TProjectDataTypes extends DataProviderDataTypes,
> = {
  /**
   * Gets an extension's project data identified by `dataScope` in this project
   *
   * @param dataScope Information about what data is being referenced by the calling extension given
   *   to this Project Data Provider
   * @returns Extension project data in this project for an extension to use in serving its
   *   extension project data
   */
  getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined>;
  /**
   * Sets an extension's project data identified by `dataScope` in this project
   *
   * @param dataScope Information about what data is being referenced by the calling extension given
   *   to this Project Data Provider
   * @param data Updated value of extension project data in this project to set
   * @returns Information that papi uses to interpret whether to send out updates. Defaults to
   *   `true` (meaning send updates only for this data type).
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  setExtensionData(
    dataScope: ExtensionDataScope,
    data: string,
  ): Promise<DataProviderUpdateInstructions<TProjectDataTypes>>;
};
