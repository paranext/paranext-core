import { Canon } from '@sillsdev/scripture';

/**
 * Canonical book id arrays grouped by canon (OT / NT / DC). Useful for grouping or filtering UI
 * surfaces (e.g. a book grid that needs to render an OT/NT/DC heading).
 */

const allBookIds: string[] = (() => {
  const ids: string[] = [];
  for (let n = 1; n <= 88; n += 1) {
    const id = Canon.bookNumberToId(n, '');
    if (id) ids.push(id);
  }
  return ids;
})();

const isBookNumber = (bookId: string, min: number, max: number) => {
  const n = Canon.bookIdToNumber(bookId);
  return n >= min && n <= max;
};

/** Canonical Old Testament book ids (1–39). */
export const OT_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 1, 39));
/** Canonical New Testament book ids (40–66). */
export const NT_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 40, 66));
/** Deuterocanonical book ids (67+). */
export const DC_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 67, 88));
