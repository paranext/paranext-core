import type { DataProviderDataType } from 'shared/models/data-provider.model';

/** All Project Data Provider data types must extend from this */
export type MandatoryProjectDataType = {
  ExtensionData: DataProviderDataType<string, string | undefined, string>;
};
