import { Canon, SerializedVerseRef, VerseRef } from '@sillsdev/scripture';
import {
  MarkerContent,
  MarkerObject,
  Usj,
  USJ_TYPE,
} from '@eten-tech-foundation/scripture-utilities';
import { BookInfo, ScrollGroupId } from './scripture.model';
import { at, isWhiteSpace, slice, split, startsWith } from '../string-util';
import { LocalizeKey } from '../extension-contributions/menus.model';
import { isString } from '../util';

/**
 * All marker types that seem to be block-level according to `UsxFragmenter.AppendStartUsfm`. And
 * the `type` for USJ documents' top-level object because that is effectively a block
 *
 * Note: This "block-level" means the marker is in its own paragraph (a [CSS
 * Block](https://developer.mozilla.org/en-US/docs/Glossary/Block/CSS)) as opposed to being
 * in-line.
 */
const BLOCK_MARKER_TYPES = ['chapter', 'book', 'para', 'row', 'sidebar', USJ_TYPE];

const ZWSP = '\u200B';

const scrBookData: BookInfo[] = [
  { shortName: 'ERR', fullNames: ['ERROR'], chapters: -1 },
  { shortName: 'GEN', fullNames: ['Genesis'], chapters: 50 },
  { shortName: 'EXO', fullNames: ['Exodus'], chapters: 40 },
  { shortName: 'LEV', fullNames: ['Leviticus'], chapters: 27 },
  { shortName: 'NUM', fullNames: ['Numbers'], chapters: 36 },
  { shortName: 'DEU', fullNames: ['Deuteronomy'], chapters: 34 },
  { shortName: 'JOS', fullNames: ['Joshua'], chapters: 24 },
  { shortName: 'JDG', fullNames: ['Judges'], chapters: 21 },
  { shortName: 'RUT', fullNames: ['Ruth'], chapters: 4 },
  { shortName: '1SA', fullNames: ['1 Samuel'], chapters: 31 },
  { shortName: '2SA', fullNames: ['2 Samuel'], chapters: 24 },
  { shortName: '1KI', fullNames: ['1 Kings'], chapters: 22 },
  { shortName: '2KI', fullNames: ['2 Kings'], chapters: 25 },
  { shortName: '1CH', fullNames: ['1 Chronicles'], chapters: 29 },
  { shortName: '2CH', fullNames: ['2 Chronicles'], chapters: 36 },
  { shortName: 'EZR', fullNames: ['Ezra'], chapters: 10 },
  { shortName: 'NEH', fullNames: ['Nehemiah'], chapters: 13 },
  { shortName: 'EST', fullNames: ['Esther'], chapters: 10 },
  { shortName: 'JOB', fullNames: ['Job'], chapters: 42 },
  { shortName: 'PSA', fullNames: ['Psalm', 'Psalms'], chapters: 150 },
  { shortName: 'PRO', fullNames: ['Proverbs'], chapters: 31 },
  { shortName: 'ECC', fullNames: ['Ecclesiastes'], chapters: 12 },
  { shortName: 'SNG', fullNames: ['Song of Solomon', 'Song of Songs'], chapters: 8 },
  { shortName: 'ISA', fullNames: ['Isaiah'], chapters: 66 },
  { shortName: 'JER', fullNames: ['Jeremiah'], chapters: 52 },
  { shortName: 'LAM', fullNames: ['Lamentations'], chapters: 5 },
  { shortName: 'EZK', fullNames: ['Ezekiel'], chapters: 48 },
  { shortName: 'DAN', fullNames: ['Daniel'], chapters: 12 },
  { shortName: 'HOS', fullNames: ['Hosea'], chapters: 14 },
  { shortName: 'JOL', fullNames: ['Joel'], chapters: 3 },
  { shortName: 'AMO', fullNames: ['Amos'], chapters: 9 },
  { shortName: 'OBA', fullNames: ['Obadiah'], chapters: 1 },
  { shortName: 'JON', fullNames: ['Jonah'], chapters: 4 },
  { shortName: 'MIC', fullNames: ['Micah'], chapters: 7 },
  { shortName: 'NAM', fullNames: ['Nahum'], chapters: 3 },
  { shortName: 'HAB', fullNames: ['Habakkuk'], chapters: 3 },
  { shortName: 'ZEP', fullNames: ['Zephaniah'], chapters: 3 },
  { shortName: 'HAG', fullNames: ['Haggai'], chapters: 2 },
  { shortName: 'ZEC', fullNames: ['Zechariah'], chapters: 14 },
  { shortName: 'MAL', fullNames: ['Malachi'], chapters: 4 },
  { shortName: 'MAT', fullNames: ['Matthew'], chapters: 28 },
  { shortName: 'MRK', fullNames: ['Mark'], chapters: 16 },
  { shortName: 'LUK', fullNames: ['Luke'], chapters: 24 },
  { shortName: 'JHN', fullNames: ['John'], chapters: 21 },
  { shortName: 'ACT', fullNames: ['Acts'], chapters: 28 },
  { shortName: 'ROM', fullNames: ['Romans'], chapters: 16 },
  { shortName: '1CO', fullNames: ['1 Corinthians'], chapters: 16 },
  { shortName: '2CO', fullNames: ['2 Corinthians'], chapters: 13 },
  { shortName: 'GAL', fullNames: ['Galatians'], chapters: 6 },
  { shortName: 'EPH', fullNames: ['Ephesians'], chapters: 6 },
  { shortName: 'PHP', fullNames: ['Philippians'], chapters: 4 },
  { shortName: 'COL', fullNames: ['Colossians'], chapters: 4 },
  { shortName: '1TH', fullNames: ['1 Thessalonians'], chapters: 5 },
  { shortName: '2TH', fullNames: ['2 Thessalonians'], chapters: 3 },
  { shortName: '1TI', fullNames: ['1 Timothy'], chapters: 6 },
  { shortName: '2TI', fullNames: ['2 Timothy'], chapters: 4 },
  { shortName: 'TIT', fullNames: ['Titus'], chapters: 3 },
  { shortName: 'PHM', fullNames: ['Philemon'], chapters: 1 },
  { shortName: 'HEB', fullNames: ['Hebrews'], chapters: 13 },
  { shortName: 'JAS', fullNames: ['James'], chapters: 5 },
  { shortName: '1PE', fullNames: ['1 Peter'], chapters: 5 },
  { shortName: '2PE', fullNames: ['2 Peter'], chapters: 3 },
  { shortName: '1JN', fullNames: ['1 John'], chapters: 5 },
  { shortName: '2JN', fullNames: ['2 John'], chapters: 1 },
  { shortName: '3JN', fullNames: ['3 John'], chapters: 1 },
  { shortName: 'JUD', fullNames: ['Jude'], chapters: 1 },
  { shortName: 'REV', fullNames: ['Revelation'], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: 'TOB', fullNames: ['Tobit'], chapters: 14 },
  { shortName: 'JDT', fullNames: ['Judith'], chapters: 16 },
  { shortName: 'ESG', fullNames: ['Esther Greek'], chapters: 11 },
  { shortName: 'WIS', fullNames: ['Wisdom of Solomon'], chapters: 19 },
  { shortName: 'SIR', fullNames: ['Sirach (Ecclesiasticus)'], chapters: 52 },
  { shortName: 'BAR', fullNames: ['Baruch'], chapters: 6 },
  { shortName: 'LJE', fullNames: ['Letter of Jeremiah'], chapters: 1 },
  { shortName: 'S3Y', fullNames: ['Song of 3 Young Men'], chapters: 1 },
  { shortName: 'SUS', fullNames: ['Susanna'], chapters: 1 },
  { shortName: 'BEL', fullNames: ['Bel and the Dragon'], chapters: 1 },
  { shortName: '1MA', fullNames: ['1 Maccabees'], chapters: 16 },
  { shortName: '2MA', fullNames: ['2 Maccabees'], chapters: 15 },
  { shortName: '3MA', fullNames: ['3 Maccabees'], chapters: 7 },
  { shortName: '4MA', fullNames: ['4 Maccabees'], chapters: 18 },
  { shortName: '1ES', fullNames: ['1 Esdras (Greek)'], chapters: 9 },
  { shortName: '2ES', fullNames: ['2 Esdras (Latin)'], chapters: 16 },
  { shortName: 'MAN', fullNames: ['Prayer of Manasseh'], chapters: 1 },
  { shortName: 'PS2', fullNames: ['Psalm 151'], chapters: 1 },
  { shortName: 'ODA', fullNames: ['Odes'], chapters: 14 },
  { shortName: 'PSS', fullNames: ['Psalms of Solomon'], chapters: 18 },
  { shortName: 'JSA', fullNames: ['Joshua A. *obsolete*'], chapters: 24 },
  { shortName: 'JDB', fullNames: ['Judges B. *obsolete*'], chapters: 21 },
  { shortName: 'TBS', fullNames: ['Tobit S. *obsolete*'], chapters: 14 },
  { shortName: 'SST', fullNames: ['Susanna Th. *obsolete*'], chapters: 1 },
  { shortName: 'DNT', fullNames: ['Daniel Th. *obsolete*'], chapters: 12 },
  { shortName: 'BLT', fullNames: ['Bel Th. *obsolete*'], chapters: 1 },
  { shortName: 'XXA', fullNames: ['Extra A'], chapters: 0 },
  { shortName: 'XXB', fullNames: ['Extra B'], chapters: 0 },
  { shortName: 'XXC', fullNames: ['Extra C'], chapters: 0 },
  { shortName: 'XXD', fullNames: ['Extra D'], chapters: 0 },
  { shortName: 'XXE', fullNames: ['Extra E'], chapters: 0 },
  { shortName: 'XXF', fullNames: ['Extra F'], chapters: 0 },
  { shortName: 'XXG', fullNames: ['Extra G'], chapters: 0 },
  { shortName: 'FRT', fullNames: ['Front Matter'], chapters: 0 },
  { shortName: 'BAK', fullNames: ['Back Matter'], chapters: 0 },
  { shortName: 'OTH', fullNames: ['Other Matter'], chapters: 0 },
  { shortName: '3ES', fullNames: ['3 Ezra *obsolete*'], chapters: 0 },
  { shortName: 'EZA', fullNames: ['Apocalypse of Ezra'], chapters: 12 },
  { shortName: '5EZ', fullNames: ['5 Ezra (Latin Prologue)'], chapters: 2 },
  { shortName: '6EZ', fullNames: ['6 Ezra (Latin Epilogue)'], chapters: 12 },
  { shortName: 'INT', fullNames: ['Introduction'], chapters: 0 },
  { shortName: 'CNC', fullNames: ['Concordance '], chapters: 0 },
  { shortName: 'GLO', fullNames: ['Glossary '], chapters: 0 },
  { shortName: 'TDX', fullNames: ['Topical Index'], chapters: 0 },
  { shortName: 'NDX', fullNames: ['Names Index'], chapters: 0 },
  { shortName: 'DAG', fullNames: ['Daniel Greek'], chapters: 14 },
  { shortName: 'PS3', fullNames: ['Psalms 152-155'], chapters: 4 },
  { shortName: '2BA', fullNames: ['2 Baruch (Apocalypse)'], chapters: 77 },
  { shortName: 'LBA', fullNames: ['Letter of Baruch'], chapters: 86 },
  { shortName: 'JUB', fullNames: ['Jubilees'], chapters: 34 },
  { shortName: 'ENO', fullNames: ['Enoch'], chapters: 42 },
  { shortName: '1MQ', fullNames: ['1 Meqabyan'], chapters: 36 },
  { shortName: '2MQ', fullNames: ['2 Meqabyan'], chapters: 20 },
  { shortName: '3MQ', fullNames: ['3 Meqabyan'], chapters: 10 },
  { shortName: 'REP', fullNames: ['Reproof (Proverbs 25-31)'], chapters: 6 },
  { shortName: '4BA', fullNames: ['4 Baruch (Rest of Baruch)'], chapters: 5 },
  { shortName: 'LAO', fullNames: ['Laodiceans'], chapters: 1 },
];

