import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type {
  Layout,
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import {
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { SAVE_WINDOW_LAYOUT_REQUEST_TYPE } from '@shared/data/window-layout-persistence.model';
import { serialize } from 'platform-bible-utils';

// The service shard logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

// Matches the real default-layout-supplement.json's anchor (platformScriptureEditor.bibleTexts) so
// the same mocked supplement entry can anchor onto both the window-scoping suite's synthetic layout
// and the handleSwitchToSimpleMode suite's `bible-texts-tab` fixture below.
const ANCHOR_WEB_VIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const SUPPLEMENT_TAB_ID = 'supplement-tab';
/**
 * The setting the mocked supplement entry is gated on. A supplement entry without one is enabled
 * unconditionally, which would leave the flag-off branch of the load — the one a vanilla build
 * takes — unreachable from this file, and the flag read itself unobservable.
 */
const SUPPLEMENT_FLAG_SETTING = 'test.isSupplementEnabled';

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

// The supplement is product-specific data; supply our own so these tests describe the merge
// behavior rather than whichever tabs the shipped file happens to contain. Gated behind
// `flagSetting` (not omitted) so the enabled/disabled merge tests below exercise the real
// filter-then-merge behavior rather than an entry that's unconditionally included.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: {
    tabs: [
      {
        anchorWebViewType: ANCHOR_WEB_VIEW_TYPE,
        flagSetting: SUPPLEMENT_FLAG_SETTING,
        tab: {
          id: SUPPLEMENT_TAB_ID,
          tabType: TAB_TYPE_WEBVIEW,
          data: {
            webViewType: 'test.supplement',
            id: SUPPLEMENT_TAB_ID,
            contentType: 'react',
            state: {},
          },
        },
      },
    ],
  },
}));

// web-view.service-shard.ts creates buffered network event emitters and network-backed events at
// module load (`getNetworkEvent`, `createBufferedNetworkEventEmitter`). Stub the network layer so
// importing the module never tries to talk to a real websocket. `getNetworkEvent` is a controllable
// fake (not a bare no-op): most subscribers (e.g. the tabs-resolved tracker) never need their
// callback invoked, but the Simple-mode project-cache subscription tests below need to fire a
// specific event by name to simulate a webview open/update.
const { getNetworkEventMock, emitNetworkEvent, clearNetworkEventHandlers } = vi.hoisted(() => {
  type Handler = (event: unknown) => void;
  const handlersByEventName = new Map<string, Set<Handler>>();
  return {
    getNetworkEventMock: vi.fn((eventName: string) => (callback: Handler) => {
      let handlers = handlersByEventName.get(eventName);
      if (!handlers) {
        handlers = new Set();
        handlersByEventName.set(eventName, handlers);
      }
      handlers.add(callback);
      return () => handlers?.delete(callback) ?? false;
    }),
    emitNetworkEvent: (eventName: string, event: unknown) => {
      handlersByEventName.get(eventName)?.forEach((handler) => handler(event));
    },
    clearNetworkEventHandlers: () => handlersByEventName.clear(),
  };
});
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn(), dispose: vi.fn() };
    mocks.bufferedEmitters.set(eventName, emitter);
    return emitter;
  },
  getNetworkEvent: getNetworkEventMock,
  request: mocks.networkRequest,
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
const { getWebViewProviderMock } = vi.hoisted(() => ({ getWebViewProviderMock: vi.fn() }));
vi.mock('@shared/services/web-view-provider.service', () => ({
  webViewProviderService: { getWebViewProvider: getWebViewProviderMock },
}));

// theme.service.ts calls `window.matchMedia` at module load to seed its dark-mode default, which
// jsdom does not implement. Stub the whole module — none of the functions under test read the
// theme, except `trackSimpleEditorReplaceTab`'s coverage, which drives `openOrReloadWebView` far
// enough to need a minimal-but-real-shaped theme object.
vi.mock('@renderer/services/theme.service', () => ({
  localThemeService: {
    getCurrentThemeSync: vi.fn(() => ({ id: 'test-theme', cssVariables: {} })),
  },
}));
vi.mock('@renderer/services/web-view-state.service', () => ({
  deleteFullWebViewStateById: vi.fn(),
  getFullWebViewStateById: vi.fn(),
  setFullWebViewStateById: vi.fn(),
}));

// The host only needs the `TAB_TYPE_SETTINGS_TAB` string constant from this component file, but
// the real file transitively imports the entire `papi-frontend.service` service graph (dozens of
// unrelated services). Stub it directly rather than mocking that whole graph.
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

const { settingsGetMock, settingsSubscribeMock } = vi.hoisted(() => ({
  // Typed broadly (not narrowed to the default implementation's `'simple' | false`) so tests can
  // also mock other settings keys (e.g. default-layout-supplement flag settings) returning `true`.
  settingsGetMock: vi.fn(
    async (key: string): Promise<string | boolean> =>
      key === 'platform.interfaceMode' ? 'simple' : false,
  ),
  // Typed explicitly (not inferred from the default zero-arg implementation) so tests can also
  // replace the implementation with one that reads its `key`/`callback` arguments (e.g. the
  // interface-mode subscription tests below, which capture `callback` to drive mode changes).
  settingsSubscribeMock: vi.fn<
    (
      key: string,
      callback: (newSetting: unknown) => Promise<void>,
    ) => Promise<() => Promise<boolean>>
  >(async () => async () => true),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: settingsGetMock, subscribe: settingsSubscribeMock },
}));

const { getMetadataForProjectMock } = vi.hoisted(() => ({
  getMetadataForProjectMock: vi.fn(),
}));
vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: { getMetadataForProject: getMetadataForProjectMock },
}));

const { dataProviderGetMock } = vi.hoisted(() => ({ dataProviderGetMock: vi.fn() }));
vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: dataProviderGetMock },
}));

const { sendCommandMock } = vi.hoisted(() => ({ sendCommandMock: vi.fn() }));
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn(async () => async () => true),
  sendCommand: sendCommandMock,
}));

// Spies on the real `newNonce` (rather than replacing it) so minted nonces stay realistic random
// strings, while letting the `isWebViewNonceCorrect` tests below assert on call count — the
// behavior under test is whether *checking* a nonce ever mints one as a side effect.
const { newNonceMock } = vi.hoisted(() => ({ newNonceMock: vi.fn() }));
vi.mock('@shared/utils/util', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@shared/utils/util')>();
  newNonceMock.mockImplementation(actual.newNonce);
  return { ...actual, newNonce: newNonceMock };
});

// Spies on the real `startWorkspaceUpdate` (rather than replacing it) so the many tests that assert
// on real overlay state via `getWorkspaceUpdating()` keep working unchanged; only the one test that
// needs `startWorkspaceUpdate` itself to throw overrides this with `mockImplementationOnce`.
const { startWorkspaceUpdateMock } = vi.hoisted(() => ({ startWorkspaceUpdateMock: vi.fn() }));
vi.mock('@renderer/services/workspace-updating-store', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@renderer/services/workspace-updating-store')>();
  startWorkspaceUpdateMock.mockImplementation(actual.startWorkspaceUpdate);
  return { ...actual, startWorkspaceUpdate: startWorkspaceUpdateMock };
});

// Capturing `buildSimpleLayoutForProject`'s `projectId` argument is the primary assertion point
// below. `SIMPLE_LAYOUT_TAB_IDS` is mocked to `[]` so the (real, separately-tested) tabs-resolved
// tracker resolves immediately instead of waiting on webview open/update events that never fire in
// this test. The dockbox includes a `platformScriptureEditor.bibleTexts` tab, matching
// `ANCHOR_WEB_VIEW_TYPE` above, so the real (unmocked) default-layout-supplement merge logic has a
// matching anchor to attach the mocked supplement's `SUPPLEMENT_TAB_ID` tab to (see the merge tests
// below) - the merge/filter logic itself is real production code, only the supplement's own
// content is mocked.
const { buildSimpleLayoutForProjectMock, simpleLayoutTabIdsMock, visibleSimpleLayoutTabIdsMock } =
  vi.hoisted(() => {
    // Mutable (not frozen empty) so individual tests can populate it to exercise logic keyed off
    // real Simple-mode tab ids, while defaulting to empty for every other test (matching real
    // SIMPLE_LAYOUT_TAB_IDS's/VISIBLE_SIMPLE_LAYOUT_TAB_IDS's shape without needing to know their
    // actual values). Declared as their own explicitly-typed variables (rather than an inline
    // `[] as string[]`) so the array's element type doesn't need a type assertion.
    const simpleLayoutTabIds: string[] = [];
    const visibleSimpleLayoutTabIds: string[] = [];
    return {
      buildSimpleLayoutForProjectMock: vi.fn((projectId: string) => ({
        dockbox: {
          mode: 'horizontal' as const,
          children: [
            {
              mode: 'vertical' as const,
              children: [
                {
                  tabs: [
                    {
                      id: 'bible-texts-tab',
                      data: { webViewType: 'platformScriptureEditor.bibleTexts' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        builtForProjectId: projectId,
      })),
      simpleLayoutTabIdsMock: simpleLayoutTabIds,
      visibleSimpleLayoutTabIdsMock: visibleSimpleLayoutTabIds,
    };
  });
vi.mock('@renderer/components/docking/simple-layout.builder', () => ({
  buildSimpleLayoutForProject: buildSimpleLayoutForProjectMock,
  SIMPLE_LAYOUT_TAB_IDS: simpleLayoutTabIdsMock,
  VISIBLE_SIMPLE_LAYOUT_TAB_IDS: visibleSimpleLayoutTabIdsMock,
  // Every test that pushes into `simpleLayoutTabIdsMock` to model "the fixed Simple editor tab id"
  // pushes exactly that one id first, matching real `simpleLayout`'s single Scripture Editor tab —
  // a getter (not a snapshot) so it stays correct across `vi.resetModules()` re-imports.
  get SIMPLE_LAYOUT_EDITOR_TAB_ID() {
    return simpleLayoutTabIdsMock[0];
  },
}));

// `LayoutInfo` is deliberately opaque in the shared model, so building a layout fixture and reading
// tab ids back out of one both have to cross that boundary.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Layout with one panel holding a web view of the type the supplement entry anchors to */
function layoutWithAnchor(extraTabs: SavedTabInfo[] = []): LayoutInfo {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            {
              id: 'anchor-tab',
              tabType: TAB_TYPE_WEBVIEW,
              data: { id: 'anchor-tab', webViewType: ANCHOR_WEB_VIEW_TYPE, state: {} },
            },
            ...extraTabs,
          ],
        },
      ],
    },
  } as unknown as LayoutInfo;
}

/** Layout with one panel holding one web view tab with the given id */
function layoutWithTab(tabId: string): LayoutInfo {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            {
              id: tabId,
              tabType: TAB_TYPE_WEBVIEW,
              data: { id: tabId, webViewType: 'test.type', state: {} },
            },
          ],
        },
      ],
    },
  } as unknown as LayoutInfo;
}

/** Layout with no tab anywhere — only the empty placeholder panel in the dock */
function layoutWithNoTabsAnywhere(): LayoutInfo {
  return {
    dockbox: { mode: 'horizontal', children: [{ id: '+0', tabs: [] }] },
  } as unknown as LayoutInfo;
}

/** Every tab id anywhere in a layout, in order */
function tabIdsIn(layout: LayoutInfo): string[] {
  const ids: string[] = [];
  const walk = (box: { tabs?: { id?: string }[]; children?: unknown[] }) => {
    box.tabs?.forEach((tab) => tab.id && ids.push(tab.id));
    box.children?.forEach((child) => {
      if (child && typeof child === 'object')
        walk(child as { tabs?: { id?: string }[]; children?: unknown[] });
    });
  };
  walk((layout as unknown as { dockbox: { tabs?: []; children?: [] } }).dockbox);
  return ids;
}

