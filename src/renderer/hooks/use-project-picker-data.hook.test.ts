import { renderHook, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useProjectPickerData } from './use-project-picker-data.hook';
import { EVENT_NAME_ON_DID_UPDATE_WEB_VIEW } from '@shared/services/web-view.service-model';

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

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(() => ({
    RecentProjects: vi.fn().mockReturnValue([[], vi.fn(), false]),
  })),
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

async function importMocks() {
  const { webViews } = await import('@renderer/services/papi-frontend.service');
  const { projectLookupService } = await import('@shared/services/project-lookup.service');
  const { papiFrontendProjectDataProviderService } = await import(
    '@shared/services/project-data-provider.service'
  );
  const { useData } = await import('@renderer/hooks/papi-hooks');
  return { webViews, projectLookupService, papiFrontendProjectDataProviderService, useData };
}

// --- Tests ---

describe('useProjectPickerData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns undefined currentProject when no Scripture Editor web view is open', async () => {
    const { webViews } = await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);

    const { result } = renderHook(() => useProjectPickerData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
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

    await waitFor(() => expect(result.current.currentProject?.fullName).toBe('Genesis Project'));
    expect(result.current.currentProject?.id).toBe('proj-abc');
  });

  it('returns allProjects from projectLookupService', async () => {
    const { webViews, projectLookupService, papiFrontendProjectDataProviderService } =
      await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);
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
    const { webViews, projectLookupService, papiFrontendProjectDataProviderService, useData } =
      await importMocks();
    vi.mocked(useData).mockReturnValue({
      RecentProjects: vi.fn().mockReturnValue([['proj-r1', 'proj-r2'], vi.fn(), false]),
    } as never);
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([]);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockImplementation(
      async (_iface: string, projectId: string) =>
        ({
          getSetting: vi.fn(async (key: string) => {
            if (key === 'platform.fullName') return `Full ${projectId}`;
            if (key === 'platform.name') return `Short ${projectId}`;
            if (key === 'platform.language') return 'English';
            return undefined;
          }),
        }) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
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

  it('refreshes currentProject when onDidUpdateWebView fires', async () => {
    const { getNetworkEvent } = await import('@shared/services/network.service');
    let capturedCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockImplementation(
      (eventName: string) =>
        vi.fn((cb: () => void) => {
          if (eventName === EVENT_NAME_ON_DID_UPDATE_WEB_VIEW) capturedCallback = cb;
          return vi.fn();
        }) as never,
    );

    const { webViews, papiFrontendProjectDataProviderService } = await importMocks();
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
