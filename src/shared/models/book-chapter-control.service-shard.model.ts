/**
 * How the main process's BookChapterControl service router addresses one window's shard.
 *
 * Which BookChapterControl to open is decided from the focused tab and the tracked last-selected
 * web view, both of which are renderer state, so the whole preference chain stays in the window and
 * the router calls one method.
 *
 * These live here rather than on a public service model because how the platform's own windows find
 * each other is not public PAPI. See `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

/**
 * Base name a window's BookChapterControl service shard registers its network object under,
 * suffixed with the window id (e.g. `BookChapterControlService-1`).
 *
 * Nothing claims this name unsuffixed: the router publishes the `platform.openBookChapterControl`
 * command consumers call, not a network object.
 *
 * @experimental
 */
export const BOOK_CHAPTER_CONTROL_SERVICE_SHARD_NETWORK_OBJECT_NAME = 'BookChapterControlService';

/**
 * What one window's BookChapterControl service shard serves.
 *
 * @experimental
 */
export interface IBookChapterControlServiceShard {
  /**
   * Open the appropriate BookChapterControl in this window and focus its input, ready for typing a
   * reference. Resolves without doing anything when this window has none mounted.
   *
   * @experimental
   */
  open(): Promise<void>;
}