/**
 * Minimal stand-in for the registered dock layout. Only the pieces `loadLayout` touches are real;
 * `loadLayout` records the layout it is handed so tests can assert on the final ids.
 */
function makeDockLayout(simpleLayout: LayoutInfo) {
  const loadedLayouts: LayoutInfo[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [],
    getWebViewDefinition: () => undefined,
    simpleLayout,
    testLayout: simpleLayout,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts };
}

/** Register a dock layout and wait for the fire-and-forget initial `loadLayout` to land */
async function registerWindow(simpleLayout: LayoutInfo) {
  const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
  const { dockLayout, loadedLayouts } = makeDockLayout(simpleLayout);
  registerDockLayout(dockLayout);
  await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
  return { dockLayout, loadedLayouts };
}

/**
 * A dock layout stand-in that also records `addWebViewToDock` calls, so a test can observe
 * `reportDockEmptied` actually opening Home as a tab rather than just the `windowLayout:emptied`
 * request going out.
 *
 * `vi.spyOn` on this module's own `openWebView` export was tried first (the harness's usual way to
 * observe a web view open), but it does not see calls `reportDockEmptied` makes internally: Vitest
 * only redirects a same-module caller to a spied export for some export forms, and it does not do
 * so here — confirmed with a minimal caller/callee repro in this same test environment. Standing up
 * the real path (as "a failed dock add rolls back what the open already did" below already does for
 * the failure case) is the reliable alternative.
 */
function makeDockLayoutThatTracksAdds(simpleLayout: LayoutInfo) {
  const loadedLayouts: LayoutInfo[] = [];
  const addWebViewToDockCalls: WebViewTabProps[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [],
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      addWebViewToDockCalls.push(webView);
      return layout;
    },
    simpleLayout,
    testLayout: simpleLayout,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts, addWebViewToDockCalls };
}

/**
 * A dock layout stand-in that tracks whether one specific (window-scoped) web view id is present,
 * derived from whatever layout it was most recently handed — the same shape a real dock takes,
 * where `loadLayout` replaces the dock's whole contents and later lookups reflect that. Modeled on
 * `makeDockLayoutThatTracksAdds` rather than extending `makeDockLayout`, so no existing test's
 * behavior shifts.
 */
function makeDockLayoutTrackingOneWebView(initialLayout: LayoutInfo, webViewId: string) {
  const loadedLayouts: LayoutInfo[] = [];
  const removeTabFromDockCalls: string[] = [];
  let webViewIsPresent = tabIdsIn(initialLayout).includes(webViewId);
  const webViewDefinition = {
    id: webViewId,
    webViewType: 'test.type',
    contentType: 'html',
    content: '<p>captured</p>',
    state: {},
  } as unknown as WebViewTabProps;
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
      webViewIsPresent = tabIdsIn(layout).includes(webViewId);
    },
    getAllWebViewDefinitions: () => (webViewIsPresent ? [webViewDefinition] : []),
    getWebViewDefinition: (id: string) =>
      webViewIsPresent && id === webViewId ? webViewDefinition : undefined,
    removeTabFromDock: (id: string) => {
      removeTabFromDockCalls.push(id);
    },
    simpleLayout: initialLayout,
    testLayout: initialLayout,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts, removeTabFromDockCalls };
}

/** Wire up a web view provider and theme so `openWebView`'s dock-add path can run to completion */
async function primeWebViewOpenPath() {
  const module = await import('@renderer/services/web-view.service-shard');
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them. Same reasoning as "a failed dock add rolls back what the open already did" below.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({
      getWebView: async (saved: { id: string; webViewType: string }) => ({
        id: saved.id,
        webViewType: saved.webViewType,
        contentType: 'html',
        content: '<p>Home</p>',
        state: {},
      }),
    }),
  );
  // `localThemeService` is mocked as `{}` too; same untyped-attach reasoning as the provider stub
  // above requires the assertion here as well.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
    cssVariables: {},
  }));
  await module.startWebViewServiceShard();
  return module;
}

/**
 * The shard object this window registered, as the main process's router calls it. Only the members
 * a test reaches for are named; the shard's own type carries the rest.
 */
async function registeredShard() {
  const { networkObjectService } = await import('@shared/services/network-object.service');
  const set = networkObjectService.set as unknown as ReturnType<typeof vi.fn>;
  const lastSetCall = set.mock.calls[set.mock.calls.length - 1];
  return lastSetCall[1] as {
    hasContentArrivedSinceEmptyReport: () => Promise<boolean>;
    openSettingsTab: (projectIdToLimitSettings?: string) => Promise<unknown>;
    openWebView: (webViewType: string) => Promise<string | undefined>;
    adoptWebView: (savedWebViewDefinition: unknown) => Promise<string | undefined>;
    captureAndCloseWebView: (webViewId: string) => Promise<unknown>;
  };
}

/** Register a dock layout and return the layout the initial load landed on */
async function loadLayoutInWindow(simpleLayout: LayoutInfo) {
  const { loadedLayouts } = await registerWindow(simpleLayout);
  return loadedLayouts[loadedLayouts.length - 1];
}

/**
 * Answer `windowLayout:get` with the given response and `windowLayout:emptied` with `open-home`;
 * every other request resolves undefined.
 *
 * The emptied answer matters even for tests that are not about emptiness: several of them load a
 * layout with no tabs in it, and a report the shard cannot read an action out of is a failed
 * attempt — which puts the report into a retry loop that runs for seconds, fire-and-forget, past
 * the end of the test that started it.
 *
 * `open-home` is what the main process actually answers for the windows these tests stand up — a
 * window that is born empty, or is the last one standing, or holds the primary role. `closing` is
 * reached only for a non-primary window emptied by removal while others remain, so a test that
 * wants it must say so: answering it here would latch every window as closing and make each later
 * dock operation throw.
 */
function respondToGetLayout(response: unknown) {
  mocks.networkRequest.mockImplementation(async (requestType: string) => {
    if (requestType === 'windowLayout:get') return response;
    if (requestType === 'windowLayout:emptied') return { action: 'open-home' };
    return undefined;
  });
}

/**
 * Hold every `windowLayout:get` open the way a slow main process would, so a test can act while a
 * load is mid-flight. Returns a function that answers the request made so far.
 */
function holdGetLayout() {
  let answer: ((response: unknown) => void) | undefined;
  mocks.networkRequest.mockImplementation(async (requestType: string) => {
    if (requestType !== 'windowLayout:get') return undefined;
    return new Promise((resolve) => {
      answer = resolve;
    });
  });
  return {
    hasRequest: () => answer !== undefined,
    answerWith: (response: unknown) => {
      if (!answer) throw new Error('the saved-layout request was never made');
      answer(response);
    },
  };
}

/** All `windowLayout:save` pushes made so far, as [windowId, layout] pairs */
function layoutPushes() {
  return mocks.networkRequest.mock.calls
    .filter(([requestType]) => requestType === 'windowLayout:save')
    .map(([, windowId, layout]) => [windowId, layout]);
}

// Starting the shard deletes `globalThis.open` so web views cannot make popups. That is a one-way
// change to the real `window`, which these tests share across every re-import — and the module
// aliases `window.open` while it is being evaluated, so the second import after a start would throw
// on a `window` the first one had already stripped.
const openWindow = globalThis.open;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.bufferedEmitters.clear();
  globalThis.open = openWindow;
  localStorage.clear();
  globalThis.windowId = '2';
  respondToGetLayout({ kind: 'empty' });
});

describe('loadLayout scopes web view ids to this window', () => {
  beforeEach(() => {
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : true,
    );
  });

  test('scopes the ids that come from the shared layout', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toContain('anchor-tab-w2');
  });

  test('scopes supplement tab ids, which are merged in after the layout is scoped', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    // Unscoped, this id is identical in every window, so both windows' web views would register
    // their message handlers under the same name
    expect(tabIdsIn(loaded)).toContain(`${SUPPLEMENT_TAB_ID}-w2`);
    expect(tabIdsIn(loaded)).not.toContain(SUPPLEMENT_TAB_ID);
  });

  test('gives two windows different supplement tab ids', async () => {
    const sharedLayout = layoutWithAnchor();

    globalThis.windowId = '1';
    const inWindow1 = tabIdsIn(await loadLayoutInWindow(sharedLayout));
    vi.resetModules();
    globalThis.windowId = '2';
    const inWindow2 = tabIdsIn(await loadLayoutInWindow(sharedLayout));

    expect(inWindow1).not.toContain(`${SUPPLEMENT_TAB_ID}-w2`);
    expect(inWindow2).toContain(`${SUPPLEMENT_TAB_ID}-w2`);
  });

  test('keeps a supplement tab’s id and its data id in agreement', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    const { dockbox } = loaded as unknown as { dockbox: { children: { tabs: SavedTabInfo[] }[] } };
    const supplementTab = dockbox.children[0].tabs.find(
      (tab) => tab.id === `${SUPPLEMENT_TAB_ID}-w2`,
    );
    expect((supplementTab?.data as { id: string }).id).toBe(`${SUPPLEMENT_TAB_ID}-w2`);
  });

  test('re-scopes a restored supplement tab instead of adding a second copy', async () => {
    // Power mode restores the merged layout, so the next load restores a supplement tab that is
    // already scoped — to another window's id, since window ids are not stable across restarts
    const savedSupplementTab: SavedTabInfo = {
      id: `${SUPPLEMENT_TAB_ID}-w1`,
      tabType: TAB_TYPE_WEBVIEW,
      data: { id: `${SUPPLEMENT_TAB_ID}-w1`, webViewType: 'test.supplement', state: {} },
    } as unknown as SavedTabInfo;
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : true,
    );
    respondToGetLayout({ kind: 'entry', layout: layoutWithAnchor([savedSupplementTab]) });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded).filter((id) => id.startsWith(SUPPLEMENT_TAB_ID))).toEqual([
      `${SUPPLEMENT_TAB_ID}-w2`,
    ]);
  });
});

/**
 * Minimal fake dock layout, cast to `PapiDockLayout` — replicating every member of that large
 * interface just for a test double would be significantly worse than one justified cast (mirrors
 * the LayoutInfo/LayoutBase casts already used at this same boundary in the host file).
 */
function createFakeDockLayout(): PapiDockLayout {
  const fake = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: vi.fn(),
    findFirstWebViewDefinitionByType: vi.fn(() => undefined),
    addTabToDock: vi.fn(),
    addWebViewToDock: vi.fn(),
    removeTabFromDock: vi.fn(),
    floatTabById: vi.fn(),
    getAllWebViewDefinitions: vi.fn(() => []),
    getWebViewDefinition: vi.fn(() => undefined),
    updateTabPartial: vi.fn(),
    updateWebViewDefinition: vi.fn(),
    getTabInfoByDirectionFromTab: vi.fn(),
    getTabInfoByElement: vi.fn(),
    getTabInfoById: vi.fn(),
    focusTab: vi.fn(),
    testLayout: { dockbox: { mode: 'horizontal' as const, children: [] } },
    simpleLayout: { dockbox: { mode: 'horizontal' as const, children: [] } },
  };
  // See the function-level comment above: casting a partial fake to the full interface is the
  // deliberate choice here, not an oversight.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return fake as unknown as PapiDockLayout;
}

async function importHost() {
  return import('@renderer/services/web-view.service-shard');
}

// File-wide, not per-describe: several describes register a dock layout (which subscribes to
// webview open/update events for the last-opened-project cache), and few of them ever call the
// returned unregister function. Without this, a still-subscribed handler from an earlier test
// would keep firing (and writing to the real localStorage-backed cache) when a later test emits an
// event, independent of which describe block either test lives in.
afterEach(() => {
  clearNetworkEventHandlers();
});

