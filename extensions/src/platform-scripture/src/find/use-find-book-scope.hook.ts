import { useMemo } from 'react';
import { prunePresentBookIds } from './find.utils';

/** Inputs {@link useFindBookScope} needs to resolve the `selectedBooks` scope. */
export type FindBookScopeOptions = {
  /** The user's saved book selection, persisted per web view and shared across every project. */
  savedBookIds: string[];
  /** Writes the saved selection. Only a user edit of the book picker may call this. */
  setSavedBookIds: (bookIds: string[]) => void;
  /**
   * Books the project Find currently points at can actually search, or `undefined` while that list
   * is still unknown.
   */
  availableBookIds: readonly string[] | undefined;
};

/** What the Find panel uses to show and run the `selectedBooks` scope. */
export type FindBookScope = {
  /**
   * The saved selection narrowed to the books the current project has — what the book picker shows
   * checked, what the scope summary describes, and what a search covers.
   */
  searchableBookIds: string[];
  /** Handler for the book picker: replaces the saved selection with what the user chose. */
  selectBookIds: (bookIds: string[]) => void;
};

/**
 * Owns Find's `selectedBooks` book scope: which books are searched and shown for the project Find
 * is pointed at, and how a user edit of the picker reaches the saved selection.
 *
 * Find follows the Simple-mode editor onto any project it opens, including read-only projects and
 * published resources, so the project under the panel changes without the user ever touching the
 * scope. Narrowing the selection is therefore DISPLAY-ONLY and is never written back: the saved
 * list keeps the user's books, so returning to a project that has them finds the scope intact. The
 * finder engine skips absent books gracefully (see `isScriptureNotFoundError` in the finder PDPE),
 * but a search built from the unnarrowed list would silently cover fewer books than the checkbox
 * list shows — hence searching the narrowed list rather than the saved one.
 *
 * "Don't know the books yet" must not read as "the project has no books": `availableBookIds` is
 * `undefined` until the project's book list resolves rather than inferred from an empty list, and
 * the selection then passes through untouched. `useProjectSetting` re-enters loading whenever the
 * project changes and holds the previous project's value meanwhile, so emptiness alone cannot tell
 * an unread list from a project that genuinely has nothing to search — a real case here, because
 * Find withholds extra material.
 *
 * When nothing in the saved selection exists in the current project the result is empty, which
 * `isFindQueryValid` treats as an unrunnable query: the panel says to select a book instead of
 * running a search over a scope the user cannot see.
 *
 * The picker only ever offers books the current project has, so a user edit replaces the saved
 * selection outright — what the picker shows is what gets saved.
 */
export function useFindBookScope({
  savedBookIds,
  setSavedBookIds,
  availableBookIds,
}: FindBookScopeOptions): FindBookScope {
  const searchableBookIds = useMemo(
    // Returns `savedBookIds` itself when nothing needs removing, so consumers keyed on identity
    // (effects, memos, the auto-search triggers) don't see a new array every render.
    () => prunePresentBookIds(availableBookIds, savedBookIds),
    [availableBookIds, savedBookIds],
  );

  // A user pick is saved as-is: what the picker shows is what the project keeps, so unchecking
  // everything still clears the scope.
  return { searchableBookIds, selectBookIds: setSavedBookIds };
}
