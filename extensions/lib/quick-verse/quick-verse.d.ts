import type { DataProvider } from 'shared/models/data-provider.model';

// TODO: Move these types to quick-verse.ts and generate this file from quick-verse.ts in the future?

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export interface QuickVerseDataProvider
  extends DataProvider<string, string | undefined, QuickVerseSetData> {
  setHeresy(verseRef: string, verseText: string): Promise<boolean>;
}