describe('handleSwitchToSimpleMode', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    settingsGetMock.mockReset();
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : false,
    );
    settingsSubscribeMock.mockReset();
    settingsSubscribeMock.mockImplementation(async () => async () => true);
    getMetadataForProjectMock.mockReset();
    // Absent isPublished means "not published" (see project-metadata.model.ts), so the default
    // fixture is a normal, cacheable project unless a test overrides it.
    getMetadataForProjectMock.mockResolvedValue({});
    dataProviderGetMock.mockReset();
    dataProviderGetMock.mockResolvedValue(undefined);
    sendCommandMock.mockReset();
    sendCommandMock.mockResolvedValue(undefined);
    buildSimpleLayoutForProjectMock.mockClear();
    simpleLayoutTabIdsMock.length = 0;
    visibleSimpleLayoutTabIdsMock.length = 0;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('fast path: builds the layout for the cached project id', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-cached' });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-cached');
    expect(fakeDockLayout.loadLayout).toHaveBeenCalledWith(
      expect.objectContaining({ builtForProjectId: 'proj-cached' }),
    );
    // The fast path must never fall through to the slow-path recents *lookup*
    // (getMostRecentProjectId's getRecentProjects call) - proven by the cached id reaching
    // buildSimpleLayoutForProject directly above. dataProviderGetMock is legitimately still called
    // with this same id post-switch, for the unrelated recordProjectOpened side effect (see the
    // dedicated tests for that behavior below).
    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
  });

  it('fast path: the tabs-resolved tracker only waits on VISIBLE_SIMPLE_LAYOUT_TAB_IDS, not the full SIMPLE_LAYOUT_TAB_IDS list', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-visible-tabs' });
    // Populate the full (5-tab) list with an id that never fires an open/update event (nothing in
    // this test emits one). Leave the visible-only list empty. If the switch is still tracking the
    // full list, it will block on the tracker's real timeout; if it correctly narrowed to the
    // (empty) visible list, it resolves on the next tick.
    simpleLayoutTabIdsMock.push('hidden-tab-not-in-visible-list');

    const start = Date.now();
    await host.handleSwitchToSimpleMode();
    const elapsedMs = Date.now() - start;

    // Well under the tracker's 3s timeout - proves the switch didn't wait on the full list.
    expect(elapsedMs).toBeLessThan(1000);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('timed out'));
  }, 6000);

  it('fast path: warns when the visible-tabs tracker times out before every tab resolves', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-visible-tabs-timeout' });
    // Non-empty visible-tab list whose id never fires an open/update event - forces the tracker to
    // resolve via its real (production) timeout rather than immediately.
    visibleSimpleLayoutTabIdsMock.push('visible-tab-1');

    await host.handleSwitchToSimpleMode();

    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('timed out'));
  }, 6000);

  it('fast path: resolves via a real matching webview event, not just the timeout', async () => {
    // Regression/coverage for the load-bearing assumption `runProjectBoundSimpleSwitch` depends
    // on: a tab's `id` IS its web view id, so a real webview-open event for that id actually
    // reaches and resolves the tabs-resolved tracker before its timeout. The two tests above only
    // ever use ids that never receive a matching event (proving the timeout paths); this one
    // proves the event path that makes the fast path actually fast in production.
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-visible-tab-resolves' });
    const VISIBLE_TAB_ID = 'visible-tab-real-event';
    visibleSimpleLayoutTabIdsMock.push(VISIBLE_TAB_ID);

    const switchPromise = host.handleSwitchToSimpleMode();
    let settled = false;
    switchPromise
      .then(() => {
        settled = true;
        return undefined;
      })
      .catch(() => {
        settled = true;
      });
    // The tracker only subscribes after several awaits inside the switch (the paint wait, the
    // supplement-settings read), so the exact moment it starts listening isn't observable from
    // here. Re-emit on each retry instead of guessing the timing - duplicate events for the same
    // id are idempotent (see the tracker's own doc comment), so repeating this is safe. If event
    // delivery were broken, `settled` would never flip and this throws via `vi.waitFor`'s own
    // (much shorter than the tracker's 3s) timeout, distinguishing failure from a false pass.
    await vi.waitFor(() => {
      emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
        webView: {
          id: VISIBLE_TAB_ID,
          webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
          projectId: 'proj-visible-tab-resolves',
        },
      });
      if (!settled) throw new Error('switch has not resolved yet');
    });

    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('timed out'));
  });

  it('slow path: resolves the most recent project and seeds the cache', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => ['proj-recent']);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-recent');

    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    expect(getLastOpenedProject()).toEqual({ id: 'proj-recent' });
  });

  it('slow path: tries the next recent candidate when the most-recent one is a published resource', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => ['proj-resource', 'proj-editable-fallback']);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );
    getMetadataForProjectMock.mockImplementation(async (projectId: string) =>
      projectId === 'proj-resource' ? { isPublished: true } : {},
    );

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-editable-fallback');
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    expect(getLastOpenedProject()).toEqual({ id: 'proj-editable-fallback' });
  });

  it('slow path: falls back to the bare layout when every recent candidate is a published resource, and does not cache any of them', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => ['proj-resource-1', 'proj-resource-2']);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );
    getMetadataForProjectMock.mockResolvedValue({ isPublished: true });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('slow path: falls back to the bare layout and warns if resolving whether the project is published hangs past the cold-start bound', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => ['proj-recent-slow-published-check']);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );
    // Never resolves within this test's lifetime - simulates a hung PDP-factory wait.
    getMetadataForProjectMock.mockImplementation(() => new Promise(() => {}));

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Timed out'));
  }, 5000);

  it('fallback: with no cache and no resolvable recent project, skips the project-bound layout entirely and loads the bare layout instead', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    // `registerDockLayout`'s own fire-and-forget initial `loadLayout()` call would otherwise
    // dirty this spy before `handleSwitchToSimpleMode` even runs, making "loadLayout was called"
    // trivially true regardless of what the fallback path does. Wait for it to land, then clear,
    // so the assertions below prove this test's own fallback load, not the unrelated initial one.
    await vi.waitFor(() => expect(fakeDockLayout.loadLayout).toHaveBeenCalled());
    vi.mocked(fakeDockLayout.loadLayout).mockClear();
    dataProviderGetMock.mockResolvedValue(undefined);

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    // The negative above would also hold if the switch did nothing at all - assert the positive
    // too: the fallback path actually loads the bare layout rather than leaving the dock untouched.
    expect(fakeDockLayout.loadLayout).toHaveBeenCalled();
    const { lastCall } = vi.mocked(fakeDockLayout.loadLayout).mock;
    expect(lastCall?.[0]).not.toEqual(
      expect.objectContaining({ builtForProjectId: expect.anything() }),
    );
  });

  it('slow path: warns distinctly when the recents provider itself fails, not just on a timeout', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => {
      throw new Error('PDP unreachable');
    });
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    const { logger } = await import('@shared/services/logger.service');
    // Same underlying `undefined` result as an empty/absent recents list, but this path is a
    // genuine failure - must be distinguishable in the logs from both silence (the fallback test
    // above) and a timeout (a different message, asserted elsewhere in this describe block).
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Could not resolve a usable recent project'),
    );
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('Timed out'));
  }, 15000);

  it('slow path: falls back to the bare layout and warns if resolving the most recent project hangs past the cold-start bound', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    // Never resolves within this test's lifetime - simulates a hung recents-provider round trip
    // (e.g. the early-startup PDP-factory wait). Real timers here (not faked):
    // handleSwitchToSimpleMode starts with a waitForNextPaint() in order to show the overlay
    // earlier, and faking timers made that hang unpredictably depending on whether jsdom's
    // requestAnimationFrame polyfill happens to be setTimeout-based.
    const getRecentProjects = vi.fn(() => new Promise<string[]>(() => {}));
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  }, 5000);

  it('fast path: merges an enabled default-layout supplement entry into the project-bound layout', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    settingsGetMock.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === SUPPLEMENT_FLAG_SETTING) return true;
      return false;
    });
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-supplement' });

    await host.handleSwitchToSimpleMode();

    const { lastCall } = vi.mocked(fakeDockLayout.loadLayout).mock;
    expect(lastCall).toBeDefined();
    const [loadedLayoutArg] = lastCall ?? [];
    // The loaded layout's shape is dynamic — narrow only the fields this test reads.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const loadedLayout = loadedLayoutArg as {
      dockbox: { children: { children: { tabs: { id: string }[] }[] }[] };
    };
    const bibleTextsPanelTabs = loadedLayout.dockbox.children[0].children[0].tabs;
    expect(bibleTextsPanelTabs.map((tab) => tab.id)).toContain(SUPPLEMENT_TAB_ID);
  });

  it('fast path: does not merge a disabled default-layout supplement entry', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    // Default settingsGetMock (from beforeEach) resolves every flag setting to false.
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-no-supplement' });

    await host.handleSwitchToSimpleMode();

    const { lastCall } = vi.mocked(fakeDockLayout.loadLayout).mock;
    expect(lastCall).toBeDefined();
    const [loadedLayoutArg] = lastCall ?? [];
    // The loaded layout's shape is dynamic — narrow only the fields this test reads.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const loadedLayout = loadedLayoutArg as {
      dockbox: { children: { children: { tabs: { id: string }[] }[] }[] };
    };
    const bibleTextsPanelTabs = loadedLayout.dockbox.children[0].children[0].tabs;
    expect(bibleTextsPanelTabs.map((tab) => tab.id)).not.toContain(SUPPLEMENT_TAB_ID);
  });

  it('a superseded switch never reaches loadLayout, even if its own async work finishes after a newer switch started', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-stale' });

    // Start two overlapping switches without awaiting the first - simulates the user changing
    // their mind mid-switch. Both calls' synchronous prefixes (including capturing their own
    // switch generation) run before either call's first await resumes, so the ordering here is
    // deterministic, not racy.
    const firstSwitch = host.handleSwitchToSimpleMode();
    setLastOpenedProject({ id: 'proj-latest' });
    const secondSwitch = host.handleSwitchToSimpleMode();
    await Promise.all([firstSwitch, secondSwitch]);

    // The superseded (first) switch must never even build a layout for the stale project, let
    // alone load one.
    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalledWith('proj-stale');
    expect(fakeDockLayout.loadLayout).toHaveBeenCalledWith(
      expect.objectContaining({ builtForProjectId: 'proj-latest' }),
    );
  });

  it('a superseded switch finalizes its project at most once, not once per switch that resolved to it', async () => {
    // Both switches below end up resolving `cached.id` to the same project: `getLastOpenedProject`
    // is read from the same (real, shared) localStorage-backed cache in both, and the first
    // switch's read happens after its own first await - by which point the second `setLastOpenedProject`
    // call below has already landed. So without the `finally` block's own generation re-check, the
    // superseded (first) switch's `switchedProjectId` still gets set (its inner
    // `runProjectBoundSimpleSwitch` call returns early on the generation mismatch without loading a
    // layout, but `handleSwitchToSimpleMode` itself has no way to know that) and it would finalize
    // the same project a second time.
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-stale' });

    const firstSwitch = host.handleSwitchToSimpleMode();
    setLastOpenedProject({ id: 'proj-latest' });
    const secondSwitch = host.handleSwitchToSimpleMode();
    await Promise.all([firstSwitch, secondSwitch]);

    const finalizeCalls = sendCommandMock.mock.calls.filter(
      ([command]) => command === 'platformScriptureEditor.finalizeProjectSwitch',
    );
    expect(finalizeCalls).toEqual([
      ['platformScriptureEditor.finalizeProjectSwitch', 'proj-latest'],
    ]);
  });

  it('never persists the Simple-mode layout to the Power storage key, even when currentInterfaceMode currently reads power', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    // Everything (including the interfaceMode registerDockLayout seeds on its own initial load)
    // reads 'power' here - simulating a moment where currentInterfaceMode has moved on to 'power'
    // while this Simple-mode switch's tail is still running, independent of whether the
    // switch-generation guard also would have caught it.
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-1' });
    mocks.networkRequest.mockClear();

    await host.handleSwitchToSimpleMode();

    // The fast path loads the Simple-mode layout via `loadLayout(layout, { persist: false })`, so
    // saveLayout's network push must never fire — proving the Simple-mode layout never overwrote
    // this window's persisted Power-mode layout in the main process's structure.
    const saveCalls = mocks.networkRequest.mock.calls.filter(
      ([requestType]) => requestType === SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
    );
    expect(saveCalls).toEqual([]);
  });

  it('refuses to persist a layout containing a Simple-mode tab id while not in Simple mode', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    simpleLayoutTabIdsMock.push('simple-fixed-tab-1');
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    host.registerDockLayout(fakeDockLayout);
    // Wait for the fire-and-forget initial `loadLayout` to reach the dock before firing the
    // synthetic event below — otherwise the structural `layoutLoadGenerationInDock` hold (a still
    // in-flight initial load) intercepts first, masking the content-based guard this test targets.
    await vi.waitFor(() => expect(fakeDockLayout.loadLayout).toHaveBeenCalled());
    mocks.networkRequest.mockClear();

    // Simulate rc-dock's own reactive onLayoutChange firing - e.g. from a stale async
    // webview-content-load (openOrReloadWebView -> addWebViewToDock) completing after the user
    // switched back to Power mid-switch - with a layout that still contains a Simple-mode fixed
    // tab id. This path is NOT reachable through runProjectBoundSimpleSwitch's own generation
    // guard, since rc-dock triggers it directly, not this module's explicit loadLayout call.
    const contaminatedLayout = {
      dockbox: {
        mode: 'horizontal',
        children: [{ tabs: [{ id: 'simple-fixed-tab-1', tabType: 'webView', data: {} }] }],
      },
    };
    // onLayoutChangeRef.current's real type (OnLayoutChange) is rc-dock's own LayoutInfo-shaped
    // signature; this test only needs enough of that shape to exercise saveLayout's tab-id check,
    // so asserting through it here is simpler than building a full LayoutInfo fixture.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await fakeDockLayout.onLayoutChangeRef.current?.(contaminatedLayout as never, '', undefined);

    // The contamination guard's early return means saveLayout never reaches its network-request
    // call — proving the contaminated layout was never pushed to the main process.
    const saveCalls = mocks.networkRequest.mock.calls.filter(
      ([requestType]) => requestType === SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
    );
    expect(saveCalls).toEqual([]);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('refuses to persist a layout containing a window-scoped Simple-mode tab id', async () => {
    // Regression test: `SIMPLE_LAYOUT_TAB_IDS` is always unscoped, but a contaminating tab's live
    // id may carry this window's scope suffix (e.g. it arrived via `loadLayout`'s no-arg branch,
    // which scopes every id it loads) - the guard must strip that suffix before comparing, or a
    // scoped contaminant slips past it.
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    simpleLayoutTabIdsMock.push('simple-fixed-tab-1');
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    host.registerDockLayout(fakeDockLayout);
    await vi.waitFor(() => expect(fakeDockLayout.loadLayout).toHaveBeenCalled());
    mocks.networkRequest.mockClear();

    // `globalThis.windowId` is `'2'` (file-wide beforeEach), matching the `-w2` suffix
    // `withWindowScopedWebViewIds` would have appended to this id had it come through a real scoped
    // load.
    const contaminatedLayout = {
      dockbox: {
        mode: 'horizontal',
        children: [{ tabs: [{ id: 'simple-fixed-tab-1-w2', tabType: 'webView', data: {} }] }],
      },
    };
    // onLayoutChangeRef.current's real type (OnLayoutChange) is rc-dock's own LayoutInfo-shaped
    // signature; this test only needs enough of that shape to exercise saveLayout's tab-id check,
    // so asserting through it here is simpler than building a full LayoutInfo fixture.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await fakeDockLayout.onLayoutChangeRef.current?.(contaminatedLayout as never, '', undefined);

    const saveCalls = mocks.networkRequest.mock.calls.filter(
      ([requestType]) => requestType === SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
    );
    expect(saveCalls).toEqual([]);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('recovers to the bare layout and releases the overlay when the project-bound layout fails to load', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    // Throw only for the project-bound layout (identified by the mock builder's distinctive
    // `builtForProjectId` field), not for `registerDockLayout`'s own fire-and-forget initial bare
    // load or the bare-layout recovery attempt this test expects - matching on the layout's shape
    // avoids depending on exactly which call number is which.
    vi.mocked(fakeDockLayout.loadLayout).mockImplementation((layout) => {
      if (layout && typeof layout === 'object' && 'builtForProjectId' in layout) {
        throw new Error('rc-dock explosion');
      }
    });
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-1' });

    await host.handleSwitchToSimpleMode();

    // Recovered via the bare-layout fallback, instead of leaving the dock stuck on whatever it
    // showed when the project-bound load threw.
    const { lastCall } = vi.mocked(fakeDockLayout.loadLayout).mock;
    expect(lastCall?.[0]).not.toEqual(
      expect.objectContaining({ builtForProjectId: expect.anything() }),
    );
    const { logger } = await import('@shared/services/logger.service');
    // Both warnings genuinely fire on this path: `runProjectBoundSimpleSwitch`'s own catch logs and
    // rethrows, then `handleSwitchToSimpleMode`'s outer catch logs again before calling
    // `loadLayoutWithWarning` (the actual bare-layout recovery). A bare `toHaveBeenCalled()` here
    // would still pass with either one deleted — pin both specifically instead.
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Dock layout failed to load project-bound Simple-mode layout'),
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Switching to Simple mode failed unexpectedly'),
    );
    const { getWorkspaceUpdating } = await import('@renderer/services/workspace-updating-store');
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('raises the overlay before any lookup begins, not just before the layout swap', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-1' });
    const { getWorkspaceUpdating } = await import('@renderer/services/workspace-updating-store');

    const switchPromise = host.handleSwitchToSimpleMode();
    // No await has happened yet inside handleSwitchToSimpleMode's synchronous prefix, so the
    // overlay must already be up by the time this line runs.
    expect(getWorkspaceUpdating()).toBe(true);

    await switchPromise;
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('catches a throw from startWorkspaceUpdate itself rather than letting it escape as an unhandled rejection', async () => {
    // Regression test: `startWorkspaceUpdate()` and the paint wait right after it used to sit
    // BEFORE the try block, so a throw here would skip catch/finally entirely - never releasing
    // the overlay (though in this exact case nothing was raised yet either) and, more importantly,
    // producing an unhandled rejection in the `platform.interfaceMode` subscription callback that
    // calls this function instead of the "failed unexpectedly" warning + bare-layout fallback every
    // other failure in this switch goes through.
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-1' });
    startWorkspaceUpdateMock.mockImplementationOnce(() => {
      throw new Error('workspace-updating-store exploded');
    });

    await expect(host.handleSwitchToSimpleMode()).resolves.toBeUndefined();

    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Switching to Simple mode failed unexpectedly'),
    );
    const { getWorkspaceUpdating } = await import('@renderer/services/workspace-updating-store');
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('does not hang indefinitely waiting for a paint that never happens (e.g. a hidden/occluded window)', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-hidden-window' });
    // Simulate a hidden/occluded window: Chromium's backgroundThrottling stops rAF callbacks from
    // ever firing (it doesn't remove requestAnimationFrame or make it throw - the callback just
    // never runs), so a bare double-rAF wait with no bound would hang here forever.
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 0),
    );

    const start = Date.now();
    await host.handleSwitchToSimpleMode();
    const elapsedMs = Date.now() - start;

    expect(elapsedMs).toBeLessThan(3000);
    vi.unstubAllGlobals();
  }, 5000);

  it('fast path: finalizes the project switch non-blocking after the switch completes', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-side-effects' });

    await host.handleSwitchToSimpleMode();

    // The switch itself doesn't await this command - it's kicked off synchronously (call is
    // observable immediately) but not awaited by handleSwitchToSimpleMode, so the switch's
    // perceived completion time isn't gated on its network round trip.
    expect(sendCommandMock).toHaveBeenCalledWith(
      'platformScriptureEditor.finalizeProjectSwitch',
      'proj-side-effects',
    );
  });

  it('fallback: does not finalize a project switch when no project-bound switch happened', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockResolvedValue(undefined);

    await host.handleSwitchToSimpleMode();

    expect(sendCommandMock).not.toHaveBeenCalled();
  });
});

