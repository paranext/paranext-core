import { Canon } from '@sillsdev/scripture';
import { getSectionForBook, Section } from 'platform-bible-utils';
import { getBookIdsFromBooksPresent } from 'platform-bible-utils/experimental';
import { getLocalizedBookId } from '@/components/shared/book.utils';

/**
 * Largest selection the summary still lists book by book. Past this many books it collapses to a
 * `first - last` range instead.
 *
 * Deliberately separate from `VISIBLE_BADGES_COUNT` in `select-books.component.tsx`: the two
 * surfaces share only the integer. This summary is canon-ordered short IDs collapsing to a range;
 * the badges are click-ordered full names collapsing to a `+N more` count. They are free to
 * diverge, so changing one says nothing about the other.
 */
const MAX_BOOKS_LISTED_IN_SUMMARY = 5;

/**
 * Derives the list of available, non-obsolete book IDs from the `availableBookInfo` string
 *
 * Yields an empty array rather than throwing when `availableBookInfo` holds no flags. Every caller
 * reads this to render something, and the string arrives from the `BooksPresent` project setting,
 * which is the empty default until that setting resolves (and stays empty if the read errors). A
 * throw here happens during render, and with no error boundary above these components that tears
 * down the whole web view — so an unusable setting degrades to "no books known" instead.
 *
 * @example
 *
 * ```ts
 * // A project holding only Genesis and Exodus
 * getAvailableBookIds('11' + '0'.repeat(121)); // ['GEN', 'EXO']
 * ```
 *
 * @param availableBookInfo Information about available books, formatted as defined in a project's
 *   BooksPresent setting. Index N is '1' when the Nth canon book is available
 * @returns Array of available, non-obsolete book IDs in canon order
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function getAvailableBookIds(availableBookInfo: string): string[] {
  return getBookIdsFromBooksPresent(availableBookInfo).filter(
    (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
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
 * order, which carries no meaning for a reader, so the display form imposes canon order.
 *
 * IDs are upper-cased before use: the codebase does not guarantee case (`handleScopeChange` seeds
 * the current reference's book raw), while `localizedBookNames` is keyed by the canonical
 * upper-case ID. IDs `Canon` does not recognize are dropped rather than rendered, because
 * `Canon.bookIdToNumber` returns 0 for them, which would sort a stale ID ahead of Genesis and make
 * it the range's left endpoint. Duplicates are collapsed for the same reason.
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order and any case
 * @param localizedBookNames Optional map of localized book IDs/short names and full names. Key is
 *   the (English) book ID
 * @returns Array of localized book IDs in canon order
 */
function localizeBookIdsInCanonOrder(
  selectedBookIds: string[],
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string[] {
  const canonicalBookIds = [
    ...new Set(selectedBookIds.map((bookId) => bookId.toUpperCase())),
  ].filter((bookId) => Canon.bookIdToNumber(bookId) > 0);

  return canonicalBookIds
    .sort((a, b) => Canon.bookIdToNumber(a) - Canon.bookIdToNumber(b))
    .map((bookId) => getLocalizedBookId(bookId, localizedBookNames));
}

/**
 * Builds a short, fixed-width-ish summary of a book selection suitable for a dropdown trigger or a
 * status line. Listing every selected book overflows its container once a handful are selected, so
 * the summary collapses: every available book selected reads as "All books", and a longer selection
 * reads as a canon-order range from its first book to its last (e.g. `GEN - HOS`). This matches how
 * Paratext 9 summarizes a book set.
 *
 * @example
 *
 * ```ts
 * summarizeSelectedBooks(['GEN', 'EXO'], allBookIds, 'All books'); // 'GEN, EXO'
 * summarizeSelectedBooks(allBookIds, allBookIds, 'All books'); // 'All books'
 * summarizeSelectedBooks(sevenBookIds, allBookIds, 'All books'); // 'GEN - HOS'
 * ```
 *
 * @param selectedBookIds Array of currently selected book IDs, in any order and any case
 * @param availableBookIds Array of book IDs available in the project (see `getAvailableBookIds`).
 *   Pass an empty array when the project's books are unknown; the summary then never claims "All
 *   books" but still lists or collapses the selection
 * @param allBooksText Localized text to show when every available book is selected
 * @param localizedBookNames Optional map of localized book IDs/short names and full names. Key is
 *   the (English) book ID
 * @returns The summary text, or `undefined` when nothing is selected so callers can supply their
 *   own placeholder
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function summarizeSelectedBooks(
  selectedBookIds: string[],
  availableBookIds: string[],
  allBooksText: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string | undefined {
  if (selectedBookIds.length === 0) return undefined;

  // "All books" is about the project's books, not the whole canon — a project with only the NT
  // present says "All books" once every NT book is selected. Matched as set equality (not
  // containment) in both directions, so neither a selection missing an available book nor one
  // carrying an extra book the project does not have can claim to be every book.
  const selectedSet = new Set(selectedBookIds.map((bookId) => bookId.toUpperCase()));
  const availableSet = new Set(availableBookIds.map((bookId) => bookId.toUpperCase()));
  if (
    availableSet.size > 0 &&
    availableSet.size === selectedSet.size &&
    [...availableSet].every((bookId) => selectedSet.has(bookId))
  )
    return allBooksText;

  const booksInCanonOrder = localizeBookIdsInCanonOrder(selectedBookIds, localizedBookNames);
  if (booksInCanonOrder.length === 0) return undefined;

  // A short selection is worth spelling out; past the threshold only the canon-order endpoints fit.
  if (booksInCanonOrder.length <= MAX_BOOKS_LISTED_IN_SUMMARY) return booksInCanonOrder.join(', ');

  // ` - ` rather than an ellipsis to match `formatScrRefRange`'s range separator, and to leave `…`
  // for its Guidelines/Ellipses meaning of "opens a dialog".
  return `${booksInCanonOrder[0]} - ${booksInCanonOrder[booksInCanonOrder.length - 1]}`;
}
