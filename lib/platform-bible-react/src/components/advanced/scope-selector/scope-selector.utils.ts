import { Canon } from '@sillsdev/scripture';
import { getSectionForBook, Section } from 'platform-bible-utils';

/**
 * Derives the list of available, non-obsolete book IDs from the `availableBookInfo` string
 *
 * @param availableBookInfo Information about available books, formatted as a 123 character long
 *   string as defined in a project's BooksPresent setting. Index N is '1' when the Nth canon book
 *   is available
 * @returns Array of available, non-obsolete book IDs in canon order
 * @throws If `availableBookInfo` length does not match the number of canon books
 */
export const getAvailableBookIds = (availableBookInfo: string): string[] => {
  if (availableBookInfo.length !== Canon.allBookIds.length) {
    throw new Error('availableBookInfo length must match Canon.allBookIds length');
  }

  return Canon.allBookIds.filter(
    (bookId, index) =>
      availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
  );
};

/**
 * Filters an array of book IDs to only include books from a specific section
 *
 * @param bookIds Array of book IDs to filter
 * @param section The section to filter by
 * @returns Array of book IDs that belong to the specified section
 */
export const getBooksForSection = (bookIds: string[], section: Section) => {
  return bookIds.filter((bookId) => {
    try {
      return getSectionForBook(bookId) === section;
    } catch {
      return false;
    }
  });
};

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
