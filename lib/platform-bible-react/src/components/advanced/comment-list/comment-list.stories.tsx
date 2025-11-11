import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { LanguageStrings, LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { useState } from 'react';
import CommentList from './comment-list.component';
import { sampleComments } from './comment-sample-data';

const commentListLocalizedStrings: LanguageStrings = {
  '%no_comments%': 'No comments yet',
  '%comment_thread_single_reply%': '1 reply',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_replyOrAssign%': 'Reply or assign with @',
};

function CommentListStory({ initialThreads }: { initialThreads: LegacyCommentThread[] }) {
  const [threads, setThreads] = useState<LegacyCommentThread[]>(initialThreads);

  const handleAddComment = (threadId: string, contents: string): string | undefined => {
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
          };
          return {
            ...thread,
            comments: [...thread.comments, newComment],
          };
        }
        return thread;
      }),
    );

    return newCommentId;
  };

  const handleResolveCommentThread = (threadId: string) => {
    console.log(`Resolving thread ${threadId}`);
  };

  return (
    <CommentList
      threads={threads}
      localizedStrings={commentListLocalizedStrings}
      handleAddComment={handleAddComment}
      handleResolveCommentThread={handleResolveCommentThread}
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

export const NoThreads: Story = {
  render: () => <CommentListStory initialThreads={[]} />,
};
