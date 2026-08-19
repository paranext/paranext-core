import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { EVENT_NAME_ON_DID_UPDATE_WEB_VIEW } from '@shared/services/web-view.service-model';
import {
  useProjectPickerData,
  type ProjectPickerData,
  MAX_METADATA_FETCH_RETRIES,
} from './use-project-picker-data.hook';

// --- Mocks ---

vi.mock('@shared/services/network.service', async () => {
  const { PlatformEventEmitter } = await import('platform-bible-utils');
  return {
    getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
    createNetworkEventEmitter: vi.fn(() => new PlatformEventEmitter()),
    papiNetworkService: {
      createNetworkEventEmitter: vi.fn(() => new PlatformEventEmitter()),
      onDidClientConnect: new PlatformEventEmitter().event,
    },
  };
});

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

// useData is set up per-test in beforeEach; the factory just provides the mock function shell.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(),
}));

// The cross-window web view proxy. Mocked but never driven: the picker must derive the current
// project from this window's dock layout, so a test asserts this proxy is never queried.
vi.mock('@renderer/services/papi-frontend.service', () => ({
  webViews: {
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
  },
}));

// This window's own open web views, which is what the picker reads.
vi.mock('@renderer/services/web-view.service-host', () => ({
  getAllOpenWebViewDefinitionsSync: vi.fn(() => []),
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {
    getMetadataForAllProjects: vi.fn(async () => []),
    // Single-project fallback the hook uses to resolve the current project when it is absent from
    // the (USJ-filtered) list snapshot (e.g. its layering PDPF has not registered yet).
    getMetadataForProject: vi.fn(),
  },
}));

// The hook renders entirely from cheap project metadata now and must never open a per-project data
// provider - that per-project PDP fan-out (one `.get()` plus five `getSetting()` round trips per
// project) was the O(project count) startup cost this hook was rewritten to eliminate. This mock
// stays in place purely as a regression guard: a uniform afterEach asserts it is never called.
vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: {
    get: vi.fn(),
  },
}));

// --- Helpers ---

const EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';

// Stable references across renders so rawRecentIds keeps the same array identity, preventing
// useMemo from recomputing safeRecentIds every render which would recreate the useCallback
// and trigger an infinite reload loop in usePromise. This mirrors production, where useData
// returns referentially-stable React state; a fresh array literal per render does not.
const DEFAULT_RECENT_IDS: string[] = [];
const RECENT_IDS_R1_R2: string[] = ['proj-r1', 'proj-r2'];
const RECENT_IDS_R1: string[] = ['proj-r1'];

type MetadataFixture = {
  id: string;
  name?: string;
  fullName?: string;
  language?: string;
  languageTag?: string;
  isEditable?: boolean;
  projectInterfaces?: string[];
};

// Fixtures provide the scripture-editor projectInterface by default because that is what the
// (service-side-filtered) metadata fetch returns; the hook derives all three sections from it.
function metadata(fixture: MetadataFixture) {
  return {
    projectInterfaces: ['platformScripture.USJ_Chapter'],
    pdpFactoryInfo: {},
    ...fixture,
  };
}

/**
 * Maps fixtures to the metadata list `getMetadataForAllProjects` resolves. The hook fetches the
 * list once per refresh (filtered service-side to the picker's projectInterface) and derives
 * currentSimpleProject/recents/allProjects locally, so tests resolve the mapped list directly via
 * `mockResolvedValue` - the same idiom `beforeEach` uses for this mock.
 */
function metadataList(items: MetadataFixture[]) {
  return items.map(metadata);
}

async function importMocks() {
  const { getNetworkEvent } = await import('@shared/services/network.service');
  const { webViews } = await import('@renderer/services/papi-frontend.service');
  const { getAllOpenWebViewDefinitionsSync } = await import(
    '@renderer/services/web-view.service-host'
  );
  const { projectLookupService } = await import('@shared/services/project-lookup.service');
  const { papiFrontendProjectDataProviderService } = await import(
    '@shared/services/project-data-provider.service'
  );
  const { useData } = await import('@renderer/hooks/papi-hooks');
  return {
    getNetworkEvent,
    webViews,
    getAllOpenWebViewDefinitionsSync,
    projectLookupService,
    papiFrontendProjectDataProviderService,
    useData,
  };
}

