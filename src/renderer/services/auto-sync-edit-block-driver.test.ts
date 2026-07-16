import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
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
import { initAutoSyncEditBlockDriver } from './auto-sync-edit-block-driver';

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  getBlockedProjectIds: vi.fn(),
  subscribeToAutoSyncBlocking: vi.fn(),
}));

vi.mock('@renderer/services/web-view.service-host', () => ({
  getAllOpenWebViewDefinitionsSync: vi.fn(),
  onDidOpenWebView: vi.fn(),
  onDidUpdateWebView: vi.fn(),
  updateWebViewDefinitionSync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

const EDITOR_TYPE = 'platformScriptureEditor.react';
/**
 * Legacy-comment-manager web view types the driver also edit-blocks (see
 * EDIT_BLOCKABLE_WEB_VIEW_TYPES).
 */
const COMMENT_LIST_TYPE = 'legacyCommentManager.commentList';
const COMMENT_LIST_PANEL_TYPE = 'legacyCommentManager.commentListPanel';

/**
 * Tracks every definition object handed out by `makeDefinition`, keyed by id, so the
 * `updateWebViewDefinitionSync` mock below can (a) know a written id's `webViewType`/`projectId`
 * when synthesizing the object it hands to a live `onDidUpdateWebView` handler, and (b) mutate the
 * definition's `.state` in place so a later `getAllOpenWebViewDefinitionsSync` read (the mock
 * returns the same object reference every call) reflects the write, matching how the real store
 * persists.
 */
const definitionsById = new Map<string, SavedWebViewDefinition>();

function makeDefinition(
  id: string,
  webViewType: string,
  projectId?: string,
  state?: Record<string, unknown>,
): SavedWebViewDefinition {
  // The tests only exercise id/webViewType/projectId/state; the full SavedWebViewDefinition union has
  // many more required members that are irrelevant here, so build a minimal object and assert the
  // type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const definition = { id, webViewType, projectId, state } as SavedWebViewDefinition;
  definitionsById.set(id, definition);
  return definition;
}

function editor(
  id: string,
  projectId?: string,
  state?: Record<string, unknown>,
): SavedWebViewDefinition {
  return makeDefinition(id, EDITOR_TYPE, projectId, state);
}

function nonEditor(id: string): SavedWebViewDefinition {
  return makeDefinition(id, 'some.other.webView');
}

/** A legacy-comment-manager comment web view (editor-anchored list or Column 3 panel). */
function commentView(
  id: string,
  webViewType: string,
  projectId?: string,
  state?: Record<string, unknown>,
): SavedWebViewDefinition {
  return makeDefinition(id, webViewType, projectId, state);
}

describe('initAutoSyncEditBlockDriver', () => {
  /** The store listener the driver registers, captured so tests can drive state changes. */
  let storeListener: (() => void) | undefined;
  let storeUnsub: ReturnType<typeof vi.fn>;
  /** The onDidOpenWebView callback the driver registers while blocking. */
  let openHandler: ((event: { webView: SavedWebViewDefinition }) => void) | undefined;
  let openUnsub: ReturnType<typeof vi.fn>;
  /** The onDidUpdateWebView callback the driver registers while blocking. */
  let updateHandler: ((event: { webView: SavedWebViewDefinition }) => void) | undefined;
  let updateUnsub: ReturnType<typeof vi.fn>;

  /** Points `getBlockedProjectIds` at a fresh set of the given project ids. */
  function setBlockedProjects(...projectIds: string[]): void {
    vi.mocked(getBlockedProjectIds).mockReturnValue(new Set(projectIds));
  }

  /**
   * Shared body for the mocked `updateWebViewDefinitionSync`: mutates the tracked definition's
   * `.state` in place (so a later `getAllOpenWebViewDefinitionsSync` read reflects the write) and
   * SYNCHRONOUSLY invokes any live `onDidUpdateWebView` handler with the updated web view — the
   * buffered emitter and this subscription resolve to the same underlying event-emitter instance in
   * production, so a local write dispatches inline, not on a later tick.
   */
  function dispatchUpdate(
    id: Parameters<typeof updateWebViewDefinitionSync>[0],
    updateInfo: Parameters<typeof updateWebViewDefinitionSync>[1],
  ): void {
    const definition = definitionsById.get(id);
    if (definition && 'state' in updateInfo) definition.state = updateInfo.state;
    const webViewType = definition?.webViewType ?? EDITOR_TYPE;
    const projectId = definition?.projectId;
    const state = 'state' in updateInfo ? updateInfo.state : undefined;
    // The tests only exercise id/webViewType/projectId/state; see the same cast in `makeDefinition`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const updatedWebView = { id, webViewType, projectId, state } as SavedWebViewDefinition;
    updateHandler?.({ webView: updatedWebView });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    definitionsById.clear();
    storeListener = undefined;
    openHandler = undefined;
    updateHandler = undefined;
    storeUnsub = vi.fn();
    // Unsubscribing clears the captured handler, modeling real subscription teardown: once
    // unsubscribed, the emitter no longer calls the handler.
    openUnsub = vi.fn(() => {
      openHandler = undefined;
      return true;
    });
    updateUnsub = vi.fn(() => {
      updateHandler = undefined;
      return true;
    });

    vi.mocked(subscribeToAutoSyncBlocking).mockImplementation((listener) => {
      storeListener = listener;
      return storeUnsub;
    });
    vi.mocked(onDidOpenWebView).mockImplementation(
      // The network-event type is a complex generic; capture the handler for the test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((handler: (event: { webView: SavedWebViewDefinition }) => void) => {
        openHandler = handler;
        return openUnsub;
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    vi.mocked(onDidUpdateWebView).mockImplementation(
      // The network-event type is a complex generic; capture the handler for the test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((handler: (event: { webView: SavedWebViewDefinition }) => void) => {
        updateHandler = handler;
        return updateUnsub;
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
    // Default: nothing blocked.
    vi.mocked(getBlockedProjectIds).mockReturnValue(new Set());
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
    // This is what lets the ordering regression test reproduce the live re-flag bug: a still-live
    // handler observes the driver's own unflag write before the driver gets a chance to unsubscribe.
    vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
      dispatchUpdate(id, updateInfo);
      return true;
    });
  });

  it('does not flag any editor on init when nothing is blocked', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', 'projA'),
      nonEditor('n1'),
    ]);
    initAutoSyncEditBlockDriver();
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it(
    'flags only the editor whose project is syncing, leaving other projects editable ' +
      '(regression: E2E defect 3 — one project syncing must not block edits in another)',
    () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        editor('e1', 'projA', { viewType: 'formatted' }), // the syncing project
        editor('e2', 'projB'), // a different, NOT-syncing project
        nonEditor('n1'),
      ]);
      initAutoSyncEditBlockDriver();

      setBlockedProjects('projA');
      if (!storeListener) throw new Error('store listener not registered');
      storeListener();

      expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e1', {
        state: { viewType: 'formatted', isSyncBlocked: true },
      });
      expect(updateWebViewDefinitionSync).not.toHaveBeenCalledWith('e2', expect.anything());
      expect(updateWebViewDefinitionSync).not.toHaveBeenCalledWith('n1', expect.anything());
      expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(1);
    },
  );

  it('never flags a Scripture editor that has no projectId', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('no-project'), // projectId undefined
      editor('e1', 'projA'),
    ]);
    initAutoSyncEditBlockDriver();

    setBlockedProjects('projA');
    if (!storeListener) throw new Error('store listener not registered');
    storeListener();

    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e1', {
      state: { isSyncBlocked: true },
    });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalledWith('no-project', expect.anything());
    expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(1);
  });

  it('clears isSyncBlocked on all editors when blocking ends', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', 'projA', { isSyncBlocked: true }),
    ]);
    setBlockedProjects('projA');
    initAutoSyncEditBlockDriver(); // starts already blocking projA — e1 already flagged, no write

    setBlockedProjects();
    if (!storeListener) throw new Error('store listener not registered');
    storeListener();

    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e1', {
      state: { isSyncBlocked: false },
    });
  });

  it('unflags only the no-longer-syncing project on a partial set shrink {A,B} → {A}', () => {
    const writes: { id: string; blocked: boolean }[] = [];
    vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
      if (updateInfo.state) writes.push({ id, blocked: Boolean(updateInfo.state.isSyncBlocked) });
      dispatchUpdate(id, updateInfo);
      return true;
    });
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('a1', 'projA'),
      editor('b1', 'projB'),
    ]);
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    // Both projects syncing → both flagged.
    setBlockedProjects('projA', 'projB');
    storeListener();
    expect(writes).toEqual([
      { id: 'a1', blocked: true },
      { id: 'b1', blocked: true },
    ]);

    // projB finishes; projA keeps syncing. b1 must unflag; a1 must stay flagged (no write).
    writes.length = 0;
    setBlockedProjects('projA');
    storeListener();
    expect(writes).toEqual([{ id: 'b1', blocked: false }]);

    // And projA's editor, if rebuilt now, is still re-flagged; projB's is not.
    if (!updateHandler) throw new Error('update handler not registered');
    writes.length = 0;
    updateHandler({ webView: editor('a1', 'projA', { isSyncBlocked: false }) });
    updateHandler({ webView: editor('b1', 'projB', { isSyncBlocked: false }) });
    expect(writes).toEqual([{ id: 'a1', blocked: true }]);
  });

  it(
    'swaps blocking from one project to another on a pure swap transition {A} → {B}, and does not ' +
      "let a stale update from A's editor bounce it back to blocked once B is the (only) live " +
      'handler (regression: a swapped-out project must not bounce back)',
    () => {
      const writes: { id: string; blocked: boolean }[] = [];
      vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
        if (updateInfo.state) writes.push({ id, blocked: Boolean(updateInfo.state.isSyncBlocked) });
        dispatchUpdate(id, updateInfo);
        return true;
      });
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        editor('a1', 'projA'),
        editor('b1', 'projB'),
      ]);
      initAutoSyncEditBlockDriver();
      if (!storeListener) throw new Error('store listener not registered');

      // projA syncing → a1 flagged.
      setBlockedProjects('projA');
      storeListener();
      expect(writes).toEqual([{ id: 'a1', blocked: true }]);

      // Pure swap: projA finishes and projB starts syncing in the same notification. a1 must unflag
      // and b1 must flag, with no bounce-back write for a1 in between — the ordering fix (teardown
      // before apply) keeps the stale {A}-scoped handler from observing its own unflag write.
      writes.length = 0;
      setBlockedProjects('projB');
      storeListener();
      expect(writes).toEqual([
        { id: 'a1', blocked: false },
        { id: 'b1', blocked: true },
      ]);

      // The re-subscribed handler now closes over {B}. A's editor firing a stale onDidUpdateWebView
      // (e.g. a reload already in flight when the swap happened) must not re-flag it: A is no longer
      // in the blocked set, so isEditorBlocked's early return keeps the handler from acting on it.
      if (!updateHandler) throw new Error('update handler not registered');
      writes.length = 0;
      updateHandler({ webView: editor('a1', 'projA', { isSyncBlocked: false }) });
      expect(writes).toEqual([]);

      // Sanity: B's editor, if rebuilt mid-block, IS still re-flagged by the new handler.
      updateHandler({ webView: editor('b1', 'projB', { isSyncBlocked: false }) });
      expect(writes).toEqual([{ id: 'b1', blocked: true }]);
    },
  );

  it(
    'does not let a still-live re-flag handler bounce an editor back to blocked when unblocking ' +
      '(regression: the driver must unsubscribe onDidUpdateWebView before applying the unblock)',
    () => {
      const e1Writes: boolean[] = [];
      vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
        if (id === 'e1' && updateInfo.state) e1Writes.push(Boolean(updateInfo.state.isSyncBlocked));
        dispatchUpdate(id, updateInfo);
        return true;
      });

      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([editor('e1', 'projA')]);
      initAutoSyncEditBlockDriver();
      if (!storeListener) throw new Error('store listener not registered');

      // Start a scheduled sync of projA: e1 gets flagged, and the re-flag subscription goes live.
      setBlockedProjects('projA');
      storeListener();
      expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);

      // The sync finishes: blocking clears. The driver must tear down the update subscription BEFORE
      // writing `isSyncBlocked: false`, or the still-live handler observes its own unflag write, its
      // "came back unblocked" guard passes, and it re-flags e1 straight back to `true` — the live
      // E2E bug (every scripture editor permanently read-only after a scheduled sync finishes).
      setBlockedProjects();
      storeListener();

      expect(e1Writes).toEqual([true, false]);
      expect(e1Writes.at(-1)).toBe(false);
      expect(updateUnsub).toHaveBeenCalledTimes(1);
    },
  );

  it('does not re-write an editor already in the desired state', () => {
    // Editor already flagged and its project already syncing at init: nothing to change.
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', 'projA', { isSyncBlocked: true }),
    ]);
    setBlockedProjects('projA');
    initAutoSyncEditBlockDriver();

    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('flags editors opened mid-block only for a blocked project, and stops after blocking ends', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    // Start blocking projA → subscribes to onDidOpenWebView.
    setBlockedProjects('projA');
    storeListener();
    expect(onDidOpenWebView).toHaveBeenCalledTimes(1);
    if (!openHandler) throw new Error('open handler not registered');

    // An editor of the blocked project opened mid-block gets flagged.
    openHandler({ webView: editor('opened-blocked', 'projA') });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('opened-blocked', {
      state: { isSyncBlocked: true },
    });

    // An editor of a DIFFERENT project opened mid-block is not flagged.
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    openHandler({ webView: editor('opened-other', 'projB') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();

    // A non-editor opened mid-block is ignored.
    openHandler({ webView: nonEditor('other') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();

    // Blocking ends → unsubscribes from onDidOpenWebView.
    setBlockedProjects();
    storeListener();
    expect(openUnsub).toHaveBeenCalledTimes(1);
  });

  it('does not re-subscribe onDidOpenWebView across overlapping identical notifications', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    setBlockedProjects('projA');
    storeListener();
    storeListener(); // same blocked set → no-op
    expect(onDidOpenWebView).toHaveBeenCalledTimes(1);
  });

  it('re-flags a Scripture editor of a blocked project rebuilt (updated) mid-block that came back unblocked', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    setBlockedProjects('projA');
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);
    if (!updateHandler) throw new Error('update handler not registered');

    // A rebuilt editor of projA comes back with isSyncBlocked forced to false → re-flagged to true.
    updateHandler({
      webView: editor('rebuilt', 'projA', { viewType: 'formatted', isSyncBlocked: false }),
    });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('rebuilt', {
      state: { viewType: 'formatted', isSyncBlocked: true },
    });

    // A rebuilt editor of a NON-blocked project is not re-flagged.
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    updateHandler({ webView: editor('rebuilt-other', 'projB', { isSyncBlocked: false }) });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();

    // A non-editor update mid-block is ignored.
    updateHandler({ webView: nonEditor('other') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('does not re-flag an already-blocked editor update (the driver does not loop on its own update)', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    setBlockedProjects('projA');
    storeListener();
    if (!updateHandler) throw new Error('update handler not registered');

    // Model the real service: the driver's own re-flag write re-emits onDidUpdateWebView with the
    // now-blocked definition. If the handler acted on that it would recurse forever.
    vi.mocked(updateWebViewDefinitionSync).mockImplementation((id) => {
      updateHandler?.({ webView: editor(id, 'projA', { isSyncBlocked: true }) });
      return true;
    });

    updateHandler({ webView: editor('rebuilt', 'projA', { isSyncBlocked: false }) });

    // Exactly one write: the original re-flag. The re-emitted (already-blocked) update is a no-op.
    expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(1);
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('rebuilt', {
      state: { isSyncBlocked: true },
    });
  });

  it('does not re-subscribe onDidUpdateWebView across overlapping identical notifications', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    setBlockedProjects('projA');
    storeListener();
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from onDidUpdateWebView when blocking ends', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    setBlockedProjects('projA');
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);

    setBlockedProjects();
    storeListener();
    expect(updateUnsub).toHaveBeenCalledTimes(1);
  });

  it('re-subscribes the handlers over the new set on a set change (so partial transitions track it)', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    setBlockedProjects('projA');
    storeListener();
    setBlockedProjects('projA', 'projB'); // real content change → tear down + re-arm
    storeListener();

    // One subscribe per distinct blocking snapshot.
    expect(onDidOpenWebView).toHaveBeenCalledTimes(2);
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(2);
    // The stale handler was torn down before the re-arm.
    expect(openUnsub).toHaveBeenCalledTimes(1);
    expect(updateUnsub).toHaveBeenCalledTimes(1);
  });

  it('cleanup unsubscribes from the store and the open/update web-view subscriptions', () => {
    const cleanup = initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    setBlockedProjects('projA');
    storeListener();

    cleanup();
    expect(storeUnsub).toHaveBeenCalledTimes(1);
    expect(openUnsub).toHaveBeenCalledTimes(1);
    expect(updateUnsub).toHaveBeenCalledTimes(1);
  });

  it(
    "flags a blocked project's legacy-comment-manager comment views (editor-anchored list and " +
      "Column 3 panel), leaving another project's comment view editable",
    () => {
      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
        commentView('cl-a', COMMENT_LIST_TYPE, 'projA'), // syncing project's comment list
        commentView('panel-a', COMMENT_LIST_PANEL_TYPE, 'projA'), // syncing project's Column 3 panel
        commentView('cl-b', COMMENT_LIST_TYPE, 'projB'), // a different, NOT-syncing project
      ]);
      initAutoSyncEditBlockDriver();

      setBlockedProjects('projA');
      if (!storeListener) throw new Error('store listener not registered');
      storeListener();

      expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('cl-a', {
        state: { isSyncBlocked: true },
      });
      expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('panel-a', {
        state: { isSyncBlocked: true },
      });
      expect(updateWebViewDefinitionSync).not.toHaveBeenCalledWith('cl-b', expect.anything());
      expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(2);
    },
  );

  it('re-flags a legacy-comment-manager comment view of a blocked project rebuilt mid-block that came back unblocked', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    setBlockedProjects('projA');
    storeListener();
    if (!updateHandler) throw new Error('update handler not registered');

    // A rebuilt comment panel of projA comes back with isSyncBlocked forced to false (its provider
    // scrubs it on rehydrate) → the driver re-flags it to true.
    updateHandler({
      webView: commentView('panel-rebuilt', COMMENT_LIST_PANEL_TYPE, 'projA', {
        isSyncBlocked: false,
      }),
    });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('panel-rebuilt', {
      state: { isSyncBlocked: true },
    });

    // A rebuilt comment view of a NON-blocked project is not re-flagged.
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    updateHandler({
      webView: commentView('cl-other', COMMENT_LIST_TYPE, 'projB', { isSyncBlocked: false }),
    });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('flags a legacy-comment-manager comment view opened mid-block only for a blocked project', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    setBlockedProjects('projA');
    storeListener();
    if (!openHandler) throw new Error('open handler not registered');

    // A comment list of the blocked project opened mid-block gets flagged.
    openHandler({ webView: commentView('cl-opened', COMMENT_LIST_TYPE, 'projA') });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('cl-opened', {
      state: { isSyncBlocked: true },
    });

    // A comment panel of a DIFFERENT project opened mid-block is not flagged.
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    openHandler({ webView: commentView('panel-other', COMMENT_LIST_PANEL_TYPE, 'projB') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('does not throw if the dock layout is not ready when enumerating web views', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => {
      throw new Error('dock layout not registered');
    });
    setBlockedProjects('projA'); // force enumeration (which throws) on init
    expect(() => initAutoSyncEditBlockDriver()).not.toThrow();
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });
});
