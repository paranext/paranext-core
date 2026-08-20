import { Canon } from '@sillsdev/scripture';
import { getSectionForBook, Section } from 'platform-bible-utils';
import { getLocalizedBookId } from '@/components/shared/book.utils';

/**
 * Number of selected books that can be listed individually before the summary collapses into a
 * first … last range
 */
const MAX_BOOKS_LISTED_IN_SUMMARY = 5;

/**
 * Derives the list of available, non-obsolete book IDs from the `availableBookInfo` string
 *
 * @param availableBookInfo Information about available books, formatted as a 123 character long
 *   string as defined in a project's BooksPresent setting. Index N is '1' when the Nth canon book
 *   is available
 * @returns Array of available, non-obsolete book IDs in canon order
 * @throws If `availableBookInfo` length does not match the number of canon books
 */
export function getAvailableBookIds(availableBookInfo: string): string[] {
  if (availableBookInfo.length !== Canon.allBookIds.length) {
    throw new Error('availableBookInfo length must match Canon.allBookIds length');
  }

  return Canon.allBookIds.filter(
    (bookId, index) =>
      availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
  );
}

/**
 * Same as `getAvailableBookIds`, but yields an empty array instead of throwing when
 * `availableBookInfo` is absent or malformed. Use this where the books list only feeds display
 * (e.g. a selection summary) and an unusable setting should degrade rather than break the render —
 * a project setting can legitimately arrive empty before it loads.
 *
 * @param availableBookInfo Information about available books, formatted as a 123 character long
 *   string as defined in a project's BooksPresent setting
 * @returns Array of available, non-obsolete book IDs in canon order, or an empty array if
 *   `availableBookInfo` cannot be interpreted
 */
export function tryGetAvailableBookIds(availableBookInfo: string): string[] {
  try {
    return getAvailableBookIds(availableBookInfo);
  } catch {
    return [];
  }
}

/**
 * Filters an array of book IDs to only include books from a specific section
 *
 * @param bookIds Array of book IDs to filter
 * @param section The section to filter by
 * @returns Array of book IDs that belong to the specified section
 */
export function getBooksForSection(bookIds: string[], section: Section) {
  return bookIds.filter((bookId) => {
    try {
      return getSectionForBook(bookId) === section;
    } catch {
      return false;
    }
  });
}

/**
 * Checks if all books in a given section are included in the selectedBookIds array
 *
 * @param bookIds Array of all available book IDs
 * @param section The section to check
 * @param selectedBookIds Array of currently selected book IDs
 * @returns True if all books from the specified section are selected, false otherwise
 */
export const isSectionFullySelected = (
  bookIds: string[],
  section: Section,
  selectedBookIds: string[],
) => getBooksForSection(bookIds, section).every((bookId) => selectedBookIds.includes(bookId));

/**
 * Builds a short, fixed-width-ish summary of a book selection suitable for a dropdown trigger or a
 * status line. Listing every selected book overflows its container once a handful are selected, so
 * the summary collapses: every available book selected reads as "All books", and more than five
 * selected books collapse into a canon-order `first … last` range.
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order
 * @param availableBookIds Array of book IDs available in the project (see `getAvailableBookIds`).
 *   Pass an empty array when the project's books are unknown; the summary then never claims "All
 *   books" but still lists or truncates the selection
 * @param allBooksText Localized text to show when every available book is selected
 * @param localizedBookNames Optional map of localized book IDs/short names and full names. Key is
 *   the (English) book ID
 * @returns The summary text, or `undefined` when nothing is selected so callers can supply their
 *   own placeholder
 */
export function summarizeSelectedBooks(
  selectedBookIds: string[],
  availableBookIds: string[],
  allBooksText: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string | undefined {
  if (selectedBookIds.length === 0) return undefined;

  // "All books" is about the project's books, not the whole canon — a project with only the NT
  // present says "All books" once every NT book is selected. Checked by containment rather than by
  // length so a stale selection holding an unavailable book can't stand in for a missing one.
  if (
    availableBookIds.length > 0 &&
    availableBookIds.every((bookId) => selectedBookIds.includes(bookId))
  )
    return allBooksText;

  // A `first … last` range only means anything in canon order, and the selection arrives in
  // click order.
  const booksInCanonOrder = [...selectedBookIds].sort(
    (a, b) => Canon.bookIdToNumber(a) - Canon.bookIdToNumber(b),
  );
  const localizeBookId = (bookId: string) => getLocalizedBookId(bookId, localizedBookNames);

  if (booksInCanonOrder.length <= MAX_BOOKS_LISTED_IN_SUMMARY)
    return booksInCanonOrder.map(localizeBookId).join(', ');

  return `${localizeBookId(booksInCanonOrder[0])} … ${localizeBookId(booksInCanonOrder[booksInCanonOrder.length - 1])}`;
}
