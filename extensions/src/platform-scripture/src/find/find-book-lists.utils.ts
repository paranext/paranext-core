import { Canon } from '@sillsdev/scripture';
import { getAvailableBookIds } from 'platform-bible-react/experimental';
import { BOOKS_PRESENT_DEFAULT } from 'platform-bible-utils/experimental';

/**
 * Book numbers the canon classifies as extra material (GLO, FRT, INT, XXA, etc.). Precomputed
 * because the set is fixed for a given canon.
 */
const EXTRA_MATERIAL_BOOK_NUMBERS: ReadonlySet<number> = new Set(
  Canon.nonCanonicalIds.map((bookId) => Canon.bookIdToNumber(bookId)),
);

/**
 * Clears the extra material (GLO, FRT, INT, XXA, etc.) from a `platformScripture.booksPresent` flag
 * string so Find never offers those books.
 *
 * Find resolves a result's location by walking the `\c` and `\v` markers of the book it matched in.
 * Extra material is organized by paragraph markers rather than verses, so every match in one
 * resolves to the same reference, and there is no way to open such a book to act on the result
 * anyway. Excluding them keeps Find honest until the platform can open and address them.
 *
 * Flags are cleared in place rather than removed: the flag string must keep its canonical length,
 * since consumers index into it by book number and reject a length that does not match the canon.
 *
 * This narrows what Find _searches_ and what its book picker _offers_. It does not reach the
 * `book`/`chapter` scopes, which resolve from the current scripture reference rather than from this
 * flag string; PT-4415 covers gating those.
 *
 * TODO(PT-4414): Drop this exclusion once extra material can be opened and addressed.
 *
 * @param booksPresent The `platformScripture.booksPresent` project setting value.
 * @returns The same flag string with every extra-material book flagged absent.
 */
export function excludeExtraMaterialBooks(booksPresent: string): string {
  return Array.from(booksPresent, (flag, index) =>
    EXTRA_MATERIAL_BOOK_NUMBERS.has(index + 1) ? '0' : flag,
  ).join('');
}

/** The book lists Find derives from a project's `platformScripture.booksPresent` setting. */
export type FindBookLists = {
  /**
   * `booksPresent` flags with extra material cleared. What the search runs over and what the scope
   * selector builds its book picker from.
   */
  searchableBooksPresent: string;
  /**
   * Ids of the books the search covers and the book picker offers, or `undefined` while the
   * project's book list is not yet known.
   */
  availableBookIds: string[] | undefined;
  /**
   * Ids of every book the project has, extra material included. Used only to localize book names,
   * so a scope label reading from the current reference still has a name for a book the search
   * itself excludes.
   */
  localizableBookIds: string[];
};

/**
 * Derives every book list Find needs from a project's `platformScripture.booksPresent` setting.
 *
 * All of Find's book-list policy lives here rather than in the web view — including the decision
 * about what an unknown book list means — so the exclusion is covered by tests instead of resting
 * on a hook body.
 *
 * Pass `undefined` when the project's book list is not known: while the setting is still resolving,
 * or after the read failed. `availableBookIds` then comes back `undefined` rather than empty, which
 * is what keeps a persisted book selection from being pruned away against a list nobody has read
 * yet. An EMPTY array is a real answer — a project with no searchable books — and is reported as
 * such, which is a genuine case here because extra material is excluded.
 *
 * TODO(PT-4414): The `availableBookIds`/`localizableBookIds` split exists only to compensate for
 * excluding extra material; collapse it back into one list when that exclusion goes away.
 *
 * @param booksPresent The `platformScripture.booksPresent` project setting value, or `undefined`
 *   when the project's book list is not yet known.
 * @returns The searchable flag string and the book ids derived from it.
 */
export function deriveFindBookLists(booksPresent: string | undefined): FindBookLists {
  if (booksPresent === undefined) {
    // The same all-absent default `useProjectSetting` holds until the read resolves, so the scope
    // selector sees no books; `undefined` book ids are what tell the prune the list is not known
    // yet, as opposed to known-and-empty.
    return {
      searchableBooksPresent: BOOKS_PRESENT_DEFAULT,
      availableBookIds: undefined,
      localizableBookIds: [],
    };
  }
  const searchableBooksPresent = excludeExtraMaterialBooks(booksPresent);
  return {
    searchableBooksPresent,
    availableBookIds: getAvailableBookIds(searchableBooksPresent),
    localizableBookIds: getAvailableBookIds(booksPresent),
  };
}

/**
 * The book lists to use while the project's `platformScripture.booksPresent` setting is unknown.
 *
 * A module constant rather than a fresh derivation per render: the empty lists are handed to
 * effects and to `useLocalizedStrings`, and a new array identity on every render of the unknown
 * state would churn their dependencies.
 */
export const UNKNOWN_FIND_BOOK_LISTS: FindBookLists = deriveFindBookLists(undefined);
