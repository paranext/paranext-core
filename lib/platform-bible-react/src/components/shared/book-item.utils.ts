import {
  ALL_ENGLISH_BOOK_NAMES,
  getLocalizedBookId,
  getLocalizedBookName,
} from '@/components/shared/book.utils';

/**
 * Builds the cmdk `CommandItem` value for a book row. Localized parts are included when they are
 * available because cmdk filters book rows by their value, so a query typed in the user's language
 * has to be able to match.
 *
 * Deliberately carries no chapter: a book row names a book and nothing more. Appending a chapter
 * here would spell a string {@link parseChapterFromItemValue} has to read as a chapter cell, which
 * is exactly the confusion the round-trip check there exists to prevent.
 */
export function generateCommandValue(
  bookId: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${localizedBookNames ? ` ${getLocalizedBookId(bookId, localizedBookNames)} ${getLocalizedBookName(bookId, localizedBookNames)}` : ''}`;
}

/**
 * Builds the cmdk `CommandItem` value for one cell of the chapter grid.
 *
 * The format is deliberately **not** localized. The chapter grid renders its `CommandItem value`
 * from this function and `BookChapterControl` sets its controlled `commandValue` from it, so both
 * sides must produce byte-identical strings for cmdk to find the item to highlight. Localized parts
 * — which `generateCommandValue` adds for book rows, because cmdk filters those — would break the
 * match as soon as `localizedBookNames` is supplied.
 */
export function chapterItemValue(bookId: string, chapter: number): string {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapter}`;
}

/** Builds the cmdk `CommandItem` value for one cell of the verse grid. @see chapterItemValue */
export function verseItemValue(bookId: string, chapterNum: number, verse: number): string {
  return `${chapterItemValue(bookId, chapterNum)}:${verse}`;
}

/**
 * Reads the chapter number back out of a {@link chapterItemValue}, or `undefined` when the value
 * does not identify a chapter cell (a book row, or a verse cell — a verse value ends in digits too,
 * so the colon has to be excluded explicitly).
 *
 * Ending in digits is not sufficient evidence: several canon books have English names that end in a
 * number (`PS2` → "Psalm 151", `PS3` → "Psalms 152-155"), so a plain trailing-number match reads a
 * book row for one of those as a chapter cell. The candidate is therefore round-tripped through
 * {@link chapterItemValue} and only accepted when it reproduces the value byte for byte.
 */
export function parseChapterFromItemValue(value: string): number | undefined {
  if (value.includes(':')) return undefined;
  const match = /(\d+)$/.exec(value);
  if (!match) return undefined;
  const chapter = parseInt(match[1], 10);
  const firstSpaceIndex = value.indexOf(' ');
  if (firstSpaceIndex < 0) return undefined;
  const bookId = value.slice(0, firstSpaceIndex);
  return value === chapterItemValue(bookId, chapter) ? chapter : undefined;
}

/**
 * Reads the verse number back out of a {@link verseItemValue}, or `undefined` when the value does
 * not identify a verse cell.
 *
 * The part before the colon has to be a chapter cell for the whole value to be a verse cell, so
 * this inherits {@link parseChapterFromItemValue}'s round-trip check.
 */
export function parseVerseFromItemValue(value: string): number | undefined {
  const match = /:(\d+)$/.exec(value);
  if (!match) return undefined;
  const chapterPart = value.slice(0, value.length - match[0].length);
  if (parseChapterFromItemValue(chapterPart) === undefined) return undefined;
  return parseInt(match[1], 10);
}

/**
 * Value for the top-match row's `CommandItem`. It is a fixed sentinel rather than a
 * reference-shaped string so it can never collide with a chapter or verse cell's value, and so
 * parsing it yields neither a chapter nor a verse.
 */
export const TOP_MATCH_ITEM_VALUE = 'top-match';
