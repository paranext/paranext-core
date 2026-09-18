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
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ComponentProps, ReactNode } from 'react';
import {
  CommentFilters,
  isCommentPreset,
  isScopeFilter,
  isShowingAllThreads,
  presetToLabelKey,
  ScopeFilter,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

/** Extra localization keys this panel needs beyond `COMMENT_LIST_STRING_KEYS`. */
export const COMMENT_LIST_PANEL_EXTRA_STRING_KEYS = [
  '%comment_filter_aria_preset%',
  '%comment_filter_aria_scope%',
  '%comment_filter_preset_all%',
  '%comment_filter_preset_unresolved_assigned_to_me%',
  '%comment_filter_preset_unresolved%',
  '%comment_filter_preset_unread_assigned_to_me%',
  '%comment_filter_preset_unread%',
  '%comment_filter_preset_unread_and_unresolved%',
  '%comment_filter_preset_resolved%',
  '%comment_filter_preset_unsaved%',
  '%comment_filter_preset_conflict%',
  '%comment_filter_scope_all_books%',
  '%comment_filter_scope_current_book%',
  '%comment_filter_scope_current_chapter%',
  '%comment_filter_scope_current_verse%',
  '%no_comments%',
  '%no_comments_match_filter%',
  '%webView_legacyCommentManager_syncEditBlocked_notice%',
] as const;

/**
 * Slim "editing paused during Send/Receive" notice text shown while this project's sync blocks
 * edits.
 */
const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';

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
  | 'drafts'
  | 'onDraftChange'
> & {
  /** Localized strings for the panel toolbar/empty states and the underlying comment list. */
  localizedStrings: LanguageStrings;
  /** Whether comment threads are still loading (renders skeletons). */
  isLoading: boolean;
  /** Current comment-filter preset selection (controlled; the web view uses it to query threads). */
  filters: CommentFilters;
  /** Called when the preset filter changes. */
  onFiltersChange: (filters: CommentFilters) => void;
  /** Currently selected scope filter (controlled by the web view, which drives the query). */
  scopeFilter: ScopeFilter;
  /** Called when the scope filter changes. */
  onScopeFilterChange: (filter: ScopeFilter) => void;
  /**
   * Whether this project's automatic Send/Receive is currently blocking edits. When true, a slim
   * "editing paused" notice is shown above the list; the write affordances are disabled separately
   * by the web view via the capability callbacks. Defaults to `false`.
   */
  isSyncBlocked?: boolean;
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
  ariaLabel,
  testId,
}: {
  value: T;
  labelKeys: Readonly<Record<T, LocalizeKey>>;
  isValue: (value: string) => value is T;
  onChange: (value: T) => void;
  localizedStrings: LanguageStrings;
  /**
   * Accessible name for the trigger. The dropdown's displayed value doubles as its only visible
   * label, so a screen reader would otherwise announce just the value with no indication of which
   * axis it filters.
   */
  ariaLabel: string;
  /** Optional stable test hook placed on the trigger (e.g. for the scope dropdown in E2E tests). */
  testId?: string;
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (isValue(next)) onChange(next);
      }}
    >
      <SelectTrigger className="tw:w-auto tw:min-w-32" aria-label={ariaLabel} data-testid={testId}>
        <SelectValue>
          <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
            {localizedStrings[labelKeys[value]]}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="tw:max-w-sm" align="start">
        {Object.keys(labelKeys)
          .filter(isValue)
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
 * The toolbar is two always-visible dropdowns — a comment preset and a Scripture scope — that AND
 * together.
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
  isSyncBlocked = false,
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
  drafts,
  onDraftChange,
}: CommentListPanelProps) {
  const noFiltersActive = isShowingAllThreads({ filters, scopeFilter });

  // The list area swaps between skeletons (loading), an empty-state message, and the list — but the
  // toolbar below always renders, so isLoading only governs this region.
  let listContent: ReactNode;
  if (isLoading) {
    listContent = (
      <div className="tw:p-2 tw:space-y-4">
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
  } else if (threads.length === 0) {
    listContent = (
      <div className="tw:m-4 tw:flex tw:justify-center">
        <Label>
          {noFiltersActive
            ? localizedStrings['%no_comments%']
            : localizedStrings['%no_comments_match_filter%']}
        </Label>
      </div>
    );
  } else {
    listContent = (
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
        drafts={drafts}
        onDraftChange={onDraftChange}
      />
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:h-full">
      {/* Sticky header: the editing-paused notice (when blocking) and the filter toolbar share one
          sticky container so both stay pinned to the top of whichever ancestor scrolls and neither
          scrolls out of view as the comments list scrolls. */}
      <div className="tw:sticky tw:top-0 tw:z-10 tw:shrink-0">
        {/* Slim, non-covering notice shown while this project's automatic Send/Receive is blocking
            edits. Only the write affordances are disabled (by the web view's gated capability
            callbacks); filtering/reading comments stays fully usable. */}
        {isSyncBlocked && (
          <div
            role="status"
            className="tw:border-b tw:border-border tw:bg-muted tw:px-4 tw:py-1.5 tw:text-sm tw:font-medium"
          >
            {localizedStrings[SYNC_BLOCKED_NOTICE_KEY]}
          </div>
        )}
        {/* Filter toolbar — a preset dropdown and a scope dropdown, always visible. Rendered
            regardless of the loading state: it must stay mounted across filter changes (each of
            which briefly flips `isLoading` true while the query resubscribes), or the control the
            user is interacting with would unmount from under them, causing a visible strobe. */}
        <div className="tw:border-b tw:bg-background tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
          <FilterDropdown
            value={filters.preset}
            labelKeys={presetToLabelKey}
            isValue={isCommentPreset}
            onChange={(preset) => onFiltersChange({ preset })}
            localizedStrings={localizedStrings}
            ariaLabel={localizedStrings['%comment_filter_aria_preset%']}
            testId="comment-preset-filter"
          />
          <FilterDropdown
            value={scopeFilter}
            labelKeys={scopeFilterToLabelKey}
            isValue={isScopeFilter}
            onChange={onScopeFilterChange}
            localizedStrings={localizedStrings}
            ariaLabel={localizedStrings['%comment_filter_aria_scope%']}
            testId="comment-scope-filter"
          />
        </div>
      </div>

      {/* Comments list (or skeletons while loading / empty state). Only this region swaps on load,
          so the toolbar above stays mounted. */}
      <div className="tw:flex-1 tw:overflow-auto">{listContent}</div>
    </div>
  );
}

export default CommentListPanel;
