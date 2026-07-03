import type { LegacyCommentThreadSelector } from 'legacy-comment-manager';

// Filter constants and types — shared between the presentational panel (which renders the filter
// toolbar) and the web view (which uses the values to build its comment-thread query). Kept free
// of React/DOM dependencies so the query mapping is unit-testable.

export const UNFILTERED = 'unfiltered';
export const FILTER_UNRESOLVED_ASSIGNED = 'unresolved-assigned-to-me';
export const FILTER_UNREAD_ASSIGNED = 'unread-assigned-to-me';
export const FILTER_UNRESOLVED_CONFLICTS = 'unresolved-conflicts';
export const SCOPE_FILTER_CURRENT_CHAPTER = 'current-chapter';

export const commentFilterToLabelKey = {
  [FILTER_UNRESOLVED_ASSIGNED]: '%comment_filter_unresolved_assigned_to_me%',
  [FILTER_UNREAD_ASSIGNED]: '%comment_filter_unread_assigned_to_me%',
  [FILTER_UNRESOLVED_CONFLICTS]: '%comment_filter_unresolved_conflicts%',
  [UNFILTERED]: '%comment_filter_all%',
} as const;

export type CommentFilter = keyof typeof commentFilterToLabelKey;

export const scopeFilterToLabelKey = {
  [SCOPE_FILTER_CURRENT_CHAPTER]: '%comment_filter_scope_current_chapter%',
  [UNFILTERED]: '%comment_filter_scope_all_books%',
} as const;

export type ScopeFilter = keyof typeof scopeFilterToLabelKey;

export function isCommentFilter(value: string): value is CommentFilter {
  return value in commentFilterToLabelKey;
}
export function isScopeFilter(value: string): value is ScopeFilter {
  return value in scopeFilterToLabelKey;
}

/**
 * Builds the comment-thread query for the current filter selections.
 *
 * "Unresolved conflicts" queries conflict threads whose THREAD status is not `Resolved` — PT9's own
 * "Unresolved conflicts" notes filter (`StatusFilter(Unresolved)` + conflict tag). See PT-4027.
 */
export function buildCommentThreadSelector({
  commentFilter,
  scopeFilter,
  scrRef,
  currentUserName,
}: {
  commentFilter: CommentFilter;
  scopeFilter: ScopeFilter;
  scrRef: { book: string; chapterNum: number; verseNum: number };
  currentUserName: string;
}): LegacyCommentThreadSelector {
  const selector: LegacyCommentThreadSelector = {};

  // Apply scope (Scripture ranges) filter
  if (scopeFilter === SCOPE_FILTER_CURRENT_CHAPTER) {
    selector.scriptureRanges = [
      {
        granularity: 'chapter' as const,
        start: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
        end: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
      },
    ];
  }

  // Apply comment filter
  if (commentFilter === FILTER_UNRESOLVED_ASSIGNED) {
    selector.status = 'Todo';
    selector.assignedTo = currentUserName;
  } else if (commentFilter === FILTER_UNREAD_ASSIGNED) {
    selector.isRead = false;
    selector.assignedTo = currentUserName;
  } else if (commentFilter === FILTER_UNRESOLVED_CONFLICTS) {
    selector.type = 'Conflict';
    selector.isResolved = false;
  }

  return selector;
}
