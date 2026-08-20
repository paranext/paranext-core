import type { ScrollGroupScrRef } from '@papi/core';
import { Canon } from '@sillsdev/scripture';
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
 * Highest book number the Manage Books dialog puts in its grid (`DEFAULT_BOOK_IDS` in
 * `manage-books-dialog.component.tsx` walks 1..102). A book above this is not in the dialog's
 * universe, so preselecting it would tick a book with no pill: nothing visible selected, Apply
 * disabled with no stated cause, and a scroll that finds no target.
 */
const MAX_MANAGE_BOOKS_BOOK_NUMBER = 102;

/**
 * How long to wait for a scroll-group reference before giving up on the preselection.
 *
 * `papi.scrollGroups` resolves through `waitForNetworkObject(..., 30000)`, so during the re-arm
 * window that service documents this lookup can hang for half a minute. The preselection is a
 * best-effort nicety and the dialog must not wait on it (see the note about opening first in
 * {@link resolveMissingBookId}), so the wait is bounded well below any duration a user would read as
 * "the button is broken".
 */
const SCROLL_GROUP_LOOKUP_TIMEOUT_MS = 1500;

/**
 * Resolve the book to pre-select when Manage Books is launched from an editor showing a book that
 * is missing from the project.
 *
 * `ScrollGroupScrRef` is `ScrollGroupId | SerializedVerseRef`: a literal reference carries the book
 * already, while a scroll-group id needs a lookup in the project's versification. `undefined` means
 * scroll group 0, matching the platform's own default (`useScrollGroupScrRef` does
 * `scrollGroupScrRef ?? 0`) — this matters because the scripture editor's provider only guarantees
 * a value in Simple mode (`interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef`) while
 * the Manage books button that calls this is Power-only, so `undefined` is the ordinary case here
 * rather than an exceptional one.
 *
 * Returns `undefined` — never throws, and never waits longer than
 * {@link SCROLL_GROUP_LOOKUP_TIMEOUT_MS} — when there is nothing to pre-select. Callers should open
 * the dialog anyway; losing the preselection is a far better outcome than failing to open. Do not
 * serialize the dialog's `openWebView` behind this call for the same reason.
 *
 * @param scrollGroupScrRef The calling web view's `scrollGroupScrRef`, or undefined for group 0.
 * @param projectId Project whose versification the reference should be resolved in.
 * @param getScrRefForProject Injected `papi.scrollGroups.getScrRefForProject` (injected so this is
 *   testable without the PAPI surface).
 * @returns The book id (e.g. `'GEN'`), or undefined if it cannot be determined or the book falls
 *   outside the Manage Books grid's canon range.
 */
export async function resolveMissingBookId(
  scrollGroupScrRef: ScrollGroupScrRef | undefined,
  projectId: string,
  getScrRefForProject: (
    scrollGroupId: number | undefined,
    projectId: string,
  ) => Promise<SerializedVerseRef>,
): Promise<string | undefined> {
  const resolved = scrollGroupScrRef ?? 0;

  let book: string | undefined;
  if (typeof resolved === 'number') {
    try {
      const scrRef = await Promise.race([
        getScrRefForProject(resolved, projectId),
        new Promise<undefined>((resolve) => {
          setTimeout(resolve, SCROLL_GROUP_LOOKUP_TIMEOUT_MS);
        }),
      ]);
      book = scrRef?.book || undefined;
    } catch {
      return undefined;
    }
  } else {
    book = resolved.book || undefined;
  }

  if (!book) return undefined;

  // Range-check against the dialog's grid rather than trusting any book id the reference carries.
  // 3ES / EZA / 5EZ and friends sit above the grid's range, and preselecting one is worse than not
  // preselecting at all: the footer counts a selection the user cannot see or clear.
  const bookNumber = Canon.bookIdToNumber(book);
  if (bookNumber <= 0 || bookNumber > MAX_MANAGE_BOOKS_BOOK_NUMBER) return undefined;

  return book;
}
