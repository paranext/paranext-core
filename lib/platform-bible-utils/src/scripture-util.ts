import { Canon } from '@sillsdev/scripture';
import { BookInfo, ScriptureReference } from './scripture.model';
import { split, startsWith } from './string-util';

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
 * not read Roman script well and need to have books identified in a alternate script (e.g.
 * Chinese or Russian)
 *
 * @param bookNumber
 * @param localizationLanguage in BCP 47 format
 * @param getLocalizedString function that provides the localized versions of the book ids and names
 * asynchronously. Sometimes provided a utility function in platform-bible-utils so it needs to
 * avoid accessing the papi directly
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
  const parts2 = split(parts[0], '\xff08')
  const retVal = parts2[0].trim();
  return retVal;
}
