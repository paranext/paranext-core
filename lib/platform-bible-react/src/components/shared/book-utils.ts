import { Canon } from '@sillsdev/scripture';
import { Section } from 'platform-bible-utils';

/**
 * Gets the long name of a Bible section from its enum value
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
 * Gets the localized name for a book from the localized book names map, with fallback to English
 * name
 *
 * @param bookId - The book ID to get the localized name for
 * @param localizedBookNames - Optional map of localized book names
 * @returns The localized name, English name, or fallback value
 */
export function getLocalizedBookName(
  bookId: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string {
  const localizedName = localizedBookNames?.get(bookId)?.localizedName;
  return localizedName ?? Canon.bookIdToEnglishName(bookId);
}

/**
 * Gets the localized ID for a book from the localized book names map, with fallback to uppercase
 * book ID
 *
 * @param bookId - The book ID to get the localized ID for
 * @param localizedBookNames - Optional map of localized book names
 * @returns The localized ID, uppercase book ID, or fallback value
 */
export function getLocalizedBookId(
  bookId: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
): string {
  const localizedId = localizedBookNames?.get(bookId)?.localizedId;
  return localizedId ?? bookId.toUpperCase();
}

/** Book IDs for all books that are not considered obsolete in the SIL Canon library */
export const ALL_BOOK_IDS = Canon.allBookIds.filter(
  (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
);

/** English names for all books that are not considered obsolete in the SIL Canon library */
export const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)]),
);
