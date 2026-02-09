import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  AddCommentToThreadOptions,
  COMMENT_LIST_STRING_KEYS,
  CommentList,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  usePromise,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings, useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { isPlatformError, LegacyCommentThread, serialize } from 'platform-bible-utils';
import type { LegacyCommentThreadSelector } from 'legacy-comment-manager';
import { CommentListWebViewMessage } from './comment-list-messages.model';

const DEFAULT_LEGACY_COMMENT_THREADS: LegacyCommentThread[] = [];

/**
 * Wraps a PDP method call with a null check. If the PDP is not yet available, logs a debug message
 * and returns the specified default value. This reduces repetitive null-checking boilerplate.
 *
 * @param pdp The project data provider, or undefined if not yet available
 * @param methodName Name of the method being called (for logging purposes)
 * @param defaultValue Value to return if PDP is not available
 * @param action The action to perform with the PDP if available
 * @returns The result of the action, or the default value if PDP is unavailable
 */
async function withPdp<PDP, T>(
  pdp: PDP | undefined,
  methodName: string,
  defaultValue: T,
  action: (p: PDP) => Promise<T>,
): Promise<T> {
  if (!pdp) {
    logger.debug(`Comments PDP is not yet available for ${methodName}`);
    return defaultValue;
  }
  return action(pdp);
}

