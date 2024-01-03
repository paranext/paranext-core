import type { DataProviderDataType } from '@shared/models/data-provider.model';

/** Indicates to a PDP what extension data is being referenced */
export type ExtensionDataScope = {
  /** Name of an extension as provided in its manifest */
  extensionName: string;
  /**
   * Name of a unique partition or segment of data within the extension Some examples include (but
   * are not limited to):
   *
   * - Name of an important data structure that is maintained in a project
   * - Name of a downloaded data set that is being cached
   * - Name of a resource created by a user that should be maintained in a project
   *
   * This is the smallest level of granularity provided by a PDP for accessing extension data. There
   * is no way to get or set just a portion of data identified by a single dataQualifier value.
   */
  dataQualifier: string;
};

/**
 * All Project Data Provider data types must have an `ExtensionData` type. We strongly recommend all
 * Project Data Provider data types extend from this type in order to standardize the
 * `ExtensionData` types.
 *
 * Benefits of following this standard:
 *
 * - All PSIs that support this `projectType` can use a standardized `ExtensionData` interface
 * - If an extension uses the `ExtensionData` endpoint for any project, it will likely use this
 *   standardized interface, so using this interface on your Project Data Provider data types
 *   enables your PDP to support generic extension data
 * - In the future, we may enforce that callers to `ExtensionData` endpoints include `extensionName`,
 *   so following this interface ensures your PDP will not break if such a requirement is
 *   implemented.
 */
export type MandatoryProjectDataType = {
  ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
};
