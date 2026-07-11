import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { getChaptersForBook } from './scripture-util';

/**
 * Versification-dependent chapter/verse bounds used to roll navigation across chapter and book
 * boundaries. Lookups return `undefined` when the bound is unknown (e.g. no project versification
 * is available), in which case navigation degrades gracefully (see each `get*Ref` function).
 *
 * @experimental This type is unstable and may change shape or disappear without notice
 */
export type ScriptureBounds = {
  /** Last chapter number of the book, or `undefined` if unknown */
  getEndChapter(book: string): number | undefined;
  /** Last verse number of the chapter in the book, or `undefined` if unknown */
  getEndVerse(book: string, chapterNum: number): number | undefined;
};

/** Last chapter of `book` from `bounds` when known, else the English-canon `getChaptersForBook`. */
function getEndChapterWithFallback(book: string, bounds?: ScriptureBounds): number {
  return bounds?.getEndChapter(book) ?? getChaptersForBook(Canon.bookIdToNumber(book));
}

/**
 * The present book (a member of `availableBooks`) that is canonically closest to `book` in the
 * given direction, or `undefined` if there is none. `book` itself need not be present — this is how
 * navigation from a book the project does not contain still lands on the nearest present book,
 * skipping any absent books in between (Paratext 9 behavior).
 *
 * @param book The book id to search out from (present or not)
 * @param availableBooks The present books (any order; compared by canonical book number)
 * @param direction `'next'` for the closest later book, `'previous'` for the closest earlier book
 * @returns The closest present book id in that direction, or `undefined` if none exists
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function findAdjacentPresentBook(
  book: string,
  availableBooks: string[],
  direction: 'next' | 'previous',
): string | undefined {
  const bookNum = Canon.bookIdToNumber(book);
  let closestBook: string | undefined;
  let closestBookNum = direction === 'next' ? Infinity : -Infinity;
  availableBooks.forEach((candidate) => {
    const candidateNum = Canon.bookIdToNumber(candidate);
    const isCloser =
      direction === 'next'
        ? candidateNum > bookNum && candidateNum < closestBookNum
        : candidateNum < bookNum && candidateNum > closestBookNum;
    if (isCloser) {
      closestBook = candidate;
      closestBookNum = candidateNum;
    }
  });
  return closestBook;
}

/**
 * Previous chapter (verse 1), rolling across book boundaries. Steps back one chapter within the
 * current book when it is present and not at chapter 1; otherwise — at chapter 1, or when the
 * current book is not in `availableBooks` — rolls to the last chapter of the closest previous
 * present book (skipping absent books). Returns `undefined` when there is no present book before
 * the current position.
 *
 * Unlike `offsetChapter` in this package (which steps within the current book and clamps at its
 * bounds), the `get*Ref` functions honor the `availableBooks` list and roll across book boundaries
 * the way Paratext 9 does.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order (compared by book number)
 * @param bounds Optional versification bounds; when omitted the English-canon chapter count is used
 * @returns The previous-chapter reference, or `undefined` if there is nowhere before it to go
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getPreviousChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum > 1)
    return { book, chapterNum: chapterNum - 1, verseNum: 1 };

  const previousBook = findAdjacentPresentBook(book, availableBooks, 'previous');
  if (!previousBook) return undefined;
  return {
    book: previousBook,
    chapterNum: Math.max(getEndChapterWithFallback(previousBook, bounds), 1),
    verseNum: 1,
  };
}

/**
 * Next chapter (verse 1), rolling across book boundaries. Steps forward one chapter within the
 * current book when it is present and not at its last chapter; otherwise — at the last chapter, or
 * when the current book is not in `availableBooks` — rolls to chapter 1 of the closest next present
 * book (skipping absent books). Returns `undefined` when there is no present book after the current
 * position.
 *
 * Unlike `offsetChapter` in this package (which steps within the current book and clamps at its
 * bounds), the `get*Ref` functions honor the `availableBooks` list and roll across book
 * boundaries.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order (compared by book number)
 * @param bounds Optional versification bounds; when omitted the English-canon chapter count is used
 * @returns The next-chapter reference, or `undefined` if there is nowhere after it to go
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getNextChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum < getEndChapterWithFallback(book, bounds))
    return { book, chapterNum: chapterNum + 1, verseNum: 1 };

  const nextBook = findAdjacentPresentBook(book, availableBooks, 'next');
  if (!nextBook) return undefined;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}

/**
 * Previous book (chapter 1 verse 1): the closest previous present book, skipping absent books.
 * `scrRef.book` need not be present. Returns `undefined` when there is no present book before it.
 *
 * Unlike `offsetBook` in this package (which steps through the full canon), the `get*Ref` functions
 * honor the `availableBooks` list.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order (compared by book number)
 * @returns Chapter 1 verse 1 of the closest previous present book, or `undefined` if none
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getPreviousBookRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  const previousBook = findAdjacentPresentBook(scrRef.book, availableBooks, 'previous');
  if (!previousBook) return undefined;
  return { book: previousBook, chapterNum: 1, verseNum: 1 };
}

/**
 * Next book (chapter 1 verse 1): the closest next present book, skipping absent books.
 * `scrRef.book` need not be present. Returns `undefined` when there is no present book after it.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order (compared by book number)
 * @returns Chapter 1 verse 1 of the closest next present book, or `undefined` if none
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getNextBookRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  const nextBook = findAdjacentPresentBook(scrRef.book, availableBooks, 'next');
  if (!nextBook) return undefined;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}

/**
 * Previous verse, matching Paratext 9 (`SIL.Scripture.VerseRef.PreviousVerse`) with books-present
 * awareness. Decrements within the chapter; from chapter 1 verse 1 goes to verse 0 (P9 assumes
 * verse 0 exists only at chapter 1); otherwise at verse ≤ 1 rolls to the previous chapter's last
 * verse, crossing into the closest previous present book's last chapter at chapter 1. When the
 * current book is not in `availableBooks`, rolls straight to the last verse of the last chapter of
 * the closest previous present book. Returns `undefined` when there is nowhere before it to go.
 *
 * `availableBooks` is optional: when omitted, the function does not know what is present, so it
 * steps only within the current book and cannot roll across book boundaries (it floors at verse 0 —
 * the pre-versification behavior the quick-nav buttons rely on). Without `bounds` (or when a needed
 * verse count is unknown) the rollover degrades: a missing verse count for a known roll target
 * lands on verse 1.
 *
 * Unlike `offsetVerse` in this package (which clamps within the current chapter), this honors the
 * `availableBooks` list and rolls across chapter and book boundaries.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order; omit to step only within the book
 * @param bounds Optional versification bounds; when omitted verse rollover degrades (see above)
 * @returns The previous-verse reference, or `undefined` if there is nowhere before it to go
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getPreviousVerseRef(
  scrRef: SerializedVerseRef,
  availableBooks?: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const { book, chapterNum, verseNum } = scrRef;
  // When availableBooks is unknown, treat the current book as navigable (step within it only).
  const isBookPresent = availableBooks === undefined || availableBooks.includes(book);

  if (isBookPresent) {
    if (verseNum > 1) return { book, chapterNum, verseNum: verseNum - 1 };
    // P9 parity: verse 0 is assumed to exist at chapter 1 of every book and nowhere else
    if (verseNum === 1 && chapterNum === 1) return { book, chapterNum: 1, verseNum: 0 };
    // No versification: keep the pre-versification behavior of flooring at verse 0
    if (!bounds) return { book, chapterNum, verseNum: 0 };
    if (chapterNum > 1) {
      const endVerse = bounds.getEndVerse(book, chapterNum - 1);
      return { book, chapterNum: chapterNum - 1, verseNum: Math.max(endVerse ?? 1, 1) };
    }
    // At chapter 1 verse 0: fall through to the previous-book roll below
  }

  // A book the project does not contain, or chapter 1 verse 0 of a present book: roll to the closest
  // previous present book's last chapter's last verse. Needs the available-books list to roll.
  if (availableBooks === undefined) return undefined;
  const previousBook = findAdjacentPresentBook(book, availableBooks, 'previous');
  if (!previousBook) return undefined;
  const endChapter = Math.max(getEndChapterWithFallback(previousBook, bounds), 1);
  const endVerse = bounds?.getEndVerse(previousBook, endChapter);
  return { book: previousBook, chapterNum: endChapter, verseNum: Math.max(endVerse ?? 1, 1) };
}

/**
 * Next verse, matching Paratext 9 (`SIL.Scripture.VerseRef.NextVerse`) with books-present
 * awareness. Increments within the chapter until the last verse, then rolls to the next chapter's
 * verse 1, crossing into the closest next present book at the last chapter. When the current book
 * is not in `availableBooks`, rolls straight to chapter 1 verse 1 of the closest next present book.
 * Returns `undefined` when there is nowhere after it to go.
 *
 * `availableBooks` is optional: when omitted, the function does not know what is present, so it
 * steps only within the current book and cannot roll across book boundaries. Without `bounds` (or
 * when the chapter's verse count is unknown) there is no known boundary, so this keeps the
 * pre-versification behavior of incrementing without an upper bound.
 *
 * Unlike `offsetVerse` in this package (which clamps within the current chapter), this honors the
 * `availableBooks` list and rolls across chapter and book boundaries.
 *
 * @param scrRef The current reference
 * @param availableBooks The present books, in canonical order; omit to step only within the book
 * @param bounds Optional versification bounds; when omitted verse increments without an upper bound
 * @returns The next-verse reference, or `undefined` if there is nowhere after it to go
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getNextVerseRef(
  scrRef: SerializedVerseRef,
  availableBooks?: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const { book, chapterNum, verseNum } = scrRef;
  const isBookPresent = availableBooks === undefined || availableBooks.includes(book);

  if (isBookPresent) {
    const endVerse = bounds?.getEndVerse(book, chapterNum);
    if (endVerse === undefined || verseNum < endVerse)
      return { book, chapterNum, verseNum: verseNum + 1 };
    // At (or past) the last verse of the chapter. Handle the in-book roll to the next chapter FIRST —
    // it needs only the current book's chapter count, not the book list — so a bounds-aware caller
    // that omits `availableBooks` still rolls to the next chapter of the same book (symmetric with
    // getPreviousVerseRef, which rolls back a chapter without needing `availableBooks`). Only at the
    // book's LAST chapter do we consult the book list to cross into the closest next present book.
    if (chapterNum < getEndChapterWithFallback(book, bounds))
      return { book, chapterNum: chapterNum + 1, verseNum: 1 };
    return getNextChapterRef(scrRef, availableBooks ?? [], bounds);
  }

  // A book the project does not contain: roll to chapter 1 verse 1 of the closest next present book
  const nextBook = findAdjacentPresentBook(book, availableBooks, 'next');
  if (!nextBook) return undefined;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
