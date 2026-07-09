import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  AddCommentToThreadOptions,
  COMMENT_LIST_STRING_KEYS,
  usePromise,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useWebViewController,
} from '@papi/frontend/react';
import { isPlatformError, LegacyCommentThread, serialize } from 'platform-bible-utils';
import { VerseRef } from '@sillsdev/scripture';
import type { LegacyCommentThreadSelector } from 'legacy-comment-manager';
import { CommentListWebViewMessage } from './comment-list-messages.model';
import { CommentListPanel, COMMENT_LIST_PANEL_EXTRA_STRING_KEYS } from './comment-list.component';
import {
  buildCommentThreadSelector,
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  ScopeFilter,
  UNFILTERED,
} from './comment-list-filters.model';

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
  useWebViewState,
  projectId,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(COMMENT_LIST_STRING_KEYS), ...COMMENT_LIST_PANEL_EXTRA_STRING_KEYS];
    }, []),
  );
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();
  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);
  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(undefined);
  /**
   * Thread ID that should be selected and scrolled to once data finishes loading. This handles the
   * race condition where a `selectThread` message arrives before comment threads have loaded.
   */
  const [pendingThreadIdToSelect, setPendingThreadIdToSelect] = useState<string | undefined>(
    undefined,
  );

  const [filters, setFilters] = useState<CommentFilters>(DEFAULT_COMMENT_FILTERS);
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

  // The selector only uses scrRef when the scope is the current chapter; in the all-books view a
  // verse move must not tear down and re-establish the subscription (which re-runs the C# query and
  // flashes the skeletons). Freeze the scrRef inputs to constants unless the chapter scope is
  // active. (PT-4027 review)
  const usesChapterScope = scopeFilter !== UNFILTERED;
  const scopeBook = usesChapterScope ? scrRef.book : '';
  const scopeChapterNum = usesChapterScope ? scrRef.chapterNum : 0;
  const scopeVerseNum = usesChapterScope ? scrRef.verseNum : 0;

  // While the "assigned to me" axis is selected but the current user's name hasn't loaded yet, the
  // query can't filter by user and would briefly show every thread. Hold the loading state until the
  // name resolves so the panel shows skeletons instead of that flash. (PT-4027 review)
  const isAwaitingCurrentUserName = filters.assignment === 'assigned-to-me' && !currentUserName;

  const [commentThreads, , isLoadingCommentThreads] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).CommentThreads(
    useMemo<LegacyCommentThreadSelector>(
      () =>
        buildCommentThreadSelector({
          filters,
          scopeFilter,
          scrRef: { book: scopeBook, chapterNum: scopeChapterNum, verseNum: scopeVerseNum },
          currentUserName,
        }),
      [scopeBook, scopeChapterNum, scopeVerseNum, scopeFilter, filters, currentUserName],
    ),
    DEFAULT_LEGACY_COMMENT_THREADS,
  );

  const safeCommentThreads = useMemo<LegacyCommentThread[]>(() => {
    if (!commentThreads || isPlatformError(commentThreads)) return [];
    return commentThreads;
  }, [commentThreads]);

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

  const handleVerseRefClick = useCallback(
    (thread: LegacyCommentThread) => {
      const { verseRef } = VerseRef.tryParse(thread.verseRef ?? '');
      if (!verseRef.valid) return;

      if (editorWebViewId && editorWebViewController) {
        papi.window.setFocus({ focusType: 'webView', id: editorWebViewId });
        const location = {
          verseRef: verseRef.toJSON(),
          offset: Math.max(0, (thread.comments[0]?.startPosition ?? 0) - 1),
        };
        editorWebViewController.selectRange({ start: location, end: location });
      } else {
        setScrRef(verseRef.toJSON());
      }
    },
    [setScrRef, editorWebViewId, editorWebViewController],
  );

  return (
    <CommentListPanel
      localizedStrings={localizedStrings}
      isLoading={isLoadingCommentThreads || !commentsPdp || isAwaitingCurrentUserName}
      threads={safeCommentThreads}
      currentUser={currentUserName}
      filters={filters}
      onFiltersChange={setFilters}
      scopeFilter={scopeFilter}
      onScopeFilterChange={setScopeFilter}
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
      onVerseRefClick={handleVerseRefClick}
    />
  );
};
