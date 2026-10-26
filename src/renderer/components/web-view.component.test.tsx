import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { WEB_VIEW_CONTENT_TYPE } from '@shared/models/web-view.model';
import { WindowClosingError } from '@renderer/services/window-closing-error.model';
import { useData } from '@renderer/hooks/papi-hooks';
import { registerWebViewRoot } from '@renderer/services/web-view-root.registry';

const mocks = vi.hoisted(() => ({
  reloadWebView:
    vi.fn<(webViewType: string, id: string, options?: unknown) => Promise<string | undefined>>(),
  waitForWebViewProviderToRegister: vi.fn<(webViewType: string) => Promise<void>>(),
  getSavedWebViewDefinitionSync: vi.fn<(id: string) => unknown>(),
  loggerDebug: vi.fn(),
  loggerWarn: vi.fn(),
  loggerError: vi.fn(),
  setFocus: vi.fn(async () => true),
}));

// The shard is stubbed whole: these tests are about what the component makes of the shard's
// answers, and the real module pulls the entire web view service in behind it.
vi.mock('@renderer/services/web-view.service-shard', () => ({
  reloadWebView: mocks.reloadWebView,
  waitForWebViewProviderToRegister: mocks.waitForWebViewProviderToRegister,
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
  logger: {
    debug: mocks.loggerDebug,
    info: vi.fn(),
    warn: mocks.loggerWarn,
    error: mocks.loggerError,
  },
}));

// The rest of the component's import graph reaches services that connect to the network on load.
// Most of it never runs here: most of these tests call the tab loader, which builds the element
// without rendering it. The iframe suites below do render the component, so `useData` is
// configured in the top-level `beforeEach` to keep the (unshown) toolbar menu lookup from crashing.
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
vi.mock('@shared/services/window.service', () => ({
  windowService: { setFocus: mocks.setFocus },
}));

const SAVED_WEB_VIEW_ID = 'restored-view';
const SAVED_WEB_VIEW_TYPE = 'test.type';
const RESTORED_TAB: SavedTabInfo = {
  id: SAVED_WEB_VIEW_ID,
  tabType: TAB_TYPE_WEBVIEW,
  // A tab restored from a saved layout carries no content; fetching it is what the loader kicks off
  data: { id: SAVED_WEB_VIEW_ID, webViewType: SAVED_WEB_VIEW_TYPE },
};

/** Lets one zero-delay timer turn pass, e.g. the deferred close-time unmount */
async function flushTimerTurn() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  // Default to an immediate, successful wait so tests that don't care about it don't need their own
  // mock setup; the tests below that do care override this per case.
  mocks.waitForWebViewProviderToRegister.mockResolvedValue(undefined);
  // The curried useData return type is a deeply-generic object; its shape is tested in the
  // papi-hooks tests. Replicating it here would create brittle coupling.
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- necessary for mock helper flexibility
  vi.mocked(useData).mockReturnValue({
    WebViewMenu: () => [undefined, vi.fn(), false],
  } as never);
});

