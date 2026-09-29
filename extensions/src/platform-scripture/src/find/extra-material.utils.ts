import { Canon } from '@sillsdev/scripture';

/**
 * Whether a book id names extra material (GLO, FRT, INT, XXA, etc.) rather than a book of
 * scripture.
 *
 * The `book` and `chapter` scopes resolve from the current scripture reference rather than from
 * Find's book lists, so excluding extra material from those lists does not reach them. This is what
 * gates those two scopes on the current reference; see `excludeExtraMaterialBooks` in
 * `find-book-lists.utils.ts` for why Find withholds extra material at all.
 *
 * This module deliberately imports nothing but `@sillsdev/scripture`. It is reached from
 * `find.utils.ts`, which the finder data provider — and therefore the extension host entry point —
 * loads, and the host's `require` shim supplies no UI package. `find-book-lists.utils.ts` cannot
 * hold this predicate for that reason: it imports `platform-bible-react`, which emits a bare react
 * require the host rejects. `extension-host-import-boundary.test.ts` guards the rule.
 *
 * `Canon.isExtraMaterial` validates case-insensitively but then matches its non-canonical id list
 * case-sensitively, so it answers `false` for a lowercase id. The reference's book id is
 * upper-cased here rather than trusted, matching what `ScopeSelector` already does with the same
 * field — a gate that fails open is the reopened bug.
 *
 * TODO(PT-4414): Drop this gate along with the rest of the exclusion once extra material can be
 * opened and addressed.
 *
 * @param bookId The book id to test, e.g. from the current scripture reference.
 * @returns `true` when the book is extra material.
 */
export function isExtraMaterialBookId(bookId: string): boolean {
  return Canon.isExtraMaterial(bookId.toUpperCase());
}
