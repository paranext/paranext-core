import { renderHook, waitFor, act, configure, getConfig } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { EVENT_NAME_ON_DID_UPDATE_WEB_VIEW } from '@shared/services/web-view.service-model';
import { useProjectPickerData } from './use-project-picker-data.hook';

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

// Stable reference across renders so rawRecentIds keeps the same array identity, preventing
// useMemo from recomputing safeRecentIds every render which would recreate the useCallback
// and trigger an infinite reload loop in usePromise.
const DEFAULT_RECENT_IDS: string[] = [];

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

// --- Tests ---

// vitest mocks use as-never to coerce partial objects to the full inferred return type
/* eslint-disable no-type-assertion/no-type-assertion */
describe('useProjectPickerData', () => {
  // The hook ORs four async loading flags (three usePromise calls + one useData). They resolve in
  // ~60ms locally, but waitFor's deadline is wall-clock: on a starved CI runner the event loop can
  // be blocked past RTL's 1000ms default before the (already-scheduled) resolutions run, producing
  // spurious "isLoading still true" timeouts. There is no re-render loop (each callback runs exactly
  // once), so a longer deadline only tolerates scheduler starvation - waitFor still returns the
  // instant the condition is met, so the happy path is not slowed. Restored in afterAll so the
  // raised timeout does not leak to other test files sharing the worker.
  let originalAsyncUtilTimeout: number;
  beforeAll(() => {
    originalAsyncUtilTimeout = getConfig().asyncUtilTimeout;
    configure({ asyncUtilTimeout: 5000 });
  });
  afterAll(() => {
    configure({ asyncUtilTimeout: originalAsyncUtilTimeout });
  });

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

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.currentProject).toBeUndefined();
  });

  // Timeout raised to 15 s: asyncUtilTimeout is already 5 s (see beforeAll), and
  // importMocks() + renderHook setup can consume non-trivial wall-clock time on a
  // starved Windows CI runner, causing the default 5 s Vitest test timeout to
  // expire before waitFor resolves (observed in run 27636725842 on 2026-06-16).
  it(
    'returns currentProject from the first open Scripture Editor web view',
    async () => {
      const { webViews, papiFrontendProjectDataProviderService } = await importMocks();
      vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([
        { id: 'wv-1', webViewType: EDITOR_WEB_VIEW_TYPE, projectId: 'proj-abc' },
      ] as never);
      vi.mocked(papiFrontendProjectDataProviderService.get).mockResolvedValue({
        getSetting: vi.fn(async () => 'Genesis Project'),
      } as never);

      const { result } = renderHook(() => useProjectPickerData());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.currentProject?.fullName).toBe('Genesis Project');
      });
      expect(result.current.currentProject?.id).toBe('proj-abc');
    },
    15_000,
  );

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

    await waitFor(() => expect(result.current.allProjects.length).toBe(2));
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
      RecentProjects: vi.fn().mockReturnValue([['proj-r1', 'proj-r2'], vi.fn(), false]),
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

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.recentProjects).toHaveLength(2);
    });
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

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.allProjects).toHaveLength(1);
    });
    expect(result.current.allProjects[0].id).toBe('editable');
  });

  it('excludes recent projects from allProjects', async () => {
    const { projectLookupService, papiFrontendProjectDataProviderService, useData } =
      await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([['proj-r1'], vi.fn(), false]),
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

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.allProjects).toHaveLength(1);
    });
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
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.currentProject).toBeUndefined();

    expect(capturedCallback).toBeDefined();
    act(() => capturedCallback!());

    await waitFor(() => expect(result.current.currentProject?.fullName).toBe('Updated Project'));
  });
});
/* eslint-enable no-type-assertion/no-type-assertion */
