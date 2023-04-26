import { DataProviderSubscriber } from '@shared/models/data-provider.interface';
import { DataProviderInfo } from '@shared/models/data-provider-info.model';

export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

export interface QuickVerseDataProvider
  extends DataProviderInfo<string, string, QuickVerseSetData> {
  subscribe: DataProviderSubscriber<string, string>;
  set(selector: string, data: QuickVerseSetData): Promise<boolean>;
  setHeresy(verseRef: string, verseText: string): Promise<boolean>;
  get(selector: string): Promise<string>;
}
