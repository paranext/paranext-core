import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { LanguageStrings } from 'platform-bible-utils';
import CommentList from './comment-list.component';
import { sampleComments } from './comment-sample-data';

const commentListLocalizedStrings: LanguageStrings = {
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_date_at%': 'at',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%no_comments%': 'No comments yet',
};

const handleAddComment = (threadId: string, contents: string) => {
  console.log(`Adding comment to thread ${threadId}: ${contents}`);
};

const handleResolveCommentThread = (threadId: string) => {
  console.log(`Resolving thread ${threadId}`);
};

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

type Story = StoryObj<typeof CommentList>;

export const Default: Story = {
  args: {
    threads: sampleComments,
    localizedStrings: commentListLocalizedStrings,
    handleAddComment,
    handleResolveCommentThread,
  },
};
