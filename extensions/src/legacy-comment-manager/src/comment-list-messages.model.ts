import type {
  CommentFilters,
  LegacyCommentFilters,
  LegacyScopeFilter,
  ScopeFilter,
} from 'legacy-comment-manager';

/** Tell the comment list to scroll to a specific thread */
type CommentListMessageSelectThread = {
  method: 'selectThread';
  threadId: string;
};

/**
 * Tell the comment list to apply a filter preset and/or scope. `filters`/`scopeFilter` also accept
 * the deprecated legacy shapes ({@link LegacyCommentFilters}, {@link LegacyScopeFilter}) for backward
 * compatibility with out-of-repo senders — see `resolveSetFiltersMessage`, which maps both onto the
 * current model and normalizes anything unrecognized to its default.
 */
type CommentListMessageSetFilters = {
  method: 'setFilters';
  filters?: Partial<CommentFilters> | LegacyCommentFilters;
  scopeFilter?: ScopeFilter | LegacyScopeFilter;
};

/** Message types that can be received from the Comment List web view controller */
export type CommentListWebViewMessage =
  | CommentListMessageSelectThread
  | CommentListMessageSetFilters;
