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
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ComponentProps } from 'react';
import {
  areCommentFiltersAtDefault,
  assignmentFilterToLabelKey,
  CommentFilters,
  isAssignmentFilter,
  isReadFilter,
  isResolvedFilter,
  isScopeFilter,
  isTypeFilter,
  readFilterToLabelKey,
  resolvedFilterToLabelKey,
  ScopeFilter,
  SCOPE_FILTER_CURRENT_CHAPTER,
  scopeFilterToLabelKey,
  typeFilterToLabelKey,
  UNFILTERED,
} from './comment-list-filters.model';

/** Extra localization keys this panel needs beyond `COMMENT_LIST_STRING_KEYS`. */
export const COMMENT_LIST_PANEL_EXTRA_STRING_KEYS = [
  '%comment_filter_assignment_all%',
  '%comment_filter_assignment_me%',
  '%comment_filter_assignment_team%',
  '%comment_filter_assignment_unassigned%',
  '%comment_filter_read_all%',
  '%comment_filter_read_read%',
  '%comment_filter_read_unread%',
  '%comment_filter_resolved_all%',
  '%comment_filter_resolved_resolved%',
  '%comment_filter_resolved_unresolved%',
  '%comment_filter_scope_all_books%',
  '%comment_filter_scope_current_chapter%',
  '%comment_filter_type_all%',
  '%comment_filter_type_comments%',
  '%comment_filter_type_conflicts%',
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
  | 'conflictResolution'
  | 'canUserEditOrDeleteCommentCallback'
  | 'selectedThreadId'
  | 'onSelectedThreadChange'
  | 'onVerseRefClick'
> & {
  /** Localized strings for the panel toolbar/empty states and the underlying comment list. */
  localizedStrings: LanguageStrings;
  /** Whether comment threads are still loading (renders skeletons). */
  isLoading: boolean;
  /** Current comment-filter axis selections (controlled; the web view uses them to query threads). */
  filters: CommentFilters;
  /** Called when any comment-filter axis changes. */
  onFiltersChange: (filters: CommentFilters) => void;
  /** Currently selected scope filter (controlled by the web view, which drives the query). */
  scopeFilter: ScopeFilter;
  /** Called when the scope filter changes. */
  onScopeFilterChange: (filter: ScopeFilter) => void;
  /**
   * Whether this list can scope to the "current chapter". True when it follows a live Scripture
   * reference — an editor-anchored list via its wired editor, or the Column 3 panel via the active
   * project's scroll group. When false (e.g. a cross-project open with no matching reference), the
   * "current chapter" scope option is hidden. Defaults to `true`.
   */
  canScopeToCurrentChapter?: boolean;
};

/**
 * A single filter dropdown for one axis. Renders each option's localized label and reports the
 * chosen value through `onChange`, narrowed by `isValue` so no unsafe cast is needed. Generic over
 * the axis's value union.
 */
function FilterDropdown<T extends string>({
  value,
  labelKeys,
  isValue,
  onChange,
  localizedStrings,
  hiddenValues,
}: {
  value: T;
  labelKeys: Readonly<Record<T, LocalizeKey>>;
  isValue: (value: string) => value is T;
  onChange: (value: T) => void;
  localizedStrings: LanguageStrings;
  /** Option values to omit from the list (e.g. a scope that doesn't apply without editor context). */
  hiddenValues?: readonly T[];
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (isValue(next)) onChange(next);
      }}
    >
      <SelectTrigger className="tw:w-auto tw:min-w-32">
        <SelectValue>
          <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
            {localizedStrings[labelKeys[value]]}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="tw:max-w-sm" align="start">
        {Object.keys(labelKeys)
          .filter(isValue)
          .filter((option) => !hiddenValues?.includes(option))
          .map((option) => (
            <SelectItem key={option} value={option}>
              {localizedStrings[labelKeys[option]]}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Presentational half of the comment-list web view: a filter toolbar plus the comment list (or a
 * loading/empty state). All data and PAPI-backed callbacks are supplied by the web view via props;
 * the comment/scope filters are controlled because the web view uses them to query threads.
 *
 * The toolbar is a row of orthogonal filter dropdowns (resolved status, read status, note type,
 * assignment) plus a scope dropdown; each defaults to "all" and they AND together.
 */
export function CommentListPanel({
  localizedStrings,
  isLoading,
  threads,
  currentUser,
  filters,
  onFiltersChange,
  scopeFilter,
  onScopeFilterChange,
  canScopeToCurrentChapter = true,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  conflictResolution,
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

  const noFiltersActive = areCommentFiltersAtDefault(filters) && scopeFilter === UNFILTERED;

  return (
    <div className="tw:flex tw:flex-col tw:h-full">
      {/* Filter toolbar — orthogonal filter dropdowns plus the scope dropdown. Sticky so it stays
          pinned to the top of whichever ancestor scrolls (PT-4070). */}
      <div className="tw:sticky tw:top-0 tw:z-10 tw:shrink-0 tw:border-b tw:bg-background tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
        <FilterDropdown
          value={filters.resolved}
          labelKeys={resolvedFilterToLabelKey}
          isValue={isResolvedFilter}
          onChange={(resolved) => onFiltersChange({ ...filters, resolved })}
          localizedStrings={localizedStrings}
        />
        <FilterDropdown
          value={filters.read}
          labelKeys={readFilterToLabelKey}
          isValue={isReadFilter}
          onChange={(read) => onFiltersChange({ ...filters, read })}
          localizedStrings={localizedStrings}
        />
        <FilterDropdown
          value={filters.type}
          labelKeys={typeFilterToLabelKey}
          isValue={isTypeFilter}
          onChange={(type) => onFiltersChange({ ...filters, type })}
          localizedStrings={localizedStrings}
        />
        <FilterDropdown
          value={filters.assignment}
          labelKeys={assignmentFilterToLabelKey}
          isValue={isAssignmentFilter}
          onChange={(assignment) => onFiltersChange({ ...filters, assignment })}
          localizedStrings={localizedStrings}
        />
        <FilterDropdown
          value={scopeFilter}
          labelKeys={scopeFilterToLabelKey}
          isValue={isScopeFilter}
          onChange={onScopeFilterChange}
          localizedStrings={localizedStrings}
          hiddenValues={canScopeToCurrentChapter ? undefined : [SCOPE_FILTER_CURRENT_CHAPTER]}
        />
      </div>

      {/* Comments list */}
      <div className="tw:flex-1 tw:overflow-auto">
        {threads.length === 0 ? (
          <div className="tw:m-4 tw:flex tw:justify-center">
            <Label>
              {noFiltersActive
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
            conflictResolution={conflictResolution}
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
