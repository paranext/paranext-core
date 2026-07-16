import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
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
import { initAutoSyncEditBlockDriver } from './auto-sync-edit-block-driver';

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  getAutoSyncBlocking: vi.fn(),
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
 * Tracks every definition object handed out by `makeDefinition`, keyed by id, so the
 * `updateWebViewDefinitionSync` mock below can (a) know a written id's `webViewType` when
 * synthesizing the object it hands to a live `onDidUpdateWebView` handler, and (b) mutate the
 * definition's `.state` in place so a later `getAllOpenWebViewDefinitionsSync` read (the mock
 * returns the same object reference every call) reflects the write, matching how the real store
 * persists updates.
 */
const definitionsById = new Map<string, SavedWebViewDefinition>();

function makeDefinition(
  id: string,
  webViewType: string,
  state?: Record<string, unknown>,
): SavedWebViewDefinition {
  // The tests only exercise id/webViewType/state; the full SavedWebViewDefinition union has many
  // more required members that are irrelevant here, so build a minimal object and assert the type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const definition = { id, webViewType, state } as SavedWebViewDefinition;
  definitionsById.set(id, definition);
  return definition;
}

function editor(id: string, state?: Record<string, unknown>): SavedWebViewDefinition {
  return makeDefinition(id, EDITOR_TYPE, state);
}

