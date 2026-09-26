import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import { useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useMemo } from 'react';
import { useChapterCopyLimit } from './use-chapter-copy-limit.hook';
import { useIsProjectDataLoading } from './use-is-project-data-loading.hook';

/**
 * The whole chapter `scrRef` points to in `projectId`, and the editor `copyLimit` to show it with.
 * The chapter is fetched from verse 1 whatever `scrRef`'s verse, so navigating within a chapter
 * needs no new request. `projectId` may be `undefined`, as for a resource that is not installed.
 *
 * @returns `usjPossiblyError` and `isUsjLoading`, the data and loading flag `ChapterUSJ` returned;
 *   and `copyLimit`, as `useChapterCopyLimit` resolves it, `0` while the chapter text loads (see
 *   `blockCopyWhileChapterLoads`).
 */
export function useChapterUsjWithCopyLimit(
  projectId: string | undefined,
  scrRef: SerializedVerseRef,
) {
  const chapterUsjSelector = useMemo(
    () => ({
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: 1,
      versificationStr: scrRef.versificationStr,
    }),
    [scrRef.book, scrRef.chapterNum, scrRef.versificationStr],
  );
  // One resolved provider backs both the subscription and the loading check below, so the check
  // sees the provider the data actually came from.
  const chapterUsjProvider = useProjectDataProvider('platformScripture.USJ_Chapter', projectId);
  const [usjPossiblyError, , isUsjLoading] = useProjectData(
    'platformScripture.USJ_Chapter',
    chapterUsjProvider,
  ).ChapterUSJ(chapterUsjSelector, EMPTY_USJ);

  const isChapterTextLoading = useIsProjectDataLoading(chapterUsjSelector, isUsjLoading, {
    projectId,
    dataProvider: chapterUsjProvider,
  });
  const copyLimit = useChapterCopyLimit(projectId, scrRef, isChapterTextLoading);

  return { usjPossiblyError, isUsjLoading, copyLimit };
}
