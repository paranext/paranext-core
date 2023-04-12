import IDataProvider, { DataProviderSubscriber } from '@shared/models/data-provider.interface';

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export interface QuickVerseDataProvider extends IDataProvider<string, string, QuickVerseSetData> {
  subscribe: DataProviderSubscriber<string, string>;
  set(selector: string, data: QuickVerseSetData): Promise<boolean>;
  setHeresy(verseRef: string, verseText: string): Promise<boolean>;
  get(selector: string): Promise<string>;
}
