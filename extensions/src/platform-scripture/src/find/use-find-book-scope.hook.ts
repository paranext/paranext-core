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
 * Resolves Find's `selectedBooks` scope: the saved selection narrowed to the books the current
 * project has.
 *
 * The narrowing is DISPLAY-ONLY and never written back, because Find follows the Simple-mode editor
 * onto whatever project it opens — the saved list keeps the user's books, so returning to a project
 * that has them finds the scope intact. Searching the narrowed list keeps the search and the
 * checkbox list in agreement.
 *
 * That holds only while the picker is untouched. A picker edit — including Select all and Clear all
 * — commits the visible set, so books hidden because the current project lacks them are dropped
 * from the saved list. That is deliberate: those actions act on the whole scope, so Clear all
 * really clears it.
 *
 * `availableBookIds` is `undefined` — not `[]` — while the project's book list is still loading, so
 * "don't know yet" cannot be read as "this project has no books". An empty result is an unrunnable
 * query per `isFindQueryValid`, which is what the panel should say.
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

  return { searchableBookIds, selectBookIds: setSavedBookIds };
}
