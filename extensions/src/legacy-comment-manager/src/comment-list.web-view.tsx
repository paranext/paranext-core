import { CommentList, COMMENT_LIST_STRING_KEYS, Label, Skeleton } from 'platform-bible-react';
import { useLocalizedStrings, useProjectDataProvider } from '@papi/frontend/react';
import papi from '@papi/frontend';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { sampleComments } from './comment-sample-data';

global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  projectId,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(COMMENT_LIST_STRING_KEYS);
    }, []),
  );
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [areThreadsLoading, setAreThreadsLoading] = useState<boolean>(false);
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

  const unresolvedThreadsForScrRef = useMemo(() => {
    setAreThreadsLoading(true);
    const scrRefString = `${scrRef.book} ${scrRef.chapterNum}:${scrRef.verseNum}`;
    const filteredThreads = sampleComments.filter((thread) => scrRefString === thread.verseRef);
    setAreThreadsLoading(false);
    return filteredThreads;
  }, [scrRef]);

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

  const handleResolveCommentThread = useCallback((threadId: string) => {
    // Logic to resolve a comment thread would go here
    logger.debug(`Resolving comment thread ${threadId}`);
  }, []);

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

  if (unresolvedThreadsForScrRef.length === 0) {
    return (
      <div className="tw-m-4 tw-flex tw-justify-center">
        <Label>{localizedStrings['%no_comments%']}</Label>
      </div>
    );
  }

  if (areThreadsLoading) {
    return (
      <div className="tw-bg-muted tw-flex-1 tw-p-2 tw-space-y-4">
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
      <CommentList
        threads={unresolvedThreadsForScrRef}
        currentUser={currentUserName}
        localizedStrings={localizedStrings}
        handleAddComment={handleAddComment}
        handleResolveCommentThread={handleResolveCommentThread}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
      />
    </div>
  );
};
