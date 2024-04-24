import { DataProviderDataType } from '@shared/models/data-provider.model';
import { ExtensionDataScope } from '@shared/models/project-data-provider.model';

/** Indicates to a PSI what raw project data chunk is being referenced */
export type ProjectStorageProjectDataScope = {
  /** ID for the project whose raw data chunk to get */
  projectId: string;
  /**
   * Name of a unique partition or segment of data within the project. Some examples include (but
   * are not limited to):
   *
   * - Name of an important data structure that is maintained in a project
   * - Name of a downloaded data set that is being cached
   * - Name of a resource created by a user that should be maintained in a project
   *
   * This is the smallest level of granularity provided by a PSI for accessing raw project data.
   * There is no way to get or set just a portion of data identified by a single `dataQualifier`
   * value.
   */
  dataQualifier: string;
};

/**
 * `DataProviderDataTypes` that are a sensible default for project storage interpreters to
 * implement. Using {@link IProjectStorageInterpreter} without specifying data types will default to
 * these data types. These types are simply a recommendation for how to write a PSI for a specified
 * `projectType`. As long as both the Project Data Provider and the Project Storage Interpreter for
 * a given `projectType` communicate with the same interface, you are free to design the
 * communication in the way that makes most sense for the `projectType`.
 *
 * Note: Project Data Providers are associated to Project Storage Interpreters based on a shared
 * `projectType`. A PSI must implement the data types specified for each `projectType` it supports.
 *
 *     ---
 *
 * ### ProjectData
 *
 * A simple data type for a Project Data Provider to use to retrieve raw data chunks for a specific
 * project from a Project Storage Interpreter with the same `projectType`. The Project Data Provider
 * indicates which project it is associated with and specifies the name of a segment of data within
 * the project.
 *
 * Benefits of following this recommendation:
 *
 * - Serving raw data chunks according to a simple specifier keeps the Project Storage Interpreter
 *   thin and simple so multiple thin PSIs can be made for different `storageType`s while leaving
 *   the complex task of parsing and serving project data to the Project Data Provider.
 * - This is an easy pattern to follow when starting to learn how to make new `projectType`s in
 *   Platform.Bible.
 */
export type DefaultProjectStorageDataTypes = {
  ProjectData: DataProviderDataType<ProjectStorageProjectDataScope, string | undefined, string>;
};

/**
 * Indicates to a PSI what extension data is being referenced on what project. Generally, a PDP
 * passes calls to `ExtensionData` data type methods to its PSI and adds the `projectId`.
 */
export type ProjectStorageExtensionDataScope = ExtensionDataScope & {
  /** ID for the project whose extension data to get */
  projectId: string;
};

/**
 * `DataProviderDataTypes` that each project storage interpreter must implement. They are assumed to
 * exist and are used by project data providers
 *
 *     ---
 *
 * ### Setting
 *
 * The `Setting` data type handles getting and setting project settings. All Project Storage
 * Interpreters must implement these methods `getSetting` and `setSetting` as well as `resetSetting`
 * in order to properly support project settings. In most cases, the Project Data Provider will pass
 * `Setting` calls through to the Project Storage Interpreter.
 *
 * Note: the `Setting` data type is not actually part of {@link MandatoryProjectStorageDataTypes}
 * because the methods would not be able to create a generic type extending from
 * `ProjectSettingNames` in order to return the specific setting type being requested. As such,
 * `getSetting`, `setSetting`, and `subscribeSetting` are all specified on
 * {@link IProjectStorageInterpreter} instead. However, do note that the `Setting` data type is fully
 * functional.
 *
 * The closest possible representation of the `Setting` data type follows:
 *
 * ```typescript
 * Setting: DataProviderDataType<
 *   ProjectStorageSettingDataScope<ProjectSettingNames>,
 *   ProjectSettingTypes[ProjectSettingNames],
 *   ProjectSettingTypes[ProjectSettingNames]
 * >;
 * ```
 *
 * WARNING: Each Project Storage Interpreter **needs** to fulfill the following requirements for its
 * settings-related methods:
 *
 * - `getSetting`: if a project setting value is present for the key requested, return it. Otherwise,
 *   you must call `papi.projectSettings.getDefault` to get the default value or throw if that call
 *   throws. This functionality preserves the intended type of the setting and avoids returning
 *   `undefined` unexpectedly.
 * - `setSetting`: must call `papi.projectSettings.isValid` before setting the value and should return
 *   false if the call returns `false` and throw if the call throws. This functionality preserves
 *   the intended intended type of the setting and avoids allowing the setting to be set to the
 *   wrong type.
 * - `resetSetting`: deletes the value at the key and sends a setting update event. After this,
 *   `getSetting` should again see the setting value is not present, call
 *   `papi.projectSettings.getDefault`, and return the default value.
 * - Note: see {@link IProjectStorageInterpreter} for method signatures for these three methods.
 *
 *   .---
 *
 * ### ExtensionData
 *
 * All Project Storage Interpreter data types must have an `ExtensionData` type. We strongly
 * recommend all Project Storage Interpreter data types extend from this type in order to
 * standardize the `ExtensionData` types. Project Data Providers will call this endpoint in order to
 * retrieve extensions' project data.
 *
 * Benefits of following this standard:
 *
 * - Project data providers of this `projectType` can use a standardized `ExtensionData` interface
 * - If an extension uses the `ExtensionData` endpoint for any project, it will likely use this
 *   standardized interface, so using this interface on your Project Storage Interpreter data types
 *   enables your PSI to support generic extension data
 * - In the future, we may enforce that callers to `ExtensionData` endpoints include `extensionName`,
 *   so following this interface ensures your PSI will not break if such a requirement is
 *   implemented.
 */
export type MandatoryProjectStorageDataTypes = {
  ExtensionData: DataProviderDataType<ProjectStorageExtensionDataScope, string | undefined, string>;
};
