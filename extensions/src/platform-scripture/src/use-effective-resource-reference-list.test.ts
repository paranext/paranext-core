// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import type {
  ResourceReferenceList,
  IUserTextConnectionSettingsProjectDataProvider,
} from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider } from '@papi/frontend/react';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list';

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: vi.fn(),
  useProjectDataProvider: vi.fn(),
}));

/** Minimal PlatformError shape — matches the `isPlatformError` runtime check */
function makePlatformError(): object {
  return { platformErrorVersion: 1, message: 'test error' };
}

const mockUseProjectSetting = vi.mocked(useProjectSetting);
const mockUseProjectDataProvider = vi.mocked(useProjectDataProvider);

const emptyList = (dataVersion = '1.0.0'): ResourceReferenceList => ({
  dataVersion,
  items: [],
});

function makeMockPdp(
  returnValue: ResourceReferenceList | undefined,
  subscribeMethod: 'subscribeUserModelTexts' | 'subscribeUserReferencedProjectsAndResources',
): IUserTextConnectionSettingsProjectDataProvider {
  const mockSubscribe = vi.fn(
    async (_selector: undefined, callback: (val: ResourceReferenceList | undefined) => void) => {
      if (returnValue !== undefined) {
        callback(returnValue);
      }
      return () => Promise.resolve(true);
    },
  );

  // Mock object literal cannot satisfy the full interface — cast is required for test isolation
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    [subscribeMethod]: mockSubscribe,
  } as unknown as IUserTextConnectionSettingsProjectDataProvider;
}

