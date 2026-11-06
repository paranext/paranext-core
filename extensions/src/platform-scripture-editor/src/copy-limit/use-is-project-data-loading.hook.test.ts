// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useIsProjectDataLoading } from './use-is-project-data-loading.hook';

describe('useIsProjectDataLoading', () => {
  it('reports the loading flag it is given while the selector stays the same', () => {
    const selector = { book: 'GEN', chapterNum: 1 };
    const { result, rerender } = renderHook(
      ({ isLoading }: { isLoading: boolean }) => useIsProjectDataLoading(selector, isLoading),
      { initialProps: { isLoading: true } },
    );
    expect(result.current).toBe(true);

    rerender({ isLoading: false });
    expect(result.current).toBe(false);
  });

  it('reports loading for the render that changes the selector, before the fetch has been told', () => {
    const { result, rerender } = renderHook(
      ({ selector }: { selector: object }) => useIsProjectDataLoading(selector, false),
      { initialProps: { selector: { book: 'GEN', chapterNum: 1 } } },
    );
    expect(result.current).toBe(false);

    const nextSelector = { book: 'GEN', chapterNum: 2 };
    rerender({ selector: nextSelector });
    expect(result.current).toBe(true);

    rerender({ selector: nextSelector });
    expect(result.current).toBe(false);
  });

  it("reports loading after the project changes until the new project's provider has loaded", () => {
    const selector = { book: 'GEN', chapterNum: 1 };
    type Props = { projectId: string; dataProvider: string; isLoading: boolean };
    const { result, rerender } = renderHook(
      ({ projectId, dataProvider, isLoading }: Props) =>
        useIsProjectDataLoading(selector, isLoading, { projectId, dataProvider }),
      { initialProps: { projectId: 'project-a', dataProvider: 'pdp-a', isLoading: false } },
    );
    expect(result.current).toBe(false);

    // The previous project's provider is still served, and its data still counts as settled.
    rerender({ projectId: 'project-b', dataProvider: 'pdp-a', isLoading: false });
    expect(result.current).toBe(true);
    rerender({ projectId: 'project-b', dataProvider: 'pdp-a', isLoading: false });
    expect(result.current).toBe(true);
    // A request still in flight on the previous provider settles: not the new project's data.
    rerender({ projectId: 'project-b', dataProvider: 'pdp-a', isLoading: true });
    rerender({ projectId: 'project-b', dataProvider: 'pdp-a', isLoading: false });
    expect(result.current).toBe(true);

    // The new project's provider arrives, loads and delivers.
    rerender({ projectId: 'project-b', dataProvider: 'pdp-b', isLoading: true });
    expect(result.current).toBe(true);
    rerender({ projectId: 'project-b', dataProvider: 'pdp-b', isLoading: false });
    expect(result.current).toBe(false);
  });

  it('reports loading after the project changes when its provider arrives on the same render', () => {
    const selector = { book: 'GEN', chapterNum: 1 };
    type Props = { projectId: string; dataProvider: string; isLoading: boolean };
    const { result, rerender } = renderHook(
      ({ projectId, dataProvider, isLoading }: Props) =>
        useIsProjectDataLoading(selector, isLoading, { projectId, dataProvider }),
      { initialProps: { projectId: 'project-a', dataProvider: 'pdp-a', isLoading: false } },
    );

    rerender({ projectId: 'project-b', dataProvider: 'pdp-b', isLoading: false });
    expect(result.current).toBe(true);
    rerender({ projectId: 'project-b', dataProvider: 'pdp-b', isLoading: true });
    rerender({ projectId: 'project-b', dataProvider: 'pdp-b', isLoading: false });
    expect(result.current).toBe(false);
  });
});
