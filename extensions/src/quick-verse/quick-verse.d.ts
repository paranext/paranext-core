declare module 'quick-verse' {
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  import type IDataProvider from 'shared/models/data-provider.interface';

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
