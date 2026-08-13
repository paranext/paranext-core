import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type {
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
} from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import {
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { serialize } from 'platform-bible-utils';

// The service host logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

// Matches the real default-layout-supplement.json's anchor (platformScriptureEditor.bibleTexts) so
// the same mocked supplement entry can anchor onto both the window-scoping suite's synthetic layout
// and the handleSwitchToSimpleMode suite's `bible-texts-tab` fixture below.
const ANCHOR_WEB_VIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const SUPPLEMENT_TAB_ID = 'supplement-tab';

const { storageGetItemMock } = vi.hoisted(() => ({
  storageGetItemMock: vi.fn((): string | undefined => undefined),
}));

const SUPPLEMENT_FLAG_SETTING = 'test.supplementEnabled';

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

vi.mock('@renderer/services/local-storage.service', () => ({
  default: { getItem: storageGetItemMock, setItem: vi.fn() },
}));

// web-view.service-host.ts creates buffered network event emitters and network-backed events at
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
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
  getNetworkEvent: getNetworkEventMock,
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));
vi.mock('@shared/services/web-view-provider.service', () => ({ webViewProviderService: {} }));

// theme.service-host.ts calls `window.matchMedia` at module load to seed its dark-mode default,
// which jsdom does not implement. Stub the whole module — none of the functions under test read
// the theme.
vi.mock('@renderer/services/theme.service-host', () => ({
  localThemeService: { getCurrentThemeSync: vi.fn() },
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
  settingsSubscribeMock: vi.fn(async () => async () => true),
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
function makeDockLayoutForScoping(simpleLayout: LayoutInfo) {
  const loadedLayouts: LayoutInfo[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [],
    simpleLayout,
    testLayout: simpleLayout,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts };
}

/** Register a dock layout and wait for the fire-and-forget initial `loadLayout` to land */
async function loadLayoutInWindow(simpleLayout: LayoutInfo) {
  const { registerDockLayout } = await import('@renderer/services/web-view.service-host');
  const { dockLayout, loadedLayouts } = makeDockLayoutForScoping(simpleLayout);
  registerDockLayout(dockLayout);
  await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
  return loadedLayouts[loadedLayouts.length - 1];
}

describe('loadLayout scopes web view ids to this window', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    globalThis.windowId = '2';
    storageGetItemMock.mockReturnValue(undefined);
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
    // Power mode persists the merged layout, so the next load restores a supplement tab that is
    // already scoped — to another window's id, since window ids are not stable across restarts
    const savedSupplementTab: SavedTabInfo = {
      id: `${SUPPLEMENT_TAB_ID}-w1`,
      tabType: TAB_TYPE_WEBVIEW,
      data: { id: `${SUPPLEMENT_TAB_ID}-w1`, webViewType: 'test.supplement', state: {} },
    } as unknown as SavedTabInfo;
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : true,
    );
    storageGetItemMock.mockReturnValue(serialize(layoutWithAnchor([savedSupplementTab])));

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
  return import('@renderer/services/web-view.service-host');
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
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('timed out'));
  }, 5000);

  it('fallback: with no cache and no resolvable recent project, skips the project-bound layout entirely', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockResolvedValue(undefined);

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
  });

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
    localStorage.setItem(
      'dock-saved-layout',
      JSON.stringify({ dockbox: { mode: 'horizontal', children: [] }, marker: 'power-layout' }),
    );
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-1' });

    await host.handleSwitchToSimpleMode();

    expect(localStorage.getItem('dock-saved-layout')).toContain('power-layout');
  });

  it('refuses to persist a layout containing a Simple-mode tab id while not in Simple mode', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    simpleLayoutTabIdsMock.push('simple-fixed-tab-1');
    settingsGetMock.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    host.registerDockLayout(fakeDockLayout);
    localStorage.setItem(
      'dock-saved-layout',
      JSON.stringify({
        dockbox: { mode: 'horizontal', children: [] },
        marker: 'good-power-layout',
      }),
    );

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

    expect(localStorage.getItem('dock-saved-layout')).toContain('good-power-layout');
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
    expect(logger.warn).toHaveBeenCalled();
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
});