global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  projectId,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [
        ...Array.from(COMMENT_LIST_STRING_KEYS),
        '%comment_filter_all%',
        '%comment_filter_scope_all_books%',
        '%comment_filter_scope_current_chapter%',
        '%comment_filter_unread_assigned_to_me%',
        '%comment_filter_unresolved_assigned_to_me%',
        '%no_comments%',
        '%no_comments_match_filter%',
      ];
    }, []),
  );
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(undefined);
  /**
   * Thread ID that should be selected and scrolled to once data finishes loading. This handles the
   * race condition where a `selectThread` message arrives before comment threads have loaded.
   */
  const [pendingThreadIdToSelect, setPendingThreadIdToSelect] = useState<string | undefined>(
    undefined,
  );

  // Filter constants and types
  const UNFILTERED = 'unfiltered';
  const FILTER_UNRESOLVED_ASSIGNED = 'unresolved-assigned-to-me';
  const FILTER_UNREAD_ASSIGNED = 'unread-assigned-to-me';
  const SCOPE_FILTER_CURRENT_CHAPTER = 'current-chapter';

  const commentFilterToLabelKey = {
    [FILTER_UNRESOLVED_ASSIGNED]: '%comment_filter_unresolved_assigned_to_me%',
    [FILTER_UNREAD_ASSIGNED]: '%comment_filter_unread_assigned_to_me%',
    [UNFILTERED]: '%comment_filter_all%',
  } as const;

  type CommentFilter = keyof typeof commentFilterToLabelKey;

  const scopeFilterToLabelKey = {
    [SCOPE_FILTER_CURRENT_CHAPTER]: '%comment_filter_scope_current_chapter%',
    [UNFILTERED]: '%comment_filter_scope_all_books%',
  } as const;

  type ScopeFilter = keyof typeof scopeFilterToLabelKey;

  function isCommentFilter(value: string): value is CommentFilter {
    return value in commentFilterToLabelKey;
  }
  function isScopeFilter(value: string): value is ScopeFilter {
    return value in scopeFilterToLabelKey;
  }
  const [commentFilter, setCommentFilter] = useState<CommentFilter>(UNFILTERED);
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>(UNFILTERED);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  /**
   * Attempts to scroll to and select a thread by ID. If the thread element doesn't exist yet
   * (likely because data is still loading), queues the thread ID to be processed later.
   *
   * @param threadId The ID of the thread to select and scroll to
   * @param isDataLoading Whether comment threads are currently loading
   * @returns `true` if the thread was found and scrolled to, `false` if it was queued for later
   */
  const trySelectThread = useCallback((threadId: string, isDataLoading: boolean): boolean => {
    const threadElement = document.getElementById(threadId);
    if (threadElement) {
      setSelectedThreadId(threadId);
      threadElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setPendingThreadIdToSelect(undefined);
      return true;
    }

    // If data is still loading, queue the thread ID to select later
    if (isDataLoading) {
      logger.debug(`Thread element ${threadId} not found; queuing for selection after data loads`);
      setPendingThreadIdToSelect(threadId);
      return false;
    }

    // Data is loaded but element still not found - thread may not exist in current view
    logger.warn(`Could not find thread element with id: ${threadId}`);
    return false;
  }, []);

  // Listen for messages from the web view controller
  useEffect(() => {
    const messageListener = ({ data }: MessageEvent<CommentListWebViewMessage>) => {
      if (data.method === 'selectThread') {
        logger.debug(`Comment list received selectThread message: ${serialize(data)}`);
        // Note: We pass `true` for isDataLoading as a conservative default since we can't access
        // the current loading state synchronously here. The pending thread will be processed
        // by the effect below once loading completes.
        trySelectThread(data.threadId, true);
      }
    };

    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, [trySelectThread]);

  // Fetch current user's registration data on mount
  useEffect(() => {
    let isMounted = true;
    const fetchRegistrationData = async () => {
      try {
        const registrationData = await papi.commands.sendCommand(
          'paratextRegistration.getParatextRegistrationData',
        );
        if (isMounted) {
          setCurrentUserName(registrationData.name);
        }
      } catch (error) {
        logger.error('Failed to fetch registration data:', error);
      }
    };
    fetchRegistrationData();
    return () => {
      isMounted = false;
    };
  }, []);

  const [commentThreads, , isLoadingCommentThreads] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).CommentThreads(
    useMemo<LegacyCommentThreadSelector>(() => {
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
      }

      return selector;
    }, [
      scrRef.book,
      scrRef.chapterNum,
      scrRef.verseNum,
      scopeFilter,
      commentFilter,
      currentUserName,
    ]),
    DEFAULT_LEGACY_COMMENT_THREADS,
  );

  // Process any pending thread selection once data finishes loading
  useEffect(() => {
    if (!isLoadingCommentThreads && pendingThreadIdToSelect) {
      // Use a small delay to allow the DOM to update after data loads
      const timeoutId = setTimeout(() => {
        trySelectThread(pendingThreadIdToSelect, false);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isLoadingCommentThreads, pendingThreadIdToSelect, trySelectThread]);

  const fetchAssignableUsers = useCallback(
    async () =>
      withPdp(commentsPdp, 'fetchAssignableUsers', [], (pdp) => pdp.findAssignableUsers()),
    [commentsPdp],
  );
  const [assignableUsers] = usePromise(fetchAssignableUsers, []);

  const fetchCanUserAddCommentToThread = useCallback(
    async () =>
      withPdp(commentsPdp, 'fetchCanUserAddCommentToThread', false, (pdp) =>
        pdp.canUserAddCommentToThread(),
      ),
    [commentsPdp],
  );
  const [canUserAddCommentToThread] = usePromise(fetchCanUserAddCommentToThread, false);

  const canUserAssignThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserAssignThreadCallback', false, (pdp) =>
        pdp.canUserAssignThread(threadId),
      ),
    [commentsPdp],
  );

  const canUserResolveThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserResolveThreadCallback', false, (pdp) =>
        pdp.canUserResolveThread(threadId),
      ),
    [commentsPdp],
  );

  const canUserEditOrDeleteCommentCallback = useCallback(
    async (commentId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserEditOrDeleteCommentCallback', false, (pdp) =>
        pdp.canUserEditOrDeleteComment(commentId),
      ),
    [commentsPdp],
  );

  const handleAddCommentToThread = useCallback(
    async (options: AddCommentToThreadOptions): Promise<string | undefined> =>
      withPdp(commentsPdp, 'handleAddCommentToThread', undefined, async (pdp) => {
        try {
          const newCommentId = await pdp.addCommentToThread({
            thread: options.threadId,
            contents: options.contents,
            status: options.status,
            assignedUser: options.assignedUser,
          });
          return newCommentId;
        } catch (error) {
          logger.error(`Failed to add comment to thread ${options.threadId}:`, error);
          return undefined;
        }
      }),
    [commentsPdp],
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, contents: string): Promise<boolean> =>
      withPdp(commentsPdp, 'handleUpdateComment', false, async (pdp) => {
        try {
          await pdp.updateComment(commentId, contents);
          return true;
        } catch (error) {
          logger.error(`Failed to update comment ${commentId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'handleDeleteComment', false, async (pdp) => {
        try {
          await pdp.deleteComment(commentId);
          return true;
        } catch (error) {
          logger.error(`Failed to delete comment ${commentId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  const handleReadStatusChange = useCallback(
    async (threadId: string, markAsRead: boolean): Promise<boolean> =>
      withPdp(commentsPdp, 'handleReadStatusChange', false, async (pdp) => {
        try {
          await pdp.setIsCommentThreadRead(threadId, markAsRead);
          return true;
        } catch (error) {
          logger.error(`Failed to set read status on thread ${threadId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  if (isLoadingCommentThreads || !commentsPdp) {
    return (
      <div className="tw-bg-background tw-flex-1 tw-p-2 tw-space-y-4">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            // There are no other unique identifiers for these items
            // eslint-disable-next-line react/no-array-index-key
            key={`comment-thread-skeleton-${index}`}
            className="tw-h-48 tw-w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="tw-bg-muted tw-flex tw-flex-col tw-h-full">
      {/* Filter toolbar */}
      <div className="tw-flex tw-gap-2 tw-p-2 tw-border-b tw-bg-background">
        {/* Comment filter dropdown */}
        <Select
          value={commentFilter}
          onValueChange={(value) => {
            if (isCommentFilter(value)) setCommentFilter(value);
          }}
        >
          <SelectTrigger className="tw-w-auto tw-min-w-48">
            <SelectValue>
              <div className="tw-text-start tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal">
                {localizedStrings[commentFilterToLabelKey[commentFilter]]}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="start">
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
            if (isScopeFilter(value)) setScopeFilter(value);
          }}
        >
          <SelectTrigger className="tw-w-auto tw-min-w-32">
            <SelectValue>
              <div className="tw-text-start tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal">
                {localizedStrings[scopeFilterToLabelKey[scopeFilter]]}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="start">
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
      <div className="tw-flex-1 tw-overflow-auto">
        {!commentThreads || isPlatformError(commentThreads) || commentThreads.length === 0 ? (
          <div className="tw-m-4 tw-flex tw-justify-center">
            <Label>
              {commentFilter === UNFILTERED && scopeFilter === UNFILTERED
                ? localizedStrings['%no_comments%']
                : localizedStrings['%no_comments_match_filter%']}
            </Label>
          </div>
        ) : (
          <CommentList
            classNameForVerseText="scripture-font"
            threads={commentThreads}
            currentUser={currentUserName}
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
            onSelectedThreadChange={setSelectedThreadId}
          />
        )}
      </div>
    </div>
  );
};