describe('Scripture Editor tab events keep last-opened-project-cache current', () => {
  const FIXED_SIMPLE_EDITOR_TAB_ID = 'simple-editor-tab';

  beforeEach(() => {
    vi.resetModules();
    clearNetworkEventHandlers();
    localStorage.clear();
    settingsGetMock.mockReset();
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : false,
    );
    settingsSubscribeMock.mockReset();
    settingsSubscribeMock.mockImplementation(async () => async () => true);
    getMetadataForProjectMock.mockReset();
    // Absent isPublished means "not published" (see project-metadata.model.ts), so the default
    // fixture is a normal, cacheable project unless a test overrides it.
    getMetadataForProjectMock.mockResolvedValue({});
    simpleLayoutTabIdsMock.length = 0;
    simpleLayoutTabIdsMock.push(FIXED_SIMPLE_EDITOR_TAB_ID);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('caches the project when the fixed Simple editor tab opens', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-simple-opened',
      },
    });

    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-simple-opened' }));
  });

  it('caches the project when the fixed Simple editor tab updates to a different project', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-simple-updated',
      },
    });

    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-simple-updated' }));
  });

  it('does not cache a Power-mode editor tab, whose id is never one of the fixed Simple-layout ids', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: 'power-mode-editor-tab',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-power',
      },
    });

    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('does not cache a non-editor tab, even if it happens to carry a fixed Simple-layout tab id', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: 'platformScriptureEditor.bibleTexts',
        projectId: 'proj-not-editor',
      },
    });

    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('never caches a published resource as the last-opened Simple-mode project', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    getMetadataForProjectMock.mockResolvedValue({ isPublished: true });
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-resource',
      },
    });

    await vi.waitFor(() => expect(getMetadataForProjectMock).toHaveBeenCalledWith('proj-resource'));
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('logs a warning and does not cache when the metadata lookup rejects', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    getMetadataForProjectMock.mockRejectedValue(new Error('PDP unavailable'));
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    const { logger } = await import('@shared/services/logger.service');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-lookup-fails',
      },
    });

    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalled());
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('stops caching after the dock layout is unregistered', async () => {
    const host = await importHost();
    const unregister = host.registerDockLayout(createFakeDockLayout());
    unregister();
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-after-unregister',
      },
    });

    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
    expect(getLastOpenedProject()).toBeUndefined();
  });

  it('keeps caching after an in-Simple project switch replaces the fixed editor tab id (replace-tab)', async () => {
    // Regression test: an in-Simple project switch (e.g. Paratext -> Open while already in Simple
    // mode) does NOT reuse the fixed Simple editor tab id - `resolveOpenEditorDispatch` dispatches
    // it as `{ kind: 'replace-tab', targetTabId: <current editor id> }`, and `addWebViewToDock`'s
    // `replace-tab` case swaps the WHOLE tab (including its id) for the new webview's freshly
    // generated one. A filter keyed on the original fixed id alone would silently stop matching
    // after this single switch, for the rest of the session.
    //
    // Drives the real `openOrReloadWebView` for the tracking half (where the regression actually
    // lived - the fresh id never getting recognized) rather than asserting on a synthetic event
    // alone. `createBufferedNetworkEventEmitter`/`getNetworkEvent` are separately-mocked layers in
    // this test file with no bridge between them (matching real production, where the emit crosses
    // an actual network round trip before a subscriber sees it) - so a synthetic event for the new
    // id is still used to prove the cache reacts, exactly like every other test in this describe
    // block, but only after `openOrReloadWebView` has run for real and updated the tracked id set.
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    // Initial Power -> Simple switch: the fast path always mounts the fixed editor tab id.
    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: FIXED_SIMPLE_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-initial',
      },
    });
    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-initial' }));

    // In-Simple project switch: a freshly-generated id replaces the fixed one via `replace-tab`.
    const NEW_EDITOR_TAB_ID = 'freshly-generated-guid';
    getWebViewProviderMock.mockResolvedValue({
      getWebView: vi.fn(async () => ({
        id: NEW_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        content: '',
      })),
    });

    await host.openOrReloadWebView(
      { id: NEW_EDITOR_TAB_ID, webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE },
      { type: 'replace-tab', targetTabId: FIXED_SIMPLE_EDITOR_TAB_ID },
      {},
    );
    expect(getWebViewProviderMock).toHaveBeenCalledWith(SCRIPTURE_EDITOR_WEBVIEW_TYPE);

    // The fresh id must now be recognized - not just the original fixed one.
    emitNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW, {
      webView: {
        id: NEW_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-switched',
      },
    });

    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-switched' }));
  });

  it('caches the project when the fixed Simple editor tab opens with a window-scoped id', async () => {
    // Regression test: the fixed tab id opens window-scoped whenever the current layout was loaded
    // via `loadLayout`'s no-arg branch (which scopes every id it loads) rather than the fast path -
    // e.g. a session that starts directly in Simple mode, or the bare-layout fallback. The tracked
    // id set must recognize the scoped id, not just the raw one it was seeded with.
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: `${FIXED_SIMPLE_EDITOR_TAB_ID}-w2`,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-scoped-opened',
      },
    });

    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-scoped-opened' }));
  });

  it('keeps caching after an in-Simple project switch replaces a window-scoped editor tab id (replace-tab)', async () => {
    // Regression test: `resolveOpenEditorDispatch` dispatches `targetTabId` as whichever id is
    // CURRENTLY the Simple editor's - if the current layout loaded via the no-arg branch, that id
    // is window-scoped. The tracked id set must recognize the scoped `targetTabId` in order to add
    // the replacement's id, or tracking silently stops for the rest of the session (same failure
    // mode as the unscoped case above, triggered by a different starting condition).
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    const SCOPED_EDITOR_TAB_ID = `${FIXED_SIMPLE_EDITOR_TAB_ID}-w2`;

    emitNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW, {
      webView: {
        id: SCOPED_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-scoped-initial',
      },
    });
    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-scoped-initial' }));

    const NEW_EDITOR_TAB_ID = 'freshly-generated-guid-2';
    getWebViewProviderMock.mockResolvedValue({
      getWebView: vi.fn(async () => ({
        id: NEW_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        content: '',
      })),
    });

    await host.openOrReloadWebView(
      { id: NEW_EDITOR_TAB_ID, webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE },
      { type: 'replace-tab', targetTabId: SCOPED_EDITOR_TAB_ID },
      {},
    );

    emitNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW, {
      webView: {
        id: NEW_EDITOR_TAB_ID,
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'proj-scoped-switched',
      },
    });

    await vi.waitFor(() => expect(getLastOpenedProject()).toEqual({ id: 'proj-scoped-switched' }));
  });
});

