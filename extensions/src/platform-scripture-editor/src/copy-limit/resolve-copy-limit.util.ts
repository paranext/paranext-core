import { isPlatformError, PlatformError } from 'platform-bible-utils';

/**
 * Turns the backend's per-book copy limits into the editor's `copyLimit` for one chapter. While the
 * limits are unknown (loading or failed) nothing may be copied, for any text, so a slow or failed
 * request can't open a gap.
 *
 * Chapter 0 (a book's introduction and headings) is shown as the start of chapter 1, so it takes
 * chapter 1's limit. A chapter with no entry, including one past the end of the book, which has no
 * text to copy, has no limit.
 */
export function resolveCopyLimit({
  value,
  isLoading,
  chapterNum,
}: {
  value: (number | undefined)[] | undefined | PlatformError;
  isLoading: boolean;
  chapterNum: number;
}): number | undefined {
  if (isLoading || isPlatformError(value)) return 0;
  return value?.[chapterNum === 0 ? 1 : chapterNum] ?? undefined;
}

/**
 * Returns `0` while the chapter's text is loading, and `copyLimit` otherwise. `useProjectData`
 * keeps serving the previous chapter's text until the new chapter's fetch resolves, while
 * `useChapterCopyLimit` already resolves the new chapter's limit, because the limits arrive per
 * book. Blocking copying for that round trip means the old chapter on screen is never copyable
 * under a different chapter's, possibly larger, limit.
 */
export function blockCopyWhileChapterLoads(
  copyLimit: number | undefined,
  isChapterTextLoading: boolean,
): number | undefined {
  return isChapterTextLoading ? 0 : copyLimit;
}
