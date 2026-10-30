// Unstable API surface for platform-bible-utils.
//
// Everything exported here is importable from `platform-bible-utils/experimental`
// but carries NO stability guarantee — symbols may change shape, move, or
// disappear at any time without a deprecation cycle. Extensions may use
// it, but should accept the maintenance burden of breaking changes.
//
// Stable exports live in `./index.ts`. The two entry points are maintained
// as separate, independent API surfaces with different support levels.

export {
  ALL_BOOK_IDS,
  BOOKS_PRESENT_DEFAULT,
  DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  getBookIdsFromBooksPresent,
} from './scripture/scripture-util';
export {
  findAdjacentPresentBook,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  type ScriptureBounds,
} from './scripture/scripture-navigation.util';
export { resolveReferenceHistoryDirection } from './reference-history-direction.util';
// `PaletteItem` is deliberately NOT here: the renderer's `CommandPaletteItem` (a stable
// `@papi/core` type) extends it, and a stable type must not inherit from the no-guarantees tier.
// It is exported from `index.ts` instead. `PaletteDriver` has no such stable dependent.
export type {
  ForwardedPaletteKeyEvent,
  PaletteDriver,
  PaletteKeyForwarding,
} from './palette.types';
export {
  isNavigableProjectIds,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
} from './navigable-project-ids';
export {
  IDLE_SYNC_ACTIVITY,
  isSyncActivitySnapshot,
  shouldRecheckSyncActivity,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  toSyncActivity,
  type SyncActivity,
  type SyncActivityValue,
} from './sync-activity.util';
export {
  IDLE_SYNC_QUEUE,
  isSyncQueueSnapshot,
  SYNC_REQUEST_REMOVED_MARKER,
  toSyncQueue,
  type SyncQueue,
  type SyncQueueValue,
} from './sync-queue.util';
