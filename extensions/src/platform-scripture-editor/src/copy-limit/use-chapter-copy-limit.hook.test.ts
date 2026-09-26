// @vitest-environment jsdom
import { SerializedVerseRef } from '@sillsdev/scripture';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetForTesting, useChapterCopyLimit } from './use-chapter-copy-limit.hook';

const { mockUseProjectData, mockUseProjectDataProvider, mockGetMetadataForProject } = vi.hoisted(
  () => ({
    mockUseProjectData: vi.fn(),
    mockUseProjectDataProvider: vi.fn(),
    mockGetMetadataForProject: vi.fn(),
  }),
);

vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectDataProvider: (...a: unknown[]) => mockUseProjectDataProvider(...a),
}));

/** One provider object per project, so its identity is stable across renders. */
const providersByProject = new Map<string | undefined, { projectId: string | undefined }>();
function providerFor(projectId: string | undefined) {
  let provider = providersByProject.get(projectId);
  if (!provider) {
    provider = { projectId };
    providersByProject.set(projectId, provider);
  }
  return provider;
}

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: {
      getMetadataForProject: (...a: unknown[]) => mockGetMetadataForProject(...a),
    },
  },
  logger: { warn: vi.fn() },
}));

function scrRef(overrides: Partial<SerializedVerseRef> = {}): SerializedVerseRef {
  return { book: 'GEN', chapterNum: 1, verseNum: 1, ...overrides };
}

/** Project metadata for a project whose provider offers the copy-limit interface. */
const METADATA_WITH_COPY_LIMIT = {
  projectInterfaces: ['platformScripture.USJ_Chapter', 'platformScripture.CopyLimit'],
};

function deferred<T>() {
  let resolveDeferred: (value: T) => void = () => {};
  let rejectDeferred: (reason: unknown) => void = () => {};
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, resolve: resolveDeferred, reject: rejectDeferred };
}

beforeEach(() => {
  mockGetMetadataForProject.mockImplementation(async () => METADATA_WITH_COPY_LIMIT);
  mockUseProjectDataProvider.mockImplementation((_projectInterface: string, projectId?: string) =>
    providerFor(projectId),
  );
});

afterEach(() => {
  mockUseProjectData.mockReset();
  mockUseProjectDataProvider.mockReset();
  mockGetMetadataForProject.mockReset();
  resetForTesting();
});

