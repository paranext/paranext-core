import { isString, isValidValue } from '@shared/utils/util';
import { BookInfo, ScriptureReference } from './scripture-types';

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

export const getBookNumFromName = (bookName: string): number => {
  return scrBookData.findIndex((bookNames) => bookNames.fullNames.includes(bookName));
};

export const getBookShortNameFromNum = (bookNum: number): string => {
  return scrBookData[bookNum < FIRST_SCR_BOOK_NUM || bookNum > LAST_SCR_BOOK_NUM ? 0 : bookNum]
    .shortName;
};

export const getBookLongNameFromNum = (bookNum: number): string => {
  return scrBookData[bookNum < FIRST_SCR_BOOK_NUM || bookNum > LAST_SCR_BOOK_NUM ? 0 : bookNum]
    .fullNames[0];
};

export const getAllBookNames = (): string[] => {
  const bookNames: string[] = [];

  scrBookData.slice(1).forEach((books) => {
    const fullName = books.fullNames[0];
    bookNames.push(fullName);
  });

  return bookNames;
};

export const getChaptersForBook = (bookNum: number): number => {
  return scrBookData[bookNum].chapters;
};

export const offsetBook = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  book: Math.max(FIRST_SCR_BOOK_NUM, Math.min(scrRef.book + offset, LAST_SCR_BOOK_NUM)),
  chapter: 1,
  verse: 1,
});

export const offsetChapter = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  ...scrRef,
  chapter: Math.min(
    Math.max(FIRST_SCR_CHAPTER_NUM, scrRef.chapter + offset),
    scrBookData[scrRef.book].chapters,
  ),
  verse: 1,
});

export const offsetVerse = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  ...scrRef,
  verse: Math.max(FIRST_SCR_VERSE_NUM, scrRef.verse + offset),
});

/** Parse a verse number from a string */
export const parseVerse = (verseText: string): number | undefined => {
  const verseNum = parseInt(verseText, 10);
  return isValidValue(verseNum) ? verseNum : undefined;
};

/** Parse a chapter number from a string */
export const parseChapter = (chapterText: string): number | undefined => {
  // For now, this is the same as parseVerse. Maybe there could be other constraints in the future
  return parseVerse(chapterText);
};

const regexpScrRefFull = /(\d )?([a-zA-Z ]+) ([^:]+):(.+)/;
const regexpScrRefChapter = /([^ ]+) ([^:]+)/;
const regexpScrRefBook = /(\d )?([a-zA-Z ]+)/;
export const getScrRefFromText = (
  refText: string,
  defaultChapter = 1,
  defaultVerse = 1,
): ScriptureReference => {
  // No text entered. Return error
  if (!refText) return { book: -1, chapter: -1, verse: -1 };
  const scrRefMatchFull = refText.match(regexpScrRefFull);

  // If we have the whole reference, use it
  if (scrRefMatchFull && scrRefMatchFull.length === 5)
    return {
      book: getBookNumFromName(
        `${scrRefMatchFull[1] ? scrRefMatchFull[1] : ''}${scrRefMatchFull[2]}`,
      ),
      chapter: parseInt(scrRefMatchFull[3], 10),
      verse: parseInt(scrRefMatchFull[4], 10),
    };

  const scrRefMatchChapter = refText.match(regexpScrRefChapter);
  // If we have the reference to the chapter, use it
  if (scrRefMatchChapter && scrRefMatchChapter.length === 3)
    return {
      book: getBookNumFromName(
        `${scrRefMatchChapter[1] ? scrRefMatchChapter[1] : ''}${scrRefMatchChapter[2]}`,
      ),
      chapter: parseInt(scrRefMatchChapter[3], 10),
      verse: defaultVerse,
    };

  const scrRefMatchBook = refText.match(regexpScrRefBook);
  // If we have the reference to the book, use it
  if (scrRefMatchBook && scrRefMatchBook.length === 2)
    return {
      book: getBookNumFromName(
        `${scrRefMatchBook[1] ? scrRefMatchBook[1] : ''}${scrRefMatchBook[2]}`,
      ),
      chapter: defaultChapter,
      verse: defaultVerse,
    };

  // Nothing matched. Return error
  return { book: -1, chapter: -1, verse: -1 };
};

export const getTextFromScrRef = (scrRef: ScriptureReference): string =>
  `${getBookLongNameFromNum(scrRef.book)} ${scrRef.chapter}${
    scrRef.verse >= 0 ? `:${scrRef.verse}` : ''
  }`;

export const areScrRefsEqual = (
  scrRef1: ScriptureReference | string,
  scrRef2: ScriptureReference | string,
): boolean => {
  if (scrRef1 === scrRef2) return true;

  const scrRef1Final: ScriptureReference = isString(scrRef1)
    ? getScrRefFromText(scrRef1 as string)
    : (scrRef1 as ScriptureReference);
  const scrRef2Final: ScriptureReference = isString(scrRef2)
    ? getScrRefFromText(scrRef2 as string)
    : (scrRef2 as ScriptureReference);
  return (
    scrRef1Final.book === scrRef2Final.book &&
    scrRef1Final.chapter === scrRef2Final.chapter &&
    scrRef1Final.verse === scrRef2Final.verse
  );
};