function nonEditor(id: string): SavedWebViewDefinition {
  return makeDefinition(id, 'some.other.webView');
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

  /**
   * Shared body for the mocked `updateWebViewDefinitionSync`: mutates the tracked definition's
   * `.state` in place (so a later `getAllOpenWebViewDefinitionsSync` read reflects the write,
   * matching how the real store persists updates) and SYNCHRONOUSLY invokes any live
   * `onDidUpdateWebView` handler with the updated web view — the buffered emitter and this
   * subscription resolve to the same underlying event-emitter instance in production, so a local
   * write dispatches inline, not on a later tick.
   */
  function dispatchUpdate(
    id: Parameters<typeof updateWebViewDefinitionSync>[0],
    updateInfo: Parameters<typeof updateWebViewDefinitionSync>[1],
  ): void {
    const definition = definitionsById.get(id);
    if (definition && 'state' in updateInfo) definition.state = updateInfo.state;
    const webViewType = definition?.webViewType ?? EDITOR_TYPE;
    const state = 'state' in updateInfo ? updateInfo.state : undefined;
    // The tests only exercise id/webViewType/state; see the same cast in `makeDefinition` above.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const updatedWebView = { id, webViewType, state } as SavedWebViewDefinition;
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
    vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
    // This is what lets the regression test below reproduce the live re-flag bug: a still-subscribed
    // handler observes the driver's own unflag write before the driver gets a chance to unsubscribe.
    vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
      dispatchUpdate(id, updateInfo);
      return true;
    });
  });

  it('does not flag any editor on init when not blocking', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([editor('e1'), nonEditor('n1')]);
    initAutoSyncEditBlockDriver();
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('sets isSyncBlocked true only on Scripture editors when blocking starts', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', { viewType: 'formatted' }),
      nonEditor('n1'),
      editor('e2'),
    ]);
    initAutoSyncEditBlockDriver();

    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    if (!storeListener) throw new Error('store listener not registered');
    storeListener();

    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e1', {
      state: { viewType: 'formatted', isSyncBlocked: true },
    });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e2', {
      state: { isSyncBlocked: true },
    });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalledWith('n1', expect.anything());
    expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(2);
  });

  it('clears isSyncBlocked when blocking ends', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', { isSyncBlocked: true }),
    ]);
    initAutoSyncEditBlockDriver();

    vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
    if (!storeListener) throw new Error('store listener not registered');
    storeListener();

    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('e1', {
      state: { isSyncBlocked: false },
    });
  });

  it(
    'does not let a still-live re-flag handler bounce an editor back to blocked when unblocking ' +
      '(regression: the driver must unsubscribe onDidUpdateWebView before applying the unblock)',
    () => {
      // Every write to e1's isSyncBlocked flag, in order, so we can assert the unflag sticks instead
      // of immediately being reverted by the (still-subscribed) re-flag handler.
      const e1Writes: boolean[] = [];
      vi.mocked(updateWebViewDefinitionSync).mockImplementation((id, updateInfo) => {
        if (id === 'e1' && updateInfo.state) e1Writes.push(Boolean(updateInfo.state.isSyncBlocked));
        dispatchUpdate(id, updateInfo);
        return true;
      });

      vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([editor('e1')]);
      initAutoSyncEditBlockDriver();
      if (!storeListener) throw new Error('store listener not registered');

      // Start a scheduled sync: e1 gets flagged blocked, and the re-flag subscription goes live.
      vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
      storeListener();
      expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);

      // The sync finishes: blocking clears. The driver must tear down the update subscription BEFORE
      // writing `isSyncBlocked: false`, or the still-live handler observes its own unflag write, its
      // "came back unblocked" guard passes, and it re-flags e1 straight back to `true` — the live
      // E2E bug (every scripture editor permanently read-only after a scheduled sync finishes).
      vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
      storeListener();

      expect(e1Writes).toEqual([true, false]);
      expect(e1Writes.at(-1)).toBe(false);
      expect(updateUnsub).toHaveBeenCalledTimes(1);
    },
  );

  it('does not re-write an editor already in the desired state', () => {
    // Editor already flagged and a sync already in flight at init: nothing to change.
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      editor('e1', { isSyncBlocked: true }),
    ]);
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    initAutoSyncEditBlockDriver();

    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('flags editors opened mid-block and stops after blocking ends', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    // Start blocking → subscribes to onDidOpenWebView
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    expect(onDidOpenWebView).toHaveBeenCalledTimes(1);

    // An editor opened mid-block gets flagged
    if (!openHandler) throw new Error('open handler not registered');
    openHandler({ webView: editor('opened-mid-block') });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('opened-mid-block', {
      state: { isSyncBlocked: true },
    });

    // A non-editor opened mid-block is ignored
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    openHandler({ webView: nonEditor('other') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();

    // Blocking ends → unsubscribes from onDidOpenWebView
    vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
    storeListener();
    expect(openUnsub).toHaveBeenCalledTimes(1);
  });

  it('only subscribes to onDidOpenWebView once across overlapping blocking notifications', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    storeListener();
    expect(onDidOpenWebView).toHaveBeenCalledTimes(1);
  });

  it('re-flags a Scripture editor rebuilt (updated) mid-block that came back unblocked', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    // Start blocking → subscribes to onDidUpdateWebView
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);

    // A rebuilt editor comes back with isSyncBlocked forced to false → re-flagged to true
    if (!updateHandler) throw new Error('update handler not registered');
    updateHandler({ webView: editor('rebuilt', { viewType: 'formatted', isSyncBlocked: false }) });
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('rebuilt', {
      state: { viewType: 'formatted', isSyncBlocked: true },
    });

    // A non-editor update mid-block is ignored
    vi.mocked(updateWebViewDefinitionSync).mockClear();
    updateHandler({ webView: nonEditor('other') });
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });

  it('does not re-flag an already-blocked editor update (the driver does not loop on its own update)', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    if (!updateHandler) throw new Error('update handler not registered');

    // Model the real service: the driver's own re-flag write re-emits onDidUpdateWebView with the
    // now-blocked definition. If the handler acted on that it would recurse forever.
    vi.mocked(updateWebViewDefinitionSync).mockImplementation((id) => {
      updateHandler?.({ webView: editor(id, { isSyncBlocked: true }) });
      return true;
    });

    updateHandler({ webView: editor('rebuilt', { isSyncBlocked: false }) });

    // Exactly one write: the original re-flag. The re-emitted (already-blocked) update is a no-op.
    expect(updateWebViewDefinitionSync).toHaveBeenCalledTimes(1);
    expect(updateWebViewDefinitionSync).toHaveBeenCalledWith('rebuilt', {
      state: { isSyncBlocked: true },
    });
  });

  it('only subscribes to onDidUpdateWebView once across overlapping blocking notifications', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes from onDidUpdateWebView when blocking ends', () => {
    initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');

    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();
    expect(onDidUpdateWebView).toHaveBeenCalledTimes(1);

    vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
    storeListener();
    expect(updateUnsub).toHaveBeenCalledTimes(1);
  });

  it('cleanup unsubscribes from the store and the open/update web-view subscriptions', () => {
    const cleanup = initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();

    cleanup();
    expect(storeUnsub).toHaveBeenCalledTimes(1);
    expect(openUnsub).toHaveBeenCalledTimes(1);
    expect(updateUnsub).toHaveBeenCalledTimes(1);
  });

  it('does not throw if the dock layout is not ready when enumerating web views', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => {
      throw new Error('dock layout not registered');
    });
    expect(() => initAutoSyncEditBlockDriver()).not.toThrow();
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });
});
