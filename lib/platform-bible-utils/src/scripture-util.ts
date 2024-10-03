import { Canon, VerseRef } from '@sillsdev/scripture';
import { BookInfo, ScriptureReference, ScrollGroupId } from './scripture.model';
import { split, startsWith } from './string-util';
import { LocalizeKey } from './menus.model';

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
];

export const FIRST_SCR_BOOK_NUM = 1;
export const LAST_SCR_BOOK_NUM = scrBookData.length - 1;
export const FIRST_SCR_CHAPTER_NUM = 1;
export const FIRST_SCR_VERSE_NUM = 1;

export const getChaptersForBook = (bookNum: number): number => {
  return scrBookData[bookNum]?.chapters ?? -1;
};

export const offsetBook = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  bookNum: Math.max(FIRST_SCR_BOOK_NUM, Math.min(scrRef.bookNum + offset, LAST_SCR_BOOK_NUM)),
  chapterNum: 1,
  verseNum: 1,
});

export const offsetChapter = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  ...scrRef,
  chapterNum: Math.min(
    Math.max(FIRST_SCR_CHAPTER_NUM, scrRef.chapterNum + offset),
    getChaptersForBook(scrRef.bookNum),
  ),
  verseNum: 1,
});

export const offsetVerse = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
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
 * Get the Scripture reference as an easily comparable/sortable integer.
 *
 * @param scrRef The Scripture reference.
 * @returns An integer where the first three digits represent the book, the next three represent the
 *   chapter and the last three represent the verse.
 */
export function scrRefToBBBCCCVVV(scrRef: ScriptureReference): number {
  return new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum).BBBCCCVVV;
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
export function compareScrRefs(scrRef1: ScriptureReference, scrRef2: ScriptureReference): number {
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
 * Formats a Scripture reference.
 *
 * @param scrRef The Scripture reference to format.
 * @param optionOrLocalizedBookName Either 'id' (the default) to format using the "standard" (as
 *   defined by SIL/UBS) 3-letter book ID, 'English' to format using the English book name spelled
 *   out, or some other string (e.g., a localized book name, vernacular abbreviation, FCBH book id,
 *   etc.) to use.
 * @param chapterVerseSeparator The character used to separate the chapter number from the verse
 *   number. Default is a colon (:). Note: More than one character is allowed.
 * @param bookChapterSeparator The character used to separate the book from the chapter number.
 *   Default is a single space. Note: More than one character is allowed.
 * @returns The formatted reference.
 */
export function formatScrRef(
  scrRef: ScriptureReference,
  optionOrLocalizedBookName?: 'id' | 'English' | string,
  chapterVerseSeparator?: string,
  bookChapterSeparator?: string,
): string {
  let book: string;
  switch (optionOrLocalizedBookName ?? 'id') {
    case 'English':
      book = Canon.bookNumberToEnglishName(scrRef.bookNum);
      break;
    case 'id':
      book = Canon.bookNumberToId(scrRef.bookNum);
      break;
    default:
      // We already dealt with undefined about in the switch, but TS is getting confused.
      book = optionOrLocalizedBookName ?? '';
      break;
  }
  return `${book}${bookChapterSeparator ?? ' '}${scrRef.chapterNum}${chapterVerseSeparator ?? ':'}${scrRef.verseNum}`;
}
