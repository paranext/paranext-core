// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { logger } from '@papi/frontend';
import { useData, useProjectSetting } from '@papi/frontend/react';
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';
import { useTextCollectionProjectId } from './use-text-collection-project-id.hook';

let activeEditorProjectId: string | undefined;

vi.mock('@papi/frontend/react', () => ({ useData: vi.fn(), useProjectSetting: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  default: {
    window: { dataProviderName: 'platform.windowServiceDataProvider' },
    network: { getNetworkEvent: vi.fn(() => 'event-token') },
  },
  logger: { warn: vi.fn() },
}));
vi.mock('platform-bible-react', () => ({ useEvent: vi.fn() }));

const DEFAULT_LIST = { dataVersion: '1.0.0', items: [] };

/**
 * The grid's own chain: the project this hook resolves is what `useTextCollectionSources` hands to
 * `useBufferedLayoutSetting` for the admin-shared list. Composed here with the real buffered hook
 * so a test can see its "projectId changed in place" tripwire, not just the resolved id.
 */
function useGridProjectChain(explicitProjectId: string | undefined) {
  const projectId = useTextCollectionProjectId(explicitProjectId);
  useBufferedLayoutSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    DEFAULT_LIST,
  );
  return projectId;
}

const inPlaceChangeWarnings = () =>
  vi
    .mocked(logger.warn)
    .mock.calls.filter(([message]) => String(message).includes('projectId changed in place'));

describe('useTextCollectionProjectId', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    activeEditorProjectId = undefined;
    // The window data provider's `ActiveEditorProjectId` — a PAPI boundary, so it is mocked. Read
    // through a variable so a test can move the active editor between renders.
    vi.mocked(useData).mockImplementation(
      () =>
        // `useData` returns a proxy with one hook per data type; only the one this hook reads matters
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ({ ActiveEditorProjectId: () => [activeEditorProjectId, undefined, false] }) as never,
    );
    // The buffered hook's setting read; settled, so it applies and disarms as it would in the app
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(useProjectSetting).mockReturnValue([
      DEFAULT_LIST,
      undefined,
      undefined,
      false,
    ] as never);
  });

  it('takes the first project it is given when opened with none', () => {
    const { result, rerender } = renderHook(() => useGridProjectChain(undefined));
    expect(result.current).toBeUndefined();

    activeEditorProjectId = 'proj-a';
    rerender();

    expect(result.current).toBe('proj-a');
  });

  it('does not move off its project when the active editor changes, so the tripwire never fires', () => {
    activeEditorProjectId = 'proj-a';
    const { result, rerender } = renderHook(() => useGridProjectChain(undefined));

    activeEditorProjectId = 'proj-b';
    rerender();
    activeEditorProjectId = undefined;
    rerender();

    expect(result.current).toBe('proj-a');
    expect(inPlaceChangeWarnings()).toHaveLength(0);
  });

  it('lets an explicit projectId win over the project it already shows', () => {
    // Also the control for the test above: an in-place move IS visible to the tripwire in this
    // harness, so its silence there is evidence rather than a harness that cannot see the warning.
    // In the app an explicit move arrives by `reloadWebView`, which remounts instead.
    activeEditorProjectId = 'proj-a';
    let explicitProjectId: string | undefined;
    const { result, rerender } = renderHook(() => useGridProjectChain(explicitProjectId));
    expect(result.current).toBe('proj-a');

    explicitProjectId = 'proj-pinned';
    rerender();

    expect(result.current).toBe('proj-pinned');
    expect(inPlaceChangeWarnings()).toHaveLength(1);
  });

  it('starts on an explicit projectId and ignores the active editor', () => {
    activeEditorProjectId = 'proj-a';
    const { result, rerender } = renderHook(() => useGridProjectChain('proj-pinned'));

    activeEditorProjectId = 'proj-b';
    rerender();

    expect(result.current).toBe('proj-pinned');
  });
});
