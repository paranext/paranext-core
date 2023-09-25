import type { DataProviderDataType } from 'shared/models/data-provider.model';

/** Indicates to a PDP what extension data is being referenced */
export type ExtensionDataScope = {
  extensionName: string;
  dataQualifier: string;
};

/** All Project Data Provider data types must extend from this */
export type MandatoryProjectDataType = {
  ExtensionData: DataProviderDataType<ExtensionDataScope, string | undefined, string>;
};
