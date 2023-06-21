import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

export type UsfmProviderDataTypes = {
  Verse: DataProviderDataType<
    [book: string, chapter: number, verse: number],
    string | undefined,
    never
  >;
  Chapter: DataProviderDataType<[book: string, chapter: number], string | undefined, never>;
};

export type UsfmDataProvider = IDataProvider<UsfmProviderDataTypes>;
