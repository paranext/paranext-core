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
function makeDockLayout(
  webViews: WebViewDefinition[],
  updateWebViewDefinition: PapiDockLayout['updateWebViewDefinition'] = () => false,
): PapiDockLayout {
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
    // The real dock resolves an unspecified `activateWithoutDocumentFocus` through this same
    // latch; this stand-in leaves it unresolved, so the injected mock's recorded call args are
    // the request this door actually forwards rather than what a real dock's own fallback would
    // resolve it to. That fallback is the dock's own logic — see
    // `platform-dock-layout-storage.document-focus.test.ts`.
    updateWebViewDefinition: (
      webViewId: WebViewId,
      updateInfo: Parameters<PapiDockLayout['updateWebViewDefinition']>[1],
      shouldBringToFront: boolean | undefined,
      activateWithoutDocumentFocus: boolean | undefined,
    ) =>
      updateWebViewDefinition(
        webViewId,
        updateInfo,
        shouldBringToFront,
        activateWithoutDocumentFocus,
      ),
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
}

/** Start the shard and register a dock layout serving the given web views */
async function openWebViewOver(
  webViews: WebViewDefinition[],
  updateWebViewDefinition?: PapiDockLayout['updateWebViewDefinition'],
) {
  const module = await import('@renderer/services/web-view.service-shard');
  await module.startWebViewServiceShard();
  module.registerDockLayout(makeDockLayout(webViews, updateWebViewDefinition));
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
  globalThis.wasWindowCreatedWithoutActivation = false;
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

  test('existingProjectId with no existingId at all is rejected with a message naming the missing id', async () => {
    // Omitting existingId altogether is the same contradiction as naming a concrete one — there is
    // no '?' search for existingProjectId to limit — but the message has to say so instead of
    // claiming a nonexistent id "already names an exact web view"
    const module = await openWebViewOver([]);

    await expect(
      module.openWebView('test.type', { type: 'tab' } as Layout, { existingProjectId: 'B' }),
    ).rejects.toThrow(/existingProjectId requires existingId/);
  });
  test('a reuse states no withholding opinion of its own, in either latch state', async () => {
    // A reuse raises an existing tab rather than docking a new one, so it reaches the dock by a
    // different door than a fresh open. Both doors open into the same window, and a raise that
    // takes document focus focuses the tab's iframe — latently, until the window itself is
    // activated — so an uncontrolled focus here carries the same caret-ownership risk as a fresh
    // open. What this door owes is to leave the decision unspecified so the dock resolves it in the
    // one place that fallback lives (covered against the real dock in
    // `platform-dock-layout-storage.document-focus.test.ts`).
    //
    // One test, not a case and a control: the latch state cannot change what this door forwards,
    // because the door has no opinion to state either way. A second test setting the latch the
    // other way would assert the identical value under a name promising the opposite outcome, and
    // neither could fail on it.
    globalThis.wasWindowCreatedWithoutActivation = true;
    const updateWebViewDefinition = vi.fn(() => true);
    const module = await openWebViewOver([testTypeWebView('view-a', 'A')], updateWebViewDefinition);

    await module.openWebView(
      'test.type',
      { type: 'tab' } as Layout,
      findOptions({ bringToFront: true }),
    );

    expect(updateWebViewDefinition).toHaveBeenCalledWith('view-a', {}, true, undefined);
  });

  test('a window layout arriving on a create reports a lost race, not a routing-contract break', async () => {
    // Main resolved this window as holding the web view the caller asked to reuse, then the web
    // view left before this call arrived. The dock's own error for a `'window'` layout says the
    // routing contract broke, which would send a reader hunting for a broken invariant instead of
    // a tab that moved.
    const module = await openWebViewOver([]);

    await expect(
      module.openWebView(
        'test.type',
        { type: 'window' } as Layout,
        // The reuse search misses and the caller allows a create, which is the only route to the
        // guard: a search that declines to create returns before reaching it
        findOptions({ createNewIfNotFound: true }),
      ),
    ).rejects.toThrow(/no longer holds/);
  });
});
