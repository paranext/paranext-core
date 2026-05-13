// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { ResourceReferenceList } from 'platform-scripture';
import type { IUserTextConnectionSettingsProjectDataProvider } from 'platform-scripture';

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: vi.fn(),
  useProjectDataProvider: vi.fn(),
}));

import { useProjectSetting, useProjectDataProvider } from '@papi/frontend/react';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list';

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
    (_selector: undefined, callback: (val: ResourceReferenceList | undefined) => void) => {
      if (returnValue !== undefined) {
        callback(returnValue);
      }
      return Promise.resolve(() => Promise.resolve(true));
    },
  );

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

    expect(result.current).toBeDefined();
    expect(result.current?.items).toHaveLength(1);
    expect(result.current?.items[0]).toEqual({ type: 'project', name: 'My Project', id: 'abc123' });
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

    expect(result.current).toBeDefined();
    expect(result.current?.items).toHaveLength(1);
    expect(result.current?.items[0]).toEqual({ type: 'enhancedResource', name: 'My Resource' });
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

    expect(result.current?.items).toHaveLength(2);
    expect(result.current?.items[0]).toEqual({ type: 'project', name: 'Project A', id: 'id-001' });
    expect(result.current?.items[1]).toEqual({ type: 'project', name: 'Project B', id: 'id-002' });
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

    expect(result.current?.items).toHaveLength(2);
    expect(result.current?.items[0]).toEqual({ type: 'enhancedResource', name: 'Greek NT' });
    expect(result.current?.items[1]).toEqual({ type: 'enhancedResource', name: 'Hebrew OT' });
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

    expect(result.current?.items).toHaveLength(2);
    expect(result.current?.items[0]).toEqual({ type: 'project', name: 'Project A', id: 'id-001' });
    expect(result.current?.items[1]).toEqual({
      type: 'dblResource',
      name: 'DBL Resource',
      id: 'dbl-001',
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

    expect(result.current?.items).toHaveLength(2);
    expect(result.current?.items[0]).toEqual({ type: 'xmlResource', name: 'Xml Ref' });
    expect(result.current?.items[1]).toEqual({ type: 'sourceLanguageResource', name: 'Hebrew' });
  });

  it('returns undefined when projectSettingValue is a PlatformError', () => {
    const platformError = makePlatformError();
    // Cast through unknown because the mock returns a PlatformError where a ResourceReferenceList
    // is normally expected — this is the error path we want to test.
    mockUseProjectSetting.mockReturnValue([
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

  it('does not deduplicate unknown-type items with different types against each other', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      // Two items with no id and no string name, but different types
      items: [
        { type: 'unknownTypeA' } as unknown as ResourceReferenceList['items'][number],
        { type: 'unknownTypeB' } as unknown as ResourceReferenceList['items'][number],
      ],
    };
    mockUseProjectSetting.mockReturnValue([projectList, undefined, undefined, false]);
    mockUseProjectDataProvider.mockReturnValue(makeMockPdp(emptyList(), 'subscribeUserModelTexts'));

    const { result } = renderHook(() =>
      useEffectiveResourceReferenceList('proj-1', 'platformScripture.modelTexts'),
    );

    // Both items must survive — they are different types, not duplicates
    expect(result.current?.items).toHaveLength(2);
  });
});
