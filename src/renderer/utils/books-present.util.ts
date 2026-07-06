import { Canon } from '@sillsdev/scripture';

/** Default `platformScripture.booksPresent` value while loading or on error: no books */
export const BOOKS_PRESENT_DEFAULT = '';

/**
 * Converts a `platformScripture.booksPresent` flag string ('1' per present book, indexed by
 * canonical book number) into the list of present book ids
 */
export function getBookIdsFromBooksPresent(booksPresent: string): string[] {
  return Array.from(booksPresent).reduce((ids: string[], char, index) => {
    if (char === '1') ids.push(Canon.bookNumberToId(index + 1));
    return ids;
  }, []);
}