describe('loadLayout restores this window’s layout from the main process', () => {
  beforeEach(() => {
    // Power mode with the supplement flag off, so these tests see exactly the restored layout
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
  });

  test('a window assigned an entry loads it, ids scoped to this window', async () => {
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab-w1') });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:get', 2);
    expect(tabIdsIn(loaded)).toEqual(['saved-tab-w2']);
  });

  test('a legacy window loads the unprefixed legacy layout from localStorage', async () => {
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['legacy-tab-w2']);
  });

  test('a legacy window prefers a window-prefixed legacy key over the stale unprefixed one', async () => {
    // Builds that scoped localStorage per window (before layouts moved into the main process's
    // structure) wrote the dock layout only under prefixed keys, so when one exists the unprefixed
    // key is the older layout
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('stale-tab')));
    localStorage.setItem('1_dock-saved-layout', serialize(layoutWithTab('prefixed-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['prefixed-tab-w2']);
  });

  test('with several window-prefixed legacy keys, the lowest window id wins', async () => {
    // The lowest id was the earliest-created (main) window of the session that wrote the keys —
    // and notably NOT this window's own id (this harness runs as window 2)
    localStorage.setItem('3_dock-saved-layout', serialize(layoutWithTab('higher-tab')));
    localStorage.setItem('1_dock-saved-layout', serialize(layoutWithTab('lowest-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['lowest-tab-w2']);
  });

  test('a second window never receives the legacy layout — the clone fallback is gone', async () => {
    // The legacy layout is present, but main says this window has no entry: it must start empty
    // instead of cloning window 1's legacy layout
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
    respondToGetLayout({ kind: 'empty' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
  });

  test('a window with no entry loads an empty layout — neither testLayout nor simpleLayout', async () => {
    respondToGetLayout({ kind: 'empty' });

    // The harness's simpleLayout and testLayout both hold the anchor tab, so any tab at all would
    // mean one of them leaked in
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
  });

  test('falls back to testLayout only when legacy storage is empty too', async () => {
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    // The dev-fresh-profile behavior: no saved entry and no legacy layout loads testLayout (which
    // here holds the anchor tab; the supplement then merges onto that anchor as usual)
    expect(tabIdsIn(loaded)).toContain('anchor-tab-w2');
  });

  test('a window created for pending content starts truly empty', async () => {
    respondToGetLayout({ kind: 'pending-content' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
  });

  test('a window created for pending content skips the default-layout supplement even when its flag is enabled', async () => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : true,
    );
    respondToGetLayout({ kind: 'pending-content' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
    // The empty base has no anchor panel for a supplement tab to attach to, so an empty result
    // alone says nothing about whether the supplement was considered. The pending-content path
    // leaves before the entries are fetched at all — which is exactly what the unread flag shows.
    expect(mocks.settingsGet).not.toHaveBeenCalledWith(SUPPLEMENT_FLAG_SETTING);
  });

  test('a window created for pending content is not held back from pushing its layout', async () => {
    respondToGetLayout({ kind: 'pending-content' });

    // Unlike the every-attempt-failed fallback (which holds pushes because the dock does not hold
    // the user's real saved layout), a pending-content answer is a genuine answer: the dock's
    // (empty) contents are the real state to persist once this window's content arrives.
    const { dockLayout } = await registerWindow(layoutWithAnchor());
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('routed-in'), undefined, undefined);

    expect(layoutPushes()).toHaveLength(1);
  });
});

describe('loadLayout reports a dock that landed empty', () => {
  /** Let any already-scheduled fire-and-forget continuation run before asserting a negative */
  async function flushMicrotasks() {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  /** Answer `windowLayout:get` and `windowLayout:emptied`; every other request resolves undefined */
  function respondToGetLayoutAndEmptied(getResponse: unknown, emptiedResponse: unknown) {
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') return getResponse;
      if (requestType === 'windowLayout:emptied') return emptiedResponse;
      return undefined;
    });
  }

  beforeEach(() => {
    // Power mode with the supplement flag off: `loadLayout` takes the direct-load (unmerged) branch
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
  });

  test('a window that lands empty reports born-empty and opens Home when main says to', async () => {
    respondToGetLayoutAndEmptied({ kind: 'empty' }, { action: 'open-home' });
    const module = await primeWebViewOpenPath();
    const { dockLayout, addWebViewToDockCalls } = makeDockLayoutThatTracksAdds(layoutWithAnchor());

    module.registerDockLayout(dockLayout);

    await vi.waitFor(() =>
      expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:emptied', 2, 'born-empty'),
    );
    await vi.waitFor(() =>
      expect(addWebViewToDockCalls).toEqual([
        expect.objectContaining({ webViewType: 'platformGetResources.home' }),
      ]),
    );
  });

  test('a window that lands empty via the merged-supplement branch also reports born-empty', async () => {
    // Flag on, so `loadLayout` takes the supplemented branch instead of the direct-load one above —
    // but the base (empty) layout has no anchor panel for the supplement tab to attach to, so
    // merging still leaves the loaded layout with zero tabs
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : true,
    );
    respondToGetLayoutAndEmptied({ kind: 'empty' }, { action: 'closing' });

    await loadLayoutInWindow(layoutWithAnchor());

    await vi.waitFor(() =>
      expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:emptied', 2, 'born-empty'),
    );
  });

  test('a window created for pending content does not report emptiness', async () => {
    respondToGetLayoutAndEmptied({ kind: 'pending-content' }, { action: 'open-home' });

    await loadLayoutInWindow(layoutWithAnchor());
    await flushMicrotasks();

    expect(mocks.networkRequest).not.toHaveBeenCalledWith(
      'windowLayout:emptied',
      expect.anything(),
      expect.anything(),
    );
  });

  test('a window whose loaded layout has a tab does not report emptiness', async () => {
    respondToGetLayoutAndEmptied(
      { kind: 'entry', layout: layoutWithTab('t1') },
      { action: 'open-home' },
    );

    await loadLayoutInWindow(layoutWithAnchor());
    await flushMicrotasks();

    expect(mocks.networkRequest).not.toHaveBeenCalledWith(
      'windowLayout:emptied',
      expect.anything(),
      expect.anything(),
    );
  });

  test('main answering closing does not open Home', async () => {
    respondToGetLayoutAndEmptied({ kind: 'empty' }, { action: 'closing' });
    const module = await primeWebViewOpenPath();
    const { dockLayout, addWebViewToDockCalls } = makeDockLayoutThatTracksAdds(layoutWithAnchor());

    module.registerDockLayout(dockLayout);

    await vi.waitFor(() =>
      expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:emptied', 2, 'born-empty'),
    );
    await flushMicrotasks();
    expect(addWebViewToDockCalls).toEqual([]);
  });

  describe('when the emptied round trip fails', () => {
    /**
     * Every `windowLayout:emptied` report made so far.
     *
     * The request mock is shared by the whole file, and a report's retries are fire-and-forget, so
     * counting reports here only says something about THIS test as long as no other test leaves a
     * report retrying (see `respondToGetLayout`) — an abandoned retry lands in whichever test is
     * running when its delay elapses.
     */
    function emptiedReports() {
      return mocks.networkRequest.mock.calls.filter(
        ([requestType]) => requestType === 'windowLayout:emptied',
      );
    }

    /** Stand up the open path, register a dock layout, and drive the report's retry delays */
    async function registerThroughEmptiedRetries() {
      const module = await primeWebViewOpenPath();
      const { dockLayout, loadedLayouts, addWebViewToDockCalls } =
        makeDockLayoutThatTracksAdds(layoutWithAnchor());
      vi.useFakeTimers();
      try {
        module.registerDockLayout(dockLayout);
        await vi.advanceTimersByTimeAsync(60_000);
      } finally {
        vi.useRealTimers();
      }
      expect(loadedLayouts.length).toBeGreaterThan(0);
      return { addWebViewToDockCalls };
    }

    test('retries the report and acts on the answer a later attempt brings', async () => {
      // Home-on-empty hangs off this one round trip, so a transport hiccup that would have been
      // over by the next attempt otherwise decides what the window shows for the rest of the
      // session
      let emptiedCalls = 0;
      mocks.networkRequest.mockImplementation(async (requestType: string) => {
        if (requestType === 'windowLayout:get') return { kind: 'empty' };
        if (requestType !== 'windowLayout:emptied') return undefined;
        emptiedCalls += 1;
        if (emptiedCalls < 3) throw new Error('transport not up yet');
        return { action: 'closing' };
      });

      const { addWebViewToDockCalls } = await registerThroughEmptiedRetries();

      expect(emptiedReports()).toHaveLength(3);
      // The answer that finally arrived says this window is on its way out, so nothing is docked
      // into it
      expect(addWebViewToDockCalls).toEqual([]);
    });

    test('docks Home locally when every attempt fails, without reporting again', async () => {
      // No answer is coming, and an empty dock offers the user no way to open anything. Home is
      // the one outcome that cannot strand them; closing is not this side's decision to take.
      mocks.networkRequest.mockImplementation(async (requestType: string) => {
        if (requestType === 'windowLayout:get') return { kind: 'empty' };
        if (requestType === 'windowLayout:emptied') throw new Error('transport is down');
        return undefined;
      });

      const { addWebViewToDockCalls } = await registerThroughEmptiedRetries();

      expect(addWebViewToDockCalls).toEqual([
        expect.objectContaining({ webViewType: 'platformGetResources.home' }),
      ]);
      expect(emptiedReports()).toHaveLength(3);
    });
  });

  describe('a dock that lost its last docked tab', () => {
    /**
     * Layout with one tab floating above a dock that holds nothing but the empty placeholder panel
     * rc-dock puts in a root box with no panels left
     */
    function layoutWithOnlyAFloatingTab(): LayoutInfo {
      return {
        dockbox: { mode: 'horizontal', children: [{ id: '+0', tabs: [] }] },
        floatbox: {
          mode: 'float',
          children: [
            {
              tabs: [
                {
                  id: 'floated-tab',
                  tabType: TAB_TYPE_WEBVIEW,
                  data: { id: 'floated-tab', webViewType: 'test.type', state: {} },
                },
              ],
            },
          ],
        },
      } as unknown as LayoutInfo;
    }

    /** Stand up the open path and a registered dock layout, with the initial load already landed */
    async function windowHoldingOneTab() {
      respondToGetLayoutAndEmptied(
        { kind: 'entry', layout: layoutWithTab('t1') },
        { action: 'closing' },
      );
      const module = await primeWebViewOpenPath();
      const { dockLayout, loadedLayouts, addWebViewToDockCalls } =
        makeDockLayoutThatTracksAdds(layoutWithAnchor());
      module.registerDockLayout(dockLayout);
      await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
      return { module, addWebViewToDockCalls };
    }

    test('a tab floated out of the dock keeps the window: Home fills the dock, nothing is reported', async () => {
      const { module, addWebViewToDockCalls } = await windowHoldingOneTab();

      await module.handleDockEmptiedByRemoval(layoutWithOnlyAFloatingTab());

      // Reporting here would have the main process close a window whose floating tab (or open
      // dialog, which is also a float) is very much still there
      expect(mocks.networkRequest).not.toHaveBeenCalledWith(
        'windowLayout:emptied',
        expect.anything(),
        'emptied-by-removal',
      );
      expect(addWebViewToDockCalls).toEqual([
        expect.objectContaining({ webViewType: 'platformGetResources.home' }),
      ]);
    });

    test('the last tab in the window leaving reports the dock emptied', async () => {
      const { module, addWebViewToDockCalls } = await windowHoldingOneTab();

      await module.handleDockEmptiedByRemoval(layoutWithNoTabsAnywhere());

      expect(mocks.networkRequest).toHaveBeenCalledWith(
        'windowLayout:emptied',
        2,
        'emptied-by-removal',
      );
      // Main answered `closing`, so nothing is docked into a window on its way out
      expect(addWebViewToDockCalls).toEqual([]);
    });
  });

  describe('the arrival flag the main process re-checks a report against', () => {
    test('says content arrived once Home is docked in answer to the report', async () => {
      respondToGetLayoutAndEmptied({ kind: 'empty' }, { action: 'open-home' });
      const module = await primeWebViewOpenPath();
      const { dockLayout, addWebViewToDockCalls } =
        makeDockLayoutThatTracksAdds(layoutWithAnchor());

      module.registerDockLayout(dockLayout);
      await vi.waitFor(() => expect(addWebViewToDockCalls.length).toBeGreaterThan(0));

      // The report went out while this dock was empty and Home landed after it. A main process
      // still deciding what to do about that report has to be able to see it is out of date.
      await expect((await registeredShard()).hasContentArrivedSinceEmptyReport()).resolves.toBe(
        true,
      );
    });

    test('says nothing arrived while the window is as empty as it reported', async () => {
      respondToGetLayoutAndEmptied({ kind: 'empty' }, { action: 'closing' });
      const module = await primeWebViewOpenPath();
      const { dockLayout, addWebViewToDockCalls } =
        makeDockLayoutThatTracksAdds(layoutWithAnchor());

      module.registerDockLayout(dockLayout);
      await vi.waitFor(() =>
        expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:emptied', 2, 'born-empty'),
      );
      await flushMicrotasks();

      expect(addWebViewToDockCalls).toEqual([]);
      await expect((await registeredShard()).hasContentArrivedSinceEmptyReport()).resolves.toBe(
        false,
      );
    });

    test('a settings tab counts as content arriving, the same as a web view', async () => {
      respondToGetLayoutAndEmptied(
        { kind: 'entry', layout: layoutWithTab('t1') },
        { action: 'closing' },
      );
      const module = await primeWebViewOpenPath();
      const { dockLayout, loadedLayouts } = makeDockLayoutThatTracksAdds(layoutWithAnchor());
      // A settings tab goes in through `addTabToDock`, which the shared stand-in does not carry
      (dockLayout as unknown as { addTabToDock: unknown }).addTabToDock = vi.fn(() => ({
        type: 'float',
      }));
      module.registerDockLayout(dockLayout);
      await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
      const shard = await registeredShard();
      await expect(shard.hasContentArrivedSinceEmptyReport()).resolves.toBe(false);

      await shard.openSettingsTab();

      await expect(shard.hasContentArrivedSinceEmptyReport()).resolves.toBe(true);
    });

    test('a window that has held content still answers for the report it is sending now', async () => {
      // The flag answers one question — has anything reached this dock SINCE the report the main
      // process is holding — so every report starts it over. A window that keeps the answer it
      // earned from earlier content says "content arrived" to every report it ever sends, and the
      // main process, which re-checks before acting, then never closes it.
      let releaseEmptiedReport: ((response: unknown) => void) | undefined;
      mocks.networkRequest.mockImplementation(async (requestType: string) => {
        if (requestType === 'windowLayout:get')
          return { kind: 'entry', layout: layoutWithTab('t1') };
        if (requestType !== 'windowLayout:emptied') return undefined;
        // Held open, because the flag has to be read at the moment the main process reads it:
        // while the report it describes is still in flight
        return new Promise((resolve) => {
          releaseEmptiedReport = resolve;
        });
      });
      const module = await primeWebViewOpenPath();
      const { dockLayout, loadedLayouts } = makeDockLayoutThatTracksAdds(layoutWithAnchor());
      // A settings tab goes in through `addTabToDock`, which the shared stand-in does not carry
      (dockLayout as unknown as { addTabToDock: unknown }).addTabToDock = vi.fn(() => ({
        type: 'float',
      }));
      module.registerDockLayout(dockLayout);
      await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
      const shard = await registeredShard();

      // Content arrives, putting this window on record as having had some
      await shard.openSettingsTab();
      await expect(shard.hasContentArrivedSinceEmptyReport()).resolves.toBe(true);

      // That content goes away again and the window reports the dock emptied. Deliberately not
      // awaited: the report is what this test reads the flag underneath, so it has to still be in
      // flight — the same fire-and-forget shape the dock layout's change handler uses.
      module.handleDockEmptiedByRemoval(layoutWithNoTabsAnywhere());
      await vi.waitFor(() => expect(releaseEmptiedReport).toBeDefined());

      // Nothing has arrived since THAT report went out, whatever this window held before it
      await expect(shard.hasContentArrivedSinceEmptyReport()).resolves.toBe(false);
      releaseEmptiedReport?.({ action: 'closing' });
    });
  });
});

describe('loadLayout when the saved-layout request fails', () => {
  beforeEach(() => {
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    // A legacy layout is present throughout: a request FAILURE must never read it — only a
    // main-process 'legacy' answer may (otherwise the shared legacy layout would be cloned into
    // whichever window hit the failure)
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
  });

  /** Register a dock layout under fake timers and drive the retry delays until the load lands */
  async function registerWindowThroughRetries(simpleLayout: LayoutInfo) {
    vi.useFakeTimers();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts } = makeDockLayout(simpleLayout);
    registerDockLayout(dockLayout);
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(loadedLayouts.length).toBeGreaterThan(0);
    return { dockLayout, loadedLayouts };
  }

  test('retries a failed request and uses the answer a later attempt brings', async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      if (getLayoutCalls < 3) throw new Error('transport not up yet');
      return { kind: 'entry', layout: layoutWithTab('saved-tab') };
    });

    const { dockLayout, loadedLayouts } = await registerWindowThroughRetries(layoutWithAnchor());

    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual(['saved-tab-w2']);
    expect(getItemSpy).not.toHaveBeenCalledWith('dock-saved-layout');
    // Pushes work normally — the load succeeded, just not on the first attempt
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('changed'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('when every attempt fails, the window starts empty and layout pushes are held', async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });

    const { dockLayout, loadedLayouts } = await registerWindowThroughRetries(layoutWithAnchor());

    // Empty — not the legacy layout and not the harness's testLayout (which holds the anchor tab)
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual([]);
    expect(getItemSpy).not.toHaveBeenCalledWith('dock-saved-layout');

    // A layout change must NOT be pushed: what the dock holds is a fallback, and pushing it would
    // overwrite the user's real saved entry in the main process's structure
    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('fallback-era'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);
  });

  test('a later successful load lifts the push hold', async () => {
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });

    const { dockLayout } = await registerWindowThroughRetries(layoutWithAnchor());
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('held'), undefined, undefined);
    expect(layoutPushes()).toEqual([]);

    // The transport recovers, and an interface-mode round trip reloads the layout
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab') });
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('simple');
    await interfaceModeCallback('power');

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('after-recovery'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a window on a fallback layout does not report itself born empty', async () => {
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });

    await registerWindowThroughRetries(layoutWithAnchor());

    // The fallback dock is empty, but it is not the user's layout: this window keeps the behavior
    // it had before windows started reporting emptiness at all
    expect(mocks.networkRequest).not.toHaveBeenCalledWith(
      'windowLayout:emptied',
      expect.anything(),
      expect.anything(),
    );
  });
});