describe('a restored tab fetching the content it was saved without', () => {
  test('waits patiently for the provider to register before reloading', async () => {
    // A tab-restore's provider may belong to an extension that has not finished activating yet.
    // Skipping this wait, or calling reloadWebView first, would silently reintroduce the failure
    // that leaves an extension's tab stuck blank if it fails to activate within the normal 20s
    // window — see `waitForWebViewProviderToRegister`'s own doc for why the wait has to happen
    // before reloadWebView rather than inside it.
    const { loadWebViewTab } = await import('./web-view.component');
    mocks.reloadWebView.mockResolvedValue(SAVED_WEB_VIEW_ID);

    loadWebViewTab(RESTORED_TAB);

    await vi.waitFor(() =>
      expect(mocks.reloadWebView).toHaveBeenCalledWith(SAVED_WEB_VIEW_TYPE, SAVED_WEB_VIEW_ID, {
        bringToFront: false,
      }),
    );
    expect(mocks.waitForWebViewProviderToRegister).toHaveBeenCalledWith(SAVED_WEB_VIEW_TYPE);
    // Not just that both were called, but in this order — the whole point of moving the wait out
    // of reloadWebView is that it happens BEFORE the dock is ever read.
    expect(mocks.waitForWebViewProviderToRegister.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.reloadWebView.mock.invocationCallOrder[0],
    );
  });

  test('never reloads when the provider fails to register in time', async () => {
    // If the wait itself fails, reloadWebView must not run at all — there is nothing to reload a
    // dock entry into, and calling it anyway would mint a nonce/controller for a provider we just
    // gave up waiting on.
    const { loadWebViewTab } = await import('./web-view.component');
    mocks.waitForWebViewProviderToRegister.mockRejectedValue(
      new Error('Timeout reached when waiting for wait-for-net-obj to settle'),
    );

    loadWebViewTab(RESTORED_TAB);

    await vi.waitFor(() =>
      expect(mocks.loggerError).toHaveBeenCalledWith(expect.stringContaining(SAVED_WEB_VIEW_ID)),
    );
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

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

describe("the web view unmounts the React roots of its iframe's documents", () => {
  const ROOT_WEB_VIEW_ID = 'root-view';

  /**
   * Renders a web view whose iframe stands in for Chromium's: `contentWindow` and `contentDocument`
   * are `null` once the iframe is removed, and `showNewDocument` swaps in a fresh document the way
   * a tab move that re-inserts the iframe does.
   */
  async function renderWebView(webViewId = ROOT_WEB_VIEW_ID) {
    const { WebView } = await import('./web-view.component');
    const rendered = render(
      <WebView
        id={webViewId}
        webViewType="test.type"
        title="Root test view"
        content="<html></html>"
        contentType={WEB_VIEW_CONTENT_TYPE.HTML}
      />,
    );
    const iframe = rendered.container.querySelector('iframe');
    if (!iframe) throw new Error('missing iframe');
    const liveWindow = iframe.contentWindow;
    let shownDocument = iframe.contentDocument;
    // Chromium returns `null` for a removed iframe's `contentWindow` and `contentDocument`; jsdom
    // keeps them, which would let a read made after React removes the iframe pass here
    Object.defineProperty(iframe, 'contentWindow', {
      configurable: true,
      // The DOM's own value for a removed iframe, which the component must cope with
      // eslint-disable-next-line no-null/no-null
      get: () => (iframe.isConnected ? liveWindow : null),
    });
    Object.defineProperty(iframe, 'contentDocument', {
      configurable: true,
      // The DOM's own value for a removed iframe, as for `contentWindow`
      // eslint-disable-next-line no-null/no-null
      get: () => (iframe.isConnected ? shownDocument : null),
    });
    function showNewDocument(): Document {
      shownDocument = document.implementation.createHTMLDocument('');
      return shownDocument;
    }
    return { ...rendered, iframe, liveWindow, showNewDocument, webViewId };
  }

  type RenderedWebView = Awaited<ReturnType<typeof renderWebView>>;

  /**
   * Stands in for a React web view's bootstrap having run in a new document of the iframe: the
   * document publishes its own root's unmount on its `window`, which always resolves to whichever
   * document is current, and registers the root with the renderer.
   */
  function publishRootOfNewDocument(
    webView: RenderedWebView,
    unmountRoot: () => void,
    { hasUnloaded = false }: { hasUnloaded?: boolean } = {},
  ) {
    const rootDocument = webView.showNewDocument();
    if (!webView.liveWindow) throw new Error('iframe has no contentWindow');
    Object.assign(webView.liveWindow, { webViewCleanup: { unmountRoot } });
    const root = { unmountRoot, document: rootDocument, hasUnloaded };
    registerWebViewRoot(webView.webViewId, root);
    return root;
  }

  test('unmounts the previous root, and only that one, when a moved iframe reloads', async () => {
    // rc-dock moves a tab's pane within the window by re-inserting its DOM node, which reloads the
    // iframe's document while the web view (and this component) stays mounted
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();
    const unmountSecondRoot = vi.fn();

    publishRootOfNewDocument(webView, unmountFirstRoot);
    fireEvent.load(webView.iframe);
    expect(unmountFirstRoot).not.toHaveBeenCalled();

    publishRootOfNewDocument(webView, unmountSecondRoot);
    fireEvent.load(webView.iframe);

    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
    expect(unmountSecondRoot).not.toHaveBeenCalled();
  });

  test('unmounts the root of a document replaced before it ever loaded', async () => {
    // A second move before the first replacement document fires `load` drops that document's own
    // unload-time unmount with its realm, and the load that does fire belongs to the third document
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();
    const unmountMiddleRoot = vi.fn();
    const unmountLastRoot = vi.fn();

    // The first document loaded and ran its unload handlers, so only the middle one could warn
    publishRootOfNewDocument(webView, unmountFirstRoot, { hasUnloaded: true });
    fireEvent.load(webView.iframe);
    publishRootOfNewDocument(webView, unmountMiddleRoot);
    publishRootOfNewDocument(webView, unmountLastRoot);
    fireEvent.load(webView.iframe);

    expect(unmountMiddleRoot).toHaveBeenCalledTimes(1);
    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
    expect(unmountLastRoot).not.toHaveBeenCalled();
    // The middle document never loaded, so it never saw `pagehide` and may never see `unload`;
    // that is not a missing unload to warn about
    expect(mocks.loggerWarn).not.toHaveBeenCalled();
  });

  test('warns when a replaced document loaded and never ran its unload handlers', async () => {
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();

    publishRootOfNewDocument(webView, unmountFirstRoot, { hasUnloaded: false });
    fireEvent.load(webView.iframe);
    publishRootOfNewDocument(webView, vi.fn());
    fireEvent.load(webView.iframe);

    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
    expect(mocks.loggerWarn).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`unload[\\s\\S]*never ran[\\s\\S]*${ROOT_WEB_VIEW_ID}`)),
    );
  });

  test('does not warn when a replaced document ran its unload handlers', async () => {
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();

    publishRootOfNewDocument(webView, unmountFirstRoot, { hasUnloaded: true });
    fireEvent.load(webView.iframe);
    const unmountSecondRoot = vi.fn();
    publishRootOfNewDocument(webView, unmountSecondRoot);
    fireEvent.load(webView.iframe);

    // The replaced root is still unmounted here (a second unmount is a no-op for a real root)
    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
    expect(mocks.loggerWarn).not.toHaveBeenCalled();
  });

  test('leaves alone a root registered for a document this web view does not show', async () => {
    // Two components can carry the same web view id; each owns only the roots of its own iframe
    const first = await renderWebView();
    const second = await renderWebView();
    const unmountFirstViewRoot = vi.fn();
    const unmountSecondViewRoot = vi.fn();

    publishRootOfNewDocument(first, unmountFirstViewRoot);
    publishRootOfNewDocument(second, unmountSecondViewRoot);
    fireEvent.load(first.iframe);
    fireEvent.load(second.iframe);
    // Replace the first view's document: only its own root may be unmounted by its load
    publishRootOfNewDocument(first, vi.fn());
    fireEvent.load(first.iframe);

    expect(unmountFirstViewRoot).toHaveBeenCalledTimes(1);
    expect(unmountSecondViewRoot).not.toHaveBeenCalled();

    // A second view's load must not unmount the first view's current root either
    fireEvent.load(second.iframe);
    expect(unmountSecondViewRoot).not.toHaveBeenCalled();
  });

  test('ignores a root whose document no web view shows', async () => {
    await renderWebView();
    const unmountRoot = vi.fn();

    registerWebViewRoot(ROOT_WEB_VIEW_ID, {
      unmountRoot,
      document: document.implementation.createHTMLDocument(''),
      hasUnloaded: false,
    });

    expect(unmountRoot).not.toHaveBeenCalled();
    expect(mocks.loggerDebug).toHaveBeenCalledWith(expect.stringContaining(ROOT_WEB_VIEW_ID));
  });

  test('leaves the live root mounted when the same document reports a second load', async () => {
    const webView = await renderWebView();
    const unmountRoot = vi.fn();

    publishRootOfNewDocument(webView, unmountRoot);
    fireEvent.load(webView.iframe);
    fireEvent.load(webView.iframe);

    expect(unmountRoot).not.toHaveBeenCalled();
  });

  test('unmounts the root of the document still shown when the web view closes', async () => {
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();
    const unmountSecondRoot = vi.fn();
    publishRootOfNewDocument(webView, unmountFirstRoot);
    fireEvent.load(webView.iframe);
    publishRootOfNewDocument(webView, unmountSecondRoot);
    fireEvent.load(webView.iframe);

    webView.unmount();
    // The close-time unmount is deferred a timer turn so it never lands inside React's commit
    await flushTimerTurn();

    expect(unmountSecondRoot).toHaveBeenCalledTimes(1);
    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
  });

  test('unmounts every root it holds when the web view closes', async () => {
    const webView = await renderWebView();
    const unmountRoots = [vi.fn(), vi.fn(), vi.fn()];
    publishRootOfNewDocument(webView, unmountRoots[0]);
    fireEvent.load(webView.iframe);
    // Neither of these documents ever loads
    publishRootOfNewDocument(webView, unmountRoots[1]);
    publishRootOfNewDocument(webView, unmountRoots[2]);

    webView.unmount();
    // The close-time unmount is deferred a timer turn so it never lands inside React's commit
    expect(unmountRoots[1]).not.toHaveBeenCalled();
    await flushTimerTurn();

    unmountRoots.forEach((unmountRoot) => expect(unmountRoot).toHaveBeenCalledTimes(1));
  });

  test('unmounts the current document root when the web view closes before that document loads', async () => {
    // A reload or move replaces the document; closing the tab before the new document's load leaves
    // the new document's own unmount dropped with its realm
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn();
    const unmountSecondRoot = vi.fn();
    publishRootOfNewDocument(webView, unmountFirstRoot);
    fireEvent.load(webView.iframe);
    publishRootOfNewDocument(webView, unmountSecondRoot);

    webView.unmount();
    // The close-time unmount is deferred a timer turn so it never lands inside React's commit
    expect(unmountSecondRoot).not.toHaveBeenCalled();
    await flushTimerTurn();

    expect(unmountSecondRoot).toHaveBeenCalledTimes(1);
    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
  });

  test('unmounts the root of a document that never loaded when the web view closes', async () => {
    const webView = await renderWebView();
    const unmountRoot = vi.fn();
    publishRootOfNewDocument(webView, unmountRoot);

    webView.unmount();
    await flushTimerTurn();

    expect(unmountRoot).toHaveBeenCalledTimes(1);
  });

  test("still keeps the new document's root when unmounting the replaced one throws", async () => {
    const webView = await renderWebView();
    const unmountFirstRoot = vi.fn(() => {
      throw new Error('replaced root failed to unmount');
    });
    const unmountSecondRoot = vi.fn();
    publishRootOfNewDocument(webView, unmountFirstRoot);
    fireEvent.load(webView.iframe);
    publishRootOfNewDocument(webView, unmountSecondRoot);
    fireEvent.load(webView.iframe);

    expect(unmountFirstRoot).toHaveBeenCalledTimes(1);
    expect(mocks.loggerWarn).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`${ROOT_WEB_VIEW_ID}[\\s\\S]*replaced root failed`)),
    );

    // The new document's root was kept despite the throw, so closing unmounts it
    webView.unmount();
    await flushTimerTurn();
    expect(unmountSecondRoot).toHaveBeenCalledTimes(1);
  });
});

