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

// Mock dock layouts and the published shard object both cross the shared model's opaque
// `LayoutInfo`/`PapiDockLayout` boundary, the same reason `web-view.service-shard.test.ts` disables
// this rule file-wide rather than per cast.
/* eslint-disable no-type-assertion/no-type-assertion */

/**
 * Layout with no tab anywhere — good enough for `loadLayout`'s background work, which these tests
 * don't assert on
 */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** Narrow view of the published shard covering only the two move methods under test */
type MoveShard = {
  captureAndCloseWebView(webViewId: WebViewId): Promise<SavedWebViewDefinition | undefined>;
  adoptWebView(savedWebViewDefinition: SavedWebViewDefinition): Promise<WebViewId | undefined>;
};

/**
 * Register the shard over a dock layout stand-in that answers `getWebViewDefinition` with a fixed
 * definition (or `undefined`) regardless of the id it is asked for — matching the harness's other
 * dock-layout stand-ins (e.g. `setDetachedScrRef`'s), which don't validate call arguments either.
 * The real dock looks the id up exactly, so the stand-in is deliberately looser than what it stands
 * in for: it answers whatever definition the test set up, whichever id it is handed. That keeps the
 * capture tests about what the shard does with the definition it got back, not about lookup. It
 * also tracks `removeTabFromDock`/`addWebViewToDock` calls so capture/adopt tests can assert on
 * them.
 */
async function shardOverDockLayout(webViewDefinition: WebViewDefinition | undefined) {
  const module = await import('@renderer/services/web-view.service-shard');
  const { networkObjectService } = await import('@shared/services/network-object.service');
  const removedTabIds: string[] = [];
  const addWebViewToDockCalls: WebViewTabProps[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: () => {},
    getAllWebViewDefinitions: () => [],
    getWebViewDefinition: () => webViewDefinition,
    removeTabFromDock: (tabId: string) => {
      removedTabIds.push(tabId);
      return true;
    },
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      addWebViewToDockCalls.push(webView);
      return layout;
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  module.registerDockLayout(dockLayout);
  await module.startWebViewServiceShard();
  const [, shard] = vi.mocked(networkObjectService.set).mock.calls[0];
  return {
    shard: shard as unknown as MoveShard,
    removedTabIds,
    addWebViewToDockCalls,
  };
}

/** Stub the web view provider (and the theme it needs) so `adoptWebView`'s open path can run */
async function primeProvider(getWebView: (saved: SavedWebViewDefinition) => Promise<unknown>) {
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them — same reasoning as the equivalent stubs in `web-view.service-shard.test.ts`.
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({ getWebView }),
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

const WINDOW_SCOPED_DEFINITION: WebViewDefinition = {
  id: 'abc-w2',
  webViewType: 'test.type',
  contentType: 'html',
  content: '<p>hi</p>',
  state: { existing: true },
};

describe('captureAndCloseWebView', () => {
  test('capture answers undefined when this window does not hold the web view', async () => {
    const { shard, removedTabIds } = await shardOverDockLayout(undefined);

    expect(await shard.captureAndCloseWebView('missing-id')).toBeUndefined();
    expect(removedTabIds).toEqual([]);
  });

  test("capture carries the definition state, not this window's stored copy", async () => {
    // The definition is where a `useWebViewState` write lands, and the same write is mirrored into
    // storage, so the two agree in production and only a mock can make them disagree. Making them
    // disagree here is the point: it pins that the capture reads the definition, so a stored copy
    // that somehow fell behind can never travel to the target in place of the live value.
    const { getFullWebViewStateById } = await import('@renderer/services/web-view-state.service');
    vi.mocked(getFullWebViewStateById).mockReturnValue({ scroll: 5 });
    const { shard } = await shardOverDockLayout(WINDOW_SCOPED_DEFINITION);

    const captured = await shard.captureAndCloseWebView('abc-w2');

    expect(captured?.state).toEqual({ existing: true });
  });

  test("capture leaves this window's stored state in place for a failed move to recover from", async () => {
    const { getFullWebViewStateById, deleteFullWebViewStateById } = await import(
      '@renderer/services/web-view-state.service'
    );
    vi.mocked(getFullWebViewStateById).mockReturnValue({ existing: true });
    const { shard } = await shardOverDockLayout(WINDOW_SCOPED_DEFINITION);

    await shard.captureAndCloseWebView('abc-w2');

    expect(deleteFullWebViewStateById).not.toHaveBeenCalled();
  });

  test('capture closes the tab it captured', async () => {
    const { getFullWebViewStateById } = await import('@renderer/services/web-view-state.service');
    vi.mocked(getFullWebViewStateById).mockReturnValue({});
    const { shard, removedTabIds } = await shardOverDockLayout(WINDOW_SCOPED_DEFINITION);

    // Ask for the unscoped id. The dock stand-in does not validate the id it is asked for, so it
    // still answers with the window-scoped definition; what this pins is that the close goes
    // through the definition's own id rather than the id the caller asked with
    await shard.captureAndCloseWebView('abc');

    expect(removedTabIds).toEqual(['abc-w2']);
  });

  test('capture strips the window scope off the captured id', async () => {
    const { getFullWebViewStateById } = await import('@renderer/services/web-view-state.service');
    vi.mocked(getFullWebViewStateById).mockReturnValue({});
    const { shard } = await shardOverDockLayout(WINDOW_SCOPED_DEFINITION);

    const captured = await shard.captureAndCloseWebView('abc-w2');

    expect(captured?.id).toBe('abc');
  });
});

describe('adoptWebView', () => {
  const SAVED_DEFINITION: SavedWebViewDefinition = {
    id: 'moved-view',
    webViewType: 'test.type',
    state: { scroll: 5 },
  };

  test('adopt seeds the captured state before the provider runs', async () => {
    const order: string[] = [];
    const { setFullWebViewStateById } = await import('@renderer/services/web-view-state.service');
    vi.mocked(setFullWebViewStateById).mockImplementation(() => {
      order.push('setFullWebViewStateById');
    });
    const { shard } = await shardOverDockLayout(undefined);
    await primeProvider(async () => {
      order.push('getWebView');
      return undefined;
    });

    await shard.adoptWebView(SAVED_DEFINITION);

    expect(order).toEqual(['setFullWebViewStateById', 'getWebView']);
  });

  test('adopt opens as a tab and answers the id', async () => {
    const { shard, addWebViewToDockCalls } = await shardOverDockLayout(undefined);
    await primeProvider(async (saved) => ({
      id: saved.id,
      webViewType: saved.webViewType,
      contentType: 'html',
      content: '<p>moved</p>',
      state: {},
    }));

    const id = await shard.adoptWebView(SAVED_DEFINITION);

    expect(id).toBe('moved-view');
    expect(addWebViewToDockCalls).toEqual([
      expect.objectContaining({ id: 'moved-view', webViewType: 'test.type' }),
    ]);
  });

  test('adopt answers undefined when the provider declines', async () => {
    const { shard } = await shardOverDockLayout(undefined);
    await primeProvider(async () => undefined);

    expect(await shard.adoptWebView(SAVED_DEFINITION)).toBeUndefined();
  });
});
