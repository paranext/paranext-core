import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PapiDockLayout } from '@shared/models/docking-framework.model';

// web-view.service-host.ts creates buffered network event emitters and network-backed events at
// module load (`getNetworkEvent`, `createBufferedNetworkEventEmitter`). Stub the network layer so
// importing the module never tries to talk to a real websocket.
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn() }),
  getNetworkEvent: () => vi.fn(() => () => true),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// theme.service-host.ts calls `window.matchMedia` at module load to seed its dark-mode default,
// which jsdom does not implement. Stub the whole module — none of the functions under test read
// the theme.
vi.mock('@renderer/services/theme.service-host', () => ({
  localThemeService: { getCurrentThemeSync: vi.fn() },
}));

// The host only needs the `TAB_TYPE_SETTINGS_TAB` string constant from this component file, but
// the real file transitively imports the entire `papi-frontend.service` service graph (dozens of
// unrelated services). Stub it directly rather than mocking that whole graph.
vi.mock('@renderer/components/settings-tabs/settings-tab.component', () => ({
  TAB_TYPE_SETTINGS_TAB: 'settings-tab',
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

// `buildSimpleLayoutForProject`'s `isReadOnly` argument is the value `handleSwitchToSimpleMode`
// computes from the resolved project's real editability, so capturing it here is the primary
// assertion point below. `SIMPLE_LAYOUT_TAB_IDS` is mocked to `[]` so the (real,
// separately-tested) tabs-resolved tracker resolves immediately instead of waiting on webview
// open/update events that never fire in this test. The dockbox includes a
// `platformScriptureEditor.bibleTexts` tab so the real (unmocked) default-layout-supplement merge
// has a matching anchor to attach the Scripture Text Grid supplement tab to (see the merge tests
// below) - the merge/filter logic itself is real production code, not mocked.
const { buildSimpleLayoutForProjectMock } = vi.hoisted(() => ({
  buildSimpleLayoutForProjectMock: vi.fn((projectId: string, isReadOnly: boolean) => ({
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
    builtIsReadOnly: isReadOnly,
  })),
}));
vi.mock('@renderer/components/docking/simple-layout.builder', () => ({
  buildSimpleLayoutForProject: buildSimpleLayoutForProjectMock,
  SIMPLE_LAYOUT_TAB_IDS: [],
}));

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

  it('fast path: uses the freshly re-checked editability when it disagrees with the cache', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-drifted', isEditable: true });
    getMetadataForProjectMock.mockResolvedValue({ isEditable: false });

    await host.handleSwitchToSimpleMode();

    expect(getMetadataForProjectMock).toHaveBeenCalledWith('proj-drifted');
    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-drifted', true);
  });

  it('fast path: falls back to the cached editability and warns when the re-check rejects', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-recheck-fails', isEditable: true });
    getMetadataForProjectMock.mockRejectedValue(new Error('PDP unavailable'));

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-recheck-fails', false);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('fast path: falls back to the cached editability and warns when the re-check hangs past its bound', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-recheck-hangs', isEditable: false });
    // Never resolves within this test's lifetime - simulates a hung PDP-factory wait.
    getMetadataForProjectMock.mockImplementation(() => new Promise(() => {}));

    await host.handleSwitchToSimpleMode();

    expect(buildSimpleLayoutForProjectMock).toHaveBeenCalledWith('proj-recheck-hangs', true);
    const { logger } = await import('@shared/services/logger.service');
    expect(logger.warn).toHaveBeenCalled();
  }, 3000);

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

  it('fast path: merges an enabled default-layout supplement entry into the project-bound layout', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    settingsGetMock.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platformScriptureEditor.enableScriptureTextGrid') return true;
      return false;
    });
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-supplement', isEditable: true });

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
    expect(bibleTextsPanelTabs.map((tab) => tab.id)).toContain('scripture-text-grid-tab');
  });

  it('fast path: does not merge a disabled default-layout supplement entry', async () => {
    const host = await importHost();
    const fakeDockLayout = createFakeDockLayout();
    host.registerDockLayout(fakeDockLayout);
    // Default settingsGetMock (from beforeEach) resolves every flag setting to false.
    const { setLastOpenedProject } = await import('@renderer/services/last-opened-project-cache');
    setLastOpenedProject({ id: 'proj-no-supplement', isEditable: true });

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
    expect(bibleTextsPanelTabs.map((tab) => tab.id)).not.toContain('scripture-text-grid-tab');
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
