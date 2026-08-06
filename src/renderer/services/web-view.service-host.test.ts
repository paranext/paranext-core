import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type {
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
} from '@shared/models/docking-framework.model';
import { serialize } from 'platform-bible-utils';

// The service host logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

const ANCHOR_WEB_VIEW_TYPE = 'test.anchor';
const SUPPLEMENT_TAB_ID = 'supplement-tab';

const { storageGetItemMock } = vi.hoisted(() => ({
  storageGetItemMock: vi.fn((): string | undefined => undefined),
}));

// The supplement is product-specific data; supply our own so these tests describe the merge
// behavior rather than whichever tabs the shipped file happens to contain.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: {
    tabs: [
      {
        anchorWebViewType: ANCHOR_WEB_VIEW_TYPE,
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
// importing the module never tries to talk to a real websocket.
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
  getNetworkEvent: () => vi.fn(() => () => true),
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
  // also mock other settings keys returning `true`.
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

// `buildSimpleLayoutForProject`'s `isReadOnly` argument is the value `handleSwitchToSimpleMode`
// computes from the resolved project's real editability, so capturing it here is the primary
// assertion point below. `SIMPLE_LAYOUT_TAB_IDS` is mocked to `[]` so the (real,
// separately-tested) tabs-resolved tracker resolves immediately instead of waiting on webview
// open/update events that never fire in this test.
const { buildSimpleLayoutForProjectMock } = vi.hoisted(() => ({
  buildSimpleLayoutForProjectMock: vi.fn((projectId: string, isReadOnly: boolean) => ({
    dockbox: { mode: 'horizontal' as const, children: [] },
    builtForProjectId: projectId,
    builtIsReadOnly: isReadOnly,
  })),
}));
vi.mock('@renderer/components/docking/simple-layout.builder', () => ({
  buildSimpleLayoutForProject: buildSimpleLayoutForProjectMock,
  SIMPLE_LAYOUT_TAB_IDS: [],
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
    dataProviderGetMock.mockReset();
    dataProviderGetMock.mockResolvedValue(undefined);
    buildSimpleLayoutForProjectMock.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('fast path: builds a read-only layout when the cached project is not editable', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-readonly', isEditable: false });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-readonly', true);
    expect(fakeDockLayout.loadLayout).toHaveBeenCalledWith(
      expect.objectContaining({ builtForProjectId: 'proj-readonly', builtIsReadOnly: true }),
    );
    // The fast path must never touch the slow-path recents lookup.
    expect(dataProviderGetMock).not.toHaveBeenCalledWith(
      'platformScripture.recentlyOpenedProjects',
    );
  });

  it('fast path: builds an editable layout when the cached project is editable', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-editable', isEditable: true });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-editable', false);
  });

  it('fast path: treats a cache entry with no isEditable field as editable', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-unknown' });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-unknown', false);
  });

  it('slow path: resolves the most recent project, looks up real editability, and seeds the cache', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const getRecentProjects = vi.fn(async () => ['proj-recent']);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );
    getMetadataForProjectMock.mockResolvedValue({ isEditable: false });

    await host.handleSwitchToSimpleMode();

    expect(getMetadataForProjectMock).toHaveBeenCalledWith('proj-recent');
    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-recent', true);

    const { getLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    expect(getLastOpenedProject()).toEqual({ id: 'proj-recent', isEditable: false });
  });

  it('slow path: an editable resolved project builds a non-read-only layout', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects: vi.fn(async () => ['proj-recent-editable']) }
        : undefined,
    );
    getMetadataForProjectMock.mockResolvedValue({ isEditable: true });

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-recent-editable', false);
  });

  it('slow path failure: defaults to editable and logs a warning when the metadata lookup rejects', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects: vi.fn(async () => ['proj-lookup-fails']) }
        : undefined,
    );
    getMetadataForProjectMock.mockRejectedValue(new Error('metadata lookup failed'));

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-lookup-fails', false);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('fallback: with no cache and no resolvable recent project, skips the project-bound layout entirely', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockResolvedValue(undefined);

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
  });

  it('slow path: falls back to the bare layout and warns if resolving the most recent project hangs past the cold-start bound', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    // Never resolves within this test's lifetime - simulates a hung recents-provider round trip
    // (e.g. the early-startup PDP-factory wait described in the Tier 0 #5 investigation).
    const getRecentProjects = vi.fn(() => new Promise<string[]>(() => {}));
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects }
        : undefined,
    );

    vi.useFakeTimers();
    try {
      const switchPromise = host.handleSwitchToSimpleMode();
      await vi.advanceTimersByTimeAsync(host.COLD_START_LOOKUP_TIMEOUT_MS);
      await switchPromise;
    } finally {
      vi.useRealTimers();
    }

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    expect(getMetadataForProjectMock).not.toHaveBeenCalled();
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('slow path: falls back to the bare layout and warns if resolving editability hangs past the cold-start bound', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    dataProviderGetMock.mockImplementation(async (dataProviderId: string) =>
      dataProviderId === 'platformScripture.recentlyOpenedProjects'
        ? { getRecentProjects: vi.fn(async () => ['proj-slow-editability']) }
        : undefined,
    );
    // Never resolves - simulates a hung PDP-factory wait inside getMetadataForProject.
    getMetadataForProjectMock.mockImplementation(() => new Promise(() => {}));

    vi.useFakeTimers();
    try {
      const switchPromise = host.handleSwitchToSimpleMode();
      await vi.advanceTimersByTimeAsync(host.COLD_START_LOOKUP_TIMEOUT_MS);
      await switchPromise;
    } finally {
      vi.useRealTimers();
    }

    expect(buildSimpleLayoutForProjectMock).not.toHaveBeenCalled();
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });
});

describe('resolveProjectIsEditable', () => {
  beforeEach(() => {
    vi.resetModules();
    getMetadataForProjectMock.mockReset();
  });

  it('returns true when the project metadata reports isEditable: true', async () => {
    const host = await importHost();
    getMetadataForProjectMock.mockResolvedValue({ isEditable: true });

    await expect(host.resolveProjectIsEditable('proj-1')).resolves.toBe(true);
  });

  it('returns false when the project metadata reports isEditable: false', async () => {
    const host = await importHost();
    getMetadataForProjectMock.mockResolvedValue({ isEditable: false });

    await expect(host.resolveProjectIsEditable('proj-1')).resolves.toBe(false);
  });

  it('defaults to true (editable) when isEditable is absent from the metadata', async () => {
    const host = await importHost();
    getMetadataForProjectMock.mockResolvedValue({});

    await expect(host.resolveProjectIsEditable('proj-1')).resolves.toBe(true);
  });

  it('defaults to true (editable) and logs a warning when the lookup rejects', async () => {
    const host = await importHost();
    getMetadataForProjectMock.mockRejectedValue(new Error('boom'));

    await expect(host.resolveProjectIsEditable('proj-1')).resolves.toBe(true);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });
});
