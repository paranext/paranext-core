import { describe, it, expect, vi, beforeEach } from 'vitest';
import { focusSharedLayoutDefaultTab, SharedLayoutReceiver } from './shared-layout-receiver.model';

function makePapi() {
  const getSetting = vi.fn();
  return {
    papi: {
      logger: { warn: vi.fn() },
      projectDataProviders: { get: vi.fn(async () => ({ getSetting })) },
      webViews: { openWebView: vi.fn(async () => 'wv-1') },
    },
    getSetting,
  };
}

describe('focusSharedLayoutDefaultTab', () => {
  beforeEach(() => vi.clearAllMocks());

  it('brings the bible-texts panel to front for ScriptureResource', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('ScriptureResource');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).toHaveBeenCalledWith(
      'platformScriptureEditor.bibleTexts',
      undefined,
      { existingId: '?', createNewIfNotFound: false, bringToFront: true },
    );
  });

  it('brings the commentaries panel to front for CommentaryResource', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('CommentaryResource');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).toHaveBeenCalledWith(
      'platformScriptureEditor.commentaries',
      undefined,
      { existingId: '?', createNewIfNotFound: false, bringToFront: true },
    );
  });

  it('does nothing when the setting is empty or unrecognized', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).not.toHaveBeenCalled();
  });

  it('swallows errors (never throws)', async () => {
    const { papi } = makePapi();
    papi.projectDataProviders.get.mockRejectedValue(new Error('boom'));
    await expect(
      // The mock papi only implements the subset of PapiBackend this helper uses.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      focusSharedLayoutDefaultTab(papi as never, 'proj-1'),
    ).resolves.toBeUndefined();
  });
});

type SyncHandler = (payload: { isSyncing: boolean }) => void;

function makeReceiverHarness(options?: { layout?: unknown[]; tab?: string }) {
  let syncHandler: SyncHandler | undefined;
  const emit = vi.fn();
  const send = vi.fn(async () => 'notif-1');
  const dismiss = vi.fn(async () => {});
  const openWebView = vi.fn(async () => 'wv-1');

  const getSetting = vi.fn(async (key: string) =>
    key === 'platformScripture.sharedLayoutDefaultTab'
      ? (options?.tab ?? '')
      : { dataVersion: '1.0.0', items: options?.layout ?? [] },
  );

  const papi = {
    logger: { warn: vi.fn(), debug: vi.fn() },
    settings: { get: vi.fn(async () => 'simple') },
    projectDataProviders: { get: vi.fn(async () => ({ getSetting })) },
    webViews: {
      getAllOpenWebViewDefinitions: vi.fn(async () => [
        {
          id: 'ed-1',
          webViewType: 'platformScriptureEditor.react',
          projectId: 'proj-1',
          state: {},
        },
      ]),
      openWebView,
    },
    notifications: { send, dismiss },
    network: {
      getNetworkEvent: vi.fn(() => (handler: SyncHandler) => {
        syncHandler = handler;
        return () => {};
      }),
    },
  };

  const emitter = { emit, dispose: vi.fn() };
  // The test harness only implements the subset of PapiBackend/PlatformEventEmitter the receiver uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const receiver = new SharedLayoutReceiver(papi as never, emitter as never);
  return {
    receiver,
    papi,
    emit,
    send,
    dismiss,
    openWebView,
    fireSync: () => syncHandler?.({ isSyncing: false }),
  };
}

// The sync-completed handler chains several sequential awaits (interface-mode check, open web view
// lookup, project data provider fetch, setting reads, notification send). A fixed number of
// `Promise.resolve()` ticks under-drains that chain, so flush via a macrotask instead: by the time
// a `setTimeout` callback runs, the entire microtask queue (however deep) has already been drained.
const flush = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });

describe('SharedLayoutReceiver', () => {
  beforeEach(() => vi.clearAllMocks());

  it('notifies on a manual sync when the open project layout changed', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? 'CommentaryResource'
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    h.fireSync();
    await flush();
    expect(h.send).toHaveBeenCalledWith(
      expect.objectContaining({ clickCommand: 'platformScriptureEditor.applySharedLayout' }),
    );
  });

  it('does not notify when the layout is unchanged', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.fireSync();
    await flush();
    expect(h.send).not.toHaveBeenCalled();
  });

  it('does not notify for a marked auto-sync (project switch); it applies instead', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? ''
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    h.receiver.markAutoSync('proj-1');
    h.emit.mockClear();
    h.fireSync();
    await flush();
    expect(h.send).not.toHaveBeenCalled();
    expect(h.emit).toHaveBeenCalledWith({ projectId: 'proj-1' });
  });

  it('does not re-notify on a second manual sync with the same pending layout', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? ''
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    h.fireSync();
    await flush();
    h.fireSync();
    await flush();
    expect(h.send).toHaveBeenCalledTimes(1);
  });

  it('short-circuits in power mode', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    h.papi.settings.get.mockResolvedValue('power');
    h.fireSync();
    await flush();
    expect(h.send).not.toHaveBeenCalled();
  });

  it('applyFromNotification applies the mapped project and dismisses', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? ''
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    h.fireSync();
    await flush();
    h.emit.mockClear();
    await h.receiver.applyFromNotification('notif-1');
    expect(h.emit).toHaveBeenCalledWith({ projectId: 'proj-1' });
    expect(h.dismiss).toHaveBeenCalledWith('notif-1');
  });

  it('retries the notify when a previous send failed (no pending entry retained)', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? ''
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    h.send.mockRejectedValueOnce(new Error('send boom'));
    h.fireSync();
    await flush();
    // The failed send must not leave a pending marker, so the SAME changed layout notifies again.
    h.fireSync();
    await flush();
    expect(h.send).toHaveBeenCalledTimes(2);
  });

  it('sends exactly one notification for two sync completions in the same tick', async () => {
    const h = makeReceiverHarness({ layout: [{ type: 'project', name: 'A', id: '1' }] });
    await h.receiver.applyForProject('proj-1');
    h.papi.projectDataProviders.get.mockImplementation(async () => ({
      getSetting: vi.fn(async (key: string) =>
        key === 'platformScripture.sharedLayoutDefaultTab'
          ? ''
          : { dataVersion: '1.0.0', items: [{ type: 'project', name: 'B', id: '2' }] },
      ),
    }));
    // Both completions fire before any flush; the single-flight chain must serialize them so the
    // second sees the pending marker written by the first and does not double-notify.
    h.fireSync();
    h.fireSync();
    await flush();
    expect(h.send).toHaveBeenCalledTimes(1);
  });
});
