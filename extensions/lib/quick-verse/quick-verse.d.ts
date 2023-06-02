import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

// TODO: Move these types to quick-verse.ts and generate this file from quick-verse.ts in the future?

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export type QuickVerseDataTypes = {
  Verse: DataProviderDataType<string, string | undefined, QuickVerseSetData>;
  Heresy: DataProviderDataType<string, string | undefined, string>;
  Chapter: DataProviderDataType<[book: string, chapter: number], string | undefined, never>;
};

export type QuickVerseDataProvider = IDataProvider<QuickVerseDataTypes>;
