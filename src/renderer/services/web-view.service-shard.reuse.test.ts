import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type { Layout, LayoutInfo, PapiDockLayout } from '@shared/models/docking-framework.model';
import type {
  OpenWebViewOptions,
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

// Mock dock layouts cross the shared model's opaque `LayoutInfo`/`PapiDockLayout` boundary, the
// same reason `web-view.service-shard.test.ts` disables this rule file-wide rather than per cast.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Layout with no tab anywhere — good enough for the fire-and-forget initial `loadLayout` call */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** Build a fixture web view of `test.type`, optionally scoped to a project */
function testTypeWebView(id: WebViewId, projectId?: string): WebViewDefinition {
  return {
    id,
    webViewType: 'test.type',
    contentType: 'html',
    content: '<p>hi</p>',
    state: {},
    projectId,
  };
}

/**
 * Minimal `PapiDockLayout` stand-in whose `findFirstWebViewDefinitionByType` performs the real
 * type-and-project filtering over a fixed list of web views — the same level `PapiDockLayout` is
 * stood in at across the other tests in this directory (e.g.
 * `web-view.service-shard.move.test.ts`'s `shardOverDockLayout`), rather than the underlying
 * rc-dock layout.
 */
function makeDockLayout(webViews: WebViewDefinition[]): PapiDockLayout {
  return {
    onLayoutChangeRef: { current: undefined },
    loadLayout: () => {},
    getAllWebViewDefinitions: () => webViews,
    getWebViewDefinition: (id: WebViewId) => webViews.find((webView) => webView.id === id),
    findFirstWebViewDefinitionByType: (webViewType: string, projectId?: string) =>
      webViews.find(
        (webView) =>
          webView.webViewType === webViewType &&
          (projectId === undefined || webView.projectId === projectId),
      ),
    updateWebViewDefinition: () => false,
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
}

/** Start the shard and register a dock layout serving the given web views */
async function openWebViewOver(webViews: WebViewDefinition[]) {
  const module = await import('@renderer/services/web-view.service-shard');
  await module.startWebViewServiceShard();
  module.registerDockLayout(makeDockLayout(webViews));
  return module;
}

/** Options for a `'?'` search that neither brings a found view to front nor creates a new one */
function findOptions(overrides: Partial<OpenWebViewOptions>): OpenWebViewOptions {
  return {
    existingId: '?',
    createNewIfNotFound: false,
    bringToFront: false,
    ...overrides,
  };
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

describe("openWebView's '?' reuse search", () => {
  test("a '?' open with a project filter reuses only a matching-project view", async () => {
    const module = await openWebViewOver([testTypeWebView('view-a', 'A')]);

    const result = await module.openWebView(
      'test.type',
      { type: 'tab' } as Layout,
      findOptions({ existingProjectId: 'B' }),
    );

    expect(result).toBeUndefined();
  });

  test("a '?' open with a project filter raises the matching-project view", async () => {
    const module = await openWebViewOver([
      testTypeWebView('view-a', 'A'),
      testTypeWebView('view-b', 'B'),
    ]);

    const result = await module.openWebView(
      'test.type',
      { type: 'tab' } as Layout,
      findOptions({ existingProjectId: 'B' }),
    );

    expect(result).toBe('view-b');
  });

  test("a '?' open without a project filter behaves as before", async () => {
    const module = await openWebViewOver([testTypeWebView('view-a', 'A')]);

    const result = await module.openWebView(
      'test.type',
      { type: 'tab' } as Layout,
      findOptions({}),
    );

    expect(result).toBe('view-a');
  });

  test('a concrete existingId combined with existingProjectId is rejected', async () => {
    const module = await openWebViewOver([]);

    await expect(
      module.openWebView('test.type', { type: 'tab' } as Layout, {
        existingId: 'some-id',
        existingProjectId: 'B',
      }),
    ).rejects.toThrow(/existingProjectId/);
  });
});
