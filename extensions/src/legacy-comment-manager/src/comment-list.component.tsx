import {
  CommentList,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from 'platform-bible-react';
import type { LanguageStrings } from 'platform-bible-utils';
import { ComponentProps } from 'react';
import {
  CommentFilter,
  commentFilterToLabelKey,
  isCommentFilter,
  isScopeFilter,
  ScopeFilter,
  scopeFilterToLabelKey,
  UNFILTERED,
} from './comment-list-filters.model';

/** Extra localization keys this panel needs beyond `COMMENT_LIST_STRING_KEYS`. */
export const COMMENT_LIST_PANEL_EXTRA_STRING_KEYS = [
  '%comment_filter_all%',
  '%comment_filter_conflicts%',
  '%comment_filter_scope_all_books%',
  '%comment_filter_scope_current_chapter%',
  '%comment_filter_unread_assigned_to_me%',
  '%comment_filter_unresolved_assigned_to_me%',
  '%comment_filter_unresolved_conflicts%',
  '%no_comments%',
  '%no_comments_match_filter%',
] as const;

// Reuse the underlying CommentList prop types so this panel stays in sync with platform-bible-react.
type CommentListProps = ComponentProps<typeof CommentList>;

export type CommentListPanelProps = Pick<
  CommentListProps,
  | 'threads'
  | 'currentUser'
  | 'handleAddCommentToThread'
  | 'handleUpdateComment'
  | 'handleDeleteComment'
  | 'handleReadStatusChange'
  | 'assignableUsers'
  | 'canUserAddCommentToThread'
  | 'canUserAssignThreadCallback'
  | 'canUserResolveThreadCallback'
  | 'canUserEditOrDeleteCommentCallback'
  | 'selectedThreadId'
  | 'onSelectedThreadChange'
  | 'onVerseRefClick'
> & {
  /** Localized strings for the panel toolbar/empty states and the underlying comment list. */
  localizedStrings: LanguageStrings;
  /** Whether comment threads are still loading (renders skeletons). */
  isLoading: boolean;
  /** Currently selected comment filter (controlled by the web view, which drives the query). */
  commentFilter: CommentFilter;
  /** Called when the comment filter changes. */
  onCommentFilterChange: (filter: CommentFilter) => void;
  /** Currently selected scope filter (controlled by the web view, which drives the query). */
  scopeFilter: ScopeFilter;
  /** Called when the scope filter changes. */
  onScopeFilterChange: (filter: ScopeFilter) => void;
};

/**
 * Presentational half of the comment-list web view: a filter toolbar plus the comment list (or a
 * loading/empty state). All data and PAPI-backed callbacks are supplied by the web view via props;
 * the comment/scope filters are controlled because the web view uses them to query threads.
 */
export function CommentListPanel({
  localizedStrings,
  isLoading,
  threads,
  currentUser,
  commentFilter,
  onCommentFilterChange,
  scopeFilter,
  onScopeFilterChange,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  selectedThreadId,
  onSelectedThreadChange,
  onVerseRefClick,
}: CommentListPanelProps) {
  if (isLoading) {
    return (
      <div className="tw:bg-background tw:flex-1 tw:p-2 tw:space-y-4">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            // There are no other unique identifiers for these items
            // eslint-disable-next-line react/no-array-index-key
            key={`comment-thread-skeleton-${index}`}
            className="tw:h-48 tw:w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:h-full">
      {/* Filter toolbar */}
      <div className="tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
        {/* Comment filter dropdown */}
        <Select
          value={commentFilter}
          onValueChange={(value) => {
            if (isCommentFilter(value)) onCommentFilterChange(value);
          }}
        >
          <SelectTrigger className="tw:w-auto tw:min-w-48">
            <SelectValue>
              <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
                {localizedStrings[commentFilterToLabelKey[commentFilter]]}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="tw:max-w-sm" align="start">
            {Object.keys(commentFilterToLabelKey)
              .filter(isCommentFilter)
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {localizedStrings[commentFilterToLabelKey[value]]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Scope filter dropdown */}
        <Select
          value={scopeFilter}
          onValueChange={(value) => {
            if (isScopeFilter(value)) onScopeFilterChange(value);
          }}
        >
          <SelectTrigger className="tw:w-auto tw:min-w-48">
            <SelectValue>
              <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
                {localizedStrings[scopeFilterToLabelKey[scopeFilter]]}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="tw:max-w-sm" align="start">
            {Object.keys(scopeFilterToLabelKey)
              .filter(isScopeFilter)
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {localizedStrings[scopeFilterToLabelKey[value]]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Comments list */}
      <div className="tw:flex-1 tw:overflow-auto">
        {threads.length === 0 ? (
          <div className="tw:m-4 tw:flex tw:justify-center">
            <Label>
              {commentFilter === UNFILTERED && scopeFilter === UNFILTERED
                ? localizedStrings['%no_comments%']
                : localizedStrings['%no_comments_match_filter%']}
            </Label>
          </div>
        ) : (
          <CommentList
            classNameForVerseText="scripture-font"
            threads={threads}
            currentUser={currentUser}
            localizedStrings={localizedStrings}
            handleAddCommentToThread={handleAddCommentToThread}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            handleReadStatusChange={handleReadStatusChange}
            assignableUsers={assignableUsers}
            canUserAddCommentToThread={canUserAddCommentToThread}
            canUserAssignThreadCallback={canUserAssignThreadCallback}
            canUserResolveThreadCallback={canUserResolveThreadCallback}
            canUserEditOrDeleteCommentCallback={canUserEditOrDeleteCommentCallback}
            selectedThreadId={selectedThreadId}
            onSelectedThreadChange={onSelectedThreadChange}
            onVerseRefClick={onVerseRefClick}
          />
        )}
      </div>
    </div>
  );
}

export default CommentListPanel;