/** The first book number */
export const FIRST_SCR_BOOK_NUM = 1;
/** The last book number */
export const LAST_SCR_BOOK_NUM = scrBookData.length - 1;
/** The first chapter number */
export const FIRST_SCR_CHAPTER_NUM = 1;
/** The first verse number */
export const FIRST_SCR_VERSE_NUM = 1;

/** The default Scripture reference, representing the first chapter and verse of the first book. */
export const defaultScrRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
};

/**
 * Retrieves the number of chapters for a given book number.
 *
 * @param bookNum The number representing the book.
 * @returns The number of chapters in the book, or -1 if the book number is invalid.
 */
export const getChaptersForBook = (bookNum: number): number => {
  return scrBookData[bookNum]?.chapters ?? -1;
};

/**
 * Adjusts the book of a Scripture reference by a specified offset.
 *
 * @param scrRef The Scripture reference whose book is to be adjusted.
 * @param offset The number of books to offset the current book by. Positive values move forward,
 *   negative values move backward.
 * @returns A new Scripture reference with the adjusted book. The chapter and verse numbers are
 *   reset to 1. If the resulting book number exceeds the bounds of available books, it is clamped
 *   to the nearest valid book.
 */
export const offsetBook = (scrRef: SerializedVerseRef, offset: number): SerializedVerseRef => ({
  book: Canon.bookNumberToId(
    Math.max(
      FIRST_SCR_BOOK_NUM,
      Math.min(Canon.bookIdToNumber(scrRef.book) + offset, LAST_SCR_BOOK_NUM),
    ),
  ),
  chapterNum: 1,
  verseNum: 1,
});

