import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
import {
  getAutoSyncBlocking,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import {
  getAllOpenWebViewDefinitionsSync,
  onDidOpenWebView,
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
  updateWebViewDefinitionSync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

const EDITOR_TYPE = 'platformScriptureEditor.react';

function makeDefinition(
  id: string,
  webViewType: string,
  state?: Record<string, unknown>,
): SavedWebViewDefinition {
  // The tests only exercise id/webViewType/state; the full SavedWebViewDefinition union has many
  // more required members that are irrelevant here, so build a minimal object and assert the type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, webViewType, state } as SavedWebViewDefinition;
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

  beforeEach(() => {
    vi.clearAllMocks();
    storeListener = undefined;
    openHandler = undefined;
    storeUnsub = vi.fn();
    openUnsub = vi.fn(() => true);

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
    vi.mocked(getAutoSyncBlocking).mockReturnValue(false);
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
    vi.mocked(updateWebViewDefinitionSync).mockReturnValue(true);
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

  it('cleanup unsubscribes from the store and any open-web-view subscription', () => {
    const cleanup = initAutoSyncEditBlockDriver();
    if (!storeListener) throw new Error('store listener not registered');
    vi.mocked(getAutoSyncBlocking).mockReturnValue(true);
    storeListener();

    cleanup();
    expect(storeUnsub).toHaveBeenCalledTimes(1);
    expect(openUnsub).toHaveBeenCalledTimes(1);
  });

  it('does not throw if the dock layout is not ready when enumerating web views', () => {
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => {
      throw new Error('dock layout not registered');
    });
    expect(() => initAutoSyncEditBlockDriver()).not.toThrow();
    expect(updateWebViewDefinitionSync).not.toHaveBeenCalled();
  });
});
