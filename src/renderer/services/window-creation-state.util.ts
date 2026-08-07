/**
 * Keeping the app-global state main put on this window's URL as fresh as this window's caches.
 *
 * Main builds each window's URL with the state that window's caches need on their FIRST render —
 * `SCROLL_GROUP_STATE_QUERY_PARAMETER`, `THEME_STATE_QUERY_PARAMETER`, alongside `WINDOW_ID` (see
 * `createWindow` in `main.ts`). A RELOAD replays that URL, so a window that only ever read it would
 * seed from state as old as the window itself: the toolbar and every scroll-group-following web
 * view would come up on the reference the window opened on, and the document would paint the theme
 * it opened with and then flash into the current one a round trip later. By then this window's own
 * pre-host store has been handed over and deleted, so the URL is the only thing a reloaded document
 * has to seed from.
 *
 * `history.replaceState` rewrites the query in place — same document, no navigation, no reload — so
 * the URL a reload replays carries what this window last heard instead.
 */

import { logger } from '@shared/services/logger.service';
import { getErrorMessage, serialize } from 'platform-bible-utils';

/**
 * Record the state this window now holds under the query parameter main created it with, so a
 * reload of this document seeds from it rather than from the state the window was created with.
 *
 * Call from wherever the cache is updated — by the host's events, and by a locally predicted write.
 *
 * Written straight through rather than coalesced the way the host's store is: this is a
 * same-document history entry, not an fsync, and not on the event loop the whole app's JSON-RPC
 * traffic shares. It is skipped when the query already says this, which is what keeps a predicted
 * write and the host's echo of it from writing twice, and a run of changes that really are
 * different (dragging a colour picker through a user theme) costs one serialize and one
 * `replaceState` per change in each window — the same order as re-rendering the change itself.
 *
 * @param parameterName Query parameter main passes this state on, e.g.
 *   `SCROLL_GROUP_STATE_QUERY_PARAMETER`
 * @param state State to serialize into that parameter
 * @experimental
 */
export function refreshWindowCreationState(parameterName: string, state: unknown): void {
  try {
    const searchParams = new URLSearchParams(globalThis.location?.search ?? '');
    const serialized = serialize(state);
    if (searchParams.get(parameterName) === serialized) return;
    searchParams.set(parameterName, serialized);
    // Only the query is replaced, and every parameter that was already there is carried over: the
    // window id, the log level, and the dev-mode flags travel on this same URL and a reload has to
    // find them too.
    globalThis.history?.replaceState({}, '', `?${searchParams}`);
  } catch (e) {
    // Costs a reload its first frame, nothing else: the state in memory is unaffected and the
    // host's next event corrects a reloaded window a round trip later.
    logger.warn(
      `Could not record this window's state on its URL for a reload. ${getErrorMessage(e)}`,
    );
  }
}
