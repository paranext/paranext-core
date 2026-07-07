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
  },
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: {
    get: vi.fn(async () => ({
      getSetting: vi.fn(async (key: string) => {
        if (key === 'platform.fullName') return 'Mock Full Name';
        if (key === 'platform.name') return 'Mock';
        if (key === 'platform.language') return 'English';
        return undefined;
      }),
    })),
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

    const {
      getNetworkEvent,
      webViews,
      projectLookupService,
      papiFrontendProjectDataProviderService,
      useData,
    } = await importMocks();

    vi.mocked(getNetworkEvent).mockImplementation(() => vi.fn(() => vi.fn()));
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([]);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockResolvedValue({
      getSetting: vi.fn(async (key: string) => {
        if (key === 'platform.fullName') return 'Mock Full Name';
        if (key === 'platform.name') return 'Mock';
        if (key === 'platform.language') return 'English';
        return undefined;
      }),
    } as never);
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([DEFAULT_RECENT_IDS, vi.fn(), false]),
    }));
  });

  it('returns undefined currentProject when no Scripture Editor web view is open', async () => {
    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject).toBeUndefined();
  });

  it('returns currentProject from the first open Scripture Editor web view', async () => {
    const { webViews, papiFrontendProjectDataProviderService } = await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
      { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-abc' },
    ] as never);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockResolvedValue({
      getSetting: vi.fn(async () => 'Genesis Project'),
    } as never);

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject?.fullName).toBe('Genesis Project');
    expect(result.current.currentProject?.id).toBe('proj-abc');
  });

  it('returns allProjects from projectLookupService', async () => {
    const { projectLookupService, papiFrontendProjectDataProviderService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'p1', projectInterfaces: [], pdpFactoryInfo: {} },
      { id: 'p2', projectInterfaces: [], pdpFactoryInfo: {} },
    ] as never);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockImplementation(
      async (_iface: string, projectId: string) =>
        ({
          getSetting: vi.fn(async (key: string) => {
            if (key === 'platform.fullName') return `Full ${projectId}`;
            if (key === 'platform.name') return `Short ${projectId}`;
            if (key === 'platform.language') return 'English';
            if (key === 'platform.isEditable') return true;
            return undefined;
          }),
        }) as never,
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

  it('recentProjects reflects recent project IDs from data provider', async () => {
    const { papiFrontendProjectDataProviderService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1_R2, vi.fn(), false]),
    }));
    vi.mocked(papiFrontendProjectDataProviderService.get).mockImplementation(
      async (_iface: string, projectId: string) =>
        ({
          getSetting: vi.fn(async (key: string) => {
            if (key === 'platform.fullName') return `Full ${projectId}`;
            if (key === 'platform.name') return `Short ${projectId}`;
            if (key === 'platform.language') return 'English';
            if (key === 'platform.isEditable') return true;
            return undefined;
          }),
        }) as never,
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
    const { projectLookupService, papiFrontendProjectDataProviderService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'editable', projectInterfaces: [], pdpFactoryInfo: {} },
      { id: 'readonly', projectInterfaces: [], pdpFactoryInfo: {} },
    ] as never);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockImplementation(
      async (_iface: string, projectId: string) =>
        ({
          getSetting: vi.fn(async (key: string) => {
            if (key === 'platform.fullName') return `Full ${projectId}`;
            if (key === 'platform.name') return `Short ${projectId}`;
            if (key === 'platform.language') return 'English';
            if (key === 'platform.isEditable') return projectId === 'editable';
            return undefined;
          }),
        }) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects).toHaveLength(1);
    expect(result.current.allProjects[0].id).toBe('editable');
  });

  it('excludes recent projects from allProjects', async () => {
    const { projectLookupService, papiFrontendProjectDataProviderService, useData } =
      await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'proj-r1', projectInterfaces: [], pdpFactoryInfo: {} },
      { id: 'proj-other', projectInterfaces: [], pdpFactoryInfo: {} },
    ] as never);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockImplementation(
      async (_iface: string, projectId: string) =>
        ({
          getSetting: vi.fn(async (key: string) => {
            if (key === 'platform.fullName') return `Full ${projectId}`;
            if (key === 'platform.name') return `Short ${projectId}`;
            if (key === 'platform.language') return 'English';
            if (key === 'platform.isEditable') return true;
            return undefined;
          }),
        }) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects).toHaveLength(1);
    expect(result.current.allProjects[0].id).toBe('proj-other');
    expect(result.current.recentProjects[0].id).toBe('proj-r1');
  });

  it('refreshes currentProject when onDidUpdateWebView fires', async () => {
    const { getNetworkEvent, webViews, papiFrontendProjectDataProviderService } =
      await importMocks();
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
    vi.mocked(papiFrontendProjectDataProviderService.get).mockResolvedValue({
      getSetting: vi.fn(async () => 'Updated Project'),
    } as never);

    const { result } = renderHook(() => useProjectPickerData());
    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject).toBeUndefined();

    expect(capturedCallback).toBeDefined();
    act(() => capturedCallback!());

    await settle(result);
    expect(result.current.currentProject?.fullName).toBe('Updated Project');
  });
});
/* eslint-enable no-type-assertion/no-type-assertion */
