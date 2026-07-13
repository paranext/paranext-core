import type { CommentFilters, ScopeFilter } from 'legacy-comment-manager';

/** Tell the comment list to scroll to a specific thread */
type CommentListMessageSelectThread = {
  method: 'selectThread';
  threadId: string;
};

/** Tell the comment list to apply filter axes and/or scope */
type CommentListMessageSetFilters = {
  method: 'setFilters';
  filters?: Partial<CommentFilters>;
  scopeFilter?: ScopeFilter;
};

/** Message types that can be received from the Comment List web view controller */
export type CommentListWebViewMessage =
  | CommentListMessageSelectThread
  | CommentListMessageSetFilters;
