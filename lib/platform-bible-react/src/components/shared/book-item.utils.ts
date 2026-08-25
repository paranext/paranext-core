import {
  ALL_ENGLISH_BOOK_NAMES,
  getLocalizedBookId,
  getLocalizedBookName,
} from '@/components/shared/book.utils';

export function generateCommandValue(
  bookId: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
  chapter?: number,
): string {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${localizedBookNames ? ` ${getLocalizedBookId(bookId, localizedBookNames)} ${getLocalizedBookName(bookId, localizedBookNames)}` : ''}${chapter ? ` ${chapter}` : ''}`;
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
 */
export function parseChapterFromItemValue(value: string): number | undefined {
  if (value.includes(':')) return undefined;
  const match = /(\d+)$/.exec(value);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Reads the verse number back out of a {@link verseItemValue}, or `undefined` when the value does
 * not identify a verse cell.
 */
export function parseVerseFromItemValue(value: string): number | undefined {
  const match = /:(\d+)$/.exec(value);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Value for the top-match row's `CommandItem`. It is a fixed sentinel rather than a
 * reference-shaped string so it can never collide with a chapter or verse cell's value, and so
 * parsing it yields neither a chapter nor a verse.
 */
export const TOP_MATCH_ITEM_VALUE = 'top-match';
