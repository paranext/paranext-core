import type { ScrollGroupScrRef } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';

/**
 * Float size used when Manage Books is launched with the `createMissingBook` intent. 440px is just
 * under the dialog's 448px collapse breakpoint (see `useIsNarrow` in
 * `manage-books-dialog.component.tsx`), so the sidebar renders as its icon rail — the focused
 * "create this one book" presentation PT-4111 asks for. The dock layer clamps this to a fraction of
 * the workspace on small windows, so it is safe to request unconditionally.
 */
export const MANAGE_BOOKS_CREATE_INTENT_FLOAT_SIZE = Object.freeze({ width: 440, height: 720 });

/**
 * Resolve the book to pre-select when Manage Books is launched from an editor showing a book that
 * is missing from the project.
 *
 * `ScrollGroupScrRef` is `ScrollGroupId | SerializedVerseRef`: a literal reference carries the book
 * already, while a scroll-group id needs a lookup in the project's versification.
 *
 * Returns `undefined` — never throws — when there is nothing to pre-select. Callers should open the
 * dialog anyway; losing the preselection is a far better outcome than failing to open.
 *
 * @param scrollGroupScrRef The calling web view's `scrollGroupScrRef`, or undefined if it has none.
 * @param projectId Project whose versification the reference should be resolved in.
 * @param getScrRefForProject Injected `papi.scrollGroups.getScrRefForProject` (injected so this is
 *   testable without the PAPI surface).
 * @returns The book id (e.g. `'GEN'`), or undefined if it cannot be determined.
 */
export async function resolveMissingBookId(
  scrollGroupScrRef: ScrollGroupScrRef | undefined,
  projectId: string,
  getScrRefForProject: (
    scrollGroupId: number | undefined,
    projectId: string,
  ) => Promise<SerializedVerseRef>,
): Promise<string | undefined> {
  if (scrollGroupScrRef === undefined) return undefined;

  if (typeof scrollGroupScrRef === 'number') {
    try {
      const scrRef = await getScrRefForProject(scrollGroupScrRef, projectId);
      return scrRef.book || undefined;
    } catch {
      return undefined;
    }
  }

  return scrollGroupScrRef.book || undefined;
}
