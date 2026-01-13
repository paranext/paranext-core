import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  AddCommentToThreadOptions,
  COMMENT_LIST_STRING_KEYS,
  CommentList,
  Label,
  Skeleton,
  usePromise,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings, useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { isPlatformError, LegacyCommentThread, serialize } from 'platform-bible-utils';
import { CommentListWebViewMessage } from './comment-list-messages.model';

const DEFAULT_LEGACY_COMMENT_THREADS: LegacyCommentThread[] = [];

global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  projectId,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(COMMENT_LIST_STRING_KEYS);
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(undefined);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  // Listen for messages from the web view controller
  useEffect(() => {
    const messageListener = ({ data }: MessageEvent<CommentListWebViewMessage>) => {
      if (data.method === 'selectThread') {
        logger.debug(`Comment list received selectThread message: ${serialize(data)}`);
        const { threadId } = data;

        // Find the thread element and scroll to it
        const threadElement = document.getElementById(threadId);
        if (threadElement) {
          setSelectedThreadId(threadId);
          threadElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          logger.warn(`Could not find thread element with id: ${threadId}`);
        }
      }
    };

    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

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

  const fetchAssignableUsers = useCallback(async () => {
    if (!commentsPdp) {
      logger.debug('Comments PDP is not yet available for fetchAssignableUsers');
      return [];
    }
    return commentsPdp.findAssignableUsers();
  }, [commentsPdp]);
  const [assignableUsers] = usePromise(fetchAssignableUsers, []);

  const fetchCanUserAddCommentToThread = useCallback(async () => {
    if (!commentsPdp) {
      logger.debug('Comments PDP is not yet available for fetchCanUserAddCommentToThread');
      return false;
    }
    return commentsPdp.canUserAddCommentToThread();
  }, [commentsPdp]);
  const [canUserAddCommentToThread] = usePromise(fetchCanUserAddCommentToThread, false);

  const canUserAssignThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.debug('Comments PDP is not yet available for canUserAssignThreadCallback');
        return false;
      }
      return commentsPdp.canUserAssignThread(threadId);
    },
    [commentsPdp],
  );

  const canUserResolveThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.debug('Comments PDP is not yet available for canUserResolveThreadCallback');
        return false;
      }
      return commentsPdp.canUserResolveThread(threadId);
    },
    [commentsPdp],
  );

  const canUserEditOrDeleteCommentCallback = useCallback(
    async (commentId: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.debug('Comments PDP is not yet available for canUserEditOrDeleteCommentCallback');
        return false;
      }
      return commentsPdp.canUserEditOrDeleteComment(commentId);
    },
    [commentsPdp],
  );

  const handleAddCommentToThread = useCallback(
    async (options: AddCommentToThreadOptions): Promise<string | undefined> => {
      if (!commentsPdp) {
        logger.debug('Comments PDP is not yet available for handleAddCommentToThread');
        return undefined;
      }
      try {
        const newCommentId = await commentsPdp.addCommentToThread({
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
    },
    [commentsPdp],
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, contents: string): Promise<boolean> => {
      if (!commentsPdp) {
        logger.debug('Comments PDP is not yet available for handleUpdateComment');
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
        logger.debug('Comments PDP is not yet available for handleDeleteComment');
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
          classNameForVerseText="scripture-font"
          threads={commentThreads}
          currentUser={currentUserName}
          localizedStrings={localizedStrings}
          handleAddCommentToThread={handleAddCommentToThread}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
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
  );
};
