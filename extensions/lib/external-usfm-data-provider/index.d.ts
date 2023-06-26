import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

// An enum might be nice here, but they don't serialize into messages properly
export type Versification =
  | 'Unknown'
  | 'Original'
  | 'Septuagint'
  | 'Vulgate'
  | 'English'
  | 'RussianProtestant'
  | 'RussianOrthodox';

export type TextualVerseRef = {
  verseString: string;
  versification?: Versification;
};

export type NumericVerseRef = {
  bookChapterVerse: number;
  versification?: Versification;
};

export type DetailedNumericalVerseRef = {
  book: number;
  chapter: number;
  verse: number;
  versification?: Versification;
};

export type DetailedTextualVerseRef = {
  book: string;
  chapter: string;
  verse: string;
  versification: Versification;
};

export type VerseRef =
  | NumericVerseRef
  | TextualVerseRef
  | DetailedNumericalVerseRef
  | DetailedTextualVerseRef;

export type UsfmProviderDataTypes = {
  BookNames: DataProviderDataType<boolean, string[], never>;
  Chapter: DataProviderDataType<VerseRef, string | undefined, never>;
  Verse: DataProviderDataType<VerseRef, string | undefined, never>;
};

export type UsfmDataProvider = IDataProvider<UsfmProviderDataTypes>;
