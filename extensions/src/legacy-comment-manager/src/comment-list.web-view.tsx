import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { COMMENT_LIST_STRING_KEYS, CommentList, Label, Skeleton } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings, useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { isPlatformError, LegacyCommentThread } from 'platform-bible-utils';

const DEFAULT_LEGACY_COMMENT_THREADS: LegacyCommentThread[] = [];

global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  projectId,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(COMMENT_LIST_STRING_KEYS);
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [currentUserName, setCurrentUserName] = useState<string>('');

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

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
    useMemo(() => {
      return {
        scriptureRanges: [
          {
            granularity: 'chapter',
            start: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
            end: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
          },
        ],
      };
    }, [scrRef.book, scrRef.chapterNum, scrRef.verseNum]),
    DEFAULT_LEGACY_COMMENT_THREADS,
  );

  const handleAddComment = useCallback(
    async (threadId: string, contents: string): Promise<string | undefined> => {
      if (!commentsPdp) {
        logger.error('Comments PDP is not available');
        return undefined;
      }
      const newCommentId = await commentsPdp.createComment({
        thread: threadId,
        contents,
      });
      return newCommentId;
    },
    [commentsPdp],
  );

  const handleSetCommentThreadStatus = useCallback(
    async (threadId: string, resolve: boolean, contents?: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.error('Comments PDP is not available');
        return false;
      }
      try {
        const result = await commentsPdp.setCommentThreadStatus(threadId, resolve, contents);
        return result !== false;
      } catch (error) {
        logger.error(`Failed to set comment thread status for ${threadId}:`, error);
        return false;
      }
    },
    [commentsPdp],
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, contents: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.error('Comments PDP is not available');
        return false;
      }
      try {
        await commentsPdp.updateComment(commentId, contents);
        return true;
      } catch (error) {
        logger.error(`Failed to update comment ${commentId}:`, error);
        return false;
      }
    },
    [commentsPdp],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.error('Comments PDP is not available');
        return false;
      }
      try {
        await commentsPdp.deleteComment(commentId);
        return true;
      } catch (error) {
        logger.error(`Failed to delete comment ${commentId}:`, error);
        return false;
      }
    },
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
    <div className="tw-bg-muted">
      {!commentThreads || isPlatformError(commentThreads) || commentThreads.length === 0 ? (
        <div className="tw-m-4 tw-flex tw-justify-center">
          <Label>{localizedStrings['%no_comments%']}</Label>
        </div>
      ) : (
        <CommentList
          threads={commentThreads}
          currentUser={currentUserName}
          localizedStrings={localizedStrings}
          handleAddComment={handleAddComment}
          handleSetCommentThreadStatus={handleSetCommentThreadStatus}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
        />
      )}
    </div>
  );
};
