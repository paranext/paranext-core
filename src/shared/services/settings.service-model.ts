import { SettingNames } from 'papi-shared-types';
import { DataProviderDataType } from './papi-core.service';

export type SettingDataTypes = {
  setting: DataProviderDataType<string, SettingNames, SettingNames>; // ??
};
