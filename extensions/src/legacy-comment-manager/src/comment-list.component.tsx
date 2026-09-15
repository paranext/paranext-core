import {
  Button,
  CommentList,
  ContentZoomRoot,
  Label,
  localizeOrFallback,
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
  presetToFallbackLabel,
  presetToLabelKey,
  ScopeFilter,
  scopeFilterToFallbackLabel,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

/**
 * Extra localization keys this panel needs beyond `COMMENT_LIST_STRING_KEYS`. The preset/scope
 * portions are DERIVED from the compile-checked `presetToLabelKey`/`scopeFilterToLabelKey` maps
 * (rather than hand-listed) so a preset or scope added to those maps can never be forgotten here —
 * a hand-copied list stays green when a new value's string is simply never requested, which is
 * exactly how a real key gap (the dropdown renders the option, but the panel never asks for its
 * localized label, so it shows blank) would slip past `localized-strings.test.ts`, since that test
 * filters this very array rather than the maps themselves.
 */
export const COMMENT_LIST_PANEL_EXTRA_STRING_KEYS = [
  '%comment_filter_aria_preset%',
  '%comment_filter_aria_scope%',
  ...Object.values(presetToLabelKey),
  ...Object.values(scopeFilterToLabelKey),
  '%no_comments%',
  '%no_comments_match_filter%',
  '%webView_legacyCommentManager_syncEditBlocked_notice%',
  '%comment_filter_current_user_unavailable%',
  '%comment_filter_retry_current_user%',
] as const;

/**
 * Slim "editing paused during Send/Receive" notice text shown while this project's sync blocks
 * edits.
 */
const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';

/**
 * `id` of the sticky header (the editing-paused notice, when shown, plus the filter toolbar). The
 * header overlays the top of the scrolled content, so anything scrolling a card into view needs its
 * current height — which changes with the notice — to keep the card clear of it.
 */
export const COMMENT_LIST_STICKY_HEADER_ELEMENT_ID = 'comment-list-sticky-header';

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
  /**
   * True when the active preset needs the current user's name (see `presetRequiresCurrentUser`) and
   * fetching it has failed — as opposed to `isLoading`, which covers the (recoverable)
   * still-loading case. Shows an explanatory message with a retry action instead of the loading
   * skeletons, so a failed fetch doesn't leave the panel loading forever with no way out but
   * changing preset.
   */
  currentUserNameUnavailable?: boolean;
  /** Retries the current user's registration-data fetch; wired to the message above's action. */
  onRetryFetchCurrentUserName?: () => void;
};

/**
 * A single filter dropdown for one axis. Renders each option's localized label and reports the
 * chosen value through `onChange`, narrowed by `isValue` so no unsafe cast is needed. Generic over
 * the axis's value union.
 */
function FilterDropdown<T extends string>({
  value,
  labelKeys,
  fallbackLabels,
  isValue,
  onChange,
  localizedStrings,
  ariaLabel,
  testId,
}: {
  value: T;
  labelKeys: Readonly<Record<T, LocalizeKey>>;
  /**
   * English text shown in place of a `labelKeys` lookup that has not resolved to translated text
   * yet -- `useLocalizedStrings` seeds every requested key to itself both before the subscription
   * delivers and permanently on a `PlatformError`, so a bare `localizedStrings[key]` lookup would
   * otherwise render that raw key.
   */
  fallbackLabels: Readonly<Record<T, string>>;
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
            {localizeOrFallback(labelKeys[value], localizedStrings, fallbackLabels[value])}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="tw:max-w-sm" align="start">
        {Object.keys(labelKeys)
          .filter(isValue)
          .map((option) => (
            <SelectItem key={option} value={option}>
              {localizeOrFallback(labelKeys[option], localizedStrings, fallbackLabels[option])}
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
  currentUserNameUnavailable = false,
  onRetryFetchCurrentUserName,
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

  // The list area swaps between an explanatory "current user unavailable" message, skeletons
  // (loading), an empty-state message, and the list — but the toolbar below always renders, so none
  // of this governs anything but this region. `currentUserNameUnavailable` takes priority over
  // `isLoading`: once the fetch has failed, `isAwaitingCurrentUserName` (the web view's `isLoading`
  // input) stops forcing the loading state, so this branch is what the panel actually recovers into
  // instead of skeletons with no escape.
  let listContent: ReactNode;
  if (currentUserNameUnavailable) {
    listContent = (
      <div className="tw:m-4 tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Label>
          {localizeOrFallback(
            '%comment_filter_current_user_unavailable%',
            localizedStrings,
            "Couldn't load your user name, so comments assigned to you can't be shown right now.",
          )}
        </Label>
        {onRetryFetchCurrentUserName && (
          <Button variant="outline" size="sm" onClick={onRetryFetchCurrentUserName}>
            {localizeOrFallback(
              '%comment_filter_retry_current_user%',
              localizedStrings,
              'Try again',
            )}
          </Button>
        )}
      </div>
    );
  } else if (isLoading) {
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
          scrolls out of view as the comments list scrolls. COMMENT_LIST_STICKY_HEADER_ELEMENT_ID
          documents why it carries an id. */}
      <div
        id={COMMENT_LIST_STICKY_HEADER_ELEMENT_ID}
        className="tw:sticky tw:top-0 tw:z-10 tw:shrink-0"
      >
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
            fallbackLabels={presetToFallbackLabel}
            isValue={isCommentPreset}
            onChange={(preset) => onFiltersChange({ preset })}
            localizedStrings={localizedStrings}
            ariaLabel={localizeOrFallback(
              '%comment_filter_aria_preset%',
              localizedStrings,
              'Filter comments by',
            )}
            testId="comment-preset-filter"
          />
          <FilterDropdown
            value={scopeFilter}
            labelKeys={scopeFilterToLabelKey}
            fallbackLabels={scopeFilterToFallbackLabel}
            isValue={isScopeFilter}
            onChange={onScopeFilterChange}
            localizedStrings={localizedStrings}
            ariaLabel={localizeOrFallback(
              '%comment_filter_aria_scope%',
              localizedStrings,
              'Filter by scope',
            )}
            testId="comment-scope-filter"
          />
        </div>
      </div>

      {/* Comments list (or skeletons while loading / empty state). Only this region swaps on load,
          so the toolbar above stays mounted. It is also this view's only content-zoom area: the
          sticky header above (notice + filter toolbar) stays outside the marker so it keeps its
          size while the cards scale. */}
      <ContentZoomRoot className="tw:flex-1 tw:overflow-auto">{listContent}</ContentZoomRoot>
    </div>
  );
}

export default CommentListPanel;
