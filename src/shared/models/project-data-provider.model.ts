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

/** All Project Data Provider data types must extend from this */
export type MandatoryProjectDataType = {
  ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
};
