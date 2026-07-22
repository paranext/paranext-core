import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { EVENT_NAME_ON_DID_UPDATE_WEB_VIEW } from '@shared/services/web-view.service-model';
import { useProjectPickerData, type ProjectPickerData } from './use-project-picker-data.hook';

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

vi.mock('@renderer/services/papi-frontend.service', () => ({
  webViews: {
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
  },
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
 * currentProject/recents/allProjects locally, so tests resolve the mapped list directly via
 * `mockResolvedValue` - the same idiom `beforeEach` uses for this mock.
 */
function metadataList(items: MetadataFixture[]) {
  return items.map(metadata);
}

async function importMocks() {
  const { getNetworkEvent } = await import('@shared/services/network.service');
  const { webViews } = await import('@renderer/services/papi-frontend.service');
  const { projectLookupService } = await import('@shared/services/project-lookup.service');
  const { papiFrontendProjectDataProviderService } = await import(
    '@shared/services/project-data-provider.service'
  );
  const { useData } = await import('@renderer/hooks/papi-hooks');
  return {
    getNetworkEvent,
    webViews,
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

    const { getNetworkEvent, webViews, projectLookupService, useData } = await importMocks();

    vi.mocked(getNetworkEvent).mockImplementation(() => vi.fn(() => vi.fn()));
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);
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

  it('returns undefined currentProject when no Scripture Editor web view is open', async () => {
    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject).toBeUndefined();
  });

  it('returns currentProject from the first open Scripture Editor web view, from metadata alone', async () => {
    const { webViews, projectLookupService } = await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-abc' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-abc', fullName: 'Genesis Project', name: 'Genesis' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject?.fullName).toBe('Genesis Project');
    expect(result.current.currentProject?.id).toBe('proj-abc');
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
    const { webViews, projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
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
    // currentProject, recentProjects, and allProjects must all derive from ONE metadata fan-out
    // per refresh - the service contacts every PDP factory per call, so three filtered calls
    // would triple the startup-path cost this hook exists to avoid.
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentProject?.id).toBe('proj-r1');
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

  it('refreshes currentProject when onDidUpdateWebView fires', async () => {
    const { getNetworkEvent, webViews, projectLookupService } = await importMocks();
    let capturedCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) capturedCallback = cb;
          return vi.fn();
        }) as never,
    );

    vi.mocked(webViews.getAllOpenWebViewDefinitions)
      .mockResolvedValueOnce([])
      .mockResolvedValue([
        { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-xyz' },
      ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-xyz', fullName: 'Updated Project', name: 'Updated' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject).toBeUndefined();

    expect(capturedCallback).toBeDefined();
    act(() => capturedCallback!());

    await settle(result);
    expect(result.current.currentProject?.fullName).toBe('Updated Project');
  });

  it('resolves the current project by direct lookup when it is absent from the filtered list snapshot', async () => {
    // The active editor's project may not be in the picker's USJ-filtered snapshot yet - e.g. its
    // USJ-providing layering PDPF has not registered. The hook must still resolve it via a direct,
    // unfiltered single-project lookup rather than showing an error card during that startup window.
    const { webViews, projectLookupService } = await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
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

    expect(result.current.currentProject?.id).toBe('proj-late');
    expect(result.current.currentProject?.fullName).toBe('Late Project');
    expect(result.current.currentProjectError).toBeUndefined();
    expect(vi.mocked(projectLookupService.getMetadataForProject)).toHaveBeenCalledWith('proj-late');
  });

  it('recovers the current project after a failed lookup once the editor closes and reopens', async () => {
    // When even the direct lookup fails (nothing provides the id yet), the hook shows the error
    // card. That state must clear when there is no current editor, so the project can resolve on a
    // later open instead of staying wedged on 'Unable to load current project details'.
    const { getNetworkEvent, webViews, projectLookupService } = await importMocks();
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
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockImplementation(
      async () => openDefs as never,
    );

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
    expect(result.current.currentProjectError).toBe('Unable to load current project details');

    // Phase 2: editor closes → current project clears (and the error resets).
    openDefs = [];
    act(() => webViewCallback!());
    await settle(result);
    expect(result.current.currentProject).toBeUndefined();
    expect(result.current.currentProjectError).toBeUndefined();

    // Phase 3: the same project reopens, now resolvable by the direct lookup → it resolves instead
    // of staying stuck on the error card.
    openDefs = [{ id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-stuck' }];
    act(() => webViewCallback!());
    await settle(result);
    expect(result.current.currentProject?.id).toBe('proj-stuck');
    expect(result.current.currentProject?.fullName).toBe('Recovered Project');
    expect(result.current.currentProjectError).toBeUndefined();
  });

  it('does not re-fetch metadata on web view events (metadata cache is decoupled from them)', async () => {
    // Restoring N tabs at startup fires a burst of web view events; each must re-derive only the
    // active editor from the cached metadata, not launch a fresh full PDPF fan-out.
    const { getNetworkEvent, webViews, projectLookupService } = await importMocks();
    let webViewCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) webViewCallback = cb;
          return vi.fn();
        }) as never,
    );
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-r1' },
    ] as never);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(
      metadataList([{ id: 'proj-r1', fullName: 'Full proj-r1', name: 'Short proj-r1' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentProject?.id).toBe('proj-r1');

    expect(webViewCallback).toBeDefined();
    act(() => webViewCallback!());
    await settle(result);

    // The web view event re-ran currentProject but reused the cached metadata: still one fetch.
    expect(projectLookupService.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    expect(result.current.currentProject?.id).toBe('proj-r1');
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
});
/* eslint-enable no-type-assertion/no-type-assertion */
