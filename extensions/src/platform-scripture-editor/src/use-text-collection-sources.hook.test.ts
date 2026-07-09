// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './resource-reference-list.const';
import { useTextCollectionSources } from './use-text-collection-sources.hook';

const { mockUseProjectSetting, mockUseProjectData } = vi.hoisted(() => ({
  mockUseProjectSetting: vi.fn(),
  mockUseProjectData: vi.fn(),
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: (...a: unknown[]) => mockUseProjectSetting(...a),
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
}));

const MODEL_LIST = { dataVersion: '1.1.0', items: [{ type: 'project', id: 'p1', name: 'WEB' }] };
const REF_LIST = { dataVersion: '1.1.0', items: [{ type: 'project', id: 'p2', name: 'KJV' }] };
const USER_LIST = { dataVersion: '1.1.0', items: [{ type: 'project', id: 'p3', name: 'ASV' }] };
const OVERLAY = { p1: true };
const ERROR = { platformErrorVersion: 1, message: 'boom' };

// [value, isLoading] per source; the setup wires each into the tuple shape its hook returns
// (`useProjectSetting` is a 4-tuple [value, set, reset, isLoading]; the `useProjectData` methods
// are 3-tuples [value, set, isLoading]).
type SourceState = [unknown, boolean];
function setSources(cfg: {
  modelTexts?: SourceState;
  referenced?: SourceState;
  userReferenced?: SourceState;
  overlay?: SourceState;
}) {
  const {
    modelTexts = [MODEL_LIST, false],
    referenced = [REF_LIST, false],
    userReferenced = [USER_LIST, false],
    overlay = [OVERLAY, false],
  } = cfg;
  mockUseProjectSetting.mockImplementation((_projectId: string, key: string) =>
    key === 'platformScripture.modelTexts'
      ? [modelTexts[0], vi.fn(), vi.fn(), modelTexts[1]]
      : [referenced[0], vi.fn(), vi.fn(), referenced[1]],
  );
  mockUseProjectData.mockReturnValue({
    UserReferencedProjectsAndResources: () => [userReferenced[0], vi.fn(), userReferenced[1]],
    ShownByDefaultOverlay: () => [overlay[0], vi.fn(), overlay[1]],
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useTextCollectionSources', () => {
  it('passes through all four well-formed sources', () => {
    setSources({});
    const { result } = renderHook(() => useTextCollectionSources('proj'));
    const [sources, isLoading] = result.current;
    expect(sources.adminModelTexts).toBe(MODEL_LIST);
    expect(sources.adminReferenced).toBe(REF_LIST);
    expect(sources.userReferenced).toBe(USER_LIST);
    expect(sources.overlay).toBe(OVERLAY);
    expect(isLoading).toBe(false);
  });

  it('degrades an errored admin list to the default empty list', () => {
    setSources({ modelTexts: [ERROR, false] });
    const { result } = renderHook(() => useTextCollectionSources('proj'));
    const [sources] = result.current;
    // Errored source falls back to the canonical default; the others are untouched.
    expect(sources.adminModelTexts).toBe(DEFAULT_RESOURCE_REFERENCE_LIST);
    expect(sources.adminReferenced).toBe(REF_LIST);
  });

  it('degrades an errored user list to the default empty list', () => {
    setSources({ userReferenced: [ERROR, false] });
    const { result } = renderHook(() => useTextCollectionSources('proj'));
    expect(result.current[0].userReferenced).toBe(DEFAULT_RESOURCE_REFERENCE_LIST);
  });

  it('degrades an errored overlay to an empty overlay', () => {
    setSources({ overlay: [ERROR, false] });
    const { result } = renderHook(() => useTextCollectionSources('proj'));
    expect(result.current[0].overlay).toEqual({});
  });

  it('reports loading while any single source is still loading', () => {
    setSources({ overlay: [OVERLAY, true] });
    const { result } = renderHook(() => useTextCollectionSources('proj'));
    expect(result.current[1]).toBe(true);
  });
});
