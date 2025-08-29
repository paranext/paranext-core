import { Canon } from '@sillsdev/scripture';
import { getChaptersForBook } from 'platform-bible-utils';
import { ALL_ENGLISH_BOOK_NAMES, doesBookMatchQuery } from '@/components/shared/book.utils';
import { BookWithOptionalChapterAndVerse } from './book-chapter-control.types';

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

export function getKeyCharacterType(key: string) {
  const isLetter = /^[a-zA-Z]$/.test(key);
  const isDigit = /^[0-9]$/.test(key);
  return { isLetter, isDigit };
}

export function fetchEndChapter(bookId: string) {
  // getChaptersForBook returns -1 if not found in scrBookData
  // scrBookData only includes OT and NT, so all DC will return -1
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
}

export function calculateTopMatch(
  query: string,
  availableBooks: string[],
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): BookWithOptionalChapterAndVerse | undefined {
  if (!query.trim() || availableBooks.length === 0) return undefined;

  // First try smart parsing with regex patterns
  const topMatch = SEARCH_QUERY_FORMATS.reduce(
    (result: BookWithOptionalChapterAndVerse | undefined, format) => {
      if (result) return result;

      const matches = format.exec(query.trim());
      if (matches) {
        const [book, chapter = undefined, verse = undefined] = matches.slice(1);

        let validBookId: string | undefined;

        // Match for partial book name or id

        const allPotentialMatches = availableBooks.filter((bookId) => {
          return doesBookMatchQuery(bookId, book, localizedBookNames);
        });

        // Only create a topMatch if exactly one book could match
        if (allPotentialMatches.length === 1) {
          [validBookId] = allPotentialMatches;
        }

        // Match for exact book id (English or localized)
        // This is only performed when a chapter number is provided, to prevent edge cases where
        // a search for e.g. `jud` would generate a top match for 'Jude', even though 'Judges' would
        // also be a valid match
        if (!validBookId && chapter) {
          // Check exact English book ID
          if (Canon.isBookIdValid(book)) {
            const bookIdUpperCase = book.toUpperCase();
            if (availableBooks.includes(bookIdUpperCase)) {
              validBookId = bookIdUpperCase;
            }
          }

          // Check exact localized book ID
          if (!validBookId && localizedBookNames) {
            const matchingLocalizedBookId = Array.from(localizedBookNames.entries()).find(
              ([, localizedBook]) => localizedBook.localizedId.toLowerCase() === book.toLowerCase(),
            );
            if (matchingLocalizedBookId && availableBooks.includes(matchingLocalizedBookId[0])) {
              [validBookId] = matchingLocalizedBookId;
            }
          }
        }

        // Match for exact full book name (English or localized)
        // This is only performed when a chapter number is provided, to prevent edge cases where
        // a search for e.g. `john` only matches `John` but not `1 John`, `2 John` and `3 John`
        if (!validBookId && chapter) {
          // Check exact English book name
          const getBookIdFromEnglishName = (bookName: string): string | undefined => {
            return Object.keys(ALL_ENGLISH_BOOK_NAMES).find(
              (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase(),
            );
          };

          const matchingBookIdForFullName = getBookIdFromEnglishName(book);
          if (matchingBookIdForFullName && availableBooks.includes(matchingBookIdForFullName)) {
            validBookId = matchingBookIdForFullName;
          }

          // Check exact localized book name
          if (!validBookId && localizedBookNames) {
            const matchingLocalizedBookName = Array.from(localizedBookNames.entries()).find(
              ([, localizedBook]) =>
                localizedBook.localizedName.toLowerCase() === book.toLowerCase(),
            );
            if (
              matchingLocalizedBookName &&
              availableBooks.includes(matchingLocalizedBookName[0])
            ) {
              [validBookId] = matchingLocalizedBookName;
            }
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