/**
 * Adjusts the chapter of a Scripture reference by a specified offset.
 *
 * @param scrRef The Scripture reference whose chapter is to be adjusted.
 * @param offset The number of chapters to offset the current chapter by. Positive values move
 *   forward, negative values move backward.
 * @returns A new Scripture reference with the adjusted chapter. The verse number is reset to 1. The
 *   chapter number is clamped to stay within valid bounds for the book.
 */
export const offsetChapter = (scrRef: SerializedVerseRef, offset: number): SerializedVerseRef => ({
  ...scrRef,
  chapterNum: Math.min(
    Math.max(FIRST_SCR_CHAPTER_NUM, scrRef.chapterNum + offset),
    getChaptersForBook(Canon.bookIdToNumber(scrRef.book)),
  ),
  verseNum: 1,
});

/**
 * Adjusts the verse of a Scripture reference by a specified offset.
 *
 * @param scrRef The Scripture reference whose verse is to be adjusted.
 * @param offset The number of verses to offset the current verse by. Positive values move forward,
 *   negative values move backward.
 * @returns A new Scripture reference with the adjusted verse. The verse number is clamped to stay
 *   within valid bounds for the chapter.
 */
export const offsetVerse = (scrRef: SerializedVerseRef, offset: number): SerializedVerseRef => ({
  ...scrRef,
  verseNum: Math.max(FIRST_SCR_VERSE_NUM, scrRef.verseNum + offset),
});

