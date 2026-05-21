import { renderHook, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
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
        if (key === 'platform.name') return 'Mock Project';
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
  return { webViews, projectLookupService, papiFrontendProjectDataProviderService };
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

    await waitFor(() => expect(result.current.currentProject?.name).toBe('Genesis Project'));
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
          getSetting: vi.fn(async () => `Name for ${projectId}`),
        }) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await waitFor(() => expect(result.current.allProjects.length).toBe(2));
    expect(result.current.allProjects[0]).toEqual({ id: 'p1', name: 'Name for p1' });
    expect(result.current.allProjects[1]).toEqual({ id: 'p2', name: 'Name for p2' });
  });

  it('recentProjects equals allProjects (stub — both use the same source)', async () => {
    const { webViews, projectLookupService, papiFrontendProjectDataProviderService } =
      await importMocks();
    vi.mocked(webViews.getAllOpenWebViewDefinitions).mockResolvedValue([]);
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'p1', projectInterfaces: [], pdpFactoryInfo: {} },
    ] as never);
    vi.mocked(papiFrontendProjectDataProviderService.get).mockResolvedValue({
      getSetting: vi.fn(async () => 'Project One'),
    } as never);

    const { result } = renderHook(() => useProjectPickerData());

    await waitFor(() => expect(result.current.allProjects.length).toBe(1));
    expect(result.current.recentProjects).toEqual(result.current.allProjects);
  });

  it('refreshes currentProject when onDidUpdateWebView fires', async () => {
    const { getNetworkEvent } = await import('@shared/services/network.service');
    let capturedCallback: (() => void) | undefined;
    vi.mocked(getNetworkEvent).mockReturnValue(
      vi.fn((cb: () => void) => {
        capturedCallback = cb;
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

    await waitFor(() => expect(result.current.currentProject?.name).toBe('Updated Project'));
  });
});
