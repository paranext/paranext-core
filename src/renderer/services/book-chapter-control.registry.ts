import { BookChapterControlHandle } from 'platform-bible-react';
import { Unsubscriber } from 'platform-bible-utils';

/** Owner id under which the top toolbar registers its BookChapterControl */
export const TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID = 'top-toolbar';

const handlesByOwnerId = new Map<string, BookChapterControlHandle>();

/**
 * Registers a mounted BookChapterControl's imperative handle so commands (e.g.
 * `platform.openBookChapterControl` on Ctrl+B) can open it.
 *
 * @param ownerId The web view id owning the control, or
 *   {@link TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID} for the top toolbar
 * @param handle The control's imperative handle
 * @returns Unsubscriber that removes the registration
 */
export function registerBookChapterControlHandle(
  ownerId: string,
  handle: BookChapterControlHandle,
): Unsubscriber {
  handlesByOwnerId.set(ownerId, handle);
  return () => {
    // Only remove the registration if it is still this handle — a stale unsubscriber must not
    // remove a newer registration under the same owner id
    if (handlesByOwnerId.get(ownerId) !== handle) return false;
    return handlesByOwnerId.delete(ownerId);
  };
}

/** Gets the registered BookChapterControl handle for an owner, if any is mounted */
export function getBookChapterControlHandle(ownerId: string): BookChapterControlHandle | undefined {
  return handlesByOwnerId.get(ownerId);
}
