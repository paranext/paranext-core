import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type { LayoutInfo, PapiDockLayout } from '@shared/models/docking-framework.model';
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
  loggerError: vi.fn(),
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
// on the error line a failed reload leaves behind, which needs a spy
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: mocks.loggerError },
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

/** The open web view the reload under test names, docked before the test begins */
const LIVE_DEFINITION: WebViewDefinition = {
  id: 'open-view',
  webViewType: 'test.type',
  contentType: 'html',
  content: '<p>live</p>',
};

/** Narrow view of the published shard covering only the reload method under test */
type ReloadShard = {
  reloadWebView(webViewType: string, webViewId: WebViewId): Promise<WebViewId | undefined>;
};

/**
 * Register the shard over a dock layout stand-in holding one live web view whose dock add always
 * throws — what a reload sees when the definition the provider handed back makes the tab loader
 * throw: the loader's failure surfaces as an error tab under a fresh id, the add throws, and the
 * named web view's own tab never leaves the dock. Like the harness's other dock stand-ins, lookups
 * don't validate the id they are asked for.
 */
async function shardOverDockHoldingLiveView() {
  const module = await import('@renderer/services/web-view.service-shard');
  const { networkObjectService } = await import('@shared/services/network-object.service');
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: () => {},
    getAllWebViewDefinitions: () => [],
    getWebViewDefinition: () => LIVE_DEFINITION,
    addWebViewToDock: () => {
      throw new Error('Dock Layout created an error tab: loader refused the definition');
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  module.registerDockLayout(dockLayout);
  await module.startWebViewServiceShard();
  const [, shard] = vi.mocked(networkObjectService.set).mock.calls[0];
  return { shard: shard as unknown as ReloadShard };
}

/** Stub the web view provider (and the theme it needs) so the reload's open path can run */
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
        content: '<p>reloaded</p>',
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

describe('a failed reload of an open web view', () => {
  test('leaves the live view alone: no close event, state kept, error logged', async () => {
    const { shard } = await shardOverDockHoldingLiveView();
    await primeProvider();

    await expect(shard.reloadWebView('test.type', 'open-view')).rejects.toThrow('error tab');

    // The named web view's tab is still in the dock, so tearing down what backs it — its state,
    // and via the close event its controller and nonce — would gut a view the user still sees
    const { deleteFullWebViewStateById } = await import(
      '@renderer/services/web-view-state.service'
    );
    expect(deleteFullWebViewStateById).not.toHaveBeenCalled();
    const closeEmitter = [...mocks.bufferedEmitters.entries()].find(([name]) =>
      /close/i.test(name),
    )?.[1];
    if (!closeEmitter) throw new Error('close emitter was never created');
    expect(closeEmitter.emit).not.toHaveBeenCalled();
    expect(mocks.loggerError).toHaveBeenCalledWith(expect.stringContaining('open-view'));
  });
});