/**
 * https://github.com/ubsicap/Paratext/blob/master/ParatextData/SILScriptureExtensions.cs#L72
 *
 * Convert book number to a localized Id (a short description of the book). This should be used
 * whenever a book ID (short code) is shown to the user. It is primarily needed for people who do
 * not read Roman script well and need to have books identified in a alternate script (e.g. Chinese
 * or Russian)
 *
 * @param bookNumber
 * @param localizationLanguage In BCP 47 format
 * @param getLocalizedString Function that provides the localized versions of the book ids and names
 *   asynchronously.
 * @returns
 */
export async function getLocalizedIdFromBookNumber(
  bookNumber: number,
  localizationLanguage: string,
  getLocalizedString: (item: {
    localizeKey: string;
    languagesToSearch?: string[];
  }) => Promise<string>,
) {
  const id = Canon.bookNumberToId(bookNumber);

  if (!startsWith(Intl.getCanonicalLocales(localizationLanguage)[0], 'zh'))
    return getLocalizedString({
      localizeKey: `LocalizedId.${id}`,
      languagesToSearch: [localizationLanguage],
    });

  // For Chinese the normal book name is already fairly short.
  const bookName = await getLocalizedString({
    localizeKey: `Book.${id}`,
    languagesToSearch: [localizationLanguage],
  });
  const parts = split(bookName, '-');
  // some entries had a second name inside ideographic parenthesis
  const parts2 = split(parts[0], '\xff08');
  const retVal = parts2[0].trim();
  return retVal;
}

/**
 * Get the Scripture reference as an easily comparable/sortable integer, without considering the
 * verse.
 *
 * @param scrRef The Scripture reference.
 * @returns An integer where the first three digits represent the book, the next three represent the
 *   chapter and the last three represent the verse.
 */
export function scrRefToBBBCCC(scrRef: SerializedVerseRef): number {
  return new VerseRef(Canon.bookIdToNumber(scrRef.book), scrRef.chapterNum, scrRef.verseNum).BBBCCC;
}

/**
 * Get the Scripture reference as an easily comparable/sortable integer.
 *
 * @param scrRef The Scripture reference.
 * @returns An integer where the first three digits represent the book, the next three represent the
 *   chapter and the last three represent the verse.
 */
export function scrRefToBBBCCCVVV(scrRef: SerializedVerseRef): number {
  return new VerseRef(Canon.bookIdToNumber(scrRef.book), scrRef.chapterNum, scrRef.verseNum)
    .BBBCCCVVV;
}

/**
 * Compares two Scripture references canonically.
 *
 * @param scrRef1 The first Scripture reference to compare.
 * @param scrRef2 The second Scripture reference to compare.
 * @returns A number indicating the result of the comparison: - Negative value if scrRef1 precedes
 *   scrRef2 in sorting order. - Zero if scrRef1 and scrRef2 are equivalent in sorting order. -
 *   Positive value if scrRef1 follows scrRef2 in sorting order.
 */
export function compareScrRefs(scrRef1: SerializedVerseRef, scrRef2: SerializedVerseRef): number {
  // TODO: consider edge cases for invalid references (current implementation should suffice for
  // all but the most extreme cases)
  return scrRefToBBBCCCVVV(scrRef1) - scrRefToBBBCCCVVV(scrRef2);
}

/** Get the localized string key for a given scroll group Id (or no scroll group if `undefined`) */
export function getLocalizeKeyForScrollGroupId(
  scrollGroupId: ScrollGroupId | undefined | 'undefined',
): LocalizeKey {
  return `%scrollGroup_${scrollGroupId}%`;
}

/**
 * Gets a list of localized string keys for provided scroll group Ids. Uses
 * {@link getLocalizeKeyForScrollGroupId} internally
 *
 * @example
 *
 * ```typescript
 * getLocalizeKeysForScrollGroupIds([undefined, 0, 1, 2, 3, 4]);
 * // Gives localized string keys for the provided scroll group ids in an array
 * ```
 *
 * @param scrollGroupIds Scroll group ids to include
 * @returns List of localized string keys for scroll group Ids
 */
export function getLocalizeKeysForScrollGroupIds(scrollGroupIds: (ScrollGroupId | undefined)[]) {
  return scrollGroupIds.map((scrollGroupId) => getLocalizeKeyForScrollGroupId(scrollGroupId));
}

