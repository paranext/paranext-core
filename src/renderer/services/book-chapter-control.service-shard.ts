/**
 * BookChapterControl service shard — opening a reference picker in THIS window. Registered as a
 * network object under a window-scoped name (e.g. "BookChapterControlService-1") so several windows
 * can coexist; the main process's `book-chapter-control.service-router.ts` publishes the
 * `platform.openBookChapterControl` command and forwards it to the window the user is working in.
 *
 * The preference chain below reads this window's focus and its tracked last-selected web view, so
 * it stays here rather than in the router: the main process knows which window to ask, not which
 * control inside it to open.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import {
  getBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';
import { getLastSelectedScriptureNavigableWebViewId } from '@renderer/services/window.service-shard';
import {
  BOOK_CHAPTER_CONTROL_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IBookChapterControlServiceShard,
} from '@shared/models/book-chapter-control.service-shard.model';
import {
  BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE,
  getServiceShardAttributes,
} from '@shared/models/service-shard.model';
import { WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { windowService } from '@shared/services/window.service';
import { getWebViewIdFromFocusSubject } from '@shared/services/window.service-model';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Gets the web view id of the currently focused subject, if focus is on a web view or a web view's
 * tab. Used by {@link openBookChapterControl} to prefer the focused tab's own BookChapterControl
 * over the tracked last-selected web view, e.g. when focus has moved to a dialog or another
 * non-web-view tab that itself isn't scripture-navigable.
 *
 * `windowService.getFocus()` resolves to this window's own scoped data provider, so it answers for
 * the window this shard belongs to rather than for whichever window is the routing target.
 */
async function getFocusedWebViewId(): Promise<WebViewId | undefined> {
  try {
    const focusSubject = await windowService.getFocus();
    return focusSubject ? getWebViewIdFromFocusSubject(focusSubject) : undefined;
  } catch (e) {
    logger.warn(
      `platform.openBookChapterControl could not read current focus: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Opens a BookChapterControl to let the user pick a new reference, preferring — in order — (a) the
 * currently focused web view's own control, (b) the tracked last-selected web view's control, (c)
 * the top toolbar's control. No-ops if none of those has a registered control.
 */
async function openBookChapterControl(): Promise<void> {
  const focusedWebViewId = await getFocusedWebViewId();
  let handle = focusedWebViewId ? getBookChapterControlHandle(focusedWebViewId) : undefined;

  if (!handle) {
    const trackedWebViewId = getLastSelectedScriptureNavigableWebViewId();
    if (trackedWebViewId) handle = getBookChapterControlHandle(trackedWebViewId);
  }

  handle = handle ?? getBookChapterControlHandle(TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID);
  if (!handle) {
    logger.debug('platform.openBookChapterControl ignored: no BookChapterControl is available');
    return;
  }
  handle.open();
}

const bookChapterControlServiceShard: IBookChapterControlServiceShard = {
  open: openBookChapterControl,
};

/** Register the network object that backs this window's BookChapterControl command */
export async function startBookChapterControlServiceShard(): Promise<void> {
  if (!globalThis.windowId)
    throw new Error('Cannot start BookChapterControlService: windowId is not set');

  await networkObjectService.set<IBookChapterControlServiceShard>(
    `${BOOK_CHAPTER_CONTROL_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${globalThis.windowId}`,
    bookChapterControlServiceShard,
    // How the main process's router finds this shard. The window-scoped name is an internal detail
    // of the registration; the object type and window id are the contract.
    BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call.
    { 'x-experimental': true },
  );
}

/** Internal-only export for testing; not for use in development */
export const testingBookChapterControlServiceShard = { openBookChapterControl };

export default startBookChapterControlServiceShard;
