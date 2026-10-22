import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  openWebView: vi.fn(),
  getOpenWebViewDefinition: vi.fn(),
  warn: vi.fn(),
  reloadWebView: vi.fn(),
  send: vi.fn(async () => 'notification-1'),
  getLocalizedString: vi.fn(async () => 'No Text collection tab is open'),
}));
vi.mock('@papi/backend', () => ({
  default: {
    webViews: {
      openWebView: mocks.openWebView,
      reloadWebView: mocks.reloadWebView,
      getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
    },
    notifications: { send: mocks.send },
    localization: { getLocalizedString: mocks.getLocalizedString },
  },
  logger: { warn: mocks.warn, debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import {
  getProjectIdOfWebView,
  showBibleTextsTab,
  showCommentariesTab,
  showOrCreateTab,
  showTextCollectionTab,
} from './show-panel.util';

const RAISE_ONLY = { existingId: '?', createNewIfNotFound: false, bringToFront: true };

describe('showOrCreateTab', () => {
  beforeEach(() => vi.resetAllMocks());

  it('raises an open tab and neither reloads nor creates one', async () => {
    mocks.openWebView.mockResolvedValueOnce('tab-1');
    const projectIdForNewTab = vi.fn(async () => 'project-1');
    await expect(
      showOrCreateTab('platformScriptureEditor.bibleTexts', projectIdForNewTab),
    ).resolves.toBe('tab-1');
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(mocks.openWebView).toHaveBeenCalledWith(
      'platformScriptureEditor.bibleTexts',
      undefined,
      RAISE_ONLY,
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
    expect(projectIdForNewTab).not.toHaveBeenCalled();
  });

  it("creates a tab for the editor's project when none is open", async () => {
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-tab');
    await expect(
      showOrCreateTab('platformScriptureEditor.bibleTexts', async () => 'project-1'),
    ).resolves.toBe('new-tab');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformScriptureEditor.bibleTexts',
      { type: 'tab' },
      { projectId: 'project-1' },
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });
});

describe('showTextCollectionTab', () => {
  beforeEach(() => vi.resetAllMocks());

  it('raises an open Text collection tab without creating one or warning', async () => {
    mocks.openWebView.mockResolvedValueOnce('grid-1');
    await expect(showTextCollectionTab()).resolves.toBe('grid-1');
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it('creates a tab with no projectId when none is open and the feature is available', async () => {
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-grid');
    await expect(showTextCollectionTab()).resolves.toBe('new-grid');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      'platformScriptureEditor.scriptureTextGrid',
      { type: 'tab' },
      { projectId: undefined },
    );
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it('opens nothing and warns the user when the feature is unavailable', async () => {
    mocks.openWebView
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(
        new Error(
          'JSON-RPC Request error (-32603): getWebView: Cannot find Web View Provider for webview type platformScriptureEditor.scriptureTextGrid',
        ),
      );
    await expect(showTextCollectionTab()).resolves.toBeUndefined();
    expect(mocks.getLocalizedString).toHaveBeenCalledWith({
      localizeKey: '%webView_platformScriptureEditor_textCollectionNotOpen%',
    });
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
  });

  it('gives the generic warning and logs the cause when creation fails for another reason', async () => {
    mocks.openWebView
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('The window is closing'));
    await expect(showTextCollectionTab()).resolves.toBeUndefined();
    expect(mocks.getLocalizedString).toHaveBeenCalledWith({
      localizeKey: '%webView_platformScriptureEditor_tabCouldNotOpen%',
    });
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
    expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('The window is closing'));
  });

  it('still resolves undefined and does not throw when the warning notification rejects', async () => {
    mocks.openWebView
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('no provider'));
    mocks.send.mockRejectedValueOnce(new Error('notification service unavailable'));
    await expect(showTextCollectionTab()).resolves.toBeUndefined();
  });
});

describe.each([
  ['showBibleTextsTab', showBibleTextsTab, 'platformScriptureEditor.bibleTexts'],
  ['showCommentariesTab', showCommentariesTab, 'platformScriptureEditor.commentaries'],
] as const)('%s', (_name, showTab, webViewType) => {
  beforeEach(() => vi.resetAllMocks());

  it('raises its own panel type', async () => {
    mocks.openWebView.mockResolvedValueOnce('tab-1');
    await expect(showTab('editor-1')).resolves.toBe('tab-1');
    expect(mocks.openWebView).toHaveBeenCalledWith(webViewType, undefined, RAISE_ONLY);
  });

  it("creates its own panel type for the editor's project when none is open", async () => {
    mocks.openWebView.mockResolvedValueOnce(undefined).mockResolvedValueOnce('new-tab');
    mocks.getOpenWebViewDefinition.mockResolvedValueOnce({ projectId: 'project-1' });
    await expect(showTab('editor-1')).resolves.toBe('new-tab');
    expect(mocks.getOpenWebViewDefinition).toHaveBeenCalledWith('editor-1');
    expect(mocks.openWebView).toHaveBeenLastCalledWith(
      webViewType,
      { type: 'tab' },
      { projectId: 'project-1' },
    );
  });

  it('warns the user instead of rejecting when the tab cannot be shown', async () => {
    mocks.openWebView.mockRejectedValueOnce(new Error('The window is closing'));
    await expect(showTab('editor-1')).resolves.toBeUndefined();
    expect(mocks.getLocalizedString).toHaveBeenCalledWith({
      localizeKey: '%webView_platformScriptureEditor_tabCouldNotOpen%',
    });
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warning' }));
    expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('The window is closing'));
  });
});

describe('getProjectIdOfWebView', () => {
  beforeEach(() => vi.resetAllMocks());

  it('resolves undefined without asking when there is no web view id', async () => {
    await expect(getProjectIdOfWebView(undefined)).resolves.toBeUndefined();
    expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
  });

  it("resolves the web view's project id", async () => {
    mocks.getOpenWebViewDefinition.mockResolvedValueOnce({ projectId: 'project-1' });
    await expect(getProjectIdOfWebView('editor-1')).resolves.toBe('project-1');
  });

  it('warns and resolves undefined when the definition cannot be read', async () => {
    mocks.getOpenWebViewDefinition.mockRejectedValueOnce(new Error('no window answered'));
    await expect(getProjectIdOfWebView('editor-1')).resolves.toBeUndefined();
    expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('no window answered'));
  });
});
