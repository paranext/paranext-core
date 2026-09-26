// @vitest-environment jsdom
import { SerializedVerseRef } from '@sillsdev/scripture';
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetForTesting } from './use-chapter-copy-limit.hook';
import { useChapterUsjWithCopyLimit } from './use-chapter-usj-with-copy-limit.hook';

const CHAPTER_INTERFACE = 'platformScripture.USJ_Chapter';
const COPY_LIMIT_INTERFACE = 'platformScripture.CopyLimit';

const { mockUseProjectData, mockUseProjectDataProvider } = vi.hoisted(() => ({
  mockUseProjectData: vi.fn(),
  mockUseProjectDataProvider: vi.fn(),
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectData: (...a: unknown[]) => mockUseProjectData(...a),
  useProjectDataProvider: (...a: unknown[]) => mockUseProjectDataProvider(...a),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: {
      getMetadataForProject: async () => ({
        projectInterfaces: [CHAPTER_INTERFACE, COPY_LIMIT_INTERFACE],
      }),
    },
  },
  logger: { warn: vi.fn() },
}));

/** One provider object per interface and project, so its identity is stable across renders. */
const providers = new Map<string, { projectInterface: string; projectId: string | undefined }>();
function providerFor(projectInterface: string, projectId: string | undefined) {
  const key = `${projectInterface}:${projectId}`;
  let provider = providers.get(key);
  if (!provider) {
    provider = { projectInterface, projectId };
    providers.set(key, provider);
  }
  return provider;
}

/** The project whose chapter provider is served, whatever project is asked for; see `beforeEach`. */
let servedChapterProjectId: string | undefined;
/** What `ChapterUSJ` returns: `[data, setData, isLoading]`. */
let chapterResult: [unknown, unknown, boolean];
const chapterUsj = vi.fn<(selector: unknown, defaultValue: unknown) => unknown>(
  () => chapterResult,
);
/** Whether `BookCopyLimits` reports loading. */
let areCopyLimitsLoading: boolean;
const USJ = { type: 'USJ', version: '3.1', content: [] };

function scrRef(overrides: Partial<SerializedVerseRef> = {}): SerializedVerseRef {
  return { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English', ...overrides };
}

beforeEach(() => {
  servedChapterProjectId = undefined;
  chapterResult = [USJ, vi.fn(), false];
  areCopyLimitsLoading = false;
  mockUseProjectDataProvider.mockImplementation(
    (projectInterface: string, projectId: string | undefined) =>
      providerFor(
        projectInterface,
        projectInterface === CHAPTER_INTERFACE && servedChapterProjectId !== undefined
          ? servedChapterProjectId
          : projectId,
      ),
  );
  mockUseProjectData.mockImplementation((projectInterface: string) =>
    projectInterface === CHAPTER_INTERFACE
      ? { ChapterUSJ: chapterUsj }
      : { BookCopyLimits: () => [[undefined, 5, 8], vi.fn(), areCopyLimitsLoading] },
  );
});

afterEach(() => {
  mockUseProjectData.mockReset();
  mockUseProjectDataProvider.mockReset();
  chapterUsj.mockClear();
  providers.clear();
  resetForTesting();
});

describe('useChapterUsjWithCopyLimit', () => {
  it("reads the whole chapter through the project's chapter provider, one selector per chapter", async () => {
    const { result, rerender } = renderHook(
      ({ ref }: { ref: SerializedVerseRef }) => useChapterUsjWithCopyLimit('project-1', ref),
      { initialProps: { ref: scrRef({ verseNum: 3 }) } },
    );
    await waitFor(() => expect(result.current.copyLimit).toBe(5));
    expect(result.current.usjPossiblyError).toBe(USJ);
    expect(result.current.isUsjLoading).toBe(false);

    expect(mockUseProjectData).toHaveBeenCalledWith(
      CHAPTER_INTERFACE,
      providerFor(CHAPTER_INTERFACE, 'project-1'),
    );
    const [firstSelector] = chapterUsj.mock.calls[0];
    expect(firstSelector).toEqual({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
      versificationStr: 'English',
    });

    // Moving to another verse of the same chapter keeps the same selector, so no new request.
    rerender({ ref: scrRef({ verseNum: 7 }) });
    chapterUsj.mock.calls.forEach(([selector]) => expect(selector).toBe(firstSelector));
  });

  it('blocks copying while the chapter text loads, and on the render that changes chapter', async () => {
    const { result, rerender } = renderHook(
      ({ ref }: { ref: SerializedVerseRef }) => useChapterUsjWithCopyLimit('project-1', ref),
      { initialProps: { ref: scrRef() } },
    );
    await waitFor(() => expect(result.current.copyLimit).toBe(5));

    chapterResult = [USJ, vi.fn(), true];
    rerender({ ref: scrRef() });
    expect(result.current.isUsjLoading).toBe(true);
    expect(result.current.copyLimit).toBe(0);

    // The fetch has not been told about chapter 2 yet, so it still reports settled.
    chapterResult = [USJ, vi.fn(), false];
    rerender({ ref: scrRef({ chapterNum: 2 }) });
    expect(result.current.copyLimit).toBe(0);
    rerender({ ref: scrRef({ chapterNum: 2 }) });
    expect(result.current.copyLimit).toBe(8);
  });

  it("blocks copying after the project changes until the new project's chapter provider has loaded", async () => {
    // Settle project-2's copy-limit lookup up front, so only the chapter text can hold the limit.
    const warmUp = renderHook(() => useChapterUsjWithCopyLimit('project-2', scrRef()));
    await waitFor(() => expect(warmUp.result.current.copyLimit).toBe(5));
    warmUp.unmount();

    const { result, rerender } = renderHook(
      ({ projectId }: { projectId: string }) => useChapterUsjWithCopyLimit(projectId, scrRef()),
      { initialProps: { projectId: 'project-1' } },
    );
    await waitFor(() => expect(result.current.copyLimit).toBe(5));

    // The previous project's chapter provider is still served, and its data counts as settled,
    // while the new project's copy limits load and arrive.
    servedChapterProjectId = 'project-1';
    areCopyLimitsLoading = true;
    rerender({ projectId: 'project-2' });
    areCopyLimitsLoading = false;
    rerender({ projectId: 'project-2' });
    expect(result.current.copyLimit).toBe(0);

    // The new project's chapter provider arrives, loads and delivers.
    servedChapterProjectId = undefined;
    chapterResult = [USJ, vi.fn(), true];
    rerender({ projectId: 'project-2' });
    expect(result.current.copyLimit).toBe(0);
    chapterResult = [USJ, vi.fn(), false];
    rerender({ projectId: 'project-2' });
    expect(result.current.copyLimit).toBe(5);
  });
});
