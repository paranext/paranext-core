/**
 * Headless driver that translates the auto-sync-blocking store's visible blocked-project set into a
 * per-editor `isSyncBlocked` flag on the open Scripture editor web views whose project is syncing.
 *
 * This replaces the earlier full-workspace blocking overlay: instead of covering the whole
 * workspace and trapping focus, an automatic (scheduled or session) Send/Receive now blocks only
 * _editing_, and only of the projects actually being synced. The Scripture editor web view reads
 * `isSyncBlocked` from its own web view state (via `useWebViewState`), folds it into its read-only
 * computation, and shows a slim non-covering banner — the rest of the UI (menus, dialogs,
 * navigation) and every editor of a project that is NOT syncing stays fully usable.
 *
 * An editor is flagged iff its `projectId` is in the store's blocked set; editors with no
 * `projectId` are never flagged. The driver reacts to SET CHANGES (backend snapshots), not a
 * boolean raise/clear: on each store notification it re-applies the current blocked set to every
 * open editor. The store (see auto-sync-blocking-store.ts) provides the 200 ms show-grace, so this
 * driver just mirrors the store's derived visible set onto the editors.
 *
 * While a set is blocking it also flags editors opened mid-block (via `onDidOpenWebView`) and
 * re-flags editors rebuilt mid-block (via `onDidUpdateWebView`) whose project is in the blocked set
 * — the Scripture editor factory forces `isSyncBlocked: false` on every rebuild (e.g.
 * `reloadWebView`, an interface-mode switch, or `loadLayout`), so without this a rebuild during a
 * sustained block would come back editable with the banner gone.
 */

