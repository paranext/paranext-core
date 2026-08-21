import { Canon } from '@sillsdev/scripture';
import { getSectionForBook, Section } from 'platform-bible-utils';
import { getLocalizedBookId } from '@/components/shared/book.utils';

/**
 * Largest selection the summary still lists book by book. Past this many books it collapses to a
 * `first … last` range instead.
 *
 * Intentionally mirrors `VISIBLE_BADGES_COUNT` in `select-books.component.tsx` (and sits just below
 * `MAX_VISIBLE_BADGES` there) so the collapsed summary and the selection badges agree about how
 * many books are worth showing. Kept as separate constants rather than one shared value because the
 * two surfaces are free to diverge; if you change one, decide deliberately about the other. (A
 * previous review flagged silent drift between these numbers.)
 */
const MAX_BOOKS_LISTED_IN_SUMMARY = 5;

/**
 * Derives the list of available, non-obsolete book IDs from the `availableBookInfo` string
 *
 * Yields an empty array rather than throwing when `availableBookInfo` cannot be interpreted. Every
 * caller reads this to render something, and the string arrives from the `BooksPresent` project
 * setting, which is the empty default until that setting resolves (and stays empty if the read
 * errors). A throw here happens during render, and with no error boundary above these components
 * that tears down the whole web view — so an unusable setting degrades to "no books known" instead.
 * (PT-4092)
 *
 * @param availableBookInfo Information about available books, formatted as a 123 character long
 *   string as defined in a project's BooksPresent setting. Index N is '1' when the Nth canon book
 *   is available
 * @returns Array of available, non-obsolete book IDs in canon order, or an empty array if
 *   `availableBookInfo` cannot be interpreted
 */
export function getAvailableBookIds(availableBookInfo: string): string[] {
  if (availableBookInfo.length !== Canon.allBookIds.length) return [];

  return Canon.allBookIds.filter(
    (bookId, index) =>
      availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
  );
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
 * Puts a book selection into canon order and localizes each ID. The selection arrives in click
 * order, which carries no meaning for a reader, and every display form of it (the collapsed summary
 * and the full tooltip list) reads as canon order, so both share this step.
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order
 * @param localizedBookNames Optional map of localized book IDs/short names and full names. Key is
 *   the (English) book ID
 * @returns Array of localized book IDs in canon order
 */
function localizeBookIdsInCanonOrder(
  selectedBookIds: string[],
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string[] {
  return [...selectedBookIds]
    .sort((a, b) => Canon.bookIdToNumber(a) - Canon.bookIdToNumber(b))
    .map((bookId) => getLocalizedBookId(bookId, localizedBookNames));
}

/**
 * Builds a short, fixed-width-ish summary of a book selection suitable for a dropdown trigger or a
 * status line. Listing every selected book overflows its container once a handful are selected, so
 * the summary collapses: every available book selected reads as "All books", and a longer selection
 * reads as a canon-order range from its first book to its last (e.g. `GEN … HOS`). This matches how
 * Paratext 9 summarizes a book set.
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order
 * @param availableBookIds Array of book IDs available in the project (see `getAvailableBookIds`).
 *   Pass an empty array when the project's books are unknown; the summary then never claims "All
 *   books" but still lists or collapses the selection
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

  const booksInCanonOrder = localizeBookIdsInCanonOrder(selectedBookIds, localizedBookNames);

  // A short selection is worth spelling out; past the threshold only the canon-order endpoints fit.
  if (booksInCanonOrder.length <= MAX_BOOKS_LISTED_IN_SUMMARY) return booksInCanonOrder.join(', ');

  return `${booksInCanonOrder[0]} … ${booksInCanonOrder[booksInCanonOrder.length - 1]}`;
}

/**
 * Lists a book selection in full — every selected book, in canon order, localized and
 * comma-separated. This is the details surface behind `summarizeSelectedBooks`: that summary
 * collapses "All books" and reduces a longer selection to a `first … last` range, which drops every
 * book in between, so the full selection needs somewhere else to be readable (a tooltip on the
 * trigger that shows it).
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order
 * @param localizedBookNames Optional map of localized book IDs/short names and full names. Key is
 *   the (English) book ID
 * @returns The comma-separated list of localized book IDs in canon order, or `undefined` when
 *   nothing is selected so callers can skip rendering the details surface entirely
 */
export function formatSelectedBooksList(
  selectedBookIds: string[],
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string | undefined {
  if (selectedBookIds.length === 0) return undefined;

  return localizeBookIdsInCanonOrder(selectedBookIds, localizedBookNames).join(', ');
}
