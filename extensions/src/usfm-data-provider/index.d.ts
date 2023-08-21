import { VerseRef } from '@sillsdev/scripture';
import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

declare module 'usfm-data-provider' {
  export type UsfmProviderDataTypes = {
    BookNames: DataProviderDataType<boolean, string[], never>;
    Chapter: DataProviderDataType<VerseRef, string | undefined, never>;
    ChapterUsx: DataProviderDataType<VerseRef, string | undefined, never>;
    Verse: DataProviderDataType<VerseRef, string | undefined, never>;
  };

  export type UsfmDataProvider = IDataProvider<UsfmProviderDataTypes>;
}