/**
 * Get the formatted or provided book name of a Scripture reference
 *
 * @param scrRef The Scripture reference to format.
 * @param optionOrLocalizedBookName Either 'id' (the default) to format using the "standard" (as
 *   defined by SIL/UBS) 3-letter book ID, 'English' to format using the English book name spelled
 *   out, or some other string (e.g., a localized book name, vernacular abbreviation, FCBH book id,
 *   etc.) to use.
 * @returns The formatted or provided book name of a Scripture reference
 */
export function getBookNameFromVerseRef(
  scrRef: SerializedVerseRef,
  optionOrLocalizedBookName?: 'id' | 'English' | string,
): string {
  switch (optionOrLocalizedBookName) {
    case 'English':
      return Canon.bookIdToEnglishName(scrRef.book);
    case 'id':
    case undefined:
      return scrRef.book;
    default:
      return optionOrLocalizedBookName;
  }
}

/** Formatting options for formatScrRef */
export type FormatScrRefOptions = {
  /**
   * Either 'id' (the default) to format using the "standard" (as defined by SIL/UBS) 3-letter book
   * ID, 'English' to format using the English book name spelled out, or some other string (e.g., a
   * localized book name, vernacular abbreviation, FCBH book id, etc.) to use.
   */
  optionOrLocalizedBookName?: 'id' | 'English' | string;
  /** The character(s) used to separate the chapter number from the verse number. */
  chapterVerseSeparator?: string;
  /** The character(s) used to separate the book from the chapter number. */
  bookChapterSeparator?: string;
};

/**
 * Formats a Scripture reference
 *
 * @param scrRef The Scripture reference to format.
 * @param formatScrRefOptions Optional FormatScrRefOptions to format the scripture reference.
 *   Default chapterVerseSepator is a colon (:). Default chapterVerseSeparator is a single space.
 * @returns The formatted reference.
 */
export function formatScrRefWithOptions(
  scrRef: SerializedVerseRef,
  formatScrRefOptions?: FormatScrRefOptions,
) {
  const bookName = getBookNameFromVerseRef(scrRef, formatScrRefOptions?.optionOrLocalizedBookName);
  const bookChapterSeparator = formatScrRefOptions?.bookChapterSeparator ?? ' ';
  const chapterVerseSeparator = formatScrRefOptions?.chapterVerseSeparator ?? ':';
  return `${bookName}${bookChapterSeparator}${scrRef.chapterNum}${chapterVerseSeparator}${scrRef.verseNum}`;
}

/**
 * Formats a Scripture reference
 *
 * @param scrRef The Scripture reference to format.
 * @param optionOrLocalizedBookName Either 'id' (the default) to format using the "standard" (as
 *   defined by SIL/UBS) 3-letter book ID, 'English' to format using the English book name spelled
 *   out, or some other string (e.g., a localized book name, vernacular abbreviation, FCBH book id,
 *   etc.) to use.
 * @param chapterVerseSeparator The character(s) used to separate the chapter number from the verse
 *   number. Default is a colon (:).
 * @param bookChapterSeparator The character(s) used to separate the book from the chapter number.
 *   Default is a single space.
 * @returns The formatted reference.
 */
export function formatScrRef(
  scrRef: SerializedVerseRef,
  optionOrLocalizedBookName?: 'id' | 'English' | string,
  chapterVerseSeparator?: string,
  bookChapterSeparator?: string,
): string {
  return formatScrRefWithOptions(scrRef, {
    optionOrLocalizedBookName,
    chapterVerseSeparator,
    bookChapterSeparator,
  });
}

/**
 * Formats chapter and/or verse number of a Scripture reference. Negative chapter or verse results
 * in omitting that part.
 *
 * @param scrRef The Scripture reference to format.
 * @param chapterVerseSeparator The characters(s) used to separate the chapter number from the verse
 *   number. Default is a colon (:).
 * @returns The formatted chapter and/or verse.
 */
export function formatChapterAndVerseWithOptionalParts(
  scrRef: SerializedVerseRef,
  chapterVerseSeparator?: string,
): string {
  const formattedVerse =
    scrRef.verseNum < 0 ? '' : `${chapterVerseSeparator ?? ':'}${scrRef.verseNum}`;
  return scrRef.chapterNum < 0 ? '' : `${scrRef.chapterNum}${formattedVerse}`;
}

/**
 * Formats a Scripture reference. Empty book, negative chapter or verse results in omitting that
 * part.
 *
 * @param scrRef The Scripture reference to format.
 * @param FormatScrRefOptions Optional FormatScrRefOptions to format the scripture reference
 * @returns The formatted reference. This may be only parts like only book or only chapter or only
 *   verse or a combination.
 */
