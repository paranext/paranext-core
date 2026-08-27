import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type {
  Layout,
  LayoutInfo,
  PapiDockLayout,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';

/**
 * Pins that a `'float'` layout passes through this window's shard exactly the way it always has:
 * `openWebView` hands the layout to `addWebViewToDock` untouched (`floatSize`/`position` included),
 * and `floatTab` still floats an existing tab by id. Neither of those code paths gained a rung of
 * its own from the branch's `'window'`-layout or cross-window additions — this file re-asserts that
 * against a mutation, not just describes it.
 */

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
}));

// Same file-level mock set as `web-view.service-shard.move.test.ts` — this file imports the same
// module, which still needs its whole dependency graph stubbed to import cleanly, even though these
// tests never exercise most of it.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: { tabs: [] },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet, subscribe: mocks.settingsSubscribe },
}));
vi.mock('@shared/services/logger.service');
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

// Mock dock layouts cross the shared model's opaque `LayoutInfo`/`PapiDockLayout` boundary, the same
// reason `web-view.service-shard.test.ts` and `.move.test.ts` disable this rule file-wide.
/* eslint-disable no-type-assertion/no-type-assertion */

/**
 * Layout with no tab anywhere — good enough for `loadLayout`'s background work, which these tests
 * don't assert on
 */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** One recorded call to `addWebViewToDock`: the web view and the layout it was asked to place it in */
type AddWebViewToDockCall = { webView: WebViewTabProps; layout: Layout };

/**
 * A dock layout stand-in that records `addWebViewToDock` and `floatTabById` calls without
 * validating their arguments — matching the harness's other dock-layout stand-ins (e.g.
 * `move.test.ts`'s `shardOverDockLayout`), which keep the fixture loose so the tests stay about
 * what the shard does with what it is handed, not about a stand-in re-implementing rc-dock.
 */
function makeFloatTrackingDockLayout() {
  const addWebViewToDockCalls: AddWebViewToDockCall[] = [];
  const floatTabByIdCalls: string[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: () => {},
    getAllWebViewDefinitions: () => [],
    getWebViewDefinition: () => undefined,
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      addWebViewToDockCalls.push({ webView, layout });
      return layout;
    },
    floatTabById: (tabId: string) => {
      floatTabByIdCalls.push(tabId);
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  return { dockLayout, addWebViewToDockCalls, floatTabByIdCalls };
}

/** Stub the web view provider (and the theme it needs) so `openWebView`'s dock-add path can run */
async function primeProvider() {
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them — same reasoning as the equivalent stubs in `web-view.service-shard.test.ts`.
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({
      getWebView: async (saved: { id: string; webViewType: string }) => ({
        id: saved.id,
        webViewType: saved.webViewType,
        contentType: 'html',
        content: '<p>hi</p>',
        state: {},
      }),
    }),
  );
  (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
    cssVariables: {},
  }));
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
  globalThis.windowId = '2';
  mocks.settingsGet.mockImplementation(async (key: string) =>
    key === 'platform.interfaceMode' ? 'power' : false,
  );
  mocks.networkRequest.mockImplementation(async (requestType: string) =>
    requestType === 'windowLayout:get' ? { kind: 'empty' } : undefined,
  );
});

/** A float layout with size and position set, so the test can tell if either gets dropped */
const FLOAT_LAYOUT: Layout = {
  type: 'float',
  position: 'center',
  floatSize: { width: 480, height: 320 },
};

describe('float layouts pass through this window`s shard unchanged', () => {
  test('opening a float layout adds it to the dock with floatSize and position untouched', async () => {
    const module = await import('@renderer/services/web-view.service-shard');
    await primeProvider();
    const { dockLayout, addWebViewToDockCalls } = makeFloatTrackingDockLayout();
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();

    const openedId = await module.openWebView('test.type', FLOAT_LAYOUT);

    expect(openedId).toBeDefined();
    expect(addWebViewToDockCalls).toHaveLength(1);
    // Not just "a float layout was used somewhere" — the exact object this call received, so a
    // regression that drops floatSize or rewrites position fails this
    expect(addWebViewToDockCalls[0].layout).toEqual(FLOAT_LAYOUT);
  });

  test('floatTab floats an existing tab by id, unchanged', async () => {
    const module = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, floatTabByIdCalls } = makeFloatTrackingDockLayout();
    module.registerDockLayout(dockLayout);

    await module.floatTab('some-tab-id');

    expect(floatTabByIdCalls).toEqual(['some-tab-id']);
  });
});
