import { Canon } from '@sillsdev/scripture';

/**
 * Builds a `booksPresent` flag string of full canon length with the given books flagged present.
 *
 * Throws on an id the canon does not recognize. A silent no-op there would hollow out whichever
 * test used it: the flag would land outside the string, the assertion would pass for the wrong
 * reason, and the behavior under test would go uncovered.
 */
export function booksPresentFor(bookIds: string[]): string {
  const flags = Array.from({ length: Canon.allBookIds.length }, () => '0');
  bookIds.forEach((bookId) => {
    const bookNumber = Canon.bookIdToNumber(bookId);
    if (bookNumber <= 0) throw new Error(`booksPresentFor: '${bookId}' is not a canon book id`);
    flags[bookNumber - 1] = '1';
  });
  return flags.join('');
}
