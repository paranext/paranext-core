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
 * @param options.retryNonce Bump to re-drive a failed read. `useData` keys its subscription on the
 *   selector by REFERENCE (see `create-use-data-hook.util.ts`, whose runaway-loop guard exists
 *   precisely because a new selector identity resubscribes), so an equal-but-new selector tears the
 *   subscription down and opens a fresh one — a real second attempt, not a repaint. Bump it only on
 *   an explicit retry, so the identity is otherwise as stable as `scrRef` and the guard is never
 *   approached.
 * @param options.isSeededEmpty Whether `usjPossiblyError` starts as a blank USJ (the default)
 *   rather than `undefined`. Pass `false` when "no chapter has arrived yet" has to be
 *   representable: a blank USJ is neither `undefined` nor falsy, so a caller cannot tell it from a
 *   chapter that arrived empty.
 * @returns `usjPossiblyError` and `isUsjLoading`, the data and loading flag `ChapterUSJ` returned;
 *   `isChapterTextLoading`, which is also `true` while `usjPossiblyError` may still be a previous
 *   chapter's or project's text (see `useIsProjectDataLoading`), so gate showing the text on it;
 *   and `copyLimit`, as `useChapterCopyLimit` resolves it, `0` while the chapter text loads (see
 *   `blockCopyWhileChapterLoads`).
 */
export function useChapterUsjWithCopyLimit(
  projectId: string | undefined,
  scrRef: SerializedVerseRef,
  { retryNonce = 0, isSeededEmpty = true }: { retryNonce?: number; isSeededEmpty?: boolean } = {},
) {
  const chapterUsjSelector = useMemo(
    () => ({
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: 1,
      versificationStr: scrRef.versificationStr,
    }),
    // `retryNonce` is intentionally a dependency the returned value does not read: it is here to
    // change this memo's IDENTITY, which is the retry mechanism described above. The rule cannot
    // express "same value, new identity", and every way of satisfying it is worse — putting the
    // nonce INTO the selector changes what is sent to the PDP over IPC, and reading it in the
    // factory body trips `no-void` or `no-unused-expressions`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrRef.book, scrRef.chapterNum, scrRef.versificationStr, retryNonce],
  );
  // One resolved provider backs both the subscription and the loading check below, so the check
  // sees the provider the data actually came from.
  const chapterUsjProvider = useProjectDataProvider('platformScripture.USJ_Chapter', projectId);
  const [usjPossiblyError, , isUsjLoading] = useProjectData(
    'platformScripture.USJ_Chapter',
    chapterUsjProvider,
  ).ChapterUSJ(chapterUsjSelector, isSeededEmpty ? EMPTY_USJ : undefined);

  const isChapterTextLoading = useIsProjectDataLoading(chapterUsjSelector, isUsjLoading, {
    projectId,
    dataProvider: chapterUsjProvider,
  });
  const copyLimit = useChapterCopyLimit(projectId, scrRef, isChapterTextLoading);

  return { usjPossiblyError, isUsjLoading, isChapterTextLoading, copyLimit };
}
