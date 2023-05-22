import { DataProviderDataType, DataProviderDataTypes } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

// TODO: Move these types to quick-verse.ts and generate this file from quick-verse.ts in the future?

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export type QuickVerseDataTypes = {
  verse: DataProviderDataType<string, string | undefined, QuickVerseSetData>;
  heresy: DataProviderDataType<string, string | undefined, string>;
};

export type QuickVerseDataProvider = IDataProvider<QuickVerseDataTypes>;
