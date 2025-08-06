import { Canon } from '@sillsdev/scripture';
import { getChaptersForBook } from 'platform-bible-utils';
import { BookType, BookWithOptionalChapterAndVerse } from './book-chapter-control.types';

export const ALL_BOOK_IDS = Canon.allBookIds.filter(
  (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
);

export const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)]),
);

export const BOOK_TYPE_LABELS: Record<BookType, string> = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
  Extra: 'Extra',
};

// Smart parsing regex patterns
export const SCRIPTURE_REGEX_PATTERNS = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i,
} as const;

export const SEARCH_QUERY_FORMATS = [
  SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE,
];

export function fetchEndChapter(bookId: string) {
  // getChaptersForBook returns -1 if not found in scrBookData
  // scrBookData only includes OT and NT, so all DC will return -1
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
}

export function calculateTopMatch(
  query: string,
  availableBooks: string[],
): BookWithOptionalChapterAndVerse | undefined {
  if (!query.trim()) return undefined;

  // First try smart parsing with regex patterns
  const topMatch = SEARCH_QUERY_FORMATS.reduce(
    (result: BookWithOptionalChapterAndVerse | undefined, format) => {
      if (result) return result;

      const matches = format.exec(query.trim());
      if (matches) {
        const [book, chapter = undefined, verse = undefined] = matches.slice(1);

        let validBookId: string | undefined;

        // Match for exact full book name
        const getBookIdFromEnglishName = (bookName: string): string | undefined => {
          return Object.keys(ALL_ENGLISH_BOOK_NAMES).find(
            (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase(),
          );
        };

        const matchingBookIdForFullName = getBookIdFromEnglishName(book);
        if (matchingBookIdForFullName && availableBooks.includes(matchingBookIdForFullName)) {
          validBookId = matchingBookIdForFullName;
        }

        // Match for exact book id
        if (!validBookId && Canon.isBookIdValid(book)) {
          const bookUpperCase = book.toUpperCase();
          if (availableBooks.includes(bookUpperCase)) {
            validBookId = bookUpperCase;
          }
        }

        // Match for partial book name or id
        if (!validBookId) {
          const bookLowerCase = book.toLowerCase();

          const allPotentialMatches = availableBooks.filter((bookId) => {
            const bookEnglishName = ALL_ENGLISH_BOOK_NAMES[bookId];
            return (
              bookEnglishName.toLowerCase().includes(bookLowerCase) ||
              bookId.toLowerCase().includes(bookLowerCase)
            );
          });

          // Only create a topMatch if exactly one book could match
          if (allPotentialMatches.length === 1) {
            [validBookId] = allPotentialMatches;
          }
        }

        if (validBookId) {
          let chapterNum = chapter ? parseInt(chapter, 10) : undefined;
          if (chapterNum && chapterNum > fetchEndChapter(validBookId))
            chapterNum = Math.max(fetchEndChapter(validBookId), 1);
          const verseNum = verse ? parseInt(verse, 10) : undefined;

          return {
            book: validBookId,
            chapterNum,
            verseNum,
          };
        }
      }

      return undefined;
    },
    undefined,
  );

  if (topMatch) return topMatch;

  return undefined;
}

export function generateCommandValue(bookId: string, chapter?: number): string {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${chapter ? ` ${chapter}` : ''}`;
}
