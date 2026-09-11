import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { WEB_VIEW_CONTENT_TYPE } from '@shared/models/web-view.model';
import { WindowClosingError } from '@renderer/services/window-closing-error.model';
import { useData } from '@renderer/hooks/papi-hooks';

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

// Stubbed whole: most of these tests never render an iframe (they call the tab loader directly),
// so the load/unmount hooks that reach this service never run for them, and the real module pulls
// the shard, settings, and project lookup in behind it. The iframe-lifecycle suite below renders
// the component and asserts on these mocks directly.
vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  applyContentZoomForWebView: vi.fn(),
  forgetContentZoom: vi.fn(),
}));
// The mocked content-zoom functions above, so the render test below can assert directly on them.
// eslint-disable-next-line import/first
import {
  applyContentZoomForWebView,
  forgetContentZoom,
} from '@renderer/services/web-view-content-zoom.service';

// Factory rather than the repo's automock (whose methods are plain functions): which level a
// missing reload is reported at is the whole of what these tests assert, which needs spies
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: mocks.loggerDebug, info: vi.fn(), warn: vi.fn(), error: mocks.loggerError },
}));

// The rest of the component's import graph reaches services that connect to the network on load.
// Most of it never runs here: most of these tests call the tab loader, which builds the element
// without rendering it. The iframe-lifecycle suite below does render the component, so it
// configures `useData` itself to keep the (unshown) toolbar menu lookup from crashing.
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

  test('says nothing louder than debug when the window refused the reload because it is closing', async () => {
    // A window that has been told it is closing refuses in-flight reloads. That refusal is an
    // ordinary part of closing, so it must not reach the error level the catch otherwise uses — it
    // arrives there with the whole tab serialized into the message, which reads like a defect worth
    // chasing.
    const { loadWebViewTab } = await import('./web-view.component');
    mocks.reloadWebView.mockRejectedValue(
      new WindowClosingError(
        `web-view.service-shard: window 2 cannot reload web view ${SAVED_WEB_VIEW_ID}: the main process has told this window that it is closing.`,
      ),
    );

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

describe('the iframe lifecycle notifies content zoom', () => {
  const CONTENT_ZOOM_WEB_VIEW_ID = 'zoom-view';

  beforeEach(() => {
    // The curried useData return type is a deeply-generic object; its shape is tested in the
    // papi-hooks tests. Replicating it here would create brittle coupling.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- necessary for mock helper flexibility
    vi.mocked(useData).mockReturnValue({
      WebViewMenu: () => [undefined, vi.fn(), false],
    } as never);
  });

  test('applies content zoom when the iframe loads, and forgets it on unmount', async () => {
    const { WebView } = await import('./web-view.component');
    const { container, unmount } = render(
      <WebView
        id={CONTENT_ZOOM_WEB_VIEW_ID}
        webViewType="test.type"
        title="Zoom test view"
        content=""
        contentType={WEB_VIEW_CONTENT_TYPE.HTML}
      />,
    );
    const iframe = container.querySelector('iframe');
    if (!iframe) throw new Error('missing iframe');

    fireEvent.load(iframe);
    expect(applyContentZoomForWebView).toHaveBeenCalledWith(CONTENT_ZOOM_WEB_VIEW_ID);

    unmount();
    expect(forgetContentZoom).toHaveBeenCalledWith(CONTENT_ZOOM_WEB_VIEW_ID);
  });
});
