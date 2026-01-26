import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { LanguageStrings, LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import CommentList from './comment-list.component';
import { sampleComments } from './comment-sample.data';
import { AddCommentToThreadOptions } from './comment-list.types';

const commentListLocalizedStrings: LanguageStrings = {
  '%comment_assign_team%': 'Team',
  '%comment_assign_unassigned%': 'Unassigned',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_assigning_to%': 'Assigning to: {assignedUser}',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
  '%comment_reopenResolved%': 'Adding a comment will re-open this discussion...',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_status_resolved%': 'Marked as resolved',
  '%comment_status_todo%': 'Re-opened',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%no_comments%': 'No comments yet',
};

const mockAssignableUsers: string[] = ['', 'Team', 'Alice', 'Bob', 'Charlie', 'Current User'];

type CommentListStoryProps = {
  initialThreads: LegacyCommentThread[];
  canUserAddCommentToThread?: boolean;
  canUserAssignThreadCallback?: (threadId: string) => Promise<boolean>;
  canUserResolveThreadCallback?: (threadId: string) => Promise<boolean>;
  canUserEditOrDeleteCommentCallback?: (commentId: string) => Promise<boolean>;
};

function CommentListStory({
  initialThreads,
  canUserAddCommentToThread = true,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
}: CommentListStoryProps) {
  const [threads, setThreads] = useState<LegacyCommentThread[]>(initialThreads);

  const handleAddCommentToThread = async (
    options: AddCommentToThreadOptions,
  ): Promise<string | undefined> => {
    const { threadId, contents, status, assignedUser } = options;
    console.log(`Adding comment to thread ${threadId}`, { contents, status, assignedUser });

    let newCommentId: string | undefined;

    // Find the thread and add the comment
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          newCommentId = `${thread.id}-${Date.now()}`;

          // Determine the status for the new comment
          // If explicitly provided, use it; otherwise check if thread is resolved
          let commentStatus = status;
          if (!commentStatus && thread.status === 'Resolved') {
            commentStatus = 'Todo';
          }

          const newComment: LegacyComment = {
            id: newCommentId,
            user: 'Current User',
            date: new Date().toISOString(),
            contents: contents ?? '',
            deleted: false,
            hideInTextWindow: false,
            language: 'en',
            isRead: false,
            startPosition: 0,
            selectedText: '',
            contextBefore: '',
            contextAfter: '',
            thread: thread.id,
            verseRef: thread.verseRef,
            ...(commentStatus && { status: commentStatus }),
            ...(assignedUser !== undefined && { assignedUser }),
          };
          return {
            ...thread,
            comments: [...thread.comments, newComment],
            ...(commentStatus && { status: commentStatus }),
            ...(assignedUser !== undefined && { assignedUser }),
          };
        }
        return thread;
      }),
    );

    return newCommentId;
  };

  const handleUpdateComment = async (commentId: string, contents: string): Promise<boolean> => {
    console.log(`Updating comment id ${commentId} with contents: ${contents}`);

    let commentFound = false;

    // Find the comment and update its contents
    setThreads((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === commentId) {
            commentFound = true;
            return {
              ...comment,
              contents,
            };
          }
          return comment;
        }),
      })),
    );

    return commentFound;
  };

  // This mock function simulates deleting a comment by setting its 'deleted' flag to true.
  // In reality Paratext 9 actually removes the comment from the project instead of using this flag.
  // The implementation can be found in `RemoveComment` on the `CommentManager` class in `ParatextData`
  const handleDeleteComment = async (commentId: string): Promise<boolean> => {
    console.log(`Deleting comment id ${commentId}`);

    let commentFound = false;

    // Find the comment and mark it as deleted
    setThreads((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === commentId) {
            commentFound = true;
            return {
              ...comment,
              deleted: true,
            };
          }
          return comment;
        }),
      })),
    );

    return commentFound;
  };

  // Default permission callback for edit/delete - only allow for current user's comments
  const defaultCanUserEditOrDeleteCallback = useMemo(() => {
    return async (commentId: string): Promise<boolean> => {
      console.log(`Checking if user can edit/delete comment ${commentId}`);
      const comment = threads
        .flatMap((thread) => thread.comments)
        .find((c) => c.id === commentId && !c.deleted);
      return comment?.user === 'Current User';
    };
  }, [threads]);

  // Default callback for read status change
  const threadReadStatusChangeCallback = useMemo(() => {
    return async (threadId: string, markRead: boolean): Promise<boolean> => {
      console.log(`Marking thread ${threadId} as ${markRead ? 'read' : 'unread'}`);
      return true;
    };
  }, []);

  return (
    <CommentList
      threads={threads}
      localizedStrings={commentListLocalizedStrings}
      currentUser="Current User"
      handleAddCommentToThread={handleAddCommentToThread}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
      handleReadStatusChange={threadReadStatusChangeCallback}
      assignableUsers={mockAssignableUsers}
      canUserAddCommentToThread={canUserAddCommentToThread}
      canUserAssignThreadCallback={canUserAssignThreadCallback}
      canUserResolveThreadCallback={canUserResolveThreadCallback}
      canUserEditOrDeleteCommentCallback={
        canUserEditOrDeleteCommentCallback ?? defaultCanUserEditOrDeleteCallback
      }
    />
  );
}

const meta: Meta<typeof CommentList> = {
  title: 'Advanced/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    threads: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CommentListStory>;

export const Default: Story = {
  render: () => (
    <CommentListStory
      initialThreads={sampleComments}
      canUserAssignThreadCallback={async (threadId) => {
        console.log(`Checking if user can assign thread ${threadId}`);
        return true;
      }}
      canUserResolveThreadCallback={async (threadId) => {
        console.log(`Checking if user can resolve thread ${threadId}`);
        return true;
      }}
    />
  ),
};

/** Story demonstrating restricted permissions - user cannot add comments, assign, or resolve */
export const RestrictedPermissions: Story = {
  render: () => (
    <CommentListStory
      initialThreads={sampleComments}
      canUserAddCommentToThread={false}
      canUserAssignThreadCallback={async () => false}
      canUserResolveThreadCallback={async () => false}
      canUserEditOrDeleteCommentCallback={async () => false}
    />
  ),
};