describe('a window the main process has told is closing', () => {
  /**
   * Stand the shard up in a window whose emptiness report was answered `closing`.
   *
   * Deliberately without a web view provider or a theme stubbed in: an open or an adopt that got as
   * far as the provider would fail with a `TypeError` off the empty service mock instead of the
   * refusal these tests are about, so the refusal has to happen before any of that to pass.
   */
  async function windowToldItIsClosing() {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    // `closing` rather than the default `open-home`: these tests are about the latch that answer
    // sets, so this is the one place that has to ask for it.
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') return { kind: 'empty' };
      if (requestType === 'windowLayout:emptied') return { action: 'closing' };
      return undefined;
    });
    const module = await import('@renderer/services/web-view.service-shard');
    await module.startWebViewServiceShard();
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    module.registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
    await vi.waitFor(() =>
      expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:emptied', 2, 'born-empty'),
    );
    // Let the answer to that report land before anything asks this window to do work
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
    return registeredShard();
  }

  test('refuses a web view moved into it rather than losing it with the window', async () => {
    const shard = await windowToldItIsClosing();

    await expect(
      shard.adoptWebView({ id: 'moved-view', webViewType: 'test.type' }),
    ).rejects.toThrow(/closing/);
  });

  test('refuses to open a web view in itself', async () => {
    const shard = await windowToldItIsClosing();

    await expect(shard.openWebView('test.type')).rejects.toThrow(/closing/);
  });

  test('refuses to open a settings tab in itself', async () => {
    // A settings tab is routed work like any other: the main process picks the window it lands in,
    // and one whose close is decided takes the tab with it moments later
    const shard = await windowToldItIsClosing();

    await expect(shard.openSettingsTab()).rejects.toThrow(/closing/);
  });

  test('throws rather than answering nothing, which would read as a provider declining', async () => {
    const shard = await windowToldItIsClosing();
    // A provider that declines every open, so that a shard which did NOT refuse would resolve
    // `undefined` here rather than throw. `undefined` is the established "the provider chose not to
    // create it" answer, and the router acts on it by cleaning up as though the open had been
    // considered and turned down — which is not what happened.
    const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
    (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
      async () => ({ getWebView: async () => undefined }),
    );

    await expect(shard.openWebView('test.type')).rejects.toThrow();
  });
});

