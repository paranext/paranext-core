import { Canon } from '@sillsdev/scripture';

/**
 * Represents the major sections of the Bible and extra materials. Used for grouping and filtering
 * books in the book selector.
 */
export enum Section {
  /** Old Testament books (Genesis through Malachi) */
  OT = 'OT',
  /** New Testament books (Matthew through Revelation) */
  NT = 'NT',
  /** Deuterocanonical books (e.g. Tobit, Judith, 1-2 Maccabees) */
  DC = 'DC',
  /** Additional materials not part of the biblical canon (e.g. XXA, XXB etc.) */
  Extra = 'Extra',
}

/**
 * Gets the full name of a Bible section from its enum value
 *
 * @param section The section enum value
 * @returns The human-readable name of the section
 * @throws Error if the section is not recognized
 */
export const getSectionLongName = (section: Section): string => {
  switch (section) {
    case Section.OT:
      return 'Old Testament';
    case Section.NT:
      return 'New Testament';
    case Section.DC:
      return 'Deuterocanon';
    case Section.Extra:
      return 'Extra Materials';
    default:
      throw new Error(`Unknown section: ${section}`);
  }
};

/**
 * Determines which section a book belongs to based on its ID
 *
 * @param bookId The ID of the book (e.g., 'GEN', 'MAT')
 * @returns The section (OT, NT, DC, or Extra) that the book belongs to
 * @throws Error if the book ID is not recognized or cannot be categorized
 */
export const getSectionForBook = (bookId: string): Section => {
  if (Canon.isBookOT(bookId)) return Section.OT;
  if (Canon.isBookNT(bookId)) return Section.NT;
  if (Canon.isBookDC(bookId)) return Section.DC;
  if (Canon.isExtraMaterial(bookId)) return Section.Extra;

  throw new Error(`Unknown section for book: ${bookId}`);
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
