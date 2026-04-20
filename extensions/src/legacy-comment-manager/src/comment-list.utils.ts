import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';

/**
 * Prepares comment threads for display by:
 *
 * 1. Filtering out spelling notes and biblical terms notes (handled by Wordlist / Biblical Terms)
 * 2. Merging threads with duplicate IDs (combining their comments, keeping the entry with the latest
 *    `modifiedDate` as the metadata base)
 * 3. Dropping threads where all comments have been deleted
 *
 * Filtering is done before deduplication so that note-type flags from excluded threads cannot bleed
 * into the merged metadata of a surviving thread with the same ID.
 *
 * @param threads Raw comment threads from the data provider
 * @returns Filtered, deduplicated, non-empty threads ready to render
 */
export function prepareCommentThreads(threads: LegacyCommentThread[]): LegacyCommentThread[] {
  const threadMap = new Map<string, LegacyCommentThread>();

  threads
    .filter((thread) => !thread.isSpellingNote && !thread.isBTNote)
    .forEach((thread) => {
      const existing = threadMap.get(thread.id);
      if (!existing) {
        threadMap.set(thread.id, thread);
      } else {
        const seenCommentIds = new Set<string>(existing.comments.map((c: LegacyComment) => c.id));
        const mergedComments = [
          ...existing.comments,
          ...thread.comments.filter((c: LegacyComment) => !seenCommentIds.has(c.id)),
        ];
        const latest =
          new Date(thread.modifiedDate) > new Date(existing.modifiedDate) ? thread : existing;
        threadMap.set(thread.id, { ...latest, comments: mergedComments });
      }
    });

  return [...threadMap.values()].filter((thread) =>
    thread.comments.some((comment: LegacyComment) => !comment.deleted),
  );
}
