/**
 * Headless driver that translates the auto-sync-blocking store's visible state into a per-editor
 * `isSyncBlocked` flag on every open Scripture editor web view.
 *
 * This replaces the earlier full-workspace blocking overlay: instead of covering the whole
 * workspace and trapping focus, an automatic (scheduled) Send/Receive now blocks only _editing_.
 * The Scripture editor web view reads `isSyncBlocked` from its own web view state (via
 * `useWebViewState`), folds it into its read-only computation, and shows a slim non-covering banner
 * — the rest of the UI (menus, dialogs, navigation) stays fully usable.
 *
 * The store (see auto-sync-blocking-store.ts) already provides the 200 ms show-grace, the
 * ref-counted overlapping-blocker handling, and the safety timeout, so this driver just mirrors the
 * store's derived visibility onto the editors and needs none of that logic itself.
 *
 * While blocking is active it also flags editors opened mid-block (via `onDidOpenWebView`), so an
 * editor a user opens during a sync is blocked too, and re-flags editors that are rebuilt mid-block
 * (via `onDidUpdateWebView`) — the Scripture editor factory forces `isSyncBlocked: false` on every
 * rebuild (e.g. `reloadWebView`, an interface-mode switch, or `loadLayout`), so without this a
 * rebuild during a sustained block would come back editable with the banner gone.
 */

import { logger } from '@shared/services/logger.service';
import {
  SavedWebViewDefinition,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from '@shared/models/web-view.model';
import { getErrorMessage } from 'platform-bible-utils';
import {
  getAutoSyncBlocking,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import {
  getAllOpenWebViewDefinitionsSync,
  onDidOpenWebView,
  onDidUpdateWebView,
  updateWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';

/** Web view state key the Scripture editor reads to know it is edit-blocked by an automatic sync. */
const IS_SYNC_BLOCKED_STATE_KEY = 'isSyncBlocked';

/**
 * Sets `isSyncBlocked` on a single Scripture editor's saved definition, but only when it differs
 * from the current value — `updateWebViewDefinitionSync` always emits an update event when `state`
 * is present (it is compared by reference), so the equality guard keeps a no-op from rippling
 * through every editor's update subscribers.
 */
function setEditorSyncBlocked(definition: SavedWebViewDefinition, isBlocked: boolean): void {
  const currentState = definition.state ?? {};
  // Normalize a missing flag to false so init and unblock never write false onto an editor that is
  // already (implicitly) unblocked.
  if (Boolean(currentState[IS_SYNC_BLOCKED_STATE_KEY]) === isBlocked) return;
  try {
    updateWebViewDefinitionSync(definition.id, {
      state: { ...currentState, [IS_SYNC_BLOCKED_STATE_KEY]: isBlocked },
    });
  } catch (e) {
    logger.warn(
      `auto-sync edit-block driver failed to update editor ${definition.id}: ${getErrorMessage(e)}`,
    );
  }
}

/** Applies `isBlocked` to every currently open Scripture editor web view. */
function applyToAllEditors(isBlocked: boolean): void {
  let definitions: SavedWebViewDefinition[];
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    // The dock layout may not be registered yet at startup; nothing is blocked then, so this is a
    // benign no-op. Logged at debug so a normal startup does not warn.
    logger.debug(
      `auto-sync edit-block driver could not enumerate web views: ${getErrorMessage(e)}`,
    );
    return;
  }
  definitions.forEach((definition) => {
    if (definition.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE)
      setEditorSyncBlocked(definition, isBlocked);
  });
}

/**
 * Starts the driver: mirrors the auto-sync-blocking store's visible state onto every open Scripture
 * editor's `isSyncBlocked` state, and — while blocking — onto editors opened or rebuilt mid-block.
 * Call once at app startup. Returns a cleanup function that stops the driver (it does NOT clear any
 * flags it set; the store clearing to `false` is what unblocks the editors).
 */
export function initAutoSyncEditBlockDriver(): () => void {
  let unsubscribeOpen: (() => void) | undefined;
  let unsubscribeUpdate: (() => void) | undefined;

  const syncState = () => {
    const isBlocking = getAutoSyncBlocking();
    applyToAllEditors(isBlocking);

    if (isBlocking) {
      // Block editors opened while a sync is in flight. Subscribe once; the store can notify
      // multiple times during one blocking episode (overlapping blockers) without re-subscribing.
      if (!unsubscribeOpen) {
        const unsubscribe = onDidOpenWebView(({ webView }) => {
          if (webView.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE)
            setEditorSyncBlocked(webView, true);
        });
        // Wrapped because a network-event unsubscriber returns a boolean; keep our own type void.
        unsubscribeOpen = () => {
          unsubscribe();
        };
      }
      // Re-flag editors rebuilt mid-block. The Scripture editor factory forces `isSyncBlocked:
      // false` on every in-place rebuild (reloadWebView / interface-mode switch / loadLayout), which
      // emits `onDidUpdateWebView` (not `onDidOpenWebView`), so without this the editor comes back
      // editable with no banner for the rest of the sync.
      if (!unsubscribeUpdate) {
        const unsubscribe = onDidUpdateWebView(({ webView }) => {
          if (webView.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) return;
          // Guard against self-triggering: our own re-flag below calls updateWebViewDefinitionSync,
          // which fires another onDidUpdateWebView. Only act when the definition came back unblocked;
          // once we set it back to true the next event is a no-op, so this cannot loop.
          if (webView.state?.[IS_SYNC_BLOCKED_STATE_KEY]) return;
          setEditorSyncBlocked(webView, true);
        });
        unsubscribeUpdate = () => {
          unsubscribe();
        };
      }
    } else {
      if (unsubscribeOpen) {
        unsubscribeOpen();
        unsubscribeOpen = undefined;
      }
      if (unsubscribeUpdate) {
        unsubscribeUpdate();
        unsubscribeUpdate = undefined;
      }
    }
  };

  // Reflect the current state immediately (in case blocking is already active on init), then track.
  syncState();
  const unsubscribeStore = subscribeToAutoSyncBlocking(syncState);

  return () => {
    unsubscribeStore();
    if (unsubscribeOpen) {
      unsubscribeOpen();
      unsubscribeOpen = undefined;
    }
    if (unsubscribeUpdate) {
      unsubscribeUpdate();
      unsubscribeUpdate = undefined;
    }
  };
}
