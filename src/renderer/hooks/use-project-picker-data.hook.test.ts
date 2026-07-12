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

// Fixtures provide the scripture-editor projectInterface by default because the hook filters
// allProjects by it locally (the service is called unfiltered, once per refresh).
function metadata(fixture: MetadataFixture) {
  return {
    projectInterfaces: ['platformScripture.USJ_Chapter'],
    pdpFactoryInfo: {},
    ...fixture,
  };
}

/**
 * Builds a `getMetadataForAllProjects` mock over a fixed project list. The hook fetches the full
 * unfiltered list once per refresh and derives currentProject/recents/allProjects locally, so the
 * mock just returns everything.
 */
function metadataProvider(items: MetadataFixture[]) {
  const all = items.map(metadata);
  return vi.fn(async () => all);
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([{ id: 'proj-abc', fullName: 'Genesis Project', name: 'Genesis' }]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentProject?.fullName).toBe('Genesis Project');
    expect(result.current.currentProject?.id).toBe('proj-abc');
  });

  it('returns allProjects from projectLookupService metadata, without opening any project data provider', async () => {
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([{ id: 'proj-no-names', isEditable: true }]) as never,
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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

  it('excludes projects without the scripture editor projectInterface from allProjects', async () => {
    const { projectLookupService } = await importMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
        { id: 'usj', fullName: 'Full usj', name: 'Short usj', isEditable: true },
        {
          id: 'other',
          fullName: 'Full other',
          name: 'Short other',
          isEditable: true,
          projectInterfaces: ['platformNotes.notes'],
        },
      ]) as never,
    );

    const { result } = renderHook(() => useProjectPickerData());

    await settle(result);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProjects.map((p) => p.id)).toEqual(['usj']);
  });

  it('treats projects with missing isEditable as editable, matching the registered default', async () => {
    const { projectLookupService, useData } = await importMocks();
    vi.mocked(useData).mockImplementation(() => ({
      RecentProjects: vi.fn().mockReturnValue([RECENT_IDS_R1, vi.fn(), false]),
    }));
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([
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
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockImplementation(
      metadataProvider([{ id: 'proj-xyz', fullName: 'Updated Project', name: 'Updated' }]) as never,
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
});
/* eslint-enable no-type-assertion/no-type-assertion */