describe('a dock emptied by removal while running on a fallback layout', () => {
  test('reports nothing — a fallback dock made empty is treated like one born empty', async () => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });
    const module = await import('@renderer/services/web-view.service-shard');
    // Docking Home waits on the shard having started, and this window docks Home now
    await module.startWebViewServiceShard();
    vi.useFakeTimers();
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    module.registerDockLayout(dockLayout);
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(loadedLayouts.length).toBeGreaterThan(0);

    await module.handleDockEmptiedByRemoval(layoutWithNoTabsAnywhere());

    // Same guard as born-empty: reporting would have main close this window and rewrite the
    // persisted structure without it — deleting the saved entry the held pushes exist to protect
    expect(mocks.networkRequest).not.toHaveBeenCalledWith(
      'windowLayout:emptied',
      expect.anything(),
      expect.anything(),
    );
  });

  test('docks Home rather than leaving the user a blank window', async () => {
    // Not reporting is not the same as doing nothing: this window's dock is empty and its user has
    // nothing left to open anything from. Home fills it here, where it costs nothing — the pushes
    // this window makes are held from persistence anyway.
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });
    vi.useFakeTimers();
    const module = await primeWebViewOpenPath();
    const { dockLayout, loadedLayouts, addWebViewToDockCalls } =
      makeDockLayoutThatTracksAdds(layoutWithAnchor());
    module.registerDockLayout(dockLayout);
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(loadedLayouts.length).toBeGreaterThan(0);

    await module.handleDockEmptiedByRemoval(layoutWithNoTabsAnywhere());

    expect(addWebViewToDockCalls).toEqual([
      expect.objectContaining({ webViewType: 'platformGetResources.home' }),
    ]);
  });

  test('a Home open that fails is logged rather than left as an unhandled rejection', async () => {
    // The dock layout's change handler does not await this, so a throw escaping it would surface as
    // an unhandled rejection with nothing to attribute it to
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });
    const module = await import('@renderer/services/web-view.service-shard');
    // Started, but with no web view provider stubbed in, so opening Home cannot get past the
    // provider lookup
    await module.startWebViewServiceShard();
    vi.useFakeTimers();
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    module.registerDockLayout(dockLayout);
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(loadedLayouts.length).toBeGreaterThan(0);

    await expect(
      module.handleDockEmptiedByRemoval(layoutWithNoTabsAnywhere()),
    ).resolves.toBeUndefined();
  });
});

describe('loadLayout discards a load a newer one has superseded', () => {
  /**
   * Let every already-scheduled continuation run. A superseded load produces no observable call, so
   * there is nothing to wait FOR — drain the queue instead and then assert nothing arrived. Several
   * turns because the tail of a load awaits the saved-layout request and then the supplement
   * flags.
   */
  async function settle() {
    for (let turn = 0; turn < 5; turn += 1)
      // Draining is inherently sequential
      // eslint-disable-next-line no-await-in-loop
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });
  }

  test('a slow initial load must not replace the layout of the mode the user switched to', async () => {
    let interfaceMode = 'power';
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // Hold the initial load's saved-layout request open, the way a slow (or retrying) main process
    // would: it takes seconds, and the user can act during them
    let answerFirstGet: ((response: unknown) => void) | undefined;
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      if (getLayoutCalls > 1) return { kind: 'empty' };
      return new Promise((resolve) => {
        answerFirstGet = resolve;
      });
    });

    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(getLayoutCalls).toBe(1));

    // The user switches to simple mode while the initial load is still waiting on main. That load
    // completes and swaps in the static simple layout.
    interfaceMode = 'simple';
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('simple');
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toContain('anchor-tab-w2');
    const loadsBeforeTheLateAnswer = loadedLayouts.length;

    // Main finally answers the first request — with the power layout the user has already left
    if (!answerFirstGet) throw new Error('the saved-layout request was never made');
    answerFirstGet({ kind: 'entry', layout: layoutWithTab('stale-power-tab') });
    await settle();

    // The stale answer must not reach the dock: loading it would replace the whole layout, wiping
    // whatever the user has done since the switch
    expect(loadedLayouts).toHaveLength(loadsBeforeTheLateAnswer);
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).not.toContain('stale-power-tab-w2');

    // Keep the dangling dock-layout registration from leaking into the next test
    dockLayout.onLayoutChangeRef.current = undefined;
  });

  test('a superseded load leaves the interface-mode cache on the newer load’s reading', async () => {
    // The cache decides whether `saveLayout` pushes at all, so a stale writer turns a power-mode
    // session's layout changes into silent no-ops
    let interfaceMode = 'simple';
    let releaseFirstModeRead: (() => void) | undefined;
    let modeReads = 0;
    settingsGetMock.mockImplementation(async (key: string) => {
      if (key !== 'platform.interfaceMode') return false;
      modeReads += 1;
      if (modeReads > 1) return interfaceMode;
      // Park the initial load on its very first read, before it can seed the cache
      await new Promise<void>((resolve) => {
        releaseFirstModeRead = resolve;
      });
      return 'simple';
    });
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    respondToGetLayout({ kind: 'empty' });

    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(releaseFirstModeRead).toBeDefined());

    // The user switches to power mode; that load runs to completion and leaves the cache on 'power'
    interfaceMode = 'power';
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('power');

    // Only now does the initial load's mode read come back — with 'simple', the stale reading
    if (!releaseFirstModeRead) throw new Error('the initial mode read never happened');
    releaseFirstModeRead();
    await settle();

    // Power-mode layout changes must still be pushed
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a superseded load must not declare the window fallback-bound after a newer load succeeded', async () => {
    // The initial load's saved-layout request retries for seconds, which is exactly long enough for
    // a mode round-trip to start and finish inside it. If the initial load's eventual failure still
    // latched the fallback flag, it would hold every layout push for the rest of the session — on
    // behalf of a load whose answer was already thrown away.
    let interfaceMode = 'power';
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    let failLastAttempt: ((reason: Error) => void) | undefined;
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      // The initial load's first two attempts fail outright; its third hangs until this test fails
      // it, so the load that supersedes it (call 4) can finish first
      if (getLayoutCalls <= 2) throw new Error('transport is down');
      if (getLayoutCalls === 3)
        return new Promise((_resolve, reject) => {
          failLastAttempt = reject;
        });
      return { kind: 'entry', layout: layoutWithTab('saved-tab') };
    });

    vi.useFakeTimers();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    // Drive the two retry delays so the initial load reaches its final, hanging attempt
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(getLayoutCalls).toBe(3);

    // The user round-trips through simple mode and back while that attempt hangs. The load that
    // brings them back to power gets a real answer, so this window is NOT on a fallback layout.
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    await interfaceModeCallback('power');
    expect(getLayoutCalls).toBe(4);

    // Only now does the superseded load give up
    if (!failLastAttempt) throw new Error('the final attempt was never made');
    failLastAttempt(new Error('transport is down'));
    await settle();

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });
});

describe('saveLayout pushes this window’s layout to the main process', () => {
  beforeEach(() => {
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
  });

  test('a power-mode layout change pushes the reconciled layout with this window’s id', async () => {
    const { dockLayout } = await registerWindow(layoutWithAnchor());

    // A duplicated tab proves the layout is reconciled on the way out
    const changedLayout = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] },
          { tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] },
        ],
      },
    } as unknown as LayoutInfo;
    await dockLayout.onLayoutChangeRef.current?.(changedLayout, undefined, undefined);

    expect(layoutPushes()).toEqual([
      [
        2,
        {
          dockbox: {
            mode: 'horizontal',
            children: [{ tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] }],
          },
        },
      ],
    ]);
  });

  test('a simple-mode layout change pushes nothing', async () => {
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : false,
    );
    const { dockLayout } = await registerWindow(layoutWithAnchor());

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('ephemeral'), undefined, undefined);

    expect(layoutPushes()).toEqual([]);
  });

  test('a layout change before the initial load lands pushes nothing', async () => {
    // Until the initial load lands, the dock holds rc-dock's empty default rather than anything of
    // this window's. Pushing that would replace the saved entry with an empty layout — and an entry
    // that HAS a layout is no longer eligible for the legacy fallback, so the window would start
    // empty from then on.
    const heldGet = holdGetLayout();

    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(heldGet.hasRequest()).toBe(true));

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('rc-dock-default'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);

    // Once the saved layout lands, pushes resume from there
    heldGet.answerWith({ kind: 'entry', layout: layoutWithTab('saved-tab') });
    await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a layout change while the switch to power is still loading pushes nothing', async () => {
    // The switch to power flips the mode cache before the saved power layout can reach the dock, so
    // for the length of that load the dock still holds the SIMPLE layout while pushes are armed. A
    // web view writing state or focus moving in that window (both run through the dock's
    // onLayoutChange) would push the simple layout as this window's power layout, destroying the
    // saved one for good.
    let interfaceMode = 'simple';
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // Hold the power-mode load's saved-layout request open the way a slow main process would
    const heldGet = holdGetLayout();

    const { dockLayout, loadedLayouts } = await registerWindow(layoutWithAnchor());
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');

    interfaceMode = 'power';
    const switchToPower = interfaceModeCallback('power');
    await vi.waitFor(() => expect(heldGet.hasRequest()).toBe(true));

    // The dock still holds the simple layout at this point
    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('still-the-simple-layout'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);

    // Once the saved power layout lands, it is what the dock gets — and pushes resume from there
    heldGet.answerWith({ kind: 'entry', layout: layoutWithTab('saved-power-tab') });
    await switchToPower;
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual(['saved-power-tab-w2']);

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a layout change after a load throws pushes nothing', async () => {
    // A load that throws leaves the dock exactly where the hold exists to protect it: holding the
    // old mode's layout, with pushes armed under the new mode. Releasing on the way out — the
    // obvious way to keep a failure from wedging persistence for the session — would resume pushes
    // into precisely that state, so the marker stays behind instead and the next load that reaches
    // the dock is what lifts the hold.
    // Switching TO power, so the push that follows is one simple mode would not have blocked anyway
    let failModeRead = false;
    settingsGetMock.mockImplementation(async (key: string) => {
      if (key !== 'platform.interfaceMode') return false;
      if (failModeRead) throw new Error('settings service is down');
      return 'simple';
    });
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab') });

    const { dockLayout } = await registerWindow(layoutWithAnchor());
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');

    // The switch's own load cannot even read the mode, so it never reaches the dock — but the mode
    // cache is already on 'power', so `saveLayout` is armed
    failModeRead = true;
    await interfaceModeCallback('power');

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('after-throw'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);
  });

  test('an abandoned load must not hold pushes once a newer load has reached the dock', async () => {
    // The hold tracks which load's layout is IN the dock, not how many loads are running. A load
    // that is superseded can sit in its saved-layout request for a long time (it retries, and the
    // request itself may never settle), and it ends without ever writing the dock — so once a newer
    // load HAS written the dock, the abandoned one must not keep layout changes from being saved.
    // Counting loads in flight instead would silently stop persisting for the rest of the session.
    let interfaceMode = 'power';
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    settingsSubscribeMock.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // The initial power load parks on a saved-layout request that never comes back
    const abandonedGet = holdGetLayout();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(abandonedGet.hasRequest()).toBe(true));

    // The user round-trips through simple and back; this time the power load gets an answer and
    // reaches the dock, superseding the parked one
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-power-tab') });
    await interfaceModeCallback('power');

    // The abandoned load is still parked, but the dock holds this window's layout — pushes must work
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);

    // Keep the dangling dock-layout registration from leaking into the next test
    dockLayout.onLayoutChangeRef.current = undefined;
  });
});

