import { Canon, VerseRef } from '@sillsdev/scripture';
import type { LegacyCommentThread } from 'platform-bible-utils';

// Finds where the comment list should scroll when the scroll-group BCV reference changes
// (PT-4080). Pure and DOM-free so the ranking rules are unit-testable; the web view maps the
// returned target to actual DOM scrolling.

/** The subset of comment-thread data the scroll-target search needs. */
export type ScrollRankableThread = Pick<LegacyCommentThread, 'id' | 'verseRef'>;

/**
 * Where the comment list should scroll after a BCV change: a specific thread (scrolled to the top
 * of the list), the bottom of the list (the reference is past every loaded thread), or nowhere
 * (`undefined` — nothing rankable to scroll to).
 */
export type CommentListScrollTarget =
  | { type: 'thread'; threadId: string }
  | { type: 'bottom' }
  | undefined;

function toBbbCccVvv(bookNum: number, chapterNum: number, verseNum: number): number {
  return bookNum * 1_000_000 + chapterNum * 1_000 + verseNum;
}

/**
 * Finds the thread the comment list should scroll to for the current scripture reference: the
 * thread with the smallest reference at or after `scrRef`, compared at verse granularity. A
 * verse-range reference (e.g. `MRK 11:13-14`) ranks by its start verse. Same-verse ties resolve to
 * the earliest thread in list order. Threads whose `verseRef` cannot be parsed are skipped.
 *
 * @param threads The currently loaded (already filtered) comment threads, in list render order
 * @param scrRef The current scroll-group scripture reference
 * @returns The target thread, `{ type: 'bottom' }` when rankable threads exist but all are before
 *   `scrRef`, or `undefined` when there is nothing rankable (or `scrRef.book` is unknown)
 */
export function findScrollTarget(
  threads: readonly ScrollRankableThread[],
  scrRef: { book: string; chapterNum: number; verseNum: number },
): CommentListScrollTarget {
  const currentBookNum = Canon.bookIdToNumber(scrRef.book);
  if (currentBookNum <= 0) return undefined;
  const currentPosition = toBbbCccVvv(currentBookNum, scrRef.chapterNum, scrRef.verseNum);

  let bestThreadId: string | undefined;
  let bestPosition = Number.POSITIVE_INFINITY;
  let hasRankableThread = false;

  threads.forEach((thread) => {
    const { success, verseRef } = VerseRef.tryParse(thread.verseRef ?? '');
    if (!success || verseRef.bookNum <= 0) return;
    hasRankableThread = true;
    // For a verse range, verseNum is the start verse, so ranges rank by where they begin.
    const threadPosition = verseRef.BBBCCCVVV;
    if (threadPosition < currentPosition) return;
    // Strict < keeps the FIRST thread in list order when several share a verse.
    if (threadPosition < bestPosition) {
      bestPosition = threadPosition;
      bestThreadId = thread.id;
    }
  });

  if (bestThreadId !== undefined) return { type: 'thread', threadId: bestThreadId };
  return hasRankableThread ? { type: 'bottom' } : undefined;
}
