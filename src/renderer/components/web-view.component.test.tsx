import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';

const mocks = vi.hoisted(() => ({
  reloadWebView:
    vi.fn<(webViewType: string, id: string, options?: unknown) => Promise<string | undefined>>(),
  getSavedWebViewDefinitionSync: vi.fn<(id: string) => unknown>(),
  loggerDebug: vi.fn(),
  loggerError: vi.fn(),
}));

// The shard is stubbed whole: these tests are about what the component makes of the shard's
// answers, and the real module pulls the entire web view service in behind it.
vi.mock('@renderer/services/web-view.service-shard', () => ({
  reloadWebView: mocks.reloadWebView,
  getSavedWebViewDefinitionSync: mocks.getSavedWebViewDefinitionSync,
  convertWebViewDefinitionToSaved: vi.fn((webViewDefinition: unknown) => webViewDefinition),
  saveTabInfoBase: vi.fn((tabInfo: unknown) => tabInfo),
  updateWebViewDefinitionSync: vi.fn(() => true),
  isWebViewNonceCorrect: vi.fn(() => true),
  updateTabPartialSync: vi.fn(() => true),
  IFRAME_SANDBOX_ALLOW_SAME_ORIGIN: 'allow-same-origin',
  IFRAME_SANDBOX_ALLOW_SCRIPTS: 'allow-scripts',
  IFRAME_SANDBOX_ALLOW_POPUPS: 'allow-popups',
  WEBVIEW_IFRAME_SRC_SANDBOX: '',
  WEBVIEW_IFRAME_SRCDOC_SANDBOX: '',
}));

// Factory rather than the repo's automock (whose methods are plain functions): which level a
// missing reload is reported at is the whole of what these tests assert, which needs spies
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: mocks.loggerDebug, info: vi.fn(), warn: vi.fn(), error: mocks.loggerError },
}));

// The rest of the component's import graph reaches services that connect to the network on load.
// None of it runs here: these tests call the tab loader, which builds the element without
// rendering it.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(),
  useLocalizedStrings: vi.fn(() => [{}]),
  useProjectSetting: vi.fn(() => ['', vi.fn(), vi.fn(), false]),
  useScrollGroupScrRef: vi.fn(() => [undefined, vi.fn(), 0, vi.fn(), undefined]),
  useRecentScriptureRefs: vi.fn(() => ({
    recentScriptureRefs: [],
    addRecentScriptureRef: vi.fn(),
  })),
}));
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({ useIsPowerMode: vi.fn(() => true) }));
vi.mock('@renderer/services/scroll-group.service', () => ({ availableScrollGroupIds: [1, 2, 3] }));
vi.mock('@renderer/services/book-chapter-control.registry', () => ({
  registerBookChapterControlHandle: vi.fn(() => vi.fn()),
}));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  registerRequestHandler: vi.fn(async () => async () => true),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));
vi.mock('@shared/data/platform-bible-menu.commands', () => ({ handleMenuCommand: vi.fn() }));
vi.mock('@shared/services/menu-data.service', () => ({ menuDataService: {} }));
vi.mock('@shared/services/window.service', () => ({ windowService: {} }));

const SAVED_WEB_VIEW_ID = 'restored-view';
const SAVED_WEB_VIEW_TYPE = 'test.type';
const RESTORED_TAB: SavedTabInfo = {
  id: SAVED_WEB_VIEW_ID,
  tabType: TAB_TYPE_WEBVIEW,
  // A tab restored from a saved layout carries no content; fetching it is what the loader kicks off
  data: { id: SAVED_WEB_VIEW_ID, webViewType: SAVED_WEB_VIEW_TYPE },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('a restored tab fetching the content it was saved without', () => {
  test('says nothing louder than debug when the web view left the dock while it fetched', async () => {
    // The reload answers `undefined` for a web view that is no longer in this window's dock — a
    // layout load that took the dock wholesale while the tab was still fetching, or the tab being
    // dragged into another window. Whatever took it disposed what backed it, so there is nothing
    // here to report and nothing left to fix.
    const { loadWebViewTab } = await import('./web-view.component');
    mocks.reloadWebView.mockResolvedValue(undefined);
    mocks.getSavedWebViewDefinitionSync.mockReturnValue(undefined);

    loadWebViewTab(RESTORED_TAB);

    await vi.waitFor(() =>
      expect(mocks.loggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(SAVED_WEB_VIEW_ID)),
      ),
    );
    expect(mocks.loggerError).not.toHaveBeenCalled();
  });

  test('reports a provider that left a docked tab without content as an error', async () => {
    // The control for the level above: the same `undefined`, but this web view's tab is still here.
    // Its provider declined to supply content, so the tab is left waiting on content that is never
    // coming — a failure, and one only this log will ever mention.
    const { loadWebViewTab } = await import('./web-view.component');
    mocks.reloadWebView.mockResolvedValue(undefined);
    mocks.getSavedWebViewDefinitionSync.mockReturnValue({
      id: SAVED_WEB_VIEW_ID,
      webViewType: SAVED_WEB_VIEW_TYPE,
    });

    loadWebViewTab(RESTORED_TAB);

    // Matching the phrase this branch produces, not just the id: the catch that logs this
    // serializes the whole tab, so an id on its own is in the message whatever went wrong — a
    // mock-shaped type error would satisfy it just as well as the branch under test.
    await vi.waitFor(() =>
      expect(mocks.loggerError).toHaveBeenCalledWith(
        expect.stringMatching(
          new RegExp(`${SAVED_WEB_VIEW_ID}[\\s\\S]*returned undefined when reloading`),
        ),
      ),
    );
  });
});
