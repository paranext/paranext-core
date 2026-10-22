import type papi from '@papi/backend';
import type { ExecutionToken, SavedWebViewDefinition } from '@papi/core';
import { ReadOnlyViewNotifier } from './read-only-view-notifier.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

vi.mock('@papi/backend', () => ({
  default: {},
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

type WebViewListener = (event: { webView: SavedWebViewDefinition }) => unknown;

const MESSAGE_KEY = '%platformScriptureEditor_previewView_readonly_message_format%';
const DISMISS_KEY = '%platformScriptureEditor_previewView_readonly_dismiss%';

/** Longer than the notifier's per-project throttle */
const PAST_THROTTLE_MS = 9 * 1000;

/** Types a partial test double as the full type the code under test expects. */
function asMock<T>(partial: unknown): T {
  // A partial double cannot satisfy the full type; the code under test reads only what is provided.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return partial as T;
}

function setup(interfaceMode = 'power', canUserEditScripture = true) {
  const openListeners: WebViewListener[] = [];
  const updateListeners: WebViewListener[] = [];
  const closeListeners: WebViewListener[] = [];
  const send = vi.fn().mockResolvedValue('notification-1');
  const settingsGet = vi.fn().mockResolvedValue(interfaceMode);
  const canUserEditScriptureMock = vi.fn().mockResolvedValue(canUserEditScripture);
  const registerCommand = vi.fn().mockResolvedValue({ dispose: vi.fn() });
  const getLocalizedStrings = vi.fn().mockResolvedValue({
    [MESSAGE_KEY]: 'Preview of {projectName} is read-only.',
    [DISMISS_KEY]: 'Dismiss',
  });
  const projectDataProvidersGet = vi.fn(async (pdpType: string) =>
    pdpType === 'platformScripture.scriptureEditPermissions'
      ? { canUserEditScripture: canUserEditScriptureMock }
      : { getSetting: vi.fn().mockResolvedValue('Project') },
  );
  const capture = (listeners: WebViewListener[]) =>
    vi.fn((listener: WebViewListener) => {
      listeners.push(listener);
      return vi.fn();
    });
  const mockPapi = {
    storage: { readUserData: vi.fn().mockResolvedValue('{}'), writeUserData: vi.fn() },
    commands: { registerCommand },
    webViews: {
      onDidOpenWebView: capture(openListeners),
      onDidUpdateWebView: capture(updateListeners),
      onDidCloseWebView: capture(closeListeners),
    },
    settings: { get: settingsGet },
    projectDataProviders: { get: projectDataProvidersGet },
    localization: { getLocalizedStrings },
    notifications: { send },
  };
  const notifier = new ReadOnlyViewNotifier(
    asMock<typeof papi>(mockPapi),
    asMock<ExecutionToken>({}),
  );
  return {
    notifier,
    open: (webView: SavedWebViewDefinition) => openListeners[0]({ webView }),
    update: (webView: SavedWebViewDefinition) => updateListeners[0]({ webView }),
    close: (webView: SavedWebViewDefinition) => closeListeners[0]({ webView }),
    send,
    settingsGet,
    projectDataProvidersGet,
    getLocalizedStrings,
    dismiss: (notificationId: string) => registerCommand.mock.calls[0][1](notificationId),
  };
}

function editorWebView(
  viewType: string,
  { id = 'web-view-1', isReadOnly }: { id?: string; isReadOnly?: boolean } = {},
): SavedWebViewDefinition {
  return asMock<SavedWebViewDefinition>({
    id,
    webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    projectId: 'project-1',
    state: { viewType, isReadOnly },
  });
}

describe('ReadOnlyViewNotifier', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-22T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('announces read-only Preview for an editable project in Power', async () => {
    const { notifier, open, send } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Preview of Project is read-only.',
        clickCommandLabel: 'Dismiss',
        webViewId: 'web-view-1',
      }),
    );
  });

  it('uses the Preview message and dismiss keys', async () => {
    const { notifier, open, getLocalizedStrings } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    expect(getLocalizedStrings).toHaveBeenCalledWith({ localizeKeys: [MESSAGE_KEY, DISMISS_KEY] });
  });

  it.each(['simple', 'unexpected'])(
    'stays silent about the formatted view in %s mode',
    async (mode) => {
      const { notifier, open, send } = setup(mode);
      await notifier.start();
      await open(editorWebView('formatted'));
      expect(send).not.toHaveBeenCalled();
    },
  );

  it('stays silent about a saved markers view, which shows as Standard view', async () => {
    const { notifier, open, send } = setup('power');
    await notifier.start();
    await open(editorWebView('markers'));
    expect(send).not.toHaveBeenCalled();
  });

  it('stays silent for a read-only project', async () => {
    const { notifier, open, send } = setup();
    await notifier.start();
    await open(editorWebView('formatted', { isReadOnly: true }));
    expect(send).not.toHaveBeenCalled();
  });

  it('stays silent for a user who may not edit Scripture', async () => {
    const { notifier, open, send } = setup('power', false);
    await notifier.start();
    await open(editorWebView('formatted'));
    expect(send).not.toHaveBeenCalled();
  });

  it('announces anyway when the edit-permission lookup fails', async () => {
    const { notifier, open, send, projectDataProvidersGet } = setup();
    projectDataProvidersGet.mockImplementation(async (pdpType: string) => {
      if (pdpType === 'platformScripture.scriptureEditPermissions') throw new Error('no such PDP');
      return { getSetting: vi.fn().mockResolvedValue('Project') };
    });
    await notifier.start();
    await open(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('does not announce again while the editor stays in Preview', async () => {
    const { notifier, open, update, send } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    vi.advanceTimersByTime(PAST_THROTTLE_MS);
    await update(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('announces again after the editor leaves and re-enters Preview', async () => {
    const { notifier, open, update, send } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    await update(editorWebView('standard'));
    vi.advanceTimersByTime(PAST_THROTTLE_MS);
    await update(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('announces again after a mode flip back to Power', async () => {
    const { notifier, open, update, send, settingsGet } = setup('power');
    await notifier.start();
    await open(editorWebView('formatted'));
    settingsGet.mockResolvedValue('simple');
    await update(editorWebView('formatted'));
    settingsGet.mockResolvedValue('power');
    vi.advanceTimersByTime(PAST_THROTTLE_MS);
    await update(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('throttles a second editor of the same project, and one dismiss covers both', async () => {
    const { notifier, open, update, send, dismiss } = setup();
    await notifier.start();
    await open(editorWebView('formatted', { id: 'web-view-1' }));
    await open(editorWebView('formatted', { id: 'web-view-2' }));
    expect(send).toHaveBeenCalledTimes(1);

    await dismiss('notification-1');
    vi.advanceTimersByTime(PAST_THROTTLE_MS);
    await update(editorWebView('standard', { id: 'web-view-1' }));
    await update(editorWebView('standard', { id: 'web-view-2' }));
    await update(editorWebView('formatted', { id: 'web-view-1' }));
    await update(editorWebView('formatted', { id: 'web-view-2' }));
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('announces again after the 24 hour dismiss expires', async () => {
    const { notifier, open, update, send, dismiss } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    await dismiss('notification-1');
    await update(editorWebView('standard'));
    vi.advanceTimersByTime(23 * 60 * 60 * 1000);
    await update(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(1);

    await update(editorWebView('standard'));
    vi.advanceTimersByTime(2 * 60 * 60 * 1000);
    await update(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('forgets a closed web view', async () => {
    const { notifier, open, close, send } = setup();
    await notifier.start();
    await open(editorWebView('formatted'));
    await close(editorWebView('formatted'));
    vi.advanceTimersByTime(PAST_THROTTLE_MS);
    await open(editorWebView('formatted'));
    expect(send).toHaveBeenCalledTimes(2);
  });
});