describe('useEffectiveResourceReferenceList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns undefined while project setting is loading', () => {
    mockUseProjectSetting.mockReturnValue([emptyList(), undefined, undefined, true]);
    const mockPdp = makeMockPdp(emptyList(), 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current).toBeUndefined();
  });

  it('returns undefined while user setting is loading', () => {
    mockUseProjectSetting.mockReturnValue([emptyList(), undefined, undefined, false]);
    mockUseProjectDataProvider.mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current).toBeUndefined();
  });

  it('returns project-only list when user list is empty', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'My Project', id: 'abc123' }],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const mockPdp = makeMockPdp(emptyList(), 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current[0]).toBeDefined();
    expect(result.current[0]?.items).toHaveLength(1);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'project',
      name: 'My Project',
      id: 'abc123',
      source: 'admin',
    });
  });

  it('returns user-only list when project list is empty', () => {
    mockUseProjectSetting.mockReturnValue([emptyList(), undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'enhancedResource', name: 'My Resource' }],
    };
    const mockPdp = makeMockPdp(userList, 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current[0]).toBeDefined();
    expect(result.current[0]?.items).toHaveLength(1);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'enhancedResource',
      name: 'My Resource',
      source: 'user',
    });
  });

  it('merges and deduplicates by id for ProjectReferences with the same id', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'Project A', id: 'id-001' }],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        { type: 'project', name: 'Project A (user)', id: 'id-001' },
        { type: 'project', name: 'Project B', id: 'id-002' },
      ],
    };
    const mockPdp = makeMockPdp(userList, 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current[0]?.items).toHaveLength(2);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'project',
      name: 'Project A',
      id: 'id-001',
      source: 'admin',
    });
    expect(result.current[0]?.items[1]).toEqual({
      type: 'project',
      name: 'Project B',
      id: 'id-002',
      source: 'user',
    });
  });

  it('merges and deduplicates by name for EnhancedResourceReferences with the same name', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'enhancedResource', name: 'Greek NT' }],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        { type: 'enhancedResource', name: 'Greek NT' },
        { type: 'enhancedResource', name: 'Hebrew OT' },
      ],
    };
    const mockPdp = makeMockPdp(userList, 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current[0]?.items).toHaveLength(2);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'enhancedResource',
      name: 'Greek NT',
      source: 'admin',
    });
    expect(result.current[0]?.items[1]).toEqual({
      type: 'enhancedResource',
      name: 'Hebrew OT',
      source: 'user',
    });
  });

  it('includes all items when there is no overlap', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'Project A', id: 'id-001' }],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', name: 'DBL Resource', id: 'dbl-001' }],
    };
    const mockPdp = makeMockPdp(userList, 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current[0]?.items).toHaveLength(2);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'project',
      name: 'Project A',
      id: 'id-001',
      source: 'admin',
    });
    expect(result.current[0]?.items[1]).toEqual({
      type: 'dblResource',
      name: 'DBL Resource',
      id: 'dbl-001',
      source: 'user',
    });
  });

  it('returns undefined when projectId is undefined', () => {
    mockUseProjectSetting.mockReturnValue([emptyList(), undefined, undefined, true]);
    mockUseProjectDataProvider.mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current).toBeUndefined();
  });

  it('uses subscribeUserReferencedProjectsAndResources for referencedProjectsAndResources setting', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'xmlResource', name: 'Xml Ref' }],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'sourceLanguageResource', name: 'Hebrew' }],
    };
    const mockPdp = makeMockPdp(userList, 'subscribeUserReferencedProjectsAndResources');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList(
        'proj-1',
        'platformScripture.referencedProjectsAndResources',
      ),
    );

    expect(result.current[0]?.items).toHaveLength(2);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'xmlResource',
      name: 'Xml Ref',
      source: 'admin',
    });
    expect(result.current[0]?.items[1]).toEqual({
      type: 'sourceLanguageResource',
      name: 'Hebrew',
      source: 'user',
    });
  });

  it('returns project-level list when user setting subscription delivers a PlatformError', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        {
          type: 'project',
          name: 'ESV',
          id: 'abc',
        } satisfies ResourceReferenceList['items'][0],
      ],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);

    // PDP mock that calls back with a PlatformError instead of a list
    const platformError = makePlatformError();
    const mockSubscribe = vi.fn(async (_selector: undefined, callback: (val: unknown) => void) => {
      callback(platformError);
      return () => Promise.resolve(true);
    });
    // Mock object literal cannot satisfy the full PDP interface — cast needed for test isolation
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    mockUseProjectDataProvider.mockReturnValue({
      subscribeUserModelTexts: mockSubscribe,
    } as unknown as ReturnType<typeof useProjectDataProvider>);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    // Should fall back to project-level list, not return undefined
    expect(result.current).toBeDefined();
    expect(result.current[0]?.items).toHaveLength(1);
    expect(result.current[0]?.items[0]).toMatchObject({ name: 'ESV', source: 'admin' });
  });

  it('returns undefined when projectSettingValue is a PlatformError', () => {
    const platformError = makePlatformError();
    mockUseProjectSetting.mockReturnValue([
      // Cast through unknown because the mock returns a PlatformError where a ResourceReferenceList
      // is normally expected — this is the error path we want to test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      platformError as unknown as ResourceReferenceList,
      undefined,
      undefined,
      false,
    ]);
    const mockPdp = makeMockPdp(emptyList(), 'subscribeUserModelTexts');
    mockUseProjectDataProvider.mockReturnValue(mockPdp);

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    expect(result.current).toBeUndefined();
  });

  it('discards name-based items that are missing a string name', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        // Cast needed to simulate a malformed item that passes the type boundary at runtime
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { type: 'enhancedResource' } as unknown as ResourceReferenceList['items'][number],
        { type: 'enhancedResource', name: 'Valid' },
      ],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    mockUseProjectDataProvider.mockReturnValue(makeMockPdp(emptyList(), 'subscribeUserModelTexts'));

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    // The nameless item is discarded; only the valid one survives
    expect(result.current[0]?.items).toHaveLength(1);
    expect(result.current[0]?.items[0]).toEqual({
      type: 'enhancedResource',
      name: 'Valid',
      source: 'admin',
    });
  });

  it('excludes unknown-type items from the merged result', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        // Cast needed to simulate unknown types that pass the type boundary at runtime
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { type: 'unknownTypeA' } as unknown as ResourceReferenceList['items'][number],
        // Cast needed to simulate unknown types that pass the type boundary at runtime
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { type: 'unknownTypeB' } as unknown as ResourceReferenceList['items'][number],
      ],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    mockUseProjectDataProvider.mockReturnValue(makeMockPdp(emptyList(), 'subscribeUserModelTexts'));

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    // Unknown types are excluded from the merged collection — they exist only for storage round-trips
    expect(result.current[0]?.items).toHaveLength(0);
  });

  it('tags items by source and lists admin items before user items', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        { type: 'project', name: 'Admin Only', id: 'a-001' },
        { type: 'project', name: 'In Both', id: 'b-001' },
      ],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [
        { type: 'project', name: 'In Both (user copy)', id: 'b-001' },
        { type: 'enhancedResource', name: 'User Only' },
      ],
    };
    mockUseProjectDataProvider.mockReturnValue(makeMockPdp(userList, 'subscribeUserModelTexts'));

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    const items = result.current[0]?.items;
    expect(items).toHaveLength(3);
    // Admin items come first
    expect(items?.[0]).toEqual({
      type: 'project',
      name: 'Admin Only',
      id: 'a-001',
      source: 'admin',
    });
    // Duplicate resolved in favour of admin (name from admin copy, source: 'admin')
    expect(items?.[1]).toEqual({ type: 'project', name: 'In Both', id: 'b-001', source: 'admin' });
    // User-only item comes last
    expect(items?.[2]).toEqual({ type: 'enhancedResource', name: 'User Only', source: 'user' });
  });
});
