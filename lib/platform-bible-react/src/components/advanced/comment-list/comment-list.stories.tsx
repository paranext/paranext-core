import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import {
  CommentStatus,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
} from 'platform-bible-utils';
import { useState } from 'react';
import CommentList from './comment-list.component';
import { sampleComments } from './comment-sample.data';

const commentListLocalizedStrings: LanguageStrings = {
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%no_comments%': 'No comments yet',
};

function CommentListStory({ initialThreads }: { initialThreads: LegacyCommentThread[] }) {
  const [threads, setThreads] = useState<LegacyCommentThread[]>(initialThreads);

  const handleAddComment = async (
    threadId: string,
    contents: string,
    status?: CommentStatus,
  ): Promise<string | undefined> => {
    console.log(`Adding comment to thread ${threadId}: ${contents}`);

    let newCommentId: string | undefined;

    // Find the thread and add the comment
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (`thread-${thread.id}` === threadId) {
          newCommentId = `${thread.id}-${Date.now()}`;
          const newComment: LegacyComment = {
            id: newCommentId,
            user: 'Current User',
            date: new Date().toISOString(),
            contents,
            deleted: false,
            hideInTextWindow: false,
            language: 'en',
            startPosition: 0,
            selectedText: '',
            contextBefore: '',
            contextAfter: '',
            thread: thread.id,
            verseRef: thread.verseRef,
            ...(status && { status }),
          };
          return {
            ...thread,
            comments: [...thread.comments, newComment],
            ...(status && { status }),
          };
        }
        return thread;
      }),
    );

    return newCommentId;
  };

  const handleSetCommentThreadStatus = async (
    threadId: string,
    resolve: boolean,
  ): Promise<boolean> => {
    console.log(`Setting thread ${threadId} status to ${resolve ? 'resolved' : 'unresolved'}`);
    const result = await handleAddComment(threadId, '1', resolve ? 'Resolved' : 'Todo');
    return result !== undefined;
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

  return (
    <CommentList
      threads={threads}
      localizedStrings={commentListLocalizedStrings}
      currentUser="Current User"
      handleAddComment={handleAddComment}
      handleSetCommentThreadStatus={handleSetCommentThreadStatus}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
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
        <div className="tw-max-w-2xl tw-bg-muted">
          <Story />
        </div>
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
  render: () => <CommentListStory initialThreads={sampleComments} />,
};
