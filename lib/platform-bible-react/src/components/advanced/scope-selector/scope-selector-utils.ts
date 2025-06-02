import { Canon } from '@sillsdev/scripture';

export enum Section {
  OT = 'OT',
  NT = 'NT',
  DC = 'DC',
  Extra = 'Extra',
}

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

export const getSectionForBook = (bookId: string): Section => {
  if (Canon.isBookOT(bookId)) return Section.OT;
  if (Canon.isBookNT(bookId)) return Section.NT;
  if (Canon.isBookDC(bookId)) return Section.DC;
  if (Canon.isExtraMaterial(bookId)) return Section.Extra;

  throw new Error(`Unknown section for book: ${bookId}`);
};

export const getBooksForSection = (bookIds: string[], section: Section) => {
  return bookIds.filter((bookId) => {
    try {
      return getSectionForBook(bookId) === section;
    } catch {
      return false;
    }
  });
};

export const isSectionFullySelected = (
  bookIds: string[],
  section: Section,
  selectedBookIds: string[],
) => getBooksForSection(bookIds, section).every((bookId) => selectedBookIds.includes(bookId));
