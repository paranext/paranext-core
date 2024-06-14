declare module 'usfm-data-provider' {
  import { VerseRef } from '@sillsdev/scripture';
  import type { DataProviderDataType, IDataProvider } from '@papi/core';

  export type UsfmProviderDataTypes = {
    BookNames: DataProviderDataType<boolean, string[], never>;
    Chapter: DataProviderDataType<VerseRef, string | undefined, never>;
    ChapterUsx: DataProviderDataType<VerseRef, string | undefined, string>;
    BookUsx: DataProviderDataType<VerseRef, string | undefined, never>;
    Verse: DataProviderDataType<VerseRef, string | undefined, never>;
  };

  export type UsfmDataProvider = IDataProvider<UsfmProviderDataTypes>;
}

declare module 'papi-shared-types' {
  import type { UsfmDataProvider } from 'usfm-data-provider';

  export interface DataProviders {
    usfm: UsfmDataProvider;
  }
}