import { logger } from '@shared/services/logger.service';
import {
  SavedWebViewDefinition,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from '@shared/models/web-view.model';
import { deepEqual, getErrorMessage } from 'platform-bible-utils';
import {
  getBlockedProjectIds,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import {
  getAllOpenWebViewDefinitionsSync,
  onDidOpenWebView,
  onDidUpdateWebView,
  updateWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';

/**
 * Web view types this driver edit-blocks while their project is syncing.
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE` is a core shared-model constant; the two legacy-comment-manager
 * comment views are hard-coded string literals because core must NOT import from an extension. This
 * intentionally duplicates the type strings the way each extension duplicates its own
 * sync-edit-blocked handling (no cross-boundary imports); if those extension web-view types are
 * ever renamed, update them here to match. Each of these web views reads `isSyncBlocked` from its
 * own web view state and folds it into a read-only / write-disabled mode.
 */
const EDIT_BLOCKABLE_WEB_VIEW_TYPES: ReadonlySet<string> = new Set([
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  // legacy-comment-manager `commentListWebViewType` (editor-anchored comment list).
  'legacyCommentManager.commentList',
  // legacy-comment-manager `COMMENT_LIST_PANEL_WEB_VIEW_TYPE` (fixed Column 3 comment panel).
  'legacyCommentManager.commentListPanel',
]);

/**
 * Web view state key edit-blockable web views read to know they are edit-blocked by an automatic
 * sync.
 */
const IS_SYNC_BLOCKED_STATE_KEY = 'isSyncBlocked';

/** True when a Scripture editor definition's project is in the blocked set. No project → never. */
function isEditorBlocked(
  definition: SavedWebViewDefinition,
  blockedProjectIds: ReadonlySet<string>,
): boolean {
  // Upper-case to match the store's canonical form (setBlockedProjects canonicalizes to upper at
  // ingestion; canonical project ids are upper — ProjectMetadata.Id = id.ToUpperInvariant()), so a
  // casing skew between the editor's projectId and the blocked set can never miss a real block.
  return (
    definition.projectId !== undefined && blockedProjectIds.has(definition.projectId.toUpperCase())
  );
}

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

/**
 * Applies the blocked set to every currently open Scripture editor: each editor whose project is in
 * the set is flagged, every other editor is unflagged. The per-editor equality guard turns this
 * into a diff — unchanged editors get no write (and thus emit no update event).
 *
 * Returns `true` when the enumeration succeeded and the set was applied, `false` when
 * `getAllOpenWebViewDefinitionsSync` threw and nothing was applied. The caller uses this to avoid
 * recording a set it did not actually apply (see `syncState`): an open-but-unenumerable editor must
 * not be treated as flagged, or the equality guard would short-circuit and leave it unflagged.
 */
function applyBlockedSetToAllEditors(blockedProjectIds: ReadonlySet<string>): boolean {
  let definitions: SavedWebViewDefinition[];
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    // The dock layout may not be registered yet at startup; nothing is blocked then, so this is a
    // benign no-op. Logged at debug so a normal startup does not warn.
    logger.debug(
      `auto-sync edit-block driver could not enumerate web views: ${getErrorMessage(e)}`,
    );
    return false;
  }
  definitions.forEach((definition) => {
    if (EDIT_BLOCKABLE_WEB_VIEW_TYPES.has(definition.webViewType))
      setEditorSyncBlocked(definition, isEditorBlocked(definition, blockedProjectIds));
  });
  return true;
}

/**
 * Starts the driver: mirrors the auto-sync-blocking store's visible blocked-project set onto every
 * open Scripture editor's `isSyncBlocked` state, and — while a set is blocking — onto editors
 * opened or rebuilt mid-block whose project is in the set. Call once at app startup. Returns a
 * cleanup function that stops the driver (it does NOT clear any flags it set; the store clearing to
 * empty is what unblocks the editors).
 */
export function initAutoSyncEditBlockDriver(): () => void {
  let unsubscribeOpen: (() => void) | undefined;
  let unsubscribeUpdate: (() => void) | undefined;
  /** The blocked set we last applied to the editors; lets us skip a no-op notification. */
  let appliedBlockedProjectIds: ReadonlySet<string> = new Set();

  const teardownHandlers = () => {
    if (unsubscribeOpen) {
      unsubscribeOpen();
      unsubscribeOpen = undefined;
    }
    if (unsubscribeUpdate) {
      unsubscribeUpdate();
      unsubscribeUpdate = undefined;
    }
  };

  // Subscribe the mid-block handlers, each closing over the CURRENT blocked set. Because syncState
  // tears the handlers down and rebuilds them on every real transition, the closures always see the
  // latest set — which is what makes partial transitions ({A,B} → {A}) correct.
  const setupHandlers = (blockedProjectIds: ReadonlySet<string>) => {
    const openUnsub = onDidOpenWebView(({ webView }) => {
      if (
        EDIT_BLOCKABLE_WEB_VIEW_TYPES.has(webView.webViewType) &&
        isEditorBlocked(webView, blockedProjectIds)
      )
        setEditorSyncBlocked(webView, true);
    });
    // Wrapped because a network-event unsubscriber returns a boolean; keep our own type void.
    unsubscribeOpen = () => {
      openUnsub();
    };

    const updateUnsub = onDidUpdateWebView(({ webView }) => {
      if (!EDIT_BLOCKABLE_WEB_VIEW_TYPES.has(webView.webViewType)) return;
      // Only re-flag editors whose project is blocked; a rebuilt editor of a non-synced project must
      // stay editable.
      if (!isEditorBlocked(webView, blockedProjectIds)) return;
      // Guard against self-triggering: our own re-flag below calls updateWebViewDefinitionSync, which
      // fires another onDidUpdateWebView. Only act when the definition came back unblocked; once we
      // set it back to true the next event is a no-op, so this cannot loop.
      if (webView.state?.[IS_SYNC_BLOCKED_STATE_KEY]) return;
      setEditorSyncBlocked(webView, true);
    });
    unsubscribeUpdate = () => {
      updateUnsub();
    };
  };

  const syncState = () => {
    const next = getBlockedProjectIds();
    // No content change → nothing to do. This keeps overlapping identical notifications from
    // needlessly rewriting editors or re-subscribing the handlers.
    if (deepEqual(appliedBlockedProjectIds, next)) return;

    // ORDERING IS LOAD-BEARING: tear the mid-block handlers down BEFORE applying the diff below.
    // Applying the diff issues unflag writes (isSyncBlocked: false) for projects no longer in the
    // blocked set, and `updateWebViewDefinitionSync` fires `onDidUpdateWebView` SYNCHRONOUSLY (the
    // buffered emitter and this subscription resolve to the same underlying PapiNetworkEventEmitter,
    // so a local emit dispatches inline, not on a later tick). A still-live re-flag handler would
    // observe its own unflag write, pass its "came back unblocked" guard, and set the editor straight
    // back to `true` — permanently blocking it. Tearing down first also drops handlers that closed
    // over the STALE set, so the rebuild below re-subscribes over the new one. This is correct for
    // PARTIAL transitions too: on {A,B} → {A}, B's editors unflag with no live handler to bounce
    // them, A's editors keep their flag (the equality guard skips them), and the rebuilt {A} handlers
    // still protect A.
    teardownHandlers();

    // Only advance the applied-set snapshot when the apply actually succeeded. If enumeration threw
    // (open-but-unenumerable editors), applyBlockedSetToAllEditors returns false having applied
    // nothing; recording `next` anyway would let the equality guard above short-circuit the next
    // notification and leave those editors unflagged for the rest of this block. Leaving the snapshot
    // unchanged lets the next real transition (or the open/update handlers) re-apply.
    if (applyBlockedSetToAllEditors(next))
      // Snapshot a copy so a later store reassignment can never alias what we think we applied.
      appliedBlockedProjectIds = new Set(next);

    // Re-arm the mid-block handlers over the new set, unless nothing is blocked anymore.
    if (next.size > 0) setupHandlers(next);
  };

  // Reflect the current state immediately (in case a set is already blocking on init), then track.
  syncState();
  const unsubscribeStore = subscribeToAutoSyncBlocking(syncState);

  return () => {
    unsubscribeStore();
    teardownHandlers();
  };
}
