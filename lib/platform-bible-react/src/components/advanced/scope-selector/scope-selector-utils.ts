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
 * Gets the localized full name of a Bible section from its enum value
 *
 * @param section - The section enum value to get the name for
 * @param otLongName - Optional localized name for Old Testament section
 * @param ntLongName - Optional localized name for New Testament section
 * @param dcLongName - Optional localized name for Deuterocanonical section
 * @param extraLongName - Optional localized name for Extra Materials section
 * @returns {string} The human-readable localized name of the section. Defaults to English names
 * @throws {Error} When the section enum value is not recognized
 */
export const getSectionLongName = (
  section: Section,
  otLongName?: string,
  ntLongName?: string,
  dcLongName?: string,
  extraLongName?: string,
): string => {
  switch (section) {
    case Section.OT:
      return otLongName ?? 'Old Testament';
    case Section.NT:
      return ntLongName ?? 'New Testament';
    case Section.DC:
      return dcLongName ?? 'Deuterocanon';
    case Section.Extra:
      return extraLongName ?? 'Extra Materials';
    default:
      throw new Error(`Unknown section: ${section}`);
  }
};

/**
 * Gets the short name of a Bible section from its enum value
 *
 * @param section - The section enum value to get the short name for
 * @param otShortName - Optional localized short name for Old Testament section
 * @param ntShortName - Optional localized short name for New Testament section
 * @param dcShortName - Optional localized short name for Deuterocanonical section
 * @param extraShortName - Optional localized short name for Extra Materials section
 * @returns {string} The short name of the section. Defaults to English
 * @throws {Error} When the section enum value is not recognized
 */
export const getSectionShortName = (
  section: Section,
  otShortName?: string,
  ntShortName?: string,
  dcShortName?: string,
  extraShortName?: string,
): string => {
  switch (section) {
    case Section.OT:
      return otShortName ?? 'OT';
    case Section.NT:
      return ntShortName ?? 'NT';
    case Section.DC:
      return dcShortName ?? 'DC';
    case Section.Extra:
      return extraShortName ?? 'Extra';
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