export function formatScrRefWithOptionalParts(
  scrRef: SerializedVerseRef,
  options?: FormatScrRefOptions,
): string {
  const book = getBookNameFromVerseRef(scrRef, options?.optionOrLocalizedBookName);
  const chapterAndVerse = formatChapterAndVerseWithOptionalParts(
    scrRef,
    options?.chapterVerseSeparator,
  );
  return `${book}${book && chapterAndVerse ? (options?.bookChapterSeparator ?? ' ') : ''}${chapterAndVerse}`;
}

/**
 * Options to format a scripture reference or range
 *
 * Extends FormatScrRefOptions
 */
export type FormatScrRefRangeOptions = FormatScrRefOptions & {
  /** See optionOrLocalizedBookName */
  endRefOptionOrLocalizedBookName?: 'id' | 'English' | string;
  /** The character(s) used to separate the two references. */
  rangeSeparator?: string;
  /** Wether or not to repeat the book name in the end reference if it is the same. Default false. */
  repeatBookName?: boolean;
};

/**
 * Formats a range of two Scripture references. Empty book, negative chapter or verse results in
 * omitting that part.
 *
 * @param startScrRef The Scripture reference to format at the start of the range.
 * @param endScrRef The Scripture reference to format at the end of the range.
 * @param options Optional FormatScrRefRangeOptions to format the scripture reference range. Default
 *   range separator is a hyphen surrounded by two spaces. Default book name options for the end ref
 *   are the book name options for the start ref. The book name is not repeated by default.
 * @returns The formatted range.
 */
export function formatScrRefRange(
  startScrRef: SerializedVerseRef,
  endScrRef: SerializedVerseRef,
  options?: FormatScrRefRangeOptions,
): string {
  const formattedStartRef = formatScrRefWithOptionalParts(startScrRef, options);
  if (compareScrRefs(startScrRef, endScrRef) === 0) return formattedStartRef;

  const endRefBookName =
    startScrRef.book === endScrRef.book && !options?.repeatBookName
      ? ''
      : (options?.endRefOptionOrLocalizedBookName ?? options?.optionOrLocalizedBookName);
  const formattedEndRef = formatScrRefWithOptionalParts(endScrRef, {
    ...options,
    optionOrLocalizedBookName: endRefBookName,
  });

  return `${formattedStartRef}${options?.rangeSeparator ?? ' - '}${formattedEndRef}`;
}

/**
 * Represents the major sections of the Bible and extra materials. Used for grouping and filtering
 * books in the book selector.
 */
export enum Section {
  /** Old Testament books (Genesis through Malachi) */
  OT = 'OT',
  /** New Testament books (Matthew through Revelation) */
  NT = 'NT',
  /** Deuterocanonical books (e.g. Tobit, Judith, 1-2 Maccabees) */
  DC = 'DC',
  /** Additional materials not part of the biblical canon (e.g. XXA, XXB etc.) */
  Extra = 'Extra',
}

/**
 * Determines which section a book belongs to based on its ID
 *
 * @param bookId The ID of the book (e.g., 'GEN', 'MAT')
 * @returns The section (OT, NT, DC, or Extra) that the book belongs to
 * @throws Error if the book ID is not recognized or cannot be categorized
 */
export const getSectionForBook = (bookId: string): Section => {
  if (Canon.isBookOT(bookId)) return Section.OT;
  if (Canon.isBookNT(bookId)) return Section.NT;
  if (Canon.isBookDC(bookId)) return Section.DC;
  if (Canon.isExtraMaterial(bookId)) return Section.Extra;

  throw new Error(`Unknown section for book: ${bookId}`);
};

// #region white space functions

const nonSemanticWhiteSpaceRegex =
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/;
/**
 * Determines whether a string contains one or more "non-meaningful" white space characters
 * according to `ParatextData.dll` and no other characters.
 *
 * "Non-meaningful" white space according to `ParatextData.dll` is white space (according to
 * {@link isWhiteSpace}) other than IDEOGRAPHIC SPACE (U+3000) and also includes ZWSP (U+200B)
 *
 * This function is a direct translation of `UsfmToken.IsNonSemanticWhiteSpace` from
 * `ParatextData.dll`
 *
 * @param ch Single character or a string of characters
 * @returns `true` if the string consists of one or more "non-meaningful" white space characters and
 *   no other characters, `false` otherwise
 */
function isNonSemanticWhiteSpace(ch: string) {
  return nonSemanticWhiteSpaceRegex.test(ch);
}

// Note Zero-width joiner is at the start because eslint thinks we're trying to test for joined
// characters if it's in the middle. https://eslint.org/docs/latest/rules/no-misleading-character-class
const invisibleCharOrWhiteSpaceRegex =
  /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