describe('useChapterCopyLimit', () => {
  it("returns the current chapter's limit and reuses the subscription across chapters in the same book", async () => {
    const bookCopyLimits = vi.fn<(selector: SerializedVerseRef) => unknown[]>(() => [
      [undefined, 10, 20],
      vi.fn(),
      false,
    ]);
    mockUseProjectData.mockReturnValue({ BookCopyLimits: bookCopyLimits });

    const { result, rerender } = renderHook(
      ({ ref }: { ref: SerializedVerseRef }) =>
        useChapterCopyLimit('project-1', ref, 'applied-by-caller'),
      { initialProps: { ref: scrRef({ chapterNum: 1, versificationStr: 'English' }) } },
    );
    await waitFor(() => expect(result.current).toBe(10));
    const firstSelector = bookCopyLimits.mock.calls[0][0];

    rerender({ ref: scrRef({ chapterNum: 2, verseNum: 5, versificationStr: 'English' }) });
    expect(result.current).toBe(20);

    // The selector names only the book and the versification, so navigating within a book keeps
    // the same selector and needs no new subscription.
    expect(firstSelector).toEqual({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
      versificationStr: 'English',
    });
    bookCopyLimits.mock.calls.forEach((call) => expect(call[0]).toBe(firstSelector));
  });

  it('omits versificationStr from the selector when the reference has none', async () => {
    const bookCopyLimits = vi.fn<(selector: SerializedVerseRef) => unknown[]>(() => [
      [undefined, 10],
      vi.fn(),
      false,
    ]);
    mockUseProjectData.mockReturnValue({ BookCopyLimits: bookCopyLimits });

    renderHook(() =>
      useChapterCopyLimit('project-2', scrRef({ book: 'MAL' }), 'applied-by-caller'),
    );
    await act(async () => {});

    expect(bookCopyLimits.mock.calls[0][0]).toStrictEqual({
      book: 'MAL',
      chapterNum: 1,
      verseNum: 1,
    });
  });

  it('returns 0 while the limit is loading', async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [undefined, vi.fn(), true]),
    });

    const { result } = renderHook(() =>
      useChapterCopyLimit('project-3', scrRef(), 'applied-by-caller'),
    );
    await act(async () => {});
    expect(result.current).toBe(0);
  });

  it("returns 0 for the render that changes book, before the new book's limits are asked for", async () => {
    // `useProjectData` reports the new selector as loading only from an effect, so the render that
    // changes book still sees the previous book's settled limits.
    let bookLimits: (number | undefined)[] = [undefined, 10, 20, 30];
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [bookLimits, vi.fn(), false]),
    });

    const { result, rerender } = renderHook(
      ({ ref }: { ref: SerializedVerseRef }) =>
        useChapterCopyLimit('project-4', ref, 'applied-by-caller'),
      { initialProps: { ref: scrRef({ book: 'GEN', chapterNum: 3 }) } },
    );
    await waitFor(() => expect(result.current).toBe(30));

    rerender({ ref: scrRef({ book: 'EXO', chapterNum: 2 }) });
    expect(result.current).toBe(0);

    bookLimits = [undefined, 5, 7];
    rerender({ ref: scrRef({ book: 'EXO', chapterNum: 2 }) });
    expect(result.current).toBe(7);
  });

  it("returns 0 after the project changes until the new project's limits have loaded", async () => {
    // `useProjectData` keeps serving the previous project's settled limits until the new project's
    // provider resolves, which can take several renders.
    let bookCopyLimitsResult: [(number | undefined)[] | undefined, unknown, boolean] = [
      [undefined, 30],
      vi.fn(),
      false,
    ];
    mockUseProjectData.mockReturnValue({ BookCopyLimits: vi.fn(() => bookCopyLimitsResult) });

    const { result, rerender } = renderHook(
      ({ projectId }: { projectId: string }) =>
        useChapterCopyLimit(projectId, scrRef(), 'applied-by-caller'),
      { initialProps: { projectId: 'project-5' } },
    );
    await waitFor(() => expect(result.current).toBe(30));

    rerender({ projectId: 'project-5b' });
    expect(result.current).toBe(0);
    // Let the new project's metadata lookup resolve, then render a few more times on stale data.
    await act(async () => {});
    rerender({ projectId: 'project-5b' });
    rerender({ projectId: 'project-5b' });
    expect(result.current).toBe(0);

    bookCopyLimitsResult = [undefined, vi.fn(), true];
    rerender({ projectId: 'project-5b' });
    expect(result.current).toBe(0);

    bookCopyLimitsResult = [[undefined, 4], vi.fn(), false];
    rerender({ projectId: 'project-5b' });
    expect(result.current).toBe(4);
  });

  it("follows the project's metadata when it lists no copy-limit interface", async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [undefined, vi.fn(), true]),
    });
    mockGetMetadataForProject.mockImplementation(async () => ({
      projectInterfaces: ['platformScripture.USJ_Chapter'],
    }));

    const { result } = renderHook(() =>
      useChapterCopyLimit('project-6', scrRef(), 'applied-by-caller'),
    );

    await waitFor(() => expect(result.current).toBeUndefined());
    // Looked up without an interface filter.
    expect(mockGetMetadataForProject).toHaveBeenCalledWith('project-6');
  });

  it("returns 0 until the project's metadata has been looked up, even once the limits are known", async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [[undefined, 10], vi.fn(), false]),
    });
    const metadata = deferred<typeof METADATA_WITH_COPY_LIMIT>();
    mockGetMetadataForProject.mockImplementation(() => metadata.promise);

    const { result } = renderHook(() =>
      useChapterCopyLimit('project-7', scrRef(), 'applied-by-caller'),
    );
    await act(async () => {});
    expect(result.current).toBe(0);

    await act(async () => metadata.resolve(METADATA_WITH_COPY_LIMIT));
    expect(result.current).toBe(10);
  });

  it("returns 0 when the project's metadata cannot be looked up", async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [[undefined, 10], vi.fn(), false]),
    });
    mockGetMetadataForProject.mockImplementation(async () => {
      throw new Error('no such project');
    });

    const { result } = renderHook(() =>
      useChapterCopyLimit('project-8', scrRef(), 'applied-by-caller'),
    );
    await act(async () => {});
    expect(result.current).toBe(0);
  });

  it('returns 0 while the chapter text is loading, when told', async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [[undefined, 10], vi.fn(), false]),
    });

    const { result, rerender } = renderHook(
      ({ isChapterTextLoading }: { isChapterTextLoading: boolean }) =>
        useChapterCopyLimit('project-9', scrRef(), isChapterTextLoading),
      { initialProps: { isChapterTextLoading: false } },
    );
    await waitFor(() => expect(result.current).toBe(10));

    rerender({ isChapterTextLoading: true });
    expect(result.current).toBe(0);
  });

  it('looks up the metadata once per project, however many views ask', async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [[undefined, 10], vi.fn(), false]),
    });

    const first = renderHook(() =>
      useChapterCopyLimit('shared-project', scrRef(), 'applied-by-caller'),
    );
    const second = renderHook(() =>
      useChapterCopyLimit('shared-project', scrRef(), 'applied-by-caller'),
    );
    await waitFor(() => expect(first.result.current).toBe(10));
    await waitFor(() => expect(second.result.current).toBe(10));
    first.unmount();
    // A view that mounts once the answer is in hand has the limit on its first render.
    const third = renderHook(() =>
      useChapterCopyLimit('shared-project', scrRef(), 'applied-by-caller'),
    );
    expect(third.result.current).toBe(10);

    expect(mockGetMetadataForProject).toHaveBeenCalledTimes(1);
  });

  it('tries a failed metadata lookup again after a delay, without remounting', async () => {
    vi.useFakeTimers();
    try {
      mockUseProjectData.mockReturnValue({
        BookCopyLimits: vi.fn(() => [[undefined, 10], vi.fn(), false]),
      });
      mockGetMetadataForProject.mockImplementationOnce(async () => {
        throw new Error('not registered yet');
      });

      const { result } = renderHook(() =>
        useChapterCopyLimit('late-project', scrRef(), 'applied-by-caller'),
      );
      await act(async () => {});
      expect(result.current).toBe(0);
      expect(mockGetMetadataForProject).toHaveBeenCalledTimes(1);

      await act(async () => {
        vi.advanceTimersByTime(29_000);
      });
      expect(mockGetMetadataForProject).toHaveBeenCalledTimes(1);

      await act(async () => {
        vi.advanceTimersByTime(1_000);
      });
      await act(async () => {});
      expect(mockGetMetadataForProject).toHaveBeenCalledTimes(2);
      expect(result.current).toBe(10);
    } finally {
      vi.useRealTimers();
    }
  });

  it('returns 0 with no project, without looking anything up', async () => {
    mockUseProjectData.mockReturnValue({
      BookCopyLimits: vi.fn(() => [undefined, vi.fn(), true]),
    });

    const { result } = renderHook(() =>
      useChapterCopyLimit(undefined, scrRef(), 'applied-by-caller'),
    );
    await act(async () => {});

    expect(result.current).toBe(0);
    expect(mockGetMetadataForProject).not.toHaveBeenCalled();
  });

  it("returns 0 after the project changes, even when the previous project's request settles", async () => {
    let providerResult: {
      dataProvider: string;
      value: (number | undefined)[];
      isLoading: boolean;
    } = { dataProvider: 'pdp-a', value: [undefined, 30], isLoading: false };
    mockUseProjectDataProvider.mockImplementation(() => providerResult.dataProvider);
    mockUseProjectData.mockImplementation(() => ({
      BookCopyLimits: () => [providerResult.value, vi.fn(), providerResult.isLoading],
    }));

    const { result, rerender } = renderHook(
      ({ projectId }: { projectId: string }) =>
        useChapterCopyLimit(projectId, scrRef(), 'applied-by-caller'),
      { initialProps: { projectId: 'project-a' } },
    );
    await waitFor(() => expect(result.current).toBe(30));

    // The project changes while the previous project's provider still serves, mid-request.
    providerResult = { dataProvider: 'pdp-a', value: [undefined, 30], isLoading: true };
    rerender({ projectId: 'project-b' });
    await act(async () => {});
    expect(result.current).toBe(0);
    // That request settles on the previous provider.
    providerResult = { dataProvider: 'pdp-a', value: [undefined, 30], isLoading: false };
    rerender({ projectId: 'project-b' });
    expect(result.current).toBe(0);

    // The new project's provider arrives, loads and delivers.
    providerResult = { dataProvider: 'pdp-b', value: [undefined, 30], isLoading: true };
    rerender({ projectId: 'project-b' });
    expect(result.current).toBe(0);
    providerResult = { dataProvider: 'pdp-b', value: [undefined, 6], isLoading: false };
    rerender({ projectId: 'project-b' });
    expect(result.current).toBe(6);
  });

  it('subscribes through the resolved provider for the project', async () => {
    const bookCopyLimits = vi.fn<(selector: SerializedVerseRef) => unknown[]>(() => [
      [undefined, 10],
      vi.fn(),
      false,
    ]);
    mockUseProjectData.mockReturnValue({ BookCopyLimits: bookCopyLimits });

    renderHook(() => useChapterCopyLimit('project-c', scrRef(), 'applied-by-caller'));
    await act(async () => {});

    expect(mockUseProjectDataProvider).toHaveBeenCalledWith(
      'platformScripture.CopyLimit',
      'project-c',
    );
    expect(mockUseProjectData).toHaveBeenCalledWith(
      'platformScripture.CopyLimit',
      providerFor('project-c'),
    );
  });
});
