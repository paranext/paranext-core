declare module 'quick-verse' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { DataProviderDataType, IDataProvider } from '@papi/core';

  export type QuickVerseSetData = string | { text: string; isHeresy: boolean };

  export type QuickVerseDataTypes = {
    Verse: DataProviderDataType<string, string | undefined, QuickVerseSetData>;
    Heresy: DataProviderDataType<string, string | undefined, string>;
    Chapter: DataProviderDataType<[book: string, chapter: number], string | undefined, never>;
  };

  export type QuickVerseDataProvider = IDataProvider<QuickVerseDataTypes>;
}

declare module 'papi-shared-types' {
  import type { QuickVerseDataProvider } from 'quick-verse';

  export interface DataProviders {
    'quickVerse.quickVerse': QuickVerseDataProvider;
  }
}