/**
 * Determines whether a string contains one or more Paratext-9-selectable invisible characters or
 * white space characters and no other characters.
 *
 * Paratext-9-selectable invisible characters or white space characters are characters listed in
 * [Paratext 9's "Whitespace and invisible characters
 * drop-down"](https://paratext.myjetbrains.com/youtrack/issue/PTX-23623) that the user can insert
 * into the text:
 *
 * ```ts
 * // Zero-width joiner, em space, en space, space, no-break space, narrow no-break space,
 * // thin space, hair space, ideographic space, zero-width space, zero-width non-joiner,
 * // word joiner, left-to-right mark, right-to-left mark
 * /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/.test(
 *   ch,
 * );
 * ```
 *
 * Note: more white space characters are supported in Paratext 9 but are not listed in this
 * dropdown. See {@link isWhiteSpace} for more information.
 *
 * This function is a direct translation of `CharExtensions.IsInvisibleCharOrWhitespace` from
 * `ParatextData.dll`
 *
 * @param ch Single character or a string of characters
 * @returns `true` if the string consists of one or more Paratext-9-selectable invisible characters
 *   or white space characters and no other characters, `false` otherwise
 */
function isParatextSelectableInvisibleCharOrWhiteSpace(ch: string) {
  return invisibleCharOrWhiteSpaceRegex.test(ch);
}

/**
 * Converts all control characters, carriage returns, and tabs into spaces and then strips duplicate
 * spaces.
 *
 * This is mainly intended for use with individual Scripture strings in USFM, USX, USJ, etc. format.
 * It is not intended to implement the [USFM white space definition or reduction
 * rules](https://docs.usfm.bible/usfm/3.1/whitespace.html) but strictly follows Paratext 9's white
 * space rules. It is generally best suited to normalizing spaces within a Scripture marker as it
 * removes all newlines.
 *
 * This function is a direct translation of `UsfmToken.RegularizeSpaces` from `ParatextData.dll`
 */
export function normalizeScriptureSpaces(str: string): string {
  let result = '';
  let lastCharWasSpace = false;
  // Initialized to placeholder previous character
  let prevCh = '\0';
  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    // Control characters, CR/LF, and TAB become spaces
    if (ch.charCodeAt(0) < 32) {
      if (!lastCharWasSpace) result += ' ';
      lastCharWasSpace = true;
    } else if (
      !lastCharWasSpace &&
      ch === ZWSP &&
      i + 1 < str.length &&
      isNonSemanticWhiteSpace(str[i + 1])
    ) {
      // ZWSP is redundant if followed by a space
    } else if (isNonSemanticWhiteSpace(ch)) {
      // Keep other kinds of spaces
      if (!lastCharWasSpace) result += ch;
      lastCharWasSpace = true;
    } else if (isParatextSelectableInvisibleCharOrWhiteSpace(ch) && prevCh === ch) {
      // If the char is a whitespace or invisible char that has not already been handled and is a
      // duplicate, remove the duplicate
    } else {
      result += ch;
      lastCharWasSpace = false;
    }

    prevCh = ch;
  }

  return result;
}

/**
 * Determines whether the array of marker contents is "empty" meaning it is undefined, is an empty
 * array, or has just `undefined` or `''` in it
 *
 * Paratext passed up "\va \va*" which had no content array coming in translated to USJ, but the
 * editor put a content array with an empty string. So this will help them be considered equal.
 */
function isUsjContentEmpty(content: MarkerContent[] | undefined) {
  if (!content) return true;
  if (content.length === 0) return true;
  return content.length === 1 && (content[0] === undefined || content[0] === '');
}

/**
 * Determines if the content object is the final child of a parent that is a block-level marker.
 *
 * We do not need to walk up the ancestors to the _closest_ block marker because spaces are
 * preserved at the end of in-line markers even at the end of a paragraph. We just need to know if
 * the parent is a block marker because space at the end of a block marker is not preserved.
 *
 * @param contentObject USJ document or marker to check
 * @param parent Parent object of `contentObject`. If `contentObject` is a USJ document, this should
 *   be `undefined`.
 * @returns `true` if `contentObject` is the final child of the closest block-level marker; `false`
 *   otherwise
 */
function isAtEndOfBlockMarker(
  contentObject: MarkerContent | Usj,
  parent: MarkerObject | Usj | undefined,
) {
  if (!parent) return false;
  // If the parent is not a block-level marker, the content object is not at the end of a block-level marker
  if (!BLOCK_MARKER_TYPES.includes(parent.type)) return false;

  if (!parent.content)
    throw new Error(
      `Parent ${JSON.stringify(parent)} of ${JSON.stringify(contentObject)} does not have a content array! This should not happen!`,
    );
  // If the content object is not the last in its parent, it is not at the end of a block-level marker
  if (contentObject !== parent.content[parent.content.length - 1]) return false;

  return true;
}

/**
 * Determines if the USJ documents or markers (and all contents) are equivalent after regularizing
 * spaces according to the way `ParatextData.dll` does.
 *
 * Note that this will not work properly if there ever exist any properties of USJ document or USJ
 * markers other than `content` that are complex objects like arrays or objects as the properties
 * are shallow equaled.
 *
 * @param a First USJ document or marker to compare
 * @param aParent Parent object of `a`. If `a` is a USJ document, this should be `undefined`.
 * @param b Second USJ document or marker to compare
 * @param bParent Parent object of `b`. If `b` is a USJ document, this should be `undefined`.
 */
