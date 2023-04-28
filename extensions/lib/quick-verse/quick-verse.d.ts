import type IDataProvider from 'shared/models/data-provider.interface';

// TODO: Move these types to quick-verse.ts and generate this file from quick-verse.ts in the future?

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export interface QuickVerseDataProvider
  extends IDataProvider<string, string | undefined, QuickVerseSetData> {
  setHeresy(verseRef: string, verseText: string): Promise<boolean>;
}