describe('the iframe asks for its tab to be focused when it loads', () => {
  const FOCUS_WEB_VIEW_ID = 'focus-view';

  /**
   * Renders a web view and loads its iframe with the given client rects. rc-dock keeps an inactive
   * tab's pane mounted with `display: none`, which leaves the iframe with no client rects; jsdom
   * lays nothing out, so the rects are stubbed to stand in for the pane being shown or hidden.
   */
  async function loadIframe(clientRectCount: number) {
    const { WebView } = await import('./web-view.component');
    const { container } = render(
      <WebView
        id={FOCUS_WEB_VIEW_ID}
        webViewType="test.type"
        title="Focus test view"
        content=""
        contentType={WEB_VIEW_CONTENT_TYPE.HTML}
      />,
    );
    const iframe = container.querySelector('iframe');
    if (!iframe) throw new Error('missing iframe');
    vi.spyOn(iframe, 'getClientRects').mockReturnValue(
      // A DOMRectList is array-like; only its length is read.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { length: clientRectCount } as unknown as DOMRectList,
    );
    fireEvent.load(iframe);
  }

  test('focuses the tab when the iframe loads in a tab that is shown', async () => {
    await loadIframe(1);

    await vi.waitFor(() =>
      expect(mocks.setFocus).toHaveBeenCalledWith({ focusType: 'tab', id: FOCUS_WEB_VIEW_ID }),
    );
  });

  test('leaves the tab where it is when the iframe loads in a tab that is hidden', async () => {
    // A background reload (`bringToFront: false`) remounts the iframe of a tab that is not in front
    // of its group. Focusing that tab would make it the active one, undoing the opt-out.
    await loadIframe(0);

    // Give the load effect's async focus call the same chance to run that the test above waits for
    await vi.waitFor(() => expect(applyContentZoomForWebView).toHaveBeenCalled());
    await flushTimerTurn();
    expect(mocks.setFocus).not.toHaveBeenCalled();
  });
});

describe('updateWebViewTab', () => {
  test('carries isIconMonochrome onto the tab as isTabIconMonochrome', async () => {
    const { updateWebViewTab } = await import('./web-view.component');

    const tab = updateWebViewTab(RESTORED_TAB, {
      id: SAVED_WEB_VIEW_ID,
      webViewType: SAVED_WEB_VIEW_TYPE,
      contentType: WEB_VIEW_CONTENT_TYPE.REACT,
      content: '',
      iconUrl: 'a.svg',
      isIconMonochrome: true,
    });

    expect(tab.tabIconUrl).toBe('a.svg');
    expect(tab.isTabIconMonochrome).toBe(true);
  });
});