function areUsjContentsEqualExceptWhitespaceInternal(
  a: MarkerContent | Usj | undefined,
  aParent: MarkerObject | Usj | undefined,
  b: MarkerContent | Usj | undefined,
  bParent: MarkerObject | Usj | undefined,
) {
  if (!a && !b) return true;
  if (!a || !b) return false;

  const aIsString = isString(a);
  const bIsString = isString(b);
  if (aIsString && bIsString) {
    const aNormalized = normalizeScriptureSpaces(a);
    const bNormalized = normalizeScriptureSpaces(b);
    // Check to see if their regularized forms are equal. If so, they're equal. If not, they may still
    // be equal if they are at the end of a block-level marker and the only difference is space at the end.
    // If at the end of a block-level marker with space at the end, take off the final space and compare again
    if (aNormalized !== bNormalized) {
      // If neither ends in whitespace, they are not equal
      if (!isWhiteSpace(at(aNormalized, -1) ?? '') && !isWhiteSpace(at(bNormalized, -1) ?? ''))
        return false;

      // If either is not at the end of a block-level marker, they are not equal
      if (!isAtEndOfBlockMarker(a, aParent)) return false;
      if (!isAtEndOfBlockMarker(b, bParent)) return false;

      // Trim the end of each string
      let aTrimmed = aNormalized;
      while (isWhiteSpace(at(aTrimmed, -1) ?? '')) aTrimmed = slice(aTrimmed, 0, -1);
      let bTrimmed = bNormalized;
      while (isWhiteSpace(at(bTrimmed, -1) ?? '')) bTrimmed = slice(bTrimmed, 0, -1);
      // If they are not equal after trimming, they are not equal
      if (aTrimmed !== bTrimmed) return false;
    }
  } else if (!aIsString && !bIsString) {
    // We have determined they are not strings, so they must be objects with various simple properties and possibly a `content` array
    const aObject: MarkerObject | Usj = a;
    const bObject: MarkerObject | Usj = b;
    // Check if all properties are present and equal. We will check `content` separately
    // Seems Object.keys doesn't support proper key typing? Asserting to the key types
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const aKeys = Object.keys(aObject).filter(
      (key) => key !== 'content',
    ) as (keyof typeof aObject)[];
    if (aKeys.length !== Object.keys(bObject).filter((key) => key !== 'content').length)
      return false;
    if (aKeys.some((key) => !(key in bObject) || aObject[key] !== bObject[key])) return false;

    // Check that both `content`s are equal
    const isAContentEmpty = isUsjContentEmpty(aObject.content);
    const isBContentEmpty = isUsjContentEmpty(bObject.content);
    // If one is empty and the other is not, they are not equal
    if (isAContentEmpty !== isBContentEmpty) return false;
    // If both are empty, they are equal. If neither is empty, do more testing
    if (!isAContentEmpty && !isBContentEmpty) {
      // Although TypeScript doesn't realize `!isUsjContentEmpty(a)` means a is an array, we know
      // they are both arrays, so we can access the content with a bang.
      /* eslint-disable no-type-assertion/no-type-assertion */
      let aContent: MarkerContent[] = aObject.content!;
      let bContent: MarkerContent[] = bObject.content!;
      /* eslint-enable no-type-assertion/no-type-assertion */

      // If either of the two contents is block-level and has an extra whitespace string at the end, remove it
      const aLast = aContent[aContent.length - 1];
      if (BLOCK_MARKER_TYPES.includes(aObject.type) && isString(aLast) && isWhiteSpace(aLast))
        aContent = aContent.slice(0, -1);

      // If either of the two contents is block-level and has an extra whitespace string at the end, remove it
      const bLast = bContent[bContent.length - 1];
      if (BLOCK_MARKER_TYPES.includes(bObject.type) && isString(bLast) && isWhiteSpace(bLast))
        bContent = bContent.slice(0, -1);

      if (aContent.length !== bContent.length) return false;
      for (let i = 0; i < aContent.length; i += 1) {
        if (
          !areUsjContentsEqualExceptWhitespaceInternal(aContent[i], aObject, bContent[i], bObject)
        )
          return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

/**
 * Determines if the USJ documents or markers (and all contents) are equivalent after regularizing
 * spaces according to the way `ParatextData.dll` does.
 *
 * Note that this will not work properly if there ever exist any properties of USJ document or USJ
 * markers other than `content` that are complex objects like arrays or objects as the properties
 * are shallow equaled.
 */
export function areUsjContentsEqualExceptWhitespace(a: Usj | undefined, b: Usj | undefined) {
  return areUsjContentsEqualExceptWhitespaceInternal(a, undefined, b, undefined);
}

// #endregion