/**
 * Deterministically settle the hook's mocked async work. usePromise resolves purely through
 * microtasks (no timers, polling, or retries), so draining the microtask queue inside act() drives
 * the hook to completion regardless of CPU speed. This replaces RTL's waitFor, whose wall-clock
 * deadline flaked on CPU-starved CI runners even though the underlying resolution order is fully
 * deterministic. The iteration cap is a safety net against a genuine hang, not a tuned timeout - if
 * it is ever hit, the follow-up assertions fail loudly rather than the whole test timing out.
 */
async function settle(result: { current: ProjectPickerData }) {
  for (let i = 0; i < 20 && result.current.isLoading; i += 1) {
    // Each turn must run sequentially so React commits the resulting state before the next check
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();
    });
  }
}

// --- Tests ---

// vitest mocks use as-never to coerce partial objects to the full inferred return type
/* eslint-disable no-type-assertion/no-type-assertion */
describe('useProjectPickerData', () => {
  // The hook ORs four async loading flags (three usePromise calls + one useData) that settle purely
  // through microtasks - no timers, polling, or retries. Tests therefore drive it to completion with
  // settle() (a deterministic microtask drain) rather than waitFor, whose wall-clock deadline flaked
  // on CPU-starved CI runners even though the resolution order is fully deterministic.

  beforeEach(async () => {
    // resetAllMocks clears both call history and any mockReturnValue/mockImplementation overrides
    // set by individual tests. clearAllMocks only clears call history, so without reset, a test
    // that calls mockReturnValue(...) contaminates all subsequent tests.
    vi.resetAllMocks();

    const { getNetworkEvent, getAllOpenWebViewDefinitionsSync, projectLookupService, useData } =
      await importMocks();

    vi.mocked(getNetworkEvent).mockImplementation(() => vi.fn(() => vi.fn()));
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([]);
    // Default the single-project fallback to "not found" (it throws in production when no PDPF
    // provides the id); tests that exercise the fallback's success path override this.
    vi.mocked(projectLookupService.getMetadataForProject).mockRejectedValue(
      new Error('No project found'),
    );
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([DEFAULT_RECENT_IDS, vi.fn(), false]),
    }));
  });

  // Regression guard for the hook's core promise: rendering must never open a per-project data
  // provider. beforeEach's resetAllMocks clears call history, so this sees only the just-finished
  // test's calls. A throw here fails that test (plain throw, not expect, which the
  // vitest/no-standalone-expect rule bans outside test blocks).
  afterEach(async () => {
    const { papiFrontendProjectDataProviderService } = await importMocks();
    const callCount = vi.mocked(papiFrontendProjectDataProviderService.get).mock.calls.length;
    if (callCount > 0)
      throw new Error(
        `papiFrontendProjectDataProviderService.get was called ${callCount} time(s); the hook must render from metadata alone, never opening a per-project data provider`,
      );
  });

  it('returns undefined currentSimpleProject when no Scripture Editor web view is open', async () => {
    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentSimpleProject).toBeUndefined();
  });

  it('returns currentSimpleProject from the first open Scripture Editor web view, from metadata alone', async () => {
    const { getAllOpenWebViewDefinitionsSync, projectLookupService } = await importMocks();
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-abc' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-abc', fullName: 'Genesis Project', name: 'Genesis' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentSimpleProject?.fullName).toBe('Genesis Project');
    expect(result.current.currentSimpleProject?.id).toBe('proj-abc');
  });

  it('names the current project from THIS window only, never another window’s editor', async () => {
    // The `webViews` network object is the main process's routing proxy: its
    // getAllOpenWebViewDefinitions fans out across every open window. The picker labels the project
    // of the editor in its OWN window (and feeds a toolbar that navigates this window's target), so
    // it must read the local dock layout and never that cross-window list - otherwise a background
    // window's editor names this window's current project.
    const { webViews, getAllOpenWebViewDefinitionsSync, projectLookupService } =
      await importMocks();
    // This window has no editor open; another window does (only the proxy would report it).
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([]);
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
      { id: 'wv-other-window', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-elsewhere' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-elsewhere', fullName: 'Other Window Project' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentSimpleProject).toBeUndefined();
    expect(webViews.getAllOpenWebViewDefinitions).not.toHaveBeenCalled();
  });

  it('returns allProjects from projectLookupService metadata, without opening any project data provider', async () => {
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'p1', fullName: 'Full p1', name: 'Short p1', language: 'English', isEditable: true },
        { id: 'p2', fullName: 'Full p2', name: 'Short p2', language: 'English', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.allProjects).toHaveLength(2);
    expect(result.current.allProjects[0]).toMatchObject({
      id: 'p1',
      fullName: 'Full p1',
      shortName: 'Short p1',
      language: 'English',
    });
    expect(result.current.allProjects[1]).toMatchObject({
      id: 'p2',
      fullName: 'Full p2',
      shortName: 'Short p2',
      language: 'English',
    });
  });

  it('falls back to the project id for fullName/shortName when metadata name/fullName are missing', async () => {
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-no-names', isEditable: true }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.allProjects).toHaveLength(1);
    expect(result.current.allProjects[0]).toMatchObject({
      id: 'proj-no-names',
      fullName: 'proj-no-names',
      shortName: 'proj-no-names',
    });
  });

  it('recentProjects reflects recent project IDs from data provider, without opening any project data provider', async () => {
    const { projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1_R2, vi.fn(), false]),
    }));
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1', isEditable: true },
        { id: 'proj-r2', fullName: 'Full proj-r2', name: 'Short proj-r2', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.recentProjects).toHaveLength(2);
    expect(result.current.recentProjects[0]).toMatchObject({
      id: 'proj-r1',
      fullName: 'Full proj-r1',
      shortName: 'Short proj-r1',
    });
    expect(result.current.recentProjects[1]).toMatchObject({
      id: 'proj-r2',
      fullName: 'Full proj-r2',
      shortName: 'Short proj-r2',
    });
  });

  it('excludes non-editable projects from allProjects', async () => {
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'editable', fullName: 'Full editable', name: 'Short editable', isEditable: true },
        { id: 'readonly', fullName: 'Full readonly', name: 'Short readonly', isEditable: false },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects).toHaveLength(1);
    expect(result.current.allProjects[0].id).toBe('editable');
  });

  it('fetches metadata once per refresh, shared across all three sections', async () => {
    const { getAllOpenWebViewDefinitionsSync, projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-r1' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    // currentSimpleProject, recentProjects, and allProjects must all derive from ONE metadata fan-out
    // per refresh - the service contacts every PDP factory per call, so three filtered calls
    // would triple the startup-path cost this hook exists to avoid.
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentSimpleProject?.id).toBe('proj-r1');
    expect(result.current.recentProjects).toHaveLength(1);
  });

  it('requests only scripture-editor projects from the service (interface filter is service-side)', async () => {
    // The hook delegates the projectInterface filter to the service so the service's
    // retry-until-non-empty startup grace period keeps retrying until a factory providing that
    // interface registers. It must therefore pass the filter on every metadata fetch and render
    // whatever the (already-filtered) service returns without re-filtering by interface locally.
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'usj', fullName: 'Full usj', name: 'Short usj', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects.map((p) => p.id)).toEqual(['usj']);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
    });
  });

  it('treats projects with missing isEditable as editable, matching the registered default', async () => {
    const { projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        // isEditable omitted on both: the registered default for platform.isEditable is true, so
        // a factory that leaves the optional metadata field unset must not have its projects
        // silently dropped from either list.
        { id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1' },
        { id: 'proj-other', fullName: 'Full proj-other', name: 'Short proj-other' },
        { id: 'readonly', fullName: 'Full readonly', name: 'Short readonly', isEditable: false },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.recentProjects.map((p) => p.id)).toEqual(['proj-r1']);
    expect(result.current.allProjects.map((p) => p.id)).toEqual(['proj-other']);
  });

  it('excludes recent projects from allProjects', async () => {
    const { projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1', isEditable: true },
        {
          id: 'proj-other',
          fullName: 'Full proj-other',
          name: 'Short proj-other',
          isEditable: true,
        },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects).toHaveLength(1);
    expect(result.current.allProjects[0].id).toBe('proj-other');
    expect(result.current.recentProjects[0].id).toBe('proj-r1');
  });

  it('refreshes currentSimpleProject when onDidUpdateWebView fires', async () => {
    const { getNetworkEvent, getAllOpenWebViewDefinitionsSync, projectLookupService } =
      await importMocks();
    let capturedCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) capturedCallback = cb;
          return vi.fn();
        }) as never,
    );

    vi.mocked(getAllOpenWebViewDefinitionsSync)
      .mockReturnValueOnce([])
      .mockReturnValue([
        { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-xyz' },
      ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-xyz', fullName: 'Updated Project', name: 'Updated' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentSimpleProject).toBeUndefined();

    expect(capturedCallback).toBeDefined();
    act(() => capturedCallback!());

    await settle(result);
    expect(result.current.currentSimpleProject?.fullName).toBe('Updated Project');
  });

  it('resolves the current project by direct lookup when it is absent from the filtered list snapshot', async () => {
    // The active editor's project may not be in the picker's USJ-filtered snapshot yet - e.g. its
    // USJ-providing layering PDPF has not registered. The hook must still resolve it via a direct,
    // unfiltered single-project lookup rather than showing an error card during that startup window.
    const { getAllOpenWebViewDefinitionsSync, projectLookupService } = await importMocks();
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-late' },
    ] as never);
    // Filtered snapshot lacks proj-late...
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([] as never);
    // ...but the direct lookup resolves it (merging metadata from whichever PDPF has registered).
    vi.mocked(projectLookupService.getMetadataForProject).mockResolvedValue(
      metadata({ id: 'proj-late', fullName: 'Late Project', name: 'Late' }) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);

    expect(result.current.currentSimpleProject?.id).toBe('proj-late');
    expect(result.current.currentSimpleProject?.fullName).toBe('Late Project');
    expect(result.current.currentSimpleProjectError).toBeUndefined();
    expect(vi.mocked(projectLookupService.getMetadataForProject)).toHaveBeenCalledWith('proj-late');
  });

  it('recovers the current project after a failed lookup once the editor closes and reopens', async () => {
    // When even the direct lookup fails (nothing provides the id yet), the hook shows the error
    // card. That state must clear when there is no current editor, so the project can resolve on a
    // later open instead of staying wedged on 'Unable to load current project details'.
    const { getNetworkEvent, getAllOpenWebViewDefinitionsSync, projectLookupService } =
      await importMocks();
    let webViewCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) webViewCallback = cb;
          return vi.fn();
        }) as never,
    );

    // Editor state the test flips between phases.
    let openDefs: unknown[] = [
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-stuck' },
    ];
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockImplementation(() => openDefs as never);

    // proj-stuck is absent from the filtered snapshot throughout.
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([] as never);
    // The direct lookup fails while proj-stuck is unregistered, then succeeds once it registers.
    vi.mocked(projectLookupService.getMetadataForProject)
      .mockRejectedValueOnce(new Error('No project found'))
      .mockResolvedValue(
        metadata({ id: 'proj-stuck', fullName: 'Recovered Project', name: 'Recovered' }) as never,
      );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    // Phase 1: absent from snapshot and direct lookup fails → error card.
    expect(result.current.currentSimpleProjectError).toBe('Unable to load current project details');

    // Phase 2: editor closes → current project clears (and the error resets).
    openDefs = [];
    act(() => webViewCallback!());
    await settle(result);
    expect(result.current.currentSimpleProject).toBeUndefined();
    expect(result.current.currentSimpleProjectError).toBeUndefined();

    // Phase 3: the same project reopens, now resolvable by the direct lookup → it resolves instead
    // of staying stuck on the error card.
    openDefs = [{ id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-stuck' }];
    act(() => webViewCallback!());
    await settle(result);
    expect(result.current.currentSimpleProject?.id).toBe('proj-stuck');
    expect(result.current.currentSimpleProject?.fullName).toBe('Recovered Project');
    expect(result.current.currentSimpleProjectError).toBeUndefined();
  });

  it('does not re-fetch metadata on web view events (metadata cache is decoupled from them)', async () => {
    // Restoring N tabs at startup fires a burst of web view events; each must re-derive only the
    // active editor from the cached metadata, not launch a fresh full PDPF fan-out.
    const { getNetworkEvent, getAllOpenWebViewDefinitionsSync, projectLookupService } =
      await importMocks();
    let webViewCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) webViewCallback = cb;
          return vi.fn();
        }) as never,
    );
    vi.mocked(getAllOpenWebViewDefinitionsSync).mockReturnValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-r1' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentSimpleProject?.id).toBe('proj-r1');

    expect(webViewCallback).toBeDefined();
    act(() => webViewCallback!());
    await settle(result);

    // The web view event re-ran currentSimpleProject but reused the cached metadata: still one fetch.
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentSimpleProject?.id).toBe('proj-r1');
  });

  it('re-fetches metadata when onDidReloadExtensions fires (project set may have changed)', async () => {
    const { getNetworkEvent, projectLookupService } = await importMocks();
    let reloadCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === 'platform.onDidReloadExtensions') reloadCallback = cb;
          return vi.fn();
        }) as never,
    );
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);

    expect(reloadCallback).toBeDefined();
    act(() => reloadCallback!());
    await settle(result);

    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(2);
  });

  it('re-fetches metadata when platform.onDidChangeProjects fires (project added/removed/renamed)', async () => {
    // The C# provider emits platform.onDidChangeProjects when a project is added (S/R, DBL),
    // removed, or has a display setting changed. The picker must invalidate its metadata cache on
    // it so a project cloned/downloaded mid-session shows up without an unrelated refresh.
    const { getNetworkEvent, projectLookupService } = await importMocks();
    let projectsChangedCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === 'platform.onDidChangeProjects') projectsChangedCallback = cb;
          return vi.fn();
        }) as never,
    );
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);

    expect(projectsChangedCallback).toBeDefined();
    act(() => projectsChangedCallback!());
    await settle(result);

    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(2);
  });

  it('re-fetches metadata when a PDP factory registers via object:onDidCreateNetworkObject (healing)', async () => {
    // Reproduces the race: the 30-second startup grace window in
    // internalGetMetadataWithRetries expires before the USJ-providing layering PDPF
    // (Scripture Extender) registers. The initial metadata fetch returns empty because no
    // factory providing platformScripture.USJ_Chapter has registered yet. When the PDPF
    // later registers, the network object service emits object:onDidCreateNetworkObject.
    // The hook must subscribe to that event and refresh when the new object is a pdpFactory,
    // so the project list heals without waiting for an unrelated extension reload or
    // project-list change event. The refresh fires after PDPF_REGISTRATION_DEBOUNCE_MS so
    // that a burst of registrations collapses to a single fan-out; fake timers advance past it.
    vi.useFakeTimers();
    try {
      const { getNetworkEvent, projectLookupService } = await importMocks();
      let pdpfRegistrationCallback: ((details: { objectType: string }) => void) | undefined;
      vi.mocked(getNetworkEvent).mockImplementation(
        (eventName: string) =>
          vi.fn((cb: (details: { objectType: string }) => void) => {
            if (eventName === 'object:onDidCreateNetworkObject') pdpfRegistrationCallback = cb;
            return vi.fn();
          }) as never,
      );

      // First fetch: grace window expired, USJ-providing layering PDPF not yet registered.
      vi.mocked(projectLookupService.getMetadataForAllProjects)
        .mockResolvedValueOnce([] as never)
        // Second fetch after PDPF registers: project list now available.
        .mockResolvedValue(
          metadataList([
            { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
          ]) as never,
        );

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);
      // Initial state: empty because the layering PDPF providing USJ_Chapter has not
      // registered yet (grace window already expired).
      expect(result.current.allProjects).toHaveLength(0);

      // The USJ-providing layering PDPF registers after the grace window.
      expect(pdpfRegistrationCallback).toBeDefined();
      act(() => pdpfRegistrationCallback!({ objectType: 'pdpFactory' }));

      // Advance past the debounce delay so the buffered refresh fires.
      await act(async () => {
        await vi.advanceTimersByTimeAsync(250);
      });
      await settle(result);
      // The hook must detect the PDPF registration and re-fetch metadata so the list heals.
      expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(2);
      expect(result.current.allProjects).toHaveLength(1);
      expect(result.current.allProjects[0].id).toBe('p1');
    } finally {
      vi.useRealTimers();
    }
  });

  it('heals allProjects after a timed-out metadata fetch once the retry resolves (timeout recovery)', async () => {
    // Reproduces the scenario observed in console logs where getAvailableProjects times out
    // (JSON-RPC 30-second timeout) because the extension host is overloaded at startup. The
    // late response is discarded ("Ignoring subsequent resolution"), leaving the picker empty.
    // After METADATA_FETCH_RETRY_DELAY_MS the hook must issue a fresh fetch — by which time the
    // extension host has drained its queue and responds quickly.
    vi.useFakeTimers();
    try {
      const { projectLookupService } = await importMocks();
      vi.mocked(projectLookupService.getMetadataForAllProjects)
        .mockRejectedValueOnce(new Error('JSON-RPC Request timed out'))
        .mockResolvedValue(
          metadataList([
            { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
          ]) as never,
        );

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);

      // First fetch timed out — picker is empty
      expect(result.current.allProjects).toHaveLength(0);
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(1);

      // Advance past the retry delay
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);

      // Retry resolved — picker healed
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(2);
      expect(result.current.allProjects).toHaveLength(1);
      expect(result.current.allProjects[0].id).toBe('p1');
    } finally {
      vi.useRealTimers();
    }
  });

  it('stops retrying metadata after MAX_METADATA_FETCH_RETRIES consecutive failures', async () => {
    // Guards against an infinite retry loop when the extension host is permanently unavailable.
    // After MAX_METADATA_FETCH_RETRIES failures the hook must stop scheduling retries.
    vi.useFakeTimers();
    try {
      const { projectLookupService } = await importMocks();
      vi.mocked(projectLookupService.getMetadataForAllProjects).mockRejectedValue(
        new Error('Persistent failure'),
      );

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);

      // Drive through all allowed retries
      for (let i = 0; i < MAX_METADATA_FETCH_RETRIES; i += 1) {
        // Each iteration must be sequential: advance the timer first, then drain the resulting
        // async work before the next retry cycle starts.
        // eslint-disable-next-line no-await-in-loop
        await act(async () => {
          await vi.runAllTimersAsync();
        });
        // Same reason as above: sequential drain after each timer advance.
        // eslint-disable-next-line no-await-in-loop
        await settle(result);
      }

      const callCountAfterExhaustion = vi.mocked(projectLookupService.getMetadataForAllProjects)
        .mock.calls.length;
      expect(callCountAfterExhaustion).toBe(1 + MAX_METADATA_FETCH_RETRIES);

      // One more timer advance must NOT trigger an additional fetch
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(
        callCountAfterExhaustion,
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not re-fetch metadata when object:onDidCreateNetworkObject fires for a non-PDPF network object', async () => {
    // Only PDP factory registrations should heal the project list. Registrations of other
    // network object types (PDPs, services, etc.) must not trigger an unnecessary metadata
    // fan-out, since those fan-outs are expensive (one PAPI round-trip per registered PDPF).
    const { getNetworkEvent, projectLookupService } = await importMocks();
    let networkObjectCallback: ((details: { objectType: string }) => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: (details: { objectType: string }) => void) => {
          if (eventName === 'object:onDidCreateNetworkObject') networkObjectCallback = cb;
          return vi.fn();
        }) as never,
    );
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([
        { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);

    expect(networkObjectCallback).toBeDefined();
    // A non-PDPF network object registers (e.g. a data provider or a service).
    act(() => networkObjectCallback!({ objectType: 'networkObject' }));
    await settle(result);

    // Must NOT re-fetch: only PDPF registrations should invalidate the metadata cache.
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
  });

  it('cancels the pending retry timer when a concurrent refresh heals the list (spurious Fetch C)', async () => {
    // Reproduces the race where Fetch A fails (isRetryPending=true, 5-second timer scheduled),
    // then an external PDPF registration fires while the timer is still running. Fetch B (triggered
    // by the PDPF) succeeds and heals the list. The timer must be cancelled so it does not fire a
    // spurious Fetch C after healing — the fix is setIsRetryPending(false) in the success path of
    // getAllMetadata, which triggers the useEffect cleanup that calls clearTimeout.
    vi.useFakeTimers();
    try {
      const { projectLookupService, getNetworkEvent } = await importMocks();
      let pdpfCallback: ((d: { objectType: string }) => void) | undefined;
      vi.mocked(getNetworkEvent).mockImplementation(
        (eventName: string) =>
          vi.fn((cb: (d: { objectType: string }) => void) => {
            if (eventName === 'object:onDidCreateNetworkObject') pdpfCallback = cb;
            return vi.fn();
          }) as never,
      );
      vi.mocked(projectLookupService.getMetadataForAllProjects)
        .mockRejectedValueOnce(new Error('JSON-RPC timed out')) // Fetch A fails
        .mockResolvedValue(
          metadataList([
            { id: 'p1', fullName: 'Full p1', name: 'Short p1', isEditable: true },
          ]) as never,
        ); // Fetch B+ succeeds

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);
      // Fetch A failed; isRetryPending=true, 5-second timer scheduled.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(1);
      expect(result.current.allProjects).toHaveLength(0);

      // PDPF registers → schedules debounced Fetch B. Advance past the debounce delay to fire it.
      expect(pdpfCallback).toBeDefined();
      act(() => pdpfCallback!({ objectType: 'pdpFactory' }));
      await act(async () => {
        await vi.advanceTimersByTimeAsync(250);
      });
      await settle(result);
      // Fetch B healed the project list.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(2);
      expect(result.current.allProjects).toHaveLength(1);

      // Advance remaining timers (retry timer from Fetch A should have been cancelled by Fetch B's
      // success path setting isRetryPending=false).
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);

      // No spurious Fetch C: the list healed in Fetch B; no unnecessary fan-out after.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('stale-generation success does not reset the retry budget for a newer failing generation (cap integrity)', async () => {
    // Reproduces the race where a slow in-flight Gen A promise (up to 30 s in the service's
    // startup retry loop) resolves after a newer Gen B+ has already exhausted part of its retry
    // budget. Gen A's unguarded .then() must NOT reset fetchRetryCountRef.current, or subsequent
    // Gen B+ failures get a fresh budget and can exceed MAX_METADATA_FETCH_RETRIES total retries.
    vi.useFakeTimers();
    try {
      const { projectLookupService, getNetworkEvent } = await importMocks();

      // Gen A: manually controlled — we will resolve it late, after Gen B+ has been retrying.
      let resolveGenA: (v: never) => void = () => {};
      const genAPromise = new Promise<never>((resolve) => {
        resolveGenA = resolve;
      });

      let pdpfCallback: ((d: { objectType: string }) => void) | undefined;
      vi.mocked(getNetworkEvent).mockImplementation(
        (eventName: string) =>
          vi.fn((cb: (d: { objectType: string }) => void) => {
            if (eventName === 'object:onDidCreateNetworkObject') pdpfCallback = cb;
            return vi.fn();
          }) as never,
      );

      vi.mocked(projectLookupService.getMetadataForAllProjects)
        .mockReturnValueOnce(genAPromise as never) // Gen A: in-flight, will resolve late
        .mockRejectedValue(new Error('Timeout')); // All subsequent generations fail

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);
      // Gen A is in-flight.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(1);

      // PDPF registers → schedules debounced Gen B. Advance past the debounce delay to fire it.
      expect(pdpfCallback).toBeDefined();
      act(() => pdpfCallback!({ objectType: 'pdpFactory' }));
      await act(async () => {
        await vi.advanceTimersByTimeAsync(250);
      });
      await settle(result);
      // Gen B started and failed; isRetryPending=true.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(2);

      // Advance through 2 retries (Gen C, Gen D) so the counter is partway through the budget.
      for (let i = 0; i < 2; i += 1) {
        // Sequential: advance timer then drain before the next retry cycle.
        // eslint-disable-next-line no-await-in-loop
        await act(async () => {
          await vi.runAllTimersAsync();
        });
        // Same reason as above: sequential drain after each timer advance.
        // eslint-disable-next-line no-await-in-loop
        await settle(result);
      }
      // Calls so far: GenA(1) + GenB(1) + retry1(1) + retry2(1) = 4
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(4);

      // Gen A resolves late (stale). Without the generation guard, its .then() resets the counter
      // to 0, allowing more than MAX_METADATA_FETCH_RETRIES total retries. With the fix, the guard
      // sees metadataFetchRef.current !== entry-A and skips the reset.
      await act(async () => {
        resolveGenA([] as never);
      });
      await settle(result);

      // Advance through what should be the LAST retry (retry 3 = Gen E).
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);
      // Calls: GenA + GenB + retry1 + retry2 + retry3(last) = 5
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(5);

      // Budget exhausted — no more retries regardless of timer advances.
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(5);
    } finally {
      vi.useRealTimers();
    }
  });

  it('multiple rapid PDPF registrations trigger only one getMetadataForAllProjects fan-out (debounce)', async () => {
    // When PDPFs re-register after extension reload they arrive as separate WebSocket messages,
    // so React cannot batch the resulting refreshMetadata() calls. Each would normally fan out
    // getMetadataForAllProjects to every registered PDPF; the fix debounces the PDPF-registration
    // listener so a burst collapses to a single re-fetch.
    vi.useFakeTimers();
    try {
      const { projectLookupService, getNetworkEvent } = await importMocks();
      let pdpfCallback: ((d: { objectType: string }) => void) | undefined;
      vi.mocked(getNetworkEvent).mockImplementation(
        (eventName: string) =>
          vi.fn((cb: (d: { objectType: string }) => void) => {
            if (eventName === 'object:onDidCreateNetworkObject') pdpfCallback = cb;
            return vi.fn();
          }) as never,
      );
      vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([] as never);

      const { result } = renderHook(() => useProjectPickerData());
      await settle(result);
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(1);

      // Fire 3 PDPF registrations synchronously within one act. Each callback cancels the
      // previous debounce timer and schedules a new one; only the last timer survives.
      // Using a single act ensures no timer fires between callbacks (async act can advance
      // fake timers between awaits, which would defeat the debounce).
      expect(pdpfCallback).toBeDefined();
      act(() => {
        pdpfCallback!({ objectType: 'pdpFactory' });
        pdpfCallback!({ objectType: 'pdpFactory' });
        pdpfCallback!({ objectType: 'pdpFactory' });
      });

      // Advance timers to fire the single surviving debounced refresh.
      await act(async () => {
        await vi.runAllTimersAsync();
      });
      await settle(result);

      // With debouncing: initial(1) + debounced-refresh(1) = 2 total calls, not 4.
      expect(vi.mocked(projectLookupService.getMetadataForAllProjects)).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });
});
/* eslint-enable no-type-assertion/no-type-assertion */
