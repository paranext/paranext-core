import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type {
  Layout,
  LayoutInfo,
  PapiDockLayout,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import type {
  SavedWebViewDefinition,
  WebViewDefinition,
  WebViewId,
} from '@shared/models/web-view.model';

// The service shard logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

const mocks = vi.hoisted(() => ({
  settingsGet: vi.fn(),
  settingsSubscribe: vi.fn<
    (
      key: string,
      callback: (newSetting: unknown) => Promise<void>,
    ) => Promise<() => Promise<boolean>>
  >(async () => async () => true),
  networkRequest: vi.fn(),
  bufferedEmitters: new Map<string, { emit: ReturnType<typeof vi.fn> }>(),
  loggerDebug: vi.fn(),
}));

// Same file-level mock set as `web-view.service-shard.test.ts` — this file imports the same
// module, which still needs its whole dependency graph stubbed to import cleanly, even though
// these tests never exercise most of it.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: { tabs: [] },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet, subscribe: mocks.settingsSubscribe },
}));
// Factory rather than the repo's automock (whose methods are plain functions): these tests assert
// on the debug line the skipped load leaves behind, which needs a spy
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: mocks.loggerDebug, info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn(), dispose: vi.fn() };
    mocks.bufferedEmitters.set(eventName, emitter);
    return emitter;
  },
  getNetworkEvent: () => vi.fn(),
  request: mocks.networkRequest,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));
vi.mock('@shared/services/web-view-provider.service', () => ({ webViewProviderService: {} }));
vi.mock('@renderer/services/theme.service', () => ({ localThemeService: {} }));
vi.mock('@renderer/services/web-view-state.service', () => ({
  deleteFullWebViewStateById: vi.fn(),
  getFullWebViewStateById: vi.fn(),
  setFullWebViewStateById: vi.fn(),
}));
vi.mock('@renderer/components/settings-tabs/settings-tab.component', () => ({
  TAB_TYPE_SETTINGS_TAB: 'settings-tab',
}));
vi.mock('@renderer/services/usersnap.service', () => ({
  closeOpenUsersnapForm: vi.fn(),
  isUsersnapFormCurrentlyOpen: vi.fn(),
  openUsersnapForm: vi.fn(),
  USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: '',
  USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: '',
}));

// Mock dock layouts and the published shard object both cross the shared model's opaque
// `LayoutInfo`/`PapiDockLayout` boundary, the same reason `web-view.service-shard.test.ts` disables
// this rule file-wide rather than per cast.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Layout with no tab anywhere */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** Narrow view of the published shard covering only the adopt method these tests drive */
type AdoptShard = {
  adoptWebView(savedWebViewDefinition: SavedWebViewDefinition): Promise<WebViewId | undefined>;
};

/**
 * Dock layout stand-in whose web view list is live: web views added through `addWebViewToDock` show
 * up in `getAllWebViewDefinitions`, the way the real dock's do, so the initial load's view of the
 * dock changes when an adopt lands mid-load. Whole-layout loads are recorded rather than
 * interpreted — a recorded load IS the dock being replaced, which is what these tests assert on.
 */
function makeLiveDockLayout() {
  const loadedLayouts: LayoutInfo[] = [];
  const dockedWebViews: WebViewDefinition[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [...dockedWebViews],
    getWebViewDefinition: (webViewId: string) =>
      dockedWebViews.find((webView) => webView.id === webViewId),
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      dockedWebViews.push(webView);
      return layout;
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts, dockedWebViews };
}

/** Stub the web view provider (and the theme it needs) so `adoptWebView`'s open path can run */
async function primeProvider() {
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them — same reasoning as the equivalent stubs in `web-view.service-shard.test.ts`.
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({
      getWebView: async (saved: SavedWebViewDefinition) => ({
        id: saved.id,
        webViewType: saved.webViewType,
        contentType: 'html',
        content: '<p>moved</p>',
      }),
    }),
  );
  (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
    cssVariables: {},
  }));
}

/**
 * Register the shard over a live dock layout while `windowLayout:get` hangs until the test releases
 * it — the retrying initial load in flight, exactly the window an adopt can land in.
 */
async function registerWithHangingLayoutGet() {
  let releaseLayoutGet: (response: unknown) => void = () => {};
  mocks.networkRequest.mockImplementation(
    async (requestType: string) =>
      new Promise((resolve) => {
        if (requestType === 'windowLayout:get') releaseLayoutGet = resolve;
        else resolve(undefined);
      }),
  );

  const module = await import('@renderer/services/web-view.service-shard');
  const { networkObjectService } = await import('@shared/services/network-object.service');
  const { dockLayout, loadedLayouts, dockedWebViews } = makeLiveDockLayout();
  module.registerDockLayout(dockLayout);
  await module.startWebViewServiceShard();
  await primeProvider();
  // The initial load has to have asked for the saved layout before the test releases the answer
  await vi.waitFor(() =>
    expect(
      mocks.networkRequest.mock.calls.some(([requestType]) => requestType === 'windowLayout:get'),
    ).toBe(true),
  );

  const [, shard] = vi.mocked(networkObjectService.set).mock.calls[0];
  return {
    shard: shard as unknown as AdoptShard,
    loadedLayouts,
    dockedWebViews,
    releaseLayoutGet: (response: unknown) => releaseLayoutGet(response),
  };
}

/** The buffered close-event emitter the shard created, for asserting nothing was closed */
function getCloseEmitter() {
  const closeEmitter = [...mocks.bufferedEmitters.entries()].find(([name]) =>
    /close/i.test(name),
  )?.[1];
  if (!closeEmitter) throw new Error('close emitter was never created');
  return closeEmitter;
}

// Starting the shard deletes `globalThis.open` so web views cannot make popups. That is a one-way
// change to the real `window`, which these tests share across every re-import.
const openWindow = globalThis.open;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.bufferedEmitters.clear();
  globalThis.open = openWindow;
  localStorage.clear();
  globalThis.windowId = '7';
  mocks.settingsGet.mockImplementation(async (key: string) =>
    key === 'platform.interfaceMode' ? 'power' : false,
  );
});

describe('the initial layout load against a dock that gained content mid-load', () => {
  test('a late initial answer does not wipe an adopted web view or emit close events', async () => {
    const { shard, loadedLayouts, dockedWebViews, releaseLayoutGet } =
      await registerWithHangingLayoutGet();

    const adoptedId = await shard.adoptWebView({ id: 'moved-view', webViewType: 'test.type' });
    expect(adoptedId).toBe('moved-view');

    // The initial load's (late, possibly retried) answer lands only now, after the adopt
    releaseLayoutGet({ kind: 'pending-content' });

    await vi.waitFor(() =>
      expect(mocks.loggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(/dropping a layout load/i),
      ),
    );
    // The stale answer was never applied: the dock was not replaced, the adopted web view is still
    // there, and no close event fired for it
    expect(loadedLayouts).toEqual([]);
    expect(dockedWebViews.map((webView) => webView.id)).toEqual(['moved-view']);
    expect(getCloseEmitter().emit).not.toHaveBeenCalled();
  });

  test('the initial answer still applies when nothing arrived while it was in flight', async () => {
    const { loadedLayouts, releaseLayoutGet } = await registerWithHangingLayoutGet();

    releaseLayoutGet({ kind: 'pending-content' });

    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));
    expect(getCloseEmitter().emit).not.toHaveBeenCalled();
  });
});
