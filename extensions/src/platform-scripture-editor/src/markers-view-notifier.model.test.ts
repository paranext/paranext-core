import type papi from '@papi/backend';
import type { ExecutionToken, SavedWebViewDefinition } from '@papi/core';
import { MarkersViewNotifier } from './markers-view-notifier.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

vi.mock('@papi/backend', () => ({
  default: {},
  logger: { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

type OpenListener = (event: { webView: SavedWebViewDefinition }) => unknown;

/** Types a partial test double as the full type the code under test expects. */
function asMock<T>(partial: unknown): T {
  // A partial double cannot satisfy the full type; the code under test reads only what is provided.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return partial as T;
}

function setup(interfaceMode: string) {
  const listeners: OpenListener[] = [];
  const send = vi.fn().mockResolvedValue('notification-1');
  const mockPapi = {
    storage: { readUserData: vi.fn().mockResolvedValue('{}'), writeUserData: vi.fn() },
    commands: { registerCommand: vi.fn().mockResolvedValue({ dispose: vi.fn() }) },
    webViews: {
      onDidOpenWebView: vi.fn((listener: OpenListener) => {
        listeners.push(listener);
        return vi.fn();
      }),
      onDidUpdateWebView: vi.fn(() => vi.fn()),
    },
    settings: { get: vi.fn().mockResolvedValue(interfaceMode) },
    projectDataProviders: {
      get: vi.fn().mockResolvedValue({ getSetting: vi.fn().mockResolvedValue('Project') }),
    },
    localization: { getLocalizedStrings: vi.fn().mockResolvedValue({}) },
    notifications: { send },
  };
  const notifier = new MarkersViewNotifier(
    asMock<typeof papi>(mockPapi),
    asMock<ExecutionToken>({}),
  );
  return { notifier, listeners, send };
}

function editorWebView(viewType: string): SavedWebViewDefinition {
  return asMock<SavedWebViewDefinition>({
    id: 'web-view-1',
    webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    projectId: 'project-1',
    state: { viewType },
  });
}

describe('MarkersViewNotifier', () => {
  it('notifies that the markers view is read-only in Power mode', async () => {
    const { notifier, listeners, send } = setup('power');
    await notifier.start();
    await listeners[0]({ webView: editorWebView('markers') });
    expect(send).toHaveBeenCalledTimes(1);
  });

  it.each(['simple', 'unexpected'])(
    'does not notify about a saved markers view in %s mode, where it displays as formatted',
    async (mode) => {
      const { notifier, listeners, send } = setup(mode);
      await notifier.start();
      await listeners[0]({ webView: editorWebView('markers') });
      expect(send).not.toHaveBeenCalled();
    },
  );

  it('does not notify for other views in Power mode', async () => {
    const { notifier, listeners, send } = setup('power');
    await notifier.start();
    await listeners[0]({ webView: editorWebView('standard') });
    expect(send).not.toHaveBeenCalled();
  });
});
