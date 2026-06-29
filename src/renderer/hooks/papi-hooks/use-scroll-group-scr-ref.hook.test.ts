import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const rawRef = { book: 'PSA', chapterNum: 147, verseNum: 1 };
const convertedRef = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };

vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getScrRefSync: () => rawRef,
  getScrRefSourceProjectIdSync: () => 'sourceProj',
  setScrRefSync: vi.fn(() => true),
  onDidUpdateScrRef: vi.fn(() => () => {}),
}));

const mapVerseRefBetweenProjects = vi.fn().mockResolvedValue(convertedRef);
vi.mock('@renderer/hooks/papi-hooks/use-project-data-provider.hook', () => ({
  useProjectDataProvider: () => ({ mapVerseRefBetweenProjects }),
}));

// useEvent just needs to be a no-op subscriber for this test
vi.mock('platform-bible-react', () => ({ useEvent: () => {} }));

describe('useScrollGroupScrRef versification conversion', () => {
  it('converts the followed ref into the consumer project versification', async () => {
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    await waitFor(() => expect(result.current[0]).toEqual(convertedRef));
    expect(mapVerseRefBetweenProjects).toHaveBeenCalledWith(rawRef, 'sourceProj', 'targetProj');
  });

  it('passes the raw ref through when no consumer projectId is given', async () => {
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true));

    expect(result.current[0]).toEqual(rawRef);
  });
});