describe('isWebViewNonceCorrect', () => {
  beforeEach(() => {
    vi.resetModules();
    newNonceMock.mockClear();
  });

  it('returns false for a web view that was never minted a nonce, without minting one as a side effect', async () => {
    const host = await importHost();

    expect(host.isWebViewNonceCorrect('never-opened', 'guessed-nonce')).toBe(false);

    // The regression this guards: `isWebViewNonceCorrect` must be a pure read of the nonce map, not
    // a call through the mint-if-absent `getWebViewNonce` — minting here would leave an
    // unbounded-lifetime map entry for an id nothing will ever legitimately open or close.
    expect(newNonceMock).not.toHaveBeenCalled();
  });

  it('returns true for the nonce legitimately minted when the web view was opened, and false for any other value', async () => {
    const host = await importHost();
    host.registerDockLayout(createFakeDockLayout());
    const webViewId = 'nonce-test-tab';
    let mintedNonce: string | undefined;
    getWebViewProviderMock.mockResolvedValue({
      getWebView: vi.fn(async (_savedDefinition: unknown, _options: unknown, nonce: string) => {
        mintedNonce = nonce;
        return { id: webViewId, webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, content: '' };
      }),
    });

    await host.openOrReloadWebView(
      { id: webViewId, webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE },
      { type: 'tab' },
      {},
    );

    if (!mintedNonce) throw new Error('getWebView was never called with a nonce');
    expect(host.isWebViewNonceCorrect(webViewId, mintedNonce)).toBe(true);
    expect(host.isWebViewNonceCorrect(webViewId, 'some-other-guess')).toBe(false);
  });
});

describe('registerDockLayout unregister', () => {
  beforeEach(() => {
    vi.resetModules();
    settingsGetMock.mockReset();
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    settingsSubscribeMock.mockReset();
  });

  it('logs a warning rather than throwing when the platform.interfaceMode unsubscriber rejects', async () => {
    const rejectingUnsub = vi.fn(async () => {
      throw new Error('unsub failed');
    });
    settingsSubscribeMock.mockImplementation(async () => rejectingUnsub);
    const host = await importHost();
    const { logger } = await import('@shared/services/logger.service');

    const unregister = host.registerDockLayout(createFakeDockLayout());
    // Let `subscribeToInterfaceMode`'s single `await settingsService.subscribe(...)` resolve and
    // assign `unsubscribeInterfaceMode` before tearing down, so `unregister()` below exercises the
    // already-subscribed teardown path (`runUnsubscribe`) rather than the early
    // `unsubscribeRequested` race that tears down inside the subscribe call itself.
    await vi.waitFor(() => expect(settingsSubscribeMock).toHaveBeenCalled());
    await Promise.resolve();
    await Promise.resolve();

    unregister();

    await vi.waitFor(() => expect(rejectingUnsub).toHaveBeenCalled());
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'Dock layout failed to unsubscribe from platform.interfaceMode: unsub failed',
      ),
    );
  });
});

describe('setDetachedScrRef', () => {
  /**
   * Register the shard over a dock layout that accepts every update, and hand back both the
   * published shard object and the updates the dock layout was asked to make.
   */
  async function shardOverLiveDockLayout() {
    const updates: { webViewId: string; updateInfo: unknown }[] = [];
    const module = await import('@renderer/services/web-view.service-shard');
    const { networkObjectService } = await import('@shared/services/network-object.service');
    const dockLayout = {
      onLayoutChangeRef: { current: undefined },
      loadLayout: () => {},
      getAllWebViewDefinitions: () => [],
      updateWebViewDefinition: (webViewId: string, updateInfo: unknown) => {
        updates.push({ webViewId, updateInfo });
        return true;
      },
      getWebViewDefinition: () => undefined,
      simpleLayout: layoutWithAnchor(),
      testLayout: layoutWithAnchor(),
    } as unknown as PapiDockLayout;
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();
    const [, shard] = vi.mocked(networkObjectService.set).mock.calls[0];
    return {
      shard: shard as unknown as {
        setDetachedScrRef: (webViewId: string, scrRef: unknown) => Promise<boolean>;
      },
      updates,
    };
  }

  const validScrRef = { book: 'MAT', chapterNum: 1, verseNum: 1 };

  test('moves a detached web view to the reference it is given', async () => {
    const { shard, updates } = await shardOverLiveDockLayout();

    expect(await shard.setDetachedScrRef('some-web-view', validScrRef)).toBe(true);
    expect(updates).toEqual([
      { webViewId: 'some-web-view', updateInfo: { scrollGroupScrRef: validScrRef } },
    ]);
  });

  test('refuses a scroll group id where an independent reference belongs', async () => {
    // `scrollGroupScrRef` is a union, and a number in it means "follow this scroll group". This
    // method moves a web view that carries its OWN reference, and its arguments arrive off the wire
    // untyped — so without a check, a numeric one attaches a detached web view to a group instead,
    // which is a change to the definition beyond anything this method is able to be asked for
    const { shard, updates } = await shardOverLiveDockLayout();

    expect(await shard.setDetachedScrRef('some-web-view', 0)).toBe(false);
    expect(await shard.setDetachedScrRef('some-web-view', 3)).toBe(false);
    expect(updates).toEqual([]);
  });

  test('refuses anything else that is not shaped like a Scripture reference', async () => {
    const { shard, updates } = await shardOverLiveDockLayout();

    expect(await shard.setDetachedScrRef('some-web-view', undefined)).toBe(false);
    expect(await shard.setDetachedScrRef('some-web-view', { book: 'MAT' })).toBe(false);
    expect(await shard.setDetachedScrRef('some-web-view', 'MAT 1:1')).toBe(false);
    expect(updates).toEqual([]);
  });
});

describe('a failed dock add rolls back what the open already did', () => {
  test('emits the close event and evicts state when addWebViewToDock throws', async () => {
    const module = await import('@renderer/services/web-view.service-shard');
    const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
    const { localThemeService } = await import('@renderer/services/theme.service');
    // Provider succeeds — the failure comes later, at the dock
    // `webViewProviderService` is mocked as `{}` (see the file-level mock above); attaching a stub
    // method to it needs a type assertion because the plain-object mock type doesn't model it.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
      async () => ({
        getWebView: async (saved: { id: string }) => ({
          id: saved.id,
          webViewType: 'test.type',
          contentType: 'html',
          content: '<p>content</p>',
          state: { some: 'state' },
        }),
      }),
    );
    // `openOrReloadWebView` builds the injected theme stylesheet from `theme.cssVariables` before
    // it ever reaches the dock add, so the stub needs that field even though nothing in this test
    // reads it back.
    // `localThemeService` is mocked as `{}` (see the file-level mock above); same untyped-attach
    // reasoning as the provider stub above requires the assertion here too.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
      cssVariables: {},
    }));
    // This test is about a dock add that throws, not about emptiness. The window loads an empty
    // layout (the shared default), so it reports born-empty — and the shared answer to that report
    // is `closing`, which makes the shard refuse this open before it ever reaches the dock. Answer
    // `stay` so the open gets as far as the failure this test exists to cover.
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') return { kind: 'empty' };
      if (requestType === 'windowLayout:emptied') return { action: 'stay' };
      return undefined;
    });
    await module.startWebViewServiceShard();
    const { dockLayout } = await registerWindow(layoutWithTab('unrelated-tab'));
    // `dockLayout` comes back from `makeDockLayout` typed as the full `PapiDockLayout`; overriding
    // one method to throw needs the same untyped-attach assertion as the stubs above.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (dockLayout as { addWebViewToDock?: unknown }).addWebViewToDock = vi.fn(() => {
      throw new Error('Replacing tab failed: target not found');
    });

    await expect(
      module.openWebView('test.type', { type: 'replace-tab', targetTabId: 'gone-tab' }),
    ).rejects.toThrow('Replacing tab failed');

    const { deleteFullWebViewStateById } = await import(
      '@renderer/services/web-view-state.service'
    );
    expect(deleteFullWebViewStateById).toHaveBeenCalledTimes(1);
    const closeEmitter = [...mocks.bufferedEmitters.entries()].find(([name]) =>
      /close/i.test(name),
    )?.[1];
    if (!closeEmitter) throw new Error('close emitter was never created');
    expect(closeEmitter.emit).toHaveBeenCalledWith(
      expect.objectContaining({
        webView: expect.objectContaining({ webViewType: 'test.type' }),
      }),
    );
  });
});

describe('captureAndCloseWebView', () => {
  test('a load in flight is read only after it settles, so a web view it drops is never captured', async () => {
    const TARGET_WEB_VIEW_ID = 'target-web-view';
    // The window-scoped id `loadLayout` gives the tab once it lands (see
    // `withWindowScopedWebViewIds`) — `globalThis.windowId` is `'2'` for every test in this file.
    const SCOPED_TARGET_WEB_VIEW_ID = `${TARGET_WEB_VIEW_ID}-w2`;
    let interfaceMode = 'simple';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // Hold the power-mode load's saved-layout request open the way a slow main process would. The
    // initial (simple-mode) load below never touches this — simple mode loads the static
    // `simpleLayout` directly — so it lands with the target web view already in the dock before this
    // hold ever matters.
    const heldGet = holdGetLayout();

    const module = await primeWebViewOpenPath();
    const { dockLayout, removeTabFromDockCalls } = makeDockLayoutTrackingOneWebView(
      layoutWithTab(TARGET_WEB_VIEW_ID),
      SCOPED_TARGET_WEB_VIEW_ID,
    );
    module.registerDockLayout(dockLayout);
    await vi.waitFor(() =>
      expect(dockLayout.getWebViewDefinition(SCOPED_TARGET_WEB_VIEW_ID)).toBeDefined(),
    );
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');

    // The premise the rest of this test depends on: the dock genuinely holds the web view right
    // before the second load starts, which is what makes that load register as one `loadLayout`
    // tracks as in flight (see its `webViewsBeforeLoad.length > 0` check) rather than the wait this
    // test exists to pin being a no-op.
    expect(dockLayout.getAllWebViewDefinitions().length).toBeGreaterThan(0);

    interfaceMode = 'power';
    const switchToPower = interfaceModeCallback('power');
    // The load is genuinely parked mid-flight, not merely started
    await vi.waitFor(() => expect(heldGet.hasRequest()).toBe(true));

    const shard = await registeredShard();
    const capturePromise = shard.captureAndCloseWebView(SCOPED_TARGET_WEB_VIEW_ID);

    // The load lands with a layout that no longer holds the target web view
    heldGet.answerWith({ kind: 'entry', layout: layoutWithTab('other-tab') });
    await switchToPower;

    await expect(capturePromise).resolves.toBeUndefined();
    expect(removeTabFromDockCalls).toEqual([]);
  });
});
